# AGENTS.md — HuntHub Engineering & Agent Protocols

> **Project:** HuntHub (Casino Stream Engagement Suite)  
> **Audience:** All Antigravity Agents, Subagents, and Automation Workflows.  
> **Communication Rule:** Argentine Spanish with the user; English for code, commits, identifiers, and tests.

---

## 1. Context and Hard Constraints

- **User Profile:** Sole entrepreneur, non-programmer, channel owner/operator. Explain concepts in simple words; all technical decisions require approval at defined Gates.
- **Hardware & Environment:** HP 250 G8 notebook (Windows, limited CPU/RAM, 600 Mbps fiber).
  - **Zero heavy runtime:** No Docker, no local LLM servers, lightweight background processes.
  - **OBS Browser Sources:** Must remain lightweight (≤5% CPU impact inside OBS).
- **Budget:** Strict **USD 0 / ARS 0**, permanently free, **no credit card required**.
- **Model Discipline:** Small, atomic commits/tasks (≤300 lines of changes per step), persist context in files (`docs/STATUS.md`, `docs/tasks/`), test-first approach, verify APIs against official documentation.
- **Mandatory Fact Tagging:**
  - `[VERIFICADO: source, date]` for confirmed facts.
  - `[ASUNCIÓN]` for unverified claims until proven.

---

## 2. Non-Negotiable Rules

### 2.1 100% Free Tier & Permissive Licensing
- Every library, dependency, and platform must be on a permanent free plan without credit card requirement.
- Licenses must be commercially permissive: MIT, Apache-2.0, BSD, CC0, OFL.
- All dependencies must be logged in `docs/COST_AUDIT.md`. Reject services requiring credit cards.

### 2.2 Compliance & Responsible Gambling
- Kick allows gambling content only from age-verified (+18) platforms. Spectator-funded gambling (buy-ins, shared bankrolls) is strictly banned.
- **The suite NEVER includes:**
  - Entry fees, paid tickets, tips, or paid subscriptions as entry conditions.
  - Receipt, holding, or custody of spectator money or crypto.
  - Affiliate links as a prerequisite to join.
  - Any influence of spectator funds on slot/game outcomes.
- **All spectator participation is 100% free.** Prizes are awarded out-of-band by the streamer.
- **Mandatory UI Disclaimers:** Configurable +18 warning, responsible gambling banner, editable Rules of Participation page.
- **Privacy:** Minimal storage (Kick user ID, username, commands); no full chat scraping or permanent retention. Configurable 90-day retention and user data purge.

### 2.3 Security
- Never solicit tokens or passwords in chat.
- Secrets live exclusively in `.dev.vars` (git-ignored) and hosting environment secrets. Zero secrets in git.
- Webhook signature verification is mandatory for all inbound events; reject replays and invalid digests.
- Treat spectator input as untrusted: render only via `textContent`, enforce character limits, strip RTL/control characters, filter blocked words, provide optional moderation queue.

### 2.4 Ethical Sourcing
- Only legal, free, open materials: official docs, open-access papers, official free courses.
- No piracy, no scraping against Terms of Service, no scraping copyright slot art (use text names and procedural monogram placeholders).

---

## 3. Team Squads & Workflow Protocol (10-Squad Web Software Factory)

