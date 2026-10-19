# CANON: Everything Claude Code (ECC) — Autonomous Agent Harness & Continuous Learning Architecture (2026)

> **Origin:** `affaan-m/ECC` (Everything Claude Code) by Affaan Mustafa  
> **Adaptation:** HuntHub / DiggityBets Engineering Suite & Google Antigravity IDE  
> **Status:** Canonical Knowledge Base Document (Ingested for Centinela RAG & Multi-Agent Swarm)  
> **Classification:** Software Engineering / Autonomous Agent Harnesses / Operational Discipline  

---

## 1. Executive Summary & Core Philosophy

**Everything Claude Code (ECC)** is the definitive open-source harness and multi-agent operating system designed to elevate AI coding assistants from passive conversational autocomplete bots into a rigorous, self-evaluating, and autonomous engineering organization.

### The Fundamental Flaw of Raw LLM Assistants
In untreated LLM agent sessions, models exhibit predictable degradation patterns:
1. **Shortcut Rationalization:** Declaring tasks "fixed" or "done" after editing 1 line without running tests or builds.
2. **Hallucinated Confidence:** Generating plausible-looking imports, deprecations, or APIs that fail in runtime.
3. **Silent Error Swallowing:** Wrapping failures in empty `catch {}` blocks or returning default `null`/`[]` values that make production bugs impossible to diagnose.
4. **Context Window Decay:** Forgetting architectural decisions made 10 turns earlier, causing circular refactors.
5. **Config Vandalism:** Modifying `.eslintrc`, `tsconfig.json`, or test fixtures to make checks pass instead of fixing the underlying code bug.

ECC solves this through **structural containment, deterministic gates, atomic instincts, and specialized subagent personas**.

---

## 2. The 7-Stage Autonomous Engineering Loop

Every production task executed within the ECC harness follows an immutable 7-stage lifecycle:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  1. PLAN &   │ ──> │ 2. TEST-FIRST│ ──> │3. IMPLEMENT │ ──> │4. CODE REVIEW│
│ DECOMPOSE    │     │  (RED Phase) │     │ (GREEN Phase)│     │ (>80% Gate)  │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                                                       │
┌──────────────┐     ┌──────────────┐     ┌──────────────┐             ▼
│  7. REMEMBER │ <── │  6. VERIFY   │ <── │ 5. SECURITY  │ <───────────┘
│  (Instincts) │     │   BY CLI     │     │  HARDENING   │
└──────────────┘     └──────────────┘     └──────────────┘
```

1. **Stage 1 — Plan & Decompose (`ecc:planner`, `ecc:architect`):**
   Analyze problem boundaries, map existing patterns, define API contracts, and decompose work into tasks ≤300 lines of changes.
2. **Stage 2 — Test-First (`ecc:tdd-guide`):**
   Write the failing test first (RED). Prove that the test fails for the exact reason expected before writing any implementation code.
3. **Stage 3 — Implementation:**
   Write minimal, highly cohesive code. Enforce immutability (return new objects, never mutate shared state), small functions (<50 lines), and clear types.
4. **Stage 4 — Code Review (`ecc:code-reviewer`):**
   Review diffs with a strict **>80% confidence threshold**. Drop noise and cosmetic nitpicks. Require exact file/line citations and concrete reproduction triggers for every HIGH/CRITICAL finding.
5. **Stage 5 — Security Hardening (`agent-security-hardening`, `ecc:security-reviewer`):**
   Harden trust boundaries. Never trust spectator input, API outputs, or model hallucinations. Enforce zero secrets in code, parameterized queries, and strict input schemas.
6. **Stage 6 — Verification by CLI (`verify-before-claim`):**
   Run the real test runner (`npm test`) and typechecker via CLI. Never make assertions without attaching raw terminal proof.
7. **Stage 7 — Remember & Reinforce (`continuous-learning-v2`):**
   Distill the lesson into an atomic, confidence-scored **Instinct** so the error is never repeated in future sessions.

---

## 3. Specialized Subagents Taxonomy (ECC Squad Mapping)

ECC defines 71 specialized agent personas. In the HuntHub / DiggityBets architecture, these are mapped into 8 operational squads:

| Squad | ECC Personas | Core Mandate & Triggers |
|:---|:---|:---|
| **Squad 0 — Manager / Tech Lead** | `planner`, `architect`, `agent-evaluator` | Work breakdown, Gate approvals, ADR generation, trade-off scoring. |
| **Squad 1 — Research & Docs** | `docs-lookup`, `doc-updater`, `conversation-analyzer` | Ingesting official API facts, documenting architecture, auditing sessions. |
| **Squad 2 — Architecture & Backend** | `type-design-analyzer`, `silent-failure-hunter` | Invariant design, Cloudflare Durable Objects, zero swallowed errors. |
| **Squad 3 — Kick Integration & Bots** | `prediction-market-risk-review`, `security-reviewer` | Webhook verification, chat-to-earn rate limits, zero financial custody. |
| **Squad 4 — Frontend & Admin** | `code-simplifier`, `refactor-cleaner` | Mobile-first dashboard, dead code elimination, clean component boundaries. |
| **Squad 5 — Visual & Motion** | `a11y-architect`, `performance-optimizer` | 60 FPS WAAPI motion, composite-only CSS, OBS ≤5% CPU budget, WCAG AA. |
| **Squad 6 — QA & Verification** | `tdd-guide`, `build-error-resolver`, `e2e-runner` | Unit/property tests, automated build fixing, browser simulation. |
| **Squad 7 — DevOps & Deployment** | `harness-optimizer`, `git-workflow` | Zero-cost Cloudflare/Pages deployment, commit message quality, guardrails. |

---

## 4. Continuous Learning v2 (The Homunculus / Instinct Engine)

The hallmark innovation of ECC is **Continuous Learning v2**, which abandons monolithic memory files in favor of **Atomic, Confidence-Scored Instincts**.

### Structure of an Atomic Instinct
```yaml
---
id: multi-locale-currency-parsing
trigger: "when parsing numbers, balance amounts, currency, bets, or chat guesses"
confidence: 0.95
domain: "math-and-currency"
source: "session-observation"
scope: project
project_id: "streamerbot-hunthub"
project_name: "HuntHub & DiggityBets"
---

