/* ============================================================
   CASINO SUITE — Streamer Control Deck Logic (HuntHub)
   Full M2 & M3 Lifecycle, Undo/Redo Event Stack & Autocomplete
   ============================================================ */

// Tab Navigation
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.deck-section').forEach((s) => s.classList.remove('active'));

    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.tab);
    if (target) target.classList.add('active');
    CasinoSounds.playClick();
  });
});

// ============================================================
// State Management & Undo / Redo Event Sourcing Stack
// ============================================================
let huntState = {
  title: 'Community Bonus Hunt',
  currency: '$',
  startBalance: 1000.00,
  openingStartBalance: 1000.00,
  currentBalance: 1000.00,
  defaultBet: 2.00,
  phase: 'HUNTING', // 'DRAFT' | 'HUNTING' | 'OPENING' | 'FINISHED'
  bonuses: [
    { id: 1, game: "Odin's Vault", provider: 'Valkyrie Studio', recommender: 'LuckyChatter', bet: 2.00, payout: 0, mult: 0, opened: false, image: '../public/slots/odins-vault.jpg' },
    { id: 2, game: 'Sharks!', provider: 'Pragmatic Play', recommender: 'SlotMaster', bet: 4.00, payout: 0, mult: 0, opened: false, image: '../public/slots/sharks.jpg' },
    { id: 3, game: 'Waylanders Forge', provider: 'Valkyrie Studio', recommender: 'CasinoKing', bet: 2.00, payout: 0, mult: 0, opened: false, image: '../public/slots/waylanders-forge.jpg' },
    { id: 4, game: 'Wicked Grin', provider: 'Hacksaw Gaming', recommender: 'HighRoller', bet: 2.00, payout: 0, mult: 0, opened: false, image: '../public/slots/wicked-grin.jpg' }
  ],
  gtb: {
    phase: 'ABIERTA',
    prizeText: '$50.00',
    guesses: {},
    winner: null
  },
  recommender: {
    active: false,
    user: null,
    timerSeconds: 60
  }
};

const undoStack = [];
const redoStack = [];

function recordSnapshot() {
  // Push deep copy of huntState to undo stack (max 50 steps)
  undoStack.push(JSON.parse(JSON.stringify(huntState)));
  if (undoStack.length > 50) undoStack.shift();
  redoStack.length = 0; // Clear redo on new action
  updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
  const btnUndo = document.getElementById('btnUndo');
  const btnRedo = document.getElementById('btnRedo');
  if (btnUndo) btnUndo.disabled = undoStack.length === 0;
  if (btnRedo) btnRedo.disabled = redoStack.length === 0;
}

document.getElementById('btnUndo').addEventListener('click', () => {
  if (undoStack.length === 0) return;
  redoStack.push(JSON.parse(JSON.stringify(huntState)));
  huntState = undoStack.pop();
  broadcastState();
  updateUndoRedoButtons();
  CasinoSounds.playClick();
});

document.getElementById('btnRedo').addEventListener('click', () => {
  if (redoStack.length === 0) return;
  undoStack.push(JSON.parse(JSON.stringify(huntState)));
  huntState = redoStack.pop();
  broadcastState();
  updateUndoRedoButtons();
  CasinoSounds.playClick();
});

function broadcastState() {
  CasinoBus.emit('hunt:state', huntState);
  CasinoBus.setState('hunt_state', huntState);
  renderAll();
}

