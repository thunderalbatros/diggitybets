import crypto from 'node:crypto';

let cachedPublicKey: string | null = null;
let lastKeyFetch = 0;
const KEY_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function getKickPublicKey(): Promise<string> {
  const now = Date.now();
  if (cachedPublicKey && now - lastKeyFetch < KEY_TTL) {
    return cachedPublicKey;
  }

  try {
    const res = await fetch('https://api.kick.com/public/v1/public-key');
    if (!res.ok) {
      throw new Error(`Failed to fetch Kick public key: HTTP ${res.status}`);
    }
    const data = await res.json();
    const key = data.public_key || data.key || data;
    cachedPublicKey = key;
    lastKeyFetch = now;
    return key;
  } catch (err) {
    console.error('[RSA Verify] Error fetching Kick public key:', err);
    if (cachedPublicKey) return cachedPublicKey;
    throw err;
  }
}

export interface WebhookVerifyOptions {
  messageId: string;
  timestamp: string;
  rawBody: string;
  signatureBase64: string;
}

export async function verifyKickWebhook(opts: WebhookVerifyOptions): Promise<boolean> {
  const { messageId, timestamp, rawBody, signatureBase64 } = opts;

  // 1. Replay prevention: timestamp must be fresh (< 300 seconds / 5 mins)
  const tsMillis = Date.parse(timestamp);
  if (isNaN(tsMillis)) return false;
  const delta = Math.abs(Date.now() - tsMillis);
  if (delta > 300_000) {
    console.warn(`[RSA Verify] Stale webhook rejected (delta: ${delta}ms > 300000ms)`);
    return false;
  }

  // 2. Fetch Kick Public Key
  const publicKeyPem = await getKickPublicKey();

  // 3. String to verify: messageId.timestamp.rawBody
  const data = Buffer.from(`${messageId}.${timestamp}.${rawBody}`, 'utf-8');
  const signature = Buffer.from(signatureBase64, 'base64');

  try {
    const isVerified = crypto.verify(
      'RSA-SHA256',
      data,
      {
        key: publicKeyPem,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      signature
    );
    return isVerified;
  } catch (err) {
    console.warn('[RSA Verify] Signature check threw error:', err);
    return false;
  }
}
