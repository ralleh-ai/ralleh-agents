# Composition Model

## Goal

Every file in an agent package should have a clear owner and a clear reason to exist.

This repo uses three composition sources:

- **template** — reusable baseline shared across roles
- **role-overlay** — role-specific behavior and operating posture
- **generated** — files created by the generator from role/template/skill selection

## Ownership Rules

### Template-owned
These should usually come from the base template:
- `BOOTSTRAP.md`
- `HEARTBEAT.md`
- `recommended_skills.md`
- `openclaw.json.example`

### Role-overlay-owned
These should usually be role-specific:
- `README.md`
- `SOUL.md`
- `IDENTITY.md`
- `AGENTS.md`
- `TOOLS.md`
- `DOCTOR.md`
- `GUIDELINES.md`
- `WORKFLOWS.md`
- `MEMORY.md`
- `USER.md`
- `PATTERNS.md`

### Generated
These are produced during composition:
- `SKILLS.md`
- `skills.json`
- `agent.json`

## Why this matters

This split prevents duplication and keeps each file optimized:
- template files stay reusable
- role files stay role-specific
- generated files stay factual and derived

## Audit expectation

A role package should be auditable for:
- required file presence
- composition ownership correctness
- size discipline
- section discipline
- generation compatibility
