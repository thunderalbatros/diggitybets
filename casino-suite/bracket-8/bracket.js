/* ============================================================
   CASINO SUITE — 8-Slot Tournament Bracket Logic
   ============================================================ */

const defaultSlots = [
  '1. Gates of Olympus', '2. Sweet Bonanza',
  '3. Sugar Rush', '4. Big Bass Bonanza',
  '5. Wanted Dead or Wild', '6. Chaos Crew 2',
  '7. San Quentin', '8. Mental'
];

const state = {
  activeMatch: 1,
  stage: 'QUARTERFINALS',
  matches: {
    1: { s1: defaultSlots[0], s2: defaultSlots[1], score1: null, score2: null, winner: null },
    2: { s1: defaultSlots[2], s2: defaultSlots[3], score1: null, score2: null, winner: null },
    3: { s1: defaultSlots[4], s2: defaultSlots[5], score1: null, score2: null, winner: null },
    4: { s1: defaultSlots[6], s2: defaultSlots[7], score1: null, score2: null, winner: null },
    5: { s1: 'Winner QF 1', s2: 'Winner QF 2', score1: null, score2: null, winner: null },
    6: { s1: 'Winner QF 3', s2: 'Winner QF 4', score1: null, score2: null, winner: null },
    7: { s1: 'Finalist 1', s2: 'Finalist 2', score1: null, score2: null, winner: null }
  },
  champion: null
};

function renderBracket() {
  document.getElementById('tournamentStage').textContent = state.stage;

  for (let i = 1; i <= 7; i++) {
    const m = state.matches[i];
    const box = document.getElementById(`m${i}`);
    const el1 = document.getElementById(`m${i}-s1`);
    const el2 = document.getElementById(`m${i}-s2`);

    if (!box || !el1 || !el2) continue;

    // Active spotlight
    if (state.activeMatch === i && !m.winner) {
      box.classList.add('active-match');
    } else {
      box.classList.remove('active-match');
    }

    // Slot 1
    el1.querySelector('.slot-name').textContent = m.s1;
    el1.querySelector('.slot-score').textContent = m.score1 !== null ? `${m.score1.toFixed(1)}x` : '-';
    el1.className = `match-slot ${m.winner === 1 ? 'winner' : m.winner === 2 ? 'loser' : ''}`;

    // Slot 2
    el2.querySelector('.slot-name').textContent = m.s2;
    el2.querySelector('.slot-score').textContent = m.score2 !== null ? `${m.score2.toFixed(1)}x` : '-';
    el2.className = `match-slot ${m.winner === 2 ? 'winner' : m.winner === 1 ? 'loser' : ''}`;
  }

  // Champion
  const champBox = document.getElementById('champBox');
  const champName = document.getElementById('champName');
  if (state.champion) {
    champName.textContent = state.champion;
    champBox.classList.add('badge-gold');
  } else {
    champName.textContent = 'TO BE DECIDED';
    champBox.classList.remove('badge-gold');
  }
}

function resolveMatch(matchId, winnerSide, score1, score2) {
  const m = state.matches[matchId];
  if (!m) return;

  m.score1 = score1;
  m.score2 = score2;
  m.winner = winnerSide;

  const winnerName = winnerSide === 1 ? m.s1 : m.s2;
  CasinoSounds.playWin(100);

  // Advance winner to next round
  if (matchId === 1) state.matches[5].s1 = winnerName;
  if (matchId === 2) state.matches[5].s2 = winnerName;
  if (matchId === 3) state.matches[6].s1 = winnerName;
  if (matchId === 4) state.matches[6].s2 = winnerName;
  if (matchId === 5) state.matches[7].s1 = winnerName;
  if (matchId === 6) state.matches[7].s2 = winnerName;
  if (matchId === 7) {
    state.champion = winnerName;
    state.stage = 'COMPLETED';
    if (typeof confetti === 'function') {
      confetti({ particleCount: 250, spread: 120, origin: { y: 0.5 } });
    }
  }

  // Progress active match pointer
  if (matchId < 7) {
    state.activeMatch = matchId + 1;
    state.stage = state.activeMatch <= 4 ? 'QUARTERFINALS' : state.activeMatch <= 6 ? 'SEMIFINALS' : 'GRAND FINAL';
  }

  renderBracket();
}

// Event Listeners (Dual Bus)
CasinoBus.on('bracket:state', (newState) => {
  Object.assign(state, newState);
  renderBracket();
});

CasinoBus.on('bracket:resolve', ({ matchId, winnerSide, score1, score2 }) => {
  resolveMatch(matchId, winnerSide, score1, score2);
});

CasinoBus.on('bracket:set_active', (matchId) => {
  state.activeMatch = matchId;
  renderBracket();
});

document.addEventListener('DOMContentLoaded', () => {
  const saved = CasinoBus.getState('bracket_state');
  if (saved) Object.assign(state, saved);
  renderBracket();
});
