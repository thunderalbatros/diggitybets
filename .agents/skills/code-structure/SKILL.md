---
name: code-structure
description: Use when deciding what belongs in actions vs shared services, when multiple workflows duplicate operational logic, or when refactoring repeated operational blocks across domain flows.
---

# Service Layer Architecture

## Core Pattern
```
Orchestration Layer (Actions)          Service Layer (Shared Mechanics)
├── owns business rules / policies     ├── owns reusable operations
├── owns state transitions             ├── owns provider/SDK interactions
├── owns auth / ownership checks       ├── owns command execution details
├── owns failure classification        ├── owns health checks / readiness
└── calls service functions            └── returns structured results
```

**Rule of thumb:**
- "What this product flow means" → keep in actions
- "How to do this operation reliably" → move to service layer

## Designing Service Functions
- Accept all required data as **explicit parameters**
- Return **structured, typed outputs**
- Make failure explicit through typed results or documented exceptions
- No hidden side effects or shared global state
