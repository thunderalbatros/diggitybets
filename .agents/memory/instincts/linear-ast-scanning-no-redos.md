---
id: "linear-ast-scanning-no-redos"
type: "performance_invariable"
confidence: 0.98
status: "ACTIVE"
created_at: "2026-10-20T06:19:32.657Z"
---

# Instinct: Linear Line-by-Line AST Scanning (Zero ReDoS)

> **Confidence:** 98%  
> **Source / Evidence:** tools/intelligence/ast_guard.mjs scanClassMethods

## Rule & Heuristic
Nested regular expression quantifiers (e.g. `([^()]*|\([^()]*\))*`) cause catastrophic backtracking and terminal freezes on large files (>2,000 lines). Parse class methods linearly with line splitting.

## Operational Pattern
```javascript
// Linear method extraction
const lines = classBody.split('\n');
for (const line of lines) {
  const m = line.trim().match(/^(?:(?:async|static|get|set|\*)\s+)*([a-zA-Z0-9_$]+)\s*\(/);
  if (m && line.includes('{')) definedMethods.add(m[1]);
}
```

## Anti-Pattern
Using unbounded nested quantifier regexes across multiline class bodies.
