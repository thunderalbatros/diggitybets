---
version: 1.0.0
name: HuntHub Design Language
description: Design architecture standard for HuntHub (Diggity Bets) — a dark luxury casino and streaming suite inspired by Linear, Stake Originals, and 1win. Strict border-over-shadow hierarchy, 90/8/2 chromatic budget, tabular typography, and calibrated spring physics.
author: Antigravity Design System Architect
last_updated: 2026-10-15
---

# HuntHub Master Design Architecture (DESIGN.md)

## 1. Chromatic Budget (The 90 / 8 / 2 Law)
Every screen and component MUST adhere to strict visual density rules to prevent visual fatigue and maintain the premium dark luxury casino aesthetic:

- **90% Neutral Grayscale Surface Ladder:**
  - Canvas Deep: `#06080d` (Viewport body backdrop)
  - Surface Glass: `#0b0f19` / `rgba(11, 15, 25, 0.94)`
  - Card Neutral: `#0e1520` / `rgba(14, 21, 32, 0.85)`
  - Card Inactive / Elevated: `#141d2c` / `rgba(20, 29, 44, 0.90)`
  - Hairline Borders: `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.14)`

- **8% Subtle Contrast Surfaces:**
  - Input & Well Backgrounds: `#090e17`
  - Chip & Stat Pill Backgrounds: `rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.07)`
  - Hover highlights: `rgba(255, 255, 255, 0.03)` brightness elevation

- **2% High-Precision Strategic Accent CTAs:**
  - **Kick Mint Green (`#53fc18`):** Exclusively reserved for primary broadcast actions, Link Kick auth, and live success multipliers.
  - **Casino Gold (`#ffd700`):** Exclusively for active tournament seeds, winner celebrations, and store voucher highlights.
  - **Cyan Electric (`#00e5ff`):** For verified community channels and telemetry links.
  - **Danger / Bust Red (`#ff2a5f`):** Exclusively for losses, active crash explosions, or destructive actions.

---

## 2. Borders Over Heavy Shadows (Anti-Slop Discipline)
- **Forbidden:** Heavy, muddy drop-shadows (`shadow-xl`, `shadow-2xl`, multi-layer blurred black halos).
- **Mandatory:** Crisp, 1px semi-transparent borders with subtle outer glow on active state:
  ```css
  /* Standard Inactive Surface */
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.65);

  /* Hover / Active Surface */
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.85), 0 0 16px var(--accent-glow);
  ```

---

## 3. Typography & Numerical Precision
- **Display & Headings:** `'Chakra Petch'`, sans-serif (Weights: 600, 700, 900).
  - Letter spacing: `-0.02em` for dense impact; uppercase for category indicators and metrics.
- **Body & Subtitles:** `'Outfit'`, sans-serif (Weights: 400, 500, 600). Generous line-height (`1.5` to `1.6`) for rapid scanning.
- **Tabular Numbers Law:** Every live counter, multiplier, point balance, timer, and seed must use:
  ```css
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum" 1;
  ```
  This eliminates horizontal jitter during rapid number roll-ups (CountUp.js / Limbo / Crash).

---

## 4. Spacing, Whitespace & Layout Ratios
- **Minimum 35% Negative Space:** Never cram tables or cards edge-to-edge. Ensure ample breathing room between sections (`gap: 20px`, `padding: 24px`).
- **Golden Ratio ($\phi \approx 1.618$) in Arenas:**
  - Control Panel / Bets Column: ~240px to 280px (1 part).
  - Interactive Visual Canvas: ~480px to 840px (1.618 parts).
  - Fixed arena height constraint (520px) to prevent layout jumping on tab switches.

---

## 5. Micro-Interactions & Spring Physics
- **Maximum Duration:** Never exceed 400ms for UI transitions. Standard: 120ms to 240ms.
- **Natural Springs:** No linear ease (`ease`, `linear`). Use Apple quintic or natural spring curves:
  ```css
  /* Quick Drop-Back (hover exit) */
  transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), border-color 100ms ease;
  ```
- **Accessibility:** Strict compliance with `prefers-reduced-motion: reduce`. All CSS keyframes and JS confetti engines must immediately suppress motion when active.
