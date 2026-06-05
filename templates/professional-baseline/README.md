# Professional Agent Baseline Template

A reusable, production-grade starting point for capable agents.

## Goal

This template provides a clean baseline for agents that need to:

- analyze well
- plan clearly
- execute or orchestrate safely
- track work reliably
- remember relevant context
- improve over time
- operate within explicit boundaries

It is intentionally framework-friendly and user-agnostic. Customize it for a specific person, team, or business by editing `USER.md`, `TOOLS.md`, and any domain workflows.

## Design Principles

- **Lean identity, rich operating system**: `SOUL.md` defines identity and voice; `AGENTS.md` defines process and discipline.
- **Memory with layers**: daily logs, curated long-term memory, and optional semantic/entity memory.
- **Verification before claims**: important outputs should be checked before they are declared complete.
- **Bounded autonomy**: the agent should move fast on safe work and pause on high-impact work.
- **Reusable by default**: no irrelevant personal references, hype text, or environment assumptions.
- **Evolvable over time**: workflows, notes, and lessons should improve through use.

## What This Template Includes

- `SOUL.md` — identity, tone, principles, limits
- `IDENTITY.md` — quick self-reference
- `USER.md` — structured facts about the user or organization served
- `AGENTS.md` — core operating protocol
- `TOOLS.md` — capability map and environment notes
- `HEARTBEAT.md` — scheduled maintenance and follow-up behavior
- `BOOTSTRAP.md` — setup and reset protocol
- `MEMORY.md` — curated long-term context
- `memory/` — daily notes
- `workflows/` — reusable playbooks
- `skills_notes/` — per-skill notes and gotchas
- `docs/` — supporting documentation
- `openclaw.json.example` — example config
- `recommended_skills.md` — suggested capabilities to add

## Recommended Workspace Layout

```text
workspace/
├── SOUL.md
├── IDENTITY.md
├── USER.md
├── AGENTS.md
├── TOOLS.md
├── HEARTBEAT.md
├── BOOTSTRAP.md
├── MEMORY.md
├── memory/
├── workflows/
├── skills_notes/
├── docs/
└── openclaw.json.example
```

## Quick Start

1. Create or select the target workspace.
2. Copy this baseline into the workspace.
3. Customize `USER.md` first.
4. Review `TOOLS.md` for actual environment specifics.
5. Run the setup process in `BOOTSTRAP.md`.
6. Validate behavior with a low-risk task.
7. Commit the baseline to git.

## Customization Guidance

### `USER.md`
Use this file for durable facts that materially improve judgment. Good examples:

- business and project context
- communication preferences
- decision boundaries
- known compliance or risk areas
- personal planning context that the agent may help with

Example categories that may belong there when relevant:

- farm, homesteading, travel, permits, resin preservation, or food business planning
- education finance tracking and tax-document reminders
- project context such as Focusor.ai, Pledgebook, Affilio, FocusPanel, Engram, OpenClaw custom UIs, and multi-agent systems
- peptide or health research interests, with strict medical-boundary language

### `TOOLS.md`
Use this for actual environment details, not aspirational ones:

- real infrastructure
- real repos and services
- real auth patterns
- real platform constraints
- known skill/tool gotchas

### `AGENTS.md`
Keep it practical. It should be an operating manual, not a manifesto.

## Baseline Quality Bar

A good baseline should be:

- reusable across users
- specific enough to guide behavior
- free of irrelevant personal references
- free of hype or gimmick copy
- opinionated about quality, safety, and verification
- easy to customize without rewriting from scratch

## Maintenance

Review the baseline periodically and improve it when patterns emerge:

- repeated failures
- missing workflow steps
- stale tool assumptions
- weak validation gates
- unnecessary verbosity

When the baseline changes materially, commit it with a clear message and note what improved.
