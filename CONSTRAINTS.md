# CONSTRAINTS.md — HuntHub & DiggityBets Immutable Quality & Operational Floors (2026)

> **Constitutional Lock Notice:** This file is cryptographically sealed via `SHA-256` in `.agents/memory/constitution_lock.json` and enforced by `tools/intelligence/constitution_guard.mjs`. Agents are strictly forbidden from lowering any numeric threshold below to pass tests (*Anti-Reward-Hacking Law*).

---

## 1. Financial & Licensing Floors (Non-Negotiable)
- **Total Budget (`COST_USD_MAX`)**: `0.00 USD / 0.00 ARS` permanently.
- **Credit Card Requirement**: `FORBIDDEN` (`0` services requiring credit card).
- **Allowed Open-Source Licenses**: `MIT`, `Apache-2.0`, `BSD-2-Clause`, `BSD-3-Clause`, `ISC`, `CC0-1.0`, `OFL-1.1`.

## 2. Compliance & Responsible Gambling Floors
- **Age Gate (`+18` / `18+`)**: Mandatory visible disclaimer in `index.html` (`100%`).
- **Spectator Fund Custody (`SPECTATOR_CUSTODY_MAX`)**: `0` (100% Free-to-Play virtual `$DIG` points; zero real-money deposits, buy-ins, or crypto custody).

## 3. Performance, Hardware & Payload Floors (HP 250 G8 + OBS Studio)
- **OBS Browser Source CPU Impact (`OBS_CPU_MAX_PCT`)**: `<= 5.0%` CPU in OBS Studio, `60 FPS` (`<= 16.6ms` frame budget).
- **Cloudflare Production Payload (`DIST_MAX_MB`)**: `<= 50.0 MB` total in `dist/`.
- **Cumulative Layout Shift (`CLS_MAX`)**: `0.000`.
- **Horizontal Overflow (`SCROLL_X_MAX_PX`)**: `0 px` across `1920x1080`, `1440x900`, `768x1024`, and `390x844`.
- **Master WebAudio Limiter Ceiling (`AUDIO_CEILING_DBFS`)**: `-4.0 dBFS` (`DynamicsCompressorNode` 20:1 ratio).

## 4. Code Integrity, RAG & Visual PQC Floors (`eval_matrix.mjs`)
- **AST Missing Methods (`AST_MISSING_METHODS_MAX`)**: `0`.
- **AST Security Blockers (`AST_SECURITY_BLOCKERS_MAX`)**: `0`.
- **Omni-RAG v5 Hit@5 Recall (`RAG_HIT_AT_5_MIN_PCT`)**: `>= 95.0%` across all Golden Queries (`< 350ms` per query).
- **Ragas Context Precision@3 (`RAG_CONTEXT_PRECISION_MIN`)**: `>= 0.80`.
- **Visual Snapshot Diff Ratio (`VISUAL_MAX_DIFF_PIXEL_RATIO`)**: `<= 0.01` (`1.0%`) with `animations: 'disabled'`.
- **Overall Eval Matrix Composite Score (`EVAL_COMPOSITE_MIN`)**: `>= 95.0 / 100.0` (`S+ Elite`).
