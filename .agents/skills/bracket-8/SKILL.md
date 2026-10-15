---
name: bracket-8
description: Single-elimination 8-bracket tournament integration with brackets-manager and brackets-viewer.
---

# 8-Bracket Tournament Management

## Architecture
- Logic: `brackets-manager.js` in-memory SQLite/CRUD stage creation.
- Visual: `brackets-viewer.js` HTML5 render in OBS.

## Tournament Workflow
1. Collect 8 unique eligible participants from chat (`!tourney <slot>` or 30s active pool).
2. Seed with cryptographic Fisher-Yates shuffle.
3. Stage 1: 4 Quarterfinal matches (Matches 1 to 4).
4. Stage 2: 2 Semifinal matches (Winners of 1 vs 2, 3 vs 4).
5. Stage 3: Grand Final (Match 7).
6. Result update: Streamer enters multiplier ($X$) for each slot; highest $X$ automatically advances in the bracket viewer.
