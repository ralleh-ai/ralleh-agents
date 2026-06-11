# Professional Agent Baseline Template

**A clean, production-grade starting point for high-capability autonomous agents.**

**Goal**: A reusable, self-improving professional agent baseline template that embodies excellence in analysis, planning, delegation, orchestration, task management, self-learning, safety, memory discipline, token efficiency, multi-agent coordination, and continuous improvement. Designed to be customized per client or deployment while maintaining consistent high standards.

This template draws from established agent best practices, with strong emphasis on reliability, clear protocols, bounded autonomy, proactive self-improvement, and production readiness. It is intentionally generic so it can be adapted to different agent frameworks and client environments.

**Key Philosophy**:
- **Lean SOUL.md** (identity & voice) + **Rich AGENTS.md** (SOPs, workflows, protocols).
- **Disciplined Memory**: Daily logs + curated MEMORY.md + advanced semantic memory plugin (e.g. Engram-style) for long-term recall, lessons, and entities.
- **Fail-Proof Tracking**: Structured tasks, atomic updates, git-backed workspace, validation gates.
- **Token & Model Aware**: Concise by default, smart routing, efficiency feedback loops.
- **Security First, Bounded**: Vigilant but not overstepping; confirm high-stakes actions.
- **Self-Improving**: Post-action reflection, periodic heartbeat audits, propose prompt updates.
- **Orchestrator Mindset**: Delegate intelligently, track status, follow up, build consensus where valuable.

**Workspace Location Recommendation**:
- Use a dedicated, version-controlled directory for each agent (e.g. `~/.agents/[agent-name]/workspace` or equivalent in your framework).
- **Always initialize the workspace as a git repository** for versioned prompts and memory (private repo recommended).

**Prerequisites**:
- Your chosen agent framework/gateway installed and running.
- Recommended models: High-reasoning model (e.g. Claude 3.5/4 Sonnet or equivalent via your provider/LiteLLM/OpenRouter), plus fast models for simple tasks and coding specialists. Configure model routing in your agent config or via skills.
- Advanced semantic memory plugin (e.g. Engram-style) strongly recommended for long-term recall and self-learning.
- Git for workspace versioning.

## Quick Start / Bootstrap New Professional Agent

1. **Create/Prepare Workspace**:
   ```bash
   mkdir -p ~/.agents/[agent-name]/workspace
   cd ~/.agents/[agent-name]/workspace
   git init
   git checkout -b main
   ```

2. **Copy Baseline Files** into the workspace:
   ```bash
   cp /path/to/professional_agent_baseline_template/SOUL.md ./
   cp /path/to/professional_agent_baseline_template/AGENTS.md ./
   cp /path/to/professional_agent_baseline_template/TOOLS.md ./
   cp /path/to/professional_agent_baseline_template/IDENTITY.md ./
   cp /path/to/professional_agent_baseline_template/HEARTBEAT.md ./
   cp /path/to/professional_agent_baseline_template/BOOTSTRAP.md ./
   cp /path/to/professional_agent_baseline_template/USER.md ./
   mkdir -p memory workflows skills_notes
   ```

3. **Run Bootstrap** (one-time or after major changes):
   - Instruct the agent: "Read BOOTSTRAP.md and execute the full professional baseline initialization protocol. Confirm each major step."
   - Or follow the steps manually in BOOTSTRAP.md (create directories, initialize git, configure memory plugin, install core skills, etc.).

4. **Configure your agent settings** (model routing, workspace path, heartbeat/cron, etc.) according to your framework's configuration file.

5. **Install Recommended Skills / Tools**:
   - Core capabilities: browser automation, GitHub integration, visual canvas/workspace, communication channels, vision/screenshot tools, transcription, search/research, PDF handling, code execution, and cron/heartbeat for automation.
   - Strongly recommended: An advanced semantic + entity memory plugin (e.g. Engram-style) for long-term recall and self-improvement.
   - Security & audit tools where available.
   - Custom skills for your specific domain (orchestration, client workflows, etc.).

