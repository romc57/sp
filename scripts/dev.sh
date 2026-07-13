#!/usr/bin/env bash
# Run npm/build/test/lint inside the project dev compose service (SSOT for VProjects).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

COMPOSE_FILE="${WORKSTATION_COMPOSE_FILE:-docker-compose.dev.yml}"
if [[ ! -f "$COMPOSE_FILE" ]]; then
  echo "ERROR: missing $COMPOSE_FILE — add compose dev stack before host npm/build/test" >&2
  exit 1
fi

COMPOSE=(docker compose -f "$COMPOSE_FILE")
SERVICE="${WORKSTATION_DEV_SERVICE:-}"

if [[ -z "$SERVICE" ]]; then
  mapfile -t SERVICES < <("${COMPOSE[@]}" config --services 2>/dev/null || true)
  for candidate in dev app gateway; do
    for svc in "${SERVICES[@]}"; do
      if [[ "$svc" == "$candidate" ]]; then
        SERVICE="$svc"
        break 2
      fi
    done
  done
  if [[ -z "$SERVICE" && ${#SERVICES[@]} -gt 0 ]]; then
    SERVICE="${SERVICES[0]}"
  fi
fi

if [[ -z "$SERVICE" ]]; then
  echo "ERROR: no compose service found in $COMPOSE_FILE" >&2
  exit 1
fi

ensure_infra() {
  local infra=(postgres redis)
  local up=()
  mapfile -t SERVICES < <("${COMPOSE[@]}" config --services 2>/dev/null || true)
  for svc in "${infra[@]}"; do
    for known in "${SERVICES[@]}"; do
      if [[ "$known" == "$svc" ]]; then
        up+=("$svc")
      fi
    done
  done
  if [[ ${#up[@]} -gt 0 ]]; then
    "${COMPOSE[@]}" up -d "${up[@]}"
  fi
}

if [[ "${1:-}" == "infra" ]]; then
  shift
  ensure_infra
  "${COMPOSE[@]}" up -d "$@"
  exit 0
fi

if [[ "${1:-}" == "shell" ]]; then
  shift
  ensure_infra
  exec "${COMPOSE[@]}" run --rm "$SERVICE" bash "$@"
fi

ensure_infra
exec "${COMPOSE[@]}" run --rm "$SERVICE" "$@"
