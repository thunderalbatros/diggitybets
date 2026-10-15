# Primary Sources Registry — HuntHub Research Phase 1

All sources cataloged below were accessed, inspected, and cross-referenced.

---

### [SRC-001] Kick Official Developer Documentation
- **URL**: [https://docs.kick.com](https://docs.kick.com) & [https://github.com/KickEngineering/KickDevDocs](https://github.com/KickEngineering/KickDevDocs)
- **Author**: Kick Engineering Team
- **Type**: Official API Specification & Documentation
- **Access / License**: Public / Open Documentation
- **Date Accessed**: 2026-10-12
- **Relevance**: Critical for OAuth 2.1 PKCE, event webhooks (`chat.message.sent`), and chat write API.
- **Summary**: Defines official Kick REST API endpoints, OAuth flow, and webhook subscriptions. Notes intermittent webhook delivery reports in public GitHub issues, justifying a dual-reader architecture.
- **Confidence Rating**: **A** (Official Primary Source)

---

### [SRC-002] Bonus-Hunt-Electron Source Code
- **URL**: [https://github.com/McSon2/Bonus-Hunt-Electron](https://github.com/McSon2/Bonus-Hunt-Electron)
- **Author**: McSon (`McSon2`)
- **Type**: Open Source Desktop Application
- **Access / License**: MIT License (Commercial Friendly)
- **Date Accessed**: 2026-10-12
- **Relevance**: High. Serves as ground truth for bonus hunt formulas, break-even math, and SQLite schema.
- **Summary**: Implements bonus hunt tracking with start balance, opened bonus counts, and dynamic average multiplier calculation. Formulas: $\text{Req Avg } X = (\text{Start} - \text{Won}) / \text{Remaining Bets}$, $\text{Avg } X = \text{Won} / \text{Bet Opened}$.
- **Confidence Rating**: **A** (Working Code Reference)

---

### [SRC-003] Brackets-Manager.js & Brackets-Viewer.js
- **URL**: [https://github.com/Drarig29/brackets-manager.js](https://github.com/Drarig29/brackets-manager.js) & [https://github.com/Drarig29/brackets-viewer.js](https://github.com/Drarig29/brackets-viewer.js)
- **Author**: Drarig29
- **Type**: Open Source Tournament Framework
- **Access / License**: MIT License (Commercial Friendly)
- **Date Accessed**: 2026-10-12
- **Relevance**: High. Engine for the 8-bracket viewer slot championship.
- **Summary**: Complete tournament lifecycle management (single elimination, seeding, stage generation, match progress). Visualizer renders accessible SVG/HTML tree directly compatible with OBS Studio Browser Sources.
- **Confidence Rating**: **A** (Working Code Reference)

---

### [SRC-004] Cloudflare Workers & Durable Objects Documentation
- **URL**: [https://developers.cloudflare.com/workers/](https://developers.cloudflare.com/workers/)
- **Author**: Cloudflare
- **Type**: Official Platform Documentation
- **Access / License**: Public / Free Tier Documentation
- **Date Accessed**: 2026-10-12
- **Relevance**: High for real-time WebSocket state synchronization and zero-cost hosting.
- **Summary**: Free tier provides 100k requests/day, Durable Objects with SQLite, and WebSocket Hibernation API. Allows persistent state per channel without running expensive 24/7 dedicated virtual machines.
- **Confidence Rating**: **A** (Official Primary Source)

---

### [SRC-005] Actionable Gamification: Beyond Points, Badges, and Leaderboards
- **URL**: Knowledge vault [`knowledge/actionable_gamification.md`](file:///c:/Users/tomas/Desktop/streamerbot/knowledge/actionable_gamification.md)
- **Author**: Yu-kai Chou
- **Type**: Canon Framework Book
- **Access / License**: Open / Academic Resource
- **Date Accessed**: 2026-10-12
- **Relevance**: Core foundation for viewer engagement, unpredictability mechanics, and loyalty systems.
- **Summary**: Details the Octalysis framework (Epic Meaning, Accomplishment, Empowerment, Ownership, Social Influence, Scarcity, Unpredictability, Avoidance). Informs slot battle pacing and guess-the-balance excitement.
- **Confidence Rating**: **A** (Industry Standard Reference)
