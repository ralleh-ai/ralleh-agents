# ralleh-agents

Ralleh agent registry, template library, role system, and generation engine.

## Ownership split

### `ralleh-agents`
Owns:
- templates
- roles
- generated agents
- custom agents
- role composition
- agent manifests and registry

### `ralleh-skills`
Owns:
- reusable skills
- golden runbooks
- capability documentation
- workflow and safety guidance

This prevents duplication.

## Composition model

An agent is composed from:
- a template
- a local role definition in `roles/`
- selected skills from `ralleh-skills`
- agent-specific metadata and overrides

## Current roles
- `it`
- `sales`
- `finance`

## Commands

```bash
npm install
npm run build
npm run generate -- --config examples/agent.config.example.json
npm run promote -- ralleh-it-core
npm run validate
```

## Skills integration

The generator resolves skill names from `ralleh-skills`.

Default location:
- `~/ .openclaw/workspace/ralleh-skills`

Override with:
- `RALLEH_SKILLS_REPO=/path/to/ralleh-skills`

## Direction

Role data is now owned here. The old role-agent material in `ralleh-skills/agents/*` should be treated as legacy and phased out to avoid duplication.

## Phase 3 controls

This repo now includes:
- explicit file ownership in `roles/<role>/role.json`
- role package audit tooling
- size-discipline checks for role overlays
- CI validation for registry + role package quality
