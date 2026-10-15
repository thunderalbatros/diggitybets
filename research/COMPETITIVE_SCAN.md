# Competitive Scan & Gap Analysis — Casino Stream Suites

A study of existing market solutions based strictly on public documentation, feature sets, and user experience.

---

### Comparison Matrix

| Feature | Bonushunt.gg / Bonustracker.pro | WenBot / KickBotPro | HuntHub (Our Integrated Suite) |
| :--- | :---: | :---: | :---: |
| **Business Model** | Paid SaaS Subscription / Licensing | Commercial Freemium / Cloud | **100% Free / Open Source (USD $0)** |
| **Data Custody** | Closed Proprietary Servers | Proprietary Bot Servers | **Local Sovereign / Self-Hosted** |
| **Bonus Hunt Tracking** | Yes (Manual / Spreadsheets) | No | **Yes (Integrated Chat + Panel + Overlay)** |
| **Guess the Balance** | Separate Web Form or Web Widget | Limited Commands | **Automated via Kick Chat (`!guess`)** |
| **CS:GO Giveaway Wheel** | No | Standalone basic wheel | **Bézier Deceleration + Procedural SFX** |
| **1v1 Slot Battles** | No | No | **Yes (Split-screen live OBS arena)** |
| **8-Bracket Tournaments** | External (Challonge) | No | **Native `brackets-viewer.js` in OBS** |
| **OBS Dock Integration** | Web-only | Web-only | **Native OBS Custom Browser Docks** |
| **Zero Modulo Bias** | Unknown | Pseudo-random `Math.random` | **Cryptographic `crypto.getRandomValues`** |
| **Compliance (+18 / Responsible)** | Often omitted | Often omitted | **Enforced by design across all overlays** |

### Market Gaps HuntHub Solves:
1. **Tool Fragmentation:** Streamers currently need 3 to 4 distinct tools (one for giveaways, one for brackets, one for bonus tracking, and one for chat commands). HuntHub unifies all 4 into a synchronized workflow.
2. **Subscription Costs:** Commercial trackers charge monthly fees or demand viewer registration on external ad-heavy portals. HuntHub runs locally and on free-tier infrastructure.
3. **Streamer Friction in Live Stream:** Switching out of OBS to edit spreadsheets during a high-energy bonus hunt causes stream delays. HuntHub provides single-click hotkeys and dedicated OBS docks with full Undo/Redo.
