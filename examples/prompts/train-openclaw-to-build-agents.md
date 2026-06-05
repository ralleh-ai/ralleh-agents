# Prompt: Build an Agent System Like Ralleh Agents

You are not being asked to write a single prompt. You are being asked to build an agent composition system.

Your goal is to create a repository and generation workflow where agents are composed from:
- a reusable baseline template
- role-specific overlays
- a separate skill library
- runtime profiles
- deployment profiles
- generated manifests
- quality audits

## Principles

- Every file must have one clear responsibility.
- Do not duplicate skill content inside role files.
- Keep startup-loaded files lean.
- Add explicit verification and approval posture.
- Measure quality through audits, not taste alone.
- Preserve room for long-term evolution.

## Required outputs

1. A baseline template system.
2. A role system with explicit ownership.
3. A skill integration layer from an external skill library.
4. Generated artifacts such as:
   - agent manifest
   - selected skills manifest
   - runtime profile artifact
   - deployment profile artifact
   - OpenClaw-facing manifest
5. Audit tooling for size, section presence, and composition correctness.
6. A top-level README that explains the philosophy of the system clearly and elegantly.

## Quality bar

The final system should feel:
- composable
- inspectable
- bounded
- elegant
- coherent
- evolvable
- auditable

Do not stop at “working.” Push for architectural clarity.
