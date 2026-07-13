# Software Principle (SP)

Public marketing site for **Software Principle** — creating, supporting, and scaling software products that stay precise, fast, and affordable.

Live: https://romc57.github.io/sp/

## Local

```bash
npm ci
npm run dev
```

## Build & deploy (GitHub Pages)

```bash
bash infra/github-pages/deploy.sh --dry-run
bash infra/github-pages/deploy.sh
```

Requires git push access to `origin` and Pages enabled on the `gh-pages` branch.
