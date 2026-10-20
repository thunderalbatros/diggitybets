---
name: constraint-driven-development
description: "Establishes and enforces HuntHub's numeric quality bar in CONSTRAINTS.md and stops agents from quietly lowering it (Addy Osmani."
---

# Constraint-Driven Development & Floor Guard (`addyosmani/agent-skills`)

## Overview

Spec-driven development says *what* to build. Test-driven development proves *it works*. **Constraint-Driven Development** defines what *"good enough to ship"* means in numbers inside [`CONSTRAINTS.md`](file:///c:/Users/tomas/Desktop/streamerbot/CONSTRAINTS.md) and mechanically blocks any change that lowers the floor.

## The Five Floor-Guard Rules

Before declaring any task complete, run `node tools/audit/floor_and_aeo_guard.mjs` to verify none of the five forbidden moves occurred:

1. **No Weakened Thresholds:** Numeric targets in `CONSTRAINTS.md` (CPU ≤ 5%, INP ≤ 150ms, CLS ≤ 0.05, 8/8 OBS overlays in `dist/`, AEO 100/100) must never be edited downward.
2. **No Weakened Tests:** Never add `.skip`, delete test files, or strip assertions to pass CI.
3. **No Silenced Checkers:** Never add `@ts-ignore`, `eslint-disable`, or skip `node --check`.
4. **No Demo-Clutter or Unfinished Stubs:** Production overlays (`overlay-battle`, `overlay-tourney`, `overlay-bonushunt`, `overlay-celebration`, `overlay-slotrequests`) and `#control-panel` queues must start clean without fake hardcoded users.
5. **Mandatory Build Sync:** Any new static route or OBS overlay directory MUST be added to `overlayDirs` in [`tools/build_dist.mjs`](file:///c:/Users/tomas/Desktop/streamerbot/tools/build_dist.mjs).

## Verification Command

```powershell
node tools/audit/floor_and_aeo_guard.mjs
```
