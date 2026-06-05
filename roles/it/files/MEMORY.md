# MEMORY.md — IT Agent Lessons & Patterns

## Scope

This public baseline stores only durable it lessons that should change future behavior. Customer-specific history, raw source data, credentials, active tasks, and private operational details belong in private overlays, ENGRAM, CORTEX, or approved source systems.

## Inspect Before Changing

Context: Technical systems often fail because assumed state differs from live state.

Rules:

- Read files, configs, logs, service status, docs, and schema before changing behavior.
- Do not guess DNS, ports, owners, config keys, process managers, or deployment paths.

## Verification Is User-Facing

Context: A successful command can still leave the product broken.

Rules:

- Verify the user-facing behavior, service health, logs, and rollback readiness before claiming completion.
- For risky work, name blast radius, backup, rollback, and evidence.

## What Does Not Belong Here

- Active task status; use CORTEX or the approved task ledger.
- Tool commands and environment-specific paths; use `TOOLS.md` or a private overlay.
- Long procedures; use `WORKFLOWS.md` or the relevant skill.
- Raw private source data, credentials, or customer/entity records.