6. **Enable Heartbeat & Automation**:
   - In settings or AGENTS.md context: Ensure heartbeat skill/cron is active for periodic self-checks, follow-ups, health monitoring, task progress checks.
   - Long-running tasks: Break into milestones tracked in memory or dedicated task files; use heartbeat for status pings or background processing via nodes/cron.

7. **Test & Iterate**:
   - Start session: `openclaw agent --message "Initialize as the professional agent for this deployment. Read all workspace files, confirm readiness, and perform an initial health check." --thinking high`
   - Verify it reads files correctly, uses memory discipline, proposes improvements.
   - For multi-agent: Define specialized sub-agents (e.g., DevClaw for coding, ResearchClaw, SecurityClaw, OrchestratorClaw) with their own SOUL/AGENTS tuned lighter, sharing Engram memory and main agent as coordinator. Use channels or explicit delegation protocols.

8. **Ongoing Maintenance**:
   - Workspace is git-tracked: Commit prompt/memory changes with clear messages.
   - Periodic: Agent (via heartbeat) reviews its own performance, suggests AGENTS.md/SOUL.md refinements.
   - Backup: Push git remote (private) or rsync to secure storage/VPS.
   - For client or multi-environment deployments: Use a consistent baseline plus per-client or per-environment overrides in dedicated workspaces or env-specific TOOLS.md sections. Monitor fleets via the relevant hosting, networking, and admin tooling for that deployment.

## Directory Structure (Recommended for Baseline)

```
~/.openclaw/workspace/          # Or per-agent equivalent
├── .git/                       # Version control for prompts + memory (CRITICAL)
├── SOUL.md                     # Identity, voice, core principles (lean, injected every session)
├── IDENTITY.md                 # Name, emoji, short description
├── USER.md                     # Facts about you (the human). Customize heavily. Private.
├── AGENTS.md                   # The brain: Operational protocols, workflows, all capabilities (this is where the magic happens)
├── TOOLS.md                    # Tool/skill usage notes, env specifics, examples, token tips
├── HEARTBEAT.md                # Periodic self-check, maintenance, follow-up, self-audit instructions
├── BOOTSTRAP.md                # One-time or reset initialization protocol
├── MEMORY.md                   # Curated long-term facts, decisions, lessons (or use primarily via Engram)
├── memory/                     # Daily logs: YYYY-MM-DD.md (agent creates/reads today + yesterday)
│   └── (daily files + summaries)
├── workflows/                  # Reusable workflow definitions, prompt templates, orchestration playbooks (markdown/JSON)
│   ├── planning.md
│   ├── delegation-protocol.md
│   ├── security-checklist.md
│   └── etc.
├── skills_notes/               # Per-skill extended notes, gotchas, token optimization tips (beyond SKILL.md)
│   └── github.md
│   └── browser.md
│   └── ...
├── docs/                       # This README, architecture notes, model eval logs (if any)
├── openclaw.json.example       # Reference config
└── (other: .env if needed, task boards if file-based, etc.)
```

**Memory Strategy (Hybrid for Best Results)**:
- **Built-in**: `memory/YYYY-MM-DD.md` for daily events/decisions. Read today+yesterday on start. Write concrete updates only (read first).
- **MEMORY.md**: High-level curated (projects status, preferences, key decisions, recurring constraints). Update sparingly.
- **Engram/Remnic (Recommended Upgrade)**: Semantic vector + keyword + graph + temporal memory. Store entities (projects, people, tools), lessons learned, reflections, task states. Query for relevant context beyond recency. Enables true self-learning: "What did I learn from similar past tasks?" Shared across your agent fleet. Configure in plugin settings; reference in AGENTS.md session init and tool use.
- **Lessons & Improvement**: Dedicated namespace or tags in Engram/MEMORY for "postmortems", "optimizations", "model_performance". Heartbeat triggers periodic synthesis.
- **Token Optimization**: Summarize long memories before injecting; agent instructed to be ruthless with context.

## Capability Philosophy

An ideal baseline agent is not defined by the number of features it lists, but by the quality of its internal coordination. The strongest agents are composed so that identity, memory, workflow, tool choice, verification, and restraint all reinforce one another instead of competing for control.

