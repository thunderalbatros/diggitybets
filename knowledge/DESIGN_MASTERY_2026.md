# DESIGN MASTERY 2026: 12 Open-Source Libraries for High-End Motion & Graphics

> **Scope:** Canonical architectural and technical manual for the 12 open-source repositories installed in `references/design-mastery/`.  
> **Target Environment:** 100% Vanilla JS/CSS, Zero heavy runtime, OBS browser overlays (≤5% CPU budget), HP 250 G8 notebook compatibility.

---

## 1. drawcall/Proton (Proton Particle Engine)
- **Path:** `references/design-mastery/proton-particles/`
- **Core Purpose:** High-performance Canvas2D / WebGL particle engine with physical attraction and vector forces.
- **Key Concepts:**
  - `Proton.Attraction(targetVector, force, radius, life, easing)`: Magnetizes particles toward coordinates.
  - `Proton.CanvasRenderer(canvas)` / `Proton.WebGLRenderer(canvas)`: Lightweight rendering pipelines.
  - `Proton.Span(min, max)`: Uniform distribution for velocity, angles, and life spans.
- **Application in DiggityBets:**
  - **Directed Magnet Coin Flight to $DIG Balance:** When a spectator wins $DIG or redeems faucet points, gold coins emit from the center and curve upward into `#topbar-dig-balance-pill`, triggering a scale pop on impact.
- **Canonical Code Recipe:**
  ```javascript
  const canvas = document.getElementById('fx-overlay-canvas');
  const proton = new Proton();
  const renderer = new Proton.CanvasRenderer(canvas);
  proton.addRenderer(renderer);

  // Center topbar target coordinates
  const balanceEl = document.getElementById('topbar-dig-balance-pill');
  const rect = balanceEl.getBoundingClientRect();
  const targetPt = new Proton.Vector2D(rect.left + rect.width / 2, rect.top + rect.height / 2);

  const emitter = new Proton.Emitter();
  emitter.rate = new Proton.Rate(new Proton.Span(15, 25), 0.05);
  emitter.addInitialize(new Proton.Mass(1));
  emitter.addInitialize(new Proton.Radius(4, 8));
  emitter.addInitialize(new Proton.Life(1.2, 1.8));
  emitter.addInitialize(new Proton.Velocity(new Proton.Span(3, 6), new Proton.Span(0, 360), 'polar'));

  // Physical Attraction towards wallet
  const attraction = new Proton.Attraction(targetPt, 45, 1200);
  emitter.addBehavior(attraction);
  emitter.addBehavior(new Proton.Color('#ffd700', '#ffaa00'));
  emitter.addBehavior(new Proton.Alpha(1, 0.2));
  emitter.emit('once');
  proton.addEmitter(emitter);
  ```

---

## 2. actarian/glsl-canvas (Minimalist GLSL Shader Runner)
- **Path:** `references/design-mastery/glsl-canvas/`
- **Core Purpose:** Executes WebGL fragment shaders in Vanilla JS with zero Three.js bloat.
- **Key Concepts:**
  - `<canvas class="glslCanvas" data-fragment="..."></canvas>` or `new Canvas(canvasElement, options)`.
  - Built-in uniforms: `u_time` (float elapsed seconds), `u_resolution` (vec2 viewport), `u_mouse` (vec2 coords).
  - Dynamic parameters: `glsl.setUniform('u_gold_shimmer', 0.85)`.
- **Application in DiggityBets:**
  - Ambient vault smoke, iridescent gold borders, and live neon broadcast glows on stream overlays.

---

## 3. gl-transitions/gl-transitions (Cinematic WebGL Transitions)
- **Path:** `references/design-mastery/gl-transitions/`
- **Core Purpose:** Open-source GLSL transitions between two textures driven by a normalized `progress` uniform.
- **Key Formula:**
  ```glsl
  vec4 transition(vec2 uv) {
    vec4 cFrom = getFromColor(uv);
    vec4 cTo = getToColor(uv);
    return mix(cFrom, cTo, progress);
  }
  ```
- **Application in DiggityBets:**
  - Studio-grade broadcast transitions in `overlay-battle.html` and `overlay-tourney.html` (CrossZoom, DirectionalWarp, Luma, Burn) when moving between rounds or crowning the Reigning King.

---

## 4. robin-dela/hover-effect (Liquid Displacement Shader)
- **Path:** `references/design-mastery/hover-effect/`
- **Core Purpose:** Liquid image transitions using grayscale displacement maps and WebGL distortion shaders.
- **Key Parameters:**
  - `parent`: Target DOM element container.
  - `image1`, `image2`: Source and target textures.
  - `displacementImage`: Grayscale distortion map (e.g., fluid ripples, smoke waves).
  - `intensity`: Distortion amplitude multiplier (`0.2` to `0.5` recommended for subtle luxury).
- **Application in DiggityBets:**
  - Slot game cards in 1v1 Battle and Rewards Store item hover transitions.

---

