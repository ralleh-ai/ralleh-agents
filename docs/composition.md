# Composition Model

## Goal

Every file in an agent package should have a clear owner, a clear reason to exist, and a clear relationship to the rest of the system.

Composition is how this repository prevents agent packages from collapsing into duplication and ambiguity.

## Composition sources

This system currently uses three file-ownership sources:

- **template** — reusable baseline files shared across roles
- **role-overlay** — role-specific files that shape mission, posture, and behavior
- **generated** — files created from composition outputs such as selected skills and policy profiles

## Ownership rules

### Template-owned
These usually come from the baseline template:
- `BOOTSTRAP.md`
- `HEARTBEAT.md`
- `recommended_skills.md`
- `openclaw.json.example`

### Role-overlay-owned
These are usually role-specific:
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
These are emitted during generation:
- `SKILLS.md`
- `skills.json`
- `runtime.json`
- `deployment.json`
- `agent.json`

## Why the ownership split matters

Without ownership boundaries, the system starts to repeat itself:
- templates begin carrying role specifics
- roles start duplicating skill runbooks
- generated files begin pretending to be authored files
- docs drift apart in meaning

A clean composition model prevents that.

## Audit expectation

A role package should be auditable for:
- required file presence
- ownership correctness
- section discipline
- size discipline
- generation compatibility

Composition is not just about assembling files. It is about preserving coherence while the system grows.
