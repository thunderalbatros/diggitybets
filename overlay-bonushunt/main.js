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

  playFanfare() {
    if (!this.audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const startTime = now + idx * 0.12;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch {}
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
      }
    });
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
  }

  loadInitialDemo() {
    try {
      const saved = localStorage.getItem('hunthub_bonushunt_state');
      if (saved) {
        this.handleStateUpdate(JSON.parse(saved));
        return;
      }
    } catch {}

    // Default Demo State with Slot Images
    const demo = this.getDefaultDemoState();
    this.handleStateUpdate(demo);
  }

  getDefaultDemoState() {
    const bonuses = [
      {
        id: 'b1',
        slotName: 'Wanted Dead or a Wild',
        slotProvider: 'Hacksaw Gaming',
        slotImage: 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format',
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
        slotImage: 'https://mediumrare.imgix.net/1ea93a0279a9ebc0e3a6288899532b27dbfc60a0f4a8e2cb924c5539ebf85eb3?w=180&h=236&fit=min&auto=format',
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
        slotImage: 'https://fan-cdn.nolimitcity.com/trans_eba4744bd0.png',
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
        slotImage: 'https://mediumrare.imgix.net/5d6f6e8e0d6b0b5711c2adad4f3914a38f714eb6c0c55f84eb430e3bb4a3ba45?w=180&h=236&fit=min&auto=format',
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
        slotImage: 'https://mediumrare.imgix.net/5a0c36b4ae9cbe588cf4ba27e57c661bb5ad4e85741f23ee9f3907c0879c3d4f?w=180&h=236&fit=min&auto=format',
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
        slotImage: 'https://mediumrare.imgix.net/dddf1cfdf8c991b5d638be0a599f66dc0dfbf813501cb6982f6e91f6ebf8b66f?w=180&h=236&fit=min&auto=format',
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
        slotImage: 'https://mediumrare.imgix.net/67ccc373c89ba0c20791a337d304a8c50c78295c5e18987e59dd4975324119b0?w=180&h=236&fit=min&auto=format',
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
        slotImage: 'https://mediumrare.imgix.net/dbb3f6630f9a76bc88bfd52a2307ef0cb1e6a3c42878c43026ad1607fa48b8ec?w=180&h=236&fit=min&auto=format',
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
    if (this.startCostEl) this.startCostEl.textContent = `$${Number(m.startCost || state.startCost || 0).toFixed(2)}`;
    if (this.bonusesCountEl) this.bonusesCountEl.textContent = `${m.openedBonuses || 0} / ${m.totalBonuses || 0}`;
    if (this.remainingCountEl) this.remainingCountEl.textContent = `${m.remainingBonuses || 0} remaining`;
    if (this.reqAvgXEl) this.reqAvgXEl.textContent = `${Number(m.reqAverageX || 0).toFixed(2)}x`;
    if (this.reqAvgDollarsEl) this.reqAvgDollarsEl.textContent = `$${Number(m.reqAvgDollars || 0).toFixed(2)} / bonus`;
    if (this.runAvgXEl) this.runAvgXEl.textContent = `${Number(m.runAverageX || 0).toFixed(2)}x`;
    if (this.winningsEl) this.winningsEl.textContent = `$${Number(m.winnings || 0).toFixed(2)}`;

    if (this.profitEl) {
      const prof = Number(m.profit || 0);
      const sign = prof >= 0 ? '+' : '';
      this.profitEl.textContent = `${sign}$${prof.toFixed(2)} P/L`;
      this.profitEl.style.color = prof >= 0 ? '#00e676' : '#ff3366';
    }

    // Highlights
    if (m.bestWin) {
      this.bestWinGame.textContent = m.bestWin.slotName;
      this.bestWinCaller.textContent = `Call by @${m.bestWin.callerUsername}`;
      this.bestWinPayout.textContent = `$${Number(m.bestWin.payout).toFixed(2)}`;
      this.bestWinMult.textContent = `${Number(m.bestWin.multiplier).toFixed(2)}x`;
    }
    if (m.luckyWin) {
      this.luckyWinGame.textContent = m.luckyWin.slotName;
      this.luckyWinCaller.textContent = `Call by @${m.luckyWin.callerUsername}`;
      this.luckyWinPayout.textContent = `$${Number(m.luckyWin.payout).toFixed(2)}`;
      this.luckyWinMult.textContent = `${Number(m.luckyWin.multiplier).toFixed(2)}x`;
    }

    // Top guess ticker
    if (m.closestGuess && this.topGuessUserEl) {
      this.topGuessUserEl.textContent = `@${m.closestGuess.username} ($${m.closestGuess.guess.toFixed(2)} · Diff: $${m.closestGuess.diff.toFixed(2)})`;
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

  renderTable(bonuses) {
    if (!this.tableBodyEl) return;
    this.tableBodyEl.innerHTML = '';

    bonuses.forEach((b, idx) => {
      const row = document.createElement('div');
      const isOpening = b.status === 'OPENING';
      const isOpened = b.status === 'OPENED';
      row.className = `bonus-row ${isOpening ? 'row-opening' : ''} ${isOpened ? 'row-opened' : ''}`;

      const statusMap = {
        PENDING: '<span class="row-status-pill st-pending">PENDING</span>',
        OPENING: '<span class="row-status-pill st-opening">OPENING ⚡</span>',
        OPENED: '<span class="row-status-pill st-opened">OPENED ✓</span>',
      };

      let resolvedImg = b.slotImage;
      if (!resolvedImg && window.HUNTHUB_CURATED_SLOTS && b.slotName) {
        const found = window.HUNTHUB_CURATED_SLOTS.find(
          (s) => s.name.toLowerCase() === b.slotName.toLowerCase() || s.name.toLowerCase().includes(b.slotName.toLowerCase())
        );
        if (found) resolvedImg = found.image;
      }

      const imgHtml = resolvedImg
        ? `<img class="slot-thumb-img" src="${resolvedImg}" alt="${b.slotName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="slot-thumb-fallback" style="display:none; width:100%; height:100%; align-items:center; justify-content:center; font-size:18px;">🎰</div>`
        : `<div class="slot-thumb-fallback" style="display:flex; width:100%; height:100%; align-items:center; justify-content:center; font-size:18px;">🎰</div>`;

      row.innerHTML = `
        <span class="row-num">${idx + 1}</span>
        <div class="row-slot-box">
          <div class="slot-thumb">
            ${imgHtml}
          </div>
          <div class="slot-titles">
            <span class="slot-main-title">${b.slotName}</span>
            <span class="slot-provider-badge">${b.slotProvider || 'Casino'}</span>
          </div>
        </div>
        <span class="row-caller">@${b.callerUsername || 'Streamer'}</span>
        <span class="row-bet">$${Number(b.betSize || 1).toFixed(2)}</span>
        <span class="row-payout">${isOpened ? `$${Number(b.payout || 0).toFixed(2)}` : '-'}</span>
        <span class="row-mult">${isOpened ? `${Number(b.multiplier || 0).toFixed(2)}x` : '-'}</span>
        ${statusMap[b.status] || statusMap.PENDING}
      `;
      this.tableBodyEl.appendChild(row);
    });
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
