# ralleh-agents

Ralleh agent registry and generation system.

This repository has two jobs:

1. **Generate new agents from proven templates**
2. **Store and manage customized agents** after they diverge from their template

## Structure

```text
ralleh-agents/
├── templates/                  # Source templates used to generate agents
│   └── professional-baseline/  # Imported baseline from the provided archive
├── agents/
│   ├── generated/              # Agents created from templates
│   └── custom/                 # Hand-tuned / promoted agents
├── registry/
│   ├── templates.json          # Template catalog
│   └── agents.json             # Agent catalog
├── schemas/
│   ├── template.schema.json
│   └── agent.schema.json
├── scripts/
│   ├── new-agent.js            # Generate a new agent from a template
│   └── validate-registry.js    # Basic registry validation
├── docs/
│   └── architecture.md
└── examples/
    └── agent.config.example.json
```

## Current baseline

The initial baseline was imported from the provided `professional_agent_baseline_template` archive and preserved under:

- `templates/professional-baseline/`

That template includes:

- `SOUL.md`
- `IDENTITY.md`
- `USER.md`
- `AGENTS.md`
- `TOOLS.md`
- `HEARTBEAT.md`
- `BOOTSTRAP.md`
- `MEMORY.md`
- `memory/`
- `workflows/`
- `skills_notes/`
- `docs/`
- `openclaw.json.example`
- `recommended_skills.md`

## Agent lifecycle

### 1) Generate from template

Create a new generated agent from the professional baseline:

```bash
node scripts/new-agent.js \
  --template professional-baseline \
  --id support-ops \
  --name "Support Ops" \
  --kind generated
```

This will create:

- `agents/generated/support-ops/`
- `agents/generated/support-ops/agent.json`

### 2) Customize

Adjust the generated agent's prompt files, memory, workflows, and local docs.

### 3) Promote when heavily customized

If an agent diverges too far from its source template, move it to:

- `agents/custom/<agent-id>/`

and update `registry/agents.json`.

## Rules

- **Templates stay reusable** and should not contain instance-specific secrets.
- **Generated agents** should keep `sourceTemplate` metadata.
- **Custom agents** can diverge, but still keep a valid `agent.json`.
- Prefer updating templates when improvements are broadly reusable.
- Prefer promoting to `custom` when the specialization is business-specific or no longer template-safe.

## Metadata

Each template and agent should carry structured metadata for tooling and automation.

### Template metadata

- `id`
- `name`
- `version`
- `description`
- `path`
- `baselineFiles`
- `tags`

### Agent metadata

- `id`
- `name`
- `kind`
- `sourceTemplate`
- `version`
- `status`
- `owner`
- `purpose`
- `tags`
- `path`

## Notes

This repo is intentionally repo-first and filesystem-native:

- templates are just folders
- agents are just folders
- registry files make automation easier
- scripts provide repeatable generation and validation

## Next recommended steps

- add more templates (`sales`, `support`, `research`, `engineering`)
- add placeholder rendering for more files
- add JSON schema validation
- add CI to validate registry consistency on every PR
