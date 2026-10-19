# CANON: Every Layout — Algorithmic CSS Layout Primitives
> **Authors:** Heydon Pickering & Andy Bell  
> **Source:** Every-Layout.dev & Axiomatic CSS  
> **Category:** UI/UX & Web Layout Architecture  
> **Target Audience:** HuntHub Frontend Engineers & Design Agents  

---

## 1. Executive Summary & Core Philosophy

Traditional responsive web design suffers from **breakpoint obsession**: writing dozens of fragile `@media (max-width: 768px)` queries with hardcoded "magic numbers" that shatter as soon as content changes or a component is reused inside a different column width.

**Every Layout** introduces **Algorithmic Layout Design**:
1. **Context Independence:** A component must regulate its own layout based on the space *it* occupies, not the global viewport width.
2. **Harnessing Browser Algorithms:** Browsers already possess high-performance layout engines (Flexbox, Grid, Flow). By supplying relational boundaries (`clamp`, `minmax`, `calc`, `flex-grow`), the browser solves layout mathematically without frame drops.
3. **Axiomatic CSS:** Spacing and alignment flow from the relationship between adjacent siblings, eliminating redundant layout rules on individual children.

---

## 2. The 12 Foundational Primitives (Implementation Spec)

### 2.1 The Stack (Vertical Rhythm)
Eliminates `margin-bottom` on every child. Injects vertical rhythm strictly between adjacent elements:
```css
.stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.stack > * + * {
  margin-block-start: var(--space, 1.5rem);
}
```

### 2.2 The Box (Contained Contrast & Inset)
Provides consistent internal padding, borders, and color inversion without layout collapse:
```css
.box {
  padding: var(--box-padding, 1.25rem);
  border: var(--border-width, 1px) solid var(--color-border);
  background: var(--color-surface);
  border-radius: var(--radius-md, 8px);
}
```

### 2.3 The Center (Horizontal Focus Boundary)
Centers content horizontally up to a strict readable measure while preserving safety gutters:
```css
.center {
  box-sizing: content-box;
  margin-inline: auto;
  max-inline-size: var(--max-width, 68ch);
  padding-inline: var(--gutter, 1rem);
}
```

### 2.4 The Cluster (Inline Tags & Button Groups)
Aligns items horizontally, wrapping naturally onto new lines without orphaned margins:
```css
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space, 0.75rem);
  justify-content: var(--justify, flex-start);
  align-items: var(--align, center);
}
```

### 2.5 The Sidebar (Auto-Collapsing Split)
Places a fixed/narrow sidebar next to fluid content. When space is insufficient, the sidebar automatically stacks beneath/above without a media query:
```css
.with-sidebar {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter, 1.5rem);
}
.with-sidebar > :first-child {
  flex-basis: var(--side-width, 280px);
  flex-grow: 1;
}
.with-sidebar > :last-child {
  flex-basis: 0;
  flex-grow: 999;
  min-inline-size: 50%;
}
```

### 2.6 The Switcher (Context-Aware Responsive Toggle)
Switches from a horizontal row to a vertical stack at a threshold without viewport media queries:
```css
.switcher {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter, 1rem);
}
.switcher > * {
  flex-grow: 1;
  flex-basis: calc((var(--threshold, 30rem) - 100%) * 999);
}
```

### 2.7 The Cover (Full-Height Centered Hero / Login)
Ensures a full-height container with optional header, footer, and a vertically and horizontally centered body:
```css
.cover {
  display: flex;
  flex-direction: column;
  min-block-size: 100vh;
  padding: var(--gutter, 1.5rem);
}
.cover > * {
  margin-block: 0;
}
.cover > :first-child:not(.cover-centered) {
  margin-block-end: auto;
}
.cover > :last-child:not(.cover-centered) {
  margin-block-start: auto;
}
.cover > .cover-centered {
  margin-block: auto;
}
```

### 2.8 The Grid (Fluid Auto-Fit Grid)
Generates uniform columns that wrap automatically based on a minimum card width:
```css
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, var(--min-col, 260px)), 1fr));
  gap: var(--gutter, 1.25rem);
}
```

### 2.9 The Frame (Aspect Ratio Media Constraint)
Embeds videos, slot preview canvas, or images with guaranteed aspect ratio and zero content distortion:
```css
.frame {
  aspect-ratio: var(--aspect-ratio, 16 / 9);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.frame > img,
.frame > video,
.frame > canvas {
  inline-size: 100%;
  block-size: 100%;
  object-fit: cover;
}
```

### 2.10 The Reel (Horizontal Snap Carousel)
Provides lightweight, hardware-accelerated horizontal scrolling for badges, slot cards, or tournament matches:
```css
.reel {
  display: flex;
  gap: var(--gutter, 1rem);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  padding-block-end: 0.5rem;
}
.reel > * {
  flex: 0 0 var(--item-width, 240px);
  scroll-snap-align: start;
}
```

### 2.11 The Imposter (Precise Floating Overlays)
Positions badges, notification pips, or centered modals cleanly over an anchor:
```css
.imposter-center {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
}
```

### 2.12 The Icon (Inline Relative Alignment)
Ensures SVGs scale and align seamlessly alongside typography:
```css
.icon {
  display: inline-flex;
  align-self: center;
  inline-size: 1em;
  block-size: 1em;
  vertical-align: -0.125em;
  fill: currentColor;
}
```

---

## 3. Direct Application to HuntHub Streamer Suite

1. **Tournament Brackets & Slot Grid:** Replace rigid pixel grids with `.grid-auto` (`minmax(min(100%, 280px), 1fr)`) so slot tiers wrap effortlessly on both mobile phone screens and widescreen desktop monitors.
2. **OBS Live Overlays:** Use `.imposter-center` and `.frame` to lock overlay compositions into transparent 1920x1080 canvas viewports without manual margin tweaking.
3. **Admin Dashboard Controls:** Use `.cluster` and `.switcher` so moderation buttons and betting controls reflow naturally on tablet or folded browser windows.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · #ui_ux_design
