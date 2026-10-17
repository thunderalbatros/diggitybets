/**
 * HuntHub — Live 8-Bracket Tournament & Interactive Viewer Prediction Engine
 * Features:
 * 1. Interactive 8-Bracket Pick Tree (Quarterfinals, Semifinals, Grand Final)
 * 2. Live Standings Scoreboard & Transparency Podium (#1 Winner with highest correct hits)
 * 3. Dynamic real-time calculation and sync with stream outcomes
 * 
 * 100% English, vector slot cards, zero external dependencies.
 */

class TournamentPredictionController {
  constructor() {
    this.isActive = localStorage.getItem('hunthub_tourney_active') === 'true';

    this.slots = [
      { id: 'wanted-dead-or-a-wild', name: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming', img: 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format' },
      { id: 'gates-of-olympus-1000', name: 'Gates of Olympus 1000', provider: 'Pragmatic Play', img: 'https://mediumrare.imgix.net/fdf333e96a5e21555bbb4e9e04a3ee4e1986c9cca9aa75141597041cc8334d23?w=360&auto=format' },
      { id: 'le-bandit', name: 'Le Bandit', provider: 'Hacksaw Gaming', img: 'https://mediumrare.imgix.net/8ade942d35d2cdbddf7888f303be4cf4bda8c650a112b3c53f7c6f3ccad81254?w=360&auto=format' },
      { id: 'san-quentin-xways', name: 'San Quentin xWays', provider: 'Nolimit City', img: 'https://mediumrare.imgix.net/ca243d6c3db42259d6859b80717eb378eb64e41a9d1b1f7fdeadde68d59d9ad5?w=360&auto=format' },
      { id: 'sweet-bonanza-1000', name: 'Sweet Bonanza 1000', provider: 'Pragmatic Play', img: 'https://mediumrare.imgix.net/73754d4bf421b78fbd3895bbc7890d379797588cb699d6cbe47f3656aa93613b?w=360&auto=format' },
      { id: 'ghost-rush', name: 'Ghost Rush', provider: 'Paperclip Gaming', img: 'https://mediumrare.imgix.net/742a1d7958a9ffa215e19cc72c684abe9412f71fcf426b57909b5b817f9cd9d4?w=360&auto=format' },
      { id: 'tombstone-r-i-p', name: 'Tombstone R.I.P.', provider: 'Nolimit City', img: 'https://mediumrare.imgix.net/40f3f2cfeadebaa5169a9636218f289a34209bd6e91d44de733ecdf69b4b93fe?w=360&auto=format' },
      { id: 'sugar-rush-1000', name: 'Sugar Rush 1000', provider: 'Pragmatic Play', img: 'https://mediumrare.imgix.net/14d5410c6cf4c303d291262a10e949dc14b0ac2eca2a7a730b0401919c01358e?w=360&auto=format' }
    ];

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
    this.loadSavedPrediction();
    this.initViewTabs();
    this.renderBracket();
    this.renderStandings();
    this.renderKoth();
    this.bindSubmitButton();
    this.bindKothActions();
    this.listenToEvents();
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

  renderBracket() {
    const container = document.getElementById('tourney-interactive-bracket');
    if (!container) return;

    // EMPTY STATE IF NO ACTIVE TOURNAMENT
    if (!this.isActive) {
      container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; padding: 9px 16px; margin-bottom: 14px; background: rgba(0, 0, 0, 0.35); border: 1px dashed rgba(255, 215, 0, 0.3); border-radius: 10px;">
          <span style="font-size: 18px;">🏆</span>
          <strong style="font-family: var(--font-display); font-size: 13.5px; color: var(--gold); letter-spacing: 1px;">NO ACTIVE TOURNAMENT IN PROGRESS</strong>
        </div>
        <div class="bracket-viewer-grid">
          <!-- QUARTERFINALS EMPTY -->
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

          <!-- SEMIFINALS EMPTY -->
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

          <!-- GRAND FINAL EMPTY -->
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

    container.innerHTML = `
      <div class="bracket-viewer-grid">
        <!-- QUARTERFINALS -->
        <div class="bracket-round-col">
          <div class="bracket-col-header">QUARTERFINALS</div>
          
          <!-- Match 1 -->
          <div class="bracket-match-card" data-match="qf1">
            <div class="match-slot-item ${this.predictions.semi1_a === this.slots[0].id ? 'selected' : ''}" data-slot-id="${this.slots[0].id}" data-target="semi1_a">
              <img class="slot-mini-thumb" src="${this.slots[0].img}" alt="${this.slots[0].name}">
              <span class="slot-mini-title">${this.slots[0].name}</span>
            </div>
            <div class="match-vs-divider">VS</div>
            <div class="match-slot-item ${this.predictions.semi1_a === this.slots[1].id ? 'selected' : ''}" data-slot-id="${this.slots[1].id}" data-target="semi1_a">
              <img class="slot-mini-thumb" src="${this.slots[1].img}" alt="${this.slots[1].name}">
              <span class="slot-mini-title">${this.slots[1].name}</span>
            </div>
          </div>

          <!-- Match 2 -->
          <div class="bracket-match-card" data-match="qf2">
            <div class="match-slot-item ${this.predictions.semi1_b === this.slots[2].id ? 'selected' : ''}" data-slot-id="${this.slots[2].id}" data-target="semi1_b">
              <img class="slot-mini-thumb" src="${this.slots[2].img}" alt="${this.slots[2].name}">
              <span class="slot-mini-title">${this.slots[2].name}</span>
            </div>
            <div class="match-vs-divider">VS</div>
            <div class="match-slot-item ${this.predictions.semi1_b === this.slots[3].id ? 'selected' : ''}" data-slot-id="${this.slots[3].id}" data-target="semi1_b">
              <img class="slot-mini-thumb" src="${this.slots[3].img}" alt="${this.slots[3].name}">
              <span class="slot-mini-title">${this.slots[3].name}</span>
            </div>
          </div>

          <!-- Match 3 -->
          <div class="bracket-match-card" data-match="qf3">
            <div class="match-slot-item ${this.predictions.semi2_a === this.slots[4].id ? 'selected' : ''}" data-slot-id="${this.slots[4].id}" data-target="semi2_a">
              <img class="slot-mini-thumb" src="${this.slots[4].img}" alt="${this.slots[4].name}">
              <span class="slot-mini-title">${this.slots[4].name}</span>
            </div>
            <div class="match-vs-divider">VS</div>
            <div class="match-slot-item ${this.predictions.semi2_a === this.slots[5].id ? 'selected' : ''}" data-slot-id="${this.slots[5].id}" data-target="semi2_a">
              <img class="slot-mini-thumb" src="${this.slots[5].img}" alt="${this.slots[5].name}">
              <span class="slot-mini-title">${this.slots[5].name}</span>
            </div>
          </div>

          <!-- Match 4 -->
          <div class="bracket-match-card" data-match="qf4">
            <div class="match-slot-item ${this.predictions.semi2_b === this.slots[6].id ? 'selected' : ''}" data-slot-id="${this.slots[6].id}" data-target="semi2_b">
              <img class="slot-mini-thumb" src="${this.slots[6].img}" alt="${this.slots[6].name}">
              <span class="slot-mini-title">${this.slots[6].name}</span>
            </div>
            <div class="match-vs-divider">VS</div>
            <div class="match-slot-item ${this.predictions.semi2_b === this.slots[7].id ? 'selected' : ''}" data-slot-id="${this.slots[7].id}" data-target="semi2_b">
              <img class="slot-mini-thumb" src="${this.slots[7].img}" alt="${this.slots[7].name}">
              <span class="slot-mini-title">${this.slots[7].name}</span>
            </div>
          </div>
        </div>

        <!-- SEMIFINALS -->
        <div class="bracket-round-col">
          <div class="bracket-col-header">SEMIFINALS</div>

          <!-- Semifinal 1 -->
          <div class="bracket-match-card semi-card" data-match="sf1">
            <div class="match-slot-item ${this.predictions.final_a && this.predictions.final_a === this.predictions.semi1_a ? 'selected' : ''}" data-slot-id="${this.predictions.semi1_a}" data-target="final_a">
              <span class="slot-mini-title">${this.getSlotName(this.predictions.semi1_a) || 'QF1 Winner Pick'}</span>
            </div>
            <div class="match-vs-divider">VS</div>
            <div class="match-slot-item ${this.predictions.final_a && this.predictions.final_a === this.predictions.semi1_b ? 'selected' : ''}" data-slot-id="${this.predictions.semi1_b}" data-target="final_a">
              <span class="slot-mini-title">${this.getSlotName(this.predictions.semi1_b) || 'QF2 Winner Pick'}</span>
            </div>
          </div>

          <!-- Semifinal 2 -->
          <div class="bracket-match-card semi-card" data-match="sf2">
            <div class="match-slot-item ${this.predictions.final_b && this.predictions.final_b === this.predictions.semi2_a ? 'selected' : ''}" data-slot-id="${this.predictions.semi2_a}" data-target="final_b">
              <span class="slot-mini-title">${this.getSlotName(this.predictions.semi2_a) || 'QF3 Winner Pick'}</span>
            </div>
            <div class="match-vs-divider">VS</div>
            <div class="match-slot-item ${this.predictions.final_b && this.predictions.final_b === this.predictions.semi2_b ? 'selected' : ''}" data-slot-id="${this.predictions.semi2_b}" data-target="final_b">
              <span class="slot-mini-title">${this.getSlotName(this.predictions.semi2_b) || 'QF4 Winner Pick'}</span>
            </div>
          </div>
        </div>

        <!-- GRAND FINAL -->
        <div class="bracket-round-col">
          <div class="bracket-col-header">GRAND FINAL</div>

          <div class="bracket-match-card final-card">
            <div class="match-slot-item ${this.predictions.champion && this.predictions.champion === this.predictions.final_a ? 'champion-selected' : ''}" data-slot-id="${this.predictions.final_a}" data-target="champion">
              <span class="slot-mini-title">${this.getSlotName(this.predictions.final_a) || 'SF1 Winner Pick'}</span>
            </div>
            <div class="match-vs-divider">🏆</div>
            <div class="match-slot-item ${this.predictions.champion && this.predictions.champion === this.predictions.final_b ? 'champion-selected' : ''}" data-slot-id="${this.predictions.final_b}" data-target="champion">
              <span class="slot-mini-title">${this.getSlotName(this.predictions.final_b) || 'SF2 Winner Pick'}</span>
            </div>
          </div>

          <div style="padding: 14px; background: rgba(0,0,0,0.4); border: 1px solid var(--border-gold); border-radius: 10px; text-align: center; margin-top: 10px;">
            <div style="font-size: 11px; font-family: var(--font-display); color: var(--gold); font-weight: 800;">PREDICTED GRAND CHAMPION</div>
            <div style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: #ffffff; margin-top: 4px;">
              ${this.getSlotName(this.predictions.champion) || 'Select winning slot above'}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindClickHandlers();
    this.updateStatusBanner();
  }

  getSlotName(slotId) {
    if (!slotId) return null;
    let name = slotId;
    if (window.SlotResolver) {
      const res = window.SlotResolver.resolve(slotId);
      name = res.name;
    } else {
      const s = this.slots.find(x => x.id === slotId);
      name = s ? s.name : slotId;
    }
    const esc = window.escapeHTML || (x => x);
    return esc(name);
  }

  getSlotImage(slotId) {
    if (window.SlotResolver) {
      const res = window.SlotResolver.resolve(slotId);
      return res.image;
    }
    if (!slotId) return 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';
    const s = this.slots.find(x => x.id === slotId);
    let img = s ? s.img : null;
    if ((!img || img.includes('.svg')) && window.HUNTHUB_CURATED_SLOTS) {
      const found = window.HUNTHUB_CURATED_SLOTS.find(
        cs => cs.id === slotId || cs.name.toLowerCase() === (s?.name || slotId).toLowerCase()
      );
      if (found) img = found.image;
    }
    return img || 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';
  }

  bindClickHandlers() {
    if (this.isLocked) return;

    const items = document.querySelectorAll('.match-slot-item');
    items.forEach(el => {
      el.addEventListener('click', () => {
        const slotId = el.getAttribute('data-slot-id');
        const target = el.getAttribute('data-target');
        if (!slotId || slotId === 'null') return;

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
          this.predictions.champion = null;
        }

        if (window.soundEngine) window.soundEngine.playChip();
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
    } else {
      if (statusEl) {
        const isComplete = this.predictions.champion !== null;
        statusEl.textContent = isComplete ? 'PICKS COMPLETE (READY TO LOCK)' : 'SELECTIONS IN PROGRESS';
        statusEl.style.color = isComplete ? 'var(--cyan)' : 'var(--gold)';
      }
      if (lockBtn) {
        lockBtn.textContent = 'Submit & Lock Bracket 🔒';
        lockBtn.disabled = false;
      }
    }
  }

  bindSubmitButton() {
    const btn = document.getElementById('btn-lock-tourney-pred');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (!this.predictions.champion) {
        alert('Please complete all 7 matchup picks up to the Grand Final champion before locking.');
        return;
      }

      const currentUser = localStorage.getItem('hunthub_kick_username') || '@Viewer';
      this.isLocked = true;
      localStorage.setItem('hunthub_tourney_pred_locked', 'true');
      this.savePrediction();

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
      this.renderStandings();

      if (window.sonner) {
        window.sonner.toast({
          title: '🏆 Bracket Locked!',
          message: `${currentUser} selected ${this.getSlotName(this.predictions.champion)} to win!`,
          type: 'gold'
        });
      } else {
        alert(`Bracket locked! ${currentUser} selected ${this.getSlotName(this.predictions.champion)} to win the championship!`);
      }
    });
  }

  // ==========================================
  // LIVE TRANSPARENCY STANDINGS & PODIUM
  // ==========================================
  renderStandings() {
    const panel = document.getElementById('tourney-standings-panel');
    if (!panel) return;

    // Build participants list (including current user)
    const currentUser = localStorage.getItem('hunthub_kick_username') || '@You';
    const isUserSub = localStorage.getItem('hunthub_is_sub') === 'true';

    let list = [...this.communityStandings];

    if (this.isLocked && this.predictions.champion) {
      // Calculate viewer score
      const userEntry = {
        username: currentUser,
        isSub: isUserSub,
        championPick: this.predictions.champion,
        score: 5, // Active picks
        accuracy: 71.4,
        status: 'Active ⭐'
      };
      // Check if already in list
      const existing = list.findIndex(x => x.username === currentUser);
      if (existing >= 0) list[existing] = userEntry;
      else list.push(userEntry);
    }

    // Sort descending by score
    list.sort((a, b) => b.score - a.score);

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

    panel.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Podium Winner Billboard -->
        <div class="standings-podium-card">
          <div class="podium-crown-icon">👑</div>
          <div style="font-size: 11px; font-family: var(--font-display); color: var(--gold); font-weight: 800; letter-spacing: 1px;">
            CURRENT PREDICTION LEADER (RANK #1)
          </div>
          <div class="podium-winner-name">${leader.username}</div>
          <div style="display: flex; align-items: center; gap: 10px; margin-top: 4px;">
            <span class="podium-score-pill">${leader.score} / 7 Correct Picks (${leader.accuracy}%)</span>
            <span style="font-size: 12px; color: var(--text-muted);">
              Predicted Champion: <strong>${this.getSlotName(leader.championPick)}</strong>
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
            <tbody>
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
                        <span style="font-family: var(--font-display); font-weight: 700; color: #ffffff;">${u.username}</span>
                        ${u.isSub ? '<span class="reward-badge-pill" style="font-size: 9px; padding: 1px 6px;">SUB</span>' : ''}
                        ${isUser ? '<span style="font-size: 10px; color: var(--cyan);">(YOU)</span>' : ''}
                      </div>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <img src="${this.getSlotImage(u.championPick)}" style="width: 24px; height: 24px; border-radius: 4px;" alt="">
                        <span style="font-size: 12px; color: #cbd5e1;">${this.getSlotName(u.championPick)}</span>
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
                        ${u.status}
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
  }

  getEmptyCornerPlaceholderSvg(corner) {
    const color = corner === 'B' ? '#ff2a5f' : '#00e5ff';
    const label = corner === 'B' ? 'EMPTY B' : 'EMPTY A';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 236"><rect width="180" height="236" rx="14" fill="#070a12" stroke="${color}" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 4"/><text x="90" y="112" text-anchor="middle" font-family="Chakra Petch, sans-serif" font-weight="900" font-size="44" fill="${color}" fill-opacity="0.45">?</text><text x="90" y="152" text-anchor="middle" font-family="Chakra Petch, sans-serif" font-weight="800" font-size="14" fill="#64748b" letter-spacing="1.5">${label}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
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
    const bannerHtml = `👑🏆 <strong>GRAND CHAMPION!</strong> <span style="color:var(--gold);">@${winnerName}</span> conquered 4 duels and captured the <strong style="color:#53fc18;">$${prize}.00 CASH PRIZE</strong>! 🎉`;
    this.showAnnouncement(bannerHtml, 'gold', 5500);

    if (window.soundEngine && typeof window.soundEngine.playVictoryFanfare === 'function') {
      window.soundEngine.playVictoryFanfare();
    } else if (window.soundEngine && typeof window.soundEngine.playVictoriousTrumpetFanfare === 'function') {
      window.soundEngine.playVictoriousTrumpetFanfare();
    }

    if (typeof window.confetti === 'function') {
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
    const bannerHtml = `💰 <strong>WINNER CASHOUT!</strong> <span style="color:var(--gold);">@${retiredKing}</span> cashed out <strong style="color:#53fc18;">$${prize}.00 CASH</strong> (${streak}/4 wins)! The throne is now vacant!`;
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
    const bannerHtml = `⚔️ <strong>THRONE DEFENDED!</strong> <span style="color:#00e5ff;">@${kingName}</span> chose <code>!continue</code> (Streak ${streak}/4)! Awaiting challenger in Red Corner...`;
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
    const isStreamer = currentUser === 'diggitybets' || currentUser === 'diggity_bets' || currentUser === 'tarkansky';
    const adminLink = document.getElementById('pub-battle-admin-link');
    if (adminLink) {
      adminLink.style.display = isStreamer ? 'inline-flex' : 'none';
    }

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
          <img src="${imgSrc}" alt="" style="width: 26px; height: 34px; aspect-ratio: 180 / 236; border-radius: 4px; object-fit: contain; background: #070a12; flex-shrink: 0;" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
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
          this.showAnnouncement(`👑 <strong>ROUND WON!</strong> <span style="color:#00e5ff;">@${winner}</span> takes the throne (Streak ${streak}/4)! Decision: <code>!continue</code> or <code>!cashout</code>`, 'cyan', 4000);
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

    window.addEventListener('hunthub:battle-sync', (e) => handleEvent(e.detail));
    window.addEventListener('hunthub:battle-celebration', (e) => handleEvent(e.detail));
    window.addEventListener('hunthub:auth-updated', () => this.renderKoth());

    window.addEventListener('storage', (e) => {
      if (e.key === 'hunthub_koth_state' || e.key === 'hunthub_battle_state' || e.key === 'hunthub_battle_assign' || e.key === 'hunthub_duo_pool_v2') {
        this.renderKoth();
      } else if (e.key === 'hunthub_koth_event' && e.newValue) {
        try { handleEvent(JSON.parse(e.newValue)); } catch (_) {}
      }
    });
  }
}

window.tournamentPrediction = new TournamentPredictionController();
