---
name: agent-house-profiler
description: "Profiles and optimizes AI agent execution efficiency based on addyosmani/agent-house ('Lighthouse for Agents') and."
---

# Agent-House Profiler & Context Buddy (`addyosmani/agent-house`)

## Overview

Inspired by Addy Osmani's **`agent-house`** (*"Lighthouse for agents — score an agent run, then tell it how to get faster and cheaper"*) and **`context-buddy`**, this skill governs how HuntHub agents spend tokens, tool calls, and time.

## The Four Profiling Categories (100-Point Scale)

### 1. 💰 Cost & Model-Tier Discipline (25 pts)
- Batch independent file reads (`view_file`) and searches into a single parallel turn instead of sequential round-trips.
- Never re-read the same unchanged file range twice in one task.

### 2. ⚡ Latency & Parallelization (25 pts)
- When creating or auditing multiple independent files (e.g. `index.html`, `style.css`, `main.js`), invoke tools in parallel.
- Combine CLI verification steps (`node --check`, `build_dist.mjs`, `security_and_motion_audit.mjs`, `floor_and_aeo_guard.mjs`) into a single compound command.

### 3. 🧹 Context Hygiene (`context-buddy`) (25 pts)
- Read targeted line ranges (`StartLine` / `EndLine`) on large files like `index.html` (~3,000 lines) and `site/js/admin-hub.js` (~4,800 lines) rather than dumping entire files into context.
- Persist architectural findings in `knowledge/sources/` and `CONSTRAINTS.md` so future turns don't repeat discovery work.

### 4. 🛡️ Reliability & Deterministic Verification (25 pts)
- Never claim a fix works without running the deterministic CLI gates (`exit 0`).
- Verify `git status` and `git log -n 1` after committing to confirm no untracked or ignored files were missed.
