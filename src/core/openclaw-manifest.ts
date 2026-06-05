import type { RuntimeProfile } from '../types/index.js';

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function mapModelClassToAlias(modelClass: string | null | undefined): string | null {
  const mapping: Record<string, string> = {
    'strong-reasoning': 'Grok',
    'coding-specialist': 'github-copilot/gpt-5.4',
    'fast-efficient': 'gemini-flash-lite',
    'clear-writer': 'github-copilot/gpt-5.4',
    'review-specialist': 'Grok'
  };
  if (!modelClass) return null;
  return mapping[modelClass] || modelClass;
}

function mapToolCategoriesToOpenClawTools(categories: string[]): string[] {
  const mapping: Record<string, string[]> = {
    code: ['read', 'write', 'edit', 'exec', 'process'],
    files: ['read', 'write', 'edit'],
    browser: ['browser', 'web_fetch', 'web_search'],
    research: ['web_search', 'web_fetch', 'browser'],
    'task-ledger': ['sessions_spawn', 'sessions_yield', 'subagents'],
    memory: ['memory_search', 'memory_get'],
    diagramming: ['canvas'],
    documents: ['read', 'write'],
    spreadsheets: ['read', 'write'],
    calendar: ['message']
  };
  const tools = categories.flatMap((c) => mapping[c] || []);
  return unique(tools);
}

export function buildOpenClawManifest(args: {
  id: string;
  name: string;
  role: string | null;
  runtimeProfile: RuntimeProfile | null;
  deploymentProfile: Record<string, unknown> | null;
  skills: string[];
}): Record<string, unknown> {
  const runtime = args.runtimeProfile;
  const deployment = args.deploymentProfile;
  const toolCategories = runtime?.toolProfile.allowedCategories || [];
  const approval = deployment && typeof deployment === 'object' ? (deployment['approvalPolicy'] as Record<string, unknown> | undefined) : undefined;
  const model = deployment && typeof deployment === 'object' ? (deployment['modelPolicy'] as Record<string, unknown> | undefined) : undefined;
  const session = deployment && typeof deployment === 'object' ? (deployment['sessionPolicy'] as Record<string, unknown> | undefined) : undefined;
  const verification = deployment && typeof deployment === 'object' ? (deployment['verificationPolicy'] as Record<string, unknown> | undefined) : undefined;

  const primaryClass = (model?.primaryClass as string | undefined) || runtime?.modelProfile.defaultModelClass || null;
  const fallbackClass = (model?.fallbackClass as string | undefined) || runtime?.modelProfile.simpleTaskModelClass || null;
  const specialistClass = (model?.specialistClass as string | undefined) || runtime?.modelProfile.escalationModelClass || null;
  const allowedTools = mapToolCategoriesToOpenClawTools(toolCategories);

  return {
    schemaVersion: 'openclaw-agent-manifest.v2',
    agent: {
      id: args.id,
      name: args.name,
      role: args.role,
      skills: args.skills
    },
    openclaw: {
      bootstrap: {
        mustRead: runtime?.bootstrapProfile.mustRead || [],
        mustCheck: runtime?.bootstrapProfile.mustCheck || []
      },
      models: {
        primaryClass,
        fallbackClass,
        specialistClass,
        primaryAlias: mapModelClassToAlias(primaryClass),
        fallbackAlias: mapModelClassToAlias(fallbackClass),
        specialistAlias: mapModelClassToAlias(specialistClass),
        defaultReasoning: session?.defaultReasoning || null
      },
      tools: {
        categories: toolCategories,
        policy: runtime?.toolProfile.policy || null,
        allowedModes: (deployment?.['toolPolicy'] as Record<string, unknown> | undefined)?.allowedModes || [],
        blockedWithoutApproval: (deployment?.['toolPolicy'] as Record<string, unknown> | undefined)?.blockedWithoutApproval || [],
        suggestedOpenClawTools: allowedTools
      },
      approvals: {
        mode: approval?.mode || runtime?.approvalProfile.defaultMode || null,
        alwaysConfirm: runtime?.approvalProfile.alwaysConfirm || [],
        allowWithoutApproval: runtime?.approvalProfile.allowWithoutApproval || [],
        requiredFor: approval?.requiredFor || [],
        notRequiredFor: approval?.notRequiredFor || []
      },
      verification: {
        requiredEvidence: verification?.requiredEvidence || [],
        subagentCompletionIsProof: verification?.subagentCompletionIsProof ?? false
      }
    }
  };
}

export function buildOpenClawConfigStub(args: {
  id: string;
  name: string;
  role: string | null;
  runtimeProfile: RuntimeProfile | null;
  deploymentProfile: Record<string, unknown> | null;
  skills: string[];
}): Record<string, unknown> {
  const manifest = buildOpenClawManifest(args);
  const openclaw = manifest.openclaw as Record<string, any>;
  return {
    schemaVersion: 'openclaw-config-stub.v1',
    agent: {
      id: args.id,
      name: args.name,
      role: args.role
    },
    defaults: {
      model: openclaw.models.primaryAlias,
      fallbackModel: openclaw.models.fallbackAlias,
      reasoning: openclaw.models.defaultReasoning,
      toolsAllow: openclaw.tools.suggestedOpenClawTools
    },
    safety: {
      approvalMode: openclaw.approvals.mode,
      blockedWithoutApproval: openclaw.tools.blockedWithoutApproval,
      requiredFor: openclaw.approvals.requiredFor
    },
    bootstrap: openclaw.bootstrap,
    verification: openclaw.verification
  };
}