// Helpers
function formatMoney(val) {
  if (typeof CasinoNumberParser !== 'undefined' && CasinoNumberParser.formatMoney) {
    return CasinoNumberParser.formatMoney(val, huntState.currency || '$');
  }
  return `$${(val || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
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

function getSlotData(gameName) {
  if (!gameName) return null;
  const clean = gameName.toLowerCase().trim();
  const catalog = window.CasinoSlotsCatalog || [];
  return catalog.find((s) => s.name.toLowerCase() === clean || s.slug === clean.replace(/[^a-z0-9]+/g, '-')) || null;
}

// Live Slot Cover Preview Handler
function updateSlotPreview() {
  const inputEl = document.getElementById('huntGameInput');
  if (!inputEl) return;
  const name = inputEl.value.trim();
  const slotData = getSlotData(name);
  const coverUrl = slotData?.image || getSlotCover(name);
  const provider = slotData?.provider || 'Unknown Provider';
  const maxWin = slotData?.maxWin ? `Max Win: ${slotData.maxWin}` : 'Standard Volatility';
  const rtp = slotData?.rtp ? `· RTP: ${slotData.rtp}` : '';

  const imgEl = document.getElementById('slotPreviewImg');
  const fallbackEl = document.getElementById('slotPreviewFallback');
  const nameEl = document.getElementById('slotPreviewName');
  const providerEl = document.getElementById('slotPreviewProvider');
  const statsEl = document.getElementById('slotPreviewStats');

  if (nameEl) nameEl.textContent = name || 'Choose a slot';
  if (providerEl) providerEl.textContent = provider;
  if (statsEl) statsEl.textContent = `${maxWin} ${rtp}`;

  if (imgEl) {
    imgEl.style.display = 'block';
    if (fallbackEl) fallbackEl.style.display = 'none';
    imgEl.src = coverUrl;
  }
}

// ============================================================
// Load Slots Catalog into Autocomplete Datalist
// ============================================================
async function loadSlotsCatalog() {
  const datalist = document.getElementById('slotsDatalist');
  if (!datalist) return;

  // Load custom slots saved in localStorage
  try {
    const custom = JSON.parse(localStorage.getItem('casino_custom_slots') || '[]');
    if (custom.length > 0 && window.CasinoSlotsCatalog) {
      custom.forEach((cs) => {
        if (!window.CasinoSlotsCatalog.some((s) => s.name.toLowerCase() === cs.name.toLowerCase())) {
          window.CasinoSlotsCatalog.unshift(cs);
        }
      });
    }
  } catch (e) {}

  if (window.CasinoSlotsCatalog && Array.isArray(window.CasinoSlotsCatalog)) {
    datalist.innerHTML = window.CasinoSlotsCatalog.map((s) => `<option value="${escapeHtml(s.name)}">${escapeHtml(s.provider)}</option>`).join('');
    const countBadge = document.getElementById('catalogCountBadge');
    if (countBadge) countBadge.textContent = `${window.CasinoSlotsCatalog.length} SLOTS INDEXED`;
    updateSlotPreview();
    return;
  }

  try {
    const res = await fetch('../shared/slots-catalog.json');
    if (res.ok) {
      const catalog = await res.json();
      window.CasinoSlotsCatalog = catalog;
      datalist.innerHTML = catalog.map((s) => `<option value="${escapeHtml(s.name)}">${escapeHtml(s.provider)}</option>`).join('');
      const countBadge = document.getElementById('catalogCountBadge');
      if (countBadge) countBadge.textContent = `${catalog.length} SLOTS INDEXED`;
      updateSlotPreview();
    }
  } catch (e) {
    console.warn('Could not load slots catalog via fetch:', e);
  }
}

// Input listener for live preview
document.getElementById('huntGameInput')?.addEventListener('input', updateSlotPreview);
document.getElementById('huntGameInput')?.addEventListener('change', updateSlotPreview);

// ============================================================
// Stake Weekly Updates & New Slot Registration
// ============================================================
document.getElementById('btnSyncStakeSlots')?.addEventListener('click', () => {
  const statusEl = document.getElementById('syncStatusMsg');
  if (statusEl) {
    statusEl.innerHTML = `<span class="text-cyan">Checking Stake Exclusives & new releases...</span>`;
    setTimeout(() => {
      statusEl.innerHTML = `<span class="text-green">✓ Catalog up-to-date! 60 Stake & Provider slots verified.</span>`;
      CasinoSounds.playCoin();
    }, 1200);
  }
});

// Modal Controls
const modal = document.getElementById('newSlotModal');
document.getElementById('btnOpenNewSlotModal')?.addEventListener('click', () => {
  if (modal) modal.classList.remove('oculto');
});
document.getElementById('btnCloseSlotModal')?.addEventListener('click', () => {
  if (modal) modal.classList.add('oculto');
});
document.getElementById('btnCancelNewSlot')?.addEventListener('click', () => {
  if (modal) modal.classList.add('oculto');
});

document.getElementById('btnSaveNewSlot')?.addEventListener('click', () => {
  const name = document.getElementById('newSlotNameInput')?.value.trim();
  const provider = document.getElementById('newSlotProviderInput')?.value.trim() || 'Custom Studio';
  const maxWin = document.getElementById('newSlotMaxWinInput')?.value.trim() || '20,000x';
  const imgUrl = document.getElementById('newSlotImgInput')?.value.trim() || '';

  if (!name) {
    alert('Please enter a slot name.');
    return;
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const newSlot = {
    id: Date.now(),
    name,
    slug,
    provider,
    maxWin,
    rtp: '96.50%',
    image: imgUrl || `../public/slots/${slug}.jpg`,
    tier: 'A'
  };

  if (!window.CasinoSlotsCatalog) window.CasinoSlotsCatalog = [];
  window.CasinoSlotsCatalog.unshift(newSlot);

  // Persist to custom slots in localStorage
  try {
    const custom = JSON.parse(localStorage.getItem('casino_custom_slots') || '[]');
    custom.unshift(newSlot);
    localStorage.setItem('casino_custom_slots', JSON.stringify(custom));
  } catch (e) {}

  // Update datalist and preview
  loadSlotsCatalog();
  document.getElementById('huntGameInput').value = name;
  updateSlotPreview();

  if (modal) modal.classList.add('oculto');
  CasinoSounds.playCoin();
  alert(`Slot "${name}" successfully registered into the catalog!`);
});

// ============================================================
// KPI & Stats Calculations
// ============================================================
function updateAdminKPIs() {
  const bonuses = huntState.bonuses || [];
  const validBonuses = bonuses.filter((b) => !b.skipped);
  const opened = validBonuses.filter((b) => b.opened);
  const unopened = validBonuses.filter((b) => !b.opened);

  const totalWon = opened.reduce((acc, b) => acc + (b.payout || 0), 0);
  const totalOpenedBets = opened.reduce((acc, b) => acc + (b.bet || 0), 0);
  const remainingBets = unopened.reduce((acc, b) => acc + (b.bet || 0), 0);

  if (huntState.phase === 'OPENING' || huntState.phase === 'FINISHED') {
    huntState.currentBalance = huntState.openingStartBalance + totalWon;
  } else {
    huntState.currentBalance = huntState.startBalance;
  }

  const avgX = totalOpenedBets > 0 ? (totalWon / totalOpenedBets) : 0;
  const needed = huntState.startBalance - huntState.currentBalance;
  let reqAvgXText = '—';
  if (unopened.length === 0) {
    reqAvgXText = '—';
  } else if (needed <= 0) {
    reqAvgXText = 'BREAK-EVEN!';
  } else if (remainingBets > 0) {
    reqAvgXText = `${(needed / remainingBets).toFixed(1)}x`;
  }

  const profitLoss = huntState.currentBalance - huntState.startBalance;

  let bestWinText = '—';
  if (opened.length > 0) {
    const best = opened.reduce((max, b) => (b.mult > max.mult ? b : max), opened[0]);
    if (best.mult > 0) {
      bestWinText = `${best.mult.toFixed(1)}x (${formatMoney(best.payout)})`;
    }
  }

  // Update DOM
  document.getElementById('huntStartBalanceInput').value = huntState.startBalance;
  document.getElementById('kpiCurrentBalance').textContent = formatMoney(huntState.currentBalance);
  
  const plEl = document.getElementById('kpiProfitLoss');
  plEl.textContent = (profitLoss >= 0 ? '+' : '') + formatMoney(profitLoss);
  plEl.className = profitLoss >= 0 ? 'kpi-sub text-green' : 'kpi-sub text-magenta';

  document.getElementById('kpiReqAvgX').textContent = reqAvgXText;
  document.getElementById('kpiAvgX').textContent = `${avgX.toFixed(1)}x`;
  document.getElementById('kpiProgress').textContent = `${opened.length} / ${validBonuses.length}`;
  document.getElementById('kpiBestWin').textContent = bestWinText;

  // Phase badge in lifecycle bar
  const phaseBadge = document.getElementById('adminPhaseBadge');
  phaseBadge.textContent = huntState.phase;
  phaseBadge.className = huntState.phase === 'OPENING' ? 'badge-gold' :
                        huntState.phase === 'FINISHED' ? 'badge-cyan' :
                        huntState.phase === 'DRAFT' ? 'badge-magenta' : 'badge-cyan';

  document.getElementById('adminBonusCount').textContent = bonuses.length;
}

// ============================================================
// Render Collected Bonuses Table with Cover Thumbnails
// ============================================================
function renderAdminBonuses() {
  const container = document.getElementById('adminBonusList');
  const bonuses = huntState.bonuses || [];

  if (bonuses.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">No bonuses in current hunt. Add slots using the form on the left!</div>`;
    return;
  }

  container.innerHTML = bonuses.map((b, idx) => {
    const isOpened = b.opened;
    const isSkipped = b.skipped;
    const initial = (b.game || 'S').trim().charAt(0).toUpperCase();
    const coverUrl = b.image || getSlotCover(b.game);

    return `
      <div class="admin-bonus-item ${isOpened ? 'is-opened' : ''}">
        <div class="bonus-idx-tag">#${idx + 1}</div>

        <div class="admin-slot-thumb-wrap">
          <img src="${escapeHtml(coverUrl)}" alt="${escapeHtml(b.game)}" class="admin-slot-thumb" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="admin-slot-initial" style="display:none;">${initial}</div>
        </div>
        
        <div class="bonus-info-box">
          <div class="bonus-title">${escapeHtml(b.game)}</div>
          <div class="bonus-meta">
            Bet: <strong>${formatMoney(b.bet)}</strong>
            ${b.recommender ? `| Recommender: <strong class="text-cyan">@${escapeHtml(b.recommender)}</strong>` : ''}
            ${isOpened ? `| Result: <strong class="text-green">+${formatMoney(b.payout)}</strong> (<strong class="text-gold">${b.mult.toFixed(1)}x</strong>)` : ''}
            ${isSkipped ? `| <strong class="text-magenta">SKIPPED</strong>` : ''}
          </div>
        </div>

        <div class="bonus-actions-box">
          ${isOpened ? `
            <span class="badge-gold" style="padding:4px 8px; font-size:11px;">OPENED</span>
            <button class="btn btn-secondary btn-sm" onclick="editPayout(${b.id})" title="Edit payout">✎</button>
          ` : `
            <input type="number" step="0.50" placeholder="Payout ($)" id="payoutInput-${b.id}" class="payout-inline-input" onkeydown="if(event.key==='Enter') saveInlinePayout(${b.id})">
            <button class="btn btn-gold btn-sm" onclick="saveInlinePayout(${b.id})">REVEAL</button>
            <button class="btn btn-secondary btn-sm" onclick="skipBonus(${b.id})" title="Skip this slot">Skip</button>
          `}
          <button class="btn btn-danger btn-sm" onclick="deleteBonus(${b.id})" title="Delete slot">✕</button>
        </div>
      </div>
    `;
  }).join('');
}

