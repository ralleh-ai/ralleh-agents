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
   - Start session: `openclaw agent --message "Initialize as Ralleh Core professional agent. Read all workspace files and confirm readiness. Perform initial health check." --thinking high`
   - Verify it reads files correctly, uses memory discipline, proposes improvements.
   - For multi-agent: Define specialized sub-agents (e.g., DevClaw for coding, ResearchClaw, SecurityClaw, OrchestratorClaw) with their own SOUL/AGENTS tuned lighter, sharing Engram memory and main agent as coordinator. Use channels or explicit delegation protocols.

8. **Ongoing Maintenance**:
   - Workspace is git-tracked: Commit prompt/memory changes with clear messages.
   - Periodic: Agent (via heartbeat) reviews its own performance, suggests AGENTS.md/SOUL.md refinements.
   - Backup: Push git remote (private) or rsync to secure storage/VPS.
   - For client deployments (Ralleh.com): Use consistent baseline + per-client overrides in dedicated workspaces or env-specific TOOLS.md sections. Monitor fleets via custom skills or Hostinger/DO APIs + Tailscale.

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

## Incorporating All Desired Capabilities

The **AGENTS.md** is engineered to make the agent natively excel at:
- **Analyze Inputs**: Structured breakdown, context gathering (files, memory, tools), ambiguity resolution.
- **Plan**: Step-by-step with milestones, dependencies, risks, success criteria. Use workflows/ or Canvas.
- **Delegate**: Clear handoffs to sub-agents/humans/tools with context packages, deadlines, check-in cadence.
- **Optimize**: Token use, workflows, model choice, parallelization where safe.
- **Orchestrate**: Multi-step, multi-agent, long-running workflows with status dashboards (memory or Canvas).
- **Manage Tasks**: Structured tracking (todos in memory or files), priorities, dependencies, completion validation.
- **Manage and Improve Agents**: Self and sub-agent performance reviews, prompt tuning suggestions, skill gap identification.
- **Multi-Tasking**: Prioritization matrix, safe parallelism, context switching discipline.
- **Fail Proof Task Tracking**: Atomic ops, read-before-write, git, validation, rollback plans, redundant logging.
- **Long running tasks**: Milestone decomposition + heartbeat monitoring + async/background via skills/nodes.
- **Automation**: Cron/heartbeat triggers, workflow execution, self-triggering improvements.
- **Self Learning and Improvement**: Reflection protocols, lesson logging, A/B testing approaches, prompt evolution.
- **Danger Detection**: Security checklists (phishing, injection, asset risks, malware), source verification, anomaly detection in inputs/actions.
- **System Maintenance**: Health checks (gateway, skills, models, VPS/agents status), updates, cleanup (memory bloat, logs), optimization.
- **Validate**: Multi-stage checks (logic, facts, code execution/tests, peer/model review, user confirmation for critical).
- **Token Awareness and Optimization**: Conciseness rules, summarization before context bloat, efficient tool calls, model cost/performance routing, feedback in reflections.
- **Agent Model Assignment**: Task profiling → best model/agent match (reasoning depth, speed, cost, strengths). Fallbacks.
- **Model Evaluations**: Periodic or post-task scoring (accuracy, efficiency, adherence), logs for tuning.
- **Creating, Planning, Orchestration Workflows**: Library in workflows/, dynamic creation with templates + customization.
- **Finding the right tool for the job**: Decision framework in AGENTS.md + detailed TOOLS.md with capabilities, limits, examples.
- **Following Up / Checking In / Status Tracking**: Proactive scheduled pings via heartbeat/calendar, transparent progress in shared memory/channels.
- **Self Improving**: As above + propose changes to own files (with user approval for core).
- **Learns From Mistakes**: Structured postmortems, root cause, preventive updates to protocols/memory.
- **Doesn't overstep bounds**: Explicit "confirm before X" lists (external comms, file writes in sensitive dirs, financial/crypto, public actions). Scope enforcement.
- **Follows Protocol**: Checklists for common scenarios (new project intake, security incident, delegation, validation gates).
- **Consensus**: For high-stakes or ambiguous: Parallel model/agent consults + synthesis, or structured voting if tool-supported.
- **Transcribe / Summarize / Translate**: Dedicated skills + instructions for high-quality output, token-efficient summaries.
- **Log / Take Notes**: Automatic structured logging for key events; note-taking workflows.
- **Health Check**: Built into heartbeat and session start; comprehensive self + system diagnostics.

**Customization Tips**:
- **For your Ralleh agency/multi-VPS**: Add sections in AGENTS.md/TOOLS.md for client provisioning, fleet monitoring (Hostinger/DO APIs + Tailscale), admin oversight of sub-instances (ralleh-shane-bot etc.), branding voice.
- **Security Hardening (post your incident)**: Embed specific reminders in SOUL/AGENTS: Verify all unexpected links/contacts, extra scrutiny on "job" or financial lures, hardware wallet confirmations for any asset moves, OS/reinstall hygiene notes, VPN enforcement. But keep actionable, not fear-based. Log incidents to private memory.
- **Farm/Homesteading/Travel**: Add relevant facts/preferences to USER.md. Agent can help with permits research, travel planning (Thailand culinary + Vietnam beach), peptide research (Retatrutide etc. – careful with medical advice boundaries), ice cream biz, resin preservation.
- **Son/CSU**: Education finance tracking, tax/1098-T handling in memory.
- **Projects**: Deep context on Focusor.ai (C# .NET Azure), Pledgebook (blockchain Nuxt), Affilio, FocusPanel (AI ensembles), Engram (memory core), OpenClaw custom UIs (Three.js/Jarvis HUDs), multi-agent teams.
- **Evolve**: Let the agent help maintain this baseline. Ask it to "Audit and propose improvements to AGENTS.md based on recent sessions and lessons."

**Next Level**:
- Integrate FocusPanel or custom collective intelligence for ensemble model evaluations.
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

Welcome to a truly professional-grade OpenClaw agent. The claw is the law. 🦞

*Built for Ralleh / your ops – optimized [Current Date context]. Evolve it relentlessly.*
