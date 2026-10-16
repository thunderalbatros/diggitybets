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
        } else if (e.data.action === 'set_pool') {
          this.pool = e.data.pool;
          this.renderTrack();
        }
      };
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
          } else if (payload.action === 'wheel_duo_queues' || payload.action === 'duo_queues') {
            const q = this.mode === 'tourney' ? payload.tourneyQueue : payload.battleQueue;
            if (q && q.length > 0) {
              this.pool = q.map((item) => ({
                chatter: item.username,
                slot: item.slotName,
                provider: item.slotProvider,
                icon: '🎰',
              }));
              this.renderTrack();
            }
          }
        } catch {}
      };
    } catch {}
  }

  initInteractivity() {
    // 1. Direct Spin button on overlay
    if (this.directSpinBtn) {
      this.directSpinBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.spin();
      });
    }

    // 2. Click on the reel stage
    if (this.containerEl) {
      this.containerEl.addEventListener('click', () => {
        this.spin();
      });
    }

    // 3. Spacebar or Enter to spin
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

  renderTrack() {
    this.trackEl.innerHTML = '';
    const repeats = 15;
    for (let r = 0; r < repeats; r++) {
      this.pool.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'duo-card';
        card.dataset.index = idx;
        const initial = item.chatter.charAt(0).toUpperCase();

        const slotDetails = this.resolveSlotDetails(item.slot);
        const slotImgHtml = slotDetails.image
          ? `<img src="${slotDetails.image}" class="slot-cover-thumb" alt="${item.slot}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="slot-icon-box" style="display:none;">${item.icon || '🎰'}</div>`
          : `<div class="slot-icon-box">${item.icon || '🎰'}</div>`;

        card.innerHTML = `
          <div class="card-user">
            <div class="user-avatar-circle">${initial}</div>
            <div class="user-meta">
              <span class="user-name">@${item.chatter}</span>
              <span class="user-tag">PARTICIPANT</span>
            </div>
          </div>
          <div class="card-divider">⚡</div>
          <div class="card-slot">
            <div class="slot-meta">
              <span class="slot-name">${slotDetails.name || item.slot}</span>
              <span class="slot-prov">${slotDetails.provider || item.provider}</span>
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
    this.mode = mode;
    const tabBattle = document.getElementById('tab-mode-battle');
    const tabTourney = document.getElementById('tab-mode-tourney');
    if (tabBattle && tabTourney) {
      tabBattle.classList.toggle('active', mode === 'battle');
      tabTourney.classList.toggle('active', mode === 'tourney');
    }

    if (this.targetTextEl) {
      if (mode === 'battle') {
        this.targetTextEl.classList.remove('tourney-target');
        this.targetTextEl.textContent = `PLAYER ${this.battleTarget} (${this.battleTarget === 'A' ? 'BLUE CORNER' : 'RED CORNER'})`;
      } else {
        this.targetTextEl.classList.add('tourney-target');
        this.targetTextEl.textContent = `SEED ${this.tourneyCount + 1}/8`;
      }
    }
  }

  spin(mode, spinId, forcedWinner) {
    if (this.isSpinning) return;
    if (mode) this.setMode(mode);

    this.currentSpinId = spinId || ('spin_duo_' + Date.now());

    this.isSpinning = true;
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
        this.onSpinFinished(winnerItem);
      }
    };

    requestAnimationFrame(animate);
  }

  onSpinFinished(winner) {
    this.isSpinning = false;
    if (this.directSpinBtn) {
      this.directSpinBtn.disabled = false;
      this.directSpinBtn.style.opacity = '1';
      this.directSpinBtn.innerHTML = '<span>🎰</span> SPIN DUO WHEEL';
    }
    this.playWinFanfare();

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

    // Display Toast in English
    this.toastTitle.textContent = this.mode === 'battle'
      ? `ASSIGNED TO 1v1 BATTLE (${this.battleTarget === 'A' ? 'BLUE CORNER' : 'RED CORNER'})!`
      : `SEEDED INTO 8-BRACKET TOURNAMENT (SEED ${this.tourneyCount + 1}/8)!`;
    this.toastChatter.textContent = `@${winner.chatter}`;
    this.toastSlot.textContent = winner.slot;
    this.toastEl.classList.add('active');

    // Auto-fill Target System
    if (this.mode === 'battle') {
      this.autoFillBattle(winner, this.battleTarget);
      // Toggle target for next spin
      this.battleTarget = this.battleTarget === 'A' ? 'B' : 'A';
      this.targetTextEl.textContent = `PLAYER ${this.battleTarget} (${this.battleTarget === 'A' ? 'BLUE CORNER' : 'RED CORNER'})`;
    } else {
      this.tourneyCount = (this.tourneyCount % 8) + 1;
      this.autoFillTourney(winner, this.tourneyCount);
      this.targetTextEl.textContent = `SEED ${this.tourneyCount < 8 ? this.tourneyCount + 1 : 1}/8`;
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
