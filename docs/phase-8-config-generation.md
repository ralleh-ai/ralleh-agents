# Phase 8: OpenClaw Config Generation

## Goal

Phase 8 moves the system one step closer to real deployment by generating OpenClaw-ready config stubs from the role, runtime, and deployment stack.

## New generated artifact

Role-based generated agents now include:
- `openclaw.config.stub.json`

## What it contains

The config stub currently synthesizes:
- primary/fallback model aliases
- default reasoning posture
- suggested OpenClaw tool allowlist
- approval mode and blocked actions
- bootstrap expectations
- verification expectations

## Why this matters

This artifact turns the system from a policy-and-design generator into a deployment-assist generator.

It is still a stub, not a full environment-specific config, but it reduces the distance between:
- architecture
- generated package
- deployable OpenClaw configuration
