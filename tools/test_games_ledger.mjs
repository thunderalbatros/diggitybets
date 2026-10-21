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
          if (/FROM point_transactions/.test(sql)) {
            const [, s24, s7] = args;
            const a = { d24: 0, n24: 0, c24: 0, d7: 0, c7: 0 };
            for (const t of tx) {
              if (t.created_at < s7) continue;
              const v = Math.abs(t.amount);
              if (t.type === 'game_debit') { a.d7 += v; if (t.created_at >= s24) { a.d24 += v; a.n24++; } }
              if (t.type === 'game_credit') { a.c7 += v; if (t.created_at >= s24) a.c24 += v; }
            }
            return a;
          }
          return null;
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

const DAY = 86_400_000;
const ageLedger = (ms) => { for (const t of tx) t.created_at -= ms; };

let r = await call({ action: 'credit', game: 'crash', amount: 500 });
check('credit without any debit is rejected', r.status === 400, r);
r = await call({ game: 'crash', betAmount: 50, rawMultiplier: 1000 });
check('legacy client-multiplier request is rejected', r.status === 400, r);
r = await call({ action: 'debit', game: 'crash', amount: 51 });
check('bet above 50 rejected', r.status === 400, r);
users[0].points_balance = 10;
r = await call({ action: 'debit', game: 'dice', amount: 50 });
check('debit with insufficient balance rejected', r.status === 400 && users[0].points_balance === 10, r);
users[0].points_balance = 100;
r = await call({ action: 'debit', game: 'crash', amount: 50 });
check('debit 50 -> balance 50', r.success && r.newBalance === 50, r);
r = await call({ action: 'credit', game: 'crash', amount: 473 });
check('credit 473 after debit 50 accepted -> 523', r.success && r.newBalance === 523, r);
r = await call({ action: 'credit', game: 'crash', amount: 550 });
check('replayed credit is paid only up to the remaining allowance (77)', r.success && r.capped && r.amount === 77 && r.newBalance === 600, r);
r = await call({ action: 'credit', game: 'crash', amount: 10 });
check('further credit at the cap rejected', r.status === 403 && r.capScope === 'daily', r);
r = await call({ action: 'debit', game: 'crash', amount: 5 });
check('daily net cap +500 reached -> new bets refused', r.status === 403 && /GAME_PROFIT_CAP_REACHED/.test(r.error) && r.capScope === 'daily', r);

ageLedger(2 * DAY);
r = await call({ action: 'debit', game: 'crash', amount: 50 });
check('after 24 h the daily window frees up', r.success, r);
r = await call({ action: 'credit', game: 'crash', amount: 550 });
check('second +500 day accepted (weekly net = 1000)', r.success && !r.capped && r.amount === 550, r);
ageLedger(2 * DAY);
r = await call({ action: 'debit', game: 'crash', amount: 5 });
check('weekly net cap +1000 reached -> new bets refused', r.status === 403 && r.capScope === 'weekly', r);
ageLedger(6 * DAY);
r = await call({ action: 'debit', game: 'crash', amount: 5 });
check('after 7 days the weekly window frees up', r.success, r);
check('balance never negative', users[0].points_balance >= 0, users[0]);

const noAuth = await worker.fetch(new Request('https://diggitybets.vip/api/games/bet', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://diggitybets.vip' }, body: JSON.stringify({ username: 'tester', action: 'debit', amount: 5 }) }), env, { waitUntil() {} });
check('no session token -> 403', noAuth.status === 403, noAuth.status);

console.log(fails ? `\n${fails} FAILED` : '\nALL LEDGER CHECKS PASSED');
process.exit(fails ? 1 : 0);
