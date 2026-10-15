---
name: number-parsing
description: Robust multi-locale currency and guess parser supporting Argentine and US numerical conventions.
---

# Robust Number & Guess Parser

## Parsing Rules
- Strip currency symbols (`$`, `€`, `US$`) and whitespace.
- Support shorthand multipliers: `12k` $\rightarrow 12,000$, `12.5k` $\rightarrow 12,500$.
- Disambiguate separators:
  - If a single dot or comma is followed by exactly 3 digits (e.g. `12.557` or `12,557`), treat as a thousands separator.
  - If followed by 1 or 2 digits, treat as a decimal separator.
- Reject negative numbers, zero, `NaN`, and numbers exceeding maximum configured bounds.

```typescript
export function parseGuess(input: string, maxBound = 1000000): number | null {
  if (!input || typeof input !== 'string') return null;
  let s = input.trim().toLowerCase().replace(/[$€\s]/g, '');
  if (/^(\d+(\.\d+)?)k$/.test(s)) {
    const num = parseFloat(s.slice(0, -1)) * 1000;
    return isFinite(num) && num > 0 && num <= maxBound ? Math.round(num) : null;
  }
  // Standardize delimiters
  if (/^\d{1,3}[.,]\d{3}$/.test(s)) s = s.replace(/[.,]/, '');
  else s = s.replace(/,/g, '.');
  const val = parseFloat(s);
  return isFinite(val) && val > 0 && val <= maxBound ? Math.round(val) : null;
}
```
