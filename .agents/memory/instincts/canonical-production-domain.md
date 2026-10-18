# Instinct: Canonical Production Domain (`https://diggitybets.vip/`)

- **ID:** `canonical-production-domain`
- **Confidence:** 1.00
- **Scope:** Project-wide (`thunderalbatros/diggitybets`)
- **Status:** ACTIVE
- **Created:** 2026-10-18

## Context & Invariant Rule
The official production domain of HuntHub / DiggityBets is strictly:
`https://diggitybets.vip/`

## Operational Mandates
1. **Never substitute with preview subdomains:** When deploying via Cloudflare or Wrangler preview accounts (e.g. `*.workers.dev`), those temporary endpoints are strictly test artifacts for validation. The official and canonical domain communicated to the streamer and public users is ALWAYS `https://diggitybets.vip/`.
2. **Hardcoded URLs:** All OAuth callbacks, canonical links in `index.html`, `llms.txt`, `robots.txt`, and OBS Browser Source URLs must retain `https://diggitybets.vip/`.
3. **Memory Integrity:** When updating `docs/STATUS.md` or communicating deployment reports, always highlight `https://diggitybets.vip/` as the primary production destination.
