/**
 * tools/intelligence/agent_squad.mjs — Autonomous Agent Squad Orchestrator
 * =============================================================================
 * Orchestrates multi-agent specialized squads based on:
 *   - AGENTS.md Squad Protocol (Squad 0 Lead, Squad 2 Backend, Squad 4 Frontend, Squad 6 QA)
 *   - Paperclip Virtual AI Agency Architecture (.agents/agency/ORGANIZATION.md)
 *   - Matt Pocock Sandcastle Git Worktrees (.sandboxes/)
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createSandbox, runInSandbox, verifySandbox, destroySandbox } from '../lib/sandcastle-runner.mjs';
import { runAstAudit } from './ast_guard.mjs';
import { runEvalMatrix } from './eval_matrix.mjs';
import { runPreFlightChecks } from './instincts_engine.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

export const SQUADS = {
  squad_0: {
    id: "squad_0",
    name: "Squad 0 — Manager & Orchestrator",
    mission: "Decomposes missions into atomic contracts, enforces Gates, and verifies overall invariants.",
    skills: ["subagent-driven-development", "verify-before-claim", "delivery-gate", "anti-shortcut-discipline"]
  },
  squad_1: {
    id: "squad_1",
    name: "Squad 1 — Research & Sourcing",
    mission: "Gathers primary documentation, audits licenses, verifies Kick API contracts, and prevents hallucinations.",
    skills: ["research-mode", "kb-retrieval", "firecrawl", "finops-context-budget"]
  },
  squad_2: {
    id: "squad_2",
    name: "Squad 2 — Architecture & Backend",
    mission: "Ensures SQLite data structures, API contracts, Durable Objects, and state machines.",
    skills: ["cloudflare-durable-objects", "error-handling", "number-parsing", "workers-best-practices"]
  },
  squad_3: {
    id: "squad_3",
    name: "Squad 3 — Kick Integration & Protocols",
    mission: "Maintains Pusher WS chat connections, Webhooks RSA signature verification, and OAuth 2.1 PKCE.",
    skills: ["kick-api", "kick-api-contracts", "channel-points-bridge", "moderation-guard"]
  },
  squad_4: {
    id: "squad_4",
    name: "Squad 4 — Frontend & Layout",
    mission: "Maintains semantic HTML, design tokens, layout primitives, and component architecture.",
    skills: ["frontend-design", "design-system", "layout-primitives-architect", "minimal-surface-hierarchy"]
  },
  squad_5: {
    id: "squad_5",
    name: "Squad 5 — Visual & Motion",
    mission: "Guarantees 60 FPS WAAPI animations, composite-only properties, and OBS CPU <= 5%.",
    skills: ["motion-engineer", "animation-performance", "obs-overlays", "vanilla-motion-choreography"]
  },
  squad_6: {
    id: "squad_6",
    name: "Squad 6 — QA, Security & Fairness",
    mission: "Adversarial review, XSS audit, Provably Fair HMAC-SHA256 audits, and test suites.",
    skills: ["adverse-review", "break-ui", "security-audit", "fair-draws", "provably-fair-games"]
  },
  squad_7: {
    id: "squad_7",
    name: "Squad 7 — DevOps & Documentation",
    mission: "Zero-cost Cloudflare edge deployments, runbooks, STATUS.md updates, and packaging.",
    skills: ["verify-before-claim", "delivery-gate", "kb-writing", "stop-slop"]
  }
};

/**
 * Validates that all specialized squads have valid skills and clear operational boundaries
 */
export function verifySquadAlignment() {
  const missingSkills = [];
  const skillsDir = path.join(ROOT, '.agents', 'skills');

  for (const [key, squad] of Object.entries(SQUADS)) {
    for (const skill of squad.skills) {
      const skillPath = path.join(skillsDir, skill);
      if (!fs.existsSync(skillPath)) {
        missingSkills.push({ squad: key, skill });
      }
    }
  }

  return {
    valid: missingSkills.length === 0,
    squadCount: Object.keys(SQUADS).length,
    missingSkills
  };
}

export async function runSquadMission(missionTitle, options = { useSandbox: false }) {
  console.log(`\n======================================================`);
  console.log(`🚀 SQUAD ORCHESTRATOR — MISSION PIPELINE`);
  console.log(`Mission: "${missionTitle}"`);
  console.log(`======================================================\n`);

  const report = {
    mission: missionTitle,
    startedAt: new Date().toISOString(),
    stages: [],
    passed: true
  };

  // Stage 1: Squad 0 Pre-Flight & Contract Verification
  console.log(`[STAGE 1] Squad 0 Lead — Pre-Flight & Temporal Invariants...`);
  const preflightOk = await runPreFlightChecks();
  report.stages.push({ stage: 1, name: 'Squad 0 Pre-Flight', passed: preflightOk });
  if (!preflightOk) {
    report.passed = false;
    return report;
  }

  // Stage 2: Sandcastle Worktree Isolation (Optional)
  let sbName = null;
  if (options.useSandbox) {
    sbName = `mission-${Date.now().toString(36)}`;
    console.log(`[STAGE 2] Provisioning Sandcastle Worktree: ${sbName}...`);
    try {
      createSandbox(sbName);
      report.stages.push({ stage: 2, name: 'Sandcastle Isolation', sandbox: sbName, passed: true });
    } catch (e) {
      console.error(`Sandbox creation failed: ${e.message}`);
      report.stages.push({ stage: 2, name: 'Sandcastle Isolation', passed: false, error: e.message });
      report.passed = false;
      return report;
    }
  }

  // Stage 3: Squad 4 & 5 AST & Visual Performance Guard
  console.log(`\n[STAGE 3] Squad 4 & 5 — AST Symbolic Integrity & Motion Guard...`);
  const astRes = runAstAudit();
  report.stages.push({ stage: 3, name: 'AST & Motion Guard', passed: astRes.passed, score: astRes.score });
  if (!astRes.passed) {
    report.passed = false;
    if (sbName) destroySandbox(sbName);
    return report;
  }

  // Stage 4: Squad 6 — Adversarial Review & Eval Matrix
  console.log(`\n[STAGE 4] Squad 6 — Adversarial Review & System Eval Matrix...`);
  const matrixRes = await runEvalMatrix();
  report.stages.push({ stage: 4, name: 'Eval Matrix Gate', passed: matrixRes.passed, score: matrixRes.compositeScore });
  if (!matrixRes.passed) {
    report.passed = false;
  }

  // Clean sandbox if created for evaluation
  if (sbName) {
    console.log(`\n[CLEANUP] Tearing down ephemeral sandbox ${sbName}...`);
    destroySandbox(sbName);
  }

  console.log(`\n======================================================`);
  console.log(`🏁 SQUAD MISSION COMPLETED: ${report.passed ? 'ALL GATES PASSED (100%)' : 'GATE FAILED'}`);
  console.log(`======================================================\n`);

  return report;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const mission = process.argv[2] || "Autonomous Evolution & System Health Verification";
  runSquadMission(mission).then(res => {
    process.exit(res.passed ? 0 : 1);
  });
}
