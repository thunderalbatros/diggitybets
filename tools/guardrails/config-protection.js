#!/usr/bin/env node
/**
 * ECC Guardrail: config-protection.js
 * Verifies that critical environment and configuration files are present and valid.
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

const CHECKS = [
  {
    path: 'core/package.json',
    required: true,
    validator: (content) => {
      const pkg = JSON.parse(content);
      return pkg.name === 'hunthub-core' && pkg.scripts && pkg.scripts.test;
    }
  },
  {
    path: 'AGENTS.md',
    required: true,
    validator: (content) => content.includes('HuntHub') && content.includes('Zero heavy runtime')
  },
  {
    path: '.agents/agency/ORGANIZATION.md',
    required: true,
    validator: (content) => content.includes('HuntHub Web Studio')
  }
];

let errors = 0;
console.log(`[ECC Guardrail] Config Protection Audit starting from root: ${ROOT}`);

for (const check of CHECKS) {
  const fullPath = path.resolve(ROOT, check.path);
  if (!fs.existsSync(fullPath)) {
    if (check.required) {
      console.error(`  ✖ Missing critical file: ${check.path} (resolved: ${fullPath})`);
      errors++;
    }
    continue;
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (!check.validator(content)) {
      console.error(`  ✖ File failed validation check: ${check.path}`);
      errors++;
    } else {
      console.log(`  ✔ Verified: ${check.path}`);
    }
  } catch (err) {
    console.error(`  ✖ Error reading/validating ${check.path}:`, err.message);
    errors++;
  }
}

if (errors > 0) {
  console.error(`[ECC Guardrail] Config Protection FAILED with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log(`[ECC Guardrail] All critical configuration files intact.`);
  process.exit(0);
}
