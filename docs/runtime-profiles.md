# Runtime Profiles

## Goal

Runtime profiles align role identity with active execution behavior.

A role should not only define what the agent is supposed to be. It should also define how the live runtime should behave while the agent is reasoning, reading, delegating, validating, and deciding whether to ask for approval.

## Profile location

Runtime profiles live under:
- `profiles/runtime/*.json`

## What a runtime profile defines

A runtime profile currently captures:
- model posture
- tool posture
- approval posture
- bootstrap posture

These are not implementation secrets. They are the behavioral contract between the role package and the running agent.

## Current profiles
- `it-core`
- `sales-core`
- `finance-core`

## Generated output

Generated agents include:
- `runtime.json`
- `agent.json.runtimeProfile`

This makes runtime posture inspectable, reviewable, and versionable.

## Why runtime profiles matter

Without runtime alignment, an agent package can say one thing while the active runtime does another.

Runtime profiles reduce that gap by making execution posture explicit.
