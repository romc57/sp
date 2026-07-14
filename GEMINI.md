# VProject: sp

## Commands and deploy

{'install': 'bash scripts/dev.sh npm ci', 'dev': 'bash scripts/dev.sh npm run dev', 'test': 'bash scripts/dev.sh npm run test', 'test_e2e': 'bash scripts/dev.sh npm run test:e2e', 'lint': 'bash scripts/dev.sh npm run lint', 'build': 'bash scripts/dev.sh npm run build'}

{'provider': 'github_pages', 'script': 'infra/github-pages/deploy.sh', 'default_env': 'prod', 'env_profiles': {}}

## Skeleton

Project: sp
software_type: 
  service: app port=3000
  cmd.install: npm install
  cmd.dev: npm run dev
  cmd.test: npm test
  cmd.lint: npm run lint
  cmd.build: npm run build
  allowed_write: src/, tests/, docs/

## Software type

software_type: business_site
description: Marketing/business SPA, SEO build, Vite dev-env, Netlify deploy
patterns: seo_build_pipeline, netlify_spa_deploy, vite_dev_env_compose, rtl_i18n

## Naming

# Naming Conventions — Software Principle (SP)

SSOT for this project's code and domain vocabulary.

Platform agent terms (Valerie, VProject, CodingAgent, etc.) live in WorkStation `shared/glossary.yaml` — do not redefine them here.

## Brand

| Term | Usage |
|------|--------|
| Software Principle | Full brand name — company that represents WorkStation |
| SP | Short brand / product mark |
| WorkStation / WS | Operator platform (never on public site copy) |
| Capabilities | Public product abilities (not internals) |

## Code naming

| Area | Convention | Example |
|------|------------|---------|
| Source | `PascalCase.jsx` components, `camelCase.js` libs | `HomePage.jsx`, `pageHead.js` |
| Styles | CSS variables in `src/styles/` | `--sp-ink`, `--sp-accent` |
| Routes | kebab path segments | `/capabilities`, `/how-it-works` |
| Constants | `SCREAMING_SNAKE_CASE` | `SITE_ORIGIN` |

## Forbidden on the public site

Do not name or describe WorkStation boxes, compose services, protocols, LiteLLM, Ollama, RAG, or internal APIs in user-facing copy.


## Rules (summary)

# api-server
# api-server (LiteLLM)

- LiteLLM proxy on port 4000 — OpenAI-compatible `/v1/chat/completions`
- Config generated from `shared/providers.yaml` via `scripts/sync-config.sh`
- Do not build custom FastAPI provider SDKs or token trackers
- Future third-party providers: extend `adapters/third_party.py` only

# dashboard
# dashboard

- Vite + React + TypeScript on port 5173
- Token usage rollups and trend charts from dev-control API — no mock data in production components
- Dev board data from dev-control API only
- Tests in `src/__tests__/` with vitest

# deployment
# Deployment

- **Default deploy path**: local WorkStation workspace → project pipeline script (`infra/cicd/pipeline.sh` or `deploy.script` in project.yaml)
- **Entrypoints**: `scripts/aws/deploy.sh`, `scripts/netlify/deploy.sh` — run via `scripts/secrets.sh run`
- Never suggest GitHub Actions / `gh workflow run` as default when a local script exists
- Cloud brains advise; they do not auto-run production deploys
- SSOT: `shared/protocols/deployment_protocol.md` + `valerie/projects/<name>/protocols/deployment_protocol.md`
- Risky deploys: dev-request gateway + dashboard approval (`shared/dev_requests.yaml`)

# dev-control
# dev-control

- Enforce `shared/security.yaml` in `tools/executor.py` — no direct shell without gate
- All callable tools registered in `tools/registry.py`
- FastAPI on port 8001 — see box README for endpoint contract
- Runtime probes read `shared/services.yaml` only — no ad-hoc port lists
- Test jobs persist to `logs/runtime/test-jobs.json` (metadata + scrubbed logs)

# dev-requests
# Dev Request Gateway

When the project has `workstation-plugin/` scaffolded, agents must route actions through the WorkStation dev-control gateway.

- Do not bypass `POST /api/dev/requests` for shell, file writes, deploy, or MCP calls
- Risky actions block until approved in the dashboard (`/requests` or Project Summary)
- Safe reads may auto-approve but are still audited
- Never include secret values in request payloads

Config SSOT: `shared/dev_requests.yaml`, `shared/paths.yaml`

# environments
# Environments

SSOT: [shared/protocols/environment_protocol.md](shared/protocols/environment_protocol.md).

- WorkStation boxes run via root `docker-compose.dev.yml` (profile `dev`) — **not** host pip/npm/pytest/vitest for box code.
- VProject app code runs in project compose / `dev-env.sh` stacks (`ws-{project}`).
- Install packages only inside their service or package context (container, compose volume `node_modules`, project venv in compose).

## Tests (agents)

| Context | Run | Never |
|---------|-----|-------|
| Platform boxes | `bash scripts/test-all.sh` or `{box}/scripts/test.sh` | Host `pytest`, `npm test`, `vitest` in box dirs |
| dashboard | `docker exec dashboard npm test` | `cd dashboard && npm test` |
| dev-control / integration | `bash dev-control/scripts/test.sh` | `python3 -m pytest` on host |
| Linked VProject with compose | `bash scripts/dev.sh …` | Host `npm instal

## Skills

## Software type
software_type: business_site
description: Marketing/business SPA, SEO build, Vite dev-env, Netlify deploy
patterns: seo_build_pipeline, netlify_spa_deploy, vite_dev_env_compose, rtl_i18n

## Skills index
- global/add-provider: Add a new LLM provider or third-party brain. Use when registering Cursor or new cloud APIs.
- global/agent-efficiency: Retrieval hygiene, output budgeting, and retry discipline when developing WorkStation boxes.
- global/aws-deploy: Deploy linked WorkStation projects to AWS. Use for ECR, ECS, Lambda, S3, CloudFront deploys via project pipeline scripts
- global/brain-routing: When to use Valerie local brain (Ollama) vs API brain (Claude) — LocalFirst, CloudOnDemand. Use for brain tiering, promp
- global/browser-console: Local headless browser capture and GPU VLM UI/UX debug for project dev-env. Use during test iterations instead of cloud 
- global/debug-cross-box: Debug failures spanning multiple WorkStation boxes.
- global/evaluate-oss: Evaluate open-source tools before building custom infrastructure. Use when adding vaults, crypto, CLIs, schedulers, or s
- global/home-control: Start and operate Valerie Personal Assistant mode — Home Assistant hub, Frigate cameras, home tools. Use for LG TV, Tapo
- global/netlify-deploy: Deploy linked WorkStation business_site projects to Netlify. Use for static SPA + Netlify Functions deploys via project 
- global/onboard: Onboard to this linked project. Use when starting work on a new repo in WorkStation.
- global/run-box-tests: Run tests for WorkStation boxes. Use for CI, pre-commit, or verifying changes.
- global/start-workstation: Start all WorkStation boxes in order. Use when starting dev environment or docker-compose.
- global/tool-sessions: Connect and refresh per-project tool credential sessions (AWS, Google, Netlify). Option C+ — dev-control orchestrates; a
- global/work-with-boxes: Work across WorkStation boxes. Use when adding features spanning multiple directories.
- global/work-w

No native hooks — use MCP vproject_context for task-filtered depth.
## Secrets

Never read `.env`, `secrets/`, or `*.env.sops`. Run commands via `scripts/secrets.sh run --scope auto --`. Status only via dev-control `/api/secrets/hub/*` (metadata).
