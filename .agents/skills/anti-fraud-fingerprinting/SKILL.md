---
name: anti-fraud-fingerprinting
description: Device fingerprinting with ThumbmarkJS, Cloudflare Turnstile anti-bot verification, and SQLite multi-account clustering.
---

# Anti-Fraud & Multi-Account Detection Implementation

## 1. Client-Side Fingerprinting (ThumbmarkJS)
Use `thumbmarkjs` to compute a deterministic 32-character hardware fingerprint on the client:

```typescript
import { getFingerprint } from '@thumbmarkjs/thumbmarkjs';

export async function getDeviceFingerprint(): Promise<string> {
  try {
    const fingerprint = await getFingerprint();
    return fingerprint; // Deterministic hash of canvas, WebGL, audio, fonts
  } catch (err) {
    // Fallback pseudo-hash based on standard properties
    const raw = `${navigator.userAgent}|${screen.width}x${screen.height}|${new Date().getTimezoneOffset()}`;
    return simpleHash(raw);
  }
}
```

Send `x-device-fingerprint: <hash>` on sensitive requests (login, point claims, tournament registration).

## 2. Cloudflare Turnstile Server Verification
Always verify the Turnstile token on the backend before granting points or processing logins:

```typescript
export async function verifyTurnstileToken(token: string, secretKey: string): Promise<boolean> {
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: secretKey, response: token }),
    });
    const data = await res.json();
    return Boolean(data.success);
  } catch (err) {
    return false;
  }
}
```

## 3. SQLite Multi-Account Correlation & Device Locking
When processing a login or reward claim, query for device sharing:

```typescript
export async function recordUserDevice(db: Database, userId: string, deviceHash: string, ip: string) {
  const subnet = ip.split('.').slice(0, 3).join('.') + '.0/24';
  const now = Math.floor(Date.now() / 1000);

  // Check if another account used this device in the last 30 days
  const existingAccounts = await db.all(
    `SELECT DISTINCT user_id FROM user_devices 
     WHERE device_hash = ? AND user_id != ?`,
    [deviceHash, userId]
  );

  if (existingAccounts.length > 0) {
    for (const alt of existingAccounts) {
      await db.run(
        `INSERT OR IGNORE INTO alt_clusters (cluster_id, primary_user_id, associated_user_id, reason, detected_at)
         VALUES (?, ?, ?, 'SHARED_DEVICE', ?)`,
        [crypto.randomUUID(), userId, alt.user_id, now]
      );
      // Increment risk score
      await db.run(`UPDATE users SET risk_score = MIN(100, risk_score + 40) WHERE id IN (?, ?)`, [userId, alt.user_id]);
    }
  }

  await db.run(
    `INSERT INTO user_devices (id, user_id, device_hash, ip_subnet, user_agent, first_seen_at, last_seen_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(user_id, device_hash) DO UPDATE SET last_seen_at = excluded.last_seen_at`,
    [crypto.randomUUID(), userId, deviceHash, subnet, 'browser', now, now]
  );
}
```

## 4. Shadowban Exclusion Pattern in Draws
Never return an explicit error to suspected alts; simply filter them out from the eligible winning pool:

```typescript
export async function getEligibleParticipants(db: Database, minKickAgeDays: number = 7): Promise<User[]> {
  const cutoffTime = Math.floor(Date.now() / 1000) - (minKickAgeDays * 86400);
  return db.all<User>(
    `SELECT * FROM active_chatters
     WHERE is_shadowbanned = 0 
       AND risk_score < 75 
       AND kick_created_at <= ?`,
    [cutoffTime]
  );
}
```
