# Cyber Flyers Website

Astro website for Cyber Flyers at the University of Dayton.

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 22.12.0 or newer

## Set up the project

```sh
git clone git@github.com:ethanlally/cyber-flyers-website.git
cd cyber-flyers-website
npm ci
```

## Run the site locally

```sh
npm run dev
```

Open <http://localhost:4321>.

## Test the production build

```sh
npm run build
npm run preview
```

Build output: `dist/`. Preview: <http://localhost:4321>.

## Automated builds (GitHub Actions)

`.github/workflows/build.yml` runs on pushes and pull requests to `main`.

- Manual build: **Actions → Build website → Run workflow**.
- Download: open a successful run and select **Artifacts → website-dist** (retained for 14 days).

## GitHub Pages deployment

`.github/workflows/deploy.yml` publishes automatically on pushes to `main`.

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Merge the configuration and workflow changes into `main`.
4. Check **Actions → Deploy website** for deployment status.

Manual deployment: **Actions → Deploy website → Run workflow**, selecting `main`.

Site: <https://ethanlally.github.io/cyber-flyers-website/>.
