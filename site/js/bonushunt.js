/**
 * HuntHub & DiggityBets — Community Bonus Hunt Live Tracker & SOTA bonushunt.gg Suite
 * =============================================================================
 * SOTA 2026 Parity:
 *   1. Six Core Financial Metrics: Cost, Paid, P&L (ROI %), Opened/Remaining, Run Avg X, Req Avg X.
 *   2. Highlights Row: Best Win ($) and Lucky Win (Highest X).
 *   3. Automated Guess The Balance (GTB) Settlement: Podiums, $DIG rewards & Trumpet Fanfare.
 *   4. Community Slot Requests & Interactive Roulette Wheel.
 *   5. Stake Originals Provably Fair Verifiers (Keno 40-board & Mines 5x5 grid).
 * =============================================================================
 */

class BonusHuntController {
  constructor() {
    this.isActive = localStorage.getItem('hunthub_hunt_active') !== 'false';
    this.huntId = 'hunt_1';
    this.huntName = 'Community Bonus Hunt #12';
    this.startBalance = 1500;
    this.slots = this.isActive ? this.loadInitialHuntSlots() : [];
    this.guesses = this.isActive ? this.loadInitialGuesses() : [];
    this.slotRequests = this.loadInitialSlotRequests();

    // Wheel animation state
    this.wheelAngle = 0;
    this.isSpinning = false;
    this.wheelColors = ['#9272ff', '#00e5ff', '#ffd700', '#ff007a', '#00e676', '#ff9100', '#b388ff', '#1de9b6'];

    // Verifier state
    this.verifierMode = 'keno'; // 'keno' or 'mines'
  }

