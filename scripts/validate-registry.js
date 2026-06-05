#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const root = process.cwd();
const templates = readJson(path.join(root, 'registry', 'templates.json'));
const agents = readJson(path.join(root, 'registry', 'agents.json'));
let errors = 0;
const seenTemplateIds = new Set();
const seenAgentIds = new Set();

for (const template of templates) {
  if (seenTemplateIds.has(template.id)) {
    console.error(`Duplicate template id: ${template.id}`);
    errors++;
  }
  seenTemplateIds.add(template.id);
  const p = path.join(root, template.path);
  if (!fs.existsSync(p)) {
    console.error(`Missing template path: ${template.path}`);
    errors++;
    continue;
  }
  const templateJson = path.join(p, 'template.json');
  if (!fs.existsSync(templateJson)) {
    console.error(`Missing template.json in ${template.path}`);
    errors++;
  }
}

for (const agent of agents) {
  if (seenAgentIds.has(agent.id)) {
    console.error(`Duplicate agent id: ${agent.id}`);
    errors++;
  }
  seenAgentIds.add(agent.id);
  const p = path.join(root, agent.path);
  if (!fs.existsSync(p)) {
    console.error(`Missing agent path: ${agent.path}`);
    errors++;
    continue;
  }
  const agentJsonPath = path.join(p, 'agent.json');
  if (!fs.existsSync(agentJsonPath)) {
    console.error(`Missing agent.json for ${agent.id}`);
    errors++;
    continue;
  }
  const onDisk = readJson(agentJsonPath);
  if (onDisk.id !== agent.id) {
    console.error(`agent.json id mismatch for ${agent.id}`);
    errors++;
  }
  if (onDisk.kind !== agent.kind) {
    console.error(`agent.json kind mismatch for ${agent.id}`);
    errors++;
  }
  if (agent.sourceTemplate) {
    const match = templates.find(t => t.id === agent.sourceTemplate);
    if (!match) {
      console.error(`Unknown sourceTemplate '${agent.sourceTemplate}' for agent '${agent.id}'`);
      errors++;
    }
  }
}

if (errors) process.exit(1);
console.log(`OK: ${templates.length} template(s), ${agents.length} agent(s)`);
