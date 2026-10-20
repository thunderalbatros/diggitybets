/**
 * tools/test_admin_auth.mjs — Regression tests for Worker admin authentication (Gate A1).
 * Reproduces the forged-header attack (any username + static public token) and verifies
 * that only HMAC-signed, unexpired tokens (or the break-glass secret) are accepted.
 *
 * Run: node tools/test_admin_auth.mjs
 */
import assert from 'node:assert/strict';
import worker, { issueAdminToken } from '../worker/index.js';

const SECRET = 'unit-test-secret-0123456789abcdef';
const URL_ADMIN = 'https://diggitybets.vip/api/admin/store-redemptions';
const LEGACY_PUBLIC_TOKEN = 'diggity_stream_deck_v1';

async function call(headers, env) {
  const res = await worker.fetch(new Request(URL_ADMIN, { method: 'GET', headers }), env, {});
  return res.status;
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

const failed = results.filter((r) => !r.ok).length;
console.log(`\nAdmin auth tests: ${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
