/**
 * HuntHub — Authentic Stake Originals House Games Suite
 * Direct port of Stake Originals mechanics, provably fair math, and UX:
 * 1. Plinko (Active physics loop, multi-drop 1/5/10 balls, Low/Med/High risk payouts, history pills)
 * 2. Mines (5x5 grid, Stake gems & bombs, dynamic multiplier, cashout anytime)
 * 3. Dice (0.00-100.00 slider, reactive Multiplier/Target/Chance inputs, Roll Over / Roll Under toggle, 1% house edge)
 * 4. Crash (60 FPS rocket flight, exponential curve, dynamic live cashout, auto-cashout, 1% house edge)
 * 5. Blackjack (21, felt cards, 3:2 natural payout, Hit/Stand/Double, dealer stands on 17)
 * 6. European Roulette (37 pockets 0-36 in official European clockwise sequence, complete felt betting board, chips)
 * 
 * 100% Free Faucet (+1,000 $DIG), auto-refill on empty balance, HMAC-SHA256 Provably Fair.
 */

class StakeOriginalsController {
  constructor() {
    // 1. Initial Balance: Default to 0 $DIG (no free faucet, earned ONLY when kick.com/diggitybets is LIVE + active viewer participation)
    if (!localStorage.getItem('hunthub_offline_points_purged_v1')) {
      localStorage.setItem('hunthub_balance', '0');
      localStorage.setItem('hunthub_offline_points_purged_v1', 'true');
    }
    let saved = localStorage.getItem('hunthub_balance');
    let parsed = parseInt(saved, 10);
    this.balance = isNaN(parsed) ? 0 : Math.max(0, parsed);
    localStorage.setItem('hunthub_balance', this.balance.toString());
    this.activeTab = 'plinko';

    // Phase 6 Anti-Exploit Economy Constants (95.00% RTP / 5% House Edge, Max Bet 50 $DIG, Max Win Cap 500 $DIG net)
    this.rtp = 95.00;
    this.houseEdgeFactor = 0.95;
    this.maxBet = 50;
    this.maxWinCap = 500;

    // 2. Plinko State
    this.plinkoBet = 10;
    this.plinkoRisk = 'high'; // 'low', 'medium', 'high'
    this.plinkoRows = 10;
    this.plinkoActiveBalls = [];
    this.plinkoHistory = [0.9, 0.3, 3, 0.2, 10];
    this.isPlinkoLoopRunning = false;
    this.plinkoPayouts = {
      low: [8.5, 2.9, 1.3, 1.0, 0.95, 0.5, 0.95, 1.0, 1.3, 2.9, 8.5],
      medium: [21, 4.8, 1.9, 1.3, 0.6, 0.4, 0.6, 1.3, 1.9, 4.8, 21],
      high: [72, 9.5, 2.9, 0.9, 0.3, 0.2, 0.3, 0.9, 2.9, 9.5, 72]
    };

    // 3. Mines State
    this.minesBet = 20;
    this.minesCount = 3;
    this.minesGrid = new Array(25).fill('gem');
    this.minesRevealed = new Array(25).fill(false);
    this.minesState = 'idle'; // 'idle', 'playing', 'cashed', 'busted'
    this.minesCurrentMultiplier = 1.0;

    // 4. Crash State (5.00% House Edge = 95.00% RTP)
    this.crashBet = 15;
    this.crashAutoCashout = null; // Optional: null by default
    this.crashState = 'idle'; // 'idle', 'running', 'crashed', 'cashed'
    this.crashCurrentMultiplier = 1.00;
    this.crashTargetMultiplier = 2.00;
    this.crashHistory = [1.45, 2.10, 1.15, 8.40, 1.02, 3.25];
    this.crashStartTime = 0;
    this.crashAnimFrame = null;

    // 5. Dice State (5.00% House Edge = 95.00% RTP)
    this.diceBet = 20;
    this.diceMode = 'over'; // 'over' (Roll Over) or 'under' (Roll Under)
    this.diceTarget = 50.00;
    this.diceWinChance = 50.00;
    this.diceMultiplier = 1.9000;
    this.isRollingDice = false;

    // 6. Limbo State (5.00% House Edge = 95.00% RTP)
    this.limboBet = 10;
    this.limboTarget = 2.00;
    this.limboWinChance = 47.50;
    this.limboHistory = [1.84, 3.20, 1.05, 12.50, 2.10];
    this.isRollingLimbo = false;

    // 7. Blackjack State
    this.bjDeck = [];
    this.bjDealerHand = [];
    this.bjPlayerHand = [];
    this.bjBet = 25;
    this.bjInsuranceBet = 0;
    this.bjState = 'idle'; // 'idle', 'playing', 'resolved'
    this.bjIsSplit = false;
    this.bjSplitHands = [];
    this.bjActiveHandIdx = 0;

    // 8. European Roulette State (95.00% RTP / Max Bet 50 $DIG)
    this.rouletteChip = 25;
    this.rouletteBets = {}; // { 'num_17': 25, 'red': 50, ... }
    this.isSpinningRoulette = false;
    this.rouletteWheelRotation = 0;
    this.rouletteBall = null;
    this.rouletteAnimFrame = null;
    this.euroWheelPockets = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
    this.redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

    // 9. Hi-Lo State (5.00% House Edge = 95.00% RTP)
    this.hiloBet = 10;
    this.hiloState = 'idle'; // 'idle', 'in_game', 'won', 'lost', 'cashed'
    this.hiloCurrentCard = null;
    this.hiloCurrentMultiplier = 1.0000;
    this.hiloStep = 0;
    this.hiloHistory = [];

    // 10. Keno State (5.00% House Edge = 95.00% RTP)
    this.kenoBet = 10;
    this.kenoRisk = 'classic'; // 'classic', 'low', 'medium', 'high'
    this.kenoSelected = new Set();
    this.kenoIsDrawing = false;
  }

  init() {
    this.renderBalance();
    this.initTabs();
    this.initPlinko();
    this.initMines();
    this.initCrash();
    this.initDice();
    this.initLimbo();
    this.initBlackjack();
    this.initRoulette();
    this.initHilo();
    this.initKeno();
    this.initQuickBetMultipliers();
  }

  // ==========================================
  // BALANCE & ECONOMY (FAVORS STREAMER / POINT SINK)
  // ==========================================
  renderBalance() {
    localStorage.setItem('hunthub_balance', this.balance.toString());
    const els = document.querySelectorAll('.user-balance-val');
    els.forEach(el => {
      el.textContent = this.balance.toLocaleString();
    });
  }

  adjustBalance(amount) {
    this.balance += amount;
    if (this.balance < 0) this.balance = 0;
    this.renderBalance();
    if (window.userStore) {
      window.userStore.points = this.balance;
    }
  }

  /**
   * Phase 6 Anti-Exploit Cap: Caps gross payout at betAmount + MAX_WIN_CAP (500 $DIG net profit)
   */
  capGrossPayout(betAmount, rawGrossPayout) {
    const gross = Math.max(0, Math.floor(Number(rawGrossPayout) || 0));
    if (gross <= 0) return 0;
    const maxGross = Math.max(0, Math.floor(Number(betAmount) || 0)) + this.maxWinCap;
    return Math.min(gross, maxGross);
  }

  /**
   * Strict bet deduction: Enforces MAX BET = 50 $DIG and blocks bets if balance is insufficient.
   * Viewers earn $DIG points organically by watching kick.com/diggitybets.
   */
  checkAndDeductBet(betAmount) {
    if (!Number.isFinite(betAmount) || betAmount <= 0) {
      this.showToast('⚠️ Ingresá un monto de apuesta válido en $DIG.', 'loss');
      return false;
    }
    if (betAmount > this.maxBet) {
      this.showToast(`⚠️ Apuesta máxima permitida: ${this.maxBet} $DIG por tirada (Anti-Exploit Cap).`, 'loss');
      if (window.soundEngine && typeof window.soundEngine.playBust === 'function') {
        try { window.soundEngine.playBust(); } catch (_) {}
      }
      return false;
    }
    if (this.balance < betAmount) {
      this.showToast('⚠️ Saldo insuficiente en $DIG. ¡Mirá el stream en Kick para acumular puntos orgánicamente!', 'loss');
      if (window.soundEngine && typeof window.soundEngine.playBust === 'function') {
        try { window.soundEngine.playBust(); } catch (_) {}
      }
      return false;
    }
    this.adjustBalance(-betAmount);
    return true;
  }

