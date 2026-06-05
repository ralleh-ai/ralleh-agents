# BOOTSTRAP.md - Professional Baseline Initialization & Reset Protocol

**Purpose**: One-time (or reset) setup to bring a new or existing OpenClaw workspace to this professional baseline standard. Covers directory structure, git, core files, skill installation guidance, Engram integration, security hardening reminders, initial memory seeding, and verification. 

**When to Run**: 
- First time setting up this baseline for a new agent/workspace (e.g., dedicated "Ralleh Core" or team agent).
- After major workspace reset or corruption.
- Periodically (e.g., quarterly) as a "full professional refresh" to ensure all components are current and optimized.
- Trigger via: "Read BOOTSTRAP.md and execute the full professional baseline initialization protocol step by step. Confirm and pause at major sections for approval."

**Safety**: This is mostly read/create operations. Destructive steps (e.g., clean old memory) require explicit confirmation. Git protects history.

---

## Phase 1: Workspace Foundation (Do First)
1. **Verify/Create Workspace**:
   - Confirm current working dir is the target workspace (e.g., `~/.openclaw/workspace` or per-agent path).
   - If new: `mkdir -p ~/.openclaw/workspace && cd ~/.openclaw/workspace`
   - Create standard dirs if missing:
     ```bash
     mkdir -p memory workflows skills_notes docs
     ```

