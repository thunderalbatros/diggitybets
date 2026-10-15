/* ============================================================
   CASINO SUITE — Community Bonus Hunt & Guess The Balance
   Full Reactive Engine (M2 & M3 Compliance)
   ============================================================ */

const state = {
  title: 'Community Bonus Hunt',
  currency: '$',
  startBalance: 1000.00,
  openingStartBalance: 1000.00,
  currentBalance: 1000.00,
  defaultBet: 2.00,
  phase: 'HUNTING', // 'DRAFT' | 'HUNTING' | 'OPENING' | 'FINISHED' | 'CANCELLED'
  bonuses: [
    { id: 1, game: "Odin's Vault", provider: 'Valkyrie Studio', recommender: 'LuckyChatter', bet: 2.00, payout: 0, mult: 0, opened: false, image: '../public/slots/odins-vault.jpg' },
    { id: 2, game: 'Sharks!', provider: 'Pragmatic Play', recommender: 'SlotMaster', bet: 4.00, payout: 0, mult: 0, opened: false, image: '../public/slots/sharks.jpg' },
    { id: 3, game: 'Waylanders Forge', provider: 'Valkyrie Studio', recommender: 'CasinoKing', bet: 2.00, payout: 0, mult: 0, opened: false, image: '../public/slots/waylanders-forge.jpg' },
    { id: 4, game: 'Wicked Grin', provider: 'Hacksaw Gaming', recommender: 'HighRoller', bet: 2.00, payout: 0, mult: 0, opened: false, image: '../public/slots/wicked-grin.jpg' }
  ],
  gtb: {
    phase: 'ABIERTA', // 'CERRADA' | 'ABIERTA' | 'BLOQUEADA' | 'RESUELTA'
    prizeText: '$50.00',
    guesses: {}, // username -> { user, guess, avatar, timestamp }
    winner: null
  },
  recommender: {
    active: false,
    user: null,
    avatar: null,
    timerSeconds: 60,
    timerInterval: null
  }
};

// DOM References
const el = {
  statStartBalance: document.getElementById('statStartBalance'),
  statCurrentBalance: document.getElementById('statCurrentBalance'),
  statProfitLoss: document.getElementById('statProfitLoss'),
  statReqAvgX: document.getElementById('statReqAvgX'),
  statAvgX: document.getElementById('statAvgX'),
  statProgress: document.getElementById('statProgress'),
  statBestWin: document.getElementById('statBestWin'),
  phaseBadge: document.getElementById('phaseBadge'),

  // Recommender Spotlight
  recommenderBanner: document.getElementById('recommenderBanner'),
  recAvatar: document.getElementById('recAvatar'),
  recUser: document.getElementById('recUser'),
  recTimer: document.getElementById('recTimer'),

  // Slots Grid
  bonusGrid: document.getElementById('bonusGrid'),
  slotsSub: document.getElementById('slotsSub'),

  // Guess the Balance
  gtbBadge: document.getElementById('gtbBadge'),
  gtbTotalCount: document.getElementById('gtbTotalCount'),
  gtbPrize: document.getElementById('gtbPrize'),
  gtbList: document.getElementById('gtbList'),
  gtbLeaderboardBox: document.getElementById('gtbLeaderboardBox'),
  gtbTopList: document.getElementById('gtbTopList'),

  // Modals
  gtbWinnerModal: document.getElementById('gtbWinnerModal'),
  gtbWinnerAvatar: document.getElementById('gtbWinnerAvatar'),
  gtbWinnerName: document.getElementById('gtbWinnerName'),
  gtbWinnerDetails: document.getElementById('gtbWinnerDetails'),
  gtbWinnerPrize: document.getElementById('gtbWinnerPrize'),

  revealModal: document.getElementById('revealModal'),
  revealGame: document.getElementById('revealGame'),
  revealMult: document.getElementById('revealMult'),
  revealPayout: document.getElementById('revealPayout')
};