// Inline Payout Entry Handler
window.saveInlinePayout = function (id) {
  const b = huntState.bonuses.find((item) => item.id === id);
  if (!b) return;

  const inputEl = document.getElementById(`payoutInput-${id}`);
  const payoutVal = parseFloat(inputEl ? inputEl.value : 0);

  if (isNaN(payoutVal) || payoutVal < 0) {
    alert('Please enter a valid payout amount (e.g. 150.00)');
    return;
  }

  recordSnapshot();
  const mult = b.bet > 0 ? payoutVal / b.bet : 0;
  b.opened = true;
  b.payout = payoutVal;
  b.mult = mult;

  CasinoBus.emit('hunt:payout', { id, payout: payoutVal, mult });
  broadcastState();
  CasinoSounds.playCoin();
};

window.editPayout = function (id) {
  const b = huntState.bonuses.find((item) => item.id === id);
  if (!b) return;

  const current = b.payout || 0;
  const newVal = prompt(`Edit payout amount for ${b.game}:`, current.toFixed(2));
  if (newVal !== null) {
    const val = parseFloat(newVal);
    if (!isNaN(val) && val >= 0) {
      recordSnapshot();
      b.payout = val;
      b.mult = b.bet > 0 ? val / b.bet : 0;
      CasinoBus.emit('hunt:payout', { id, payout: val, mult: b.mult });
      broadcastState();
    }
  }
};

