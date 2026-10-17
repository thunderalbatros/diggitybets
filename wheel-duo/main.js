/**
 * HuntHub — Duo Wheel (Participant + Slot) Engine
 * Smooth vertical reel animation, procedural audio synthesis, and automatic Battle/Tourney auto-fill.
 * Exclusively in English.
 */

class DuoWheelApp {
  constructor() {
    this.audioCtx = null;
    this.ws = null;
    this.bcBattle = null;
    this.bcTourney = null;
    this.bcWheel = null;
    this.isSpinning = false;

    // Mode: 'battle' | 'tourney'
    this.mode = 'battle';
    this.battleTarget = 'A'; // 'A' or 'B'
    this.tourneyCount = 0;

    this.pool = this.getDefaultPool();
    this.trackEl = document.getElementById('reel-track');
    this.containerEl = document.getElementById('reel-container');
    this.toastEl = document.getElementById('winner-toast');
    this.modeLabelEl = document.getElementById('target-mode-label');
    this.targetTextEl = document.getElementById('current-target-text');
    this.directSpinBtn = document.getElementById('btn-direct-spin');

    this.toastTitle = document.getElementById('toast-title');
    this.toastChatter = document.getElementById('toast-chatter');
    this.toastSlot = document.getElementById('toast-slot');
    this.currentSpinId = null;

    try {
      const savedMode = localStorage.getItem('hunthub_duo_mode');
      if (savedMode) this.mode = savedMode;
    } catch {}

    this.initAudio();
    this.initChannels();
    this.initWebSocket();
    this.initInteractivity();
    this.renderTrack();
    this.setMode(this.mode);
  }

  initAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) this.audioCtx = new AudioContextClass();
    window.addEventListener('click', () => {
      if (this.audioCtx && this.audioCtx.state === 'suspended') this.audioCtx.resume();
    }, { once: true });
  }

  playTick() {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const now = this.audioCtx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  playWinFanfare() {
    if (!this.audioCtx) return;
    try {
      const notes = [440, 554.37, 659.25, 880];
      const now = this.audioCtx.currentTime;
      notes.forEach((f, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const t = now + i * 0.1;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + 0.45);
      });
    } catch {}
  }

  syncTargetFromBattleState(state) {
    if (!state) return;
    if (!state.playerA && !state.playerB) {
      this.battleTarget = 'A';
    } else if (state.playerA && !state.playerB) {
      this.battleTarget = 'B';
    } else if (!state.playerA && state.playerB) {
      this.battleTarget = 'A';
    }
    this.updateTargetPillUI();
  }

  updateTargetPillUI() {
    if (!this.targetTextEl) return;
    if (this.mode === 'battle') {
      this.targetTextEl.classList.remove('tourney-target');
      this.targetTextEl.classList.toggle('target-blue', this.battleTarget === 'A');
      this.targetTextEl.classList.toggle('target-red', this.battleTarget === 'B');
      this.targetTextEl.textContent = `PLAYER ${this.battleTarget} (${this.battleTarget === 'A' ? 'BLUE CORNER' : 'RED CORNER'})`;
    } else {
      this.targetTextEl.classList.remove('target-blue', 'target-red');
      this.targetTextEl.classList.add('tourney-target');
      this.targetTextEl.textContent = `SEED ${this.tourneyCount + 1}/8`;
    }
  }

  addQueueEntry(entry, targetMode) {
    if (!entry || !entry.username && !entry.chatter) return;
    const uname = entry.username || entry.chatter;
    const sName = entry.slotName || entry.slot || 'Wanted Dead or a Wild';
    const resolved = this.resolveSlotDetails(sName);
    if (targetMode && targetMode !== this.mode) return;

    const existingIdx = this.pool.findIndex(p => (p.chatter || '').toLowerCase() === uname.toLowerCase());
    const newItem = {
      chatter: uname,
      avatar: entry.avatar || '',
      slot: resolved.name,
      provider: resolved.provider,
      icon: '🎰',
    };
    if (existingIdx !== -1) {
      this.pool[existingIdx] = newItem;
    } else {
      this.pool.push(newItem);
    }
    if (!this.isSpinning) {
      this.renderTrack();
    } else {
      this.updateQueueBadge();
    }
  }

  initChannels() {
    try {
      this.bcBattle = new BroadcastChannel('hunthub_battle');
      this.bcTourney = new BroadcastChannel('hunthub_tourney');
      this.bcWheel = new BroadcastChannel('hunthub_duo_wheel');

      this.bcWheel.onmessage = (e) => {
        if (!e.data) return;
        if (e.data.action === 'spin') {
          this.spin(e.data.mode);
        } else if (e.data.action === 'set_mode') {
          this.setMode(e.data.mode);
        } else if (e.data.action === 'set_target' && (e.data.target === 'A' || e.data.target === 'B')) {
          this.battleTarget = e.data.target;
          this.updateTargetPillUI();
        } else if (e.data.action === 'set_pool' && Array.isArray(e.data.pool)) {
          this.pool = e.data.pool;
          this.renderTrack();
        } else if (e.data.action === 'add_entry' && e.data.entry) {
          this.addQueueEntry(e.data.entry, e.data.mode);
        }
      };

      this.bcBattle.onmessage = (e) => {
        if (!e.data) return;
        if (e.data.action === 'reset' || e.data.action === 'cashout') {
          this.battleTarget = 'A';
          this.updateTargetPillUI();
        } else if (e.data.action === 'koth_next_challenger' || e.data.action === 'continue') {
          this.battleTarget = 'B';
          this.updateTargetPillUI();
        } else if (e.data.action === 'state_sync' && e.data.state) {
          this.syncTargetFromBattleState(e.data.state);
        }
      };
    } catch {}

    // Initialize target from current saved battle state if present
    try {
      const savedBattle = JSON.parse(localStorage.getItem('hunthub_battle_state') || 'null');
      if (savedBattle) this.syncTargetFromBattleState(savedBattle);
    } catch {}

    // Cross-window localStorage sync fallback
    window.addEventListener('storage', (e) => {
      if (e.key === 'hunthub_duo_mode' && e.newValue) {
        this.setMode(e.newValue);
      } else if (e.key === 'hunthub_duo_spin_cmd' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          this.spin(parsed.mode);
        } catch {}
      } else if (e.key === 'hunthub_battle_state' && e.newValue) {
        try {
          const st = JSON.parse(e.newValue);
          this.syncTargetFromBattleState(st);
        } catch {}
      } else if (e.key === 'hunthub_battle_cmd' && e.newValue) {
        try {
          const cmd = JSON.parse(e.newValue);
          if (cmd.action === 'reset' || cmd.action === 'cashout') {
            this.battleTarget = 'A';
            this.updateTargetPillUI();
          } else if (cmd.action === 'koth_next_challenger' || cmd.action === 'continue') {
            this.battleTarget = 'B';
            this.updateTargetPillUI();
          }
        } catch {}
      } else if (e.key === 'hunthub_duo_queue_add' && e.newValue) {
        try {
          const payload = JSON.parse(e.newValue);
          this.addQueueEntry(payload.entry, payload.mode);
        } catch {}
      }
    });
  }

  initWebSocket() {
    const wsUrl = 'ws://127.0.0.1:3001/';
    try {
      this.ws = new WebSocket(wsUrl);
      this.ws.onopen = () => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ action: 'get_duo_queues' }));
        }
      };
      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.action === 'spin_duo') {
            this.spin(payload.mode, payload.spinId, payload.winner);
          } else if (payload.action === 'duo_mode_changed' && payload.mode) {
            this.setMode(payload.mode);
          } else if (payload.type === 'battle_state' && payload.data) {
            this.syncTargetFromBattleState(payload.data);
          } else if (payload.action === 'wheel_duo_queues' || payload.action === 'duo_queues') {
            const q = this.mode === 'tourney' ? payload.tourneyQueue : payload.battleQueue;
            if (q && q.length > 0) {
              this.pool = q.map((item) => ({
                chatter: item.username,
                avatar: item.avatar || '',
                slot: item.slotName,
                provider: item.slotProvider,
                icon: '🎰',
              }));
              if (!this.isSpinning) this.renderTrack();
            }
          }
        } catch {}
      };
      this.ws.onclose = () => {
        setTimeout(() => this.initWebSocket(), 2500);
      };
      this.ws.onerror = () => {};
    } catch {}

    // Cross-process HTTP /api/sync/state fallback for OBS Browser Source
    if (!this._syncIntervalStarted) {
      this._syncIntervalStarted = true;
      this._lastEventTs = 0;
      setInterval(async () => {
        try {
          const res = await fetch('http://127.0.0.1:3001/api/sync/state');
          if (!res.ok) return;
          const data = await res.json();
          if (data?.battle) {
            this.syncTargetFromBattleState(data.battle);
          }
          const duoQueues = data?.overlays?.duoQueues;
          if (duoQueues && !this.isSpinning) {
            const q = this.mode === 'tourney' ? duoQueues.tourneyQueue : duoQueues.battleQueue;
            if (Array.isArray(q) && q.length > 0 && q.length !== this.pool.length) {
              this.pool = q.map((item) => ({
                chatter: item.username,
                avatar: item.avatar || '',
                slot: item.slotName,
                provider: item.slotProvider,
                icon: '🎰',
              }));
              this.renderTrack();
            }
          }
          const evt = data?.overlays?.lastOverlayEvent;
          if (evt && evt.ts && evt.ts > this._lastEventTs) {
            this._lastEventTs = evt.ts;
            if (evt.targetOverlay === 'wheel-duo' && evt.action === 'spin') {
              this.spin(evt.mode, evt.spinId, evt.winner);
            }
          }
        } catch {}
      }, 1500);
    }
  }

  initInteractivity() {
    // 1. Direct Spin button on overlay
    if (this.directSpinBtn) {
      this.directSpinBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.spin();
      });
    }

    // 2. Click on Target Pill to toggle Player A (Blue Corner) / Player B (Red Corner)
    if (this.targetTextEl) {
      this.targetTextEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.mode === 'battle') {
          this.battleTarget = this.battleTarget === 'A' ? 'B' : 'A';
          this.updateTargetPillUI();
        }
      });
    }

    // 3. Click on the reel stage
    if (this.containerEl) {
      this.containerEl.addEventListener('click', () => {
        this.spin();
      });
    }

    // 4. Spacebar or Enter to spin
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        this.spin();
      }
    });
  }

  assignRandomSlot() {
    if (window.SlotResolver) {
      const cat = window.SlotResolver.getCuratedCatalog();
      if (cat && cat.length > 0) {
        const s = cat[Math.floor(Math.random() * cat.length)];
        return { slot: s.name, provider: s.provider, icon: '🎰' };
      }
    }
    const curated = window.HUNTHUB_CURATED_SLOTS || [];
    if (window.SLOT_TIERS && typeof window.SLOT_TIERS.pickWeightedSlot === 'function' && curated.length > 0) {
      const s = window.SLOT_TIERS.pickWeightedSlot(curated);
      return { slot: s.name, provider: s.provider, icon: '🎰' };
    }
    return { slot: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming', icon: '🤠' };
  }

  getDefaultPool() {
    return [
      { chatter: 'LuckyStriker', slot: 'Wanted Dead or a Wild', provider: 'Hacksaw', icon: '🤠' },
      { chatter: 'VegasKing', slot: 'Gates of Olympus 1000', provider: 'Pragmatic', icon: '⚡' },
      { chatter: 'SlotQueen', slot: 'Waylanders Forge', provider: 'Valkyrie', icon: '⚔️' },
      { chatter: 'SpinMaster', slot: 'Sugar Rush 1000', provider: 'Pragmatic', icon: '🍬' },
      { chatter: 'Strike777', slot: 'Le Bandit', provider: 'Hacksaw', icon: '🦝' },
      { chatter: 'BigBassBob', slot: 'Big Bass Splash', provider: 'Pragmatic', icon: '🎣' },
      { chatter: 'NeonWolf', slot: 'Sharks!', provider: 'Pragmatic', icon: '🦈' },
      { chatter: 'RoyalFlush', slot: 'Ganja Snail', provider: 'Donut Gaming', icon: '🐌' },
    ];
  }

  getDeterministicAvatarGradient(username) {
    const str = String(username || 'User');
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const palettes = [
      'linear-gradient(135deg, #0091ea, #00e5ff)',
      'linear-gradient(135deg, #ff2a5f, #ff758c)',
      'linear-gradient(135deg, #7c4dff, #b388ff)',
      'linear-gradient(135deg, #00c853, #53fc18)',
      'linear-gradient(135deg, #ff9100, #ffd700)',
    ];
    return palettes[Math.abs(hash) % palettes.length];
  }

  updateQueueBadge() {
    const qEl = document.getElementById('duo-queue-counter');
    if (qEl) {
      qEl.textContent = `QUEUE: ${this.pool.length}`;
    }
  }

  renderTrack() {
    this.trackEl.innerHTML = '';
    this.trackEl.style.transition = 'none';
    this.trackEl.style.transform = 'translateY(0px)';
    this.updateQueueBadge();
    const repeats = 15;
    for (let r = 0; r < repeats; r++) {
      this.pool.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'duo-card';
        card.dataset.index = idx;
        const initial = item.chatter.slice(0, 2).toUpperCase();
        const avatarGrad = this.getDeterministicAvatarGradient(item.chatter);
        const avatarHtml = item.avatar
          ? `<div class="user-avatar-circle" style="background:${avatarGrad}"><img src="${item.avatar}" alt="${item.chatter}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.textContent='${initial}';" /></div>`
          : `<div class="user-avatar-circle" style="background:${avatarGrad}">${initial}</div>`;

        const slotDetails = this.resolveSlotDetails(item.slot);
        const resolvedName = slotDetails.name || item.slot || 'Casino Slot';
        const resolvedProv = slotDetails.provider || item.provider || 'CASINO';
        const fallbackUri = (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function')
          ? window.SlotResolver.generateDataUriCard(resolvedName, resolvedProv)
          : '';
        const coverSrc = slotDetails.image || fallbackUri;
        const slotImgHtml = coverSrc
          ? `<img src="${coverSrc}" class="slot-cover-thumb" alt="" data-fallback="${fallbackUri}" onerror="if(this.dataset.fallback && this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}else{this.style.display='none';this.nextElementSibling.style.display='flex';}" /><div class="slot-icon-box" style="display:none;">${item.icon || '🎰'}</div>`
          : `<div class="slot-icon-box">${item.icon || '🎰'}</div>`;

        card.innerHTML = `
          <div class="card-user">
            ${avatarHtml}
            <div class="user-meta">
              <span class="user-name">@${item.chatter}</span>
              <span class="user-tag">${this.mode === 'tourney' ? '!TOURNEY CALL' : '!BATTLE CALL'}</span>
            </div>
          </div>
          <div class="card-divider">⚡</div>
          <div class="card-slot">
            <div class="slot-meta">
              <span class="slot-name">${resolvedName}</span>
              <span class="slot-prov">${resolvedProv}</span>
            </div>
            ${slotImgHtml}
          </div>
        `;
        this.trackEl.appendChild(card);
      });
    }
  }

  resolveSlotDetails(slotName) {
    if (!slotName) return { name: 'Unknown Slot', provider: 'Casino', image: '' };
    if (window.SlotResolver) {
      return window.SlotResolver.resolve(slotName, '../');
    }
    const curated = window.HUNTHUB_CURATED_SLOTS || [];
    const normalized = slotName.trim().toLowerCase();
    const found = curated.find((s) => s.name.toLowerCase() === normalized || s.name.toLowerCase().includes(normalized));
    if (found) {
      return {
        name: found.name,
        provider: found.provider,
        image: found.image || '',
      };
    }
    return {
      name: slotName,
      provider: 'Casino Slot',
      image: '',
    };
  }

  setMode(mode) {
    const changed = this.mode !== mode;
    this.mode = mode;
    const wrapper = document.getElementById('wheel-wrapper');
    if (changed && wrapper) {
      wrapper.classList.remove('mode-switching');
      void wrapper.offsetWidth;
      wrapper.classList.add('mode-switching');
    }
    const tabBattle = document.getElementById('tab-mode-battle');
    const tabTourney = document.getElementById('tab-mode-tourney');
    if (tabBattle && tabTourney) {
      tabBattle.classList.toggle('active', mode === 'battle');
      tabTourney.classList.toggle('active', mode === 'tourney');
    }

    this.updateTargetPillUI();
    this.updateQueueBadge();
  }

  spin(mode, spinId, forcedWinner) {
    if (this.isSpinning) return;
    if (mode) this.setMode(mode);
    if (this._toastHideTimer) {
      clearTimeout(this._toastHideTimer);
      this._toastHideTimer = null;
    }
    if (this._pendingPoolRemoval) {
      this._pendingPoolRemoval();
      this._pendingPoolRemoval = null;
    }

    if (!this.pool || this.pool.length === 0) {
      this.pool = this.getDefaultPool();
      this.renderTrack();
    }

    this.currentSpinId = spinId || ('spin_duo_' + Date.now());

    this.isSpinning = true;
    this.trackEl.querySelectorAll('.winner-border-glow').forEach((el) => el.classList.remove('winner-border-glow'));
    if (this.directSpinBtn) {
      this.directSpinBtn.disabled = true;
      this.directSpinBtn.style.opacity = '0.5';
      this.directSpinBtn.innerHTML = '<span>⏳</span> ROLLING...';
    }
    this.toastEl.classList.remove('active');

    // Pick winner index
    let winnerIdx = -1;
    let winnerItem = null;
    if (forcedWinner) {
      const targetName = typeof forcedWinner === 'string' ? forcedWinner : (forcedWinner.username || forcedWinner.chatter);
      winnerIdx = this.pool.findIndex(p => (p.chatter || '').toLowerCase() === (targetName || '').toLowerCase());
      if (winnerIdx === -1 && typeof forcedWinner === 'object') {
        this.pool.push({
          chatter: forcedWinner.username || forcedWinner.chatter,
          slot: forcedWinner.slotName || forcedWinner.slot || 'Wanted Dead or a Wild',
          provider: forcedWinner.slotProvider || forcedWinner.provider || 'Hacksaw',
          icon: '🎰'
        });
        winnerIdx = this.pool.length - 1;
        this.renderTrack();
      }
    }
    if (winnerIdx === -1) {
      winnerIdx = Math.floor(Math.random() * this.pool.length);
    }
    winnerItem = this.pool[winnerIdx] || this.pool[0];

    // Card height + margin = 96px
    const cardHeight = 96;
    const targetCardIndex = (10 * this.pool.length) + winnerIdx;
    this._lastTargetCardIndex = targetCardIndex;
    const targetScrollY = (targetCardIndex * cardHeight) - (200 - 48);

    const startTime = performance.now();
    const duration = 5200; // 5.2s spin
    let lastTickCard = -1;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Decelerating cubic easing
      const ease = 1 - Math.pow(1 - progress, 3.5);
      const currentY = targetScrollY * ease;

      this.trackEl.style.transform = `translateY(-${currentY}px)`;

      // Ticker sounds
      const currentCard = Math.floor(currentY / cardHeight);
      if (currentCard !== lastTickCard) {
        lastTickCard = currentCard;
        this.playTick();
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.onSpinFinished(winnerItem, winnerIdx);
      }
    };

    requestAnimationFrame(animate);
  }

  onSpinFinished(winner, winnerIdx) {
    this.isSpinning = false;
    if (this.directSpinBtn) {
      this.directSpinBtn.disabled = false;
      this.directSpinBtn.style.opacity = '1';
      this.directSpinBtn.innerHTML = '<span>🎰</span> SPIN DUO WHEEL';
    }
    this.playWinFanfare();

    // Golden BorderGlow flash on winning duo card
    if (typeof this._lastTargetCardIndex === 'number' && this.trackEl.children[this._lastTargetCardIndex]) {
      this.trackEl.children[this._lastTargetCardIndex].classList.add('winner-border-glow');
    }

    // Send spin_animation_complete handshake to backend for instant synchronized chat announcement
    if (this.currentSpinId) {
      const finishedSpinId = this.currentSpinId;
      this.currentSpinId = null;
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        try {
          this.ws.send(JSON.stringify({ action: 'spin_animation_complete', spinId: finishedSpinId }));
        } catch (_) {}
      }
      fetch('/api/wheel/spin-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spinId: finishedSpinId }),
      }).catch(() => {});
    }

    if (window.confetti) {
      window.confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.65 },
        colors: ['#ffd700', '#00e5ff', '#ff2a5f', '#ffffff'],
      });
    }

    const slotDetails = this.resolveSlotDetails(winner.slot);
    const assignedCorner = this.battleTarget;

    // Display Centered Winner Toast in English with exact resolved slot name
    this.toastTitle.textContent = this.mode === 'battle'
      ? `ASSIGNED TO 1v1 BATTLE (${assignedCorner === 'A' ? 'BLUE CORNER' : 'RED CORNER'})!`
      : `SEEDED INTO 8-BRACKET TOURNAMENT (SEED ${this.tourneyCount + 1}/8)!`;
    this.toastChatter.textContent = `@${winner.chatter}`;
    this.toastSlot.textContent = slotDetails.name || winner.slot;
    this.toastEl.classList.add('active');

    // Remove winner from pool so the same player cannot be selected twice
    const winnerNameLower = (winner.chatter || '').toLowerCase();
    this.pool = this.pool.filter((item, idx) => idx !== winnerIdx && (item.chatter || '').toLowerCase() !== winnerNameLower);
    this.updateQueueBadge();

    // Notify backend queue removal if running
    fetch('http://127.0.0.1:3001/api/wheel/duo/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: this.mode, username: winner.chatter }),
    }).catch(() => {});

    this._pendingPoolRemoval = () => {
      if (this.pool.length > 0 && !this.isSpinning) {
        this.renderTrack();
      }
    };

    // Auto-hide toast after 4.5s and refresh track without the selected winner
    this._toastHideTimer = setTimeout(() => {
      this.toastEl.classList.remove('active');
      if (this._pendingPoolRemoval) {
        this._pendingPoolRemoval();
        this._pendingPoolRemoval = null;
      }
    }, 4500);

    // Auto-fill Target System
    if (this.mode === 'battle') {
      this.autoFillBattle(winner, assignedCorner);
      // Toggle target for next spin: A -> B, B -> A
      this.battleTarget = assignedCorner === 'A' ? 'B' : 'A';
      this.updateTargetPillUI();
    } else {
      this.tourneyCount = (this.tourneyCount % 8) + 1;
      this.autoFillTourney(winner, this.tourneyCount);
      this.updateTargetPillUI();
    }
  }

  async autoFillBattle(item, slotKey) {
    const slotDetails = this.resolveSlotDetails(item.slot);
    console.log(`[Duo Wheel] Auto-filling Battle Player ${slotKey}: @${item.chatter} (${slotDetails.name})`);

    const playerObj = {
      userId: `u_${item.chatter}`,
      kickId: Math.floor(1000 + Math.random() * 9000),
      username: item.chatter,
      displayName: item.chatter,
      avatar: '',
      slotName: slotDetails.name,
      slotProvider: slotDetails.provider || item.provider || 'Casino Slot',
      slotImage: slotDetails.image || '',
      winAmount: 0,
      multiplier: 0,
    };

    // 1. BroadcastChannel
    if (this.bcBattle) {
      this.bcBattle.postMessage({
        action: 'assign_player',
        playerSlot: slotKey,
        player: playerObj,
        timestamp: Date.now(),
      });
    }

    // 2. LocalStorage cross-window storage event fallback
    try {
      localStorage.setItem('hunthub_battle_assign', JSON.stringify({
        playerSlot: slotKey,
        player: playerObj,
        timestamp: Date.now(),
      }));

      // Update hunthub_battle_state directly in localStorage
      let battleState = null;
      try {
        battleState = JSON.parse(localStorage.getItem('hunthub_battle_state') || 'null');
      } catch {}
      if (!battleState) {
        battleState = {
          id: 'battle_' + Date.now(),
          status: 'LOBBY',
          betAmount: 10,
          prizeText: '$50.00 POOL',
          playerA: null,
          playerB: null,
          winner: null,
        };
      }
      if (slotKey === 'A') battleState.playerA = playerObj;
      if (slotKey === 'B') battleState.playerB = playerObj;
      if (battleState.playerA && battleState.playerB) battleState.status = 'READY';

      localStorage.setItem('hunthub_battle_state', JSON.stringify(battleState));
    } catch (e) {
      console.warn('[Duo Wheel] LocalStorage save error:', e);
    }

    // 3. HTTP Server fallback if online
    try {
      await fetch('http://127.0.0.1:3001/api/battle/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: playerObj, slot: { name: slotDetails.name, provider: slotDetails.provider } }),
      });
    } catch {}
  }

  async autoFillTourney(item, seed) {
    const slotDetails = this.resolveSlotDetails(item.slot);
    console.log(`[Duo Wheel] Auto-filling Tourney Seed ${seed}: @${item.chatter} (${slotDetails.name})`);

    const participantObj = {
      id: `p_${seed}`,
      kickId: Math.floor(1000 + Math.random() * 9000),
      username: item.chatter,
      displayName: item.chatter,
      slotName: slotDetails.name,
      slotProvider: slotDetails.provider || item.provider || 'Casino Slot',
      slotImage: slotDetails.image || '',
      seed,
    };

    // 1. BroadcastChannel
    if (this.bcTourney) {
      this.bcTourney.postMessage({
        action: 'add_participant',
        participant: participantObj,
        timestamp: Date.now(),
      });
    }

    // 2. LocalStorage fallback
    try {
      localStorage.setItem('hunthub_tourney_add_player', JSON.stringify({
        participant: participantObj,
        timestamp: Date.now(),
      }));
    } catch {}

    // 3. HTTP Server if running
    try {
      await fetch('http://127.0.0.1:3001/api/tourney/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: participantObj, slotName: slotDetails.name }),
      });
    } catch {}
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.duoWheel = new DuoWheelApp();
});
