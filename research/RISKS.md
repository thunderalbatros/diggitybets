# Risk Register & Mitigations — HuntHub

| Risk ID | Category | Description | Severity | Likelihood | Mitigation Strategy |
| :--- | :--- | :--- | :---: | :---: | :--- |
| **RSK-001** | Platform | Official Kick webhooks deliver events with latency or drop messages during platform spikes. | High | Medium | **Dual-Reader Hybrid Engine:** Ingest via official webhooks AND listen to local Pusher WebSocket directly (`chatrooms.{id}.v1`), deduplicating events by `message_id`. |
| **RSK-002** | Hardware | Laptop HP 250 G8 experiences frame drops if overlays use heavy shaders, 3D canvases, or huge bundles. | High | Low | **Lightweight Code Budget:** Vanilla CSS/JS, procedural Web Audio (zero MP3 decodes), no Docker, bundle size budget $\le 150\text{ KB}$ gzip. |
| **RSK-003** | Compliance | Twitch/Kick gambling policies penalize the channel if chat mechanics resemble illegal lotteries. | Critical | Low | **100% Free Entry Architecture:** Explicit disclaimers, zero financial transactions, zero custody of viewer funds, prominent +18 and responsible gambling banners. |
| **RSK-004** | Security | Malicious viewer types XSS script payload into `!slot` or `!guess` command. | High | Medium | **Zero-HTML Injection:** All spectator text is rendered strictly with `.textContent`. Strip control chars and non-printable Unicode. |
| **RSK-005** | Fairness | Disgruntled viewer claims a winner was chosen by favoritism or rigging. | Medium | Low | **Auditable Cryptographic Draws:** Web Crypto API (`crypto.getRandomValues`) with rejection sampling (zero modulo bias) and published snapshot seed hashes. |
| **RSK-006** | Streamer | Streamer makes a typo in live stream entering slot payout under pressure. | Medium | High | **Full Undo/Redo & Manual Override:** Immutable event-sourcing ledger allowing 1-click undo of the last payout entry. |
