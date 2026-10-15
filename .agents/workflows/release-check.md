# Workflow: /release-check

1. Audit secrets: verify no tokens, passwords, or credentials exist in git tracking.
2. Audit costs: verify `docs/COST_AUDIT.md` shows 100% free tier and no credit cards required.
3. Validate compliance: verify +18 warnings, responsible gambling messaging, and free entry rules.
4. Run pre-stream checklist simulation ensuring resilience to mid-game disconnects or page reloads.
5. Update `docs/STATUS.md` with final release metrics and commit hash.
