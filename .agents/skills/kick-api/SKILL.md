---
name: kick-api
description: Kick.com official API, OAuth 2.1 PKCE, Webhooks and Pusher WebSocket integration cheatsheet.
---

# Kick API Integration Skill

## Endpoints & Credentials
- **Public API Base:** `https://api.kick.com/public/v1`
- **Pusher Cluster:** `us2` (`ws-us2.pusher.com`)
- **Pusher App Key:** `32cbd69e4b950bf97679`
- **Chat Event:** `App\Events\ChatMessageSentEvent` on channel `chatrooms.{chatroom_id}.v1`

## Webhook Signature Verification
Incoming Kick webhooks include an HMAC signature header. Always verify:
1. Extract signature header and timestamp.
2. Compute HMAC SHA-256 using your Webhook Secret.
3. Reject requests if computed signature does not match or timestamp delta > 300 seconds.

## Outbound Chat Messages
- Endpoint: `POST /public/v1/chat` with Bearer token.
- Payload: `{"chatroom_id": 9707, "content": "message", "type": "bot"}`
- Throttling: Enforce Token Bucket (maximum 1 message every 2 seconds).
