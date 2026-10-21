/**
 * HuntHub — Live 8-Bracket Tournament & Interactive Viewer Prediction Engine
 * Features:
 * 1. Interactive 8-Bracket Pick Tree (Quarterfinals, Semifinals, Grand Final)
 * 2. Live Standings Scoreboard & Transparency Podium (#1 Winner with highest correct hits)
 * 3. Dynamic real-time calculation and sync with stream outcomes
 * 
 * 100% English, vector slot cards, zero external dependencies.
 */

const PEPE_EZ_URL = '/site/images/emotes/pepe-ez.jpg';
const PEPE_EZ_FALLBACK = '/site/images/emotes/pepe-ez.jpg';
const PEPE_SAD_URL = '/site/images/emotes/pepe-sad.png';
const PEPE_SAD_FALLBACK = '/site/images/emotes/pepe-sad.png';
const PEPE_CHAMP_URL = '/site/images/emotes/pepe-champ.png';
const PEPE_CHAMP_FALLBACK = '/site/images/emotes/pepe-champ.png';

class TournamentPredictionController {
  constructor() {
    this.predictionsClosed = localStorage.getItem('hunthub_tourney_preds_closed') === 'true';
    this.isActive = true;

    this.defaultSlots = [
      { id: 'seed_1', username: '', displayName: 'TBD', slotName: 'Awaiting Spectator', name: 'Awaiting Spectator', provider: 'Kick !tourney', img: 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format', isTbd: true },
      { id: 'seed_2', username: '', displayName: 'TBD', slotName: 'Awaiting Spectator', name: 'Awaiting Spectator', provider: 'Kick !tourney', img: 'https://mediumrare.imgix.net/fdf333e96a5e21555bbb4e9e04a3ee4e1986c9cca9aa75141597041cc8334d23?w=360&auto=format', isTbd: true },
      { id: 'seed_3', username: '', displayName: 'TBD', slotName: 'Awaiting Spectator', name: 'Awaiting Spectator', provider: 'Kick !tourney', img: 'https://mediumrare.imgix.net/8ade942d35d2cdbddf7888f303be4cf4bda8c650a112b3c53f7c6f3ccad81254?w=360&auto=format', isTbd: true },
      { id: 'seed_4', username: '', displayName: 'TBD', slotName: 'Awaiting Spectator', name: 'Awaiting Spectator', provider: 'Kick !tourney', img: 'https://mediumrare.imgix.net/ca243d6c3db42259d6859b80717eb378eb64e41a9d1b1f7fdeadde68d59d9ad5?w=360&auto=format', isTbd: true },
      { id: 'seed_5', username: '', displayName: 'TBD', slotName: 'Awaiting Spectator', name: 'Awaiting Spectator', provider: 'Kick !tourney', img: 'https://mediumrare.imgix.net/73754d4bf421b78fbd3895bbc7890d379797588cb699d6cbe47f3656aa93613b?w=360&auto=format', isTbd: true },
      { id: 'seed_6', username: '', displayName: 'TBD', slotName: 'Awaiting Spectator', name: 'Awaiting Spectator', provider: 'Kick !tourney', img: 'https://mediumrare.imgix.net/742a1d7958a9ffa215e19cc72c684abe9412f71fcf426b57909b5b817f9cd9d4?w=360&auto=format', isTbd: true },
      { id: 'seed_7', username: '', displayName: 'TBD', slotName: 'Awaiting Spectator', name: 'Awaiting Spectator', provider: 'Kick !tourney', img: 'https://mediumrare.imgix.net/40f3f2cfeadebaa5169a9636218f289a34209bd6e91d44de733ecdf69b4b93fe?w=360&auto=format', isTbd: true },
      { id: 'seed_8', username: '', displayName: 'TBD', slotName: 'Awaiting Spectator', name: 'Awaiting Spectator', provider: 'Kick !tourney', img: 'https://mediumrare.imgix.net/14d5410c6cf4c303d291262a10e949dc14b0ac2eca2a7a730b0401919c01358e?w=360&auto=format', isTbd: true }
    ];
    this.slots = [...this.defaultSlots];
    this.entryById = new Map();
    this.liveTourneyState = null;

    this.predictions = {
      semi1_a: null,
      semi1_b: null,
      semi2_a: null,
      semi2_b: null,
      final_a: null,
      final_b: null,
      champion: null
    };

    this.isLocked = localStorage.getItem('hunthub_tourney_pred_locked') === 'true';
    this.activeView = 'bracket'; // 'bracket' or 'standings'

    // Community participants for live transparency scoreboard
    this.communityStandings = [];
  }

  init() {
    if (this._initialized) return;
    this._initialized = true;
    this.loadSavedPrediction();
    this.loadLiveTourneyState();
    this.initViewTabs();
    this.renderBracket();
    this.renderStandings();
    this.renderKoth();
    this.bindSubmitButton();
    this.bindKothActions();
    this.listenToEvents();
  }

  resolvePlayerEntry(rawPlayer, seedIndex) {
    const seedId = `seed_${seedIndex}`;
    const fallback = this.defaultSlots[seedIndex - 1] || this.defaultSlots[0];
    if (!rawPlayer || typeof rawPlayer !== 'object') {
      return {
        id: seedId,
        seed: seedIndex,
        username: '',
        displayName: 'TBD',
        slotName: 'Awaiting Spectator',
        name: 'Awaiting Spectator',
        provider: 'Kick !tourney',
        img: fallback.img,
        isTbd: true
      };
    }
    const rawUser = String(rawPlayer.username || rawPlayer.displayName || rawPlayer.name || '').trim().replace(/^@/, '');
    const rawSlot = String(rawPlayer.slotName || rawPlayer.slot || '').trim();
    const isDemoSeed = /^seed[1-8]$/i.test(rawUser) || /^tbd$/i.test(rawUser) || /^awaiting/i.test(rawUser);
    if ((!rawUser && !rawSlot) || isDemoSeed) {
      return {
        id: seedId,
        seed: seedIndex,
        username: '',
        displayName: 'TBD',
        slotName: 'Awaiting Spectator',
        name: 'Awaiting Spectator',
        provider: 'Kick !tourney',
        img: fallback.img,
        isTbd: true
      };
    }

    let resolvedSlot = { name: rawSlot || fallback.slotName, provider: rawPlayer.slotProvider || 'Casino', image: rawPlayer.slotImage || fallback.img };
    if (window.SlotResolver) {
      if (typeof window.SlotResolver.smartSearch === 'function' && rawSlot) {
        const found = window.SlotResolver.smartSearch(rawSlot, 1);
        if (Array.isArray(found) && found.length > 0) resolvedSlot = found[0];
      }
      if ((!resolvedSlot || !resolvedSlot.image) && typeof window.SlotResolver.resolve === 'function') {
        resolvedSlot = window.SlotResolver.resolve(rawSlot || fallback.slotName);
      }
    }

    const cleanUser = rawUser ? `@${rawUser}` : `@Seed${seedIndex}`;
    const slotTitle = resolvedSlot?.name || rawSlot || fallback.slotName;
    const entryId = `${cleanUser.toLowerCase()}__${slotTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

    return {
      id: entryId,
      seed: seedIndex,
      username: cleanUser,
      displayName: rawUser || `Seed ${seedIndex}`,
      slotName: slotTitle,
      name: slotTitle,
      provider: resolvedSlot?.provider || rawPlayer.slotProvider || 'Casino',
      img: rawPlayer.slotImage || resolvedSlot?.image || fallback.img,
      isTbd: false
    };
  }

  normalizeTourneyStateObject(raw) {
    if (!raw || typeof raw !== 'object') return null;
    const state = { ...raw };
    const matchIds = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'];
    const normalizedMatches = {};

    if (Array.isArray(state.matches)) {
      matchIds.forEach((id, idx) => {
        const found = state.matches.find(m => m && m.id === id) || {
          id,
          round: idx < 4 ? 1 : (idx < 6 ? 2 : 3),
          player1: null,
          player2: null,
          score1: 0,
          score2: 0,
          winner: null,
          status: 'PENDING'
        };
        normalizedMatches[id] = {
          ...found,
          player1: found.player1 || found.playerA || null,
          player2: found.player2 || found.playerB || null,
          score1: found.score1 ?? found.playerA?.mult ?? 0,
          score2: found.score2 ?? found.playerB?.mult ?? 0
        };
      });
    } else if (state.matches && typeof state.matches === 'object') {
      matchIds.forEach((id, idx) => {
        const found = state.matches[id] || {
          id,
          round: idx < 4 ? 1 : (idx < 6 ? 2 : 3),
          player1: null,
          player2: null,
          score1: 0,
          score2: 0,
          winner: null,
          status: 'PENDING'
        };
        normalizedMatches[id] = {
          ...found,
          player1: found.player1 || found.playerA || null,
          player2: found.player2 || found.playerB || null,
          score1: found.score1 ?? found.playerA?.mult ?? 0,
          score2: found.score2 ?? found.playerB?.mult ?? 0
        };
      });
    } else {
      return null;
    }

    state.matches = normalizedMatches;
    return state;
  }

  loadLiveTourneyState(externalState = null) {
    let parsed = externalState;
    if (!parsed) {
      try {
        const raw = localStorage.getItem('hunthub_tourney_state');
        if (raw) parsed = JSON.parse(raw);
      } catch (_) {}
    }

    const state = this.normalizeTourneyStateObject(parsed);
    if (!state) {
      this.predictionsClosed = localStorage.getItem('hunthub_tourney_preds_closed') === 'true';
      this.isActive = true;
      this.entryById.clear();
      this.slots = this.defaultSlots.map((slot, idx) => {
        const entry = {
          id: slot.id,
          seed: idx + 1,
          username: '',
          displayName: 'TBD',
          slotName: 'Awaiting Spectator',
          name: 'Awaiting Spectator',
          provider: 'Kick !tourney',
          img: slot.img,
          isTbd: true
        };
        this.entryById.set(entry.id, entry);
        return entry;
      });
      return;
    }

    if (typeof state.predictionsClosed === 'boolean') {
      this.predictionsClosed = state.predictionsClosed;
      try {
        localStorage.setItem('hunthub_tourney_preds_closed', this.predictionsClosed ? 'true' : 'false');
      } catch (_) {}
    } else {
      this.predictionsClosed = localStorage.getItem('hunthub_tourney_preds_closed') === 'true';
    }

    this.liveTourneyState = state;
    const seedPairs = [
      { mId: 'm1', side: 'player1', seed: 1 },
      { mId: 'm1', side: 'player2', seed: 2 },
      { mId: 'm2', side: 'player1', seed: 3 },
      { mId: 'm2', side: 'player2', seed: 4 },
      { mId: 'm3', side: 'player1', seed: 5 },
      { mId: 'm3', side: 'player2', seed: 6 },
      { mId: 'm4', side: 'player1', seed: 7 },
      { mId: 'm4', side: 'player2', seed: 8 }
    ];

    this.entryById.clear();
    let filledPlayers = 0;
    const nextSlots = seedPairs.map(({ mId, side, seed }) => {
      const rawP = state.matches[mId]?.[side] || null;
      const entry = this.resolvePlayerEntry(rawP, seed);
      if (!entry.isTbd) filledPlayers++;
      this.entryById.set(entry.id, entry);
      return entry;
    });

    // Also index any players already in m5, m6, m7 or champion
    ['m5', 'm6', 'm7'].forEach((mId, idx) => {
      const m = state.matches[mId];
      if (!m) return;
      ['player1', 'player2'].forEach((side, sIdx) => {
        if (m[side] && (m[side].username || m[side].slotName)) {
          const e = this.resolvePlayerEntry(m[side], 10 + idx * 2 + sIdx);
          if (!this.entryById.has(e.id)) this.entryById.set(e.id, e);
        }
      });
    });

    this.slots = nextSlots;
    this.isActive = true;

    // Check if tournament roster changed so stale predictions from an old tournament are cleared
    const validIds = new Set(this.slots.filter(s => !s.isTbd).map(s => s.id));
    const rosterKey = this.slots.map(s => s.id).join('|');
    const prevRosterKey = localStorage.getItem('hunthub_tourney_roster_key') || '';

    const hasInvalidPrediction = Object.values(this.predictions).some(val => val && !validIds.has(val));
    if ((filledPlayers > 0 && prevRosterKey && prevRosterKey !== rosterKey && hasInvalidPrediction) || (filledPlayers > 0 && hasInvalidPrediction)) {
      this.predictions = {
        semi1_a: null,
        semi1_b: null,
        semi2_a: null,
        semi2_b: null,
        final_a: null,
        final_b: null,
        champion: null
      };
      this.isLocked = false;
      try {
        localStorage.removeItem('hunthub_tourney_pred');
        localStorage.setItem('hunthub_tourney_pred_locked', 'false');
      } catch (_) {}
    }
    if (filledPlayers > 0) {
      try {
        localStorage.setItem('hunthub_tourney_roster_key', rosterKey);
      } catch (_) {}
    }
  }

  syncWithTourneyState(state) {
    this.loadLiveTourneyState(state);
    this.renderBracket();
    if (this.activeView === 'standings') {
      this.renderStandings();
    }
  }

  loadSavedPrediction() {
    const saved = localStorage.getItem('hunthub_tourney_pred');
    if (saved) {
      try {
        this.predictions = JSON.parse(saved);
      } catch (e) {}
    }
  }

  savePrediction() {
    localStorage.setItem('hunthub_tourney_pred', JSON.stringify(this.predictions));
  }

  initViewTabs() {
    const tabBracket = document.getElementById('tab-tourney-bracket');
    const tabStandings = document.getElementById('tab-tourney-standings');
    const panelBracket = document.getElementById('tourney-bracket-panel');
    const panelStandings = document.getElementById('tourney-standings-panel');

    const switchTab = (activeTab, activePanel, viewName) => {
      this.activeView = viewName;
      [tabBracket, tabStandings].forEach(t => t?.classList.remove('active'));
      [panelBracket, panelStandings].forEach(p => { if (p) p.style.display = 'none'; });

      activeTab?.classList.add('active');
      if (activePanel) activePanel.style.display = 'block';
      if (window.soundEngine && typeof window.soundEngine.playChip === 'function') window.soundEngine.playChip();
    };

    if (tabBracket) {
      tabBracket.addEventListener('click', () => switchTab(tabBracket, panelBracket, 'bracket'));
    }

    if (tabStandings) {
      tabStandings.addEventListener('click', () => {
        switchTab(tabStandings, panelStandings, 'standings');
        this.renderStandings();
      });
    }
  }

  findEntryByRawPlayer(rawPlayer) {
    if (!rawPlayer) return null;
    const rawU = String(rawPlayer.username || rawPlayer.displayName || '').trim().toLowerCase().replace(/^@/, '');
    const rawS = String(rawPlayer.slotName || rawPlayer.slot || '').trim().toLowerCase();
    for (const entry of this.slots) {
      if (entry.isTbd) continue;
      const eU = String(entry.username || '').trim().toLowerCase().replace(/^@/, '');
      const eS = String(entry.slotName || '').trim().toLowerCase();
      if (rawU && eU === rawU) return entry;
      if (rawS && eS === rawS) return entry;
    }
    return this.resolvePlayerEntry(rawPlayer, 99);
  }

  isEntryLiveMatchWinner(matchId, entry) {
    if (!entry || entry.isTbd || !this.liveTourneyState?.matches?.[matchId]) return false;
    const m = this.liveTourneyState.matches[matchId];
    if (!m.winner) return false;
    const wName = typeof m.winner === 'string'
      ? m.winner
      : (m.winner.username || m.winner.displayName || '');
    const cleanW = String(wName).trim().toLowerCase().replace(/^@/, '');
    const cleanE = String(entry.username || '').trim().toLowerCase().replace(/^@/, '');
    return Boolean(cleanW && cleanE && cleanW === cleanE);
  }

  getLiveMatchScoreLabel(matchId, sideIndex) {
    const m = this.liveTourneyState?.matches?.[matchId];
    if (!m) return '';
    const rawScore = sideIndex === 1 ? m.score1 : m.score2;
    if (rawScore === 'WIN' || rawScore === 'LOSE') return rawScore;
    const num = Number(rawScore);
    if (Number.isFinite(num) && num > 0) return `${num.toFixed(1)}x`;
    return '';
  }

  renderPepeReactionHtml(reactionType) {
    if (reactionType === 'champ') {
      return `
        <span class="pepe-reaction-badge champ" title="Grand Champion Pick!">
          <img class="pepe-reaction-img" src="${PEPE_CHAMP_URL}" data-fallback-src="${PEPE_CHAMP_FALLBACK}" alt="Champ Pepe">
          <span>👑 CHAMP</span>
        </span>
      `;
    }
    if (reactionType === 'ez') {
      return `
        <span class="pepe-reaction-badge ez" title="Predicted Winner — FLEX EZ!">
          <img class="pepe-reaction-img" src="${PEPE_EZ_URL}" data-fallback-src="${PEPE_EZ_FALLBACK}" alt="Pepe EZ">
          <span>FLEX EZ</span>
        </span>
      `;
    }
    if (reactionType === 'sad') {
      return `
        <span class="pepe-reaction-badge sad" title="Predicted Loser — Sadge">
          <img class="pepe-reaction-img" src="${PEPE_SAD_URL}" data-fallback-src="${PEPE_SAD_FALLBACK}" alt="Sad Pepe">
          <span>SADGE</span>
        </span>
      `;
    }
    return '';
  }

  renderCompetitorItem(entry, opponentEntry, targetKey, matchId, sideIndex, placeholderLabel) {
    const esc = this.escapeHTML.bind(this);
    const pickedId = this.predictions[targetKey];

    if (!entry || entry.isTbd) {
      return `
        <div class="match-slot-item" style="cursor: default; opacity: 0.68;" data-slot-id="" data-target="${esc(targetKey)}">
          <div class="slot-mini-thumb-empty">?</div>
          <div class="slot-mini-meta">
            <span class="slot-mini-user" style="color: var(--text-dim);">${esc(placeholderLabel)}</span>
            <span class="slot-mini-title" style="color: #64748b;">Awaiting Qualifier</span>
          </div>
        </div>
      `;
    }

    const isSelected = Boolean(pickedId && pickedId === entry.id);
    const isLoser = Boolean(pickedId && opponentEntry && !opponentEntry.isTbd && pickedId === opponentEntry.id && pickedId !== entry.id);
    const isChampTarget = targetKey === 'champion';
    const isLiveWin = this.isEntryLiveMatchWinner(matchId, entry);
    const scoreText = this.getLiveMatchScoreLabel(matchId, sideIndex);

    let reactionType = '';
    if (isSelected) {
      reactionType = isChampTarget ? 'champ' : 'ez';
    } else if (isLoser) {
      reactionType = 'sad';
    }

    const rowClasses = [
      'match-slot-item',
      isSelected ? (isChampTarget ? 'champion-selected' : 'selected') : '',
      isLoser ? 'loser-unpicked' : '',
      isLiveWin ? 'live-winner-row' : ''
    ].filter(Boolean).join(' ');

    return `
      <div class="${rowClasses}" data-slot-id="${esc(entry.id)}" data-target="${esc(targetKey)}" data-match-id="${esc(matchId)}">
        <img class="slot-mini-thumb" src="${esc(entry.img)}" data-fallback-src="/site/images/slots/wanted-dead-or-a-wild.svg" alt="${esc(entry.slotName)}" loading="lazy" decoding="async" style="width: 38px; height: 46px; border-radius: 7px; object-fit: cover; flex-shrink: 0;">
        <div class="slot-mini-meta">
          <div class="slot-mini-user">
            <span style="color: ${isSelected ? '#53fc18' : '#ffffff'};">${esc(entry.username)}</span>
            ${isLiveWin ? `<span style="font-size: 9px; padding: 1px 5px; border-radius: 4px; background: rgba(83,252,24,0.18); border: 1px solid #53fc18; color: #53fc18; font-weight: 900;">✓ LIVE WIN</span>` : ''}
            ${scoreText ? `<span style="font-size: 9.5px; color: var(--cyan); font-weight: 800;">${esc(scoreText)}</span>` : ''}
          </div>
          <div class="slot-mini-title">${esc(entry.slotName)}</div>
        </div>
        ${this.renderPepeReactionHtml(reactionType)}
      </div>
    `;
  }

  renderBracket() {
    const container = document.getElementById('tourney-interactive-bracket');
    if (!container) return;

    this.loadLiveTourneyState(this.liveTourneyState);

    // EMPTY STATE IF NO ACTIVE TOURNAMENT
    if (!this.isActive) {
      container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 9px 16px; margin-bottom: 14px; background: rgba(0, 0, 0, 0.35); border: 1px dashed rgba(255, 215, 0, 0.3); border-radius: 10px;">
          <span style="font-size: 18px;">🏆</span>
          <strong style="font-family: var(--font-display); font-size: 13.5px; color: var(--gold); letter-spacing: 1px;">NO ACTIVE TOURNAMENT IN PROGRESS</strong>
        </div>
        <div class="bracket-viewer-grid">
          <div class="bracket-round-col">
            <div class="bracket-col-header">QUARTERFINALS</div>
            ${[1, 2, 3, 4].map(num => `
              <div class="bracket-match-card">
                <div class="match-slot-item" style="cursor: default; opacity: 0.7;">
                  <div class="slot-mini-thumb-empty">?</div>
                  <span class="slot-mini-title" style="color: var(--text-dim);">TBD Slot Matchup ${num}A</span>
                </div>
                <div class="match-vs-divider">VS</div>
                <div class="match-slot-item" style="cursor: default; opacity: 0.7;">
                  <div class="slot-mini-thumb-empty">?</div>
                  <span class="slot-mini-title" style="color: var(--text-dim);">TBD Slot Matchup ${num}B</span>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="bracket-round-col">
            <div class="bracket-col-header">SEMIFINALS</div>
            <div class="bracket-match-card semi-card">
              <div class="match-slot-item" style="cursor: default; opacity: 0.7;">
                <div class="slot-mini-thumb-empty">?</div>
                <span class="slot-mini-title" style="color: var(--text-dim);">TBD Semifinal 1</span>
              </div>
              <div class="match-vs-divider">VS</div>
              <div class="match-slot-item" style="cursor: default; opacity: 0.7;">
                <div class="slot-mini-thumb-empty">?</div>
                <span class="slot-mini-title" style="color: var(--text-dim);">TBD Semifinal 1</span>
              </div>
            </div>
            <div class="bracket-match-card semi-card">
              <div class="match-slot-item" style="cursor: default; opacity: 0.7;">
                <div class="slot-mini-thumb-empty">?</div>
                <span class="slot-mini-title" style="color: var(--text-dim);">TBD Semifinal 2</span>
              </div>
              <div class="match-vs-divider">VS</div>
              <div class="match-slot-item" style="cursor: default; opacity: 0.7;">
                <div class="slot-mini-thumb-empty">?</div>
                <span class="slot-mini-title" style="color: var(--text-dim);">TBD Semifinal 2</span>
              </div>
            </div>
          </div>
          <div class="bracket-round-col">
            <div class="bracket-col-header">GRAND FINAL</div>
            <div class="bracket-match-card final-card">
              <div class="match-slot-item" style="cursor: default; opacity: 0.7;">
                <div class="slot-mini-thumb-empty">🏆</div>
                <span class="slot-mini-title" style="color: var(--text-dim);">TBD Grand Finalist 1</span>
              </div>
              <div class="match-vs-divider">👑</div>
              <div class="match-slot-item" style="cursor: default; opacity: 0.7;">
                <div class="slot-mini-thumb-empty">🏆</div>
                <span class="slot-mini-title" style="color: var(--text-dim);">TBD Grand Finalist 2</span>
              </div>
            </div>
          </div>
        </div>
      `;

      const statusEl = document.getElementById('tourney-pred-status');
      if (statusEl) {
        statusEl.textContent = 'STANDBY — WAITING FOR STREAMER LAUNCH';
        statusEl.style.color = 'var(--text-dim)';
      }
      const lockBtn = document.getElementById('btn-lock-tourney-pred');
      if (lockBtn) {
        lockBtn.disabled = true;
        lockBtn.textContent = 'Awaiting Active Tournament ⏳';
      }
      return;
    }

    const s = this.slots;
    const m = this.liveTourneyState?.matches || {};

    // Resolve Semifinal contenders (Viewer's pick first, or real advancing tournament player if viewer hasn't picked yet)
    const sf1A = this.getEntry(this.predictions.semi1_a) || this.findEntryByRawPlayer(m.m5?.player1);
    const sf1B = this.getEntry(this.predictions.semi1_b) || this.findEntryByRawPlayer(m.m5?.player2);
    const sf2A = this.getEntry(this.predictions.semi2_a) || this.findEntryByRawPlayer(m.m6?.player1);
    const sf2B = this.getEntry(this.predictions.semi2_b) || this.findEntryByRawPlayer(m.m6?.player2);

    // Resolve Grand Final contenders
    const gfA = this.getEntry(this.predictions.final_a) || this.findEntryByRawPlayer(m.m7?.player1);
    const gfB = this.getEntry(this.predictions.final_b) || this.findEntryByRawPlayer(m.m7?.player2);

    // Resolve Predicted Champion & Live Official Champion
    const predictedChamp = this.getEntry(this.predictions.champion);
    const liveChamp = this.liveTourneyState?.champion ? this.findEntryByRawPlayer(this.liveTourneyState.champion) : null;
    const esc = this.escapeHTML.bind(this);

    const closedBannerHtml = this.predictionsClosed
      ? `<div id="tourney-pred-closed-banner" style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 10px 16px; margin-bottom: 14px; background: rgba(239, 68, 68, 0.14); border: 1px solid rgba(239, 68, 68, 0.55); border-radius: 10px;">
          <span style="font-size: 16px;">🔒</span>
          <strong style="font-family: var(--font-display); font-size: 13px; color: #f87171; letter-spacing: 0.8px;">PREDICTIONS CLOSED — STREAMER HAS LOCKED BRACKET ENTRIES</strong>
        </div>`
      : '';

    container.innerHTML = `
      ${closedBannerHtml}
      <div class="bracket-viewer-grid" style="${this.predictionsClosed && !this.isLocked ? 'opacity: 0.78;' : ''}">
        <!-- QUARTERFINALS -->
        <div class="bracket-round-col">
          <div class="bracket-col-header">QUARTERFINALS</div>
          
          <div class="bracket-match-card" data-match="qf1">
            ${this.renderCompetitorItem(s[0], s[1], 'semi1_a', 'm1', 1, 'Seed #1')}
            <div class="match-vs-divider">VS</div>
            ${this.renderCompetitorItem(s[1], s[0], 'semi1_a', 'm1', 2, 'Seed #2')}
          </div>

          <div class="bracket-match-card" data-match="qf2">
            ${this.renderCompetitorItem(s[2], s[3], 'semi1_b', 'm2', 1, 'Seed #3')}
            <div class="match-vs-divider">VS</div>
            ${this.renderCompetitorItem(s[3], s[2], 'semi1_b', 'm2', 2, 'Seed #4')}
          </div>

          <div class="bracket-match-card" data-match="qf3">
            ${this.renderCompetitorItem(s[4], s[5], 'semi2_a', 'm3', 1, 'Seed #5')}
            <div class="match-vs-divider">VS</div>
            ${this.renderCompetitorItem(s[5], s[4], 'semi2_a', 'm3', 2, 'Seed #6')}
          </div>

          <div class="bracket-match-card" data-match="qf4">
            ${this.renderCompetitorItem(s[6], s[7], 'semi2_b', 'm4', 1, 'Seed #7')}
            <div class="match-vs-divider">VS</div>
            ${this.renderCompetitorItem(s[7], s[6], 'semi2_b', 'm4', 2, 'Seed #8')}
          </div>
        </div>

        <!-- SEMIFINALS -->
        <div class="bracket-round-col">
          <div class="bracket-col-header">SEMIFINALS</div>

          <div class="bracket-match-card semi-card" data-match="sf1">
            ${this.renderCompetitorItem(sf1A, sf1B, 'final_a', 'm5', 1, 'QF1 Winner Pick')}
            <div class="match-vs-divider">VS</div>
            ${this.renderCompetitorItem(sf1B, sf1A, 'final_a', 'm5', 2, 'QF2 Winner Pick')}
          </div>

          <div class="bracket-match-card semi-card" data-match="sf2">
            ${this.renderCompetitorItem(sf2A, sf2B, 'final_b', 'm6', 1, 'QF3 Winner Pick')}
            <div class="match-vs-divider">VS</div>
            ${this.renderCompetitorItem(sf2B, sf2A, 'final_b', 'm6', 2, 'QF4 Winner Pick')}
          </div>
        </div>

        <!-- GRAND FINAL -->
        <div class="bracket-round-col">
          <div class="bracket-col-header">GRAND FINAL 🏆</div>

          <div class="bracket-match-card final-card" data-match="gf">
            ${this.renderCompetitorItem(gfA, gfB, 'champion', 'm7', 1, 'SF1 Winner Pick')}
            <div class="match-vs-divider">👑</div>
            ${this.renderCompetitorItem(gfB, gfA, 'champion', 'm7', 2, 'SF2 Winner Pick')}
          </div>

          <div style="padding: 14px 16px; background: linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(255, 215, 0, 0.12)); border: 1.5px solid var(--border-gold); border-radius: 12px; margin-top: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.45);">
            <div style="font-size: 10.5px; font-family: var(--font-display); color: var(--gold); font-weight: 900; letter-spacing: 0.08em; text-align: center; margin-bottom: 8px;">
              👑 PREDICTED GRAND CHAMPION
            </div>
            ${predictedChamp ? `
              <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                <img class="champ-pepe-hero-img" src="${PEPE_CHAMP_URL}" data-fallback-src="${PEPE_CHAMP_FALLBACK}" alt="Champion Pepe">
                <div style="text-align: left; min-width: 0;">
                  <div style="font-family: var(--font-display); font-size: 15px; font-weight: 900; color: #53fc18; display: flex; align-items: center; gap: 6px;">
                    <span>${esc(predictedChamp.username)}</span>
                    <img src="${PEPE_EZ_URL}" data-fallback-src="${PEPE_EZ_FALLBACK}" alt="EZ" style="width: 20px; height: 20px; border-radius: 4px; object-fit: cover;">
                  </div>
                  <div style="font-family: var(--font-display); font-size: 13px; font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                    ${esc(predictedChamp.slotName)}
                  </div>
                </div>
              </div>
            ` : `
              <div style="font-family: var(--font-display); font-size: 13.5px; font-weight: 700; color: var(--text-dim); text-align: center; padding: 6px 0;">
                Click each matchup winner above to crown your Champion!
              </div>
            `}
            ${liveChamp ? `
              <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed rgba(255,215,0,0.3); font-size: 11px; text-align: center; color: #fff;">
                🏆 <strong style="color: var(--gold);">OFFICIAL STREAM CHAMPION:</strong> <span style="color: #53fc18; font-weight: 800;">${esc(liveChamp.username)}</span> (${esc(liveChamp.slotName)})
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    this.bindClickHandlers();
    this.updateStatusBanner();
    if (typeof window.refreshLazyLoad === 'function') {
      window.refreshLazyLoad();
    }
  }

  getEntry(entryId) {
    if (!entryId) return null;
    if (this.entryById.has(entryId)) return this.entryById.get(entryId);
    const found = this.slots.find(x => x.id === entryId || x.slotName === entryId || x.username === entryId);
    return found || null;
  }

  getSlotName(slotId) {
    if (!slotId) return null;
    const entry = this.getEntry(slotId);
    const esc = window.escapeHTML || (x => x);
    if (entry && !entry.isTbd) {
      return esc(`${entry.username} (${entry.slotName})`);
    }
    if (window.SlotResolver) {
      const res = window.SlotResolver.resolve(slotId);
      return esc(res.name);
    }
    return esc(slotId);
  }

  getSlotImage(slotId) {
    const entry = this.getEntry(slotId);
    if (entry && entry.img) return entry.img;
    if (window.SlotResolver) {
      const res = window.SlotResolver.resolve(slotId);
      if (res && res.image) return res.image;
    }
    return 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';
  }

  bindClickHandlers() {
    if (this.isLocked) return;

    const items = document.querySelectorAll('.match-slot-item');
    items.forEach(el => {
      el.addEventListener('click', () => {
        if (this.predictionsClosed) {
          if (window.sonner) {
            window.sonner.toast({
              title: 'Predictions Closed 🔒',
              message: 'The streamer has closed bracket predictions for this tournament.',
              type: 'danger'
            });
          }
          return;
        }
        const slotId = el.getAttribute('data-slot-id');
        const target = el.getAttribute('data-target');
        if (!slotId || slotId === 'null') return;

        // If user clicked directly on a Semifinal or Grand Final competitor that was populated from live state, also backfill upstream pick
        if (target === 'final_a' && !this.predictions.semi1_a && !this.predictions.semi1_b) {
          if (slotId === this.slots[0]?.id || slotId === this.slots[1]?.id) this.predictions.semi1_a = slotId;
          if (slotId === this.slots[2]?.id || slotId === this.slots[3]?.id) this.predictions.semi1_b = slotId;
        }
        if (target === 'final_b' && !this.predictions.semi2_a && !this.predictions.semi2_b) {
          if (slotId === this.slots[4]?.id || slotId === this.slots[5]?.id) this.predictions.semi2_a = slotId;
          if (slotId === this.slots[6]?.id || slotId === this.slots[7]?.id) this.predictions.semi2_b = slotId;
        }

        if (target === 'champion') {
          const mMatches = this.liveTourneyState?.matches || {};
          const currentGfA = this.getEntry(this.predictions.final_a) || this.findEntryByRawPlayer(mMatches.m7?.player1);
          const currentGfB = this.getEntry(this.predictions.final_b) || this.findEntryByRawPlayer(mMatches.m7?.player2);
          if (!this.predictions.final_a && currentGfA && slotId === currentGfA.id) {
            this.predictions.final_a = slotId;
          }
          if (!this.predictions.final_b && currentGfB && slotId === currentGfB.id) {
            this.predictions.final_b = slotId;
          }
        }

        this.predictions[target] = slotId;

        // Reset downstream selections if branch changes
        if (target === 'semi1_a' || target === 'semi1_b') {
          if (this.predictions.final_a !== this.predictions.semi1_a && this.predictions.final_a !== this.predictions.semi1_b) {
            this.predictions.final_a = null;
          }
        }
        if (target === 'semi2_a' || target === 'semi2_b') {
          if (this.predictions.final_b !== this.predictions.semi2_a && this.predictions.final_b !== this.predictions.semi2_b) {
            this.predictions.final_b = null;
          }
        }
        if (this.predictions.champion !== this.predictions.final_a && this.predictions.champion !== this.predictions.final_b) {
          if (target !== 'champion') {
            this.predictions.champion = null;
          }
        }

        try {
          if (window.ProAudioFX) {
            if (target === 'champion' && typeof window.ProAudioFX.playBoosterRarityReveal === 'function') {
              window.ProAudioFX.playBoosterRarityReveal('radiant-prism');
            } else if (typeof window.ProAudioFX.playWinArpeggio === 'function') {
              window.ProAudioFX.playWinArpeggio();
            }
          } else if (window.soundEngine) {
            if (target === 'champion' && typeof window.soundEngine.playWin === 'function') {
              window.soundEngine.playWin();
            } else if (typeof window.soundEngine.playChip === 'function') {
              window.soundEngine.playChip();
            }
          }
          if (target === 'champion' && typeof window.fireCasinoConfetti === 'function') {
            window.fireCasinoConfetti({ particleCount: 45 });
          }
        } catch (audioErr) {
          console.warn('[TourneyPrediction] Audio/confetti feedback non-fatal error:', audioErr);
        }

        this.savePrediction();
        this.renderBracket();
      });
    });
  }

  updateStatusBanner() {
    const statusEl = document.getElementById('tourney-pred-status');
    const lockBtn = document.getElementById('btn-lock-tourney-pred');

    if (this.isLocked) {
      if (statusEl) {
        statusEl.textContent = 'BRACKET LOCKED & SUBMITTED ✓';
        statusEl.style.color = 'var(--kick-green)';
      }
      if (lockBtn) {
        lockBtn.textContent = '✓ Bracket Locked';
        lockBtn.disabled = true;
      }
    } else if (this.predictionsClosed) {
      if (statusEl) {
        statusEl.textContent = '🔒 PREDICTIONS CLOSED BY STREAMER';
        statusEl.style.color = '#ef4444';
      }
      if (lockBtn) {
        lockBtn.textContent = '🔒 Predictions Closed';
        lockBtn.disabled = true;
      }
    } else {
      if (statusEl) {
        const isComplete = this.predictions.champion !== null;
        statusEl.textContent = isComplete ? 'PICKS COMPLETE (READY TO LOCK)' : 'OPEN — CLICK MATCHUPS TO PICK WINNERS';
        statusEl.style.color = isComplete ? 'var(--cyan)' : 'var(--kick-green)';
      }
      if (lockBtn) {
        lockBtn.textContent = 'Submit & Lock Bracket 🔒';
        lockBtn.disabled = false;
      }
    }
  }

  computeCorrectHitsForPredictions(preds) {
    if (!preds || !this.liveTourneyState?.matches) return { hits: 0, resolved: 0 };
    const map = [
      { key: 'semi1_a', matchId: 'm1' },
      { key: 'semi1_b', matchId: 'm2' },
      { key: 'semi2_a', matchId: 'm3' },
      { key: 'semi2_b', matchId: 'm4' },
      { key: 'final_a', matchId: 'm5' },
      { key: 'final_b', matchId: 'm6' },
      { key: 'champion', matchId: 'm7' }
    ];
    let hits = 0;
    let resolved = 0;
    for (const item of map) {
      const m = this.liveTourneyState.matches[item.matchId];
      if (m && m.winner) {
        resolved++;
        const pickedEntry = this.getEntry(preds[item.key]);
        if (pickedEntry && this.isEntryLiveMatchWinner(item.matchId, pickedEntry)) {
          hits++;
        }
      }
    }
    return { hits, resolved };
  }

  bindSubmitButton() {
    const btn = document.getElementById('btn-lock-tourney-pred');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (this.predictionsClosed) {
        if (window.sonner) {
          window.sonner.toast({
            title: 'Predictions Closed 🔒',
            message: 'The streamer has closed bracket predictions for this tournament.',
            type: 'danger'
          });
        }
        return;
      }
      if (!this.predictions.champion) {
        if (window.sonner) {
          window.sonner.toast({
            title: 'Complete Your Bracket Picks',
            message: 'Select the winner of each matchup up to the Grand Final Champion before locking.',
            type: 'danger'
          });
        }
        return;
      }

      const currentUser = (window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '@Viewer';
      this.isLocked = true;
      localStorage.setItem('hunthub_tourney_pred_locked', 'true');
      this.savePrediction();
      try {
        const cleanU = String(currentUser).replace(/^@/, '').trim() || 'Viewer';
        const comm = JSON.parse(localStorage.getItem('hunthub_tourney_community_preds') || '[]');
        const filtered = Array.isArray(comm) ? comm.filter(c => String(c.username || '').replace(/^@/, '').toLowerCase() !== cleanU.toLowerCase()) : [];
        filtered.push({
          username: `@${cleanU}`,
          isSub: localStorage.getItem('hunthub_is_sub') === 'true',
          predictions: { ...this.predictions },
          championPick: this.predictions.champion,
          lockedAt: Date.now()
        });
        localStorage.setItem('hunthub_tourney_community_preds', JSON.stringify(filtered));
      } catch (_) {}

      if (window.soundEngine) {
        if (typeof window.soundEngine.playVictoriousTrumpetFanfare === 'function') {
          window.soundEngine.playVictoriousTrumpetFanfare();
        } else {
          window.soundEngine.playWin();
        }
      }
      if (typeof window.fireCasinoConfetti === 'function') {
        window.fireCasinoConfetti({ particleCount: 55 });
      }

      this.updateStatusBanner();
      this.renderBracket();
      this.renderStandings();

      if (window.sonner) {
        window.sonner.toast({
          title: '🏆 Bracket Locked!',
          message: `${currentUser} picked ${this.getSlotName(this.predictions.champion)} as Grand Champion!`,
          type: 'gold'
        });
      }
    });
  }

  // ==========================================
  // LIVE TRANSPARENCY STANDINGS & PODIUM
  // ==========================================
  computeLiveStandingsList() {
    const currentUser = (window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '@You';
    const isUserSub = localStorage.getItem('hunthub_is_sub') === 'true';

    let list = [...this.communityStandings];
    try {
      const savedComm = JSON.parse(localStorage.getItem('hunthub_tourney_community_preds') || '[]');
      if (Array.isArray(savedComm)) {
        savedComm.forEach(entry => {
          if (!entry || !entry.username) return;
          const { hits, resolved } = entry.predictions
            ? this.computeCorrectHitsForPredictions(entry.predictions)
            : { hits: Number(entry.score || 0), resolved: 7 };
          const score = resolved > 0 ? hits : Number(entry.score || 0);
          const accuracy = resolved > 0 ? Number(((hits / resolved) * 100).toFixed(1)) : Number(entry.accuracy || 100.0);
          const uName = entry.username.startsWith('@') ? entry.username : `@${entry.username}`;
          const row = {
            username: uName,
            isSub: Boolean(entry.isSub),
            championPick: entry.championPick || entry.predictions?.champion || null,
            score,
            accuracy,
            status: resolved > 0 ? `${hits}/${resolved} Live Hits 🔥` : 'Locked & Ready ⭐'
          };
          const idx = list.findIndex(x => String(x.username || '').toLowerCase() === uName.toLowerCase());
          if (idx >= 0) list[idx] = row;
          else list.push(row);
        });
      }
    } catch (_) {}

    if (this.isLocked && this.predictions.champion) {
      const { hits, resolved } = this.computeCorrectHitsForPredictions(this.predictions);
      const score = resolved > 0 ? hits : 0;
      const accuracy = resolved > 0 ? Number(((hits / resolved) * 100).toFixed(1)) : 100.0;
      const userEntry = {
        username: currentUser.startsWith('@') ? currentUser : `@${currentUser}`,
        isSub: isUserSub,
        championPick: this.predictions.champion,
        score,
        accuracy,
        status: resolved > 0 ? `${hits}/${resolved} Live Hits 🔥` : 'Locked & Ready ⭐'
      };
      const existing = list.findIndex(x => String(x.username || '').toLowerCase() === userEntry.username.toLowerCase());
      if (existing >= 0) list[existing] = userEntry;
      else list.push(userEntry);
    }

    list.sort((a, b) => b.score - a.score || b.accuracy - a.accuracy);
    return list;
  }

  resolveTopPredictionWinner() {
    const list = this.computeLiveStandingsList();
    if (!list || list.length === 0) return null;
    const top = list[0];
    if (!top || !top.username || String(top.username).replace(/^@/, '').toLowerCase() === 'you') return null;
    return top;
  }

  renderStandings() {
    const panel = document.getElementById('tourney-standings-panel');
    if (!panel) return;

    const currentUser = (window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '@You';
    const list = this.computeLiveStandingsList();

    if (list.length === 0) {
      panel.innerHTML = `
        <div style="text-align: center; padding: 48px 20px; background: rgba(0,0,0,0.3); border: 1px dashed rgba(255,255,255,0.1); border-radius: 12px; margin-top: 10px;">
          <div style="font-size: 36px; margin-bottom: 10px;">📊</div>
          <div style="font-family: var(--font-display); font-weight: 800; font-size: 16px; color: #ffffff; margin-bottom: 6px;">No Tournament Predictions Yet</div>
          <p style="font-size: 13px; color: var(--text-muted); max-width: 460px; margin: 0 auto; line-height: 1.5;">
            Predictions open when a new 8-bracket tournament is scheduled. Spectators will appear here on the live transparency scoreboard once picks are locked.
          </p>
        </div>
      `;
      return;
    }

    const leader = list[0];

    const esc = (str) => String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    panel.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Podium Winner Billboard -->
        <div class="standings-podium-card">
          <div class="podium-crown-icon">👑</div>
          <div style="font-size: 11px; font-family: var(--font-display); color: var(--gold); font-weight: 800; letter-spacing: 1px;">
            CURRENT PREDICTION LEADER (RANK #1)
          </div>
          <div class="podium-winner-name">${esc(leader.username)}</div>
          <div style="display: flex; align-items: center; gap: 10px; margin-top: 4px;">
            <span class="podium-score-pill">${leader.score} / 7 Correct Picks (${leader.accuracy}%)</span>
            <span style="font-size: 12px; color: var(--text-muted);">
              Predicted Champion: <strong>${esc(this.getSlotName(leader.championPick))}</strong>
            </span>
          </div>
          <p style="font-size: 11px; color: var(--text-dim); margin-top: 6px;">
            The viewer with the most correct picks at the conclusion of Match 7 claims the official streamer reward.
          </p>
        </div>

        <!-- Standings Scoreboard Table -->
        <div class="standings-table-wrapper">
          <table class="standings-table">
            <thead>
              <tr>
                <th>RANK</th>
                <th>KICK VIEWER</th>
                <th>CHAMPION PICK</th>
                <th>CORRECT HITS</th>
                <th>ACCURACY</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody id="tourney-standings-tbody">
              ${list.map((u, idx) => {
                const rankNum = idx + 1;
                const isUser = u.username === currentUser;
                return `
                  <tr class="${isUser ? 'current-user-row' : ''}">
                    <td>
                      <span class="rank-badge ${rankNum === 1 ? 'rank-1' : (rankNum === 2 ? 'rank-2' : (rankNum === 3 ? 'rank-3' : ''))}">
                        #${rankNum}
                      </span>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-family: var(--font-display); font-weight: 700; color: #ffffff;">${esc(u.username)}</span>
                        ${u.isSub ? '<span class="reward-badge-pill" style="font-size: 9px; padding: 1px 6px;">SUB</span>' : ''}
                        ${isUser ? '<span style="font-size: 10px; color: var(--cyan);">(YOU)</span>' : ''}
                      </div>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <img src="${esc(this.getSlotImage(u.championPick))}" style="width: 24px; height: 24px; border-radius: 4px;" alt="">
                        <span style="font-size: 12px; color: #cbd5e1;">${esc(this.getSlotName(u.championPick))}</span>
                      </div>
                    </td>
                    <td style="font-family: var(--font-display); font-weight: 800; color: #00e676;">
                      ${u.score} / 7
                    </td>
                    <td style="font-family: var(--font-display); color: var(--cyan); font-weight: 700;">
                      ${u.accuracy}%
                    </td>
                    <td>
                      <span style="font-size: 12px; font-weight: 700; color: ${rankNum === 1 ? 'var(--gold)' : 'var(--text-muted)'};">
                        ${esc(u.status)}
                      </span>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

      </div>
    `;

    if (typeof window.autoAnimateList === 'function') {
      window.autoAnimateList('#tourney-standings-tbody');
    }
  }

  getEmptyCornerPlaceholderSvg(corner) {
    const color = corner === 'B' ? '#ff2a5f' : '#00e5ff';
    const label = corner === 'B' ? 'EMPTY B' : 'EMPTY A';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 236"><rect width="180" height="236" rx="14" fill="#070a12" stroke="${color}" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 4"/><text x="90" y="112" text-anchor="middle" font-family="Chakra Petch, sans-serif" font-weight="900" font-size="44" fill="${color}" fill-opacity="0.45">?</text><text x="90" y="152" text-anchor="middle" font-family="Chakra Petch, sans-serif" font-weight="800" font-size="14" fill="#64748b" letter-spacing="1.5">${label}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  escapeHTML(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  showAnnouncement(htmlContent, tone = 'gold', durationMs = 4500) {
    const banner = document.getElementById('pub-koth-announcement-banner');
    if (!banner) return;
    if (!htmlContent) {
      banner.style.display = 'none';
      return;
    }
    banner.style.display = 'block';
    banner.innerHTML = htmlContent;
    if (tone === 'gold') {
      banner.style.border = '1px solid var(--gold)';
      banner.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.22), rgba(83, 252, 24, 0.16))';
      banner.style.color = '#fff';
      banner.style.boxShadow = '0 0 24px rgba(255, 215, 0, 0.35)';
    } else if (tone === 'cyan') {
      banner.style.border = '1px solid #00e5ff';
      banner.style.background = 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(15, 23, 42, 0.9))';
      banner.style.color = '#fff';
      banner.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.3)';
    } else {
      banner.style.border = '1px solid rgba(255, 255, 255, 0.15)';
      banner.style.background = 'rgba(0, 0, 0, 0.4)';
      banner.style.color = 'var(--text-dim)';
      banner.style.boxShadow = 'none';
    }

    if (this.announcementTimer) clearTimeout(this.announcementTimer);
    if (durationMs > 0) {
      this.announcementTimer = setTimeout(() => {
        banner.style.display = 'none';
      }, durationMs);
    }
  }

  triggerGrandChampionCelebration(winnerName, prize = 20) {
    const safeWinner = this.escapeHTML(winnerName);
    const bannerHtml = `👑🏆 <strong>GRAND CHAMPION!</strong> <span style="color:var(--gold);">@${safeWinner}</span> conquered 4 duels and captured the <strong style="color:#53fc18;">$${Number(prize) || 20}.00 CASH PRIZE</strong>! 🎉`;
    this.showAnnouncement(bannerHtml, 'gold', 5500);

    if (window.soundEngine && typeof window.soundEngine.playVictoryFanfare === 'function') {
      window.soundEngine.playVictoryFanfare();
    } else if (window.soundEngine && typeof window.soundEngine.playVictoriousTrumpetFanfare === 'function') {
      window.soundEngine.playVictoriousTrumpetFanfare();
    }
    if (window.proFxAudio && typeof window.proFxAudio.playWinArpeggio === 'function') {
      window.proFxAudio.playWinArpeggio();
    }

    if (typeof window.fireJackpotCannons === 'function') {
      window.fireJackpotCannons();
    } else if (typeof window.confetti === 'function') {
      window.confetti({ particleCount: 140, spread: 100, origin: { y: 0.6 } });
    }

    if (window.sonner) {
      window.sonner.toast({
        title: `👑 Grand Champion @${winnerName} won $${prize}!`,
        message: `4/4 consecutive victories completed! Both corners cleared for new contenders.`,
        type: 'gold'
      });
    }
  }

  triggerCashoutCelebration(retiredKing, prize, streak) {
    const safeKing = this.escapeHTML(retiredKing);
    const bannerHtml = `💰 <strong>WINNER CASHOUT!</strong> <span style="color:var(--gold);">@${safeKing}</span> cashed out <strong style="color:#53fc18;">$${Number(prize) || 5}.00 CASH</strong> (${Number(streak) || 1}/4 wins)! The throne is now vacant!`;
    this.showAnnouncement(bannerHtml, 'gold', 4500);

    if (window.soundEngine && typeof window.soundEngine.playVictoryFanfare === 'function') {
      window.soundEngine.playVictoryFanfare();
    } else if (window.soundEngine && typeof window.soundEngine.playJackpot === 'function') {
      window.soundEngine.playJackpot();
    }

    if (typeof window.confetti === 'function') {
      window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }

    if (window.sonner) {
      window.sonner.toast({
        title: `💰 @${retiredKing} cashed out $${prize}!`,
        message: `Throne relinquished after ${streak} victory(s). Corners cleared for new players.`,
        type: 'gold'
      });
    }
  }

  triggerContinueAnnouncement(kingName, streak) {
    const safeKing = this.escapeHTML(kingName);
    const bannerHtml = `⚔️ <strong>THRONE DEFENDED!</strong> <span style="color:#00e5ff;">@${safeKing}</span> chose <code>!continue</code> (Streak ${Number(streak) || 1}/4)! Awaiting challenger in Red Corner...`;
    this.showAnnouncement(bannerHtml, 'cyan', 4000);

    if (window.soundEngine && typeof window.soundEngine.playWin === 'function') {
      window.soundEngine.playWin();
    }
  }

  renderKoth(stateUpdate = null) {
    let koth = { active: true, king: null, kingSlot: '', streak: 0, maxStreak: 4, prize: 20, awaitingDecision: false };
    try {
      const saved = localStorage.getItem('hunthub_koth_state');
      if (saved) koth = { ...koth, ...JSON.parse(saved) };
    } catch (_) {}

    let battle = null;
    if (stateUpdate && (stateUpdate.playerA !== undefined || stateUpdate.status)) {
      battle = stateUpdate;
    } else {
      try {
        const savedB = localStorage.getItem('hunthub_battle_state');
        if (savedB) battle = JSON.parse(savedB);
      } catch (_) {}
    }

    // Inspect Control Panel inputs if present in current document
    const cpUserA = (document.getElementById('cp-battle-user-a')?.value || '').trim().replace(/^@/, '');
    const cpSlotA = (document.getElementById('cp-battle-slot-a')?.value || '').trim();
    const cpUserB = (document.getElementById('cp-battle-user-b')?.value || '').trim().replace(/^@/, '');
    const cpSlotB = (document.getElementById('cp-battle-slot-b')?.value || '').trim();

    // Determine Corner A (King / Blue Corner)
    let pAName = (battle && battle.playerA && battle.playerA.username)
      ? battle.playerA.username
      : (cpUserA || koth.king || '');
    pAName = String(pAName).trim().replace(/^@/, '');
    let pASlot = (battle && battle.playerA && (battle.playerA.slotName || battle.playerA.slot))
      ? (battle.playerA.slotName || battle.playerA.slot)
      : (cpSlotA || koth.kingSlot || '');

    // Determine Corner B (Challenger / Red Corner)
    let pBName = (battle && battle.playerB && battle.playerB.username)
      ? battle.playerB.username
      : (cpUserB || koth.challenger || '');
    pBName = String(pBName).trim().replace(/^@/, '');
    let pBSlot = (battle && battle.playerB && (battle.playerB.slotName || battle.playerB.slot))
      ? (battle.playerB.slotName || battle.playerB.slot)
      : (cpSlotB || koth.chalSlot || '');

    // Guard against duplication
    if (pAName && pBName && pAName.toLowerCase() === pBName.toLowerCase()) {
      pBName = '';
      pBSlot = '';
    }

    // Current Streak (0..4)
    const streak = (battle && typeof battle.currentStreak === 'number')
      ? Math.min(4, Math.max(0, battle.currentStreak))
      : Math.min(4, Math.max(0, koth.streak || 0));
    const currentPrizeUsd = Math.min(20, streak * 5);

    const badge = document.getElementById('public-koth-streak-badge');
    if (badge) {
      badge.textContent = `STREAK: ${streak}/${koth.maxStreak || 4} ($${currentPrizeUsd})`;
    }

    const modeBadge = document.getElementById('public-koth-mode-badge');
    const bMode = battle?.gameMode || battle?.mode || localStorage.getItem('hunthub_battle_mode') || 'BONUS_BUY';
    if (modeBadge) {
      modeBadge.textContent = bMode === 'SPINS' ? 'MODE: 50 SPINS (WIN / LOSE)' : 'MODE: BONUS BUY (MULT)';
    }

    const statusTextEl = document.getElementById('pub-battle-status-text');
    if (statusTextEl) {
      if (koth.awaitingDecision && pAName) {
        statusTextEl.textContent = `👑 @${pAName} AWAITING DECISION (!continue / !cashout)`;
      } else if (pAName && pBName) {
        statusTextEl.textContent = `⚔️ DUEL IN PROGRESS: @${pAName} VS @${pBName}`;
      } else if (pAName) {
        statusTextEl.textContent = `👑 @${pAName} IN BLUE CORNER · WAITING CHALLENGER B`;
      } else {
        statusTextEl.textContent = 'LIVE ARENA · !BATTLE QUEUE OPEN';
      }
    }

    const currentUser = (localStorage.getItem('hunthub_kick_username') || '').replace(/^@/, '').toLowerCase();

    // Pre-fill Join User input if logged in and currently empty
    const joinUserEl = document.getElementById('pub-battle-join-user');
    if (joinUserEl && !joinUserEl.value && currentUser) {
      joinUserEl.value = `@${currentUser}`;
    }

    // Update streak steps 1..4
    for (let i = 1; i <= 4; i++) {
      const stepEl = document.getElementById(`pub-koth-step-${i}`);
      if (!stepEl) continue;
      if (i <= streak) {
        stepEl.style.background = i === 4 ? 'rgba(83, 252, 24, 0.2)' : 'rgba(0, 229, 255, 0.15)';
        stepEl.style.borderColor = i === 4 ? '#53fc18' : 'var(--cyan)';
        stepEl.style.boxShadow = i === 4 ? '0 0 12px rgba(83,252,24,0.3)' : '0 0 8px rgba(0,229,255,0.2)';
      } else {
        stepEl.style.background = i === 4 ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 255, 255, 0.04)';
        stepEl.style.borderColor = i === 4 ? 'var(--gold)' : 'rgba(255, 255, 255, 0.08)';
        stepEl.style.boxShadow = 'none';
      }
    }

    // ==========================================
    // 1. CORNER A: BLUE / REIGNING KING
    // ==========================================
    const kingAvatarEl = document.getElementById('pub-koth-king-avatar');
    const kingNameEl = document.getElementById('pub-koth-king-name');
    const kingSlotEl = document.getElementById('pub-koth-king-slot');
    const kingScoreEl = document.getElementById('pub-koth-king-score');
    const kingSlotImg = document.getElementById('pub-koth-king-slot-img');
    const kingSlotBadge = document.getElementById('pub-koth-king-slot-badge');

    if (pAName) {
      if (kingAvatarEl) {
        kingAvatarEl.textContent = '👑';
        kingAvatarEl.style.opacity = '1';
      }
      if (kingNameEl) {
        kingNameEl.textContent = `@${pAName}`;
        kingNameEl.style.color = '#ffffff';
      }

      const metaA = window.SlotResolver ? window.SlotResolver.resolve(pASlot || 'Wanted Dead or a Wild') : null;
      const slotDisplayName = metaA?.name || pASlot || 'Selected Slot';
      const providerName = (metaA?.provider || 'Casino').toUpperCase();
      const slotImgUrl = metaA?.image || battle?.playerA?.slotImage || '';

      if (kingSlotEl) {
        kingSlotEl.textContent = slotDisplayName;
        kingSlotEl.style.color = 'var(--gold)';
      }
      if (kingScoreEl) {
        const multA = Number(battle?.playerA?.multiplier || 0);
        if (multA > 0) {
          kingScoreEl.textContent = `${multA.toFixed(2)}x${streak > 0 ? ` · ${streak}/4 🔥` : ''}`;
        } else {
          kingScoreEl.textContent = streak > 0 ? `${streak}/4 Wins ($${currentPrizeUsd}) 🔥` : 'Ready in Blue Corner';
        }
        kingScoreEl.style.color = 'var(--cyan)';
      }
      if (kingSlotImg) {
        kingSlotImg.src = slotImgUrl || this.getEmptyCornerPlaceholderSvg('A');
        kingSlotImg.onerror = () => {
          kingSlotImg.src = this.getEmptyCornerPlaceholderSvg('A');
        };
      }
      if (kingSlotBadge) {
        kingSlotBadge.style.display = 'block';
        kingSlotBadge.textContent = providerName;
      }
    } else {
      // Corner A is Empty
      if (kingAvatarEl) {
        kingAvatarEl.textContent = '👑';
        kingAvatarEl.style.opacity = '0.35';
      }
      if (kingNameEl) {
        kingNameEl.textContent = 'No Reigning King';
        kingNameEl.style.color = 'var(--text-dim)';
      }
      if (kingSlotEl) {
        kingSlotEl.textContent = 'Throne Open for Challengers';
        kingSlotEl.style.color = 'var(--text-dim)';
      }
      if (kingScoreEl) {
        kingScoreEl.textContent = '0 Wins';
        kingScoreEl.style.color = 'var(--cyan)';
      }
      if (kingSlotImg) {
        kingSlotImg.src = this.getEmptyCornerPlaceholderSvg('A');
      }
      if (kingSlotBadge) {
        kingSlotBadge.style.display = 'none';
      }
    }

    // ==========================================
    // 2. CORNER B: RED / CHALLENGER
    // ==========================================
    const chalAvatarEl = document.getElementById('pub-koth-chal-avatar');
    const chalNameEl = document.getElementById('pub-koth-chal-name');
    const chalSlotEl = document.getElementById('pub-koth-chal-slot');
    const chalScoreEl = document.getElementById('pub-koth-chal-score');
    const chalSlotImg = document.getElementById('pub-koth-chal-slot-img');
    const chalSlotBadge = document.getElementById('pub-koth-chal-slot-badge');

    if (pBName) {
      if (chalAvatarEl) {
        chalAvatarEl.textContent = '🥊';
        chalAvatarEl.style.opacity = '1';
      }
      if (chalNameEl) {
        chalNameEl.textContent = `@${pBName}`;
        chalNameEl.style.color = '#ffffff';
      }

      const metaB = window.SlotResolver ? window.SlotResolver.resolve(pBSlot || 'Gates of Olympus 1000') : null;
      const slotDisplayName = metaB?.name || pBSlot || 'Selected Slot';
      const providerName = (metaB?.provider || 'Casino').toUpperCase();
      const slotImgUrl = metaB?.image || battle?.playerB?.slotImage || '';

      if (chalSlotEl) {
        chalSlotEl.textContent = slotDisplayName;
        chalSlotEl.style.color = 'var(--gold)';
      }
      if (chalScoreEl) {
        const multVal = Number(battle?.playerB?.multiplier || 0);
        chalScoreEl.textContent = multVal > 0 ? `${multVal.toFixed(2)}x` : 'Challenger Ready 🥊';
        chalScoreEl.style.color = '#ff6b8b';
      }
      if (chalSlotImg) {
        chalSlotImg.src = slotImgUrl || this.getEmptyCornerPlaceholderSvg('B');
        chalSlotImg.onerror = () => {
          chalSlotImg.src = this.getEmptyCornerPlaceholderSvg('B');
        };
      }
      if (chalSlotBadge) {
        chalSlotBadge.style.display = 'block';
        chalSlotBadge.textContent = providerName;
      }
    } else {
      // Corner B is Empty
      if (chalAvatarEl) {
        chalAvatarEl.textContent = '🥊';
        chalAvatarEl.style.opacity = '0.35';
      }
      if (chalNameEl) {
        chalNameEl.textContent = 'Awaiting Challenger';
        chalNameEl.style.color = 'var(--text-dim)';
      }
      if (chalSlotEl) {
        chalSlotEl.textContent = 'Type !battle <slot> in chat';
        chalSlotEl.style.color = 'var(--text-dim)';
      }
      if (chalScoreEl) {
        chalScoreEl.textContent = '—';
        chalScoreEl.style.color = '#ff6b8b';
      }
      if (chalSlotImg) {
        chalSlotImg.src = this.getEmptyCornerPlaceholderSvg('B');
      }
      if (chalSlotBadge) {
        chalSlotBadge.style.display = 'none';
      }
    }

    // King decision actions (visible when awaiting decision for the King or Streamer)
    const kingUser = (pAName || koth.king || '').replace(/^@/, '').toLowerCase();
    const isStreamer = ['diggitybets', 'diggity_bets', 'tarkansky', 'diggitybot', 'diggity_bot'].includes(currentUser);
    const actionBox = document.getElementById('pub-koth-king-actions');

    if (actionBox) {
      if (koth.awaitingDecision && kingUser && (isStreamer || !currentUser || currentUser === kingUser)) {
        actionBox.style.display = 'block';
      } else {
        actionBox.style.display = 'none';
      }
    }

    this.renderPublicBattleQueue();
  }

  renderPublicBattleQueue() {
    const listEl = document.getElementById('pub-battle-queue-list');
    const countEl = document.getElementById('pub-battle-queue-count');
    if (!listEl) return;

    const demoUsers = new Set([
      'luckystriker', 'vegasking', 'slotqueen', 'spinmaster', 'strike777',
      'bigbassbob', 'neonwolf', 'royalflush', 'nachogamer', 'slotking21',
      'diggityfan', 'cryptospin', 'aguskick', 'valen99', 'stakehunter'
    ]);

    let pool = [];
    try {
      const saved = JSON.parse(localStorage.getItem('hunthub_duo_pool_v2') || '[]');
      if (Array.isArray(saved)) {
        pool = saved.filter(p => {
          const u = String(p?.chatter || p?.user || '').trim().toLowerCase().replace(/^@/, '');
          return u && !demoUsers.has(u);
        });
      }
    } catch (_) {}

    if (countEl) {
      countEl.textContent = `${pool.length} IN QUEUE`;
    }

    if (pool.length === 0) {
      listEl.innerHTML = `<span style="font-size: 12px; color: var(--text-muted);">Queue is open and empty — enter a slot above or type <code>!battle &lt;slot&gt;</code> in Kick chat!</span>`;
      return;
    }

    const esc = window.escapeHTML || (s => String(s));
    listEl.innerHTML = pool.map(item => {
      const user = String(item.chatter || item.user || 'Viewer').replace(/^@/, '');
      const rawSlot = item.slot || item.slotName || 'Wanted Dead or a Wild';
      const meta = (window.SlotResolver && typeof window.SlotResolver.resolve === 'function')
        ? window.SlotResolver.resolve(rawSlot)
        : { name: rawSlot, provider: item.provider || 'Casino', image: item.imageUrl || '' };
      const fallbackSvg = (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function')
        ? window.SlotResolver.generateDataUriCard(meta.name || rawSlot, meta.provider || 'Casino')
        : '';
      const imgSrc = meta.image || item.imageUrl || fallbackSvg;
      return `
        <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 10px; background: rgba(15, 23, 42, 0.9); border: 1px solid rgba(0, 229, 255, 0.3); border-radius: 8px; font-size: 12px;">
          <img class="lazy" src="${imgSrc}" alt="" loading="lazy" decoding="async" style="width: 26px; height: 34px; aspect-ratio: 180 / 236; border-radius: 4px; object-fit: contain; background: #070a12; flex-shrink: 0;" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
          <strong style="color: #fff;">@${esc(user)}</strong>
          <span style="color: var(--gold); font-weight: 700;">${esc(meta.name || rawSlot)}</span>
        </div>
      `;
    }).join('');
  }

  bindKothActions() {
    const btnContinue = document.getElementById('btn-pub-koth-continue');
    const btnRetire = document.getElementById('btn-pub-koth-retire');
    const datalist = document.getElementById('pub-battle-slot-datalist');
    const btnJoin = document.getElementById('btn-pub-battle-join');
    const btnCopyCmd = document.getElementById('btn-pub-battle-copy-cmd');
    const joinUserEl = document.getElementById('pub-battle-join-user');
    const joinSlotEl = document.getElementById('pub-battle-join-slot');

    // Populate slot autocomplete datalist for 1v1 Battle Queue
    if (datalist && Array.isArray(window.HUNTHUB_CURATED_SLOTS)) {
      datalist.innerHTML = window.HUNTHUB_CURATED_SLOTS
        .map(s => `<option value="${(window.escapeHTML || (x => x))(s.name)}">${(window.escapeHTML || (x => x))(s.provider || 'Casino')}</option>`)
        .join('');
    }

    const submitBattleQueueEntry = () => {
      const rawUser = (joinUserEl?.value || localStorage.getItem('hunthub_kick_username') || '').trim().replace(/^@/, '');
      const rawSlot = (joinSlotEl?.value || '').trim();
      if (!rawUser) {
        if (window.sonner) window.sonner.toast({ title: 'Username Required', message: 'Enter your @KickUsername to join the 1v1 Battle queue.', type: 'danger' });
        if (joinUserEl) joinUserEl.focus();
        return;
      }
      if (!rawSlot) {
        if (window.sonner) window.sonner.toast({ title: 'Slot Required', message: 'Select or type a slot name to enter the 1v1 Battle queue.', type: 'danger' });
        if (joinSlotEl) joinSlotEl.focus();
        return;
      }

      if (window.adminHub && typeof window.adminHub.addDuoEntry === 'function') {
        window.adminHub.addDuoEntry(rawUser, rawSlot, 'battle');
      } else {
        const meta = (window.SlotResolver && typeof window.SlotResolver.resolve === 'function')
          ? window.SlotResolver.resolve(rawSlot)
          : { name: rawSlot, provider: 'Casino', image: '' };
        let pool = [];
        try { pool = JSON.parse(localStorage.getItem('hunthub_duo_pool_v2') || '[]'); } catch (_) {}
        pool = pool.filter(p => String(p.chatter || p.user || '').toLowerCase().replace(/^@/, '') !== rawUser.toLowerCase());
        pool.unshift({
          chatter: rawUser,
          user: rawUser,
          slot: meta.name || rawSlot,
          provider: meta.provider || 'Casino',
          imageUrl: meta.image || '',
          icon: '🎰'
        });
        try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(pool)); } catch (_) {}
        try {
          const chDuo = new BroadcastChannel('hunthub_duo_wheel');
          chDuo.postMessage({ action: 'set_pool', pool });
        } catch (_) {}
      }

      if (joinSlotEl) joinSlotEl.value = '';
      this.renderPublicBattleQueue();

      if (window.sonner) {
        window.sonner.toast({
          title: '⚔️ Added to 1v1 Battle Queue!',
          message: `@${rawUser} entered with "${rawSlot}". Synced with Dual Wheel!`,
          type: 'cyan'
        });
      }
    };

    if (btnJoin) {
      btnJoin.addEventListener('click', submitBattleQueueEntry);
    }
    if (joinSlotEl) {
      joinSlotEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitBattleQueueEntry();
        }
      });
    }

    if (btnCopyCmd) {
      btnCopyCmd.addEventListener('click', () => {
        const slot = (joinSlotEl?.value || 'Wanted Dead or a Wild').trim();
        const cmd = `!battle ${slot}`;
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard.writeText(cmd).catch(() => {});
        }
        if (window.sonner) {
          window.sonner.toast({
            title: '📋 Copied Kick Chat Command!',
            message: `Copied "${cmd}" — paste it in kick.com/diggitybets chat.`,
            type: 'cyan'
          });
        }
      });
    }

    if (btnContinue) {
      btnContinue.addEventListener('click', async () => {
        if (window.adminHub && typeof window.adminHub.kothContinue === 'function') {
          window.adminHub.kothContinue();
          this.renderKoth();
          return;
        }
        try {
          await fetch('/api/battle/koth/decision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ decision: 'continue' })
          });
        } catch (_) {}

        let koth = { active: true, king: null, streak: 0, maxStreak: 4, prize: 20, awaitingDecision: false };
        try {
          const saved = localStorage.getItem('hunthub_koth_state');
          if (saved) koth = { ...koth, ...JSON.parse(saved) };
        } catch (_) {}
        koth.awaitingDecision = false;
        koth.challenger = null;
        koth.chalSlot = '';
        localStorage.setItem('hunthub_koth_state', JSON.stringify(koth));

        // Update battle state: Player A remains, Player B is cleared
        let battle = null;
        try {
          battle = JSON.parse(localStorage.getItem('hunthub_battle_state') || 'null');
          if (battle) {
            battle.playerB = null;
            battle.status = 'LOBBY';
            localStorage.setItem('hunthub_battle_state', JSON.stringify(battle));
          }
        } catch (_) {}

        const eventData = { action: 'koth_continue', type: 'koth_continue', king: koth.king, streak: koth.streak, ts: Date.now() };
        try {
          const ch1 = new BroadcastChannel('hunthub_battle');
          ch1.postMessage(eventData);
        } catch (_) {}
        try {
          const ch2 = new BroadcastChannel('hunthub_battle_bus');
          ch2.postMessage(eventData);
        } catch (_) {}

        window.dispatchEvent(new CustomEvent('hunthub:battle-sync', { detail: eventData }));
        this.triggerContinueAnnouncement(koth.king || 'Champion', koth.streak);
        this.renderKoth();

        if (window.sonner) {
          window.sonner.toast({
            title: '👑 Throne Defended!',
            message: `Continuing in Blue Corner! Challenger seat is open. Current streak: ${koth.streak}/4.`,
            type: 'green'
          });
        }
      });
    }

    if (btnRetire) {
      btnRetire.addEventListener('click', async () => {
        if (window.adminHub && typeof window.adminHub.kothRetire === 'function') {
          window.adminHub.kothRetire();
          this.renderKoth();
          return;
        }
        try {
          await fetch('/api/battle/koth/decision', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ decision: 'retire' })
          });
        } catch (_) {}

        let koth = { active: true, king: null, streak: 0, maxStreak: 4, prize: 20, awaitingDecision: false };
        try {
          const saved = localStorage.getItem('hunthub_koth_state');
          if (saved) koth = { ...koth, ...JSON.parse(saved) };
        } catch (_) {}
        const retiredKing = koth.king || 'Player';
        const streak = koth.streak || 1;
        const prizeAmount = Math.min(20, streak * 5);

        koth.king = null;
        koth.kingSlot = '';
        koth.challenger = null;
        koth.chalSlot = '';
        koth.streak = 0;
        koth.awaitingDecision = false;
        localStorage.setItem('hunthub_koth_state', JSON.stringify(koth));

        // Clear battle state
        try {
          const resetState = {
            id: 'battle_lobby',
            status: 'LOBBY',
            kothActive: true,
            currentStreak: 0,
            reigningKing: null,
            playerA: null,
            playerB: null,
            winner: null,
            ts: Date.now()
          };
          localStorage.setItem('hunthub_battle_state', JSON.stringify(resetState));
        } catch (_) {}

        const eventData = { action: 'koth_cashout', type: 'koth_cashout', retiredKing, streak, prizeAmount, ts: Date.now() };
        try {
          const ch1 = new BroadcastChannel('hunthub_battle');
          ch1.postMessage(eventData);
        } catch (_) {}
        try {
          const ch2 = new BroadcastChannel('hunthub_battle_bus');
          ch2.postMessage(eventData);
        } catch (_) {}

        window.dispatchEvent(new CustomEvent('hunthub:battle-celebration', { detail: eventData }));
        this.triggerCashoutCelebration(retiredKing, prizeAmount, streak);
        setTimeout(() => this.renderKoth(), 4000);
      });
    }
  }

  listenToEvents() {
    const handleEvent = (data) => {
      if (!data) return;
      const action = data.action || data.type;

      if (action === 'koth_grand_champion' || (action === 'resolve_battle' && (data.kothStreak >= 4 || data.streak >= 4))) {
        const winner = (data.king || data.winningName || 'Champion').replace(/^@/, '');
        this.triggerGrandChampionCelebration(winner, data.prize || 20);
        setTimeout(() => this.renderKoth(), 4800);
      } else if (action === 'koth_cashout' || action === 'koth_retire') {
        const retired = (data.retiredKing || data.king || 'Player').replace(/^@/, '');
        const prize = data.prizeAmount || data.prize || 5;
        const streak = data.streak || 1;
        this.triggerCashoutCelebration(retired, prize, streak);
        setTimeout(() => this.renderKoth(), 4200);
      } else if (action === 'koth_continue') {
        const king = (data.king || 'King').replace(/^@/, '');
        const streak = data.streak || 1;
        this.triggerContinueAnnouncement(king, streak);
        this.renderKoth();
      } else if (action === 'resolve_battle') {
        const winner = (data.winningName || 'Player').replace(/^@/, '');
        const streak = data.kothStreak || data.streak || 1;
        if (streak < 4) {
          this.showAnnouncement(`👑 <strong>ROUND WON!</strong> <span style="color:#00e5ff;">@${this.escapeHTML(winner)}</span> takes the throne (Streak ${streak}/4)! Decision: <code>!continue</code> or <code>!cashout</code>`, 'cyan', 4000);
          if (window.soundEngine && typeof window.soundEngine.playWin === 'function') {
            window.soundEngine.playWin();
          }
        }
        this.renderKoth();
      } else {
        this.renderKoth(data.state || data);
      }
    };

    try {
      this.bcBattle = new BroadcastChannel('hunthub_battle');
      this.bcBattle.onmessage = (e) => handleEvent(e.data);
    } catch (_) {}

    try {
      this.bcBattleBus = new BroadcastChannel('hunthub_battle_bus');
      this.bcBattleBus.onmessage = (e) => handleEvent(e.data);
    } catch (_) {}

    try {
      this.bcDuo = new BroadcastChannel('hunthub_duo_wheel');
      this.bcDuo.onmessage = () => this.renderPublicBattleQueue();
    } catch (_) {}

    try {
      this.bcTourney = new BroadcastChannel('hunthub_tourney');
      this.bcTourney.onmessage = (e) => {
        if (!e.data) return;
        const st = e.data.state || e.data;
        if (st && st.matches) {
          try {
            localStorage.setItem('hunthub_tourney_state', JSON.stringify(st));
          } catch (_) {}
          this.syncWithTourneyState(st);
          this.checkTourneyAccessState();
        }
      };
    } catch (_) {}

    window.addEventListener('hunthub:tourney-sync', (e) => {
      const st = e.detail?.state || e.detail;
      if (st && st.matches) {
        this.syncWithTourneyState(st);
        this.checkTourneyAccessState();
      }
    });

    window.addEventListener('hunthub:battle-sync', (e) => handleEvent(e.detail));
    window.addEventListener('hunthub:battle-celebration', (e) => handleEvent(e.detail));
    window.addEventListener('hunthub:auth-updated', () => this.renderKoth());

    window.addEventListener('storage', (e) => {
      if (e.key === 'hunthub_koth_state' || e.key === 'hunthub_battle_state' || e.key === 'hunthub_battle_assign' || e.key === 'hunthub_duo_pool_v2') {
        this.renderKoth();
      } else if (e.key === 'hunthub_koth_event' && e.newValue) {
        try { handleEvent(JSON.parse(e.newValue)); } catch (_) {}
      } else if (e.key === 'hunthub_tourney_state' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          this.syncWithTourneyState(parsed);
          this.checkTourneyAccessState();
        } catch (_) {}
      } else if (e.key === 'hunthub_tourney_active' || e.key === 'hunthub_tourney_preds_closed') {
        this.checkTourneyAccessState();
      }
    });

    // Edge sync polling for remote spectators on diggitybets.vip/#tournament
    this._lastEdgeTourneyHash = '';
    this._lastEdgeBattleHash = '';
    const pollRemoteTourneyState = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch('/api/sync/state', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        const remoteTourney =
          data?.tourneyState ||
          data?.overlayEvents?.['overlay-tourney']?.state ||
          data?.overlayEvents?.['overlay-tourney'] ||
          data?.overlays?.tourney?.state ||
          data?.overlays?.tourney ||
          null;
        if (remoteTourney && remoteTourney.matches) {
          const hash = JSON.stringify(remoteTourney.matches) + '|' + JSON.stringify(remoteTourney.champion || '') + '|' + (remoteTourney.status || '') + '|' + String(Boolean(remoteTourney.predictionsClosed));
          if (hash !== this._lastEdgeTourneyHash) {
            this._lastEdgeTourneyHash = hash;
            try {
              localStorage.setItem('hunthub_tourney_state', JSON.stringify(remoteTourney));
              if (typeof remoteTourney.predictionsClosed === 'boolean') {
                localStorage.setItem('hunthub_tourney_preds_closed', remoteTourney.predictionsClosed ? 'true' : 'false');
              }
              localStorage.setItem('hunthub_tourney_active', 'true');
            } catch (_) {}
            this.syncWithTourneyState(remoteTourney);
            this.checkTourneyAccessState();
          }
        }
        const remoteBattle =
          data?.battleState ||
          data?.overlayEvents?.['overlay-battle']?.state ||
          data?.overlayEvents?.['overlay-battle'] ||
          null;
        if (remoteBattle && (remoteBattle.playerA !== undefined || remoteBattle.status)) {
          const bHash = JSON.stringify(remoteBattle);
          if (bHash !== this._lastEdgeBattleHash) {
            this._lastEdgeBattleHash = bHash;
            try { localStorage.setItem('hunthub_battle_state', bHash); } catch (_) {}
            this.renderKoth(remoteBattle);
          }
        }
      } catch (_) {}
    };
    setTimeout(pollRemoteTourneyState, 1200);
    setInterval(pollRemoteTourneyState, 4000);
  }

  checkTourneyAccessState() {
    this.predictionsClosed = localStorage.getItem('hunthub_tourney_preds_closed') === 'true';
    this.isActive = true;
    this.isLocked = localStorage.getItem('hunthub_tourney_pred_locked') === 'true';
    this.renderBracket();
    this.renderStandings();
  }
}

window.tournamentPrediction = new TournamentPredictionController();
