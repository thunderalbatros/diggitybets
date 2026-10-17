/**
 * tools/lib/sandcastle-runner.mjs — Sandcastle Engine (Matt Pocock Pattern)
 * =============================================================================
 * Lightweight, zero-daemon git-worktree isolation engine for AI agents.
 * Provides ephemeral sandboxes for running spikes, tests, and refactors
 * without polluting the main working branch or requiring local Docker daemons.
 * =============================================================================
 */

import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

export function getSandboxPath(name) {
  const cleanName = String(name).replace(/[^a-zA-Z0-9_\-]/g, '');
  return path.join(ROOT, '.sandboxes', cleanName);
}

export function listSandboxes() {
  try {
    const stdout = execSync('git worktree list --porcelain', { cwd: ROOT, encoding: 'utf8' });
    const lines = stdout.split(/\r?\n/);
    const worktrees = [];
    let current = {};

    for (const line of lines) {
      if (line.startsWith('worktree ')) {
        if (current.worktree) worktrees.push(current);
        current = { worktree: line.replace('worktree ', '').trim() };
      } else if (line.startsWith('HEAD ')) {
        current.head = line.replace('HEAD ', '').trim().slice(0, 8);
      } else if (line.startsWith('branch ')) {
        current.branch = line.replace('branch refs/heads/', '').trim();
      }
    }
    if (current.worktree) worktrees.push(current);

    // Filter only those in .sandboxes
    return worktrees.filter(w => {
      const norm = path.normalize(w.worktree).toLowerCase();
      return norm.includes(path.normalize(path.join(ROOT, '.sandboxes')).toLowerCase());
    });
  } catch (_) {
    return [];
  }
}

export function createSandbox(name, baseRef = 'HEAD') {
  const cleanName = String(name).trim().replace(/[^a-zA-Z0-9_\-]/g, '');
  if (!cleanName) {
    throw new Error('Invalid sandbox name');
  }

  const targetDir = getSandboxPath(cleanName);
  const branchName = `sandbox/${cleanName}`;

  if (fs.existsSync(targetDir)) {
    throw new Error(`Sandbox directory already exists at ${targetDir}`);
  }

  // Ensure .sandboxes directory exists and is ignored by git
  const sandboxesRoot = path.join(ROOT, '.sandboxes');
  if (!fs.existsSync(sandboxesRoot)) {
    fs.mkdirSync(sandboxesRoot, { recursive: true });
  }

  // Ensure .gitignore has .sandboxes
  const gitignorePath = path.join(ROOT, '.gitignore');
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    if (!gitignoreContent.includes('.sandboxes')) {
      fs.appendFileSync(gitignorePath, '\n# Sandcastle Ephemeral Worktrees\n.sandboxes/\n');
    }
  }

  // Create git worktree
  execSync(`git worktree add -b "${branchName}" "${targetDir}" ${baseRef}`, {
    cwd: ROOT,
    stdio: 'pipe'
  });

  return {
    name: cleanName,
    path: targetDir,
    branch: branchName
  };
}

export function runInSandbox(name, command) {
  const targetDir = getSandboxPath(name);
  if (!fs.existsSync(targetDir)) {
    throw new Error(`Sandbox '${name}' does not exist at ${targetDir}`);
  }

  const res = spawnSync(command, {
    cwd: targetDir,
    shell: true,
    stdio: 'inherit'
  });

  return {
    status: res.status ?? 0
  };
}

export function verifySandbox(name) {
  const targetDir = getSandboxPath(name);
  if (!fs.existsSync(targetDir)) {
    throw new Error(`Sandbox '${name}' does not exist`);
  }

  console.log(`🔍 [Sandcastle] Running Verification Gates on sandbox '${name}'...`);

  // 1. Run core test suite if core exists
  const corePackage = path.join(targetDir, 'core', 'package.json');
  if (fs.existsSync(corePackage)) {
    const res = spawnSync('npm test', {
      cwd: path.join(targetDir, 'core'),
      shell: true,
      stdio: 'inherit'
    });
    if (res.status !== 0) return false;
  }

  // 2. Run site test if tools/test_site.mjs exists
  const siteTest = path.join(targetDir, 'tools', 'test_site.mjs');
  if (fs.existsSync(siteTest)) {
    const res = spawnSync(`node "${siteTest}"`, {
      cwd: targetDir,
      shell: true,
      stdio: 'inherit'
    });
    if (res.status !== 0) return false;
  }

  return true;
}

export function mergeSandbox(name) {
  const targetDir = getSandboxPath(name);
  const cleanName = String(name).trim().replace(/[^a-zA-Z0-9_\-]/g, '');
  const branchName = `sandbox/${cleanName}`;

  if (!fs.existsSync(targetDir)) {
    throw new Error(`Sandbox '${name}' does not exist`);
  }

  console.log(`🛡️ [Sandcastle] Verifying sandbox before merge...`);
  const isVerified = verifySandbox(cleanName);
  if (!isVerified) {
    throw new Error(`Verification tests failed in sandbox '${cleanName}'. Merge aborted.`);
  }

  console.log(`🔀 [Sandcastle] Merging '${branchName}' into active branch...`);
  execSync(`git merge "${branchName}" --no-edit`, { cwd: ROOT, stdio: 'inherit' });

  console.log(`🧹 [Sandcastle] Cleaning up sandbox '${cleanName}'...`);
  destroySandbox(cleanName);
}

export function destroySandbox(name) {
  const cleanName = String(name).trim().replace(/[^a-zA-Z0-9_\-]/g, '');
  const targetDir = getSandboxPath(cleanName);
  const branchName = `sandbox/${cleanName}`;

  try {
    execSync(`git worktree remove --force "${targetDir}"`, { cwd: ROOT, stdio: 'pipe' });
  } catch (_) {}

  try {
    execSync(`git branch -D "${branchName}"`, { cwd: ROOT, stdio: 'pipe' });
  } catch (_) {}

  if (fs.existsSync(targetDir)) {
    try {
      fs.rmSync(targetDir, { recursive: true, force: true });
    } catch (_) {}
  }
}
