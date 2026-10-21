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
    this.huntId = 'hunt_1';
    this.huntName = 'Community Bonus Hunt';
    this.slots = this.loadInitialHuntSlots();
    this.isActive = localStorage.getItem('hunthub_hunt_active') === 'true' || this.slots.length > 0;
    this.startBalance = this.slots.length > 0 ? Number(localStorage.getItem('hunthub_hunt_start_cost') || 0) : 0;
    this.guesses = this.isActive ? this.loadInitialGuesses() : [];
    this.guessesLocked = localStorage.getItem('hunthub_bh_guesses_locked') === 'true';
    this.slotRequests = this.loadInitialSlotRequests();

    // Wheel animation state
    this.wheelAngle = 0;
    this.isSpinning = false;
    this.wheelColors = ['#9272ff', '#00e5ff', '#ffd700', '#ff007a', '#00e676', '#ff9100', '#b388ff', '#1de9b6'];

    // Verifier state
    this.verifierMode = 'keno'; // 'keno' or 'mines'
  }

  escapeHTML(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  isDemoUser(u) {
    if (!u) return false;
    const clean = String(u).trim().toLowerCase().replace(/^@/, '');
    const demo = new Set([
      'luckystriker', 'vegasking', 'slotqueen', 'spinmaster', 'strike777',
      'bigbassbob', 'neonwolf', 'royalflush', 'nachogamer', 'slotking21',
      'diggityfan', 'cryptospin', 'aguskick', 'valen99', 'stakehunter',
      'kickviewer01', 'charlybets', 'zeusmax_21', 'slothunter_ar', 'catlover'
    ]);
    return demo.has(clean);
  }

  loadInitialHuntSlots() {
    const saved = localStorage.getItem('hunthub_hunt_slots');
    if (saved !== null) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter(s => !this.isDemoUser(s.caller));
          if (filtered.length !== parsed.length) {
            localStorage.setItem('hunthub_hunt_slots', JSON.stringify(filtered));
          }
          if (filtered.length === 0) return [];
          const healed = filtered.map(s => {
            if (window.SlotResolver && s && (s.name || s.slotName)) {
              const canon = window.SlotResolver.resolve(s.name || s.slotName);
              if (canon && canon.image) {
                s.image = canon.image;
                if (!s.provider || s.provider === 'Provider') s.provider = canon.provider;
              }
            }
            return s;
          });
          return healed;
        }
      } catch (e) {}
    }

    return [];
  }

  loadInitialGuesses() {
    const mergedMap = new Map();
    ['hunthub_hunt_guesses', 'hunthub_bh_guesses'].forEach((key) => {
      try {
        const parsed = JSON.parse(localStorage.getItem(key) || '[]');
        if (Array.isArray(parsed)) {
          parsed.forEach((g) => {
            const u = String(g?.user || g?.username || '').trim();
            const val = Number(g?.guess ?? g?.amount ?? 0);
            if (!u || this.isDemoUser(u) || !val || isNaN(val) || val <= 0) return;
            const cleanKey = u.toLowerCase().replace(/^@/, '');
            mergedMap.set(cleanKey, {
              user: u.startsWith('@') ? u : `@${u}`,
              guess: val,
              amount: val,
              time: g.time || new Date(g.ts || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          });
        }
      } catch (_) {}
    });
    const list = Array.from(mergedMap.values());
    if (list.length > 0) {
      try { localStorage.setItem('hunthub_hunt_guesses', JSON.stringify(list)); } catch (_) {}
    }
    return list;
  }

  loadInitialSlotRequests() {
    const saved = localStorage.getItem('hunthub_slot_requests');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter(r => !this.isDemoUser(r.caller));
          if (filtered.length !== parsed.length) {
            localStorage.setItem('hunthub_slot_requests', JSON.stringify(filtered));
          }
          return filtered;
        }
      } catch (e) {}
    }
    return [];
  }

  reloadFromStorage() {
    this.slots = this.loadInitialHuntSlots();
    this.isActive = localStorage.getItem('hunthub_hunt_active') === 'true' || this.slots.length > 0;
    this.startBalance = this.slots.length > 0 ? Number(localStorage.getItem('hunthub_hunt_start_cost') || 0) : 0;
    this.guesses = this.loadInitialGuesses();
    this.guessesLocked = localStorage.getItem('hunthub_bh_guesses_locked') === 'true';
    this.slotRequests = this.loadInitialSlotRequests();
    this.renderMetrics();
    this.renderSlotTable();
    this.renderGuesses();
    this.renderGuessLockState();
    this.renderSlotRequests();
    if (!this.isSpinning) {
      this.drawSlotWheel(this.wheelAngle);
    }
    if (window.diggityIntelSuite && typeof window.diggityIntelSuite.updateVaultSrQuotaUI === 'function') {
      window.diggityIntelSuite.updateVaultSrQuotaUI();
    }
  }

  init() {
    if (this._initialized) return;
    this._initialized = true;
    this.renderMetrics();
    this.renderSlotTable();
    this.renderGuesses();
    this.initGuessForm();
    this.renderGuessLockState();
    this.initGtbSettlement();
    this.renderSlotRequests();
    this.initSlotRequestsForm();
    this.initSlotWheel();
    this.initProvablyFairVerifiers();

    // Real-time sync with Control Panel and OBS Bonus Hunt / Slot Requests broadcasts
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.bcHunt = new BroadcastChannel('hunthub_bonushunt');
        this.bcHunt.onmessage = () => this.reloadFromStorage();
      } catch (_) {}
      try {
        this.bcSrListen = new BroadcastChannel('hunthub_sr_wheel');
        this.bcSrListen.onmessage = (ev) => {
          if (ev.data && Array.isArray(ev.data.queue)) {
            try { localStorage.setItem('hunthub_slot_requests', JSON.stringify(ev.data.queue)); } catch (_) {}
            this.reloadFromStorage();
          }
        };
      } catch (_) {}
    }
    window.addEventListener('storage', (e) => {
      if (e.key === 'hunthub_hunt_slots' || e.key === 'hunthub_hunt_guesses' || e.key === 'hunthub_hunt_start_cost' || e.key === 'hunthub_hunt_active' || e.key === 'hunthub_bh_guesses_locked' || e.key === 'hunthub_slot_requests') {
        this.reloadFromStorage();
      }
    });
    window.addEventListener('hunthub:bonushunt-sync', () => this.reloadFromStorage());
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
    const statusTextEl = document.getElementById('bh-live-status-text');

    if (!this.isActive || this.slots.length === 0) {
      if (costEl) costEl.textContent = '$0.00';
      if (paidEl) paidEl.textContent = '$0.00';
      if (pnlEl) {
        pnlEl.textContent = '$0.00';
        pnlEl.className = 'bh-metric-val';
      }
      if (pnlSubEl) pnlSubEl.textContent = '0.0% ROI';
      if (openedEl) openedEl.textContent = '0 / 0';
      if (remSubEl) remSubEl.textContent = '0 remaining';
      if (runAvgEl) runAvgEl.textContent = '0.00x';
      if (reqAvgEl) {
        reqAvgEl.textContent = '—';
        reqAvgEl.className = 'bh-metric-val gold';
      }
      if (statusTextEl) statusTextEl.textContent = 'WAITING FOR HUNT';
      this.renderHighlights([]);
      return;
    }

    const customStartCost = Number(localStorage.getItem('hunthub_hunt_start_cost') || 0);
    const totalCost = customStartCost > 0 ? customStartCost : (this.slots.length * 100 * 2.0);
    const totalPaid = this.slots.reduce((sum, s) => sum + (s.payout || 0), 0);
    const pnl = totalPaid - totalCost;
    const roi = totalCost > 0 ? ((pnl / totalCost) * 100).toFixed(1) : '0.0';

    const openedSlots = this.slots.filter(s => s.payout > 0);
    const openedCount = openedSlots.length;
    const remainingCount = this.slots.length - openedCount;

    if (statusTextEl) {
      statusTextEl.textContent = remainingCount === 0 ? 'HUNT COMPLETED' : (openedCount > 0 ? 'OPENING BONUSES LIVE' : 'COLLECTING BONUSES');
    }

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
    const bestPlaceholderEl = document.getElementById('bh-best-placeholder');

    if (bestWin && bestWin.payout > 0) {
      const canon = window.SlotResolver ? window.SlotResolver.resolve(bestWin.name || bestWin.slotName || bestWin) : null;
      const imgSrc = canon?.image || bestWin.image || '';
      if (bestNameEl) bestNameEl.textContent = canon?.name || bestWin.name || bestWin.slotName || 'Slot';
      if (bestCallerEl) bestCallerEl.textContent = `Call by: ${bestWin.caller || 'Chat'}`;
      if (bestValEl) bestValEl.textContent = `$${bestWin.payout.toFixed(2)}`;
      if (bestMultEl) bestMultEl.textContent = `${(bestWin.payout / (bestWin.bet || 2)).toFixed(2)}x`;
      if (bestImgEl && imgSrc) {
        bestImgEl.src = imgSrc;
        bestImgEl.style.display = 'block';
      }
      if (bestPlaceholderEl) bestPlaceholderEl.style.display = 'none';
    } else {
      if (bestNameEl) bestNameEl.textContent = '—';
      if (bestCallerEl) bestCallerEl.textContent = 'Call by: —';
      if (bestValEl) bestValEl.textContent = '$0.00';
      if (bestMultEl) bestMultEl.textContent = '0.00x';
      if (bestImgEl) bestImgEl.style.display = 'none';
      if (bestPlaceholderEl) bestPlaceholderEl.style.display = 'flex';
    }

    const luckyNameEl = document.getElementById('bh-lucky-name');
    const luckyCallerEl = document.getElementById('bh-lucky-caller');
    const luckyValEl = document.getElementById('bh-lucky-val');
    const luckyMultEl = document.getElementById('bh-lucky-mult');
    const luckyImgEl = document.getElementById('bh-lucky-img');
    const luckyPlaceholderEl = document.getElementById('bh-lucky-placeholder');

    if (luckyWin && luckyWin.payout > 0) {
      const canon = window.SlotResolver ? window.SlotResolver.resolve(luckyWin.name || luckyWin.slotName || luckyWin) : null;
      const imgSrc = canon?.image || luckyWin.image || '';
      if (luckyNameEl) luckyNameEl.textContent = canon?.name || luckyWin.name || luckyWin.slotName || 'Slot';
      if (luckyCallerEl) luckyCallerEl.textContent = `Call by: ${luckyWin.caller || 'Chat'}`;
      if (luckyMultEl) luckyMultEl.textContent = `${(luckyWin.payout / (luckyWin.bet || 2)).toFixed(2)}x`;
      if (luckyValEl) luckyValEl.textContent = `$${luckyWin.payout.toFixed(2)}`;
      if (luckyImgEl && imgSrc) {
        luckyImgEl.src = imgSrc;
        luckyImgEl.style.display = 'block';
      }
      if (luckyPlaceholderEl) luckyPlaceholderEl.style.display = 'none';
    } else {
      if (luckyNameEl) luckyNameEl.textContent = '—';
      if (luckyCallerEl) luckyCallerEl.textContent = 'Call by: —';
      if (luckyMultEl) luckyMultEl.textContent = '0.00x';
      if (luckyValEl) luckyValEl.textContent = '$0.00';
      if (luckyImgEl) luckyImgEl.style.display = 'none';
      if (luckyPlaceholderEl) luckyPlaceholderEl.style.display = 'flex';
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
      const esc = (x) => this.escapeHTML(x);
      const imgSrc = esc(canon.image || (window.SlotResolver ? window.SlotResolver.resolveSlotImageUrl(s) : s.image));
      const slotName = esc(canon.name || s.name || 'Slot');
      const slotProvider = esc(canon.provider || s.provider || 'Provider');
      const callerName = esc(s.caller || s.callerUsername || '—');
      const fallbackSvg = (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function')
        ? window.SlotResolver.generateDataUriCard(canon.name || s.name || 'Slot', canon.provider || s.provider || 'Casino')
        : 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';

      const tierCode = String(s.bonusTier || s.tierBadge || '3S').toUpperCase();
      const tierMap = {
        '3S': { text: '3S', cls: 'tier-3s' },
        '4S': { text: '🥈 4S SILVER', cls: 'tier-4s' },
        '5S': { text: '🥇 5S GOLD', cls: 'tier-5s' },
        '6S': { text: '🌈 6S HOLO', cls: 'tier-6s' },
        'SUPER': { text: '🔥 SUPER BONUS', cls: 'tier-super' },
        'HIDDEN': { text: '🕵️ HIDDEN EPIC', cls: 'tier-hidden' },
        'MAX': { text: '⚡ MAX VOL', cls: 'tier-max' },
        'BOUGHT': { text: '🛒 BOUGHT', cls: 'tier-bought' }
      };
      const tInfo = tierMap[tierCode] || tierMap['3S'];

      tr.className = isOpened ? 'bh-row-opened' : 'bh-row-pending';
      tr.innerHTML = `
        <td class="bh-td-num">#${idx + 1}</td>
        <td class="bh-td-slot">
          <div class="bh-slot-info" style="display: flex; align-items: center; gap: 10px;">
            <img class="bh-slot-thumb lazy" src="${imgSrc}" alt="" loading="lazy" decoding="async" style="width: 42px; height: 55px; aspect-ratio: 180 / 236; object-fit: contain; background: #070a12; border-radius: 6px;" onerror="this.onerror=null; this.src='${fallbackSvg}';">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                <span class="bh-slot-name" style="font-weight: 700; color: #ffffff;">${slotName}</span>
                <span class="bh-tier-badge ${tInfo.cls}">${tInfo.text}</span>
              </div>
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
    if (typeof window.refreshLazyLoad === 'function') {
      window.refreshLazyLoad();
    }
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
    const esc = (x) => this.escapeHTML(x);

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

  setGuessesLocked(locked, broadcast = true) {
    this.guessesLocked = Boolean(locked);
    try {
      localStorage.setItem('hunthub_bh_guesses_locked', this.guessesLocked ? 'true' : 'false');
    } catch (_) {}
    this.renderGuessLockState();
    if (broadcast) {
      try {
        if (this.bcHunt) {
          this.bcHunt.postMessage({ type: 'GUESS_LOCK_CHANGED', guessesLocked: this.guessesLocked, ts: Date.now() });
        }
      } catch (_) {}
      try {
        fetch('/api/sync/state', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-user': localStorage.getItem('hunthub_kick_username') || 'diggitybets',
            'x-admin-token': localStorage.getItem('hunthub_admin_token') || ''
          },
          body: JSON.stringify({ guessesLocked: this.guessesLocked })
        }).catch(() => {});
      } catch (_) {}
      window.dispatchEvent(new CustomEvent('hunthub:bonushunt-sync'));
    }
  }

  toggleGuessesLocked() {
    this.setGuessesLocked(!this.guessesLocked, true);
    if (window.soundEngine && typeof window.soundEngine.playChip === 'function') {
      try { window.soundEngine.playChip(); } catch (_) {}
    }
    if (window.sonner) {
      window.sonner.toast({
        title: this.guessesLocked ? '🔒 Guess Closed (Locked)' : '🔓 Guesses Re-Opened!',
        message: this.guessesLocked
          ? 'Spectators can no longer submit new predictions — ready to open bonuses!'
          : 'Spectators can now submit their final balance predictions (!guess).',
        type: this.guessesLocked ? 'gold' : 'green'
      });
    }
  }

  renderGuessLockState() {
    const locked = Boolean(this.guessesLocked);
    const cardEl = document.getElementById('bh-guess-card');
    const bannerEl = document.getElementById('bh-guess-closed-banner');
    const formEl = document.getElementById('bh-guess-form');
    const inputEl = document.getElementById('bh-input-guess');
    const submitBtn = document.getElementById('bh-btn-submit-guess');
    const badgeEl = document.getElementById('bh-guess-status-badge');
    const cpToggleBtn = document.getElementById('btn-toggle-bh-guess-lock');

    if (cardEl) {
      cardEl.classList.toggle('is-guesses-locked', locked);
    }
    if (bannerEl) {
      bannerEl.style.display = locked ? 'block' : 'none';
    }
    if (formEl) {
      formEl.style.opacity = locked ? '0.45' : '1';
      formEl.style.pointerEvents = locked ? 'none' : 'auto';
    }
    if (inputEl) {
      inputEl.disabled = locked;
      inputEl.placeholder = locked ? '🔒 GUESS CLOSED — Bonus opening in progress' : 'e.g. 1750';
    }
    if (submitBtn) {
      submitBtn.disabled = locked;
      submitBtn.textContent = locked ? '🔒 Guess Closed' : 'Lock 🎯';
    }
    if (badgeEl) {
      if (locked) {
        badgeEl.textContent = '🔒 GUESS CLOSED';
        badgeEl.style.background = 'rgba(255, 42, 95, 0.22)';
        badgeEl.style.borderColor = '#ff2a5f';
        badgeEl.style.color = '#ff6b8b';
      } else {
        badgeEl.textContent = '🔓 GUESS OPEN';
        badgeEl.style.background = 'rgba(83, 252, 24, 0.15)';
        badgeEl.style.borderColor = 'var(--kick-green)';
        badgeEl.style.color = 'var(--kick-green)';
      }
    }
    if (cpToggleBtn) {
      if (locked) {
        cpToggleBtn.textContent = '🔒 Guesses: CLOSED';
        cpToggleBtn.style.borderColor = '#ff2a5f';
        cpToggleBtn.style.color = '#ff6b8b';
        cpToggleBtn.style.background = 'rgba(255, 42, 95, 0.16)';
      } else {
        cpToggleBtn.textContent = '🔓 Guesses: OPEN';
        cpToggleBtn.style.borderColor = 'var(--kick-green)';
        cpToggleBtn.style.color = 'var(--kick-green)';
        cpToggleBtn.style.background = 'rgba(83, 252, 24, 0.12)';
      }
    }
  }

  submitChatGuess(username, guessVal) {
    if (this.guessesLocked || localStorage.getItem('hunthub_bh_guesses_locked') === 'true') {
      if (window.sonner) {
        window.sonner.toast({
          title: '🔒 Guess Closed',
          message: 'Final balance predictions are locked while bonuses are being opened.',
          type: 'danger'
        });
      }
      return false;
    }
    const clean = String(username || 'Viewer').trim().replace(/^@+/, '');
    const lowerClean = clean.toLowerCase();
    const formatted = `@${clean}`;
    const num = Number(guessVal);
    if (!num || isNaN(num) || num <= 0) return false;

    this.isActive = true;
    localStorage.setItem('hunthub_hunt_active', 'true');
    const existingIdx = this.guesses.findIndex(g => String(g.user || g.username || '').toLowerCase().replace(/^@+/, '') === lowerClean);
    const entry = {
      user: formatted,
      username: clean,
      guess: num,
      amount: num,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    if (existingIdx >= 0) {
      this.guesses[existingIdx] = entry;
    } else {
      this.guesses.push(entry);
    }
    this.save();
    try {
      localStorage.setItem('hunthub_bh_guesses', JSON.stringify(this.guesses));
    } catch (_) {}
    this.renderGuesses();
    return true;
  }

  initGuessForm() {
    const cpToggleBtn = document.getElementById('btn-toggle-bh-guess-lock');
    if (cpToggleBtn && !cpToggleBtn._lockBound) {
      cpToggleBtn._lockBound = true;
      cpToggleBtn.addEventListener('click', () => this.toggleGuessesLocked());
    }

    const form = document.getElementById('bh-guess-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.guessesLocked || localStorage.getItem('hunthub_bh_guesses_locked') === 'true') {
        if (typeof window.showCasinoAlert === 'function') {
          window.showCasinoAlert(
            '🔒 GUESS CLOSED',
            'Predictions for this Bonus Hunt have been closed by the streamer before bonus opening.',
            'danger',
            '🔒 CONTEST LOCKED'
          );
        }
        return;
      }
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
      const ok = this.submitChatGuess(activeUser, guessVal);
      if (!ok) return;
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
    const bindBtn = (id) => {
      const btn = document.getElementById(id);
      if (btn && !btn._gtbBound) {
        btn._gtbBound = true;
        btn.addEventListener('click', () => this.settleGuessTheBalance());
      }
    };
    bindBtn('bh-btn-settle-gtb');
    bindBtn('cp-btn-settle-gtb');

    // Restrict public settlement box visibility strictly to @diggitybets, @tarkansky, and @diggitybot
    const container = document.getElementById('bh-streamer-settlement-container');
    if (container) {
      const STREAMER_WHITELIST = ['diggitybets', 'diggity_bets', 'tarkansky', 'diggitybot', 'diggity_bot'];
      const currentUsername = ((window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '').toLowerCase().replace(/^@/, '');
      container.style.display = STREAMER_WHITELIST.includes(currentUsername) ? 'flex' : 'none';
    }
  }

  settleGuessTheBalance() {
    const STREAMER_WHITELIST = ['diggitybets', 'diggity_bets', 'tarkansky', 'diggitybot', 'diggity_bot'];
    const currentUsername = ((window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '').toLowerCase().replace(/^@/, '');
    if (!STREAMER_WHITELIST.includes(currentUsername)) {
      if (window.sonner) {
        window.sonner.toast({
          title: 'Access Restricted 🔒',
          message: 'GTB Settlement is strictly reserved for @diggitybets, @tarkansky, and @DiggityBot in the Control Panel.',
          type: 'red'
        });
      }
      return;
    }

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
        <div style="font-size: 14px; font-weight: 800; color: #ffffff; margin: 4px 0;">${this.escapeHTML(w.user)}</div>
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

    if (winners.length > 0 && typeof window.announceStreamWinner === 'function') {
      const topWinner = String(winners[0].user || '').replace(/^@/, '');
      window.announceStreamWinner({
        eventType: 'gtb',
        tier: 'grand',
        type: 'BONUSHUNT_GTB_WIN',
        category: 'GUESS THE BALANCE · #1 WINNER',
        ribbon: '💎 GTB CLOSEST PREDICTION',
        icon: '💎',
        username: topWinner,
        slotName: `Guessed $${Number(winners[0].guess || 0).toFixed(2)}`,
        statValue: `ACTUAL $${totalPaid.toFixed(2)}`,
        prize: `DIFF $${Number(winners[0].delta || 0).toFixed(2)} · +500 $DIG`
      });
    }

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
  // 4. VIEWER SLOT REQUESTS (!sr) & ROULETTE WHEEL
  // ==========================================
  broadcastSlotRequestsOverlay(packet) {
    const payload = {
      ...packet,
      queue: this.slotRequests,
      ts: packet.ts || Date.now()
    };
    try {
      localStorage.setItem('hunthub_slot_requests', JSON.stringify(this.slotRequests));
    } catch (_) {}

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        if (!this.bcSrWheel) {
          this.bcSrWheel = new BroadcastChannel('hunthub_sr_wheel');
        }
        this.bcSrWheel.postMessage(payload);
      }
    } catch (_) {}

    if (payload.type === 'SPIN_WHEEL') {
      try {
        localStorage.setItem('hunthub_sr_spin_cmd', JSON.stringify(payload));
      } catch (_) {}
    }

    const adminUser = localStorage.getItem('hunthub_kick_username') || 'diggitybets';
    const adminToken =
      localStorage.getItem('hunthub_admin_token') ||
      localStorage.getItem('hunthub_overlay_sync_token') ||
      localStorage.getItem('hunthub_auth_token') ||
      '';

    try {
      fetch('/api/sr/queue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-user': adminUser,
          'x-admin-token': adminToken
        },
        body: JSON.stringify({
          action: payload.type || 'SYNC_QUEUE',
          queue: this.slotRequests,
          payload
        })
      }).catch(() => {});
    } catch (_) {}

    try {
      fetch('/api/overlay/celebration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-user': adminUser,
          'x-admin-token': adminToken
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          targetOverlay: 'overlay-slotrequests',
          ...payload
        })
      }).catch(() => {});
    } catch (_) {}

    try {
      fetch('/api/sync/state', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-user': adminUser,
          'x-admin-token': adminToken
        },
        body: JSON.stringify({
          slotRequests: this.slotRequests,
          overlayEvent: {
            target: 'overlay-slotrequests',
            ...payload
          }
        })
      }).catch(() => {});
    } catch (_) {}
  }

  getMaxSlotRequestsForUser(username) {
    // Maximum of 3 active Slot Requests per viewer in the Roulette (!sr).
    // Once a viewer's request wins on the Roulette, it is removed from the wheel and frees 1 slot (2/3 -> 3/3).
    return 3;
  }

  getActiveSlotRequestCountForUser(username) {
    const clean = String(username || 'Viewer').trim().replace(/^@+/, '').toLowerCase() || 'viewer';
    return this.slotRequests.filter(
      (r) => String(r.user || r.caller || '').trim().replace(/^@+/, '').toLowerCase() === clean
    ).length;
  }

  addSlotRequest(username, slotQuery, silentToast = false) {
    const rawSlot = String(slotQuery || '').trim();
    if (!rawSlot) return null;

    const cleanUser = String(username || 'Viewer').trim().replace(/^@+/, '') || 'Viewer';
    const lowerUser = cleanUser.toLowerCase();
    const handle = `@${cleanUser}`;
    const canon = window.SlotResolver
      ? window.SlotResolver.resolve(rawSlot)
      : { name: rawSlot, provider: 'Official Slot', img: '', image: '' };

    const slotImg = canon.img || canon.image || '';
    const entry = {
      user: handle,
      caller: handle,
      name: canon.name || rawSlot,
      provider: canon.provider || 'Official Slot',
      img: slotImg,
      image: slotImg,
      ts: Date.now()
    };

    const maxAllowed = this.getMaxSlotRequestsForUser(cleanUser);
    const userRequests = this.slotRequests.filter(
      (r) => String(r.user || r.caller || '').trim().replace(/^@+/, '').toLowerCase() === lowerUser
    );

    // Prevent queuing the exact same slot twice by the same user
    const alreadyHasSameSlot = userRequests.some(
      (r) => String(r.name || '').trim().toLowerCase() === String(entry.name || '').trim().toLowerCase()
    );
    if (alreadyHasSameSlot) {
      if (!silentToast && window.sonner) {
        window.sonner.toast({
          title: `⚠️ Slot Already in Roulette (${handle})`,
          message: `You already have "${entry.name}" active in the !sr Roulette (${userRequests.length}/${maxAllowed}).`,
          type: 'gold'
        });
      }
      return null;
    }

    // Enforce maximum of 3 active Slot Requests per viewer in the Roulette
    if (userRequests.length >= maxAllowed) {
      if (!silentToast && window.sonner) {
        window.sonner.toast({
          title: `🔒 Max 3 Active Requests Reached (${maxAllowed}/${maxAllowed} · ${handle})`,
          message: `You already have ${userRequests.length} active Slot Requests in the Roulette. Once one of your requests wins on the Roulette, 1 slot will open up!`,
          type: 'gold'
        });
      }
      return null;
    }

    this.slotRequests.push(entry);

    this.save();
    this.renderSlotRequests();
    this.drawSlotWheel(this.wheelAngle);
    this.broadcastSlotRequestsOverlay({ type: 'SYNC_QUEUE', addedEntry: entry });
    if (window.diggityIntelSuite && typeof window.diggityIntelSuite.updateVaultSrQuotaUI === 'function') {
      window.diggityIntelSuite.updateVaultSrQuotaUI();
    }

    // Announce !sr entry in live chat window + DiggityBot
    if (window.adminHub && typeof window.adminHub.announceEventChatMessage === 'function') {
      window.adminHub.announceEventChatMessage(
        `@${cleanUser} has entered the roulette queue with ${entry.name}`,
        { icon: '🎰', type: 'SR_ENTRY', username: cleanUser, slotName: entry.name }
      );
    }

    const newCount = userRequests.length + 1;
    const quotaLabel = `${newCount}/${maxAllowed}`;
    if (!silentToast && window.sonner) {
      window.sonner.toast({
        title: `🎰 !sr Queued in Roulette (${quotaLabel} · ${handle})`,
        message: `${entry.name} added to the Slot Requests Roulette (${newCount}/3 active)!`,
        type: 'gold'
      });
    }
    return entry;
  }

  removeSlotRequest(idx) {
    if (idx < 0 || idx >= this.slotRequests.length) return;
    this.slotRequests.splice(idx, 1);
    this.save();
    this.renderSlotRequests();
    this.drawSlotWheel(this.wheelAngle);
    this.broadcastSlotRequestsOverlay({ type: 'SYNC_QUEUE' });
    if (window.diggityIntelSuite && typeof window.diggityIntelSuite.updateVaultSrQuotaUI === 'function') {
      window.diggityIntelSuite.updateVaultSrQuotaUI();
    }
  }

  clearSlotRequests() {
    this.slotRequests = [];
    this.save();
    this.renderSlotRequests();
    this.drawSlotWheel(0);
    this.broadcastSlotRequestsOverlay({ type: 'CLEAR_WINNER' });
    this.broadcastSlotRequestsOverlay({ type: 'SYNC_QUEUE' });
    if (window.diggityIntelSuite && typeof window.diggityIntelSuite.updateVaultSrQuotaUI === 'function') {
      window.diggityIntelSuite.updateVaultSrQuotaUI();
    }
  }

  renderSlotRequests() {
    if (window.diggityIntelSuite && typeof window.diggityIntelSuite.updateVaultSrQuotaUI === 'function') {
      window.diggityIntelSuite.updateVaultSrQuotaUI();
    }
    const listEl = document.getElementById('bh-sr-list');
    const countEl = document.getElementById('bh-sr-count');
    if (countEl) countEl.textContent = String(this.slotRequests.length);
    if (!listEl) return;

    if (this.slotRequests.length === 0) {
      listEl.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 16px; font-size: 11.5px;">Queue empty — Viewers type <code style="color:#c084fc;">!sr &lt;slot&gt;</code> in Kick chat or add above!</div>`;
      return;
    }

    listEl.innerHTML = '';
    const esc = (x) => this.escapeHTML(x);

    this.slotRequests.forEach((req, idx) => {
      const userHandle = req.user || req.caller || '@Viewer';
      const canon = window.SlotResolver ? window.SlotResolver.resolve(req.name) : null;
      const thumbUrl = req.img || req.image || (canon && (canon.img || canon.image)) || '';

      const item = document.createElement('div');
      item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; padding: 6px 10px; font-size: 12px;';
      item.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;">
          <span style="color: var(--text-dim); font-size: 10px; font-weight: 800;">#${idx + 1}</span>
          ${thumbUrl ? `<img src="${esc(thumbUrl)}" alt="" style="width: 26px; height: 34px; aspect-ratio: 180/236; border-radius: 4px; object-fit: contain; background: #070a12; border: 1px solid rgba(255,255,255,0.15); flex-shrink: 0;" />` : ''}
          <div style="min-width: 0; flex: 1;">
            <div style="font-weight: 800; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${esc(req.name)}</div>
            <div style="font-size: 10.5px; color: var(--gold); font-weight: 700;">${esc(userHandle)} <span style="color: var(--text-dim);">· ${esc(req.provider || 'Slot')}</span></div>
          </div>
        </div>
        <div style="display: flex; gap: 4px; flex-shrink: 0;">
          <button type="button" class="btn-chat-toggle" data-bh-req-add="${idx}" style="padding: 3px 7px; font-size: 10px; border-color: rgba(83,252,24,0.45); color: #53fc18; white-space: nowrap;">
            + Hunt
          </button>
          <button type="button" class="btn-chat-toggle" data-bh-req-rm="${idx}" style="padding: 3px 7px; font-size: 10px; border-color: rgba(239,68,68,0.45); color: #ef4444;">
            ✕
          </button>
        </div>
      `;
      const addBtn = item.querySelector('[data-bh-req-add]');
      if (addBtn) addBtn.addEventListener('click', () => this.addRequestToHunt(idx));
      const rmBtn = item.querySelector('[data-bh-req-rm]');
      if (rmBtn) rmBtn.addEventListener('click', () => this.removeSlotRequest(idx));
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
      caller: req.user || req.caller || '@Viewer',
      image: req.img || req.image
    });
    this.slotRequests.splice(idx, 1);
    this.save();
    this.renderSlotRequests();
    this.drawSlotWheel(this.wheelAngle);
    this.broadcastSlotRequestsOverlay({ type: 'SYNC_QUEUE' });
    if (window.sonner) {
      window.sonner.toast({
        title: 'Slot Added to Hunt! 🎰',
        message: `${req.name} (${req.user || req.caller || '@Viewer'}) added to Bonus Hunt!`,
        type: 'green'
      });
    }
  }

  showSlotRequestWinnerCard(winner) {
    if (!winner) return;
    this.lastSrWinner = winner;
    const userHandle = String(winner.user || winner.caller || '@Viewer').trim();
    const cleanUser = userHandle.replace(/^@/, '') || 'Viewer';
    const canon = window.SlotResolver
      ? window.SlotResolver.resolve(winner.name)
      : { name: winner.name, provider: winner.provider || 'Official Slot', img: winner.img || winner.image || '' };

    const statusEl = document.getElementById('cp-sr-winner-status');
    const userEl = document.getElementById('cp-sr-winner-user');
    const avatarEl = document.getElementById('cp-sr-winner-avatar');
    const slotImgEl = document.getElementById('cp-sr-winner-slot-img');
    const providerEl = document.getElementById('cp-sr-winner-provider');
    const slotNameEl = document.getElementById('cp-sr-winner-slot-name');

    if (statusEl) {
      statusEl.textContent = '🎉 WINNER SELECTED';
      statusEl.style.color = '#53fc18';
    }
    if (userEl) userEl.textContent = `@${cleanUser}`;
    if (providerEl) providerEl.textContent = canon.provider || winner.provider || 'OFFICIAL SLOT';
    if (slotNameEl) slotNameEl.textContent = canon.name || winner.name;

    if (slotImgEl) {
      const slotArt = canon.img || canon.image || winner.img || winner.image || '';
      if (slotArt) slotImgEl.src = slotArt;
    }

    if (avatarEl) {
      const fallbackAvatar = typeof window.getDeterministicAvatarDataUri === 'function'
        ? window.getDeterministicAvatarDataUri(cleanUser)
        : avatarEl.src;
      avatarEl.onerror = () => {
        avatarEl.onerror = null;
        avatarEl.src = fallbackAvatar;
      };
      avatarEl.src = fallbackAvatar;
      fetch(`/api/kick/user/${encodeURIComponent(cleanUser)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          const remotePic = data?.profile_pic || data?.user?.profile_pic;
          if (remotePic && typeof remotePic === 'string') {
            avatarEl.src = remotePic;
          }
        })
        .catch(() => {});
    }
  }

  initSlotRequestsForm() {
    const form = document.getElementById('bh-sr-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('bh-sr-input');
        const userInput = document.getElementById('bh-sr-user-input');
        const val = input ? input.value.trim() : '';
        if (!val) return;

        const manualUser = userInput && userInput.value.trim()
          ? userInput.value.trim()
          : (window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '@KickViewer';

        this.addSlotRequest(manualUser, val, false);
        if (input) input.value = '';
      });
    }

    const clearBtn = document.getElementById('bh-sr-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearSlotRequests());
    }

    const addWinnerHuntBtn = document.getElementById('cp-sr-winner-add-hunt');
    if (addWinnerHuntBtn) {
      addWinnerHuntBtn.addEventListener('click', () => {
        if (!this.lastSrWinner) return;
        const w = this.lastSrWinner;
        this.addSlotToHunt({
          id: w.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: w.name,
          provider: w.provider || 'Provider',
          bet: 2.0,
          payout: 0,
          caller: w.user || w.caller || '@Viewer',
          image: w.img || w.image
        });
        if (window.sonner) {
          window.sonner.toast({
            title: 'Winner Added to Bonus Hunt! 💎',
            message: `${w.name} (${w.user || w.caller}) added to active Bonus Hunt!`,
            type: 'green'
          });
        }
      });
    }

    const spinBtn = document.getElementById('bh-btn-spin-wheel');
    if (spinBtn) {
      spinBtn.addEventListener('click', () => this.spinSlotRequestsWheel());
    }

    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#control-panel') {
        this.renderSlotRequests();
        this.drawSlotWheel(this.wheelAngle);
      }
    });
    document.addEventListener('click', (ev) => {
      const btn = ev.target && ev.target.closest ? ev.target.closest('[data-cp-module="slotrequests"], [data-target="#control-panel"]') : null;
      if (btn) {
        setTimeout(() => {
          this.renderSlotRequests();
          this.drawSlotWheel(this.wheelAngle);
        }, 40);
      }
    });
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

    if (this.slotRequests.length === 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.fillStyle = '#070b16';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
      ctx.stroke();

      ctx.fillStyle = '#c084fc';
      ctx.font = '900 12px "Chakra Petch", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('WAITING FOR !SR <SLOT>', cx, cy - 6);

      ctx.fillStyle = '#64748b';
      ctx.font = '700 10px "Inter", sans-serif';
      ctx.fillText('Viewers type !sr in Kick chat', cx, cy + 12);
      ctx.restore();
      return;
    }

    const items = this.slotRequests;
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

      // Draw @username + Slot Name on each wheel slice
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#06080d';
      const cleanUser = String(items[i].user || items[i].caller || 'Viewer').replace(/^@/, '').slice(0, 10);
      const cleanSlot = String(items[i].name || 'Slot').slice(0, 12);
      ctx.font = '900 10.5px "Chakra Petch", sans-serif';
      ctx.fillText(`@${cleanUser} · ${cleanSlot}`, r - 12, 4);
      ctx.restore();
    }

    // Center pin
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, 2 * Math.PI);
    ctx.fillStyle = '#0b1120';
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
          title: 'Slot Requests Wheel Empty',
          message: 'Wait for viewers to type !sr <slot> in chat or add a slot request first!',
          type: 'gold'
        });
      }
      return;
    }

    this.isSpinning = true;
    const items = [...this.slotRequests];
    const numSlices = items.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    // Pick random winning index
    const winIdx = Math.floor(Math.random() * numSlices);
    const winner = items[winIdx];

    // Broadcast spin command immediately so /overlay-slotrequests/index.html?obs=1 spins in sync!
    this.broadcastSlotRequestsOverlay({
      type: 'SPIN_WHEEL',
      winnerIndex: winIdx,
      winner,
      queue: items,
      durationMs: 4200,
      ts: Date.now()
    });

    // Pointer is at the top (-PI/2)
    const targetSliceAngle = (2 * Math.PI) - (winIdx * sliceAngle + sliceAngle / 2) - (Math.PI / 2);
    const fullSpins = (5 + Math.floor(Math.random() * 3)) * (2 * Math.PI);
    const targetAngle = fullSpins + targetSliceAngle;

    const startAngle = this.wheelAngle % (2 * Math.PI);
    const totalRotation = targetAngle - startAngle;
    const duration = 4200;
    const startTime = performance.now();
    let lastTickAngle = startAngle;

    const animateWheel = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      this.wheelAngle = startAngle + totalRotation * easeOut;

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
        this.showSlotRequestWinnerCard(winner);

        if (typeof window.announceStreamWinner === 'function') {
          const cleanSrUser = String(winner.user || winner.caller || 'Viewer').replace(/^@/, '');
          window.announceStreamWinner({
            eventType: 'picked',
            tier: 'partial',
            type: 'SR_WHEEL_PICKED',
            category: 'SLOT REQUESTS ROULETTE · !SR WINNER',
            ribbon: '🎰 !SR SLOT REQUEST PICKED',
            icon: '🎰',
            username: cleanSrUser,
            slotName: winner.name,
            slotImg: winner.img || winner.image || '',
            statValue: winner.provider || 'SLOT REQUEST',
            prize: `Picked on !sr Wheel (${winner.name})!`,
            chatMessage: `@${cleanSrUser} has been picked on roulette with (${winner.name})`
          });
        }

        // Remove selected winner from active pool so next spin picks a fresh request & frees 1 slot for that viewer!
        const winUserClean = String(winner.user || winner.caller || '').trim().replace(/^@+/, '').toLowerCase();
        const winNameClean = String(winner.name || '').trim().toLowerCase();
        const removeIdx = this.slotRequests.findIndex(
          (r) => String(r.name || '').trim().toLowerCase() === winNameClean &&
                 String(r.user || r.caller || '').trim().replace(/^@+/, '').toLowerCase() === winUserClean
        );
        if (removeIdx >= 0) {
          this.slotRequests.splice(removeIdx, 1);
          this.save();
          this.renderSlotRequests();
          this.drawSlotWheel(this.wheelAngle);
          this.broadcastSlotRequestsOverlay({ type: 'SYNC_QUEUE' });
          if (window.diggityIntelSuite && typeof window.diggityIntelSuite.updateVaultSrQuotaUI === 'function') {
            window.diggityIntelSuite.updateVaultSrQuotaUI();
          }
        }

        if (window.sonner) {
          window.sonner.toast({
            title: `🎰 !SR WINNER: ${winner.user || winner.caller} — ${winner.name}!`,
            message: `Winner Avatar + @Username + Official Slot Card revealed on stream!`,
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
