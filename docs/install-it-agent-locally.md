# Install the IT Agent Locally

## Purpose

This guide teaches another OpenClaw-capable agent or operator how to install the Ralleh IT agent on a local system using `ralleh-agents` and `ralleh-skills`.

The goal is not just to copy files. The goal is to reproduce the composed package correctly:
- baseline template
- IT role overlay
- approved skills
- runtime profile
- deployment profile
- generated OpenClaw manifests

## Prerequisites

You need:
- a local clone of `ralleh-agents`
- a local clone of `ralleh-skills`
- Node.js 22+
- npm
- an OpenClaw environment where generated artifacts can be consumed or adapted

## Local setup

```bash
git clone git@github.com:ralleh-ai/ralleh-agents.git
git clone git@github.com:ralleh-ai/ralleh-skills.git
cd ralleh-agents
npm install
npm run build
```

If `ralleh-skills` is not in the default sibling/workspace location, set:

```bash
export RALLEH_SKILLS_REPO=/absolute/path/to/ralleh-skills
```

## Inspect available roles and templates

```bash
node dist/cli/list-roles.js
node dist/cli/list-templates.js
```

## Create a starter IT config

```bash
node dist/cli/scaffold-config.js my-it-agent.json it
```

Edit `my-it-agent.json` and fill in:
- agent id
- agent name
- client/organization name
- timezone
- role description
- projects summary
- any optional or extra skills

## Generate the IT agent

```bash
node dist/cli/new-agent.js --config my-it-agent.json
```

This produces a generated package under:

```text
agents/generated/<your-agent-id>/
```

## What gets generated

A generated IT package should include:
- role overlay files such as `README.md`, `SOUL.md`, `AGENTS.md`, `TOOLS.md`, `WORKFLOWS.md`
- `SKILLS.md`
- `skills.json`
- `runtime.json`
- `deployment.json`
- `openclaw.agent.json`
- `openclaw.config.stub.json`
- `agent.json`

## Validate the repo state

```bash
node dist/cli/validate-registry.js
node dist/cli/audit-roles.js
```

## Adapt for local OpenClaw

Use these generated files as the source material for your local OpenClaw setup:

- `runtime.json` for runtime posture
- `deployment.json` for policy expectations
- `openclaw.agent.json` for a synthesized agent manifest
- `openclaw.config.stub.json` for a deployment-ready config starting point

The stub is not a final environment-specific config. It must still be adapted to your local model aliases, tool permissions, and deployment details.

## Success criteria

A correct local installation should give you:
- an IT role package with explicit file ownership
- approved skill selection from `ralleh-skills`
- generated runtime and deployment artifacts
- OpenClaw-facing manifest/config stubs
- passing validation and role audit

## Golden rule

Do not install the IT agent by manually copying random files into a workspace and hoping they cohere. Generate it from composition so identity, role, skills, runtime, and policy stay aligned.
