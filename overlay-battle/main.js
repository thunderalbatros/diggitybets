/**
 * HuntHub — 1v1 Battle Overlay Client
 * Lightweight, zero-CPU Web Audio synthesizers, Anime.js animations & Canvas Confetti.
 */

class BattleOverlayApp {
  constructor() {
    this.ws = null;
    this.audioCtx = null;
    this.currentState = null;
    this.reconnectAttempts = 0;

    this.initAudio();
    this.initElements();
    this.initBroadcastChannel();
    this.initWebSocket();
    this.loadSavedState();
    this.checkDemoMode();
    this.setupAutoScaling();
  }

  initBroadcastChannel() {
    try {
      this.bcBattle = new BroadcastChannel('hunthub_battle');
      this.bcBattle.onmessage = (e) => {
        if (!e.data) return;
        if (e.data.action === 'assign_player') {
          this.handleAssignPlayer(e.data.playerSlot, e.data.player);
        } else if (e.data.action === 'set_mode') {
          if (this.currentState) {
            this.currentState.gameMode = e.data.mode || 'BONUS_BUY';
            try { localStorage.setItem('hunthub_battle_state', JSON.stringify(this.currentState)); } catch {}
            this.handleStateUpdate(this.currentState);
          }
        } else if (e.data.action === 'battle_update' || e.data.type === 'battle_update') {
          this.handleStateUpdate(e.data.state);
        } else if (e.data.action === 'resolve_battle') {
          this.handleResolve(e.data);
        } else if (e.data.action === 'koth_cashout' || e.data.action === 'koth_retire' || e.data.type === 'koth_cashout') {
          this.handleKothCashout(e.data);
        } else if (e.data.action === 'koth_continue' || e.data.type === 'koth_continue') {
          this.handleKothContinue(e.data);
        } else if (e.data.action === 'reset_battle') {
          this.handleReset();
        }
      };
    } catch (err) {
      console.warn('[Battle Overlay] BroadcastChannel unavailable:', err);
    }

    // LocalStorage Cross-Window Fallback
    window.addEventListener('storage', (e) => {
      if (e.key === 'hunthub_battle_assign' && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          this.handleAssignPlayer(data.playerSlot, data.player);
        } catch {}
      } else if (e.key === 'hunthub_battle_mode' && e.newValue) {
        if (this.currentState) {
          this.currentState.gameMode = e.newValue;
          this.handleStateUpdate(this.currentState);
        }
      } else if (e.key === 'hunthub_battle_state' && e.newValue) {
        try {
          this.handleStateUpdate(JSON.parse(e.newValue));
        } catch {}
      } else if (e.key === 'hunthub_koth_event' && e.newValue) {
        try {
          const ev = JSON.parse(e.newValue);
          if (ev.action === 'koth_cashout' || ev.action === 'koth_retire') this.handleKothCashout(ev);
          else if (ev.action === 'koth_continue') this.handleKothContinue(ev);
        } catch {}
      }
    });
  }

  loadSavedState() {
    try {
      const saved = localStorage.getItem('hunthub_battle_state');
      if (saved) {
        this.handleStateUpdate(JSON.parse(saved));
        return;
      }
    } catch {}
    // Default empty state
    this.handleStateUpdate({
      id: 'battle_lobby',
      status: 'LOBBY',
      kothActive: true,
      currentStreak: 0,
      reigningKing: null,
      playerA: null,
      playerB: null,
      winner: null,
    });
  }

  handleAssignPlayer(slotKey, player) {
    if (!this.currentState) {
      this.currentState = {
        id: 'battle_' + Date.now(),
        status: 'LOBBY',
        kothActive: true,
        currentStreak: 0,
        reigningKing: null,
        playerA: null,
        playerB: null,
        winner: null,
      };
    }

    // Resolve slot cover art canonically
    if (player) {
      const canon = window.SlotResolver ? window.SlotResolver.resolve(player.slotName || player.slotImage || player, '../') : null;
      if (canon) {
        player.slotName = canon.name;
        player.slotProvider = canon.provider;
        player.slotImage = canon.image;
      }
      player.multiplier = Number(player.multiplier || 0);
      player.winAmount = Number(player.winAmount || 0);
      player.result = null;
    }

    if (slotKey === 'A') {
      this.currentState.playerA = player;
    } else if (slotKey === 'B') {
      this.currentState.playerB = player;
    }

    this.currentState.winner = null;
    this.currentState._kothIncremented = false;

    if (this.currentState.playerA && this.currentState.playerB) {
      this.currentState.status = 'READY';
      this.playClashSound();
    } else {
      this.currentState.status = 'LOBBY';
    }

    try {
      localStorage.setItem('hunthub_battle_state', JSON.stringify(this.currentState));
    } catch {}

    this.handleStateUpdate(this.currentState);
  }

  handleResolve(data) {
    if (!this.currentState) return;
    if (data.multA !== undefined && this.currentState.playerA) this.currentState.playerA.multiplier = Number(data.multA);
    if (data.multB !== undefined && this.currentState.playerB) this.currentState.playerB.multiplier = Number(data.multB);

    const winnerSide = data.winner || ((this.currentState.playerA?.multiplier || 0) >= (this.currentState.playerB?.multiplier || 0) ? 'A' : 'B');
    this.currentState.winner = winnerSide;
    this.currentState.status = 'RESOLVED';
    this.currentState.kothActive = true;

    if (this.currentState.playerA) {
      this.currentState.playerA.result = winnerSide === 'A' ? 'WINNER' : 'LOSER';
    }
    if (this.currentState.playerB) {
      this.currentState.playerB.result = winnerSide === 'B' ? 'WINNER' : 'LOSER';
    }

    const winnerObj = winnerSide === 'A' ? this.currentState.playerA : this.currentState.playerB;
    if (winnerObj && !this.currentState._kothIncremented) {
      const prevKingUser = (this.currentState.reigningKing?.username || '').toLowerCase();
      const winUser = (winnerObj.username || '').toLowerCase();
      if (prevKingUser && prevKingUser === winUser) {
        this.currentState.currentStreak = Math.min(4, (Number(this.currentState.currentStreak) || 1) + 1);
      } else {
        this.currentState.currentStreak = 1;
      }
      this.currentState.reigningKing = { ...winnerObj };
      this.currentState.awaitingKingDecision = this.currentState.currentStreak < 4;
      this.currentState._kothIncremented = true;
    }

    try {
      localStorage.setItem('hunthub_battle_state', JSON.stringify(this.currentState));
    } catch {}
    this.handleStateUpdate(this.currentState);
  }

  handleKothCashout(data) {
    if (this._celebrationTimer) {
      clearTimeout(this._celebrationTimer);
      this._celebrationTimer = null;
    }
    const king = data?.retiredKing || this.currentState?.reigningKing || this.currentState?.playerA;
    const streak = Math.max(1, Number(data?.streak || this.currentState?.currentStreak || 1));
    const prizeAmount = Number(data?.prizeAmount || Math.min(20, streak * 5));
    const kingName = king ? (king.displayName || king.username) : 'Winner';

    this.currentState = {
      id: 'battle_' + Date.now(),
      status: 'LOBBY',
      gameMode: this.currentState?.gameMode || 'BONUS_BUY',
      betAmount: this.currentState?.betAmount || 10,
      prizeText: this.currentState?.prizeText || '$50.00 POOL',
      kothActive: true,
      reigningKing: null,
      currentStreak: 0,
      awaitingKingDecision: false,
      playerA: null,
      playerB: null,
      winner: null,
      _kothIncremented: false,
    };

    try {
      localStorage.setItem('hunthub_battle_state', JSON.stringify(this.currentState));
    } catch {}
    if (this.bcBattle) {
      this.bcBattle.postMessage({ action: 'battle_update', state: this.currentState });
    }

    this.handleStateUpdate(this.currentState);

    // Show Cashout Congratulations Banner for 4.5s
    this.playSlotWinFanfare();
    if (this.modal) {
      if (this.modalWinner) this.modalWinner.textContent = `@${kingName}`;
      const modalSubtitle = this.modal.querySelector('.modal-subtitle');
      if (modalSubtitle) modalSubtitle.textContent = '💰 KING OF THE HILL CASHOUT!';
      if (this.modalStat) {
        this.modalStat.textContent = `Congratulations @${kingName} you won $${prizeAmount}`;
      }
      const modalSlot = document.getElementById('modal-slot-title');
      if (modalSlot) modalSlot.textContent = `${streak} Win Streak ($5 per win)`;
      this.modal.classList.add('active');
      this._celebrationTimer = setTimeout(() => {
        if (this.modal) this.modal.classList.remove('active');
      }, 4500);
    }
  }

  handleKothContinue(data) {
    if (this._celebrationTimer) {
      clearTimeout(this._celebrationTimer);
      this._celebrationTimer = null;
    }
    if (this.modal) this.modal.classList.remove('active');
    if (this.ribbonA) this.ribbonA.classList.remove('active');
    if (this.ribbonB) this.ribbonB.classList.remove('active');

    const king = data?.king || data?.state?.reigningKing || this.currentState?.reigningKing || this.currentState?.playerA;
    const streak = Math.max(1, Number(data?.streak || data?.state?.currentStreak || this.currentState?.currentStreak || 1));

    if (king) {
      this.currentState = {
        ...this.currentState,
        status: 'LOBBY',
        kothActive: true,
        reigningKing: { ...king },
        currentStreak: streak,
        awaitingKingDecision: false,
        playerA: {
          ...king,
          multiplier: 0,
          winAmount: 0,
          result: null,
        },
        playerB: null,
        winner: null,
        _kothIncremented: false,
      };
      try {
        localStorage.setItem('hunthub_battle_state', JSON.stringify(this.currentState));
      } catch {}
      if (this.bcBattle) {
        this.bcBattle.postMessage({ action: 'battle_update', state: this.currentState });
      }
      this.handleStateUpdate(this.currentState);
    }
  }

  handleReset() {
    if (this._celebrationTimer) {
      clearTimeout(this._celebrationTimer);
      this._celebrationTimer = null;
    }
    if (this.modal) this.modal.classList.remove('active');
    this.currentState = {
      id: 'battle_' + Date.now(),
      status: 'LOBBY',
      kothActive: true,
      reigningKing: null,
      currentStreak: 0,
      playerA: null,
      playerB: null,
      winner: null,
      _kothIncremented: false,
    };
    try {
      localStorage.setItem('hunthub_battle_state', JSON.stringify(this.currentState));
    } catch {}
    this.handleStateUpdate(this.currentState);
  }

  initElements() {
    this.headerBet = document.getElementById('header-bet');
    this.headerPrize = document.getElementById('header-prize');
    this.statusText = document.getElementById('battle-status-text');

    // Player A
    this.cardA = document.getElementById('card-player-a');
    this.nameA = document.getElementById('name-a');
    this.tagA = document.getElementById('slot-tag-a');
    this.monogramA = document.getElementById('monogram-a');
    this.placeholderA = document.getElementById('placeholder-a');
    this.slotNameA = document.getElementById('slot-name-a');
    this.slotProvA = document.getElementById('slot-provider-a');
    this.captionA = document.getElementById('slot-caption-a');
    this.captionTitleA = document.getElementById('slot-caption-title-a');
    this.captionProvA = document.getElementById('slot-caption-prov-a');
    this.multA = document.getElementById('mult-a');
    this.payoutA = document.getElementById('payout-a');
    this.meterA = document.getElementById('meter-bar-a');
    this.ghostBarA = document.getElementById('ghost-bar-a');
    this.modeBadgeA = document.getElementById('mode-badge-a');
    this.kothMeterA = document.getElementById('koth-meter-a');
    this.ribbonA = document.getElementById('ribbon-a');
    this.slotImgA = document.getElementById('slot-img-a');

    // Player B
    this.cardB = document.getElementById('card-player-b');
    this.nameB = document.getElementById('name-b');
    this.tagB = document.getElementById('slot-tag-b');
    this.monogramB = document.getElementById('monogram-b');
    this.placeholderB = document.getElementById('placeholder-b');
    this.slotNameB = document.getElementById('slot-name-b');
    this.slotProvB = document.getElementById('slot-provider-b');
    this.captionB = document.getElementById('slot-caption-b');
    this.captionTitleB = document.getElementById('slot-caption-title-b');
    this.captionProvB = document.getElementById('slot-caption-prov-b');
    this.multB = document.getElementById('mult-b');
    this.payoutB = document.getElementById('payout-b');
    this.meterB = document.getElementById('meter-bar-b');
    this.ghostBarB = document.getElementById('ghost-bar-b');
    this.modeBadgeB = document.getElementById('mode-badge-b');
    this.kothMeterB = document.getElementById('koth-meter-b');
    this.ribbonB = document.getElementById('ribbon-b');
    this.slotImgB = document.getElementById('slot-img-b');

    // Center VS & Modal
    this.vsModeBadge = document.getElementById('vs-mode-badge');
    this.vsKothPill = document.getElementById('vs-koth-pill');
    this.vsSubtext = document.getElementById('vs-subtext');
    this.modal = document.getElementById('victory-modal');
    this.modalWinner = document.getElementById('modal-winner-name');
    this.modalStat = document.getElementById('modal-stat');
    this.modalPrize = document.getElementById('modal-prize');
  }

  animateGhostImpactBar(ghostEl, meterEl, targetPct) {
    if (!meterEl) return;
    const prevWidth = parseFloat(meterEl.style.width || '0') || 0;
    meterEl.style.width = `${targetPct}%`;
    if (!ghostEl) return;
    const burstWidth = Math.min(100, Math.max(targetPct + 14, prevWidth));
    ghostEl.style.width = `${burstWidth}%`;
    if (typeof ghostEl.animate === 'function') {
      ghostEl.animate(
        [
          { width: `${prevWidth}%`, opacity: 0.95 },
          { width: `${burstWidth}%`, opacity: 0.85, offset: 0.35 },
          { width: `${targetPct}%`, opacity: 0.25 }
        ],
        {
          duration: 820,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards'
        }
      );
    } else {
      ghostEl.style.width = `${targetPct}%`;
    }
  }

  initAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.audioCtx = new AudioContextClass();
    }
    // Resume audio on first user gesture
    window.addEventListener('click', () => {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }, { once: true });
  }

  playClashSound() {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
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

  playVictoriousTrumpetFanfare() {
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

      // Metallic Coin Drop Clicks (falling coins)
      for (let c = 0; c < 16; c++) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const t = climaxTime + 0.15 + (c * 0.08) + (Math.random() * 0.04);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1800 + Math.random() * 800, t);
        osc.frequency.exponentialRampToValueAtTime(400, t + 0.04);

        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + 0.05);
      }
    } catch (_) {}
  }

  playSlotWinFanfare() {
    this.playVictoriousTrumpetFanfare();
  }

  initWebSocket() {
    const urlParams = new URLSearchParams(window.location.search);
    const port = urlParams.get('port') || '3001';
    const wsUrl = `ws://127.0.0.1:${port}/`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('[Battle Overlay] Connected to HuntHub Server on ' + wsUrl);
        this.reconnectAttempts = 0;
        // Request current battle state
        this.ws.send(JSON.stringify({ action: 'get_battle_state' }));
      };

      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'battle_update' || payload.type === 'battle_resolved') {
            this.handleStateUpdate(payload.state);
          } else if (payload.type === 'koth_cashout') {
            this.handleKothCashout(payload);
          } else if (payload.type === 'koth_continue') {
            this.handleKothContinue(payload);
          } else if (payload.action === 'battle_state') {
            this.handleStateUpdate(payload.state);
          } else if (payload.targetOverlay === 'overlay-battle' && payload.state) {
            this.handleStateUpdate(payload.state);
          }
        } catch (e) {
          console.warn('[Battle Overlay] Error parsing message:', e);
        }
      };

      this.ws.onerror = () => {
        // Will trigger onclose
      };

      this.ws.onclose = () => {
        const timeout = Math.min(1000 * Math.pow(1.5, this.reconnectAttempts), 10000);
        this.reconnectAttempts++;
        setTimeout(() => this.initWebSocket(), timeout);
      };
    } catch (e) {
      setTimeout(() => this.initWebSocket(), 3000);
    }

    // Cross-process HTTP /api/sync/state fallback for OBS Browser Source
    if (!this._syncIntervalStarted) {
      this._syncIntervalStarted = true;
      setInterval(async () => {
        try {
          const res = await fetch(`http://127.0.0.1:${port}/api/sync/state`);
          if (!res.ok) return;
          const data = await res.json();
          const battleState = data?.overlays?.battle;
          if (battleState && JSON.stringify(battleState) !== JSON.stringify(this.currentState)) {
            this.handleStateUpdate(battleState);
          }
        } catch {}
      }, 1500);
    }
  }

  handleStateUpdate(state) {
    if (!state) return;
    const oldStatus = this.currentState ? this.currentState.status : null;
    this.currentState = state;

    // Header updates
    if (this.headerBet) this.headerBet.textContent = `$${Number(state.betAmount || 10).toFixed(2)}`;
    if (this.headerPrize) this.headerPrize.textContent = state.prizeText || '$50.00 POOL';

    // Mode Badges (BONUS BUY vs SPINS)
    const isSpins = state.gameMode === 'SPINS';
    const modeLabel = isSpins ? 'SPINS' : 'BONUS BUY';
    if (this.modeBadgeA) this.modeBadgeA.textContent = modeLabel;
    if (this.modeBadgeB) this.modeBadgeB.textContent = modeLabel;
    if (this.vsModeBadge) this.vsModeBadge.textContent = `${modeLabel} MODE`;

    // Center King of the Hill Streak Pill
    const streakVal = Number(state.currentStreak || 0);
    const securedVal = Math.min(20, streakVal * 5);
    if (this.vsKothPill) {
      const kingName = state.reigningKing ? `@${state.reigningKing.displayName || state.reigningKing.username}` : 'OPEN THRONE';
      this.vsKothPill.textContent = streakVal > 0
        ? `👑 KOTH: ${kingName} · STREAK ${streakVal}/4 ($${securedVal} WON · $20 MAX)`
        : `👑 KOTH: ${kingName} · STREAK 0/4 ($5/WIN · $20 MAX)`;
    }

    // Status Badge
    if (this.statusText) {
      const map = {
        IDLE: 'WAITING FOR LOBBY',
        LOBBY: 'LOBBY OPEN',
        READY: 'FIGHTERS READY!',
        PLAYING_A: 'PLAYER A SPINNING',
        PLAYING_B: 'PLAYER B SPINNING',
        RESOLVED: 'BATTLE FINISHED',
        CANCELLED: 'CANCELLED',
      };
      this.statusText.textContent = map[state.status] || state.status;
    }

    // Render Player A
    this.renderPlayer(state.playerA, {
      cardEl: this.cardA,
      nameEl: this.nameA,
      tagEl: this.tagA,
      monogramEl: this.monogramA,
      placeholderEl: this.placeholderA,
      slotNameEl: this.slotNameA,
      slotProvEl: this.slotProvA,
      captionEl: this.captionA,
      captionTitleEl: this.captionTitleA,
      captionProvEl: this.captionProvA,
      multEl: this.multA,
      payoutEl: this.payoutA,
      meterEl: this.meterA,
      ghostEl: this.ghostBarA,
      kothMeterEl: this.kothMeterA,
      ribbonEl: this.ribbonA,
      imgEl: this.slotImgA,
      isWinner: state.status === 'RESOLVED' && (state.winner === 'A' || state.winner === 'TIE'),
    });

    // Render Player B
    this.renderPlayer(state.playerB, {
      cardEl: this.cardB,
      nameEl: this.nameB,
      tagEl: this.tagB,
      monogramEl: this.monogramB,
      placeholderEl: this.placeholderB,
      slotNameEl: this.slotNameB,
      slotProvEl: this.slotProvB,
      captionEl: this.captionB,
      captionTitleEl: this.captionTitleB,
      captionProvEl: this.captionProvB,
      multEl: this.multB,
      payoutEl: this.payoutB,
      meterEl: this.meterB,
      ghostEl: this.ghostBarB,
      kothMeterEl: this.kothMeterB,
      ribbonEl: this.ribbonB,
      imgEl: this.slotImgB,
      isWinner: state.status === 'RESOLVED' && (state.winner === 'B' || state.winner === 'TIE'),
    });

    // Entrance Animations with anime.js
    if (oldStatus !== state.status) {
      if (state.status === 'READY') {
        this.playClashSound();
        if (window.anime) {
          window.anime({
            targets: [this.cardA, this.cardB],
            scale: [0.95, 1],
            duration: 400,
            easing: 'easeOutElastic(1, .8)',
          });
        }
      }

      if (state.status === 'RESOLVED') {
        this.triggerVictoryCelebration(state);
      } else {
        if (this.modal) this.modal.classList.remove('active');
      }
    }
  }

  renderPlayer(player, dom) {
    if (!player) {
      if (dom.cardEl) {
        dom.cardEl.classList.remove('koth-king-active');
        dom.cardEl.style.opacity = '1';
      }
      if (dom.kothMeterEl) dom.kothMeterEl.style.display = 'none';
      dom.nameEl.textContent = 'Waiting for Player...';
      dom.tagEl.textContent = '!battle <slot> in chat';
      dom.tagEl.style.color = '';
      dom.monogramEl.textContent = '?';
      if (dom.placeholderEl) dom.placeholderEl.style.display = 'flex';
      dom.slotNameEl.textContent = 'No Slot Selected';
      dom.slotProvEl.textContent = 'Pragmatic / Hacksaw / Nolimit';
      if (dom.captionEl) dom.captionEl.style.display = 'none';
      dom.multEl.innerHTML = `0.00<span class="mult-x">x</span>`;
      dom.payoutEl.textContent = '$0.00 USD';
      this.animateGhostImpactBar(dom.ghostEl, dom.meterEl, 0);
      dom.ribbonEl.classList.remove('active');
      dom.imgEl.style.display = 'none';
      dom.imgEl.src = '';
      return;
    }

    const canon = (window.SlotResolver ? window.SlotResolver.resolve(player.slotName || player, '../') : null) || {
      name: player.slotName || 'Wanted Dead or a Wild',
      provider: player.slotProvider || 'Hacksaw Gaming',
      image: player.slotImage || ''
    };

    dom.nameEl.textContent = `@${player.displayName || player.username}`;
    dom.tagEl.textContent = `${canon.name} · ${canon.provider}`;
    dom.monogramEl.textContent = (player.displayName || player.username).charAt(0).toUpperCase();
    dom.slotNameEl.textContent = canon.name;
    dom.slotProvEl.textContent = canon.provider;

    // Hide placeholder and show clean slot card image + slot title caption
    if (dom.placeholderEl) dom.placeholderEl.style.display = 'none';
    if (dom.captionEl) {
      dom.captionEl.style.display = 'flex';
      if (dom.captionTitleEl) dom.captionTitleEl.textContent = canon.name;
      if (dom.captionProvEl) dom.captionProvEl.textContent = canon.provider;
    }

    const preferredImg = (canon.image && !String(canon.image).startsWith('data:'))
      ? canon.image
      : (player.slotImage || canon.image);
    let slotImg = (window.SlotResolver ? window.SlotResolver.resolveSlotImageUrl(preferredImg, '../') : preferredImg);
    if (!slotImg && window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function') {
      slotImg = window.SlotResolver.generateDataUriCard(canon.name, canon.provider);
    }

    if (slotImg) {
      dom.imgEl.onerror = () => {
        dom.imgEl.onerror = null;
        if (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function') {
          dom.imgEl.src = window.SlotResolver.generateDataUriCard(canon.name, canon.provider);
        }
      };
      dom.imgEl.src = slotImg;
      dom.imgEl.style.display = 'block';
    } else {
      dom.imgEl.style.display = 'none';
    }

    // Multiplier & meter with WAAPI Ghost Impact Bar
    const isSpins = this.currentState && this.currentState.gameMode === 'SPINS';
    const mult = Number(player.multiplier || 0);

    if (isSpins) {
      dom.multEl.innerHTML = player.result === 'WINNER' ? `WINNER!` : (player.result === 'LOSER' ? `LOSER` : `READY`);
      dom.payoutEl.textContent = '1-CLICK SPINS DUEL';
      this.animateGhostImpactBar(dom.ghostEl, dom.meterEl, player.result === 'WINNER' ? 100 : 0);
    } else {
      dom.multEl.innerHTML = `${mult.toFixed(2)}<span class="mult-x">x</span>`;
      dom.payoutEl.textContent = `$${Number(player.winAmount || (mult * Number(this.currentState?.betAmount || 10))).toFixed(2)} USD`;
      // Gauge calculation (max 50x = 100%)
      const pct = Math.min(100, Math.max(0, (mult / 50) * 100));
      this.animateGhostImpactBar(dom.ghostEl, dom.meterEl, pct);
    }

    // King of the Hill Streak Badge + ElectricBorder energy ring
    const isReigningKing = Boolean(
      this.currentState &&
      (this.currentState.kothActive !== false) &&
      this.currentState.reigningKing &&
      (this.currentState.reigningKing.kickId === player.kickId ||
        (this.currentState.reigningKing.username || '').toLowerCase() === (player.username || '').toLowerCase())
    );

    if (isReigningKing) {
      const streak = Math.max(1, Number(this.currentState.currentStreak || 1));
      const secured = Math.min(20, streak * 5);
      dom.tagEl.innerHTML = `👑 KING · STREAK ${streak}/4 · $${secured} WON`;
      dom.tagEl.style.color = 'var(--gold, #ffd700)';
      if (dom.cardEl) dom.cardEl.classList.add('koth-king-active');
      if (dom.kothMeterEl) {
        dom.kothMeterEl.style.display = 'flex';
        dom.kothMeterEl.querySelectorAll('.koth-step').forEach((stepEl) => {
          const stepNum = Number(stepEl.dataset.step || 0);
          stepEl.classList.toggle('active', stepNum <= streak);
        });
      }
    } else {
      dom.tagEl.style.color = '';
      if (dom.cardEl) dom.cardEl.classList.remove('koth-king-active');
      if (dom.kothMeterEl) dom.kothMeterEl.style.display = 'none';
    }

    // Winner & Loser styling
    if (dom.isWinner || player.result === 'WINNER') {
      dom.ribbonEl.classList.add('active');
      if (dom.nameEl.closest('.player-card')) {
        dom.nameEl.closest('.player-card').style.opacity = '1';
      }
    } else if (player.result === 'LOSER') {
      dom.ribbonEl.classList.remove('active');
      if (dom.nameEl.closest('.player-card')) {
        dom.nameEl.closest('.player-card').style.opacity = '0.45';
      }
    } else {
      dom.ribbonEl.classList.remove('active');
      if (dom.nameEl.closest('.player-card')) {
        dom.nameEl.closest('.player-card').style.opacity = '1';
      }
    }
  }

  triggerVictoryCelebration(state) {
    let winnerObj = null;
    if (state.winner === 'A') winnerObj = state.playerA;
    else if (state.winner === 'B') winnerObj = state.playerB;

    if (!winnerObj) return;

    const streak = Math.max(1, Number(state.currentStreak || 1));
    const prizeSecured = Math.min(20, streak * 5);
    const isKothChampion = streak >= 4;
    const winnerName = winnerObj.displayName || winnerObj.username;

    // 1. Broadcast celebration to fullscreen overlay
    try {
      const bc = new BroadcastChannel('hunthub_celebration');
      const payload = {
        type: 'CELEBRATION',
        category: isKothChampion ? 'KingOfTheHill' : 'Victory',
        winner: winnerObj,
        winnerSide: state.winner,
        slotName: winnerObj?.slotName || 'Casino Slot',
        slotImage: winnerObj?.slotImage,
        multiplier: winnerObj?.multiplier || 0,
        winAmount: winnerObj?.winAmount || 0,
        prizeText: isKothChampion ? `Congratulations @${winnerName} you won $20!` : `Streak ${streak}/4 · $${prizeSecured} Secured`,
        kothStreak: streak
      };
      bc.postMessage(payload);
      localStorage.setItem('hunthub_celebration_event', JSON.stringify(payload));
    } catch (e) {
      console.warn('[Battle Overlay] Broadcast celebration error:', e);
    }

    // 2. Play local fanfare as audio fallback
    this.playSlotWinFanfare();

    // 3. Show local modal + Winner crown ribbon for 4.5s, then automatically turn off ("apagarse") and transition!
    if (this.modal) {
      if (this.modalWinner) this.modalWinner.textContent = `@${winnerName}`;
      const modalSubtitle = this.modal.querySelector('.modal-subtitle');
      if (modalSubtitle) {
        modalSubtitle.textContent = isKothChampion
          ? '👑 4/4 STREAK KING OF THE HILL CHAMPION!'
          : `👑 DUEL WINNER! (STREAK ${streak}/4 · $${prizeSecured} SECURED)`;
      }
      const modalSlot = document.getElementById('modal-slot-title');
      if (modalSlot) {
        modalSlot.textContent = isKothChampion
          ? `${winnerObj.slotName || 'Casino Slot'} · MAX 4-WIN CAP REACHED!`
          : `${winnerObj.slotName || 'Casino Slot'} · Type !continue or !cashout`;
      }
      if (this.modalStat) {
        if (isKothChampion) {
          this.modalStat.textContent = `Congratulations @${winnerName} you won $20!`;
        } else if (state.gameMode === 'SPINS') {
          this.modalStat.textContent = `🏆 WINNER! ($${prizeSecured} Secured — Next Win: $${(streak + 1) * 5})`;
        } else {
          const mult = Number(winnerObj.multiplier || 0);
          this.modalStat.textContent = mult > 0
            ? `Multiplier: ${mult.toFixed(2)}x · $${prizeSecured} Secured`
            : `WINNER! · $${prizeSecured} Secured`;
        }
      }
      this.modal.classList.add('active');
    }

    if (this._celebrationTimer) {
      clearTimeout(this._celebrationTimer);
    }

    this._celebrationTimer = setTimeout(() => {
      if (this.modal) this.modal.classList.remove('active');
      if (this.ribbonA) this.ribbonA.classList.remove('active');
      if (this.ribbonB) this.ribbonB.classList.remove('active');

      // Only auto-transition if still in RESOLVED state for this duel
      if (!this.currentState || this.currentState.status !== 'RESOLVED') return;

      if (isKothChampion) {
        // 4-Win Max Cap ($20 USD) reached: clear both cards & Control Panel inputs to empty!
        this.currentState = {
          id: 'battle_' + Date.now(),
          status: 'LOBBY',
          gameMode: this.currentState.gameMode || 'BONUS_BUY',
          betAmount: this.currentState.betAmount || 10,
          prizeText: this.currentState.prizeText || '$50.00 POOL',
          kothActive: true,
          reigningKing: null,
          currentStreak: 0,
          awaitingKingDecision: false,
          playerA: null,
          playerB: null,
          winner: null,
          _kothIncremented: false,
        };
      } else {
        // Streaks 1, 2, or 3: Winner automatically moves into / stays in Player A (Blue Corner), Player B clears to empty!
        const nextKing = {
          ...winnerObj,
          multiplier: 0,
          winAmount: 0,
          result: null,
        };
        this.currentState = {
          ...this.currentState,
          status: 'LOBBY',
          kothActive: true,
          reigningKing: nextKing,
          currentStreak: streak,
          awaitingKingDecision: true,
          playerA: nextKing,
          playerB: null,
          winner: null,
          _kothIncremented: false,
        };
      }

      try {
        localStorage.setItem('hunthub_battle_state', JSON.stringify(this.currentState));
      } catch {}
      if (this.bcBattle) {
        this.bcBattle.postMessage({ action: 'battle_update', state: this.currentState });
      }
      this.handleStateUpdate(this.currentState);
    }, 4500);
  }

  setupAutoScaling() {
    const stage = document.getElementById('stage-wrapper');
    const resize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const scaleX = windowWidth / 1920;
      const scaleY = windowHeight / 1080;
      const scale = Math.min(scaleX, scaleY);
      if (stage) {
        stage.style.transform = `scale(${scale})`;
      }
    };
    window.addEventListener('resize', resize);
    resize();
  }

  checkDemoMode() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === '1' || params.get('demo') === 'true') {
      console.log('[Battle Overlay] Demo mode enabled via URL param');
      this.handleStateUpdate({
        id: 'demo_battle_1',
        status: 'READY',
        betAmount: 20,
        prizeText: '$100.00 CASH PRIZE',
        playerA: {
          userId: 'u1',
          kickId: 101,
          username: 'LuckyStriker',
          displayName: 'LuckyStriker',
          avatar: '',
          slotName: 'Wanted Dead or a Wild',
          slotProvider: 'Hacksaw Gaming',
          slotImage: '',
          winAmount: 245.50,
          multiplier: 12.28,
        },
        playerB: {
          userId: 'u2',
          kickId: 102,
          username: 'VegasKing',
          displayName: 'VegasKing',
          avatar: '',
          slotName: 'Gates of Olympus 1000',
          slotProvider: 'Pragmatic Play',
          slotImage: '',
          winAmount: 180.00,
          multiplier: 9.00,
        },
        winner: null,
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new BattleOverlayApp();
});
