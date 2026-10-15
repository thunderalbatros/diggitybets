# Workflow: /qa-gate

1. Run unit test suite and verify test coverage ≥80% across domain logic.
2. Execute command parser stress test (≥40 diverse input test cases).
3. Verify cryptographically secure randomness and zero modulo bias on draws.
4. Execute simulated chat load with `ChatSim` (up to 600 msgs/min) verifying p95 latency ≤2s.
5. Inspect OBS rendering performance: verify ≤5% CPU impact and responsive layout.
