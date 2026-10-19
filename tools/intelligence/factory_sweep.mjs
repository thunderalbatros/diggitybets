/**
 * tools/intelligence/factory_sweep.mjs — Autonomous Software Factory Sweep Engine
 * =============================================================================
 * Inspired by David Ondrej's masterclass (scheduled 90-minute security & health sweeps).
 * Executes a holistic audit and self-maintenance cycle:
 *   1. Pre-flight architectural integrity check.
 *   2. AST & symbolic method safety audit.
 *   3. Multi-dimensional Eval Matrix benchmark.
 *   4. Procedural memory reflection and instinct consolidation.
 * =============================================================================
 */

import { fileURLToPath } from 'node:url';
import { runPreFlightChecks } from './instincts_engine.mjs';
import { runAstAudit } from './ast_guard.mjs';
import { runEvalMatrix } from './eval_matrix.mjs';
import { reflectAndConsolidate } from './memory_reflector.mjs';

export async function runFactorySweep() {
  console.log(`\n======================================================`);
  console.log(`🧹 AUTONOMOUS SOFTWARE FACTORY — COMPREHENSIVE SWEEP`);
  console.log(`======================================================\n`);

  const report = {
    startedAt: new Date().toISOString(),
    steps: {},
    passed: true
  };

  // Step 1: Pre-Flight Invariants
  console.log(`[SWEEP STEP 1/4] Verifying Architectural Invariants...`);
  const preflightOk = await runPreFlightChecks();
  report.steps.preflight = { passed: preflightOk };
  if (!preflightOk) report.passed = false;

  // Step 2: AST Symbolic Guard
  console.log(`\n[SWEEP STEP 2/4] Running AST & Symbolic Code Guard...`);
  const astRes = runAstAudit();
  report.steps.ast = { passed: astRes.passed, score: astRes.score };
  if (!astRes.passed) report.passed = false;

  // Step 3: Multi-Dimensional Eval Matrix
  console.log(`\n[SWEEP STEP 3/4] Running Multi-Dimensional Eval Matrix...`);
  const evalRes = await runEvalMatrix();
  report.steps.evalMatrix = { passed: evalRes.passed, compositeScore: evalRes.compositeScore, tier: evalRes.tier };
  if (!evalRes.passed) report.passed = false;

  // Step 4: Procedural Memory Reflection
  console.log(`\n[SWEEP STEP 4/4] Consolidating Procedural Memory & Instincts...`);
  const reflectRes = reflectAndConsolidate();
  report.steps.reflection = { consolidatedCount: reflectRes.consolidatedCount };

  console.log(`\n======================================================`);
  console.log(`🏁 FACTORY SWEEP FINISHED: ${report.passed ? 'ALL CHECKS PASSED (100% HEALTHY)' : 'SWEEP DETECTED ISSUES'}`);
  console.log(`======================================================\n`);

  return report;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runFactorySweep().then(res => {
    process.exit(res.passed ? 0 : 1);
  });
}
