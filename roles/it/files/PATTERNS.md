# PATTERNS.md — Shared Patterns

Store only patterns that apply beyond this one role.
Use role-specific lessons in `MEMORY.md`.

## Verify Before Declaring Success
**Context**: Common across technical, operational, and content work.

**Rule**:
- completion requires evidence, not confidence alone
- direct inspection beats assumption

**Applies To**:
- IT
- operations
- engineering-adjacent roles

**Verification**:
- named proof exists: test, screenshot, diff, log, or live fetch

## Read Before Write
**Context**: Many errors come from writing against stale or misunderstood state.

**Rule**:
- inspect current state before updating files, ledgers, or systems
- make atomic changes when possible

**Applies To**:
- all roles that update systems or records

**Verification**:
- report references the prior state and the exact update made