  switchGame(targetGame) {
    if (!targetGame) return;
    this.activeTab = targetGame;

    // Pause ambient roulette loop if switching to another game
    if (this.rouletteAnimFrame && targetGame !== 'roulette') {
      cancelAnimationFrame(this.rouletteAnimFrame);
      this.rouletteAnimFrame = null;
    }

    // Highlight active card in top row
    document.querySelectorAll('.hg-tab-btn').forEach(b => {
      if (b.getAttribute('data-game') === targetGame) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Switch active panel in arena directly below
    document.querySelectorAll('.hg-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    const activePanel = document.getElementById(`hg-${targetGame}`);
    if (activePanel) activePanel.classList.add('active');

    if (targetGame === 'plinko') {
      setTimeout(() => this.drawPlinkoBoard(), 30);
    } else if (targetGame === 'crash') {
      setTimeout(() => this.drawCrashIdle(), 30);
    } else if (targetGame === 'limbo') {
      this.renderLimboHistory();
    } else if (targetGame === 'roulette') {
      this.startRouletteAmbientLoop();
    } else if (targetGame === 'hilo') {
      this.renderHiloDisplay();
    } else if (targetGame === 'keno') {
      this.renderKenoPaytable();
    }
  }

  pauseAmbientLoops() {
    if (this.rouletteAnimFrame) {
      cancelAnimationFrame(this.rouletteAnimFrame);
      this.rouletteAnimFrame = null;
    }
  }

  resumeAmbientLoops() {
    if (this.activeTab === 'roulette' && !this.rouletteAnimFrame) {
      this.startRouletteAmbientLoop();
    }
  }

  initTabs() {
    const tabBtns = document.querySelectorAll('.hg-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.soundEngine && typeof window.soundEngine.playChip === 'function') {
          try { window.soundEngine.playChip(); } catch (_) {}
        }
        const targetGame = btn.getAttribute('data-game');
        if (targetGame) this.switchGame(targetGame);
      });
    });
  }

  initQuickBetMultipliers() {
    document.querySelectorAll('.btn-half-bet').forEach(btn => {
      btn.addEventListener('click', () => {
        const inputId = btn.getAttribute('data-target-input');
        const input = document.getElementById(inputId);
        if (input) {
          let val = Math.max(1, Math.floor((parseInt(input.value, 10) || 10) / 2));
          input.value = val;
          input.dispatchEvent(new Event('change'));
          if (window.soundEngine) window.soundEngine.playChip();
        }
      });
    });

    document.querySelectorAll('.btn-double-bet').forEach(btn => {
      btn.addEventListener('click', () => {
        const inputId = btn.getAttribute('data-target-input');
        const input = document.getElementById(inputId);
        if (input) {
          let val = Math.min(this.maxBet, Math.max(1, (parseInt(input.value, 10) || 10) * 2));
          input.value = val;
          input.dispatchEvent(new Event('change'));
          if (window.soundEngine) window.soundEngine.playChip();
        }
      });
    });
  }

  showToast(msg, type = 'info') {
    if (window.toast) {
      if (type === 'win') {
        window.toast.win(msg);
      } else if (type === 'loss' || type === 'error') {
        window.toast.loss(msg);
      } else if (type === 'success') {
        window.toast.success(msg);
      } else {
        window.toast.info(msg);
      }
      return;
    }

    let toast = document.getElementById('hg-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'hg-toast';
      toast.className = 'hg-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = `hg-toast show ${type}`;
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.className = 'hg-toast';
    }, 3600);
  }

  // ==========================================
  // 1. STAKE ORIGINALS PLINKO (MULTI-BALL)
  // ==========================================
  initPlinko() {
    const drop1 = document.getElementById('plinko-btn-drop') || document.getElementById('plinko-btn-drop-1');
    const drop5 = document.getElementById('plinko-btn-drop-5');
    const drop10 = document.getElementById('plinko-btn-drop-10');

    if (drop1) drop1.addEventListener('click', () => this.dropPlinkoBalls(1));
    if (drop5) drop5.addEventListener('click', () => this.dropPlinkoBalls(5));
    if (drop10) drop10.addEventListener('click', () => this.dropPlinkoBalls(10));

    const betInput = document.getElementById('plinko-bet-input');
    if (betInput) {
      betInput.addEventListener('change', () => {
        let v = parseInt(betInput.value, 10) || 5;
        this.plinkoBet = Math.max(1, v);
      });
    }

    // Connect Risk Buttons (Low, Med, High)
    const riskBtns = document.querySelectorAll('#hg-plinko .hg-sub-tab');
    riskBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        riskBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const risk = btn.getAttribute('data-risk') || 'high';
        this.plinkoRisk = risk;
        if (window.soundEngine) window.soundEngine.playChip();
        this.drawPlinkoBoard();
      });
    });

    this.renderPlinkoHistory();
    this.drawPlinkoBoard();
  }

  renderPlinkoHistory() {
    const bar = document.getElementById('plinko-history-bar');
    if (!bar) return;
    bar.innerHTML = '';
    this.plinkoHistory.slice(-8).forEach(mult => {
      const pill = document.createElement('span');
      pill.className = `plinko-history-pill ${mult >= 10 ? 'high' : (mult >= 2 ? 'win' : (mult >= 1 ? 'med' : ''))}`;
      pill.textContent = `${mult}x`;
      bar.appendChild(pill);
    });
  }

  async dropPlinkoBalls(count = 1) {
    const totalCost = this.plinkoBet * count;
    if (!this.checkAndDeductBet(totalCost)) return;

    for (let i = 0; i < count; i++) {
      setTimeout(async () => {
        let hash = 'round_plinko_' + Date.now();
        if (window.pfEngine && typeof window.pfEngine.generateRoundHash === 'function') {
          hash = await window.pfEngine.generateRoundHash();
          window.pfEngine.nextNonce();
        }

        let path = [];
        let finalBin = 0;
        if (window.pfEngine && typeof window.pfEngine.getPlinkoPath === 'function') {
          const res = window.pfEngine.getPlinkoPath(hash, this.plinkoRows);
          path = res.path;
          finalBin = res.finalBin;
        } else {
          for (let r = 0; r < this.plinkoRows; r++) {
            const dir = Math.random() >= 0.5 ? 1 : 0;
            path.push(dir);
            finalBin += dir;
          }
        }

        const payouts = this.plinkoPayouts[this.plinkoRisk] || this.plinkoPayouts.high;
        const multiplier = payouts[finalBin] !== undefined ? payouts[finalBin] : 1.0;

        const cx = 380;

        this.plinkoActiveBalls.push({
          x: cx,
          y: 10,
          targetBin: finalBin,
          path: path,
          step: 0,
          progress: 0,
          multiplier: multiplier,
          bet: this.plinkoBet
        });

        if (window.soundEngine) window.soundEngine.playChip();
        if (!this.isPlinkoLoopRunning) {
          this.isPlinkoLoopRunning = true;
          this.runPlinkoAnimationLoop();
        }
      }, i * 200);
    }
  }

  runPlinkoAnimationLoop() {
    const canvas = document.getElementById('plinko-canvas');
    if (!canvas) return;

    const rowSpacing = 46;
    const colSpacing = 58;
    const startY = 20;
    const cx = 380;

    const animate = () => {
      if (this.plinkoActiveBalls.length === 0) {
        this.isPlinkoLoopRunning = false;
        this.drawPlinkoBoard();
        return;
      }

      for (let i = this.plinkoActiveBalls.length - 1; i >= 0; i--) {
        const b = this.plinkoActiveBalls[i];
        b.progress += 0.085;

        if (b.step < this.plinkoRows) {
          const r = b.step;
          const currentY = startY + r * rowSpacing;
          const nextY = startY + (r + 1) * rowSpacing;

          const currentOffset = b.path.slice(0, r).reduce((acc, d) => acc + (d === 1 ? 1 : -1), 0);
          const nextOffset = b.path.slice(0, r + 1).reduce((acc, d) => acc + (d === 1 ? 1 : -1), 0);

          const currentX = cx + (currentOffset * colSpacing) / 2;
          const nextX = cx + (nextOffset * colSpacing) / 2;

          b.x = currentX + (nextX - currentX) * b.progress;
          b.y = currentY + (nextY - currentY) * b.progress;

          if (b.progress >= 1.0) {
            b.step += 1;
            b.progress = 0;
            if (window.soundEngine && Math.random() > 0.4) window.soundEngine.playTick();
          }
        } else {
          // Ball landed in bucket!
          const winAmount = this.capGrossPayout(b.bet, b.bet * b.multiplier);
          this.adjustBalance(winAmount);
          this.plinkoHistory.push(b.multiplier);
          if (this.plinkoHistory.length > 12) this.plinkoHistory.shift();
          this.renderPlinkoHistory();

          if (window.soundEngine) {
            if (b.multiplier >= 10.0) {
              window.soundEngine.playWin();
              if (typeof window.soundEngine.playCoins === 'function') {
                window.soundEngine.playCoins();
              }
            } else if (b.multiplier >= 2.0) {
              if (typeof window.soundEngine.playPlinkoMedium === 'function') {
                window.soundEngine.playPlinkoMedium();
              } else {
                window.soundEngine.playWin();
              }
            } else {
              // Common/low multipliers (< 2.0x): distinct soft wooden-acrylic plop chime
              if (typeof window.soundEngine.playPlinkoCommon === 'function') {
                window.soundEngine.playPlinkoCommon();
              } else {
                window.soundEngine.playTick();
              }
            }
          }

          const banner = document.getElementById('plinko-result-banner');
          if (banner) {
            banner.textContent = `🎯 Plinko Hit: ${b.multiplier}x (+${winAmount} $DIG)`;
            banner.className = `hg-result-banner active ${b.multiplier >= 2.0 ? 'win' : 'loss'}`;
          }

          this.plinkoActiveBalls.splice(i, 1);
        }
      }

      this.drawPlinkoBoard();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  drawPlinkoBoard() {
    const canvas = document.getElementById('plinko-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 1. HiDPI / Retina Sharp Multiplier
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const logicalW = 760;
    const logicalH = 580;

    if (canvas.width !== logicalW * dpr || canvas.height !== logicalH * dpr) {
      canvas.width = logicalW * dpr;
      canvas.height = logicalH * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // 2. Seamless Background
    ctx.fillStyle = '#0f212e';
    ctx.fillRect(0, 0, logicalW, logicalH);

    const rows = this.plinkoRows;
    const startY = 20; // Symmetrically centered vertically
    const rowSpacing = 46;
    const colSpacing = 58;

    // 3. Draw Pegs with Subtle White Neon Glow + Sharp Core
    for (let r = 0; r <= rows; r++) {
      const rowStartX = logicalW / 2 - (r * colSpacing) / 2;
      const y = startY + r * rowSpacing;

      for (let c = 0; c <= r; c++) {
        const x = rowStartX + c * colSpacing;

        // Subtle White Neon Ambient Halo behind each pin
        const halo = ctx.createRadialGradient(x, y, 1, x, y, 13);
        halo.addColorStop(0, 'rgba(255, 255, 255, 0.40)');
        halo.addColorStop(0.35, 'rgba(215, 235, 255, 0.16)');
        halo.addColorStop(0.7, 'rgba(180, 215, 255, 0.05)');
        halo.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(x, y, 13, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // High-Resolution Sharp Core Pin
        ctx.beginPath();
        ctx.arc(x, y, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Micro 3D specular highlight for tactile pearl appearance
        ctx.beginPath();
        ctx.arc(x - 1, y - 1, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fill();
      }
    }

    // 4. Draw Multiplier Bins
    const payouts = this.plinkoPayouts[this.plinkoRisk] || this.plinkoPayouts.high;
    const binCount = rows + 1;
    const bucketY = startY + rows * rowSpacing + 22;
    const bucketStartX = logicalW / 2 - (rows * colSpacing) / 2;

    const getBinColor = (idx, total) => {
      const mid = (total - 1) / 2;
      const distFromCenter = Math.abs(idx - mid) / mid;
      if (distFromCenter > 0.75) return '#ff003f';
      if (distFromCenter > 0.45) return '#ff7a00';
      if (distFromCenter > 0.2) return '#ffb400';
      return '#ffc000';
    };

    payouts.forEach((m, idx) => {
      const bx = bucketStartX + idx * colSpacing - colSpacing / 2;
      const binColor = getBinColor(idx, binCount);

      ctx.shadowColor = binColor;
      ctx.shadowBlur = 8;
      ctx.fillStyle = binColor;
      ctx.beginPath();
      ctx.roundRect(bx + 3, bucketY, colSpacing - 6, 30, [6]);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 12px "Chakra Petch", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${m}x`, bx + colSpacing / 2, bucketY + 15);
    });

    // 5. Draw Active Falling Balls with Gold Neon Glow
    this.plinkoActiveBalls.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#ffc000';
      ctx.shadowColor = 'rgba(255, 192, 0, 0.9)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Ball highlight
      ctx.beginPath();
      ctx.arc(b.x - 2.5, b.y - 2.5, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
    });

    ctx.restore();
  }

  // ==========================================
  // 2. STAKE ORIGINALS MINES (5x5 GRID)
  // ==========================================
  initMines() {
    const startBtn = document.getElementById('mines-btn-start');
    const cashoutBtn = document.getElementById('mines-btn-cashout');
    const selectMines = document.getElementById('mines-count-select');

    if (startBtn) startBtn.addEventListener('click', () => this.startMinesGame());
    if (cashoutBtn) cashoutBtn.addEventListener('click', () => this.cashoutMines());
    if (selectMines) {
      selectMines.addEventListener('change', (e) => {
        this.minesCount = parseInt(e.target.value, 10) || 3;
      });
    }

    this.renderMinesGrid();
  }

  renderMinesGrid() {
    const gridEl = document.getElementById('mines-board') || document.getElementById('mines-grid');
    if (!gridEl) return;

    gridEl.innerHTML = '';
    for (let i = 0; i < 25; i++) {
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = 'mine-tile-btn';
      tile.setAttribute('data-idx', i.toString());

      if (this.minesState === 'playing' && this.minesRevealed[i]) {
        tile.classList.add('revealed-gem');
        tile.innerHTML = `<img src="site/images/stake/diamond.svg" class="stake-mine-img" alt="Gem">`;
      } else if (this.minesState === 'busted') {
        if (this.minesGrid[i] === 'mine') {
          tile.classList.add('revealed-bomb');
          tile.innerHTML = `<img src="site/images/stake/bomb.svg" class="stake-mine-img" alt="Bomb">`;
        } else if (this.minesRevealed[i]) {
          tile.classList.add('revealed-gem');
          tile.innerHTML = `<img src="site/images/stake/diamond.svg" class="stake-mine-img" alt="Gem">`;
        } else {
          tile.style.opacity = '0.35';
          tile.innerHTML = `<img src="site/images/stake/diamond.svg" class="stake-mine-img" alt="Gem">`;
        }
      } else if (this.minesState === 'cashed') {
        if (this.minesRevealed[i]) {
          tile.classList.add('revealed-gem');
          tile.innerHTML = `<img src="site/images/stake/diamond.svg" class="stake-mine-img" alt="Gem">`;
        } else if (this.minesGrid[i] === 'mine') {
          tile.style.opacity = '0.35';
          tile.innerHTML = `<img src="site/images/stake/bomb.svg" class="stake-mine-img" alt="Bomb">`;
        } else {
          tile.style.opacity = '0.4';
          tile.innerHTML = `<img src="site/images/stake/diamond.svg" class="stake-mine-img" alt="Gem">`;
        }
      }

      tile.addEventListener('click', () => this.clickMinesTile(i));
      gridEl.appendChild(tile);
    }
  }

  async startMinesGame() {
    if (this.minesState === 'playing') return;
    const betInput = document.getElementById('mines-bet-input');
    const bet = betInput ? (parseInt(betInput.value, 10) || 20) : 20;

    if (!this.checkAndDeductBet(bet)) return;
    this.minesBet = bet;
    this.minesState = 'playing';
    this.minesRevealed = new Array(25).fill(false);
    this.minesCurrentMultiplier = 1.0;

    // Cryptographic placement of mines
    let hash = 'mines_' + Date.now();
    if (window.pfEngine && typeof window.pfEngine.generateRoundHash === 'function') {
      hash = await window.pfEngine.generateRoundHash();
    }
    const indices = Array.from({ length: 25 }, (_, i) => i);
    let offset = 0;
    for (let i = indices.length - 1; i > 0; i--) {
      const chunk = hash.substr(offset % (hash.length - 4), 4);
      offset += 4;
      const j = Math.floor((parseInt(chunk, 16) / 0x10000) * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const minePositions = indices.slice(0, this.minesCount);
    this.minesGrid = new Array(25).fill('gem');
    minePositions.forEach(pos => {
      this.minesGrid[pos] = 'mine';
    });

    const startBtn = document.getElementById('mines-btn-start');
    const cashoutBtn = document.getElementById('mines-btn-cashout');

    if (startBtn) startBtn.disabled = true;
    if (cashoutBtn) {
      cashoutBtn.disabled = false;
      cashoutBtn.textContent = `Cashout: ${this.minesBet} $DIG (1.00x)`;
      cashoutBtn.className = 'btn-stake-action';
    }

    const banner = document.getElementById('mines-result-banner');
    if (banner) { banner.textContent = ''; banner.className = 'hg-result-banner'; }

    if (window.soundEngine) window.soundEngine.playCard();
    this.renderMinesGrid();
  }

  clickMinesTile(idx) {
    if (this.minesState !== 'playing') {
      this.showToast('Hacé clic en "Start Round 💣" para comenzar la partida!', 'info');
      return;
    }
    if (this.minesRevealed[idx]) return;

    this.minesRevealed[idx] = true;

    if (this.minesGrid[idx] === 'mine') {
      // BOOM! Busted
      this.minesState = 'busted';
      if (window.soundEngine) window.soundEngine.playBust();
      if (window.pfEngine) window.pfEngine.nextNonce();

      const startBtn = document.getElementById('mines-btn-start');
      const cashoutBtn = document.getElementById('mines-btn-cashout');
      if (startBtn) startBtn.disabled = false;
      if (cashoutBtn) { cashoutBtn.disabled = true; cashoutBtn.className = 'btn-stake-action'; }

      const banner = document.getElementById('mines-result-banner');
      if (banner) {
        banner.textContent = '💣 BUSTED! Hit a mine.';
        banner.className = 'hg-result-banner active loss';
      }

      this.renderMinesGrid();
    } else {
      // GEM!
      if (window.soundEngine) window.soundEngine.playDiamond();
      const gemsRevealed = this.minesRevealed.filter((r, i) => r && this.minesGrid[i] === 'gem').length;
      this.minesCurrentMultiplier = this.calculateMinesMultiplier(gemsRevealed, this.minesCount);

      const cashoutBtn = document.getElementById('mines-btn-cashout');
      if (cashoutBtn) {
        const currentWin = Math.floor(this.minesBet * this.minesCurrentMultiplier);
        cashoutBtn.textContent = `Cashout: ${currentWin} $DIG (${this.minesCurrentMultiplier.toFixed(2)}x)`;
        cashoutBtn.className = 'btn-stake-action active';
      }

      this.renderMinesGrid();

      // Check max win (all gems revealed)
      if (gemsRevealed === (25 - this.minesCount)) {
        this.cashoutMines();
      }
    }
  }

  calculateMinesMultiplier(gems, mines) {
    // nCr combinations
    const nCr = (n, r) => {
      if (r < 0 || r > n) return 0;
      if (r === 0 || r === n) return 1;
      let res = 1;
      for (let i = 1; i <= r; i++) {
        res = (res * (n - (i - 1))) / i;
      }
      return res;
    };
    const houseEdge = 0.95; // 5% house edge (95.00% RTP)
    const totalCombos = nCr(25, gems);
    const winCombos = nCr(25 - mines, gems);
    if (winCombos === 0) return 1.0;
    const mult = houseEdge * (totalCombos / winCombos);
    return Math.max(1.0, parseFloat(mult.toFixed(2)));
  }

  cashoutMines() {
    if (this.minesState !== 'playing') return;

    this.minesState = 'cashed';
    const winAmount = this.capGrossPayout(this.minesBet, this.minesBet * this.minesCurrentMultiplier);
    this.adjustBalance(winAmount);

    if (window.soundEngine) window.soundEngine.playWin();
    if (window.pfEngine) window.pfEngine.nextNonce();

    const startBtn = document.getElementById('mines-btn-start');
    const cashoutBtn = document.getElementById('mines-btn-cashout');
    if (startBtn) startBtn.disabled = false;
    if (cashoutBtn) {
      cashoutBtn.disabled = true;
      cashoutBtn.className = 'btn-stake-action cashed';
      cashoutBtn.textContent = `Cashed: +${winAmount} $DIG`;
    }

    const banner = document.getElementById('mines-result-banner');
    if (banner) {
      banner.textContent = `💎 Won +${winAmount} $DIG (${this.minesCurrentMultiplier.toFixed(2)}x)!`;
      banner.className = 'hg-result-banner active win';
    }

    this.renderMinesGrid();
  }

  // ==========================================
  // 3. STAKE ORIGINALS CRASH
  // ==========================================
  initCrash() {
    const startBtn = document.getElementById('crash-btn-start');
    const cashoutBtn = document.getElementById('crash-btn-cashout');
    const betInput = document.getElementById('crash-bet-input');
    const autoInput = document.getElementById('crash-auto-cashout-input');

    if (startBtn) startBtn.addEventListener('click', () => this.startCrashGame());
    if (cashoutBtn) cashoutBtn.addEventListener('click', () => this.cashoutCrash());

    if (betInput) {
      betInput.addEventListener('change', () => {
        this.crashBet = Math.max(1, parseInt(betInput.value, 10) || 15);
      });
    }

    if (autoInput) {
      this.crashAutoCashout = autoInput.value && autoInput.value.trim() !== '' ? Math.max(1.01, parseFloat(autoInput.value)) : null;
      autoInput.addEventListener('change', () => {
        const val = autoInput.value.trim();
        this.crashAutoCashout = val ? Math.max(1.01, parseFloat(val)) : null;
      });
    }

    this.renderCrashHistory();
    this.drawCrashIdle();
  }

  renderCrashHistory() {
    const bar = document.getElementById('crash-history-bar');
    if (!bar) return;
    bar.innerHTML = '';
    this.crashHistory.slice(-8).forEach(mult => {
      const pill = document.createElement('span');
      pill.className = `crash-history-pill ${mult >= 10 ? 'high' : (mult >= 2 ? 'win' : 'loss')}`;
      pill.textContent = `${mult.toFixed(2)}x`;
      bar.appendChild(pill);
    });
  }

  drawCrashIdle() {
    const canvas = document.getElementById('crash-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = '#0f212e';
    ctx.fillRect(0, 0, w, h);

    // Coordinate grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 60; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h - 30);
      ctx.stroke();
    }
    for (let y = 30; y < h - 30; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 10);
    ctx.lineTo(40, h - 30);
    ctx.lineTo(w - 10, h - 30);
    ctx.stroke();

    // Center idle counter
    ctx.fillStyle = '#53fc18';
    ctx.font = 'bold 74px "Chakra Petch", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('1.00x', w / 2, h / 2 - 14);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 16px "Outfit", sans-serif';
    ctx.fillText('Ready for take-off · Set bet and launch', w / 2, h / 2 + 38);
  }

  async startCrashGame() {
    if (this.crashState === 'running') return;
    const betInput = document.getElementById('crash-bet-input');
    const bet = betInput ? (parseInt(betInput.value, 10) || 15) : 15;

    if (!this.checkAndDeductBet(bet)) return;
    this.crashBet = bet;
    this.crashState = 'running';
    this.crashCurrentMultiplier = 1.00;

    // Cryptographic Provably Fair crash target (5% house edge = 95.00% RTP)
    let hash = 'crash_' + Date.now();
    if (window.pfEngine && typeof window.pfEngine.generateRoundHash === 'function') {
      hash = await window.pfEngine.generateRoundHash();
      this.crashTargetMultiplier = window.pfEngine.getCrashMultiplier ? window.pfEngine.getCrashMultiplier(hash) : 2.45;
      window.pfEngine.nextNonce();
    } else {
      const rand = Math.random();
      this.crashTargetMultiplier = rand < 0.05 ? 1.00 : parseFloat(Math.max(1.00, (0.95 / (1.0 - rand))).toFixed(2));
    }

    const startBtn = document.getElementById('crash-btn-start');
    const cashoutBtn = document.getElementById('crash-btn-cashout');
    if (startBtn) startBtn.disabled = true;
    if (cashoutBtn) {
      cashoutBtn.disabled = false;
      cashoutBtn.className = 'btn-stake-action active';
      cashoutBtn.textContent = `Cashout (${this.crashBet} $DIG)`;
    }

    const banner = document.getElementById('crash-result-banner');
    if (banner) { banner.textContent = ''; banner.className = 'hg-result-banner'; }

    if (window.soundEngine) window.soundEngine.playCard();

    this.crashStartTime = performance.now();
    this.runCrashLoop();
  }

  runCrashLoop() {
    const canvas = document.getElementById('crash-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const animate = (now) => {
      if (this.crashState !== 'running') return;

      const elapsedSec = (now - this.crashStartTime) / 1000;
      // Exponential curve: 1.00 * e^(0.08 * elapsed)
      const currentMult = Math.max(1.00, parseFloat(Math.pow(Math.E, elapsedSec * 0.085).toFixed(2)));
      this.crashCurrentMultiplier = currentMult;

      const cashoutBtn = document.getElementById('crash-btn-cashout');
      if (cashoutBtn && this.crashState === 'running') {
        const potentialWin = this.capGrossPayout(this.crashBet, this.crashBet * currentMult);
        cashoutBtn.textContent = `Cashout: ${potentialWin} $DIG (${currentMult.toFixed(2)}x)`;
      }

      // Check Auto-Cashout
      if (this.crashAutoCashout && currentMult >= this.crashAutoCashout) {
        this.cashoutCrash();
        return;
      }

      // Check Crash
      if (currentMult >= this.crashTargetMultiplier) {
        this.triggerCrash(this.crashTargetMultiplier);
        return;
      }

      // Render frame
      this.renderCrashFrame(ctx, w, h, elapsedSec, currentMult, false);
      this.crashAnimFrame = requestAnimationFrame(animate);
    };

    this.crashAnimFrame = requestAnimationFrame(animate);
  }

  renderCrashFrame(ctx, w, h, elapsedSec, currentMult, isCrashed) {
    ctx.fillStyle = '#0f212e';
    ctx.fillRect(0, 0, w, h);

    // Axes
    const startX = 40;
    const startY = h - 30;
    const endX = w - 10;
    const endY = 20;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let x = startX + 60; x < endX; x += 60) {
      ctx.beginPath(); ctx.moveTo(x, endY); ctx.lineTo(x, startY); ctx.stroke();
    }
    for (let y = startY - 40; y > endY; y -= 40) {
      ctx.beginPath(); ctx.moveTo(startX, y); ctx.lineTo(endX, y); ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, endY);
    ctx.lineTo(startX, startY);
    ctx.lineTo(endX, startY);
    ctx.stroke();

    // Flight Curve
    const flightDurationSec = 14;
    const progress = Math.min(1, elapsedSec / flightDurationSec);
    const curveX = startX + progress * (endX - startX - 40);
    const curveY = startY - Math.pow(progress, 1.8) * (startY - endY - 40);

    // Gradient fill under the curve
    const fillGrad = ctx.createLinearGradient(0, endY, 0, startY);
    if (isCrashed) {
      fillGrad.addColorStop(0, 'rgba(255, 42, 95, 0.35)');
      fillGrad.addColorStop(1, 'rgba(255, 42, 95, 0.02)');
    } else {
      fillGrad.addColorStop(0, 'rgba(0, 231, 1, 0.35)');
      fillGrad.addColorStop(1, 'rgba(0, 231, 1, 0.02)');
    }

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    for (let step = 0; step <= 60; step++) {
      const p = (step / 60) * progress;
      const x = startX + p * (endX - startX - 40);
      const y = startY - Math.pow(p, 1.8) * (startY - endY - 40);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(curveX, startY);
    ctx.closePath();
    ctx.fillStyle = fillGrad;
    ctx.fill();

    // Line curve
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    for (let step = 0; step <= 60; step++) {
      const p = (step / 60) * progress;
      const x = startX + p * (endX - startX - 40);
      const y = startY - Math.pow(p, 1.8) * (startY - endY - 40);
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = isCrashed ? '#ff2a5f' : '#00e701';
    ctx.lineWidth = 4.5;
    ctx.stroke();

    // Rocket / Explosion at tip
    if (!isCrashed) {
      ctx.beginPath();
      ctx.arc(curveX, curveY, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00e701';
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = '#ff2a5f';
      ctx.font = '40px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💥', curveX, curveY);
    }

    // Dynamic Center Counter
    let counterColor = '#ffffff';
    if (isCrashed) {
      counterColor = '#ff2a5f';
    } else if (currentMult >= 10.0) {
      counterColor = '#ff2a5f';
    } else if (currentMult >= 3.0) {
      counterColor = '#ffd700';
    } else if (currentMult >= 1.5) {
      counterColor = '#00e701';
    }

    ctx.fillStyle = counterColor;
    ctx.font = 'bold 82px "Chakra Petch", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${currentMult.toFixed(2)}x`, w / 2, h / 2 - 14);

    ctx.fillStyle = isCrashed ? '#ff2a5f' : '#94a3b8';
    ctx.font = '700 16px "Outfit", sans-serif';
    ctx.fillText(isCrashed ? 'CRASHED' : 'CURRENT PAYOUT', w / 2, h / 2 + 42);
  }

  cashoutCrash() {
    if (this.crashState !== 'running') return;
    cancelAnimationFrame(this.crashAnimFrame);

    this.crashState = 'cashed';
    const winAmount = this.capGrossPayout(this.crashBet, this.crashBet * this.crashCurrentMultiplier);
    this.adjustBalance(winAmount);

    if (window.soundEngine) window.soundEngine.playWin();

    const cashoutBtn = document.getElementById('crash-btn-cashout');
    const startBtn = document.getElementById('crash-btn-start');
    if (cashoutBtn) {
      cashoutBtn.disabled = true;
      cashoutBtn.className = 'btn-stake-action cashed';
      cashoutBtn.textContent = `Cashed Out: +${winAmount} $DIG`;
    }

    const banner = document.getElementById('crash-result-banner');
    if (banner) {
      banner.textContent = `🚀 Cashed out at ${this.crashCurrentMultiplier.toFixed(2)}x (+${winAmount} $DIG)!`;
      banner.className = 'hg-result-banner active win';
    }

    setTimeout(() => {
      this.crashState = 'idle';
      if (startBtn) startBtn.disabled = false;
      this.drawCrashIdle();
    }, 2200);
  }

  triggerCrash(crashMult) {
    cancelAnimationFrame(this.crashAnimFrame);
    this.crashState = 'crashed';

    if (window.soundEngine) window.soundEngine.playBust();

    const startBtn = document.getElementById('crash-btn-start');
    const cashoutBtn = document.getElementById('crash-btn-cashout');
    if (cashoutBtn) {
      cashoutBtn.disabled = true;
      cashoutBtn.className = 'btn-stake-action';
      cashoutBtn.textContent = `Crashed @ ${crashMult.toFixed(2)}x`;
    }

    const banner = document.getElementById('crash-result-banner');
    if (banner) {
      banner.textContent = `💥 Crashed at ${crashMult.toFixed(2)}x!`;
      banner.className = 'hg-result-banner active loss';
    }

    this.crashHistory.push(crashMult);
    if (this.crashHistory.length > 12) this.crashHistory.shift();
    this.renderCrashHistory();

    const canvas = document.getElementById('crash-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      this.renderCrashFrame(ctx, canvas.width, canvas.height, 6, crashMult, true);
    }

    setTimeout(() => {
      this.crashState = 'idle';
      if (startBtn) startBtn.disabled = false;
    }, 1800);
  }

  // ==========================================
  // 4. STAKE ORIGINALS DICE (1.00% HOUSE EDGE)
  // ==========================================
  initDice() {
    const slider = document.getElementById('dice-slider-input');
    const rollBtn = document.getElementById('dice-btn-roll');
    const betInput = document.getElementById('dice-bet-input');
    const modeBtn = document.getElementById('dice-btn-mode');
    const multInput = document.getElementById('dice-input-mult');
    const targetInput = document.getElementById('dice-input-target');
    const chanceInput = document.getElementById('dice-input-chance');

    // 1. Slider input
    if (slider) {
      slider.addEventListener('input', (e) => {
        this.updateDiceFromTarget(parseFloat(e.target.value));
      });
    }

    // 2. Bet input
    if (betInput) {
      betInput.addEventListener('change', () => {
        this.diceBet = Math.max(1, parseInt(betInput.value, 10) || 10);
      });
    }

    // 3. Roll Over / Roll Under Toggle Button
    if (modeBtn) {
      modeBtn.addEventListener('click', () => {
        this.toggleDiceMode();
      });
    }

    // 4. Reactive Multiplier Input
    if (multInput) {
      multInput.addEventListener('change', () => {
        let v = parseFloat(multInput.value);
        if (isNaN(v)) v = 1.9000;
        this.updateDiceFromMultiplier(v);
      });
    }

    // 5. Reactive Target Input
    if (targetInput) {
      targetInput.addEventListener('change', () => {
        let v = parseFloat(targetInput.value);
        if (isNaN(v)) v = 50.00;
        this.updateDiceFromTarget(v);
      });
    }

    // 6. Reactive Win Chance Input
    if (chanceInput) {
      chanceInput.addEventListener('change', () => {
        let v = parseFloat(chanceInput.value);
        if (isNaN(v)) v = 50.00;
        this.updateDiceFromChance(v);
      });
    }

    // 7. Roll Button
    if (rollBtn) rollBtn.addEventListener('click', () => this.rollDice());

    this.renderDiceUI();
  }

  toggleDiceMode() {
    this.diceMode = this.diceMode === 'over' ? 'under' : 'over';
    if (window.soundEngine) window.soundEngine.playChip();
    this.updateDiceFromTarget(this.diceTarget);
  }

  updateDiceFromTarget(target) {
    if (this.diceMode === 'over') {
      this.diceTarget = Math.max(2.00, Math.min(99.98, target));
      this.diceWinChance = parseFloat((100 - this.diceTarget).toFixed(2));
    } else {
      this.diceTarget = Math.max(0.01, Math.min(98.00, target));
      this.diceWinChance = parseFloat(this.diceTarget.toFixed(2));
    }
    this.diceMultiplier = parseFloat((95.00 / this.diceWinChance).toFixed(4));
    this.renderDiceUI();
  }

  updateDiceFromMultiplier(mult) {
    const clampedMult = Math.max(1.0102, Math.min(9500.00, mult));
    this.diceMultiplier = clampedMult;
    const chance = 95.00 / clampedMult;
    this.diceWinChance = parseFloat(chance.toFixed(2));
    if (this.diceMode === 'over') {
      this.diceTarget = parseFloat((100 - this.diceWinChance).toFixed(2));
    } else {
      this.diceTarget = parseFloat(this.diceWinChance.toFixed(2));
    }
    this.renderDiceUI();
  }

  updateDiceFromChance(chance) {
    const clampedChance = Math.max(0.01, Math.min(94.00, chance));
    this.diceWinChance = clampedChance;
    this.diceMultiplier = parseFloat((95.00 / clampedChance).toFixed(4));
    if (this.diceMode === 'over') {
      this.diceTarget = parseFloat((100 - clampedChance).toFixed(2));
    } else {
      this.diceTarget = parseFloat(clampedChance.toFixed(2));
    }
    this.renderDiceUI();
  }

  renderDiceUI() {
    // 1. Mode Button & Labels
    const modeLabel = document.getElementById('dice-mode-label');
    const modeIcon = document.getElementById('dice-mode-icon');
    const targetLabel = document.getElementById('dice-target-lbl');

    const isOver = this.diceMode === 'over';
    if (modeLabel) modeLabel.textContent = isOver ? 'ROLL OVER' : 'ROLL UNDER';
    if (modeIcon) modeIcon.textContent = isOver ? '↗' : '↘';
    if (targetLabel) targetLabel.textContent = isOver ? 'ROLL OVER' : 'ROLL UNDER';

    // 2. Input values
    const multInput = document.getElementById('dice-input-mult');
    const targetInput = document.getElementById('dice-input-target');
    const chanceInput = document.getElementById('dice-input-chance');
    const slider = document.getElementById('dice-slider-input');

    if (multInput && document.activeElement !== multInput) {
      multInput.value = this.diceMultiplier.toFixed(4);
    }
    if (targetInput && document.activeElement !== targetInput) {
      targetInput.value = this.diceTarget.toFixed(2);
    }
    if (chanceInput && document.activeElement !== chanceInput) {
      chanceInput.value = this.diceWinChance.toFixed(2);
    }
    if (slider && document.activeElement !== slider) {
      slider.value = this.diceTarget;
    }

    // 3. Colored Slider Track Gradient
    const trackFill = document.getElementById('dice-slider-track-fill');
    if (trackFill) {
      const pct = this.diceTarget;
      if (isOver) {
        // Red from 0 to target, Green from target to 100
        trackFill.style.background = `linear-gradient(to right, #ff2a5f 0%, #ff2a5f ${pct}%, #00e701 ${pct}%, #00e701 100%)`;
      } else {
        // Green from 0 to target, Red from target to 100
        trackFill.style.background = `linear-gradient(to right, #00e701 0%, #00e701 ${pct}%, #ff2a5f ${pct}%, #ff2a5f 100%)`;
      }
    }
  }

  async rollDice() {
    if (this.isRollingDice) return;
    const betInput = document.getElementById('dice-bet-input');
    const bet = betInput ? (parseInt(betInput.value, 10) || 20) : 20;

    if (!this.checkAndDeductBet(bet)) return;
    this.isRollingDice = true;
    if (window.soundEngine) window.soundEngine.playDiceRoll();

    const bubble = document.getElementById('dice-result-bubble');
    if (bubble) {
      bubble.textContent = '...';
      bubble.className = 'dice-result-bubble';
    }

    let hash = 'dice_' + Date.now();
    let rollResult = 50.00;
    if (window.pfEngine && typeof window.pfEngine.generateRoundHash === 'function') {
      hash = await window.pfEngine.generateRoundHash();
      rollResult = window.pfEngine.getDiceRoll(hash);
      window.pfEngine.nextNonce();
    } else {
      rollResult = parseFloat((Math.random() * 100).toFixed(2));
    }

    const isWin = this.diceMode === 'over' ? rollResult >= this.diceTarget : rollResult <= this.diceTarget;

    setTimeout(() => {
      this.isRollingDice = false;
      if (bubble) {
        bubble.textContent = rollResult.toFixed(2);
        bubble.className = `dice-result-bubble ${isWin ? 'win' : 'lose'}`;
      }

      if (isWin) {
        const payout = this.capGrossPayout(bet, bet * this.diceMultiplier);
        this.adjustBalance(payout);
        if (window.soundEngine) window.soundEngine.playWin();
        this.showToast(`🎯 Rolled ${rollResult.toFixed(2)}! Won +${payout} $DIG (${this.diceMultiplier.toFixed(4)}x)!`, 'win');
      } else {
        if (window.soundEngine) window.soundEngine.playBust();
      }
    }, 280);
  }

  // ==========================================
  // 5. BLACKJACK (21)
  // ==========================================
  initBlackjack() {
    const dealBtn = document.getElementById('bj-btn-deal');
    const hitBtn = document.getElementById('bj-btn-hit');
    const standBtn = document.getElementById('bj-btn-stand');
    const doubleBtn = document.getElementById('bj-btn-double');
    const splitBtn = document.getElementById('bj-btn-split');
    const insureYesBtn = document.getElementById('bj-btn-insurance-yes');
    const insureNoBtn = document.getElementById('bj-btn-insurance-no');

    if (dealBtn) dealBtn.addEventListener('click', () => this.dealBlackjack());
    if (hitBtn) hitBtn.addEventListener('click', () => this.hitBlackjack());
    if (standBtn) standBtn.addEventListener('click', () => this.standBlackjack());
    if (doubleBtn) doubleBtn.addEventListener('click', () => this.doubleBlackjack());
    if (splitBtn) splitBtn.addEventListener('click', () => this.splitBlackjack());
    if (insureYesBtn) insureYesBtn.addEventListener('click', () => this.takeInsurance(true));
    if (insureNoBtn) insureNoBtn.addEventListener('click', () => this.takeInsurance(false));

    document.querySelectorAll('.bj-chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.bj-chip-btn').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const val = parseInt(chip.getAttribute('data-val'), 10) || 25;
        const input = document.getElementById('bj-bet-input');
        if (input) {
          input.value = val;
          this.bjBet = val;
        }
        if (window.soundEngine) window.soundEngine.playChip();
      });
    });
  }

  getCardValue(cardNum) {
    const rank = cardNum % 13;
    if (rank === 0) return 11; // Ace
    if (rank >= 9) return 10; // 10, J, Q, K are 10 points
    return rank + 1; // 2 through 9
  }

  canSplitHand(cards) {
    if (!cards || cards.length !== 2) return false;
    return this.getCardValue(cards[0]) === this.getCardValue(cards[1]);
  }

  async dealBlackjack() {
    if (this.bjState === 'playing') return;
    const input = document.getElementById('bj-bet-input');
    const bet = input ? (parseInt(input.value, 10) || 25) : 25;

    if (!this.checkAndDeductBet(bet)) return;
    this.bjBet = bet;
    this.bjInsuranceBet = 0;
    this.bjState = 'playing';
    this.bjIsSplit = false;
    this.bjSplitHands = [];
    this.bjActiveHandIdx = 0;

    const insuranceBox = document.getElementById('bj-insurance-box');
    if (insuranceBox) insuranceBox.style.display = 'none';

    const splitBtn = document.getElementById('bj-btn-split');
    if (splitBtn) {
      splitBtn.style.display = 'none';
      splitBtn.disabled = true;
    }

    let hash = 'bj_' + Date.now();
    if (window.pfEngine && typeof window.pfEngine.generateRoundHash === 'function') {
      hash = await window.pfEngine.generateRoundHash();
      this.bjDeck = window.pfEngine.getShuffledDeck(hash);
      window.pfEngine.nextNonce();
    } else {
      this.bjDeck = Array.from({ length: 52 }, (_, i) => i).sort(() => Math.random() - 0.5);
    }

    this.bjDealerHand = [this.bjDeck.pop(), this.bjDeck.pop()];
    this.bjPlayerHand = [this.bjDeck.pop(), this.bjDeck.pop()];

    if (window.soundEngine) window.soundEngine.playCard();

    document.getElementById('bj-btn-deal').disabled = true;

    const banner = document.getElementById('bj-result-banner');
    if (banner) { banner.textContent = ''; banner.className = 'hg-result-banner'; }

    this.renderBlackjackTable(false);

    // Check if dealer up-card is an Ace (card % 13 === 0)
    const dealerUpCardRank = this.bjDealerHand[0] % 13;
    if (dealerUpCardRank === 0) {
      // Exclusively offered when dealer shows an Ace
      this.offerInsurance();
      return;
    }

    this.startPlayerTurn();
  }

  offerInsurance() {
    const insuranceCost = Math.floor(this.bjBet / 2);
    const insuranceBox = document.getElementById('bj-insurance-box');
    const costEl = document.getElementById('bj-insurance-cost');
    const yesBtn = document.getElementById('bj-btn-insurance-yes');
    const hitBtn = document.getElementById('bj-btn-hit');
    const standBtn = document.getElementById('bj-btn-stand');
    const doubleBtn = document.getElementById('bj-btn-double');
    const splitBtn = document.getElementById('bj-btn-split');

    // Action buttons remain locked while insurance choice is pending
    if (hitBtn) hitBtn.disabled = true;
    if (standBtn) standBtn.disabled = true;
    if (doubleBtn) {
      doubleBtn.style.display = 'none';
      doubleBtn.disabled = true;
    }
    if (splitBtn) {
      splitBtn.style.display = 'none';
      splitBtn.disabled = true;
    }

    if (costEl) costEl.textContent = insuranceCost;
    if (yesBtn) {
      yesBtn.disabled = this.balance < insuranceCost;
      yesBtn.title = this.balance < insuranceCost ? 'Insufficient balance for insurance' : '';
    }

    if (insuranceBox) {
      insuranceBox.style.display = 'flex';
    }

    const banner = document.getElementById('bj-result-banner');
    if (banner) {
      banner.textContent = `🛡️ Dealer shows Ace! Insurance offered for ${insuranceCost} $DIG (pays 2:1)`;
      banner.className = 'hg-result-banner active push';
    }
  }

  takeInsurance(accepted) {
    const insuranceBox = document.getElementById('bj-insurance-box');
    if (insuranceBox) insuranceBox.style.display = 'none';

    const insuranceCost = Math.floor(this.bjBet / 2);
    if (accepted) {
      if (!this.checkAndDeductBet(insuranceCost)) {
        accepted = false;
        this.bjInsuranceBet = 0;
      } else {
        this.bjInsuranceBet = insuranceCost;
        if (window.soundEngine) window.soundEngine.playChip();
      }
    } else {
      this.bjInsuranceBet = 0;
    }

    // Dealer checks hole card for Blackjack (Peek)
    const dealerTotal = this.calculateHand(this.bjDealerHand);
    const playerTotal = this.calculateHand(this.bjPlayerHand);
    const dealerHasBJ = dealerTotal === 21;

    if (dealerHasBJ) {
      // Dealer has natural blackjack! Reveal hole card immediately
      this.renderBlackjackTable(true);

      if (this.bjInsuranceBet > 0) {
        // Insurance WIN! Pays 2:1 on insurance bet (total returned: 3x insuranceBet = 1.5x original bet)
        const insurancePayout = this.bjInsuranceBet * 3;
        this.adjustBalance(insurancePayout);

        if (playerTotal === 21) {
          // Push on main bet + Win on insurance
          this.adjustBalance(this.bjBet);
          this.resolveBlackjack('insurance_and_push');
        } else {
          // Main bet lost, insurance paid 2:1 -> Even Hand (Tablas / Net 0)
          this.resolveBlackjack('insurance_even');
        }
      } else {
        // Declined insurance
        if (playerTotal === 21) {
          this.resolveBlackjack('push');
        } else {
          this.resolveBlackjack('dealer_blackjack');
        }
      }
      return;
    }

    // Dealer does NOT have Blackjack
    const banner = document.getElementById('bj-result-banner');
    if (this.bjInsuranceBet > 0) {
      if (window.soundEngine) window.soundEngine.playBust();
      if (banner) {
        banner.textContent = `❌ Insurance Lost (-${this.bjInsuranceBet} $DIG): Dealer does not have Blackjack. Hand continues...`;
        banner.className = 'hg-result-banner active loss';
      }
    } else {
      if (banner) {
        banner.textContent = `Dealer does not have Blackjack. Hand continues...`;
        banner.className = 'hg-result-banner active';
      }
    }

    // Hand continues normally
    this.startPlayerTurn();
  }

  startPlayerTurn() {
    const hitBtn = document.getElementById('bj-btn-hit');
    const standBtn = document.getElementById('bj-btn-stand');
    const doubleBtn = document.getElementById('bj-btn-double');
    const splitBtn = document.getElementById('bj-btn-split');

    if (hitBtn) hitBtn.disabled = false;
    if (standBtn) standBtn.disabled = false;
    if (doubleBtn) {
      doubleBtn.style.display = '';
      doubleBtn.disabled = this.balance < this.bjBet;
    }

    // Check Split eligibility: 2 cards of equal numeric value & balance >= bet
    if (splitBtn) {
      if (this.canSplitHand(this.bjPlayerHand)) {
        splitBtn.style.display = '';
        splitBtn.disabled = this.balance < this.bjBet;
        splitBtn.title = this.balance < this.bjBet ? 'Saldo insuficiente para Split' : 'Dividir en 2 manos independientes';
      } else {
        splitBtn.style.display = 'none';
        splitBtn.disabled = true;
      }
    }

    // Natural Blackjack Check (Player Ace + 10-value card = 21)
    const playerTotal = this.calculateHand(this.bjPlayerHand);
    const dealerTotal = this.calculateHand(this.bjDealerHand);
    if (playerTotal === 21) {
      if (dealerTotal === 21) {
        this.resolveBlackjack('push');
      } else {
        this.resolveBlackjack('blackjack');
      }
    }
  }

  splitBlackjack() {
    if (this.bjState !== 'playing' || this.bjIsSplit) return;
    if (!this.canSplitHand(this.bjPlayerHand)) return;
    if (!this.checkAndDeductBet(this.bjBet)) return;

    this.bjIsSplit = true;
    this.bjActiveHandIdx = 0;

    const card1 = this.bjPlayerHand[0];
    const card2 = this.bjPlayerHand[1];

    // Deal 1 new card to each split hand
    const newCard1 = this.bjDeck.pop();
    const newCard2 = this.bjDeck.pop();

    if (window.soundEngine) {
      window.soundEngine.playChip();
      window.soundEngine.playCard();
    }

    const isAcesSplit = (card1 % 13 === 0 && card2 % 13 === 0);

    this.bjSplitHands = [
      {
        id: 0,
        cards: [card1, newCard1],
        bet: this.bjBet,
        doubled: false,
        busted: false,
        stood: isAcesSplit, // Split Aces: 1 card each, no further hits
        outcome: null,
        payout: 0
      },
      {
        id: 1,
        cards: [card2, newCard2],
        bet: this.bjBet,
        doubled: false,
        busted: false,
        stood: isAcesSplit,
        outcome: null,
        payout: 0
      }
    ];

    this.bjPlayerHand = this.bjSplitHands[0].cards;

    const splitBtn = document.getElementById('bj-btn-split');
    if (splitBtn) {
      splitBtn.style.display = 'none';
      splitBtn.disabled = true;
    }

    const banner = document.getElementById('bj-result-banner');

    if (isAcesSplit) {
      if (banner) {
        banner.textContent = `✌️ Split de Ases: 1 carta por mano. Turno del crupier...`;
        banner.className = 'hg-result-banner active push';
      }
      this.renderBlackjackTable(false);
      setTimeout(() => this.dealerTurnSplit(), 700);
      return;
    }

    if (banner) {
      banner.textContent = `✌️ ¡Mano dividida en 2! Jugando Mano 1...`;
      banner.className = 'hg-result-banner active';
    }

    const doubleBtn = document.getElementById('bj-btn-double');
    if (doubleBtn) {
      doubleBtn.style.display = '';
      doubleBtn.disabled = this.balance < this.bjSplitHands[0].bet;
    }

    const hand0Total = this.calculateHand(this.bjSplitHands[0].cards);
    if (hand0Total === 21) {
      this.bjSplitHands[0].stood = true;
      this.renderBlackjackTable(false);
      setTimeout(() => this.advanceSplitHand(), 600);
      return;
    }

    this.renderBlackjackTable(false);
  }

  hitBlackjack() {
    if (this.bjState !== 'playing') return;

    if (!this.bjIsSplit) {
      this.bjPlayerHand.push(this.bjDeck.pop());
      if (window.soundEngine) window.soundEngine.playCard();
      
      const doubleBtn = document.getElementById('bj-btn-double');
      const splitBtn = document.getElementById('bj-btn-split');
      if (doubleBtn) {
        doubleBtn.style.display = 'none';
        doubleBtn.disabled = true;
      }
      if (splitBtn) {
        splitBtn.style.display = 'none';
        splitBtn.disabled = true;
      }

      const total = this.calculateHand(this.bjPlayerHand);
      this.renderBlackjackTable(false);

      if (total > 21) {
        this.resolveBlackjack('bust');
      }
      return;
    }

    // Split mode hit
    const currentHand = this.bjSplitHands[this.bjActiveHandIdx];
    currentHand.cards.push(this.bjDeck.pop());
    this.bjPlayerHand = currentHand.cards;
    if (window.soundEngine) window.soundEngine.playCard();

    // After hitting, Double is disabled for this hand
    const doubleBtn = document.getElementById('bj-btn-double');
    if (doubleBtn) {
      doubleBtn.style.display = 'none';
      doubleBtn.disabled = true;
    }

    const total = this.calculateHand(currentHand.cards);
    this.renderBlackjackTable(false);

    if (total > 21) {
      currentHand.busted = true;
      currentHand.stood = true;
      if (window.soundEngine) window.soundEngine.playBust();
      setTimeout(() => this.advanceSplitHand(), 500);
    } else if (total === 21) {
      currentHand.stood = true;
      setTimeout(() => this.advanceSplitHand(), 500);
    }
  }

  standBlackjack() {
    if (this.bjState !== 'playing') return;

    if (!this.bjIsSplit) {
      const doubleBtn = document.getElementById('bj-btn-double');
      const splitBtn = document.getElementById('bj-btn-split');
      if (doubleBtn) {
        doubleBtn.style.display = 'none';
        doubleBtn.disabled = true;
      }
      if (splitBtn) {
        splitBtn.style.display = 'none';
        splitBtn.disabled = true;
      }

      this.renderBlackjackTable(true);

      let dealerTotal = this.calculateHand(this.bjDealerHand);
      while (dealerTotal < 17) {
        this.bjDealerHand.push(this.bjDeck.pop());
        dealerTotal = this.calculateHand(this.bjDealerHand);
      }

      this.renderBlackjackTable(true);
      const playerTotal = this.calculateHand(this.bjPlayerHand);

      if (dealerTotal > 21) {
        this.resolveBlackjack('dealer_bust');
      } else if (playerTotal > dealerTotal) {
        this.resolveBlackjack('win');
      } else if (playerTotal < dealerTotal) {
        this.resolveBlackjack('lose');
      } else {
        this.resolveBlackjack('push');
      }
      return;
    }

    const currentHand = this.bjSplitHands[this.bjActiveHandIdx];
    currentHand.stood = true;
    this.advanceSplitHand();
  }

  doubleBlackjack() {
    if (this.bjState !== 'playing') return;

    if (!this.bjIsSplit) {
      if (!this.checkAndDeductBet(this.bjBet)) return;
      this.bjBet *= 2;
      const doubleBtn = document.getElementById('bj-btn-double');
      const splitBtn = document.getElementById('bj-btn-split');
      if (doubleBtn) {
        doubleBtn.style.display = 'none';
        doubleBtn.disabled = true;
      }
      if (splitBtn) {
        splitBtn.style.display = 'none';
        splitBtn.disabled = true;
      }
      this.bjPlayerHand.push(this.bjDeck.pop());
      if (window.soundEngine) window.soundEngine.playCard();

      const playerTotal = this.calculateHand(this.bjPlayerHand);
      if (playerTotal > 21) {
        this.resolveBlackjack('bust');
      } else {
        this.standBlackjack();
      }
      return;
    }

    const currentHand = this.bjSplitHands[this.bjActiveHandIdx];
    if (!this.checkAndDeductBet(currentHand.bet)) return;
    currentHand.bet *= 2;
    currentHand.doubled = true;

    const doubleBtn = document.getElementById('bj-btn-double');
    if (doubleBtn) {
      doubleBtn.style.display = 'none';
      doubleBtn.disabled = true;
    }

    currentHand.cards.push(this.bjDeck.pop());
    this.bjPlayerHand = currentHand.cards;
    if (window.soundEngine) window.soundEngine.playCard();

    const total = this.calculateHand(currentHand.cards);
    if (total > 21) {
      currentHand.busted = true;
    }
    currentHand.stood = true;
    this.renderBlackjackTable(false);

    setTimeout(() => this.advanceSplitHand(), 500);
  }

  advanceSplitHand() {
    if (this.bjActiveHandIdx === 0) {
      this.bjActiveHandIdx = 1;
      this.bjPlayerHand = this.bjSplitHands[1].cards;

      const banner = document.getElementById('bj-result-banner');
      if (banner) {
        banner.textContent = `✌️ Mano 1 finalizada. Jugando Mano 2...`;
        banner.className = 'hg-result-banner active';
      }

      const doubleBtn = document.getElementById('bj-btn-double');
      if (doubleBtn) {
        doubleBtn.style.display = '';
        doubleBtn.disabled = this.balance < this.bjSplitHands[1].bet;
      }

      const hand1Total = this.calculateHand(this.bjSplitHands[1].cards);
      if (hand1Total === 21) {
        this.bjSplitHands[1].stood = true;
        this.renderBlackjackTable(false);
        setTimeout(() => this.dealerTurnSplit(), 600);
        return;
      }

      this.renderBlackjackTable(false);
    } else {
      this.dealerTurnSplit();
    }
  }

  dealerTurnSplit() {
    document.getElementById('bj-btn-hit').disabled = true;
    document.getElementById('bj-btn-stand').disabled = true;
    const doubleBtn = document.getElementById('bj-btn-double');
    if (doubleBtn) {
      doubleBtn.style.display = 'none';
      doubleBtn.disabled = true;
    }
    const splitBtn = document.getElementById('bj-btn-split');
    if (splitBtn) {
      splitBtn.style.display = 'none';
      splitBtn.disabled = true;
    }

    this.renderBlackjackTable(true);

    const hand0 = this.bjSplitHands[0];
    const hand1 = this.bjSplitHands[1];

    if (hand0.busted && hand1.busted) {
      this.resolveSplitOutcomes();
      return;
    }

    let dealerTotal = this.calculateHand(this.bjDealerHand);
    while (dealerTotal < 17) {
      this.bjDealerHand.push(this.bjDeck.pop());
      dealerTotal = this.calculateHand(this.bjDealerHand);
    }

    this.renderBlackjackTable(true);
    this.resolveSplitOutcomes();
  }

  resolveSplitOutcomes() {
    this.bjState = 'idle';
    document.getElementById('bj-btn-deal').disabled = false;
    document.getElementById('bj-btn-hit').disabled = true;
    document.getElementById('bj-btn-stand').disabled = true;
    const doubleBtn = document.getElementById('bj-btn-double');
    if (doubleBtn) {
      doubleBtn.style.display = 'none';
      doubleBtn.disabled = true;
    }
    const splitBtn = document.getElementById('bj-btn-split');
    if (splitBtn) {
      splitBtn.style.display = 'none';
      splitBtn.disabled = true;
    }

    const dealerTotal = this.calculateHand(this.bjDealerHand);
    const dealerBust = dealerTotal > 21;

    let totalPayout = 0;
    let totalBet = 0;
    const summaries = [];

    this.bjSplitHands.forEach((h, idx) => {
      totalBet += h.bet;
      const hTotal = this.calculateHand(h.cards);
      let outcome = '';
      let payout = 0;

      if (h.busted) {
        outcome = 'Bust ❌';
        payout = 0;
      } else if (dealerBust) {
        outcome = 'Ganó 🏆';
        payout = h.bet * 2;
      } else if (hTotal > dealerTotal) {
        outcome = 'Ganó 🏆';
        payout = h.bet * 2;
      } else if (hTotal < dealerTotal) {
        outcome = 'Perdió ❌';
        payout = 0;
      } else {
        outcome = 'Tablas 🤝';
        payout = h.bet;
      }

      h.outcome = outcome;
      h.payout = payout;
      totalPayout += payout;

      summaries.push(`Mano ${idx + 1} (${hTotal}): ${outcome} ${payout > 0 ? '(+' + payout + ' $DIG)' : ''}`);
    });

    if (totalPayout > 0) {
      totalPayout = this.capGrossPayout(totalBet, totalPayout);
      this.adjustBalance(totalPayout);
    }

    const netProfit = totalPayout - totalBet;
    const banner = document.getElementById('bj-result-banner');

    if (netProfit > 0) {
      if (window.soundEngine) window.soundEngine.playWin();
      if (banner) {
        banner.textContent = `✌️ ${summaries.join(' | ')} · Ganancia neta: +${netProfit} $DIG`;
        banner.className = 'hg-result-banner active win';
      }
    } else if (netProfit === 0) {
      if (banner) {
        banner.textContent = `✌️ ${summaries.join(' | ')} · Tablas (0 $DIG)`;
        banner.className = 'hg-result-banner active push';
      }
    } else {
      if (window.soundEngine) window.soundEngine.playBust();
      if (banner) {
        banner.textContent = `✌️ ${summaries.join(' | ')} · Pérdida neta: ${netProfit} $DIG`;
        banner.className = 'hg-result-banner active loss';
      }
    }

    this.renderBlackjackTable(true);
  }

  resolveBlackjack(outcome) {
    this.bjState = 'idle';
    document.getElementById('bj-btn-deal').disabled = false;
    document.getElementById('bj-btn-hit').disabled = true;
    document.getElementById('bj-btn-stand').disabled = true;
    const doubleBtn = document.getElementById('bj-btn-double');
    if (doubleBtn) {
      doubleBtn.style.display = 'none';
      doubleBtn.disabled = true;
    }
    const splitBtn = document.getElementById('bj-btn-split');
    if (splitBtn) {
      splitBtn.style.display = 'none';
      splitBtn.disabled = true;
    }

    const insuranceBox = document.getElementById('bj-insurance-box');
    if (insuranceBox) insuranceBox.style.display = 'none';

    const banner = document.getElementById('bj-result-banner');

    if (outcome === 'insurance_even') {
      if (window.soundEngine) window.soundEngine.playWin();
      if (banner) {
        banner.textContent = `🛡️ Insurance Paid 2:1! Dealer had Blackjack. Even hand (Tablas / Zero loss).`;
        banner.className = 'hg-result-banner active win';
      }
    } else if (outcome === 'insurance_and_push') {
      if (window.soundEngine) window.soundEngine.playWin();
      const profit = this.bjInsuranceBet * 2;
      if (banner) {
        banner.textContent = `🛡️ Push + Insurance Won! Both had Blackjack (+${profit} $DIG profit)!`;
        banner.className = 'hg-result-banner active win';
      }
    } else if (outcome === 'dealer_blackjack') {
      if (window.soundEngine) window.soundEngine.playBust();
      if (banner) {
        banner.textContent = `Dealer has Natural Blackjack! Hand lost.`;
        banner.className = 'hg-result-banner active loss';
      }
    } else if (outcome === 'blackjack') {
      // 3:2 Natural Blackjack payout (2.5x bet total)
      const payout = this.capGrossPayout(this.bjBet, this.bjBet * 2.5);
      this.adjustBalance(payout);
      if (window.soundEngine) window.soundEngine.playWin();
      if (banner) {
        banner.textContent = `🃏 BLACKJACK! Paid 3:2 (+${payout} $DIG)!`;
        banner.className = 'hg-result-banner active win';
      }
    } else if (outcome === 'win' || outcome === 'dealer_bust') {
      const payout = this.capGrossPayout(this.bjBet, this.bjBet * 2);
      this.adjustBalance(payout);
      if (window.soundEngine) window.soundEngine.playWin();
      if (banner) {
        banner.textContent = outcome === 'dealer_bust' ? `Dealer Busted! You Win +${payout} $DIG!` : `You Win +${payout} $DIG!`;
        banner.className = 'hg-result-banner active win';
      }
    } else if (outcome === 'push') {
      this.adjustBalance(this.bjBet);
      if (banner) {
        banner.textContent = `Push! Hand tied · ${this.bjBet} $DIG bet returned.`;
        banner.className = 'hg-result-banner active push';
      }
    } else {
      if (window.soundEngine) window.soundEngine.playBust();
      if (banner) {
        banner.textContent = outcome === 'bust' ? 'Bust! Hand exceeded 21.' : 'Dealer Wins.';
        banner.className = 'hg-result-banner active loss';
      }
    }

    this.bjInsuranceBet = 0;
    this.renderBlackjackTable(true);
  }

  calculateHand(cards) {
    let total = 0;
    let aces = 0;
    cards.forEach(c => {
      const rank = c % 13;
      if (rank === 0) {
        aces += 1;
        total += 11;
      } else if (rank >= 9) {
        total += 10;
      } else {
        total += rank + 1;
      }
    });

    while (total > 21 && aces > 0) {
      total -= 10;
      aces -= 1;
    }
    return total;
  }

  renderBlackjackTable(revealDealer = false) {
    const dealerCardsEl = document.getElementById('bj-dealer-cards');
    const playerCardsEl = document.getElementById('bj-player-cards');
    const dealerTotalEl = document.getElementById('bj-dealer-total');
    const playerTotalEl = document.getElementById('bj-player-total');
    const singleSection = document.getElementById('bj-single-hand-section');
    const splitSection = document.getElementById('bj-split-hands-section');

    if (!dealerCardsEl || !playerCardsEl) return;

    // Dealer cards
    dealerCardsEl.innerHTML = '';
    this.bjDealerHand.forEach((card, idx) => {
      if (idx === 1 && !revealDealer) {
        const back = document.createElement('div');
        back.className = 'playing-card card-hidden';
        back.innerHTML = '<div class="card-back-pattern">♠</div>';
        dealerCardsEl.appendChild(back);
      } else {
        dealerCardsEl.appendChild(this.createCardElement(card));
      }
    });

    if (dealerTotalEl) {
      if (revealDealer) {
        dealerTotalEl.textContent = this.calculateHand(this.bjDealerHand);
      } else if (this.bjDealerHand.length > 0) {
        dealerTotalEl.textContent = this.calculateHand([this.bjDealerHand[0]]);
      } else {
        dealerTotalEl.textContent = '0';
      }
    }

    if (!this.bjIsSplit) {
      if (singleSection) singleSection.style.display = 'flex';
      if (splitSection) splitSection.style.display = 'none';

      playerCardsEl.innerHTML = '';
      this.bjPlayerHand.forEach(card => {
        playerCardsEl.appendChild(this.createCardElement(card));
      });

      if (playerTotalEl) {
        playerTotalEl.textContent = this.calculateHand(this.bjPlayerHand);
      }
    } else {
      if (singleSection) singleSection.style.display = 'none';
      if (splitSection) splitSection.style.display = 'grid';

      // Keep playerCardsEl and playerTotalEl populated with active hand (for test compatibility)
      const activeHand = this.bjSplitHands[this.bjActiveHandIdx] || this.bjSplitHands[0];
      if (activeHand) {
        playerCardsEl.innerHTML = '';
        activeHand.cards.forEach(card => {
          playerCardsEl.appendChild(this.createCardElement(card));
        });
        if (playerTotalEl) {
          playerTotalEl.textContent = this.calculateHand(activeHand.cards);
        }
      }

      // Render Hand 0
      const h0 = this.bjSplitHands[0];
      const h0CardsEl = document.getElementById('bj-split-0-cards');
      const h0TotalEl = document.getElementById('bj-split-0-total');
      const h0BetEl = document.getElementById('bj-split-0-bet');
      const h0BadgeEl = document.getElementById('bj-split-0-badge');
      const h0Box = document.getElementById('bj-split-hand-0');

      if (h0 && h0CardsEl) {
        h0CardsEl.innerHTML = '';
        h0.cards.forEach(c => h0CardsEl.appendChild(this.createCardElement(c)));
        const tot0 = this.calculateHand(h0.cards);
        if (h0TotalEl) h0TotalEl.textContent = tot0 > 21 ? 'BUST' : tot0;
        if (h0BetEl) h0BetEl.textContent = h0.bet;

        if (h0Box) {
          h0Box.classList.toggle('active-turn', this.bjState === 'playing' && this.bjActiveHandIdx === 0);
        }

        if (h0BadgeEl) {
          if (this.bjState === 'playing') {
            if (this.bjActiveHandIdx === 0) {
              h0BadgeEl.className = 'bj-hand-status-tag tag-active';
              h0BadgeEl.textContent = 'TURNO';
            } else {
              h0BadgeEl.className = h0.busted ? 'bj-hand-status-tag tag-loss' : 'bj-hand-status-tag tag-stand';
              h0BadgeEl.textContent = h0.busted ? 'BUST' : 'STAND';
            }
          } else {
            if (h0.busted) {
              h0BadgeEl.className = 'bj-hand-status-tag tag-loss';
              h0BadgeEl.textContent = 'BUST';
            } else if (h0.outcome && h0.outcome.includes('Ganó')) {
              h0BadgeEl.className = 'bj-hand-status-tag tag-win';
              h0BadgeEl.textContent = 'GANÓ';
            } else if (h0.outcome && h0.outcome.includes('Tablas')) {
              h0BadgeEl.className = 'bj-hand-status-tag tag-push';
              h0BadgeEl.textContent = 'TABLAS';
            } else {
              h0BadgeEl.className = 'bj-hand-status-tag tag-loss';
              h0BadgeEl.textContent = 'PERDIÓ';
            }
          }
        }
      }

      // Render Hand 1
      const h1 = this.bjSplitHands[1];
      const h1CardsEl = document.getElementById('bj-split-1-cards');
      const h1TotalEl = document.getElementById('bj-split-1-total');
      const h1BetEl = document.getElementById('bj-split-1-bet');
      const h1BadgeEl = document.getElementById('bj-split-1-badge');
      const h1Box = document.getElementById('bj-split-hand-1');

      if (h1 && h1CardsEl) {
        h1CardsEl.innerHTML = '';
        h1.cards.forEach(c => h1CardsEl.appendChild(this.createCardElement(c)));
        const tot1 = this.calculateHand(h1.cards);
        if (h1TotalEl) h1TotalEl.textContent = tot1 > 21 ? 'BUST' : tot1;
        if (h1BetEl) h1BetEl.textContent = h1.bet;

        if (h1Box) {
          h1Box.classList.toggle('active-turn', this.bjState === 'playing' && this.bjActiveHandIdx === 1);
        }

        if (h1BadgeEl) {
          if (this.bjState === 'playing') {
            if (this.bjActiveHandIdx === 1) {
              h1BadgeEl.className = 'bj-hand-status-tag tag-active';
              h1BadgeEl.textContent = 'TURNO';
            } else if (this.bjActiveHandIdx === 0) {
              h1BadgeEl.className = 'bj-hand-status-tag';
              h1BadgeEl.textContent = 'ESPERA';
            } else {
              h1BadgeEl.className = h1.busted ? 'bj-hand-status-tag tag-loss' : 'bj-hand-status-tag tag-stand';
              h1BadgeEl.textContent = h1.busted ? 'BUST' : 'STAND';
            }
          } else {
            if (h1.busted) {
              h1BadgeEl.className = 'bj-hand-status-tag tag-loss';
              h1BadgeEl.textContent = 'BUST';
            } else if (h1.outcome && h1.outcome.includes('Ganó')) {
              h1BadgeEl.className = 'bj-hand-status-tag tag-win';
              h1BadgeEl.textContent = 'GANÓ';
            } else if (h1.outcome && h1.outcome.includes('Tablas')) {
              h1BadgeEl.className = 'bj-hand-status-tag tag-push';
              h1BadgeEl.textContent = 'TABLAS';
            } else {
              h1BadgeEl.className = 'bj-hand-status-tag tag-loss';
              h1BadgeEl.textContent = 'PERDIÓ';
            }
          }
        }
      }
    }
  }

  createCardElement(cardNum) {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const suitIdx = Math.floor(cardNum / 13);
    const rankIdx = cardNum % 13;
    const suit = suits[suitIdx];
    const rank = ranks[rankIdx];
    const isRed = suit === '♥' || suit === '♦';

    const card = document.createElement('div');
    card.className = `playing-card ${isRed ? 'card-red' : 'card-black'}`;
    card.innerHTML = `
      <div class="card-corner top-left">${rank}<span>${suit}</span></div>
      <div class="card-center-suit" style="align-self: center; font-size: 24px;">${suit}</div>
      <div class="card-corner bottom-right">${rank}<span>${suit}</span></div>
    `;
    return card;
  }

  // ==========================================
  // 6. EUROPEAN ROULETTE (0-36, COMPLETE BOARD)
  // ==========================================
  initRoulette() {
    const spinBtn = document.getElementById('roulette-btn-spin');
    const clearBtn = document.getElementById('roulette-btn-clear');

    if (spinBtn) spinBtn.addEventListener('click', () => this.spinRoulette());
    if (clearBtn) clearBtn.addEventListener('click', () => this.clearRoulette());

    // Connect Chip Presets (5, 25, 100, 500)
    document.querySelectorAll('.roulette-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.roulette-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.rouletteChip = parseInt(btn.getAttribute('data-val'), 10) || 25;
        if (window.soundEngine) window.soundEngine.playChip();
      });
    });

    this.renderRouletteTable();
    this.drawRouletteWheel(0);
    this.updateRouletteBetDisplay();
  }

  renderRouletteTable() {
    const table = document.getElementById('roulette-betting-table');
    if (!table) return;

    table.innerHTML = '';

    // 1. Zero Tile (Left, Spans rows 1 to 4)
    const zeroTile = document.createElement('div');
    zeroTile.className = 'r-tile zero';
    zeroTile.textContent = '0';
    zeroTile.setAttribute('data-bet', 'num_0');
    zeroTile.addEventListener('click', () => this.placeRouletteBet('num_0'));
    table.appendChild(zeroTile);

    // 2. Numbers Grid (1 to 36 organized in 3 rows of 12 columns)
    // Row 1: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36
    // Row 2: 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35
    // Row 3: 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34
    const rows = [
      [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
      [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
      [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
    ];

    rows.forEach((rowNums, rIdx) => {
      rowNums.forEach((num, cIdx) => {
        const tile = document.createElement('div');
        const isRed = this.redNumbers.includes(num);
        tile.className = `r-tile ${isRed ? 'red' : 'black'}`;
        tile.style.gridRow = `${rIdx + 1} / ${rIdx + 2}`;
        tile.style.gridColumn = `${cIdx + 2} / ${cIdx + 3}`;
        tile.textContent = num.toString();
        tile.setAttribute('data-bet', `num_${num}`);
        tile.addEventListener('click', () => this.placeRouletteBet(`num_${num}`));
        table.appendChild(tile);
      });

      // Column 2:1 bet for this row
      const colBet = document.createElement('div');
      colBet.className = 'r-tile col-bet';
      colBet.style.gridRow = `${rIdx + 1} / ${rIdx + 2}`;
      colBet.style.gridColumn = '14 / 15';
      colBet.textContent = '2:1';
      const colId = `col_${3 - rIdx}`;
      colBet.setAttribute('data-bet', colId);
      colBet.title = `Column ${3 - rIdx} (pays 2:1)`;
      colBet.addEventListener('click', () => this.placeRouletteBet(colId));
      table.appendChild(colBet);
    });

    // 3. Dozen Bets (Row 4: 1st 12, 2nd 12, 3rd 12)
    const dozens = [
      { id: 'doz_1', label: '1st 12', colStart: 2, colEnd: 6 },
      { id: 'doz_2', label: '2nd 12', colStart: 6, colEnd: 10 },
      { id: 'doz_3', label: '3rd 12', colStart: 10, colEnd: 14 }
    ];

    dozens.forEach(d => {
      const tile = document.createElement('div');
      tile.className = 'r-tile outside-bet';
      tile.style.gridRow = '4 / 5';
      tile.style.gridColumn = `${d.colStart} / ${d.colEnd}`;
      tile.textContent = d.label;
      tile.setAttribute('data-bet', d.id);
      tile.addEventListener('click', () => this.placeRouletteBet(d.id));
      table.appendChild(tile);
    });

    // 4. Outside Bets (Row 5: 1-18, EVEN, RED, BLACK, ODD, 19-36)
    const outsideBets = [
      { id: 'low', label: '1 - 18', colStart: 2, colEnd: 4, cls: '' },
      { id: 'even', label: 'EVEN', colStart: 4, colEnd: 6, cls: '' },
      { id: 'red', label: 'RED', colStart: 6, colEnd: 8, cls: 'outside-red' },
      { id: 'black', label: 'BLACK', colStart: 8, colEnd: 10, cls: 'outside-black' },
      { id: 'odd', label: 'ODD', colStart: 10, colEnd: 12, cls: '' },
      { id: 'high', label: '19 - 36', colStart: 12, colEnd: 14, cls: '' }
    ];

    outsideBets.forEach(ob => {
      const tile = document.createElement('div');
      tile.className = `r-tile outside-bet ${ob.cls}`;
      tile.style.gridRow = '5 / 6';
      tile.style.gridColumn = `${ob.colStart} / ${ob.colEnd}`;
      tile.textContent = ob.label;
      tile.setAttribute('data-bet', ob.id);
      tile.addEventListener('click', () => this.placeRouletteBet(ob.id));
      table.appendChild(tile);
    });
  }

  placeRouletteBet(betId) {
    if (this.isSpinningRoulette) return;

    // Enforce 12-number max on straight-up bets (anti-points farming / wash betting protection)
    if (betId.startsWith('num_')) {
      const activeNums = Object.keys(this.rouletteBets).filter(k => k.startsWith('num_'));
      if (activeNums.length >= 12 && !this.rouletteBets[betId]) {
        this.showToast('⚠️ Límite de ruleta: Máximo 12 plenos para proteger la economía del stream.', 'loss');
        if (window.soundEngine && typeof window.soundEngine.playBust === 'function') {
          try { window.soundEngine.playBust(); } catch (_) {}
        }
        return;
      }
    }

    const addAmt = this.rouletteChip;
    this.rouletteBets[betId] = (this.rouletteBets[betId] || 0) + addAmt;
    if (window.soundEngine) window.soundEngine.playChip();
    this.updateRouletteBetDisplay();
  }

  clearRoulette() {
    if (this.isSpinningRoulette) return;
    this.rouletteBets = {};
    if (window.soundEngine) window.soundEngine.playChip();
    this.updateRouletteBetDisplay();
  }

  updateRouletteBetDisplay() {
    let total = 0;
    let betCount = 0;

    // Update table tiles
    document.querySelectorAll('#roulette-betting-table .r-tile').forEach(tile => {
      const betId = tile.getAttribute('data-bet');
      const amt = this.rouletteBets[betId];

      // Remove existing badge
      const existingBadge = tile.querySelector('.r-chip-badge');
      if (existingBadge) existingBadge.remove();

      if (amt && amt > 0) {
        tile.classList.add('active');
        const badge = document.createElement('span');
        badge.className = 'r-chip-badge';
        badge.textContent = amt >= 1000 ? `${(amt / 1000).toFixed(1)}k` : amt;
        tile.appendChild(badge);
        total += amt;
        betCount += 1;
      } else {
        tile.classList.remove('active');
      }
    });

    const display = document.getElementById('roulette-total-bets-display');
    if (display) {
      display.textContent = `${total.toLocaleString()} $DIG (${betCount} bets)`;
    }
  }

  startRouletteAmbientLoop() {
    if (this.rouletteAnimFrame) return;

    const loop = () => {
      // Exit loop immediately if tab is switched away from roulette
      if (this.activeTab !== 'roulette') {
        this.rouletteAnimFrame = null;
        return;
      }
      if (!this.isSpinningRoulette) {
        if (!this.rouletteRestingAfterWin) {
          this.rouletteWheelRotation = (this.rouletteWheelRotation + 0.18) % 360;
        }

        // If ball is resting in winning pocket, lock its coordinate solidary to the rotating pocket
        if (this.rouletteBall && this.rouletteBall.active && this.rouletteWinningIdx !== null) {
          const wheelRad = (this.rouletteWheelRotation * Math.PI) / 180;
          const pocketOffset = (this.rouletteWinningIdx + 0.5) * (Math.PI * 2 / 37);
          this.rouletteBall.angle = wheelRad + pocketOffset;
          this.rouletteBall.radius = 150;
        }

        this.drawRouletteWheel(this.rouletteWheelRotation, this.rouletteBall, this.rouletteWinningIdx);
      }
      this.rouletteAnimFrame = requestAnimationFrame(loop);
    };

    this.rouletteAnimFrame = requestAnimationFrame(loop);
  }

  async spinRoulette() {
    if (this.isSpinningRoulette) return;

    const betKeys = Object.keys(this.rouletteBets);
    if (betKeys.length === 0) {
      this.showToast('Please place at least one bet on the roulette board.', 'info');
      return;
    }

    let totalCost = 0;
    betKeys.forEach(k => { totalCost += this.rouletteBets[k]; });

    if (!this.checkAndDeductBet(totalCost)) return;
    this.isSpinningRoulette = true;
    this.rouletteRestingAfterWin = false;

    const spinBtn = document.getElementById('roulette-btn-spin');
    const clearBtn = document.getElementById('roulette-btn-clear');
    if (spinBtn) spinBtn.disabled = true;
    if (clearBtn) clearBtn.disabled = true;

    if (window.soundEngine) window.soundEngine.playChip();

    // Start physical ball rolling friction audio track
    if (window.soundEngine && typeof window.soundEngine.playRouletteTrack === 'function') {
      window.soundEngine.playRouletteTrack(3.6);
    }

    const banner = document.getElementById('roulette-result-banner');
    if (banner) { banner.textContent = ''; banner.className = 'hg-result-banner'; }

    // Provably fair winning pocket
    let hash = 'roulette_' + Date.now();
    let winningPocket = 0;
    if (window.pfEngine && typeof window.pfEngine.generateRoundHash === 'function') {
      hash = await window.pfEngine.generateRoundHash();
      winningPocket = window.pfEngine.getRouletteOutcome(hash);
      window.pfEngine.nextNonce();
    } else {
      winningPocket = Math.floor(Math.random() * 37);
    }

    const isRed = this.redNumbers.includes(winningPocket);
    const isEven = winningPocket !== 0 && winningPocket % 2 === 0;

    // Exact needle alignment on European Wheel:
    // Pockets are 37. Top needle is at 12 o'clock (-90° / 270°).
    const pockets = 37;
    const arcDeg = 360 / pockets;
    const winIdx = this.euroWheelPockets.indexOf(winningPocket);
    this.rouletteWinningPocket = winningPocket;
    this.rouletteWinningIdx = winIdx;

    // Wheel target angle: align winning pocket under top needle at spin end
    const desiredFinalAngle = 270 - (winIdx + 0.5) * arcDeg;
    const fullSpins = 360 * 5; // 5 full revolutions
    const currentAngleMod = this.rouletteWheelRotation % 360;
    const targetWheelAngle = this.rouletteWheelRotation + (fullSpins + (desiredFinalAngle - currentAngleMod + 360) % 360);

    const startWheelAngle = this.rouletteWheelRotation;
    const duration = 3600; // 3.6s fluid physical spin
    const startTime = performance.now();

    // Ivory ball animation state (scaled to 380px canvas)
    // Ball starts on outer rim (168px), counter-rotates and spirals into pocket (150px)
    const startBallRadius = 168;
    const endBallRadius = 150;
    let ballAngle = Math.random() * Math.PI * 2;
    let lastTickTime = 0;

    const animateSpin = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Quintic ease out for authentic physical friction
      const ease = 1 - Math.pow(1 - progress, 4.5);
      const wheelAngle = startWheelAngle + (targetWheelAngle - startWheelAngle) * ease;
      this.rouletteWheelRotation = wheelAngle;

      // Ball counter-rotation and inward spiral
      const ballSpeed = (1 - ease) * 0.35 + 0.035;
      ballAngle -= ballSpeed;
      const ballRadius = startBallRadius - (startBallRadius - endBallRadius) * ease;

      // Audio ticks when ball jumps over frets (decelerates with physical cadence)
      if (progress < 0.88 && (now - lastTickTime) > (65 + progress * 160)) {
        if (window.soundEngine && typeof window.soundEngine.playRouletteFret === 'function') {
          window.soundEngine.playRouletteFret();
        } else if (window.soundEngine && typeof window.soundEngine.playTick === 'function') {
          window.soundEngine.playTick();
        }
        lastTickTime = now;
      }

      this.rouletteBall = {
        active: true,
        angle: progress >= 1 ? (270 * Math.PI / 180) : ballAngle,
        radius: ballRadius
      };

      this.drawRouletteWheel(wheelAngle, this.rouletteBall, progress >= 1 ? winIdx : null);

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        // === BALL LANDED IN WINNING POCKET ===
        // 1. Play authentic procedural wooden pocket impact clack immediately
        if (window.soundEngine && typeof window.soundEngine.playRouletteDrop === 'function') {
          window.soundEngine.playRouletteDrop();
        }

        // Lock wheel and ball strictly to winning position under needle
        this.rouletteWheelRotation = targetWheelAngle;
        this.rouletteBall = {
          active: true,
          angle: (270 * Math.PI / 180),
          radius: endBallRadius
        };

        // Resolve Payouts
        let totalWinnings = 0;

        betKeys.forEach(pick => {
          const betAmt = this.rouletteBets[pick];
          if (!betAmt) return;

          // Single Number (pays 35:1 => 36x)
          if (pick === `num_${winningPocket}`) {
            totalWinnings += betAmt * 36;
          }
          // Red / Black (pays 1:1 => 2x)
          else if (pick === 'red' && isRed) {
            totalWinnings += betAmt * 2;
          } else if (pick === 'black' && !isRed && winningPocket !== 0) {
            totalWinnings += betAmt * 2;
          }
          // Even / Odd (pays 1:1 => 2x)
          else if (pick === 'even' && isEven) {
            totalWinnings += betAmt * 2;
          } else if (pick === 'odd' && !isEven && winningPocket !== 0) {
            totalWinnings += betAmt * 2;
          }
          // Low (1-18) / High (19-36) (pays 1:1 => 2x)
          else if (pick === 'low' && winningPocket >= 1 && winningPocket <= 18) {
            totalWinnings += betAmt * 2;
          } else if (pick === 'high' && winningPocket >= 19 && winningPocket <= 36) {
            totalWinnings += betAmt * 2;
          }
          // Dozens (pays 2:1 => 3x)
          else if (pick === 'doz_1' && winningPocket >= 1 && winningPocket <= 12) {
            totalWinnings += betAmt * 3;
          } else if (pick === 'doz_2' && winningPocket >= 13 && winningPocket <= 24) {
            totalWinnings += betAmt * 3;
          } else if (pick === 'doz_3' && winningPocket >= 25 && winningPocket <= 36) {
            totalWinnings += betAmt * 3;
          }
          // Columns (pays 2:1 => 3x)
          else if (pick === 'col_1' && winningPocket > 0 && winningPocket % 3 === 1) {
            totalWinnings += betAmt * 3;
          } else if (pick === 'col_2' && winningPocket > 0 && winningPocket % 3 === 2) {
            totalWinnings += betAmt * 3;
          } else if (pick === 'col_3' && winningPocket > 0 && winningPocket % 3 === 0) {
            totalWinnings += betAmt * 3;
          }
        });

        if (totalWinnings > 0) {
          totalWinnings = this.capGrossPayout(totalCost, totalWinnings);
          this.adjustBalance(totalWinnings);
          setTimeout(() => {
            if (window.soundEngine) window.soundEngine.playWin();
          }, 150);
        } else {
          setTimeout(() => {
            if (window.soundEngine) window.soundEngine.playBust();
          }, 150);
        }

        const colorName = winningPocket === 0 ? 'Green' : (isRed ? 'Red' : 'Black');
        if (banner) {
          banner.textContent = `Wheel stopped on: #${winningPocket} (${colorName}) · ${totalWinnings > 0 ? `Won +${totalWinnings.toLocaleString()} $DIG!` : 'No hits this spin.'}`;
          banner.className = `hg-result-banner active ${totalWinnings > 0 ? 'win' : 'loss'}`;
        }

        // ========================================================
        // MANDATORY REQUIREMENT: BALL REMAINS IN POCKET >= 1.5 SECONDS
        // Wheel remains completely stationary (0 deg/sec) so player visually verifies the winning number
        // ========================================================
        const lockDuration = 2000; // Stay completely stationary for 2.0s (>= 1.5s visual verification)
        // const lockDuration = 1500; // 1.5 seconds linger
        const lockStart = performance.now();

        const animateLinger = (lingerNow) => {
          const lingerElapsed = lingerNow - lockStart;

          // Stay 100% stationary so the player can view the result with zero motion blur
          this.rouletteWheelRotation = targetWheelAngle;
          this.rouletteBall = {
            active: true,
            angle: (270 * Math.PI / 180),
            radius: endBallRadius
          };

          this.drawRouletteWheel(this.rouletteWheelRotation, this.rouletteBall, winIdx);

          if (lingerElapsed < lockDuration) {
            requestAnimationFrame(animateLinger);
          } else {
            // Linger complete: unlock controls and keep wheel resting on the winning number
            this.isSpinningRoulette = false;
            this.rouletteRestingAfterWin = true;
            if (spinBtn) spinBtn.disabled = false;
            if (clearBtn) clearBtn.disabled = false;
          }
        };

        requestAnimationFrame(animateLinger);
      }
    };

    requestAnimationFrame(animateSpin);
  }

  drawRouletteWheel(deg = 0, ball = null, highlightIdx = null) {
    const canvas = document.getElementById('roulette-wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 14;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((deg * Math.PI) / 180);

    const pockets = 37;
    const arc = (Math.PI * 2) / pockets;

    // Outer Mahogany Wood Rim
    ctx.beginPath();
    ctx.arc(0, 0, r + 9, 0, Math.PI * 2);
    ctx.fillStyle = '#0b0f19';
    ctx.fill();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw Wheel Pockets in Authentic European Order
    for (let i = 0; i < pockets; i++) {
      const num = this.euroWheelPockets[i];
      const isRed = this.redNumbers.includes(num);
      const isWinner = highlightIdx !== null && highlightIdx === i;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, i * arc, (i + 1) * arc);
      
      if (isWinner) {
        ctx.fillStyle = '#ffd700'; // Gold flash for winning pocket
      } else {
        ctx.fillStyle = num === 0 ? '#00e701' : (isRed ? '#ff2a5f' : '#1a2c38');
      }
      ctx.fill();
      ctx.strokeStyle = isWinner ? '#ffffff' : '#0f212e';
      ctx.lineWidth = isWinner ? 2.5 : 1;
      ctx.stroke();

      // Number Label (Oriented uniformly toward cylinder center: angle + Math.PI / 2)
      const pocketAngle = (i + 0.5) * arc;
      const textRadius = r - 15;
      const tx = Math.cos(pocketAngle) * textRadius;
      const ty = Math.sin(pocketAngle) * textRadius;

      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(pocketAngle + Math.PI / 2);
      ctx.fillStyle = isWinner ? '#0b0f19' : '#ffffff';
      ctx.font = isWinner ? 'bold 13px "Chakra Petch", sans-serif' : 'bold 11px "Chakra Petch", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(num.toString(), 0, 0);
      ctx.restore();
    }

    ctx.restore();

    // Center Gold Spindle & Result Callout
    const spindleRadius = 36;
    ctx.beginPath();
    ctx.arc(cx, cy, spindleRadius, 0, Math.PI * 2);
    const winNum = this.rouletteWinningPocket;
    const isWinRed = winNum !== null && winNum !== undefined && this.redNumbers.includes(winNum);
    
    if (highlightIdx !== null && winNum !== null && winNum !== undefined) {
      ctx.fillStyle = winNum === 0 ? '#00e701' : (isWinRed ? '#ff2a5f' : '#14202b');
    } else {
      ctx.fillStyle = '#0f212e';
    }
    ctx.fill();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    if (highlightIdx !== null && winNum !== null && winNum !== undefined) {
      // Prominent center callout so player instantly sees the winning number
      ctx.fillStyle = winNum === 0 ? '#011401' : '#ffffff';
      ctx.font = 'bold 20px "Chakra Petch", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(winNum.toString(), cx, cy - 5);

      ctx.font = 'bold 8.5px "Chakra Petch", sans-serif';
      ctx.fillStyle = winNum === 0 ? '#011401' : 'rgba(255, 255, 255, 0.9)';
      const winLabel = winNum === 0 ? 'ZERO' : (isWinRed ? 'RED' : 'BLACK');
      ctx.fillText(winLabel, cx, cy + 12);
    }

    // Dynamic Ivory Ball Drop
    if (ball && ball.active) {
      const bx = cx + Math.cos(ball.angle) * ball.radius;
      const by = cy + Math.sin(ball.angle) * ball.radius;

      // Ball shadow
      ctx.beginPath();
      ctx.arc(bx + 2.5, by + 2.5, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.fill();

      // Glossy Ivory Sphere
      const grad = ctx.createRadialGradient(bx - 2, by - 2, 1, bx, by, 6.5);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.65, '#e2e8f0');
      grad.addColorStop(1, '#94a3b8');

      ctx.beginPath();
      ctx.arc(bx, by, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Top Pointer Marker (12 o'clock needle)
    ctx.beginPath();
    ctx.moveTo(cx, 4);
    ctx.lineTo(cx - 10, 20);
    ctx.lineTo(cx + 10, 20);
    ctx.closePath();
    ctx.fillStyle = '#ffd700';
    ctx.shadowColor = 'rgba(255, 215, 0, 0.9)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // ==========================================
  // 6. STAKE ORIGINAL: LIMBO (1.00% HOUSE EDGE)
  // ==========================================
  initLimbo() {
    const playBtn = document.getElementById('limbo-btn-play');
    const betInput = document.getElementById('limbo-bet-input');
    const targetInput = document.getElementById('limbo-target-mult-input');
    const chanceInput = document.getElementById('limbo-win-chance-input');

    if (playBtn) playBtn.addEventListener('click', () => this.rollLimbo());

    if (betInput) {
      betInput.addEventListener('change', () => {
        this.limboBet = Math.max(1, parseInt(betInput.value, 10) || 10);
      });
    }

    if (targetInput) {
      targetInput.addEventListener('input', () => this.updateLimboFromTarget());
    }

    if (chanceInput) {
      chanceInput.addEventListener('input', () => this.updateLimboFromChance());
    }

    this.renderLimboHistory();
  }

  updateLimboFromTarget() {
    const targetInput = document.getElementById('limbo-target-mult-input');
    const chanceInput = document.getElementById('limbo-win-chance-input');
    const badge = document.getElementById('limbo-target-badge');
    if (!targetInput || !chanceInput) return;

    let target = parseFloat(targetInput.value) || 2.00;
    target = Math.max(1.01, Math.min(1000000.00, target));
    this.limboTarget = target;
    if (badge) badge.textContent = `${target.toFixed(2)}x`;

    // 5% house edge (95.00% RTP): winChance = 95 / target
    const chance = Math.max(0.0001, Math.min(94.00, 95.00 / target));
    this.limboWinChance = chance;
    chanceInput.value = chance >= 1 ? chance.toFixed(2) : chance.toFixed(4);
  }

  updateLimboFromChance() {
    const targetInput = document.getElementById('limbo-target-mult-input');
    const chanceInput = document.getElementById('limbo-win-chance-input');
    const badge = document.getElementById('limbo-target-badge');
    if (!targetInput || !chanceInput) return;

    let chance = parseFloat(chanceInput.value) || 47.50;
    chance = Math.max(0.0001, Math.min(94.00, chance));
    this.limboWinChance = chance;

    // target = 95 / winChance
    const target = Math.max(1.01, Math.min(1000000.00, 95.00 / chance));
    this.limboTarget = target;
    targetInput.value = target.toFixed(2);
    if (badge) badge.textContent = `${target.toFixed(2)}x`;
  }

  renderLimboHistory() {
    const bar = document.getElementById('limbo-history-bar');
    if (!bar) return;
    bar.innerHTML = '';
    this.limboHistory.slice(-8).forEach(mult => {
      const pill = document.createElement('span');
      pill.className = `plinko-history-pill ${mult >= 10 ? 'high' : (mult >= 2 ? 'win' : 'loss')}`;
      pill.textContent = `${mult.toFixed(2)}x`;
      bar.appendChild(pill);
    });
  }

  async rollLimbo() {
    if (this.isRollingLimbo) return;
    const betInput = document.getElementById('limbo-bet-input');
    const bet = betInput ? (parseInt(betInput.value, 10) || 10) : 10;

    if (!this.checkAndDeductBet(bet)) return;
    this.limboBet = bet;
    this.isRollingLimbo = true;

    const playBtn = document.getElementById('limbo-btn-play');
    if (playBtn) playBtn.disabled = true;

    const multDisplay = document.getElementById('limbo-multiplier-display');
    const caption = document.getElementById('limbo-status-caption');
    const banner = document.getElementById('limbo-result-banner');

    if (banner) { banner.textContent = ''; banner.className = 'hg-result-banner'; }
    if (caption) caption.textContent = ''; // Stake Original Limbo: zero subtitle captions

    // Cryptographic Outcome via Provably Fair HMAC-SHA256 (95.00% RTP / 5% house edge)
    let hash = 'limbo_' + Date.now();
    let outcomeMultiplier = 1.00;
    if (window.pfEngine && typeof window.pfEngine.generateRoundHash === 'function') {
      hash = await window.pfEngine.generateRoundHash();
      outcomeMultiplier = window.pfEngine.getLimboMultiplier(hash);
      window.pfEngine.nextNonce();
    } else {
      const rand = Math.random();
      outcomeMultiplier = rand < 0.05 ? 1.00 : parseFloat(Math.max(1.00, (0.95 / (1.0 - rand))).toFixed(2));
    }

    const isWin = outcomeMultiplier >= this.limboTarget;

    // ========================================================
    // IMMEDIATE IMPACT: Stake Original Limbo UX (Zero wait time)
    // ========================================================
    if (multDisplay) {
      multDisplay.textContent = `${outcomeMultiplier.toFixed(2)}x`;
      multDisplay.className = `limbo-multiplier-number ${isWin ? 'win' : 'loss'} slam`;
      setTimeout(() => {
        if (multDisplay) multDisplay.classList.remove('slam');
      }, 140);
    }

    // Immediate sound feedback
    if (window.soundEngine && typeof window.soundEngine.playLimboSlam === 'function') {
      window.soundEngine.playLimboSlam(isWin);
    } else if (window.soundEngine) {
      if (isWin) window.soundEngine.playWin();
      else window.soundEngine.playBust();
    }

    this.limboHistory.push(outcomeMultiplier);
    if (this.limboHistory.length > 12) this.limboHistory.shift();
    this.renderLimboHistory();

    if (isWin) {
      const payout = this.capGrossPayout(this.limboBet, this.limboBet * this.limboTarget);
      this.adjustBalance(payout);
      if (window.soundEngine && outcomeMultiplier >= 10.0 && typeof window.soundEngine.playCoins === 'function') {
        window.soundEngine.playCoins();
      }
      if (banner) {
        banner.textContent = `Won +${payout.toLocaleString()} $DIG! (${this.limboTarget.toFixed(2)}x)`;
        banner.className = 'hg-result-banner active win';
      }
    } else {
      // Loss: cleanly show result without distracting 'dropped at' captions
      if (banner) {
        banner.textContent = '';
        banner.className = 'hg-result-banner';
      }
    }

    // Immediate unlock to enable rapid betting (100ms)
    setTimeout(() => {
      this.isRollingLimbo = false;
      if (playBtn) playBtn.disabled = false;
    }, 100);
  }

  // ==========================================
  // 9. HI-LO CONTROLLER (STAKE ORIGINAL PROVABLY FAIR)
  // ==========================================
  getHiloOdds(currentRank) {
    const rank = Math.max(2, Math.min(14, Math.floor(currentRank)));
    const totalCards = 52;
    let higherCount = (14 - rank) * 4;
    let lowerCount = (rank - 2) * 4;

    // Edge cases for Stake mechanics:
    // If rank is 14 (Ace), Higher is a valid bet winning on another Ace (4 cards)
    // If rank is 2 (Two), Lower is a valid bet winning on another Two (4 cards)
    if (rank === 14) higherCount = 4;
    if (rank === 2) lowerCount = 4;

    const calcMult = (cnt) => cnt > 0 ? Number((0.95 / (cnt / totalCards)).toFixed(4)) : 0;

    return {
      higher: {
        count: higherCount,
        multiplier: calcMult(higherCount),
        pct: ((higherCount / totalCards) * 100).toFixed(1)
      },
      lower: {
        count: lowerCount,
        multiplier: calcMult(lowerCount),
        pct: ((lowerCount / totalCards) * 100).toFixed(1)
      },
      same: {
        count: 4,
        multiplier: calcMult(4)
      }
    };
  }

  async drawHiloCard(step) {
    const serverSeed = (window.provablyFair && window.provablyFair.serverSeed) || 'hunthub_server_seed_diggitybets';
    const clientSeed = (window.provablyFair && window.provablyFair.clientSeed) || 'kick_session';
    const roundNonce = (window.provablyFair && window.provablyFair.nonce) || 1;

    let cardIndex = Math.floor(Math.random() * 52);
    if (window.provablyFair && typeof window.provablyFair.generateRoundHash === 'function') {
      try {
        const hash = await window.provablyFair.generateRoundHash(serverSeed, clientSeed, `${roundNonce}:${step}`);
        const intVal = parseInt(hash.substring(0, 8), 16);
        cardIndex = intVal % 52;
      } catch (_) {}
    }

    const rankIdx = cardIndex % 13; // 0..12 -> ranks 2..14
    const suitIdx = Math.floor(cardIndex / 13); // 0..3
    const rank = rankIdx + 2;
    const rankLabels = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const rankLabel = rankLabels[rankIdx];
    const suits = [
      { id: 0, sym: '♠', name: 'spades', isRed: false },
      { id: 1, sym: '♥', name: 'hearts', isRed: true },
      { id: 2, sym: '♦', name: 'diamonds', isRed: true },
      { id: 3, sym: '♣', name: 'clubs', isRed: false }
    ];
    const suit = suits[suitIdx];

    return {
      index: cardIndex,
      rank: rank,
      rankLabel: rankLabel,
      suit: suit.id,
      suitSym: suit.sym,
      suitName: suit.name,
      isRed: suit.isRed,
      name: `${rankLabel}${suit.sym}`
    };
  }

  initHilo() {
    const betInput = document.getElementById('hilo-bet-input');
    const higherBtn = document.getElementById('hilo-btn-higher');
    const lowerBtn = document.getElementById('hilo-btn-lower');
    const skipBtn = document.getElementById('hilo-btn-skip');
    const startBtn = document.getElementById('hilo-btn-start');
    const cashoutBtn = document.getElementById('hilo-btn-cashout');

    if (betInput) {
      betInput.addEventListener('change', () => {
        let val = parseInt(betInput.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        this.hiloBet = val;
        betInput.value = val;
      });
    }

    if (startBtn) {
      startBtn.addEventListener('click', () => this.startHiloRound());
    }

    if (higherBtn) {
      higherBtn.addEventListener('click', () => this.guessHilo('higher'));
    }

    if (lowerBtn) {
      lowerBtn.addEventListener('click', () => this.guessHilo('lower'));
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', () => this.skipHilo());
    }

    if (cashoutBtn) {
      cashoutBtn.addEventListener('click', () => this.cashoutHilo());
    }

    // Default base card: King of Spades
    this.hiloCurrentCard = {
      index: 11,
      rank: 13,
      rankLabel: 'K',
      suit: 0,
      suitSym: '♠',
      suitName: 'spades',
      isRed: false,
      name: 'K♠'
    };
    this.renderHiloDisplay();
  }

  renderHiloDisplay() {
    if (!this.hiloCurrentCard) return;
    const card = this.hiloCurrentCard;

    // Corner ranks and center symbol
    const rankTL = document.getElementById('hilo-card-rank-tl');
    const rankBR = document.getElementById('hilo-card-rank-br');
    const suitTL = document.getElementById('hilo-card-suit-tl');
    const suitBR = document.getElementById('hilo-card-suit-br');
    const suitCenter = document.getElementById('hilo-card-suit-center');
    const cardEl = document.getElementById('hilo-hero-card');

    if (rankTL) rankTL.textContent = card.rankLabel;
    if (rankBR) rankBR.textContent = card.rankLabel;
    if (suitTL) suitTL.textContent = card.suitSym;
    if (suitBR) suitBR.textContent = card.suitSym;
    if (suitCenter) suitCenter.textContent = card.suitSym;

    if (cardEl) {
      cardEl.className = `hilo-playing-card suit-${card.suitName}`;
    }

    // Odds calculations
    const odds = this.getHiloOdds(card.rank);
    const higherMultEl = document.getElementById('hilo-mult-higher');
    const lowerMultEl = document.getElementById('hilo-mult-lower');
    const higherPctEl = document.getElementById('hilo-odds-higher-pct');
    const lowerPctEl = document.getElementById('hilo-odds-lower-pct');
    const sameMultEl = document.getElementById('hilo-odds-same-mult');
    const curMultEl = document.getElementById('hilo-current-mult-display');

    if (higherMultEl) higherMultEl.textContent = `${odds.higher.multiplier.toFixed(2)}x`;
    if (lowerMultEl) lowerMultEl.textContent = `${odds.lower.multiplier.toFixed(2)}x`;
    if (higherPctEl) higherPctEl.textContent = `${odds.higher.pct}%`;
    if (lowerPctEl) lowerPctEl.textContent = `${odds.lower.pct}%`;
    if (sameMultEl) sameMultEl.textContent = `${odds.same.multiplier.toFixed(2)}x`;
    if (curMultEl) curMultEl.textContent = `${this.hiloCurrentMultiplier.toFixed(2)}x`;
  }

  renderHiloHistory() {
    const bar = document.getElementById('hilo-history-bar');
    if (!bar) return;
    if (this.hiloHistory.length === 0) {
      bar.innerHTML = '<span class="hilo-history-empty-txt">Dealt cards will appear here</span>';
      return;
    }

    bar.innerHTML = '';
    this.hiloHistory.forEach(item => {
      const pill = document.createElement('div');
      pill.className = `hilo-mini-card-badge ${item.win ? 'win' : 'loss'}`;
      if (item.card.isRed) pill.style.color = '#dc2626';
      pill.textContent = item.card.name;
      bar.appendChild(pill);
    });
    bar.scrollLeft = bar.scrollWidth;
  }

  triggerHiloCardFlip() {
    const cardEl = document.getElementById('hilo-hero-card');
    if (cardEl) {
      cardEl.classList.remove('flip-anim');
      void cardEl.offsetWidth; // trigger reflow
      cardEl.classList.add('flip-anim');
    }
  }

  updateHiloControls(inGame) {
    const startBtn = document.getElementById('hilo-btn-start');
    const higherBtn = document.getElementById('hilo-btn-higher');
    const lowerBtn = document.getElementById('hilo-btn-lower');
    const skipBtn = document.getElementById('hilo-btn-skip');
    const cashoutBtn = document.getElementById('hilo-btn-cashout');
    const betInput = document.getElementById('hilo-bet-input');

    if (inGame) {
      if (startBtn) startBtn.disabled = true;
      if (betInput) betInput.disabled = true;
      if (higherBtn) higherBtn.disabled = false;
      if (lowerBtn) lowerBtn.disabled = false;
      if (skipBtn) skipBtn.disabled = false;
      if (cashoutBtn) {
        cashoutBtn.disabled = this.hiloCurrentMultiplier <= 1.0;
        const currentPayout = this.capGrossPayout(this.hiloBet, this.hiloBet * this.hiloCurrentMultiplier);
        cashoutBtn.textContent = `Cashout: ${currentPayout.toLocaleString()} $DIG`;
        if (this.hiloCurrentMultiplier > 1.0) cashoutBtn.classList.add('active');
        else cashoutBtn.classList.remove('active');
      }
    } else {
      if (startBtn) startBtn.disabled = false;
      if (betInput) betInput.disabled = false;
      if (higherBtn) higherBtn.disabled = true;
      if (lowerBtn) lowerBtn.disabled = true;
      if (skipBtn) skipBtn.disabled = true;
      if (cashoutBtn) {
        cashoutBtn.disabled = true;
        cashoutBtn.textContent = 'Cashout: 0 $DIG';
        cashoutBtn.classList.remove('active');
      }
    }
  }

  async startHiloRound() {
    if (this.hiloState === 'in_game') return;
    const betInput = document.getElementById('hilo-bet-input');
    if (betInput) this.hiloBet = Math.max(1, parseInt(betInput.value, 10) || 10);

    if (!this.checkAndDeductBet(this.hiloBet)) return;

    this.hiloState = 'in_game';
    this.hiloStep = 0;
    this.hiloCurrentMultiplier = 1.0000;
    this.hiloHistory = [];

    const banner = document.getElementById('hilo-result-banner');
    if (banner) {
      banner.textContent = '';
      banner.className = 'hg-result-banner';
    }

    const firstCard = await this.drawHiloCard(this.hiloStep);
    this.hiloCurrentCard = firstCard;
    this.hiloHistory.push({ card: firstCard, win: true, guess: 'base' });

    if (window.soundEngine && typeof window.soundEngine.playCard === 'function') {
      window.soundEngine.playCard();
    }

    this.triggerHiloCardFlip();
    this.renderHiloDisplay();
    this.renderHiloHistory();
    this.updateHiloControls(true);
  }

  async guessHilo(direction) {
    if (this.hiloState !== 'in_game' || !this.hiloCurrentCard) return;

    const prevCard = this.hiloCurrentCard;
    const odds = this.getHiloOdds(prevCard.rank);
    let stepMult = 1.0;
    if (direction === 'higher') {
      stepMult = odds.higher.multiplier;
    } else if (direction === 'lower') {
      stepMult = odds.lower.multiplier;
    }

    this.hiloStep += 1;
    const nextCard = await this.drawHiloCard(this.hiloStep);

    let isWin = false;
    if (direction === 'higher') {
      isWin = prevCard.rank === 14 ? (nextCard.rank >= prevCard.rank) : (nextCard.rank > prevCard.rank);
    } else if (direction === 'lower') {
      isWin = prevCard.rank === 2 ? (nextCard.rank <= prevCard.rank) : (nextCard.rank < prevCard.rank);
    }

    this.hiloCurrentCard = nextCard;
    this.triggerHiloCardFlip();

    if (isWin) {
      this.hiloCurrentMultiplier = Number((this.hiloCurrentMultiplier * stepMult).toFixed(4));
      this.hiloHistory.push({ card: nextCard, win: true, guess: direction });

      if (window.soundEngine) {
        if (typeof window.soundEngine.playCard === 'function') window.soundEngine.playCard();
        if (typeof window.soundEngine.playDiamond === 'function') window.soundEngine.playDiamond();
      }

      this.renderHiloDisplay();
      this.renderHiloHistory();
      this.updateHiloControls(true);
    } else {
      // Bust / Loss
      this.hiloState = 'lost';
      this.hiloHistory.push({ card: nextCard, win: false, guess: direction });

      if (window.soundEngine && typeof window.soundEngine.playBust === 'function') {
        window.soundEngine.playBust();
      }

      const banner = document.getElementById('hilo-result-banner');
      if (banner) {
        banner.textContent = `Busted on ${nextCard.name}! Lost -${this.hiloBet} $DIG`;
        banner.className = 'hg-result-banner active loss';
      }

      this.renderHiloDisplay();
      this.renderHiloHistory();
      this.updateHiloControls(false);

      if (window.provablyFair) window.provablyFair.nextNonce();
    }
  }

  async skipHilo() {
    if (this.hiloState !== 'in_game' || !this.hiloCurrentCard) return;

    this.hiloStep += 1;
    const nextCard = await this.drawHiloCard(this.hiloStep);
    this.hiloCurrentCard = nextCard;
    this.hiloHistory.push({ card: nextCard, win: true, guess: 'skip' });

    if (window.soundEngine && typeof window.soundEngine.playCard === 'function') {
      window.soundEngine.playCard();
    }

    this.triggerHiloCardFlip();
    this.renderHiloDisplay();
    this.renderHiloHistory();
  }

  cashoutHilo() {
    if (this.hiloState !== 'in_game' || this.hiloCurrentMultiplier <= 1.0) return;

    const payout = this.capGrossPayout(this.hiloBet, this.hiloBet * this.hiloCurrentMultiplier);
    this.adjustBalance(payout);
    this.hiloState = 'cashed';

    if (window.soundEngine) {
      if (typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
      if (typeof window.soundEngine.playCoins === 'function') window.soundEngine.playCoins();
    }

    const banner = document.getElementById('hilo-result-banner');
    if (banner) {
      banner.textContent = `Cashed out +${payout.toLocaleString()} $DIG! (${this.hiloCurrentMultiplier.toFixed(2)}x)`;
      banner.className = 'hg-result-banner active win';
    }

    this.updateHiloControls(false);
    if (window.provablyFair) window.provablyFair.nextNonce();
  }

  // ==========================================
  // 10. KENO CONTROLLER (STAKE ORIGINAL PROVABLY FAIR)
  // ==========================================
  initKeno() {
    this.kenoPaytables = {
      1: {
        classic: [0, 3.96],
        low: [0.7, 1.85],
        medium: [0.4, 2.75],
        high: [0, 3.96]
      },
      2: {
        classic: [0, 1.9, 4.5],
        low: [0, 2, 3.8],
        medium: [0, 1.8, 5.1],
        high: [0, 0, 17.1]
      },
      3: {
        classic: [0, 1, 3.1, 10.4],
        low: [0, 1.1, 1.38, 26],
        medium: [0, 0, 2.8, 50],
        high: [0, 0, 0, 81.5]
      },
      4: {
        classic: [0, 0.8, 1.8, 5, 22.5],
        low: [0, 0, 2.2, 7.9, 90],
        medium: [0, 0, 1.7, 10, 100],
        high: [0, 0, 0, 10, 259]
      },
      5: {
        classic: [0, 0.25, 1.4, 4.1, 16.5, 36],
        low: [0, 0, 1.5, 4.2, 13, 300],
        medium: [0, 0, 1.4, 4, 14, 390],
        high: [0, 0, 0, 4.5, 48, 450]
      },
      6: {
        classic: [0, 0, 1, 3.68, 7, 16.5, 40],
        low: [0, 0, 1.1, 2, 6.2, 100, 700],
        medium: [0, 0, 0, 3, 9, 180, 710],
        high: [0, 0, 0, 0, 11, 350, 710]
      },
      7: {
        classic: [0, 0, 0.47, 3, 4.5, 14, 31, 60],
        low: [0, 0, 1.1, 1.6, 3.5, 15, 225, 700],
        medium: [0, 0, 0, 2, 7, 30, 400, 800],
        high: [0, 0, 0, 0, 7, 90, 400, 800]
      },
      8: {
        classic: [0, 0, 0, 2.2, 4, 13, 22, 55, 70],
        low: [0, 0, 1.1, 1.5, 2, 5.5, 39, 100, 800],
        medium: [0, 0, 0, 2, 4, 11, 67, 400, 900],
        high: [0, 0, 0, 0, 5, 20, 270, 600, 900]
      },
      9: {
        classic: [0, 0, 0, 1.55, 3, 8, 15, 44, 60, 85],
        low: [0, 0, 1.1, 1.3, 1.7, 2.5, 7.5, 50, 250, 1000],
        medium: [0, 0, 0, 2, 2.5, 5, 15, 100, 500, 1000],
        high: [0, 0, 0, 0, 4, 11, 56, 500, 800, 1000]
      },
      10: {
        classic: [0, 0, 0, 1.4, 2.25, 4.5, 8, 17, 50, 80, 100],
        low: [0, 0, 1.1, 1.2, 1.3, 1.8, 3.5, 13, 50, 250, 1000],
        medium: [0, 0, 0, 1.6, 2, 4, 7, 26, 100, 500, 1000],
        high: [0, 0, 0, 0, 3.5, 8, 13, 63, 500, 800, 1000]
      }
    };

    const gridEl = document.getElementById('keno-grid');
    if (gridEl) {
      gridEl.innerHTML = '';
      for (let i = 1; i <= 40; i++) {
        const tile = document.createElement('button');
        tile.type = 'button';
        tile.className = 'keno-tile';
        tile.setAttribute('data-num', i.toString());
        tile.textContent = i.toString();
        tile.addEventListener('click', () => this.toggleKenoTile(i));
        gridEl.appendChild(tile);
      }
    }

    document.querySelectorAll('.keno-risk-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.kenoIsDrawing) return;
        document.querySelectorAll('.keno-risk-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.kenoRisk = btn.getAttribute('data-risk') || 'classic';
        if (window.soundEngine) window.soundEngine.playChip();
        this.renderKenoPaytable();
      });
    });

    const autoPickBtn = document.getElementById('keno-btn-auto-pick');
    if (autoPickBtn) {
      autoPickBtn.addEventListener('click', () => this.autoPickKeno());
    }

    const clearBtn = document.getElementById('keno-btn-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearKeno());
    }

    const betInput = document.getElementById('keno-bet-input');
    if (betInput) {
      betInput.addEventListener('change', () => {
        let val = parseInt(betInput.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        this.kenoBet = val;
        betInput.value = val;
      });
    }

    const playBtn = document.getElementById('keno-btn-play');
    if (playBtn) {
      playBtn.addEventListener('click', () => this.playKeno());
    }

    this.renderKenoPaytable();
    this.updateKenoSelectionBadge();
  }

  toggleKenoTile(num) {
    if (this.kenoIsDrawing) return;
    if (this.kenoSelected.has(num)) {
      this.kenoSelected.delete(num);
    } else {
      if (this.kenoSelected.size >= 10) {
        this.showToast('Máximo 10 números permitidos en Keno.', 'loss');
        return;
      }
      this.kenoSelected.add(num);
    }

    if (window.soundEngine) window.soundEngine.playTick();
    this.refreshKenoTiles();
    this.renderKenoPaytable();
    this.updateKenoSelectionBadge();
  }

  autoPickKeno() {
    if (this.kenoIsDrawing) return;
    this.kenoSelected.clear();
    const pool = Array.from({ length: 40 }, (_, i) => i + 1);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    pool.slice(0, 10).forEach(n => this.kenoSelected.add(n));

    if (window.soundEngine) window.soundEngine.playChip();
    this.refreshKenoTiles();
    this.renderKenoPaytable();
    this.updateKenoSelectionBadge();
  }

  clearKeno() {
    if (this.kenoIsDrawing) return;
    this.kenoSelected.clear();
    if (window.soundEngine) window.soundEngine.playChip();
    this.refreshKenoTiles();
    this.renderKenoPaytable();
    this.updateKenoSelectionBadge();
  }

  refreshKenoTiles() {
    document.querySelectorAll('.keno-tile').forEach(tile => {
      const num = parseInt(tile.getAttribute('data-num'), 10);
      if (this.kenoSelected.has(num)) {
        tile.classList.add('selected');
      } else {
        tile.classList.remove('selected');
      }
      tile.classList.remove('drawn', 'hit');
    });
  }

  updateKenoSelectionBadge() {
    const badge = document.getElementById('keno-picks-count-badge');
    if (badge) {
      badge.textContent = `${this.kenoSelected.size} / 10 Numbers`;
    }
  }

  renderKenoPaytable(activeHitIndex = null) {
    const container = document.getElementById('keno-paytable-strip');
    if (!container) return;

    const count = this.kenoSelected.size;
    if (count === 0) {
      container.innerHTML = '<div style="font-family: var(--font-display); font-size: 11px; color: var(--text-dim); padding: 6px; width: 100%; text-align: center;">Select 1 to 10 numbers to view multiplier table</div>';
      return;
    }

    const payRow = this.kenoPaytables[count]?.[this.kenoRisk] || [];
    container.innerHTML = '';

    payRow.forEach((mult, hits) => {
      const pill = document.createElement('div');
      pill.className = 'keno-paytable-pill';
      if (activeHitIndex !== null && hits === activeHitIndex) {
        pill.classList.add('active-hit');
      }

      pill.innerHTML = `
        <span class="keno-hits-lbl">${hits}×</span>
        <span class="keno-mult-val">${mult}×</span>
      `;
      container.appendChild(pill);
    });
  }

  async drawKenoNumbers() {
    const pool = Array.from({ length: 40 }, (_, i) => i + 1);
    const serverSeed = (window.provablyFair && window.provablyFair.serverSeed) || 'hunthub_server_seed_diggitybets';
    const clientSeed = (window.provablyFair && window.provablyFair.clientSeed) || 'kick_session';
    const roundNonce = (window.provablyFair && window.provablyFair.nonce) || 1;

    for (let cursor = 0; cursor < 39; cursor++) {
      let randFloat = Math.random();
      if (window.provablyFair && typeof window.provablyFair.generateRoundHash === 'function') {
        try {
          const hash = await window.provablyFair.generateRoundHash(serverSeed, clientSeed, `${roundNonce}:${cursor}`);
          const intVal = parseInt(hash.substring(0, 8), 16);
          randFloat = intVal / 0x100000000;
        } catch (_) {}
      }
      const remaining = 40 - cursor;
      const swapIndex = cursor + Math.floor(randFloat * remaining);
      const temp = pool[cursor];
      pool[cursor] = pool[swapIndex];
      pool[swapIndex] = temp;
    }

    return pool.slice(0, 10).sort((a, b) => a - b);
  }

  async playKeno() {
    if (this.kenoIsDrawing) return;
    if (this.kenoSelected.size === 0) {
      this.showToast('Seleccioná al menos 1 número para jugar a Keno.', 'loss');
      return;
    }

    const betInput = document.getElementById('keno-bet-input');
    if (betInput) this.kenoBet = Math.max(1, parseInt(betInput.value, 10) || 10);

    if (!this.checkAndDeductBet(this.kenoBet)) return;

    this.kenoIsDrawing = true;
    const playBtn = document.getElementById('keno-btn-play');
    if (playBtn) playBtn.disabled = true;

    const banner = document.getElementById('keno-result-banner');
    if (banner) {
      banner.textContent = '';
      banner.className = 'hg-result-banner';
    }

    // Reset drawn/hit classes
    document.querySelectorAll('.keno-tile').forEach(t => {
      t.classList.remove('drawn', 'hit');
    });

    const picks = Array.from(this.kenoSelected);
    const drawnNumbers = await this.drawKenoNumbers();

    let matchedHits = 0;
    for (let i = 0; i < drawnNumbers.length; i++) {
      const num = drawnNumbers[i];
      await new Promise(r => setTimeout(r, 90));

      const tile = document.querySelector(`.keno-tile[data-num="${num}"]`);
      if (tile) {
        if (this.kenoSelected.has(num)) {
          matchedHits++;
          tile.classList.add('hit');
          if (window.soundEngine && typeof window.soundEngine.playDiamond === 'function') {
            window.soundEngine.playDiamond();
          }
        } else {
          tile.classList.add('drawn');
          if (window.soundEngine && typeof window.soundEngine.playTick === 'function') {
            window.soundEngine.playTick();
          }
        }
      }
    }

    const pickCount = picks.length;
    const payRow = this.kenoPaytables[pickCount]?.[this.kenoRisk] || [0];
    const mult = payRow[matchedHits] || 0;
    const payout = this.capGrossPayout(this.kenoBet, this.kenoBet * mult);

    this.renderKenoPaytable(matchedHits);

    if (mult > 0 && payout > 0) {
      this.adjustBalance(payout);
      if (window.soundEngine) {
        if (typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
        if (mult >= 10 && typeof window.soundEngine.playCoins === 'function') window.soundEngine.playCoins();
      }
      if (banner) {
        banner.textContent = `Hit ${matchedHits}/${pickCount} numbers! Won +${payout.toLocaleString()} $DIG (${mult.toFixed(2)}x)`;
        banner.className = 'hg-result-banner active win';
      }
    } else {
      if (window.soundEngine && typeof window.soundEngine.playBust === 'function') {
        window.soundEngine.playBust();
      }
      if (banner) {
        banner.textContent = `Hit ${matchedHits}/${pickCount} numbers. Lost -${this.kenoBet} $DIG`;
        banner.className = 'hg-result-banner active loss';
      }
    }

    if (window.provablyFair) window.provablyFair.nextNonce();

    this.kenoIsDrawing = false;
    if (playBtn) playBtn.disabled = false;
  }
}

window.houseGames = new StakeOriginalsController();

