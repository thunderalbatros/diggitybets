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

---

## 6. Asymmetrical Bento Grid Standards (2026 Layout)
- **Cell Structure:** Flexible grid using `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` with tracks defined by `minmax(0, 1fr)` to prevent image blowout.
- **Hero & Feature Ratio:** 2:1 or 3:1 column spans on desktop (`@media (min-width: 1024px)`), smoothly collapsing to 1 column below `768px`.
- **Card Padding & Radius:** `border-radius: 14px; padding: 24px;` with subtle glassmorphism backdrop (`backdrop-filter: blur(12px)`).
- **Radial Glow Cursor Tracking:** Cards support `--mouse-x` and `--mouse-y` CSS variables for interactive glow spotlight:
  ```css
  background: radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 215, 0, 0.05), transparent 40%), var(--surface-card);
  ```

---

## 7. Synthetic Web Audio Haptics (Zero Asset Overhead)
- **Philosophy (Inspiración Reflect.app):** Cero descargas de archivos `.mp3`/`.wav`. Toda la retroalimentación táctil de clics, apuestas y victorias se sintetiza con `AudioContext` en micro-ráfagas:
  - *Click / Tap Táctil:* Onda triangular `180Hz` decayendo a `60Hz` en 35ms (volumen 0.06).
  - *Chip Drop / Bet Stake:* Onda sinusoidal dual `320Hz + 640Hz` en 50ms con filtro paso bajo.
  - *Win Chime:* Arpegio pentatónico sintético (523Hz, 659Hz, 784Hz) en 120ms.
- **Condición:** Respetar silenciador global del usuario y suspender el `AudioContext` cuando la pestaña está en segundo plano (`document.hidden`).

---

## 8. Hallmark & Impeccable Anti-AI-Slop Pre-Emit Validation (impeccable.style/#slop)
Before committing any UI or component, every agent verifies against the 7 Anti-Slop Commandments:
1. **No Generic Purple/Violet AI Gradients:** Ban linear gradient backgrounds blending generic purple `#8b5cf6` with blue `#3b82f6`. Use curated HSL dark luxury slate `#06080d`, emerald `#53fc18` and gold `#ffd700`.
2. **No Unanchored Floating Icon Halos:** Icons must never float inside vague blurry colorful circles with arbitrary drop-shadows. Icons must reside inside structured, semi-transparent pill or badge containers with crisp hairline borders.
3. **No Meaningless Rounded-3xl Pill Bloat:** Avoid excessive border-radius (`rounded-3xl` / `rounded-full`) on structural content cards. Maximum card border-radius is `14px`; buttons and badges use `8px` or `10px`.
4. **No Marketing Fluff / AI Prose Slop:** Zero meaningless filler copy (e.g. "Unleashing the next-generation decentralized synergy"). All copy must be factual, immediate, and written in direct gamer/casino language (e.g., "50/50 Net Profit Split", "Max Cap $100 USD").
5. **No Italic Headers or Dual-Color Clipped Text:** Headings must be solid, readable, and firmly anchored in `'Chakra Petch'`.
6. **Borders Over Halos:** 1px semi-transparent borders (`rgba(255, 255, 255, 0.08)`) with controlled inner contrast instead of multi-layer muddy black drop-shadows.
7. **Tactile Spring Micro-Interactions:** Animations must serve a purpose (feedback, spatial continuity, status change). Zero decorative perpetual bouncing.

---

## 9. B2B Provider Telemetry & Media Kit Standards
When rendering provider telemetry, "Only on Stake" metrics, or sponsor media kit blocks:
- **Badge Styling:** `⚡ ONLY ON STAKE` rendered with an illuminated 1px border (`rgba(255, 215, 0, 0.4)`), gold font color (`#ffd700`), and dark micro-pill backdrop (`rgba(255, 215, 0, 0.08)`).
- **Studio Attribution:** Always display the actual development studio (e.g., *Titan Gaming*, *Twist Gaming*, *Massive Studios*, *Paperclip Gaming*, *AvatarUX*) underneath the title in 10px tabular uppercase typography.
- **Real-Time Impression Counters:** Tabular metric counters with instantaneous tooltip breakdowns showing battle selections, bonus hunt inclusions, and live player engagements.

---

## 10. Symmetric Topbar HUD, Minimalist Sidebar & Clean `#watch` Stage Architecture
- **Symmetric Topbar with Centered `$DIG` Balance & Rotating Laser Orbit:**
  - `.site-topbar` uses a symmetric 3-column grid (`grid-template-columns: 1fr auto 1fr`) with `.topbar-center` locked at the exact mathematical horizontal midpoint (`position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)`).
  - `#topbar-dig-balance-pill` renders in a sleek, compact aesthetic (`min-height: 28px`, `padding: 0 12px`, `18x18px` coin SVG, `13.5px` tabular numeric balance, `10.5px` `$DIG` label) surrounded by an active rotating fluor green laser beam (`@keyframes digLaserOrbit`) tracing its perimeter.
- **Unified Right Profile Trigger:**
  - The top-right corner exclusively hosts the unified profile component (`#auth-user-panel` / `#topbar-profile-link` with avatar + `@username`, centered role badge `#auth-role-status-badge` underneath, and right-hand disconnect `✕` `#btn-kick-logout`), with zero separate `[ Profile ]` button.
- **Minimalist `PORTAL` Sidebar (`248px` Expanded / `72px` Collapsed):**
  - Expanded width (`248px`) guarantees zero text truncation (`...`) on `Leaderboard [ALL-TIME]`, `Streamer Admin [MASTER]`, and `Control Panel [LIVE]`.
  - Inactive navigation items remain borderless and transparent (`background: transparent; border: 1px solid transparent; box-shadow: none;`), reserving luminous borders and accent glows exclusively for the active view (`.nav-link-btn.active`).
- **Clean Single-Stage `#watch` & Original Socials Grid:**
  - `#watch` presents a clean, full-width `16:9` cinema stage (`.hero-stream-grid.cinema-mode`) without duplicate side-column navigation buttons or redundant telemetry strips.
  - Directly below the stream player sits `#links.stream-fused-section` with the 4 original horizontal `.module-card` cards (`.socials-horizontal-grid`: Kick Official, Discord VIP Community, Instagram Official, and `USE CODE: DIGGITY` Stake card).
