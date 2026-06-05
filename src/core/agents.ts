import fs from 'node:fs';
import path from 'node:path';
import { copyDir, exists, readJson, removeIfExists, replaceInFile, walkFiles, writeJson } from './fs.js';
import { loadRole } from './roles.js';
import { loadRuntimeProfile } from './runtime.js';
import { loadDeploymentProfile } from './deployment.js';
import { buildOpenClawManifest } from './openclaw-manifest.js';
import { legacyRoleSkillsExists, legacyRoleSkillsPath, parseLegacyRoleSkills, resolveSkillsByName } from './skills.js';
import type { AgentConfig, AgentRecord, SkillRef, TemplateRecord } from '../types/index.js';

function normalizeMultiline(value: string[] | string | undefined, fallback: string): string {
  if (Array.isArray(value)) return value.map((v) => `- ${v}`).join('\n');
  return value || fallback;
}

function normalizeTags(value: string[] | string | undefined): string[] {
  if (Array.isArray(value)) return value;
  return String(value || '').split(',').map((s) => s.trim()).filter(Boolean);
}

export function loadConfig(root: string, cliArgs: Record<string, string | boolean>): AgentConfig {
  const inline = { ...cliArgs } as Record<string, unknown>;
  delete inline.config;
  if (!cliArgs.config || typeof cliArgs.config !== 'string') return inline as unknown as AgentConfig;
  const config = readJson<AgentConfig>(path.resolve(root, cliArgs.config));
  return { ...config, ...inline } as AgentConfig;
}

function buildRoleSkillSelection(root: string, skillsRepoRoot: string, roleId: string, selectedOptionalSkills: string[] = [], extraSkills: string[] = []): { resolved: SkillRef[]; sources: string[] } {
  const role = loadRole(root, roleId);
  const allowedOptional = new Set(role.optionalSkills || []);
  for (const skill of selectedOptionalSkills) {
    if (!allowedOptional.has(skill)) {
      throw new Error(`Optional skill '${skill}' is not allowed for role '${roleId}'`);
    }
  }
  const names = [...role.defaultSkills, ...selectedOptionalSkills, ...extraSkills];
  const resolved = resolveSkillsByName(skillsRepoRoot, [...new Set(names)]);
  const sources = [`roles/${roleId}/role.json`];
  if (legacyRoleSkillsExists(skillsRepoRoot, roleId)) {
    sources.push(path.relative(process.cwd(), legacyRoleSkillsPath(skillsRepoRoot, roleId)) + ' [deprecated-reference]');
    parseLegacyRoleSkills(skillsRepoRoot, roleId);
  }
  return { resolved, sources };
}

function applyRoleOverlay(root: string, roleId: string, targetPath: string): string[] {
  const overlayDir = path.join(root, 'roles', roleId, 'files');
  if (!fs.existsSync(overlayDir)) return [];
  const copied: string[] = [];
  for (const file of fs.readdirSync(overlayDir)) {
    const src = path.join(overlayDir, file);
    const dest = path.join(targetPath, file);
    fs.copyFileSync(src, dest);
    copied.push(file);
  }
  return copied.sort();
}

