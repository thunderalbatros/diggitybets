# ADR-001: Hybrid Dual-Reader & WebSocket Architecture for Kick Chat

- **Status:** Accepted
- **Date:** 2026-10-12
- **Deciders:** Antigravity Tech Lead, Tomás

## Context
Kick provides an official REST API with OAuth 2.1 and webhooks (`chat.message.sent`). However, official Kick developer community reports document intermittent webhook latency or lost messages during peak streaming hours. At the same time, running a heavy cloud VM 24/7 costs $5–$20/month, violating our strict **USD $0.00 / ARS $0.00** permanent budget constraint.

## Decision
We adopt a **Hybrid Dual-Reader Architecture**:
1. **Local Edge Ingestion (Pusher WebSocket):** Streamer.bot (and a lightweight local Node.js helper) directly listens to Kick's public Pusher WebSocket cluster (`ws-us2.pusher.com`, key `32cbd69e4b950bf97679`, channel `chatrooms.{id}.v1`). This provides sub-50ms chat ingestion with zero cloud costs.
2. **Cloudflare Worker Hub (WebSocket Hibernation API):** A Cloudflare Worker Durable Object receives state snapshots and validated commands, distributing real-time state to remote OBS overlays (such as the streamer in the US) without consuming CPU while idle.
3. **Event Deduplication:** All messages are deduplicated by Kick `message_id` within a sliding 60-second in-memory set.

## Alternatives Considered
- *Official Webhooks Only:* Rejected due to documented delivery drops during platform bursts.
- *Dedicated Cloud VPS (e2-micro / AWS EC2):* Rejected due to credit card requirements and egress IP costs.
- *Streamer.bot Standalone Only:* Good for local OBS, but fails when the streamer is in the US and the operator is in Argentina without port-forwarding. The Cloudflare WebSocket hub bridges them effortlessly for free.

## Consequences
- **Positive:** Sub-50ms responsiveness, 100% tolerance to webhook hiccups, zero hosting costs, cross-country synchronization between Argentina and the US.
- **Negative:** Requires channel `chatroom_id` resolution, which is automated in Phase 0 tooling.
