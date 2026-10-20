---
name: web-quality-skills
description: "Measurement-first Web Quality and Core Web Vitals optimization (LCP, INP, CLS) based on addyosmani/web-quality-skills and."
---

# Web Quality & Core Web Vitals (`addyosmani/web-quality-skills`)

## Core Philosophy: The Metric-Honesty Rule

Never invent, guess, or hallucinate performance numbers (e.g. claiming "LCP improved by 42%"). Always distinguish between:
1. **Static / Build-Time Verification** (`node tools/audit/floor_and_aeo_guard.mjs` & `security_and_motion_audit.mjs`).
2. **Real Browser Lab / Field Telemetry** (`PerformanceObserver` for `INP`, `LCP`, `CLS`, and `requestAnimationFrame` FPS counter in `#cp-webvitals-pill`).

## Core Web Vitals Thresholds (75th Percentile)

| Metric | Target | Key Engineering Rules in HuntHub / DiggityBets |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | `≤ 2.5s` | Preconnect Google Fonts & Kick/Stake CDNs; avoid render-blocking scripts; inline SVG placeholders for empty corners. |
| **INP** (Interaction to Next Paint) | `≤ 200ms` (`≤ 150ms` in Control Panel) | Use ON/OFF module switches (`[data-cp-module-toggle]`) to keep inactive game DOM collapsed (`display: none`); apply `contain: layout style;` to `.glass-panel` cards; keep click handlers non-blocking. |
| **CLS** (Cumulative Layout Shift) | `≤ 0.1` (`≤ 0.05` target) | Always set explicit `width`, `height`, and `aspect-ratio: 180 / 236` on slot cover images (`<img>`) and reserve dimensions for wheel canvases (`width="250" height="250"`). |

## Page Visibility Governor (`addyosmani/visibly.js` Pattern)

When `document.hidden === true` (the browser tab is minimized or behind OBS/Stake):
- Pause non-essential decorative animations and particle loops (`document.body.classList.add('is-tab-hidden')`).
- Keep the Kick Pusher WebSocket (`!battle`, `!sr`, `!tourney`, `!guess`) and `BroadcastChannel` / Edge sync active so zero viewer commands are missed.
