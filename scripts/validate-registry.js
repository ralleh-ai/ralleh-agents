#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const templates = JSON.parse(fs.readFileSync(path.join(root, 'registry', 'templates.json'), 'utf8'));
const agents = JSON.parse(fs.readFileSync(path.join(root, 'registry', 'agents.json'), 'utf8'));

let errors = 0;
for (const template of templates) {
  const p = path.join(root, template.path);
  if (!fs.existsSync(p)) {
    console.error(`Missing template path: ${template.path}`);
    errors++;
  }
}
for (const agent of agents) {
  const p = path.join(root, agent.path);
  if (!fs.existsSync(p)) {
    console.error(`Missing agent path: ${agent.path}`);
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
