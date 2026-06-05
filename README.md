# ralleh-agents

Ralleh agent registry, template library, role system, and generation engine.

This repository exists to build agents as coherent operating systems, not as loose collections of prompts. Its purpose is to compose identity, role, memory, skills, runtime posture, and deployment policy into packages that are inspectable, auditable, and evolvable over time.

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
- runtime and deployment profiles
- agent-specific metadata and overrides

## Capability Philosophy

An ideal baseline agent is not defined by the number of features it claims, but by the quality of its internal coordination. The strongest agents are built so that identity, memory, workflow, tool choice, verification, runtime posture, and restraint all reinforce one another instead of competing for control.

A serious agent baseline should cultivate a set of mutually supporting capabilities:

- **Perception with judgment**: the agent should gather context from files, tools, memory, and live systems, but more importantly distinguish signal from noise, current truth from stale artifacts, and evidence from assumption.
- **Planning with consequence awareness**: planning is not merely sequencing steps. It is anticipating risk, naming dependencies, defining verification, and preserving rollback before confidence becomes action.
- **Execution with bounded initiative**: a good agent moves quickly on safe work and deliberately on risky work. It should know when initiative is an advantage and when restraint is intelligence.
- **Orchestration with clarity**: delegation is only useful when context, ownership, and success criteria survive the handoff. Coordination should be a first-class capability, not an improvisation.
- **Memory with selective permanence**: the system should remember what changes future behavior and let go of what merely consumes space. Durable lessons, recurring patterns, and meaningful preferences belong close at hand; noise does not.
- **Verification as a habit**: great agents do not treat verification as an afterthought. They are designed so that claims, completions, and recommendations naturally terminate in evidence.
- **Model and tool fit**: intelligence is partly choosing the right level of intelligence. The baseline should encourage model selection, tool posture, and runtime behavior that match the actual risk and complexity of the task.
- **Self-correction and evolution**: the agent should become sharper through use. Repeated failure modes, friction points, and successful patterns should leave marks on the system in the right file, workflow, or profile.
- **Safety through structure**: the ideal baseline does not depend on vague caution. It encodes boundaries in role definitions, runtime profiles, approval posture, verification gates, and deployment policy so that good behavior is the default path.

The deeper point is that excellence in agents is architectural. A powerful agent is not simply “smart.” It is composed well. It has the right distinctions between enduring and transient knowledge, between role and tool, between identity and workflow, between permission and capability, and between action and proof.

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

Role data is now owned here. The old role-agent material in `ralleh-skills/agents/*` has been phased out to avoid duplication.

## Quality and control layers

This repo now includes:
- explicit file ownership in `roles/<role>/role.json`
- role package audit tooling
- section-aware scoring (`golden`, `usable`, `bloated`, `risky`, `misplaced`)
- size-discipline checks for role overlays
- runtime profile alignment
- deployment policy synthesis
- CI validation for registry and role-package quality