2. **Git Initialization & Protection** (Critical for Versioned Prompts/Memory):
   - `git init` (if not already).
   - `git checkout -b main` or ensure on main branch.
   - Add `.gitignore` if needed (e.g., ignore large binaries, temp files, but **never** ignore memory/ or the .md prompt files — they are the agent's brain).
   - Initial commit example after files are in place: `git add . && git commit -m "Initialize Ralleh Core professional baseline v1.0"`
   - **Recommendation**: Add private remote (GitHub/GitLab self-hosted or encrypted backup) for offsite versioning of prompts and memory. Or rsync to secure NAS/VPS.

3. **Copy/Verify Core Baseline Files**:
   - Ensure present and up-to-date:
     - SOUL.md, IDENTITY.md, USER.md (customize USER.md with accurate current facts), AGENTS.md, TOOLS.md, HEARTBEAT.md, BOOTSTRAP.md (this file).
   - If updating from older version: Review diffs, test on low-stakes tasks, commit with clear message.
   - Seed initial structures:
     - Create today's `memory/$(date +%Y-%m-%d).md` with header and bootstrap note.
     - Create or update `MEMORY.md` with high-level project overviews, key decisions, constraints (seed from USER.md + known context).

---

## Phase 2: Memory System Setup (Hybrid for Best Remembering & Learning)
1. **File-Based Foundation**:
   - Verify `memory/` dir and daily log creation works.
   - Populate initial `MEMORY.md` with enduring facts (projects, preferences, security posture, constraints from USER.md). Keep high-signal.

2. **Engram/Remnic Integration (Highest Leverage for Self-Learning)**:
   - Install/configure the Engram plugin for OpenClaw (your isbe-bot/engram or Remnic/@remnic/plugin-openclaw variant).
     - Follow plugin docs: API key or local Convex/vector store setup, connection to OpenClaw memory slot.
     - Migrate legacy if needed (`remnic openclaw migrate-engram` or equivalent).
   - **Update AGENTS.md Session Init**: Ensure it queries Engram for semantic/entity/temporal context alongside file reads.
   - **Seed Initial Data** (if fresh):
     - Entities: Projects (Focusor.ai, Pledgebook, etc.), key people/agents (sub-bots, team), tools/skills, vendors (peptide research), travel plans, security incidents (high-level, private).
     - Lessons/Reflections: Any known past patterns or bootstrap notes.
     - Task States: Current open work if migrating.
   - Test: In a session, ask agent to "Query Engram for relevant context on [project] and summarize."
   - **Benefit**: Enables true long-term memory, pattern recognition ("similar past orchestration challenges"), shared state across your agent fleet (ralleh-bot + specialists), and advanced self-improvement.

3. **Daily + Curated Discipline**:
   - Confirm agent understands read-first, atomic write, concrete-only updates.
   - Set up any automation for daily synthesis (e.g., heartbeat job to roll recent activity into Engram or summary).

---

## Phase 3: Skills & Capabilities Installation
1. **Core Recommended Skills** (Install via OpenClaw UI/CLI or ClawHub):
   - browser, github, canvas, heartbeat/cron enhancements, communication channels (imsg/discord/wacli/slack as relevant), vision (Peekaboo), transcription (Whisper), search/research, PDF handling, code execution/terminal (sandboxed), Engram/Remnic plugin (priority #1 for memory).
   - Ralleh/VPS specific: Any cloud CLI (DigitalOcean, Hostinger if available), Tailscale/ networking tools, Docker/OpenClaw status, fleet monitoring.
   - Security: Linters, audit helpers, vuln scanners if ecosystem provides.
   - Future/Custom: Orchestration engines, consensus tools, domain-specific (farm permits, travel planners, peptide research pipelines).

2. **Post-Install Documentation**:
   - For each new skill: Create/update `skills_notes/<skill>.md` with:
     - High-level purpose & when to use.
     - Token efficiency tips & examples.
     - Env-specific config (auth, paths, profiles for your Mac/Azure/VPS/Tailscale setup).
     - Gotchas, security considerations, validation steps.
     - Advanced usage for orchestration, long tasks, etc.
   - Update TOOLS.md high-level section with new capability.

3. **Verification**:
   - After install: Test each in a controlled session ("Use [skill] to [simple task]. Confirm it works and note any config needed.").
   - Update AGENTS.md "Tool Selection" or TOOLS.md if new decision criteria emerge.

---

## Phase 4: Configuration & Environment Hardening
1. **openclaw.json / Agent Config**:
   - Set strong default model for reasoning/orchestration (Claude family or current best via your provider/LiteLLM).
   - Configure workspace path if custom.
   - Enable/ tune heartbeat, cron, nodes for automation.
   - Multi-model routing if supported (or via custom skills/AGENTS logic).
   - Channel allowlists, security settings (DM pairing, sandbox for non-main sessions).
   - Per-agent overrides for specialized sub-agents.

2. **Security Hardening (Post-Incident Priority)**:
   - Review and reinforce in SOUL.md/AGENTS.md: Verification protocols, "confirm before" lists, scam/malware pattern recognition, secure handling of sensitive actions, environment-hygiene notes, and input-sanitization awareness.
   - Workspace: Ensure no secrets in files (use env or secure stores). Git history clean or .gitignore sensitive if ever added.
   - macOS/VPS: Remind of update practices, fresh install benefits, monitoring.
   - Test: Agent should flag suspicious hypothetical inputs correctly and default to caution + confirm.
   - Log baseline security posture in private memory/Engram.

3. **Git & Backup**:
   - Commit all baseline files with clear message.
   - Set up remote backup strategy (private repo or encrypted sync to VPS/NAS). This protects your agent's "brain" (prompts + memory).

4. **Initial Seeding & Test**:
   - Create initial daily memory log noting "Professional baseline bootstrap completed [date]. Core files in place, git initialized, Engram configured (if done), key skills noted."
   - Seed MEMORY.md or Engram with current project statuses, open loops, key constraints/preferences from USER.md.
   - Run a test session: "You are now operating under the full Ralleh Core professional baseline. Perform initialization confirmation, health check, and a sample task: [simple analysis or plan]. Report readiness and any issues."

---

## Phase 5: Verification, Documentation & Handoff
1. **Full Self-Audit**:
   - Agent reads all core files (SOUL through BOOTSTRAP).
   - Confirms understanding of protocols (memory discipline, validation gates, delegation, reflection, danger detection, token optimization, model assignment, heartbeat role, boundaries).
   - Performs initial health check per HEARTBEAT.md.
   - Identifies any gaps (missing skills, config, facts in USER.md) and proposes fixes.

2. **Documentation**:
   - Update `docs/` with any custom notes, architecture decisions for this baseline, or links to Engram setup.
   - This README (in baseline_setup) serves as external guide; keep workspace-focused files lean.

3. **Handoff to Operations**:
   - Once verified: Agent is ready for production use on real work (project orchestration, Ralleh client setups, dev on Focusor/Pledgebook/FocusPanel/Engram/OpenClaw, security monitoring, travel/farm planning, etc.).
   - Establish rhythm: Use for daily work → Heartbeat runs → Reflections improve baseline over time.
   - For multi-agent fleet: Repeat bootstrap for specialized agents with lighter SOUL/AGENTS + shared Engram + coordination protocols in main AGENTS.md.

---

## Rollback & Troubleshooting
- Git: `git checkout -- <file>` or reset to previous commit for prompt/memory issues.
- Memory bloat or inconsistency: Use synthesis in heartbeat or manual curation. Engram helps with semantic cleanup.
- Skill/Config problems: Re-run relevant install/test steps. Check logs via tools.
- Major issues: Pause, log to memory, escalate to user with diagnostics. Fall back to simpler default OpenClaw templates temporarily if needed.
- Evolution: After successful use, propose refinements to this BOOTSTRAP.md or other files via the improvement protocol in AGENTS.md.

**Completing this bootstrap transforms a standard OpenClaw agent into a production-grade, self-improving professional operator aligned with all your requirements.** 

Run it step-by-step with confirmations. It embodies "System Maintenance", "Health Check", and sets up "Self Learning", "Fail Proof Task Tracking", "Long running tasks", and the full capability suite.

*Once done, commit to git and begin using. The agent will help maintain and evolve this baseline going forward.* 🦞

**Bootstrap Version**: v1.0 (Professional Baseline for Ralleh Core / advanced OpenClaw ops)