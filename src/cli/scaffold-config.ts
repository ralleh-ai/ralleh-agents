import fs from 'node:fs';
import path from 'node:path';
import { listRoles, loadRole } from '../core/roles.js';

const root = process.cwd();
const outPath = process.argv[2] || 'agent.config.generated.json';
const roleId = process.argv[3] || 'it';
if (!listRoles(root).includes(roleId)) {
  console.error(`Unknown role: ${roleId}`);
  process.exit(1);
}
const role = loadRole(root, roleId);
const stub = {
  id: `my-${roleId}-agent`,
  name: `My ${role.name} Agent`,
  role: role.id,
  kind: 'generated',
  clientName: 'Your Organization',
  timezone: 'UTC',
  roleDescription: role.description,
  projectsSummary: ['Project A', 'Project B'],
  purpose: `Generated ${role.name} role agent`,
  tags: [role.id, 'generated'],
  selectedOptionalSkills: role.optionalSkills?.slice(0, 2) || [],
  extraSkills: []
};
fs.writeFileSync(path.resolve(root, outPath), JSON.stringify(stub, null, 2) + '\n');
console.log(`Wrote ${outPath}`);