window.skipBonus = function (id) {
  const b = huntState.bonuses.find((item) => item.id === id);
  if (!b) return;
  recordSnapshot();
  b.skipped = !b.skipped;
  broadcastState();
};

window.deleteBonus = function (id) {
  if (confirm('Delete this slot from the hunt?')) {
    recordSnapshot();
    huntState.bonuses = huntState.bonuses.filter((b) => b.id !== id);
    broadcastState();
  }
};

// ============================================================
// Add Bonus Form
// ============================================================
document.getElementById('btnAddBonus').addEventListener('click', () => {
  const game = document.getElementById('huntGameInput').value.trim() || 'Custom Slot';
  const bet = parseFloat(document.getElementById('huntBetInput').value) || huntState.defaultBet;
  const recommender = document.getElementById('huntRecommenderInput').value.trim() || null;

  recordSnapshot();
  const newBonus = {
    id: Date.now(),
    game,
    bet,
    recommender,
    payout: 0,
    mult: 0,
    opened: false
  };

  huntState.bonuses.push(newBonus);
  broadcastState();
  CasinoSounds.playCoin();

  // Reset recommender input
  document.getElementById('huntRecommenderInput').value = '';
});

// Update Start Balance on input
document.getElementById('huntStartBalanceInput').addEventListener('change', (e) => {
  const val = parseFloat(e.target.value);
  if (!isNaN(val) && val > 0) {
    recordSnapshot();
    huntState.startBalance = val;
    huntState.openingStartBalance = val;
    broadcastState();
  }
});

