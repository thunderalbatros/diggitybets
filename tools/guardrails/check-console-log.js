#!/usr/bin/env node
/**
 * ECC Guardrail: check-console-log.js
 * Scans production source files for residual debug console.log statements.
 * CWD-independent: dynamically resolves workspace root via AGENTS.md.
 */

import fs from 'fs';
import path from 'path';

function getWorkspaceRoot() {
  let cur = process.cwd();
  for (let i = 0; i < 5; i++) {
    if (fs.existsSync(path.join(cur, 'AGENTS.md'))) {
      return cur;
    }
    const parent = path.dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  return process.cwd();
}

const ROOT = getWorkspaceRoot();

const TARGET_DIRS = [
  path.resolve(ROOT, 'core/src'),
  path.resolve(ROOT, 'site/js')
];

const IGNORE_PATTERNS = [
  /chat-sim\.ts$/, // Simulator intentionally logs to console
  /\.test\.ts$/,
  /\.spec\.ts$/
];

let totalWarnings = 0;
const findings = [];

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(ts|js)$/.test(entry.name)) {
      if (IGNORE_PATTERNS.some(p => p.test(fullPath))) continue;

      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, idx) => {
        // Match console.log but not console.warn or console.error
        if (/\bconsole\.log\s*\(/.test(line) && !line.trim().startsWith('//')) {
          totalWarnings++;
          findings.push({
            file: path.relative(ROOT, fullPath),
            line: idx + 1,
            code: line.trim()
          });
        }
      });
    }
  }
}

for (const dir of TARGET_DIRS) {
  scanDir(dir);
}

console.log(`[ECC Guardrail] Console Log Audit: ${findings.length} statement(s) found across production files.`);
if (findings.length > 0) {
  findings.slice(0, 10).forEach(f => {
    console.log(`  ℹ ${f.file}:${f.line} -> ${f.code}`);
  });
  if (findings.length > 10) {
    console.log(`  ... and ${findings.length - 10} more.`);
  }
} else {
  console.log(`  ✔ Clean! No unauthorized console.log in core production code.`);
}

process.exit(0);
