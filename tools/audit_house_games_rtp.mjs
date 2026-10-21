/**
 * House Games RTP Auditor
 * Computes the real Return-To-Player of every house game using the exact constants in site/js/house-games.js,
 * including the effect of the per-round win cap (gross payout <= bet + 500 $DIG).
 * Blackjack is measured by Monte Carlo with basic strategy under the site's rules.
 *
 * Usage: node tools/audit_house_games_rtp.mjs [blackjackRounds=2000000]
 */
const WIN_CAP = 500;
const BETS = [5, 10, 25, 50];
const capMult = (bet, m) => Math.min(Math.floor(bet * m), bet + WIN_CAP) / bet;
const pct = (x) => (x * 100).toFixed(2) + '%';

function nCr(n, k) {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
}

const rows = [];
const add = (game, variant, nominal, perBet) => rows.push({ game, variant, nominal, perBet });

// ---------- Plinko (10 rows, p=0.5 per peg) ----------
const plinko = {
  low: [8.5, 2.9, 1.3, 1.0, 0.95, 0.5, 0.95, 1.0, 1.3, 2.9, 8.5],
  medium: [21, 4.8, 1.9, 1.3, 0.6, 0.4, 0.6, 1.3, 1.9, 4.8, 21],
  high: [72, 9.5, 2.9, 0.9, 0.3, 0.2, 0.3, 0.9, 2.9, 9.5, 72]
};
for (const [risk, pay] of Object.entries(plinko)) {
  const rtp = (f) => pay.reduce((s, m, k) => s + (nCr(10, k) / 1024) * f(m), 0);
  add('Plinko', risk, rtp((m) => m), BETS.map((b) => rtp((m) => capMult(b, m))));
}

// ---------- Keno (40 numbers, 10 drawn) ----------
const keno = {
  1: { classic: [0, 3.96], low: [0.7, 1.85], medium: [0.4, 2.75], high: [0, 3.96] },
  2: { classic: [0, 1.9, 4.5], low: [0, 2, 3.8], medium: [0, 1.8, 5.1], high: [0, 0, 17.1] },
  3: { classic: [0, 1, 3.1, 10.4], low: [0, 1.1, 1.38, 26], medium: [0, 0, 2.8, 50], high: [0, 0, 0, 81.5] },
  4: { classic: [0, 0.8, 1.8, 5, 22.5], low: [0, 0, 2.2, 7.9, 90], medium: [0, 0, 1.7, 10, 100], high: [0, 0, 0, 10, 259] },
  5: { classic: [0, 0.25, 1.4, 4.1, 16.5, 36], low: [0, 0, 1.5, 4.2, 13, 300], medium: [0, 0, 1.4, 4, 14, 390], high: [0, 0, 0, 4.5, 48, 450] },
  6: { classic: [0, 0, 1, 3.68, 7, 16.5, 40], low: [0, 0, 1.1, 2, 6.2, 100, 700], medium: [0, 0, 0, 3, 9, 180, 710], high: [0, 0, 0, 0, 11, 350, 710] },
  7: { classic: [0, 0, 0.47, 3, 4.5, 14, 31, 60], low: [0, 0, 1.1, 1.6, 3.5, 15, 225, 700], medium: [0, 0, 0, 2, 7, 30, 400, 800], high: [0, 0, 0, 0, 7, 90, 400, 800] },
  8: { classic: [0, 0, 0, 2.2, 4, 13, 22, 55, 70], low: [0, 0, 1.1, 1.5, 2, 5.5, 39, 100, 800], medium: [0, 0, 0, 2, 4, 11, 67, 400, 900], high: [0, 0, 0, 0, 5, 20, 270, 600, 900] },
  9: { classic: [0, 0, 0, 1.55, 3, 8, 15, 44, 60, 85], low: [0, 0, 1.1, 1.3, 1.7, 2.5, 7.5, 50, 250, 1000], medium: [0, 0, 0, 2, 2.5, 5, 15, 100, 500, 1000], high: [0, 0, 0, 0, 4, 11, 56, 500, 800, 1000] },
  10: { classic: [0, 0, 0, 1.4, 2.25, 4.5, 8, 17, 50, 80, 100], low: [0, 0, 1.1, 1.2, 1.3, 1.8, 3.5, 13, 50, 250, 1000], medium: [0, 0, 0, 1.6, 2, 4, 7, 26, 100, 500, 1000], high: [0, 0, 0, 0, 3.5, 8, 13, 63, 500, 800, 1000] }
};
const kenoSummary = { min: 9, max: 0, minCap50: 9 };
for (const [k, risks] of Object.entries(keno)) {
  for (const [risk, pay] of Object.entries(risks)) {
    const picks = Number(k);
    const rtp = (f) => pay.reduce((s, m, h) => s + (nCr(picks, h) * nCr(40 - picks, 10 - h) / nCr(40, 10)) * f(m), 0);
    const nominal = rtp((m) => m);
    const perBet = BETS.map((b) => rtp((m) => capMult(b, m)));
    kenoSummary.min = Math.min(kenoSummary.min, nominal);
    kenoSummary.max = Math.max(kenoSummary.max, nominal);
    kenoSummary.minCap50 = Math.min(kenoSummary.minCap50, perBet[3]);
    if (picks === 1 || picks === 5 || picks === 10) add('Keno', `${picks} picks ${risk}`, nominal, perBet);
  }
}

