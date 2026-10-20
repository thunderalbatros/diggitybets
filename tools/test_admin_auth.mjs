/**
 * tools/test_admin_auth.mjs — Regression tests for Worker admin authentication (Gate A1).
 * Reproduces the forged-header attack (any username + static public token) and verifies
 * that only HMAC-signed, unexpired tokens (or the break-glass secret) are accepted.
 *
 * Run: node tools/test_admin_auth.mjs
 */
import assert from 'node:assert/strict';
import worker, { issueAdminToken, issueUserToken } from '../worker/index.js';

const SECRET = 'unit-test-secret-0123456789abcdef';
const URL_ADMIN = 'https://diggitybets.vip/api/admin/store-redemptions';
const LEGACY_PUBLIC_TOKEN = 'diggity_stream_deck_v1';

async function call(headers, env) {
  const res = await worker.fetch(new Request(URL_ADMIN, { method: 'GET', headers }), env, {});
  return res.status;
}

async function callEndpoint(path, method, headers, body, env) {
  const res = await worker.fetch(
    new Request(`https://diggitybets.vip${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
      body: body ? JSON.stringify(body) : undefined
    }),
    env,
    { waitUntil() {} }
  );
  let json = null;
  try { json = await res.json(); } catch (_) {}
  return { status: res.status, json };
}

const results = [];
async function test(name, fn) {
  try {
    await fn();
    results.push({ name, ok: true });
    console.log(`  PASS  ${name}`);
  } catch (err) {
    results.push({ name, ok: false });
    console.log(`  FAIL  ${name}\n        ${err.message}`);
  }
}

const withSecret = { ADMIN_API_SECRET: SECRET };
const noSecret = {};

await test('legacy public token + arbitrary username is rejected (no secret configured)', async () => {
  assert.equal(await call({ 'x-admin-user': 'zz', 'x-admin-token': LEGACY_PUBLIC_TOKEN }, noSecret), 403);
});

await test('legacy public token + arbitrary username is rejected (secret configured)', async () => {
  assert.equal(await call({ 'x-admin-user': 'zz', 'x-admin-token': LEGACY_PUBLIC_TOKEN }, withSecret), 403);
});

await test('legacy public token + real streamer username is rejected', async () => {
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': LEGACY_PUBLIC_TOKEN }, withSecret), 403);
});

await test('missing token is rejected', async () => {
  assert.equal(await call({ 'x-admin-user': 'diggitybets' }, withSecret), 403);
});

await test('fails closed when ADMIN_API_SECRET is not configured (even with a "valid-looking" token)', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET);
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': token }, noSecret), 403);
});

await test('valid signed token for an admin is accepted', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET);
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': token }, withSecret), 200);
});

await test('signed token for a non-admin identity is rejected', async () => {
  const token = await issueAdminToken({ username: 'randomviewer', kickId: 123 }, SECRET);
  assert.equal(await call({ 'x-admin-user': 'randomviewer', 'x-admin-token': token }, withSecret), 403);
});

await test('token signed with a different secret is rejected', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, 'another-secret-xxxxxxxxxxxxxxxx');
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': token }, withSecret), 403);
});

await test('tampered payload is rejected', async () => {
  const token = await issueAdminToken({ username: 'randomviewer', kickId: 123 }, SECRET);
  const [, sig] = token.split('.');
  const forgedPayload = Buffer.from(JSON.stringify({ u: 'diggitybets', k: 88254585, exp: Date.now() + 3_600_000 })).toString('base64url');
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': `${forgedPayload}.${sig}` }, withSecret), 403);
});

await test('expired token is rejected', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET, -1000);
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': token }, withSecret), 403);
});

await test('break-glass: exact ADMIN_API_SECRET as token is accepted', async () => {
  assert.equal(await call({ 'x-admin-user': 'diggitybets', 'x-admin-token': SECRET }, withSecret), 200);
});

await test('cross-site Origin is rejected even with a valid token', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET);
  assert.equal(await call({ origin: 'https://evil.example', 'x-admin-user': 'diggitybets', 'x-admin-token': token }, withSecret), 403);
});

await test('N3: arbitrary *.workers.dev and chrome-extension:// origins are rejected', async () => {
  const token = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET);
  assert.equal(await call({ origin: 'https://attacker.workers.dev', 'x-admin-token': token }, withSecret), 403);
  assert.equal(await call({ origin: 'chrome-extension://abcdefghijklmnop', 'x-admin-token': token }, withSecret), 403);
});

await test('N1: /api/profile/update blocks unauthenticated and cross-user IDOR wallet hijacking', async () => {
  const noAuth = await callEndpoint('/api/profile/update', 'POST', {}, { username: 'victim', crypto_ltc: 'ltc1qattacker' }, withSecret);
  assert.equal(noAuth.status, 403);

  const attackerToken = await issueUserToken({ username: 'attacker', kickId: 999 }, SECRET);
  const crossUser = await callEndpoint('/api/profile/update', 'POST', { 'x-user-token': attackerToken }, { username: 'victim', crypto_ltc: 'ltc1qattacker' }, withSecret);
  assert.equal(crossUser.status, 403);

  const victimToken = await issueUserToken({ username: 'victim', kickId: 555 }, SECRET);
  const ownUser = await callEndpoint('/api/profile/update', 'POST', { 'x-user-token': victimToken }, { username: 'victim', crypto_ltc: 'ltc1qvictim' }, withSecret);
  assert.equal(ownUser.status, 200);
});

await test('N1: /api/privacy/purge rejects forged x-admin-user header without cryptographic token', async () => {
  const forged = await callEndpoint('/api/privacy/purge', 'POST', { 'x-admin-user': 'victim' }, { username: 'victim' }, withSecret);
  assert.equal(forged.status, 403);

  const victimToken = await issueUserToken({ username: 'victim', kickId: 555 }, SECRET);
  const validPurge = await callEndpoint('/api/privacy/purge', 'POST', { 'x-user-token': victimToken }, { username: 'victim' }, withSecret);
  assert.equal(validPurge.status, 200);
});

await test('N2: all 11 stream/bot/overlay mutation endpoints reject unauthenticated POSTs', async () => {
  const protectedRoutes = [
    ['/api/kick/chat/announce', { username: 'hacker', eventType: 'battle' }],
    ['/api/sync/state', { battleState: { status: 'PWNED' } }],
    ['/api/overlay/celebration', { winner: 'hacker' }],
    ['/api/companion/capture', { action: 'AUTO_VERIFY_BOUNTY_BET', betId: 'house:123456' }],
    ['/api/battle/update', { status: 'COMPLETED' }],
    ['/api/tourney/update', { status: 'COMPLETED' }],
    ['/api/wheel/spin-complete', { winner: 'hacker', announce: true }],
    ['/api/wheel/duo/queues', { battleQueue: [] }],
    ['/api/wheel/duo/mode', { mode: 'tourney' }],
    ['/api/wheel/duo/spin', { winner: 'hacker' }],
    ['/api/hunt/spotlight/clear', {}],
    ['/api/wheel/csgo/active-pool', { chatters: ['hacker'] }]
  ];

  for (const [route, payload] of protectedRoutes) {
    const res = await callEndpoint(route, 'POST', {}, payload, withSecret);
    assert.equal(res.status, 403, `Expected 403 on unauthenticated POST ${route}, got ${res.status}`);
  }

  const adminToken = await issueAdminToken({ username: 'diggitybets', kickId: 88254585 }, SECRET);
  const adminSync = await callEndpoint('/api/sync/state', 'POST', { 'x-admin-token': adminToken }, { battleState: { status: 'LOBBY' } }, withSecret);
  assert.equal(adminSync.status, 200);
});

await test('N5: /api/store/redeem requires user session token and ignores client-spoofed stakeVerified', async () => {
  const unauthRedeem = await callEndpoint('/api/store/redeem', 'POST', {}, { username: 'viewer1', voucherTitle: '$20 Bonus Buy Split Profit (50/50)' }, withSecret);
  assert.equal(unauthRedeem.status, 403);

  const userToken = await issueUserToken({ username: 'viewer1', kickId: 777 }, SECRET);
  const spoofedVip = await callEndpoint(
    '/api/store/redeem',
    'POST',
    { 'x-user-token': userToken },
    { username: 'viewer1', voucherTitle: '$20 Bonus Buy Split Profit (50/50)', stakeVerified: true },
    withSecret
  );
  assert.equal(spoofedVip.status, 200);
  assert.equal(spoofedVip.json.effectiveCost, 3000, 'Unverified user spoofing stakeVerified:true must still be charged 3000 $DIG');
  assert.equal(spoofedVip.json.stakeVerified, false);
});

const failed = results.filter((r) => !r.ok).length;
console.log(`\nAdmin & Endpoint Auth tests: ${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
