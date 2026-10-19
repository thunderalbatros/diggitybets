# SOTA 2025/2026: Web Animation, Aesthetics & Visual Craft Open-Source Arsenal

> **Classification:** Canon Treatise & Tool Arsenal  
> **Target:** Modern Aesthetics, Low-CPU Web Overlays, Smooth Physics & Tactile Micro-Interactions  
> **Budget:** $0 USD, Zero Credit Cards, Permissive Licensing (MIT, Apache-2.0, ISC, OFL)  
> **Performance:** <5% CPU impact inside OBS Browser Sources.

---

## 1. Animation Engines & Spring Physics (DOM, WAAPI, Canvas)

### 1.1 Anime.js v4 (2025/2026)
- **Repo:** `https://github.com/juliangarnier/anime`
- **License:** MIT.
- **Size:** ~12 KB tree-shakable ESM modules.
- **Core Strengths:**
  - Auto-grid calculations (`grid: true`): calculates relative distance and delay from any point (e.g. center, edges) without manual matrix calculations.
  - SVG path morphing, SVG line drawing, and numeric value tweens.
  - Fine-grained timeline sequencing with execution loop priority control.
  - Zero external dependencies.
- **Best Use Case in HuntHub:** Tournament 8-bracket animations, giveaway wheel spins, staggered battle cards, coordinated entrance timelines.

### 1.2 Motion (formerly Framer Motion) — Vanilla JS Core
- **Repo:** `https://github.com/motiondivision/motion`
- **License:** MIT.
- **Core Strengths:**
  - Native browser WAAPI acceleration (120 FPS on compositor thread).
  - Physics-based spring animations (`stiffness`, `damping`, `mass`).
  - Gesture handling (drag, tap, hover with inertial physics).
- **Best Use Case in HuntHub:** Draggable betting chips, swipeable mobile prediction cards, springy tactile modal entries.

### 1.3 Auto-Animate (`@formkit/auto-animate`)
- **Repo:** `https://github.com/formkit/auto-animate`
- **License:** MIT.
- **Size:** 2.3 KB gzip.
- **Core Strengths:**
  - 1-line zero-config DOM list animation. Automatically computes FLIP transitions when children are added, removed, or reordered.
- **Best Use Case in HuntHub:** Live leaderboard rankings, prediction participant lists that shift positions in real time.

### 1.4 Lenis (`@darkroom.engineering/lenis`)
- **Repo:** `https://github.com/darkroomengineering/lenis`
- **License:** MIT.
- **Size:** ~4 KB.
- **Core Strengths:**
  - Buttery-smooth momentum scrolling without breaking native accessibility, URL anchors, or `position: sticky`.
  - Eliminates frame desync between scroll position, DOM overlays, and WebGL canvases.
- **Best Use Case in HuntHub:** Smooth high-craft scrolling on the public website and streamer admin dashboard.

---

## 2. Copy-Paste Modern UI Components & Micro-Interactions

### 2.1 Magic UI & Aceternity UI
- **Stack:** Tailwind CSS, Modern CSS, Motion.
- **Components:**
  - **Animated Beams:** Flowing light pulses connecting elements.
  - **Retro Grid:** Perspective cyberpunk ground planes.
  - **3D Card Tilt:** Gyroscopic/mouse-tracking 3D rotation.
  - **Shine Border & Glowing Gradients:** Rotating spectral highlights on cards.
- **Philosophy:** Copy-paste isolated components (`components/ui/`) without monolithic npm dependencies.

### 2.2 Motion Primitives
- **Focus:** Micro-interactions (dialogs, popovers, tabs, fluid tooltips) implementing Emil Kowalski's rules (e.g. `scale(0.93)` to `scale(1.0)` modal entrance transitions).

---

## 3. Ultra-Lightweight WebGL, Shaders & Canvas (<5% CPU)

### 3.1 Curtains.js (`curtainsjs`)
- **License:** MIT.
- **Size:** ~15 KB.
- **Strengths:** Maps standard HTML `<img>`, `<video>`, and `<div>` elements to WebGL shader planes based on CSS bounding boxes.
- **Best Use Case:** Liquid water refraction over slot thumbnails, ripple distortions on tournament banner hovers.

### 3.2 OGL (`ogl`)
- **License:** MIT.
- **Size:** ~8 KB core (~29 KB full math).
- **Strengths:** Minimalist WebGL engine with scene graph (Camera, Mesh, Scene) and direct GLSL shader programming without Three.js overhead.
- **Best Use Case:** Full-screen subtle animated background gradients, fluid particles, glow meshes.

### 3.3 Canvas-Confetti
- **License:** ISC.
- **Size:** 3.2 KB.
- **Strengths:** Fast multi-particle confetti simulation directly on a 2D canvas with zero CPU drag.
- **Best Use Case:** Tournament victory celebrations, jackpot announcements in OBS overlays.

### 3.4 DotLottie Web (`@lottiefiles/dotlottie-web`)
- **License:** MIT.
- **Core:** ThorVG Rust engine compiled to WASM.
- **Strengths:** 80% smaller than legacy Lottie JSON files, runs up to 120 FPS via GPU acceleration, state machines and embedded vector themes.
- **Best Use Case:** High-fidelity animated gold trophies, opening loot boxes, victory badges.

---

## 4. Pure CSS & SVG Shaders (0 KB JS Runtime)

### 4.1 True "Liquid Glass" Refraction via SVG Filters
- **Problem with standard CSS:** `backdrop-filter: blur(16px)` looks flat and plastic.
- **Modern Solution:** Embeeding `<feTurbulence>` (fractal noise) and `<feDisplacementMap>` (pixel distortion) to bend light realistically:

```html
<svg style="position: absolute; width: 0; height: 0; pointer-events: none;">
  <filter id="liquid-glass-refraction">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.2 0" in="noise" result="softNoise" />
    <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="9" xChannelSelector="R" yChannelSelector="G" result="refracted" />
    <feGaussianBlur in="refracted" stdDeviation="6" />
  </filter>
</svg>
```
```css
.liquid-glass-panel {
  background: rgba(18, 22, 34, 0.65);
  backdrop-filter: blur(16px);
  filter: url(#liquid-glass-refraction);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

### 4.2 Procedural Noise & Film Grain via CSS Data-URI
- Zero HTTP requests, zero JS:
```css
.cinematic-grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}
```

---

## 5. Modern Tokens, Color Spaces & Procedural Audio

### 5.1 Open Props (`open-props`)
- **Author:** Adam Argyle (Google Chrome DevRel).
- **License:** MIT.
- **Strengths:** CSS custom properties for fluid typography, OKLCH colors, elastic easing curves (`--ease-spring-3`), and responsive spacing.

### 5.2 OKLCH Color Space (CSS Color Level 4)
- Uniform perceptual brightness (`L`), elimination of muddy gray midpoint dead-zones in color gradients.

### 5.3 ZzFX (`zzfx`) — Procedural Sound Synthesis (<1 KB)
- **License:** MIT.
- Synthesizes retro arcade clicks, casino coin drops, and countdown ticks directly via the native Web Audio API with zero audio asset downloads.
- `zzfx(...[,,925,.04,.3,.6,1,.3,,6.27]);`

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_EMIL_KOWALSKI_ANIMATIONS_ON_THE_WEB]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · #motion_and_animation
