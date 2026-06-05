# Deployment Profiles

## Goal

Deployment profiles extend the system from role and runtime alignment into deployable policy.

They define the policy contract that should govern a deployed agent package.

## Profile location

Deployment profiles live under:
- `profiles/deployment/*.json`

## What a deployment profile defines

A deployment profile currently captures:
- session policy
- model policy
- tool policy
- approval policy
- verification policy

This moves the system closer to a deployable operating contract rather than a descriptive file set.

## Current output

Generated agents include:
- `deployment.json`
- `agent.json.deploymentProfile`

## Why deployment profiles matter

A good agent can still be deployed badly.

Deployment profiles help reduce that risk by making expectations explicit:
- what kind of model posture fits the role
- what tool actions are expected or blocked
- where approval must intervene
- what counts as acceptable verification

This is one of the places where the repository shifts from documentation toward operational policy.
