---
id: "symbolic-method-aliasing"
type: "bug_fix"
confidence: 0.95
status: "ACTIVE"
created_at: "2026-10-20T04:18:12.797Z"
---

# Instinct: Method Renaming Aliases on Class Prototypes

> **Confidence:** 95%  
> **Source / Evidence:** site/js/admin-hub.js renderHuntAdmin -> renderBonusHuntAdmin

## Rule & Heuristic
When refactoring methods in public client controllers, provide a prototype alias to prevent runtime PAGEERROR exceptions when older modules or event handlers invoke the previous symbol name.

## Operational Pattern
```javascript
renderHuntAdmin() {
  this.renderBonusHuntAdmin();
}
```

## Anti-Pattern
Renaming methods without aliases in large multi-view web applications.
