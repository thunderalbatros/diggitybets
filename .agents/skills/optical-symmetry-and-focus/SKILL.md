---
name: optical-symmetry-and-focus
description: Strict axial symmetry, centered HUD focal points, and monochromatic inactive icon discipline.
---

# Optical Symmetry and Focus

## 1. Axial Symmetry & The Centered Balance Anchor
The `$DIG` currency balance is the single financial and gamification anchor of the entire HuntHub platform.
- **Rule:** The balance pill (`#topbar-dig-balance-pill`) MUST remain permanently locked to the exact horizontal center of the viewport across all views and scroll states:
  ```css
  .topbar-center {
    position: fixed !important;
    top: 17px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1300 !important;
  }
  ```
- **Visual Scale Rule:** The coin icon and balance typography must maintain at least a 2x visual scale relative to secondary topbar badges (`38px` coin vs standard `16px-18px` icons).

## 2. Inactive Monochromatic Discipline
A major source of visual amateurism is colorful, distracting iconography across inactive navigation items.
- **Rule:** All inactive icons and buttons in sidebars and secondary rails MUST use monochromatic muted tones (`#8a94a6` or `rgba(255, 255, 255, 0.45)`).
- **Active State Chromatic Bloom:** Vibrant neon accent colors (`#53fc18` Kick green, `#ffd700` Gold, `#00e5ff` Cyan) are reserved exclusively for:
  - The currently active navigation tab (`.nav-link-btn.active`).
  - Active hover states (`:hover`).
  - Live broadcast multipliers and winning toasts.
