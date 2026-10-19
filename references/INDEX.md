# Reference Repositories Index — Casino & Giveaway Streamer Suite

This directory contains local clones of state-of-the-art open-source libraries and projects used as architectural references for the **diggitybets** Kick streaming suite.

---

### 1. `brackets-manager.js`
- **Origin**: [https://github.com/Drarig29/brackets-manager.js](https://github.com/Drarig29/brackets-manager.js)
- **License**: MIT
- **Role in Suite**: The core logic engine for the **8-Bracket Slot Tournaments** (Single Elimination, Seeding, Winner Progression, Score tracking).
- **Key Modules**: In-memory database, stage creation (`stage.create`), match result updating (`match.update`).

### 2. `brackets-viewer.js`
- **Origin**: [https://github.com/Drarig29/brackets-viewer.js](https://github.com/Drarig29/brackets-viewer.js)
- **License**: MIT
- **Role in Suite**: Visual rendering of tournament brackets in HTML5/CSS3. Perfect for OBS Studio Browser Sources. Customizable themes (dark/neon casino aesthetics).

### 3. `streamerbot-client`
- **Origin**: [https://github.com/Streamerbot/client](https://github.com/Streamerbot/client)
- **License**: MIT
- **Role in Suite**: Official JavaScript client for Streamer.bot WebSocket Server (actions, triggers, events, custom events).

### 4. `multi-chat-overlay`
- **Origin**: [https://github.com/romestylez/multi-chat-overlay](https://github.com/romestylez/multi-chat-overlay)
- **License**: MIT
- **Role in Suite**: Reference implementation for direct Kick Pusher WebSocket integration (`app_key: 32cbd69e4b950bf97679`, cluster: `us2`, channel: `chatrooms.{id}.v1`), chat event parsing and badges.

### 5. `CS2_Case_Overlay`
- **Origin**: [https://github.com/LuciusRVN/CS2_Case_Overlay](https://github.com/LuciusRVN/CS2_Case_Overlay)
- **License**: MIT
- **Role in Suite**: Visual and sound inspiration for CS:GO / CS2 case unboxing, deceleration curves, and item rarity styling.

### 6. `animejs`
- **Origin**: [https://github.com/juliangarnier/anime](https://github.com/juliangarnier/anime)
- **License**: MIT
- **Role in Suite**: Lightweight animation and timeline engine (<18 KB) for 1v1 battle cards, VS impact effects, and bracket transitions.

### 7. `lucide`
- **Origin**: [https://github.com/lucide-icons/lucide](https://github.com/lucide-icons/lucide)
- **License**: ISC / MIT
- **Role in Suite**: Modern minimalist vector icons for provider badges, status markers, battle swords, and tournament trophies.

### 8. `bonus-hunt-tracker`
- **Origin**: [https://github.com/githubvoyage/bonus-hunt-tracker](https://github.com/githubvoyage/bonus-hunt-tracker)
- **License**: MIT
- **Role in Suite**: Mathematical formulas for casino bonus hunts (Break-even multiplier, Req Avg X, Avg X).

### 9. `KickLib`
- **Origin**: [https://github.com/Bukk94/KickLib](https://github.com/Bukk94/KickLib)
- **License**: MIT
- **Role in Suite**: C# reference for active Kick Pusher keys (`34bf7a0ff419a2a775b9`), chatroom v2 subscriptions, and event models.

---

## SOTA 2026 Expansion (`references/sota-expansion/`)

### 10. `pstack` (`references/sota-expansion/agents/pstack`)
- **Origin**: [https://github.com/backnotprop/pstack](https://github.com/backnotprop/pstack) (Lauren Tan)
- **Role in Suite**: AI Agent rigor, TDD, blast-radius calculation, and unslop discipline.

### 11. `composio` (`references/sota-expansion/agents/composio`)
- **Origin**: [https://github.com/ComposioHQ/composio](https://github.com/ComposioHQ/composio)
- **Role in Suite**: Standardized agent tooling framework, MCP connectors, and external tool integrations.

### 12. `crawlee` (`references/sota-expansion/agents/crawlee`)
- **Origin**: [https://github.com/apify/crawlee](https://github.com/apify/crawlee)
- **Role in Suite**: High-speed, stealthy Node.js scraping for slot RTP data and stream event feeds.

### 13. `it-tools` (`references/sota-expansion/agents/it-tools`)
- **Origin**: [https://github.com/CorentinTh/it-tools](https://github.com/CorentinTh/it-tools)
- **Role in Suite**: Complete cryptographic, hashing, encoding, regex, and developer utility toolkit.

### 14. `vanilla-lazyload` (`references/sota-expansion/web-performance/vanilla-lazyload`)
- **Origin**: [https://github.com/verlok/vanilla-lazyload](https://github.com/verlok/vanilla-lazyload)
- **Role in Suite**: Ultra-lightweight IntersectionObserver lazy loading for slot cards.

### 15. `htmx` (`references/sota-expansion/web-performance/htmx`)
- **Origin**: [https://github.com/bigskysoftware/htmx](https://github.com/bigskysoftware/htmx)
- **Role in Suite**: Hypermedia-driven lightweight reactivity without heavy virtual DOM overhead.

### 16. `loaders.css` (`references/sota-expansion/motion-ui/loaders.css`)
- **Origin**: [https://github.com/ConnorAtherton/loaders.css](https://github.com/ConnorAtherton/loaders.css)
- **Role in Suite**: 100% pure CSS, GPU-composited loaders with zero JS thread impact.

### 17. `dynamics.js` (`references/sota-expansion/motion-ui/dynamics.js`)
- **Origin**: [https://github.com/michaelvillar/dynamics.js](https://github.com/michaelvillar/dynamics.js)
- **Role in Suite**: Spring physics for slot cards, bouncy modals, and tactile casino elements.

### 18. `tabler-icons` (`references/sota-expansion/design-assets/tabler-icons`)
- **Origin**: [https://github.com/tabler/tabler-icons](https://github.com/tabler/tabler-icons)
- **Role in Suite**: 5,200+ clean SVG icons for administrative tools and game actions.

---

## Design Intelligence & Visual Awareness (`references/sota-expansion/design-intelligence/`)

### 19. `kokonutui` (`references/sota-expansion/design-intelligence/kokonutui`)
- **Origin**: [https://github.com/kokonut-labs/kokonutui](https://github.com/kokonut-labs/kokonutui)
- **License**: MIT
- **Role in Suite**: 40+ high-end SOTA 2026 UI components (bento cards, action search bars, dynamic text, detent dials, activity cards, background paths). Adapted to pure Vanilla JS/CSS for zero framework overhead.

### 20. `design-auditor` (`references/sota-expansion/design-intelligence/design-auditor`)
- **Origin**: [https://github.com/PashaSchool/design-auditor](https://github.com/PashaSchool/design-auditor)
- **License**: MIT
- **Role in Suite**: Automated design system linter ("Lighthouse for Design Consistency"). Evaluates computed styles across 9 modules: typography modular scales, delta-E color clustering, baseline vertical rhythm, WCAG AA contrast, and component spacing.

### 21. `ui-skills` (`references/sota-expansion/design-intelligence/ui-skills`)
- **Origin**: [https://github.com/ibelick/ui-skills](https://github.com/ibelick/ui-skills)
- **License**: MIT
- **Role in Suite**: Agent engineering playbook for baseline UI, optical balance, canvas component testing, and motion performance optimization.

### 22. `design-critique-mcp` (`references/sota-expansion/design-intelligence/design-critique-mcp`)
- **Origin**: [https://github.com/haasonsaas/design-critique-mcp](https://github.com/haasonsaas/design-critique-mcp)
- **License**: MIT
- **Role in Suite**: Model Context Protocol (MCP) server providing automated visual design analysis, layout scoring, color harmony analysis, and WCAG accessibility audits via multimodal VLM critique.

---

## Advanced Motion & Web Performance (`references/sota-expansion/`)

### 23. `nue` (`references/sota-expansion/web-performance/nue`)
- **Origin**: [https://github.com/nuejs/nue](https://github.com/nuejs/nue)
- **License**: MIT
- **Role in Suite**: Standards-first, ultra-lightweight web development framework emphasizing semantic HTML and separation of concerns.

### 24. `vanta` (`references/sota-expansion/motion-ui/vanta`)
- **Origin**: [https://github.com/tengbao/vanta](https://github.com/tengbao/vanta)
- **License**: MIT
- **Role in Suite**: Animated 3D WebGL background effects (rings, clouds, fog, waves) in pure JavaScript.

### 25. `lax.js` (`references/sota-expansion/motion-ui/lax.js`)
- **Origin**: [https://github.com/alexfoxy/lax.js](https://github.com/alexfoxy/lax.js)
- **License**: MIT
- **Role in Suite**: Lightweight (<4 KB) vanilla JS scroll & inertia animation library.

### 26. `flubber` (`references/sota-expansion/motion-ui/flubber`)
- **Origin**: [https://github.com/veltman/flubber](https://github.com/veltman/flubber)
- **License**: MIT
- **Role in Suite**: Smooth SVG path morphing between arbitrary 2D shapes (e.g. coin to trophy, star to heart).

### 27. `galacean-engine` (`references/sota-expansion/motion-ui/galacean-engine`)
- **Origin**: [https://github.com/galacean/engine](https://github.com/galacean/engine)
- **License**: MIT
- **Role in Suite**: High-performance mobile-first WebGL graphic and interactive engine.

### 28. `svg.js` (`references/sota-expansion/motion-ui/svg.js`)
- **Origin**: [https://github.com/svgdotjs/svg.js](https://github.com/svgdotjs/svg.js)
- **License**: MIT
- **Role in Suite**: Lightweight vector graphics manipulation and procedural drawing engine.

### 29. `lottie-web` (`references/sota-expansion/motion-ui/lottie`)
- **Origin**: [https://github.com/airbnb/lottie-web](https://github.com/airbnb/lottie-web)
- **License**: MIT
- **Role in Suite**: After Effects animation player for complex celebration badges and vector micro-interactions.

### 30. `typed.js` (`references/sota-expansion/motion-ui/typed.js`)
- **Origin**: [https://github.com/mattboldt/typed.js](https://github.com/mattboldt/typed.js)
- **License**: MIT
- **Role in Suite**: Dynamic typing animation library for casino banner announcements and jackpot headlines.

### 31. `animate.css` (`references/sota-expansion/motion-ui/animate.css`)
- **Origin**: [https://github.com/animate-css/animate.css](https://github.com/animate-css/animate.css)
- **License**: MIT
- **Role in Suite**: Battle-tested CSS keyframe animations for entry, exit, shake, and pulse effects.

### 32. `design-resources-for-developers` (`references/sota-expansion/design-assets/design-resources-for-developers`)
- **Origin**: [https://github.com/bradtraversy/design-resources-for-developers](https://github.com/bradtraversy/design-resources-for-developers)
- **License**: CC0 / Open
- **Role in Suite**: Curated directory of free stock assets, UI graphics, SVGs, audio FX, and fonts.
