/* ============================================================
   CASINO SUITE — 1v1 Battle Arena Logic
   ============================================================ */

const state = {
  f1: { name: 'FIGHTER RED', slot: 'Wanted Dead or a Wild', hp: 10000, maxHp: 10000, score: 0, votes: 0, avatar: '' },
  f2: { name: 'FIGHTER BLUE', slot: 'Gates of Olympus', hp: 10000, maxHp: 10000, score: 0, votes: 0, avatar: '' },
  currentSpin: 0,
  totalSpins: 10,
  finished: false
};

const el = {
  f1Name: document.getElementById('f1Name'),
  f1Slot: document.getElementById('f1Slot'),
  f1Avatar: document.getElementById('f1Avatar'),
  f1HpBar: document.getElementById('f1HpBar'),
  f1HpText: document.getElementById('f1HpText'),
  f1Score: document.getElementById('f1Score'),
  f1Votes: document.getElementById('f1Votes'),
  f1VotePct: document.getElementById('f1VotePct'),

  f2Name: document.getElementById('f2Name'),
  f2Slot: document.getElementById('f2Slot'),
  f2Avatar: document.getElementById('f2Avatar'),
  f2HpBar: document.getElementById('f2HpBar'),
  f2HpText: document.getElementById('f2HpText'),
  f2Score: document.getElementById('f2Score'),
  f2Votes: document.getElementById('f2Votes'),
  f2VotePct: document.getElementById('f2VotePct'),

  roundInfo: document.getElementById('roundInfo'),
  hitAlert: document.getElementById('hitAlert'),
  koBanner: document.getElementById('koBanner'),
  winnerName: document.getElementById('winnerName')
};

function updateUI() {
  el.f1Name.textContent = state.f1.name;
  el.f1Slot.textContent = state.f1.slot;
  if (state.f1.avatar) el.f1Avatar.src = state.f1.avatar;

  const f1Pct = Math.max(0, Math.min(100, (state.f1.hp / state.f1.maxHp) * 100));
  el.f1HpBar.style.width = `${f1Pct}%`;
  el.f1HpText.textContent = `${Math.round(state.f1.hp)} HP`;
  el.f1Score.textContent = `${state.f1.score.toFixed(1)}x`;

  el.f2Name.textContent = state.f2.name;
  el.f2Slot.textContent = state.f2.slot;
  if (state.f2.avatar) el.f2Avatar.src = state.f2.avatar;

  const f2Pct = Math.max(0, Math.min(100, (state.f2.hp / state.f2.maxHp) * 100));
  el.f2HpBar.style.width = `${f2Pct}%`;
  el.f2HpText.textContent = `${Math.round(state.f2.hp)} HP`;
  el.f2Score.textContent = `${state.f2.score.toFixed(1)}x`;

  const totalVotes = state.f1.votes + state.f2.votes;
  const f1VoteRatio = totalVotes > 0 ? Math.round((state.f1.votes / totalVotes) * 100) : 50;
  el.f1Votes.textContent = state.f1.votes;
  el.f1VotePct.textContent = `${f1VoteRatio}%`;
  el.f2Votes.textContent = state.f2.votes;
  el.f2VotePct.textContent = `${100 - f1VoteRatio}%`;

  el.roundInfo.textContent = `SPIN ${state.currentSpin} / ${state.totalSpins}`;
}

// Deal Damage / Multiplier Impact
function recordSpin(side, mult) {
  if (state.finished) return;

  state.currentSpin = Math.min(state.totalSpins, state.currentSpin + 1);
  const dmg = mult * 100; // 10x multiplier = 1,000 HP damage

  if (side === 1) {
    state.f1.score += mult;
    state.f2.hp = Math.max(0, state.f2.hp - dmg);
    showHitAlert(`${state.f1.name} HITS! +${mult.toFixed(1)}x`, mult);
  } else {
    state.f2.score += mult;
    state.f1.hp = Math.max(0, state.f1.hp - dmg);
    showHitAlert(`${state.f2.name} HITS! +${mult.toFixed(1)}x`, mult);
  }

  updateUI();

  if (state.f1.hp <= 0 || state.f2.hp <= 0 || state.currentSpin >= state.totalSpins) {
    finishBattle();
  }
}

function showHitAlert(text, mult) {
  CasinoSounds.playHit();
  el.hitAlert.textContent = text;
  el.hitAlert.classList.remove('oculto');

  if (mult >= 50) {
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 450);
  }

  setTimeout(() => el.hitAlert.classList.add('oculto'), 2500);
}

function finishBattle() {
  state.finished = true;
  let winner = state.f1.name;
  if (state.f2.hp > state.f1.hp || state.f2.score > state.f1.score) {
    winner = state.f2.name;
  }

  el.winnerName.textContent = `${winner} WINS!`;
  el.koBanner.classList.remove('oculto');

  CasinoSounds.playWin(150);
  if (typeof confetti === 'function') {
    confetti({ particleCount: 220, spread: 110, origin: { y: 0.5 } });
  }
}

// Event Listeners (Dual Bus)
CasinoBus.on('battle:state', (newState) => {
  Object.assign(state, newState);
  updateUI();
});

CasinoBus.on('battle:spin', ({ side, mult }) => {
  recordSpin(side, parseFloat(mult) || 0);
});

CasinoBus.on('battle:vote', ({ side }) => {
  if (side === 1) state.f1.votes++;
  else state.f2.votes++;
  CasinoSounds.playClick();
  updateUI();
});

// Kick Chat Command Parsing (!vote 1, !vote 2, !red, !blue)
CasinoBus.on('kick:command', ({ command }) => {
  if (/^!(?:vote\s*1|red)/i.test(command)) {
    CasinoBus.emit('battle:vote', { side: 1 });
  } else if (/^!(?:vote\s*2|blue)/i.test(command)) {
    CasinoBus.emit('battle:vote', { side: 2 });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const saved = CasinoBus.getState('battle_state');
  if (saved) Object.assign(state, saved);
  updateUI();
});
