import type { RuntimeProfile } from '../types/index.js';

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

  return {
    schemaVersion: 'openclaw-agent-manifest.v1',
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
        primaryClass: model?.primaryClass || runtime?.modelProfile.defaultModelClass || null,
        fallbackClass: model?.fallbackClass || runtime?.modelProfile.simpleTaskModelClass || null,
        specialistClass: model?.specialistClass || runtime?.modelProfile.escalationModelClass || null,
        defaultReasoning: session?.defaultReasoning || null
      },
      tools: {
        categories: toolCategories,
        policy: runtime?.toolProfile.policy || null,
        allowedModes: (deployment?.['toolPolicy'] as Record<string, unknown> | undefined)?.allowedModes || [],
        blockedWithoutApproval: (deployment?.['toolPolicy'] as Record<string, unknown> | undefined)?.blockedWithoutApproval || []
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
