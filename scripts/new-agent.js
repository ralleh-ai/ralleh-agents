#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    i++;
  }
  return args;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function walkFiles(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...walkFiles(full));
    else result.push(full);
  }
  return result;
}

function replaceInFile(filePath, replacements) {
  const ext = path.extname(filePath).toLowerCase();
  const textLike = ['.md', '.txt', '.json', '.example', '.yml', '.yaml'];
  const base = path.basename(filePath);
  if (!textLike.includes(ext) && !base.includes('.json') && !base.endsWith('.md')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [from, to] of Object.entries(replacements)) {
    content = content.split(from).join(String(to));
  }
  fs.writeFileSync(filePath, content);
}

function normalizeMultiline(value) {
  if (Array.isArray(value)) return value.map(v => `- ${v}`).join('\n');
  return value || '';
}

function loadConfig(args, root) {
  const inline = { ...args };
  delete inline.config;
  if (!args.config) return inline;
  const configPath = path.resolve(root, args.config);
  const fromFile = readJson(configPath);
  return { ...fromFile, ...inline };
}

function updateRegistry(root, agentRecord) {
  const registryPath = path.join(root, 'registry', 'agents.json');
  const registry = readJson(registryPath);
  registry.push(agentRecord);
  registry.sort((a, b) => a.id.localeCompare(b.id));
  writeJson(registryPath, registry);
}

const cliArgs = parseArgs(process.argv);
const root = process.cwd();
const args = loadConfig(cliArgs, root);
const templateId = args.template;
const id = args.id;
const name = args.name;
const kind = args.kind || 'generated';

if (!templateId || !id || !name) {
  console.error('Usage: node scripts/new-agent.js --template <template-id> --id <agent-id> --name <agent name> [--kind generated|custom] [--config examples/agent.json]');
  process.exit(1);
}
if (!['generated', 'custom'].includes(kind)) {
  console.error('kind must be generated or custom');
  process.exit(1);
}

const templatePath = path.join(root, 'templates', templateId);
if (!fs.existsSync(templatePath)) {
  console.error(`Template not found: ${templateId}`);
  process.exit(1);
}
const templateMetaPath = path.join(templatePath, 'template.json');
const templateMeta = fs.existsSync(templateMetaPath) ? readJson(templateMetaPath) : null;
const targetPath = path.join(root, 'agents', kind, id);
if (fs.existsSync(targetPath)) {
  console.error(`Target already exists: ${targetPath}`);
  process.exit(1);
}

copyDir(templatePath, targetPath);
const templateJsonInAgent = path.join(targetPath, 'template.json');
if (fs.existsSync(templateJsonInAgent)) fs.rmSync(templateJsonInAgent);

const replacements = {
  '[AGENT_NAME]': name,
  '[CLIENT_NAME_OR_COMPANY]': args.clientName || 'Example Client',
  '[CHOOSE_APPROPRIATE_EMOJI]': args.emoji || '🤖',
  '[PRIMARY_LOCATION_OR_TIMEZONE]': args.timezone || 'UTC',
  '[CLIENT_ROLE_OR_BUSINESS_DESCRIPTION]': args.roleDescription || 'AI-assisted business, team, or personal operating environment',
  '[LIST_MAJOR_PROJECTS_OR_RESPONSIBILITIES_WITH_BRIEF_STATUS]': normalizeMultiline(args.projectsSummary || '- Define major projects here'),
  '[DESCRIBE_ANY_KNOWN_SECURITY_CONCERNS_OR_PAST_INCIDENTS_AT_HIGH_LEVEL_ONLY — e.g. heightened caution around unexpected links, attachments, and social engineering]': args.securityContext || 'Heightened caution around unexpected links, attachments, and social engineering attempts.',
  '[DIRECT / STRUCTURED / CONCISE / DETAILED — any specific style notes]': args.communicationStyle || 'Direct, structured, concise',
  '[WHAT_THE_AGENT_MAY_DO_AUTONOMOUSLY_VS_MUST_CONFIRM]': args.decisionAuthority || 'May research, organize, draft, and propose. Must confirm before irreversible, external, or sensitive actions.',
  '[MEDICAL, LEGAL, FINANCIAL, REGULATED_TOPICS — e.g. research and planning only, not professional advice]': args.regulatedTopics || 'Research and planning support only; not a substitute for professional advice.',
  '[e.g. unverified claims, filler, overexplaining, vague status updates]': args.dislikes || 'Unverified claims, filler, vague status updates, and sloppy execution.',
  '[e.g. clear recommendations, actionable next steps, concise updates, explicit risks]': args.goodLooksLike || 'Clear recommendations, actionable next steps, concise updates, and explicit risks.',
  '[e.g. validation, speed with safety, maintainability, cost awareness, token efficiency, strong memory discipline]': args.priorities || 'Validation, maintainability, speed with safety, and strong memory discipline.',
  '[e.g. proactive but bounded, direct, low-fluff, high-verification]': args.workingStyle || 'Proactive but bounded, direct, low-fluff, high-verification.'
};

for (const file of walkFiles(targetPath)) replaceInFile(file, replacements);

const agentRecord = {
  id,
  name,
  kind,
  sourceTemplate: templateId,
  templateVersion: templateMeta?.version || null,
  version: args.version || '1.0.0',
  status: args.status || 'draft',
  owner: args.owner || 'Ralleh',
  purpose: args.purpose || 'New agent generated from template',
  tags: Array.isArray(args.tags) ? args.tags : String(args.tags || '').split(',').map(s => s.trim()).filter(Boolean),
  path: path.relative(root, targetPath)
};

writeJson(path.join(targetPath, 'agent.json'), agentRecord);
updateRegistry(root, agentRecord);

console.log(`Created ${kind} agent: ${id}`);
console.log(`Path: ${targetPath}`);
