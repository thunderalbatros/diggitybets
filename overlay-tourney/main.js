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

  playSlotWinFanfare() {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;

      // 1. Classic Slot Victory Chimes (arpeggiated bells)
      const bells = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      for (let cycle = 0; cycle < 3; cycle++) {
        bells.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          const t = now + (cycle * 0.45) + (idx * 0.07);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.2, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(t);
          osc.stop(t + 0.28);
        });
      }

      // 2. Metallic Jackpot Coin Drop Clicks (falling coins)
      for (let c = 0; c < 16; c++) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const t = now + 0.3 + (c * 0.08) + (Math.random() * 0.04);

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
    } catch {}
  }

  initBroadcastChannel() {
    try {
      this.broadcastChannel = new BroadcastChannel('hunthub_tourney');
      this.broadcastChannel.onmessage = (event) => {
        if (!event.data) return;
        if (event.data.action === 'add_participant') {
          this.handleAddParticipant(event.data.participant);
        } else if (event.data.action === 'tourney_update' || event.data.type === 'tournament_update') {
          this.handleStateUpdate(event.data.state);
        } else if (event.data.state) {
          this.handleStateUpdate(event.data.state);
        }
      };
    } catch {}

    window.addEventListener('storage', (e) => {
      if (e.key === 'hunthub_tourney_add_player' && e.newValue) {
        try {
          const { participant } = JSON.parse(e.newValue);
          this.handleAddParticipant(participant);
        } catch {}
      } else if (e.key === 'hunthub_tourney_state' && e.newValue) {
        try {
          this.handleStateUpdate(JSON.parse(e.newValue));
        } catch {}
      }
    });
  }

  handleAddParticipant(participant) {
    if (!participant) return;

    if (!this.currentState || !this.currentState.matches) {
      this.currentState = this.getEmptyTournamentState();
    }

    // Resolve slot image if missing
    if (!participant.slotImage && window.HUNTHUB_CURATED_SLOTS && participant.slotName) {
      const found = window.HUNTHUB_CURATED_SLOTS.find(
        (s) => s.name.toLowerCase() === participant.slotName.toLowerCase()
      );
      if (found) participant.slotImage = found.image;
    }

    if (!this.currentState.participants) this.currentState.participants = [];

    // Check if participant already exists by kickId or username
    const existingIdx = this.currentState.participants.findIndex(
      (p) => p.username === participant.username || p.id === participant.id
    );

    let seedIdx = 0;
    if (existingIdx >= 0) {
      this.currentState.participants[existingIdx] = participant;
      seedIdx = existingIdx;
    } else {
      seedIdx = this.currentState.participants.length % 8;
      this.currentState.participants.push(participant);
    }

    // Place into corresponding Quarterfinal match spot (m1..m4)
    const m = this.currentState.matches;
    if (seedIdx === 0 && m[0]) m[0].player1 = participant;
    else if (seedIdx === 1 && m[0]) m[0].player2 = participant;
    else if (seedIdx === 2 && m[1]) m[1].player1 = participant;
    else if (seedIdx === 3 && m[1]) m[1].player2 = participant;
    else if (seedIdx === 4 && m[2]) m[2].player1 = participant;
    else if (seedIdx === 5 && m[2]) m[2].player2 = participant;
    else if (seedIdx === 6 && m[3]) m[3].player1 = participant;
    else if (seedIdx === 7 && m[3]) m[3].player2 = participant;

    this.currentState.status = this.currentState.participants.length >= 8 ? 'IN_PROGRESS' : 'LOBBY';

    try {
      localStorage.setItem('hunthub_tourney_state', JSON.stringify(this.currentState));
    } catch {}

    this.handleStateUpdate(this.currentState);
  }

  getEmptyTournamentState() {
    return {
      id: 'tourney_' + Date.now(),
      title: '8-BRACKET SLOT CHAMPIONSHIP',
      status: 'LOBBY',
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
    const wsUrl = `ws://127.0.0.1:${port}/`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('[Tourney Overlay] Connected to HuntHub Server on ' + wsUrl);
        this.reconnectAttempts = 0;
        this.ws.send(JSON.stringify({ action: 'get_tourney_state' }));
        fetch(`http://127.0.0.1:${port}/api/sync/state`)
          .then((r) => r.ok ? r.json() : null)
          .then((sync) => {
            if (sync && sync.tourney && sync.tourney.participants && sync.tourney.participants.length > 0) {
              this.handleStateUpdate(sync.tourney);
            }
          })
          .catch(() => {});
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
    // 1. Check localStorage first
    try {
      const saved = localStorage.getItem('hunthub_tourney_state');
      if (saved) {
        const state = JSON.parse(saved);
        this.handleStateUpdate(state);
        return;
      }
    } catch {}

    // 2. Fallback to clean demo state so canvas is NEVER blank!
    const defaultDemo = this.getDefaultDemoState();
    this.handleStateUpdate(defaultDemo);
  }

  getDefaultDemoState() {
    const participants = [
      { id: 'p1', kickId: 101, username: 'LuckyStriker', displayName: 'LuckyStriker', slotName: 'Wanted Dead or a Wild', slotImage: 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format', seed: 1 },
      { id: 'p2', kickId: 102, username: 'VegasKing', displayName: 'VegasKing', slotName: 'Gates of Olympus 1000', slotImage: 'https://mediumrare.imgix.net/1ea93a0279a9ebc0e3a6288899532b27dbfc60a0f4a8e2cb924c5539ebf85eb3?w=180&h=236&fit=min&auto=format', seed: 8 },
      { id: 'p3', kickId: 103, username: 'SlotQueen', displayName: 'SlotQueen', slotName: 'San Quentin xWays', slotImage: 'https://fan-cdn.nolimitcity.com/trans_eba4744bd0.png', seed: 4 },
      { id: 'p4', kickId: 104, username: 'SpinMaster', displayName: 'SpinMaster', slotName: 'Sugar Rush 1000', slotImage: 'https://mediumrare.imgix.net/5d6f6e8e0d6b0b5711c2adad4f3914a38f714eb6c0c55f84eb430e3bb4a3ba45?w=180&h=236&fit=min&auto=format', seed: 5 },
      { id: 'p5', kickId: 105, username: 'Strike777', displayName: 'Strike777', slotName: 'RIP City', slotImage: 'https://mediumrare.imgix.net/5a0c36b4ae9cbe588cf4ba27e57c661bb5ad4e85741f23ee9f3907c0879c3d4f?w=180&h=236&fit=min&auto=format', seed: 2 },
      { id: 'p6', kickId: 106, username: 'BigBassBob', displayName: 'BigBassBob', slotName: 'Big Bass Splash', slotImage: 'https://mediumrare.imgix.net/dddf1cfdf8c991b5d638be0a599f66dc0dfbf813501cb6982f6e91f6ebf8b66f?w=180&h=236&fit=min&auto=format', seed: 7 },
      { id: 'p7', kickId: 107, username: 'NeonWolf', displayName: 'NeonWolf', slotName: 'Chaos Crew 2', slotImage: 'https://mediumrare.imgix.net/41da24e4d5885fe77bc95f5108fb26d70ae4f3fec14781cfc9fa6a8e805fe9e3?w=180&h=236&fit=min&auto=format', seed: 3 },
      { id: 'p8', kickId: 108, username: 'RoyalFlush', displayName: 'RoyalFlush', slotName: 'Le Bandit', slotImage: 'https://mediumrare.imgix.net/dbb3f6630f9a76bc88bfd52a2307ef0cb1e6a3c42878c43026ad1607fa48b8ec?w=180&h=236&fit=min&auto=format', seed: 6 },
    ];

    const matches = [
      { id: 'm1', round: 1, matchNumber: 1, player1: participants[0], player2: participants[1], score1: 24.5, score2: 10.2, winner: participants[0], status: 'FINISHED' },
      { id: 'm2', round: 1, matchNumber: 2, player1: participants[2], player2: participants[3], score1: 45.0, score2: 8.0, winner: participants[2], status: 'FINISHED' },
      { id: 'm3', round: 1, matchNumber: 3, player1: participants[4], player2: participants[5], score1: 112.4, score2: 15.1, winner: participants[4], status: 'FINISHED' },
      { id: 'm4', round: 1, matchNumber: 4, player1: participants[6], player2: participants[7], score1: 32.0, score2: 68.5, winner: participants[7], status: 'FINISHED' },
      { id: 'm5', round: 2, matchNumber: 5, player1: participants[0], player2: participants[2], score1: 55.0, score2: 120.0, winner: participants[2], status: 'FINISHED' },
      { id: 'm6', round: 2, matchNumber: 6, player1: participants[4], player2: participants[7], score1: 80.2, score2: 40.0, winner: participants[4], status: 'FINISHED' },
      { id: 'm7', round: 3, matchNumber: 7, player1: participants[2], player2: participants[4], score1: 150.0, score2: 95.0, winner: participants[2], status: 'FINISHED' },
    ];

    return {
      id: 'demo_tourney_default',
      title: '8-Bracket Slot Championship',
      status: 'FINISHED',
      betPerRound: 10,
      prizeText: '1º: $150 · 2º: $50',
      participants,
      matches,
      champion: participants[2],
    };
  }

  handleStateUpdate(state) {
    if (!state) return;
    const oldStatus = this.currentState ? this.currentState.status : null;
    this.currentState = state;

    // Headers
    if (this.titleEl) this.titleEl.textContent = (state.title || '8-BRACKET SLOT CHAMPIONSHIP').toUpperCase();
    if (this.betEl) this.betEl.textContent = `$${Number(state.betPerRound || 10).toFixed(2)}`;
    if (this.prizeEl) this.prizeEl.textContent = state.prizeText || '1º: $150 · 2º: $50';

    // Status Text
    if (this.statusText) {
      if (state.status === 'LOBBY' || state.status === 'IDLE') {
        this.statusText.textContent = `LOBBY (${state.participants?.length || 0}/8)`;
      } else if (state.status === 'IN_PROGRESS') {
        this.statusText.textContent = 'TORNEO EN JUEGO';
      } else if (state.status === 'FINISHED') {
        this.statusText.textContent = 'FINALIZADO';
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

    // Champion Celebration
    if (state.status === 'FINISHED' && state.champion && oldStatus !== 'FINISHED') {
      this.triggerChampionCelebration(state);
    } else if (state.status !== 'FINISHED' && this.modal) {
      this.modal.classList.remove('active');
    }
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

    const isRunning = match.status === 'RUNNING';
    const isFinished = match.status === 'FINISHED';
    if (isRunning) el.classList.add('active-match');
    else el.classList.remove('active-match');

    const renderPlayer = (p, score, isWinner, isLoser) => {
      if (!p) {
        return `<div class="player-slot"><span style="color: #64748b;">TBD</span><span class="player-score">-</span></div>`;
      }
      const initial = (p.displayName || p.username).charAt(0).toUpperCase();
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
        ? `<img src="${slotCover}" class="mini-slot-img" alt="${slotNameDisplay}" onerror="this.onerror=null; this.src='https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format';">`
        : `<div class="player-avatar">${initial}</div>`;

      return `
        <div class="player-slot ${winClass}">
          <div class="player-info">
            ${imgHtml}
            <div class="player-name-text">@${p.displayName || p.username}${crown}</div>
            <span class="player-slot-name">${slotNameDisplay ? `(${slotNameDisplay})` : ''}</span>
          </div>
          <span class="player-score">${score !== undefined && score !== null && Number(score) > 0 ? `${score}x` : (isWinner ? 'WINNER 🏆' : (isLoser ? 'LOSER' : '-'))}</span>
        </div>
      `;
    };

    const isP1Win = isFinished && match.winner && match.player1 && match.winner.kickId === match.player1.kickId;
    const isP2Win = isFinished && match.winner && match.player2 && match.winner.kickId === match.player2.kickId;

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
    let resolvedChampSlot = null;
    if (window.SlotResolver && state.champion) {
      resolvedChampSlot = window.SlotResolver.resolve(state.champion.slotName || state.champion.slotImage || 'Wanted Dead or a Wild', '../');
    }
    const champSlotName = (resolvedChampSlot && resolvedChampSlot.name) || state.champion?.slotName || 'Wanted Dead or a Wild';
    const champSlotImage = (resolvedChampSlot && resolvedChampSlot.image) || state.champion?.slotImage;

    // 1. Broadcast celebration to fullscreen overlay
    try {
      const bc = new BroadcastChannel('hunthub_celebration');
      const payload = {
        type: 'CELEBRATION',
        category: 'tournament',
        winner: state.champion,
        title: state.title,
        slotName: champSlotName,
        slotImage: champSlotImage,
        multiplier: state.champion?.multiplier || 150.0,
        prizeText: state.prizeText || '1º: $150 · 2º: $50'
      };
      bc.postMessage(payload);
      localStorage.setItem('hunthub_celebration_event', JSON.stringify(payload));
    } catch (e) {
      console.warn('[Tourney Overlay] Broadcast celebration error:', e);
    }

    // 2. Play local fanfare as fallback
    this.playSlotWinFanfare();

    // 3. Keep local modal banner for bracket view without blocking frame rate
    if (this.modal && state.champion) {
      this.champName.textContent = `@${state.champion.displayName || state.champion.username}`;
      this.champSlot.textContent = `Winning Slot: ${champSlotName}`;
      this.modal.classList.add('active');

      setTimeout(() => {
        this.modal.classList.remove('active');
      }, 7000);
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
    };
    window.addEventListener('resize', resize);
    resize();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.tourneyApp = new TourneyOverlayApp();
});