  loadInitialHuntSlots() {
    const verifiedDefaults = [
      { 
        id: 'wanted-dead-or-a-wild', 
        name: 'Wanted Dead or a Wild', 
        provider: 'Hacksaw Gaming', 
        bet: 2.0, 
        payout: 246.80, 
        caller: '@NachoGamer', 
        image: 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format' 
      },
      { 
        id: 'gates-of-olympus-1000', 
        name: 'Gates of Olympus 1000', 
        provider: 'Pragmatic Play', 
        bet: 2.0, 
        payout: 312.00, 
        caller: '@SlotKing21', 
        image: 'https://mediumrare.imgix.net/fdf333e96a5e21555bbb4e9e04a3ee4e1986c9cca9aa75141597041cc8334d23?w=360&auto=format' 
      },
      { 
        id: 'le-bandit', 
        name: 'Le Bandit', 
        provider: 'Hacksaw Gaming', 
        bet: 0.20, 
        payout: 71.20, 
        caller: '@DiggityFan', 
        image: 'https://mediumrare.imgix.net/8ade942d35d2cdbddf7888f303be4cf4bda8c650a112b3c53f7c6f3ccad81254?w=360&auto=format' 
      },
      { 
        id: 'san-quentin-xways', 
        name: 'San Quentin xWays', 
        provider: 'Nolimit City', 
        bet: 2.0, 
        payout: 0, 
        caller: '@AgusKick', 
        image: 'https://mediumrare.imgix.net/ca243d6c3db42259d6859b80717eb378eb64e41a9d1b1f7fdeadde68d59d9ad5?w=360&auto=format' 
      },
      { 
        id: 'sweet-bonanza-1000', 
        name: 'Sweet Bonanza 1000', 
        provider: 'Pragmatic Play', 
        bet: 2.0, 
        payout: 0, 
        caller: '@Valen99', 
        image: 'https://mediumrare.imgix.net/73754d4bf421b78fbd3895bbc7890d379797588cb699d6cbe47f3656aa93613b?w=360&auto=format' 
      },
      { 
        id: 'sugar-rush-1000', 
        name: 'Sugar Rush 1000', 
        provider: 'Pragmatic Play', 
        bet: 2.0, 
        payout: 0, 
        caller: '@StakeHunter', 
        image: 'https://mediumrare.imgix.net/742a1d7958a9ffa215e19cc72c684abe9412f71fcf426b57909b5b817f9cd9d4?w=360&auto=format' 
      }
    ];

    const purged = localStorage.getItem('hunthub_demo_users_purged') === 'true';
    const saved = localStorage.getItem('hunthub_hunt_slots');
    if (saved !== null) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          if (parsed.length === 0) return [];
          const healed = parsed.map(s => {
            if (window.SlotResolver && s && (s.name || s.slotName)) {
              const canon = window.SlotResolver.resolve(s.name || s.slotName);
              if (canon && canon.image) {
                s.image = canon.image;
                if (!s.provider || s.provider === 'Provider') s.provider = canon.provider;
              }
            }
            return s;
          });
          localStorage.setItem('hunthub_hunt_slots', JSON.stringify(healed));
          return healed;
        }
      } catch (e) {}
    }

    if (purged) return [];
    localStorage.setItem('hunthub_hunt_slots', JSON.stringify(verifiedDefaults));
    return verifiedDefaults;
  }

  loadInitialGuesses() {
    const purged = localStorage.getItem('hunthub_demo_users_purged') === 'true';
    const saved = localStorage.getItem('hunthub_hunt_guesses');
    if (saved !== null) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    if (purged) return [];

    return [
      { user: '@NachoGamer', guess: 1620, time: '14:22' },
      { user: '@SlotKing21', guess: 1840, time: '14:25' },
      { user: '@KickViewer01', guess: 1450, time: '14:27' },
      { user: '@CryptoSpin', guess: 2100, time: '14:31' }
    ];
  }

  loadInitialSlotRequests() {
    const purged = localStorage.getItem('hunthub_demo_users_purged') === 'true';
    const saved = localStorage.getItem('hunthub_slot_requests');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    if (purged) return [];
    return [
      { name: 'San Quentin xWays', provider: 'Nolimit City', caller: '@AgusKick', image: 'https://mediumrare.imgix.net/ca243d6c3db42259d6859b80717eb378eb64e41a9d1b1f7fdeadde68d59d9ad5?w=360&auto=format' },
      { name: 'Gates of Olympus 1000', provider: 'Pragmatic Play', caller: '@SlotKing21', image: 'https://mediumrare.imgix.net/fdf333e96a5e21555bbb4e9e04a3ee4e1986c9cca9aa75141597041cc8334d23?w=360&auto=format' },
      { name: 'Le Bandit', provider: 'Hacksaw Gaming', caller: '@DiggityFan', image: 'https://mediumrare.imgix.net/8ade942d35d2cdbddf7888f303be4cf4bda8c650a112b3c53f7c6f3ccad81254?w=360&auto=format' },
      { name: 'Rip City', provider: 'Hacksaw Gaming', caller: '@CatLover', image: 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format' }
    ];
  }

  init() {
    this.renderMetrics();
    this.renderSlotTable();
    this.renderGuesses();
    this.initGuessForm();
    this.initGtbSettlement();
    this.renderSlotRequests();
    this.initSlotRequestsForm();
    this.initSlotWheel();
    this.initProvablyFairVerifiers();
  }

  save() {
    localStorage.setItem('hunthub_hunt_slots', JSON.stringify(this.slots));
    localStorage.setItem('hunthub_hunt_guesses', JSON.stringify(this.guesses));
    localStorage.setItem('hunthub_slot_requests', JSON.stringify(this.slotRequests));
  }

  // ==========================================
  // 1. SIX CORE FINANCIAL METRICS & HIGHLIGHTS
  // ==========================================
  renderMetrics() {
    const costEl = document.getElementById('bh-metric-cost');
    const paidEl = document.getElementById('bh-metric-paid');
    const pnlEl = document.getElementById('bh-metric-pnl');
    const pnlSubEl = document.getElementById('bh-metric-pnl-sub');
    const openedEl = document.getElementById('bh-metric-opened');
    const remSubEl = document.getElementById('bh-metric-remaining-sub');
    const runAvgEl = document.getElementById('bh-metric-runavg');
    const reqAvgEl = document.getElementById('bh-metric-reqavg');

    if (!this.isActive || this.slots.length === 0) {
      if (costEl) costEl.textContent = '$0.00';
      if (paidEl) paidEl.textContent = '$0.00';
      if (pnlEl) pnlEl.textContent = '$0.00';
      if (openedEl) openedEl.textContent = '0 / 0';
      if (runAvgEl) runAvgEl.textContent = '0.00x';
      if (reqAvgEl) reqAvgEl.textContent = '—';
      return;
    }

    const totalCost = this.slots.length * 100 * 2.0;
    const totalPaid = this.slots.reduce((sum, s) => sum + (s.payout || 0), 0);
    const pnl = totalPaid - totalCost;
    const roi = totalCost > 0 ? ((pnl / totalCost) * 100).toFixed(1) : '0.0';

    const openedSlots = this.slots.filter(s => s.payout > 0);
    const openedCount = openedSlots.length;
    const remainingCount = this.slots.length - openedCount;

    // Run Average Multiplier (Payout / Bet of opened)
    const openedBets = openedSlots.reduce((sum, s) => sum + (s.bet || 2.0), 0);
    const runAvg = openedBets > 0 ? (totalPaid / openedBets).toFixed(2) : '0.00';

    // Required Average Multiplier to break even
    const remainingBets = this.slots.filter(s => !(s.payout > 0)).reduce((sum, s) => sum + (s.bet || 2.0), 0);
    const remainingToBreakEven = Math.max(0, totalCost - totalPaid);
    const reqAvg = remainingBets > 0 ? (remainingToBreakEven / remainingBets).toFixed(2) : (totalPaid >= totalCost ? '0.00' : '0.00');

    // DOM Updates
    if (costEl) costEl.textContent = `$${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (paidEl) paidEl.textContent = `$${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    
    if (pnlEl) {
      pnlEl.textContent = `${pnl >= 0 ? '+' : '-'}$${Math.abs(pnl).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      pnlEl.className = `bh-metric-val ${pnl >= 0 ? 'green' : 'red'}`;
    }
    if (pnlSubEl) {
      pnlSubEl.textContent = `${pnl >= 0 ? '+' : ''}${roi}% ROI`;
    }

    if (openedEl) openedEl.textContent = `${openedCount} / ${this.slots.length}`;
    if (remSubEl) remSubEl.textContent = `${remainingCount} remaining`;

    if (runAvgEl) runAvgEl.textContent = `${runAvg}x`;
    if (reqAvgEl) {
      if (totalPaid >= totalCost && totalCost > 0) {
        reqAvgEl.textContent = 'PROFIT! 🎉';
        reqAvgEl.className = 'bh-metric-val green';
      } else {
        reqAvgEl.textContent = `${reqAvg}x`;
        reqAvgEl.className = 'bh-metric-val gold';
      }
    }

    // Highlights (Best Win $ and Lucky Win Highest Multiplier)
    this.renderHighlights(openedSlots);
  }

  renderHighlights(openedSlots) {
    let bestWin = null;
    let luckyWin = null;
    let maxPayout = 0;
    let maxMultiplier = 0;

    openedSlots.forEach(s => {
      const payout = s.payout || 0;
      const bet = s.bet || 2.0;
      const mult = bet > 0 ? payout / bet : 0;

      if (payout > maxPayout) {
        maxPayout = payout;
        bestWin = s;
      }
      if (mult > maxMultiplier) {
        maxMultiplier = mult;
        luckyWin = s;
      }
    });

    const bestNameEl = document.getElementById('bh-best-name');
    const bestCallerEl = document.getElementById('bh-best-caller');
    const bestValEl = document.getElementById('bh-best-val');
    const bestMultEl = document.getElementById('bh-best-mult');
    const bestImgEl = document.getElementById('bh-best-img');

    if (bestWin && bestWin.payout > 0) {
      if (bestNameEl) bestNameEl.textContent = bestWin.name;
      if (bestCallerEl) bestCallerEl.textContent = `Call by: ${bestWin.caller || 'Chat'}`;
      if (bestValEl) bestValEl.textContent = `$${bestWin.payout.toFixed(2)}`;
      if (bestMultEl) bestMultEl.textContent = `${(bestWin.payout / (bestWin.bet || 2)).toFixed(2)}x`;
      if (bestImgEl && bestWin.image) bestImgEl.src = bestWin.image;
    }

    const luckyNameEl = document.getElementById('bh-lucky-name');
    const luckyCallerEl = document.getElementById('bh-lucky-caller');
    const luckyValEl = document.getElementById('bh-lucky-val');
    const luckyMultEl = document.getElementById('bh-lucky-mult');
    const luckyImgEl = document.getElementById('bh-lucky-img');

    if (luckyWin && luckyWin.payout > 0) {
      if (luckyNameEl) luckyNameEl.textContent = luckyWin.name;
      if (luckyCallerEl) luckyCallerEl.textContent = `Call by: ${luckyWin.caller || 'Chat'}`;
      if (luckyMultEl) luckyMultEl.textContent = `${(luckyWin.payout / (luckyWin.bet || 2)).toFixed(2)}x`;
      if (luckyValEl) luckyValEl.textContent = `$${luckyWin.payout.toFixed(2)}`;
      if (luckyImgEl && luckyWin.image) luckyImgEl.src = luckyWin.image;
    }
  }

  // ==========================================
  // 2. SLOTS TABLE RENDERING
  // ==========================================
  renderSlotTable() {
    const tbody = document.getElementById('bh-slots-tbody');
    if (!tbody) return;

    if (!this.isActive || this.slots.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 48px 20px; color: var(--text-muted); background: rgba(0, 0, 0, 0.2);">
            <div style="font-size: 36px; margin-bottom: 10px;">🎰</div>
            <strong style="font-family: var(--font-display); font-size: 15px; color: var(--gold); letter-spacing: 1px;">NO ACTIVE BONUS HUNT IN PROGRESS</strong>
            <p style="font-size: 13px; color: #94a3b8; margin-top: 6px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.5;">
              Bonuses will populate here live in real-time as the streamer collects and opens them on Kick.com.
            </p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = '';
    this.slots.forEach((s, idx) => {
      const tr = document.createElement('tr');
      const mult = s.bet > 0 && s.payout > 0 ? (s.payout / s.bet).toFixed(1) + 'x' : '—';
      const isOpened = s.payout > 0;
      const canon = window.SlotResolver ? window.SlotResolver.resolve(s.name || s.slotName || s) : {
        name: s.name || s.slotName,
        provider: s.provider || s.slotProvider || 'Provider',
        image: s.image || s.slotImage || 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format'
      };
      const imgSrc = canon.image || (window.SlotResolver ? window.SlotResolver.resolveSlotImageUrl(s) : s.image);
      const esc = window.escapeHTML || (x => x);
      const slotName = esc(canon.name || s.name || 'Slot');
      const slotProvider = esc(canon.provider || s.provider || 'Provider');
      const callerName = esc(s.caller || s.callerUsername || '—');
      const fallbackSvg = (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function')
        ? window.SlotResolver.generateDataUriCard(canon.name || s.name || 'Slot', canon.provider || s.provider || 'Casino')
        : 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';

      tr.className = isOpened ? 'bh-row-opened' : 'bh-row-pending';
      tr.innerHTML = `
        <td class="bh-td-num">#${idx + 1}</td>
        <td class="bh-td-slot">
          <div class="bh-slot-info" style="display: flex; align-items: center; gap: 10px;">
            <img class="bh-slot-thumb" src="${imgSrc}" alt="" loading="lazy" style="width: 42px; height: 55px; aspect-ratio: 180 / 236; object-fit: contain; background: #070a12; border-radius: 6px;" onerror="this.onerror=null; this.src='${fallbackSvg}';">
            <div>
              <span class="bh-slot-name" style="font-weight: 700; color: #ffffff; display: block;">${slotName}</span>
              <span class="bh-slot-provider" style="font-size: 11px; color: var(--text-dim);">${slotProvider}</span>
            </div>
          </div>
        </td>
        <td class="bh-td-caller" style="color: var(--cyan);">${callerName}</td>
        <td class="bh-td-bet tabular-nums">$${(s.bet || 2).toFixed(2)}</td>
        <td class="bh-td-payout tabular-nums">${isOpened ? `$${s.payout.toFixed(2)}` : '<span class="status-pending" style="color: var(--text-dim);">Pending</span>'}</td>
        <td class="bh-td-mult"><span class="bh-mult-pill ${isOpened ? (parseFloat(mult) >= 100 ? 'super' : 'normal') : ''}">${mult}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ==========================================
  // 3. GUESSES & PODIUM SETTLEMENT ($DIG PRIZES)
  // ==========================================
  renderGuesses() {
    const listEl = document.getElementById('bh-guesses-list');
    const cpCountEl = document.getElementById('cp-bh-guess-count');
    if (cpCountEl) cpCountEl.textContent = String(this.guesses.length);
    if (!listEl) return;

    if (!this.isActive || this.guesses.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 24px 14px; color: var(--text-dim); font-size: 13px;">
          No predictions submitted yet.<br>
          <span style="font-size: 12px; color: var(--text-muted);">Predictions open when a live bonus hunt begins on stream!</span>
        </div>
      `;
      return;
    }

    listEl.innerHTML = '';
    const sorted = [...this.guesses].sort((a, b) => b.guess - a.guess);
    const esc = window.escapeHTML || (x => x);

    sorted.forEach(g => {
      const item = document.createElement('div');
      item.className = 'bh-guess-item';
      item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px;';
      item.innerHTML = `
        <div class="bh-guess-user" style="display: flex; align-items: center; gap: 8px;">
          <span class="bh-user-badge" style="background: rgba(255,215,0,0.15); color: #ffd700; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">VIP</span>
          <span class="bh-user-name" style="font-weight: 700; color: #ffffff;">${esc(g.user)}</span>
        </div>
        <div class="bh-guess-val" style="font-weight: 800; color: #00e676; tabular-nums: true;">$${g.guess.toLocaleString()}</div>
      `;
      listEl.appendChild(item);
    });
  }

  submitChatGuess(username, guessVal) {
    const clean = String(username || 'Viewer').trim().replace(/^@/, '');
    const formatted = `@${clean}`;
    const num = Number(guessVal);
    if (!num || isNaN(num) || num <= 0) return;

    this.isActive = true;
    localStorage.setItem('hunthub_hunt_active', 'true');
    const existingIdx = this.guesses.findIndex(g => String(g.user || '').toLowerCase() === formatted.toLowerCase());
    const entry = {
      user: formatted,
      guess: num,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    if (existingIdx >= 0) {
      this.guesses[existingIdx] = entry;
    } else {
      this.guesses.push(entry);
    }
    this.save();
    this.renderGuesses();
  }

  initGuessForm() {
    const form = document.getElementById('bh-guess-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const valEl = document.getElementById('bh-input-guess');
      const guessVal = valEl ? parseFloat(valEl.value) : 0;

      if (!guessVal || isNaN(guessVal) || guessVal <= 0) {
        if (window.sonner) {
          window.sonner.toast({
            title: 'Prediction Required',
            message: 'Please enter a valid predicted final payout amount in USD (e.g. 1750).',
            type: 'gold'
          });
        }
        if (valEl) valEl.focus();
        return;
      }

      const activeUser = (window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '@Viewer';
      this.submitChatGuess(activeUser, guessVal);
      if (window.soundEngine && typeof window.soundEngine.playVoteClick === 'function') {
        window.soundEngine.playVoteClick();
      }

      if (valEl) valEl.value = '';
      if (window.sonner) {
        window.sonner.toast({
          title: 'Prediction Recorded! 💎',
          message: `Prediction of $${guessVal.toLocaleString()} recorded for ${activeUser}!`,
          type: 'green'
        });
      }
    });
  }

  initGtbSettlement() {
    const settleBtn = document.getElementById('bh-btn-settle-gtb');
    if (settleBtn) {
      settleBtn.addEventListener('click', () => this.settleGuessTheBalance());
    }
  }

  settleGuessTheBalance() {
    if (this.guesses.length === 0) {
      if (window.sonner) {
        window.sonner.toast({
          title: 'No Guesses Registered',
          message: 'At least one community guess is required to settle the contest.',
          type: 'gold'
        });
      }
      return;
    }

    const totalPaid = this.slots.reduce((sum, s) => sum + (s.payout || 0), 0);
    const podiumEl = document.getElementById('bh-podium-list');
    const podiumCard = document.getElementById('bh-gtb-podium-card');
    if (!podiumEl || !podiumCard) return;

    // Rank by closest absolute difference to actual payout
    const ranked = this.guesses.map(g => ({
      ...g,
      delta: Math.abs(g.guess - totalPaid)
    })).sort((a, b) => a.delta - b.delta);

    const winners = ranked.slice(0, 3);
    const prizeConfig = [
      { rank: 1, title: '🥇 1ST PLACE', pts: 500, class: 'rank-1', medal: '🥇' },
      { rank: 2, title: '🥈 2ND PLACE', pts: 250, class: 'rank-2', medal: '🥈' },
      { rank: 3, title: '🥉 3RD PLACE', pts: 100, class: 'rank-3', medal: '🥉' }
    ];

    podiumEl.innerHTML = '';
    const activeUsername = ((window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '').toLowerCase().replace(/^@/, '');

    winners.forEach((w, idx) => {
      const cfg = prizeConfig[idx];
      const card = document.createElement('div');
      card.className = `bh-podium-card ${cfg.class}`;
      card.innerHTML = `
        <div style="font-size: 24px; margin-bottom: 4px;">${cfg.medal}</div>
        <div style="font-family: var(--font-display); font-size: 11px; font-weight: 800; color: #ffd700;">${cfg.title}</div>
        <div style="font-size: 14px; font-weight: 800; color: #ffffff; margin: 4px 0;">${w.user}</div>
        <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 6px;">Guess: <strong>$${w.guess.toLocaleString()}</strong> (Diff: $${w.delta.toFixed(2)})</div>
        <div style="font-size: 12px; font-weight: 900; color: #00e676; background: rgba(0,230,118,0.15); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(0,230,118,0.3); display: inline-block;">
          +${cfg.pts} $DIG
        </div>
      `;
      podiumEl.appendChild(card);

      // Award points if current active user is one of the winners
      const cleanUser = String(w.user).toLowerCase().replace(/^@/, '');
      if (activeUsername && cleanUser === activeUsername) {
        if (window.houseGames && typeof window.houseGames.adjustBalance === 'function') {
          window.houseGames.adjustBalance(cfg.pts);
        }
        if (window.sonner) {
          window.sonner.toast({
            title: `🏆 CONTEST WINNER! (${cfg.medal})`,
            message: `You won ${cfg.pts} $DIG points for your Guess The Balance prediction!`,
            type: 'green'
          });
        }
      }
    });

    podiumCard.style.display = 'block';

    // Play Victorious Trumpet Fanfare
    if (window.soundEngine && typeof window.soundEngine.playVictoryFanfare === 'function') {
      window.soundEngine.playVictoryFanfare();
    }

    // Launch celebratory confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  // ==========================================
  // 4. VIEWER SLOT REQUESTS & ROULETTE WHEEL
  // ==========================================
  renderSlotRequests() {
    const listEl = document.getElementById('bh-sr-list');
    const countEl = document.getElementById('bh-sr-count');
    if (countEl) countEl.textContent = String(this.slotRequests.length);
    if (!listEl) return;

    if (this.slotRequests.length === 0) {
      listEl.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 20px; font-size: 12px;">No requests in queue. Submit one above!</div>`;
      return;
    }

    listEl.innerHTML = '';
    const esc = window.escapeHTML || (x => x);

    this.slotRequests.forEach((req, idx) => {
      const item = document.createElement('div');
      item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 6px 10px; font-size: 12px;';
      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
          <span style="color: var(--text-dim); font-size: 10px;">#${idx + 1}</span>
          <div style="min-width: 0;">
            <div style="font-weight: 700; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${esc(req.name)}</div>
            <div style="font-size: 10px; color: var(--cyan);">${esc(req.caller)} · ${esc(req.provider || 'Slot')}</div>
          </div>
        </div>
        <button type="button" class="btn-chat-toggle" onclick="window.bonusHunt.addRequestToHunt(${idx})" style="padding: 3px 8px; font-size: 10px; border-color: rgba(255,215,0,0.4); color: #ffd700; white-space: nowrap;">
          + Add
        </button>
      `;
      listEl.appendChild(item);
    });
  }

  addRequestToHunt(idx) {
    if (idx < 0 || idx >= this.slotRequests.length) return;
    const req = this.slotRequests[idx];
    this.addSlotToHunt({
      id: req.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: req.name,
      provider: req.provider || 'Provider',
      bet: 2.0,
      payout: 0,
      caller: req.caller,
      image: req.image
    });
    this.slotRequests.splice(idx, 1);
    this.save();
    this.renderSlotRequests();
    this.drawSlotWheel(this.wheelAngle);
    if (window.sonner) {
      window.sonner.toast({
        title: 'Slot Added to Hunt! 🎰',
        message: `${req.name} added to the active bonus hunt collection!`,
        type: 'green'
      });
    }
  }

  initSlotRequestsForm() {
    const form = document.getElementById('bh-sr-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('bh-sr-input');
      const val = input ? input.value.trim() : '';
      if (!val) return;

      const activeUser = (window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '@Viewer';
      const canon = window.SlotResolver ? window.SlotResolver.resolve(val) : { name: val, provider: 'Casino', image: '' };

      this.slotRequests.push({
        name: canon.name || val,
        provider: canon.provider || 'Casino',
        caller: activeUser,
        image: canon.image || 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format'
      });

      this.save();
      this.renderSlotRequests();
      this.drawSlotWheel(this.wheelAngle);
      input.value = '';

      if (window.sonner) {
        window.sonner.toast({
          title: 'Request Queued! 🎡',
          message: `${canon.name} has been added to the roulette wheel!`,
          type: 'cyan'
        });
      }
    });

    const spinBtn = document.getElementById('bh-btn-spin-wheel');
    if (spinBtn) {
      spinBtn.addEventListener('click', () => this.spinSlotRequestsWheel());
    }
  }

  initSlotWheel() {
    this.drawSlotWheel(0);
  }

  drawSlotWheel(angle) {
    const canvas = document.getElementById('bh-wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = w / 2 - 8;

    ctx.clearRect(0, 0, w, h);

    const items = this.slotRequests.length > 0 ? this.slotRequests : [
      { name: 'Wanted Dead' }, { name: 'Gates 1000' }, { name: 'San Quentin' }, { name: 'Le Bandit' }
    ];
    const numSlices = items.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    for (let i = 0; i < numSlices; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = this.wheelColors[i % this.wheelColors.length];
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#06080d';
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#06080d';
      ctx.font = 'bold 12px "Outfit", sans-serif';
      ctx.fillText(items[i].name.slice(0, 14), r - 16, 4);
      ctx.restore();
    }

    // Center pin
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffd700';
    ctx.stroke();

    ctx.restore();
  }

  spinSlotRequestsWheel() {
    if (this.isSpinning) return;
    if (this.slotRequests.length === 0) {
      if (window.sonner) {
        window.sonner.toast({
          title: 'Wheel Empty',
          message: 'Add at least one slot request to spin the roulette wheel!',
          type: 'gold'
        });
      }
      return;
    }

    this.isSpinning = true;
    const canvas = document.getElementById('bh-wheel-canvas');
    const items = this.slotRequests;
    const numSlices = items.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    // Pick random winning index
    const winIdx = Math.floor(Math.random() * numSlices);
    // Pointer is at the top (-PI/2)
    // To land slice winIdx at top, final rotation needs:
    const targetSliceAngle = (2 * Math.PI) - (winIdx * sliceAngle + sliceAngle / 2) - (Math.PI / 2);
    const fullSpins = (5 + Math.floor(Math.random() * 3)) * (2 * Math.PI);
    const targetAngle = fullSpins + targetSliceAngle;

    const startAngle = this.wheelAngle % (2 * Math.PI);
    const totalRotation = targetAngle - startAngle;
    const duration = 4000;
    const startTime = performance.now();
    let lastTickAngle = startAngle;

    const animateWheel = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      this.wheelAngle = startAngle + totalRotation * easeOut;

      // Audio click on slice crossings
      if (Math.abs(this.wheelAngle - lastTickAngle) >= sliceAngle) {
        lastTickAngle = this.wheelAngle;
        if (window.soundEngine && typeof window.soundEngine.playVoteClick === 'function') {
          window.soundEngine.playVoteClick();
        }
      }

      this.drawSlotWheel(this.wheelAngle);

      if (progress < 1) {
        requestAnimationFrame(animateWheel);
      } else {
        this.isSpinning = false;
        const winner = items[winIdx];

        if (window.soundEngine && typeof window.soundEngine.playVictoryFanfare === 'function') {
          window.soundEngine.playVictoryFanfare();
        }
        if (typeof confetti === 'function') {
          confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
        }

        if (window.sonner) {
          window.sonner.toast({
            title: `🎰 WHEEL WINNER: ${winner.name}!`,
            message: `Selected by the wheel! Click "+ Add" in queue to include in hunt.`,
            type: 'green'
          });
        }
      }
    };

    requestAnimationFrame(animateWheel);
  }

  // ==========================================
  // 5. STAKE ORIGINALS PROVABLY FAIR VERIFIER
  // ==========================================
  initProvablyFairVerifiers() {
    const tabKeno = document.getElementById('btn-verifier-tab-keno');
    const tabMines = document.getElementById('btn-verifier-tab-mines');
    const kenoView = document.getElementById('vf-keno-view');
    const minesView = document.getElementById('vf-mines-view');
    const minesCountBox = document.getElementById('vf-mines-count-box');
    const runBtn = document.getElementById('btn-run-verifier');

    if (tabKeno && tabMines) {
      tabKeno.addEventListener('click', () => {
        tabKeno.className = 'btn-chat-toggle active';
        tabMines.className = 'btn-chat-toggle';
        if (kenoView) kenoView.style.display = 'block';
        if (minesView) minesView.style.display = 'none';
        if (minesCountBox) minesCountBox.style.display = 'none';
        this.verifierMode = 'keno';
      });

      tabMines.addEventListener('click', () => {
        tabMines.className = 'btn-chat-toggle active';
        tabKeno.className = 'btn-chat-toggle';
        if (kenoView) kenoView.style.display = 'none';
        if (minesView) minesView.style.display = 'block';
        if (minesCountBox) minesCountBox.style.display = 'block';
        this.verifierMode = 'mines';
      });
    }

    if (runBtn) {
      runBtn.addEventListener('click', () => this.runVerification());
    }

    // Initial render of empty boards
    this.renderEmptyKenoBoard();
    this.renderEmptyMinesBoard();
  }

  renderEmptyKenoBoard() {
    const board = document.getElementById('vf-keno-board');
    if (!board) return;
    board.innerHTML = '';
    for (let i = 1; i <= 40; i++) {
      const tile = document.createElement('div');
      tile.className = 'keno-tile';
      tile.id = `keno-tile-${i}`;
      tile.textContent = String(i);
      board.appendChild(tile);
    }
  }

  renderEmptyMinesBoard() {
    const board = document.getElementById('vf-mines-board');
    if (!board) return;
    board.innerHTML = '';
    for (let i = 0; i < 25; i++) {
      const tile = document.createElement('div');
      tile.className = 'mines-tile';
      tile.id = `mines-tile-${i}`;
      tile.textContent = '💎';
      board.appendChild(tile);
    }
  }

  async runVerification() {
    const serverSeed = (document.getElementById('vf-server-seed')?.value || '').trim();
    const clientSeed = (document.getElementById('vf-client-seed')?.value || '').trim();
    const nonce = parseInt(document.getElementById('vf-nonce')?.value || '1', 10);
    const mineCount = parseInt(document.getElementById('vf-mine-count')?.value || '3', 10);

    if (!serverSeed || !clientSeed) {
      if (window.sonner) {
        window.sonner.toast({
          title: 'Missing Seeds',
          message: 'Both Server Seed and Client Seed are required for provably fair verification.',
          type: 'gold'
        });
      }
      return;
    }

    if (this.verifierMode === 'keno') {
      const drawnNumbers = await this.computeStakeKeno(serverSeed, clientSeed, nonce);
      const drawnLabel = document.getElementById('vf-keno-drawn-list');
      if (drawnLabel) drawnLabel.textContent = drawnNumbers.join(', ');

      for (let i = 1; i <= 40; i++) {
        const tile = document.getElementById(`keno-tile-${i}`);
        if (tile) {
          tile.className = drawnNumbers.includes(i) ? 'keno-tile drawn' : 'keno-tile';
        }
      }

      if (window.sonner) {
        window.sonner.toast({
          title: 'Keno Verified ✓',
          message: `Drawn 10 numbers: ${drawnNumbers.join(', ')}`,
          type: 'green'
        });
      }
    } else {
      const minesPositions = await this.computeStakeMines(serverSeed, clientSeed, nonce, mineCount);
      const totalDisplay = document.getElementById('vf-mines-total-display');
      if (totalDisplay) totalDisplay.textContent = String(mineCount);

      for (let i = 0; i < 25; i++) {
        const tile = document.getElementById(`mines-tile-${i}`);
        if (tile) {
          const isBomb = minesPositions.includes(i);
          tile.className = isBomb ? 'mines-tile bomb' : 'mines-tile gem';
          tile.textContent = isBomb ? '💣' : '💎';
        }
      }

      if (window.sonner) {
        window.sonner.toast({
          title: 'Mines Verified ✓',
          message: `Revealed ${mineCount} bomb locations on 5x5 grid!`,
          type: 'cyan'
        });
      }
    }

    if (window.soundEngine && typeof window.soundEngine.playChip === 'function') {
      window.soundEngine.playChip();
    }
  }

  /**
   * Stake Keno Algorithm: SHA-256 HMAC multi-round byte generator picking 10 unique numbers (1-40)
   */
  async computeStakeKeno(serverSeed, clientSeed, nonce) {
    const numbers = [];
    let round = 0;

    while (numbers.length < 10) {
      const hashBuffer = await this.hmacSha256(serverSeed, `${clientSeed}:${nonce}:${round}`);
      const view = new DataView(hashBuffer);

      for (let i = 0; i < 32 && numbers.length < 10; i += 4) {
        const val = view.getUint32(i, false); // Big endian
        const num = (val % 40) + 1;
        if (!numbers.includes(num)) {
          numbers.push(num);
        }
      }
      round++;
    }

    return numbers.sort((a, b) => a - b);
  }

  /**
   * Stake Mines Algorithm: Fisher-Yates shuffle across 25 tiles (0-24)
   */
  async computeStakeMines(serverSeed, clientSeed, nonce, mineCount = 3) {
    const tiles = Array.from({ length: 25 }, (_, i) => i);
    let round = 0;
    let byteOffset = 0;
    let hashBuffer = await this.hmacSha256(serverSeed, `${clientSeed}:${nonce}:${round}`);
    let view = new DataView(hashBuffer);

    for (let i = 24; i > 0; i--) {
      if (byteOffset + 4 > 32) {
        round++;
        hashBuffer = await this.hmacSha256(serverSeed, `${clientSeed}:${nonce}:${round}`);
        view = new DataView(hashBuffer);
        byteOffset = 0;
      }

      const val = view.getUint32(byteOffset, false);
      byteOffset += 4;
      const j = val % (i + 1);

      const temp = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = temp;
    }

    return tiles.slice(0, mineCount).sort((a, b) => a - b);
  }

  async hmacSha256(keyStr, messageStr) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(keyStr);
    const msgData = encoder.encode(messageStr);

    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    return await window.crypto.subtle.sign('HMAC', cryptoKey, msgData);
  }

  addSlotToHunt(slot) {
    if (window.SlotResolver && slot && slot.name) {
      const canon = window.SlotResolver.resolve(slot.name);
      if (canon && canon.image) {
        slot.image = canon.image;
        if (!slot.provider) slot.provider = canon.provider;
      }
    } else if (!slot.image) {
      slot.image = 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';
    }
    this.slots.push(slot);
    this.save();
    this.renderMetrics();
    this.renderSlotTable();
  }
}

// Global initialization
window.bonusHunt = new BonusHuntController();
window.bonusHuntTracker = window.bonusHunt;

// Auto-boot on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.bonusHunt.init());
} else {
  window.bonusHunt.init();
}
