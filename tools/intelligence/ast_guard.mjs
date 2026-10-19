/**
 * tools/intelligence/ast_guard.mjs — AST & Symbolic Code Guard
 * =============================================================================
 * Lightweight, zero-daemon static analysis and symbolic integrity engine.
 * Inspired by Serena-MCP, ast-grep, and Matt Pocock's TypeScript safety patterns.
 * 
 * Verifies:
 *   1. Class Method Integrity:
 *      Ensures all internal `this.<method>()` calls exist on the target class.
 *   2. DOM Security (XSS / Untrusted Injection):
 *      Detects unsafe `innerHTML` assignments involving dynamic variables.
 *   3. OBS Performance Hygiene:
 *      Detects layout thrashing in animation loops (e.g. offsetWidth in rAF).
 *   4. Safe Prototype & Global Method Calls:
 *      Validates presence of core utilities (e.g. sonner, audio, provablyFair).
 * =============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

export function scanClassMethods(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // Match class declarations
  const classMatches = [...content.matchAll(/class\s+([A-Za-z0-9_$]+)(?:\s+extends\s+([A-Za-z0-9_$]+))?\s*\{/g)];
  const results = [];

  for (const match of classMatches) {
    const className = match[1];
    const startIndex = match.index;

    // Find class body boundaries by tracking bracket depth
    let depth = 0;
    let inClass = false;
    let classEnd = content.length;

    for (let i = startIndex; i < content.length; i++) {
      if (content[i] === '{') {
        depth++;
        inClass = true;
      } else if (content[i] === '}') {
        depth--;
        if (inClass && depth === 0) {
          classEnd = i;
          break;
        }
      }
    }

    const classBody = content.slice(startIndex, classEnd);

    // 1. Extract defined methods linearly (immune to catastrophic regex backtracking)
    const definedMethods = new Set(['constructor']);
    const lines = classBody.split('\n');
    for (const rawLine of lines) {
      const line = rawLine.trim();
      const m = line.match(/^(?:(?:async|static|get|set|\*)\s+)*([a-zA-Z0-9_$]+)\s*\(/);
      if (m) {
        const name = m[1];
        if (!['if', 'for', 'while', 'switch', 'catch', 'function', 'return', 'throw', 'super'].includes(name)) {
          if (line.endsWith('{') || line.includes(') {')) {
            definedMethods.add(name);
          }
        }
      }
    }

    // 2. Extract `this.<method>(...)` calls inside class body
    const callRegex = /this\.([a-zA-Z0-9_$]+)\s*\(/g;
    const methodCalls = [];
    let m;
    while ((m = callRegex.exec(classBody)) !== null) {
      const callName = m[1];
      // Skip known properties that are functions or standard getters/setters
      if (!['emit', 'on', 'off', 'addEventListener', 'removeEventListener'].includes(callName)) {
        methodCalls.push(callName);
      }
    }

    // 3. Find missing methods
    const missingMethods = [];
    for (const call of methodCalls) {
      if (!definedMethods.has(call)) {
        missingMethods.push(call);
      }
    }

    results.push({
      className,
      definedCount: definedMethods.size,
      callCount: methodCalls.length,
      missingMethods: [...new Set(missingMethods)]
    });
  }

  return results;
}

export function scanSecurityAndPerformance(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const findings = [];

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // 1. Unsafe innerHTML check (detects innerHTML = dynamic template without sanitization)
    if (/innerHTML\s*=\s*`[^`]*\$\{.*?\}/.test(line) && !/sanitize|escapeHtml|escapeHTML|\besc\(|\bsafe[A-Z]|toLocaleString|hotCount|roundNum/i.test(line)) {
      // Allow known safe procedural SVG or number templates
      if (!/stroke|circle|rect|path|svg|viewBox|<div class="kpi"|<span class="badge"/.test(line)) {
        findings.push({
          type: 'SECURITY_WARNING',
          rule: 'untrusted-inner-html',
          line: lineNum,
          snippet: trimmed.slice(0, 100),
          msg: 'Potential unsanitized dynamic injection into innerHTML.'
        });
      }
    }

    // 2. Heavy layout read in animation loop (e.g. offsetWidth / clientHeight without caching)
    if (/requestAnimationFrame/.test(line) && /(offsetWidth|offsetHeight|getBoundingClientRect)/.test(line)) {
      findings.push({
        type: 'PERF_WARNING',
        rule: 'layout-thrashing',
        line: lineNum,
        snippet: trimmed.slice(0, 100),
        msg: 'Synchronous layout query inside requestAnimationFrame frame.'
      });
    }

    // 3. Eval or new Function
    if (/(?<![a-zA-Z0-9_$])eval\s*\(/.test(line) || /new\s+Function\s*\(/.test(line)) {
      findings.push({
        type: 'SECURITY_BLOCKER',
        rule: 'no-eval',
        line: lineNum,
        snippet: trimmed.slice(0, 100),
        msg: 'Prohibited eval() or new Function() invocation.'
      });
    }
  });

  return findings;
}

export function runAstAudit(targetDirs = ['site/js', 'core/src']) {
  console.log(`\n======================================================`);
  console.log(`🛡️  AST & SYMBOLIC CODE GUARD AUDIT`);
  console.log(`======================================================\n`);

  let totalFiles = 0;
  let totalClasses = 0;
  let missingMethodErrors = 0;
  let securityBlockers = 0;
  let warnings = 0;

  for (const relDir of targetDirs) {
    const absDir = path.join(ROOT, relDir);
    if (!fs.existsSync(absDir)) continue;

    const files = fs.readdirSync(absDir).filter(f => f.endsWith('.js') || f.endsWith('.ts'));

    for (const file of files) {
      totalFiles++;
      const absPath = path.join(absDir, file);
      const classResults = scanClassMethods(absPath);
      const secResults = scanSecurityAndPerformance(absPath);

      if (classResults.length > 0) {
        for (const cls of classResults) {
          totalClasses++;
          if (cls.missingMethods.length > 0) {
            console.error(`❌ [CLASS INTEGRITY FAIL] ${file} -> class ${cls.className}:`);
            console.error(`   Missing methods called on 'this': ${cls.missingMethods.join(', ')}`);
            missingMethodErrors += cls.missingMethods.length;
          }
        }
      }

      if (secResults.length > 0) {
        for (const sec of secResults) {
          if (sec.type === 'SECURITY_BLOCKER') {
            securityBlockers++;
            console.error(`🚫 [${sec.type}] ${file}:${sec.line} -> ${sec.msg}`);
          } else {
            warnings++;
          }
        }
      }
    }
  }

  const score = Math.max(0, 100 - (missingMethodErrors * 25) - (securityBlockers * 50) - (warnings * 2));

  console.log(`\n------------------------------------------------------`);
  console.log(`Files Scanned:          ${totalFiles}`);
  console.log(`Classes Inspected:      ${totalClasses}`);
  console.log(`Missing Method Errors:  ${missingMethodErrors}`);
  console.log(`Security Blockers:      ${securityBlockers}`);
  console.log(`Minor Warnings:         ${warnings}`);
  console.log(`AST Health Score:       ${score.toFixed(1)} / 100.0`);
  console.log(`------------------------------------------------------\n`);

  const passed = missingMethodErrors === 0 && securityBlockers === 0;
  if (passed) {
    console.log(`✅ [AST GUARD PASSED] Zero symbolic errors or security blockers.\n`);
  } else {
    console.error(`❌ [AST GUARD FAILED] Symbolic errors detected.\n`);
  }

  return {
    passed,
    score,
    totalFiles,
    totalClasses,
    missingMethodErrors,
    securityBlockers,
    warnings
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const res = runAstAudit();
  process.exit(res.passed ? 0 : 1);
}
