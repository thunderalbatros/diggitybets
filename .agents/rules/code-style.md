# Rule: Code Style & Architecture

1. Language: Strict TypeScript across frontend, backend, and scripts.
2. Architecture: Pure domain logic isolated from I/O (pure parsers, deterministic state machines, mathematical calculations).
3. Modularity: Small tasks and commits (≤300 lines of change per edit).
4. Performance: Lightweight overlays consuming ≤5% CPU inside OBS Studio. No heavy local Docker or GPU processes.
5. Testing: Vitest for unit tests; test-first approach for command parsing and fairness calculation.
