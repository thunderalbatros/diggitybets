# CANON: Animations on the Web — Masterclass & Motion Engineering
> **Author:** Emil Kowalski (Design Engineer at Linear, Creator of Sonner, Vaul & animations.dev)  
> **Category:** Motion Design, UI Micro-Interactions & GPU Animation  
> **Target Audience:** HuntHub Frontend Engineers & Motion Subagents  

---

## 1. Core Philosophy of Modern Web Motion

Most web animations feel either **sluggish and annoying** or **stiff and robotic**. Emil Kowalski’s central thesis bridges design and systems engineering:

1. **Motion as Tactile Feedback:** In physical reality, matter has inertia, mass, and elasticity. When a user touches or clicks a button, instantaneous feedback creates perceived speed. If feedback is delayed or absent, the software feels unresponsive.
2. **Perceived Performance > Raw Execution:** Snappy micro-interactions (under 300ms) make network latencies feel shorter. Well-timed transitions guide the user’s eye to what changed, eliminating cognitive re-orientation.
3. **Intentionality (The "Why"):** Never animate decoration for the sake of animating. Motion exists only to:
   - Provide direct feedback on an action (`:active` button compression).
   - Clarify spatial relationships (a drawer pulling out from the bottom).
   - Smooth state transitions (modal entry, toast stack reordering).

---

## 2. The Kowalski Rules of UI Motion

### Rule 1: The 300ms Window
- **Micro-interactions (buttons, toggles, dropdown arrows, checkboxes):** Maximum duration **150ms – 250ms**. Anything above 300ms feels sluggish and blocks user intent.
- **Surface Transitions (modals, slide-out panels, sheets):** **350ms – 500ms** with custom easing or spring physics.

### Rule 2: The `:active` Press Pattern
Always give buttons, slot cards, and clickable tiles a subtle `:active` scale reduction:
```css
.btn-tactile {
  transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms ease;
  will-change: transform;
}
.btn-tactile:active {
  transform: scale(0.97);
}
```
*Why this works:* It creates the sensory illusion of pressing down a physical key without moving pixels on the surrounding layout.

### Rule 3: Never Start Entrances from `scale(0)`
- **The Anti-Pattern:** Animating a dialog, popup, or tooltip from `transform: scale(0)` to `scale(1)`. In the physical world, macroscopic objects never expand from a microscopic single point; it looks cheap and cartoony.
- **The Golden Pattern:** Animate from `transform: scale(0.92)` or `scale(0.95)` with `opacity: 0` to `scale(1)` and `opacity: 1`:
```css
@keyframes modal-enter {
  0% {
    opacity: 0;
    transform: scale(0.93) translateY(8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-surface {
  animation: modal-enter 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### Rule 4: Easing Curves (The Enter vs. Exit Asymmetry)
- **Entering / Expanding Elements:** Must use **`ease-out`** (or cubic-bezier `(0.16, 1, 0.3, 1)`). They must start fast to acknowledge the user's click instantly, then decelerate smoothly to a gentle halt.
- **Exiting / Dismissing Elements:** Must use **`ease-in`** (or cubic-bezier `(0.7, 0, 0.84, 0)`). They should start slow and accelerate off-screen, spending minimal time in the user's field of view.
- **Never use `linear`** for UI movement (linear looks mechanical and unnatural).

### Rule 5: Strict GPU Compositor Discipline (Zero Layout Thrashing)
- **Only animate:** `transform` and `opacity`.
- **Never animate:** `width`, `height`, `top`, `left`, `margin`, `padding`, or `border-width`.
  - Animating layout properties forces the browser CPU through the expensive Reflow (Layout) and Repaint pipeline on every frame (dropping down to 15-30 FPS).
  - Animating `transform` and `opacity` runs on the GPU compositor thread (guaranteed 60-120 FPS).

---

## 3. Spring Physics vs. Fixed Durations

Fixed cubic-beziers struggle when an animation is interrupted mid-flight (e.g. dragging a drawer and letting go). Springs calculate motion from current velocity and position:

$$\text{Force} = -k \cdot x - c \cdot v$$

*Where $k$ is stiffness, $c$ is damping, and $v$ is velocity.*

### Practical Spring Recipes for Web:
1. **Snappy Toggle / Button:**
   - Stiffness: `400`
   - Damping: `30`
   - Mass: `0.8` (instant response, zero visible overshoot)
2. **Sheet / Drawer (Vaul style):**
   - Stiffness: `300`
   - Damping: `32`
   - Mass: `1.0` (weighty, smooth latching)
3. **Celebration / Slot Win Pop:**
   - Stiffness: `280`
   - Damping: `18`
   - Mass: `1.0` (subtle, satisfying 1-cycle bounce)

---

## 4. Accessibility: The `prefers-reduced-motion` Contract

Respect users with vestibular disorders or motion sensitivities. Never disable transitions entirely; substitute movement with instant opacity fades:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Fallback gentle opacity crossfade */
  .modal-surface,
  .toast-notification {
    animation: simple-fade 150ms ease-out forwards !important;
  }
}

@keyframes simple-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## 5. Direct Application to HuntHub Overlays & Mobile Site

1. **CS:GO / Slot Wheels:** Use ease-out quint `cubic-bezier(0.12, 0.8, 0.2, 1)` for the final reel tick deceleration to generate peak spectator tension.
2. **Battle / Tournament Modals:** Use the `scale(0.94)` entrance with `translateY(10px)` instead of sliding in from outside the screen.
3. **Betting & Guessing Buttons:** Apply `scale(0.97)` on `:active` with `transform-origin: center` for immediate tactile confirmation.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[CANON_2D_3D_GRAPHICS_SHADERS_AND_AESTHETICS_2026]] · [[CANON_HOLO_SHADERS_3D_PACK_CHOREOGRAPHY_AND_WEBAUDIO_SFX_2026]] · [[CANON_ANIMATION_PRINCIPLES_ILLUSION_OF_LIFE_DISNEY]] · [[CANON_60FPS_RENDER_AND_MOTION_OPTIMIZATION_PIPELINE]] · #motion_and_animation
