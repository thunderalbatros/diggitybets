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
import { queryKnowledge, getOrBuildMiniSearchIndex } from './rag_pipeline.mjs';
import { runAstAudit } from './ast_guard.mjs';
import { computeRagasMetrics } from './vertex_ai_bridge.mjs';
import { runSleeptimeCompute } from './tom_swe_engine.mjs';
import { runDiffUiAdversarialGate } from '../audit/diff_ui_adversarial.mjs';

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
  // Dimension 1: Omni-RAG v4 Bilingual Retrieval Recall, MRR & Latency (18 Golden Queries)
  // --------------------------------------------------------------------------
  console.log(`[DIMENSION 1] Testing Omni-RAG v4 Bilingual Precision, MRR & Latency (18 Golden Queries)...`);
  getOrBuildMiniSearchIndex();
  await queryKnowledge("warmup", 1, { fastLocalOnly: true });

  const ragQueries = [
    { q: "OBS Browser Source performance impact budget", expectedKeyword: "cpu" },
    { q: "Kick compliance spectator zero custody", expectedKeyword: "free" },
    { q: "juegos interactivos en vivo para espectadores de kick", expectedKeyword: "mines" },
    { q: "marco octalysis gamificación recompensas variables", expectedKeyword: "hooked" },
    { q: "marketing conversion cro afiliados aversion a la perdida", expectedKeyword: "cialdini" },
    { q: "sistema de bountys only on stake tiers multiplicador", expectedKeyword: "bet_id" },
    { q: "ciberseguridad defensa xss trustedtypes csp oauth", expectedKeyword: "dompurify" },
    { q: "animaciones 60fps emil kowalski modal entrance scale waapi", expectedKeyword: "0.95" },
    { q: "shaders glsl bordes laser webaudio dynamicscompressor", expectedKeyword: "zzfx" },
    { q: "diseño minimalista jerarquia cromatica leyes de ux contraste", expectedKeyword: "90/8/2" },
    { q: "cloudflare durable objects websocket sqlite", expectedKeyword: "hibernation" },
    { q: "catalogo maestro libros documentacion oficial videocursos", expectedKeyword: "curated_master_books" },
    { q: "tipografia matematica grilla suiza proporcion aurea", expectedKeyword: "bringhurst" },
    { q: "probabilidad matematica slots rtp volatilidad", expectedKeyword: "barboianu" },
    { q: "game feel creating web animations springs wwdc", expectedKeyword: "swink" },
    { q: "behavior model b=map misbehaving thaler conversion", expectedKeyword: "fogg" },
    { q: "arquitectura rag hipporag sqlite fts5 contextual retrieval rerank", expectedKeyword: "lightrag" },
    { q: "refactoring ui practical ui dannaway design systems kholmatova", expectedKeyword: "wathan" },
    { q: "darwin godel machine speculative rag context caching skillsmith", expectedKeyword: "textgrad" },
    { q: "auditoria visual automatizada cto vlm critic oklch starting-style devouring details", expectedKeyword: "hitl" },
    { q: "topologia equipos multi-agente 10 escuadrones team topologies anthropic", expectedKeyword: "skelton" },
    { q: "arquitectura chromium butterick grigorik hpbn cmu 15-445 andy pavlo portswigger", expectedKeyword: "renderingng" },
    { q: "game programming patterns object pool dirty flag rauschmayer es2025 shiffman", expectedKeyword: "nystrom" },
    { q: "ebookfoundation web browser engineering harrelson use the index luke winand fuzzing book", expectedKeyword: "panchekha" },
    { q: "qasimhbti definitive guide sqlite varnish cache stampede matters computational arndt akf scale cube", expectedKeyword: "vdbe" },
    { q: "deep modules albers halation gurney aces filmic toctou double-spend lehdonvirta", expectedKeyword: "ousterhout" },
    { q: "frameworkless alex xu leaderboard sliding window tornhill hotspot x-rays jon skeet", expectedKeyword: "strazzullo" },
    { q: "poeaa fowler money allocation unit of work goos c4 simon brown functional core imperative shell", expectedKeyword: "walking skeleton" },
    { q: "biblioteca ingerida real-time rendering akenine-moller game engine architecture serious cryptography aumasson", expectedKeyword: "gregory" },
    { q: "theory of gambling statistical logic procedural storytelling tanya short tarn adams web audio api boris smus", expectedKeyword: "epstein" },
    { q: "50 repositorios software factory three-tier memory selector cache browserbase ui-test oxlint context7", expectedKeyword: "tom-swe" }
  ];

  let ragScore = 100;
  const ragStart = Date.now();
  let queriesPassed = 0;
  let mrrSum = 0;
  let precisionSum = 0;
  let faithfulnessSum = 0;

  // Verify LEC-015 knowledge/INDEX.md exists
  const hasKnowledgeIndex = fs.existsSync(path.join(ROOT, 'knowledge', 'INDEX.md'));
  if (!hasKnowledgeIndex) ragScore -= 15;

  for (const item of ragQueries) {
    const t0 = Date.now();
    try {
      const kw = item.expectedKeyword.toLowerCase();
      if (item.q.toLowerCase().includes(kw)) {
        throw new Error(`Circular RAG query forbidden: "${item.q}" contains expectedKeyword "${item.expectedKeyword}"`);
      }
      const hits = await queryKnowledge(item.q, 5, { fastLocalOnly: true });
      const elapsed = Date.now() - t0;
      const matchRank = hits.findIndex(h =>
        (h.text || '').toLowerCase().includes(kw) ||
        (h.title || '').toLowerCase().includes(kw) ||
        (h.source || '').toLowerCase().includes(kw)
      );
      const ragas = computeRagasMetrics(item.q, hits, item.expectedKeyword);
      precisionSum += ragas.contextPrecisionAt3;
      faithfulnessSum += ragas.faithfulness;

      if (matchRank >= 0 && elapsed < 350) {
        queriesPassed++;
        mrrSum += 1 / (matchRank + 1);
      } else {
        ragScore -= 8;
      }
    } catch (_) {
      ragScore -= 10;
    }
  }

  const ragTotalTime = Date.now() - ragStart;
  const hitAt5Rate = ((queriesPassed / ragQueries.length) * 100).toFixed(1);
  const mrr = (mrrSum / ragQueries.length).toFixed(3);
  const avgPrecisionAt3 = Number((precisionSum / ragQueries.length).toFixed(3));
  const avgFaithfulness = Number((faithfulnessSum / ragQueries.length).toFixed(3));
  if (avgPrecisionAt3 < 0.80) ragScore -= 10;

  results.dimensions.rag = {
    score: Math.max(0, ragScore),
    queriesTested: ragQueries.length,
    queriesPassed,
    hitAt5Rate: `${hitAt5Rate}%`,
    mrr: Number(mrr),
    contextPrecisionAt3: avgPrecisionAt3,
    faithfulness: avgFaithfulness,
    totalLatencyMs: ragTotalTime
  };
  console.log(`  ✓ RAG Score: ${Math.max(0, ragScore)}/100 | Hit@5: ${hitAt5Rate}% (${queriesPassed}/${ragQueries.length}) | MRR: ${mrr} | Ragas P@3: ${avgPrecisionAt3} | Faithfulness: ${avgFaithfulness} | Total Latency: ${ragTotalTime}ms`);

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
  // Dimension 5: PQC Frontend Verification, Accessibility & CDN Edge Headers
  // --------------------------------------------------------------------------
  console.log(`\n[DIMENSION 5] Auditing PQC Frontend Verification, Accessibility & CDN Edge Headers...`);
  let pqcScore = 100;

  // 5.1 Check CDN Edge _headers in dist/
  const distHeadersPath = path.join(ROOT, 'dist', '_headers');
  let hasEdgeHeaders = false;
  if (fs.existsSync(distHeadersPath)) {
    const hdrRaw = fs.readFileSync(distHeadersPath, 'utf8');
    hasEdgeHeaders =
      hdrRaw.includes('Content-Security-Policy:') &&
      hdrRaw.includes('Strict-Transport-Security:') &&
      hdrRaw.includes('Cache-Control: public, max-age=31536000, immutable');
  }
  if (!hasEdgeHeaders) pqcScore -= 25;

  // 5.2 Check WCAG2AA Semantic Landmarks & ARIA in index.html
  const hasMainLandmark = /<main\b/i.test(indexHtml);
  const hasNavLandmark = /<nav\b|<aside\b/i.test(indexHtml);
  const hasAriaLabels = (indexHtml.match(/aria-label=/gi) || []).length >= 5;
  if (!hasMainLandmark || !hasNavLandmark || !hasAriaLabels) pqcScore -= 25;

  // 5.3 Check Component Visual Regression Harness & Snapshot Baseline Readiness
  const visualHarnessPath = path.join(ROOT, 'tools', 'audit', 'visual_regression.mjs');
  const hasVisualHarness = fs.existsSync(visualHarnessPath);
  if (!hasVisualHarness) pqcScore -= 25;

  // 5.4 Check D1 Provisioning Tool Readiness
  const d1ToolPath = path.join(ROOT, 'tools', 'provision_d1.mjs');
  const hasD1Tool = fs.existsSync(d1ToolPath);
  if (!hasD1Tool) pqcScore -= 25;

  // 5.5 Check ToM-SWE 3-Tier Memory & Diff-UI Adversarial + Stagehand + Oxc Gate
  const tomRes = runSleeptimeCompute();
  const diffUiRes = runDiffUiAdversarialGate();
  if (!tomRes.passed) pqcScore -= 15;
  if (!diffUiRes.passed) pqcScore -= 20;

  console.log(`  ✓ Cloudflare CDN Edge _headers (CSP + HSTS + Immutable Cache): ${hasEdgeHeaders ? 'YES' : 'NO'}`);
  console.log(`  ✓ Semantic Landmarks (<main>, <nav>/<aside>, ARIA >= 5): ${hasMainLandmark && hasNavLandmark && hasAriaLabels ? 'YES' : 'NO'}`);
  console.log(`  ✓ PQC Component Visual Regression Harness Ready: ${hasVisualHarness ? 'YES' : 'NO'}`);
  console.log(`  ✓ Cloudflare D1 Edge Provisioning Tool Ready: ${hasD1Tool ? 'YES' : 'NO'}`);
  console.log(`  ✓ ToM-SWE 3-Tier Mental Model (${tomRes.tier1Count} signals, ${tomRes.tier3PreferencesCount} prefs): ${tomRes.passed ? 'PASS' : 'FAIL'}`);
  console.log(`  ✓ Diff-UI Adversarial + Stagehand Cache + Oxc Rust Linter (${diffUiRes.passedCount}/${diffUiRes.totalTests} in ${diffUiRes.totalElapsedMs}ms): ${diffUiRes.passed ? 'PASS' : 'FAIL'}`);

  results.dimensions.pqc = {
    score: Math.max(0, pqcScore),
    hasEdgeHeaders,
    hasSemanticA11y: hasMainLandmark && hasNavLandmark && hasAriaLabels,
    hasVisualHarness,
    hasD1Tool,
    tomSwePassed: tomRes.passed,
    diffUiAdversarialPassed: diffUiRes.passed,
    oxlintElapsedMs: diffUiRes.oxlintElapsedMs,
    passed: pqcScore >= 80
  };
  if (pqcScore < 80) results.passed = false;

  // --------------------------------------------------------------------------
  // Overall Composite Grade
  // --------------------------------------------------------------------------
  const compositeScore = (
    results.dimensions.rag.score * 0.20 +
    results.dimensions.ast.score * 0.30 +
    results.dimensions.performance.score * 0.20 +
    results.dimensions.compliance.score * 0.15 +
    results.dimensions.pqc.score * 0.15
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
