# Golden Scoring

## Purpose

Phase 4 introduces a role-package scoring model so the system can evaluate whether a role package is:
- `golden`
- `usable`
- `bloated`
- `risky`
- `misplaced`

## Current scoring rules

### Golden
- all required files present
- all required sections present
- all files under size caps
- composition ownership matches expectations

### Usable
- structurally sound, but with warnings that do not break correctness

### Bloated
- one or more files exceed the configured size caps

### Risky
- critical quality problem that compromises safe operation

### Misplaced
- file ownership or section structure is seriously wrong, suggesting content is in the wrong place

## Why this matters

Great agents are not just present; they are shaped well.

This scoring system helps enforce:
- file responsibility clarity
- size discipline
- section discipline
- composition correctness
- repeatable quality reviews
