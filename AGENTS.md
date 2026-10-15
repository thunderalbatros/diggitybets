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

## 3. Team Squads & Workflow Protocol

### 3.1 Specialized Squads
- **Squad 0 — Manager / Tech Lead:** Orchestration, Gates, ADRs, `STATUS.md`, `AGENTS.md`, and single point of contact with the user.
- **Squad 1 — Research:** Kick Platform, Free Real-Time Infra, and Casino Domain metrics (`research/`).
- **Squad 2 — Architecture & Backend:** Worker, Durable Object, state machines, WebSocket hub, data structures.
- **Squad 3 — Kick Integration:** OAuth 2.1 PKCE, webhooks, command parser, message delivery, `ChatSim`.
- **Squad 4 — Frontend:** Admin dashboard and public mobile-first website.
- **Squad 5 — Visual & Motion:** Dark glassmorphism design system, OBS overlays, animations, audio synthesizers.
- **Squad 6 — QA, Security & Fairness:** Unit/property tests, load simulation, CSP/XSS defense, commit-reveal audits.
- **Squad 7 — DevOps & Documentation:** Free deployments, simple user guides (`GUIA_STREAMER.md`, `GUIA_MODS.md`), runbooks.

### 3.2 Gate Protocol
- Work is broken into Gates. After each milestone, the Manager updates `docs/STATUS.md` and presents a 1-page executive summary:
  1. What was accomplished (3 concise bullets).
  2. What is needed from the user (checklist of human actions).
  3. Identified risks & mitigations.
  4. What comes next.
- Max 5 questions per gate, each with a recommended default. Never write product code before Gate 1 approval.
