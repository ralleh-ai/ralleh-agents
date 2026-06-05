import { listRoles, loadRole } from '../core/roles.js';

const root = process.cwd();
for (const roleId of listRoles(root)) {
  const role = loadRole(root, roleId);
  console.log(`${role.id}\t${role.name}\t${role.description}`);
}