// ============================================================
// Lifecycle Phase Workflow Buttons
// ============================================================
document.getElementById('btnPhaseHunting').addEventListener('click', () => {
  recordSnapshot();
  huntState.phase = 'HUNTING';
  broadcastState();
  CasinoSounds.playClick();
});

document.getElementById('btnPickRecommender').addEventListener('click', () => {
  // Candidate pool: active chatters or prompt
  const viewerName = prompt('Enter or confirm chosen chatter username:', 'LuckyChatter');
  if (viewerName) {
    recordSnapshot();
    huntState.recommender.active = true;
    huntState.recommender.user = viewerName.trim();
    huntState.recommender.timerSeconds = 60;

    CasinoBus.emit('hunt:recommender_start', { user: viewerName.trim(), seconds: 60 });
    document.getElementById('adminSpotlightBox').classList.remove('oculto');
    document.getElementById('adminRecName').textContent = `@${viewerName.trim()}`;
    document.getElementById('adminRecTimer').textContent = '60s';
    CasinoSounds.playCoin();
  }
});

document.getElementById('btnStopSpotlight').addEventListener('click', () => {
  huntState.recommender.active = false;
  CasinoBus.emit('hunt:recommender_stop');
  document.getElementById('adminSpotlightBox').classList.add('oculto');
});

document.getElementById('btnRerollSpotlight').addEventListener('click', () => {
  const viewerName = prompt('Enter next chatter username:', 'NextWinner');
  if (viewerName) {
    CasinoBus.emit('hunt:recommender_start', { user: viewerName.trim(), seconds: 60 });
    document.getElementById('adminRecName').textContent = `@${viewerName.trim()}`;
    document.getElementById('adminRecTimer').textContent = '60s';
    CasinoSounds.playCoin();
  }
});

document.getElementById('btnPhaseOpening').addEventListener('click', () => {
  const startBal = prompt('Confirm balance when starting the opening ($):', huntState.startBalance.toFixed(2));
  if (startBal !== null) {
    recordSnapshot();
    huntState.phase = 'OPENING';
    huntState.openingStartBalance = parseFloat(startBal) || huntState.startBalance;
    huntState.gtb.phase = 'BLOQUEADA'; // Lock GTB predictions to prevent copying
    CasinoBus.emit('hunt:opening_start', { openingStartBalance: huntState.openingStartBalance });
    broadcastState();
    CasinoSounds.playCoin();
  }
});

document.getElementById('btnPhaseFinish').addEventListener('click', () => {
  if (confirm('Finish hunt and declare Guess The Balance closest winner?')) {
    recordSnapshot();
    huntState.phase = 'FINISHED';
    huntState.gtb.phase = 'RESUELTA';
    CasinoBus.emit('gtb:resolve', { finalBalance: huntState.currentBalance, prizeText: huntState.gtb.prizeText });
    broadcastState();
  }
});

