/**
 * HuntHub — Community Bonus Hunt Live Tracker & Viewer Predictions
 * bonushunt.gg style metrics: Total Cost, Break-even Target, Req Avg, and Guesses Leaderboard.
 * 100% English UI, verified local slot images.
 */

class BonusHuntController {
  constructor() {
    this.isActive = localStorage.getItem('hunthub_hunt_active') === 'true';
    this.huntId = 'hunt_1';
    this.huntName = 'Community Bonus Hunt #12';
    this.startBalance = 1500;
    this.slots = this.isActive ? this.loadInitialHuntSlots() : [];
    this.guesses = this.isActive ? this.loadInitialGuesses() : [];
  }

  loadInitialHuntSlots() {
    const verifiedDefaults = [
      { 
        id: 'wanted-dead-or-a-wild', 
        name: 'Wanted Dead or a Wild', 
        provider: 'Hacksaw Gaming', 
        bet: 2.0, 
        payout: 184.50, 
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
        bet: 2.0, 
        payout: 74.00, 
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
        id: 'ghost-rush', 
        name: 'Ghost Rush', 
        provider: 'Paperclip Gaming', 
        bet: 2.0, 
        payout: 0, 
        caller: '@StakeHunter', 
        image: 'https://mediumrare.imgix.net/742a1d7958a9ffa215e19cc72c684abe9412f71fcf426b57909b5b817f9cd9d4?w=360&auto=format' 
      }
    ];

    const saved = localStorage.getItem('hunthub_hunt_slots');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(s => {
            if (window.SlotResolver && s && s.name) {
              const canon = window.SlotResolver.resolve(s.name);
              if (canon && canon.image) {
                s.image = canon.image;
                if (!s.provider || s.provider === 'Provider') s.provider = canon.provider;
              }
            }
            return s;
          });
        }
      } catch (e) {}
    }

    return verifiedDefaults;
  }

  loadInitialGuesses() {
    const saved = localStorage.getItem('hunthub_hunt_guesses');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }

    return [
      { user: '@NachoGamer', guess: 1620, time: '14:22' },
      { user: '@SlotKing21', guess: 1840, time: '14:25' },
      { user: '@KickViewer01', guess: 1450, time: '14:27' },
      { user: '@CryptoSpin', guess: 2100, time: '14:31' }
    ];
  }

  init() {
    this.renderMetrics();
    this.renderSlotTable();
    this.renderGuesses();
    this.initGuessForm();
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

  save() {
    localStorage.setItem('hunthub_hunt_slots', JSON.stringify(this.slots));
    localStorage.setItem('hunthub_hunt_guesses', JSON.stringify(this.guesses));
  }

  renderMetrics() {
    const costEl = document.getElementById('bh-metric-cost');
    const paidEl = document.getElementById('bh-metric-paid');
    const openedEl = document.getElementById('bh-metric-opened');
    const reqAvgEl = document.getElementById('bh-metric-reqavg');

    if (!this.isActive || this.slots.length === 0) {
      if (costEl) costEl.textContent = '$0.00';
      if (paidEl) paidEl.textContent = '$0.00';
      if (openedEl) openedEl.textContent = '0 / 0';
      if (reqAvgEl) reqAvgEl.textContent = '—';
      return;
    }

    const totalCost = this.slots.length * 100 * 2.0;
    const totalPaid = this.slots.reduce((sum, s) => sum + (s.payout || 0), 0);
    const openedCount = this.slots.filter(s => s.payout > 0).length;
    const remainingCount = this.slots.length - openedCount;

    const remainingToBreakEven = Math.max(0, totalCost - totalPaid);
    const remainingBetPool = remainingCount * 2.0;
    const reqAvg = remainingBetPool > 0 ? (remainingToBreakEven / remainingBetPool).toFixed(1) : '0.0';

    if (costEl) costEl.textContent = `$${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (paidEl) paidEl.textContent = `$${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (openedEl) openedEl.textContent = `${openedCount} / ${this.slots.length}`;
    if (reqAvgEl) reqAvgEl.textContent = `${reqAvg}x`;
  }

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
      const canon = window.SlotResolver ? window.SlotResolver.resolve(s.name || s) : {
        name: s.name,
        provider: s.provider || 'Provider',
        image: s.image || 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format'
      };
      const imgSrc = canon.image || (window.SlotResolver ? window.SlotResolver.resolveSlotImageUrl(s) : s.image);
      const esc = window.escapeHTML || (x => x);
      const slotName = esc(canon.name || s.name || 'Slot');
      const slotProvider = esc(canon.provider || s.provider || 'Provider');
      const callerName = esc(s.caller || '—');
      const fallbackSvg = (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function')
        ? window.SlotResolver.generateDataUriCard(canon.name || s.name || 'Slot', canon.provider || s.provider || 'Casino')
        : 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';

      tr.className = isOpened ? 'bh-row-opened' : 'bh-row-pending';
      tr.innerHTML = `
        <td class="bh-td-num">#${idx + 1}</td>
        <td class="bh-td-slot">
          <div class="bh-slot-info">
            <img class="bh-slot-thumb" src="${imgSrc}" alt="" loading="lazy" onerror="this.onerror=null; this.src='${fallbackSvg}';">
            <div>
              <span class="bh-slot-name">${slotName}</span>
              <span class="bh-slot-provider">${slotProvider}</span>
            </div>
          </div>
        </td>
        <td class="bh-td-bet">$${(s.bet || 2).toFixed(2)}</td>
        <td class="bh-td-payout">${isOpened ? `$${s.payout.toFixed(2)}` : '<span class="status-pending" style="color: var(--text-dim);">Pending</span>'}</td>
        <td class="bh-td-mult"><span class="bh-mult-pill ${isOpened ? (parseFloat(mult) >= 100 ? 'super' : 'normal') : ''}">${mult}</span></td>
        <td class="bh-td-caller">${callerName}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderGuesses() {
    const listEl = document.getElementById('bh-guesses-list');
    const cpCountEl = document.getElementById('cp-bh-guess-count');
    if (cpCountEl) cpCountEl.textContent = String(this.guesses.length);
    if (!listEl) return;

    if (!this.isActive || this.guesses.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 32px 14px; color: var(--text-dim); font-size: 13px;">
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
      item.innerHTML = `
        <div class="bh-guess-user">
          <span class="bh-user-badge">VIP</span>
          <span class="bh-user-name">${esc(g.user)}</span>
        </div>
        <div class="bh-guess-val">$${g.guess.toLocaleString()}</div>
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

  updateLinkedUserBadge() {
    const badge = document.getElementById('bh-guess-active-user');
    if (!badge) return;
    const user = (window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '@Viewer';
    badge.textContent = user;
  }

  initGuessForm() {
    this.updateLinkedUserBadge();
    window.addEventListener('storage', () => this.updateLinkedUserBadge());
    window.addEventListener('hunthub:auth-updated', () => this.updateLinkedUserBadge());

    const form = document.getElementById('bh-guess-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const valEl = document.getElementById('bh-input-guess') || document.getElementById('bh-guess-input-val');
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
      if (window.soundEngine) window.soundEngine.playCoins();

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
}

window.bonusHunt = new BonusHuntController();
window.bonusHuntTracker = window.bonusHunt;

