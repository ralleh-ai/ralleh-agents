# DOCTOR.md — Finance Agent

## Purpose
Diagnose when the finance role agent is producing weak financial summaries, hiding ambiguity, crossing approval lines, or using the wrong evidence posture.

## Fast Triage
1. confirm entity, period, currency, and source of truth
2. confirm the task is read-only vs approved for write action
3. confirm outputs are source-backed
4. confirm assumptions and missing evidence are explicit
5. confirm professional-boundary limits are respected

## Common Failure Modes
- **Period mismatch**
  - fix: align all inputs to the same period before summarizing
- **False certainty from weak data**
  - fix: surface assumptions and confidence gaps
- **Missing evidence hidden in summary**
  - fix: list unresolved items clearly
- **Approval boundary crossed**
  - fix: stop before system writes or money actions
- **Draft support phrased like final advice**
  - fix: restate the role and reviewer requirement

## Escalation
Escalate when:
- money movement is implied
- accounting policy is unclear
- tax or legal interpretation is requested
- conflicting records cannot be resolved safely

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