// ---------- Target-multiplier games (Dice / Limbo / Crash / Mines / Hi-Lo step) ----------
// RTP = P(win) * multiplier = 0.95 for any target, as long as bet*target <= bet + 500.
// Beyond that the payout is capped while the win chance keeps shrinking.
for (const target of [2, 10, 11, 50, 100]) {
  const p = 0.95 / target;
  add('Dice/Limbo/Crash', `target ${target}x`, 0.95, BETS.map((b) => p * capMult(b, target)));
}
add('Mines', 'any cashout (0.95 * fair odds)', 0.95, BETS.map(() => 0.95));
add('Hi-Lo', '1 step / 3 steps (0.95 compounding)', 0.95, BETS.map(() => 0.95 ** 3));
add('Roulette', 'European single zero, 35:1', 36 / 37, BETS.map(() => 36 / 37));

// ---------- Blackjack Monte Carlo ----------
function makeRng() {
  // V8 Math.random is a proper 64-bit xorshift128+ (adequate for simulation)
  return Math.random;
}
const cardVal = (c) => { const r = c % 13; return r === 0 ? 11 : r >= 9 ? 10 : r + 1; };
function handInfo(cards) {
  let t = 0, a = 0;
  for (const c of cards) { const v = cardVal(c); t += v; if (v === 11) a++; }
  while (t > 21 && a > 0) { t -= 10; a--; }
  return { total: t, soft: a > 0 };
}
// Basic strategy for S17 / DAS / no surrender. Returns 'H','S','D','P'
function strategy(cards, up, canDouble, canSplit) {
  const { total, soft } = handInfo(cards);
  if (canSplit && cards.length === 2 && cardVal(cards[0]) === cardVal(cards[1])) {
    const v = cardVal(cards[0]);
    if (v === 11 || v === 8) return 'P';
    if (v === 9 && up !== 7 && up !== 10 && up !== 11) return 'P';
    if (v === 7 && up <= 7) return 'P';
    if (v === 6 && up <= 6) return 'P';
    if (v === 4 && (up === 5 || up === 6)) return 'P';
    if ((v === 2 || v === 3) && up <= 7) return 'P';
  }
  const D = (cond, alt) => (cond ? (canDouble ? 'D' : alt) : null);
  if (soft) {
    if (total >= 19) return 'S';
    if (total === 18) return D(up >= 3 && up <= 6, 'S') || (up <= 8 ? 'S' : 'H');
    if (total === 17) return D(up >= 3 && up <= 6, 'H') || 'H';
    if (total === 15 || total === 16) return D(up >= 4 && up <= 6, 'H') || 'H';
    if (total === 13 || total === 14) return D(up >= 5 && up <= 6, 'H') || 'H';
    return 'H';
  }
  if (total >= 17) return 'S';
  if (total >= 13) return up <= 6 ? 'S' : 'H';
  if (total === 12) return up >= 4 && up <= 6 ? 'S' : 'H';
  if (total === 11) return D(up <= 10, 'H') || 'H';
  if (total === 10) return D(up <= 9, 'H') || 'H';
  if (total === 9) return D(up >= 3 && up <= 6, 'H') || 'H';
  return 'H';
}

