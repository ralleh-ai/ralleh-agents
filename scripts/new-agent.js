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

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

function replaceInFile(filePath, replacements) {
  const ext = path.extname(filePath).toLowerCase();
  const textLike = ['.md', '.txt', '.json', '.example', '.yml', '.yaml'];
  const base = path.basename(filePath);
  if (!textLike.includes(ext) && !base.includes('.json') && !base.endsWith('.md')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const [from, to] of Object.entries(replacements)) {
    content = content.split(from).join(to);
  }
  fs.writeFileSync(filePath, content);
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

const args = parseArgs(process.argv);
const root = process.cwd();
const templateId = args.template;
const id = args.id;
const name = args.name;
const kind = args.kind || 'generated';

if (!templateId || !id || !name) {
  console.error('Usage: node scripts/new-agent.js --template <template-id> --id <agent-id> --name <agent name> [--kind generated|custom]');
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

const targetPath = path.join(root, 'agents', kind, id);
if (fs.existsSync(targetPath)) {
  console.error(`Target already exists: ${targetPath}`);
  process.exit(1);
}

copyDir(templatePath, targetPath);

const replacements = {
  '[AGENT_NAME]': name,
  '[CLIENT_NAME_OR_COMPANY]': args.clientName || 'Ralleh',
  '[CHOOSE_APPROPRIATE_EMOJI]': args.emoji || '🤖',
  '[PRIMARY_LOCATION_OR_TIMEZONE]': args.timezone || 'UTC',
  '[CLIENT_ROLE_OR_BUSINESS_DESCRIPTION]': args.roleDescription || 'AI agent operated by Ralleh',
  '[LIST_MAJOR_PROJECTS_OR_RESPONSIBILITIES_WITH_BRIEF_STATUS]': args.projectsSummary || '- Define responsibilities here',
  '[DESCRIBE_ANY_KNOWN_SECURITY_CONCERNS_OR_PAST_INCIDENTS_AT_HIGH_LEVEL_ONLY — e.g. "Heightened caution around unexpected links and social engineering attempts"]': args.securityContext || 'Heightened caution around unexpected links, attachments, and social engineering attempts.',
  '[DIRECT / STRUCTURED / CONCISE / DETAILED — any specific style notes]': args.communicationStyle || 'Direct, structured, concise',
  '[WHAT_THE_AGENT_MAY_DO_AUTONOMOUSLY_VS_MUST_CONFIRM]': args.decisionAuthority || 'May research, organize, draft, and propose. Must confirm before irreversible or external actions.',
  '[MEDICAL, LEGAL, FINANCIAL, REGULATED_TOPICS — e.g. "Research only; always include professional consultation disclaimer"]': args.regulatedTopics || 'Research only; include appropriate professional-consultation disclaimers when relevant.',
  '[e.g. Direct, insightful, structured output with clear sections and actionable items. Avoid corporate fluff.]': args.styleNotes || 'Direct, insightful, structured output with clear sections and actionable items. Avoid fluff.',
  '[e.g. Overly verbose responses, unverified claims, etc.]': args.dislikes || 'Unverified claims, sloppy execution, unnecessary verbosity.',
  '[e.g. Token efficiency, rigorous validation, proactive status updates within bounds]': args.priorities || 'Validation, token efficiency, maintainability, useful proactive status updates.'
};

for (const file of walkFiles(targetPath)) {
  replaceInFile(file, replacements);
}

const agentRecord = {
  id,
  name,
  kind,
  sourceTemplate: templateId,
  version: '1.0.0',
  status: 'draft',
  owner: 'Ralleh',
  purpose: args.purpose || 'New agent generated from template',
  tags: (args.tags || '').split(',').map(s => s.trim()).filter(Boolean),
  path: path.relative(root, targetPath)
};

fs.writeFileSync(path.join(targetPath, 'agent.json'), JSON.stringify(agentRecord, null, 2) + '\n');

const registryPath = path.join(root, 'registry', 'agents.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
registry.push(agentRecord);
registry.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n');

console.log(`Created ${kind} agent: ${id}`);
console.log(`Path: ${targetPath}`);
