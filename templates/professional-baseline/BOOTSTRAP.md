# BOOTSTRAP.md - Baseline Setup and Reset Protocol

Purpose: bring a new or existing workspace onto this baseline cleanly and repeatably.

Use this when:
- setting up a new agent workspace
- refreshing an older workspace
- recovering after drift or partial corruption
- standardizing a deployment before real work begins

This process is mostly read, create, and verify. Destructive cleanup should always be confirmed first.

---

## Phase 1: Prepare the Workspace
1. Confirm the target workspace path.
2. Create core directories if they do not exist:

```bash
mkdir -p memory workflows skills_notes docs
```

3. Initialize git if needed.
4. Ensure the main branch exists.
5. Add a sensible `.gitignore`.
6. Do not ignore the prompt and memory markdown files that define the agent.

---

## Phase 2: Install the Baseline Files
Ensure the following files are present and reviewed:

- `SOUL.md`
- `IDENTITY.md`
- `USER.md`
- `AGENTS.md`
- `TOOLS.md`
- `HEARTBEAT.md`
- `BOOTSTRAP.md`
- `MEMORY.md`

Also ensure these directories exist:

- `memory/`
- `workflows/`
- `skills_notes/`
- `docs/`

Create today’s daily memory file if needed and add a bootstrap note.

---

## Phase 3: Customize the Deployment
### 3.1 Customize `USER.md`
This is the highest-value customization step.

Fill in:
- who the agent serves
- communication preferences
- decision boundaries
- durable project context
- domain context that materially improves judgment

Good examples include:
- software and product portfolios
- operations and hosting
- farm, travel, education, or planning context
- health-research boundaries
- important security posture notes

### 3.2 Customize `TOOLS.md`
Replace generic notes with real environment specifics:

- actual repos
- actual hosts
- actual services
- actual model routing
- actual validation commands
- actual security constraints

### 3.3 Customize workflows and skill notes
If there are recurring workflows or tools in this environment, document them now or as soon as they stabilize.

---

## Phase 4: Configure Memory
1. Ensure daily memory logging works.
2. Seed `MEMORY.md` with only durable high-signal context.
3. If semantic/entity memory exists, connect it and verify retrieval works.
4. Keep the responsibilities clear:
   - daily memory = recent activity and progress
   - curated memory = durable facts and lessons
   - semantic/entity memory = deeper recall and cross-session linkage

---

## Phase 5: Verify Core Behavior
Run a low-risk validation pass.

The agent should be able to:
- read all core files
- summarize who it serves and how it should operate
- describe its boundaries clearly
- locate important environment details
- record a basic memory update safely
- complete a simple task with a visible validation step

If any of those fail, fix the baseline before relying on it.

---

## Phase 6: Commit the Baseline
When the workspace is clean and the baseline is verified:

```bash
git add .
git commit -m "Initialize agent baseline"
```

If appropriate, add a private remote backup.

---

## Refresh / Reset Guidance
If you are applying the baseline to an older workspace:

1. read the current files first
2. diff before replacing
3. preserve durable user-specific context
4. avoid wiping memory without confirmation
5. verify behavior after the refresh

---

## Completion Standard
The baseline is ready when:

- the files are in place
- the user context is real and useful
- tool notes reflect reality
- memory layers are working
- a low-risk validation task succeeds
- the workspace is committed to git

A good bootstrap produces a reliable starting point, not just a copied folder.
