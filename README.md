# ralleh-agents

Ralleh agent registry, template library, and generation system.

This repository has four jobs:

1. generate new agents from reusable templates
2. store generated agents
3. promote heavily customized agents into a custom library
4. keep templates and registries validated through scripts and CI

## Structure

```text
ralleh-agents/
├── templates/
│   └── professional-baseline/
│       └── template.json
├── agents/
│   ├── generated/
│   └── custom/
├── registry/
│   ├── templates.json
│   └── agents.json
├── schemas/
├── scripts/
│   ├── new-agent.js
│   ├── promote-agent.js
│   └── validate-registry.js
├── examples/
├── docs/
└── .github/workflows/validate.yml
```

## Core flows

### 1) Generate an agent from config

```bash
node scripts/new-agent.js --config examples/agent.config.example.json
```

### 2) Generate with flags

```bash
node scripts/new-agent.js \
  --template professional-baseline \
  --id support-ops \
  --name "Support Ops" \
  --kind generated
```

### 3) Promote a generated agent to custom

```bash
node scripts/promote-agent.js support-ops
```

### 4) Validate registry integrity

```bash
node scripts/validate-registry.js
```

## Template model

Each template is a folder plus metadata file:

- template folder: reusable files to copy
- `template.json`: version, description, tags, and template metadata

The template registry in `registry/templates.json` tracks the available catalog.

## Agent model

Each agent has:

- a folder under `agents/generated/` or `agents/custom/`
- an `agent.json` manifest
- a registry record in `registry/agents.json`

Generated agents should retain `sourceTemplate` metadata.
Custom agents may diverge significantly, but should still remain valid and registered.

## Current baseline

- `professional-baseline` — a reusable, standardized operating baseline for capable agents

## Validation

Validation currently checks:
- template paths exist
- `template.json` exists for each template
- agent paths exist
- `agent.json` exists for each registered agent
- registry ids are unique
- registry and on-disk agent identity match

GitHub Actions runs validation on push and pull request.

## First real generated agent

This repo includes:
- `agents/generated/example-professional-agent/` from the initial scaffold

You can generate the next real agent instance from the config example or add new config files under `examples/`.