export function createAgent(root: string, skillsRepoRoot: string, config: AgentConfig): AgentRecord {
  const role = config.role || null;
  const roleRecord = role ? loadRole(root, role) : null;
  const runtimeProfileId = config.runtimeProfile || roleRecord?.runtimeProfile || null;
  const runtimeProfile = runtimeProfileId ? loadRuntimeProfile(root, runtimeProfileId) : null;
  const deploymentProfileId = roleRecord?.deploymentProfile || null;
  const deploymentProfile = deploymentProfileId ? loadDeploymentProfile(root, deploymentProfileId) : null;
  const templateId = config.template || roleRecord?.defaultTemplate;
  const id = config.id;
  const name = config.name;
  const kind = config.kind || 'generated';
  if (!templateId || !id || !name) {
    throw new Error('template, id, and name are required (template may come from role defaultTemplate)');
  }
  const templatePath = path.join(root, 'templates', templateId);
  if (!exists(templatePath)) {
    throw new Error(`Template not found: ${templateId}`);
  }

  const templateMetaPath = path.join(templatePath, 'template.json');
  const templateMeta = exists(templateMetaPath) ? readJson<TemplateRecord>(templateMetaPath) : null;
  const targetPath = path.join(root, 'agents', kind, id);
  if (exists(targetPath)) {
    throw new Error(`Target already exists: ${targetPath}`);
  }

  copyDir(templatePath, targetPath);
  removeIfExists(path.join(targetPath, 'template.json'));

  const overlayFiles = role ? applyRoleOverlay(root, role, targetPath) : [];

  const replacements: Record<string, string> = {
    '[AGENT_NAME]': name,
    '[CLIENT_NAME_OR_COMPANY]': config.clientName || 'Example Client',
    '[CHOOSE_APPROPRIATE_EMOJI]': config.emoji || '🤖',
    '[PRIMARY_LOCATION_OR_TIMEZONE]': config.timezone || 'UTC',
    '[CLIENT_ROLE_OR_BUSINESS_DESCRIPTION]': config.roleDescription || roleRecord?.description || 'AI-assisted business, team, or personal operating environment',
    '[LIST_MAJOR_PROJECTS_OR_RESPONSIBILITIES_WITH_BRIEF_STATUS]': normalizeMultiline(config.projectsSummary, '- Define major projects here'),
    '[DESCRIBE_ANY_KNOWN_SECURITY_CONCERNS_OR_PAST_INCIDENTS_AT_HIGH_LEVEL_ONLY — e.g. heightened caution around unexpected links, attachments, and social engineering]': config.securityContext || 'Heightened caution around unexpected links, attachments, and social engineering attempts.',
    '[DIRECT / STRUCTURED / CONCISE / DETAILED — any specific style notes]': config.communicationStyle || 'Direct, structured, concise',
    '[WHAT_THE_AGENT_MAY_DO_AUTONOMOUSLY_VS_MUST_CONFIRM]': config.decisionAuthority || 'May research, organize, draft, and propose. Must confirm before irreversible, external, or sensitive actions.',
    '[MEDICAL, LEGAL, FINANCIAL, REGULATED_TOPICS — e.g. research and planning only, not professional advice]': config.regulatedTopics || 'Research and planning support only; not a substitute for professional advice.',
    '[e.g. unverified claims, filler, overexplaining, vague status updates]': config.dislikes || 'Unverified claims, filler, vague status updates, and sloppy execution.',
    '[e.g. clear recommendations, actionable next steps, concise updates, explicit risks]': config.goodLooksLike || 'Clear recommendations, actionable next steps, concise updates, and explicit risks.',
    '[e.g. validation, speed with safety, maintainability, cost awareness, token efficiency, strong memory discipline]': config.priorities || 'Validation, maintainability, speed with safety, and strong memory discipline.',
    '[e.g. proactive but bounded, direct, low-fluff, high-verification]': config.workingStyle || 'Proactive but bounded, direct, low-fluff, high-verification.'
  };

  for (const file of walkFiles(targetPath)) replaceInFile(file, replacements);

  const selected = role ? buildRoleSkillSelection(root, skillsRepoRoot, role, config.selectedOptionalSkills || [], config.extraSkills || []) : { resolved: [], sources: [] };
  const agentRecord: AgentRecord = {
    id,
    name,
    kind,
    sourceTemplate: templateId,
    templateVersion: templateMeta?.version || null,
    version: config.version || '1.0.0',
    status: config.status || 'draft',
    owner: config.owner || 'Ralleh',
    purpose: config.purpose || 'New agent generated from template',
    tags: normalizeTags(config.tags),
    path: path.relative(root, targetPath),
    role,
    skills: selected.resolved.map((s) => s.name),
    skillSources: selected.sources,
    runtimeProfile: runtimeProfile?.id || null,
    deploymentProfile: deploymentProfileId || null
  };

  writeJson(path.join(targetPath, 'agent.json'), agentRecord);
  if (role) {
    const rendered = [
      `# SKILLS.md - ${name}`,
      '',
      `Role source: roles/${role}/role.json`,
      `Role overlay files: ${overlayFiles.length ? overlayFiles.join(', ') : 'none'}`,
      ...(selected.sources.length > 1 ? [`Legacy reference: ${selected.sources.slice(1).join(', ')}`, ''] : ['']),
      '## Selected Skills',
      '',
      ...selected.resolved.map((skill) => `- ${skill.name} — ${skill.path}`)
    ].join('\n');
    fs.writeFileSync(path.join(targetPath, 'SKILLS.md'), rendered + '\n');
    writeJson(path.join(targetPath, 'skills.json'), {
      role,
      source: `roles/${role}/role.json`,
      overlayFiles,
      skills: selected.resolved,
      selectedOptionalSkills: config.selectedOptionalSkills || [],
      extraSkills: config.extraSkills || []
    });
    if (runtimeProfile) {
      writeJson(path.join(targetPath, 'runtime.json'), runtimeProfile);
    }
    if (deploymentProfile) {
      writeJson(path.join(targetPath, 'deployment.json'), deploymentProfile);
    }
    writeJson(path.join(targetPath, 'openclaw.agent.json'), buildOpenClawManifest({
      id,
      name,
      role,
      runtimeProfile,
      deploymentProfile,
      skills: selected.resolved.map((s) => s.name)
    }));
  }

  const registryPath = path.join(root, 'registry', 'agents.json');
  const registry = readJson<AgentRecord[]>(registryPath);
  registry.push(agentRecord);
  registry.sort((a, b) => a.id.localeCompare(b.id));
  writeJson(registryPath, registry);
  return agentRecord;
}

