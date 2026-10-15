---
name: channel-points-bridge
description: Kick.com Channel Points API, webhooks RSA verification, and atomic credit bridging.
---

# Kick Channel Points Bridge Protocol

## 1. OAuth Scopes
- `channel:rewards:read`: Retrieve rewards list and redemptions queue.
- `channel:rewards:write`: Create custom reward and fulfill/cancel redemptions.

## 2. Webhook Event: `channel.reward.redemption.updated`
Payload structure received on Cloudflare Tunnel endpoint:
```json
{
  "event_id": "evt_abc123",
  "event_type": "channel.reward.redemption.updated",
  "created_at": "2026-10-12T22:00:00Z",
  "data": {
    "id": "rdm_998877",
    "channel_id": "1234567",
    "reward_id": "rew_credits_5k",
    "user_id": "987654",
    "user_login": "luckyviewer",
    "user_name": "LuckyViewer",
    "user_input": "",
    "status": "unfulfilled"
  }
}
```

## 3. Webhook RSA Signature Verification
Kick webhooks require asymmetrically signed RSA-SHA256 verification against Kick's public key:
1. Headers: `Kick-Event-Message-Id`, `Kick-Event-Message-Timestamp`, `Kick-Event-Signature`.
2. Verify timestamp is within 300 seconds of current UTC time to prevent replay attacks.
3. Verify signature using `@nekiro/kick-api` or Node's `crypto.verify('RSA-SHA256', data, publicKey, signature)`.

## 4. Atomic Credit Fulfillment
When a valid redemption is received:
1. Begin SQLite database transaction.
2. Verify that `rdm_998877` has not already been processed (idempotency key).
3. Credit points to `users` where `kick_id = data.user_id`.
4. Insert audit log row into `point_transactions`.
5. Commit transaction.
6. Make API call to fulfill the redemption:
   `PATCH /public/v1/channels/{broadcaster_id}/rewards/{reward_id}/redemptions/{id}`
   Body: `{"status": "fulfilled"}`
