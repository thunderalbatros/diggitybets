/**
 * HuntHub — Community Bonus Hunt Overlay Engine
 * Full 1920x1080 stage with real-time metrics, slot card images, and victory celebration.
 * Exclusively in English.
 */

class BonusHuntOverlayApp {
  constructor() {
    this.ws = null;
    this.bc = null;
    this.audioCtx = null;
    this.reconnectAttempts = 0;
    this.currentState = null;

    // DOM Elements
    this.titleEl = document.getElementById('hunt-title');
    this.statusTextEl = document.getElementById('hunt-status-text');
    this.startCostEl = document.getElementById('kpi-start-cost');
    this.bonusesCountEl = document.getElementById('kpi-bonuses-count');
    this.remainingCountEl = document.getElementById('kpi-remaining-count');
    this.reqAvgXEl = document.getElementById('kpi-req-avg-x');
    this.reqAvgDollarsEl = document.getElementById('kpi-req-avg-dollars');
    this.runAvgXEl = document.getElementById('kpi-run-avg-x');
    this.winningsEl = document.getElementById('kpi-winnings');
    this.profitEl = document.getElementById('kpi-profit');

    this.bestWinGame = document.getElementById('best-win-game');
    this.bestWinCaller = document.getElementById('best-win-caller');
    this.bestWinPayout = document.getElementById('best-win-payout');
    this.bestWinMult = document.getElementById('best-win-mult');

    this.luckyWinGame = document.getElementById('lucky-win-game');
    this.luckyWinCaller = document.getElementById('lucky-win-caller');
    this.luckyWinPayout = document.getElementById('lucky-win-payout');
    this.luckyWinMult = document.getElementById('lucky-win-mult');

    this.tableBodyEl = document.getElementById('bonuses-list');
    this.topGuessUserEl = document.getElementById('top-guess-user');

    this.modalEl = document.getElementById('hunt-modal');
    this.modalBalanceEl = document.getElementById('modal-final-balance');
    this.modalSummaryEl = document.getElementById('modal-summary');
    this.modalWinnerGuessEl = document.getElementById('modal-winner-guess');

    this.initAudio();
    this.initBroadcastChannel();
    this.initWebSocket();
    this.loadInitialDemo();
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

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
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
    } catch (_) {}
  }

  playFanfare() {
    this.playVictoriousTrumpetFanfare();
  }

  initBroadcastChannel() {
    try {
      this.bc = new BroadcastChannel('hunthub_bonushunt');
      this.bc.onmessage = (event) => {
        if (event.data && event.data.state) {
          this.handleStateUpdate(event.data.state);
        }
      };
    } catch {}

    window.addEventListener('storage', (e) => {
      if (e.key === 'hunthub_bonushunt_state' && e.newValue) {
        try {
          this.handleStateUpdate(JSON.parse(e.newValue));
        } catch {}
      } else if (e.key === 'hunthub_hunt_slots' && e.newValue !== null) {
        try {
          const slots = JSON.parse(e.newValue || '[]');
          this.handleStateUpdate(this.buildStateFromHuntSlots(slots));
        } catch {}
      } else if (e.key === 'hunthub_demo_users_purged' && e.newValue === 'true') {
        try {
          const slots = JSON.parse(localStorage.getItem('hunthub_hunt_slots') || '[]');
          this.handleStateUpdate(this.buildStateFromHuntSlots(slots));
        } catch {}
      }
    });
  }

  buildStateFromHuntSlots(rawSlots = []) {
    const bonuses = (Array.isArray(rawSlots) ? rawSlots : []).map((s, idx) => {
      const bet = Number(s.bet || s.betSize || 2.0);
      const payout = Number(s.payout || 0);
      const mult = bet > 0 && payout > 0 ? payout / bet : 0;
      const name = s.name || s.slotName || 'Casino Slot';
      const canon = window.SlotResolver ? window.SlotResolver.resolve(name, '../') : null;
      return {
        id: s.id || `b_${idx + 1}`,
        slotName: canon?.name || name,
        slotProvider: canon?.provider || s.provider || s.slotProvider || 'Casino',
        slotImage: canon?.image || s.image || s.slotImage || '',
        callerUsername: String(s.caller || s.callerUsername || 'Viewer').replace(/^@/, ''),
        betSize: bet,
        payout,
        multiplier: mult,
        status: payout > 0 ? 'OPENED' : 'PENDING'
      };
    });

    const totalBonuses = bonuses.length;
    const opened = bonuses.filter(b => b.payout > 0);
    const openedBonuses = opened.length;
    const remainingBonuses = Math.max(0, totalBonuses - openedBonuses);
    const winnings = bonuses.reduce((acc, b) => acc + b.payout, 0);
    const startCost = Number(localStorage.getItem('hunthub_hunt_start_cost') || 500);
    const profit = winnings - startCost;
    const runAverageX = openedBonuses > 0 ? opened.reduce((a, b) => a + b.multiplier, 0) / openedBonuses : 0;
    const needed = Math.max(0, startCost - winnings);
    const remBetSum = bonuses.filter(b => b.payout <= 0).reduce((a, b) => a + b.betSize, 0);
    const reqAverageX = remBetSum > 0 ? needed / remBetSum : 0;
    const reqAvgDollars = remainingBonuses > 0 ? needed / remainingBonuses : 0;
    const bestWin = opened.length > 0 ? [...opened].sort((a, b) => b.payout - a.payout)[0] : null;
    const luckyWin = opened.length > 0 ? [...opened].sort((a, b) => b.multiplier - a.multiplier)[0] : null;

    return {
      id: 'hunt_live',
      title: 'COMMUNITY BONUS HUNT',
      startCost,
      status: totalBonuses === 0 ? 'COLLECTING' : (remainingBonuses === 0 ? 'FINISHED' : 'OPENING'),
      bonuses,
      guesses: [],
      metrics: {
        startCost,
        totalBonuses,
        openedBonuses,
        remainingBonuses,
        winnings,
        endingBalance: winnings,
        profit,
        runAverageX,
        reqAverageX,
        reqAvgDollars,
        bestWin,
        luckyWin
      }
    };
  }

  initWebSocket() {
    const urlParams = new URLSearchParams(window.location.search);
    const port = urlParams.get('port') || '3001';
    const wsUrl = `ws://127.0.0.1:${port}/`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('[Bonus Hunt Overlay] Connected to HuntHub Server on ' + wsUrl);
        this.reconnectAttempts = 0;
        this.ws.send(JSON.stringify({ action: 'get_hunt_state' }));
      };

      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'hunt_update') {
            this.handleStateUpdate(payload.state);
          } else if (payload.action === 'hunt_state') {
            this.handleStateUpdate(payload.state);
          } else if (payload.targetOverlay === 'overlay-bonushunt' && payload.state) {
            this.handleStateUpdate(payload.state);
          }
        } catch (e) {
          console.warn('[Bonus Hunt Overlay] Error parsing message:', e);
        }
      };

      this.ws.onerror = () => {};

      this.ws.onclose = () => {
        this.reconnectAttempts++;
        const delay = Math.min(5000, 1000 * Math.pow(1.5, this.reconnectAttempts));
        setTimeout(() => this.initWebSocket(), delay);
      };
    } catch {}

    // Cross-process HTTP /api/sync/state fallback for OBS Browser Source
    if (!this._syncIntervalStarted) {
      this._syncIntervalStarted = true;
      setInterval(async () => {
        try {
          const res = await fetch(`http://127.0.0.1:${port}/api/sync/state`);
          if (!res.ok) return;
          const data = await res.json();
          const huntState = data?.overlays?.bonushunt;
          if (huntState && JSON.stringify(huntState) !== JSON.stringify(this.currentState)) {
            this.handleStateUpdate(huntState);
          }
        } catch {}
      }, 1500);
    }
  }

  animateNumberFlow(el, targetVal, prefix = '', suffix = '', decimals = 2) {
    if (!el) return;
    const end = Number(targetVal) || 0;
    const prev = Number(el.dataset.numVal ?? end);
    el.dataset.numVal = String(end);
    if (Math.abs(end - prev) < 0.005) {
      el.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
      return;
    }
    const startTime = performance.now();
    const duration = 520;
    el.classList.add('number-flow-rolling');
    const step = (now) => {
      const p = Math.min(1, (now - startTime) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = prev + (end - prev) * ease;
      el.textContent = `${prefix}${val.toFixed(decimals)}${suffix}`;
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
        el.classList.remove('number-flow-rolling');
      }
    };
    requestAnimationFrame(step);
  }

  loadInitialDemo() {
    try {
      const savedSlots = localStorage.getItem('hunthub_hunt_slots');
      if (savedSlots !== null) {
        const parsedSlots = JSON.parse(savedSlots);
        if (Array.isArray(parsedSlots)) {
          this.handleStateUpdate(this.buildStateFromHuntSlots(parsedSlots));
          return;
        }
      }
      const saved = localStorage.getItem('hunthub_bonushunt_state');
      if (saved) {
        this.handleStateUpdate(JSON.parse(saved));
        return;
      }
    } catch {}

    if (localStorage.getItem('hunthub_demo_users_purged') === 'true') {
      this.handleStateUpdate(this.buildStateFromHuntSlots([]));
      return;
    }

    // Default Demo State with Slot Images
    const demo = this.getDefaultDemoState();
    this.handleStateUpdate(demo);
  }

  getDefaultDemoState() {
    const resolveImg = (name, provider) => {
      if (window.SlotResolver && typeof window.SlotResolver.resolve === 'function') {
        const r = window.SlotResolver.resolve(name, '../');
        if (r && r.image) return r.image;
      }
      if (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function') {
        return window.SlotResolver.generateDataUriCard(name, provider);
      }
      return '';
    };
    const bonuses = [
      {
        id: 'b1',
        slotName: 'Wanted Dead or a Wild',
        slotProvider: 'Hacksaw Gaming',
        slotImage: resolveImg('Wanted Dead or a Wild', 'Hacksaw Gaming'),
        callerUsername: 'LuckyStriker',
        callerKickId: 101,
        betSize: 1.0,
        payout: 245.5,
        multiplier: 245.5,
        status: 'OPENED',
      },
      {
        id: 'b2',
        slotName: 'Gates of Olympus 1000',
        slotProvider: 'Pragmatic Play',
        slotImage: resolveImg('Gates of Olympus 1000', 'Pragmatic Play'),
        callerUsername: 'VegasKing',
        callerKickId: 102,
        betSize: 1.0,
        payout: 38.0,
        multiplier: 38.0,
        status: 'OPENED',
      },
      {
        id: 'b3',
        slotName: 'San Quentin xWays',
        slotProvider: 'Nolimit City',
        slotImage: resolveImg('San Quentin xWays', 'Nolimit City'),
        callerUsername: 'SlotQueen',
        callerKickId: 103,
        betSize: 0.4,
        payout: 120.0,
        multiplier: 300.0,
        status: 'OPENED',
      },
      {
        id: 'b4',
        slotName: 'Sugar Rush 1000',
        slotProvider: 'Pragmatic Play',
        slotImage: resolveImg('Sugar Rush 1000', 'Pragmatic Play'),
        callerUsername: 'SpinMaster',
        callerKickId: 104,
        betSize: 1.0,
        payout: 79.5,
        multiplier: 79.5,
        status: 'OPENED',
      },
      {
        id: 'b5',
        slotName: 'Rip City',
        slotProvider: 'Hacksaw Gaming',
        slotImage: resolveImg('Rip City', 'Hacksaw Gaming'),
        callerUsername: 'Strike777',
        callerKickId: 105,
        betSize: 1.0,
        payout: 0,
        multiplier: 0,
        status: 'OPENING',
      },
      {
        id: 'b6',
        slotName: 'Big Bass Splash',
        slotProvider: 'Pragmatic Play',
        slotImage: resolveImg('Big Bass Splash', 'Pragmatic Play'),
        callerUsername: 'BigBassBob',
        callerKickId: 106,
        betSize: 1.0,
        payout: 0,
        multiplier: 0,
        status: 'PENDING',
      },
      {
        id: 'b7',
        slotName: 'Cookout',
        slotProvider: 'Colorful Play',
        slotImage: resolveImg('Cookout', 'Colorful Play'),
        callerUsername: 'NeonWolf',
        callerKickId: 107,
        betSize: 1.0,
        payout: 0,
        multiplier: 0,
        status: 'PENDING',
      },
      {
        id: 'b8',
        slotName: 'Le Bandit',
        slotProvider: 'Hacksaw Gaming',
        slotImage: resolveImg('Le Bandit', 'Hacksaw Gaming'),
        callerUsername: 'RoyalFlush',
        callerKickId: 108,
        betSize: 1.0,
        payout: 0,
        multiplier: 0,
        status: 'PENDING',
      },
    ];

    return {
      id: 'hunt_demo',
      title: 'COMMUNITY BONUS HUNT #12',
      startCost: 500,
      status: 'OPENING',
      bonuses,
      guesses: [
        { username: 'LuckyStriker', kickId: 101, amount: 620, timestamp: Date.now() },
        { username: 'VegasKing', kickId: 102, amount: 480, timestamp: Date.now() },
      ],
      metrics: {
        startCost: 500,
        totalBonuses: 8,
        openedBonuses: 4,
        remainingBonuses: 4,
        winnings: 483.0,
        endingBalance: 483.0,
        profit: -17.0,
        runAverageX: 109.77,
        reqAverageX: 2.83,
        reqAvgDollars: 4.25,
        bestWin: bonuses[0],
        luckyWin: bonuses[2],
        closestGuess: { username: 'VegasKing', guess: 480, diff: 3.0 },
      },
    };
  }

  handleStateUpdate(state) {
    if (!state) return;
    const oldStatus = this.currentState ? this.currentState.status : null;
    this.currentState = state;

    // Headers in English
    if (this.titleEl) this.titleEl.textContent = (state.title || 'COMMUNITY BONUS HUNT').toUpperCase();
    if (this.statusTextEl) {
      const map = {
        COLLECTING: 'COLLECTING BONUSES',
        OPENING: 'OPENING BONUSES LIVE',
        FINISHED: 'HUNT COMPLETED',
      };
      this.statusTextEl.textContent = map[state.status] || state.status;
    }

    const m = state.metrics || {};
    this.animateNumberFlow(this.startCostEl, m.startCost || state.startCost || 0, '$', '', 2);
    if (this.bonusesCountEl) this.bonusesCountEl.textContent = `${m.openedBonuses || 0} / ${m.totalBonuses || 0}`;
    if (this.remainingCountEl) this.remainingCountEl.textContent = `${m.remainingBonuses || 0} remaining`;
    this.animateNumberFlow(this.reqAvgXEl, m.reqAverageX || 0, '', 'x', 2);
    if (this.reqAvgDollarsEl) this.reqAvgDollarsEl.textContent = `$${Number(m.reqAvgDollars || 0).toFixed(2)} / bonus`;
    this.animateNumberFlow(this.runAvgXEl, m.runAverageX || 0, '', 'x', 2);
    this.animateNumberFlow(this.winningsEl, m.winnings || 0, '$', '', 2);

    if (this.profitEl) {
      const prof = Number(m.profit || 0);
      const sign = prof >= 0 ? '+' : '';
      this.profitEl.textContent = `${sign}$${prof.toFixed(2)} P/L`;
      this.profitEl.style.color = prof >= 0 ? '#00e676' : '#ff3366';
    }

    // Highlights
    if (m.bestWin) {
      let bwName = m.bestWin.slotName;
      if (window.SlotResolver) {
        const res = window.SlotResolver.resolve(m.bestWin.slotName || m.bestWin, '../');
        if (res && res.name) bwName = res.name;
      }
      this.bestWinGame.textContent = bwName;
      this.bestWinCaller.textContent = `Call by @${m.bestWin.callerUsername}`;
      this.bestWinPayout.textContent = `$${Number(m.bestWin.payout).toFixed(2)}`;
      this.bestWinMult.textContent = `${Number(m.bestWin.multiplier).toFixed(2)}x`;
    }
    if (m.luckyWin) {
      let lwName = m.luckyWin.slotName;
      if (window.SlotResolver) {
        const res = window.SlotResolver.resolve(m.luckyWin.slotName || m.luckyWin, '../');
        if (res && res.name) lwName = res.name;
      }
      this.luckyWinGame.textContent = lwName;
      this.luckyWinCaller.textContent = `Call by @${m.luckyWin.callerUsername}`;
      this.luckyWinPayout.textContent = `$${Number(m.luckyWin.payout).toFixed(2)}`;
      this.luckyWinMult.textContent = `${Number(m.luckyWin.multiplier).toFixed(2)}x`;
    }

    // Top guess ticker
    if (m.closestGuess && this.topGuessUserEl) {
      this.topGuessUserEl.textContent = `@${m.closestGuess.username} ($${m.closestGuess.guess.toFixed(2)} · Diff: $${m.closestGuess.diff.toFixed(2)})`;
    }

    // Heal any cached bonus images via SlotResolver before rendering
    if (Array.isArray(state.bonuses) && window.SlotResolver) {
      let healed = false;
      state.bonuses.forEach(b => {
        if (!b) return;
        const resolved = window.SlotResolver.resolve(b.slotName || b.name || b, '../');
        if (resolved && resolved.image && b.slotImage !== resolved.image) {
          b.slotImage = resolved.image;
          if (!b.slotProvider || b.slotProvider === 'Casino') b.slotProvider = resolved.provider || b.slotProvider;
          healed = true;
        }
      });
      if (healed) {
        try { localStorage.setItem('hunthub_bonushunt_state', JSON.stringify(state)); } catch (_) {}
      }
    }

    // Render Table
    this.renderTable(state.bonuses || []);

    // Finished Celebration
    if (state.status === 'FINISHED' && oldStatus !== 'FINISHED') {
      this.triggerFinishCelebration(state);
    } else if (state.status !== 'FINISHED' && this.modalEl) {
      this.modalEl.classList.remove('active');
    }
  }

  buildBonusRowElement(b, idx) {
    const row = document.createElement('div');
    const isOpening = b.status === 'OPENING';
    const isOpened = b.status === 'OPENED';
    row.className = `bonus-row ${isOpening ? 'row-opening status-opening' : ''} ${isOpened ? 'row-opened' : ''}`;

    const statusMap = {
      PENDING: '<span class="row-status-pill st-pending">PENDING</span>',
      OPENING: '<span class="row-status-pill st-opening">OPENING ⚡</span>',
      OPENED: '<span class="row-status-pill st-opened">OPENED ✓</span>',
    };

    let resolvedSlot = null;
    if (window.SlotResolver) {
      resolvedSlot = window.SlotResolver.resolve(b.slotName || b.name || b, '../');
    }
    const slotNameDisplay = (resolvedSlot && resolvedSlot.name) || b.slotName || b.name || 'Unknown Slot';
    const slotProviderDisplay = (resolvedSlot && (resolvedSlot.badge || resolvedSlot.provider)) || b.slotProvider || b.provider || 'Casino';
    const fallbackCardUri = (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function')
      ? window.SlotResolver.generateDataUriCard(slotNameDisplay, slotProviderDisplay)
      : '';
    const isStaleSvg = b.slotImage && /\.svg(\?.*)?$/i.test(String(b.slotImage));
    const slotImgSrc = (resolvedSlot && resolvedSlot.image) || (!isStaleSvg && b.slotImage) || fallbackCardUri;

    const imgHtml = slotImgSrc
      ? `<img class="slot-thumb-img" src="${slotImgSrc}" alt="" onerror="this.onerror=null; this.src='${fallbackCardUri}';" />`
      : `<div class="slot-thumb-fallback" style="display:flex; width:100%; height:100%; align-items:center; justify-content:center; font-size:18px;">🎰</div>`;

    row.innerHTML = `
      <span class="row-num">${idx + 1}</span>
      <div class="row-slot-box">
        <div class="slot-thumb">
          ${imgHtml}
        </div>
        <div class="slot-titles">
          <span class="slot-main-title">${slotNameDisplay}</span>
          <span class="slot-provider-badge">${slotProviderDisplay}</span>
        </div>
      </div>
      <span class="row-caller">@${b.callerUsername || 'Streamer'}</span>
      <span class="row-bet">$${Number(b.betSize || 1).toFixed(2)}</span>
      <span class="row-payout">${isOpened ? `$${Number(b.payout || 0).toFixed(2)}` : '-'}</span>
      <span class="row-mult">${isOpened ? `${Number(b.multiplier || 0).toFixed(2)}x` : '-'}</span>
      ${statusMap[b.status] || statusMap.PENDING}
    `;
    return row;
  }

  renderTable(bonuses) {
    if (!this.tableBodyEl) return;
    this.tableBodyEl.innerHTML = '';

    const isTickerActive = Array.isArray(bonuses) && bonuses.length > 8;
    this.tableBodyEl.classList.toggle('ticker-loop-active', isTickerActive);

    const track = document.createElement('div');
    track.className = 'ticker-scroll-track';
    if (isTickerActive) {
      const durationSec = Math.max(18, bonuses.length * 2.2);
      this.tableBodyEl.style.setProperty('--ticker-duration', `${durationSec}s`);
    }

    bonuses.forEach((b, idx) => {
      track.appendChild(this.buildBonusRowElement(b, idx));
    });

    // Duplicate items seamlessly when > 8 bonuses for continuous infinite vertical ticker loop
    if (isTickerActive) {
      bonuses.forEach((b, idx) => {
        const clone = this.buildBonusRowElement(b, idx);
        clone.dataset.tickerClone = 'true';
        track.appendChild(clone);
      });
    }

    this.tableBodyEl.appendChild(track);
  }

  triggerFinishCelebration(state) {
    this.playFanfare();

    if (window.confetti) {
      window.confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#00e5ff', '#00e676', '#ffffff'],
      });
    }

    if (this.modalEl && state.metrics) {
      const m = state.metrics;
      this.modalBalanceEl.textContent = `$${m.winnings.toFixed(2)}`;
      const sign = m.profit >= 0 ? '+' : '';
      this.modalSummaryEl.textContent = `Avg X: ${m.runAverageX.toFixed(2)}x · Net Profit: ${sign}$${m.profit.toFixed(2)}`;

      if (m.closestGuess) {
        this.modalWinnerGuessEl.textContent = `@${m.closestGuess.username} with $${m.closestGuess.guess.toFixed(2)} (Diff: $${m.closestGuess.diff.toFixed(2)})`;
      }
      this.modalEl.classList.add('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.bonusHuntOverlay = new BonusHuntOverlayApp();
});
