# Refresh these immutable image digests deliberately, then rebuild and verify deployment.
FROM docker.io/library/node:22-bookworm-slim@sha256:c3de60bf2f9dd0ac6370e6117950ff62d6e339527e7472301c9c78a017978392 AS build

WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY astro.config.mjs tsconfig.json ./
COPY src/ ./src/
COPY public/ ./public/

ARG ASTRO_SITE=https://cyberflyers.org
ENV ASTRO_SITE=${ASTRO_SITE} ASTRO_BASE=/
RUN npm run build

FROM docker.io/nginxinc/nginx-unprivileged:stable-alpine@sha256:782bb89768cc87b7f95c18b95baa1af250e5d451f26794f59363540161147c01 AS runtime

ARG REVISION=development
LABEL org.opencontainers.image.revision=${REVISION}

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/ /usr/share/nginx/html/
USER 101:101
EXPOSE 8080
STOPSIGNAL SIGQUIT

# Configuration is baked in; bypass the upstream scripts that edit it at startup.
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
