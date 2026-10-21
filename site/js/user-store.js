/**
 * HuntHub — User Profile, Stake Bet ID TOTP Verifier & Monthly Kick Leaderboard
 * 100% English, zero dependencies, client-side cryptographic challenge.
 */

// Luxury Dark-Casino Laser-Neon Alert & Confirmation Modal (Replaces native window.alert / window.confirm)
window.showCasinoModal = function(opts = {}) {
  return new Promise((resolve) => {
    const existing = document.getElementById('hunthub-casino-modal-backdrop');
    if (existing) existing.remove();

    const tone = opts.tone || 'gold'; // 'gold' | 'green' | 'danger' | 'cyan'
    const isConfirm = Boolean(opts.isConfirm);
    const title = String(opts.title || (isConfirm ? 'CONFIRM ACTION' : 'STORE & REWARDS NOTICE'));
    const message = String(opts.message || '');
    const badge = String(opts.badge || (tone === 'danger' ? '⚠️ ACTION BLOCKED' : (tone === 'green' ? '✓ REWARD CONFIRMED' : '💎 DIGGITY REWARDS VAULT')));
    const confirmText = String(opts.confirmText || (isConfirm ? '⚡ CONFIRM REDEEM' : 'GOT IT ✓'));
    const cancelText = String(opts.cancelText || 'CANCEL');

    if (window.soundEngine) {
      try {
        if (tone === 'danger' && typeof window.soundEngine.playBust === 'function') {
          window.soundEngine.playBust();
        } else if (typeof window.soundEngine.playChip === 'function') {
          window.soundEngine.playChip();
        }
      } catch (_) {}
    }

    const backdrop = document.createElement('div');
    backdrop.id = 'hunthub-casino-modal-backdrop';
    backdrop.className = `casino-laser-modal-backdrop tone-${tone}`;
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');

    const esc = (s) => (window.escapeHTML ? window.escapeHTML(s) : String(s).replace(/[&<>"']/g, ''));

    backdrop.innerHTML = `
      <div class="casino-laser-modal-card tone-${esc(tone)}">
        <div class="casino-laser-modal-glow" aria-hidden="true"></div>
        <div class="casino-laser-modal-top-bar">
          <span class="casino-laser-modal-badge">${esc(badge)}</span>
          <button type="button" class="casino-laser-modal-close" id="casino-modal-close-x" aria-label="Close">✕</button>
        </div>
        <h3 class="casino-laser-modal-title">${esc(title)}</h3>
        <p class="casino-laser-modal-message">${esc(message)}</p>
        <div class="casino-laser-modal-actions">
          ${isConfirm ? `<button type="button" class="casino-relief-btn secondary" id="casino-modal-cancel-btn">${esc(cancelText)}</button>` : ''}
          <button type="button" class="casino-relief-btn primary tone-${esc(tone)}" id="casino-modal-confirm-btn">${esc(confirmText)}</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const closeWith = (result) => {
      window.removeEventListener('keydown', onKey);
      if (backdrop && backdrop.parentNode) {
        backdrop.parentNode.removeChild(backdrop);
      }
      resolve(result);
    };

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeWith(false);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        closeWith(true);
      }
    };
    window.addEventListener('keydown', onKey);

    const confirmBtn = document.getElementById('casino-modal-confirm-btn');
    const cancelBtn = document.getElementById('casino-modal-cancel-btn');
    const closeX = document.getElementById('casino-modal-close-x');

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => closeWith(true));
      setTimeout(() => confirmBtn.focus(), 30);
    }
    if (cancelBtn) cancelBtn.addEventListener('click', () => closeWith(false));
    if (closeX) closeX.addEventListener('click', () => closeWith(false));
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeWith(false);
    });
  });
};

window.showCasinoAlert = function(title, message, tone = 'danger', badge = '') {
  return window.showCasinoModal({
    title,
    message,
    tone,
    badge,
    isConfirm: false,
    confirmText: 'UNDERSTOOD ⚡'
  });
};

window.showCasinoConfirm = function(title, message, confirmText = '⚡ CONFIRM REDEEM', cancelText = 'CANCEL', tone = 'gold') {
  return window.showCasinoModal({
    title,
    message,
    tone,
    badge: '🎁 CONFIRM STORE REDEMPTION',
    isConfirm: true,
    confirmText,
    cancelText
  });
};

class UserStoreController {
  constructor() {
    this.username = localStorage.getItem('hunthub_kick_username') || '';
    this.isLoggedIn = !!this.username;
    this.isSub = localStorage.getItem('hunthub_is_sub') === 'true';
    this.avatar = localStorage.getItem('hunthub_avatar') || '🤠';
    this.avatarType = localStorage.getItem('hunthub_avatar_type') || 'emoji'; // 'emoji' or 'img'

    // Stake Affiliate (Preserved in backlog)
    this.stakeUsername = localStorage.getItem('hunthub_stake_user') || '';
    this.stakeVerified = localStorage.getItem('hunthub_stake_verified') === 'true';

    // Socials
    this.xHandle = localStorage.getItem('hunthub_x_handle') || '';
    this.igHandle = localStorage.getItem('hunthub_ig_handle') || '';

    // Crypto Payout Addresses
    this.cryptoLTC = localStorage.getItem('hunthub_crypto_ltc') || '';
    this.cryptoBTC = localStorage.getItem('hunthub_crypto_btc') || '';
    this.cryptoETH = localStorage.getItem('hunthub_crypto_eth') || '';
    this.cryptoUSDC = localStorage.getItem('hunthub_crypto_usdc') || '';
    this.cryptoSOL = localStorage.getItem('hunthub_crypto_sol') || '';

    // Rewards & Store
    this.raffleTickets = parseInt(localStorage.getItem('hunthub_raffle_tickets') || '0', 10);

    // Dynamic Stake Limbo Target Multiplier Challenge (10 minutes = 600s, Integer OTP 10000 - 999999)
    this.totpDuration = 600;
    this.totpMultiplier = 994932;
    this.totpExpiresAt = 0;
    this.totpInterval = null;

    // Stake Leaderboard Participants Data (Starts 100% empty — populated only by real verified referrals under code: diggity)
    this.leaderboardData = [];
    try {
      const savedLb = JSON.parse(localStorage.getItem('hunthub_stake_leaderboard') || '[]');
      const demoNames = new Set([
        'gs8***', 'stakenacho', 'zeusmax', 'stakevalen', 'hunterpro', 'cryptoace',
        'stakeagus', 'diggityfan01', 'luckymati', 'plinkoking', 'sweetbonanza',
        'gatesofx', 'wanteddead', 'sugarrush77', 'kickhighroll', 'gamerstake88',
        'nachogamer', 'slotking21'
      ]);
      if (Array.isArray(savedLb)) {
        this.leaderboardData = savedLb.filter(u => {
          const cu = String(u.casinoUser || u.stakeUser || '').toLowerCase().trim();
          const ku = String(u.kickUser || '').toLowerCase().replace(/^@/, '').trim();
          return cu && !demoNames.has(cu) && !demoNames.has(ku);
        });
      }
    } catch (_) {
      this.leaderboardData = [];
    }
    this.lastUserInteractionTs = Date.now();
    this.lastVerifiedKickChatTs = Number(localStorage.getItem('hunthub_last_kick_chat_ts') || '0');
    this.globalMonthlyLeaderboard = null;
    this.globalViewerProfile = null;
  }

  getAuthHeaders(includeJson = true) {
    const headers = {};
    if (includeJson) headers['Content-Type'] = 'application/json';
    const userToken = localStorage.getItem('hunthub_user_token') || '';
    const cleanUser = (this.username || localStorage.getItem('hunthub_kick_username') || '').trim().replace(/^@+/, '');
    const cleanLower = cleanUser.toLowerCase();
    const isAdminUser = cleanLower === 'diggitybets' || cleanLower === 'diggity_bets' || cleanLower === 'tarkansky' || cleanLower === 'diggitybot' || cleanLower === 'diggity_bot';
    const adminToken = isAdminUser ? (localStorage.getItem('hunthub_admin_token') || '') : '';
    if (userToken) headers['x-user-token'] = userToken;
    if (adminToken) headers['x-admin-token'] = adminToken;
    if (cleanUser) headers['x-admin-user'] = cleanUser;
    if (window.antiFraud && typeof window.antiFraud.getDeviceHash === 'function') {
      const dh = window.antiFraud.getDeviceHash();
      if (dh) headers['x-device-fingerprint'] = dh;
    }
    return headers;
  }

  init() {
    if (this._initialized) return;
    this._initialized = true;
    if (!localStorage.getItem('hunthub_leaderboards_clean_v1')) {
      this.leaderboardData = [];
      localStorage.removeItem('hunthub_stake_leaderboard');
      localStorage.removeItem('hunthub_historical_leaderboard');
      localStorage.setItem('hunthub_leaderboards_clean_v1', 'true');
    }
    if (!localStorage.getItem('hunthub_offline_points_purged_v1')) {
      localStorage.setItem('hunthub_balance', '0');
      localStorage.setItem('hunthub_offline_points_purged_v1', 'true');
      if (window.houseGames) {
        window.houseGames.balance = 0;
        window.houseGames.renderBalance();
      }
    }
    const cleanInitUser = (this.username || localStorage.getItem('hunthub_kick_username') || '').trim().toLowerCase().replace(/^@+/, '');
    if (cleanInitUser === 'tarkansky' && !localStorage.getItem('hunthub_tarkansky_reset_v2')) {
      localStorage.setItem('hunthub_balance', '0');
      localStorage.setItem('hunthub_user_monthly_dig', '0');
      localStorage.setItem('hunthub_user_career_dig', '0');
      localStorage.removeItem('hunthub_historical_leaderboard');
      localStorage.setItem('hunthub_tarkansky_reset_v2', 'true');
      if (window.houseGames) {
        window.houseGames.balance = 0;
        window.houseGames.renderBalance();
      }
    }
    if (this.username && (this.username.startsWith('@KickUser_') || this.username.startsWith('KickUser_'))) {
      setTimeout(() => {
        if (window.oauthEngine) {
          window.oauthEngine.syncKickProfile('diggitybets');
        }
      }, 150);
    }
    const markInteraction = () => { this.lastUserInteractionTs = Date.now(); };
    ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach((evtName) => {
      window.addEventListener(evtName, markInteraction, { passive: true });
    });
    this.ensureMonthlyLeaderboardCycle();
    this.initStoreStockState();
    this.updateUserUI();
    this.syncKickProfileAvatar(false);
    this.bindAuthButtons();
    this.bindProfileControls();
    this.bindStakeTotpVerification();
    this.bindStoreRedemptions();
    this.renderLeaderboard();
    this.renderHistoricalLeaderboard();
    this.bindLeaderboardTabs();
    this.startTotpTimer();
    this.startWatchHeartbeat();
    this.syncStoreStockFromServer();
    this.syncGlobalLeaderboardAndUser();
    this.startGlobalLeaderboardSync();
  }

  startGlobalLeaderboardSync() {
    if (this.globalLeaderboardSyncInterval) clearInterval(this.globalLeaderboardSyncInterval);
    this.globalLeaderboardSyncInterval = setInterval(() => {
      if (document.hidden) return;
      this.syncGlobalLeaderboardAndUser();
    }, 15_000);
    window.addEventListener('hashchange', () => {
      if (['#leaderboard', '#store', '#profile', '#house-games'].includes(window.location.hash)) {
        this.syncGlobalLeaderboardAndUser();
      }
    });
  }

  async syncGlobalLeaderboardAndUser(extraPayload = {}) {
    if (typeof fetch !== 'function') return null;
    try {
      const reqStartTs = Date.now();
      const cleanUser = (this.username || localStorage.getItem('hunthub_kick_username') || '').trim().replace(/^@+/, '');
      let res = null;

      if (this.isLoggedIn && cleanUser && !cleanUser.toLowerCase().startsWith('kickuser_')) {
        const localBal = window.houseGames
          ? (Number(window.houseGames.balance) || 0)
          : (parseInt(localStorage.getItem('hunthub_balance') || '0', 10) || 0);
        const localMonthly = Math.max(
          parseInt(localStorage.getItem('hunthub_user_monthly_dig') || '0', 10) || 0,
          parseInt(localStorage.getItem('hunthub_user_career_dig') || '0', 10) || 0,
          localBal
        );
        const avatarToSend = (this.avatarType === 'img' && this.avatar && /^https?:\/\//i.test(this.avatar)) ? this.avatar : '';
        res = await fetch('/api/leaderboard/sync-user', {
          method: 'POST',
          headers: this.getAuthHeaders(true),
          body: JSON.stringify({
            username: cleanUser,
            avatar: avatarToSend,
            isSub: Boolean(this.isSub),
            localBalance: localBal,
            localMonthlyDig: localMonthly,
            ...extraPayload
          })
        });
      } else {
        const q = cleanUser ? `?username=${encodeURIComponent(cleanUser)}` : '';
        res = await fetch(`/api/leaderboard/monthly${q}`, { cache: 'no-store' });
      }

      if (!res || !res.ok) return null;
      const data = await res.json();

      if (data.userToken) {
        localStorage.setItem('hunthub_user_token', data.userToken);
      }

      if (data.viewerProfile) {
        this.globalViewerProfile = data.viewerProfile;
        const todayKey = new Date().toISOString().slice(0, 10);
        let localClaimedToday = false;
        try {
          const streakSaved = JSON.parse(localStorage.getItem(`hunthub_daily_streak_v2_${cleanUser.toLowerCase()}`) || 'null');
          localClaimedToday = Boolean(streakSaved && streakSaved.lastClaimDate === todayKey);
        } catch (_) {}
        const serverClaimedToday = String(data.viewerProfile.lastStreakClaimDate || '') === todayKey;
        const claimHappenedDuringReq = Boolean(window._lastStreakClaimTs && window._lastStreakClaimTs > reqStartTs);

        if (localClaimedToday && !serverClaimedToday && !extraPayload.claimStreak && !this._retriedStreakSyncToday) {
          this._retriedStreakSyncToday = true;
          this.syncGlobalLeaderboardAndUser({ streakBonusDelta: 50, claimStreak: true });
        }

        const shouldApplyServerBalance = !claimHappenedDuringReq && (!localClaimedToday || serverClaimedToday);
        if (shouldApplyServerBalance && typeof data.viewerProfile.pointsBalance === 'number' && Number.isFinite(data.viewerProfile.pointsBalance)) {
          localStorage.setItem('hunthub_balance', String(data.viewerProfile.pointsBalance));
          if (window.houseGames) {
            const prevBal = window.houseGames.balance;
            window.houseGames.balance = data.viewerProfile.pointsBalance;
            window.houseGames.renderBalance(prevBal);
          }
        }
        if (shouldApplyServerBalance && typeof data.viewerProfile.monthlyPoints === 'number' && Number.isFinite(data.viewerProfile.monthlyPoints)) {
          localStorage.setItem('hunthub_user_monthly_dig', String(data.viewerProfile.monthlyPoints));
          localStorage.setItem('hunthub_user_career_dig', String(data.viewerProfile.monthlyPoints));
        }
        if (data.viewerProfile.stakeVerified && !this.stakeVerified) {
          this.stakeVerified = true;
          localStorage.setItem('hunthub_stake_verified', 'true');
          this.updateStoreCatalogUI();
        }
        if (data.viewerProfile.avatar && localStorage.getItem('hunthub_custom_uploaded_avatar') !== 'true') {
          this.avatar = data.viewerProfile.avatar;
          this.avatarType = 'img';
          localStorage.setItem('hunthub_avatar', data.viewerProfile.avatar);
          localStorage.setItem('hunthub_avatar_type', 'img');
          this.updateAvatarUI();
        }
        if (window.diggityIntelSuite && typeof window.diggityIntelSuite.initDailyStreakVault === 'function') {
          window.diggityIntelSuite.initDailyStreakVault();
        }
      }

      if (Array.isArray(data.leaderboard)) {
        this.globalMonthlyLeaderboard = data.leaderboard;
        try {
          localStorage.setItem('hunthub_historical_leaderboard', JSON.stringify(data.leaderboard));
        } catch (_) {}
        this.renderHistoricalLeaderboard();
      }
      return data;
    } catch (_) {
      return null;
    }
  }

  syncAllPointDisplays() {
    if (window.houseGames && typeof window.houseGames.renderBalance === 'function') {
      window.houseGames.renderBalance();
    }
    this.renderHistoricalLeaderboard();
  }

  syncStateToBackend(extraPayload = {}) {
    return this.syncGlobalLeaderboardAndUser(extraPayload);
  }

  getCurrentMonthKey(date = new Date()) {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  }

  getCurrentMonthDisplayLabel(date = new Date()) {
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()} CYCLE`;
  }

  /**
   * Automatic Monthly Reset on the 1st day of every month (00:00 UTC)
   * Preserves previous month archive and resets monthly accumulated $DIG leaderboard.
   */
  ensureMonthlyLeaderboardCycle() {
    const currentMonth = this.getCurrentMonthKey();
    const savedMonth = localStorage.getItem('hunthub_kick_leaderboard_month');
    if (savedMonth && savedMonth !== currentMonth) {
      try {
        const prevData = localStorage.getItem('hunthub_historical_leaderboard') || '[]';
        localStorage.setItem(`hunthub_kick_leaderboard_archive_${savedMonth}`, prevData);
      } catch (_) {}
      localStorage.setItem('hunthub_historical_leaderboard', '[]');
      localStorage.setItem('hunthub_user_monthly_dig', '0');
      localStorage.setItem('hunthub_user_career_dig', '0');
    }
    if (savedMonth !== currentMonth) {
      localStorage.setItem('hunthub_kick_leaderboard_month', currentMonth);
    }
    const monthLabelEl = document.getElementById('kick-lb-month-label');
    if (monthLabelEl) {
      monthLabelEl.textContent = this.getCurrentMonthDisplayLabel();
    }
  }

  recordVerifiedKickChatActivity(sender, content) {
    if (!sender) return;
    this.ensureMonthlyLeaderboardCycle();
    const cleanSender = String(sender).trim().replace(/^@/, '');
    if (this.isLoggedIn && this.username) {
      const cleanSelf = String(this.username).trim().replace(/^@/, '').toLowerCase();
      if (cleanSender.toLowerCase() === cleanSelf && String(content || '').trim().length > 0) {
        this.lastVerifiedKickChatTs = Date.now();
        this.lastUserInteractionTs = Date.now();
        localStorage.setItem('hunthub_last_kick_chat_ts', String(this.lastVerifiedKickChatTs));
      }
    }
    // Real Kick chat activity awards points ONLY when the stream is LIVE!
    if (window.hunthubStreamLive === true) {
      this.awardChatterHistoricalPoints(cleanSender, 5);
    }
  }

  awardChatterHistoricalPoints(username, pts = 10) {
    const numPts = Number(pts) || 0;
    if (!username || numPts <= 0) return; // Strictly monotonic cumulative monthly $DIG (spending in Store never subtracts)
    const rawLower = String(username).trim().replace(/^@+/, '').toLowerCase();
    const excludedUsers = new Set(['diggitybets', 'diggity_bets', 'diggitybot', 'diggity_bot', 'hunthubbot', 'botrix', 'kickbot', 'nightbot', 'streamelements']);
    if (!rawLower || excludedUsers.has(rawLower)) return;
    this.ensureMonthlyLeaderboardCycle();
    const cleanUser = username.startsWith('@') ? username : `@${username}`;
    let list = this.getHistoricalLeaderboard();

    let found = list.find(u => (u.kickUser || '').toLowerCase() === cleanUser.toLowerCase());
    if (!found) {
      found = {
        rank: list.length + 1,
        kickUser: cleanUser,
        totalDig: numPts,
        monthlyDig: numPts,
        tourneysWon: 0,
        huntHits: 0,
        tier: 'SILVER',
        status: 'ACTIVE',
        lastActiveTs: Date.now()
      };
      list.push(found);
    } else {
      found.totalDig = (Number(found.totalDig) || 0) + numPts;
      found.monthlyDig = found.totalDig;
      found.lastActiveTs = Date.now();
    }

    if (this.username && cleanUser.toLowerCase() === (this.username.startsWith('@') ? this.username.toLowerCase() : `@${this.username.toLowerCase()}`)) {
      try {
        localStorage.setItem('hunthub_user_monthly_dig', String(found.totalDig));
        localStorage.setItem('hunthub_user_career_dig', String(found.totalDig));
      } catch (_) {}
    }

    list.sort((a, b) => b.totalDig - a.totalDig);
    list.forEach((item, idx) => { item.rank = idx + 1; });

    try {
      localStorage.setItem('hunthub_historical_leaderboard', JSON.stringify(list));
    } catch (_) {}

    this.renderHistoricalLeaderboard();

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        new BroadcastChannel('hunthub_bus').postMessage({ type: 'leaderboard_updated' });
      } catch (_) {}
    }
  }

  updateUserUI() {
    const authGuestEl = document.getElementById('auth-guest-panel');
    const authUserEl = document.getElementById('auth-user-panel');
    const userLabelEl = document.getElementById('auth-username-label');
    const subBadgeEl = document.getElementById('auth-sub-badge');

    const kickProfDisc = document.getElementById('kick-prof-disconnected-state');
    const kickProfConn = document.getElementById('kick-prof-connected-state');
    const kickProfUser = document.getElementById('kick-prof-username-display');
    const kickProfBadge = document.getElementById('kick-prof-status-badge');

    if (this.isLoggedIn) {
      if (authGuestEl) authGuestEl.style.display = 'none';
      if (authUserEl) authUserEl.style.display = 'flex';
      if (userLabelEl) userLabelEl.textContent = this.username;
      if (subBadgeEl) {
        subBadgeEl.style.display = this.isSub ? 'inline-block' : 'none';
        subBadgeEl.textContent = this.isSub ? 'SUB (2X)' : '';
      }
      if (kickProfDisc) kickProfDisc.style.display = 'none';
      if (kickProfConn) kickProfConn.style.display = 'flex';
      if (kickProfUser) kickProfUser.textContent = this.username;
      if (kickProfBadge) {
        kickProfBadge.textContent = 'CONNECTED ✓';
        kickProfBadge.style.background = 'rgba(83, 252, 24, 0.2)';
        kickProfBadge.style.borderColor = 'var(--kick-green)';
        kickProfBadge.style.color = 'var(--kick-green)';
      }
    } else {
      if (authGuestEl) authGuestEl.style.display = 'flex';
      if (authUserEl) authUserEl.style.display = 'none';
      if (kickProfDisc) kickProfDisc.style.display = 'block';
      if (kickProfConn) kickProfConn.style.display = 'none';
      if (kickProfBadge) {
        kickProfBadge.textContent = 'NOT LINKED';
        kickProfBadge.style.background = 'rgba(255, 255, 255, 0.05)';
        kickProfBadge.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        kickProfBadge.style.color = 'var(--text-dim)';
      }
    }

    // Update avatar displays
    this.updateAvatarUI();

    // Populate profile inputs
    const elStakeUser = document.getElementById('prof-input-stake-user');
    const elX = document.getElementById('prof-input-x');
    const elIg = document.getElementById('prof-input-ig');
    const elLTC = document.getElementById('prof-input-ltc');
    const elBTC = document.getElementById('prof-input-btc');
    const elETH = document.getElementById('prof-input-eth');
    const elUSDC = document.getElementById('prof-input-usdc');
    const elSOL = document.getElementById('prof-input-sol');

    if (elStakeUser) elStakeUser.value = this.stakeUsername;
    if (elX) elX.value = this.xHandle;
    if (elIg) elIg.value = this.igHandle;
    if (elLTC) elLTC.value = this.cryptoLTC;
    if (elBTC) elBTC.value = this.cryptoBTC;
    if (elETH) elETH.value = this.cryptoETH;
    if (elUSDC) elUSDC.value = this.cryptoUSDC;
    if (elSOL) elSOL.value = this.cryptoSOL;

    const topbarVerifiedBadge = document.getElementById('auth-stake-verified-badge');
    if (topbarVerifiedBadge) {
      topbarVerifiedBadge.style.display = 'none';
      topbarVerifiedBadge.textContent = '✓ VERIFIED';
    }

    const allProfileStakeBadges = document.querySelectorAll('#prof-stake-status-badge, .prof-stake-status-badge-mirror');
    allProfileStakeBadges.forEach(badge => {
      if (this.stakeVerified) {
        badge.textContent = '✓ VERIFIED';
        badge.className = 'reward-badge-pill prof-stake-status-badge-mirror verified';
        badge.style.background = 'rgba(83, 252, 24, 0.2)';
        badge.style.borderColor = 'var(--kick-green)';
        badge.style.color = 'var(--kick-green)';
      } else {
        badge.textContent = 'UNVERIFIED AFFILIATE';
        badge.className = 'reward-badge-pill prof-stake-status-badge-mirror unverified';
        badge.style.background = 'rgba(255, 42, 95, 0.2)';
        badge.style.borderColor = 'var(--crimson)';
        badge.style.color = '#ff6b8b';
      }
    });

    const tixEl = document.getElementById('raffle-user-tickets');
    if (tixEl) tixEl.textContent = this.raffleTickets;
    this.syncRaffleTicketsFromServer();

    this.updateStoreCatalogUI();

    if (this.username && window.antiFraud) {
      window.antiFraud.recordAccountUsage(this.username);
    }
    if (window.adminHub) {
      window.adminHub.checkAdminAccess();
    }

    this.syncTopbarRoleBadge();

    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('hunthub:auth-updated', { detail: { username: this.username } }));
    }
  }

  async syncRaffleTicketsFromServer() {
    if (!this.username) return;
    try {
      const res = await fetch(`/api/raffles/my-tickets?username=${encodeURIComponent(this.username)}`, {
        headers: this.getAuthHeaders(false)
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.userTicketCount === 'number') {
          this.raffleTickets = data.userTicketCount;
          localStorage.setItem('hunthub_raffle_tickets', this.raffleTickets.toString());
          const tixEl = document.getElementById('raffle-user-tickets');
          if (tixEl) tixEl.textContent = this.raffleTickets;
        }
      }
    } catch (_) {}
  }

  syncTopbarRoleBadge() {
    const roleBadgeEl = document.getElementById('auth-role-status-badge');
    const roleRowEl = document.getElementById('auth-role-under-row');
    if (!roleBadgeEl) return;

    if (!this.isLoggedIn) {
      roleBadgeEl.textContent = '';
      roleBadgeEl.style.display = 'none';
      if (roleRowEl) roleRowEl.style.display = 'none';
      return;
    }

    const cleanUser = (this.username || localStorage.getItem('hunthub_kick_username') || '')
      .trim()
      .toLowerCase()
      .replace(/^@/, '');
    const isAdmin =
      cleanUser === 'diggitybets' ||
      cleanUser === 'diggity_bets' ||
      cleanUser === 'tarkansky' ||
      cleanUser === 'diggitybot' ||
      cleanUser === 'diggity_bot';

    if (isAdmin) {
      roleBadgeEl.textContent = '👑 STREAMER';
      roleBadgeEl.style.display = 'inline-flex';
      roleBadgeEl.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffa500 100%)';
      roleBadgeEl.style.color = '#000000';
      roleBadgeEl.style.border = '1px solid #ffd700';
      roleBadgeEl.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.35)';
      if (roleRowEl) roleRowEl.style.display = 'flex';
    } else {
      localStorage.setItem('hunthub_is_admin', 'false');
      localStorage.removeItem('hunthub_streamer_admin_unlocked');
      localStorage.removeItem('hunthub_admin_token');
      roleBadgeEl.textContent = '';
      roleBadgeEl.style.display = 'none';
      if (roleRowEl) roleRowEl.style.display = 'none';
    }
  }

  updateAvatarUI() {
    const avatarEls = document.querySelectorAll('.user-avatar-display');
    const isImage = this.avatarType === 'img' && this.avatar && (/^https?:\/\//i.test(this.avatar) || /^data:image\//i.test(this.avatar));

    avatarEls.forEach(el => {
      if (isImage) {
        el.innerHTML = '';
        const img = document.createElement('img');
        img.src = this.avatar;
        img.alt = 'Avatar';
        img.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: inherit; display: block;';
        img.onerror = () => {
          el.innerHTML = (typeof window.getDeterministicAvatarSvg === 'function' && this.username)
            ? window.getDeterministicAvatarSvg(this.username, 36)
            : `<span style="font-size: 20px;">👤</span>`;
        };
        el.appendChild(img);
      } else if (typeof window.getDeterministicAvatarSvg === 'function' && this.username) {
        el.innerHTML = window.getDeterministicAvatarSvg(this.username, 36);
      } else {
        el.innerHTML = `<span style="font-size: 20px;">👤</span>`;
      }
    });

    // Update avatar source indicator in Profile
    const srcEl = document.getElementById('prof-avatar-source');
    if (srcEl) {
      const isCustom = localStorage.getItem('hunthub_custom_uploaded_avatar') === 'true';
      if (isCustom) {
        srcEl.textContent = '📁 Foto personalizada (cargada desde tu PC)';
        srcEl.style.color = '#38bdf8';
      } else if (this.isLoggedIn && isImage) {
        srcEl.textContent = '🟢 Sincronizado automáticamente con Kick.com';
        srcEl.style.color = 'var(--kick-green)';
      } else if (this.isLoggedIn) {
        srcEl.textContent = '🟢 Cuenta de Kick conectada';
        srcEl.style.color = 'var(--kick-green)';
      } else {
        srcEl.textContent = 'Conectá tu cuenta de Kick o subí un archivo de tu PC';
        srcEl.style.color = 'var(--text-dim)';
      }
    }
  }

  async syncKickProfileAvatar(force = false) {
    if (!this.username) return;
    const clean = String(this.username).trim().toLowerCase().replace(/^@/, '');
    if (!clean) return;

    // Respect custom PC upload unless user specifically requested "Usar foto de Kick.com"
    if (!force && localStorage.getItem('hunthub_custom_uploaded_avatar') === 'true') {
      return;
    }

    let remotePic = '';
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`/api/kick/user/${encodeURIComponent(clean)}`, { signal: controller.signal });
      clearTimeout(t);
      if (res.ok) {
        const data = await res.json();
        remotePic = data?.profile_pic || data?.user?.profile_pic || data?.avatarUrl || '';
      }
    } catch (_) {}

    if (!remotePic) {
      try {
        const controller2 = new AbortController();
        const t2 = setTimeout(() => controller2.abort(), 2500);
        const res2 = await fetch(`https://kick.com/api/v2/channels/${encodeURIComponent(clean)}`, { signal: controller2.signal });
        clearTimeout(t2);
        if (res2.ok) {
          const data2 = await res2.json();
          remotePic = data2?.user?.profile_pic || data2?.profile_pic || '';
        }
      } catch (_) {}
    }

    if (remotePic && typeof remotePic === 'string') {
      localStorage.setItem('hunthub_kick_avatar', remotePic);
      localStorage.removeItem('hunthub_custom_uploaded_avatar');
      this.avatar = remotePic;
      this.avatarType = 'img';
      localStorage.setItem('hunthub_avatar', remotePic);
      localStorage.setItem('hunthub_avatar_type', 'img');
      this.updateAvatarUI();
      if (force && window.sonner) {
        window.sonner.toast({
          title: 'Foto de Kick Sincronizada 🟢',
          message: 'Se cargó tu foto de perfil oficial de Kick.com con éxito.',
          type: 'green'
        });
      }
    }
  }

  bindAuthButtons() {
    const loginBtn = document.getElementById('btn-kick-login');
    const profLoginBtn = document.getElementById('btn-profile-link-kick');
    const logoutBtn = document.getElementById('btn-kick-logout');
    const profLogoutBtn = document.getElementById('btn-profile-unlink-kick');

    const handleKickLogin = () => {
      if (window.oauthEngine) {
        window.oauthEngine.loginKick();
      }
    };

    if (loginBtn) loginBtn.addEventListener('click', handleKickLogin);
    if (profLoginBtn) profLoginBtn.addEventListener('click', handleKickLogin);

    const handleKickLogout = () => {
      this.username = '';
      this.isLoggedIn = false;
      localStorage.removeItem('hunthub_kick_username');
      localStorage.removeItem('hunthub_is_sub');
      localStorage.removeItem('hunthub_is_admin');
      localStorage.removeItem('hunthub_streamer_admin_unlocked');
      if (window.oauthEngine) {
        window.oauthEngine.updateAdminDeckUI(false);
      }
      this.updateUserUI();
      if (window.soundEngine) window.soundEngine.playChip();
      if (window.sonner) {
        window.sonner.toast({
          title: 'Account Unlinked',
          message: 'Your Kick account was disconnected from this browser.',
          type: 'default'
        });
      }
    };

    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const profileSection = document.getElementById('profile');
        const isProfileOpen =
          window.location.hash === '#profile' ||
          (profileSection && profileSection.classList.contains('active-view'));
        if (isProfileOpen) {
          if (typeof window.switchView === 'function') {
            window.switchView('#watch');
          } else {
            window.location.hash = '#watch';
          }
          if (window.soundEngine) window.soundEngine.playTick();
          return;
        }
        handleKickLogout();
      });
    }
    if (profLogoutBtn) profLogoutBtn.addEventListener('click', handleKickLogout);

    const syncBtn = document.getElementById('btn-profile-sync-kick');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        const target = (this.username || 'diggitybets').replace(/^@/, '');
        if (window.oauthEngine) {
          window.oauthEngine.syncKickProfile(target);
        }
      });
    }

    const sessionCard = document.querySelector('.user-session-card');
    if (sessionCard) {
      sessionCard.addEventListener('click', () => {
        if (this.username.startsWith('@KickUser_')) {
          if (window.oauthEngine) window.oauthEngine.syncKickProfile('diggitybets');
        }
      });
    }
  }

  bindProfileControls() {
    // 1. Custom Avatar File Upload from PC
    const fileInput = document.getElementById('prof-avatar-file-input');
    const uploadBtn = document.getElementById('btn-upload-avatar-file');
    const restoreKickBtn = document.getElementById('btn-restore-kick-avatar');
    const fileNameDisplay = document.getElementById('prof-file-name-display');

    if (uploadBtn && fileInput) {
      uploadBtn.addEventListener('click', () => fileInput.click());

      fileInput.addEventListener('change', () => {
        const file = fileInput.files && fileInput.files[0];
        if (!file) return;

        // Max 2MB limit validation
        if (file.size > 2 * 1024 * 1024) {
          if (window.sonner) {
            window.sonner.toast({
              title: 'Archivo demasiado grande ⚠️',
              message: 'El archivo supera el límite de 2MB. Seleccioná una imagen menor a 2MB.',
              type: 'error'
            });
          } else {
            window.showCasinoAlert('FILE SIZE LIMIT EXCEEDED ⚠️', 'The selected image exceeds the 2MB limit. Please choose an image smaller than 2MB.', 'danger');
          }
          return;
        }

        if (fileNameDisplay) fileNameDisplay.textContent = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
          const base64Data = e.target.result;
          this.avatar = base64Data;
          this.avatarType = 'img';
          localStorage.setItem('hunthub_avatar', base64Data);
          localStorage.setItem('hunthub_avatar_type', 'img');
          localStorage.setItem('hunthub_custom_uploaded_avatar', 'true');
          this.updateAvatarUI();
          if (window.soundEngine) window.soundEngine.playWin();
          if (window.sonner) {
            window.sonner.toast({
              title: 'Foto de perfil actualizada 📁',
              message: 'Tu foto personalizada desde PC fue guardada con éxito.',
              type: 'green'
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }

    // 2. Restore / Sync Kick.com Photo
    if (restoreKickBtn) {
      restoreKickBtn.addEventListener('click', () => {
        if (!this.username) {
          if (window.sonner) {
            window.sonner.toast({
              title: 'Kick No Vinculado ℹ️',
              message: 'Vinculá primero tu cuenta de Kick.com para sincronizar tu foto oficial.',
              type: 'gold'
            });
          }
          return;
        }
        localStorage.removeItem('hunthub_custom_uploaded_avatar');
        if (fileNameDisplay) fileNameDisplay.textContent = 'Ningún archivo seleccionado';
        this.syncKickProfileAvatar(true);
      });
    }

    // 3. Save Profile Changes
    const saveBtn = document.getElementById('profile-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', async () => {
        this.stakeUsername = (document.getElementById('prof-input-stake-user')?.value || '').trim();
        this.xHandle = (document.getElementById('prof-input-x')?.value || '').trim();
        this.igHandle = (document.getElementById('prof-input-ig')?.value || '').trim();
        this.cryptoLTC = (document.getElementById('prof-input-ltc')?.value || '').trim();
        this.cryptoBTC = (document.getElementById('prof-input-btc')?.value || '').trim();
        this.cryptoETH = (document.getElementById('prof-input-eth')?.value || '').trim();
        this.cryptoUSDC = (document.getElementById('prof-input-usdc')?.value || '').trim();
        this.cryptoSOL = (document.getElementById('prof-input-sol')?.value || '').trim();

        localStorage.setItem('hunthub_stake_user', this.stakeUsername);
        localStorage.setItem('hunthub_x_handle', this.xHandle);
        localStorage.setItem('hunthub_ig_handle', this.igHandle);
        localStorage.setItem('hunthub_crypto_ltc', this.cryptoLTC);
        localStorage.setItem('hunthub_crypto_btc', this.cryptoBTC);
        localStorage.setItem('hunthub_crypto_eth', this.cryptoETH);
        localStorage.setItem('hunthub_crypto_usdc', this.cryptoUSDC);
        localStorage.setItem('hunthub_crypto_sol', this.cryptoSOL);

        // Persist to Server Database
        try {
          await fetch('/api/profile/update', {
            method: 'POST',
            headers: this.getAuthHeaders(true),
            body: JSON.stringify({
              username: this.username || 'Viewer',
              avatar: this.avatar,
              stake_username: this.stakeUsername,
              crypto_ltc: this.cryptoLTC,
              crypto_btc: this.cryptoBTC,
              crypto_eth: this.cryptoETH,
              crypto_usdc: this.cryptoUSDC,
              crypto_sol: this.cryptoSOL,
              x_handle: this.xHandle,
              ig_handle: this.igHandle
            })
          });
        } catch (e) {
          console.warn('[UserStore] Profile remote update notice:', e);
        }

        if (window.soundEngine) window.soundEngine.playCard();
        if (window.sonner) {
          window.sonner.toast({
            title: 'Profile Saved! 💾',
            message: 'Crypto payout addresses and social profiles saved to database.',
            type: 'green'
          });
        }
      });
    }
  }

  /**
   * Stake 0.00 Bet Verification with Dynamic Integer Target (Outlaw Rewards Style)
   * Generates a random integer target multiplier between 10000 and 999999 that expires every 10 minutes (600s).
   */
  async startTotpTimer() {
    await this.generateNewMultiplier();

    if (this.totpInterval) clearInterval(this.totpInterval);
    this.totpInterval = setInterval(() => {
      const now = Date.now();
      const remainingSec = Math.max(0, Math.round((this.totpExpiresAt - now) / 1000));

      const timerEl = document.getElementById('totp-timer');
      const progressEl = document.getElementById('totp-progress-bar');

      if (timerEl) {
        const mins = Math.floor(remainingSec / 60);
        const secs = remainingSec % 60;
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} remaining`;
      }

      if (progressEl) {
        const pct = (remainingSec / this.totpDuration) * 100;
        progressEl.style.width = `${pct}%`;
      }

      if (remainingSec <= 0) {
        this.generateNewMultiplier();
      }
    }, 1000);
  }

  async generateNewMultiplier() {
    try {
      const res = await fetch('/api/stake/target');
      if (res.ok) {
        const data = await res.json();
        this.totpMultiplier = Number(data.target) || Math.floor(Math.random() * (999999 - 10000 + 1)) + 10000;
        this.totpDuration = Number(data.validForSeconds) || 600;
        this.totpExpiresAt = Number(data.expiresAt) || (Date.now() + this.totpDuration * 1000);
      } else {
        throw new Error('API returned ' + res.status);
      }
    } catch (_) {
      this.totpMultiplier = Math.floor(Math.random() * (999999 - 10000 + 1)) + 10000;
      this.totpDuration = 600;
      this.totpExpiresAt = Date.now() + (this.totpDuration * 1000);
    }

    const multDisplay = document.getElementById('totp-mult-val');
    if (multDisplay) multDisplay.textContent = this.totpMultiplier;

    const stepTarget = document.getElementById('totp-step-target');
    if (stepTarget) stepTarget.textContent = this.totpMultiplier;
  }

  /**
   * Stake Affiliate & Partner Verification Integration
   * Verifies account under streamer referral code "DIGGITY" (stake.com/?offer=diggity&c=DIGGITY)
   */
  bindStakeTotpVerification() {
    const copyBtn = document.getElementById('btn-copy-target');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(String(this.totpMultiplier)).then(() => {
            if (window.soundEngine) window.soundEngine.playTick();
            if (window.sonner) {
              window.sonner.toast({
                title: 'Target Multiplier Copied! 📋',
                message: `Target ${this.totpMultiplier} copied. Paste into Limbo target on Stake.`,
                type: 'green'
              });
            }
          }).catch(() => {});
        }
      });
    }

    const refreshBtn = document.getElementById('btn-refresh-totp');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.generateNewMultiplier();
        if (window.soundEngine) window.soundEngine.playTick();
      });
    }

    const verifyBtn = document.getElementById('btn-verify-stake-bet');
    const checkBtn = document.getElementById('btn-check-stake-status');
    const statusBox = document.getElementById('stake-verification-status-box');

    const updateStakeStatusBox = () => {
      if (statusBox) {
        const esc = (s) => (window.escapeHTML ? window.escapeHTML(s) : s);
        if (this.stakeVerified) {
          statusBox.style.display = 'block';
          statusBox.style.background = 'rgba(83, 252, 24, 0.12)';
          statusBox.style.border = '1px solid rgba(83, 252, 24, 0.35)';
          statusBox.style.color = '#86efac';
          statusBox.innerHTML = `<strong>✓ VERIFIED VIP:</strong> Account <strong>@${esc(this.stakeUsername || 'VIP')}</strong> is confirmed under code <strong>DIGGITY</strong>. You receive VIP Store Discounts & Leaderboard eligibility!`;
        } else if (this.stakeUsername) {
          statusBox.style.display = 'block';
          statusBox.style.background = 'rgba(255, 215, 0, 0.12)';
          statusBox.style.border = '1px solid rgba(255, 215, 0, 0.35)';
          statusBox.style.color = '#fef08a';
          statusBox.innerHTML = `<strong>⏳ PENDING AUDIT:</strong> Stake user <strong>@${esc(this.stakeUsername)}</strong> submitted for verification under code <strong>DIGGITY</strong>. Streamer will audit bet link in Admin Deck (+250 $DIG).`;
        } else {
          statusBox.style.display = 'none';
        }
      }
    };
    updateStakeStatusBox();

    if (verifyBtn) {
      verifyBtn.addEventListener('click', async () => {
        const stakeUser = (document.getElementById('prof-input-stake-user')?.value || '').trim();
        const betId = (document.getElementById('prof-input-bet-id')?.value || '').trim();

        if (!stakeUser) {
          if (window.sonner) {
            window.sonner.toast({
              title: 'Stake Username Required',
              message: 'Please enter your Stake.com username first.',
              type: 'danger'
            });
          }
          return;
        }

        if (!betId) {
          if (window.sonner) {
            window.sonner.toast({
              title: 'Bet ID Required',
              message: 'Please paste your zero-value Limbo bet ID (e.g. casino:524922477701) or share link.',
              type: 'danger'
            });
          }
          return;
        }

        if (window.soundEngine) window.soundEngine.playTick();
        verifyBtn.textContent = 'Verifying bet format...';
        verifyBtn.disabled = true;

        try {
          const res = await fetch('/api/stake/verify-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              kickUsername: this.username || 'Viewer',
              stakeUsername: stakeUser,
              targetMultiplier: this.totpMultiplier,
              rawBetInput: betId
            })
          });

          const data = await res.json();

          if (!res.ok) {
            verifyBtn.textContent = 'Verify and link Stake (+250 $DIG) ⚡';
            verifyBtn.disabled = false;
            if (statusBox) {
              statusBox.style.display = 'block';
              statusBox.style.background = 'rgba(255, 42, 95, 0.12)';
              statusBox.style.border = '1px solid rgba(255, 42, 95, 0.35)';
              statusBox.style.color = '#ff6b8b';
              const safeErr = window.escapeHTML ? window.escapeHTML(data.error || 'Invalid bet submission') : (data.error || 'Invalid bet submission');
              statusBox.innerHTML = `<strong>❌ VERIFICATION ERROR:</strong> ${safeErr}`;
            }
            return;
          }

          this.stakeUsername = stakeUser;
          localStorage.setItem('hunthub_stake_user', this.stakeUsername);

          verifyBtn.textContent = '⏳ Verification Pending Audit';
          verifyBtn.disabled = false;

          if (statusBox) {
            statusBox.style.display = 'block';
            statusBox.style.background = 'rgba(255, 215, 0, 0.12)';
            statusBox.style.border = '1px solid rgba(255, 215, 0, 0.35)';
            statusBox.style.color = '#fef08a';
            const esc = (s) => (window.escapeHTML ? window.escapeHTML(s) : s);
            const safeBetId = esc(data.parsedBet?.betId || betId);
            const safeUser = esc(stakeUser);
            statusBox.innerHTML = `<strong>✓ REQUEST SUBMITTED:</strong> Bet [<strong>${safeBetId}</strong>] recorded for @${safeUser} under code <strong>DIGGITY</strong>. Click "🔄 Check Status" once approved (+250 $DIG reward).`;
          }

          if (window.soundEngine) window.soundEngine.playWin();

          if (window.sonner) {
            window.sonner.toast({
              title: 'Verification Request Recorded! 🎰',
              message: `Bet ID ${data.parsedBet?.betId || betId} submitted under code DIGGITY (+250 $DIG upon confirmation).`,
              type: 'green'
            });
          }

          // Broadcast to Admin Deck
          if (window.adminHub && window.adminHub.channelAdmin) {
            window.adminHub.channelAdmin.postMessage({ type: 'STAKE_VERIFICATION_REQUESTED', username: stakeUser, betId });
          }
        } catch (err) {
          verifyBtn.textContent = 'Verify and link Stake (+250 $DIG) ⚡';
          verifyBtn.disabled = false;
          if (statusBox) {
            statusBox.style.display = 'block';
            statusBox.style.background = 'rgba(255, 42, 95, 0.12)';
            statusBox.style.border = '1px solid rgba(255, 42, 95, 0.35)';
            statusBox.style.color = '#ff6b8b';
            statusBox.innerHTML = `<strong>❌ NETWORK ERROR:</strong> Could not connect to verification server.`;
          }
        }
      });
    }

    const syncStakeStatusFromServer = async (showToast = false) => {
      const typedStake = (document.getElementById('prof-input-stake-user')?.value || this.stakeUsername || '').trim();
      if (typedStake && !this.stakeUsername) {
        this.stakeUsername = typedStake;
        localStorage.setItem('hunthub_stake_user', typedStake);
      }

      // 1. Check local verified Stake list (updated by Admin Bulk Sync or Approve button)
      try {
        const verifiedList = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]');
        const matchedLocal = verifiedList.find(r =>
          r.status === 'verified' &&
          ((this.stakeUsername && String(r.username || '').toLowerCase() === this.stakeUsername.toLowerCase()) ||
           (this.username && String(r.kickUser || '').replace(/^@/, '').toLowerCase() === this.username.replace(/^@/, '').toLowerCase()))
        );
        if (matchedLocal) {
          this.stakeVerified = true;
          localStorage.setItem('hunthub_stake_verified', 'true');
        }
      } catch (_) {}

      // 2. Query live backend /api/stake/status
      try {
        const params = new URLSearchParams();
        if (this.username) params.set('kickUsername', this.username);
        if (this.stakeUsername) params.set('stakeUsername', this.stakeUsername);
        const res = await fetch(`/api/stake/status?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.stakeUsername && !this.stakeUsername) {
            this.stakeUsername = data.stakeUsername;
            localStorage.setItem('hunthub_stake_user', this.stakeUsername);
          }
          if (data.verified || data.status === 'APPROVED') {
            this.stakeVerified = true;
            localStorage.setItem('hunthub_stake_verified', 'true');
          }
        }
      } catch (_) {}

      if (this.stakeVerified) {
        if (localStorage.getItem('hunthub_stake_bonus_claimed') !== 'true' && window.houseGames) {
          window.houseGames.adjustBalance(250);
          localStorage.setItem('hunthub_stake_bonus_claimed', 'true');
        }
        if (verifyBtn) {
          verifyBtn.textContent = '✓ Stake Account Verified (Code: DIGGITY)';
        }
      }

      this.updateUserUI();
      updateStakeStatusBox();
      this.renderLeaderboard();

      if (showToast && window.sonner) {
        window.sonner.toast({
          title: this.stakeVerified ? '✓ Stake Account Verified!' : 'Stake Verification Status',
          message: this.stakeVerified
            ? `Account @${this.stakeUsername || this.username || 'VIP'} is verified under Stake code DIGGITY! ✓ VERIFIED badge active.`
            : (this.stakeUsername
                ? `Account @${this.stakeUsername} is registered under code DIGGITY and awaiting streamer audit.`
                : 'Enter your Stake username and place a $0 Limbo bet to verify under code DIGGITY.'),
          type: this.stakeVerified ? 'green' : 'default'
        });
      }
    };

    if (checkBtn) {
      checkBtn.addEventListener('click', async () => {
        if (window.soundEngine) window.soundEngine.playTick();
        checkBtn.textContent = '🔄 Checking...';
        await syncStakeStatusFromServer(true);
        checkBtn.textContent = '🔄 Check Status';
      });
    }

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const ch = new BroadcastChannel('hunthub_admin_sync');
        ch.addEventListener('message', (e) => {
          if (e.data && e.data.type === 'STAKE_VERIFICATION_APPROVED') {
            syncStakeStatusFromServer(true);
          }
        });
      } catch (_) {}
    }
  }

  /**
   * Render Stake Leaderboard ($1,500 USD Monthly Prize Pool: 1st $750, 2nd $500, 3rd $200, 4th-8th $10, Top 15 Displayed)
   */
  getStakePrizeForRank(rank) {
    if (rank === 1) return 750;
    if (rank === 2) return 500;
    if (rank === 3) return 200;
    if (rank >= 4 && rank <= 8) return 10;
    return 0;
  }

  renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    const demoNames = new Set([
      'gs8***', 'stakenacho', 'zeusmax', 'stakevalen', 'hunterpro', 'cryptoace',
      'stakeagus', 'diggityfan01', 'luckymati', 'plinkoking', 'sweetbonanza',
      'gatesofx', 'wanteddead', 'sugarrush77', 'kickhighroll', 'gamerstake88',
      'nachogamer', 'slotking21'
    ]);

    this.leaderboardData = (Array.isArray(this.leaderboardData) ? this.leaderboardData : []).filter(u => {
      const cu = String(u.casinoUser || u.stakeUser || '').toLowerCase().trim();
      const ku = String(u.kickUser || '').toLowerCase().replace(/^@/, '').trim();
      return cu && !demoNames.has(cu) && !demoNames.has(ku);
    });

    // Sort by wager descending and assign ranks + prizes for Top 15
    this.leaderboardData.sort((a, b) => (Number(b.wager) || 0) - (Number(a.wager) || 0));
    const top15 = this.leaderboardData.slice(0, 15).map((item, idx) => {
      const rank = idx + 1;
      return {
        ...item,
        rank,
        prize: this.getStakePrizeForRank(rank)
      };
    });

    const esc = (s) => (window.escapeHTML ? window.escapeHTML(s || '') : (s || ''));

    // Populate Top 3 Illuminated Stake Podium (or clean empty state when no referrals yet)
    [1, 2, 3].forEach((r) => {
      const entry = top15[r - 1];
      const userEl = document.getElementById(`stake-podium-${r}-user`);
      const kickEl = document.getElementById(`stake-podium-${r}-kick`);
      const wagerEl = document.getElementById(`stake-podium-${r}-wager`);
      const prizeEl = document.getElementById(`stake-podium-${r}-prize`);
      const avatarEl = document.getElementById(`stake-podium-${r}-avatar`);
      const prizeAmt = this.getStakePrizeForRank(r);
      const icon = r === 1 ? '🏆' : (r === 2 ? '💰' : '🥉');

      if (!entry) {
        if (userEl) userEl.textContent = '—';
        if (kickEl) kickEl.textContent = 'ESPACIO VACÍO';
        if (wagerEl) wagerEl.textContent = '$0.00';
        if (prizeEl) prizeEl.textContent = `${icon} $${prizeAmt.toLocaleString()} USD`;
        if (avatarEl) {
          const strokeCol = r === 1 ? '#ffd700' : (r === 2 ? '#e2e8f0' : '#cd7f32');
          const bgCol = r === 1 ? '#261b05' : (r === 2 ? '#0f172a' : '#231208');
          const sz = r === 1 ? 72 : 60;
          avatarEl.innerHTML = `<svg viewBox="0 0 64 64" width="${sz}" height="${sz}"><circle cx="32" cy="32" r="30" fill="${bgCol}" stroke="${strokeCol}" stroke-width="2"/><text x="32" y="39" font-family="'Chakra Petch', sans-serif" font-size="22" font-weight="800" fill="${strokeCol}" text-anchor="middle">#${r}</text></svg>`;
        }
        return;
      }

      if (userEl) userEl.textContent = entry.casinoUser || entry.stakeUser || '—';
      if (kickEl) kickEl.textContent = entry.kickUser || '';
      if (wagerEl) wagerEl.textContent = `$${Number(entry.wager || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      if (prizeEl) {
        prizeEl.textContent = `${icon} $${entry.prize.toLocaleString()} USD`;
      }
      if (avatarEl && typeof window.getDeterministicAvatarSvg === 'function') {
        avatarEl.innerHTML = window.getDeterministicAvatarSvg(entry.casinoUser || entry.kickUser, r === 1 ? 68 : 56);
      }
    });

    // Build all 15 slots (showing real verified referrals first, and clean empty positions for remaining slots up to #15)
    const full15Slots = Array.from({ length: 15 }, (_, idx) => {
      const rank = idx + 1;
      return top15[idx] || {
        rank,
        isEmpty: true,
        casinoUser: '—',
        kickUser: 'ESPACIO VACÍO · ESPERANDO REFERIDO',
        wager: 0,
        prize: this.getStakePrizeForRank(rank)
      };
    });

    tbody.innerHTML = full15Slots.map(item => {
      const isPodium = item.rank <= 3;
      const isRunnerUpPrize = item.rank >= 4 && item.rank <= 8;
      const rankColor = item.rank === 1
        ? 'var(--gold)'
        : (item.rank === 2 ? '#e2e8f0' : (item.rank === 3 ? '#cd7f32' : (isRunnerUpPrize ? 'var(--kick-green)' : 'var(--text-muted)')));
      const rankLabel = item.rank === 1
        ? '🥇 #1'
        : (item.rank === 2 ? '🥈 #2' : (item.rank === 3 ? '🥉 #3' : `#${item.rank}`));

      let prizeHtml = '<span style="color: var(--text-dim);">—</span>';
      if (item.rank === 1) {
        prizeHtml = '<span class="stake-table-prize-pill gold">🏆 $750 USD</span>';
      } else if (item.rank === 2) {
        prizeHtml = '<span class="stake-table-prize-pill silver">🥈 $500 USD</span>';
      } else if (item.rank === 3) {
        prizeHtml = '<span class="stake-table-prize-pill bronze">🥉 $200 USD</span>';
      } else if (isRunnerUpPrize) {
        prizeHtml = '<span class="stake-table-prize-pill runnerup">🎁 $10 USD</span>';
      }

      if (item.isEmpty) {
        return `
        <tr class="leaderboard-row ${isPodium ? `top-${item.rank}` : (isRunnerUpPrize ? 'runnerup-prize-row' : '')}" style="opacity: 0.85;">
          <td style="font-family: var(--font-display); font-weight: 800; font-size: 15px; color: ${rankColor};">
            ${rankLabel}
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.04); border: 1px dashed rgba(255,255,255,0.22); display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 11px; font-weight: 800; color: #cbd5e1;">#${item.rank}</span>
              <div>
                <strong style="color: #e2e8f0; font-size: 13.5px;">—</strong>
                <div style="font-size: 11px; color: #94a3b8; font-weight: 600;">ESPACIO VACÍO · ESPERANDO REFERIDO</div>
              </div>
            </div>
          </td>
          <td>
            <span class="reward-badge-pill" style="background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.16); color: #cbd5e1; font-size: 10px;">
              ⏳ DISPONIBLE (CODE: DIGGITY)
            </span>
          </td>
          <td style="font-family: var(--font-display); font-weight: 800; color: #94a3b8;">
            $0.00
          </td>
          <td style="font-family: var(--font-display); font-weight: 800;">
            ${prizeHtml}
          </td>
        </tr>
      `;
      }

      return `
      <tr class="leaderboard-row ${isPodium ? `top-${item.rank}` : (isRunnerUpPrize ? 'runnerup-prize-row' : '')}">
        <td style="font-family: var(--font-display); font-weight: 800; font-size: 15px; color: ${rankColor};">
          ${rankLabel}
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            ${typeof window.getDeterministicAvatarSvg === 'function' ? window.getDeterministicAvatarSvg(item.casinoUser || item.kickUser, 28) : `<span style="font-size: 18px;">${esc(item.avatar)}</span>`}
            <div>
              <strong style="color: #ffffff; font-size: 13.5px;">${esc(item.casinoUser || item.stakeUser)}</strong>
              <div style="font-size: 11.5px; color: var(--text-muted);">${esc(item.kickUser)}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="reward-badge-pill" style="background: rgba(83, 252, 24, 0.15); border-color: var(--kick-green); color: var(--kick-green); font-size: 10px;">
            ✓ CODE: DIGGITY VIP
          </span>
        </td>
        <td style="font-family: var(--font-display); font-weight: 800; color: #ffffff;">
          $${Number(item.wager || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </td>
        <td style="font-family: var(--font-display); font-weight: 800;">
          ${prizeHtml}
        </td>
      </tr>
    `;
    }).join('');
  }

  /**
   * Monthly Channel Activity Points Leaderboard ($DIG) — Resets 1st of Every Month, Universal Top 20 Active Viewers
   * Backed by Cloudflare D1 (/api/leaderboard/monthly & /api/leaderboard/sync-user) so every viewer worldwide sees the exact same Top 20 list.
   */
  getHistoricalLeaderboard() {
    this.ensureMonthlyLeaderboardCycle();
    const excludedUsers = new Set(['diggitybets', 'diggity_bets', 'diggitybot', 'diggity_bot', 'hunthubbot', 'botrix', 'kickbot', 'nightbot', 'streamelements']);

    if (Array.isArray(this.globalMonthlyLeaderboard)) {
      const filteredGlobal = this.globalMonthlyLeaderboard.filter(u => {
        const clean = String(u.kickUser || u.username || '').trim().replace(/^@+/, '').toLowerCase();
        return clean && !excludedUsers.has(clean);
      });
      filteredGlobal.forEach((item, idx) => { item.rank = idx + 1; });
      return filteredGlobal;
    }

    let list = [];
    try {
      list = JSON.parse(localStorage.getItem('hunthub_historical_leaderboard') || '[]');
    } catch (_) {}

    if (Array.isArray(list)) {
      list = list.filter(u => {
        const clean = String(u.kickUser || u.username || '').trim().replace(/^@+/, '').toLowerCase();
        if (!clean || excludedUsers.has(clean)) return false;
        return !clean.includes('diggityvip') && !clean.includes('luckyroller') && !clean.includes('stakehighroller') &&
               !clean.includes('gamerstake88') && !clean.includes('nachogamer') && !clean.includes('slotking21') &&
               !clean.includes('cryptochad') && !clean.includes('spinsqueen') && !clean.includes('stakehunter') &&
               !clean.includes('aguskick');
      });
    } else {
      list = [];
    }

    list.sort((a, b) => (Number(b.totalDig) || 0) - (Number(a.totalDig) || 0));
    list.forEach((item, idx) => { item.rank = idx + 1; });
    return list;
  }

  renderHistoricalLeaderboard() {
    const tbody = document.getElementById('historical-leaderboard-tbody');
    if (!tbody) return;

    const list = this.getHistoricalLeaderboard();
    const esc = (s) => (window.escapeHTML ? window.escapeHTML(s || '') : (s || ''));

    // Update Top 3 Points Podium
    const p1 = list[0];
    const p2 = list[1];
    const p3 = list[2];

    const renderPodiumAvatar = (elId, entry, rank) => {
      const avEl = document.getElementById(elId);
      if (!avEl) return;
      const sz = rank === 1 ? 76 : 66;
      const stroke = rank === 1 ? '#53fc18' : (rank === 2 ? '#00e676' : '#53fc18');
      const fill = rank === 1 ? '#0a1a0f' : '#091812';
      if (!entry) {
        avEl.innerHTML = `<svg viewBox="0 0 64 64" width="${sz}" height="${sz}" style="border-radius:50%;display:inline-block;vertical-align:middle;"><circle cx="32" cy="32" r="30" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/><text x="32" y="40" font-family="'Chakra Petch', sans-serif" font-size="24" font-weight="900" fill="${stroke}" text-anchor="middle">#${rank}</text></svg>`;
        return;
      }
      if (entry.avatar && (/^https?:\/\//i.test(entry.avatar) || /^data:image\//i.test(entry.avatar))) {
        avEl.innerHTML = `<img src="${esc(entry.avatar)}" alt="${esc(entry.kickUser)}" width="${sz}" height="${sz}" style="width:${sz}px;height:${sz}px;border-radius:50%;object-fit:cover;border:2.5px solid ${stroke};box-shadow:0 0 20px rgba(83,252,24,0.55);display:inline-block;vertical-align:middle;">`;
      } else if (typeof window.getDeterministicAvatarSvg === 'function') {
        avEl.innerHTML = window.getDeterministicAvatarSvg(entry.kickUser, sz);
      }
    };

    renderPodiumAvatar('podium-1-avatar', p1, 1);
    renderPodiumAvatar('podium-2-avatar', p2, 2);
    renderPodiumAvatar('podium-3-avatar', p3, 3);

    const u1 = document.getElementById('podium-1-user');
    const pts1 = document.getElementById('podium-1-points');
    const prize1 = document.getElementById('podium-1-prize');
    const tier1 = document.getElementById('podium-1-tier');
    if (u1) {
      u1.textContent = p1 ? p1.kickUser : '—';
      u1.style.color = '#53fc18';
    }
    if (pts1) {
      pts1.textContent = p1 ? `${Number(p1.totalDig || 0).toLocaleString()} $DIG` : '0 $DIG';
      pts1.style.color = '#53fc18';
    }
    if (prize1) {
      prize1.innerHTML = `
        <div class="kick-prize-main">$20 <span style="font-size: 18px; opacity: 0.95;">USD</span></div>
        <div class="kick-prize-boost">⚡ $40 USD (2X CODE: DIGGITY)</div>
      `;
    }
    if (tier1) {
      tier1.innerHTML = p1 ? `<span class="kick-podium-tier-pill active-tier">👑 ${esc(p1.tier || 'VIP')}</span>` : `<span class="kick-podium-tier-pill">ESPACIO VACÍO</span>`;
    }

    const u2 = document.getElementById('podium-2-user');
    const pts2 = document.getElementById('podium-2-points');
    const prize2 = document.getElementById('podium-2-prize');
    const tier2 = document.getElementById('podium-2-tier');
    if (u2) {
      u2.textContent = p2 ? p2.kickUser : '—';
      u2.style.color = '#ffffff';
    }
    if (pts2) {
      pts2.textContent = p2 ? `${Number(p2.totalDig || 0).toLocaleString()} $DIG` : '0 $DIG';
      pts2.style.color = '#ffffff';
    }
    if (prize2) {
      prize2.innerHTML = `
        <div class="kick-prize-main">$10 <span style="font-size: 16px; opacity: 0.9;">USD</span></div>
        <div class="kick-prize-boost">⚡ $20 USD (2X CODE: DIGGITY)</div>
      `;
    }
    if (tier2) {
      tier2.innerHTML = p2 ? `<span class="kick-podium-tier-pill active-tier">🥈 ${esc(p2.tier || 'VIP')}</span>` : `<span class="kick-podium-tier-pill">ESPACIO VACÍO</span>`;
    }

    const u3 = document.getElementById('podium-3-user');
    const pts3 = document.getElementById('podium-3-points');
    const prize3 = document.getElementById('podium-3-prize');
    const tier3 = document.getElementById('podium-3-tier');
    if (u3) {
      u3.textContent = p3 ? p3.kickUser : '—';
      u3.style.color = '#ffffff';
    }
    if (pts3) {
      pts3.textContent = p3 ? `${Number(p3.totalDig || 0).toLocaleString()} $DIG` : '0 $DIG';
      pts3.style.color = '#ffffff';
    }
    if (prize3) {
      prize3.innerHTML = `
        <div class="kick-prize-main" style="font-size: 28px;">VIP BADGE</div>
        <div class="kick-prize-boost">💎 KICK VIP ROLE</div>
      `;
    }
    if (tier3) {
      tier3.innerHTML = p3 ? `<span class="kick-podium-tier-pill active-tier">⚡ ${esc(p3.tier || 'VIP')}</span>` : `<span class="kick-podium-tier-pill">ESPACIO VACÍO</span>`;
    }

    // Update stats strip cards
    const statLeaderUser = document.getElementById('stat-leader-user');
    const statLeaderDesc = document.getElementById('stat-leader-desc');
    if (statLeaderUser) statLeaderUser.textContent = p1 ? p1.kickUser : '—';
    if (statLeaderDesc) statLeaderDesc.textContent = p1 ? `${Number(p1.totalDig || 0).toLocaleString()} $DIG · Prize: $20 ($40 2X diggity)` : 'Prize: $20 USD ($40 w/ code diggity)';

    const statTourneyUser = document.getElementById('stat-tourney-user');
    const statTourneyDesc = document.getElementById('stat-tourney-desc');
    const topTourney = [...list].sort((a,b) => (b.tourneysWon || 0) - (a.tourneysWon || 0))[0];
    if (statTourneyUser) statTourneyUser.textContent = (topTourney && topTourney.tourneysWon > 0) ? topTourney.kickUser : '—';
    if (statTourneyDesc) statTourneyDesc.textContent = (topTourney && topTourney.tourneysWon > 0) ? `${topTourney.tourneysWon} Bracket Tournament Titles` : 'Esperando campeones...';

    const statSniperUser = document.getElementById('stat-sniper-user');
    const statSniperDesc = document.getElementById('stat-sniper-desc');
    const topSniper = [...list].sort((a,b) => (b.huntHits || 0) - (a.huntHits || 0))[0];
    if (statSniperUser) statSniperUser.textContent = (topSniper && topSniper.huntHits > 0) ? topSniper.kickUser : '—';
    if (statSniperDesc) statSniperDesc.textContent = (topSniper && topSniper.huntHits > 0) ? `${topSniper.huntHits} Exact Payout Guesses` : 'Esperando aciertos...';

    const statRewardsPool = document.getElementById('stat-rewards-pool');
    const totalDigDistributed = list.reduce((acc, u) => acc + (Number(u.totalDig) || 0), 0);
    if (statRewardsPool) statRewardsPool.innerHTML = `${totalDigDistributed.toLocaleString()} <span style="font-size: 14px; color: var(--gold);">$DIG</span>`;

    // Render Table Rows
    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px 16px; color: #64748b;">
            <div style="font-size: 28px; margin-bottom: 8px;">💬</div>
            <div style="font-family: var(--font-display); font-weight: 700; font-size: 15px; color: #cbd5e1;">ESPACIO VACÍO · ESPERANDO ACTIVIDAD DE CHAT</div>
            <div style="font-size: 12px; margin-top: 6px; color: #64748b;">Los espectadores más activos de Kick ganan <strong style="color: var(--gold);">$20 USD (#1)</strong>, <strong style="color: #e2e8f0;">$10 USD (#2)</strong> (<strong style="color: var(--kick-green);">2X bajo código diggity</strong>) y <strong style="color: #fde68a;">VIP Badge Kick Role (#3)</strong>.</div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.slice(0, 20).map((item, idx) => {
      const rank = idx + 1;
      const isTop3 = rank <= 3;
      const rankColor = rank === 1 ? 'var(--gold)' : (rank === 2 ? '#e2e8f0' : (rank === 3 ? '#cd7f32' : 'var(--text-muted)'));
      const rankText = rank === 1 ? '🥇 #1' : (rank === 2 ? '🥈 #2' : (rank === 3 ? '🥉 #3' : `#${rank}`));
      const isMe = this.username && item.kickUser.toLowerCase() === (this.username.startsWith('@') ? this.username.toLowerCase() : `@${this.username.toLowerCase()}`);

      let tierBadge = '';
      if (item.tier === 'DIAMOND') {
        tierBadge = '<span class="reward-badge-pill" style="background: rgba(0, 229, 255, 0.18); border-color: var(--cyan); color: var(--cyan); font-size: 10px;">💎 DIAMOND VIP</span>';
      } else if (item.tier === 'GOLD') {
        tierBadge = '<span class="reward-badge-pill" style="background: rgba(255, 215, 0, 0.18); border-color: var(--gold); color: var(--gold); font-size: 10px;">👑 GOLD VIP</span>';
      } else if (item.tier === 'EMERALD') {
        tierBadge = '<span class="reward-badge-pill" style="background: rgba(83, 252, 24, 0.18); border-color: var(--kick-green); color: var(--kick-green); font-size: 10px;">⚡ EMERALD VIP</span>';
      } else {
        tierBadge = '<span class="reward-badge-pill" style="background: rgba(255, 255, 255, 0.08); border-color: var(--border-subtle); color: #cbd5e1; font-size: 10px;">🥈 SILVER</span>';
      }

      let activityPrizeHtml = `<span style="font-size: 11px; font-weight: 700; color: ${item.status === 'LEGEND' ? 'var(--gold)' : 'var(--text-dim)'};">${esc(item.status || 'ACTIVE')}</span>`;
      if (rank === 1) {
        activityPrizeHtml = `<span class="stake-table-prize-pill gold">🏆 $20 USD <span style="color: var(--kick-green); margin-left: 4px;">($40 2X diggity)</span></span>`;
      } else if (rank === 2) {
        activityPrizeHtml = `<span class="stake-table-prize-pill silver">🥈 $10 USD <span style="color: var(--kick-green); margin-left: 4px;">($20 2X diggity)</span></span>`;
      } else if (rank === 3) {
        activityPrizeHtml = `<span class="stake-table-prize-pill bronze">💎 VIP Badge Kick Role</span>`;
      }

      const rowAvatarHtml = (item.avatar && (/^https?:\/\//i.test(item.avatar) || /^data:image\//i.test(item.avatar)))
        ? `<img src="${esc(item.avatar)}" alt="" width="28" height="28" style="width:28px;height:28px;border-radius:50%;object-fit:cover;border:1.5px solid rgba(83,252,24,0.45);flex-shrink:0;">`
        : (typeof window.getDeterministicAvatarSvg === 'function' ? window.getDeterministicAvatarSvg(item.kickUser, 28) : `<span style="font-size: 18px;">👤</span>`);

      return `
        <tr class="leaderboard-row ${isTop3 ? `top-${rank}` : ''} ${isMe ? 'my-rank-row' : ''}" style="${isMe ? 'background: rgba(83, 252, 24, 0.08); border: 1px solid rgba(83, 252, 24, 0.4);' : ''}">
          <td style="font-family: var(--font-display); font-weight: 800; font-size: 14.5px; color: ${rankColor};">
            ${rankText}
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              ${rowAvatarHtml}
              <div>
                <strong style="color: #ffffff; font-size: 13px;">${esc(item.kickUser)}</strong>
                ${isMe ? '<span style="font-size: 10px; color: var(--kick-green); margin-left: 6px; font-weight: 800;">(YOU)</span>' : ''}
              </div>
            </div>
          </td>
          <td style="font-family: var(--font-display); font-weight: 800; font-size: 14px; color: var(--gold);">
            ${Number(item.totalDig || 0).toLocaleString()} $DIG
          </td>
          <td style="font-family: var(--font-display); font-weight: 700; color: #38bdf8;">
            🏆 ${item.tourneysWon || 0}
          </td>
          <td style="font-family: var(--font-display); font-weight: 700; color: var(--kick-green);">
            🎰 ${item.huntHits || 0}
          </td>
          <td>
            ${tierBadge}
          </td>
          <td>
            ${activityPrizeHtml}
          </td>
        </tr>
      `;
    }).join('');
  }

  bindLeaderboardTabs() {
    // Sections #stake-leaderboard and #leaderboard are now independent views in PORTAL
  }

  getIsoWeekKey(date = new Date()) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
  }

  initStoreStockState() {
    const defaultStock = {
      battle_entry: 6,
      tourney_entry: 6,
      bonus_split_20: 3,
      bonus_split_40: 2,
      og_badge_role: 3
    };
    const currentWeek = this.getIsoWeekKey();
    const savedWeek = localStorage.getItem('hunthub_store_stock_week');

    if (savedWeek !== currentWeek) {
      // Weekly reset: every Monday at 00:00 UTC (ISO week change)
      this.storeStock = { ...defaultStock };
      localStorage.setItem('hunthub_store_stock_week', currentWeek);
      localStorage.setItem('hunthub_store_stock_v6', JSON.stringify(this.storeStock));
    } else {
      try {
        const saved = JSON.parse(localStorage.getItem('hunthub_store_stock_v6') || 'null');
        this.storeStock = saved && typeof saved === 'object' ? { ...defaultStock, ...saved } : { ...defaultStock };
      } catch (_) {
        this.storeStock = { ...defaultStock };
      }
    }
    this.vipDiscordClaimed = localStorage.getItem('hunthub_vip_discord_claimed') === 'true';
    this.battleEntryLastTs = parseInt(localStorage.getItem('hunthub_battle_entry_last_ts') || '0', 10);
  }

  saveStoreStockState() {
    const currentWeek = this.getIsoWeekKey();
    localStorage.setItem('hunthub_store_stock_week', currentWeek);
    localStorage.setItem('hunthub_store_stock_v6', JSON.stringify(this.storeStock));
    localStorage.setItem('hunthub_vip_discord_claimed', this.vipDiscordClaimed ? 'true' : 'false');
    localStorage.setItem('hunthub_battle_entry_last_ts', String(this.battleEntryLastTs || 0));
  }

  async syncStoreStockFromServer() {
    try {
      const q = this.username ? `?username=${encodeURIComponent(this.username)}` : '';
      const res = await fetch(`/api/store/stock${q}`);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.catalog)) {
        data.catalog.forEach(item => {
          if (item.weeklyStockLimit !== null && typeof item.remainingStock === 'number') {
            this.storeStock[item.key] = item.remainingStock;
          }
          if (item.key === 'vip_discord' && item.alreadyClaimedOneTime) {
            this.vipDiscordClaimed = true;
          }
        });
        this.saveStoreStockState();
        this.updateStoreCatalogUI();
      }
    } catch (_) {}
  }

  updateStoreCatalogUI() {
    if (!this.storeStock) this.initStoreStockState();

    // 1. Dynamic Stake VIP Discounts & Prices
    // $20 Bonus Buy Split Profit (3,000 -> 2,400 $DIG if stakeVerified)
    const splitCostEl = document.getElementById('bonus-split-cost-display');
    const splitBtn = document.getElementById('btn-redeem-bonus-split');
    const splitVipTag = document.getElementById('bonus-split-vip-tag');
    const effectiveSplitCost = this.stakeVerified ? 2400 : 3000;

    if (splitCostEl) {
      splitCostEl.textContent = `${effectiveSplitCost.toLocaleString()} $DIG`;
      splitCostEl.style.color = this.stakeVerified ? 'var(--kick-green)' : '';
    }
    if (splitBtn) {
      splitBtn.setAttribute('data-cost', String(effectiveSplitCost));
    }
    if (splitVipTag) {
      splitVipTag.textContent = this.stakeVerified
        ? '✓ STAKE VIP DISCOUNT ACTIVE: 2,400 $DIG (Saved 600 $DIG) · Max Split Cap $100 USD'
        : '💰 3,000 $DIG Regular · ⚡ 2,400 $DIG Stake VIP · Max Split Cap $100 USD';
    }

    // $40 Bonus Buy Split Profit (6,000 -> 4,800 $DIG if stakeVerified, exactly 2x $20 split)
    const split40CostEl = document.getElementById('bonus-split-40-cost-display');
    const split40Btn = document.getElementById('btn-redeem-bonus-split-40');
    const split40VipTag = document.getElementById('bonus-split-40-vip-tag');
    const effectiveSplit40Cost = this.stakeVerified ? 4800 : 6000;

    if (split40CostEl) {
      split40CostEl.textContent = `${effectiveSplit40Cost.toLocaleString()} $DIG`;
      split40CostEl.style.color = this.stakeVerified ? 'var(--kick-green)' : '';
    }
    if (split40Btn) {
      split40Btn.setAttribute('data-cost', String(effectiveSplit40Cost));
    }
    if (split40VipTag) {
      split40VipTag.textContent = this.stakeVerified
        ? '✓ STAKE VIP DISCOUNT ACTIVE: 4,800 $DIG (Saved 1,200 $DIG) · Max Split Cap $200 USD'
        : '💰 6,000 $DIG Regular · ⚡ 4,800 $DIG Stake VIP · Max Split Cap $200 USD';
    }

    // Guaranteed 8-Bracket Tourney Entry (1,500 -> 1,200 $DIG)
    const tourneyBtn = document.querySelector('.btn-store-redeem[data-key="tourney_entry"]');
    const tourneyCostEl = document.querySelector('[data-cost-display="tourney_entry"]');
    const effectiveTourneyCost = this.stakeVerified ? 1200 : 1500;
    if (tourneyCostEl) {
      tourneyCostEl.textContent = `${effectiveTourneyCost.toLocaleString()} $DIG`;
      tourneyCostEl.style.color = this.stakeVerified ? 'var(--kick-green)' : '';
    }
    if (tourneyBtn) {
      tourneyBtn.setAttribute('data-cost', String(effectiveTourneyCost));
    }

    // OG Badge Kick Role (2,500 -> 2,000 $DIG Stake VIP)
    const ogBtn = document.getElementById('btn-redeem-og-badge') || document.querySelector('.btn-store-redeem[data-key="og_badge_role"]');
    const ogCostEl = document.getElementById('og-badge-cost-display') || document.querySelector('[data-cost-display="og_badge_role"]');
    const effectiveOgCost = this.stakeVerified ? 2000 : 2500;
    if (ogCostEl) {
      ogCostEl.textContent = `${effectiveOgCost.toLocaleString()} $DIG`;
      ogCostEl.style.color = this.stakeVerified ? 'var(--kick-green)' : '';
    }
    if (ogBtn) {
      ogBtn.setAttribute('data-cost', String(effectiveOgCost));
    }

    // Guaranteed 1v1 Battle Entry (1,000 -> 800 $DIG)
    const battleBtn = document.querySelector('.btn-store-redeem[data-key="battle_entry"]');
    const battleCostEl = document.querySelector('[data-cost-display="battle_entry"]');
    const effectiveBattleCost = this.stakeVerified ? 800 : 1000;
    if (battleCostEl) {
      battleCostEl.textContent = `${effectiveBattleCost.toLocaleString()} $DIG`;
      battleCostEl.style.color = this.stakeVerified ? 'var(--kick-green)' : '';
    }
    if (battleBtn) {
      battleBtn.setAttribute('data-cost', String(effectiveBattleCost));
    }

    // 2. Weekly Stock Pills & Button States (Resets every Monday)
    const stockLimits = {
      battle_entry: 6,
      tourney_entry: 6,
      bonus_split_20: 3,
      bonus_split_40: 2,
      og_badge_role: 3
    };
    Object.keys(stockLimits).forEach(key => {
      const limit = stockLimits[key];
      const rem = Math.max(0, Number(this.storeStock[key] ?? limit));
      const pill = document.querySelector(`[data-stock-pill="${key}"]`);
      const btn = document.querySelector(`.btn-store-redeem[data-key="${key}"]`);

      if (pill) {
        if (rem <= 0) {
          pill.textContent = 'SOLD OUT THIS WEEK';
          pill.classList.add('sold-out');
        } else {
          pill.textContent = `WEEKLY STOCK: ${rem} / ${limit} AVAILABLE`;
          pill.classList.remove('sold-out');
        }
      }

      if (btn) {
        const on14dCooldown = key === 'battle_entry' && this.battleEntryLastTs > 0 && (Date.now() - this.battleEntryLastTs < 14 * 86400 * 1000);
        if (rem <= 0) {
          btn.disabled = true;
          btn.textContent = 'Sold Out';
        } else if (on14dCooldown) {
          btn.disabled = true;
          btn.textContent = '14d Cooldown';
        } else {
          btn.disabled = false;
          btn.textContent = 'Redeem';
        }
      }
    });

    // 3. One-time VIP Streamer Discord Role
    const vipPill = document.querySelector('[data-stock-pill="vip_discord"]');
    const vipBtn = document.querySelector('.btn-store-redeem[data-key="vip_discord"]');
    if (vipPill) {
      if (this.vipDiscordClaimed) {
        vipPill.textContent = 'CLAIMED (1 / 1 PER ACCOUNT)';
        vipPill.classList.add('sold-out');
      } else {
        vipPill.textContent = 'LIMIT: 1 PER ACCOUNT';
        vipPill.classList.remove('sold-out');
      }
    }
    if (vipBtn) {
      vipBtn.disabled = Boolean(this.vipDiscordClaimed);
      vipBtn.textContent = this.vipDiscordClaimed ? 'Claimed' : 'Redeem';
    }
  }

  /**
   * Phase 6 Watch-to-Earn Heartbeat (Calibrated Store Economy: 1 Week = $20 Bonus Buy Split Profit = 3,000 $DIG):
   * Runs every 5 minutes (300_000 ms):
   * - +15 $DIG per 5m (180 $DIG/hr) when kick.com/diggitybets is LIVE + active stream tab open
   * - +20 $DIG per 5m (240 $DIG/hr) when also active in kick.com/diggitybets live chat
   */
  startWatchHeartbeat() {
    if (this.watchHeartbeatInterval) clearInterval(this.watchHeartbeatInterval);
    if (this.watchHeartbeatInitialTimer) clearTimeout(this.watchHeartbeatInitialTimer);

    const runHeartbeat = async () => {
      if (!this.isLoggedIn || !this.username) return;
      if (document.hidden) return;
      const now = Date.now();
      if (now - (this.lastUserInteractionTs || 0) > 1_800_000) return;

      const lastChatActivityMs = now - (this.lastVerifiedKickChatTs || 0);
      const verifiedChatActive = Boolean(this.lastVerifiedKickChatTs > 0 && lastChatActivityMs <= 900_000);

      try {
        const res = await fetch('/api/watch/heartbeat', {
          method: 'POST',
          headers: this.getAuthHeaders(true),
          body: JSON.stringify({
            username: this.username,
            activeTabPresent: !document.hidden,
            verifiedChatActive,
            lastChatActivityMs: Number.isFinite(lastChatActivityMs) ? lastChatActivityMs : 999_999,
            deviceHash: (window.antiFraud && window.antiFraud.getDeviceHash ? window.antiFraud.getDeviceHash() : '')
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.isStreamLive === 'boolean') {
            window.hunthubStreamLive = data.isStreamLive;
          }
          if (data.awarded && data.amount > 0 && data.isStreamLive) {
            if (window.houseGames) {
              if (typeof data.pointsBalance === 'number') {
                const prev = window.houseGames.balance;
                window.houseGames.balance = data.pointsBalance;
                window.houseGames.renderBalance(prev);
              } else {
                window.houseGames.adjustBalance(data.amount, { skipLeaderboard: true });
              }
            }
            if (typeof data.monthlyPoints === 'number') {
              localStorage.setItem('hunthub_user_monthly_dig', String(data.monthlyPoints));
              localStorage.setItem('hunthub_user_career_dig', String(data.monthlyPoints));
            }
            this.syncGlobalLeaderboardAndUser();
            if (window.sonner) {
              window.sonner.toast({
                title: `+${data.amount} $DIG Live Stream Reward! 📺`,
                message: `Earned +${data.amount} $DIG for active participation in kick.com/diggitybets live stream.`,
                type: 'green'
              });
            }
          }
        }
      } catch (_) {}
    };

    this.watchHeartbeatInitialTimer = setTimeout(runHeartbeat, 45_000);
    this.watchHeartbeatInterval = setInterval(runHeartbeat, 300_000);
  }

  bindStoreRedemptions() {
    const storeItems = document.querySelectorAll('.btn-store-redeem');
    storeItems.forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!this.isLoggedIn) {
          await window.showCasinoAlert(
            'KICK ACCOUNT REQUIRED 🔗',
            'Please link your Kick.com account first to redeem rewards from the Store.',
            'gold',
            '🔒 AUTHENTICATION REQUIRED'
          );
          return;
        }

        const itemKey = btn.getAttribute('data-key') || '';
        const itemName = btn.getAttribute('data-item') || 'Store Item';
        let cost = parseInt(btn.getAttribute('data-cost') || '100', 10);

        if (itemKey === 'bonus_split_20') {
          cost = this.stakeVerified ? 2400 : 3000;
        } else if (itemKey === 'bonus_split_40') {
          cost = this.stakeVerified ? 4800 : 6000;
        } else if (itemKey === 'tourney_entry') {
          cost = this.stakeVerified ? 1200 : 1500;
        } else if (itemKey === 'og_badge_role') {
          cost = this.stakeVerified ? 2000 : 2500;
        } else if (itemKey === 'battle_entry') {
          cost = this.stakeVerified ? 800 : 1000;
        } else if (itemKey === 'vip_discord') {
          cost = 500;
        }

        if (itemKey === 'vip_discord' && this.vipDiscordClaimed) {
          await window.showCasinoAlert(
            'LIMIT REACHED (1/1) 🔒',
            'VIP Streamer Discord Role can only be redeemed 1 time per account.',
            'gold',
            '⚠️ ACCOUNT LIMIT'
          );
          return;
        }

        if (itemKey === 'battle_entry' && this.battleEntryLastTs > 0 && (Date.now() - this.battleEntryLastTs < 14 * 86400 * 1000)) {
          await window.showCasinoAlert(
            '14-DAY COOLDOWN ACTIVE ⏳',
            'Guaranteed 1v1 Battle Entry has a 14-day cooldown per viewer to ensure fair rotation.',
            'gold',
            '⏳ COOLDOWN ACTIVE'
          );
          return;
        }

        const stockLimits = {
          battle_entry: 6,
          tourney_entry: 6,
          bonus_split_20: 3,
          bonus_split_40: 2,
          og_badge_role: 3
        };
        if (stockLimits[itemKey] !== undefined && (this.storeStock[itemKey] ?? stockLimits[itemKey]) <= 0) {
          await window.showCasinoAlert(
            'SOLD OUT THIS WEEK 📦',
            `Weekly stock limit (${stockLimits[itemKey]}/${stockLimits[itemKey]}) reached for "${itemName}". Stock resets every Monday at 00:00 UTC.`,
            'danger',
            '🚫 OUT OF STOCK'
          );
          this.updateStoreCatalogUI();
          return;
        }

        const currentBal = window.houseGames ? (Number(window.houseGames.balance) || 0) : 0;
        if (!window.houseGames || currentBal < cost) {
          await window.showCasinoAlert(
            'INSUFFICIENT $DIG BALANCE 💎',
            `Insufficient $DIG points balance (${currentBal.toLocaleString()} $DIG available). You need ${cost.toLocaleString()} $DIG to redeem ${itemName}.`,
            'danger',
            '⚠️ INSUFFICIENT $DIG POINTS'
          );
          return;
        }

        const confirmed = await window.showCasinoConfirm(
          `REDEEM ${itemName.toUpperCase()}?`,
          `Redeem "${itemName}" for ${cost.toLocaleString()} $DIG points? (Your Monthly Kick Leaderboard accumulated score will NOT be reduced).`,
          `⚡ REDEEM (${cost.toLocaleString()} $DIG)`,
          'CANCEL',
          'gold'
        );

        if (confirmed) {
          let turnstileToken = '';
          if (typeof window.getTurnstileToken === 'function') {
            try {
              turnstileToken = await window.getTurnstileToken('redeem');
            } catch (_) {}
          }
          try {
            const res = await fetch('/api/store/redeem', {
              method: 'POST',
              headers: this.getAuthHeaders(true),
              body: JSON.stringify({
                username: this.username,
                voucherTitle: itemName,
                costPoints: cost,
                stakeVerified: this.stakeVerified,
                turnstileToken: turnstileToken,
                deviceHash: (window.antiFraud && window.antiFraud.getDeviceHash ? window.antiFraud.getDeviceHash() : '')
              })
            });
            if (!res.ok) {
              const errData = await res.json().catch(() => ({}));
              if (errData.error && (errData.error.includes('SOLD OUT') || errData.error.includes('COOLDOWN') || errData.error.includes('LIMIT'))) {
                await window.showCasinoAlert('REDEMPTION NOTICE ⚠️', errData.error, 'danger');
                return;
              }
            }
          } catch (_) {}

          window.houseGames.adjustBalance(-cost);
          if (itemKey === 'weekly_raffle' || itemName.includes('Raffle') || itemName.includes('Ticket')) {
            this.raffleTickets += 1;
            localStorage.setItem('hunthub_raffle_tickets', this.raffleTickets.toString());
          } else if (itemKey === 'vip_discord') {
            this.vipDiscordClaimed = true;
          } else if (itemKey === 'battle_entry') {
            this.storeStock.battle_entry = Math.max(0, (this.storeStock.battle_entry ?? 6) - 1);
            this.battleEntryLastTs = Date.now();
          } else if (itemKey === 'tourney_entry') {
            this.storeStock.tourney_entry = Math.max(0, (this.storeStock.tourney_entry ?? 6) - 1);
          } else if (itemKey === 'bonus_split_20') {
            this.storeStock.bonus_split_20 = Math.max(0, (this.storeStock.bonus_split_20 ?? 3) - 1);
            try {
              const pending = JSON.parse(localStorage.getItem('hunthub_pending_splits') || '[]');
              pending.unshift({
                id: 'split_' + Date.now(),
                type: '$20 Split',
                amountUsd: 20,
                username: this.username || '@Viewer',
                slot: 'Viewer Choice',
                timestamp: Date.now(),
                status: 'PENDING BUY'
              });
              localStorage.setItem('hunthub_pending_splits', JSON.stringify(pending.slice(0, 10)));
              if (typeof BroadcastChannel !== 'undefined') {
                new BroadcastChannel('hunthub_bus').postMessage({ type: 'splits_updated' });
              }
            } catch (_) {}
          } else if (itemKey === 'bonus_split_40') {
            this.storeStock.bonus_split_40 = Math.max(0, (this.storeStock.bonus_split_40 ?? 2) - 1);
            try {
              const pending = JSON.parse(localStorage.getItem('hunthub_pending_splits') || '[]');
              pending.unshift({
                id: 'split_' + Date.now(),
                type: '$40 Split',
                amountUsd: 40,
                username: this.username || '@Viewer',
                slot: 'Viewer Choice',
                timestamp: Date.now(),
                status: 'PENDING BUY'
              });
              localStorage.setItem('hunthub_pending_splits', JSON.stringify(pending.slice(0, 10)));
              if (typeof BroadcastChannel !== 'undefined') {
                new BroadcastChannel('hunthub_bus').postMessage({ type: 'splits_updated' });
              }
            } catch (_) {}
          } else if (itemKey === 'og_badge_role') {
            this.storeStock.og_badge_role = Math.max(0, (this.storeStock.og_badge_role ?? 3) - 1);
            this.ogBadgeClaimed = true;
            localStorage.setItem('hunthub_og_badge_claimed', 'true');
          }

          this.saveStoreStockState();
          this.updateUserUI();

          // Register in Streamer Admin Claims Queue & Anti-Fraud Radar
          if (window.antiFraud) {
            window.antiFraud.recordAccountUsage(this.username);
          }
          if (window.adminHub) {
            window.adminHub.addRedemptionClaim(this.username, itemName, cost, this.avatar, this.isSub);
          }

          if (window.soundEngine) {
            if (typeof window.soundEngine.playJackpot === 'function') {
              window.soundEngine.playJackpot();
            } else {
              window.soundEngine.playWin();
            }
          }
          await window.showCasinoAlert(
            'VOUCHER REDEEMED! 🎁',
            `You redeemed "${itemName}" for ${cost.toLocaleString()} $DIG. Streamer moderation queue notified in real-time!`,
            'green',
            '✓ REWARD CLAIM QUEUED'
          );
        }
      });
    });
  }
}

// Global userStore instance
window.userStore = new UserStoreController();
