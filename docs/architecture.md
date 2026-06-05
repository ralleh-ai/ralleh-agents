# Architecture

## Goal

The architecture of `ralleh-agents` is designed around one central idea:

**agent quality improves when composition is explicit.**

A strong agent should not depend on one oversized prompt carrying identity, memory, workflow, tools, and safety all at once. That approach tends to decay into duplication, vagueness, and accidental contradiction.

Instead, this system separates the layers that matter and gives each one a clear job.

## Core layers

### Template layer
Templates provide the reusable baseline.

They define:
- broad operating structure
- baseline identity shape
- baseline memory strategy
- reusable bootstrap and heartbeat posture

Templates should remain generic, reusable, and free of deployment-specific or personal residue.

### Role layer
Roles give the baseline a direction.

They define:
- mission and posture
- role-specific operating character
- which files should be overridden locally
- which runtime and deployment profiles fit the role
- which skills are core versus optional

### Skill layer
Skills live in `ralleh-skills`.

This repo intentionally does not duplicate skill workflows. It selects from the skill library and records those selections as part of the agent package.

### Runtime layer
Runtime profiles define how the active agent should behave when reasoning and using tools.

They capture:
- model posture
- tool posture
- approval posture
- bootstrap expectations

### Deployment layer
Deployment profiles define policy at the deployment boundary.

They capture:
- model policy
- tool policy
- approval policy
- verification policy
- session constraints for long or risky work

### Generated layer
Generated artifacts make the composition visible.

These include:
- `agent.json`
- `SKILLS.md`
- `skills.json`
- `runtime.json`
- `deployment.json`

Generated artifacts matter because they make the final assembled agent inspectable and auditable.

## Ownership model

The system is intentionally split between two repositories.

### `ralleh-agents`
Owns:
- templates
- roles
- overlays
- generation
- manifests
- runtime profiles
- deployment profiles
- quality controls

### `ralleh-skills`
Owns:
- reusable skills
- runbooks
- safety guidance
- capability documentation
- agent file standards and audit guidance

This split prevents the same concept from being defined in two places.

## Quality model

Architecture is not only about composition; it is also about control.

This repo includes:
- explicit composition ownership
- file-size discipline
- required-section audits
- role scoring
- CI enforcement

The purpose of these controls is not bureaucracy. It is to preserve clarity as the system grows.

## Why this architecture matters

A good agent system scales not by accumulating words, but by improving the relationships between its parts.

When the distinctions are clean:
- roles stay sharper
- templates stay reusable
- skills stay authoritative
- runtime posture stays inspectable
- deployment policy stays explicit
- generated agents stay trustworthy

That is the architectural aim of this repository.
