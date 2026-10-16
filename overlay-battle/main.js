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
        } else if (e.data.action === 'battle_update' || e.data.type === 'battle_update') {
          this.handleStateUpdate(e.data.state);
        } else if (e.data.action === 'resolve_battle') {
          this.handleResolve(e.data);
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
      } else if (e.key === 'hunthub_battle_state' && e.newValue) {
        try {
          this.handleStateUpdate(JSON.parse(e.newValue));
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
        if (!player.slotImage || player.slotImage.startsWith('../')) {
          player.slotImage = canon.image;
        }
      }
    }

    if (slotKey === 'A') {
      this.currentState.playerA = player;
    } else if (slotKey === 'B') {
      this.currentState.playerB = player;
    }

    if (this.currentState.playerA && this.currentState.playerB) {
      this.currentState.status = 'READY';
      this.playClashSound();
    }

    try {
      localStorage.setItem('hunthub_battle_state', JSON.stringify(this.currentState));
    } catch {}

    this.handleStateUpdate(this.currentState);
  }

  handleResolve(data) {
    if (!this.currentState) return;
    this.currentState.status = 'RESOLVED';
    this.currentState.winner = data.winner;
    if (data.multA !== undefined && this.currentState.playerA) this.currentState.playerA.multiplier = data.multA;
    if (data.multB !== undefined && this.currentState.playerB) this.currentState.playerB.multiplier = data.multB;
    try {
      localStorage.setItem('hunthub_battle_state', JSON.stringify(this.currentState));
    } catch {}
    this.handleStateUpdate(this.currentState);
  }

  handleReset() {
    this.currentState = {
      id: 'battle_' + Date.now(),
      status: 'LOBBY',
      playerA: null,
      playerB: null,
      winner: null,
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
    this.slotNameA = document.getElementById('slot-name-a');
    this.slotProvA = document.getElementById('slot-provider-a');
    this.multA = document.getElementById('mult-a');
    this.payoutA = document.getElementById('payout-a');
    this.meterA = document.getElementById('meter-bar-a');
    this.ribbonA = document.getElementById('ribbon-a');
    this.slotImgA = document.getElementById('slot-img-a');

    // Player B
    this.cardB = document.getElementById('card-player-b');
    this.nameB = document.getElementById('name-b');
    this.tagB = document.getElementById('slot-tag-b');
    this.monogramB = document.getElementById('monogram-b');
    this.slotNameB = document.getElementById('slot-name-b');
    this.slotProvB = document.getElementById('slot-provider-b');
    this.multB = document.getElementById('mult-b');
    this.payoutB = document.getElementById('payout-b');
    this.meterB = document.getElementById('meter-bar-b');
    this.ribbonB = document.getElementById('ribbon-b');
    this.slotImgB = document.getElementById('slot-img-b');

    // Center VS & Modal
    this.vsSubtext = document.getElementById('vs-subtext');
    this.modal = document.getElementById('victory-modal');
    this.modalWinner = document.getElementById('modal-winner-name');
    this.modalStat = document.getElementById('modal-stat');
    this.modalPrize = document.getElementById('modal-prize');
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
          } else if (payload.action === 'battle_state') {
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
  }

  handleStateUpdate(state) {
    if (!state) return;
    const oldStatus = this.currentState ? this.currentState.status : null;
    this.currentState = state;

    // Header updates
    if (this.headerBet) this.headerBet.textContent = `$${Number(state.betAmount || 10).toFixed(2)}`;
    if (this.headerPrize) this.headerPrize.textContent = state.prizeText || '$50.00 POOL';

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
      nameEl: this.nameA,
      tagEl: this.tagA,
      monogramEl: this.monogramA,
      slotNameEl: this.slotNameA,
      slotProvEl: this.slotProvA,
      multEl: this.multA,
      payoutEl: this.payoutA,
      meterEl: this.meterA,
      ribbonEl: this.ribbonA,
      imgEl: this.slotImgA,
      isWinner: state.status === 'RESOLVED' && (state.winner === 'A' || state.winner === 'TIE'),
    });

    // Render Player B
    this.renderPlayer(state.playerB, {
      nameEl: this.nameB,
      tagEl: this.tagB,
      monogramEl: this.monogramB,
      slotNameEl: this.slotNameB,
      slotProvEl: this.slotProvB,
      multEl: this.multB,
      payoutEl: this.payoutB,
      meterEl: this.meterB,
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
      dom.nameEl.textContent = 'Waiting for Player...';
      dom.tagEl.textContent = '!battle <slot> in chat';
      dom.monogramEl.textContent = '?';
      dom.slotNameEl.textContent = 'No Slot Selected';
      dom.slotProvEl.textContent = 'Pragmatic / Hacksaw / Nolimit';
      dom.multEl.innerHTML = `0.00<span class="mult-x">x</span>`;
      dom.payoutEl.textContent = '$0.00 USD';
      dom.meterEl.style.width = '0%';
      dom.ribbonEl.classList.remove('active');
      dom.imgEl.style.display = 'none';
      return;
    }

    const canon = (window.SlotResolver ? window.SlotResolver.resolve(player.slotName || player.slotImage || player, '../') : null) || {
      name: player.slotName,
      provider: player.slotProvider || 'Casino Slot',
      image: player.slotImage || ''
    };

    dom.nameEl.textContent = `@${player.displayName || player.username}`;
    dom.tagEl.textContent = `Slot: ${canon.name}`;
    dom.monogramEl.textContent = (player.displayName || player.username).charAt(0).toUpperCase();
    dom.slotNameEl.textContent = canon.name;
    dom.slotProvEl.textContent = canon.provider;

    let slotImg = (window.SlotResolver ? window.SlotResolver.resolveSlotImageUrl(player.slotImage || canon.image, '../') : (player.slotImage || canon.image));

    if (slotImg) {
      dom.imgEl.src = slotImg;
      dom.imgEl.style.display = 'block';
      dom.imgEl.onerror = () => {
        dom.imgEl.src = 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format';
      };
    } else {
      dom.imgEl.style.display = 'none';
    }

    // Multiplier & meter
    const isSpins = this.currentState && this.currentState.gameMode === 'SPINS';
    const mult = Number(player.multiplier || 0);

    if (isSpins) {
      dom.multEl.innerHTML = player.result === 'WINNER' ? `WINNER!` : (player.result === 'LOSER' ? `LOSER` : `READY`);
      dom.payoutEl.textContent = '1-CLICK SPINS DUEL';
      dom.meterEl.style.width = player.result === 'WINNER' ? '100%' : '0%';
    } else {
      dom.multEl.innerHTML = `${mult.toFixed(2)}<span class="mult-x">x</span>`;
      dom.payoutEl.textContent = `$${Number(player.winAmount || 0).toFixed(2)} USD`;
      // Gauge calculation (max 100x = 100%)
      const pct = Math.min(100, Math.max(0, (mult / 50) * 100));
      dom.meterEl.style.width = `${pct}%`;
    }

    // King of the Hill Streak Badge
    if (this.currentState && this.currentState.kothActive && this.currentState.reigningKing) {
      if (this.currentState.reigningKing.kickId === player.kickId) {
        dom.tagEl.innerHTML = `👑 KING · STREAK ${this.currentState.currentStreak}/4 · $20 PRIZE`;
        dom.tagEl.style.color = 'var(--gold, #ffd700)';
      }
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

    const isKothChampion = state.currentStreak === 4;

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
        prizeText: isKothChampion ? '$20.00 CASH PRIZE (4-STREAK CHAMPION)' : (state.prizeText || '$50.00 USD'),
        kothStreak: state.currentStreak
      };
      bc.postMessage(payload);
      localStorage.setItem('hunthub_celebration_event', JSON.stringify(payload));
    } catch (e) {
      console.warn('[Battle Overlay] Broadcast celebration error:', e);
    }

    // 2. Play local fanfare as audio fallback
    this.playSlotWinFanfare();

    // 3. Keep local modal for 1v1 card view
    if (winnerObj && this.modal) {
      if (this.modalWinner) this.modalWinner.textContent = `@${winnerObj.displayName || winnerObj.username}`;
      const modalSubtitle = this.modal.querySelector('.modal-subtitle');
      if (modalSubtitle) {
        modalSubtitle.textContent = isKothChampion
          ? '👑 4-STREAK KING OF THE HILL CHAMPION!'
          : 'DUEL WINNER!';
      }
      const modalSlot = document.getElementById('modal-slot-title');
      if (modalSlot) modalSlot.textContent = winnerObj.slotName || 'Casino Slot';
      if (this.modalStat) {
        if (isKothChampion) {
          this.modalStat.textContent = '🏆 WON $20.00 CASH PRIZE!';
        } else if (state.gameMode === 'SPINS') {
          this.modalStat.textContent = '🏆 SPINS DUEL WINNER!';
        } else {
          const mult = Number(winnerObj.multiplier || 0);
          this.modalStat.textContent = mult > 0 ? `Multiplier: ${mult.toFixed(2)}x` : 'WINNER!';
        }
      }
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
