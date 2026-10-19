---
id: "mock-server-api-catchall"
type: "architectural_decision"
confidence: 0.96
status: "ACTIVE"
created_at: "2026-10-19T08:23:07.999Z"
---

# Instinct: Catch-All 200 OK JSON Fallback for Local API Testing

> **Confidence:** 96%  
> **Source / Evidence:** tools/serve_site.mjs, tools/audit/visual_audit.mjs

## Rule & Heuristic
Headless Playwright audits capture all 404 network failures as console errors. Local simulation servers must implement a catch-all 200 OK JSON fallback for `/api/*` to guarantee a clean 0-error report.

## Operational Pattern
```javascript
if (cleanUrl.startsWith('/api/')) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', success: true }));
  return;
}
```

## Anti-Pattern
Allowing mock servers to return raw 404 HTML for unconfigured REST routes during visual audits.