function simulateBlackjack({ decks, rounds, h17 = false, bjPays = 1.5 }) {
  const rng = makeRng();
  const shoeSize = decks === Infinity ? 0 : 52 * decks;
  const shoe = new Uint16Array(shoeSize);
  let pos = 0;
  const draw = () => {
    if (decks === Infinity) return Math.floor(rng() * 52);
    return shoe[pos++];
  };
  let net = 0, sumSq = 0;
  for (let i = 0; i < rounds; i++) {
    if (decks !== Infinity) {
      // Site behaviour: fresh shuffle every round
      for (let j = 0; j < shoeSize; j++) shoe[j] = j % 52;
      for (let j = shoeSize - 1; j > 0; j--) { const k = Math.floor(rng() * (j + 1)); const t = shoe[j]; shoe[j] = shoe[k]; shoe[k] = t; }
      pos = 0;
    }
    const dealer = [draw(), draw()];
    const player = [draw(), draw()];
    const up = cardVal(dealer[0]);
    const dealerBJ = handInfo(dealer).total === 21;
    const playerBJ = handInfo(player).total === 21;
    let result = 0;
    if (dealerBJ) result = playerBJ ? 0 : -1; // peek on Ace and ten-value up-cards
    else if (playerBJ) result = bjPays;
    else {
      const hands = [{ cards: player, bet: 1, done: false, split: false }];
      const playHand = (h, allowSplit) => {
        while (!h.done) {
          const canDouble = h.cards.length === 2;
          const act = strategy(h.cards, up, canDouble, allowSplit && h.cards.length === 2);
          if (act === 'P') return 'split';
          if (act === 'S') { h.done = true; break; }
          if (act === 'D') { h.bet *= 2; h.cards.push(draw()); h.done = true; break; }
          h.cards.push(draw());
          const t = handInfo(h.cards).total;
          if (t >= 21) h.done = true;
        }
        return 'ok';
      };
      if (playHand(hands[0], true) === 'split') {
        const isAces = cardVal(player[0]) === 11;
        const a = { cards: [player[0], draw()], bet: 1, done: isAces, split: true };
        const b = { cards: [player[1], draw()], bet: 1, done: isAces, split: true };
        hands.length = 0; hands.push(a, b);
        for (const h of hands) { if (handInfo(h.cards).total === 21) h.done = true; playHand(h, false); }
      }
      const live = hands.some((h) => handInfo(h.cards).total <= 21);
      let dt = handInfo(dealer);
      if (live) {
        while (dt.total < 17 || (h17 && dt.total === 17 && dt.soft)) { dealer.push(draw()); dt = handInfo(dealer); }
      }
      for (const h of hands) {
        const pt = handInfo(h.cards).total;
        if (pt > 21) result -= h.bet;
        else if (dt.total > 21 || pt > dt.total) result += h.bet;
        else if (pt < dt.total) result -= h.bet;
      }
    }
    net += result; sumSq += result * result;
  }
  const mean = net / rounds;
  const sd = Math.sqrt(sumSq / rounds - mean * mean);
  return { rtp: 1 + mean, se: sd / Math.sqrt(rounds) };
}

const N = Number(process.argv[2]) || 2_000_000;
const bjConfigs = [
  { label: 'PREVIOUS: 1 deck reshuffled every hand, S17, 3:2', decks: 1 },
  { label: 'Option: 8 decks reshuffled every hand, S17, 3:2', decks: 8 },
  { label: 'CURRENT: infinite deck (Stake-style RNG), S17, 3:2', decks: Infinity },
  { label: 'Option: 8 decks, dealer hits soft 17 (H17), 3:2', decks: 8, h17: true }
];

console.log('\n=== HOUSE GAMES RTP AUDIT (win cap: gross <= bet + 500 $DIG) ===\n');
console.log('Game'.padEnd(18), 'Variant'.padEnd(36), 'Nominal'.padStart(9), ...BETS.map((b) => `bet ${b}`.padStart(9)));
for (const r of rows) {
  console.log(r.game.padEnd(18), r.variant.padEnd(36), pct(r.nominal).padStart(9), ...r.perBet.map((x) => pct(x).padStart(9)));
}
console.log(`\nKeno (all 40 pick/risk combos): nominal ${pct(kenoSummary.min)} - ${pct(kenoSummary.max)}, worst with bet 50 + cap: ${pct(kenoSummary.minCap50)}`);

console.log(`\n=== BLACKJACK Monte Carlo (${N.toLocaleString()} rounds each, basic strategy, never insurance) ===`);
for (const c of bjConfigs) {
  const t0 = Date.now();
  const { rtp, se } = simulateBlackjack({ ...c, rounds: N });
  console.log(`${c.label.padEnd(52)} RTP ${pct(rtp)}  (house edge ${((1 - rtp) * 100).toFixed(2)}% ± ${(se * 196).toFixed(2)}% 95% CI)  ${Date.now() - t0}ms`);
}
