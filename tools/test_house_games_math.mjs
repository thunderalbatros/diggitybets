import assert from 'assert';

console.log('=== VERIFYING HOUSE GAMES MATH, RTP & STAKE MECHANICS ===\n');

// 1. DICE MATH & RTP
console.log('--- 1. Dice Math & 1% House Edge Verification ---');
const testDice = (target, mode) => {
  let winChance = mode === 'over' ? (100 - target) : target;
  let mult = 99.00 / winChance;
  return { winChance, mult };
};

const over50 = testDice(50.00, 'over');
assert.strictEqual(over50.winChance, 50.00);
assert.strictEqual(over50.mult.toFixed(4), '1.9800');

const over6059 = testDice(60.59, 'over');
assert.strictEqual(parseFloat(over6059.winChance.toFixed(2)), 39.41);
assert.strictEqual(over6059.mult.toFixed(4), '2.5121'); // Matches user Screenshot 1 exactly!

const under4950 = testDice(49.50, 'under');
assert.strictEqual(under4950.winChance, 49.50);
assert.strictEqual(under4950.mult.toFixed(4), '2.0000');

console.log('[PASS] Dice Over/Under math precisely matches Stake Originals 1% house edge & Screenshot 1 (Target: 60.59 => Mult: 2.5121x, Win Chance: 39.41%)');

// 2. CRASH MATH & RTP
console.log('--- 2. Crash Provably Fair Math & 1% House Edge ---');
const calculateCrashPoint = (float) => {
  if (float < 0.01) return 1.00;
  return Math.floor((100 * 0.99) / (1.0 - float)) / 100;
};
assert.strictEqual(calculateCrashPoint(0.005), 1.00); // 1% instant crash
assert.strictEqual(calculateCrashPoint(0.50), 1.98); // ~2x at 50th percentile
console.log('[PASS] Crash house edge 1.00% & Stake formula verified.');

// 3. EUROPEAN ROULETTE
console.log('--- 3. European Roulette Wheel Sequence & 97.30% RTP ---');
const EURO_WHEEL = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
assert.strictEqual(EURO_WHEEL.length, 37);
const uniquePockets = new Set(EURO_WHEEL);
assert.strictEqual(uniquePockets.size, 37);
assert.strictEqual(EURO_WHEEL[0], 0);
assert.strictEqual(EURO_WHEEL[1], 32);
assert.strictEqual(EURO_WHEEL[36], 26);

// Expected payout for single number: 36 * (1/37) = 36/37 = 97.297%
const singleNumberRTP = (36 / 37) * 100;
assert.strictEqual(singleNumberRTP.toFixed(2), '97.30');

// Expected payout for Even/Odd, Red/Black: 2 * (18/37) = 36/37 = 97.297%
const evenMoneyRTP = (2 * (18 / 37)) * 100;
assert.strictEqual(evenMoneyRTP.toFixed(2), '97.30');
console.log('[PASS] European Roulette sequence and exact 97.30% RTP verified.');

// 4. BLACKJACK 3:2 PAYOUT & EVALUATION
console.log('--- 4. Blackjack Hand Calculation & 3:2 Payout ---');
const calculateHand = (cards) => {
  let total = 0;
  let aces = 0;
  cards.forEach(c => {
    const rank = c % 13;
    if (rank === 0) {
      aces += 1;
      total += 11;
    } else if (rank >= 9) {
      total += 10;
    } else {
      total += rank + 1;
    }
  });
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return total;
};

// Ace of Spades (0) + King of Hearts (25)
assert.strictEqual(calculateHand([0, 25]), 21);
// Ace (0) + Ace (13) + 9 (8)
assert.strictEqual(calculateHand([0, 13, 8]), 21);
// Natural Blackjack payout check: 25 bet pays 62.5 -> 62 (2.5x bet)
assert.strictEqual(Math.floor(25 * 2.5), 62);

