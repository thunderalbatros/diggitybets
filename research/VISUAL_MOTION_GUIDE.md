# VISUAL_MOTION_GUIDE.md — Fluid UI, Motion Physics & 60 FPS Canvas Standards

> **Project:** HuntHub (Casino Stream Engagement Suite)  
> **Audience:** All Antigravity Agent Squads (Squad 4 Frontend, Squad 5 Visual & Motion)  
> **Standard:** Apple Human Interface Guidelines (HIG), Emil Kowalski's Design Engineering, and 60 FPS Canvas Game Loops.

---

## 1. Core Principles of Fluid Motion (Apple HIG & Emil Kowalski)

### 1.1 The Golden Rules of Animation
1. **Never Animate Keyboard-Initiated Actions:** Keyboard actions are repeated hundreds of times a day. Instant response is required.
2. **Transform & Opacity Only:** Animating `width`, `height`, `margin`, `padding`, `top`, `left` causes layout reflows and paint cycles. Always animate `transform: translate3d()`, `scale()`, `rotate()` and `opacity` on GPU-accelerated layers.
3. **Never `scale(0)`:** In the physical world, objects never spawn out of absolute zero. Start entrances from `scale(0.95)` with `opacity: 0` to create a natural, grounded appearance.
4. **Custom Easing Curves Over Defaults:** Never use generic `ease-in` for interactive elements (starts too slow). Use strong, intentional curves:
   - **Strong UI Ease-Out:** `cubic-bezier(0.23, 1, 0.32, 1)` (instant feedback, gentle deceleration).
   - **Spring Physics for Levitation:** `cubic-bezier(0.34, 1.56, 0.64, 1)` or Apple spring `{ duration: 0.45, bounce: 0.18 }`.
   - **Standard Modal/Sheet Ease:** `cubic-bezier(0.32, 0.72, 0, 1)`.

### 1.2 Durations and Perception
| Element / Interaction | Recommended Duration | Easing |
|---|---|---|
| Button press feedback | 100ms – 140ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Card hover levitation | 350ms – 420ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Card descent (unhover) | 380ms – 450ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Modal / Sheet entrance | 250ms – 350ms | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Plinko ball drop step | 180ms – 220ms per row | `requestAnimationFrame` gravity integration |
| Crash flight curve | Real-time continuous | `requestAnimationFrame` exponential accumulator |

---

## 2. 60 FPS Canvas Game Loops (Zero Iframe, Native WebGL/2D)

### 2.1 Why Iframes Hurt Performance
- **Heavy Memory Footprint:** Embedding a full Vite/React/Ant-Design/Phaser application in an iframe loads separate DOM trees, duplicate React runtimes, and hundreds of stylesheet rules.
- **Unwanted Chrome:** Third-party clones embed their own navigation, top headers, mock wallets, and sidebars that conflict with the host application.
- **IPC Latency:** Synchronizing player balance across `postMessage` creates race conditions and sluggish betting.

### 2.2 Native HTML5 Canvas Game Architecture
- **Single RequestAnimationFrame Loop:** Run the game loop using `requestAnimationFrame(animate)`. Calculate delta time to decouple frame rates from device refresh rates.
- **Offscreen Prerendering for Static Pegs/Grids:** Draw pin pegs, static lines, and felt background to an offscreen cache or render once per resize, redrawing only active moving objects (falling balls, flying rockets).
- **Tabular Numerals:** Always specify `font-variant-numeric: tabular-nums` or monospace display fonts (`Chakra Petch`) for real-time counters to prevent layout jiggle.

---

## 3. Voucher Levitation Architecture (Store Tickets)

### 3.1 Voucher Ticket Anatomy
- **Perforated Ticket Divider:** Dotted/dashed separator (`border-right: 2px dashed rgba(255, 255, 255, 0.15)`).
- **Semi-Circular Notches:** Masked radial notch or pseudo-elements (`::before`, `::after`) simulating physical ticket stubs.
- **Ambient Neon Glow:** Layered radial gradients (`radial-gradient(circle at 50% 0%, var(--glow-color), transparent 70%)`).

### 3.2 Hover Levitation Physics
- **Hover Entry:** Lifts off the plane (`translateY(-16px) scale(1.03)`), casts a deep diffused shadow (`box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.85), 0 0 35px var(--glow-color)`), and initiates micro-floating oscillation (`@keyframes voucher-float`).
- **Hover Exit:** Descends back smoothly to `translateY(0) scale(1)` using the same spring deceleration curve, without jarring cuts.
- **Reduced Motion:** When `@media (prefers-reduced-motion: reduce)` is active, substitute translate animations with subtle opacity/border brightness shifts.

---

## 4. Curated Free Repositories & References
1. **tanh1c/stake-originals-clone** (MIT) — Mathematical formulas for Plinko, Mines, Dice, and Crash.
2. **barvian/number-flow** (MIT) — Tabular numerical interpolation for balances and multipliers.
3. **motiondivision/motion** (MIT) — Spring animation curves and WAAPI acceleration.
4. **Apple Human Interface Guidelines (HIG)** — Spatial consistency, feedback timing, and minimalist layout hierarchy.
