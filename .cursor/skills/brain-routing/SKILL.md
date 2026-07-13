---
name: brain-routing
description: When to use Valerie local brain (Ollama) vs API brain (Claude) — LocalFirst, CloudOnDemand.
---

# Brain routing

SSOT: WorkStation `shared/valerie_brains.yaml` (`local_first`), `shared/routing.yaml`.

**Local first** — default for plan/fix/coding and black work (Ollama orchestrator).

**Cloud on demand** — API (`ws-claude-sonnet`) only via `brain_override`, `escalate_brain`, or `VALERIE_USE_CLOUD=1`.