A serious baseline should cultivate a set of mutually supporting capabilities:

- **Perception with judgment**: the agent should be able to gather context from files, tools, memory, and live systems, but more importantly distinguish signal from noise, current truth from stale artifacts, and evidence from assumption.
- **Planning with consequence awareness**: planning is not merely sequencing steps. It is anticipating risk, naming dependencies, defining verification, and preserving rollback before confidence becomes action.
- **Execution with bounded initiative**: a good agent moves quickly on safe work and deliberately on risky work. It should know when initiative is an advantage and when restraint is intelligence.
- **Orchestration with clarity**: delegation is only useful when context, ownership, and success criteria survive the handoff. The baseline should make coordination a first-class capability, not an improvisation.
- **Memory with selective permanence**: the system should remember what changes future behavior and let go of what merely consumes space. Durable lessons, recurring patterns, and meaningful preferences belong close at hand; noise does not.
- **Verification as a habit, not a patch**: great agents do not treat verification as an afterthought. They are designed so that claims, completions, and recommendations naturally terminate in evidence.
- **Model and tool fit**: intelligence is partly choosing the right level of intelligence. The baseline should encourage model selection, tool posture, and runtime behavior that match the real risk and complexity of the task.
- **Self-correction and evolution**: the agent should become sharper through use. Repeated failure modes, friction points, and successful patterns should leave marks on the system in the right file, workflow, or profile.
- **Safety through structure**: the ideal baseline does not depend on vague caution. It encodes boundaries in role definitions, runtime profiles, approval posture, and verification gates so that good behavior is the default path.

The deeper point is that excellence in agents is architectural. A powerful agent is not simply “smart.” It is composed well. It has the right distinctions between enduring and transient knowledge, between role and tool, between identity and workflow, between permission and capability, between action and proof.

That is why this baseline is organized as a layered system. Each file exists to specialize one dimension of behavior while remaining aligned with the others. The goal is not verbosity. The goal is coherence. Coherence is what allows an agent to scale in complexity without becoming confused, bloated, or reckless.


**Customization Tips**:
- **For agency or multi-environment operations**: Add sections in AGENTS.md/TOOLS.md for provisioning, monitoring, environment oversight, and organization-specific voice or operational constraints when those are real deployment needs.
- **Security hardening**: Embed practical reminders in SOUL/AGENTS for suspicious links, social engineering attempts, high-impact external actions, device/account hygiene, and approval-first handling for sensitive operations. Keep it actionable, not fear-based.
- **Domain-specific planning**: Add relevant facts/preferences to USER.md when the deployment needs support for permits research, travel planning, regulated-topic research, small-business exploration, preservation/craft workflows, or other recurring personal/business planning contexts.
- **Education administration**: Add recurring education-finance context, tax-document reminders, and planning notes only when they are relevant to the user or organization.
- **Projects**: Add deep context for real long-lived projects only when it materially improves judgment, planning, and execution.
- **Evolve**: Let the agent help maintain this baseline. Ask it to "Audit and propose improvements to AGENTS.md based on recent sessions and lessons."

**Next Level**:
- Integrate a collective-intelligence layer or custom evaluation framework for ensemble model evaluations.
- Build custom skills for advanced orchestration (e.g., workflow engine, consensus tool).
- Use OpenClaw-RL for conversational fine-tuning of this agent over time.
- For client work: Templated sub-agent deployments with this baseline + NDA/client-specific overrides.
- Monitor token usage/costs if your provider exposes; agent tracks in reflections.

**Support & Iteration**:
This is a living baseline. Run it, use it on real work, then ask the agent (or me) to refine specific sections. Share feedback on what works/doesn't for further optimization.

**Files in this package**:
- README.md (this)
- SOUL.md, IDENTITY.md, USER.md, AGENTS.md, TOOLS.md, HEARTBEAT.md, BOOTSTRAP.md
- MEMORY.md (initial)
- openclaw.json.example
- recommended_skills.md
- workflows/ examples (planning, delegation, security)
- Full setup is copy-paste ready. Git commit after customization.