# Multi-Locale Web Currency Parsing

## Action
Always use the robust number parser (core/src/number-parser.ts) that handles multi-locale
currency conventions (dot/comma for thousands, decimals, and suffixes like 1.5k, 2m).

## Evidence
- Streamer chatters input bets like "1.500", "1,500.50" or "1.5k". Standard parseFloat()
  fails on multipliers or misinterprets separators, causing incorrect balances.
```

### Confidence Evolution Lifecycle
- **0.30 (Tentative):** Observed once in a session; agent applies with caution.
- **0.70 (Established):** Confirmed across multiple sessions or corroborated by user feedback.
- **0.90+ (Inviolable Standard):** Tested, proven in production test suites, promoted to canonical rules.
- **Scope Promotion:** When an instinct is observed in 2 or more separate projects, it is automatically promoted from `scope: project` to `scope: global`.

---

## 5. Anti-Shortcut Rationalization Tables

ECC incorporates strict psychological de-biasing tables to prevent agents from evading engineering rigor:

| Agent Excuse / Rationalization | Technical Reality & Downstream Danger | Inviolable Mandate |
|:---|:---|:---|
| *"It's just a 1-line change, no way it breaks anything."* | Modifying 1 line in a regex, state transition, or timeout frequently breaks downstream consumers. | **Run `npm test`** and paste the test suite summary. |
| *"The code compiles in my head; no need to run the CLI."* | ESM modules, strict null checks, and browser globals fail silently at runtime. | **Run `npm run guard:all`** and verify 0 errors. |
| *"I will modify the test expectation so the build passes."* | Changing tests to match broken code destroys regression safety. | Fix the **implementation**, not the test (unless the test was provably invalid). |
| *"I don't need to consult docs/ADRs; I already know the pattern."* | Overwrites deliberate project architecture constraints (e.g., $0 budget, OBS CPU limit). | **Query `knowledge/` or Qdrant vector memory first**. |
| *"I'll tell the user I'm finished before testing."* | Breaks user trust and causes immediate rework. | **Run verification before completion**, attach observable proof. |

---

## 6. GateGuard Fact-Forcing & Guardrail Tooling

ECC replaces generic confirmation prompts ("Are you sure?") with **Empirical Fact-Forcing**:
- Before editing or creating files, the agent must declare verifiable facts:
  - `[VERIFICADO: source, date]` for facts tested against running code, official APIs, or documentation.
  - `[ASUNCIÓN]` for unverified claims until proven.
- **Guardrail Scripts (`tools/guardrails/`):**
  1. `config-protection.js`: Protects critical configuration files (`core/package.json`, `AGENTS.md`, `.env`, `wrangler.toml`) from being truncated or corrupted.
  2. `check-console-log.js`: Scans production directories (`core/src/`, `site/js/`) to prevent leaking raw `console.log` statements into stream overlays or core services.
  3. `verify-all.js` (`npm run guard:all`): Chained execution of config integrity, console log cleanliness, and all 12 test suites.

---

## 7. Prediction Market & Gaming Risk Review

For live stream casino, predictions, and engagement suites, ECC provides the `prediction-market-risk-review` protocol:
1. **Advice Boundary:** All stream predictions and calculations are strictly informational. Never provide financial or buy/sell advice.
2. **Zero Custody & Free Participation:** All viewer points ($DIG) are virtual and 100% free. Never custody spectator crypto, cash, or deposits.
3. **Oracle Accuracy:** Prediction outcomes must be tied to verified, immutable event resolutions (e.g., bonus hunt final balance, Duo-Wheel selection).
4. **Anti-Sybil Defense:** Prevent single users from spinning or voting with multiple alt-accounts using IP/device fingerprinting (`anti-fraud-fingerprinting`).

---

## 8. HuntHub Implementation Status

| Component | Status | Location in Workspace |
|:---|:---|:---|
| **Cloned Reference** | Installed | `references/clones/ecc/` |
| **Installed Skills** | Active | `.agents/skills/continuous-learning-v2`, `agent-security-hardening`, `eval-harness`, `delivery-gate`, `strategic-compact`, `error-handling`, `prediction-market-risk-review`, `silent-failure-hunter`, `code-reviewer` |
| **Agent Personas** | Active | `.agents/agency/roles/` (`code-reviewer`, `security-reviewer`, `silent-failure-hunter`, `tdd-guide`, `build-error-resolver`, etc.) |
| **Instincts Memory** | Initialized | `.agents/memory/instincts/` (5 core high-confidence project instincts) |
| **Guardrail Engine** | Operational | `tools/guardrails/config-protection.js`, `check-console-log.js`, `npm run guard:all` |
| **Test Suites** | 100% Green | 12/12 test suites passing cleanly |

---
*Ingested into Centinela RAG. Verified: October 17, 2026.*

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_SOTA_RAG_ARCHITECTURES_AND_TOOLS_2026]] · [[CURATED_MASTER_BOOKS_AND_COURSES_2026]] · [[CANON_SOFTWARE_ENGINEERING_AT_GOOGLE]] · [[CANON_HARNESS_ENGINEERING_INTEGRAL_2026]] · #architecture_and_books
