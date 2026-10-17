---
id: argentine-number-parsing
trigger: "when parsing numbers, balance amounts, currency, bets, or chat guesses"
confidence: 0.95
domain: "math-and-currency"
source: "session-observation"
scope: project
project_id: "streamerbot-hunthub"
project_name: "HuntHub & DiggityBets"
---

# Argentine and Multi-Locale Currency Parsing

## Action
Always use the robust number parser (`core/src/number-parser.ts` / `site/js/number-parser.js`) that handles Argentine punctuation conventions (dot for thousands, comma for decimals: `1.500,50` = `1500.50`), shorthand multipliers (`1.5k` = `1500`, `2m` = `2000000`, `100b`), and rejects NaN/negative bets before financial state mutations.

## Evidence
- Streamer Tomás and Argentine chatters input bets like `1.500` or `1,5k`. Standard `parseFloat("1.500")` parses as `1.5` instead of `1500`, causing massive under-credit bugs.
- Fixed in `core/test/phase4-prediction-store.test.ts` with passing test suites.
