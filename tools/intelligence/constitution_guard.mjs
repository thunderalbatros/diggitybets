/**
 * tools/intelligence/constitution_guard.mjs — Immutable SHA-256 Constitution & Anti-Reward-Hacking Guard
 * ======================================================================================================
 * Implements Phase 1 of the Gate-Governed Self-Evolving Web Software Factory (2026):
 *   1. Cryptographic SHA-256 verification of AGENTS.md and CONSTRAINTS.md (.agents/memory/constitution_lock.json).
 *   2. Static Anti-Reward-Hacking inspection of eval_matrix.mjs and ast_guard.mjs to guarantee
 *      numeric quality floors (Hit@5 >= 95%, S+ >= 95, Dist <= 50MB, 0 Security Blockers) are never weakened.
 * ======================================================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');
const LOCK_PATH = path.join(ROOT, '.agents', 'memory', 'constitution_lock.json');

const PROTECTED_FILES = [
  'AGENTS.md',
  'CONSTRAINTS.md'
];

function sha256File(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) return null;
  const normalized = fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n');
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

/**
 * Inspects eval_matrix.mjs and ast_guard.mjs to prevent Reward Hacking
 * (e.g., an agent lowering compositeScore >= 95 to >= 50 or disabling securityBlockers check).
 */
export function verifyAntiRewardHackingFloors() {
  const violations = [];

  const evalPath = path.join(ROOT, 'tools', 'intelligence', 'eval_matrix.mjs');
  if (!fs.existsSync(evalPath)) {
    violations.push('Missing tools/intelligence/eval_matrix.mjs');
  } else {
    const evalSrc = fs.readFileSync(evalPath, 'utf8');
    if (!evalSrc.includes('compositeScore >= 95')) {
      violations.push('Reward-Hacking Alert: S+ Elite floor (compositeScore >= 95) was altered in eval_matrix.mjs');
    }
    if (!evalSrc.includes('distMb > 50')) {
      violations.push('Reward-Hacking Alert: Payload ceiling (distMb > 50) was altered in eval_matrix.mjs');
    }
    if (!evalSrc.includes('complianceScore === 100')) {
      violations.push('Reward-Hacking Alert: Strict 100/100 compliance floor was altered in eval_matrix.mjs');
    }
  }

  const astGuardPath = path.join(ROOT, 'tools', 'intelligence', 'ast_guard.mjs');
  if (!fs.existsSync(astGuardPath)) {
    violations.push('Missing tools/intelligence/ast_guard.mjs');
  } else {
    const astSrc = fs.readFileSync(astGuardPath, 'utf8');
    if (!astSrc.includes('missingMethodErrors === 0') || !astSrc.includes('securityBlockers === 0')) {
      violations.push('Reward-Hacking Alert: Zero-tolerance AST/security blocker check was weakened in ast_guard.mjs');
    }
  }

  return {
    passed: violations.length === 0,
    violations
  };
}

/**
 * Seals or verifies the SHA-256 Constitutional Lock.
 */
export function verifyConstitutionLock({ sealIfMissing = true, forceSeal = false } = {}) {
  console.log(`\n======================================================`);
  console.log(`🔒 CONSTITUTIONAL SHA-256 & ANTI-REWARD-HACKING GUARD`);
  console.log(`======================================================`);

  const currentHashes = {};
  for (const rel of PROTECTED_FILES) {
    const h = sha256File(rel);
    if (!h) {
      console.error(`  ❌ Missing protected constitutional file: ${rel}`);
      return { passed: false, reason: `Missing ${rel}` };
    }
    currentHashes[rel] = h;
  }

  const memDir = path.dirname(LOCK_PATH);
  if (!fs.existsSync(memDir)) fs.mkdirSync(memDir, { recursive: true });

  if (forceSeal || (!fs.existsSync(LOCK_PATH) && sealIfMissing)) {
    const lockPayload = {
      version: '2026.10.20',
      sealedBy: 'CTO-HITL-Constitution-Guard',
      sealedAt: new Date().toISOString(),
      algorithm: 'SHA-256 (LF-normalized)',
      files: currentHashes
    };
    fs.writeFileSync(LOCK_PATH, JSON.stringify(lockPayload, null, 2) + '\n', 'utf8');
    console.log(`  ✓ Sealed constitutional manifest at .agents/memory/constitution_lock.json`);
  }

  const savedLock = JSON.parse(fs.readFileSync(LOCK_PATH, 'utf8'));
  const hashDrifts = [];
  for (const rel of PROTECTED_FILES) {
    const expected = savedLock.files?.[rel];
    const actual = currentHashes[rel];
    if (expected !== actual) {
      hashDrifts.push(`${rel} (expected ${expected?.slice(0, 12)}..., got ${actual?.slice(0, 12)}...)`);
    } else {
      console.log(`  ✓ [SHA-256 OK] ${rel} -> ${actual.slice(0, 16)}...`);
    }
  }

  const floorAudit = verifyAntiRewardHackingFloors();
  if (floorAudit.passed) {
    console.log(`  ✓ [ANTI-REWARD-HACKING OK] Numeric floors in eval_matrix.mjs & ast_guard.mjs are intact.`);
  } else {
    for (const v of floorAudit.violations) {
      console.error(`  ❌ ${v}`);
    }
  }

  const passed = hashDrifts.length === 0 && floorAudit.passed;
  if (!passed && hashDrifts.length > 0) {
    console.error(`  ❌ Constitutional Drift Detected in: ${hashDrifts.join(', ')}`);
  }

  console.log(`------------------------------------------------------`);
  console.log(`${passed ? '✅ [CONSTITUTION GUARD PASSED]' : '🚨 [CONSTITUTION GUARD BLOCKED]'}`);
  console.log(`======================================================\n`);

  return {
    passed,
    hashDrifts,
    floorViolations: floorAudit.violations,
    hashes: currentHashes
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const forceSeal = process.argv.includes('--seal');
  const res = verifyConstitutionLock({ forceSeal });
  process.exit(res.passed ? 0 : 1);
}