// Helpers
function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function formatCurrency(val) {
  if (typeof CasinoNumberParser !== 'undefined' && CasinoNumberParser.formatMoney) {
    return CasinoNumberParser.formatMoney(val, state.currency);
  }
  return `${state.currency}${(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ============================================================
// Core Calculation & KPI Engine (Prompt Section 6.1 Formulas)
// ============================================================
function updateKPIs() {
  const bonuses = state.bonuses || [];
  const validBonuses = bonuses.filter((b) => !b.skipped);
  const opened = validBonuses.filter((b) => b.opened);
  const unopened = validBonuses.filter((b) => !b.opened);

  // Total won from opened bonuses
  const totalWon = opened.reduce((acc, b) => acc + (b.payout || 0), 0);
  const totalOpenedBets = opened.reduce((acc, b) => acc + (b.bet || 0), 0);
  const remainingBets = unopened.reduce((acc, b) => acc + (b.bet || 0), 0);

  // Current balance logic:
  // If in opening or finished: openingStartBalance + totalWon (unless explicitly overridden)
  if (state.phase === 'OPENING' || state.phase === 'FINISHED') {
    state.currentBalance = state.openingStartBalance + totalWon;
  } else {
    state.currentBalance = state.startBalance;
  }

  // Multiplier formulas:
  // avg_x = total_ganado_de_abiertas / total_apostado_de_abiertas
  const avgX = totalOpenedBets > 0 ? (totalWon / totalOpenedBets) : 0;

  // req_avg_x = max(0, balance_inicial - balance_actual) / apuestas_restantes
  const needed = state.startBalance - state.currentBalance;
  let reqAvgXText = '—';
  if (unopened.length === 0) {
    reqAvgXText = '—';
  } else if (needed <= 0) {
    reqAvgXText = 'BREAK-EVEN!';
  } else if (remainingBets > 0) {
    const reqX = needed / remainingBets;
    reqAvgXText = `${reqX.toFixed(1)}x`;
  }

  // profit_loss = balance_actual - balance_inicial
  const profitLoss = state.currentBalance - state.startBalance;

  // Best Win among opened bonuses
  let bestWinText = '—';
  if (opened.length > 0) {
    const best = opened.reduce((max, b) => (b.mult > max.mult ? b : max), opened[0]);
    if (best.mult > 0) {
      bestWinText = `${best.mult.toFixed(1)}x (${formatCurrency(best.payout)})`;
    }
  }

  // Update HUD DOM
  el.statStartBalance.textContent = formatCurrency(state.startBalance);
  el.statCurrentBalance.textContent = formatCurrency(state.currentBalance);
  
  el.statProfitLoss.textContent = (profitLoss >= 0 ? '+' : '') + formatCurrency(profitLoss);
  el.statProfitLoss.className = profitLoss >= 0 ? 'stat-sub text-green' : 'stat-sub text-magenta';

  el.statReqAvgX.textContent = reqAvgXText;
  el.statAvgX.textContent = `${avgX.toFixed(1)}x`;
  el.statProgress.textContent = `${opened.length} / ${validBonuses.length}`;
  el.statBestWin.textContent = bestWinText;

  // Phase badge
  el.phaseBadge.textContent = state.phase;
  el.phaseBadge.className = state.phase === 'OPENING' ? 'badge-gold' :
                            state.phase === 'FINISHED' ? 'badge-cyan' :
                            state.phase === 'DRAFT' ? 'badge-magenta' : 'badge-cyan';

  // Subtitle in slots grid
  if (state.phase === 'HUNTING') {
    el.slotsSub.textContent = `Collecting bonuses (${bonuses.length} collected)`;
  } else if (state.phase === 'OPENING') {
    el.slotsSub.textContent = `Opening bonuses: ${opened.length} of ${validBonuses.length} resolved`;
  } else if (state.phase === 'FINISHED') {
    el.slotsSub.textContent = 'Hunt completed!';
  } else {
    el.slotsSub.textContent = 'Setup mode';
  }

  updateGTBLeaderboard();
}

function getSlotCover(gameName) {
  if (!gameName) return '';
  const clean = gameName.toLowerCase().trim();
  const catalog = window.CasinoSlotsCatalog || [];
  const found = catalog.find((s) => s.name.toLowerCase() === clean || s.slug === clean.replace(/[^a-z0-9]+/g, '-'));
  if (found && found.image) return found.image;
  const slug = clean.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `../public/slots/${slug}.jpg`;
}

function getSlotProvider(gameName) {
  if (!gameName) return '';
  const clean = gameName.toLowerCase().trim();
  const catalog = window.CasinoSlotsCatalog || [];
  const found = catalog.find((s) => s.name.toLowerCase() === clean);
  return found?.provider || '';
}

// ============================================================
// Render Slots Grid with Cover Art Thumbnails
// ============================================================
function renderBonuses() {
  const bonuses = state.bonuses || [];

  if (bonuses.length === 0) {
    el.bonusGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-dim);">
        <div style="font-size: 32px; margin-bottom: 8px;">🎰</div>
        <div style="font-size: 16px; font-weight: 700; color: #fff;">NO BONUSES ADDED YET</div>
        <div style="font-size: 12px; margin-top: 4px;">Use the Streamer Control Deck or chat to add slots!</div>
      </div>
    `;
    return;
  }

  el.bonusGrid.innerHTML = bonuses.map((b, idx) => {
    const isOpening = b.opening && !b.opened;
    const statusClass = b.opened ? 'status-opened' : isOpening ? 'status-opening' : '';
    const multClass = b.opened ? (b.mult >= 100 ? 'won won-big' : 'won') : '';
    const multText = b.opened ? `${b.mult.toFixed(1)}x` : isOpening ? 'OPENING...' : 'LOCKED';
    const amountText = b.opened ? `+${formatCurrency(b.payout)}` : '';

    const initial = (b.game || 'S').trim().charAt(0).toUpperCase();
    const coverUrl = b.image || getSlotCover(b.game);
    const provider = b.provider || getSlotProvider(b.game);

    return `
      <div class="bonus-card ${statusClass}" id="card-${b.id}">
        <div class="card-thumb-wrap">
          <img src="${escapeHtml(coverUrl)}" alt="${escapeHtml(b.game)}" class="card-thumb" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="card-monogram-fallback" style="display:none;">${initial}</div>
          <span class="card-idx-badge">#${idx + 1}</span>
        </div>

        <div class="card-body">
          <div class="card-header-row">
            <span class="card-bet">${formatCurrency(b.bet)}</span>
            ${provider ? `<span class="card-provider" title="${escapeHtml(provider)}">${escapeHtml(provider)}</span>` : ''}
          </div>
          <div class="card-game" title="${escapeHtml(b.game)}">${escapeHtml(b.game)}</div>
          ${b.recommender ? `<div class="card-recommender">🎯 @${escapeHtml(b.recommender)}</div>` : ''}
          <div class="card-payout">
            <span class="card-mult ${multClass}">${multText}</span>
            <span class="card-amount">${amountText}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================
// Guess The Balance Logic (M3 Anti-Copy Privacy Shield & Leaderboard)
// ============================================================
function renderGTB() {
  const gtb = state.gtb || { phase: 'ABIERTA', guesses: {}, prizeText: '$50.00' };
  const guesses = gtb.guesses || {};
  const users = Object.keys(guesses);

  el.gtbTotalCount.textContent = users.length;
  el.gtbPrize.textContent = gtb.prizeText || '$50.00';

  // Badge status
  if (gtb.phase === 'ABIERTA') {
    el.gtbBadge.textContent = 'OPEN: !guess [$$]';
    el.gtbBadge.className = 'badge-gold';
  } else if (gtb.phase === 'BLOQUEADA') {
    el.gtbBadge.textContent = 'LOCKED (SEALED)';
    el.gtbBadge.className = 'badge-magenta';
  } else if (gtb.phase === 'RESUELTA') {
    el.gtbBadge.textContent = 'RESOLVED';
    el.gtbBadge.className = 'badge-cyan';
  } else {
    el.gtbBadge.textContent = 'CLOSED';
    el.gtbBadge.className = 'badge-magenta';
  }

  // Anti-Copying Privacy Shield:
  // When HUNTING or ABIERTA, conceal individual guesses to stop chat copying!
  const isPrivacyShieldActive = (state.phase === 'HUNTING' && gtb.phase === 'ABIERTA');

  if (isPrivacyShieldActive) {
    el.gtbList.innerHTML = `
      <div class="gtb-locked-msg">
        <div class="lock-icon">🔒</div>
        <div class="lock-title">GUESSES HIDDEN</div>
        <div class="lock-desc">Predictions are sealed to prevent chat copying.<br>Full leaderboard unlocks when opening begins!</div>
      </div>
    `;
    el.gtbLeaderboardBox.classList.add('oculto');
  } else {
    // Unlocked: Show entries
    if (users.length === 0) {
      el.gtbList.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-dim); font-size:12px;">No predictions submitted.</div>';
    } else {
      el.gtbList.innerHTML = users.map((u) => {
        const item = guesses[u];
        const val = typeof item === 'object' ? item.guess : item;
        return `
          <div class="guess-row">
            <span class="guess-user">@${escapeHtml(u)}</span>
            <span class="guess-val">${formatCurrency(val)}</span>
          </div>
        `;
      }).join('');
    }

    el.gtbLeaderboardBox.classList.remove('oculto');
    updateGTBLeaderboard();
  }
}

function updateGTBLeaderboard() {
  const gtb = state.gtb || { guesses: {} };
  const guesses = gtb.guesses || {};
  const users = Object.keys(guesses);

  if (users.length === 0 || (state.phase === 'HUNTING' && gtb.phase === 'ABIERTA')) {
    el.gtbLeaderboardBox.classList.add('oculto');
    return;
  }

  el.gtbLeaderboardBox.classList.remove('oculto');
  const target = state.currentBalance;

  // Closest-to-the-pin sorting: |guess - currentBalance|, break ties by timestamp
  const sorted = users.map((u) => {
    const item = guesses[u];
    const val = typeof item === 'object' ? item.guess : item;
    const ts = typeof item === 'object' ? (item.timestamp || 0) : 0;
    const diff = Math.abs(val - target);
    return { user: u, guess: val, diff, timestamp: ts };
  }).sort((a, b) => {
    if (a.diff !== b.diff) return a.diff - b.diff;
    return a.timestamp - b.timestamp;
  }).slice(0, 5);

  el.gtbTopList.innerHTML = sorted.map((s, idx) => `
    <div class="gtb-top-item">
      <span>#${idx + 1} @${escapeHtml(s.user)}</span>
      <span class="text-gold">${formatCurrency(s.guess)} <small style="color:var(--text-muted);">(Δ${formatCurrency(s.diff)})</small></span>
    </div>
  `).join('');
}

// ============================================================
// Active Recommender Spotlight Countdown
// ============================================================
function startRecommender(user, seconds = 60, avatar = null) {
  stopRecommender();

  state.recommender.active = true;
  state.recommender.user = user;
  state.recommender.avatar = avatar;
  state.recommender.timerSeconds = seconds;

  el.recommenderBanner.classList.remove('oculto');
  el.recUser.textContent = `@${user}`;
  el.recTimer.textContent = `${seconds}s`;

  if (avatar) {
    el.recAvatar.innerHTML = `<img src="${avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
  } else {
    el.recAvatar.textContent = user.charAt(0).toUpperCase();
  }

  CasinoSounds.playCoin();

  state.recommender.timerInterval = setInterval(() => {
    state.recommender.timerSeconds--;
    el.recTimer.textContent = `${state.recommender.timerSeconds}s`;

    if (state.recommender.timerSeconds <= 10 && state.recommender.timerSeconds > 0) {
      CasinoSounds.playClick();
    }

    if (state.recommender.timerSeconds <= 0) {
      stopRecommender();
      el.recSub.innerHTML = `<span class="text-magenta">Time's up! Re-roll viewer in control deck.</span>`;
    }
  }, 1000);
}

