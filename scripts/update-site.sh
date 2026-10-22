#!/usr/bin/env bash
set -euo pipefail

fail() {
    printf 'Update failed: %s\n' "$*" >&2
    exit 1
}

wait_for_site() {
    local expected_image=$1 deadline=$((SECONDS + ready_timeout)) state
    while ((SECONDS < deadline)); do
        state=$(podman container inspect --format \
            '{{.Image}} {{.State.Running}} {{.State.Health.Status}}' \
            "$container_name" 2>/dev/null) || state=
        if [[ $state == "$expected_image true healthy" ]] &&
            systemctl --user is-active --quiet "$service_name" &&
            [[ $(curl --silent --output /dev/null --write-out '%{http_code}' \
                --noproxy '*' --connect-timeout 2 --max-time 3 "$origin/healthz") == 200 ]] &&
            [[ $(curl --silent --output /dev/null --write-out '%{http_code}' \
                --noproxy '*' --connect-timeout 2 --max-time 3 "$origin/") == 200 ]]; then
            return 0
        fi
        sleep 2
    done
    return 1
}

finish() {
    local status=$? preserve_backup=false
    trap - EXIT
    # Finish recovery even if the terminal sends another interrupt.
    trap '' HUP INT TERM
    set +e
    if [[ $rollback_needed == true ]]; then
        printf 'Restoring the previous deployment...\n' >&2
        if cp -p -- "$work_dir/image.conf" "$work_dir/restore.conf" &&
            mv -f -- "$work_dir/restore.conf" "$image_override" &&
            systemctl --user daemon-reload &&
            systemctl --user restart "$service_name" &&
            wait_for_site "$previous_image"; then
            printf 'The previous deployment is responding again. The update failed.\n' >&2
        else
            printf 'Rollback could not be verified. Check %s before retrying.\n' "$service_name" >&2
            printf 'The original image override is saved in %s/image.conf\n' "$work_dir" >&2
            preserve_backup=true
        fi
        ((status != 0)) || status=1
    fi
    if [[ -n $work_dir && $preserve_backup == false ]]; then
        rm -f -- "$work_dir/image.conf" "$work_dir/new.conf" "$work_dir/restore.conf"
        rmdir -- "$work_dir"
    fi
    exit "$status"
}

check_quadlet() {
    cmp -s -- "$repo_dir/deploy/quadlet/$container_name.container" "$installed_quadlet" ||
        fail 'The installed Quadlet differs from the repository. Review and install that configuration deliberately, then rerun this script.'
}

main() {
    if [[ ${1:-} == --help && $# == 1 ]]; then
        printf 'Usage: %s\nRun as the user that owns the existing rootless website service.\n' "$0"
        printf 'Pulls main, builds locally, restarts the site, and rolls back on failure.\n'
        return
    fi
    (($# == 0)) || fail 'No arguments are needed. Use --help for usage.'
    ((EUID != 0)) || fail 'Run as the user that owns the website service, without sudo.'
    local command_name upstream revision configured_image configured_id new_image new_image_id
    for command_name in git podman systemctl curl flock awk cmp mktemp cp mv rm rmdir sleep; do
        command -v "$command_name" >/dev/null || fail "Required command is missing: $command_name"
    done

    repo_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd -P)
    cd -- "$repo_dir"
    container_name=cyberflyers-web
    service_name=$container_name.service
    image_repository=localhost/cyberflyers-website
    origin=http://127.0.0.1:8080
    quadlet_dir=${XDG_CONFIG_HOME:-$HOME/.config}/containers/systemd
    installed_quadlet=$quadlet_dir/$container_name.container
    image_override=$quadlet_dir/$container_name.container.d/10-image.conf
    ready_timeout=${UPDATE_TIMEOUT_SECONDS:-90}
    [[ $ready_timeout =~ ^[1-9][0-9]{0,3}$ ]] || fail 'UPDATE_TIMEOUT_SECONDS must be between 1 and 9999.'
    work_dir=
    rollback_needed=false
    trap finish EXIT
    trap 'exit 129' HUP
    trap 'exit 130' INT
    trap 'exit 143' TERM

    exec 9>"${XDG_RUNTIME_DIR:-/run/user/$UID}/cyberflyers-update.lock"
    flock -n 9 || fail 'Another website update is already running.'
    [[ $(git branch --show-current) == main ]] || fail 'The server checkout must be on main.'
    [[ -z $(git status --porcelain) ]] || fail 'The checkout has local changes. Resolve them before updating.'
    upstream=$(git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}') ||
        fail 'main needs a configured upstream branch.'
    [[ $upstream == */main ]] || fail 'The upstream branch must also be main.'
    [[ -f $installed_quadlet && -f $image_override && ! -L $image_override ]] ||
        fail 'The existing Quadlet and a regular 10-image.conf override are required.'
    check_quadlet
    systemctl --user is-active --quiet "$service_name" || fail 'The existing website service is not active.'
    previous_image=$(podman container inspect --format '{{.Image}}' "$container_name")
    configured_image=$(awk '
        /^[[:space:]]*\[/ { container = ($0 ~ /^[[:space:]]*\[Container\][[:space:]]*$/) }
        container && /^[[:space:]]*Image[[:space:]]*=/ {
            sub(/^[^=]*=[[:space:]]*/, ""); sub(/[[:space:]]*$/, ""); print; count++
        }
        END { if (count != 1) exit 1 }
    ' "$image_override") || fail '10-image.conf must contain exactly one Image setting in [Container].'
    configured_id=$(podman image inspect --format '{{.Id}}' "$configured_image")
    [[ $configured_id == "$previous_image" ]] || fail 'The image override does not match the running container.'
    wait_for_site "$previous_image" || fail 'The current site is not healthy. Restore it before attempting an update.'

    printf 'Pulling main...\n'
    git pull
    [[ -z $(git status --porcelain) ]] || fail 'The pull left local changes. Resolve them before updating.'
    check_quadlet
    revision=$(git rev-parse HEAD)
    new_image=$image_repository:$revision
    if [[ $configured_image == "$new_image" ]]; then
        printf 'Already running revision %s.\n' "$revision"
        return
    fi

    printf 'Building revision %s; the current site stays running...\n' "$revision"
    podman build --build-arg "REVISION=$revision" --tag "$new_image" .
    new_image_id=$(podman image inspect --format '{{.Id}}' "$new_image")
    # Keep the actual running image available even after the old container is removed.
    podman tag "$previous_image" "$image_repository:previous"

    work_dir=$(mktemp -d "$quadlet_dir/.cyberflyers-update.XXXXXX")
    cp -p -- "$image_override" "$work_dir/image.conf"
    cp -p -- "$image_override" "$work_dir/new.conf"
    awk -v image="$new_image" '
        /^[[:space:]]*\[/ { container = ($0 ~ /^[[:space:]]*\[Container\][[:space:]]*$/) }
        container && /^[[:space:]]*Image[[:space:]]*=/ { print "Image=" image; next }
        { print }
    ' "$work_dir/image.conf" > "$work_dir/new.conf"

    printf 'Switching the service to revision %s...\n' "$revision"
    rollback_needed=true
    mv -f -- "$work_dir/new.conf" "$image_override"
    systemctl --user daemon-reload
    systemctl --user restart "$service_name"
    wait_for_site "$new_image_id" || fail 'The new deployment did not become healthy before the timeout.'
    rollback_needed=false
    printf 'Deployed revision %s. The container is healthy and the homepage responds.\n' "$revision"
}

# Parse the update procedure before git pull can replace this script on disk.
main "$@"
