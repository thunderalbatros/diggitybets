# UI RECIPES CATALOG — Semantic Intent-to-Code Mapping (2026)

> **Purpose:** Instant lookup catalog for Antigravity and HuntHub agents.  
> Whenever a prompt describes a visual effect or interaction, find the exact formula and file path in `< 1 second`.

---

## 1. Particle Effects & Economy
| Visual Intent | Source Library | Canonical Path | Primary API / Formula |
| :--- | :--- | :--- | :--- |
| **Magnetic coin flight to $DIG balance** | Proton Particles | `references/design-mastery/proton-particles/src/behavior/Attraction.js` | `new Proton.Attraction(targetVector, 45, 1200)` |
| **Confetti celebration on BIG WIN** | Canvas Confetti | `references/clones/canvas-confetti/src/confetti.js` | `confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } })` |
| **Ambient floating golden dust** | Proton Particles | `references/design-mastery/proton-particles/src/emitter/Emitter.js` | Rate(Span(3, 6), 0.1), Alpha(0.8, 0), Scale(1, 0.4) |

---

## 2. Shaders & High-End Materials
| Visual Intent | Source Library | Canonical Path | Primary API / Formula |
| :--- | :--- | :--- | :--- |
| **Vault background smoke / gold glow** | glsl-canvas | `references/design-mastery/glsl-canvas/src/Canvas.ts` | `<canvas class="glslCanvas" data-fragment="..."></canvas>` |
| **Liquid displacement on slot card hover** | hover-effect | `references/design-mastery/hover-effect/dist/hover-effect.umd.js` | `new hoverEffect({ parent, intensity: 0.3, image1, image2, displacementImage })` |
| **Broadcast screen transitions (Warp/Burn)** | gl-transitions | `references/design-mastery/gl-transitions/transitions/` | `vec4 transition(vec2 uv) { return mix(getFromColor(uv), getToColor(uv), progress); }` |
| **Iridescent border / gold beam** | Luxury Primitives | `site/css/luxury-primitives.css` | `.fx-gold-beam` with `@property --beam-angle` rotation |

---

## 3. Physical Motion & Springs
| Visual Intent | Source Library | Canonical Path | Primary API / Formula |
| :--- | :--- | :--- | :--- |
| **Framer-style spring bounce (no React)** | Popmotion | `references/design-mastery/popmotion/packages/popmotion/src/animations/generators/spring.ts` | `animate({ from, to, type: 'spring', stiffness: 350, damping: 22 })` |
| **Wheel deceleration physics (decay)** | Popmotion | `references/design-mastery/popmotion/packages/popmotion/src/animations/generators/decay.ts` | `animate({ from, velocity, type: 'decay', power: 0.82 })` |
| **Smooth 60 FPS count-up roller** | Number Flow | `references/ui-craft/number-flow/` | `LuxuryFX.rollNumber(element, startVal, targetVal, duration)` |
| **Smooth inertia scrolling** | Lenis | `references/clones/lenis/packages/core/src/index.js` | `const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })` |

---

## 4. Layout, Sliders & Tooltips
| Visual Intent | Source Library | Canonical Path | Primary API / Formula |
| :--- | :--- | :--- | :--- |
| **Fluid typography & 100% zoom native fit** | Utopia Core | `references/design-mastery/utopia-core/dist/index.js` | `clamp(minRem, valRem + rateVw, maxRem)` via `calculateClamp()` |
| **Collision-free floating tooltips/menus** | Floating UI | `references/design-mastery/floating-ui/packages/dom/src/index.ts` | `computePosition(anchor, popover, { middleware: [offset(8), flip(), shift({ padding: 6 })] })` |
| **Touch carousel with rubberband bounce** | Keen Slider | `references/design-mastery/keen-slider/src/keen-slider.ts` | `new KeenSlider(el, { loop: true, rubberband: true, slides: { perView: 'auto', spacing: 16 } })` |
| **Drag & drop reordering with FLIP** | SortableJS | `references/design-mastery/sortable-js/src/Sortable.js` | `Sortable.create(list, { animation: 150, ghostClass: 'sortable-ghost' })` |
| **Flicker-free tab view transition** | View Transitions API | `references/design-mastery/view-transitions-toolkit/` | `document.startViewTransition(() => switchTab(targetView))` |

---

## 5. Geometry, Micro-Charts & Algorithmic Lines
| Visual Intent | Source Library | Canonical Path | Primary API / Formula |
| :--- | :--- | :--- | :--- |
| **RTP curve & volatility radar charts** | Pts.js | `references/design-mastery/pts-js/src/CanvasSpace.ts` | `const space = new CanvasSpace(canvas).setup(); space.add({ animate: ... });` |
| **3D card tilt on mouse move** | GUI Challenges | `references/design-mastery/gui-challenges/` | `transform: perspective(1000px) rotateX(calc(var(--y) * 10deg)) rotateY(calc(var(--x) * -10deg))` |