export function promoteAgent(root: string, id: string): AgentRecord {
  const registryPath = path.join(root, 'registry', 'agents.json');
  const registry = readJson<AgentRecord[]>(registryPath);
  const agent = registry.find((a) => a.id === id);
  if (!agent) throw new Error(`Agent not found in registry: ${id}`);
  if (agent.kind === 'custom') return agent;
  const oldPath = path.join(root, agent.path);
  const newRel = path.join('agents', 'custom', id);
  const newPath = path.join(root, newRel);
  if (!fs.existsSync(oldPath)) throw new Error(`Agent path missing: ${agent.path}`);
  if (fs.existsSync(newPath)) throw new Error(`Custom target already exists: ${newRel}`);
  fs.mkdirSync(path.dirname(newPath), { recursive: true });
  fs.renameSync(oldPath, newPath);
  agent.kind = 'custom';
  agent.path = newRel;
  const onDisk = readJson<AgentRecord>(path.join(newPath, 'agent.json'));
  onDisk.kind = 'custom';
  onDisk.path = newRel;
  writeJson(path.join(newPath, 'agent.json'), onDisk);
  writeJson(registryPath, registry.sort((a, b) => a.id.localeCompare(b.id)));
  return agent;
}

export function validateRegistry(root: string): { templates: number; agents: number; roles: number } {
  const templates = readJson<TemplateRecord[]>(path.join(root, 'registry', 'templates.json'));
  const agents = readJson<AgentRecord[]>(path.join(root, 'registry', 'agents.json'));
  const templateIds = new Set<string>();
  const agentIds = new Set<string>();
  const errors: string[] = [];

  const rolesDir = path.join(root, 'roles');
  const roles = fs.existsSync(rolesDir)
    ? fs.readdirSync(rolesDir).filter((name) => fs.existsSync(path.join(rolesDir, name, 'role.json')))
    : [];

  for (const template of templates) {
    if (templateIds.has(template.id)) errors.push(`Duplicate template id: ${template.id}`);
    templateIds.add(template.id);
    const p = path.join(root, template.path);
    if (!exists(p)) errors.push(`Missing template path: ${template.path}`);
    if (!exists(path.join(p, 'template.json'))) errors.push(`Missing template.json in ${template.path}`);
  }

  for (const roleId of roles) {
    const rolePath = path.join(root, 'roles', roleId, 'role.json');
    const role = readJson<{ defaultTemplate: string }>(rolePath);
    if (!templates.find((t) => t.id === role.defaultTemplate)) {
      errors.push(`Role '${roleId}' references unknown defaultTemplate '${role.defaultTemplate}'`);
    }
  }

  for (const agent of agents) {
    if (agentIds.has(agent.id)) errors.push(`Duplicate agent id: ${agent.id}`);
    agentIds.add(agent.id);
    const p = path.join(root, agent.path);
    if (!exists(p)) {
      errors.push(`Missing agent path: ${agent.path}`);
      continue;
    }
    const agentJsonPath = path.join(p, 'agent.json');
    if (!exists(agentJsonPath)) {
      errors.push(`Missing agent.json for ${agent.id}`);
      continue;
    }
    const onDisk = readJson<AgentRecord>(agentJsonPath);
    if (onDisk.id !== agent.id) errors.push(`agent.json id mismatch for ${agent.id}`);
    if (onDisk.kind !== agent.kind) errors.push(`agent.json kind mismatch for ${agent.id}`);
    if (agent.sourceTemplate && !templates.find((t) => t.id === agent.sourceTemplate)) {
      errors.push(`Unknown sourceTemplate '${agent.sourceTemplate}' for agent '${agent.id}'`);
    }
    if (agent.role && !roles.includes(agent.role)) {
      errors.push(`Unknown role '${agent.role}' for agent '${agent.id}'`);
    }
    if (agent.runtimeProfile) {
      const runtimePath = path.join(root, 'profiles', 'runtime', `${agent.runtimeProfile}.json`);
      if (!exists(runtimePath)) errors.push(`Unknown runtimeProfile '${agent.runtimeProfile}' for agent '${agent.id}'`);
    }
    if (agent.deploymentProfile) {
      const deploymentPath = path.join(root, 'profiles', 'deployment', `${agent.deploymentProfile}.json`);
      if (!exists(deploymentPath)) errors.push(`Unknown deploymentProfile '${agent.deploymentProfile}' for agent '${agent.id}'`);
    }
  }

  if (errors.length) throw new Error(errors.join('\n'));
  return { templates: templates.length, agents: agents.length, roles: roles.length };
}
