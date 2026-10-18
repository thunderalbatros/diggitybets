---
name: minimal-surface-hierarchy
description: Strict mathematical de-boxing laws, negative space separation, and surface luminance hierarchy to prevent boxed UI slop.
---

# Minimal Surface Hierarchy (Anti-Boxing Law)

## 1. Core Rule: The De-Boxing Mandate
**Never use `border` to separate sibling items in menus, lists, or adjacent containers.**
Enclosing every component inside a bordered box creates cognitive clutter, cheap visual noise ("box slop"), and breaks modern high-end gaming aesthetics (Linear, Raycast, Stake, Shuffle).

## 2. Separation Mechanisms
Instead of borders, structure depth and spatial grouping using:
1. **Negative Space (Gaps & Margins):**
   - Standard rhythm: `gap: 8px` (micro), `gap: 16px` (medium), `gap: 24px` (macro section).
2. **Luminance Steps (Surface Tokens):**
   - Base canvas: `--bg-canvas: #07090e`
   - Recessed area: `--bg-surface-sunken: #090d15`
   - Elevated cards / rail: `--bg-elevated: #0d111a`
   - Glassmorphism overlays: `--bg-glass: rgba(18, 24, 36, 0.72)`
   - Hover highlight: `rgba(255, 255, 255, 0.04)`

## 3. Allowed Specular Borders (The 2% Rule)
Borders (`1px solid rgba(255, 255, 255, 0.07)` or `1px solid rgba(255, 215, 0, 0.35)`) are strictly restricted to:
1. Primary video / game broadcast viewport (`#watch-stream-embed`).
2. Symmetrically centered $DIG balance pill (`#topbar-dig-balance-pill`).
3. Primary action conversion cards (e.g. Stake companion voucher card, active modal).

## 4. Inactive Menu Rule
- Inactive menu buttons (`.sidebar-nav a:not(.active)`, `.admin-nav-tab:not(.active)`) MUST have `border: 0` or `border-color: transparent`.
- Interactive feedback is provided solely through subtle text luminance brightening (`#8a94a6` $\to$ `#ffffff`) and soft background wash (`rgba(255, 255, 255, 0.03)`).
