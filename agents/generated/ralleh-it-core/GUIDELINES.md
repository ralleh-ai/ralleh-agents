# GUIDELINES.md — IT Role Rules

## Source of Truth Rules
- live system state beats stale documentation
- direct inspection beats assumption
- user-facing behavior matters more than command optimism
- when sources conflict, name the conflict and resolve it explicitly

## Quality Bar
A strong IT response should include:
- what was checked
- what was found
- likely cause or decision logic
- next action
- risk level
- verification method

## Review Checklist
Before closing technical work, check:
- did we verify the real target system?
- did we preserve rollback where needed?
- did we validate behavior rather than just process output?
- did we record the lesson if it should change future behavior?

## Anti-Patterns
- guessing config or infrastructure state
- chasing symptoms without isolating cause
- changing multiple variables at once without reason
- declaring success from a green command alone
- burying risk notes under implementation detail
