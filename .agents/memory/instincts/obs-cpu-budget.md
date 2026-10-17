---
id: obs-cpu-budget
trigger: "when writing or modifying OBS overlays, animations, DOM elements, or styles"
confidence: 0.95
domain: "performance-and-rendering"
source: "session-observation"
scope: project
project_id: "streamerbot-hunthub"
project_name: "HuntHub & DiggityBets"
---

# OBS Studio Browser Source Low-CPU Budget (≤5%)

## Action
Keep OBS browser sources extremely lightweight (≤5% CPU on Tomás's HP 250 G8 notebook).
1. Animate ONLY composite-only CSS properties: `transform` (using `translate3d` or `scale`) and `opacity`.
2. NEVER animate layout properties: `top`, `left`, `width`, `height`, `margin`, `padding`, or `border-width`.
3. Avoid heavy blur filters (`backdrop-filter: blur(20px)`) across full-screen overlay canvases; use solid pre-rendered dark rgba backdrops.
4. Pause requestAnimationFrame loops when no animation is active or browser source is hidden.

## Evidence
- Hardware constraint: HP 250 G8 notebook with Intel Core i3/i5 running OBS Studio encoder. Layout thrashing causes dropped frames on the Kick stream.
- Verified in `docs/architecture/ADR-004-OBS-OVERLAYS.md`.