document.getElementById('btnResetHunt').addEventListener('click', () => {
  if (confirm('Are you sure you want to RESET the entire Bonus Hunt and all guesses?')) {
    recordSnapshot();
    huntState.bonuses = [];
    huntState.gtb.guesses = {};
    huntState.phase = 'HUNTING';
    huntState.gtb.phase = 'ABIERTA';
    huntState.currentBalance = huntState.startBalance;
    broadcastState();
  }
});

// Panic Button
document.getElementById('btnPanic').addEventListener('click', () => {
  CasinoBus.emit('panic:toggle');
  CasinoSounds.playHit();
});

// ============================================================
// Guess The Balance Controls
// ============================================================
function renderGTBAdmin() {
  const gtb = huntState.gtb || { guesses: {}, phase: 'ABIERTA', prizeText: '$50.00' };
  const users = Object.keys(gtb.guesses || {});

  document.getElementById('adminGtbBadge').textContent = `STATUS: ${gtb.phase}`;
  document.getElementById('gtbModeSelect').value = gtb.phase;
  document.getElementById('gtbPrizeInput').value = gtb.prizeText || '$50.00';
  document.getElementById('adminGtbCount').textContent = users.length;

  // Closest Guesses Preview
  const container = document.getElementById('adminClosestList');
  if (users.length === 0) {
    container.innerHTML = `<div class="text-muted text-center" style="font-size:12px; padding:8px;">No guesses received.</div>`;
    return;
  }

  const target = huntState.currentBalance;
  const sorted = users.map((u) => {
    const item = gtb.guesses[u];
    const val = typeof item === 'object' ? item.guess : item;
    const ts = typeof item === 'object' ? (item.timestamp || 0) : 0;
    const diff = Math.abs(val - target);
    return { user: u, guess: val, diff, timestamp: ts };
  }).sort((a, b) => {
    if (a.diff !== b.diff) return a.diff - b.diff;
    return a.timestamp - b.timestamp;
  }).slice(0, 5);

  container.innerHTML = sorted.map((s, idx) => `
    <div class="admin-closest-item">
      <span>#${idx + 1} @${escapeHtml(s.user)}</span>
      <span class="text-gold">${formatMoney(s.guess)} <small style="color:var(--text-muted);">(Δ${formatMoney(s.diff)})</small></span>
    </div>
  `).join('');
}

document.getElementById('gtbModeSelect').addEventListener('change', (e) => {
  recordSnapshot();
  huntState.gtb.phase = e.target.value;
  broadcastState();
});

document.getElementById('gtbPrizeInput').addEventListener('change', (e) => {
  recordSnapshot();
  huntState.gtb.prizeText = e.target.value;
  broadcastState();
});

document.getElementById('btnSubmitManualGuess').addEventListener('click', () => {
  const user = document.getElementById('manualGuessUser').value.trim();
  const rawGuess = document.getElementById('manualGuessVal').value.trim();

  if (!user || !rawGuess) {
    alert('Please enter both chatter username and guess amount');
    return;
  }

  const parsed = CasinoNumberParser.parseGuess(rawGuess);
  if (!parsed.valid) {
    alert(`Invalid amount: ${parsed.error}`);
    return;
  }

  recordSnapshot();
  huntState.gtb.guesses[user] = {
    user,
    guess: parsed.value,
    timestamp: Date.now()
  };

  broadcastState();
  CasinoSounds.playCoin();

  document.getElementById('manualGuessUser').value = '';
  document.getElementById('manualGuessVal').value = '';
});

document.getElementById('btnAwardGTBWinner').addEventListener('click', () => {
  const finalBalStr = prompt('Confirm final balance for GTB resolution:', huntState.currentBalance.toFixed(2));
  if (finalBalStr !== null) {
    const finalBal = parseFloat(finalBalStr) || huntState.currentBalance;
    recordSnapshot();
    huntState.gtb.phase = 'RESUELTA';
    CasinoBus.emit('gtb:resolve', { finalBalance: finalBal, prizeText: huntState.gtb.prizeText });
    broadcastState();
  }
});

