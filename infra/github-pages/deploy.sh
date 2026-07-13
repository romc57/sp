#!/usr/bin/env bash
# Publish dist/ to GitHub Pages via gh-pages branch (local-first).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT"

DRY_RUN=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
  esac
done

if [[ ! -f package.json ]]; then
  echo "ERROR: run from SP repo root" >&2
  exit 1
fi

echo "==> install"
npm ci

echo "==> build"
npm run build

if [[ ! -d dist ]]; then
  echo "ERROR: dist/ missing after build" >&2
  exit 1
fi

# SPA fallback for project Pages
cp dist/index.html dist/404.html

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "DRY RUN: would publish dist/ to gh-pages ($(du -sh dist | cut -f1))"
  exit 0
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "ERROR: no git remote 'origin'" >&2
  exit 1
fi

TMP="$(mktemp -d)"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT

echo "==> publish gh-pages"
git clone --depth 1 --branch gh-pages "$(git remote get-url origin)" "$TMP" 2>/dev/null \
  || git clone --depth 1 "$(git remote get-url origin)" "$TMP"

(
  cd "$TMP"
  git checkout --orphan gh-pages-new
  git rm -rf . >/dev/null 2>&1 || true
  cp -a "$ROOT/dist/." .
  # Project site: keep assets at repo root of gh-pages; GitHub serves under /sp/
  touch .nojekyll
  git add -A
  git commit -m "Deploy Software Principle site"
  git branch -M gh-pages
  git push -f origin gh-pages
)

echo "Published. Enable Pages: Settings → Pages → Deploy from branch gh-pages / (root)"
echo "URL: https://romc57.github.io/sp/"
