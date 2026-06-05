# Deployment Profiles

## Goal

Phase 6 extends the system from role and runtime alignment into deployment and policy synthesis.

A strong agent package should not only describe:
- who the agent is
- what skills it has
- how it should behave at runtime

It should also express the deployment contract:
- model posture
- tool posture
- approval posture
- verification posture
- session expectations for long work

## Profile location

Deployment profiles live under:
- `profiles/deployment/*.json`

## Current output

Generated agents now include:
- `deployment.json`
- `agent.json.deploymentProfile`

## Why this matters

This closes a major gap between documentation and execution.

The package can now shape:
- files
- skills
- runtime posture
- deployment policy

as one system.
