# TOOLS.md - Capability and Environment Notes Template

Purpose: document how tools should be used in this specific deployment.

This file should contain real environment notes, real constraints, and practical guidance. Avoid turning it into a wishlist or personal diary.

---

## 1. Tool Selection Principles
Choose tools based on:

- fitness for the task
- reliability
- speed
- cost
- security and isolation
- ease of validation

Prefer the smallest effective tool.

General pattern:

- inspect before changing
- validate after changing
- prefer structured outputs over raw dumps
- summarize long outputs before carrying them forward

---

## 2. Core Capability Categories
Document the tools actually available in this environment.

### Browser / Web Automation
Use for:
- web research
- site verification
- form interaction
- UI inspection
- travel, permit, vendor, or competitor research

Notes to capture here:
- logged-in profiles
- domain restrictions
- common gotchas
- when browser automation is overkill compared with fetch/search

### Search / Retrieval
Use for:
- factual lookup
- current information
- source discovery
- broad comparison work

Capture:
- preferred sources
- trust hierarchy
- freshness considerations

### Files / Editing / Code Execution
Use for:
- reading and editing files
- running scripts
- linting, testing, building
- local inspections and transformations

Capture:
- important working directories
- repo-specific commands
- safety checks
- validation commands

### Visual / Canvas / Diagramming
Use for:
- plans
- workflows
- architecture diagrams
- dashboards
- UI concepts

Capture:
- preferred formats
- export expectations
- when visuals are better than prose

### Communication / Messaging
Use for:
- notifications
- coordination
- follow-ups
- lightweight updates

Capture:
- approved channels
- reply etiquette
- sensitivity boundaries

### Scheduling / Heartbeat / Background Work
Use for:
- reminders
- recurring checks
- long-running workflows
- follow-up automation

Capture:
- acceptable frequency
- escalation rules
- which work should never be automated without approval

### Memory / Knowledge Systems
Use for:
- retrieving durable context
- storing lessons
- preserving task continuity
- improving future decisions

Capture:
- what belongs in daily memory
- what belongs in curated memory
- what belongs in semantic/entity systems

---

## 3. Environment-Specific Notes
Use this section for real local details.

Examples:
- infrastructure hosts and their purposes
- important repositories and paths
- cloud environments
- deployment commands
- model routing rules
- auth patterns
- network or VPN constraints
- device-specific considerations

If the template is still generic, leave this section intentionally minimal and fill it only during customization.

---

## 4. Domain Notes
Only keep domain notes that are actually useful in this deployment.

Possible domains:
- software engineering
- operations and hosting
- education finance administration
- farm or homesteading research
- travel planning
- health or peptide research with clear professional-boundary language
- content systems
- multi-agent orchestration

When adding domain guidance, distinguish:

- what the agent may research
- what the agent may organize or remind about
- what requires professional or human judgment

---

## 5. Skill Notes Discipline
For each important tool or skill, add a note under `skills_notes/` that captures:

- when to use it
- when not to use it
- authentication or setup details
- common failure modes
- token or cost tips
- validation patterns

This file should stay high-level. Deep usage details belong in `skills_notes/`.

---

## 6. Maintenance Rule
Update this file when the environment changes materially.

Good reasons to update:
- a new repo or server becomes important
- a tool is added, removed, or deprecated
- a better validation method is discovered
- a recurring gotcha appears
- a security rule changes

The goal is operational clarity, not completeness for its own sake.