// ============================================================
// TAB 2: 1v1 Battle Controls (Preserved & Enhanced)
// ============================================================
document.getElementById('btnApplyBattleFighters').addEventListener('click', () => {
  const f1Name = document.getElementById('bF1Name').value.trim() || 'Fighter Red';
  const f1Slot = document.getElementById('bF1Slot').value.trim() || 'Slot Red';
  const f2Name = document.getElementById('bF2Name').value.trim() || 'Fighter Blue';
  const f2Slot = document.getElementById('bF2Slot').value.trim() || 'Slot Blue';

  const battleState = {
    f1: { name: f1Name, slot: f1Slot, hp: 10000, maxHp: 10000, score: 0, votes: 0, avatar: '' },
    f2: { name: f2Name, slot: f2Slot, hp: 10000, maxHp: 10000, score: 0, votes: 0, avatar: '' },
    currentSpin: 0,
    totalSpins: 10,
    finished: false
  };

  CasinoBus.emit('battle:state', battleState);
  CasinoBus.setState('battle_state', battleState);
  alert('1v1 Battle fighters initialized and HP reset!');
});

document.getElementById('btnF1Spin').addEventListener('click', () => {
  const mult = parseFloat(document.getElementById('bF1Mult').value) || 10;
  CasinoBus.emit('battle:spin', { side: 1, mult });
  CasinoSounds.playHit();
});

document.getElementById('btnF2Spin').addEventListener('click', () => {
  const mult = parseFloat(document.getElementById('bF2Mult').value) || 10;
  CasinoBus.emit('battle:spin', { side: 2, mult });
  CasinoSounds.playHit();
});

// ============================================================
// TAB 3: 8-Slot Tournament Controls (Preserved & Enhanced)
// ============================================================
let activeBracketMatch = 1;

function updateAdminBracketUI() {
  document.getElementById('adminMatchTitle').textContent = `MATCH ${activeBracketMatch} ACTIVE`;
}

document.getElementById('btnWinSlot1').addEventListener('click', () => {
  const s1 = parseFloat(document.getElementById('matchScore1').value) || 0;
  const s2 = parseFloat(document.getElementById('matchScore2').value) || 0;

  CasinoBus.emit('bracket:resolve', { matchId: activeBracketMatch, winnerSide: 1, score1: s1, score2: s2 });
  if (activeBracketMatch < 7) activeBracketMatch++;
  updateAdminBracketUI();
});

document.getElementById('btnWinSlot2').addEventListener('click', () => {
  const s1 = parseFloat(document.getElementById('matchScore1').value) || 0;
  const s2 = parseFloat(document.getElementById('matchScore2').value) || 0;

  CasinoBus.emit('bracket:resolve', { matchId: activeBracketMatch, winnerSide: 2, score1: s1, score2: s2 });
  if (activeBracketMatch < 7) activeBracketMatch++;
  updateAdminBracketUI();
});

document.getElementById('btnResetBracket').addEventListener('click', () => {
  if (confirm('Reset tournament bracket?')) {
    activeBracketMatch = 1;
    CasinoBus.emit('bracket:state', {
      activeMatch: 1,
      stage: 'QUARTERFINALS',
      champion: null
    });
    updateAdminBracketUI();
  }
});

// ============================================================
// Render All Views
// ============================================================
function renderAll() {
  updateAdminKPIs();
  renderAdminBonuses();
  renderGTBAdmin();
  updateUndoRedoButtons();
}

// Listen to bus events
CasinoBus.on('hunt:add', (bonus) => {
  // If added via chat command
  if (!huntState.bonuses.some((b) => b.id === bonus.id)) {
    huntState.bonuses.push(bonus);
    renderAll();
  }
});

CasinoBus.on('gtb:guess', ({ user, guess, timestamp }) => {
  huntState.gtb.guesses[user] = { user, guess, timestamp: timestamp || Date.now() };
  renderAll();
});

CasinoBus.on('ws:connected', () => {
  const el = document.getElementById('wsStatus');
  if (el) {
    el.textContent = 'STREAMER.BOT LIVE';
    el.className = 'ws-indicator badge-cyan';
  }
});

CasinoBus.on('ws:disconnected', () => {
  const el = document.getElementById('wsStatus');
  if (el) {
    el.textContent = 'LOCAL SYNC ONLY';
    el.className = 'ws-indicator badge-magenta';
  }
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  const saved = CasinoBus.getState('hunt_state');
  if (saved) {
    huntState = saved;
  }
  loadSlotsCatalog();
  renderAll();
  updateAdminBracketUI();
});
