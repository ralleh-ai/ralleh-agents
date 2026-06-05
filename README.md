# ralleh-agents

Ralleh Agents is the system for designing, composing, generating, auditing, and evolving serious AI workers.

It is not a pile of prompts.
It is not a folder full of personalities.
It is not a loose set of markdown files hoping a model will “figure it out.”

It is an attempt to treat agents as engineered operating systems: structured enough to be trustworthy, flexible enough to adapt, and disciplined enough to improve over time.

## What this tool is for

This repository exists to answer a hard question well:

**How do you create agents that are useful, bounded, inspectable, and evolvable — without making them bloated, inconsistent, or reckless?**

The answer in this repo is composition.

A strong agent is not written once in a giant file. It is composed from layers that each have a clear job:

- baseline identity and operating discipline
- role-specific posture and responsibility
- approved skills and workflows
- memory and pattern retention
- runtime posture
- deployment policy
- generated manifests that make the whole package inspectable

That layered design is what lets an agent remain coherent as it becomes more capable.

## What an agent is here

In `ralleh-agents`, an agent is a working package made from coordinated parts.

At minimum, an agent is composed from:
- a **template**
- a **role**
- a **skill selection** sourced from `ralleh-skills`
- a **runtime profile**
- a **deployment profile**
- a generated set of manifests and artifacts

This is the core idea:

```text
Agent = template + role + skills + runtime posture + deployment policy + generated manifests
```

That may sound formal, but the payoff is practical:
- the agent can be audited
- the agent can be regenerated
- the agent can be improved without becoming chaotic
- the system can tell where a rule belongs and where it does not

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

## Ownership split

The system is intentionally split across two repositories.

### `ralleh-agents`
This repo owns:
- templates
- roles
- generated agents
- custom agents
- role overlays
- manifests and registries
- runtime and deployment profiles
- quality and scoring controls

### `ralleh-skills`
That repo owns:
- reusable skills
- golden runbooks
- workflow guidance
- safety boundaries
- capability documentation
- agent file standards and evaluation guidance

This split matters. It prevents duplication and forces the system to keep a clean distinction between:
- **what an agent is**
- **what an agent knows how to do**

## How composition works

The system composes agents from layers with explicit ownership.

### Template layer
Templates define the reusable baseline.

They provide:
- baseline identity structure
- baseline operating protocol
- baseline memory strategy
- baseline bootstrap and heartbeat behavior

Templates should stay generic, reusable, and free of irrelevant personal specifics.

### Role layer
Roles define posture, mission, and domain-specific operating character.

A role decides:
- how an IT agent differs from a Sales or Finance agent
- what kind of judgment it should optimize for
- which files should be role-specific overlays
- which runtime and deployment profiles fit that role

### Skill layer
Skills come from `ralleh-skills`.

A role does not reimplement the skill library. It selects from it.

That means a role says:
- these skills are core
- these skills are optional
- these are the safe and expected capabilities for this worker

### Runtime layer
Runtime profiles define how the agent should behave while active.

They specify:
- model posture
- tool posture
- approval posture
- bootstrap expectations

### Deployment layer
Deployment profiles define how the agent should be governed when deployed.

They specify:
- model policy
- tool policy
- approval policy
- verification policy
- session expectations

### Generated layer
The generator emits derived artifacts such as:
- `agent.json`
- `SKILLS.md`
- `skills.json`
- `runtime.json`
- `deployment.json`

These are valuable because they make the final package inspectable rather than implicit.

## Repository structure

```text
ralleh-agents/
├── templates/               # reusable baseline templates
├── roles/                   # role definitions and role-specific overlays
├── profiles/
│   ├── runtime/             # runtime posture profiles
│   └── deployment/          # deployment and policy profiles
├── agents/
│   ├── generated/           # generated agents
│   └── custom/              # promoted/customized agents
├── registry/                # template and agent catalogs
├── schemas/                 # template, role, and agent schemas
├── src/                     # TypeScript generator and validation tooling
├── docs/                    # supporting architecture and policy docs
└── examples/                # example generation configs
```

## Current roles

The current first-class roles are:
- `it`
- `sales`
- `finance`

These roles have been rebuilt to the current golden standard and currently pass the role audit as `golden`.

## What generated agents include

A generated role-based agent may include:
- baseline template files
- role overlay files
- generated `SKILLS.md`
- generated `skills.json`
- generated `runtime.json`
- generated `deployment.json`
- generated `agent.json`

This means the package describes not just its text, but its behavior contract.

## Commands

Install dependencies:

```bash
npm install
```

Build the TypeScript tooling:

```bash
npm run build
```

Generate an agent from config:

```bash
npm run generate -- --config examples/agent.config.example.json
```

Promote a generated agent to custom:

```bash
npm run promote -- ralleh-it-core
```

Validate registry integrity:

```bash
npm run validate
```

Audit role packages:

```bash
npm run audit:roles
```

## Quality system

This repo does not rely on taste alone.
It includes explicit quality controls.

### Role audit
Role overlays are checked for:
- required file presence
- required sections
- composition ownership
- file-size discipline

### Golden scoring
Role packages are scored as:
- `golden`
- `usable`
- `bloated`
- `risky`
- `misplaced`

The point of scoring is not vanity. It is to create a common standard for quality and keep the system from silently drifting downward.

### CI enforcement
GitHub Actions runs:
- registry validation
- role audits

That means the repo is protected from accidental structural decay.

## Why the files matter

One of the central beliefs in this project is that every file must earn its place.

A good agent system does not let files blur together.

- `SOUL.md` should shape identity and behavioral gravity
- `IDENTITY.md` should sharpen mission and authority
- `AGENTS.md` should govern orchestration and execution discipline
- `GUIDELINES.md` should define quality and source-of-truth rules
- `TOOLS.md` should describe environment-specific leverage and caveats
- `WORKFLOWS.md` should make repeatable excellence executable
- `DOCTOR.md` should help diagnose role failure safely
- `MEMORY.md` should preserve durable lessons
- `PATTERNS.md` should capture cross-role reusable behaviors
- `USER.md` should align the package to the user or organization without becoming biography

This discipline is how the system stays powerful without becoming bloated.

## Design philosophy in plain terms

If a traditional prompt tries to carry everything in one place, it eventually becomes muddy.

This project takes the opposite approach.
It separates concerns so the agent can be rich without becoming tangled.

The goal is not maximal documentation.
The goal is maximal coherence.

That means:
- fewer duplicated ideas
- clearer ownership
- smaller startup surfaces
- better evolution over time
- better safety by default
- better inspectability for humans

## Supporting docs

For deeper detail, see:
- `docs/architecture.md`
- `docs/composition.md`
- `docs/runtime-profiles.md`
- `docs/deployment-profiles.md`
- `docs/golden-scoring.md`
- `docs/templates.md`

## Direction

This repo is now the source of truth for Ralleh agent identity and composition.

The long-term direction is straightforward:
- make the generated agent package increasingly deployment-ready
- keep role quality measurable
- preserve clean boundaries between role, skill, runtime, and policy
- make improvement systematic rather than accidental

A great agent is not an accident of wording.
It is the result of a well-composed system.
