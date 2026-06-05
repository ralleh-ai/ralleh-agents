#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2) + '\n');
}
const id = process.argv[2];
if (!id) {
  console.error('Usage: node scripts/promote-agent.js <agent-id>');
  process.exit(1);
}
const root = process.cwd();
const registryPath = path.join(root, 'registry', 'agents.json');
const registry = readJson(registryPath);
const agent = registry.find(a => a.id === id);
if (!agent) {
  console.error(`Agent not found in registry: ${id}`);
  process.exit(1);
}
if (agent.kind === 'custom') {
  console.log(`Agent already custom: ${id}`);
  process.exit(0);
}
const oldPath = path.join(root, agent.path);
const newRel = path.join('agents', 'custom', id);
const newPath = path.join(root, newRel);
if (!fs.existsSync(oldPath)) {
  console.error(`Agent path missing: ${agent.path}`);
  process.exit(1);
}
if (fs.existsSync(newPath)) {
  console.error(`Custom target already exists: ${newRel}`);
  process.exit(1);
}
fs.mkdirSync(path.dirname(newPath), { recursive: true });
fs.renameSync(oldPath, newPath);
agent.kind = 'custom';
agent.path = newRel;
writeJson(path.join(newPath, 'agent.json'), { ...readJson(path.join(newPath, 'agent.json')), kind: 'custom', path: newRel });
writeJson(registryPath, registry.sort((a,b)=>a.id.localeCompare(b.id)));
console.log(`Promoted agent to custom: ${id}`);
