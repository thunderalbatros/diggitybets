---
id: multi-locale-currency-parsing
trigger: "when parsing numbers, balance amounts, currency, bets, or chat guesses"
confidence: 0.95
domain: "math-and-currency"
source: "session-observation"
scope: project
project_id: "streamerbot-hunthub"
project_name: "HuntHub & DiggityBets"
---

# International Multi-Locale Currency & Numerical Parsing

## Action
Always use the robust number parser (`core/src/number-parser.ts` / `site/js/number-parser.js`) that handles international decimal and thousands separators (both dot-thousands `1.500,50` and comma-thousands `1,500.50`), shorthand multipliers (`1.5k` = `1500`, `2m` = `2000000`, `100b`), and strictly sanitizes/rejects `NaN`, negative bets, or out-of-bound inputs before financial state mutations.

## Evidence
- Web casino players and live stream chatters across the US, Europe, and Latin America input values in diverse formats (e.g., `1,500.00`, `1.500`, `1,5k`, `500k`). Standard JavaScript `parseFloat("1.500")` parses as `1.5` instead of `1500`, causing critical balance discrepancies.
- Verified and enforced in `core/test/phase4-prediction-store.test.ts`.
