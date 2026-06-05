# Phase 7: OpenClaw Manifest Synthesis

## Goal

Phase 7 closes the loop between repository composition and OpenClaw-facing deployment artifacts.

Generated agents now emit an `openclaw.agent.json` manifest that synthesizes:
- role identity
- selected skills
- runtime posture
- deployment posture
- bootstrap expectations
- model/tool/approval/verification contract

## Why this matters

This is the point where the repository starts producing deployment-facing intent rather than only human-readable design files.

The manifest is not a full OpenClaw runtime config, but it is a durable policy stub that another tool or deployment layer can consume.

## Output

Generated role-based agents now include:
- `openclaw.agent.json`

This artifact is the bridge between:
- authored architecture
- generated package
- runtime/deployment integration
