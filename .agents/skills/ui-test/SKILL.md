---
name: ui-test
description: "Diff-driven adversarial UI testing, Stagehand self-healing DOM selector verification, Surgical Path-Based Governance, and Oxc Rust AST linting (<50ms). Inspired by browserbase/skills (ui-test) and browserbase/stagehand. Use before shipping any UI, overlay, or backend change."
license: MIT
---

# UI Test — Diff-Driven Adversarial UI & Stagehand Selector Verification Skill

Test UI and full-stack changes adversarially. Your job is to **try to break things** and verify every assertion with deterministic evidence (`STEP_PASS` / `STEP_FAIL`), not assume they work.

## 1. Automated Fast CLI Gate (`<200ms`)

Always run the automated Diff-UI Adversarial + Stagehand Selector Self-Healing + Oxc Rust Linter gate first:

```bash
node tools/audit/diff_ui_adversarial.mjs
# or via npm:
npm run audit:diff-ui
```

What this gate enforces deterministically:
1. **Surgical Path-Based Governance (`surgical-path-worker-security`)**: Flags any change touching `worker/index.js`, `site/js/auth-oauth.js`, `wrangler.toml`, `.mcp.json`, or `constitution_guard.mjs`, and verifies admin authorization guards (`isAuthorizedAdmin`) and live stream endpoints (`/api/kick/chat/announce`).
2. **Stagehand v1.5 Self-Healing Selector Cache (`memory/selector_cache.json`)**: Verifies `observe()` and `extract()` primitives across `index.html` and all OBS overlays (`overlay-celebration`, `overlay-battle`, `overlay-bonushunt`, `overlay-tourney`, `overlay-slotrequests`), automatically self-healing via fallback selectors if primary selectors change.
3. **Live Stream & Winner Celebration Invariants**: Confirms `hunthub_demo_users_purged_live_v4` (0% fake/demo users) and `announceStreamWinner` (1920x1080 celebration overlay + on-screen banner + Kick Chat Bot).
4. **Rust-Speed AST Linting (`oxlint v1.89.0`)**: Runs `oxc-project/oxc` Rust linter in ~110ms with zero background daemon overhead.

---

## 2. Three-Round Adversarial Planning Protocol (Before Browser Sub-Agents)

When testing a non-trivial UI feature or full-page redesign in a headless browser (`Playwright` / `visual_regression.mjs`), complete all three planning rounds before executing:

- **Round 1 — Functional**: What are the core user/streamer flows? Write each test as `action → expected result`.
- **Round 2 — Adversarial**: Re-read Round 1. What could break? Test rapid double-clicks, empty forms, 500-char strings, `<script>alert(1)</script>` XSS payloads in Kick chat commands (`!sr`, `!battle`, `!gtb`), Escape key mid-modal, and missing slot images.
- **Round 3 — Coverage Gaps**: Check `axe-core` WCAG2AA accessibility, mobile `390x844` & OBS `1920x1080` overflow, console errors, and `60-FPS` CPU budget (`<=5%` in OBS).

---

## 3. Structured Assertion Protocol

Every test step MUST emit a deterministic marker:

```text
STEP_PASS|<step-id>|<evidence>
STEP_FAIL|<step-id>|<expected> -> <actual>|.context/ui-test-screenshots/<step-id>.png
```

## Reference Guides (Copied from `browserbase/skills`)
- [references/adversarial-patterns.md](references/adversarial-patterns.md) — Forms, modals, navigation, error states, and keyboard accessibility stress tests.
- [references/browser-recipes.md](references/browser-recipes.md) — Deterministic browser eval recipes (`axe-core`, FCP/DOM interactive timing, broken images, console errors, tab order).
- [references/ux-heuristics.md](references/ux-heuristics.md) — Laws of UX and Nielsen heuristics checklist.
- [references/design-consistency.md](references/design-consistency.md) — Visual consistency verification across pages and overlays.