### 3.1 Specialized Squads (*Team Topologies* + *Anthropic Orchestrator-Workers & Evaluator-Optimizer*)
- **Squad 0 — Executive Orchestrator & CTO HITL Liaison:** Atomic task decomposition, Gates, ADRs, `STATUS.md`, `AGENTS.md`, Theory-of-Mind 3-Tier CTO Modeling (`ToM-SWE` via `tools/intelligence/tom_swe_engine.mjs` & `memory/tom_swe_model.json`), and single point of contact with the CTO (Human-In-The-Loop).
- **Squad 1 — Deep Research & Tech Scout (*Enabling Team*):** SOTA web technologies, live design DNA harvesting (`extract-design`), `Context7` / `git-mcp` real-time doc injection, Kick platform & casino domain metrics (`research/`).
- **Squad 2 — Edge Architecture & Realtime Backend (*Platform Team*):** Cloudflare Workers (`Hono` + `hono/middleware` patterns), Durable Objects, SQLite/D1 (`kv_store` edge sync), WebSocket Hibernation hub, Valibot schema validation.
- **Squad 3 — Kick Integration & Stream Protocols (*Complicated-Subsystem*):** OAuth 2.1 PKCE, RSA webhooks, Pusher command parser (`!battle`, `!tourney`, `!sr`, `!gtb`, `!predict`, `!join`), Kick Chat Winner Bot (`/api/kick/chat/announce`), chat moderation guard, `ChatSim`.
- **Squad 4 — Design Systems, OKLCH Tokens & Frontend Architect (*Stream-Aligned A*):** 90/8/2 chromatic budget, OKLCH + APCA contrast, W3C DTCG tokens, Utopia fluid `clamp()`, de-boxing, semantic HTML/CSS (`site/`).
- **Squad 5 — Creative Tech, 60-FPS Motion, Shaders & WebAudio (*Complicated-Subsystem*):** Native CSS motion (`@starting-style`, `interpolate-size`, `linear()`), GSAP Flip, 2D SDF shaders, OBS overlays (`<=5% CPU`, synchronized 1920x1080 `overlay-celebration`), `ZzFX` WebAudio with master limiter (`-4 dBFS`).
- **Squad 6 — Adversarial Security, 5-Gate Visual QA & VLM Critic (*Evaluator-Optimizer Gatekeeper*):** Independent *Maker-Checker* verification across 5 automated pre-HITL gates (`AST/Tokens` + Rust `oxlint v1.89.0` `<120ms`, `Playwright 4-Viewport Geometry + Pixelmatch + break-ui`, `Diff-UI Adversarial + Stagehand v1.5 Self-Healing Selector Cache` via `tools/audit/diff_ui_adversarial.mjs`, `CDP 60-FPS Telemetry`, `Lighthouse + Pa11y + UXBench`, `Gemini 2.5 Flash VLM UI Critic`), Surgical Path-Based Governance, CSP/XSS defense, and Commit-Reveal fairness audits.
- **Squad 7 — Zero-Cost DevOps, Build Pipeline & Documentation (*Platform Team*):** `tools/build_dist.mjs`, security `_headers`, Sandcastle Git Worktrees, streamer/mod guides (`GUIA_STREAMER.md`, `GUIA_MODS.md`).
- **Squad 8 — Interactive Crowd-Play Games, Gamification & CRO (*Stream-Aligned B*):** Zero-custody live spectator games, Provably Fair `HMAC-SHA256`, Octalysis Core Drives, Hooked loops, Fogg $B=MAP$, Cialdini ethical conversion.
- **Squad 9 — Self-Evolving Meta-Coach, Omni-RAG v5 & FinOps (*Enabling / Meta-Platform*):** Supercharged Omni-RAG v5 (`SQLite FTS5` + `CodeGraphContext/WikiGraph PageRank` + `ONNX Q8`), Speculative RAG, Vertex AI Context Caching, TextGrad/SkillSmith Surrogate Verifier, `ToM-SWE` Sleeptime Compute, and Temporal Instinct Ledger.

### 3.2 Gate Protocol & CTO HITL Visual Sign-Off
- Work is broken into Gates. No UI/frontend change may be presented to the CTO HITL until **Squad 6** certifies `100/100` (`B:0 M:0 m:0`) across all 5 Automated Pre-HITL Visual Gates (`cto-hitl-visual-gate`).
- After each milestone, **Squad 0** updates `docs/STATUS.md` and presents a concise executive summary with the **CTO Visual Sign-Off Packet** (3-viewport screenshot carousel + telemetry scorecard):
  1. What was accomplished (3 concise bullets).
  2. What is needed from the user (checklist of human actions).
  3. Identified risks & mitigations.
  4. What comes next.
- Max 5 questions per gate, each with a recommended default.

