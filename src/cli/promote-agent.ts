import { promoteAgent } from '../core/agents.js';

const id = process.argv[2];
if (!id) {
  console.error('Usage: node dist/cli/promote-agent.js <agent-id>');
  process.exit(1);
}
const record = promoteAgent(process.cwd(), id);
console.log(`Promoted agent to custom: ${record.id}`);
