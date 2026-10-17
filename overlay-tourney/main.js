/**
 * HuntHub — 8-Bracket Tournament Overlay Client
 * Robust Dual-Engine (WebSocket + BroadcastChannel + LocalStorage fallback)
 * Native Zero-Dependency SVG/DOM Tournament Grid
 */

class TourneyOverlayApp {
  constructor() {
    this.ws = null;
    this.audioCtx = null;
    this.currentState = null;
    this.reconnectAttempts = 0;
    this.broadcastChannel = null;

    this.initAudio();
    this.initElements();
    this.initBroadcastChannel();
    this.initWebSocket();
    this.loadInitialState();
    this.setupAutoScaling();
  }

  initElements() {
    this.titleEl = document.getElementById('tourney-title');
    this.betEl = document.getElementById('header-bet');
    this.prizeEl = document.getElementById('header-prize');
    this.statusText = document.getElementById('tourney-status-text');

    // Champion Modal
    this.modal = document.getElementById('champion-modal');
    this.champName = document.getElementById('champion-name');
    this.champSlot = document.getElementById('champion-slot');
    this.champPrize = document.getElementById('champion-prize');
  }

  initAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.audioCtx = new AudioContextClass();
    }
    window.addEventListener('click', () => {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }, { once: true });
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

  normalizeState(state) {
    if (!state || typeof state !== 'object') return this.getEmptyTournamentState();
    const cloned = { ...state };
    if (cloned.matches && !Array.isArray(cloned.matches) && typeof cloned.matches === 'object') {
      const order = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'];
      cloned.matches = order.map((id, idx) => {
        const m = cloned.matches[id] || {};
        return {
          id,
          round: m.round || (idx < 4 ? 1 : (idx < 6 ? 2 : 3)),
          matchNumber: m.matchNumber || (idx + 1),
          player1: m.player1 || null,
          player2: m.player2 || null,
          score1: m.score1 ?? 0,
          score2: m.score2 ?? 0,
          winner: m.winner || null,
          status: m.status || 'PENDING',
        };
      });
    } else if (Array.isArray(cloned.matches)) {
      cloned.matches = cloned.matches.map((m) => ({ ...m }));
    } else {
      cloned.matches = this.getEmptyTournamentState().matches;
    }

    // Keep participants array synced with quarterfinal slots if missing or shorter
    const qfPlayers = [];
    for (let i = 0; i < 4; i++) {
      const m = cloned.matches[i];
      if (m && m.player1) qfPlayers.push(m.player1);
      if (m && m.player2) qfPlayers.push(m.player2);
    }
    if (!Array.isArray(cloned.participants) || cloned.participants.length < qfPlayers.length) {
      cloned.participants = qfPlayers;
    }
    return cloned;
  }

  initBroadcastChannel() {
    try {
      this.broadcastChannel = new BroadcastChannel('hunthub_tourney');
      this.broadcastChannel.onmessage = (event) => {
        if (!event.data) return;
        const data = event.data;
        if (data.action === 'reset_tourney') {
          const emptyState = this.normalizeState(data.state || this.getEmptyTournamentState());
          try {
            localStorage.setItem('hunthub_tourney_state', JSON.stringify(emptyState));
          } catch {}
          if (this.modal) this.modal.classList.remove('active');
          this.handleStateUpdate(emptyState, true);
        } else if (data.action === 'add_participant') {
          if (data.state) {
            this.handleStateUpdate(data.state, false);
          } else {
            this.handleAddParticipant(data.participant);
          }
        } else if (data.action === 'match_result' || data.action === 'match_winner_spins') {
          if (data.state) {
            this.handleStateUpdate(data.state, false);
          } else {
            this.handleMatchAdvancement(data);
          }
        } else if (data.action === 'tourney_update' || data.type === 'tournament_update' || data.action === 'state_update' || data.action === 'open_tourney' || data.action === 'set_mode') {
          if (data.state) {
            this.handleStateUpdate(data.state, false);
          }
        } else if (data.state) {
          this.handleStateUpdate(data.state, false);
        }
      };
    } catch {}

    window.addEventListener('storage', (e) => {
      if (e.key === 'hunthub_tourney_add_player' && e.newValue) {
        try {
          const { participant } = JSON.parse(e.newValue);
          this.handleAddParticipant(participant);
        } catch {}
      } else if (e.key === 'hunthub_tourney_state') {
        if (!e.newValue) {
          const emptyState = this.getEmptyTournamentState();
          if (this.modal) this.modal.classList.remove('active');
          this.handleStateUpdate(emptyState, true);
        } else {
          try {
            this.handleStateUpdate(JSON.parse(e.newValue));
          } catch {}
        }
      }
    });
  }

  isSamePlayer(a, b) {
    if (!a || !b) return false;
    if (typeof a === 'object' && typeof b === 'object') {
      if (a.id && b.id && String(a.id) === String(b.id)) return true;
      if (a.kickId && b.kickId && String(a.kickId) === String(b.kickId)) return true;
    }
    const rawA = typeof a === 'string' ? a : (a.username || a.displayName || '');
    const rawB = typeof b === 'string' ? b : (b.username || b.displayName || '');
    const ua = String(rawA).replace(/^@/, '').trim().toLowerCase();
    const ub = String(rawB).replace(/^@/, '').trim().toLowerCase();
    return Boolean(ua && ub && ua === ub);
  }

  handleMatchAdvancement(payload) {
    this.currentState = this.normalizeState(this.currentState || this.getDefaultDemoState());
    const matchId = payload.matchId;
    const match = this.currentState.matches.find((m) => m.id === matchId);
    if (!match || !match.player1 || !match.player2) return;

    if (payload.action === 'match_winner_spins') {
      const side = Number(payload.winnerSide) === 2 ? 2 : 1;
      match.score1 = side === 1 ? 'WIN' : 'LOSE';
      match.score2 = side === 2 ? 'WIN' : 'LOSE';
      match.winner = side === 1 ? match.player1 : match.player2;
    } else {
      const s1 = Number(payload.score1) || 0;
      const s2 = Number(payload.score2) || 0;
      match.score1 = s1;
      match.score2 = s2;
      match.winner = s1 >= s2 ? match.player1 : match.player2;
    }
    match.status = 'FINISHED';

    // Advance winner to next round
    const nextMap = {
      m1: { target: 'm5', slot: 'player1' },
      m2: { target: 'm5', slot: 'player2' },
      m3: { target: 'm6', slot: 'player1' },
      m4: { target: 'm6', slot: 'player2' },
      m5: { target: 'm7', slot: 'player1' },
      m6: { target: 'm7', slot: 'player2' },
    };

    const nextInfo = nextMap[matchId];
    if (nextInfo) {
      const nextMatch = this.currentState.matches.find((m) => m.id === nextInfo.target);
      if (nextMatch) {
        nextMatch[nextInfo.slot] = { ...match.winner };
        nextMatch.status = (nextMatch.player1 && nextMatch.player2) ? 'RUNNING' : 'PENDING';
      }
      this.currentState.status = 'IN_PROGRESS';
    } else if (matchId === 'm7') {
      this.currentState.champion = {
        ...match.winner,
        multiplier: typeof match.score1 === 'number' || typeof match.score2 === 'number'
          ? Math.max(Number(match.score1) || 0, Number(match.score2) || 0)
          : 'WIN',
      };
      this.currentState.status = 'FINISHED';
    }

    try {
      localStorage.setItem('hunthub_tourney_state', JSON.stringify(this.currentState));
    } catch {}

    this.handleStateUpdate(this.currentState, false);
  }

  handleAddParticipant(participant) {
    if (!participant) return;

    this.currentState = this.normalizeState(this.currentState || this.getEmptyTournamentState());

    const m = this.currentState.matches;
    const allQuarterfinalsFull = Boolean(
      m[0]?.player1 && m[0]?.player2 &&
      m[1]?.player1 && m[1]?.player2 &&
      m[2]?.player1 && m[2]?.player2 &&
      m[3]?.player1 && m[3]?.player2
    );

    // Auto-clear demo bracket or finished/full bracket when starting Seed 1/8 of a new tournament
    if (this.currentState.isDemo || this.currentState.status === 'FINISHED' || (allQuarterfinalsFull && Number(participant.seed) === 1)) {
      this.currentState = this.getEmptyTournamentState();
    }

    // Resolve slot image if missing
    if (!participant.slotImage && window.SlotResolver && participant.slotName) {
      const found = window.SlotResolver.resolve(participant.slotName, '../');
      if (found) {
        participant.slotName = found.name || participant.slotName;
        participant.slotImage = found.image;
      }
    }

    if (!this.currentState.participants) this.currentState.participants = [];

    let seedIdx = 0;
    if (typeof participant.seed === 'number' && participant.seed >= 1 && participant.seed <= 8) {
      seedIdx = participant.seed - 1;
    } else {
      const existingIdx = this.currentState.participants.findIndex(
        (p) => this.isSamePlayer(p, participant)
      );
      if (existingIdx >= 0) {
        seedIdx = existingIdx;
      } else {
        seedIdx = this.currentState.participants.length % 8;
      }
    }

    const matches = this.currentState.matches;
    if (seedIdx === 0 && matches[0]) matches[0].player1 = participant;
    else if (seedIdx === 1 && matches[0]) matches[0].player2 = participant;
    else if (seedIdx === 2 && matches[1]) matches[1].player1 = participant;
    else if (seedIdx === 3 && matches[1]) matches[1].player2 = participant;
    else if (seedIdx === 4 && matches[2]) matches[2].player1 = participant;
    else if (seedIdx === 5 && matches[2]) matches[2].player2 = participant;
    else if (seedIdx === 6 && matches[3]) matches[3].player1 = participant;
    else if (seedIdx === 7 && matches[3]) matches[3].player2 = participant;

    // Refresh participants list from Quarterfinal slots
    const qfPlayers = [];
    for (let i = 0; i < 4; i++) {
      if (matches[i]?.player1) qfPlayers.push(matches[i].player1);
      if (matches[i]?.player2) qfPlayers.push(matches[i].player2);
      if (matches[i]?.player1 && matches[i]?.player2 && matches[i].status === 'PENDING') {
        matches[i].status = 'IN_PROGRESS';
      }
    }
    this.currentState.participants = qfPlayers;
    this.currentState.isDemo = false;
    this.currentState.status = qfPlayers.length >= 8 ? 'IN_PROGRESS' : 'LOBBY';
    this.currentState.champion = null;

    try {
      localStorage.setItem('hunthub_tourney_state', JSON.stringify(this.currentState));
    } catch {}

    this.handleStateUpdate(this.currentState, false);
  }

  getEmptyTournamentState() {
    return {
      id: 'tourney_' + Date.now(),
      title: '8-BRACKET SLOT CHAMPIONSHIP',
      status: 'LOBBY',
      mode: 'BONUS_BUY',
      betPerRound: 10,
      prizeText: '1st: $150 · 2nd: $50',
      participants: [],
      matches: [
        { id: 'm1', round: 1, matchNumber: 1, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        { id: 'm2', round: 1, matchNumber: 2, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        { id: 'm3', round: 1, matchNumber: 3, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        { id: 'm4', round: 1, matchNumber: 4, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        { id: 'm5', round: 2, matchNumber: 5, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        { id: 'm6', round: 2, matchNumber: 6, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        { id: 'm7', round: 3, matchNumber: 7, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
      ],
      champion: null,
    };
  }

  initWebSocket() {
    const urlParams = new URLSearchParams(window.location.search);
    const port = urlParams.get('port') || '3001';
    const isLocalHost = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    if (!isLocalHost && !urlParams.get('port')) {
      return;
    }
    const wsUrl = `ws://127.0.0.1:${port}/`;

    // Cross-process HTTP /api/sync/state fallback for OBS Browser Source
    try {
      fetch(`http://127.0.0.1:${port}/api/sync/state`).catch(() => {});
    } catch (_) {}

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.ws.send(JSON.stringify({ action: 'get_tourney_state' }));
      };

      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'tournament_update' && payload.state) {
            this.handleStateUpdate(payload.state);
          } else if (payload.action === 'tourney_state' && payload.state) {
            this.handleStateUpdate(payload.state);
          } else if (payload.type === 'overlay_sync_event' && payload.event && payload.event.target === 'overlay-tourney' && payload.event.state) {
            this.handleStateUpdate(payload.event.state);
          }
        } catch (e) {
          console.warn('[Tourney Overlay] Error parsing message:', e);
        }
      };

      this.ws.onerror = () => {};

      this.ws.onclose = () => {
        const timeout = Math.min(1000 * Math.pow(1.5, this.reconnectAttempts), 8000);
        this.reconnectAttempts++;
        setTimeout(() => this.initWebSocket(), timeout);
      };
    } catch (e) {
      setTimeout(() => this.initWebSocket(), 3000);
    }
  }

  loadInitialState() {
    if (this.modal) {
      this.modal.classList.remove('active');
    }
    // 1. Check localStorage first
    try {
      const saved = localStorage.getItem('hunthub_tourney_state');
      if (saved) {
        const state = JSON.parse(saved);
        this.handleStateUpdate(state, true);
        return;
      }
    } catch {}

    // 2. Fallback to clean IN_PROGRESS bracket (NEVER FINISHED on load so no unsolicited winner popup appears!)
    const defaultDemo = this.getDefaultDemoState();
    this.handleStateUpdate(defaultDemo, true);
  }

  getDefaultDemoState() {
    const participants = [
      { id: 'p1', kickId: 101, username: 'LuckyStriker', displayName: 'LuckyStriker', slotName: 'Wanted Dead or a Wild', slotImage: 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format', seed: 1, isDemo: true },
      { id: 'p2', kickId: 102, username: 'VegasKing', displayName: 'VegasKing', slotName: 'Gates of Olympus 1000', slotImage: 'https://mediumrare.imgix.net/fdf333e96a5e21555bbb4e9e04a3ee4e1986c9cca9aa75141597041cc8334d23?w=360&auto=format', seed: 8, isDemo: true },
      { id: 'p3', kickId: 103, username: 'SlotQueen', displayName: 'SlotQueen', slotName: 'San Quentin xWays', slotImage: 'https://mediumrare.imgix.net/ca243d6c3db42259d6859b80717eb378eb64e41a9d1b1f7fdeadde68d59d9ad5?w=360&auto=format', seed: 4, isDemo: true },
      { id: 'p4', kickId: 104, username: 'SpinMaster', displayName: 'SpinMaster', slotName: 'Sugar Rush 1000', slotImage: 'https://mediumrare.imgix.net/14d5410c6cf4c303d291262a10e949dc14b0ac2eca2a7a730b0401919c01358e?w=360&auto=format', seed: 5, isDemo: true },
      { id: 'p5', kickId: 105, username: 'Strike777', displayName: 'Strike777', slotName: 'RIP City', slotImage: 'https://mediumrare.imgix.net/34d643b7d8c0b23e734742e5d1c32eb6beb29ee34a69e7cd97486db6c125a2db?w=360&auto=format', seed: 2, isDemo: true },
      { id: 'p6', kickId: 106, username: 'BigBassBob', displayName: 'BigBassBob', slotName: 'Big Bass Splash', slotImage: 'https://mediumrare.imgix.net/98801318d067e57c3d22f9453d970d5278bf253365600c4d93841b9c994bf82a?w=360&auto=format', seed: 7, isDemo: true },
      { id: 'p7', kickId: 107, username: 'NeonWolf', displayName: 'NeonWolf', slotName: 'Chaos Crew 2', slotImage: 'https://mediumrare.imgix.net/6cc2e6228b274e48ff6045944b153810db7131ad61d90cabce5aa35176c639e9?w=360&auto=format', seed: 3, isDemo: true },
      { id: 'p8', kickId: 108, username: 'RoyalFlush', displayName: 'RoyalFlush', slotName: 'Le Bandit', slotImage: 'https://mediumrare.imgix.net/8ade942d35d2cdbddf7888f303be4cf4bda8c650a112b3c53f7c6f3ccad81254?w=360&auto=format', seed: 6, isDemo: true },
    ];

    const matches = [
      { id: 'm1', round: 1, matchNumber: 1, player1: participants[0], player2: participants[1], score1: 0, score2: 0, winner: null, status: 'RUNNING' },
      { id: 'm2', round: 1, matchNumber: 2, player1: participants[2], player2: participants[3], score1: 0, score2: 0, winner: null, status: 'PENDING' },
      { id: 'm3', round: 1, matchNumber: 3, player1: participants[4], player2: participants[5], score1: 0, score2: 0, winner: null, status: 'PENDING' },
      { id: 'm4', round: 1, matchNumber: 4, player1: participants[6], player2: participants[7], score1: 0, score2: 0, winner: null, status: 'PENDING' },
      { id: 'm5', round: 2, matchNumber: 5, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
      { id: 'm6', round: 2, matchNumber: 6, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
      { id: 'm7', round: 3, matchNumber: 7, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
    ];

    return {
      id: 'demo_tourney_default',
      title: '8-BRACKET SLOT CHAMPIONSHIP',
      status: 'IN_PROGRESS',
      mode: 'BONUS_BUY',
      isDemo: true,
      betPerRound: 10,
      prizeText: '1st: $150 · 2nd: $50',
      participants,
      matches,
      champion: null,
    };
  }

  handleStateUpdate(rawState, isInitialLoad = false) {
    if (!rawState) return;
    const state = this.normalizeState(rawState);
    const oldStatus = this.currentState ? this.currentState.status : null;
    this.currentState = state;

    // Headers
    if (this.titleEl) this.titleEl.textContent = (state.title || '8-BRACKET SLOT CHAMPIONSHIP').toUpperCase();
    if (this.betEl) this.betEl.textContent = `$${Number(state.betPerRound || 10).toFixed(2)}`;
    if (this.prizeEl) this.prizeEl.textContent = state.prizeText || '1st: $150 · 2nd: $50';

    // Status Text
    if (this.statusText) {
      if (state.status === 'LOBBY' || state.status === 'IDLE') {
        this.statusText.textContent = `LOBBY (${state.participants?.length || 0}/8)`;
      } else if (state.status === 'IN_PROGRESS') {
        this.statusText.textContent = 'IN PROGRESS';
      } else if (state.status === 'FINISHED') {
        this.statusText.textContent = 'FINISHED';
      }
    }

    // Render matches to native grid cards
    const matchMap = new Map();
    (state.matches || []).forEach((m) => matchMap.set(m.id, m));

    for (let i = 1; i <= 7; i++) {
      const matchId = `m${i}`;
      const cardEl = document.getElementById(`card-${matchId}`);
      if (cardEl) {
        const mData = matchMap.get(matchId);
        this.renderMatchCard(cardEl, matchId, mData);
      }
    }

    // Recalculate exact SVG connector lines on next animation frame
    requestAnimationFrame(() => this.updateConnectorLines());

    // Keep local blocking modal hidden so bracket stays visible; celebration plays on the dedicated 1920x1080 transparent overlay
    if (this.modal) {
      this.modal.classList.remove('active');
    }

    if (!isInitialLoad && state.status === 'FINISHED' && state.champion && oldStatus !== 'FINISHED') {
      this.triggerChampionCelebration(state);
    }
  }

  updateConnectorLines() {
    const svg1 = document.getElementById('svg-conn-1');
    const svg2 = document.getElementById('svg-conn-2');
    if (!svg1 || !svg2) return;

    const getRelCenterY = (cardId, svgEl) => {
      const card = document.getElementById(cardId);
      if (!card) return 500;
      const svgRect = svgEl.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      if (!svgRect.height) return 500;
      return Math.round(((cardRect.top + cardRect.height / 2 - svgRect.top) / svgRect.height) * 1000);
    };

    svg1.setAttribute('viewBox', '0 0 100 1000');
    svg2.setAttribute('viewBox', '0 0 100 1000');

    const y1 = getRelCenterY('card-m1', svg1);
    const y2 = getRelCenterY('card-m2', svg1);
    const y3 = getRelCenterY('card-m3', svg1);
    const y4 = getRelCenterY('card-m4', svg1);
    const y5_1 = getRelCenterY('card-m5', svg1);
    const y6_1 = getRelCenterY('card-m6', svg1);

    const y5_2 = getRelCenterY('card-m5', svg2);
    const y6_2 = getRelCenterY('card-m6', svg2);
    const y7_2 = getRelCenterY('card-m7', svg2);

    const setPath = (id, d, isActive) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.setAttribute('d', d);
      if (isActive) el.classList.add('active');
      else el.classList.remove('active');
    };

    const matches = (this.currentState && this.currentState.matches) || [];
    const isFinished = (mId) => {
      const m = matches.find((item) => item.id === mId);
      return Boolean(m && m.status === 'FINISHED' && m.winner);
    };

    setPath('conn-m1-m5', `M 0 ${y1} H 50 V ${y5_1} H 100`, isFinished('m1'));
    setPath('conn-m2-m5', `M 0 ${y2} H 50 V ${y5_1} H 100`, isFinished('m2'));
    setPath('conn-m3-m6', `M 0 ${y3} H 50 V ${y6_1} H 100`, isFinished('m3'));
    setPath('conn-m4-m6', `M 0 ${y4} H 50 V ${y6_1} H 100`, isFinished('m4'));

    setPath('conn-m5-m7', `M 0 ${y5_2} H 50 V ${y7_2} H 100`, isFinished('m5'));
    setPath('conn-m6-m7', `M 0 ${y6_2} H 50 V ${y7_2} H 100`, isFinished('m6'));
  }

  renderMatchCard(el, matchId, match) {
    const labels = {
      m1: 'MATCH 1 (QUARTERS)',
      m2: 'MATCH 2 (QUARTERS)',
      m3: 'MATCH 3 (QUARTERS)',
      m4: 'MATCH 4 (QUARTERS)',
      m5: 'SEMIFINAL 1',
      m6: 'SEMIFINAL 2',
      m7: 'GRAND FINAL 🏆',
    };

    if (!match) {
      el.innerHTML = `
        <div class="match-badge"><span>${labels[matchId]}</span><span>WAITING</span></div>
        <div class="player-slot"><span style="color: #64748b;">TBD</span><span>-</span></div>
        <div class="player-slot"><span style="color: #64748b;">TBD</span><span>-</span></div>
      `;
      el.classList.remove('active-match');
      return;
    }

    const isRunning = match.status === 'RUNNING' || match.status === 'IN_PROGRESS';
    const isFinished = match.status === 'FINISHED';
    if (isRunning) el.classList.add('active-match');
    else el.classList.remove('active-match');

    const formatScore = (score, isWinner, isLoser) => {
      if (score === 'WIN') return 'WIN 🏆';
      if (score === 'LOSE') return 'LOSE';
      if (score !== undefined && score !== null && Number(score) > 0) {
        return `${Number(score).toFixed(2).replace(/\.00$/, '')}x`;
      }
      if (isWinner) return 'WIN 🏆';
      if (isLoser) return 'LOSE';
      return '-';
    };

    const renderPlayer = (p, score, isWinner, isLoser) => {
      if (!p) {
        return `<div class="player-slot"><span style="color: #64748b;">TBD</span><span class="player-score">-</span></div>`;
      }
      const cleanName = String(p.displayName || p.username || 'Player').replace(/^@/, '');
      const initial = (cleanName.charAt(0) || 'P').toUpperCase();
      const winClass = isWinner ? 'winner' : (isLoser ? 'loser' : '');
      const crown = isWinner ? ' 👑' : '';

      // Resolve canonical slot cover art and name
      let resolvedSlot = null;
      if (window.SlotResolver) {
        resolvedSlot = window.SlotResolver.resolve(p.slotName || p.slotImage || p, '../');
      }
      const slotNameDisplay = (resolvedSlot && resolvedSlot.name) || p.slotName || '';
      const slotCover = (resolvedSlot && resolvedSlot.image) || p.slotImage;

      const imgHtml = slotCover
        ? `<img src="${slotCover}" class="mini-slot-img" alt="${slotNameDisplay}" onerror="this.onerror=null; this.src='https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';">`
        : `<div class="player-avatar">${initial}</div>`;

      return `
        <div class="player-slot ${winClass}">
          <div class="player-info">
            ${imgHtml}
            <div class="player-name-text">@${cleanName}${crown}</div>
            <span class="player-slot-name">${slotNameDisplay ? `(${slotNameDisplay})` : ''}</span>
          </div>
          <span class="player-score">${formatScore(score, isWinner, isLoser)}</span>
        </div>
      `;
    };

    const isP1Win = isFinished && match.winner && match.player1 && this.isSamePlayer(match.winner, match.player1);
    const isP2Win = isFinished && match.winner && match.player2 && this.isSamePlayer(match.winner, match.player2);

    el.innerHTML = `
      <div class="match-badge">
        <span>${labels[matchId]}</span>
        <span style="color: ${isFinished ? '#00e676' : (isRunning ? '#00e5ff' : '#8e9bb0')}">
          ${isFinished ? 'FINISHED' : (isRunning ? 'IN PROGRESS' : 'PENDING')}
        </span>
      </div>
      ${renderPlayer(match.player1, match.score1, isP1Win, isP2Win)}
      ${renderPlayer(match.player2, match.score2, isP2Win, isP1Win)}
    `;
  }

  triggerChampionCelebration(state) {
    if (!state || !state.champion) return;
    let resolvedChampSlot = null;
    if (window.SlotResolver) {
      resolvedChampSlot = window.SlotResolver.resolve(state.champion.slotName || state.champion.slotImage || 'Wanted Dead or a Wild', '../');
    }
    const champSlotName = (resolvedChampSlot && resolvedChampSlot.name) || state.champion?.slotName || 'Wanted Dead or a Wild';
    const champSlotImage = (resolvedChampSlot && resolvedChampSlot.image) || state.champion?.slotImage;
    const champUser = String(state.champion.displayName || state.champion.username || 'Champion').replace(/^@/, '');

    // Broadcast celebration to the dedicated 1920x1080 transparent Winner Celebration overlay
    try {
      const bc = new BroadcastChannel('hunthub_celebration');
      const payload = {
        type: 'CELEBRATION',
        category: '8-BRACKET TOURNAMENT CHAMPION',
        icon: '🏆',
        username: `@${champUser}`,
        winner: state.champion,
        title: state.title || '8-BRACKET SLOT CHAMPIONSHIP',
        slotName: champSlotName,
        slotImg: champSlotImage,
        slotImage: champSlotImage,
        statLabel: 'FINAL SCORE',
        statValue: state.champion?.multiplier ? (String(state.champion.multiplier).endsWith('x') || state.champion.multiplier === 'WIN' ? String(state.champion.multiplier) : `${state.champion.multiplier}x`) : 'CHAMPION 🏆',
        prize: state.prizeText || 'TOURNAMENT CHAMPION',
        timestamp: Date.now(),
      };
      bc.postMessage(payload);
      localStorage.setItem('hunthub_celebration_event', JSON.stringify(payload));
      localStorage.setItem('hunthub_celebration_trigger', JSON.stringify(payload));
    } catch (e) {
      console.warn('[Tourney Overlay] Broadcast celebration error:', e);
    }
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
      requestAnimationFrame(() => this.updateConnectorLines());
    };
    window.addEventListener('resize', resize);
    resize();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.tourneyApp = new TourneyOverlayApp();
});
