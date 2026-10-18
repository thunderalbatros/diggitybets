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

    const purged = localStorage.getItem('hunthub_demo_users_purged') === 'true' || localStorage.getItem('hunthub_demo_users_purged_live_v2') === 'true';
    let savedPool = null;
    try {
      savedPool = JSON.parse(localStorage.getItem('hunthub_duo_pool_v2') || 'null');
    } catch {}
    if (Array.isArray(savedPool)) {
      const demoUsernames = new Set([
        'luckystriker', 'vegasking', 'slotqueen', 'spinmaster', 'strike777',
        'bigbassbob', 'neonwolf', 'royalflush', 'nachogamer', 'slotking21',
        'diggityfan', 'cryptospin', 'aguskick', 'valen99', 'stakehunter',
        'kickviewer01', 'charlybets', 'zeusmax_21', 'slothunter_ar'
      ]);
      this.pool = savedPool.filter(p => {
        const u = String(p.chatter || p.user || '').trim().toLowerCase().replace(/^@/, '');
        return u && !demoUsernames.has(u);
      });
    } else {
      this.pool = purged ? [] : this.getDefaultPool();
    }
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

  playBrassNote(freq, startTime, duration, volume = 0.35, isStaccato = false) {
    if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
    try {
      const t = startTime;
      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(volume, t);

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.setValueAtTime(3.6, t);

      const minCutoff = Math.max(320, freq * 1.2);
      const peakCutoff = Math.min(6800, freq * 5.4);
      const sustainCutoff = Math.min(4200, freq * 3.2);

      filter.frequency.setValueAtTime(minCutoff, t);
      filter.frequency.exponentialRampToValueAtTime(peakCutoff, t + 0.042);
      filter.frequency.exponentialRampToValueAtTime(sustainCutoff, t + (isStaccato ? 0.09 : 0.22));

      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, t);
      osc2.frequency.setValueAtTime(freq, t);
      osc1.detune.setValueAtTime(-7, t);
      osc2.detune.setValueAtTime(7, t);

      const subOsc = this.audioCtx.createOscillator();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 0.5, t);
      const subGain = this.audioCtx.createGain();
      subGain.gain.setValueAtTime(0.24, t);
      subOsc.connect(subGain);
      subGain.connect(filter);

      if (!isStaccato && duration > 0.25) {
        try {
          const lfo = this.audioCtx.createOscillator();
          const lfoGain = this.audioCtx.createGain();
          lfo.type = 'sine';
          lfo.frequency.setValueAtTime(5.3, t);
          lfoGain.gain.setValueAtTime(0, t);
          lfoGain.gain.setValueAtTime(0, t + 0.16);
          lfoGain.gain.linearRampToValueAtTime(freq * 0.022, t + 0.38);
          lfo.connect(osc1.frequency);
          lfo.connect(osc2.frequency);
          lfo.start(t + 0.16);
          lfo.stop(t + duration + 0.1);
        } catch (_) {}
      }

      const noteGain = this.audioCtx.createGain();
      const attackTime = isStaccato ? 0.018 : 0.035;
      const releaseTime = isStaccato ? 0.06 : 0.25;

      noteGain.gain.setValueAtTime(0.001, t);
      noteGain.gain.exponentialRampToValueAtTime(1.0, t + attackTime);

      if (isStaccato) {
        noteGain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      } else {
        noteGain.gain.setValueAtTime(0.85, t + attackTime + 0.05);
        noteGain.gain.setValueAtTime(0.85, t + duration - releaseTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, t + duration + releaseTime);
      }

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);
      masterGain.connect(this.audioCtx.destination);

      const stopTime = t + duration + releaseTime + 0.05;
      osc1.start(t);
      osc2.start(t);
      subOsc.start(t);
      osc1.stop(stopTime);
      osc2.stop(stopTime);
      subOsc.stop(stopTime);
    } catch (_) {}
  }

  playWinFanfare() {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;

      // Royal Entrance Motif in D Major
      const motif = [
        { freq: 440.00, time: 0.00, dur: 0.11, staccato: true,  vol: 0.38 },
        { freq: 440.00, time: 0.13, dur: 0.11, staccato: true,  vol: 0.38 },
        { freq: 440.00, time: 0.26, dur: 0.11, staccato: true,  vol: 0.42 },
        { freq: 587.33, time: 0.39, dur: 0.36, staccato: false, vol: 0.48 },
        { freq: 440.00, time: 0.80, dur: 0.12, staccato: true,  vol: 0.38 },
        { freq: 587.33, time: 0.94, dur: 0.18, staccato: false, vol: 0.44 },
        { freq: 739.99, time: 1.15, dur: 0.22, staccato: false, vol: 0.50 },
      ];

      motif.forEach(n => {
        this.playBrassNote(n.freq, now + n.time, n.dur, n.vol, n.staccato);
      });

      // Grand Climax 5-Horn Chord at T + 1.42s
      const climaxTime = now + 1.42;
      const chord = [
        { freq: 293.66, dur: 1.25, vol: 0.34 },
        { freq: 440.00, dur: 1.30, vol: 0.36 },
        { freq: 587.33, dur: 1.35, vol: 0.40 },
        { freq: 739.99, dur: 1.40, vol: 0.44 },
        { freq: 880.00, dur: 1.45, vol: 0.48 },
      ];

      chord.forEach(c => {
        this.playBrassNote(c.freq, climaxTime, c.dur, c.vol, false);
      });
    } catch (_) {}
  }

  syncTargetFromBattleState(state) {
    if (!state || this.isSpinning) return;
    const hasA = Boolean(state.playerA && (state.playerA.username || state.playerA.name));
    const hasB = Boolean(state.playerB && (state.playerB.username || state.playerB.name));
    if (!hasA && !hasB) {
      this.battleTarget = 'A';
    } else if (hasA && !hasB) {
      this.battleTarget = 'B';
    } else if (!hasA && hasB) {
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
      const nextSeed = (this.tourneyCount % 8) + 1;
      this.targetTextEl.classList.remove('target-blue', 'target-red');
      this.targetTextEl.classList.add('tourney-target');
      this.targetTextEl.textContent = `SEED ${nextSeed}/8`;
    }
  }

  addQueueEntry(entry, targetMode) {
    if (!entry || !entry.username && !entry.chatter) return;
    const uname = String(entry.username || entry.chatter).trim().replace(/^@/, '');
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
    try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.pool)); } catch {}
    if (!this.isSpinning) {
      this.renderTrack();
    } else {
      this.updateQueueBadge();
    }
  }

  initChannels() {
    try {
      const savedSeedCount = Number(localStorage.getItem('hunthub_tourney_seed_count') || 0);
      if (!isNaN(savedSeedCount) && savedSeedCount >= 0 && savedSeedCount < 8) {
        this.tourneyCount = savedSeedCount;
      }
      const savedPool = JSON.parse(localStorage.getItem('hunthub_duo_pool_v2') || 'null');
      const purged = localStorage.getItem('hunthub_demo_users_purged') === 'true' || localStorage.getItem('hunthub_demo_users_purged_live_v2') === 'true';
      if (Array.isArray(savedPool) && (savedPool.length > 0 || purged)) {
        this.pool = savedPool.map(p => ({
          user: p.user || p.chatter || 'Viewer',
          chatter: p.chatter || p.user || 'Viewer',
          slot: p.slot || 'Wanted Dead or a Wild'
        }));
      } else {
        localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.pool));
      }
    } catch {}

    try {
      this.bcBattle = new BroadcastChannel('hunthub_battle');
      this.bcTourney = new BroadcastChannel('hunthub_tourney');
      this.bcWheel = new BroadcastChannel('hunthub_duo_wheel');

      this.bcWheel.onmessage = (e) => {
        if (!e.data) return;
        if (e.data.action === 'spin') {
          this.spin(e.data.mode, e.data.spinId, e.data.winner, e.data.targetCorner, e.data.targetSeed);
        } else if (e.data.action === 'set_mode') {
          if (typeof e.data.tourneyCount === 'number' && !this.isSpinning) {
            this.tourneyCount = Math.max(0, Math.min(7, e.data.tourneyCount));
          }
          this.setMode(e.data.mode, true);
        } else if (e.data.action === 'set_tourney_seed' && typeof e.data.tourneyCount === 'number') {
          if (!this.isSpinning) {
            this.tourneyCount = Math.max(0, Math.min(7, e.data.tourneyCount));
            this.updateTargetPillUI();
          }
        } else if ((e.data.action === 'set_target' || e.data.action === 'set_target_corner') && ((e.data.target || e.data.corner) === 'A' || (e.data.target || e.data.corner) === 'B')) {
          if (!this.isSpinning) {
            this.battleTarget = e.data.target || e.data.corner;
            this.updateTargetPillUI();
          }
        } else if ((e.data.action === 'set_pool' || e.data.type === 'sync_pool') && Array.isArray(e.data.pool || e.data.items)) {
          const incoming = e.data.pool || e.data.items;
          this.pool = incoming.map(p => ({
            user: p.user || p.chatter || 'Viewer',
            chatter: p.chatter || p.user || 'Viewer',
            slot: p.slot || 'Wanted Dead or a Wild'
          }));
          try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.pool)); } catch {}
          if (!this.isSpinning) this.renderTrack();
        } else if (e.data.action === 'add_entry' && e.data.entry) {
          this.addQueueEntry(e.data.entry, e.data.mode);
        }
      };

      this.bcTourney.onmessage = (e) => {
        if (!e.data) return;
        if (e.data.action === 'reset_tourney' && !this.isSpinning) {
          this.tourneyCount = 0;
          this.updateTargetPillUI();
        }
      };

      this.bcBattle.onmessage = (e) => {
        if (!e.data) return;
        if (e.data.action === 'reset' || e.data.action === 'reset_battle' || e.data.type === 'RESET_BATTLE' || e.data.action === 'cashout' || e.data.action === 'koth_retire') {
          if (!this.isSpinning) {
            this.battleTarget = 'A';
            this.updateTargetPillUI();
          }
        } else if (e.data.action === 'koth_next_challenger' || e.data.action === 'continue' || e.data.action === 'koth_continue') {
          if (!this.isSpinning) {
            this.battleTarget = 'B';
            this.updateTargetPillUI();
          }
        } else if ((e.data.action === 'state_sync' || e.data.action === 'battle_update') && e.data.state) {
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
        this.setMode(e.newValue, true);
      } else if (e.key === 'hunthub_tourney_seed_count' && e.newValue !== null && !this.isSpinning) {
        const sc = Number(e.newValue);
        if (!isNaN(sc)) {
          this.tourneyCount = Math.max(0, Math.min(7, sc));
          this.updateTargetPillUI();
        }
      } else if (e.key === 'hunthub_duo_pool_v2' && e.newValue && !this.isSpinning) {
        try {
          const parsedPool = JSON.parse(e.newValue);
          if (Array.isArray(parsedPool)) {
            this.pool = parsedPool;
            this.renderTrack();
          }
        } catch {}
      } else if (e.key === 'hunthub_duo_spin_cmd' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          this.spin(parsed.mode, parsed.spinId, parsed.winner, parsed.targetCorner, parsed.targetSeed);
        } catch {}
      } else if (e.key === 'hunthub_battle_state' && e.newValue) {
        try {
          const st = JSON.parse(e.newValue);
          this.syncTargetFromBattleState(st);
        } catch {}
      } else if (e.key === 'hunthub_battle_cmd' && e.newValue && !this.isSpinning) {
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
      { chatter: 'LuckyStriker', slot: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming', icon: '🤠' },
      { chatter: 'VegasKing', slot: 'Gates of Olympus 1000', provider: 'Pragmatic Play', icon: '⚡' },
      { chatter: 'SlotQueen', slot: 'Waylanders Forge', provider: 'Valkyrie Studio', icon: '⚔️' },
      { chatter: 'SpinMaster', slot: 'Sugar Rush 1000', provider: 'Pragmatic Play', icon: '🍬' },
      { chatter: 'Strike777', slot: 'Le Bandit', provider: 'Hacksaw Gaming', icon: '🦝' },
      { chatter: 'BigBassBob', slot: 'Big Bass Splash', provider: 'Pragmatic Play', icon: '🎣' },
      { chatter: 'NeonWolf', slot: 'Sharks!', provider: 'Pragmatic Play', icon: '🦈' },
      { chatter: 'RoyalFlush', slot: 'RIP City', provider: 'Hacksaw Gaming', icon: '🐱' },
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

    if (!this.pool || this.pool.length === 0) {
      const card = document.createElement('div');
      card.className = 'duo-card';
      card.style.cssText = 'opacity: 0.7; justify-content: center; text-align: center; border: 1px dashed rgba(255, 255, 255, 0.2); padding: 18px;';
      card.innerHTML = `
        <div style="font-family: var(--font-display, inherit); font-size: 13px; font-weight: 800; color: #94a3b8;">
          WAITING FOR CHATTERS · TYPE !BATTLE &lt;SLOT&gt;
        </div>
      `;
      this.trackEl.appendChild(card);
      return;
    }

    const repeats = 15;
    for (let r = 0; r < repeats; r++) {
      this.pool.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'duo-card';
        card.dataset.index = idx;
        const safeChatter = this.esc(item.chatter);
        const initial = this.esc(String(item.chatter || '').slice(0, 2).toUpperCase());
        const avatarGrad = this.getDeterministicAvatarGradient(item.chatter);
        const avatarHtml = item.avatar
          ? `<div class="user-avatar-circle" style="background:${avatarGrad}"><img src="${this.esc(item.avatar)}" alt="${safeChatter}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none';this.parentElement.textContent='${initial}';" /></div>`
          : `<div class="user-avatar-circle" style="background:${avatarGrad}">${initial}</div>`;

        const slotDetails = this.resolveSlotDetails(item.slot);
        const resolvedName = slotDetails.name || item.slot || 'Casino Slot';
        const resolvedProv = slotDetails.provider || item.provider || 'CASINO';
        const fallbackUri = (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function')
          ? window.SlotResolver.generateDataUriCard(resolvedName, resolvedProv)
          : '';
        const coverSrc = slotDetails.image || fallbackUri;
        const safeIcon = this.esc(item.icon || '🎰');
        const slotImgHtml = coverSrc
          ? `<img src="${this.esc(coverSrc)}" class="slot-cover-thumb" alt="" data-fallback="${this.esc(fallbackUri)}" onerror="if(this.dataset.fallback && this.src !== this.dataset.fallback){this.src=this.dataset.fallback;}else{this.style.display='none';this.nextElementSibling.style.display='flex';}" /><div class="slot-icon-box" style="display:none;">${safeIcon}</div>`
          : `<div class="slot-icon-box">${safeIcon}</div>`;

        card.innerHTML = `
          <div class="card-user">
            ${avatarHtml}
            <div class="user-meta">
              <span class="user-name">@${safeChatter}</span>
              <span class="user-tag">${this.mode === 'tourney' ? '!TOURNEY CALL' : '!BATTLE CALL'}</span>
            </div>
          </div>
          <div class="card-divider">⚡</div>
          <div class="card-slot">
            <div class="slot-meta">
              <span class="slot-name">${this.esc(resolvedName)}</span>
              <span class="slot-prov">${this.esc(resolvedProv)}</span>
            </div>
            ${slotImgHtml}
          </div>
        `;
        this.trackEl.appendChild(card);
      });
    }
  }

  esc(str) {
    return String(str ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
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

  setMode(mode, fromRemote = false) {
    const normalized = mode === 'tourney' ? 'tourney' : 'battle';
    const changed = this.mode !== normalized;
    this.mode = normalized;
    try {
      localStorage.setItem('hunthub_duo_mode', this.mode);
    } catch {}
    if (!fromRemote && this.bcWheel) {
      try {
        this.bcWheel.postMessage({ action: 'set_mode', mode: this.mode, ts: Date.now() });
      } catch {}
    }
    const wrapper = document.getElementById('wheel-wrapper');
    if (changed && wrapper) {
      wrapper.classList.remove('mode-switching');
      void wrapper.offsetWidth;
      wrapper.classList.add('mode-switching');
    }
    const tabBattle = document.getElementById('tab-mode-battle');
    const tabTourney = document.getElementById('tab-mode-tourney');
    if (tabBattle && tabTourney) {
      tabBattle.classList.toggle('active', this.mode === 'battle');
      tabTourney.classList.toggle('active', this.mode === 'tourney');
    }

    this.updateTargetPillUI();
    this.updateQueueBadge();
  }

  spin(mode, spinId, forcedWinner, targetCorner, targetSeed) {
    if (this.isSpinning) return;
    if (spinId && this._lastProcessedSpinId === spinId) return;
    if (spinId) this._lastProcessedSpinId = spinId;

    if (mode) this.setMode(mode, true);
    if (targetCorner === 'A' || targetCorner === 'B') {
      this.battleTarget = targetCorner;
      this.updateTargetPillUI();
    }
    if (typeof targetSeed === 'number' && targetSeed >= 1 && targetSeed <= 8) {
      this.tourneyCount = targetSeed - 1;
      this.updateTargetPillUI();
    }
    this._lockedSpinCorner = this.battleTarget === 'B' ? 'B' : 'A';
    this._lockedTourneySeed = (this.tourneyCount % 8) + 1;

    if (this._toastHideTimer) {
      clearTimeout(this._toastHideTimer);
      this._toastHideTimer = null;
    }
    if (this._pendingPoolRemoval) {
      this._pendingPoolRemoval();
      this._pendingPoolRemoval = null;
    }

    if (!this.pool || this.pool.length === 0) {
      const purged = localStorage.getItem('hunthub_demo_users_purged') === 'true' || localStorage.getItem('hunthub_demo_users_purged_live_v2') === 'true';
      if (purged) {
        if (this.directSpinBtn) {
          this.directSpinBtn.disabled = false;
          this.directSpinBtn.innerHTML = '<span>⚠️</span> POOL EMPTY';
          setTimeout(() => {
            if (this.directSpinBtn) this.directSpinBtn.innerHTML = '<span>⚡</span> SPIN DUO';
          }, 2000);
        }
        return;
      }
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
      const targetName = String(typeof forcedWinner === 'string' ? forcedWinner : (forcedWinner.username || forcedWinner.chatter || '')).trim().replace(/^@/, '');
      winnerIdx = this.pool.findIndex(p => String(p.chatter || '').trim().replace(/^@/, '').toLowerCase() === targetName.toLowerCase());
      if (typeof forcedWinner === 'object') {
        const fSlot = forcedWinner.slotName || forcedWinner.slot;
        const fProv = forcedWinner.slotProvider || forcedWinner.provider;
        if (winnerIdx !== -1) {
          if (fSlot) this.pool[winnerIdx].slot = fSlot;
          if (fProv) this.pool[winnerIdx].provider = fProv;
          this.renderTrack();
        } else if (targetName) {
          this.pool.push({
            chatter: targetName,
            slot: fSlot || 'Wanted Dead or a Wild',
            provider: fProv || 'Hacksaw Gaming',
            icon: '🎰'
          });
          winnerIdx = this.pool.length - 1;
          this.renderTrack();
        }
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

    const finishedSpinId = this.currentSpinId;
    this.currentSpinId = null;

    // Send spin_animation_complete handshake to backend for instant synchronized chat announcement
    if (finishedSpinId) {
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
    const assignedCorner = this._lockedSpinCorner || this.battleTarget;
    const assignedSeed = this._lockedTourneySeed || ((this.tourneyCount % 8) + 1);
    this._lockedSpinCorner = null;
    this._lockedTourneySeed = null;

    // Display Centered Winner Toast in English with exact resolved slot name
    this.toastTitle.textContent = this.mode === 'battle'
      ? `ASSIGNED TO 1v1 BATTLE (${assignedCorner === 'A' ? 'BLUE CORNER' : 'RED CORNER'})!`
      : `SEEDED INTO 8-BRACKET TOURNAMENT (SEED ${assignedSeed}/8)!`;
    this.toastChatter.textContent = `@${winner.chatter}`;
    this.toastSlot.textContent = slotDetails.name || winner.slot;
    this.toastEl.classList.add('active');

    // Remove winner from pool so the same player cannot be selected twice
    const winnerNameLower = (winner.chatter || '').toLowerCase();
    this.pool = this.pool.filter((item, idx) => idx !== winnerIdx && (item.chatter || '').toLowerCase() !== winnerNameLower);
    try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.pool)); } catch {}
    this.updateQueueBadge();

    // Notify backend queue removal if running
    fetch('/api/wheel/duo/remove', {
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
      this.autoFillBattle(winner, assignedCorner, finishedSpinId);
      // Toggle target for next spin: A -> B, B -> A
      this.battleTarget = assignedCorner === 'A' ? 'B' : 'A';
      this.updateTargetPillUI();
    } else {
      this.autoFillTourney(winner, assignedSeed, finishedSpinId);
      // Advance seed 1/8 -> 2/8 -> ... -> 8/8, and auto-reset back to 0 (Seed 1/8) when 8/8 is completed!
      this.tourneyCount = assignedSeed >= 8 ? 0 : assignedSeed;
      try { localStorage.setItem('hunthub_tourney_seed_count', String(this.tourneyCount)); } catch {}
      this.updateTargetPillUI();
    }
  }

  async autoFillBattle(item, slotKey, spinId) {
    const slotDetails = this.resolveSlotDetails(item.slot);
    console.log(`[Duo Wheel] Auto-filling Battle Player ${slotKey}: @${item.chatter} (${slotDetails.name})`);

    const playerObj = {
      userId: `u_${item.chatter}`,
      kickId: Math.floor(1000 + Math.random() * 9000),
      username: item.chatter,
      displayName: item.chatter,
      name: `@${String(item.chatter).replace(/^@/, '')}`,
      avatar: '',
      slotName: slotDetails.name,
      slot: slotDetails.name,
      slotProvider: slotDetails.provider || item.provider || 'Casino Slot',
      provider: slotDetails.provider || item.provider || 'Casino Slot',
      slotImage: slotDetails.image || '',
      image: slotDetails.image || '',
      winAmount: 0,
      multiplier: 0,
    };

    const winnerEventPayload = {
      action: 'duo_winner_selected',
      mode: 'battle',
      spinId: spinId || null,
      targetCorner: slotKey,
      winner: {
        chatter: item.chatter,
        username: item.chatter,
        slot: slotDetails.name,
        slotName: slotDetails.name,
        provider: slotDetails.provider || item.provider || 'Casino Slot',
        image: slotDetails.image || '',
      },
      pool: this.pool,
      timestamp: Date.now(),
    };

    // 1. BroadcastChannel to Control Panel (bcWheel) & Battle Overlay (bcBattle)
    if (this.bcWheel) {
      this.bcWheel.postMessage(winnerEventPayload);
    }
    if (this.bcBattle) {
      this.bcBattle.postMessage({
        action: 'assign_player',
        spinId: spinId || null,
        playerSlot: slotKey,
        player: playerObj,
        timestamp: Date.now(),
      });
    }

    // 2. LocalStorage cross-window storage event fallback (guaranteed sync with Control Panel & Battle Overlay)
    try {
      localStorage.setItem('hunthub_duo_winner_selected', JSON.stringify(winnerEventPayload));
      localStorage.setItem('hunthub_battle_assign', JSON.stringify({
        spinId: spinId || null,
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
      if (slotKey === 'A') {
        battleState.playerA = playerObj;
        battleState.playerB = null;
        battleState.status = 'LOBBY';
      } else if (slotKey === 'B') {
        const cleanA = String(battleState.playerA?.username || '').trim().toLowerCase().replace(/^@/, '');
        const cleanB = String(playerObj.username || '').trim().toLowerCase().replace(/^@/, '');
        if (!cleanA || cleanA !== cleanB) {
          battleState.playerB = playerObj;
        }
      }
      if (battleState.playerA && battleState.playerB) {
        battleState.status = 'READY';
      } else {
        battleState.status = 'LOBBY';
      }

      localStorage.setItem('hunthub_battle_state', JSON.stringify(battleState));
    } catch (e) {
      console.warn('[Duo Wheel] LocalStorage save error:', e);
    }

    // 3. HTTP Server fallback if online
    try {
      await fetch('/api/battle/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: playerObj, slot: { name: slotDetails.name, provider: slotDetails.provider } }),
      });
    } catch {}
  }

  async autoFillTourney(item, seed, spinId) {
    const slotDetails = this.resolveSlotDetails(item.slot);
    console.log(`[Duo Wheel] Auto-filling Tourney Seed ${seed}: @${item.chatter} (${slotDetails.name})`);

    const participantObj = {
      id: `p_${seed}`,
      kickId: Math.floor(1000 + Math.random() * 9000),
      username: `@${String(item.chatter).replace(/^@/, '')}`,
      displayName: String(item.chatter).replace(/^@/, ''),
      slotName: slotDetails.name,
      slotProvider: slotDetails.provider || item.provider || 'Casino Slot',
      slotImage: slotDetails.image || '',
      seed,
    };

    const winnerEventPayload = {
      action: 'duo_winner_selected',
      mode: 'tourney',
      seed,
      spinId: spinId || null,
      winner: {
        chatter: item.chatter,
        username: item.chatter,
        slot: slotDetails.name,
        slotName: slotDetails.name,
        provider: slotDetails.provider || item.provider || 'Casino Slot',
        image: slotDetails.image || '',
      },
      pool: this.pool,
      timestamp: Date.now(),
    };

    // 1. BroadcastChannel to Control Panel (bcWheel) & Tourney Overlay (bcTourney)
    if (this.bcWheel) {
      this.bcWheel.postMessage(winnerEventPayload);
    }
    if (this.bcTourney) {
      this.bcTourney.postMessage({
        action: 'add_participant',
        spinId: spinId || null,
        participant: participantObj,
        timestamp: Date.now(),
      });
    }

    // 2. LocalStorage cross-window sync fallback
    try {
      localStorage.setItem('hunthub_duo_winner_selected', JSON.stringify(winnerEventPayload));
      localStorage.setItem('hunthub_tourney_add_player', JSON.stringify({
        spinId: spinId || null,
        participant: participantObj,
        timestamp: Date.now(),
      }));
    } catch {}

    // 3. HTTP Server if running
    try {
      await fetch('/api/tourney/join', {
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
