# Software Principle (SP)

Public marketing site for **Software Principle** — helping businesses manage and create software projects with development that is precise, fast, and scalable.

Live: https://romc57.github.io/sp/

## Local

```bash
npm ci
npm run dev
```

With WorkStation compose:

```bash
bash scripts/dev.sh npm ci
# or: scripts/dev-env.sh up --project sp
```

## Build & deploy (GitHub Pages)

```bash
bash infra/github-pages/deploy.sh --dry-run
bash infra/github-pages/deploy.sh
```

Requires git push access to `origin` and Pages enabled on the `gh-pages` branch.
