---
name: agent-efficiency
description: Retrieval hygiene, output budgeting, and retry discipline for IDE CodingAgents on this project.
---

# Agent efficiency

## Retrieval hygiene

- Search before re-reading the same file; prefer one scoped read with line range.
- Reuse prior tool results in the same session instead of duplicate reads.

## Output budget

- Cap shell and test output (use `head`, `--max-count`, quiet flags).
- Summarize large logs; do not paste full build output into chat.

## Retry breaker

- One local retry on failure; then escalate or ask the human.
- Do not loop the same failing command more than twice without changing approach.

## Session hygiene

- Keep context lean: avoid loading unrelated rules or skills.
- End sessions when the task is done instead of accumulating dead context.
