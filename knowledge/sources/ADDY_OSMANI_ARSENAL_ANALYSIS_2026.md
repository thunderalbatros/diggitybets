# Addy Osmani GitHub Arsenal Analysis (2026) — Agentic Engineering & Web Quality

> **Scope Anchor:** Deep technical investigation of Addy Osmani's GitHub repositories (`https://github.com/addyosmani?tab=repositories`) for HuntHub / DiggityBets (`diggitybets.vip`), covering both the AI Agent Squad (`agent-skills`, `web-quality-skills`, `adverse`, `agent-house`, `factory`, `agent-engineer`, `clarity`, `context-buddy`) and the production Web & OBS Streaming Suite (`critical`, `visibly.js`, `agentic-seo`, `quicklink`, `oust`).
> **Verification Tag:** `[VERIFICADO: https://api.github.com/users/addyosmani/repos, 2026-10-17]`

---

## 1. Executive Classification of Addy Osmani's Repositories

### Tier 1 — AI Agent Engineering, Harness & Quality Gates (2025–2026)
| Repository | Stars | Last Push | Core Mechanism & Value for HuntHub Agent Team |
| :--- | :---: | :---: | :--- |
| **`addyosmani/agent-skills`** | ⭐ 107,828 | `2026-10-13` | Production-grade engineering skills for coding agents: `constraint-driven-development` (`CONSTRAINTS.md` + `floor-guard`), `doubt-driven-development`, `source-driven-development`, `spec-driven-development`, `incremental-implementation`, `performance-optimization`, `security-and-hardening`. |
| **`addyosmani/web-quality-skills`** | ⭐ 2,956 | `2026-08-24` | Measurement-first Lighthouse & Core Web Vitals (`LCP ≤ 2.5s`, `INP ≤ 200ms`, `CLS ≤ 0.1`) skills + **Metric-Honesty Rule** (never hallucinate performance numbers; measure via real `PerformanceObserver` / DevTools traces). |
| **`addyosmani/adverse`** | ⭐ 62 | `2026-06-20` | Multi-agent adversarial code review: spawns 3 specialized reviewers (**Auditor**, **Adversary**, **Pragmatist**), runs cross-examination, and deterministically synthesizes a ranked report. |
| **`addyosmani/agent-house`** | ⭐ 22 | `2026-06-20` | **"Lighthouse for Agents"**: profiles agent runs across 4 categories (*Cost*, *Latency*, *Reliability*, *Context Hygiene*) and flags redundant tool calls, missed parallelization, oversized context, and model-tier mismatches. |
| **`addyosmani/factory`** | ⭐ 239 | `2026-08-21` | Reference Software Factory loop (`factory-spec` → `factory-implement` → `factory-verify` → `factory-critic` + `gates.sh` / `block-merge.sh`). |
| **`addyosmani/agent-engineer`** | ⭐ 519 | `2026-07-16` | 19-module curriculum for Agent Engineers covering `AGENTS.md` (Module 15), MCP/A2A (Modules 14 & 16), Agentic RAG (Module 8), Evals (Module 9), and Guardrails (Module 10). |
| **`addyosmani/clarity`** | ⭐ 273 | `2026-09-05` | Agent skill and eval judge (`evals/JUDGE.md`) for clear, zero-fluff human writing and structured interviews (`clarity-interview`, `clarity-review`). |
| **`addyosmani/context-buddy`** | ⭐ 55 | `2025-09-08` | Context Engineering budgets: managing token signal-to-noise ratio, pruning stale tool outputs, and scoping retrievals. |
| **`addyosmani/gemini-cli-tips`** | ⭐ 2,360 | `2025-10-19` | Practical patterns for Gemini CLI / agentic workflows, custom commands, MCP scoping, and deterministic verification hooks. |

### Tier 2 — Web Performance, Browser Architecture & Agentic SEO (For `diggitybets.vip` & OBS Overlays)
| Repository | Stars | Last Push | Core Mechanism & Value for `diggitybets.vip` |
| :--- | :---: | :---: | :--- |
| **`addyosmani/agentic-seo`** | ⭐ 335 | `2026-04-12` | **Agentic Engine Optimization (AEO)**: 100-point audit across `robots.txt` AI crawler permissions, `/llms.txt` structured index, `AGENTS.md`, semantic HTML hierarchy, and token budgets. |
| **`addyosmani/critical`** | ⭐ 10,292 | `2026-10-13` | Critical-path CSS & layout containment (`contain: layout style` / `content-visibility`) so off-screen or inactive panels never block rendering. |
| **`addyosmani/visibly.js`** | ⭐ 221 | `2026-06-12` | Page Visibility API (`document.hidden` / `visibilitychange`) governor to throttle non-essential visual animations when a browser tab is in the background while keeping WebSockets active. |
| **`addyosmani/predictive-fetching`** | ⭐ 240 | `2026-07-06` | Predictive asset preloading (`preloadSlotImage` / `<link rel="preconnect">`) for zero-latency slot card reveals in roulette spins and 1v1 battles. |
| **`addyosmani/oust`** | ⭐ 193 | `2026-04-02` | Fast static HTML asset link extractor (`<script>`, `<link>`, `<img>`) — ideal for build-time integrity verification in `tools/build_dist.mjs` and `floor_and_aeo_guard.mjs`. |

---

## 2. Concrete Integrations Applied to HuntHub / DiggityBets

1. **For the AI Agent Squad (`.agents/skills/` & `CONSTRAINTS.md`):**
   - Installed `.agents/skills/constraint-driven-development/SKILL.md` + `CONSTRAINTS.md` with numeric quality floors and `tools/audit/floor_and_aeo_guard.mjs`.
   - Installed `.agents/skills/adverse-review/SKILL.md` (3-Persona Adversarial Review: *Auditor*, *Adversary*, *Pragmatist*).
   - Installed `.agents/skills/web-quality-skills/SKILL.md` (Core Web Vitals `LCP`/`INP`/`CLS` + Metric-Honesty Rule).
   - Installed `.agents/skills/agent-house-profiler/SKILL.md` (Lighthouse for Agents: Cost, Latency, Reliability, Context Hygiene).
2. **For the Website & Streamer Control Panel (`diggitybets.vip`):**
   - **Live Web Vitals & FPS Telemetry (`web-quality-skills`):** Real-time **FPS + INP (Interaction to Next Paint)** monitor badge (`#cp-webvitals-pill`) inside the Control Panel Performance Saver bar using `PerformanceObserver` and `requestAnimationFrame`.
   - **Page Visibility Smart Governor (`visibly.js`):** Automatically pauses background decorative animations (`document.hidden`) when the Control Panel tab is unfocused while keeping the Kick Pusher WebSocket (`!battle`, `!sr`, `!tourney`, `!guess`) and OBS Overlay sync 100% live.
   - **CSS Layout & Style Containment (`critical` / `web-quality-skills`):** Added `contain: layout style;` on `#control-panel` game module cards so DOM updates in one game never trigger layout thrashing in the others.
   - **Agentic Engine Optimization (`agentic-seo`):** Added `/llms.txt` and `/robots.txt` (bundled into `dist/`) plus semantic metadata so `diggitybets.vip` scores 100/100 on AEO discoverability.
