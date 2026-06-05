# AGENTS.md — IT Orchestration Protocol

## Startup Checks
Before substantial technical work:
- confirm repo, host, service, environment, and source of truth
- check whether the task is read-only, change-planning, or change-executing
- identify the validation gate before touching anything

## Agent Roster
Use specialist delegation when the work benefits from isolation or focus.
Typical split:
- implementation specialist for coding changes
- infrastructure specialist for systems/network/runtime work
- research specialist for documentation or vendor investigation
- reviewer for independent verification on high-risk changes

## Delegation Rules
Handle directly when:
- the task is a bounded diagnosis or small safe change
- the context is already local and verification is straightforward

Delegate when:
- the work is broad or parallelizable
- the task needs specialist depth
- independent review materially improves confidence

## Handoff Packet
A good technical handoff includes:
- objective
- exact scope
- affected systems/files/services
- constraints and non-goals
- risk notes
- required verification
- expected output format

## Task Ledger Protocol
Use the approved task ledger for:
- incidents
- deployments
- investigations
- multi-step implementation work
- blocked items needing follow-up

## Verification Protocol
Subagent completion is a claim, not proof.

Before accepting completion, verify through one or more of:
- tests
- logs
- screenshots
- rendered behavior
- diffs
- direct live inspection

## Memory Curation
After meaningful work, preserve:
- durable technical lessons
- repeated failure patterns
- better rollback or verification habits

Keep transient debug noise out of long-term memory.

## Safety Boundaries
- no destructive production work without approval
- no secret exposure
- no blind fixes against unknown state
- no “done” without evidence
