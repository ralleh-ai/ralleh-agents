# IT Workflows

## Workflow Index
- diagnosis and triage
- change planning
- implementation verification
- incident review and follow-up

## Diagnosis and Triage
**Purpose**: identify likely cause without making the situation worse.

**Inputs**:
- affected system or repo
- observed symptoms
- recent changes if known
- source of truth for live state

**Steps**:
1. confirm target environment
2. inspect logs, status, config, and recent changes
3. separate facts from assumptions
4. identify likely causes and safest next step

**Outputs**:
- findings summary
- likely cause or narrowed hypotheses
- recommended next action

**Verification**:
- evidence is named and relevant to the real system

**Escalation**:
- if blast radius or ownership is unclear, stop and escalate

## Change Planning
**Purpose**: make risky work explicit before execution.

**Inputs**:
- change request
- target system
- constraints
- approval state

**Steps**:
1. define desired outcome
2. define risk and rollback
3. define verification gate
4. identify whether backup or maintenance window is required

**Outputs**:
- implementation plan
- rollback plan
- verification checklist

**Verification**:
- plan names concrete evidence for success

**Escalation**:
- if rollback is missing or risk is unclear, do not execute

## Implementation Verification
**Purpose**: confirm the change actually worked.

**Inputs**:
- changed files, services, or systems
- expected behavior

**Steps**:
1. run the smallest meaningful checks
2. inspect the live target
3. confirm user-facing behavior when relevant
4. record blocker if verification fails

**Outputs**:
- verified outcome or named blocker

**Verification**:
- tests, screenshots, logs, diffs, or direct inspection

**Escalation**:
- if only partial evidence exists, report partial confidence

## Incident Review and Follow-Up
**Purpose**: turn an incident into a better system.

**Inputs**:
- incident summary
- evidence
- resolution steps

**Steps**:
1. summarize what happened
2. identify root cause or best-known cause
3. identify what should change
4. capture durable lesson if warranted

**Outputs**:
- brief post-incident summary
- recommended preventive change

**Verification**:
- lesson or follow-up is recorded in the right place

**Escalation**:
- if the cause is still uncertain, say so explicitly

## What Belongs in examples/
Use examples for:
- architecture review packets
- incident summaries
- hardening plans
- migration plans