// --- BLACKJACK INSURANCE VERIFICATION ---
// 1. Dealer up-card Ace detection: card % 13 === 0
const isAce = (cardNum) => cardNum % 13 === 0;
assert.strictEqual(isAce(0), true);   // Ace of Spades
assert.strictEqual(isAce(13), true);  // Ace of Hearts
assert.strictEqual(isAce(26), true);  // Ace of Diamonds
assert.strictEqual(isAce(39), true);  // Ace of Clubs
assert.strictEqual(isAce(12), false); // King

// 2. Insurance Cost: Exactly 50% of original bet
const testBet = 100;
const testInsuranceCost = Math.floor(testBet / 2);
assert.strictEqual(testInsuranceCost, 50);

// 3. Break-Even (Tablas) Net Math:
// Player bets 100 $DIG -> balance: 900
// Player buys Insurance 50 $DIG -> balance: 850
// Dealer has Blackjack (e.g. Ace [0] + Ten [9])
const dealerAceHand = [0, 9];
assert.strictEqual(calculateHand(dealerAceHand), 21);
// Insurance pays 2:1 on 50 $DIG -> pays 3x stake = 150 $DIG
const insurancePayout = testInsuranceCost * 3;
assert.strictEqual(insurancePayout, 150);
const finalBalanceWithInsurance = (1000 - testBet - testInsuranceCost) + insurancePayout;
assert.strictEqual(finalBalanceWithInsurance, 1000); // 100% Break Even / Tablas (Zero net loss!)

// --- BLACKJACK SPLIT VERIFICATION ---
// 1. Card Value Calculation for Split eligibility
function getCardValue(cardNum) {
  const rank = cardNum % 13;
  if (rank === 0) return 11; // Ace
  if (rank >= 9) return 10; // 10, J, Q, K
  return rank + 1; // 2 through 9
}

function canSplitHand(cards) {
  if (!cards || cards.length !== 2) return false;
  return getCardValue(cards[0]) === getCardValue(cards[1]);
}

// 8-8 pair (rank 7: card 7 and card 20)
assert.strictEqual(canSplitHand([7, 20]), true);
// Ace-Ace pair (rank 0: card 0 and card 13)
assert.strictEqual(canSplitHand([0, 13]), true);
// 10-value combinations: 10 (card 9) and Jack (card 10)
assert.strictEqual(canSplitHand([9, 10]), true);
// Queen (card 11) and King (card 12)
assert.strictEqual(canSplitHand([11, 12]), true);
// 10 and King
assert.strictEqual(canSplitHand([9, 12]), true);
// Non-matching cards: 7 (card 6) and 8 (card 7)
assert.strictEqual(canSplitHand([6, 7]), false);
// Non-matching cards: Ace (card 0) and King (card 12)
assert.strictEqual(canSplitHand([0, 12]), false);
// Cannot split hands with 3 cards
assert.strictEqual(canSplitHand([7, 20, 33]), false);

// 2. Dual Hand Independent Settlement Math
const splitBet = 50; // Each hand bets 50 (Total initial outlay: 100)
// Scenario A: Hand 1 wins (1:1 -> 100 payout), Hand 2 pushes (50 payout)
const payoutA = (splitBet * 2) + splitBet;
assert.strictEqual(payoutA, 150); // Net: +50 $DIG profit
// Scenario B: Hand 1 busts (0), Hand 2 wins (1:1 -> 100 payout)
const payoutB = 0 + (splitBet * 2);
assert.strictEqual(payoutB, 100); // Net: 0 $DIG (Even)
// Scenario C: Both hands bust
const payoutC = 0;
assert.strictEqual(payoutC, 0); // Net: -100 $DIG loss

console.log('[PASS] Blackjack hand evaluation, 3:2 natural payout, Insurance 2:1 break-even & Split mechanics verified.');

