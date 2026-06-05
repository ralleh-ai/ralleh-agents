# ralleh-agents

Ralleh agent registry, template library, and generation system.

This repository generates and manages agents from reusable templates, with role-based skill selection sourced from `ralleh-skills`.

## Core model

An agent is composed from:
- a template
- agent metadata
- an optional role
- role-derived skills from `ralleh-skills`
- optional extra skills

## Tooling stack

The generator and registry tooling are written in TypeScript for stronger typing and maintainability.

## Repo structure

```text
ralleh-agents/
├── templates/
├── agents/
│   ├── generated/
│   └── custom/
├── registry/
├── schemas/
├── src/
│   ├── cli/
│   ├── core/
│   └── types/
├── dist/
├── examples/
└── .github/workflows/
```

## Skills source of truth

This repo does not invent its own standalone skills taxonomy.
It reads role skill definitions from:
- `ralleh-skills/agents/<role>/SKILLS.md`

Default local path:
- `~/ .openclaw/workspace/ralleh-skills`

Override with:
- `RALLEH_SKILLS_REPO=/path/to/ralleh-skills`

## Commands

Install dependencies:

```bash
npm install
```

Build:

```bash
npm run build
```

Generate from config:

```bash
npm run generate -- --config examples/agent.config.example.json
```

Promote to custom:

```bash
npm run promote -- ralleh-it-core
```

Validate registry:

```bash
npm run validate
```

## Role-aware generation

If you set:

```json
"role": "it"
```

then the generator will:
- read `ralleh-skills/agents/it/SKILLS.md`
- extract linked skills
- store them in `agent.json`
- generate `SKILLS.md`
- generate `skills.json`

## Current direction

Before adding more templates like `ops`, the skills library integration comes first. That way custom agents can be created with the correct skill set for their role.