## 5. Popmotion/popmotion (Pure Mathematical Physics Engine)
- **Path:** `references/design-mastery/popmotion/`
- **Core Purpose:** The mathematical engine under Framer Motion in pure, dependency-free Vanilla JS functions.
- **Key Functions:**
  - `animate({ from, to, type: 'spring', stiffness: 300, damping: 20, mass: 1, onUpdate })`.
  - `animate({ from, velocity: 500, type: 'decay', power: 0.8, timeConstant: 350, onUpdate })`.
- **Application in DiggityBets:**
  - Precise deceleration curve for `wheel-duo` and `wheel-solo`, tactile spring bounces on "BIG WIN!" modals, and floating menu expansion.

---

## 6. floating-ui/floating-ui (@floating-ui/dom)
- **Path:** `references/design-mastery/floating-ui/`
- **Core Purpose:** Standard for floating menus, dropdowns, and tooltips with collision avoidance.
- **Key Middleware:**
  - `computePosition(referenceEl, floatingEl, { placement: 'bottom-start', middleware: [offset(8), flip(), shift({ padding: 6 })] })`.
  - `autoUpdate(referenceEl, floatingEl, updateCallback)`: Automatically recalculates on scroll or window resize.
- **Application in DiggityBets:**
  - Collapsible PORTAL navigation tooltip tags, user session dropdown (`@tarkansky` / `@diggitybets`), and Stake multiplier popovers.

---

## 7. rcbyr/keen-slider (Physical Touch Carousel)
- **Path:** `references/design-mastery/keen-slider/`
- **Core Purpose:** 0-dependency Vanilla JS carousel with 60 FPS inertia and native rubber-band bounce.
- **Key Options:**
  - `loop: true`: Seamless infinite carousel.
  - `rubberband: true`: iOS-style elastic resistance on boundary drags.
  - `slides: { perView: 'auto', spacing: 16 }`.
- **Application in DiggityBets:**
  - Ticker of recent $DIG jackpot winners, live chat prize feeds, and horizontal carousel of "Only on Stake" curated slots.

---

## 8. trys/utopia-core (Fluid Responsive Math Engine)
- **Path:** `references/design-mastery/utopia-core/`
- **Core Purpose:** Calculates fluid typography and spacing scales using native CSS `clamp()`.
- **Key Functions:**
  - `calculateTypeScale({ minWidth: 320, maxWidth: 1440, minFontSize: 16, maxFontSize: 18, minTypeScale: 1.2, maxTypeScale: 1.25 })`.
  - `calculateSpaceScale()`: Fluid padding and gaps.
- **Application in DiggityBets:**
  - Eliminates the need for 80% browser zoom: ensures `#watch` layout fits perfectly at 100% zoom across 1366x768 up to 2560x1440.

---

## 9. argyleink/gui-challenges (Adam Argyle Modern CSS Architecture)
- **Path:** `references/design-mastery/gui-challenges/`
- **Core Purpose:** Pure CSS/JS recipes from Google Chrome's CSS lead for 3D card tilt, adaptive navigation, GPU-driven layout, and non-intrusive toasts.
- **Key Insights:**
  - CSS `@property` registered custom properties for smooth gradient angle transitions.
  - 3D perspective transforms with mouse tracking: `transform: perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry))`.
  - Scroll-driven animations (`animation-timeline: scroll()`).

---

## 10. williamngan/pts (Pts.js Computational Geometry)
- **Path:** `references/design-mastery/pts-js/`
- **Core Purpose:** Vector graphics, optical precision curves, and geometric charts in Canvas/SVG.
- **Key Structure:**
  - `const space = new CanvasSpace('#canvas').setup({ resize: true }); const form = space.getForm();`.
  - `space.add({ animate: (time, ftime) => { form.line([...]); } }); space.play();`.
- **Application in DiggityBets:**
  - Real-time volatility charts, RTP bell curves in Slot Radar & Lab, and leaderboard interactive rank graphs.

---

## 11. SortableJS/Sortable (Smooth Drag & Drop with FLIP)
- **Path:** `references/design-mastery/sortable-js/`
- **Core Purpose:** Reordering lists with native FLIP animation in pure Vanilla JS.
- **Key Options:**
  - `Sortable.create(el, { animation: 150, ghostClass: 'sortable-ghost', onEnd: (evt) => { ... } })`.
- **Application in DiggityBets:**
  - Reordering Bonus Hunt slot opening order in Streamer Control Panel, re-arranging bracket participants, and custom dashboard layout.

---

## 12. vtbag/inspection-chamber (View Transitions API Toolkit)
- **Path:** `references/design-mastery/view-transitions-toolkit/`
- **Core Purpose:** Tools and patterns for mastering native `document.startViewTransition()`.
- **Key Pseudo-Elements:**
  - `::view-transition-old(root)` and `::view-transition-new(root)`.
  - Shared element tagging: `view-transition-name: section-header`.
- **Application in DiggityBets:**
  - Seamless SPA tab switching between PORTAL views (Watch, Bonus Hunt, Tourney, House Games, Profile) with 60 FPS cross-fade and zero flicker.
