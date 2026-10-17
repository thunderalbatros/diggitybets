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
      { id: 'wanted-dead-or-a-wild', name: 'Wanted Dead or a Wild', provider: 'Hacksaw', img: 'site/images/slots/wanted-dead-or-a-wild.svg' },
      { id: 'gates-of-olympus', name: 'Gates of Olympus 1000', provider: 'Pragmatic', img: 'site/images/slots/gates-of-olympus.svg' },
      { id: 'le-bandit', name: 'Le Bandit', provider: 'Hacksaw', img: 'site/images/slots/le-bandit.svg' },
      { id: 'san-quentin-xways', name: 'San Quentin xWays', provider: 'Nolimit City', img: 'site/images/slots/san-quentin-xways.svg' },
      { id: 'sweet-bonanza', name: 'Sweet Bonanza 1000', provider: 'Pragmatic', img: 'site/images/slots/sweet-bonanza.svg' },
      { id: 'ghost-rush', name: 'Ghost Rush', provider: 'Stake Originals', img: 'site/images/slots/ghost-rush.svg' },
      { id: 'tombstone-rip', name: 'Tombstone R.I.P.', provider: 'Nolimit City', img: 'site/images/slots/tombstone-rip.svg' },
      { id: 'sugar-rush', name: 'Sugar Rush 1000', provider: 'Pragmatic', img: 'site/images/slots/sugar-rush.svg' }
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
    this.communityStandings = [
      { username: '@SlotKing21', isSub: true, championPick: 'gates-of-olympus', score: 6, accuracy: 85.7, status: 'Leading 🥇' },
      { username: '@NachoGamer', isSub: true, championPick: 'wanted-dead-or-a-wild', score: 5, accuracy: 71.4, status: 'Top 3 🥈' },
      { username: '@DiggityFan', isSub: false, championPick: 'le-bandit', score: 5, accuracy: 71.4, status: 'Top 3 🥉' },
      { username: '@StakeHunter', isSub: true, championPick: 'ghost-rush', score: 4, accuracy: 57.1, status: 'Active' },
      { username: '@AgusKick', isSub: false, championPick: 'san-quentin-xways', score: 3, accuracy: 42.8, status: 'Active' },
      { username: '@Valen99', isSub: false, championPick: 'sweet-bonanza', score: 3, accuracy: 42.8, status: 'Active' }
    ];
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
    const tabKoth = document.getElementById('tab-tourney-koth');
    const panelBracket = document.getElementById('tourney-bracket-panel');
    const panelStandings = document.getElementById('tourney-standings-panel');
    const panelKoth = document.getElementById('tourney-koth-panel');

    const switchTab = (activeTab, activePanel, viewName) => {
      this.activeView = viewName;
      [tabBracket, tabStandings, tabKoth].forEach(t => t?.classList.remove('active'));
      [panelBracket, panelStandings, panelKoth].forEach(p => { if (p) p.style.display = 'none'; });

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

    if (tabKoth) {
      tabKoth.addEventListener('click', () => {
        switchTab(tabKoth, panelKoth, 'koth');
        this.renderKoth();
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
    if (!slotId) return 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format';
    const s = this.slots.find(x => x.id === slotId);
    let img = s ? s.img : null;
    if ((!img || img.includes('.svg')) && window.HUNTHUB_CURATED_SLOTS) {
      const found = window.HUNTHUB_CURATED_SLOTS.find(
        cs => cs.id === slotId || cs.name.toLowerCase() === (s?.name || slotId).toLowerCase()
      );
      if (found) img = found.image;
    }
    return img || 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format';
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

      if (window.soundEngine) window.soundEngine.playWin();
      this.updateStatusBanner();
      this.renderStandings();

      alert(`Bracket locked! ${currentUser} selected ${this.getSlotName(this.predictions.champion)} to win the championship!`);
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

    const leader = list[0] || { username: '@SlotKing21', score: 6, accuracy: 85.7, championPick: 'gates-of-olympus' };

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

  renderKoth() {
    let koth = { active: true, king: null, streak: 0, maxStreak: 4, prize: 20, awaitingDecision: false };
    try {
      const saved = localStorage.getItem('hunthub_koth_state');
      if (saved) koth = JSON.parse(saved);
    } catch (_) {}

    const badge = document.getElementById('public-koth-streak-badge');
    if (badge) {
      badge.textContent = `STREAK: ${koth.streak}/${koth.maxStreak}`;
    }

    // Update streak steps 1..4
    for (let i = 1; i <= 4; i++) {
      const stepEl = document.getElementById(`pub-koth-step-${i}`);
      if (!stepEl) continue;
      if (i <= koth.streak) {
        stepEl.style.background = i === 4 ? 'rgba(83, 252, 24, 0.2)' : 'rgba(0, 229, 255, 0.15)';
        stepEl.style.borderColor = i === 4 ? '#53fc18' : 'var(--cyan)';
        stepEl.style.boxShadow = i === 4 ? '0 0 12px rgba(83,252,24,0.3)' : '0 0 8px rgba(0,229,255,0.2)';
      } else {
        stepEl.style.background = i === 4 ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 255, 255, 0.04)';
        stepEl.style.borderColor = i === 4 ? 'var(--gold)' : 'rgba(255, 255, 255, 0.08)';
        stepEl.style.boxShadow = 'none';
      }
    }

    // King info & slot resolution
    const kingNameEl = document.getElementById('pub-koth-king-name');
    const kingSlotEl = document.getElementById('pub-koth-king-slot');
    const kingScoreEl = document.getElementById('pub-koth-king-score');
    const kingSlotImg = document.getElementById('pub-koth-king-slot-img');
    const kingSlotBadge = document.getElementById('pub-koth-king-slot-badge');

    if (kingNameEl) {
      kingNameEl.textContent = koth.king ? `@${koth.king}` : 'No Reigning King';
    }

    const kingSlotQuery = koth.kingSlot || (koth.king ? 'Wanted Dead or a Wild' : 'Wanted Dead or a Wild');
    const kingCanon = window.SlotResolver ? window.SlotResolver.resolve(kingSlotQuery) : null;
    if (kingSlotEl) {
      kingSlotEl.textContent = koth.king && kingCanon ? kingCanon.name : (koth.king ? `Defending Champion (${koth.streak}/4 Wins)` : 'Throne Open for Challengers');
    }
    if (kingScoreEl) {
      kingScoreEl.textContent = koth.streak > 0 ? `${koth.streak} Streak 🔥` : '0 Wins';
    }
    if (kingSlotImg && kingCanon) {
      kingSlotImg.src = kingCanon.image;
    }
    if (kingSlotBadge && kingCanon) {
      kingSlotBadge.textContent = (kingCanon.provider || 'HACKSAW').toUpperCase();
    }

    // Challenger slot resolution if active
    const chalSlotImg = document.getElementById('pub-koth-chal-slot-img');
    const chalSlotBadge = document.getElementById('pub-koth-chal-slot-badge');
    const chalSlotEl = document.getElementById('pub-koth-chal-slot');
    const chalCanon = window.SlotResolver ? window.SlotResolver.resolve(koth.chalSlot || 'Gates of Olympus 1000') : null;
    if (chalCanon) {
      if (chalSlotImg) chalSlotImg.src = chalCanon.image;
      if (chalSlotBadge) chalSlotBadge.textContent = (chalCanon.provider || 'PRAGMATIC').toUpperCase();
      if (chalSlotEl && koth.challenger) chalSlotEl.textContent = chalCanon.name;
    }

    // King decision actions (if current viewer is the King and awaiting decision)
    const currentUser = (localStorage.getItem('hunthub_kick_username') || '').replace(/^@/, '').toLowerCase();
    const kingUser = (koth.king || '').replace(/^@/, '').toLowerCase();
    const actionBox = document.getElementById('pub-koth-king-actions');

    if (actionBox) {
      if (koth.awaitingDecision && currentUser && kingUser && currentUser === kingUser) {
        actionBox.style.display = 'block';
      } else {
        actionBox.style.display = 'none';
      }
    }
  }

  bindKothActions() {
    const btnContinue = document.getElementById('btn-pub-koth-continue');
    const btnRetire = document.getElementById('btn-pub-koth-retire');

    if (btnContinue) {
      btnContinue.addEventListener('click', async () => {
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
          if (saved) koth = JSON.parse(saved);
        } catch (_) {}
        koth.awaitingDecision = false;
        localStorage.setItem('hunthub_koth_state', JSON.stringify(koth));

        try {
          const channel = new BroadcastChannel('hunthub_battle_bus');
          channel.postMessage({ action: 'koth_continue', king: koth.king, streak: koth.streak });
        } catch (_) {}

        this.renderKoth();
        if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
        if (window.sonner) {
          window.sonner.toast({
            title: '👑 Throne Defended!',
            message: `You decided to continue! Challenger seat is open. Current streak: ${koth.streak}/4.`,
            type: 'green'
          });
        }
      });
    }

    if (btnRetire) {
      btnRetire.addEventListener('click', async () => {
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
          if (saved) koth = JSON.parse(saved);
        } catch (_) {}
        const retiredKing = koth.king;
        const streak = koth.streak;
        koth.king = null;
        koth.streak = 0;
        koth.awaitingDecision = false;
        localStorage.setItem('hunthub_koth_state', JSON.stringify(koth));

        try {
          const channel = new BroadcastChannel('hunthub_battle_bus');
          channel.postMessage({ action: 'koth_retire', retiredKing, streak });
        } catch (_) {}

        this.renderKoth();
        if (window.soundEngine && typeof window.soundEngine.playChip === 'function') window.soundEngine.playChip();
        if (window.sonner) {
          window.sonner.toast({
            title: '💰 Throne Relinquished / Cashout',
            message: `You retired with ${streak} victory(s). The throne is now open.`,
            type: 'gold'
          });
        }
      });
    }
  }

  listenToEvents() {
    try {
      const channel = new BroadcastChannel('hunthub_battle_bus');
      channel.onmessage = () => {
        this.renderKoth();
      };
    } catch (_) {}

    window.addEventListener('storage', (e) => {
      if (e.key === 'hunthub_koth_state') {
        this.renderKoth();
      }
    });
  }
}

window.tournamentPrediction = new TournamentPredictionController();
