---
id: anti-shortcut-tests
trigger: "when about to claim a task, fix, or feature is complete"
confidence: 0.95
domain: "operational-discipline"
source: "session-observation"
scope: project
project_id: "streamerbot-hunthub"
project_name: "HuntHub & DiggityBets"
---

# Anti-Shortcut Test Verification Mandate

## Action
NEVER declare a task done, bug fixed, or feature completed without:
1. Running `npm test` in `core/` or the root workspace.
2. Confirming that all test suites pass (100% green).
3. Attaching the raw CLI test runner output as proof in the response.
4. If modifying files that affect UI/site, verify browser syntax and console error freedom.

## Evidence
- Inspired by `affaan-m/ECC` Rationalization Tables. LLM agents frequently claim code works without execution, leading to broken builds and silent regression.
- Enforced in `AGENTS.md` and `.agents/skills/anti-shortcut-discipline/SKILL.md`.
