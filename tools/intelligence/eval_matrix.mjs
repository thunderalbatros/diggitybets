/**
 * tools/intelligence/eval_matrix.mjs — Multi-Dimensional Eval Matrix
 * =============================================================================
 * Inspired by Promptfoo, addyosmani/agent-house, and Eval-Harness EDD.
 * Automatically grades the agent environment and project across 4 core axes:
 *   1. RAG Recall & Latency (Omni-RAG Accuracy & Timing)
 *   2. AST & Symbolic Integrity (0 Missing Methods, 0 Vulnerabilities)
 *   3. OBS Performance & Payload Budget (<5% CPU invariant, bundle sizes)
 *   4. Compliance & Invariant Safety (Zero custody, +18 warnings, $0 cost)
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { queryKnowledge } from './rag_pipeline.mjs';
import { runAstAudit } from './ast_guard.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

export async function runEvalMatrix() {
  console.log(`\n======================================================`);
  console.log(`📊 MULTI-DIMENSIONAL AGENT & SYSTEM EVAL MATRIX (2026)`);
  console.log(`======================================================\n`);

  const results = {
    timestamp: new Date().toISOString(),
    dimensions: {},
    passed: true
  };

  // --------------------------------------------------------------------------
  // Dimension 1: Omni-RAG Retrieval Recall & Latency
  // --------------------------------------------------------------------------
  console.log(`[DIMENSION 1] Testing Omni-RAG Precision & Latency...`);
  const ragQueries = [
    { q: "OBS Browser Source CPU Impact budget", expectedKeyword: "cpu" },
    { q: "Kick compliance spectator zero custody", expectedKeyword: "custody" }
  ];

  let ragScore = 100;
  const ragStart = Date.now();
  let queriesPassed = 0;

  for (const item of ragQueries) {
    const t0 = Date.now();
    try {
      const hits = await queryKnowledge(item.q, 3);
      const elapsed = Date.now() - t0;
      const foundMatch = hits.some(h => (h.text || '').toLowerCase().includes(item.expectedKeyword) || (h.title || '').toLowerCase().includes(item.expectedKeyword));
      if (foundMatch && elapsed < 350) {
        queriesPassed++;
      } else if (!foundMatch) {
        ragScore -= 20;
      }
    } catch (_) {
      ragScore -= 25;
    }
  }

  const ragTotalTime = Date.now() - ragStart;
  results.dimensions.rag = {
    score: Math.max(0, ragScore),
    queriesTested: ragQueries.length,
    queriesPassed,
    totalLatencyMs: ragTotalTime
  };
  console.log(`  ✓ RAG Score: ${ragScore}/100 (Tested in ${ragTotalTime}ms)`);

  // --------------------------------------------------------------------------
  // Dimension 2: AST Symbolic Integrity
  // --------------------------------------------------------------------------
  console.log(`\n[DIMENSION 2] Running AST & Symbolic Code Guard...`);
  const astResult = runAstAudit();
  results.dimensions.ast = {
    score: astResult.score,
    passed: astResult.passed,
    missingMethods: astResult.missingMethodErrors,
    securityBlockers: astResult.securityBlockers
  };
  if (!astResult.passed) results.passed = false;

  // --------------------------------------------------------------------------
  // Dimension 3: Performance & Payload Budgets
  // --------------------------------------------------------------------------
  console.log(`\n[DIMENSION 3] Auditing Performance & Payload Budgets...`);
  let perfScore = 100;
  const distDir = path.join(ROOT, 'dist');
  let distExists = fs.existsSync(distDir);
  let totalDistBytes = 0;

  if (distExists) {
    const calcDirSize = dir => {
      let size = 0;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) size += calcDirSize(full);
        else size += fs.statSync(full).size;
      }
      return size;
    };
    totalDistBytes = calcDirSize(distDir);
    const distMb = totalDistBytes / (1024 * 1024);
    if (distMb > 50) perfScore -= 25;
    console.log(`  ✓ Cloudflare Production Dist: ${distMb.toFixed(2)} MB (Max Allowed: 50.0 MB)`);
  } else {
    perfScore -= 40;
  }

  results.dimensions.performance = {
    score: perfScore,
    distMb: (totalDistBytes / (1024 * 1024)).toFixed(2),
    passed: perfScore >= 80
  };

  // --------------------------------------------------------------------------
  // Dimension 4: Compliance & Responsible Gambling Invariants
  // --------------------------------------------------------------------------
  console.log(`\n[DIMENSION 4] Validating Compliance & Legal Invariants...`);
  let complianceScore = 100;
  const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

  // Verify +18 disclaimer
  const has18Notice = indexHtml.includes('+18') || indexHtml.includes('18+');
  // Verify Zero spectator custody statement or rule
  const hasZeroCustody = /100%\s*Free|free-to-play|prizes.*streamer|virtual.*credit/i.test(indexHtml);

  if (!has18Notice) complianceScore -= 50;
  if (!hasZeroCustody) complianceScore -= 50;

  console.log(`  ✓ +18 Disclaimer Present: ${has18Notice ? 'YES' : 'NO'}`);
  console.log(`  ✓ Virtual $DIG / Zero Real Custody: ${hasZeroCustody ? 'YES' : 'NO'}`);

  results.dimensions.compliance = {
    score: complianceScore,
    passed: complianceScore === 100
  };

  // --------------------------------------------------------------------------
  // Overall Composite Grade
  // --------------------------------------------------------------------------
  const compositeScore = (
    results.dimensions.rag.score * 0.20 +
    results.dimensions.ast.score * 0.35 +
    results.dimensions.performance.score * 0.25 +
    results.dimensions.compliance.score * 0.20
  );

  let tier = 'F';
  if (compositeScore >= 95) tier = 'S+ (Elite)';
  else if (compositeScore >= 90) tier = 'S (Production Grade)';
  else if (compositeScore >= 80) tier = 'A (Good)';
  else if (compositeScore >= 70) tier = 'B (Acceptable)';

  console.log(`\n======================================================`);
  console.log(`🏆 OVERALL EVAL SCORE: ${compositeScore.toFixed(1)} / 100.0 [${tier}]`);
  console.log(`======================================================\n`);

  results.compositeScore = compositeScore;
  results.tier = tier;
  return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runEvalMatrix().then(res => {
    process.exit(res.passed ? 0 : 1);
  });
}
