# WorkStation Plugin

Routes IDE agent actions to the WorkStation dev-control server for audit, approval, and live agent streaming.

SSOT remote connect: WorkStation `shared/remote_dev.yaml`, `shared/protocols/remote_dev_protocol.md`.

## Setup (operator machine / linked repo)

1. From WorkStation root: `./scripts/agent-bootstrap.sh --project <name> [--source cursor|claude|gemini|...]`
2. Source proxy env: `source <repo>/.workstation-proxy.env` (Claude Code / OpenAI-compatible IDEs)
3. Source agent env: `source <repo>/.workstation-agent.env`
4. In VS Code / Cursor: **Extensions → Install from Location** → select `workstation-plugin/`
5. MCP: configured in `.cursor/mcp.json` and `.claude/settings.json` — tool `vproject_context`
6. Ensure WorkStation is running: `./scripts/start-all.sh`

## Collaborator (GitHub clone — plugin already in repo)

1. `git clone` the product repo from GitHub (`workstation-plugin/` is committed).
2. Install IDE extension from `workstation-plugin/` (Install from Location).
3. Reach the WorkStation host over **LAN** or **VPN** (WireGuard).
4. Set agent URL (gitignored) — first match wins:

```bash
# Prefer env file at repo root (gitignored)
echo 'WORKSTATION_DEV_CONTROL_URL=http://10.50.0.2:8001' > .workstation-agent.env
# LAN example:
# echo 'WORKSTATION_DEV_CONTROL_URL=http://192.168.1.10:8001' > .workstation-agent.env
```

Or copy `config.local.json.example` → `config.local.json` (also gitignored).

Resolution order: `WORKSTATION_DEV_CONTROL_URL` → `.workstation-agent.env` → `config.local.json` → `config.json` → defaults.

Collaborators do **not** open the WorkStation dashboard or clone the WorkStation platform. Knowledge is injected via hooks/MCP only.

## CLI wrapper

```bash
./scripts/ws-agent.sh run --project <name> --source claude -- claude -p "task"
./scripts/ws-agent.sh run --project <name> --source gemini --dev-session ds-xxx -- gemini ...
./scripts/ws-agent.sh run --project <name> --source antigravity --dev-session ds-xxx -- <cmd>
```

## Config

`config.json` is generated on scaffold (localhost for operator). Override for remote with env or `config.local.json`.

## Cursor hooks

Repo `.cursor/hooks.json` points at `./workstation-plugin/cursor/scripts/` (shell/MCP gate + agent lifecycle events).