function stopRecommender() {
  if (state.recommender.timerInterval) {
    clearInterval(state.recommender.timerInterval);
    state.recommender.timerInterval = null;
  }
  state.recommender.active = false;
  el.recommenderBanner.classList.add('oculto');
}

// ============================================================
// Celebration & Modals
// ============================================================
function triggerBigWin(bonus) {
  el.revealGame.textContent = bonus.game;
  el.revealMult.textContent = `${bonus.mult.toFixed(1)}x`;
  el.revealPayout.textContent = `+${formatCurrency(bonus.payout)}`;
  el.revealModal.classList.remove('oculto');

  if (bonus.mult >= 100) {
    CasinoSounds.playWin(bonus.mult);
    if (typeof confetti === 'function') {
      confetti({ particleCount: 180, spread: 100, origin: { y: 0.6 } });
    }
  } else {
    CasinoSounds.playCoin();
  }

  setTimeout(() => {
    el.revealModal.classList.add('oculto');
  }, 4500);
}

function triggerWinnerCelebration(winnerData) {
  el.gtbWinnerName.textContent = `@${winnerData.user}`;
  el.gtbWinnerDetails.textContent = `Guess: ${formatCurrency(winnerData.guess)} | Final Balance: ${formatCurrency(winnerData.finalBalance)} (Diff: ${formatCurrency(winnerData.diff)})`;
  el.gtbWinnerPrize.textContent = `PRIZE: ${winnerData.prizeText || state.gtb.prizeText}`;

  if (winnerData.avatar) {
    el.gtbWinnerAvatar.innerHTML = `<img src="${winnerData.avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
  } else {
    el.gtbWinnerAvatar.textContent = (winnerData.user || 'W').charAt(0).toUpperCase();
  }

  el.gtbWinnerModal.classList.remove('oculto');
  CasinoSounds.playWin(250);

  if (typeof confetti === 'function') {
    confetti({ particleCount: 250, spread: 120, origin: { y: 0.5 } });
    setTimeout(() => {
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }, 600);
  }
}

// ============================================================
// Real-Time Bus & Chat Command Listeners
// ============================================================
CasinoBus.on('hunt:state', (newState) => {
  Object.assign(state, newState);
  updateKPIs();
  renderBonuses();
  renderGTB();
});

CasinoBus.on('hunt:add', (bonus) => {
  state.bonuses.push(bonus);
  CasinoSounds.playCoin();
  updateKPIs();
  renderBonuses();
});

CasinoBus.on('hunt:payout', ({ id, payout, mult }) => {
  const b = state.bonuses.find((item) => item.id === id);
  if (b) {
    b.opened = true;
    b.opening = false;
    b.payout = payout;
    b.mult = mult || (b.bet > 0 ? payout / b.bet : 0);
    triggerBigWin(b);
    updateKPIs();
    renderBonuses();
  }
});

CasinoBus.on('hunt:opening_start', ({ openingStartBalance }) => {
  state.phase = 'OPENING';
  state.openingStartBalance = openingStartBalance !== undefined ? openingStartBalance : state.startBalance;
  // Automatically lock GTB when opening starts (per specification)
  state.gtb.phase = 'BLOQUEADA';
  stopRecommender();
  updateKPIs();
  renderBonuses();
  renderGTB();
  CasinoSounds.playCoin();
});

CasinoBus.on('hunt:recommender_start', ({ user, seconds, avatar }) => {
  startRecommender(user, seconds || 60, avatar);
});

CasinoBus.on('hunt:recommender_stop', () => {
  stopRecommender();
});

CasinoBus.on('gtb:guess', ({ user, guess, avatar, timestamp }) => {
  if (state.gtb.phase !== 'ABIERTA') return;

  state.gtb.guesses[user] = {
    user,
    guess,
    avatar: avatar || null,
    timestamp: timestamp || Date.now()
  };

  CasinoSounds.playCoin();
  renderGTB();
  updateKPIs();
});

CasinoBus.on('gtb:resolve', (resolution) => {
  state.gtb.phase = 'RESUELTA';
  state.phase = 'FINISHED';

  const finalBalance = resolution?.finalBalance !== undefined ? resolution.finalBalance : state.currentBalance;
  const prizeText = resolution?.prizeText || state.gtb.prizeText;

  // Compute closest guess
  const users = Object.keys(state.gtb.guesses);
  if (users.length > 0) {
    const sorted = users.map((u) => {
      const item = state.gtb.guesses[u];
      const val = typeof item === 'object' ? item.guess : item;
      const ts = typeof item === 'object' ? (item.timestamp || 0) : 0;
      const diff = Math.abs(val - finalBalance);
      return { user: u, guess: val, diff, avatar: item.avatar, timestamp: ts };
    }).sort((a, b) => {
      if (a.diff !== b.diff) return a.diff - b.diff;
      return a.timestamp - b.timestamp;
    });

    const winner = sorted[0];
    state.gtb.winner = { ...winner, finalBalance, prizeText };
    triggerWinnerCelebration(state.gtb.winner);
  }

  updateKPIs();
  renderGTB();
});

// Kick Chat Command Parsing:
// Supports: !guess <amount> and !slot <name>
CasinoBus.on('kick:command', ({ command, user, avatar }) => {
  if (!command) return;

  // 1. !guess command
  if (command.startsWith('!guess') || command.startsWith('!balance')) {
    if (state.gtb.phase !== 'ABIERTA') return;

    const rawAmount = command.replace(/^!(guess|balance)\s*/i, '').trim();
    if (!rawAmount) return;

    if (typeof CasinoNumberParser !== 'undefined') {
      const parsed = CasinoNumberParser.parseGuess(rawAmount);
      if (parsed.valid) {
        CasinoBus.emit('gtb:guess', { user, guess: parsed.value, avatar, timestamp: Date.now() });
      }
    }
    return;
  }

  // 2. !slot command (active recommender picking)
  if (command.startsWith('!slot')) {
    const slotName = command.replace(/^!slot\s*/i, '').trim();
    if (!slotName) return;

    // If a recommender is in the spotlight: check if sender is the chosen viewer
    if (state.recommender.active) {
      if (state.recommender.user && state.recommender.user.toLowerCase() !== user.toLowerCase()) {
        // Not the spotlight viewer
        return;
      }
    }

    // Add slot to hunt
    const newBonus = {
      id: Date.now(),
      game: slotName,
      recommender: user,
      bet: state.defaultBet || 2.00,
      payout: 0,
      mult: 0,
      opened: false
    };

    CasinoBus.emit('hunt:add', newBonus);
    stopRecommender();
  }
});

// Panic Button
let isPanicHidden = false;
CasinoBus.on('panic:toggle', () => {
  isPanicHidden = !isPanicHidden;
  document.querySelector('.hunt-overlay-container').style.opacity = isPanicHidden ? '0' : '1';
});

// ============================================================
// Initialization
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const saved = CasinoBus.getState('hunt_state');
  if (saved) {
    Object.assign(state, saved);
  }

  updateKPIs();
  renderBonuses();
  renderGTB();
});