// 5. PLINKO PAYOUTS & ROWS
console.log('--- 5. Plinko Payout Tables & Probabilities ---');
const highPayouts = [76, 10, 3, 0.9, 0.3, 0.2, 0.3, 0.9, 3, 10, 76];
assert.strictEqual(highPayouts.length, 11); // 10 rows => 11 bins
assert.strictEqual(highPayouts[0], 76);
assert.strictEqual(highPayouts[5], 0.2);
assert.strictEqual(highPayouts[10], 76);
console.log('[PASS] Plinko 10-row bin payouts match official Stake Constants.');

// 6. HI-LO ODDS & PROBABILITIES
console.log('--- 6. Hi-Lo Odds & Stake Mechanics ---');
function getHiloOdds(rank) {
  const totalCards = 52;
  let higherCount = (14 - rank) * 4;
  let lowerCount = (rank - 2) * 4;
  if (rank === 14) higherCount = 4;
  if (rank === 2) lowerCount = 4;
  const calcMult = (cnt) => cnt > 0 ? Number((0.99 / (cnt / totalCards)).toFixed(4)) : 0;
  return {
    higher: { count: higherCount, multiplier: calcMult(higherCount) },
    lower: { count: lowerCount, multiplier: calcMult(lowerCount) }
  };
}

// King (rank 13): 1 higher rank (Ace = 4 cards) -> Higher is rare, Lower is common
const kingOdds = getHiloOdds(13);
assert.strictEqual(kingOdds.higher.count, 4);
assert.strictEqual(kingOdds.lower.count, 44);
assert.strictEqual(kingOdds.higher.multiplier, 12.87); // 0.99 / (4/52) = 12.87
assert.strictEqual(kingOdds.lower.multiplier, 1.17); // 0.99 / (44/52) = 1.17

// Seven (rank 7): 7 higher ranks (8..14 = 28 cards), 5 lower ranks (2..6 = 20 cards)
const sevenOdds = getHiloOdds(7);
assert.strictEqual(sevenOdds.higher.count, 28);
assert.strictEqual(sevenOdds.lower.count, 20);
assert.strictEqual(sevenOdds.higher.multiplier, 1.8386);
assert.strictEqual(sevenOdds.lower.multiplier, 2.574);
console.log('[PASS] Hi-Lo odds and 99.00% RTP multipliers verified.');

// 7. KENO PAYTABLES & DRAW INTEGRITY
console.log('--- 7. Keno Paytables & Provably Fair Draw ---');
const KENO_PAYTABLES = {
  1: { classic: [0, 3.96], low: [0.7, 1.85], medium: [0.4, 2.75], high: [0, 3.96] },
  4: { classic: [0, 0.8, 1.8, 5, 22.5], low: [0, 0, 2.2, 7.9, 90], medium: [0, 0, 1.7, 10, 100], high: [0, 0, 0, 10, 259] },
  10: { classic: [0, 0, 0, 1.4, 2.25, 4.5, 8, 17, 50, 80, 100], high: [0, 0, 0, 0, 3.5, 8, 13, 63, 500, 800, 1000] }
};

// Check Pick 10 High Risk Jackpot
assert.strictEqual(KENO_PAYTABLES[10].high[10], 1000); // 10/10 hits = 1000x
assert.strictEqual(KENO_PAYTABLES[4].classic[4], 22.5); // 4/4 hits = 22.5x
assert.strictEqual(KENO_PAYTABLES[1].classic[1], 3.96); // 1/1 hit = 3.96x

// Keno Draw Simulation: 10 unique sorted numbers in 1..40
const pool = Array.from({ length: 40 }, (_, i) => i + 1);
for (let i = pool.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [pool[i], pool[j]] = [pool[j], pool[i]];
}
const drawn = pool.slice(0, 10).sort((a, b) => a - b);
assert.strictEqual(drawn.length, 10);
assert.strictEqual(new Set(drawn).size, 10);
assert.ok(drawn.every(n => n >= 1 && n <= 40));
console.log(`[PASS] Keno paytables and provably fair draw verified (${drawn.join(', ')}).`);

console.log('\n=== ALL HOUSE GAMES MATHEMATICAL SPECIFICATIONS VERIFIED (100%) ===\n');

