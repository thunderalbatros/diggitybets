import worker, { issueUserToken } from '../worker/index.js';

const users = [{ id: 'u1', username: 'tester', points_balance: 100, is_shadowbanned: 0 }];
const tx = [];
const env = {
  USER_SESSION_SECRET: 'test-secret',
  DB: {
    prepare(sql) {
      let args = [];
      const api = {
        bind(...a) { args = a; return api; },
        async first() {
          if (/FROM users WHERE LOWER\(username\)/.test(sql)) return users.find(u => u.username === String(args[0]).toLowerCase()) || null;
          return null;
        },
        async all() {
          const since = args[1];
          const g = {};
          for (const t of tx) if (t.created_at >= since) { g[t.type] = g[t.type] || { type: t.type, n: 0, s: 0 }; g[t.type].n++; g[t.type].s += Math.abs(t.amount); }
          return { results: Object.values(g) };
        },
        async run() {
          if (/SET points_balance = points_balance - /.test(sql)) {
            const u = users.find(x => x.id === args[1]);
            if (u && u.points_balance >= args[0]) { u.points_balance -= args[0]; return { meta: { changes: 1 } }; }
            return { meta: { changes: 0 } };
          }
          if (/SET points_balance = points_balance \+ /.test(sql)) { users.find(x => x.id === args[1]).points_balance += args[0]; return { meta: { changes: 1 } }; }
          if (/INSERT INTO point_transactions/.test(sql)) { tx.push({ type: args[4], amount: args[2], created_at: args[7] }); return { meta: { changes: 1 } }; }
          return { meta: { changes: 0 } };
        }
      };
      return api;
    }
  }
};

const token = await issueUserToken({ username: 'tester', kickId: 1 }, 'test-secret');
const call = async (body) => {
  const req = new Request('https://diggitybets.vip/api/games/bet', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://diggitybets.vip', 'x-user-token': token },
    body: JSON.stringify({ username: 'tester', ...body })
  });
  const res = await worker.fetch(req, env, { waitUntil() {} });
  return { status: res.status, ...(await res.json()) };
};

let fails = 0;
const check = (name, cond, extra) => { console.log(`${cond ? '[PASS]' : '[FAIL]'} ${name}`, cond ? '' : JSON.stringify(extra)); if (!cond) fails++; };

let r = await call({ action: 'credit', game: 'crash', amount: 500 });
check('credit without any debit is rejected', r.status === 400, r);
r = await call({ game: 'crash', betAmount: 50, rawMultiplier: 1000 });
check('legacy client-multiplier request is rejected', r.status === 400, r);
r = await call({ action: 'debit', game: 'crash', amount: 51 });
check('bet above 50 rejected', r.status === 400, r);
r = await call({ action: 'debit', game: 'crash', amount: 50 });
check('debit 50 -> balance 50', r.success && r.newBalance === 50, r);
r = await call({ action: 'credit', game: 'crash', amount: 473 });
check('credit 473 after debit 50 accepted -> 523', r.success && r.newBalance === 523, r);
r = await call({ action: 'credit', game: 'crash', amount: 550 });
check('replayed credit beyond ledger allowance rejected', r.status === 400, r);
r = await call({ action: 'debit', game: 'crash', amount: 50 });
r = await call({ action: 'debit', game: 'crash', amount: 50 });
check('balance never negative / insufficient handled', users[0].points_balance >= 0, users[0]);
users[0].points_balance = 10;
r = await call({ action: 'debit', game: 'dice', amount: 50 });
check('debit with insufficient balance rejected', r.status === 400 && users[0].points_balance === 10, r);

const noAuth = await worker.fetch(new Request('https://diggitybets.vip/api/games/bet', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://diggitybets.vip' }, body: JSON.stringify({ username: 'tester', action: 'debit', amount: 5 }) }), env, { waitUntil() {} });
check('no session token -> 403', noAuth.status === 403, noAuth.status);

console.log(fails ? `\n${fails} FAILED` : '\nALL LEDGER CHECKS PASSED');
process.exit(fails ? 1 : 0);
