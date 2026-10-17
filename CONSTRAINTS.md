# CONSTRAINTS.md — HuntHub & DiggityBets Enforced Quality Contract

> **Pattern:** `addyosmani/agent-skills` (`constraint-driven-development` + `floor-guard`) & `addyosmani/web-quality-skills`  
> **Enforcement:** Checked mechanically via `node tools/audit/floor_and_aeo_guard.mjs` and `node tools/audit/security_and_motion_audit.mjs`.  
> **Floor Rule:** Tightening a threshold is silent; loosening a threshold, deleting a test, adding a checker suppression (`@ts-ignore`, `eslint-disable`), or leaving an empty `catch` without rationale blocks the build (`exit 1`).

---

## 1. Numeric Quality Floors

| Dimension | Metric / Target | Threshold | Verification Command |
| :--- | :--- | :--- | :--- |
| **OBS Overlay CPU Budget** | Per-Browser-Source CPU on HP 250 G8 | `<= 5% CPU` | `node tools/audit/security_and_motion_audit.mjs` |
| **Control Panel Interactivity (INP)** | Interaction to Next Paint (`#control-panel`) | `<= 150 ms` | Live `#cp-webvitals-pill` (`PerformanceObserver`) |
| **Visual Stability (CLS)** | Cumulative Layout Shift (`180x236` Slot Cards) | `<= 0.05` | `node tools/audit/floor_and_aeo_guard.mjs` |
| **Largest Contentful Paint (LCP)** | Initial Viewport Render (`diggitybets.vip`) | `<= 2500 ms` | `node tools/audit/floor_and_aeo_guard.mjs` |
| **OBS Overlays Bundled in `dist/`** | Required Production Overlay Directories | `>= 8 overlays` | `node tools/build_dist.mjs` |
| **Agentic SEO (AEO) Score** | `robots.txt` + `llms.txt` + `AGENTS.md` + Meta | `100 / 100` | `node tools/audit/floor_and_aeo_guard.mjs` |
| **XSS & Link Security** | `window.escapeHTML` + `rel="noopener noreferrer"` | `100% pass` | `node tools/audit/security_and_motion_audit.mjs` |
| **Hosting & Dependency Cost** | Permanent Free Tier (Zero Credit Card) | `USD 0.00` | `docs/COST_AUDIT.md` |

---

## 2. The Five Forbidden Floor-Lowering Moves (Addy Osmani Floor Guard)

1. **Weakened Threshold:** Editing any numeric target in `CONSTRAINTS.md` to make it easier to pass without explicit human authorization.
2. **Weakened or Skipped Tests:** Adding `.skip` / `.only` to tests, deleting test files, or removing assertions to turn a red suite green.
3. **Silenced Checkers:** Adding `@ts-ignore`, `@ts-expect-error`, `eslint-disable`, or bypassing `node --check` syntax validation.
4. **Unfinished Stubs in Production:** Shipping `TODO:`, `FIXME:`, `throw new Error('Not implemented')`, or hardcoded fake demo users (`LuckyStriker`, `VegasKing`, etc.) as default live state.
5. **Unregistered Overlays:** Creating an OBS overlay directory without registering it in `overlayDirs` inside `tools/build_dist.mjs`.
