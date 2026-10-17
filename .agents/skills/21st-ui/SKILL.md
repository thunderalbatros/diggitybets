---
name: 21st-ui
description: Find, inspect, adapt and integrate high-end modern UI components, design tokens, micro-interactions, shaders, bento blocks, and animations from 21st.dev (The npm for Design Engineers) into HuntHub / DiggityBets.
---

# 21st.dev Design Engineering Skill (HuntHub Suite)

`21st.dev` (by Serafim Kovalchuk / 21st Labs) is the premier open-source marketplace and registry of 10,000+ modern design-engineered UI components, blocks, micro-interactions, and animations (Magic UI, Aceternity, Cult UI, Radix primitives, Tailwind CSS).

## 1. Capabilities & Tools
When 21st MCP or CLI is active, the agent has access to:
- `search(query, tags, sort)`: Search 10,000+ components (e.g. "bento grid", "shiny button", "border beam", "neon glow card", "number ticker").
- `get_component(id)`: Fetch production-ready code, CSS tokens, and dependencies.
- `get_inspiration(category)`: Retrieve curated design patterns and visual references.
- `search_logo(brand)`: Get pixel-perfect SVG brand logos as ready-to-paste components.

## 2. Adaptation Workflow for DiggityBets (Vanilla CSS / $0 Budget)
HuntHub runs with high performance inside OBS and web browsers without heavy runtime overhead:
1. **Search & Retrieve**: Find the component on 21st.dev (via MCP, web search, or `references/ui-kb/`).
2. **Translate to Vanilla CSS / WAAPI**:
   - Convert Tailwind utility classes to semantic CSS classes with DiggityBets design tokens (`--bg-card`, `--border-subtle`, `--gold`, `--kick-green`, `--cyan`).
   - Replace heavy runtime animation libraries with CSS `@keyframes` or Web Animations API (WAAPI) for 0% CPU footprint.
3. **Embed in Overlays & Dashboards**:
   - Ensure WCAG AA contrast against dark glassmorphism backgrounds.
   - Test in 1440px, 768px, and 390px viewports.

## 3. High-Value 21st.dev Components for Casino Streaming Suites
- **Border Beam / Electric Border**: Glowing animated border traveling around cards (used in Battle Corner & King of the Hill).
- **Number Ticker / Animated Counter**: Smooth 60 FPS count-up transitions for financial payouts and multipliers.
- **Shiny / Shimmer Button**: Pulsing high-conversion buttons for CTA actions (e.g. "!battle", "Cashout", "Spin Wheel").
- **Holographic Glare Card**: Mouse-following 3D perspective glare for slot cards and champion podiums.
- **Bento Grid**: Asymmetric, high-density modular dashboards for KPIs and admin controls.
- **Confetti / Particle Blast**: Lightweight canvas celebrations for big wins and jackpot drops.
