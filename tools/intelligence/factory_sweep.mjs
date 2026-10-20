/**
 * tools/intelligence/factory_sweep.mjs — Gate-Governed Self-Evolving Software Factory Sweep Engine (v2)
 * =====================================================================================================
 * Executes the 6-Stage Autonomous Software Factory Verification & Self-Evolution Cycle:
 *   Stage 1: Immutable Constitution SHA-256 & Anti-Reward-Hacking Lock (constitution_guard.mjs)
 *   Stage 2: Graphiti Temporal Instincts & Architectural Pre-Flight Checks (instincts_engine.mjs)
 *   Stage 3: AST & Symbolic Security Guard + D1 Edge SQL Parity (ast_guard.mjs + provision_d1.mjs)
 *   Stage 4: 5-Dimensional Eval Matrix: Omni-RAG v5 + Ragas P@3 + PQC Visual/A11y/CDN (eval_matrix.mjs)
 *   Stage 5: TextGrad / SkillSmith Surrogate-Verified Evolution (textgrad_skill_optimizer.mjs)
 *   Stage 6: Autonomous Tech Scout Radar & Procedural Memory Reflection (tech_scout.mjs + memory_reflector.mjs)
 * =====================================================================================================
 */

import { fileURLToPath } from 'node:url';
import { verifyConstitutionLock, verifyAntiRewardHackingFloors } from './constitution_guard.mjs';
import { runPreFlightChecks } from './instincts_engine.mjs';
import { runAstAudit } from './ast_guard.mjs';
import { verifyAndProvisionD1 } from '../provision_d1.mjs';
import { runEvalMatrix } from './eval_matrix.mjs';
import { runTextGradOptimizer } from './textgrad_skill_optimizer.mjs';
import { runTechScout } from './tech_scout.mjs';
import { reflectAndConsolidate } from './memory_reflector.mjs';

export async function runFactorySweep() {
  console.log(`\n======================================================================`);
  console.log(`🏭 GATE-GOVERNED SELF-EVOLVING WEB SOFTWARE FACTORY — MASTER SWEEP v2`);
  console.log(`======================================================================\n`);

  const report = {
    startedAt: new Date().toISOString(),
    steps: {},
    passed: true
  };

  // Stage 1: Immutable Constitution SHA-256 & Anti-Reward-Hacking Lock
  console.log(`[STAGE 1/6] Verifying Immutable Constitution SHA-256 & Anti-Reward-Hacking Floors...`);
  const constRes = verifyConstitutionLock();
  const floorRes = verifyAntiRewardHackingFloors();
  const stage1Passed = constRes.passed && floorRes.passed;
  report.steps.constitution = { passed: stage1Passed, lockStatus: constRes.status, floorViolations: floorRes.violations };
  console.log(`  ✓ Constitution Lock (${constRes.status}): ${constRes.passed ? 'PASS' : 'FAIL'} | Floor Guard: ${floorRes.passed ? 'PASS' : 'FAIL'}`);
  if (!stage1Passed) report.passed = false;

  // Stage 2: Pre-Flight Invariants & Temporal Instincts
  console.log(`\n[STAGE 2/6] Verifying Architectural Invariants & Temporal Instincts...`);
  const preflightOk = await runPreFlightChecks();
  report.steps.preflight = { passed: preflightOk };
  if (!preflightOk) report.passed = false;

  // Stage 3: AST Symbolic Guard + D1 Edge Schema Parity
  console.log(`\n[STAGE 3/6] Running AST & Symbolic Code Guard + D1 Edge SQL Parity...`);
  const astRes = runAstAudit();
  const d1Res = await verifyAndProvisionD1();
  report.steps.astAndD1 = {
    passed: astRes.passed && d1Res.passed,
    astScore: astRes.score,
    d1TablesVerified: d1Res.tablesVerified
  };
  if (!astRes.passed || !d1Res.passed) report.passed = false;

  // Stage 4: 5-Dimensional Eval Matrix (Omni-RAG v5 + Ragas + PQC)
  console.log(`\n[STAGE 4/6] Running 5-Dimensional Eval Matrix (Omni-RAG v5 + Ragas P@3 + PQC)...`);
  const evalRes = await runEvalMatrix();
  report.steps.evalMatrix = {
    passed: evalRes.passed,
    compositeScore: evalRes.compositeScore,
    tier: evalRes.tier,
    ragasPrecisionAt3: evalRes.dimensions?.rag?.contextPrecisionAt3,
    ragasFaithfulness: evalRes.dimensions?.rag?.faithfulness
  };
  if (!evalRes.passed) report.passed = false;

  // Stage 5: TextGrad / SkillSmith Surrogate-Verified Evolution
  console.log(`\n[STAGE 5/6] Running TextGrad / SkillSmith Surrogate Verifier...`);
  const textGradRes = await runTextGradOptimizer(evalRes);
  report.steps.textGrad = {
    passed: textGradRes.passed,
    gradientsComputed: textGradRes.gradientsComputed,
    promotedCount: textGradRes.promotedCount
  };
  if (!textGradRes.passed) report.passed = false;

  // Stage 6: Tech Scout Radar & Procedural Memory Reflection
  console.log(`\n[STAGE 6/6] Running Autonomous Tech Scout Radar & Memory Reflection...`);
  const scoutRes = await runTechScout();
  const reflectRes = reflectAndConsolidate();
  report.steps.scoutAndReflection = {
    scoutApprovedCount: scoutRes.approvedCount,
    consolidatedCount: reflectRes.consolidatedCount
  };

  console.log(`\n======================================================================`);
  console.log(`🏁 FACTORY SWEEP v2 FINISHED: ${report.passed ? 'ALL 6 STAGES PASSED (100% HEALTHY — S+ ELITE)' : 'SWEEP DETECTED ISSUES'}`);
  console.log(`======================================================================\n`);

  return report;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runFactorySweep().then(res => {
    process.exit(res.passed ? 0 : 1);
  });
}
