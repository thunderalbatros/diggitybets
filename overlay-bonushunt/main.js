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
    this.initKickDirectGuesses();
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
        } else if (event.data && Array.isArray(event.data.slots)) {
          this.handleStateUpdate(this.buildStateFromHuntSlots(event.data.slots));
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
        bonusTier: s.bonusTier || s.tierBadge || '3S',
        status: payout > 0 ? 'OPENED' : 'PENDING'
      };
    });

    const totalBonuses = bonuses.length;
    const opened = bonuses.filter(b => b.payout > 0);
    const openedBonuses = opened.length;
    const remainingBonuses = Math.max(0, totalBonuses - openedBonuses);
    const winnings = bonuses.reduce((acc, b) => acc + b.payout, 0);
    const isHuntActive = localStorage.getItem('hunthub_hunt_active') === 'true' && totalBonuses > 0;
    const startCost = totalBonuses === 0 ? 0 : Number(localStorage.getItem('hunthub_hunt_start_cost') || (isHuntActive ? 500 : 0));
    const profit = totalBonuses === 0 ? 0 : (winnings - startCost);
    const runAverageX = openedBonuses > 0 ? opened.reduce((a, b) => a + b.multiplier, 0) / openedBonuses : 0;
    const needed = Math.max(0, startCost - winnings);
    const remBetSum = bonuses.filter(b => b.payout <= 0).reduce((a, b) => a + b.betSize, 0);
    const reqAverageX = remBetSum > 0 ? needed / remBetSum : 0;
    const reqAvgDollars = remainingBonuses > 0 ? needed / remainingBonuses : 0;
    const bestWin = opened.length > 0 ? [...opened].sort((a, b) => b.payout - a.payout)[0] : null;
    const luckyWin = opened.length > 0 ? [...opened].sort((a, b) => b.multiplier - a.multiplier)[0] : null;

    let guesses = Array.isArray(this.liveGuesses) ? [...this.liveGuesses] : [];
    try {
      const g1 = JSON.parse(localStorage.getItem('hunthub_hunt_guesses') || '[]');
      const g2 = JSON.parse(localStorage.getItem('hunthub_bh_guesses') || '[]');
      [...(Array.isArray(g1) ? g1 : []), ...(Array.isArray(g2) ? g2 : [])].forEach(g => {
        const u = String(g?.user || g?.username || '').trim().replace(/^@/, '');
        const amt = Number(g?.amount || g?.guess || 0);
        if (u && amt > 0) {
          const idx = guesses.findIndex(x => x.username.toLowerCase() === u.toLowerCase());
          if (idx >= 0) guesses[idx].guess = amt;
          else guesses.push({ username: u, guess: amt });
        }
      });
    } catch (_) {}

    let closestGuess = null;
    if (guesses.length > 0) {
      const refBalance = winnings > 0 ? winnings : startCost;
      const sortedG = guesses
        .map(g => ({ username: g.username, guess: g.guess, diff: Math.abs(g.guess - refBalance) }))
        .sort((a, b) => a.diff - b.diff);
      closestGuess = sortedG[0];
    }

    return {
      id: 'hunt_live',
      title: 'COMMUNITY BONUS HUNT',
      startCost,
      status: totalBonuses === 0 ? 'WAITING' : (remainingBonuses === 0 ? 'FINISHED' : 'OPENING'),
      bonuses,
      guesses,
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
        luckyWin,
        closestGuess
      }
    };
  }

  initWebSocket() {
    const urlParams = new URLSearchParams(window.location.search);
    const isLocalHost = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' || window.location.protocol === 'file:';
    const port = urlParams.get('port') || '3001';

    // Always start cross-process HTTP /api/sync/state polling for OBS Browser Sources (both production & localhost)
    if (!this._syncIntervalStarted) {
      this._syncIntervalStarted = true;
      this._lastEdgeTs = 0;
      setInterval(async () => {
        if (document.hidden) return;
        try {
          const syncUrl = isLocalHost && urlParams.has('port')
            ? `http://127.0.0.1:${port}/api/sync/state`
            : '/api/sync/state';
          const res = await fetch(syncUrl, { cache: 'no-store' });
          if (!res.ok) return;
          const data = await res.json();
          const bhEvt = data?.overlayEvents?.['overlay-bonushunt'] || data?.bonushuntState;
          if (bhEvt && Array.isArray(bhEvt.slots) && Number(bhEvt.ts || 0) > this._lastEdgeTs) {
            this._lastEdgeTs = Number(bhEvt.ts || Date.now());
            this.handleStateUpdate(this.buildStateFromHuntSlots(bhEvt.slots));
            return;
          }
          const huntState = data?.bonushuntState?.bonuses ? data.bonushuntState : data?.overlays?.bonushunt;
          if (huntState && JSON.stringify(huntState) !== JSON.stringify(this.currentState)) {
            this.handleStateUpdate(huntState);
          }
        } catch {}
      }, 2500);
    }

    if (!isLocalHost && !urlParams.has('port')) return;
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
        this.reconnectAttempts = (this.reconnectAttempts || 0) + 1;
        const delay = Math.min(30000, 1000 * Math.pow(1.6, this.reconnectAttempts));
        setTimeout(() => this.initWebSocket(), delay);
      };
    } catch {}
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
    const demoCallers = new Set([
      'luckystriker', 'vegasking', 'slotqueen', 'spinmaster', 'strike777',
      'bigbassbob', 'neonwolf', 'royalflush', 'nachogamer', 'slotking21',
      'diggityfan', 'cryptospin', 'aguskick', 'valen99', 'stakehunter'
    ]);
    try {
      const savedSlots = localStorage.getItem('hunthub_hunt_slots');
      if (savedSlots !== null) {
        const parsedSlots = JSON.parse(savedSlots);
        if (Array.isArray(parsedSlots)) {
          const cleanSlots = parsedSlots.filter(s => {
            const c = String(s?.caller || s?.callerUsername || '').trim().toLowerCase().replace(/^@/, '');
            return !demoCallers.has(c);
          });
          if (cleanSlots.length !== parsedSlots.length) {
            try { localStorage.setItem('hunthub_hunt_slots', JSON.stringify(cleanSlots)); } catch {}
          }
          this.handleStateUpdate(this.buildStateFromHuntSlots(cleanSlots));
          return;
        }
      }
    } catch {}

    // Always default to an empty Bonus Hunt state until the streamer starts a hunt or adds slots
    this.handleStateUpdate(this.buildStateFromHuntSlots([]));
  }

  initKickDirectGuesses() {
    this.liveGuesses = [];
    const connectPusher = () => {
      try {
        const ws = new WebSocket('wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0-rc2&flash=false');
        ws.onopen = () => {
          ws.send(JSON.stringify({
            event: 'pusher:subscribe',
            data: { auth: '', channel: 'chatrooms.86765775.v2' }
          }));
        };
        ws.onmessage = (evt) => {
          try {
            const msg = JSON.parse(evt.data);
            if (!msg.event || !msg.event.includes('ChatMessageEvent')) return;
            const d = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
            const rawText = String(d?.content || '').trim();
            const sender = String(d?.sender?.username || d?.sender?.slug || '').trim().replace(/^@/, '');
            if (!sender || !rawText.startsWith('!')) return;

            const parts = rawText.split(/\s+/);
            const cmd = parts[0].toLowerCase();
            const arg = parts.slice(1).join(' ').trim();
            if (cmd === '!guess' || cmd === '!gtb') {
              const numVal = parseFloat(arg.replace(/[^0-9.]/g, ''));
              if (!isNaN(numVal) && numVal > 0) {
                const idx = this.liveGuesses.findIndex(g => g.username.toLowerCase() === sender.toLowerCase());
                if (idx >= 0) this.liveGuesses[idx].guess = numVal;
                else this.liveGuesses.push({ username: sender, guess: numVal });
                if (this.topGuessUserEl) {
                  this.topGuessUserEl.textContent = `@${sender} guessed $${numVal.toFixed(2)} (${this.liveGuesses.length} total)`;
                }
              }
            }
          } catch (_) {}
        };
        ws.onclose = () => setTimeout(connectPusher, 6000);
      } catch (_) {}
    };
    connectPusher();
  }

  getDefaultDemoState() {
    return this.buildStateFromHuntSlots([]);
  }

  handleStateUpdate(state) {
    if (!state) return;
    const oldStatus = this.currentState ? this.currentState.status : null;
    this.currentState = state;

    const m = state.metrics || {};

    // Headers in English
    if (this.titleEl) this.titleEl.textContent = (state.title || 'COMMUNITY BONUS HUNT').toUpperCase();
    if (this.statusTextEl) {
      const map = {
        WAITING: 'WAITING FOR HUNT',
        COLLECTING: (m.totalBonuses || 0) === 0 ? 'WAITING FOR HUNT' : 'COLLECTING BONUSES',
        OPENING: 'OPENING BONUSES LIVE',
        FINISHED: 'HUNT COMPLETED',
      };
      this.statusTextEl.textContent = map[state.status] || state.status || 'WAITING FOR HUNT';
    }

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
      if (this.bestWinGame) this.bestWinGame.textContent = bwName;
      if (this.bestWinCaller) this.bestWinCaller.textContent = `Call by @${String(m.bestWin.callerUsername || 'Viewer').replace(/^@/, '')}`;
      if (this.bestWinPayout) this.bestWinPayout.textContent = `$${Number(m.bestWin.payout).toFixed(2)}`;
      if (this.bestWinMult) this.bestWinMult.textContent = `${Number(m.bestWin.multiplier).toFixed(2)}x`;
    } else {
      if (this.bestWinGame) this.bestWinGame.textContent = '—';
      if (this.bestWinCaller) this.bestWinCaller.textContent = 'Waiting for bonuses...';
      if (this.bestWinPayout) this.bestWinPayout.textContent = '$0.00';
      if (this.bestWinMult) this.bestWinMult.textContent = '0.00x';
    }

    if (m.luckyWin) {
      let lwName = m.luckyWin.slotName;
      if (window.SlotResolver) {
        const res = window.SlotResolver.resolve(m.luckyWin.slotName || m.luckyWin, '../');
        if (res && res.name) lwName = res.name;
      }
      if (this.luckyWinGame) this.luckyWinGame.textContent = lwName;
      if (this.luckyWinCaller) this.luckyWinCaller.textContent = `Call by @${String(m.luckyWin.callerUsername || 'Viewer').replace(/^@/, '')}`;
      if (this.luckyWinPayout) this.luckyWinPayout.textContent = `$${Number(m.luckyWin.payout).toFixed(2)}`;
      if (this.luckyWinMult) this.luckyWinMult.textContent = `${Number(m.luckyWin.multiplier).toFixed(2)}x`;
    } else {
      if (this.luckyWinGame) this.luckyWinGame.textContent = '—';
      if (this.luckyWinCaller) this.luckyWinCaller.textContent = 'Waiting for bonuses...';
      if (this.luckyWinPayout) this.luckyWinPayout.textContent = '$0.00';
      if (this.luckyWinMult) this.luckyWinMult.textContent = '0.00x';
    }

    // Top guess ticker
    if (this.topGuessUserEl) {
      if (m.closestGuess) {
        this.topGuessUserEl.textContent = `@${m.closestGuess.username} ($${m.closestGuess.guess.toFixed(2)} · Diff: $${m.closestGuess.diff.toFixed(2)})`;
      } else {
        this.topGuessUserEl.textContent = 'No guesses yet (!guess <amount>)';
      }
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

  esc(str) {
    return String(str ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
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
      ? `<img class="slot-thumb-img" src="${this.esc(slotImgSrc)}" alt="" onerror="this.onerror=null; this.src='${this.esc(fallbackCardUri)}';" />`
      : `<div class="slot-thumb-fallback" style="display:flex; width:100%; height:100%; align-items:center; justify-content:center; font-size:18px;">🎰</div>`;

    const tierCode = String(b.bonusTier || '3S').toUpperCase();
    const tierLabelMap = {
      '3S': { text: '3 SCATTERS', cls: 'tier-3s' },
      '4S': { text: '🥈 4S SILVER', cls: 'tier-4s' },
      '5S': { text: '🥇 5S GOLD', cls: 'tier-5s' },
      '6S': { text: '🌈 6S HOLO', cls: 'tier-6s' },
      'SUPER': { text: '🔥 SUPER BONUS', cls: 'tier-super' },
      'HIDDEN': { text: '🕵️ HIDDEN EPIC', cls: 'tier-hidden' },
      'MAX': { text: '⚡ MAX VOL', cls: 'tier-max' },
      'BOUGHT': { text: '🛒 BOUGHT', cls: 'tier-bought' }
    };
    const tierInfo = tierLabelMap[tierCode] || tierLabelMap['3S'];

    row.innerHTML = `
      <span class="row-num">${idx + 1}</span>
      <div class="row-slot-box">
        <div class="slot-thumb">
          ${imgHtml}
        </div>
        <div class="slot-titles">
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span class="slot-main-title">${this.esc(slotNameDisplay)}</span>
            <span class="bh-tier-badge ${tierInfo.cls}">${tierInfo.text}</span>
          </div>
          <span class="slot-provider-badge">${this.esc(slotProviderDisplay)}</span>
        </div>
      </div>
      <span class="row-caller">@${this.esc(b.callerUsername || 'Streamer')}</span>
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

    if (!Array.isArray(bonuses) || bonuses.length === 0) {
      this.tableBodyEl.classList.remove('ticker-loop-active');
      const emptyEl = document.createElement('div');
      emptyEl.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 48px 20px; color: #94a3b8; font-family: "Chakra Petch", sans-serif; text-align: center;';
      emptyEl.innerHTML = `
        <span style="font-size: 28px; opacity: 0.7;">💎</span>
        <strong style="font-size: 15px; color: #cbd5e1; letter-spacing: 1px;">NO BONUSES LOADED YET — WAITING FOR HUNT TO START</strong>
        <span style="font-size: 12px; color: #64748b;">Bonuses added from the Control Panel will appear here in real time.</span>
      `;
      this.tableBodyEl.appendChild(emptyEl);
      return;
    }

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
