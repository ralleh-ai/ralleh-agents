# Teaching Another OpenClaw Instance to Build Agents Like This

## Purpose

This guide is for another OpenClaw instance that needs to create a serious agent system for itself using the same principles as `ralleh-agents`.

The aim is not to copy wording blindly. The aim is to reproduce the architecture:
- clear file ownership
- clear role ownership
- externalized skill library
- explicit runtime and deployment posture
- measurable quality controls

## Core teaching principles

When training another OpenClaw instance, teach these truths clearly:

1. An agent is a composed operating system, not a giant prompt.
2. Every file must have one clear job.
3. Skills belong in a skill library, not duplicated inside agent identity files.
4. Role, runtime, and deployment policy should be explicit.
5. Verification must be structural, not aspirational.
6. Memory should preserve durable behavior-changing lessons, not noise.
7. Good agents are evolved through disciplined iteration, not random accretion.

## What the other instance should build

At minimum, instruct it to create:
- a reusable baseline template
- role definitions
- role overlay files
- a separate skill library or skill catalog dependency
- generation tooling
- quality audits
- runtime profiles
- deployment profiles

## Recommended workflow

1. Define the baseline template.
2. Separate role overlays from template files.
3. Keep skills in a separate reusable library.
4. Generate agents from composition, not copy-paste.
5. Audit file sizes, ownership, and sections.
6. Add runtime posture.
7. Add deployment posture.
8. Regenerate and validate repeatedly.

## Teaching prompt

Use the companion prompt file in `examples/prompts/train-openclaw-to-build-agents.md` when you want another OpenClaw instance to perform this work directly.
