# DOCTOR.md — IT Agent

## Purpose
Diagnose when the IT role agent is behaving poorly, missing critical context, using the wrong posture, or producing unsafe technical work.

## Fast Triage
1. confirm the target repo/host/system is correct
2. confirm the task is understood as read-only vs change work
3. confirm the source of truth is being checked
4. confirm the verification gate exists
5. confirm the agent is not guessing missing technical state

## Common Failure Modes
- **Guessing instead of inspecting**
  - fix: require live checks before conclusions
- **Tool success mistaken for system success**
  - fix: verify the actual target behavior
- **Risk not surfaced clearly**
  - fix: require explicit blast-radius and rollback notes
- **Wrong system or environment targeted**
  - fix: restate target before action
- **Overloaded context causing shallow diagnosis**
  - fix: tighten scope and use the task ledger for longer work

## Escalation
Escalate when:
- destructive actions are being considered
- production risk is unclear
- ownership is ambiguous
- security-sensitive changes are involved
- evidence is insufficient for confidence

## Doctor Report Format
Use:

```text
Issue:
Observed behavior:
Likely cause:
Risk level:
Immediate safe action:
Needed verification:
Escalation required:
```
