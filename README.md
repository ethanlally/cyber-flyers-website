# Cyber Flyers Website

Local Astro scaffold for the Cyber Flyers website.

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) 22.12.0 or newer (npm is included)

Confirm that both are available:

```sh
git --version
node --version
npm --version
```

## Set up the project

Clone the repository and enter its directory:

```sh
git clone git@github.com:ethanlally/cyber-flyers-website.git
cd cyber-flyers-website
```

Install the exact dependency versions recorded in `package-lock.json`:

```sh
npm ci
```

## Run the site locally

Start the development server:

```sh
npm run dev
```

Open <http://localhost:4321> in a browser. Astro automatically refreshes the page when project files change. Press `Ctrl+C` in the terminal to stop the server.

## Test the production build

There is not an automated test suite yet. For now, verify that the site compiles successfully by creating a production build:

```sh
npm run build
```

The generated static site is written to `dist/`. To serve that build locally:

```sh
npm run preview
```

Open <http://localhost:4321> and press `Ctrl+C` when finished.

## Command reference

| Command | Action |
| :-- | :-- |
| `npm ci` | Install the locked dependency versions |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build |
