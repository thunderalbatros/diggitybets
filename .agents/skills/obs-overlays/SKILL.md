---
name: obs-overlays
description: Best practices for low-CPU, transparent, high-performance OBS Studio Browser Source overlays.
---

# OBS Studio Overlays Best Practices

## Canvas Geometry
- Use explicit viewport presets:
  - Fullscreen: `1920x1080`
  - Compact Banner: `1920x540` or `1920x200`
- Center all content with responsive transform scale to prevent clipping regardless of browser source resolution.

## Performance & CPU Budget (<= 5% in OBS)
- Use Vanilla CSS transitions and hardware-accelerated transforms (`translate3d`, `transform: scale`).
- Avoid full-screen blur filters (`backdrop-filter: blur()`) on frequently moving elements.
- Procedural Web Audio API instead of loading heavy audio assets.
- Auto-reconnect with exponential backoff if the WebSocket disconnects.
- Respect `prefers-reduced-motion` media queries.
