---
id: "network-fetch-abort-timeout-guard"
type: "resilience_pattern"
confidence: 0.99
status: "ACTIVE"
created_at: "2026-10-18T00:20:02.932Z"
---

# Instinct: Mandatory AbortSignal.timeout on External API Calls

> **Confidence:** 99%  
> **Source / Evidence:** tools/intelligence/serper_researcher.mjs, tools/intelligence/rag_pipeline.mjs

## Rule & Heuristic
External API services (Serper, Qdrant Cloud, Vertex AI) can hang indefinitely when connection pools saturate or sockets drop. Every remote fetch must have an explicit timeout between 2,500ms and 3,500ms.

## Operational Pattern
```javascript
const res = await fetch(url, {
  method: 'POST',
  signal: AbortSignal.timeout(3500),
  headers: { ... }
});
```

## Anti-Pattern
Calling fetch() on external services without an AbortSignal or Promise.race timeout.
