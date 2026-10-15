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
        image: 'site/images/slots/wanted-dead-or-a-wild.svg' 
      },
      { 
        id: 'gates-of-olympus', 
        name: 'Gates of Olympus 1000', 
        provider: 'Pragmatic Play', 
        bet: 2.0, 
        payout: 312.00, 
        caller: '@SlotKing21', 
        image: 'site/images/slots/gates-of-olympus.svg' 
      },
      { 
        id: 'le-bandit', 
        name: 'Le Bandit', 
        provider: 'Hacksaw Gaming', 
        bet: 2.0, 
        payout: 74.00, 
        caller: '@DiggityFan', 
        image: 'site/images/slots/le-bandit.svg' 
      },
      { 
        id: 'san-quentin-xways', 
        name: 'San Quentin xWays', 
        provider: 'Nolimit City', 
        bet: 2.0, 
        payout: 0, 
        caller: '@AgusKick', 
        image: 'site/images/slots/san-quentin-xways.svg' 
      },
      { 
        id: 'sweet-bonanza', 
        name: 'Sweet Bonanza 1000', 
        provider: 'Pragmatic Play', 
        bet: 2.0, 
        payout: 0, 
        caller: '@Valen99', 
        image: 'site/images/slots/sweet-bonanza.svg' 
      },
      { 
        id: 'ghost-rush', 
        name: 'Ghost Rush', 
        provider: 'Stake Originals', 
        bet: 2.0, 
        payout: 0, 
        caller: '@StakeHunter', 
        image: 'site/images/slots/ghost-rush.svg' 
      }
    ];

    const saved = localStorage.getItem('hunthub_hunt_slots');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
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
    if (!slot.image) {
      slot.image = `site/images/slots/${slot.id}.svg`;
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
      let imgSrc = s.image;
      if (!imgSrc || imgSrc.includes('mediumrare')) {
        imgSrc = `site/images/slots/${s.id}.svg`;
      }
      if (window.HUNTHUB_CURATED_SLOTS) {
        const found = window.HUNTHUB_CURATED_SLOTS.find(
          cs => cs.id === s.id || cs.name.toLowerCase() === s.name.toLowerCase()
        );
        if (found && found.image) imgSrc = found.image;
      }
      if (!imgSrc) imgSrc = `site/images/slots/${s.id}.svg`;

      tr.className = isOpened ? 'bh-row-opened' : 'bh-row-pending';
      tr.innerHTML = `
        <td class="bh-td-num">#${idx + 1}</td>
        <td class="bh-td-slot">
          <div class="bh-slot-info">
            <img class="bh-slot-thumb" src="${imgSrc}" alt="${s.name}" onerror="this.onerror=null; this.src='site/images/slots/' + (s.id || 'wanted-dead-or-a-wild') + '.svg';">
            <div>
              <span class="bh-slot-name">${s.name}</span>
              <span class="bh-slot-provider">${s.provider || 'Provider'}</span>
            </div>
          </div>
        </td>
        <td class="bh-td-bet">$${(s.bet || 2).toFixed(2)}</td>
        <td class="bh-td-payout">${isOpened ? `$${s.payout.toFixed(2)}` : '<span class="status-pending" style="color: var(--text-dim);">Pending</span>'}</td>
        <td class="bh-td-mult"><span class="bh-mult-pill ${isOpened ? (parseFloat(mult) >= 100 ? 'super' : 'normal') : ''}">${mult}</span></td>
        <td class="bh-td-caller">${s.caller || '—'}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderGuesses() {
    const listEl = document.getElementById('bh-guesses-list');
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

    sorted.forEach(g => {
      const item = document.createElement('div');
      item.className = 'bh-guess-item';
      item.innerHTML = `
        <div class="bh-guess-user">
          <span class="bh-user-badge">VIP</span>
          <span class="bh-user-name">${g.user}</span>
        </div>
        <div class="bh-guess-val">$${g.guess.toLocaleString()}</div>
      `;
      listEl.appendChild(item);
    });
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
      const valEl = document.getElementById('bh-guess-input-val');
      const guessVal = valEl ? parseFloat(valEl.value) : 0;

      if (!guessVal || guessVal <= 0) {
        alert('Please enter a valid predicted payout amount in USD.');
        return;
      }

      const activeUser = (window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '@Viewer';

      const existingIdx = this.guesses.findIndex(g => g.user.toLowerCase() === activeUser.toLowerCase());
      const newEntry = {
        user: activeUser,
        guess: guessVal,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (existingIdx >= 0) {
        this.guesses[existingIdx] = newEntry;
      } else {
        this.guesses.push(newEntry);
      }

      this.save();
      this.renderGuesses();
      if (window.soundEngine) window.soundEngine.playCoins();

      if (valEl) valEl.value = '';
      alert(`Prediction of $${guessVal.toLocaleString()} recorded successfully for ${activeUser}!`);
    });
  }
}

window.bonusHunt = new BonusHuntController();
