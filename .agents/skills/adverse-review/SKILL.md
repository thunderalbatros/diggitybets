---
name: adverse-review
description: "Multi-agent adversarial code review based on addyosmani/adverse."
---

# Adverse — Multi-Agent Adversarial Code Review (`addyosmani/adverse`)

## When to Use

Invoke this skill before landing non-trivial changes, refactors across multiple files, Kick WebSocket/Edge sync changes, or OBS overlay updates. Skip for trivial 1-line formatting or typo fixes.

## The Three Reviewer Personas

Evaluate the diff through three independent lenses (or spawn 3 parallel subagents when deep isolation is needed):

### 1. 🛡️ The Adversary (Security, Race Conditions & Edge Cases)
- Attempts to break the implementation with malformed Kick chat input (`!battle`, `!sr`, `!tourney`, `!guess` with XSS payloads, empty strings, Unicode RTL, or duplicate rapid-fire commands).
- Checks for race conditions between `BroadcastChannel`, `localStorage`, and Cloudflare Edge `/api/sync/state`.
- Verifies zero secrets in git and strict `window.escapeHTML` / `textContent` usage.

### 2. 📋 The Auditor (Spec, Compliance & Accessibility)
- Verifies 100% alignment with [`AGENTS.md`](file:///c:/Users/tomas/Desktop/streamerbot/AGENTS.md) and [`CONSTRAINTS.md`](file:///c:/Users/tomas/Desktop/streamerbot/CONSTRAINTS.md).
- Checks +18 Responsible Gambling compliance (100% free spectator participation, zero pay-to-enter mechanics).
- Verifies all OBS overlays are registered in `tools/build_dist.mjs` and slot cards preserve the `180/236` aspect ratio.

### 3. ⚡ The Pragmatist (HP 250 G8 Performance, Simplicity & YAGNI)
- Hunts down unnecessary DOM nodes, unthrottled `setInterval` loops, layout thrashing, or bloat that could slow down the streamer's HP 250 G8 notebook or OBS Studio Browser Sources.
- Verifies that inactive `#control-panel` game modules respect `window.isControlPanelModuleActive(moduleId)` and Page Visibility (`document.hidden`).

## Cross-Examination & Synthesis

1. Discard speculative nitpicks where the Pragmatist proves zero real-world impact.
2. Rank confirmed findings by severity (`P0 Blocker`, `P1 High`, `P2 Medium`) and fix all `P0`/`P1` issues before committing.
