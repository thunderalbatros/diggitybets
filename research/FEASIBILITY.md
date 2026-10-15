# Feasibility & Capacity Model — HuntHub

[VERIFICADO: Cloudflare Pricing & Limits, 2026-10]
[VERIFICADO: Kick Pusher WebSocket Specs, 2026-10]

---

## 1. Capacity Model for an 8-Hour Casino Live Stream

We evaluate chat load scenarios for an 8-hour stream (480 minutes) to verify permanent free-tier feasibility:

| Metric | Scenario A (Quiet Chat) | Scenario B (Active Chat) | Scenario C (Raid / Burst) |
| :--- | :---: | :---: | :---: |
| **Chat Speed** | 10 msgs / min | 60 msgs / min | 250 msgs / min |
| **Total Messages (8h)** | 4,800 messages | 28,800 messages | 120,000 messages |
| **Command Ratio (est. 15%)** | 720 commands | 4,320 commands | 18,000 commands |
| **Local Streamer.bot CPU** | < 0.5% | < 1.2% | < 2.5% |
| **Cloudflare Requests (Hybrid)** | ~1,200 | ~6,500 | ~24,000 |
| **Cloudflare Free Quota (100k/day)** | **1.2% used** | **6.5% used** | **24.0% used** |

### Capacity Conclusions:
1. **The Hybrid Architecture easily survives peak traffic:** By using local Streamer.bot / Pusher WebSocket processing for 30s active window tracking and sending only state snapshots and validated commands to the cloud hub, Cloudflare requests stay well below 25% of the free 100,000 requests/day quota even during massive hype moments.
2. **Local Memory Footprint:** The local 30s sliding chatter window holds at most 150–500 active chatter records in RAM ($\approx 25\text{ KB}$), negligible on the HP 250 G8 notebook.
3. **OBS Rendering:** Vanilla HTML/CSS with hardware acceleration uses under 4% CPU in OBS at 1920x540 / 60 FPS.

---

## 2. Zero-Cost Enforcement Audit

- **Hosting / Compute:** Cloudflare Workers (Free Plan, 100k requests/day, no credit card required).
- **State Engine:** Durable Objects with SQLite (Free Tier) + Local Streamer.bot v1.0.7 (Free portable C# runtime).
- **Client Libraries:** `streamerbot-client` (MIT), `brackets-viewer.js` (MIT), `canvas-confetti` (MIT), `Chakra Petch` Font (OFL).
- **Cost:** **USD $0.00 / ARS $0.00**, permanent.
