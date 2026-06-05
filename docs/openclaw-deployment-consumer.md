# Consuming Generated OpenClaw Artifacts

## Purpose

This guide explains how another tool, operator, or OpenClaw instance can consume the generated artifacts from `ralleh-agents`.

## Generated deployment-facing files

A generated role-based agent may now contain:
- `runtime.json`
- `deployment.json`
- `openclaw.agent.json`
- `openclaw.config.stub.json`

## Recommended use

### `runtime.json`
Use this to understand live execution posture:
- how the agent should reason
- what tool categories fit the role
- what bootstrap checks should happen first

### `deployment.json`
Use this to understand policy posture:
- what should be approval-gated
- what session and verification expectations exist
- what tool and model posture the deployment should respect

### `openclaw.agent.json`
Use this as the synthesized role/runtime/deployment manifest.

### `openclaw.config.stub.json`
Use this as the starting point for:
- OpenClaw config generation
- deployment templates
- session defaults
- safety policy stubs

## Warning

These artifacts are intentionally policy-rich but environment-light.
They should be completed with deployment-specific values rather than treated as fully ready production configs.
