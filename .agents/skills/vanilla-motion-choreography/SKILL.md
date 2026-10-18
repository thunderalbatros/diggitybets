---
name: vanilla-motion-choreography
description: Architectural bridge for extracting React/Framer/MagicUI animation patterns into lightweight (<80 lines) pure Vanilla JS and CSS variables.
---

# Vanilla Motion Choreography (React to Vanilla Bridge)

## 1. Core Rule: Zero-React Runtime Invariant
DiggityBets operates under strict 0-cost, lightweight constraints (≤5% CPU for OBS browser sources, zero bundler overhead for spectators).
**Never introduce React or heavy virtual DOM runtimes to achieve motion.**
Whenever a component from `references/clones/magicui`, `references/clones/motion-primitives`, or `references/clones/react-bits` is desired:
1. Extract the underlying CSS `@keyframes`.
2. Extract the reactive CSS Custom Properties (`--x`, `--y`, `--angle`, `--progress`).
3. Replace Framer Motion `motion.div` with standard DOM elements animated via CSS variables or Popmotion `animate({ type: 'spring' })`.

## 2. Transpilation Workflow

### Step 1: Extract Physics and Timing
Look for:
```tsx
// React / Framer Motion input
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
/>
```
Convert directly to Popmotion Vanilla JS:
```javascript
import { animate } from 'popmotion'; // or LuxuryFX.spring()

LuxuryFX.spring(element, {
  scale: [0.9, 1],
  opacity: [0, 1],
  stiffness: 300,
  damping: 20
});
```

### Step 2: Animated Border Beams
Look for `BorderBeam` from MagicUI:
Convert to pure CSS `@property` with rotating linear gradient:
```css
@property --beam-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes beam-rotate {
  to { --beam-angle: 360deg; }
}

.fx-gold-beam {
  position: relative;
  border: 1px solid transparent;
  background: 
    linear-gradient(#0e1420, #0e1420) padding-box,
    conic-gradient(from var(--beam-angle), transparent 70%, #ffd700 95%, #53fc18 100%) border-box;
  animation: beam-rotate 4s linear infinite;
}
```

### Step 3: WebGL Distortion Shaders
Extract shader strings from React WebGL components and pass directly into `glsl-canvas` or `hover-effect` with simple HTML dataset attributes.
