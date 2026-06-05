import path from 'node:path';
import { readJson } from '../core/fs.js';
import type { TemplateRecord } from '../types/index.js';

const root = process.cwd();
const templates = readJson<TemplateRecord[]>(path.join(root, 'registry', 'templates.json'));
for (const t of templates) {
  console.log(`${t.id}\t${t.name}\t${t.version}\t${t.description}`);
}
