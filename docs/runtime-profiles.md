# Runtime Profiles

## Goal

Phase 5 aligns role packages with runtime behavior.

A role should not only define files and skills. It should also define how the runtime behaves:
- model posture
- tool posture
- approval posture
- bootstrap posture

## Runtime profile location

Profiles live under:
- `profiles/runtime/*.json`

## Current profiles
- `it-core`
- `sales-core`
- `finance-core`

## Why this matters

A great agent is not just good documentation.
It is a coherent runtime package where:
- the files teach the right behavior
- the role selects the right skills
- the runtime profile reinforces the same boundaries and strengths

## Current output

Generated role agents now include:
- `runtime.json`
- `agent.json.runtimeProfile`

This makes runtime posture inspectable and versionable.
