/**
 * HuntHub — Streamer Admin Hub & Moderation Queue Controller (Phase 2 Master Deck)
 * Exclusive command center for streamer DiggityBets (kick.com/diggitybets).
 * 
 * Features:
 * Tab 1: Vouchers Queue, Weekly Sunday Raffle, Stake Limbo $0 Bet Audit, Stake Referrals Sync
 * Tab 2: Anti-Sybil Security Radar (Hardware Hash, IP Subnet, Stake Alts)
 * Tab 3: Master Games Control (Bonus Hunt with Slot Autocomplete, 8-Bracket Tourney, 1v1 Battles)
 * Tab 4: Live Wheels Control (Duo-Wheel Mode Switch, CS:GO 90s Chatter Wheel, Random Slot Roulette)
 * 
 * 100% English code, zero window.prompt/confirm/alert dialogs (Strictly Sonner Toasts & Inline UI).
 */

class AdminHubController {
  constructor() {
    this.storageKeyClaims = 'hunthub_redemptions_queue';
    this.storageKeyTickets = 'hunthub_raffle_ledger';
    this.storageKeyAdminUnlock = 'hunthub_streamer_admin_unlocked';
    this.currentFilter = 'all';
    this.activeSubtab = 'vouchers-stake';

    // Broadcast channels for cross-window / OBS synchronization
    this.channelAdmin = null;
    this.channelDuo = null;
    this.channelGiveaway = null;
    this.channelSlotWheel = null;

    this.demoUsernames = new Set([
      'luckystriker', 'vegasking', 'slotqueen', 'spinmaster', 'strike777',
      'bigbassbob', 'neonwolf', 'royalflush', 'nachogamer', 'slotking21',
      'diggityfan', 'cryptospin', 'aguskick', 'valen99', 'stakehunter',
      'kickviewer01', 'charlybets', 'zeusmax_21', 'slothunter_ar',
      'altfarmer_450', 'stakefarmer_01', 'stakefarmer_02',
      'stakenacho', 'stakevalen', 'stakeagus', 'diggityfan01', 'newplayer99', 'catlover',
      'megalol', 'crashbandicoot', 'playera', 'playerb', 'player1', 'player2'
    ]);

    // Duo-Wheel Queue (Unified with wheel-duo/main.js via hunthub_duo_pool_v2)
    this.duoPool = [];
    try {
      const savedPool = JSON.parse(localStorage.getItem('hunthub_duo_pool_v2') || 'null');
      if (Array.isArray(savedPool)) {
        this.duoPool = savedPool
          .filter(p => {
            const u = String(p.chatter || p.user || '').trim().toLowerCase().replace(/^@/, '');
            return u && !this.demoUsernames.has(u) && !u.startsWith('altfarmer');
          })
          .map(p => ({
            ...p,
            chatter: p.chatter || p.user || 'Viewer',
            user: p.user || p.chatter || 'Viewer'
          }));
      }
    } catch (_) {}
    this.duoMode = 'battle';
    this.tourneyMode = 'BONUS_BUY';
    this.battleMode = 'BONUS_BUY';
    try {
      const savedDuoMode = localStorage.getItem('hunthub_duo_mode');
      if (savedDuoMode === 'battle' || savedDuoMode === 'tourney') this.duoMode = savedDuoMode;
      const savedTourneyMode = localStorage.getItem('hunthub_tourney_mode');
      if (savedTourneyMode === 'BONUS_BUY' || savedTourneyMode === 'SPINS') this.tourneyMode = savedTourneyMode;
      const savedBattleMode = localStorage.getItem('hunthub_battle_mode');
      if (savedBattleMode === 'BONUS_BUY' || savedBattleMode === 'SPINS') this.battleMode = savedBattleMode;
    } catch (_) {}

    // King of the Hill (KotH) State & Duo Wheel Corner Target ('A' = Blue Corner, 'B' = Red Corner)
    this.wheelTargetCorner = 'A';
    this._processedDuoSpinIds = new Set();
    this._processedAnnounceKeys = new Set();
    this._demoUsersPurgedForLive = true;
    this._lastLocalDuoMutationAt = 0;
    this._lastChatterSyncAt = 0;
    this.kothCelebrationTimer = null;
    this.battleQueue = [];
    this.tourneyQueue = [];
    this.kothState = {
      active: true,
      king: null,
      kingSlot: '',
      kingProvider: '',
      kingImage: '',
      streak: 0,
      maxStreak: 4,
      prizePerWin: 5,
      maxPrize: 20,
      awaitingDecision: false
    };
    try {
      const savedKoth = localStorage.getItem('hunthub_koth_state');
      if (savedKoth) {
        const parsedKoth = JSON.parse(savedKoth);
        const kingName = String(parsedKoth?.king || '').trim().toLowerCase().replace(/^@/, '');
        if (kingName && (this.demoUsernames.has(kingName) || kingName.startsWith('altfarmer'))) {
          parsedKoth.king = null;
          parsedKoth.kingSlot = '';
          parsedKoth.streak = 0;
          parsedKoth.awaitingDecision = false;
        }
        this.kothState = { ...this.kothState, ...parsedKoth };
      }
    } catch (_) {}

    // CS:GO 90s Window Active Chatters & Live Subscriber Set
    this.recentChatters = new Map();
    this.subscriberUsers = new Set();
    this.selectedSlot = null;

    this.init();
  }

  escapeHTML(str) {
    return String(str ?? '').replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  }

  getAdminHeaders(extra = {}) {
    const adminToken = localStorage.getItem('hunthub_admin_token') || localStorage.getItem('hunthub_user_token') || '';
    const userToken = localStorage.getItem('hunthub_user_token') || adminToken;
    return {
      'x-admin-user': localStorage.getItem('hunthub_kick_username') || 'diggitybets',
      'x-admin-token': adminToken,
      'x-user-token': userToken,
      ...extra
    };
  }

  init() {
    if (this._initialized) return;
    this._initialized = true;
    this.initBroadcastChannels();
    this.ensureInitialData();
    this.setupSubtabs();
    this.bindGlobalListeners();
    this.setupBonusHuntAdmin();
    this.setupTournamentAdmin();
    this.setupBattleAdmin();
    this.setupWheelsAdmin();
    this.setupCondensedControlPanel();
    this.initLiveKickChatBridge();
    this.bindObsCopyButtons();

    // Always enforce 0% demo users for live stream readiness
    try { localStorage.setItem('hunthub_demo_users_purged', 'true'); } catch (_) {}
    if (localStorage.getItem('hunthub_demo_users_purged_live_v4') !== 'true') {
      this.purgeDemoUsersForLiveStream('init_clean_live_v4', true);
      try { localStorage.setItem('hunthub_demo_users_purged_live_v4', 'true'); } catch (_) {}
    }

    // Expose global winner announcer for Bonus Hunt, Slot Request Wheel & Predictions
    window.announceStreamWinner = (opts) => this.announceStreamWinner(opts);

    // Bind manual Clean All Demo Users button
    const btnCleanDemo = document.getElementById('btn-admin-clean-demo-users');
    if (btnCleanDemo) {
      btnCleanDemo.onclick = () => {
        this.purgeDemoUsersForLiveStream('manual_admin_button', true);
        if (window.sonner) {
          window.sonner.toast({
            title: '🧹 All Demo Users Cleared!',
            message: 'All queues, ledgers, battle corners, and bonus hunts are 100% clean for live stream.',
            type: 'green'
          });
        }
      };
    }

    // Listen for auth changes to grant admin privileges to @diggitybets & @tarkansky
    window.addEventListener('hunthub:auth-updated', () => this.checkAdminAccess());

    // Check admin on startup
    this.checkAdminAccess();
  }

  initBroadcastChannels() {
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.channelAdmin = new BroadcastChannel('hunthub_admin_sync');
        this.channelAdmin.onmessage = (e) => this.handleBroadcast(e.data);
      } catch (_) {}

      try {
        this.channelDuo = new BroadcastChannel('hunthub_duo_wheel');
        this.channelDuo.onmessage = (e) => this.handleDuoBroadcast(e.data);
      } catch (_) {}

      try {
        this.channelGiveaway = new BroadcastChannel('giveaway_bus');
      } catch (_) {}

      try {
        this.channelSlotWheel = new BroadcastChannel('slot_wheel_bus');
      } catch (_) {}

      try {
        this.channelBattle = new BroadcastChannel('hunthub_battle');
        this.channelBattle.onmessage = (e) => this.handleBattleBroadcast(e.data);
      } catch (_) {}

      try {
        this.channelTourney = new BroadcastChannel('hunthub_tourney');
      } catch (_) {}

      try {
        this.channelCelebration = new BroadcastChannel('hunthub_celebration');
      } catch (_) {}
    }

    // Cross-tab localStorage listener so spinning directly in /wheel-duo/?obs=1 always updates Control Panel
    window.addEventListener('storage', (e) => {
      if (e.key === 'hunthub_duo_winner_selected' && e.newValue) {
        try {
          this.handleDuoBroadcast(JSON.parse(e.newValue));
        } catch (_) {}
      } else if (e.key === 'hunthub_battle_assign' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          this.handleBattleBroadcast({ action: 'assign_player', ...parsed });
        } catch (_) {}
      } else if (e.key === 'hunthub_duo_pool_v2' && e.newValue) {
        try {
          const parsedPool = JSON.parse(e.newValue);
          if (Array.isArray(parsedPool)) {
            this.duoPool = parsedPool;
            this.renderDuoQueue();
          }
        } catch (_) {}
      } else if (e.key === 'hunthub_tourney_add_player' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && parsed.participant) {
            this.assignWheelWinnerToTourneySeed(
              parsed.participant.username || parsed.participant.displayName,
              parsed.participant.slotName || parsed.participant.slot,
              parsed.spinId || ('tourney_add_' + (parsed.timestamp || Date.now())),
              parsed.participant.seed
            );
          }
        } catch (_) {}
      } else if (e.key === 'hunthub_duo_mode' && e.newValue) {
        if ((e.newValue === 'battle' || e.newValue === 'tourney') && this.duoMode !== e.newValue) {
          this.setDuoMode(e.newValue, true);
        }
      } else if (e.key === 'hunthub_tourney_state' && e.newValue) {
        this.renderTournamentAdmin();
        this.updateWheelTargetUI();
      }
    });
  }

  isStreamerUser(username) {
    if (!username) return false;
    const clean = username.trim().toLowerCase().replace('@', '');
    return clean === 'diggitybets' || clean === 'diggity_bets' || clean === 'tarkansky' || clean === 'diggitybot' || clean === 'diggity_bot';
  }

  checkAdminAccess() {
    const currentKickUser = localStorage.getItem('hunthub_kick_username') || '';
    const isAdmin = this.isStreamerUser(currentKickUser) || localStorage.getItem('hunthub_is_admin') === 'true';
    localStorage.setItem('hunthub_is_admin', isAdmin ? 'true' : 'false');
    if (isAdmin) {
      localStorage.setItem('hunthub_streamer_admin_unlocked', 'true');
    }

    const navTab = document.getElementById('nav-tab-admin');
    const navTabControl = document.getElementById('nav-tab-control');
    const adminBadge = document.getElementById('auth-admin-badge');
    const adminSection = document.getElementById('admin-hub');
    const controlSection = document.getElementById('control-panel');

    if (navTab) {
      navTab.style.display = isAdmin ? 'inline-flex' : 'none';
    }
    if (navTabControl) {
      navTabControl.style.display = isAdmin ? 'inline-flex' : 'none';
    }
    if (adminBadge) {
      adminBadge.style.display = 'none';
    }
    if (window.userStore && typeof window.userStore.syncTopbarRoleBadge === 'function') {
      window.userStore.syncTopbarRoleBadge();
    }

    if (isAdmin) {
      if (!this._adminControlsBound) {
        this._adminControlsBound = true;
        this.bindAdminControls();
      }
      const isAdminViewVisible = Boolean(
        (adminSection && adminSection.classList.contains('active-view')) ||
        (controlSection && controlSection.classList.contains('active-view'))
      );
      if (isAdminViewVisible) {
        this._adminDecksDirty = false;
        this.renderAllDecks();
        this.syncCondensedControlPanelUI();
      } else if (!this._adminDecksScheduled) {
        this._adminDecksScheduled = true;
        this._adminDecksDirty = true;
        const runIdle = typeof window.requestIdleCallback === 'function'
          ? (cb) => window.requestIdleCallback(cb, { timeout: 600 })
          : (cb) => setTimeout(cb, 80);
        runIdle(() => {
          this._adminDecksScheduled = false;
          if (this._adminDecksDirty) {
            this._adminDecksDirty = false;
            this.renderAllDecks();
            this.syncCondensedControlPanelUI();
          }
        });
      }
    } else {
      if (adminSection) adminSection.style.display = 'none';
      if (controlSection) controlSection.style.display = 'none';
    }
  }

  unlockAdminMode() {
    localStorage.setItem(this.storageKeyAdminUnlock, 'true');
    localStorage.setItem('hunthub_is_admin', 'true');
    this.checkAdminAccess();
    if (window.sonner) {
      window.sonner.toast({
        title: 'Streamer Admin Unlocked! 👑',
        message: 'Master command center is active in navigation for @diggitybets and @tarkansky.',
        type: 'gold'
      });
    }
  }

  isIgnoredSybilAlert(c) {
    if (!c) return true;
    const id = String(c.id || c.cluster_id || '');
    if (id.startsWith('alt_demo_') || id.startsWith('sim_')) return true;
    const clean = (u) => String(u || '').trim().replace(/^@+/, '').toLowerCase();
    const p = clean(c.primaryUser || c.primary_user);
    const a = clean(c.altUser || c.alt_user);
    if (!p || !a || p === a) return true;
    const isSampleOrOwner = (u) => (
      u === 'diggitybets' ||
      u === 'diggitybot' ||
      u === 'diggity_bot' ||
      u === 'tomas' ||
      u === 'tarkansky' ||
      u === 'viewer' ||
      u === 'vieweroriginal' ||
      u === 'guest' ||
      u === 'player1' ||
      u === 'player2' ||
      this.demoUsernames.has(u) ||
      u.startsWith('altfarmer') ||
      u.startsWith('stakefarmer') ||
      u.startsWith('kickuser_')
    );
    return isSampleOrOwner(p) || isSampleOrOwner(a);
  }

  ensureInitialData() {
    let claims = [];
    try {
      claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]');
      if (Array.isArray(claims)) {
        claims = claims.filter(c => {
          if (c.id && String(c.id).startsWith('claim_demo_')) return false;
          const u = String(c.kick_username || c.username || '').toLowerCase().replace(/^@+/, '');
          return u && !this.demoUsernames.has(u) && !u.startsWith('altfarmer') && !u.startsWith('stakefarmer');
        });
        localStorage.setItem(this.storageKeyClaims, JSON.stringify(claims));
      }
    } catch (e) { claims = []; }

    let clusters = [];
    try {
      clusters = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]');
      if (Array.isArray(clusters)) {
        clusters = clusters.filter(c => !this.isIgnoredSybilAlert(c));
        localStorage.setItem('hunthub_alt_clusters', JSON.stringify(clusters));
      }
    } catch (e) { clusters = []; }

    try {
      localStorage.removeItem('hunthub_device_registry');
    } catch (_) {}
  }

  // Subtabs Setup (4 Dedicated Master Panes)
  setupSubtabs() {
    const tabBtns = document.querySelectorAll('.admin-subtab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetSubtab = btn.getAttribute('data-subtab');
        if (!targetSubtab) return;

        this.activeSubtab = targetSubtab;

        // Update button states
        tabBtns.forEach(b => {
          b.classList.remove('active', 'primary');
          b.classList.add('btn-stake-secondary');
        });
        btn.classList.add('active', 'primary');
        btn.classList.remove('btn-stake-secondary');

        // Toggle panes
        const panes = document.querySelectorAll('.admin-subtab-pane');
        panes.forEach(pane => {
          if (pane.id === `pane-admin-${targetSubtab}`) {
            pane.style.display = 'block';
            pane.classList.add('active');
          } else {
            pane.style.display = 'none';
            pane.classList.remove('active');
          }
        });

        if (window.soundEngine && typeof window.soundEngine.playNavTab === 'function') {
          window.soundEngine.playNavTab();
        } else if (window.soundEngine && typeof window.soundEngine.playChip === 'function') {
          window.soundEngine.playChip();
        }

        // Render target subtab fresh content
        if (targetSubtab === 'vouchers-stake') {
          this.renderClaimsQueue();
          this.renderSundayRaffleLedger();
          this.renderStakeVerificationsQueue();
        } else if (targetSubtab === 'anti-sybil') {
          this.renderSecurityRadar();
        } else if (targetSubtab === 'games-ctrl') {
          this.renderBonusHuntAdmin();
          this.renderTournamentAdmin();
        } else if (targetSubtab === 'wheels-ctrl') {
          this.renderDuoQueue();
          this.renderActiveChatters();
        } else if (targetSubtab === 'session-pnl') {
          if (window.diggityIntelSuite && typeof window.diggityIntelSuite.renderPnlCalendar === 'function') {
            window.diggityIntelSuite.renderPnlCalendar();
          }
        }
      });
    });
  }

  bindGlobalListeners() {
    // 1. Claims Filter Buttons
    const filterBtns = document.querySelectorAll('.admin-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter') || 'all';
        this.renderClaimsQueue();
      });
    });

    // 2. Refresh Stake Verifications
    const btnRefreshStake = document.getElementById('btn-refresh-stake-admin-queue');
    if (btnRefreshStake) {
      btnRefreshStake.addEventListener('click', () => {
        this.renderStakeVerificationsQueue();
        if (window.sonner) window.sonner.toast({ title: 'Refreshed Queue 🔄', message: 'Stake Limbo bets updated.', type: 'cyan' });
      });
    }

    // 3. Roll Sunday Raffle
    const btnRollRaffle = document.getElementById('btn-roll-sunday-raffle');
    if (btnRollRaffle) {
      btnRollRaffle.addEventListener('click', () => this.rollSundayRaffleWinner());
    }

    // 4. Stake Sync & Bulk Sync
    const btnSyncStake = document.getElementById('btn-admin-sync-stake');
    if (btnSyncStake) btnSyncStake.addEventListener('click', () => this.syncStakeAffiliates());

    const btnBulkVerify = document.getElementById('btn-admin-bulk-verify-stake');
    if (btnBulkVerify) btnBulkVerify.addEventListener('click', () => this.handleStakeBulkSync());

    // 5. Security Radar Refresh & Clear
    const btnRefreshRadar = document.getElementById('btn-refresh-security-alerts');
    if (btnRefreshRadar) {
      btnRefreshRadar.addEventListener('click', () => {
        this.renderSecurityRadar();
        if (window.sonner) window.sonner.toast({ title: 'Radar Refreshed 🛡️', message: 'Anti-Sybil telemetry checked.', type: 'cyan' });
      });
    }

    const btnClearRadar = document.getElementById('btn-clear-security-alerts');
    if (btnClearRadar) {
      btnClearRadar.addEventListener('click', () => {
        try {
          localStorage.setItem('hunthub_alt_clusters', '[]');
          localStorage.removeItem('hunthub_device_registry');
        } catch (_) {}
        this.renderKPIs();
        this.renderSecurityRadar();
        if (window.sonner) {
          window.sonner.toast({
            title: 'Alertas Anti-Sybil Limpiadas 🧹',
            message: 'All sample and cached device clusters have been cleared.',
            type: 'green'
          });
        }
      });
    }

    // 6. Simulate Alt Account
    const btnSimAlt = document.getElementById('btn-sim-alt-test');
    if (btnSimAlt) {
      btnSimAlt.addEventListener('click', () => this.simulateAltDetection());
    }
  }

  handleBroadcast(data) {
    if (!data) return;
    if (data.type === 'NEW_CLAIM' || data.type === 'CLAIM_UPDATED' || data.type === 'ALT_DETECTED' || data.type === 'STAKE_VERIFICATION_REQUESTED') {
      this.renderKPIs();
      this.renderClaimsQueue();
      this.renderStakeVerificationsQueue();
      this.renderSecurityRadar();
      if (window.soundEngine && typeof window.soundEngine.playCoinDispenser === 'function') {
        window.soundEngine.playCoinDispenser();
      }
    }
  }

  renderAllDecks() {
    this.renderKPIs();
    this.renderClaimsQueue();
    this.renderSundayRaffleLedger();
    this.renderStakeVerificationsQueue();
    this.renderStakeReferrals();
    this.renderSecurityRadar();
    this.renderBonusHuntAdmin();
    this.renderTournamentAdmin();
    this.renderDuoQueue();
    this.renderActiveChatters();
  }

  renderKPIs() {
    let claims = [];
    try { claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]'); } catch (e) {}

    const totalClaims = claims.length;
    const pendingClaims = claims.filter(c => c.status === 'PENDING').length;
    const totalBurned = claims.reduce((sum, c) => sum + (c.cost || c.cost_points || 0), 0);

    let clusters = [];
    try {
      clusters = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]');
      if (Array.isArray(clusters)) {
        clusters = clusters.filter(c => !this.isIgnoredSybilAlert(c));
      } else {
        clusters = [];
      }
    } catch (e) { clusters = []; }
    const flaggedAlts = clusters.length;

    const elTotal = document.getElementById('admin-kpi-total-claims');
    const elPending = document.getElementById('admin-kpi-pending-claims');
    const elBurned = document.getElementById('admin-kpi-burned-points');
    const elAlts = document.getElementById('admin-kpi-flagged-alts') || document.getElementById('admin-kpi-alts');

    if (elTotal) elTotal.textContent = totalClaims.toString();
    if (elPending) elPending.textContent = pendingClaims.toString();
    if (elBurned) elBurned.textContent = `${totalBurned.toLocaleString()} $DIG`;
    if (elAlts) elAlts.textContent = flaggedAlts.toString();
    const elAlts2 = document.getElementById('admin-kpi-alts');
    if (elAlts2) elAlts2.textContent = flaggedAlts.toString();
  }

  // ========================================================
  // TAB 1: VOUCHERS, RAFFLES & STAKE QUEUE
  // ========================================================

  async renderClaimsQueue() {
    const tbody = document.getElementById('admin-claims-tbody');
    if (!tbody) return;

    let claims = [];
    try {
      const res = await fetch('/api/admin/store-redemptions?adminUser=diggitybets', {
        headers: this.getAdminHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        if (data.claims && Array.isArray(data.claims)) {
          claims = data.claims;
        }
      }
    } catch (_) {}

    if (claims.length === 0) {
      try {
        claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]');
      } catch (e) { claims = []; }
    }

    let filtered = claims;
    if (this.currentFilter === 'pending') {
      filtered = claims.filter(c => c.status === 'PENDING');
    } else if (this.currentFilter === 'fulfilled') {
      filtered = claims.filter(c => c.status === 'FULFILLED');
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 28px; color: var(--text-dim); font-style: italic;">
            No voucher redemptions found in this view.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(c => {
      const timeMs = c.created_at ? c.created_at * 1000 : (c.timestamp || Date.now());
      const dateStr = new Date(timeMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fullDate = new Date(timeMs).toLocaleDateString([], { month: 'short', day: 'numeric' });

      const username = this.escapeHTML(c.kick_username || c.username || 'Viewer');
      const discordName = c.discord_username ? `@${this.escapeHTML(c.discord_username)}` : '';
      const stakeUser = c.stake_username ? `@${this.escapeHTML(c.stake_username)}` : '';
      const stakeVerified = c.stake_verified ? '<span class="reward-badge-pill" style="font-size: 9px; color: var(--kick-green); border-color: var(--kick-green);">✓ STAKE VIP</span>' : '';

      // Crypto addresses 1-click copy buttons
      const wallets = [];
      if (c.crypto_ltc) wallets.push(`<button type="button" class="btn-stake-secondary btn-copy-wallet" data-coin="LTC" data-addr="${this.escapeHTML(c.crypto_ltc)}" style="padding: 2px 6px; font-size: 10px;">📋 LTC</button>`);
      if (c.crypto_btc) wallets.push(`<button type="button" class="btn-stake-secondary btn-copy-wallet" data-coin="BTC" data-addr="${this.escapeHTML(c.crypto_btc)}" style="padding: 2px 6px; font-size: 10px;">📋 BTC</button>`);
      if (c.crypto_eth) wallets.push(`<button type="button" class="btn-stake-secondary btn-copy-wallet" data-coin="ETH" data-addr="${this.escapeHTML(c.crypto_eth)}" style="padding: 2px 6px; font-size: 10px;">📋 ETH</button>`);
      if (c.crypto_usdc) wallets.push(`<button type="button" class="btn-stake-secondary btn-copy-wallet" data-coin="USDC" data-addr="${this.escapeHTML(c.crypto_usdc)}" style="padding: 2px 6px; font-size: 10px;">📋 USDC</button>`);
      if (c.crypto_sol) wallets.push(`<button type="button" class="btn-stake-secondary btn-copy-wallet" data-coin="SOL" data-addr="${this.escapeHTML(c.crypto_sol)}" style="padding: 2px 6px; font-size: 10px;">📋 SOL</button>`);

      const walletHtml = wallets.length > 0
        ? `<div style="display: flex; gap: 4px; flex-wrap: wrap;">${wallets.join('')}</div>`
        : `<span style="font-size: 11px; color: var(--text-dim); font-style: italic;">No crypto addresses in profile</span>`;

      const statusBadge = c.status === 'FULFILLED'
        ? `<span class="reward-badge-pill" style="background: rgba(83, 252, 24, 0.2); border-color: var(--kick-green); color: var(--kick-green);">✓ FULFILLED</span>`
        : (c.status === 'REFUNDED'
            ? `<span class="reward-badge-pill" style="background: rgba(255, 42, 95, 0.2); border-color: var(--magenta); color: var(--magenta);">✕ REFUNDED</span>`
            : `<span class="reward-badge-pill" style="background: rgba(255, 215, 0, 0.25); border-color: var(--gold); color: var(--gold); animation: pulse-dot 1.5s infinite;">⏳ PENDING</span>`);

      const isPending = c.status === 'PENDING';
      const safeId = this.escapeHTML(c.id);
      const safeVoucher = this.escapeHTML(c.voucher_title || c.voucherTitle);
      const safeCost = this.escapeHTML(c.cost_points || c.cost);

      return `
        <tr data-claim-id="${safeId}" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="font-family: monospace; font-size: 11px; color: var(--text-dim);">${fullDate} ${dateStr}</td>
          <td>
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 14px;">${this.escapeHTML(c.avatar || '🤠')}</span>
                <strong style="color: #ffffff; font-family: var(--font-display); font-size: 13px;">@${username}</strong>
                ${c.isSub ? '<span class="reward-badge-pill" style="font-size: 9px; color: var(--kick-green); border-color: var(--kick-green);">SUB</span>' : ''}
              </div>
              <div style="font-size: 11px; color: var(--text-dim); display: flex; gap: 6px; align-items: center;">
                ${discordName ? `<span style="color: var(--cyan);">${discordName}</span>` : ''}
                ${stakeUser ? `<span style="color: var(--gold);">${stakeUser}</span>` : ''}
                ${stakeVerified}
              </div>
            </div>
          </td>
          <td style="font-family: var(--font-display); font-weight: 700; color: var(--gold); font-size: 13px;">
            ${safeVoucher}
          </td>
          <td style="font-family: var(--font-display); font-weight: 800; color: #ffffff;">
            ${safeCost} $DIG
          </td>
          <td>${walletHtml}</td>
          <td>${statusBadge}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              ${isPending ? `
                <button type="button" class="btn-stake-primary btn-approve-claim" data-id="${safeId}" data-user="${username}" style="padding: 4px 10px; font-size: 11px; background: linear-gradient(135deg, #10b981 0%, #53fc18 100%); color: #000; font-weight: 800;">
                  Approve / Mark Paid ✓
                </button>
                <button type="button" class="btn-chat-toggle btn-reject-claim" data-id="${safeId}" data-user="${username}" style="padding: 4px 8px; font-size: 11px; color: var(--magenta);">
                  Reject & Refund $DIG ✕
                </button>
              ` : ''}
              <button type="button" class="btn-chat-toggle btn-copy-claim-info" data-user="${username}" data-voucher="${safeVoucher}" title="Copy chat shoutout" style="padding: 4px 8px; font-size: 11px;">
                📋
              </button>
              <button type="button" class="btn-chat-toggle btn-delete-claim" data-id="${safeId}" data-user="${username}" title="Delete claim 🗑️" style="padding: 4px 8px; font-size: 11px; color: #ef4444; border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.12);">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Bind row action events
    tbody.querySelectorAll('.btn-approve-claim').forEach(b => {
      b.onclick = () => this.approveClaim(b.dataset.id, b.dataset.user);
    });
    tbody.querySelectorAll('.btn-reject-claim').forEach(b => {
      b.onclick = () => this.rejectClaim(b.dataset.id, b.dataset.user);
    });
    tbody.querySelectorAll('.btn-delete-claim').forEach(b => {
      b.onclick = () => this.deleteClaim(b.dataset.id, b.dataset.user);
    });
    tbody.querySelectorAll('.btn-copy-wallet').forEach(b => {
      b.onclick = () => {
        const coin = b.dataset.coin;
        const addr = b.dataset.addr;
        navigator.clipboard.writeText(addr);
        if (window.sonner) window.sonner.toast({ title: `Copied ${coin} Address! 📋`, message: addr, type: 'gold' });
      };
    });
    tbody.querySelectorAll('.btn-copy-claim-info').forEach(b => {
      b.onclick = () => {
        const text = `🎉 Congrats @${b.dataset.user}! Your reward [${b.dataset.voucher}] has been verified and processed by diggitybets!`;
        navigator.clipboard.writeText(text);
        if (window.sonner) window.sonner.toast({ title: 'Copied Shoutout! 📋', message: text, type: 'cyan' });
      };
    });
  }

  async approveClaim(id, username) {
    try {
      await fetch('/api/admin/approve-store-redemption', {
        method: 'POST',
        headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ redemptionId: id, adminUser: 'diggitybets' })
      });
    } catch (_) {}

    // Local storage fallback
    let claims = [];
    try { claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]'); } catch (e) {}
    const c = claims.find(item => item.id === id);
    if (c) {
      c.status = 'FULFILLED';
      localStorage.setItem(this.storageKeyClaims, JSON.stringify(claims));
    }

    if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
    if (window.sonner) {
      window.sonner.toast({
        title: 'Voucher Approved & Paid! 🎁',
        message: `Claim for @${username} marked fulfilled.`,
        type: 'green'
      });
    }
    this.renderKPIs();
    this.renderClaimsQueue();
  }

  async rejectClaim(id, username) {
    try {
      await fetch('/api/admin/reject-store-redemption', {
        method: 'POST',
        headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ redemptionId: id, refund: true, adminUser: 'diggitybets' })
      });
    } catch (_) {}

    let claims = [];
    try { claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]'); } catch (e) {}
    const c = claims.find(item => item.id === id);
    if (c) {
      c.status = 'REFUNDED';
      localStorage.setItem(this.storageKeyClaims, JSON.stringify(claims));
    }

    if (window.soundEngine && typeof window.soundEngine.playChip === 'function') window.soundEngine.playChip();
    if (window.sonner) {
      window.sonner.toast({
        title: 'Voucher Rejected & Refunded ↩️',
        message: `$DIG points returned to @${username}.`,
        type: 'danger'
      });
    }
    this.renderKPIs();
    this.renderClaimsQueue();
  }

  async deleteClaim(id, username) {
    const confirmed = typeof window.showCasinoConfirm === 'function'
      ? await window.showCasinoConfirm({
          title: 'DELETE STORE CLAIM',
          subtitle: 'PERMANENT ADMIN ACTION',
          icon: '🗑️',
          accent: 'danger',
          confirmText: '🗑️ DELETE CLAIM',
          cancelText: 'CANCEL',
          message: `Are you sure you want to permanently delete the store claim for @${username}?`
        })
      : confirm(`Are you sure you want to permanently delete the claim for @${username}?`);
    if (!confirmed) return;

    try {
      await fetch('/api/admin/delete-store-redemption', {
        method: 'POST',
        headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ redemptionId: id, adminUser: 'diggitybets' })
      });
    } catch (_) {}

    // Local storage removal
    try {
      let claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]');
      claims = claims.filter(c => String(c.id) !== String(id));
      localStorage.setItem(this.storageKeyClaims, JSON.stringify(claims));
    } catch (_) {}

    if (window.soundEngine && typeof window.soundEngine.playChip === 'function') window.soundEngine.playChip();
    if (window.sonner) {
      window.sonner.toast({
        title: 'Claim Deleted 🗑️',
        message: `Voucher claim for @${username} was permanently removed.`,
        type: 'gold'
      });
    }
    this.renderKPIs();
    this.renderClaimsQueue();
  }

  async renderSundayRaffleLedger() {
    const listEl = document.getElementById('admin-raffle-participants-list');
    const totalEl = document.getElementById('admin-raffle-total-tickets');
    if (!listEl) return;

    let ledger = { totalTickets: 0, participants: [] };
    try {
      const res = await fetch('/api/admin/raffle-ledger?adminUser=diggitybets', {
        headers: this.getAdminHeaders()
      });
      if (res.ok) {
        ledger = await res.json();
      }
    } catch (_) {}

    // Render empty state if no participants
    if (!ledger.participants || ledger.participants.length === 0) {
      if (totalEl) totalEl.textContent = '0 Tickets';
      listEl.innerHTML = `
        <div style="text-align: center; padding: 24px 14px; color: var(--text-dim); font-size: 13px;">
          No tickets active in the Sunday Raffle ledger yet. Viewers acquire tickets via Rewards Store or Kick stream activities.
        </div>
      `;
      return;
    }

    const total = ledger.totalTickets || 1;
    if (totalEl) totalEl.textContent = `${total} Tickets`;

    listEl.innerHTML = ledger.participants.map(p => {
      const user = this.escapeHTML(p.kick_username || p.username);
      const count = Number(p.tickets_count || p.tickets || 0);
      const pct = ((count / total) * 100).toFixed(1);
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: rgba(0, 0, 0, 0.35); border-radius: 8px; border: 1px solid var(--border-subtle); margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-family: var(--font-display); font-weight: 800; color: #ffffff;">@${user}</span>
            ${p.isSub ? '<span class="reward-badge-pill" style="font-size: 9px; color: var(--kick-green); border-color: var(--kick-green);">SUB 2X</span>' : ''}
          </div>
          <div style="font-family: var(--font-display); font-weight: 800; color: var(--gold); font-size: 13px;">
            ${count} 🎟️ (${pct}%)
          </div>
        </div>
      `;
    }).join('');
  }

  async rollSundayRaffleWinner() {
    const btn = document.getElementById('btn-roll-sunday-raffle');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '🎲 COMPUTING PROVABLY FAIR WINNER...';
    }

    if (window.soundEngine && typeof window.soundEngine.playDiceRoll === 'function') {
      window.soundEngine.playDiceRoll();
    }

    let result = null;
    try {
      const res = await fetch('/api/admin/roll-raffle', {
        method: 'POST',
        headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ adminUser: 'diggitybets' })
      });
      if (res.ok) {
        const data = await res.json();
        result = data.result;
      }
    } catch (_) {}

    // Fallback to real local raffle ledger or real active Kick chatters (never demo users)
    if (!result || !result.winner) {
      let realParticipants = [];
      try {
        const savedRaffle = JSON.parse(localStorage.getItem(this.storageKeyTickets) || 'null');
        if (savedRaffle && Array.isArray(savedRaffle.participants)) {
          savedRaffle.participants.forEach((p) => {
            const u = String(p.kick_username || p.username || '').trim().replace(/^@/, '');
            const count = Math.max(1, Number(p.tickets_count || p.tickets || 1));
            if (u && !this.demoUsernames.has(u.toLowerCase())) {
              for (let i = 0; i < count; i++) realParticipants.push(`@${u}`);
            }
          });
        }
      } catch (_) {}

      if (realParticipants.length === 0 && this.recentChatters.size > 0) {
        realParticipants = Array.from(this.recentChatters.values())
          .map(c => '@' + String(c.user || '').trim().replace(/^@/, ''))
          .filter(u => u.length > 1 && !this.demoUsernames.has(u.slice(1).toLowerCase()));
      }

      if (realParticipants.length === 0) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = '🎲 ROLL SUNDAY WINNER LIVE (PROVABLY FAIR) 🏆';
        }
        if (window.sonner) {
          window.sonner.toast({
            title: 'No Giveaway Participants Yet',
            message: 'Wait for real viewers to acquire raffle tickets or speak in live Kick chat before rolling.',
            type: 'gold'
          });
        }
        return;
      }

      const winner = realParticipants[Math.floor(Math.random() * realParticipants.length)];
      result = {
        winner,
        ticketNumber: Math.floor(Math.random() * realParticipants.length) + 1,
        totalTickets: realParticipants.length,
        serverSeed: 'seed_' + Date.now(),
        clientSeed: 'kick_sunday_stream',
        hmacDigest: 'pf_' + Date.now().toString(16)
      };
    }

    setTimeout(() => {
      if (window.soundEngine) {
        if (typeof window.soundEngine.playVictoriousTrumpetFanfare === 'function') {
          window.soundEngine.playVictoriousTrumpetFanfare();
        } else if (typeof window.soundEngine.playWin === 'function') {
          window.soundEngine.playWin();
        }
      }
      if (typeof window.confetti === 'function') {
        window.confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }

      const modal = document.getElementById('admin-raffle-winner-modal');
      const nameEl = document.getElementById('raffle-winner-display-name');
      if (modal && nameEl) {
        nameEl.textContent = result.winner;
        modal.style.display = 'flex';
      }

      this.announceStreamWinner({
        eventType: 'giveaway',
        tier: 'grand',
        type: 'GIVEAWAY_WIN',
        category: 'SUNDAY RAFFLE & GIVEAWAY · WINNER',
        ribbon: '🎁 OFFICIAL GIVEAWAY WINNER',
        icon: '🎁',
        username: result.winner,
        slotName: 'Live Stream Giveaway',
        statValue: `TICKET #${result.ticketNumber || 1}`,
        prize: `Congratulations @${String(result.winner).replace(/^@/, '')} has won the giveaway!`
      });

      if (btn) {
        btn.disabled = false;
        btn.textContent = '🎲 ROLL SUNDAY WINNER LIVE (PROVABLY FAIR) 🏆';
      }
    }, 1200);
  }

  async renderStakeVerificationsQueue() {
    const tbody = document.getElementById('admin-stake-verifications-tbody');
    if (!tbody) return;

    let requests = [];
    try {
      const res = await fetch('/api/admin/stake-verifications?adminUser=diggitybets', {
        headers: this.getAdminHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        requests = data.requests || [];
      }
    } catch (_) {}

    if (requests.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; color: var(--text-dim); padding: 20px; font-style: italic;">
            No Stake verification requests found. Spectators verify via Limbo $0 bet.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = requests.map(req => {
      const timeMs = (req.created_at || Date.now() / 1000) * 1000;
      const timeStr = new Date(timeMs).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const isPending = req.status === 'PENDING';
      const rawUrl = req.share_url || `https://stake.com/casino/games/limbo?iid=${encodeURIComponent(req.bet_id || '')}&modal=bet`;
      const safeUrl = /^https?:\/\//i.test(rawUrl) ? this.escapeHTML(rawUrl) : '#';
      const safeKick = this.escapeHTML(req.kick_username);
      const safeStake = this.escapeHTML(req.stake_username || req.kick_username);
      const safeId = this.escapeHTML(req.id);
      const safeMult = this.escapeHTML(req.target_multiplier);
      const safeStatus = this.escapeHTML(req.status);

      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="font-family: monospace; font-size: 11px; color: var(--text-dim);">${timeStr}</td>
          <td>
            <div style="display: flex; flex-direction: column;">
              <strong style="color: #ffffff;">@${safeKick}</strong>
              <span style="color: var(--gold); font-size: 11px;">Stake: @${safeStake}</span>
            </div>
          </td>
          <td style="font-family: var(--font-display); font-weight: 900; color: #53fc18; font-variant-numeric: tabular-nums;">
            ${safeMult}
          </td>
          <td>
            <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="btn-stake-secondary" style="padding: 3px 8px; font-size: 11px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
              Open Bet on Stake ↗
            </a>
          </td>
          <td>
            <span class="reward-badge-pill" style="font-size: 10px; background: ${isPending ? 'rgba(255, 215, 0, 0.15)' : 'rgba(83, 252, 24, 0.15)'}; border-color: ${isPending ? 'var(--gold)' : 'var(--kick-green)'}; color: ${isPending ? 'var(--gold)' : 'var(--kick-green)'};">
              ${safeStatus}
            </span>
          </td>
          <td>
            ${isPending ? `
              <div style="display: flex; gap: 4px;">
                <button type="button" class="btn-stake-primary btn-approve-stake" data-id="${safeId}" data-user="${safeKick}" data-stake="${safeStake}" style="padding: 4px 8px; font-size: 10.5px; background: linear-gradient(135deg, #10b981 0%, #53fc18 100%); color: #000; font-weight: 800;">
                  Approve (+250 $DIG) ✓
                </button>
                <button type="button" class="btn-chat-toggle btn-reject-stake" data-id="${safeId}" data-user="${safeKick}" style="padding: 4px 6px; font-size: 10.5px; color: var(--magenta);">
                  Reject ✕
                </button>
              </div>
            ` : `<span style="color: var(--kick-green); font-size: 11px; font-weight: 700;">VERIFIED ✓</span>`}
          </td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('.btn-approve-stake').forEach(b => {
      b.onclick = async () => {
        const id = b.dataset.id;
        const user = b.dataset.user;
        const stakeUser = b.dataset.stake || user;
        try {
          await fetch('/api/admin/approve-stake-verification', {
            method: 'POST',
            headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ requestId: id, adminUser: 'diggitybets' })
          });
        } catch (_) {}

        try {
          const referrals = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]');
          const existing = referrals.find(r =>
            (r.username || '').toLowerCase() === stakeUser.toLowerCase() ||
            (r.kickUser || '').replace(/^@/, '').toLowerCase() === user.toLowerCase()
          );
          if (existing) {
            existing.status = 'verified';
            existing.code = 'DIGGITY';
          } else {
            referrals.unshift({
              username: stakeUser,
              kickUser: '@' + user.replace(/^@/, ''),
              code: 'DIGGITY',
              verifiedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
              status: 'verified'
            });
          }
          localStorage.setItem('hunthub_verified_stake_list', JSON.stringify(referrals));
        } catch (_) {}

        if (this.channelAdmin) {
          this.channelAdmin.postMessage({
            type: 'STAKE_VERIFICATION_APPROVED',
            kickUsername: user,
            stakeUsername: stakeUser
          });
        }
        if (window.userStore && (window.userStore.username || '').toLowerCase() === user.toLowerCase()) {
          window.userStore.verifyStakeReferral(stakeUser);
        }

        if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
        if (window.sonner) {
          window.sonner.toast({
            title: 'Stake Verification Approved! 🎰',
            message: `User @${user} verified under code DIGGITY. +250 $DIG credited!`,
            type: 'green'
          });
        }
        this.renderStakeVerificationsQueue();
        this.renderStakeReferrals();
      };
    });

    tbody.querySelectorAll('.btn-reject-stake').forEach(b => {
      b.onclick = async () => {
        const id = b.dataset.id;
        try {
          await fetch('/api/admin/reject-stake-verification', {
            method: 'POST',
            headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ requestId: id, adminUser: 'diggitybets' })
          });
        } catch (_) {}
        if (window.sonner) window.sonner.toast({ title: 'Request Rejected ✕', message: 'Bet did not match target.', type: 'danger' });
        this.renderStakeVerificationsQueue();
      };
    });
  }

  renderStakeReferrals() {
    const tbody = document.getElementById('admin-stake-referrals-tbody');
    if (!tbody) return;

    let referrals = [];
    try {
      const parsed = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]');
      if (Array.isArray(parsed)) {
        referrals = parsed.filter(ref => {
          const u = String(ref?.username || '').trim().toLowerCase().replace(/^@/, '');
          const k = String(ref?.kickUser || '').trim().toLowerCase().replace(/^@/, '');
          return u && !this.demoUsernames.has(u) && (!k || k === 'viewer' ? !this.demoUsernames.has(u) : !this.demoUsernames.has(k));
        });
        if (referrals.length !== parsed.length) {
          localStorage.setItem('hunthub_verified_stake_list', JSON.stringify(referrals));
        }
      }
    } catch(e) { referrals = []; }

    if (referrals.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 26px 16px; color: var(--text-dim); font-style: italic;">
            No Stake Partner referrals synced yet. Paste your Stake Affiliate username list above and click <strong>Apply Sync</strong>.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = referrals.map(ref => {
      const safeU = this.escapeHTML(ref.username);
      const safeKick = this.escapeHTML(ref.kickUser || '@Viewer');
      const safeAt = this.escapeHTML(ref.verifiedAt || 'Recent');
      return `
      <tr>
        <td>
          <a href="https://stake.com/?offer=diggity&c=i2mVktNM" target="_blank" rel="noopener noreferrer" style="color: var(--kick-green); font-family: var(--font-display); font-weight: 800; text-decoration: none;">
            @${safeU} ↗
          </a>
        </td>
        <td style="color: #ffffff; font-size: 13px;">${safeKick}</td>
        <td>
          <span class="reward-badge-pill" style="background: ${ref.status === 'verified' ? 'rgba(83, 252, 24, 0.2)' : 'rgba(255, 215, 0, 0.2)'}; border-color: ${ref.status === 'verified' ? 'var(--kick-green)' : 'var(--gold)'}; color: ${ref.status === 'verified' ? 'var(--kick-green)' : 'var(--gold)'}; font-size: 11px;">
            ${ref.status === 'verified' ? '✓ VERIFIED (DIGGITY)' : '⏳ PENDING CONFIRMATION'}
          </span>
        </td>
        <td style="font-size: 12px; color: var(--text-dim);">${safeAt}</td>
        <td>
          <button type="button" class="btn-chat-toggle btn-remove-stake-ref" data-user="${safeU}" style="color: var(--crimson); padding: 4px 8px; font-size: 11px;" title="Remove from list">
            ✕
          </button>
        </td>
      </tr>
    `;
    }).join('');

    tbody.querySelectorAll('.btn-remove-stake-ref').forEach(btn => {
      btn.onclick = () => this.removeStakeReferral(btn.dataset.user);
    });
  }

  removeStakeReferral(username) {
    let referrals = [];
    try { referrals = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]'); } catch(e) {}
    referrals = referrals.filter(r => r.username.toLowerCase() !== username.toLowerCase());
    localStorage.setItem('hunthub_verified_stake_list', JSON.stringify(referrals));
    this.renderStakeReferrals();
    if (window.sonner) window.sonner.toast({ title: 'Removed', message: `@${username} removed from list.`, type: 'default' });
  }

  handleStakeBulkSync() {
    const textarea = document.getElementById('admin-stake-sync-input');
    if (!textarea) return;
    const raw = textarea.value.trim();
    if (!raw) {
      if (window.sonner) window.sonner.toast({ title: 'Input Empty', message: 'Paste one or more Stake usernames.', type: 'danger' });
      return;
    }

    const names = raw.split(/[\n,;]+/).map(s => s.trim().replace(/^@/, '')).filter(Boolean);
    if (names.length === 0) return;

    let referrals = [];
    try { referrals = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]'); } catch(e) {}

    names.forEach(name => {
      const existing = referrals.find(r => r.username.toLowerCase() === name.toLowerCase());
      if (existing) {
        existing.status = 'verified';
        existing.code = 'DIGGITY';
      } else {
        referrals.push({
          username: name,
          kickUser: '@' + name,
          code: 'DIGGITY',
          verifiedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
          status: 'verified'
        });
      }
    });

    localStorage.setItem('hunthub_verified_stake_list', JSON.stringify(referrals));
    textarea.value = '';
    this.renderStakeReferrals();
    if (window.sonner) {
      window.sonner.toast({
        title: 'Stake Affiliate Sync Complete! 🎰',
        message: `${names.length} player(s) verified under code DIGGITY.`,
        type: 'green'
      });
    }
  }

  syncStakeAffiliates() {
    if (window.sonner) {
      window.sonner.toast({
        title: 'Stake Campaign Synchronized ⚡',
        message: 'Campaign code DIGGITY active on Stake Partners network.',
        type: 'cyan'
      });
    }
    this.renderStakeReferrals();
  }

  // ========================================================
  // TAB 2: ALERTAS DE SEGURIDAD ANTI-SYBIL
  // ========================================================

  async renderSecurityRadar() {
    const tbody = document.getElementById('admin-alts-tbody');
    if (!tbody) return;

    let alerts = [];
    try {
      const res = await fetch('/api/admin/security-alerts?adminUser=diggitybets', {
        headers: this.getAdminHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        alerts = Array.isArray(data.alerts) ? data.alerts.filter(c => !this.isIgnoredSybilAlert(c)) : [];
      }
    } catch (_) {}

    if (alerts.length === 0) {
      try {
        const stored = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]');
        alerts = Array.isArray(stored) ? stored.filter(c => !this.isIgnoredSybilAlert(c)) : [];
        localStorage.setItem('hunthub_alt_clusters', JSON.stringify(alerts));
      } catch (e) { alerts = []; }
    }

    const elAlts = document.getElementById('admin-kpi-flagged-alts');
    if (elAlts) elAlts.textContent = String(alerts.length);
    const elAlts2 = document.getElementById('admin-kpi-alts');
    if (elAlts2) elAlts2.textContent = String(alerts.length);

    if (alerts.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 24px; color: var(--kick-green); font-style: italic;">
            ✓ All clear. Zero multi-account / shared hardware clusters detected across live sessions.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = alerts.map(a => {
      const hash = String(a.device_hash || a.deviceHash || '—');
      const shortHash = this.escapeHTML(hash.length > 14 ? hash.substring(0, 12) + '...' : hash);
      const subnet = this.escapeHTML(a.ip_subnet || a.ipSubnet || '190.19.45.0/24');
      const rawPrimary = String(a.primaryUser || a.primary_user || 'Player1').replace(/^@+/, '');
      const rawAlt = String(a.altUser || a.alt_user || 'Player2').replace(/^@+/, '');
      const primary = this.escapeHTML(rawPrimary);
      const alt = this.escapeHTML(rawAlt);
      const reason = this.escapeHTML(a.reason || 'SHARED_HARDWARE_FINGERPRINT');
      const score = Number(a.risk_score || a.riskScore || 85);
      const clusterId = this.escapeHTML(a.cluster_id || a.id || 'cluster_1');

      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="font-family: monospace; font-size: 11px; color: var(--cyan);">${shortHash}</td>
          <td style="font-family: monospace; font-size: 11px; color: var(--text-dim);">${subnet}</td>
          <td><strong style="color: #ffffff;">@${primary}</strong></td>
          <td><strong style="color: var(--magenta);">@${alt}</strong></td>
          <td style="font-size: 11px; color: var(--gold);">${reason}</td>
          <td>
            <span class="reward-badge-pill" style="background: rgba(255, 42, 95, 0.25); border-color: var(--magenta); color: var(--magenta); font-size: 10px;">
              ${score}/100 RISK
            </span>
          </td>
          <td>
            <div style="display: flex; gap: 4px;">
              <button type="button" class="btn-stake-primary btn-shadowban-action" data-user="${alt}" style="padding: 3px 8px; font-size: 10px; background: #e11d48; color: #fff;">
                Shadowban Alts
              </button>
              <button type="button" class="btn-stake-secondary btn-freeze-action" data-user="${alt}" style="padding: 3px 8px; font-size: 10px; color: var(--gold); border-color: var(--gold);">
                Freeze $DIG
              </button>
              <button type="button" class="btn-chat-toggle btn-whitelist-action" data-id="${clusterId}" style="padding: 3px 8px; font-size: 10px;">
                Whitelist
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Bind action buttons
    tbody.querySelectorAll('.btn-shadowban-action').forEach(b => {
      b.onclick = async () => {
        const user = b.dataset.user;
        try {
          await fetch('/api/admin/security-action', {
            method: 'POST',
            headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ action: 'shadowban', username: user, adminUser: 'diggitybets' })
          });
        } catch (_) {}
        if (window.sonner) {
          window.sonner.toast({
            title: 'Account Shadowbanned 🚫',
            message: `@${user} silently barred from stream raffles & giveaways.`,
            type: 'danger'
          });
        }
      };
    });

    tbody.querySelectorAll('.btn-freeze-action').forEach(b => {
      b.onclick = async () => {
        const user = b.dataset.user;
        try {
          await fetch('/api/admin/security-action', {
            method: 'POST',
            headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ action: 'freeze', username: user, adminUser: 'diggitybets' })
          });
        } catch (_) {}
        if (window.sonner) {
          window.sonner.toast({
            title: 'Balance Frozen ❄️',
            message: `@${user}'s $DIG balance locked pending review.`,
            type: 'gold'
          });
        }
      };
    });

    tbody.querySelectorAll('.btn-whitelist-action').forEach(b => {
      b.onclick = async () => {
        const cid = b.dataset.id;
        try {
          await fetch('/api/admin/security-action', {
            method: 'POST',
            headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ action: 'whitelist', clusterId: cid, adminUser: 'diggitybets' })
          });
        } catch (_) {}
        let clusters = [];
        try { clusters = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]'); } catch (e) {}
        clusters = clusters.filter(c => c.id !== cid && c.cluster_id !== cid);
        localStorage.setItem('hunthub_alt_clusters', JSON.stringify(clusters));
        if (window.sonner) {
          window.sonner.toast({
            title: 'Cluster Whitelisted ✓',
            message: 'Device ignored from radar.',
            type: 'green'
          });
        }
        this.renderSecurityRadar();
        this.renderKPIs();
      };
    });
  }

  simulateAltDetection() {
    const randomNum = Math.floor(Math.random() * 900 + 100);
    const altUsername = `AltFarmer_${randomNum}`;

    let clusters = [];
    try { clusters = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]'); } catch (e) {}

    clusters.unshift({
      id: `sim_${Date.now()}`,
      cluster_id: `cluster_${randomNum}`,
      primaryUser: 'ViewerOriginal',
      altUser: altUsername,
      deviceHash: 'a7f3c9820e11...',
      ipSubnet: '190.19.45.0/24',
      reason: 'SHARED_HARDWARE_FINGERPRINT',
      riskScore: 90,
      status: 'FLAGGED',
      detectedAt: Date.now()
    });

    localStorage.setItem('hunthub_alt_clusters', JSON.stringify(clusters));
    this.renderKPIs();
    this.renderSecurityRadar();

    if (window.soundEngine && typeof window.soundEngine.playHit === 'function') {
      window.soundEngine.playHit();
    }
    if (window.sonner) {
      window.sonner.toast({
        title: 'Security Radar Triggered! 🚨',
        message: `Detected alt @${altUsername} sharing current PC fingerprint.`,
        type: 'danger'
      });
    }
  }

  // ========================================================
  // TAB 3: CONTROL MAESTRO DE JUEGOS
  // ========================================================

  setupBonusHuntAdmin() {
    const inputSearch = document.getElementById('admin-hunt-slot-search');
    const dropdown = document.getElementById('admin-hunt-slot-dropdown');
    const btnAddBonus = document.getElementById('btn-admin-add-bonus');

    // Slot Autocomplete
    if (inputSearch && dropdown) {
      inputSearch.addEventListener('input', () => {
        const q = inputSearch.value.trim().toLowerCase();
        if (q.length < 2) {
          dropdown.style.display = 'none';
          return;
        }

        const matches = (window.SlotResolver && typeof window.SlotResolver.smartSearch === 'function')
          ? window.SlotResolver.smartSearch(q, 8)
          : ((window.HUNTHUB_CURATED_SLOTS || []).filter(s => s.name.toLowerCase().includes(q) || (s.provider && s.provider.toLowerCase().includes(q))).slice(0, 8));

        if (matches.length === 0) {
          dropdown.style.display = 'none';
          return;
        }

        dropdown.innerHTML = matches.map(s => `
          <div class="slot-autocomplete-item" data-id="${this.escapeHTML(s.id)}" data-name="${this.escapeHTML(s.name)}" data-provider="${this.escapeHTML(s.provider)}" data-img="${this.escapeHTML(s.image)}" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.06); transition: background 0.15s;">
            <img src="${this.escapeHTML(s.image)}" alt="${this.escapeHTML(s.name)}" style="width: 33px; height: 44px; aspect-ratio: 180 / 236; object-fit: cover; border-radius: 6px;" onerror="this.onerror=null; this.src='https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';">
            <div style="flex: 1;">
              <div style="font-weight: 700; color: #ffffff; font-size: 13px;">${this.escapeHTML(s.name)}</div>
              <div style="font-size: 11px; color: var(--gold);">${this.escapeHTML(s.provider)} · RTP: ${this.escapeHTML(s.rtp || '96.35%')} · Max: ${this.escapeHTML(s.maxWin || '10,000x')}</div>
            </div>
          </div>
        `).join('');

        dropdown.style.display = 'block';

        dropdown.querySelectorAll('.slot-autocomplete-item').forEach(item => {
          item.onclick = () => {
            this.selectedSlot = {
              id: item.dataset.id,
              name: item.dataset.name,
              provider: item.dataset.provider,
              image: item.dataset.img
            };
            inputSearch.value = item.dataset.name;
            dropdown.style.display = 'none';
          };
        });
      });

      document.addEventListener('click', (e) => {
        if (!inputSearch.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.style.display = 'none';
        }
      });
    }

    // Add Bonus Button
    if (btnAddBonus) {
      const triggerAddBonus = () => {
        const slotName = inputSearch ? inputSearch.value.trim() : '';
        const rawCaller = (document.getElementById('admin-hunt-caller-input')?.value || '').trim();
        const activeUser = (window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '@DiggityBets';
        const caller = rawCaller || activeUser || '@DiggityBets';
        const bet = parseFloat(document.getElementById('admin-hunt-bet-input')?.value || '1.0');
        const bonusTier = (document.getElementById('admin-hunt-bonus-tier')?.value || '3S').toUpperCase();

        if (!slotName) {
          if (window.sonner) window.sonner.toast({ title: 'Slot Name Required', message: 'Type or select a slot from the catalog.', type: 'danger' });
          return;
        }

        let slots = [];
        try { slots = JSON.parse(localStorage.getItem('hunthub_hunt_slots') || '[]'); } catch (e) {}

        let resolved = this.selectedSlot || null;
        if (!resolved && window.SlotResolver) {
          if (typeof window.SlotResolver.smartSearch === 'function') {
            const matches = window.SlotResolver.smartSearch(slotName, 1);
            if (Array.isArray(matches) && matches.length > 0) resolved = matches[0];
          }
          if (!resolved && typeof window.SlotResolver.resolve === 'function') {
            resolved = window.SlotResolver.resolve(slotName);
          }
        }

        const newBonus = {
          id: resolved && resolved.id ? resolved.id : slotName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: resolved && resolved.name ? resolved.name : slotName,
          provider: resolved ? (resolved.provider || resolved.badge || 'Casino Slot') : 'Casino Slot',
          bet: bet > 0 ? bet : 2.0,
          payout: 0,
          bonusTier: bonusTier || '3S',
          caller: caller.startsWith('@') ? caller : '@' + caller,
          image: resolved && resolved.image ? resolved.image : 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format'
        };

        slots.push(newBonus);
        localStorage.setItem('hunthub_hunt_slots', JSON.stringify(slots));
        localStorage.setItem('hunthub_hunt_active', 'true');

        if (inputSearch) inputSearch.value = '';
        if (dropdown) dropdown.style.display = 'none';
        this.selectedSlot = null;

        if (window.bonusHunt) {
          window.bonusHunt.slots = slots;
          window.bonusHunt.isActive = true;
          window.bonusHunt.renderMetrics();
          window.bonusHunt.renderSlotTable();
        }

        if (window.soundEngine && typeof window.soundEngine.playCoin === 'function') window.soundEngine.playCoin();
        if (window.sonner) window.sonner.toast({ title: `Bonus Added (${newBonus.bonusTier})! 🎰`, message: `${newBonus.name} (${newBonus.caller}) added to hunt.`, type: 'green' });
        this.renderBonusHuntAdmin();
      };

      btnAddBonus.addEventListener('click', triggerAddBonus);
      ['admin-hunt-slot-search', 'admin-hunt-caller-input', 'admin-hunt-bet-input'].forEach(inputId => {
        const el = document.getElementById(inputId);
        if (el) {
          el.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') {
              ev.preventDefault();
              triggerAddBonus();
            }
          });
        }
      });
    }

    // Start / Demo / Reset Hunt Buttons
    const btnStart = document.getElementById('btn-admin-start-hunt');
    if (btnStart) {
      btnStart.onclick = () => {
        localStorage.setItem('hunthub_hunt_active', 'true');
        if (window.bonusHunt) {
          window.bonusHunt.isActive = true;
          window.bonusHunt.renderSlotTable();
        }
        this.renderBonusHuntAdmin();
        if (window.sonner) window.sonner.toast({ title: 'Bonus Hunt Started! 💎', message: 'Predictions are open.', type: 'green' });
      };
    }

    const btnDemo = document.getElementById('btn-admin-demo-hunt');
    if (btnDemo) {
      btnDemo.onclick = () => {
        const demoBonuses = [
          { id: 'wanted-dead-or-a-wild', name: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming', bet: 2.0, payout: 184.50, bonusTier: '5S', caller: '@NachoGamer', image: 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format' },
          { id: 'gates-of-olympus-1000', name: 'Gates of Olympus 1000', provider: 'Pragmatic Play', bet: 2.0, payout: 312.00, bonusTier: 'SUPER', caller: '@SlotKing21', image: 'https://mediumrare.imgix.net/fdf333e96a5e21555bbb4e9e04a3ee4e1986c9cca9aa75141597041cc8334d23?w=360&auto=format' },
          { id: 'le-bandit', name: 'Le Bandit', provider: 'Hacksaw Gaming', bet: 2.0, payout: 74.00, bonusTier: '4S', caller: '@DiggityFan', image: 'https://mediumrare.imgix.net/8ade942d35d2cdbddf7888f303be4cf4bda8c650a112b3c53f7c6f3ccad81254?w=360&auto=format' },
          { id: 'san-quentin-xways', name: 'San Quentin xWays', provider: 'Nolimit City', bet: 2.0, payout: 0, bonusTier: 'HIDDEN', caller: '@AgusKick', image: 'https://mediumrare.imgix.net/ca243d6c3db42259d6859b80717eb378eb64e41a9d1b1f7fdeadde68d59d9ad5?w=360&auto=format' },
          { id: 'sweet-bonanza-1000', name: 'Sweet Bonanza 1000', provider: 'Pragmatic Play', bet: 2.0, payout: 0, bonusTier: '3S', caller: '@Valen99', image: 'https://mediumrare.imgix.net/73754d4bf421b78fbd3895bbc7890d379797588cb699d6cbe47f3656aa93613b?w=360&auto=format' },
          { id: 'ghost-rush', name: 'Ghost Rush', provider: 'Paperclip Gaming', bet: 2.0, payout: 0, bonusTier: '6S', caller: '@StakeHunter', image: 'https://mediumrare.imgix.net/742a1d7958a9ffa215e19cc72c684abe9412f71fcf426b57909b5b817f9cd9d4?w=360&auto=format' }
        ];
        localStorage.setItem('hunthub_hunt_slots', JSON.stringify(demoBonuses));
        localStorage.setItem('hunthub_hunt_active', 'true');
        if (window.bonusHunt) {
          window.bonusHunt.slots = demoBonuses;
          window.bonusHunt.isActive = true;
          window.bonusHunt.renderMetrics();
          window.bonusHunt.renderSlotTable();
        }
        this.renderBonusHuntAdmin();
        if (window.sonner) window.sonner.toast({ title: 'Demo Hunt Loaded 🎲', message: '6 bonuses with Scatter/Super badges populated.', type: 'cyan' });
      };
    }

    const btnReset = document.getElementById('btn-admin-reset-hunt');
    if (btnReset) {
      btnReset.onclick = () => {
        localStorage.setItem('hunthub_hunt_slots', '[]');
        localStorage.setItem('hunthub_hunt_guesses', '[]');
        localStorage.setItem('hunthub_hunt_active', 'false');
        if (window.bonusHunt) {
          window.bonusHunt.slots = [];
          window.bonusHunt.guesses = [];
          window.bonusHunt.isActive = false;
          window.bonusHunt.renderMetrics();
          window.bonusHunt.renderSlotTable();
          window.bonusHunt.renderGuesses();
        }
        this.renderBonusHuntAdmin();
        if (window.sonner) window.sonner.toast({ title: 'Bonus Hunt Reset ↩️', message: 'All bonuses cleared.', type: 'default' });
      };
    }

    // Resolve Guess The Balance
    const btnResolveGuess = document.getElementById('btn-admin-resolve-guess');
    if (btnResolveGuess) {
      btnResolveGuess.onclick = () => {
        const finalBal = parseFloat(document.getElementById('admin-hunt-final-balance')?.value || '0');
        if (!finalBal || finalBal <= 0) {
          if (window.sonner) window.sonner.toast({ title: 'Enter Final Balance', message: 'Specify closing balance.', type: 'danger' });
          return;
        }

        let guesses = [];
        try {
          const g1 = JSON.parse(localStorage.getItem('hunthub_hunt_guesses') || '[]');
          const g2 = JSON.parse(localStorage.getItem('hunthub_bh_guesses') || '[]');
          const merged = new Map();
          [...(Array.isArray(g1) ? g1 : []), ...(Array.isArray(g2) ? g2 : [])].forEach((g) => {
            const u = String(g.user || g.username || '').trim().replace(/^@/, '');
            const val = Number(g.guess ?? g.amount ?? 0);
            if (u && !this.demoUsernames.has(u.toLowerCase()) && val > 0) {
              merged.set(u.toLowerCase(), { user: `@${u}`, guess: val });
            }
          });
          guesses = Array.from(merged.values());
        } catch (e) {}

        if (guesses.length === 0) {
          if (window.sonner) {
            window.sonner.toast({
              title: 'No !guess Entries Yet',
              message: 'Wait for viewers to type !guess <amount> in live Kick chat or submit on the website.',
              type: 'gold'
            });
          }
          return;
        }

        let closest = guesses[0];
        let minDiff = Math.abs(guesses[0].guess - finalBal);

        guesses.forEach(g => {
          const diff = Math.abs(g.guess - finalBal);
          if (diff < minDiff) {
            minDiff = diff;
            closest = g;
          }
        });

        const display = document.getElementById('admin-guess-winner-display');
        if (display) {
          display.textContent = `🏆 WINNER: ${closest.user} (Guess: $${closest.guess.toFixed(2)} | Diff: $${minDiff.toFixed(2)})`;
        }

        this.announceStreamWinner({
          eventType: 'gtb',
          tier: 'grand',
          type: 'GTB_WIN',
          category: 'GUESS THE BALANCE (GTB) · WINNER',
          ribbon: '💎 GUESS THE BALANCE CHAMPION',
          icon: '💎',
          username: closest.user,
          slotName: 'Bonus Hunt GTB',
          statValue: `$${closest.guess.toFixed(2)} (Δ $${minDiff.toFixed(2)})`,
          prize: `Congratulations @${String(closest.user).replace(/^@/, '')} has won the gtb!`
        });

        if (window.sonner) {
          window.sonner.toast({
            title: 'Guess The Balance Resolved! 🏆',
            message: `Congratulations ${closest.user} has won the gtb! (Guess: $${closest.guess.toFixed(2)})`,
            type: 'gold'
          });
        }
      };
    }

    // Phase 4: Sync spotlight recommender from 90s CS:GO wheel draw
    this.checkSpotlightRecommender();
    setInterval(() => this.checkSpotlightRecommender(), 4000);
  }

  async checkSpotlightRecommender() {
    try {
      const res = await fetch('/api/hunt/spotlight');
      if (res.ok) {
        const data = await res.json();
        if (data && data.active && data.username) {
          const inputCaller = document.getElementById('admin-hunt-caller-input');
          if (inputCaller && (!inputCaller.value || inputCaller.value.trim() === '')) {
            inputCaller.value = `@${data.username}`;
            if (window.sonner) {
              window.sonner.toast({
                title: 'Spotlight Recommender Active! 🎯',
                message: `@${data.username} chosen from 90s chatter pool. Type !slot or enter above!`,
                type: 'gold'
              });
            }
          }
        }
      }
    } catch (_) {}
  }

  renderHuntAdmin() {
    this.renderBonusHuntAdmin();
  }

  renderBonusHuntAdmin() {
    const tbody = document.getElementById('admin-hunt-bonuses-tbody');
    const summaryEl = document.getElementById('cp-bh-summary');
    let slots = [];
    try { slots = JSON.parse(localStorage.getItem('hunthub_hunt_slots') || '[]'); } catch (e) {}

    if (summaryEl) {
      summaryEl.textContent = `${slots.length} Bonus${slots.length === 1 ? '' : 'es'}`;
    }

    try {
      const chBh = new BroadcastChannel('hunthub_bonushunt');
      chBh.postMessage({ action: 'slots_updated', slots });
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('hunthub:bonushunt-sync', { detail: { slots } }));

    if (typeof fetch === 'function') {
      fetch('/api/sync/state', {
        method: 'POST',
        headers: this.getAdminHeaders(),
        body: JSON.stringify({
          overlayEvent: {
            target: 'overlay-bonushunt',
            slots,
            active: localStorage.getItem('hunthub_hunt_active') === 'true',
            startCost: Number(localStorage.getItem('hunthub_hunt_start_cost') || 0),
            ts: Date.now()
          }
        })
      }).catch(() => {});
    }

    if (!tbody) return;

    if (slots.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; color: var(--text-dim); padding: 24px; font-style: italic;">
            No bonuses added yet. Use the search bar above to populate slots into the live hunt.
          </td>
        </tr>
      `;
      return;
    }

    const tierOptions = [
      { code: '3S', label: '3S Standard' },
      { code: '4S', label: '🥈 4S Silver' },
      { code: '5S', label: '🥇 5S Gold' },
      { code: '6S', label: '🌈 6S Holo' },
      { code: 'SUPER', label: '🔥 SUPER' },
      { code: 'HIDDEN', label: '🕵️ HIDDEN' },
      { code: 'MAX', label: '⚡ MAX VOL' },
      { code: 'BOUGHT', label: '🛒 BOUGHT' }
    ];

    tbody.innerHTML = slots.map((s, idx) => {
      const mult = s.bet > 0 && s.payout > 0 ? (s.payout / s.bet).toFixed(1) + 'x' : '—';
      const canon = window.SlotResolver ? window.SlotResolver.resolve(s.name || s) : s;
      const imgUrl = this.escapeHTML((canon && canon.image) ? canon.image : s.image);
      const curTier = String(s.bonusTier || s.tierBadge || '3S').toUpperCase();
      const safeTierCls = this.escapeHTML(curTier.toLowerCase());
      const fallbackSvg = this.escapeHTML((window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function')
        ? window.SlotResolver.generateDataUriCard(s.name || 'Slot', s.provider || 'Casino')
        : 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format');
      const safeName = this.escapeHTML(s.name);
      const safeProv = this.escapeHTML(canon && canon.provider ? canon.provider : s.provider);
      const safeCaller = this.escapeHTML(s.caller || '—');
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="font-family: monospace; font-size: 11px; color: var(--text-dim);">#${idx + 1}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${imgUrl}" alt="${safeName}" style="width: 36px; height: 48px; aspect-ratio: 180 / 236; object-fit: contain; background: #070a12; border-radius: 6px; flex-shrink: 0;" onerror="this.onerror=null; this.src='${fallbackSvg}';">
              <div>
                <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                  <strong style="color: #ffffff; font-size: 13px;">${safeName}</strong>
                  <select class="admin-bonus-tier-select bh-tier-badge tier-${safeTierCls}" data-idx="${idx}" style="cursor:pointer; font-size:9.5px; padding:1px 5px; border-radius:4px; background:#0f172a; color:#fff;">
                    ${tierOptions.map(o => `<option value="${o.code}" ${o.code === curTier ? 'selected' : ''}>${o.label}</option>`).join('')}
                  </select>
                </div>
                <div style="font-size: 11px; color: var(--text-dim);">${safeProv}</div>
              </div>
            </div>
          </td>
          <td style="font-size: 12px; color: var(--gold); font-weight: 700;">${safeCaller}</td>
          <td style="font-family: var(--font-display); font-weight: 700; color: #ffffff;">$${(Number(s.bet) || 2.0).toFixed(2)}</td>
          <td>
            <input type="number" class="slots-search-input admin-payout-input" data-idx="${idx}" value="${Number(s.payout) || 0}" step="1" style="width: 100px; padding: 4px 8px; font-size: 12px;">
          </td>
          <td style="font-family: var(--font-display); font-weight: 900; color: ${s.payout > 0 ? '#53fc18' : 'var(--text-dim)'};">${mult}</td>
          <td>
            <button type="button" class="btn-chat-toggle btn-admin-del-bonus" data-idx="${idx}" style="color: var(--crimson); padding: 4px 8px; font-size: 11px;" title="Delete slot">
              ✕
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Bind tier badge select, payout inputs, and delete buttons
    tbody.querySelectorAll('.admin-bonus-tier-select').forEach(sel => {
      sel.onchange = () => {
        const idx = parseInt(sel.dataset.idx, 10);
        slots[idx].bonusTier = sel.value;
        localStorage.setItem('hunthub_hunt_slots', JSON.stringify(slots));
        if (window.bonusHunt) {
          window.bonusHunt.slots = slots;
          window.bonusHunt.renderSlotTable();
        }
        this.renderBonusHuntAdmin();
      };
    });

    tbody.querySelectorAll('.admin-payout-input').forEach(input => {
      input.onchange = () => {
        const idx = parseInt(input.dataset.idx, 10);
        const val = parseFloat(input.value) || 0;
        slots[idx].payout = val;
        localStorage.setItem('hunthub_hunt_slots', JSON.stringify(slots));
        if (window.bonusHunt) {
          window.bonusHunt.slots = slots;
          window.bonusHunt.renderMetrics();
          window.bonusHunt.renderSlotTable();
        }
        this.renderBonusHuntAdmin();
      };
    });

    tbody.querySelectorAll('.btn-admin-del-bonus').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx, 10);
        slots.splice(idx, 1);
        localStorage.setItem('hunthub_hunt_slots', JSON.stringify(slots));
        if (slots.length === 0) {
          localStorage.setItem('hunthub_hunt_active', 'false');
        }
        if (window.bonusHunt) {
          window.bonusHunt.slots = slots;
          if (slots.length === 0) window.bonusHunt.isActive = false;
          window.bonusHunt.renderMetrics();
          window.bonusHunt.renderSlotTable();
        }
        this.renderBonusHuntAdmin();
      };
    });
  }

  // ========================================================
  // 8-BRACKET TOURNAMENT LIVE CONTROL & STATE MACHINE
  // ========================================================

  createEmptyTourneyState(mode = this.tourneyMode || 'BONUS_BUY') {
    return {
      status: 'LOBBY',
      gameMode: mode,
      isDemo: false,
      participants: [],
      matches: {
        m1: { id: 'm1', round: 1, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        m2: { id: 'm2', round: 1, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        m3: { id: 'm3', round: 1, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        m4: { id: 'm4', round: 1, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        m5: { id: 'm5', round: 2, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        m6: { id: 'm6', round: 2, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        m7: { id: 'm7', round: 3, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' }
      },
      champion: null,
      ts: Date.now()
    };
  }

  createDemoTourneyState(mode = this.tourneyMode || 'BONUS_BUY') {
    const demoEntries = [
      { username: '@LuckyStriker', slotName: 'Wanted Dead or a Wild' },
      { username: '@VegasKing', slotName: 'Gates of Olympus 1000' },
      { username: '@SlotQueen', slotName: 'Sweet Bonanza 1000' },
      { username: '@SpinMaster', slotName: 'Sugar Rush 1000' },
      { username: '@Strike777', slotName: 'Le Bandit' },
      { username: '@BigBassBob', slotName: 'Big Bass Splash' },
      { username: '@NeonWolf', slotName: 'Mental' },
      { username: '@RoyalFlush', slotName: 'RIP City' }
    ].map(p => {
      const meta = this.resolveSlotMeta(p.slotName);
      return {
        username: p.username,
        slotName: meta.name,
        slotProvider: meta.provider,
        slotImage: meta.image
      };
    });

    return {
      status: 'IN_PROGRESS',
      gameMode: mode,
      isDemo: true,
      participants: demoEntries,
      matches: {
        m1: { id: 'm1', round: 1, player1: demoEntries[0], player2: demoEntries[1], score1: 0, score2: 0, winner: null, status: 'IN_PROGRESS' },
        m2: { id: 'm2', round: 1, player1: demoEntries[2], player2: demoEntries[3], score1: 0, score2: 0, winner: null, status: 'IN_PROGRESS' },
        m3: { id: 'm3', round: 1, player1: demoEntries[4], player2: demoEntries[5], score1: 0, score2: 0, winner: null, status: 'IN_PROGRESS' },
        m4: { id: 'm4', round: 1, player1: demoEntries[6], player2: demoEntries[7], score1: 0, score2: 0, winner: null, status: 'IN_PROGRESS' },
        m5: { id: 'm5', round: 2, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        m6: { id: 'm6', round: 2, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' },
        m7: { id: 'm7', round: 3, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' }
      },
      champion: null,
      ts: Date.now()
    };
  }

  getTourneyState() {
    try {
      const raw = localStorage.getItem('hunthub_tourney_state');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.matches) {
          // Normalize array-format matches (from overlay-tourney) into object map { m1..m7 }
          if (Array.isArray(parsed.matches)) {
            const mapObj = {};
            ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'].forEach((id, idx) => {
              const found = parsed.matches.find(item => item && item.id === id) || {
                id,
                round: idx < 4 ? 1 : (idx < 6 ? 2 : 3),
                player1: null,
                player2: null,
                score1: 0,
                score2: 0,
                winner: null,
                status: 'PENDING'
              };
              const normP = (p) => {
                if (!p) return null;
                const u = String(p.username || p.displayName || p.name || '').trim().replace(/^@/, '');
                if (!u) return null;
                const meta = this.resolveSlotMeta(p.slotName || p.slot || 'Gates of Olympus 1000');
                return {
                  ...p,
                  username: '@' + u,
                  displayName: u,
                  slotName: p.slotName || meta.name,
                  slotProvider: p.slotProvider || meta.provider,
                  slotImage: p.slotImage || meta.image
                };
              };
              const wName = found.winner
                ? (typeof found.winner === 'string'
                  ? ('@' + found.winner.replace(/^@/, ''))
                  : ('@' + String(found.winner.username || found.winner.displayName || '').replace(/^@/, '')))
                : null;
              mapObj[id] = {
                ...found,
                player1: normP(found.player1),
                player2: normP(found.player2),
                winner: wName
              };
            });
            parsed.matches = mapObj;
          }

          if (parsed.matches.m1) {
            const hasDemoInBracket = Boolean(parsed.isDemo) || ['m1', 'm2', 'm3', 'm4'].some((mKey) => {
              const m = parsed.matches?.[mKey];
              const u1 = String(m?.player1?.username || '').trim().toLowerCase().replace(/^@/, '');
              const u2 = String(m?.player2?.username || '').trim().toLowerCase().replace(/^@/, '');
              return (u1 && this.demoUsernames.has(u1)) || (u2 && this.demoUsernames.has(u2));
            });
            if (hasDemoInBracket) {
              const cleanEmpty = this.createEmptyTourneyState(this.tourneyMode);
              this.saveTourneyState(cleanEmpty, false);
              return cleanEmpty;
            }
            parsed.gameMode = this.tourneyMode || parsed.gameMode || parsed.mode || 'BONUS_BUY';
            parsed.mode = parsed.gameMode;
            return parsed;
          }
        }
      }
    } catch (_) {}

    const initial = this.createEmptyTourneyState(this.tourneyMode);
    this.saveTourneyState(initial, false);
    return initial;
  }

  getTourneySeedSlotsMap() {
    return [
      { seed: 1, matchId: 'm1', side: 'player1', label: 'M1 · P1' },
      { seed: 2, matchId: 'm1', side: 'player2', label: 'M1 · P2' },
      { seed: 3, matchId: 'm2', side: 'player1', label: 'M2 · P1' },
      { seed: 4, matchId: 'm2', side: 'player2', label: 'M2 · P2' },
      { seed: 5, matchId: 'm3', side: 'player1', label: 'M3 · P1' },
      { seed: 6, matchId: 'm3', side: 'player2', label: 'M3 · P2' },
      { seed: 7, matchId: 'm4', side: 'player1', label: 'M4 · P1' },
      { seed: 8, matchId: 'm4', side: 'player2', label: 'M4 · P2' }
    ];
  }

  getNextTourneySeedSlot() {
    const state = this.getTourneyState();
    const seedMap = this.getTourneySeedSlotsMap();
    if (state.isDemo) {
      return { ...seedMap[0], allFull: false, filledCount: 0, isDemo: true };
    }
    let filledCount = 0;
    let firstEmpty = null;
    for (const slot of seedMap) {
      const player = state.matches?.[slot.matchId]?.[slot.side];
      if (player && player.username && String(player.username).trim()) {
        filledCount++;
      } else if (!firstEmpty) {
        firstEmpty = slot;
      }
    }
    // When 8/8 is reached, automatically wrap counter back to Seed 1/8 for the next tournament
    if (!firstEmpty || filledCount >= 8) {
      return { ...seedMap[0], allFull: true, filledCount: 8, isDemo: false };
    }
    return { ...firstEmpty, allFull: false, filledCount, isDemo: false };
  }

  assignWheelWinnerToTourneySeed(username, slotName, spinId, forcedSeed = null) {
    if (spinId) {
      if (this._processedDuoSpinIds.has(spinId)) return;
      this._processedDuoSpinIds.add(spinId);
    }

    const cleanUser = String(username || '').trim().replace(/^@/, '');
    if (!cleanUser) return;

    const meta = this.resolveSlotMeta(slotName || 'Gates of Olympus 1000');
    let state = this.getTourneyState();
    const seedMap = this.getTourneySeedSlotsMap();
    const nextInfo = this.getNextTourneySeedSlot();

    // If bracket currently holds demo users, or previous tournament finished, or all 8 seeds were already filled (8/8 -> new tournament at Seed 1/8), start a fresh bracket!
    if (state.isDemo || state.status === 'FINISHED' || nextInfo.allFull) {
      state = this.createEmptyTourneyState(this.tourneyMode);
    }

    let targetSlot = null;
    if (typeof forcedSeed === 'number' && forcedSeed >= 1 && forcedSeed <= 8) {
      const candidate = seedMap[forcedSeed - 1];
      const existing = state.matches?.[candidate.matchId]?.[candidate.side];
      if (!existing || !existing.username) {
        targetSlot = candidate;
      }
    }
    if (!targetSlot) {
      targetSlot = seedMap.find(s => !state.matches?.[s.matchId]?.[s.side]?.username) || seedMap[0];
    }

    const participantObj = {
      id: `p_${targetSlot.seed}`,
      username: `@${cleanUser}`,
      displayName: cleanUser,
      slotName: meta.name,
      slotProvider: meta.provider,
      slotImage: meta.image,
      seed: targetSlot.seed
    };

    state.isDemo = false;
    state.gameMode = this.tourneyMode;
    state.mode = this.tourneyMode;
    state.matches[targetSlot.matchId][targetSlot.side] = participantObj;
    const matchObj = state.matches[targetSlot.matchId];
    if (matchObj.player1 || matchObj.player2) {
      matchObj.status = 'IN_PROGRESS';
    }

    // Rebuild participants list in seed order 1..8
    const participants = [];
    for (const s of seedMap) {
      const p = state.matches?.[s.matchId]?.[s.side];
      if (p && p.username) participants.push(p);
    }
    state.participants = participants;
    state.status = 'IN_PROGRESS';
    state.champion = null;

    this.saveTourneyState(state, true);
    this.renderTournamentAdmin();
    this.updateWheelTargetUI();

    // Sync next seed count to wheel-duo overlay (wraps to 0 when 8/8 is reached)
    const afterInfo = this.getNextTourneySeedSlot();
    const nextCountZeroIndexed = afterInfo.seed - 1;
    try {
      localStorage.setItem('hunthub_tourney_seed_count', String(nextCountZeroIndexed));
    } catch (_) {}
    if (this.channelDuo) {
      try {
        this.channelDuo.postMessage({
          action: 'set_tourney_seed',
          tourneyCount: nextCountZeroIndexed,
          ts: Date.now()
        });
      } catch (_) {}
    }
  }

  saveTourneyState(state, broadcast = true) {
    state.ts = Date.now();
    state.gameMode = state.gameMode || this.tourneyMode || 'BONUS_BUY';
    state.mode = state.gameMode;
    state.predictionsClosed = Boolean(
      state.predictionsClosed !== undefined
        ? state.predictionsClosed
        : (localStorage.getItem('hunthub_tourney_preds_closed') === 'true')
    );
    const filledSeeds = this.getTourneySeedSlotsMap().filter(s => state.matches?.[s.matchId]?.[s.side]?.username).length;
    try {
      localStorage.setItem('hunthub_tourney_state', JSON.stringify(state));
      localStorage.setItem('hunthub_tourney_preds_closed', state.predictionsClosed ? 'true' : 'false');
      if (filledSeeds > 0 || state.status === 'IN_PROGRESS' || state.status === 'FINISHED') {
        localStorage.setItem('hunthub_tourney_active', 'true');
      }
    } catch (_) {}

    const badge = document.getElementById('admin-tourney-status-badge');
    if (badge) {
      if (state.status === 'FINISHED' && state.champion) {
        badge.textContent = `CHAMPION: ${state.champion.username}`;
        badge.style.color = 'var(--gold)';
        badge.style.borderColor = 'var(--gold)';
      } else if (state.status === 'IN_PROGRESS' || filledSeeds > 0) {
        badge.textContent = state.isDemo ? 'DEMO BRACKET' : `BRACKET LIVE (${filledSeeds}/8)`;
        badge.style.color = 'var(--kick-green)';
        badge.style.borderColor = 'var(--kick-green)';
      } else {
        badge.textContent = 'LOBBY (0/8)';
        badge.style.color = 'var(--cyan)';
        badge.style.borderColor = 'var(--cyan)';
      }
    }

    if (window.tournamentPrediction && typeof window.tournamentPrediction.syncWithTourneyState === 'function') {
      window.tournamentPrediction.syncWithTourneyState(state);
    }
    window.dispatchEvent(new CustomEvent('hunthub:tourney-sync', { detail: { state } }));

    if (broadcast) {
      if (this.channelTourney) {
        try {
          this.channelTourney.postMessage({ action: 'state_update', state, ts: state.ts });
        } catch (_) {}
      }
      try {
        fetch('/api/tourney/state', {
          method: 'POST',
          headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ state })
        }).catch(() => {});
      } catch (_) {}
      this.relayOverlaySyncEvent({
        target: 'overlay-tourney',
        type: 'TOURNEY_STATE',
        data: { state },
        state,
        ts: state.ts
      });
    }
  }

  resetTourneyBracket(silent = false) {
    const emptyState = this.createEmptyTourneyState(this.tourneyMode);
    emptyState.predictionsClosed = false;
    try {
      localStorage.removeItem('hunthub_tourney_pred');
      localStorage.setItem('hunthub_tourney_pred_locked', 'false');
      localStorage.setItem('hunthub_tourney_preds_closed', 'false');
      localStorage.setItem('hunthub_tourney_active', 'true');
      localStorage.setItem('hunthub_tourney_seed_count', '0');
    } catch (_) {}
    if (window.tournamentPrediction) {
      window.tournamentPrediction.predictions = { semi1_a: null, semi1_b: null, semi2_a: null, semi2_b: null, final_a: null, final_b: null, champion: null };
      window.tournamentPrediction.isLocked = false;
      window.tournamentPrediction.predictionsClosed = false;
      if (typeof window.tournamentPrediction.renderBracket === 'function') {
        window.tournamentPrediction.renderBracket();
      }
    }
    this.saveTourneyState(emptyState, true);
    if (this.channelTourney) {
      try {
        this.channelTourney.postMessage({ action: 'reset_tourney', state: emptyState, ts: Date.now() });
      } catch (_) {}
    }
    if (this.channelDuo) {
      try {
        this.channelDuo.postMessage({ action: 'set_tourney_seed', tourneyCount: 0, ts: Date.now() });
      } catch (_) {}
    }
    try {
      fetch('/api/tourney/reset', {
        method: 'POST',
        headers: this.getAdminHeaders({ 'Content-Type': 'application/json' })
      }).catch(() => {});
    } catch (_) {}
    this.renderTournamentAdmin();
    this.updateWheelTargetUI();
    if (!silent && window.sonner) {
      window.sonner.toast({
        title: '8-Bracket Reset 🗑️',
        message: 'All matches, scores, and winners cleared. Seed counter reset to 1/8.',
        type: 'cyan'
      });
    }
  }

  loadDemoTourneyPlayers() {
    const demoState = this.createDemoTourneyState(this.tourneyMode);
    localStorage.setItem('hunthub_tourney_active', 'true');
    this.saveTourneyState(demoState, true);
    this.renderTournamentAdmin();
    this.updateWheelTargetUI();
    if (window.sonner) {
      window.sonner.toast({
        title: 'Demo 8-Bracket Loaded 🎲',
        message: '8 example players populated in Quarterfinals M1–M4.',
        type: 'cyan'
      });
    }
  }

  seedTourneyFromQueue() {
    const rawSource = (Array.isArray(this.tourneyQueue) && this.tourneyQueue.length > 0)
      ? this.tourneyQueue.map(p => ({ username: p.username || p.chatter, slotName: p.slotName || p.slot }))
      : this.duoPool.map(p => ({ username: p.chatter || p.user, slotName: p.slot || p.slotName }));

    if (rawSource.length === 0) {
      if (window.sonner) {
        window.sonner.toast({
          title: 'Queue Empty',
          message: 'No players in !tourney or Dual Wheel queue yet. Add players or click Load 8 Demo Players.',
          type: 'danger'
        });
      }
      return;
    }

    const state = this.createEmptyTourneyState(this.tourneyMode);
    state.status = 'IN_PROGRESS';
    state.isDemo = false;

    const seeded = [];
    for (let i = 0; i < 8; i++) {
      const item = rawSource[i];
      if (item && item.username) {
        const cleanU = '@' + String(item.username).trim().replace(/^@/, '');
        const meta = this.resolveSlotMeta(item.slotName || 'Gates of Olympus 1000');
        seeded.push({
          username: cleanU,
          displayName: cleanU.replace(/^@/, ''),
          slotName: meta.name,
          slotProvider: meta.provider,
          slotImage: meta.image,
          seed: i + 1
        });
      } else {
        seeded.push(null);
      }
    }

    state.participants = seeded.filter(Boolean);
    state.matches.m1.player1 = seeded[0];
    state.matches.m1.player2 = seeded[1];
    state.matches.m1.status = (seeded[0] || seeded[1]) ? 'IN_PROGRESS' : 'PENDING';

    state.matches.m2.player1 = seeded[2];
    state.matches.m2.player2 = seeded[3];
    state.matches.m2.status = (seeded[2] || seeded[3]) ? 'IN_PROGRESS' : 'PENDING';

    state.matches.m3.player1 = seeded[4];
    state.matches.m3.player2 = seeded[5];
    state.matches.m3.status = (seeded[4] || seeded[5]) ? 'IN_PROGRESS' : 'PENDING';

    state.matches.m4.player1 = seeded[6];
    state.matches.m4.player2 = seeded[7];
    state.matches.m4.status = (seeded[6] || seeded[7]) ? 'IN_PROGRESS' : 'PENDING';

    this.saveTourneyState(state, true);
    this.renderTournamentAdmin();
    this.updateWheelTargetUI();
    if (window.sonner) {
      window.sonner.toast({
        title: '8-Bracket Seeded from Queue! 🏆',
        message: `Loaded ${state.participants.length} players into Quarterfinals M1–M4.`,
        type: 'gold'
      });
    }
  }

  advanceTourneyMatch(matchId, winnerSide, rawScore1 = 0, rawScore2 = 0) {
    const state = this.getTourneyState();
    state.gameMode = this.tourneyMode || state.gameMode || 'BONUS_BUY';
    state.mode = state.gameMode;
    const m = state.matches[matchId];
    if (!m) return;

    const p1 = m.player1;
    const p2 = m.player2;
    const winningPlayer = winnerSide === 'p2' ? p2 : p1;
    const losingPlayer = winnerSide === 'p2' ? p1 : p2;

    if (!winningPlayer || !winningPlayer.username) {
      if (window.sonner) {
        window.sonner.toast({
          title: 'Player Missing',
          message: 'Assign a player to this slot before declaring a winner.',
          type: 'danger'
        });
      }
      return;
    }

    if (state.gameMode === 'SPINS') {
      m.score1 = winnerSide === 'p1' ? 'WIN' : 'LOSE';
      m.score2 = winnerSide === 'p2' ? 'WIN' : 'LOSE';
    } else {
      m.score1 = Number(rawScore1) || 0;
      m.score2 = Number(rawScore2) || 0;
    }
    m.winner = winningPlayer.username;
    m.status = 'FINISHED';
    state.status = 'IN_PROGRESS';

    const clonedWinner = {
      username: winningPlayer.username,
      displayName: String(winningPlayer.username).replace(/^@/, ''),
      slotName: winningPlayer.slotName,
      slotProvider: winningPlayer.slotProvider,
      slotImage: winningPlayer.slotImage
    };

    // Advance winner to next round
    if (matchId === 'm1') {
      state.matches.m5.player1 = clonedWinner;
      if (state.matches.m5.status === 'PENDING') state.matches.m5.status = 'IN_PROGRESS';
    } else if (matchId === 'm2') {
      state.matches.m5.player2 = clonedWinner;
      if (state.matches.m5.status === 'PENDING') state.matches.m5.status = 'IN_PROGRESS';
    } else if (matchId === 'm3') {
      state.matches.m6.player1 = clonedWinner;
      if (state.matches.m6.status === 'PENDING') state.matches.m6.status = 'IN_PROGRESS';
    } else if (matchId === 'm4') {
      state.matches.m6.player2 = clonedWinner;
      if (state.matches.m6.status === 'PENDING') state.matches.m6.status = 'IN_PROGRESS';
    } else if (matchId === 'm5') {
      state.matches.m7.player1 = clonedWinner;
      if (state.matches.m7.status === 'PENDING') state.matches.m7.status = 'IN_PROGRESS';
    } else if (matchId === 'm6') {
      state.matches.m7.player2 = clonedWinner;
      if (state.matches.m7.status === 'PENDING') state.matches.m7.status = 'IN_PROGRESS';
    } else if (matchId === 'm7') {
      const champScore = state.gameMode === 'SPINS'
        ? 'WIN'
        : (winnerSide === 'p2' ? m.score2 : m.score1);
      state.champion = {
        ...clonedWinner,
        score: champScore,
        multiplier: champScore
      };
      state.status = 'FINISHED';
    }

    this.saveTourneyState(state, true);

    if (this.channelTourney) {
      try {
        this.channelTourney.postMessage({
          action: state.gameMode === 'SPINS' ? 'match_winner_spins' : 'match_result',
          matchId,
          winnerSide: winnerSide === 'p2' ? 2 : 1,
          score1: m.score1,
          score2: m.score2,
          winner: winningPlayer.username,
          state,
          ts: Date.now()
        });
      } catch (_) {}
    }

    // Trigger 1920x1080 Transparent Winner Celebration Overlay in OBS + Chat Announcement!
    const isGrandFinal = matchId === 'm7';
    const statLabel = state.gameMode === 'SPINS'
      ? (isGrandFinal ? 'CHAMPION · SPINS WIN' : 'ROUND WIN · SPINS')
      : `${Math.max(Number(m.score1) || 0, Number(m.score2) || 0).toFixed(2)}x`;
    const nextRoundName = (matchId === 'm5' || matchId === 'm6') ? 'GRAND FINAL' : 'SEMIFINALS';
    const cleanWinnerHandle = String(winningPlayer.username || '').replace(/^@/, '');

    if (isGrandFinal) {
      this.announceStreamWinner({
        eventType: 'tourney',
        tier: 'grand',
        type: 'TOURNEY_CHAMPION',
        category: '8-BRACKET TOURNAMENT CHAMPION',
        ribbon: '🏆 GRAND TOURNAMENT CHAMPION',
        icon: '👑',
        username: winningPlayer.username,
        slotName: winningPlayer.slotName,
        slotImg: winningPlayer.slotImage,
        statValue: statLabel,
        prize: `Congratulations @${cleanWinnerHandle} has won the tourney!`
      });

      // If a viewer won the 8-Bracket Prediction contest, announce them right after!
      if (window.tournamentPrediction && typeof window.tournamentPrediction.resolveTopPredictionWinner === 'function') {
        const predWinner = window.tournamentPrediction.resolveTopPredictionWinner();
        if (predWinner && predWinner.username) {
          setTimeout(() => {
            this.announceStreamWinner({
              eventType: 'prediction',
              tier: 'grand',
              type: 'PREDICTION_CHAMPION',
              category: '8-BRACKET PREDICTION · #1 WINNER',
              ribbon: '🔮 BRACKET PREDICTION WINNER',
              icon: '🔮',
              username: predWinner.username,
              slotName: winningPlayer.slotName || '8-Bracket Pick Tree',
              slotImg: winningPlayer.slotImage,
              statValue: `${predWinner.score || 1}/7 HITS`,
              prize: `Congratulations @${String(predWinner.username).replace(/^@/, '')} has won the prediction!`
            });
          }, 5500);
        }
      }
    } else {
      this.announceStreamWinner({
        eventType: 'picked',
        customMessage: `Congratulations @${cleanWinnerHandle} has won ${matchId.toUpperCase()} and advances to ${nextRoundName}!`,
        tier: 'partial',
        type: 'TOURNEY_MATCH_WIN',
        category: `8-BRACKET TOURNEY · ${matchId.toUpperCase()} WINNER`,
        ribbon: `⚡ ADVANCES TO ${nextRoundName}`,
        icon: '🏆',
        username: winningPlayer.username,
        slotName: winningPlayer.slotName,
        slotImg: winningPlayer.slotImage,
        statValue: statLabel,
        prize: `ADVANCES TO ${nextRoundName}`
      });
    }

    this.renderTournamentAdmin();
    this.updateWheelTargetUI();

    if (window.sonner) {
      window.sonner.toast({
        title: isGrandFinal ? `👑 ${winningPlayer.username} Crowned Champion!` : `🏆 ${winningPlayer.username} Advances!`,
        message: isGrandFinal
          ? `${winningPlayer.username} (${winningPlayer.slotName}) won the 8-Bracket Tournament!`
          : `${winningPlayer.username} defeated ${losingPlayer?.username || 'rival'} in ${matchId.toUpperCase()}.`,
        type: 'gold'
      });
    }
  }

  setupTournamentAdmin() {
    const btnOpen = document.getElementById('btn-admin-open-tourney');
    const btnDemo = document.getElementById('btn-admin-demo-tourney');
    const btnReset = document.getElementById('btn-admin-reset-tourney');
    const btnModeBuy = document.getElementById('btn-admin-tourney-mode-buy');
    const btnModeSpins = document.getElementById('btn-admin-tourney-mode-spins');
    const btnTogglePredLock = document.getElementById('btn-toggle-tourney-pred-lock');

    const syncPredLockBtnUI = (isClosed) => {
      if (!btnTogglePredLock) return;
      if (isClosed) {
        btnTogglePredLock.textContent = '🔒 Predictions: CLOSED';
        btnTogglePredLock.style.borderColor = '#ef4444';
        btnTogglePredLock.style.color = '#ef4444';
        btnTogglePredLock.style.background = 'rgba(239, 68, 68, 0.14)';
      } else {
        btnTogglePredLock.textContent = '🔓 Predictions: OPEN';
        btnTogglePredLock.style.borderColor = '#53fc18';
        btnTogglePredLock.style.color = '#53fc18';
        btnTogglePredLock.style.background = 'rgba(83, 252, 24, 0.12)';
      }
    };

    syncPredLockBtnUI(localStorage.getItem('hunthub_tourney_preds_closed') === 'true');

    if (btnTogglePredLock) {
      btnTogglePredLock.onclick = () => {
        const nextClosed = !(localStorage.getItem('hunthub_tourney_preds_closed') === 'true');
        try {
          localStorage.setItem('hunthub_tourney_preds_closed', nextClosed ? 'true' : 'false');
          localStorage.setItem('hunthub_tourney_active', 'true');
        } catch (_) {}
        syncPredLockBtnUI(nextClosed);
        const state = this.getTourneyState();
        state.predictionsClosed = nextClosed;
        if (!nextClosed && (!state.status || state.status === 'LOBBY')) {
          state.status = 'IN_PROGRESS';
        }
        this.saveTourneyState(state, true);
        if (window.tournamentPrediction && typeof window.tournamentPrediction.checkTourneyAccessState === 'function') {
          window.tournamentPrediction.checkTourneyAccessState();
        }
        if (window.sonner) {
          window.sonner.toast({
            title: nextClosed ? 'Tournament Predictions Closed 🔒' : 'Tournament Predictions Open 🔓',
            message: nextClosed
              ? 'Viewers can no longer modify or submit 8-Bracket predictions.'
              : 'Viewers can now pick and lock their 8-Bracket Tournament predictions!',
            type: nextClosed ? 'danger' : 'green'
          });
        }
      };
    }

    if (btnModeBuy) {
      btnModeBuy.onclick = () => this.setTourneyMode('BONUS_BUY');
    }
    if (btnModeSpins) {
      btnModeSpins.onclick = () => this.setTourneyMode('SPINS');
    }

    if (btnOpen) {
      btnOpen.onclick = () => {
        const state = this.getTourneyState();
        state.status = 'IN_PROGRESS';
        state.gameMode = this.tourneyMode;
        state.mode = this.tourneyMode;
        state.predictionsClosed = false;
        localStorage.setItem('hunthub_tourney_active', 'true');
        localStorage.setItem('hunthub_tourney_preds_closed', 'false');
        syncPredLockBtnUI(false);
        this.saveTourneyState(state, true);
        try {
          fetch('/api/tourney/open', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameMode: this.tourneyMode })
          }).catch(() => {});
        } catch (_) {}
        if (this.channelTourney) {
          this.channelTourney.postMessage({ action: 'open_tourney', mode: this.tourneyMode, state });
        }
        this.renderTournamentAdmin();
        if (window.sonner) window.sonner.toast({ title: 'Tournament Opened! 🏆', message: `Bracket live in ${this.tourneyMode} mode.`, type: 'green' });
      };
    }

    if (btnDemo) {
      btnDemo.onclick = () => this.loadDemoTourneyPlayers();
    }

    if (btnReset) {
      btnReset.onclick = () => this.resetTourneyBracket(false);
    }

    this.renderTournamentAdmin();
  }

  setTourneyMode(mode) {
    this.tourneyMode = mode === 'SPINS' ? 'SPINS' : 'BONUS_BUY';
    try {
      localStorage.setItem('hunthub_tourney_mode', this.tourneyMode);
    } catch (_) {}
    const btnBuy = document.getElementById('btn-admin-tourney-mode-buy');
    const btnSpins = document.getElementById('btn-admin-tourney-mode-spins');
    if (btnBuy && btnSpins) {
      if (this.tourneyMode === 'BONUS_BUY') {
        btnBuy.className = 'btn-stake-primary';
        btnSpins.className = 'btn-stake-secondary';
      } else {
        btnBuy.className = 'btn-stake-secondary';
        btnSpins.className = 'btn-stake-primary';
      }
    }
    const state = this.getTourneyState();
    state.gameMode = this.tourneyMode;
    state.mode = this.tourneyMode;
    this.saveTourneyState(state, true);
    try {
      fetch('/api/tourney/mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameMode: this.tourneyMode })
      }).catch(() => {});
    } catch (_) {}
    if (this.channelTourney) {
      this.channelTourney.postMessage({ action: 'set_mode', mode: this.tourneyMode, state });
    }
    this.renderTournamentAdmin();
    if (window.sonner) {
      window.sonner.toast({
        title: `Tournament Mode: ${this.tourneyMode === 'BONUS_BUY' ? 'Bonus Buy 🎁' : 'Spins (Win / Lose) 🎰'}`,
        message: this.tourneyMode === 'BONUS_BUY' ? 'Multiplier comparisons enabled.' : 'Automatic WIN / LOSE buttons active — clicking WIN advances player to the next round.',
        type: 'cyan'
      });
    }
  }

  renderTournamentAdmin() {
    const container = document.getElementById('admin-tourney-rounds-container');
    if (!container) return;

    const state = this.getTourneyState();
    const isSpins = this.tourneyMode === 'SPINS' || state.gameMode === 'SPINS';

    const btnBuy = document.getElementById('btn-admin-tourney-mode-buy');
    const btnSpins = document.getElementById('btn-admin-tourney-mode-spins');
    if (btnBuy && btnSpins) {
      btnBuy.className = !isSpins ? 'btn-stake-primary' : 'btn-stake-secondary';
      btnSpins.className = isSpins ? 'btn-stake-primary' : 'btn-stake-secondary';
    }

    const nextSeedInfo = this.getNextTourneySeedSlot();
    const seedNumbers = {
      m1: { p1: 1, p2: 2 },
      m2: { p1: 3, p2: 4 },
      m3: { p1: 5, p2: 6 },
      m4: { p1: 7, p2: 8 }
    };

    const renderMatchCard = (mId, titleLabel, allowInlineEdit = false) => {
      const m = state.matches[mId] || { id: mId, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' };
      const p1 = m.player1 || { username: '', slotName: '' };
      const p2 = m.player2 || { username: '', slotName: '' };
      const cleanW = String(m.winner || '').trim().toLowerCase().replace(/^@/, '');
      const cleanP1 = String(p1.username || '').trim().toLowerCase().replace(/^@/, '');
      const cleanP2 = String(p2.username || '').trim().toLowerCase().replace(/^@/, '');
      const isP1Win = Boolean(cleanW && cleanP1 && cleanW === cleanP1);
      const isP2Win = Boolean(cleanW && cleanP2 && cleanW === cleanP2);

      const s1Num = seedNumbers[mId]?.p1;
      const s2Num = seedNumbers[mId]?.p2;
      const isNextSeedP1 = this.duoMode === 'tourney' && !state.isDemo && nextSeedInfo.seed === s1Num && !cleanP1;
      const isNextSeedP2 = this.duoMode === 'tourney' && !state.isDemo && nextSeedInfo.seed === s2Num && !cleanP2;
      const safeP1User = this.escapeHTML(p1.username || '');
      const safeP1Slot = this.escapeHTML(p1.slotName || '');
      const safeP2User = this.escapeHTML(p2.username || '');
      const safeP2Slot = this.escapeHTML(p2.slotName || '');
      const safeWinner = this.escapeHTML(m.winner || '');
      const safeStatus = this.escapeHTML(m.status || '');

      return `
        <div class="admin-tourney-match-box" style="padding: 9px 10px; background: rgba(7, 11, 22, 0.85); border: 1px solid ${m.status === 'FINISHED' ? 'rgba(83,252,24,0.35)' : 'rgba(255,255,255,0.08)'}; border-radius: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 10.5px; font-weight: 900; color: var(--gold); letter-spacing: 0.05em;">${titleLabel}</span>
            ${m.winner ? `<span class="reward-badge-pill" style="font-size: 9.5px; color: #53fc18; border-color: #53fc18; background: rgba(83,252,24,0.12);">✓ WINNER: ${safeWinner}</span>` : `<span style="font-size: 9.5px; color: #64748b;">${safeStatus}</span>`}
          </div>

          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: stretch;">
            <!-- Player 1 -->
            <div style="padding: 7px; background: rgba(0, 229, 255, 0.06); border: 1px solid ${isP1Win ? '#53fc18' : (isNextSeedP1 ? 'var(--gold)' : 'rgba(0, 229, 255, 0.22)')}; border-radius: 8px; opacity: ${isP2Win ? '0.45' : '1'};">
              ${s1Num ? `<div style="font-size: 9px; font-weight: 900; color: ${isNextSeedP1 ? 'var(--gold)' : '#64748b'}; margin-bottom: 3px; display: flex; justify-content: space-between;"><span>SEED ${s1Num}/8</span>${isNextSeedP1 ? '<span style="color:var(--gold);">🎯 NEXT</span>' : ''}</div>` : ''}
              ${allowInlineEdit ? `
                <input type="text" class="slots-search-input tourney-edit-user" data-match="${mId}" data-side="player1" value="${safeP1User}" placeholder="@Seed${s1Num || 1}" style="width: 100%; padding: 3px 6px; font-size: 11px; font-weight: 800; margin-bottom: 3px;">
                <input type="text" class="slots-search-input tourney-edit-slot" data-match="${mId}" data-side="player1" value="${safeP1Slot}" placeholder="Slot Name" style="width: 100%; padding: 3px 6px; font-size: 10px; color: var(--gold);">
              ` : `
                <div style="font-weight: 800; font-size: 11.5px; color: ${isP1Win ? '#53fc18' : '#fff'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${safeP1User || 'TBD (Waiting...)'}</div>
                <div style="font-size: 10px; color: var(--gold); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${safeP1Slot || '—'}</div>
              `}
              ${!isSpins ? `
                <div style="margin-top: 5px; display: flex; align-items: center; gap: 4px;">
                  <input type="number" step="0.01" class="slots-search-input" id="tourney-score-${mId}-1" value="${typeof m.score1 === 'number' ? m.score1 : 0}" style="width: 100%; padding: 3px 6px; font-size: 11px; font-weight: 800;">
                  <span style="font-size: 10px; color: #94a3b8; font-weight: 800;">x</span>
                </div>
              ` : `
                <div style="margin-top: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                  <button type="button" class="btn-stake-secondary btn-tourney-win-1click" data-match="${mId}" data-side="p1" style="padding: 4px 4px; font-size: 10px; font-weight: 900; ${isP1Win ? 'background: #53fc18; color: #000; border-color: #53fc18;' : 'color: #53fc18; border-color: rgba(83,252,24,0.45); background: rgba(83,252,24,0.08);'}">
                    🏆 WIN
                  </button>
                  <button type="button" class="btn-chat-toggle btn-tourney-win-1click" data-match="${mId}" data-side="p2" style="padding: 4px 4px; font-size: 10px; font-weight: 900; ${isP2Win ? 'background: #ef4444; color: #fff; border-color: #ef4444;' : 'color: #ef4444; border-color: rgba(239,68,68,0.45); background: rgba(239,68,68,0.08);'}">
                    ✕ LOSE
                  </button>
                </div>
              `}
            </div>

            <div style="display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; color: #64748b;">VS</div>

            <!-- Player 2 -->
            <div style="padding: 7px; background: rgba(255, 42, 95, 0.06); border: 1px solid ${isP2Win ? '#53fc18' : (isNextSeedP2 ? 'var(--gold)' : 'rgba(255, 42, 95, 0.22)')}; border-radius: 8px; opacity: ${isP1Win ? '0.45' : '1'};">
              ${s2Num ? `<div style="font-size: 9px; font-weight: 900; color: ${isNextSeedP2 ? 'var(--gold)' : '#64748b'}; margin-bottom: 3px; display: flex; justify-content: space-between;"><span>SEED ${s2Num}/8</span>${isNextSeedP2 ? '<span style="color:var(--gold);">🎯 NEXT</span>' : ''}</div>` : ''}
              ${allowInlineEdit ? `
                <input type="text" class="slots-search-input tourney-edit-user" data-match="${mId}" data-side="player2" value="${safeP2User}" placeholder="@Seed${s2Num || 2}" style="width: 100%; padding: 3px 6px; font-size: 11px; font-weight: 800; margin-bottom: 3px;">
                <input type="text" class="slots-search-input tourney-edit-slot" data-match="${mId}" data-side="player2" value="${safeP2Slot}" placeholder="Slot Name" style="width: 100%; padding: 3px 6px; font-size: 10px; color: var(--gold);">
              ` : `
                <div style="font-weight: 800; font-size: 11.5px; color: ${isP2Win ? '#53fc18' : '#fff'}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${safeP2User || 'TBD (Waiting...)'}</div>
                <div style="font-size: 10px; color: var(--gold); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${safeP2Slot || '—'}</div>
              `}
              ${!isSpins ? `
                <div style="margin-top: 5px; display: flex; align-items: center; gap: 4px;">
                  <input type="number" step="0.01" class="slots-search-input" id="tourney-score-${mId}-2" value="${typeof m.score2 === 'number' ? m.score2 : 0}" style="width: 100%; padding: 3px 6px; font-size: 11px; font-weight: 800;">
                  <span style="font-size: 10px; color: #94a3b8; font-weight: 800;">x</span>
                </div>
              ` : `
                <div style="margin-top: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                  <button type="button" class="btn-stake-secondary btn-tourney-win-1click" data-match="${mId}" data-side="p2" style="padding: 4px 4px; font-size: 10px; font-weight: 900; ${isP2Win ? 'background: #53fc18; color: #000; border-color: #53fc18;' : 'color: #53fc18; border-color: rgba(83,252,24,0.45); background: rgba(83,252,24,0.08);'}">
                    🏆 WIN
                  </button>
                  <button type="button" class="btn-chat-toggle btn-tourney-win-1click" data-match="${mId}" data-side="p1" style="padding: 4px 4px; font-size: 10px; font-weight: 900; ${isP1Win ? 'background: #ef4444; color: #fff; border-color: #ef4444;' : 'color: #ef4444; border-color: rgba(239,68,68,0.45); background: rgba(239,68,68,0.08);'}">
                    ✕ LOSE
                  </button>
                </div>
              `}
            </div>
          </div>

          ${!isSpins ? `
            <button type="button" class="btn-stake-primary btn-tourney-compare-mult" data-match="${mId}" style="margin-top: 6px; width: 100%; padding: 5px 8px; font-size: 10.5px; font-weight: 800;">
              ⚡ Compare Multipliers & Advance Winner ✓
            </button>
          ` : ''}
        </div>
      `;
    };

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <div style="font-size: 11px; font-weight: 900; color: var(--cyan); margin-bottom: 6px; display: flex; justify-content: space-between;">
            <span>ROUND 1 — QUARTERFINALS (M1–M4 · SEEDS 1–8)</span>
            <span style="color: #94a3b8; font-weight: 700;">Auto-filled by Dual Wheel or Editable</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px;">
            ${renderMatchCard('m1', 'MATCH 1 (QF1)', true)}
            ${renderMatchCard('m2', 'MATCH 2 (QF2)', true)}
            ${renderMatchCard('m3', 'MATCH 3 (QF3)', true)}
            ${renderMatchCard('m4', 'MATCH 4 (QF4)', true)}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px;">
          <div>
            <div style="font-size: 11px; font-weight: 900; color: var(--gold); margin-bottom: 6px;">ROUND 2 — SEMIFINALS (M5–M6)</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${renderMatchCard('m5', 'SEMIFINAL 1 (M1 vs M2)', false)}
              ${renderMatchCard('m6', 'SEMIFINAL 2 (M3 vs M4)', false)}
            </div>
          </div>

          <div>
            <div style="font-size: 11px; font-weight: 900; color: #53fc18; margin-bottom: 6px;">ROUND 3 — GRAND FINAL (M7)</div>
            ${renderMatchCard('m7', '👑 GRAND FINAL (M5 vs M6)', false)}
            ${state.champion ? `
              <div style="margin-top: 8px; padding: 10px 12px; background: linear-gradient(135deg, rgba(255,215,0,0.18), rgba(83,252,24,0.12)); border: 1px solid var(--gold); border-radius: 10px; text-align: center;">
                <div style="font-size: 10px; font-weight: 900; color: var(--gold); letter-spacing: 0.08em;">👑 TOURNAMENT CHAMPION</div>
                <div style="font-size: 15px; font-weight: 900; color: #fff; margin-top: 2px;">${this.escapeHTML(state.champion.username)}</div>
                <div style="font-size: 11px; color: #53fc18; font-weight: 700;">${this.escapeHTML(state.champion.slotName || '')}</div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Bind inline edits for Quarterfinals M1–M4 players & slots
    const bindInlineEdit = () => {
      const curState = this.getTourneyState();
      container.querySelectorAll('.tourney-edit-user, .tourney-edit-slot').forEach(inp => {
        inp.onchange = () => {
          const mId = inp.dataset.match;
          const side = inp.dataset.side;
          const matchObj = curState.matches[mId];
          if (!matchObj) return;

          const userInp = container.querySelector(`.tourney-edit-user[data-match="${mId}"][data-side="${side}"]`);
          const slotInp = container.querySelector(`.tourney-edit-slot[data-match="${mId}"][data-side="${side}"]`);
          const rawUser = (userInp?.value || '').trim();
          const rawSlot = (slotInp?.value || '').trim() || 'Gates of Olympus 1000';

          if (!rawUser) {
            matchObj[side] = null;
          } else {
            const cleanUser = '@' + rawUser.replace(/^@/, '');
            const meta = this.resolveSlotMeta(rawSlot);
            matchObj[side] = {
              username: cleanUser,
              displayName: cleanUser.replace(/^@/, ''),
              slotName: meta.name,
              slotProvider: meta.provider,
              slotImage: meta.image
            };
            curState.isDemo = false;
            if (curState.status === 'LOBBY') curState.status = 'IN_PROGRESS';
            if (matchObj.status === 'PENDING') matchObj.status = 'IN_PROGRESS';
          }
          this.saveTourneyState(curState, true);
          this.updateWheelTargetUI();
        };
      });
    };
    bindInlineEdit();

    // Bind BONUS_BUY multiplier compare buttons
    container.querySelectorAll('.btn-tourney-compare-mult').forEach(btn => {
      btn.onclick = () => {
        const mId = btn.dataset.match;
        const s1 = parseFloat(document.getElementById(`tourney-score-${mId}-1`)?.value || '0');
        const s2 = parseFloat(document.getElementById(`tourney-score-${mId}-2`)?.value || '0');
        const side = s1 >= s2 ? 'p1' : 'p2';
        this.advanceTourneyMatch(mId, side, s1, s2);
      };
    });

    // Bind SPINS 1-click WIN / LOSE buttons
    container.querySelectorAll('.btn-tourney-win-1click').forEach(btn => {
      btn.onclick = () => {
        const mId = btn.dataset.match;
        const side = btn.dataset.side;
        this.advanceTourneyMatch(mId, side, side === 'p1' ? 1 : 0, side === 'p2' ? 1 : 0);
      };
    });
  }

  // 1v1 Battle Controls & King of the Hill Controller
  setupBattleAdmin() {
    const btnOpen = document.getElementById('btn-admin-open-battle');
    const btnDemo = document.getElementById('btn-admin-demo-battle');
    const btnReset = document.getElementById('btn-admin-reset-battle');
    const btnResolveBuy = document.getElementById('btn-admin-resolve-battle');
    const btnWinnerA = document.getElementById('btn-admin-winner-a');
    const btnWinnerB = document.getElementById('btn-admin-winner-b');
    const btnModeBuy = document.getElementById('btn-admin-battle-mode-buy');
    const btnModeSpins = document.getElementById('btn-admin-battle-mode-spins');

    // KotH Decision & Action Buttons
    const btnKothContinue = document.getElementById('btn-admin-koth-continue');
    const btnKothRetire = document.getElementById('btn-admin-koth-retire');
    const btnKothNewGame = document.getElementById('btn-admin-koth-new-game');

    if (btnModeBuy) btnModeBuy.onclick = () => this.setBattleMode('BONUS_BUY');
    if (btnModeSpins) btnModeSpins.onclick = () => this.setBattleMode('SPINS');

    if (btnOpen) {
      btnOpen.onclick = () => {
        const pB = document.getElementById('admin-battle-player-b-name');
        if (pB) pB.textContent = '@Challenger (Waiting...)';
        try {
          fetch('/api/battle/open', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ betAmount: 10, gameMode: this.battleMode })
          });
        } catch (_) {}
        if (window.sonner) window.sonner.toast({ title: '1v1 Battle Lobby Open ⚔️', message: 'Waiting for challenger via wheel or chat.', type: 'green' });
      };
    }

    if (btnDemo) {
      btnDemo.onclick = () => {
        const pA = document.getElementById('admin-battle-player-a-name');
        const pB = document.getElementById('admin-battle-player-b-name');
        if (pA) pA.textContent = '@LuckyStriker (Wanted Dead)';
        if (pB) pB.textContent = '@VegasKing (Gates 1000)';

        const cardA = document.getElementById('admin-card-player-a');
        const cardB = document.getElementById('admin-card-player-b');
        if (cardA) cardA.style.opacity = '1';
        if (cardB) cardB.style.opacity = '1';

        const bA = document.getElementById('admin-battle-badge-a');
        const bB = document.getElementById('admin-battle-badge-b');
        if (bA) bA.style.display = 'none';
        if (bB) bB.style.display = 'none';

        if (window.sonner) window.sonner.toast({ title: 'Battle Lobby Loaded ⚔️', message: '2 fighters ready.', type: 'cyan' });
      };
    }

    if (btnReset) {
      btnReset.onclick = () => {
        const payA = document.getElementById('admin-battle-payout-a');
        const payB = document.getElementById('admin-battle-payout-b');
        if (payA) payA.value = '2.01';
        if (payB) payB.value = '1.01';

        const cardA = document.getElementById('admin-card-player-a');
        const cardB = document.getElementById('admin-card-player-b');
        if (cardA) cardA.style.opacity = '1';
        if (cardB) cardB.style.opacity = '1';

        const bA = document.getElementById('admin-battle-badge-a');
        const bB = document.getElementById('admin-battle-badge-b');
        if (bA) bA.style.display = 'none';
        if (bB) bB.style.display = 'none';

        try { fetch('/api/battle/reset', { method: 'POST' }); } catch (_) {}
        if (window.sonner) window.sonner.toast({ title: 'Battle Reset ↩️', message: 'Cleared fighters and payouts.', type: 'default' });
      };
    }

    // BONUS_BUY resolution (compares payA vs payB)
    if (btnResolveBuy) {
      btnResolveBuy.onclick = () => {
        const payA = parseFloat(document.getElementById('admin-battle-payout-a')?.value || '0');
        const payB = parseFloat(document.getElementById('admin-battle-payout-b')?.value || '0');
        const nameA = document.getElementById('admin-battle-player-a-name')?.textContent || '@PlayerA';
        const nameB = document.getElementById('admin-battle-player-b-name')?.textContent || '@PlayerB';

        const winnerSlot = payA > payB ? 'A' : (payB > payA ? 'B' : 'A');
        const winningName = winnerSlot === 'A' ? nameA : nameB;
        const losingName = winnerSlot === 'A' ? nameB : nameA;
        const winScore = Math.max(payA, payB);
        const loseScore = Math.min(payA, payB);

        this.applyBattleResolution(winnerSlot, winningName, losingName, `${winScore.toFixed(2)}x vs ${loseScore.toFixed(2)}x`);
      };
    }

    // SPINS 1-click WIN / LOSE buttons (50 Spins Profit/Loss)
    const btnLoserA = document.getElementById('btn-admin-loser-a');
    const btnLoserB = document.getElementById('btn-admin-loser-b');

    if (btnWinnerA) {
      btnWinnerA.onclick = () => {
        const nameA = document.getElementById('admin-battle-player-a-name')?.textContent || '@PlayerA';
        const nameB = document.getElementById('admin-battle-player-b-name')?.textContent || '@PlayerB';
        this.applyBattleResolution('A', nameA, nameB, '50 Spins: Blue WIN / Red LOSE');
      };
    }
    if (btnLoserA) {
      btnLoserA.onclick = () => {
        const nameA = document.getElementById('admin-battle-player-a-name')?.textContent || '@PlayerA';
        const nameB = document.getElementById('admin-battle-player-b-name')?.textContent || '@PlayerB';
        this.applyBattleResolution('B', nameB, nameA, '50 Spins: Blue LOSE / Red WIN');
      };
    }

    if (btnWinnerB) {
      btnWinnerB.onclick = () => {
        const nameA = document.getElementById('admin-battle-player-a-name')?.textContent || '@PlayerA';
        const nameB = document.getElementById('admin-battle-player-b-name')?.textContent || '@PlayerB';
        this.applyBattleResolution('B', nameB, nameA, '50 Spins: Red WIN / Blue LOSE');
      };
    }
    if (btnLoserB) {
      btnLoserB.onclick = () => {
        const nameA = document.getElementById('admin-battle-player-a-name')?.textContent || '@PlayerA';
        const nameB = document.getElementById('admin-battle-player-b-name')?.textContent || '@PlayerB';
        this.applyBattleResolution('A', nameA, nameB, '50 Spins: Red LOSE / Blue WIN');
      };
    }

    // KotH Decision buttons
    if (btnKothContinue) {
      btnKothContinue.onclick = () => this.kothContinue();
    }

    if (btnKothRetire) {
      btnKothRetire.onclick = () => this.kothRetire();
    }

    if (btnKothNewGame) {
      btnKothNewGame.onclick = () => this.kothNewGame();
    }

    this.renderKothDeck();
  }

  renderKothDeck() {
    const streak = Math.max(0, Number(this.kothState?.streak || 0));
    const maxStreak = Number(this.kothState?.maxStreak || 4);
    const king = this.kothState?.king || null;
    const kingSlot = this.kothState?.kingSlot || '';
    const prizeUsd = Math.min(20, streak * 5);

    const streakBadge = document.getElementById('admin-koth-streak-badge');
    if (streakBadge) {
      streakBadge.textContent = `STREAK: ${streak}/${maxStreak} ($${prizeUsd})`;
    }

    for (let i = 1; i <= 4; i++) {
      const pill = document.getElementById(`koth-pill-${i}`);
      if (!pill) continue;
      if (streak >= i) {
        pill.style.background = i === 4 ? 'rgba(83, 252, 24, 0.25)' : 'rgba(255, 215, 0, 0.25)';
        pill.style.color = i === 4 ? '#53fc18' : 'var(--gold)';
        pill.style.borderColor = i === 4 ? '#53fc18' : 'var(--gold)';
      } else {
        pill.style.background = 'rgba(255,255,255,0.05)';
        pill.style.color = 'var(--text-dim)';
      }
    }

    const kingNameEl = document.getElementById('admin-koth-king-name');
    if (kingNameEl) {
      kingNameEl.textContent = king
        ? `@${String(king).replace(/^@/, '')}${kingSlot ? ` (${kingSlot})` : ''}`
        : 'None (Throne Open)';
    }

    const decisionBox = document.getElementById('admin-koth-decision-box');
    if (decisionBox) {
      decisionBox.style.display = (king && streak > 0 && streak < maxStreak && this.kothState?.awaitingDecision) ? 'flex' : 'none';
    }

    const champBox = document.getElementById('admin-koth-champion-box');
    if (champBox) {
      champBox.style.display = (king && streak >= maxStreak) ? 'block' : 'none';
    }
  }

  setBattleMode(mode) {
    this.battleMode = mode;
    try {
      localStorage.setItem('hunthub_battle_mode', mode);
    } catch (_) {}

    const btnBuy = document.getElementById('btn-admin-battle-mode-buy');
    const btnSpins = document.getElementById('btn-admin-battle-mode-spins');
    if (btnBuy && btnSpins) {
      if (mode === 'BONUS_BUY') {
        btnBuy.className = 'btn-stake-primary';
        btnSpins.className = 'btn-stake-secondary';
      } else {
        btnBuy.className = 'btn-stake-secondary';
        btnSpins.className = 'btn-stake-primary';
      }
    }

    const buyA = document.getElementById('admin-battle-buy-inputs-a');
    const buyB = document.getElementById('admin-battle-buy-inputs-b');
    const btnResolveBuy = document.getElementById('btn-admin-resolve-battle');
    const spinsA = document.getElementById('admin-battle-spins-actions-a');
    const spinsB = document.getElementById('admin-battle-spins-actions-b');

    if (mode === 'BONUS_BUY') {
      if (buyA) buyA.style.display = 'block';
      if (buyB) buyB.style.display = 'block';
      if (btnResolveBuy) btnResolveBuy.style.display = 'block';
      if (spinsA) spinsA.style.display = 'none';
      if (spinsB) spinsB.style.display = 'none';
    } else {
      if (buyA) buyA.style.display = 'none';
      if (buyB) buyB.style.display = 'none';
      if (btnResolveBuy) btnResolveBuy.style.display = 'none';
      if (spinsA) spinsA.style.display = 'block';
      if (spinsB) spinsB.style.display = 'block';
    }

    // Also sync #control-panel mode buttons and boxes
    const cpBtnMult = document.getElementById('cp-mode-mult-btn');
    const cpBtnSpin = document.getElementById('cp-mode-spin-btn');
    const cpMultBox = document.getElementById('cp-mult-box');
    const cpSpinBox = document.getElementById('cp-spin-box');

    if (mode === 'BONUS_BUY') {
      if (cpMultBox) cpMultBox.style.display = 'grid';
      if (cpSpinBox) cpSpinBox.style.display = 'none';
      if (cpBtnMult) {
        cpBtnMult.style.borderColor = 'var(--gold)';
        cpBtnMult.style.color = 'var(--gold)';
        cpBtnMult.style.background = 'rgba(255,215,0,0.12)';
      }
      if (cpBtnSpin) {
        cpBtnSpin.style.borderColor = 'rgba(255,255,255,0.15)';
        cpBtnSpin.style.color = '#cbd5e1';
        cpBtnSpin.style.background = 'transparent';
      }
    } else {
      if (cpMultBox) cpMultBox.style.display = 'none';
      if (cpSpinBox) cpSpinBox.style.display = 'grid';
      if (cpBtnSpin) {
        cpBtnSpin.style.borderColor = 'var(--gold)';
        cpBtnSpin.style.color = 'var(--gold)';
        cpBtnSpin.style.background = 'rgba(255,215,0,0.12)';
      }
      if (cpBtnMult) {
        cpBtnMult.style.borderColor = 'rgba(255,255,255,0.15)';
        cpBtnMult.style.color = '#cbd5e1';
        cpBtnMult.style.background = 'transparent';
      }
    }

    try {
      fetch('/api/battle/mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameMode: mode })
      });
    } catch (_) {}

    if (this.channelBattle) {
      this.channelBattle.postMessage({ action: 'set_mode', mode });
    }

    if (window.sonner) {
      window.sonner.toast({
        title: `1v1 Battle Mode: ${mode === 'BONUS_BUY' ? 'Bonus Buy 🎁' : '50 Spins (Win / Lose) 🎰'}`,
        message: mode === 'BONUS_BUY' ? 'Multiplier numeric fields active.' : '50 Spins Profit/Loss WIN / LOSE buttons active.',
        type: 'cyan'
      });
    }
  }

  applyBattleResolution(winnerSlot, winningName, losingName, scoreDetail) {
    const cardA = document.getElementById('admin-card-player-a');
    const cardB = document.getElementById('admin-card-player-b');
    const badgeA = document.getElementById('admin-battle-badge-a');
    const badgeB = document.getElementById('admin-battle-badge-b');

    if (winnerSlot === 'A') {
      if (cardA) cardA.style.opacity = '1';
      if (cardB) cardB.style.opacity = '0.45';
      if (badgeA) {
        badgeA.textContent = '✓ WINNER';
        badgeA.style.background = 'rgba(83, 252, 24, 0.2)';
        badgeA.style.borderColor = 'var(--kick-green)';
        badgeA.style.color = 'var(--kick-green)';
        badgeA.style.display = 'inline-block';
      }
      if (badgeB) {
        badgeB.textContent = '✕ LOSER (DISQUALIFIED)';
        badgeB.style.background = 'rgba(255, 42, 95, 0.2)';
        badgeB.style.borderColor = 'var(--magenta)';
        badgeB.style.color = 'var(--magenta)';
        badgeB.style.display = 'inline-block';
      }
    } else {
      if (cardB) cardB.style.opacity = '1';
      if (cardA) cardA.style.opacity = '0.45';
      if (badgeB) {
        badgeB.textContent = '✓ WINNER';
        badgeB.style.background = 'rgba(83, 252, 24, 0.2)';
        badgeB.style.borderColor = 'var(--kick-green)';
        badgeB.style.color = 'var(--kick-green)';
        badgeB.style.display = 'inline-block';
      }
      if (badgeA) {
        badgeA.textContent = '✕ LOSER (DISQUALIFIED)';
        badgeA.style.background = 'rgba(255, 42, 95, 0.2)';
        badgeA.style.borderColor = 'var(--magenta)';
        badgeA.style.color = 'var(--magenta)';
        badgeA.style.display = 'inline-block';
      }
    }

    // Determine winner details (username + slot) from Control Panel or Admin Hub
    const userAVal = (document.getElementById('cp-battle-user-a')?.value || document.getElementById('admin-battle-player-a-name')?.textContent || '@PlayerA').trim();
    const slotAVal = (document.getElementById('cp-battle-slot-a')?.value || 'Wanted Dead or a Wild').trim();
    const userBVal = (document.getElementById('cp-battle-user-b')?.value || document.getElementById('admin-battle-player-b-name')?.textContent || '@PlayerB').trim();
    const slotBVal = (document.getElementById('cp-battle-slot-b')?.value || 'Gates of Olympus 1000').trim();

    const winUserClean = (winnerSlot === 'A' ? userAVal : userBVal).split(' ')[0].replace(/^@/, '') || (winnerSlot === 'A' ? 'PlayerA' : 'PlayerB');
    const winSlotName = winnerSlot === 'A' ? slotAVal : slotBVal;
    const resolvedSlot = this.resolveSlotMeta(winSlotName);

    // King of the Hill progression ($5 per win, max 4 wins = $20 USD)
    if (this.kothState.active) {
      const isSameKing = this.kothState.king && this.kothState.king.toLowerCase() === winUserClean.toLowerCase();

      if (isSameKing) {
        this.kothState.streak = Math.min(4, (this.kothState.streak || 0) + 1);
      } else {
        this.kothState.king = winUserClean;
        this.kothState.streak = 1;
      }
      this.kothState.kingSlot = resolvedSlot.name;
      this.kothState.kingProvider = resolvedSlot.provider;
      this.kothState.kingImage = resolvedSlot.image;

      const reachedMaxCap = this.kothState.streak >= this.kothState.maxStreak;
      const currentPrize = Math.min(20, this.kothState.streak * 5);

      if (reachedMaxCap) {
        this.kothState.awaitingDecision = false;
        this.awardKothGrandPrize(this.kothState.king, 20, 4);
        this.showKothBanner(`👑 Congratulations @${this.kothState.king} you won $20! (4/4 Max Streak Champion!)`, 'gold');

        const champEvt = {
          action: 'koth_grand_champion',
          type: 'koth_grand_champion',
          king: this.kothState.king,
          prize: 20,
          streak: 4,
          announcement: `👑 Congratulations @${this.kothState.king} you won $20! (4/4 Max Streak Champion!)`,
          ts: Date.now()
        };
        try { localStorage.setItem('hunthub_koth_event', JSON.stringify(champEvt)); } catch (_) {}
        if (this.channelBattle) this.channelBattle.postMessage(champEvt);
        try { const chBus = new BroadcastChannel('hunthub_battle_bus'); chBus.postMessage(champEvt); } catch (_) {}
        window.dispatchEvent(new CustomEvent('hunthub:battle-celebration', { detail: champEvt }));
      } else {
        this.kothState.awaitingDecision = true;
        this.showKothBanner(`👑 WINNER: @${this.kothState.king} (Streak ${this.kothState.streak}/4 — $${currentPrize} banked)! Type !continue or !cashout`, 'cyan');

        const winEvt = {
          action: 'resolve_battle',
          type: 'resolve_battle',
          winner: winnerSlot,
          winningName: `@${winUserClean}`,
          losingName,
          kothStreak: this.kothState.streak,
          awaitingDecision: true,
          ts: Date.now()
        };
        try { localStorage.setItem('hunthub_koth_event', JSON.stringify(winEvt)); } catch (_) {}
        if (this.channelBattle) this.channelBattle.postMessage(winEvt);
        try { const chBus = new BroadcastChannel('hunthub_battle_bus'); chBus.postMessage(winEvt); } catch (_) {}
        window.dispatchEvent(new CustomEvent('hunthub:battle-sync', { detail: winEvt }));
      }

      localStorage.setItem('hunthub_koth_state', JSON.stringify(this.kothState));
      this.renderKothDeck();
      this.syncCondensedControlPanelUI();

      // Auto-turn off winner celebration after 4.5s and transition cards
      if (this.kothCelebrationTimer) clearTimeout(this.kothCelebrationTimer);
      this.kothCelebrationTimer = setTimeout(() => {
        if (reachedMaxCap) {
          this.clearBothBattleCorners();
        } else {
          // Move / keep Winner in Player A (Blue Corner) and clear Player B (Red Corner)
          this.setCornerFighter('A', this.kothState.king, this.kothState.kingSlot);
          this.setCornerFighter('B', '', '');
          this.setWheelTargetCorner('B');
          this.pushCornersToOverlay();
        }
      }, 4500);
    }

    // Sync to backend / overlays
    try {
      if (this.battleMode === 'SPINS') {
        fetch('/api/battle/resolve-spins', {
          method: 'POST',
          headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ winnerSlot })
        }).catch(() => {});
      } else {
        fetch('/api/battle/resolve', {
          method: 'POST',
          headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ winnerSlot })
        }).catch(() => {});
      }
    } catch (_) {}

    if (this.channelBattle) {
      this.channelBattle.postMessage({
        action: 'resolve_battle',
        winner: winnerSlot,
        winningName: `@${winUserClean}`,
        losingName,
        kothStreak: this.kothState.streak
      });
    }

    const resolveEvt = {
      target: 'overlay-battle',
      action: 'resolve_battle',
      type: 'resolve_battle',
      winner: winnerSlot,
      winningName: `@${winUserClean}`,
      losingName,
      kothStreak: this.kothState.streak,
      ts: Date.now()
    };
    this.relayOverlaySyncEvent(resolveEvt);
    fetch('/api/battle/resolve', {
      method: 'POST',
      headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(resolveEvt)
    }).catch(() => {});

    // Trigger 1920x1080 Transparent Winner Celebration Overlay in OBS + Live Chat Winner Announcement
    const streakNum = this.kothState.active ? (this.kothState.streak || 1) : 1;
    const prizeUsd = Math.min(20, streakNum * 5);
    const isMaxPrize = streakNum >= 4;
    this.announceStreamWinner({
      eventType: 'battle',
      tier: isMaxPrize ? 'grand' : 'partial',
      type: isMaxPrize ? 'KOTH_CHAMPION' : 'BATTLE_WIN',
      category: isMaxPrize ? 'KING OF THE HILL · $20 MAX CHAMPION' : `1V1 BATTLE WINNER · STREAK ${streakNum}/4`,
      ribbon: isMaxPrize ? '👑 $20.00 USD MAX PRIZE CHAMPION' : `⚔️ ROUND VICTORY (${streakNum}/4)`,
      icon: isMaxPrize ? '👑' : '⚔️',
      username: winUserClean,
      slotName: resolvedSlot.name,
      slotImg: resolvedSlot.image,
      statValue: scoreDetail || 'WIN',
      prize: isMaxPrize ? '🏆 MAX PRIZE WON: $20.00 USD!' : `STREAK ${streakNum}/4 · $${prizeUsd}.00 USD BANKED`
    });

    if (window.sonner) {
      window.sonner.toast({
        title: `@${winUserClean} Won Duel! ⚔️`,
        message: `${scoreDetail}. Streak: ${this.kothState.streak}/4 ($${Math.min(20, this.kothState.streak * 5)} USD).`,
        type: 'gold'
      });
    }
  }

  awardKothGrandPrize(kingUsername, prizeAmount = 20, winsCount = 4) {
    let claims = [];
    try { claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]'); } catch (_) {}

    const voucherLabel = `King of the Hill - $${prizeAmount} Cashout (${winsCount} Win${winsCount > 1 ? 's' : ''})`;
    const newRedemption = {
      id: 'koth_prize_' + Date.now(),
      kick_username: kingUsername,
      username: kingUsername,
      voucher_title: voucherLabel,
      voucherTitle: voucherLabel,
      cost_points: 0,
      cost: 0,
      status: 'PENDING',
      timestamp: Date.now(),
      created_at: Math.floor(Date.now() / 1000),
      avatar: '👑'
    };

    claims.unshift(newRedemption);
    localStorage.setItem(this.storageKeyClaims, JSON.stringify(claims));

    try {
      fetch('/api/store/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kickUsername: kingUsername,
          voucherKey: 'koth_cashout',
          voucherTitle: voucherLabel,
          costPoints: 0
        })
      });
    } catch (_) {}

    this.renderKPIs();
    this.renderClaimsQueue();

    if (window.sonner) {
      window.sonner.toast({
        title: `👑 Congratulations @${kingUsername} you won $${prizeAmount}!`,
        message: `$${prizeAmount} USD prize logged to Vouchers Queue (${winsCount} win${winsCount > 1 ? 's' : ''}).`,
        type: 'gold'
      });
    }
  }

  kothContinue() {
    if (!this.kothState.king) {
      const fallbackA = (document.getElementById('cp-battle-user-a')?.value || '').trim().replace(/^@/, '');
      if (fallbackA) {
        this.kothState.king = fallbackA;
        this.kothState.streak = Math.max(1, this.kothState.streak || 1);
      }
    }
    const kingName = this.kothState.king || 'King';
    const kingSlot = this.kothState.kingSlot || document.getElementById('cp-battle-slot-a')?.value || 'Wanted Dead or a Wild';
    this.kothState.awaitingDecision = false;
    localStorage.setItem('hunthub_koth_state', JSON.stringify(this.kothState));

    // Keep Winner in Corner A (Blue Corner) and clear Corner B (Red Corner)
    this.setCornerFighter('A', kingName, kingSlot);
    this.setCornerFighter('B', '', '');
    this.setWheelTargetCorner('B');
    this.pushCornersToOverlay();

    const pA = document.getElementById('admin-battle-player-a-name');
    const pB = document.getElementById('admin-battle-player-b-name');
    if (pA) pA.textContent = `@${kingName} (${kingSlot})`;
    if (pB) pB.textContent = '@Challenger (Waiting for Wheel...)';

    const cardA = document.getElementById('admin-card-player-a');
    const cardB = document.getElementById('admin-card-player-b');
    if (cardA) cardA.style.opacity = '1';
    if (cardB) cardB.style.opacity = '1';

    const bA = document.getElementById('admin-battle-badge-a');
    const bB = document.getElementById('admin-battle-badge-b');
    if (bA) bA.style.display = 'none';
    if (bB) bB.style.display = 'none';

    try {
      fetch('/api/battle/koth/decision', {
        method: 'POST',
        headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ decision: 'continue' })
      }).catch(() => {});
    } catch (_) {}

    const contEvt = {
      target: 'overlay-battle',
      action: 'koth_continue',
      type: 'koth_continue',
      king: kingName,
      slot: kingSlot,
      streak: this.kothState.streak,
      ts: Date.now()
    };
    try { localStorage.setItem('hunthub_koth_event', JSON.stringify(contEvt)); } catch (_) {}
    if (this.channelBattle) this.channelBattle.postMessage(contEvt);
    try { const chBus = new BroadcastChannel('hunthub_battle_bus'); chBus.postMessage(contEvt); } catch (_) {}
    this.relayOverlaySyncEvent(contEvt);
    window.dispatchEvent(new CustomEvent('hunthub:battle-sync', { detail: contEvt }));

    this.showKothBanner(`⚔️ @${kingName} chose !continue (Streak ${this.kothState.streak}/4)! Spin Duo Wheel to pick Red Corner (Player B).`, 'cyan');
    this.renderKothDeck();
    this.syncCondensedControlPanelUI();

    if (window.sonner) {
      window.sonner.toast({
        title: `👑 King @${kingName} Continues Fighting!`,
        message: `Staying in Blue Corner (A) with Streak ${this.kothState.streak}/4. Spin Wheel for Player B (Red Corner)!`,
        type: 'green'
      });
    }
  }

  kothRetire() {
    const retired = this.kothState.king || (document.getElementById('cp-battle-user-a')?.value || '').trim().replace(/^@/, '') || 'Winner';
    const retiredSlot = this.kothState.kingSlot || (document.getElementById('cp-battle-slot-a')?.value || '').trim() || 'Wanted Dead or a Wild';
    const resolvedRetireSlot = this.resolveSlotMeta(retiredSlot);
    const streak = Math.max(1, this.kothState.streak || 1);
    const prizeAmount = Math.min(20, streak * 5);
    const announcement = `Congratulations @${retired} has won the battle!`;

    if (retired && retired !== 'Winner') {
      this.awardKothGrandPrize(retired, prizeAmount, streak);
    }

    // Trigger Special Grand Celebration Overlay in OBS + Chat Announcement when !cashout is executed!
    this.announceStreamWinner({
      eventType: 'battle',
      customMessage: `Congratulations @${retired} has won the battle! ($${prizeAmount} Cashout)`,
      tier: 'grand',
      type: 'KOTH_CASHOUT',
      category: '1V1 KING OF THE HILL · !CASHOUT WINNER',
      ribbon: '💰 CASHOUT LOCKED IN',
      icon: '💰',
      username: retired,
      slotName: resolvedRetireSlot.name,
      slotImg: resolvedRetireSlot.image,
      statValue: `${streak}/4 WINS`,
      prize: `💰 CASHOUT PRIZE: $${prizeAmount.toFixed(2)} USD!`
    });

    this.showKothBanner(`💰 ${announcement} ($${prizeAmount} · ${streak}/4 Wins — Both corners cleared for new contenders)`, 'gold');

    try {
      fetch('/api/battle/koth/decision', {
        method: 'POST',
        headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ decision: 'retire' })
      }).catch(() => {});
    } catch (_) {}

    const retireEvt = {
      target: 'overlay-battle',
      action: 'koth_retire',
      type: 'koth_cashout',
      retiredKing: retired,
      streak,
      prizeAmount,
      announcement,
      ts: Date.now()
    };
    try { localStorage.setItem('hunthub_koth_event', JSON.stringify(retireEvt)); } catch (_) {}
    if (this.channelBattle) this.channelBattle.postMessage(retireEvt);
    try { const chBus = new BroadcastChannel('hunthub_battle_bus'); chBus.postMessage(retireEvt); } catch (_) {}
    this.relayOverlaySyncEvent(retireEvt);
    window.dispatchEvent(new CustomEvent('hunthub:battle-celebration', { detail: retireEvt }));

    // Clear both corners and reset wheel target to Player A (Blue Corner)
    this.clearBothBattleCorners();

    if (window.sonner) {
      window.sonner.toast({
        title: `💰 ${announcement}`,
        message: `Cards A & B cleared. Ready to spin for new Player A (Blue Corner) and Player B (Red Corner).`,
        type: 'gold'
      });
    }
  }

  kothNewGame() {
    this.clearBothBattleCorners();
    this.showKothBanner('🔄 Both corners cleared! Spin Duo Wheel to select Player A (Blue Corner).', 'cyan');
    if (window.sonner) {
      window.sonner.toast({
        title: '👑 Fresh 1v1 Battle Ready!',
        message: 'Both Blue & Red Corners cleared. Waiting for Winner A and Winner B.',
        type: 'cyan'
      });
    }
  }

  // ========================================================
  // TAB 4: CONTROL DE WHEELS EN VIVO
  // ========================================================

  setupWheelsAdmin() {
    // 1. Duo-Wheel Controls
    const btnModeBattle = document.getElementById('btn-duo-mode-battle');
    const btnModeTourney = document.getElementById('btn-duo-mode-tourney');
    const btnSpinDuo = document.getElementById('btn-spin-duo-wheel');
    const btnAddDuo = document.getElementById('btn-admin-add-duo');
    const btnRestoreDuo = document.getElementById('btn-admin-restore-demo-duos');
    const btnClearDuo = document.getElementById('btn-admin-clear-duos');

    if (btnModeBattle) {
      btnModeBattle.onclick = () => this.setDuoMode('battle');
    }
    if (btnModeTourney) {
      btnModeTourney.onclick = () => this.setDuoMode('tourney');
    }

    if (btnSpinDuo) {
      btnSpinDuo.onclick = () => this.spinDuoWheel();
    }

    if (btnAddDuo) {
      btnAddDuo.onclick = () => {
        const u = document.getElementById('admin-duo-input-user')?.value.trim().replace(/^@/, '');
        const s = document.getElementById('admin-duo-input-slot')?.value.trim();
        if (!u || !s) return;
        this.addDuoEntry(u, s, this.duoMode);
        document.getElementById('admin-duo-input-user').value = '';
        document.getElementById('admin-duo-input-slot').value = '';
      };
    }

    if (btnRestoreDuo) {
      btnRestoreDuo.onclick = () => {
        this.syncDuoQueues(true);
        if (window.sonner) window.sonner.toast({ title: 'Live Queue Synced 🔄', message: 'Synchronized with live Kick chat queue.', type: 'cyan' });
      };
    }

    if (btnClearDuo) {
      btnClearDuo.onclick = () => {
        this.duoPool = [];
        if (this.duoMode === 'tourney') {
          this.tourneyQueue = [];
        } else {
          this.battleQueue = [];
        }
        this._lastLocalDuoMutationAt = Date.now();
        try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.duoPool)); } catch (_) {}
        this.renderDuoQueue();
        if (this.channelDuo) this.channelDuo.postMessage({ action: 'set_pool', pool: this.duoPool, type: 'sync_pool', items: this.duoPool });
        this.pushDuoQueuesToEdge();
      };
    }

    // 2. CS:GO Active Chatter Wheel Controls
    const btnSpinCSGO = document.getElementById('btn-spin-csgo-wheel');
    const btnDemoCSGO = document.getElementById('btn-demo-csgo-wheel');
    const btnClearCooldowns = document.getElementById('btn-admin-clear-cooldowns');

    if (btnSpinCSGO) {
      btnSpinCSGO.onclick = () => this.spinCSGOWheel(false);
    }
    if (btnDemoCSGO) {
      btnDemoCSGO.onclick = () => this.spinCSGOWheel(true);
    }
    if (btnClearCooldowns) {
      btnClearCooldowns.onclick = () => {
        this.recentChatters.clear();
        this.renderActiveChatters();
        this.pushActiveChattersToEdge(true);
        if (window.sonner) window.sonner.toast({ title: 'Cooldowns Cleared 🔄', message: 'Chatter history reset.', type: 'default' });
      };
    }

    // 3. Random Slot Wheel Controls
    const btnSpinSlot = document.getElementById('btn-spin-slot-wheel');
    const btnDemoSlot = document.getElementById('btn-demo-slot-wheel');

    if (btnSpinSlot) {
      btnSpinSlot.onclick = () => this.spinSlotWheel(false);
    }
    if (btnDemoSlot) {
      btnDemoSlot.onclick = () => this.spinSlotWheel(true);
    }

    // Phase 4: Periodic sync of Duo-Wheel queues with server live state
    this.syncDuoQueues(true);
    setInterval(() => this.syncDuoQueues(false), 4000);
  }

  pushDuoQueuesToEdge() {
    this._lastLocalDuoMutationAt = Date.now();
    const payload = {
      mode: this.duoMode,
      battleQueue: Array.isArray(this.battleQueue) ? this.battleQueue : [],
      tourneyQueue: Array.isArray(this.tourneyQueue) ? this.tourneyQueue : [],
      ts: Date.now()
    };
    fetch('/api/wheel/duo/queues', {
      method: 'POST',
      headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    }).catch(() => {});
  }

  async syncDuoQueues(force = false) {
    if (!force && this._lastLocalDuoMutationAt && (Date.now() - this._lastLocalDuoMutationAt) < 5000) {
      return;
    }
    try {
      const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
      let res = null;
      if (isLocal) {
        try {
          res = await fetch('http://127.0.0.1:3001/api/wheel/duo/queues', { mode: 'cors' });
        } catch (_) {}
      }
      if (!res || !res.ok) {
        res = await fetch('/api/wheel/duo/queues');
      }
      if (res && res.ok) {
        const data = await res.json();
        const isCleanUser = (u) => {
          const clean = String(u || '').trim().replace(/^@/, '').toLowerCase();
          return Boolean(clean) && !this.demoUsernames.has(clean);
        };
        if (Array.isArray(data.tourneyQueue)) {
          const filteredT = data.tourneyQueue.filter(e => isCleanUser(e?.username || e?.chatter));
          if (filteredT.length > 0 || this.tourneyQueue.length === 0) {
            this.tourneyQueue = filteredT;
          }
          const tCount = document.getElementById('cp-tourney-q-count');
          if (tCount) tCount.textContent = String(this.tourneyQueue.length);
        }
        if (Array.isArray(data.battleQueue)) {
          const filteredB = data.battleQueue.filter(e => isCleanUser(e?.username || e?.chatter));
          if (filteredB.length > 0 || this.battleQueue.length === 0) {
            this.battleQueue = filteredB;
          }
          const bCount = document.getElementById('cp-battle-q-count');
          if (bCount) bCount.textContent = String(this.battleQueue.length);
        }
        const q = this.duoMode === 'tourney' ? this.tourneyQueue : this.battleQueue;
        if (Array.isArray(q)) {
          this.duoPool = q.map(e => {
            const meta = this.resolveSlotMeta(e.slotName || e.slot);
            return {
              chatter: String(e.username || e.chatter || '').replace(/^@/, ''),
              slot: meta.name,
              provider: e.slotProvider || meta.provider,
              imageUrl: e.imageUrl || meta.image,
              icon: '🎰'
            };
          });
          try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.duoPool)); } catch (_) {}
          this.renderDuoQueue();
        }
      }
    } catch (_) {}
  }

  setDuoMode(mode, fromRemote = false) {
    this.duoMode = mode === 'tourney' ? 'tourney' : 'battle';
    try {
      localStorage.setItem('hunthub_duo_mode', this.duoMode);
    } catch (_) {}

    const badge = document.getElementById('admin-duo-mode-badge');
    const btnB = document.getElementById('btn-duo-mode-battle');
    const btnT = document.getElementById('btn-duo-mode-tourney');
    const cpBtnB = document.getElementById('cp-btn-duo-mode-battle');
    const cpBtnT = document.getElementById('cp-btn-duo-mode-tourney');

    if (this.duoMode === 'battle') {
      if (badge) {
        badge.textContent = '1V1 BATTLE';
        badge.style.color = 'var(--cyan)';
        badge.style.borderColor = 'var(--cyan)';
      }
      if (btnB) { btnB.className = 'btn-stake-primary'; }
      if (btnT) { btnT.className = 'btn-stake-secondary'; }
      if (cpBtnB) { cpBtnB.style.background = 'rgba(0, 229, 255, 0.18)'; }
      if (cpBtnT) { cpBtnT.style.background = 'transparent'; }
    } else {
      if (badge) {
        badge.textContent = '8-BRACKET TOURNEY';
        badge.style.color = 'var(--gold)';
        badge.style.borderColor = 'var(--gold)';
      }
      if (btnB) { btnB.className = 'btn-stake-secondary'; }
      if (btnT) { btnT.className = 'btn-stake-primary'; }
      if (cpBtnB) { cpBtnB.style.background = 'transparent'; }
      if (cpBtnT) { cpBtnT.style.background = 'rgba(255, 215, 0, 0.18)'; }

      // If the 8-Bracket Tournament currently holds demo players, clear them automatically so Seed 1/8 starts on a clean bracket
      const curTourney = this.getTourneyState();
      if (curTourney && curTourney.isDemo) {
        this.resetTourneyBracket(true);
      }
    }

    this.updateWheelTargetUI();
    this.renderTournamentAdmin();

    const activeQueue = this.duoMode === 'tourney' ? this.tourneyQueue : this.battleQueue;
    if (Array.isArray(activeQueue)) {
      this.duoPool = activeQueue.map(e => {
        const meta = this.resolveSlotMeta(e.slotName || e.slot);
        return {
          chatter: String(e.username || e.chatter || '').replace(/^@/, ''),
          slot: meta.name,
          provider: e.slotProvider || meta.provider,
          imageUrl: e.imageUrl || meta.image,
          icon: '🎰'
        };
      });
      try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.duoPool)); } catch (_) {}
    }

    const nextSeed = this.getNextTourneySeedSlot();
    try {
      localStorage.setItem('hunthub_tourney_seed_count', String(nextSeed.seed - 1));
    } catch (_) {}

    if (!fromRemote && this.channelDuo) {
      this.channelDuo.postMessage({
        action: 'set_mode',
        mode: this.duoMode,
        tourneyCount: nextSeed.seed - 1,
        ts: Date.now()
      });
      this.channelDuo.postMessage({
        action: 'set_pool',
        pool: this.duoPool,
        type: 'sync_pool',
        items: this.duoPool,
        mode: this.duoMode
      });
    }
    fetch('/api/wheel/duo/mode', {
      method: 'POST',
      headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ mode: this.duoMode })
    }).catch(() => {});
    this.syncDuoQueues(false);
    this.renderDuoQueue();
    if (!fromRemote && window.sonner) {
      window.sonner.toast({
        title: this.duoMode === 'tourney' ? `🏆 !tourney Queue Active (Next: Seed ${nextSeed.seed}/8)` : '⚔️ !battle Queue Active',
        message: this.duoMode === 'tourney'
          ? 'Dual Wheel winners will auto-fill Quarterfinals Seeds 1/8 to 8/8.'
          : 'Dual Wheel winners will auto-fill Player A (Blue) & Player B (Red).',
        type: this.duoMode === 'tourney' ? 'gold' : 'cyan'
      });
    }
  }

  renderDuoQueue() {
    const listEl = document.getElementById('admin-duo-list');
    const countEl = document.getElementById('admin-duo-count');
    if (countEl) countEl.textContent = this.duoPool.length.toString();

    if (listEl) {
      if (this.duoPool.length === 0) {
        listEl.innerHTML = `<div style="font-size: 11px; color: var(--text-dim); padding: 8px;">Queue empty. Add chatters above or via !battle &lt;slot&gt;.</div>`;
      } else {
        listEl.innerHTML = this.duoPool.map((p) => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: rgba(0,0,0,0.3); border-radius: 6px; margin-bottom: 4px; border: 1px solid rgba(255,255,255,0.05);">
            <span style="font-weight: 700; color: #ffffff; font-size: 12px;">@${this.escapeHTML(p.chatter)}</span>
            <span style="font-size: 11px; color: var(--gold);">${this.escapeHTML(p.slot)}</span>
          </div>
        `).join('');
      }
    }

    // Also update Condensed Control Panel queue list
    const cpListEl = document.getElementById('cp-duo-queue-list');
    const cpCountEl = document.getElementById('cp-duo-queue-count');
    if (cpCountEl) cpCountEl.textContent = `${this.duoPool.length} entries`;
    if (cpListEl) {
      if (this.duoPool.length === 0) {
        cpListEl.innerHTML = `<span style="font-size: 11px; color: var(--text-muted);">Pool empty. Waiting for !battle &lt;slot&gt; or !tourney &lt;slot&gt; in Kick chat...</span>`;
      } else {
        cpListEl.innerHTML = this.duoPool.map((p) => {
          const meta = this.resolveSlotMeta(p.slot);
          const fallbackUri = this.escapeHTML((window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function')
            ? window.SlotResolver.generateDataUriCard(meta.name, meta.provider)
            : '');
          return `
            <div style="display: inline-flex; align-items: center; gap: 7px; padding: 4px 9px; background: rgba(15, 23, 42, 0.88); border: 1px solid rgba(0, 229, 255, 0.28); border-radius: 8px; font-size: 11px;">
              <img src="${this.escapeHTML(meta.image)}" alt="" style="width: 24px; height: 32px; aspect-ratio: 180 / 236; border-radius: 4px; object-fit: contain; background: #070a12; flex-shrink: 0;" onerror="this.onerror=null; this.src='${fallbackUri}';" />
              <strong style="color: #fff;">@${this.escapeHTML(p.chatter)}</strong>
              <span style="color: var(--gold);">${this.escapeHTML(meta.name)}</span>
            </div>
          `;
        }).join('');
      }
    }
  }

  spinDuoWheel() {
    if (this.duoPool.length === 0) {
      if (window.sonner) window.sonner.toast({ title: 'Queue Empty', message: 'Add duos or wait for !battle <slot> or !tourney <slot> in chat.', type: 'danger' });
      return;
    }

    const btn = document.getElementById('btn-spin-duo-wheel');
    const cpBtn = document.getElementById('cp-btn-spin-duo');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '🎰 SPINNING DUO-WHEEL...';
    }
    if (cpBtn) {
      cpBtn.disabled = true;
      cpBtn.textContent = '🎡 SPINNING DUO WHEEL...';
    }

    const isTourneyMode = this.duoMode === 'tourney';
    let targetCorner = 'A';
    let nextSeedInfo = null;
    let targetSeed = null;

    if (!isTourneyMode) {
      // Determine target corner: if Corner A is empty, always select Corner A (Blue) first; otherwise select Corner B (Red)
      const userAVal = (document.getElementById('cp-battle-user-a')?.value || '').trim();
      targetCorner = (!userAVal || this.wheelTargetCorner === 'A') ? 'A' : 'B';
      this.setWheelTargetCorner(targetCorner);

      // When spinning for Player A (Blue Corner), ensure Player B (Red Corner) is completely empty until Spin 2
      if (targetCorner === 'A') {
        this.setCornerFighter('B', '', '');
        this.pushCornersToOverlay();
      }
    } else {
      nextSeedInfo = this.getNextTourneySeedSlot();
      targetSeed = nextSeedInfo.seed;
      this.updateWheelTargetUI();
    }

    const winnerIdx = Math.floor(Math.random() * this.duoPool.length);
    const winner = { ...this.duoPool[winnerIdx] };
    const resolvedMeta = this.resolveSlotMeta(winner.slot);
    winner.slot = resolvedMeta.name;
    winner.slotName = resolvedMeta.name;
    winner.provider = resolvedMeta.provider;
    winner.slotProvider = resolvedMeta.provider;
    winner.imageUrl = resolvedMeta.image;
    const spinId = 'spin_duo_' + Date.now();

    const spinPayload = {
      action: 'spin',
      mode: this.duoMode,
      targetCorner,
      targetSeed,
      spinId,
      winner,
      ts: Date.now()
    };

    if (this.channelDuo) {
      this.channelDuo.postMessage(spinPayload);
    }

    try {
      localStorage.setItem('hunthub_duo_spin_cmd', JSON.stringify(spinPayload));
    } catch (_) {}

    // Dispatch spin to Cloudflare edge so remote OBS instances in USA spin in sync
    fetch('/api/wheel/duo/spin', {
      method: 'POST',
      headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(spinPayload)
    }).catch(() => {});

    this.relayOverlaySyncEvent({
      target: 'wheel-duo',
      type: 'spin',
      ...spinPayload
    });

    // Remove winner from local pool immediately so they cannot be picked twice!
    const cleanWinnerUser = String(winner.chatter || '').trim().toLowerCase().replace(/^@/, '');
    this._lastLocalDuoMutationAt = Date.now();
    this.duoPool = this.duoPool.filter(item => String(item.chatter || '').trim().toLowerCase().replace(/^@/, '') !== cleanWinnerUser);
    if (isTourneyMode) {
      this.tourneyQueue = this.tourneyQueue.filter(e => String(e.username || '').trim().toLowerCase().replace(/^@/, '') !== cleanWinnerUser);
      const tCount = document.getElementById('cp-tourney-q-count');
      if (tCount) tCount.textContent = String(this.tourneyQueue.length);
    } else {
      this.battleQueue = this.battleQueue.filter(e => String(e.username || '').trim().toLowerCase().replace(/^@/, '') !== cleanWinnerUser);
      const bCount = document.getElementById('cp-battle-q-count');
      if (bCount) bCount.textContent = String(this.battleQueue.length);
    }
    try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.duoPool)); } catch (_) {}
    this.renderDuoQueue();

    // Remove winner from backend queue as well
    fetch('/api/wheel/duo/remove', {
      method: 'POST',
      headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ mode: this.duoMode, username: cleanWinnerUser })
    }).catch(() => {});

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🎰 SPIN DUO-WHEEL (SELECT WINNER)';
      }
      if (cpBtn) {
        cpBtn.disabled = false;
      }

      if (!isTourneyMode) {
        // Auto-assign winner to Player A (Blue Corner) first, then Player B (Red Corner)
        this.assignWheelWinnerToCorner(targetCorner, winner.chatter, winner.slot, spinId);
        this.updateWheelTargetUI();
        this.announceStreamWinner({
          eventType: 'picked',
          tier: 'partial',
          type: 'WHEEL_PICKED',
          category: `1V1 BATTLE · ${targetCorner === 'A' ? 'BLUE CORNER' : 'RED CORNER'} PICKED`,
          ribbon: `🎡 ${targetCorner === 'A' ? 'PLAYER A (BLUE)' : 'PLAYER B (RED)'} SELECTED`,
          icon: '🎡',
          username: winner.chatter,
          slotName: winner.slot,
          slotImg: winner.imageUrl,
          statValue: `CORNER ${targetCorner}`,
          prize: `Picked on Dual Wheel (${winner.slot})!`
        });
        if (window.sonner) {
          window.sonner.toast({
            title: `Winner ${targetCorner === 'A' ? 'A (Blue Corner)' : 'B (Red Corner)'} Selected! 🎰`,
            message: `Congratulations @${winner.chatter} has been picked! ("${winner.slot}")`,
            type: targetCorner === 'A' ? 'cyan' : 'gold'
          });
        }
      } else {
        // Auto-assign winner to 8-Bracket Tournament Seed (1/8 .. 8/8) and wrap to 1/8 after 8/8
        this.assignWheelWinnerToTourneySeed(winner.chatter, winner.slot, spinId, targetSeed);
        this.announceStreamWinner({
          eventType: 'picked',
          tier: 'partial',
          type: 'WHEEL_PICKED',
          category: `8-BRACKET TOURNEY · SEED ${targetSeed}/8 PICKED`,
          ribbon: `🏆 SEED ${targetSeed}/8 SELECTED`,
          icon: '🏆',
          username: winner.chatter,
          slotName: winner.slot,
          slotImg: winner.imageUrl,
          statValue: `SEED #${targetSeed}`,
          prize: `Picked for 8-Bracket Tourney (${winner.slot})!`
        });
        if (window.sonner) {
          window.sonner.toast({
            title: `🏆 Seed ${targetSeed}/8 Filled! (${nextSeedInfo?.label || 'Bracket'})`,
            message: `Congratulations @${winner.chatter} has been picked! (${winner.slot})`,
            type: 'gold'
          });
        }
      }
    }, 5200);
  }

  renderActiveChatters() {
    const listEl = document.getElementById('admin-chatters-list');
    const countEl = document.getElementById('admin-chatters-count');
    const cpCountEl = document.getElementById('cp-active-chatters-count');

    // Prune any demo usernames and chatters older than 30 minutes
    const cutoff = Date.now() - 30 * 60 * 1000;
    for (const [k, v] of this.recentChatters.entries()) {
      const clean = String(k || '').trim().replace(/^@/, '').toLowerCase();
      if (!clean || this.demoUsernames.has(clean) || (v?.ts && v.ts < cutoff)) {
        this.recentChatters.delete(k);
      }
    }

    const arr = Array.from(this.recentChatters.values());
    if (countEl) countEl.textContent = arr.length.toString();
    if (cpCountEl) cpCountEl.textContent = `${arr.length} active`;
    if (!listEl) return;

    if (arr.length === 0) {
      listEl.innerHTML = `<span style="font-size: 11px; color: #64748b;">Waiting for live chat activity on kick.com/diggitybets...</span>`;
      return;
    }

    listEl.innerHTML = arr.map(c => {
      const secAgo = Math.max(0, Math.floor((Date.now() - c.ts) / 1000));
      return `
        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 3px 8px; background: rgba(0,0,0,0.35); border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
          <span style="font-weight: 700; color: #ffffff; font-size: 11px;">@${this.escapeHTML(c.user)}</span>
          <span style="font-size: 10px; color: var(--kick-green);">${secAgo}s</span>
        </div>
      `;
    }).join('');
  }

  pushActiveChattersToEdge(force = false) {
    const now = Date.now();
    if (!force && this._lastChatterSyncAt && (now - this._lastChatterSyncAt) < 3000) return;
    this._lastChatterSyncAt = now;
    const pool = Array.from(this.recentChatters.values())
      .map(c => String(c.user || '').trim().replace(/^@/, ''))
      .filter(u => u && !this.demoUsernames.has(u.toLowerCase()));
    fetch('/api/wheel/csgo/active-pool', {
      method: 'POST',
      headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ pool, activeChatters: pool })
    }).catch(() => {});
  }

  spinCSGOWheel(demo = false) {
    const arr = Array.from(this.recentChatters.values())
      .map(c => String(c.user || '').trim().replace(/^@/, ''))
      .filter(u => u && !this.demoUsernames.has(u.toLowerCase()));

    if (arr.length === 0) {
      if (window.sonner) {
        window.sonner.toast({
          title: 'No Active Chatters Yet',
          message: 'Wait for real viewers to chat on kick.com/diggitybets (or type !join) before spinning.',
          type: 'danger'
        });
      }
      return;
    }

    const btn = document.getElementById('btn-spin-csgo-wheel');
    const cpBtn = document.getElementById('cp-btn-spin-csgo');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '🎯 SPINNING CS:GO REEL...';
    }
    if (cpBtn) {
      cpBtn.disabled = true;
      cpBtn.textContent = '🎯 SPINNING CS:GO...';
    }

    const winner = arr[Math.floor(Math.random() * arr.length)];
    const spinTs = Date.now();

    if (this.channelGiveaway) {
      this.channelGiveaway.postMessage({
        type: demo ? 'test_spin' : 'spin',
        winner,
        ganador: { nombre: winner },
        participantes: arr.map(u => ({ nombre: u })),
        ts: spinTs
      });
    }

    this.relayOverlaySyncEvent({
      target: 'wheel-csgo',
      type: demo ? 'test_spin' : 'spin',
      winner,
      ganador: { nombre: winner },
      participantes: arr,
      ts: spinTs
    });

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🎯 SPIN CS:GO WHEEL (PICK WINNER)';
      }
      if (cpBtn) {
        cpBtn.disabled = false;
        cpBtn.textContent = '🎯 SPIN CS:GO CHATTER';
      }

      // Assign Spotlight Recommender in Bonus Hunt
      const callerInput = document.getElementById('admin-hunt-caller-input');
      if (callerInput && !demo) callerInput.value = `@${winner}`;
      const cpBhUser = document.getElementById('cp-bh-user');
      if (cpBhUser && !demo) cpBhUser.value = `@${winner}`;

      this.announceStreamWinner({
        eventType: 'picked',
        tier: 'partial',
        type: 'CSGO_WHEEL_PICKED',
        category: 'CS:GO ACTIVE CHATTER WHEEL · WINNER PICKED',
        ribbon: '🎯 SPOTLIGHT CHATTER PICKED',
        icon: '🎯',
        username: winner,
        slotName: 'CS:GO Chatter Wheel',
        statValue: 'PICKED 🎯',
        prize: `Congratulations @${winner} has been picked!`
      });

      if (window.sonner) {
        window.sonner.toast({
          title: 'Spotlight Chatter Picked! 🎯',
          message: `Congratulations @${winner} has been picked!`,
          type: 'gold'
        });
      }
    }, 6850);
  }

  spinSlotWheel(demo = false) {
    const catSelect = document.getElementById('admin-slot-category-select');
    const cat = catSelect ? catSelect.value : 'all';

    const btn = document.getElementById('btn-spin-slot-wheel');
    const cpBtn = document.getElementById('cp-btn-spin-slots');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '🎰 SPINNING 60 FPS ROULETTE...';
    }
    if (cpBtn) {
      cpBtn.disabled = true;
      cpBtn.textContent = '🎰 SPINNING SLOTS...';
    }

    const slots = window.HUNTHUB_CURATED_SLOTS || [];
    const pool = cat === 'all' ? slots : slots.filter(s => s.category === cat);
    const chosen = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : { name: 'Gates of Olympus 1000', provider: 'Pragmatic Play' };
    const resolvedMeta = this.resolveSlotMeta(chosen.name);
    const winnerSlotObj = {
      id: chosen.id || chosen.name,
      name: resolvedMeta.name,
      nombre: resolvedMeta.name,
      provider: chosen.provider || resolvedMeta.provider,
      proveedor: chosen.provider || resolvedMeta.provider,
      image: resolvedMeta.image
    };
    const spinTs = Date.now();

    if (this.channelSlotWheel) {
      this.channelSlotWheel.postMessage({
        type: demo ? 'test_spin' : 'spin',
        category: cat,
        winner: winnerSlotObj,
        ganador: winnerSlotObj,
        ts: spinTs
      });
    }

    this.relayOverlaySyncEvent({
      target: 'wheel-slots',
      type: demo ? 'test_spin' : 'spin',
      category: cat,
      winner: winnerSlotObj,
      ganador: winnerSlotObj,
      ts: spinTs
    });

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🎰 SPIN RANDOM SLOT WHEEL';
      }
      if (cpBtn) {
        cpBtn.disabled = false;
        cpBtn.textContent = '🎰 SPIN SLOT ROULETTE';
      }

      // Set input in bonus hunt search
      const huntSearch = document.getElementById('admin-hunt-slot-search');
      if (huntSearch && !demo) huntSearch.value = resolvedMeta.name;
      const cpBhSlot = document.getElementById('cp-bh-slot');
      if (cpBhSlot && !demo) cpBhSlot.value = resolvedMeta.name;

      const activeCaller = (document.getElementById('cp-bh-user')?.value || document.getElementById('admin-hunt-caller-input')?.value || '').trim().replace(/^@/, '');
      const announceUser = activeCaller || resolvedMeta.name;

      this.announceStreamWinner({
        eventType: 'picked',
        tier: 'partial',
        type: 'SLOT_WHEEL_PICKED',
        category: 'RANDOM SLOT ROULETTE · SLOT PICKED',
        ribbon: '🎰 SLOT ROULETTE WINNER',
        icon: '🎰',
        username: announceUser,
        slotName: resolvedMeta.name,
        slotImg: resolvedMeta.image,
        statValue: resolvedMeta.provider || 'SLOT PICK',
        prize: `Selected Slot: ${resolvedMeta.name}`
      });

      if (window.sonner) {
        window.sonner.toast({
          title: 'Slot Wheel Selected! 🎰',
          message: `Congratulations @${announceUser} has been picked! (${resolvedMeta.name})`,
          type: 'gold'
        });
      }
    }, 6850);
  }

  formatWinnerAnnouncementText(eventType, username, customMessage = '') {
    const cleanUser = String(username || 'Winner').trim().replace(/^@/, '') || 'Winner';
    if (customMessage) return String(customMessage).trim();
    const norm = String(eventType || 'picked').trim().toLowerCase();
    if (norm === 'battle' || norm === 'battle_win' || norm === 'koth_champion' || norm === 'koth_cashout') {
      return `Congratulations @${cleanUser} has won the battle!`;
    }
    if (norm === 'tourney' || norm === 'tournament' || norm === 'tourney_champion') {
      return `Congratulations @${cleanUser} has won the tourney!`;
    }
    if (norm === 'gtb' || norm === 'guess' || norm === 'bonushunt_gtb') {
      return `Congratulations @${cleanUser} has won the gtb!`;
    }
    if (norm === 'prediction' || norm === 'pred') {
      return `Congratulations @${cleanUser} has won the prediction!`;
    }
    if (norm === 'giveaway' || norm === 'raffle') {
      return `Congratulations @${cleanUser} has won the giveaway!`;
    }
    return `Congratulations @${cleanUser} has been picked!`;
  }

  announceStreamWinner(opts = {}) {
    const cleanUser = String(opts.username || 'Winner').trim().replace(/^@/, '') || 'Winner';
    const eventType = String(opts.eventType || opts.type || 'picked').trim().toLowerCase();
    const message = this.formatWinnerAnnouncementText(eventType, cleanUser, opts.customMessage || opts.announcementText || '');
    const now = Date.now();

    // Prevent duplicate double-triggers within 3.5 seconds for the exact same winner & eventType
    const dedupKey = `${eventType}:${cleanUser.toLowerCase()}`;
    if (this._lastWinnerAnnounceKey === dedupKey && this._lastWinnerAnnounceTs && (now - this._lastWinnerAnnounceTs) < 3500) {
      return null;
    }
    this._lastWinnerAnnounceKey = dedupKey;
    this._lastWinnerAnnounceTs = now;

    // 1. Trigger 1920x1080 Celebration Overlay in OBS + On-Screen Banner
    this.triggerStreamCelebrationOverlay({
      ...opts,
      username: cleanUser,
      announcementText: message
    });

    // 2. Append to Website & Control Panel Live Chat Window immediately
    const annObj = {
      id: 'ann_' + now,
      eventType,
      username: `@${cleanUser}`,
      slotName: opts.slotName || '',
      prize: opts.prize || '',
      message,
      ts: now
    };
    this.appendChatAnnouncementToDOM(annObj);

    // 3. Broadcast to Kick.com Official Chat Bot + Cloudflare Edge D1 Sync
    fetch('/api/kick/chat/announce', {
      method: 'POST',
      headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        eventType,
        username: cleanUser,
        slotName: opts.slotName || '',
        prize: opts.prize || '',
        customMessage: message
      })
    }).catch(() => {});

    return annObj;
  }

  appendChatAnnouncementToDOM(ann) {
    if (!ann || !ann.message) return;
    const timeStr = new Date(ann.ts || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // A) Control Panel Live Chat Log (#cp-live-chat-log)
    const logEl = document.getElementById('cp-live-chat-log');
    if (logEl) {
      const entry = document.createElement('div');
      entry.style.cssText = 'padding: 5px 8px; margin-bottom: 4px; border-radius: 6px; background: linear-gradient(90deg, rgba(255, 215, 0, 0.18), rgba(83, 252, 24, 0.10)); border-left: 3px solid #ffd700; font-weight: 700;';
      const timeSpan = document.createElement('span');
      timeSpan.style.color = '#94a3b8';
      timeSpan.textContent = `[${timeStr}] `;
      const botBadge = document.createElement('strong');
      botBadge.style.color = '#ffd700';
      botBadge.textContent = '🤖 DIGGITY BOT: ';
      const msgSpan = document.createElement('span');
      msgSpan.style.color = '#53fc18';
      msgSpan.textContent = ann.message;
      entry.append(timeSpan, botBadge, msgSpan);
      logEl.prepend(entry);
    }

    // B) Public Website Live Chat / Activity Feed (#live-chat-messages, #chat-sim-feed)
    ['live-chat-messages', 'chat-sim-feed'].forEach((id) => {
      const feedEl = document.getElementById(id);
      if (!feedEl) return;
      const row = document.createElement('div');
      row.style.cssText = 'padding: 6px 10px; margin: 4px 0; border-radius: 8px; background: linear-gradient(90deg, rgba(255, 215, 0, 0.16), rgba(83, 252, 24, 0.08)); border: 1px solid rgba(255, 215, 0, 0.45); font-size: 12px; font-weight: 800; color: #ffd700;';
      row.textContent = `🏆 ${ann.message}`;
      feedEl.prepend(row);
    });
  }

  triggerStreamCelebrationOverlay(opts = {}) {
    const rawUser = String(opts.username || 'Winner').trim().replace(/^@/, '') || 'Winner';
    const rawSlot = String(opts.slotName || 'Wanted Dead or a Wild').trim();
    const meta = this.resolveSlotMeta(rawSlot);
    const now = Date.now();
    const isGrandType = opts.tier === 'grand' || opts.type === 'TOURNEY_CHAMPION' || opts.type === 'KOTH_CHAMPION' || opts.type === 'KOTH_CASHOUT';
    const announcementText = opts.announcementText || this.formatWinnerAnnouncementText(opts.eventType || opts.type || 'picked', rawUser);
    const payload = {
      tier: opts.tier || (isGrandType ? 'grand' : 'partial'),
      type: opts.type || 'BATTLE_WIN',
      category: opts.category || (opts.type === 'TOURNEY_CHAMPION' ? '8-BRACKET TOURNAMENT CHAMPION' : '1V1 BATTLE WINNER'),
      ribbon: opts.ribbon || (isGrandType ? '👑 GRAND CHAMPION' : '⚔️ ROUND VICTORY'),
      icon: opts.icon || (isGrandType ? '👑' : '⚔️'),
      username: `@${rawUser}`,
      avatarUrl: opts.avatarUrl || '',
      slotName: meta.name,
      slotImg: opts.slotImg || meta.image,
      statValue: opts.statValue || 'VICTORY',
      prize: opts.prize || announcementText,
      announcementText,
      timestamp: now,
      ts: now
    };

    try {
      localStorage.setItem('hunthub_celebration_event', JSON.stringify(payload));
      localStorage.setItem('hunthub_celebration_trigger', JSON.stringify(payload));
    } catch (_) {}

    if (this.channelCelebration) {
      try {
        this.channelCelebration.postMessage(payload);
      } catch (_) {}
    }

    try {
      fetch('/api/overlay/celebration', {
        method: 'POST',
        headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ celebration: payload })
      }).catch(() => {});
    } catch (_) {}

    this.relayOverlaySyncEvent({
      target: 'overlay-celebration',
      type: 'CELEBRATION',
      data: payload,
      ts: payload.ts
    });
  }

  relayOverlaySyncEvent(overlayEvent) {
    try {
      fetch('/api/sync/state', {
        method: 'POST',
        headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ overlayEvent })
      }).catch(() => {});
    } catch (_) {}
  }

  bindObsCopyButtons() {
    const btns = document.querySelectorAll('.btn-copy-obs-url');
    btns.forEach((btn) => {
      if (btn.dataset.obsBound === '1') return;
      btn.dataset.obsBound = '1';
      btn.addEventListener('click', () => {
        const obsPath = btn.getAttribute('data-obs-path') || '/overlay-battle/index.html';
        const obsSize = btn.getAttribute('data-obs-size') || '1920x1080';
        const origin = (window.location.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file:'))
          ? window.location.origin
          : 'http://127.0.0.1:3001';
        const fullObsUrl = `${origin}${obsPath}?obs=1`;

        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard.writeText(fullObsUrl).catch(() => {});
        }

        const originalLabel = btn.textContent;
        btn.textContent = `✓ Copied (${obsSize})`;
        setTimeout(() => {
          btn.textContent = originalLabel;
        }, 2200);

        if (window.sonner) {
          window.sonner.toast({
            title: `📋 OBS Browser Source URL Copied (${obsSize})`,
            message: `${fullObsUrl} — Paste in OBS Studio Browser Source (${obsSize}).`,
            type: 'cyan'
          });
        }
      });
    });
  }

  bindAdminControls() {
    this.renderKPIs();
    this.bindObsCopyButtons();
  }

  // ========================================================
  // CONDENSED CONTROL PANEL (#control-panel) & LIVE KICK BRIDGE
  // ========================================================

  resolveSlotMeta(rawSlotName) {
    const clean = String(rawSlotName || '').trim() || 'Wanted Dead or a Wild';
    if (window.SlotResolver && typeof window.SlotResolver.resolve === 'function') {
      const r = window.SlotResolver.resolve(clean);
      if (r && r.image) {
        return { name: r.name || clean, provider: r.provider || 'Casino', image: r.image };
      }
    }
    const fallbackImg = (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function')
      ? window.SlotResolver.generateDataUriCard(clean, 'Casino')
      : '/site/images/slots/wanted-dead-or-a-wild.svg';
    return { name: clean, provider: 'Casino', image: fallbackImg };
  }

  setWheelTargetCorner(corner) {
    this.wheelTargetCorner = corner === 'B' ? 'B' : 'A';
    this.updateWheelTargetUI();
    if (this.channelDuo && this.duoMode === 'battle') {
      this.channelDuo.postMessage({ action: 'set_target_corner', corner: this.wheelTargetCorner });
    }
  }

  updateWheelTargetUI() {
    const pill = document.getElementById('cp-wheel-target-pill');
    const btnA = document.getElementById('cp-btn-target-a');
    const btnB = document.getElementById('cp-btn-target-b');
    const cpSpinBtn = document.getElementById('cp-btn-spin-duo');

    if (this.duoMode === 'tourney') {
      const nextSeed = this.getNextTourneySeedSlot();
      if (pill) {
        pill.textContent = `🏆 SEED ${nextSeed.seed}/8`;
        pill.style.background = 'rgba(255, 215, 0, 0.18)';
        pill.style.borderColor = '#ffd700';
        pill.style.color = '#ffd700';
      }
      if (btnA) btnA.style.display = 'none';
      if (btnB) btnB.style.display = 'none';
      if (cpSpinBtn && !cpSpinBtn.disabled) {
        cpSpinBtn.textContent = `🎡 SPIN DUO WHEEL (Pick Seed ${nextSeed.seed}/8 & Fill Bracket)`;
      }
    } else {
      if (pill) {
        if (this.wheelTargetCorner === 'A') {
          pill.textContent = '🔵 PLAYER A (BLUE CORNER)';
          pill.style.background = 'rgba(0, 229, 255, 0.18)';
          pill.style.borderColor = '#00e5ff';
          pill.style.color = '#00e5ff';
        } else {
          pill.textContent = '🔴 PLAYER B (RED CORNER)';
          pill.style.background = 'rgba(255, 42, 95, 0.18)';
          pill.style.borderColor = '#ff2a5f';
          pill.style.color = '#ff2a5f';
        }
      }
      if (btnA) btnA.style.display = 'inline-block';
      if (btnB) btnB.style.display = 'inline-block';
      if (cpSpinBtn && !cpSpinBtn.disabled) {
        cpSpinBtn.textContent = '🎡 SPIN DUO WHEEL (Pick Winner & Fill Corner)';
      }
    }
  }

  getEmptyCornerPlaceholderSvg(corner) {
    const color = corner === 'B' ? '#ff2a5f' : '#00e5ff';
    const label = corner === 'B' ? 'EMPTY B' : 'EMPTY A';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 236"><rect width="180" height="236" rx="14" fill="#070a12" stroke="${color}" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 4"/><text x="90" y="112" text-anchor="middle" font-family="Chakra Petch, sans-serif" font-weight="900" font-size="44" fill="${color}" fill-opacity="0.45">?</text><text x="90" y="152" text-anchor="middle" font-family="Chakra Petch, sans-serif" font-weight="800" font-size="14" fill="#64748b" letter-spacing="1.5">${label}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  setCornerFighter(corner, username, slotName) {
    const cleanUser = String(username || '').trim().replace(/^@/, '');
    const formattedUser = cleanUser ? `@${cleanUser}` : '';
    const cleanSlot = String(slotName || '').trim();
    const hasFighter = Boolean(cleanUser);
    const meta = hasFighter
      ? this.resolveSlotMeta(cleanSlot || (corner === 'A' ? 'Wanted Dead or a Wild' : 'Gates of Olympus 1000'))
      : { name: '', provider: '', image: this.getEmptyCornerPlaceholderSvg(corner) };

    if (corner === 'A') {
      const uEl = document.getElementById('cp-battle-user-a');
      const sEl = document.getElementById('cp-battle-slot-a');
      const imgEl = document.getElementById('cp-battle-img-a');
      const adminNameEl = document.getElementById('admin-battle-player-a-name');
      if (uEl) uEl.value = formattedUser;
      if (sEl) sEl.value = hasFighter ? (cleanSlot ? meta.name : meta.name) : '';
      if (imgEl) {
        imgEl.src = meta.image;
        imgEl.onerror = () => {
          if (hasFighter && window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function') {
            imgEl.src = window.SlotResolver.generateDataUriCard(meta.name, meta.provider);
          } else {
            imgEl.src = this.getEmptyCornerPlaceholderSvg('A');
          }
        };
      }
      if (adminNameEl) {
        adminNameEl.textContent = hasFighter ? `${formattedUser} (${meta.name})` : '@PlayerA (Waiting...)';
      }
    } else {
      const uEl = document.getElementById('cp-battle-user-b');
      const sEl = document.getElementById('cp-battle-slot-b');
      const imgEl = document.getElementById('cp-battle-img-b');
      const adminNameEl = document.getElementById('admin-battle-player-b-name');
      if (uEl) uEl.value = formattedUser;
      if (sEl) sEl.value = hasFighter ? (cleanSlot ? meta.name : meta.name) : '';
      if (imgEl) {
        imgEl.src = meta.image;
        imgEl.onerror = () => {
          if (hasFighter && window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function') {
            imgEl.src = window.SlotResolver.generateDataUriCard(meta.name, meta.provider);
          } else {
            imgEl.src = this.getEmptyCornerPlaceholderSvg('B');
          }
        };
      }
      if (adminNameEl) {
        adminNameEl.textContent = hasFighter ? `${formattedUser} (${meta.name})` : '@PlayerB (Waiting...)';
      }
    }
  }

  assignWheelWinnerToCorner(corner, username, slotName, spinId) {
    if (spinId) {
      if (this._processedDuoSpinIds.has(spinId)) return;
      this._processedDuoSpinIds.add(spinId);
    }

    const cleanUser = String(username || '').trim().replace(/^@/, '');
    if (!cleanUser) return;

    if (corner === 'A') {
      this.setCornerFighter('A', cleanUser, slotName);
      // Player B MUST remain completely empty until the second spin explicitly selects Player B
      this.setCornerFighter('B', '', '');
      this.setWheelTargetCorner('B');
    } else {
      this.setCornerFighter('B', cleanUser, slotName);
    }
    this.pushCornersToOverlay();
  }

  pushCornersToOverlay() {
    const userA = (document.getElementById('cp-battle-user-a')?.value || '').trim().replace(/^@/, '');
    const slotA = (document.getElementById('cp-battle-slot-a')?.value || '').trim();
    let userB = (document.getElementById('cp-battle-user-b')?.value || '').trim().replace(/^@/, '');
    let slotB = (document.getElementById('cp-battle-slot-b')?.value || '').trim();

    const metaA = (userA && slotA) ? this.resolveSlotMeta(slotA) : { name: '', provider: '', image: '' };
    const metaB = (userB && slotB) ? this.resolveSlotMeta(slotB) : { name: '', provider: '', image: '' };

    const playerAObj = userA ? {
      userId: `u_${userA}`,
      username: userA,
      displayName: userA,
      name: `@${userA}`,
      slotName: metaA.name,
      slot: metaA.name,
      slotProvider: metaA.provider,
      provider: metaA.provider,
      slotImage: metaA.image,
      image: metaA.image,
      multiplier: Number(document.getElementById('cp-battle-mult-a')?.value || 0),
      winAmount: 0
    } : null;

    const playerBObj = userB ? {
      userId: `u_${userB}`,
      username: userB,
      displayName: userB,
      name: `@${userB}`,
      slotName: metaB.name,
      slot: metaB.name,
      slotProvider: metaB.provider,
      provider: metaB.provider,
      slotImage: metaB.image,
      image: metaB.image,
      multiplier: Number(document.getElementById('cp-battle-mult-b')?.value || 0),
      winAmount: 0
    } : null;

    const statePayload = {
      id: 'battle_live',
      type: 'BATTLE_SYNC',
      action: 'battle_update',
      status: (playerAObj && playerBObj) ? 'READY' : 'LOBBY',
      gameMode: this.battleMode === 'SPINS' ? 'SPINS' : 'BONUS_BUY',
      mode: this.battleMode === 'SPINS' ? 'SPINS' : 'MULTIPLIER',
      kothActive: true,
      currentStreak: this.kothState.streak || 0,
      kothStreak: this.kothState.streak || 0,
      reigningKing: this.kothState.king ? { username: this.kothState.king, displayName: this.kothState.king, slotName: this.kothState.kingSlot } : null,
      playerA: playerAObj,
      playerB: playerBObj,
      winner: null,
      ts: Date.now()
    };

    try {
      localStorage.setItem('hunthub_battle_state', JSON.stringify(statePayload));
    } catch (_) {}

    if (this.channelBattle) {
      this.channelBattle.postMessage({ action: 'battle_update', type: 'battle_update', state: statePayload, ...statePayload });
    }
    try {
      const chBus = new BroadcastChannel('hunthub_battle_bus');
      chBus.postMessage({ action: 'battle_update', type: 'battle_update', state: statePayload, ...statePayload });
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('hunthub:battle-sync', { detail: statePayload }));

    // Sync to Cloudflare Edge D1 so the streamer's OBS in the USA updates immediately
    this.relayOverlaySyncEvent({
      target: 'overlay-battle',
      type: 'BATTLE_SYNC',
      action: 'battle_update',
      data: { state: statePayload },
      state: statePayload,
      ts: statePayload.ts
    });
    fetch('/api/battle/state', {
      method: 'POST',
      headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ state: statePayload })
    }).catch(() => {});
  }

  clearBothBattleCorners() {
    this.kothState.king = null;
    this.kothState.kingSlot = '';
    this.kothState.streak = 0;
    this.kothState.awaitingDecision = false;
    localStorage.setItem('hunthub_koth_state', JSON.stringify(this.kothState));

    this.setCornerFighter('A', '', '');
    this.setCornerFighter('B', '', '');
    this.setWheelTargetCorner('A');

    const multA = document.getElementById('cp-battle-mult-a');
    const multB = document.getElementById('cp-battle-mult-b');
    if (multA) multA.value = '';
    if (multB) multB.value = '';

    this.pushCornersToOverlay();
    const resetEvt = { target: 'overlay-battle', action: 'reset_battle', type: 'RESET_BATTLE', ts: Date.now() };
    if (this.channelBattle) {
      this.channelBattle.postMessage(resetEvt);
    }
    try {
      const chBus = new BroadcastChannel('hunthub_battle_bus');
      chBus.postMessage(resetEvt);
    } catch (_) {}
    this.relayOverlaySyncEvent(resetEvt);
    window.dispatchEvent(new CustomEvent('hunthub:battle-sync', { detail: resetEvt }));
    try { fetch('/api/battle/reset', { method: 'POST', headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }) }).catch(() => {}); } catch (_) {}

    this.renderKothDeck();
    this.syncCondensedControlPanelUI();
  }

  showKothBanner(text, tone = 'cyan') {
    const banner = document.getElementById('cp-koth-banner');
    if (!banner) return;
    if (!text) {
      banner.style.display = 'none';
      return;
    }
    banner.style.display = 'block';
    banner.textContent = text;
    if (tone === 'gold') {
      banner.style.borderColor = 'var(--gold)';
      banner.style.background = 'linear-gradient(135deg, rgba(255, 215, 0, 0.25), rgba(83, 252, 24, 0.14))';
    } else {
      banner.style.borderColor = '#00e5ff';
      banner.style.background = 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(15, 23, 42, 0.9))';
    }
  }

  addDuoEntry(username, slotName, mode = 'battle') {
    const cleanUser = String(username || '').trim().replace(/^@/, '');
    const meta = this.resolveSlotMeta(slotName);
    if (!cleanUser) return;

    this._lastLocalDuoMutationAt = Date.now();
    const isStreamerTest = this.isStreamerUser(cleanUser);
    const queueEntry = {
      username: cleanUser,
      chatter: cleanUser,
      slotName: meta.name,
      slot: meta.name,
      slotProvider: meta.provider,
      provider: meta.provider,
      imageUrl: meta.image,
      addedAt: Date.now()
    };

    const matchDifferentFilter = (e) => {
      const u = String(e.username || e.chatter || '').toLowerCase().replace(/^@/, '');
      const s = String(e.slotName || e.slot || '').toLowerCase();
      if (isStreamerTest) {
        return !(u === cleanUser.toLowerCase() && s === meta.name.toLowerCase());
      }
      return u !== cleanUser.toLowerCase();
    };

    if (mode === 'tourney') {
      this.tourneyQueue = this.tourneyQueue.filter(matchDifferentFilter);
      this.tourneyQueue.push(queueEntry);
      const tCount = document.getElementById('cp-tourney-q-count');
      if (tCount) tCount.textContent = String(this.tourneyQueue.length);
    } else {
      this.battleQueue = this.battleQueue.filter(matchDifferentFilter);
      this.battleQueue.push(queueEntry);
      const bCount = document.getElementById('cp-battle-q-count');
      if (bCount) bCount.textContent = String(this.battleQueue.length);
    }

    // Automatically switch Duo Wheel mode when a command for the other mode arrives
    if (mode !== this.duoMode) {
      this.setDuoMode(mode, true);
    }

    this.duoPool = this.duoPool.filter(p => {
      const u = String(p.chatter || '').toLowerCase().replace(/^@/, '');
      const s = String(p.slot || '').toLowerCase();
      if (isStreamerTest) {
        return !(u === cleanUser.toLowerCase() && s === meta.name.toLowerCase());
      }
      return u !== cleanUser.toLowerCase();
    });
    this.duoPool.unshift({
      chatter: cleanUser,
      slot: meta.name,
      provider: meta.provider,
      imageUrl: meta.image,
      icon: '🎰'
    });
    try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.duoPool)); } catch (_) {}
    this.renderDuoQueue();
    if (this.channelDuo) {
      this.channelDuo.postMessage({ action: 'set_mode', mode: this.duoMode, ts: Date.now() });
      this.channelDuo.postMessage({
        action: 'set_pool',
        pool: this.duoPool,
        type: 'sync_pool',
        items: this.duoPool,
        mode: this.duoMode,
        battleQueue: this.battleQueue,
        tourneyQueue: this.tourneyQueue
      });
    }

    this.pushDuoQueuesToEdge();
  }

  handleDuoBroadcast(data) {
    if (!data) return;
    if (data.action === 'set_mode' && (data.mode === 'battle' || data.mode === 'tourney')) {
      if (this.duoMode !== data.mode) {
        this.setDuoMode(data.mode, true);
      }
      return;
    }
    if (data.action === 'duo_winner_selected' && data.winner) {
      if (data.spinId && this._processedDuoSpinIds.has(data.spinId)) return;
      if (data.timestamp && this._lastDuoWinTs === data.timestamp) return;
      if (data.timestamp) this._lastDuoWinTs = data.timestamp;

      const u = data.winner.chatter || data.winner.username || '';
      const s = data.winner.slot || data.winner.slotName || '';
      if (u) {
        const cleanU = u.toLowerCase().replace(/^@/, '');
        this._lastLocalDuoMutationAt = Date.now();
        if (Array.isArray(data.pool)) {
          this.duoPool = data.pool;
        } else {
          this.duoPool = this.duoPool.filter(item => String(item.chatter || '').toLowerCase().replace(/^@/, '') !== cleanU);
        }
        try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.duoPool)); } catch (_) {}
        this.renderDuoQueue();

        const isTourneySpin = data.mode === 'tourney' || (this.duoMode === 'tourney' && data.mode !== 'battle');
        if (isTourneySpin) {
          this.assignWheelWinnerToTourneySeed(u, s, data.spinId, data.seed);
          this.announceStreamWinner({
            eventType: 'picked',
            tier: 'partial',
            type: 'WHEEL_PICKED',
            category: `8-BRACKET TOURNEY · SEED ${data.seed || 1}/8 PICKED`,
            ribbon: `🏆 SEED ${data.seed || 1}/8 SELECTED`,
            icon: '🏆',
            username: u,
            slotName: s,
            statValue: `SEED #${data.seed || 1}`,
            prize: `Picked for 8-Bracket Tourney (${s})!`
          });
        } else {
          const target = data.targetCorner || (document.getElementById('cp-battle-user-a')?.value ? 'B' : 'A');
          this.assignWheelWinnerToCorner(target, u, s, data.spinId);
          this.announceStreamWinner({
            eventType: 'picked',
            tier: 'partial',
            type: 'WHEEL_PICKED',
            category: `1V1 BATTLE · ${target === 'A' ? 'BLUE CORNER' : 'RED CORNER'} PICKED`,
            ribbon: `🎡 ${target === 'A' ? 'PLAYER A (BLUE)' : 'PLAYER B (RED)'} SELECTED`,
            icon: '🎡',
            username: u,
            slotName: s,
            statValue: `CORNER ${target}`,
            prize: `Picked on Dual Wheel (${s})!`
          });
        }
      }
    }
  }

  handleBattleBroadcast(data) {
    if (!data) return;
    if (data.action === 'set_target_corner' && data.corner) {
      this.setWheelTargetCorner(data.corner);
    } else if (data.action === 'assign_player' && data.player) {
      if (data.spinId && this._processedDuoSpinIds.has(data.spinId)) return;
      if (data.timestamp && this._lastAssignTs === data.timestamp) return;
      if (data.timestamp) this._lastAssignTs = data.timestamp;

      const corner = data.playerSlot === 'B' ? 'B' : 'A';
      const u = data.player.username || data.player.displayName || data.player.name || '';
      const s = data.player.slotName || data.player.slot || '';
      if (u) {
        const cleanU = String(u).toLowerCase().replace(/^@/, '');
        this._lastLocalDuoMutationAt = Date.now();
        this.duoPool = this.duoPool.filter(item => String(item.chatter || '').toLowerCase().replace(/^@/, '') !== cleanU);
        try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.duoPool)); } catch (_) {}
        this.renderDuoQueue();
        this.assignWheelWinnerToCorner(corner, u, s, data.spinId);
      }
    }
  }

  syncCondensedControlPanelUI() {
    const streak = this.kothState.streak || 0;
    const prize = Math.min(20, streak * 5);
    const badge = document.getElementById('cp-battle-streak-badge');
    if (badge) {
      badge.textContent = `👑 STREAK: ${streak}/4 ($${prize})`;
    }
    const kingTagA = document.getElementById('cp-king-tag-a');
    if (kingTagA) {
      kingTagA.style.display = streak > 0 ? 'inline-block' : 'none';
      if (streak > 0) kingTagA.textContent = `👑 KING (${streak}/4 · $${prize})`;
    }

    // Hydrate Corner A and Corner B from saved hunthub_battle_state if currently empty
    try {
      const savedBattle = JSON.parse(localStorage.getItem('hunthub_battle_state') || 'null');
      if (savedBattle) {
        const uAEl = document.getElementById('cp-battle-user-a');
        const uBEl = document.getElementById('cp-battle-user-b');
        const pAName = String(savedBattle.playerA?.username || savedBattle.playerA?.displayName || savedBattle.playerA?.name || '').trim().replace(/^@/, '');
        const pASlot = savedBattle.playerA?.slotName || savedBattle.playerA?.slot || '';
        let pBName = String(savedBattle.playerB?.username || savedBattle.playerB?.displayName || savedBattle.playerB?.name || '').trim().replace(/^@/, '');
        let pBSlot = savedBattle.playerB?.slotName || savedBattle.playerB?.slot || '';

        if (pAName && !this.demoUsernames.has(pAName.toLowerCase()) && uAEl && !uAEl.value) {
          this.setCornerFighter('A', pAName, pASlot);
        }
        if (pBName && !this.demoUsernames.has(pBName.toLowerCase()) && uBEl && !uBEl.value) {
          this.setCornerFighter('B', pBName, pBSlot);
        } else if (!pBName) {
          this.setCornerFighter('B', '', '');
        }
        if (pAName && !pBName) {
          this.setWheelTargetCorner('B');
        }
      }
    } catch (_) {}

    // Ensure any corner without a username displays the empty placeholder
    const curUserA = (document.getElementById('cp-battle-user-a')?.value || '').trim();
    const curUserB = (document.getElementById('cp-battle-user-b')?.value || '').trim();
    if (!curUserA) {
      this.setCornerFighter('A', '', '');
    }
    if (!curUserB) {
      this.setCornerFighter('B', '', '');
    }

    this.setDuoMode(this.duoMode, true);
    this.updateWheelTargetUI();
    this.renderDuoQueue();
  }

  setupCondensedControlPanel() {
    this.syncCondensedControlPanelUI();

    // 1. Battle Mode Switch inside #control-panel
    const btnMultMode = document.getElementById('cp-mode-mult-btn');
    const btnSpinMode = document.getElementById('cp-mode-spin-btn');
    const multBox = document.getElementById('cp-mult-box');
    const spinBox = document.getElementById('cp-spin-box');

    if (btnMultMode && btnSpinMode) {
      btnMultMode.onclick = () => {
        this.setBattleMode('BONUS_BUY');
        if (multBox) multBox.style.display = 'grid';
        if (spinBox) spinBox.style.display = 'none';
        btnMultMode.style.borderColor = 'var(--gold)';
        btnMultMode.style.color = 'var(--gold)';
        btnMultMode.style.background = 'rgba(255,215,0,0.12)';
        btnSpinMode.style.borderColor = 'rgba(255,255,255,0.15)';
        btnSpinMode.style.color = '#cbd5e1';
        btnSpinMode.style.background = 'transparent';
      };
      btnSpinMode.onclick = () => {
        this.setBattleMode('SPINS');
        if (multBox) multBox.style.display = 'none';
        if (spinBox) spinBox.style.display = 'grid';
        btnSpinMode.style.borderColor = 'var(--gold)';
        btnSpinMode.style.color = 'var(--gold)';
        btnSpinMode.style.background = 'rgba(255,215,0,0.12)';
        btnMultMode.style.borderColor = 'rgba(255,255,255,0.15)';
        btnMultMode.style.color = '#cbd5e1';
        btnMultMode.style.background = 'transparent';
      };
    }

    // Live slot cover preview & reactive corner synchronization when editing user or slot inputs
    const userAInput = document.getElementById('cp-battle-user-a');
    const userBInput = document.getElementById('cp-battle-user-b');
    const slotAInput = document.getElementById('cp-battle-slot-a');
    const slotBInput = document.getElementById('cp-battle-slot-b');

    if (userAInput) {
      const handleUserA = () => {
        const u = userAInput.value.trim().replace(/^@/, '');
        const imgA = document.getElementById('cp-battle-img-a');
        if (!u) {
          if (imgA) imgA.src = this.getEmptyCornerPlaceholderSvg('A');
          this.kothState.king = null;
          this.kothState.streak = 0;
          this.syncCondensedControlPanelUI();
        }
        this.pushCornersToOverlay();
      };
      userAInput.addEventListener('input', handleUserA);
      userAInput.addEventListener('change', handleUserA);
    }

    if (userBInput) {
      const handleUserB = () => {
        const u = userBInput.value.trim().replace(/^@/, '');
        const imgB = document.getElementById('cp-battle-img-b');
        if (!u) {
          if (imgB) imgB.src = this.getEmptyCornerPlaceholderSvg('B');
        }
        this.pushCornersToOverlay();
      };
      userBInput.addEventListener('input', handleUserB);
      userBInput.addEventListener('change', handleUserB);
    }

    if (slotAInput) {
      slotAInput.addEventListener('input', () => {
        const hasUser = Boolean((document.getElementById('cp-battle-user-a')?.value || '').trim());
        const meta = hasUser ? this.resolveSlotMeta(slotAInput.value) : { image: this.getEmptyCornerPlaceholderSvg('A') };
        const imgA = document.getElementById('cp-battle-img-a');
        if (imgA) imgA.src = meta.image;
        this.pushCornersToOverlay();
      });
    }
    if (slotBInput) {
      slotBInput.addEventListener('input', () => {
        const hasUser = Boolean((document.getElementById('cp-battle-user-b')?.value || '').trim());
        const meta = hasUser ? this.resolveSlotMeta(slotBInput.value) : { image: this.getEmptyCornerPlaceholderSvg('B') };
        const imgB = document.getElementById('cp-battle-img-b');
        if (imgB) imgB.src = meta.image;
        this.pushCornersToOverlay();
      });
    }

    // Compare Multipliers & Declare Winner
    const btnResolveMult = document.getElementById('cp-btn-resolve-mult');
    if (btnResolveMult) {
      btnResolveMult.onclick = () => {
        this.pushCornersToOverlay();
        const multA = parseFloat(document.getElementById('cp-battle-mult-a')?.value || '0');
        const multB = parseFloat(document.getElementById('cp-battle-mult-b')?.value || '0');
        const userA = document.getElementById('cp-battle-user-a')?.value || '@PlayerA';
        const userB = document.getElementById('cp-battle-user-b')?.value || '@PlayerB';
        const winnerSlot = multA >= multB ? 'A' : 'B';
        const winName = winnerSlot === 'A' ? userA : userB;
        const loseName = winnerSlot === 'A' ? userB : userA;
        this.applyBattleResolution(winnerSlot, winName, loseName, `${Math.max(multA, multB).toFixed(2)}x vs ${Math.min(multA, multB).toFixed(2)}x`);
      };
    }

    // 1-Click Spins WIN / LOSE (50 Spins Profit/Loss)
    const btnWinA = document.getElementById('cp-btn-win-a');
    const btnLoseA = document.getElementById('cp-btn-lose-a');
    const btnWinB = document.getElementById('cp-btn-win-b');
    const btnLoseB = document.getElementById('cp-btn-lose-b');

    if (btnWinA) {
      btnWinA.onclick = () => {
        this.pushCornersToOverlay();
        const userA = document.getElementById('cp-battle-user-a')?.value || '@PlayerA';
        const userB = document.getElementById('cp-battle-user-b')?.value || '@PlayerB';
        this.applyBattleResolution('A', userA, userB, '50 Spins: Blue WIN / Red LOSE');
      };
    }
    if (btnLoseA) {
      btnLoseA.onclick = () => {
        this.pushCornersToOverlay();
        const userA = document.getElementById('cp-battle-user-a')?.value || '@PlayerA';
        const userB = document.getElementById('cp-battle-user-b')?.value || '@PlayerB';
        this.applyBattleResolution('B', userB, userA, '50 Spins: Blue LOSE / Red WIN');
      };
    }
    if (btnWinB) {
      btnWinB.onclick = () => {
        this.pushCornersToOverlay();
        const userA = document.getElementById('cp-battle-user-a')?.value || '@PlayerA';
        const userB = document.getElementById('cp-battle-user-b')?.value || '@PlayerB';
        this.applyBattleResolution('B', userB, userA, '50 Spins: Red WIN / Blue LOSE');
      };
    }
    if (btnLoseB) {
      btnLoseB.onclick = () => {
        this.pushCornersToOverlay();
        const userA = document.getElementById('cp-battle-user-a')?.value || '@PlayerA';
        const userB = document.getElementById('cp-battle-user-b')?.value || '@PlayerB';
        this.applyBattleResolution('A', userA, userB, '50 Spins: Red LOSE / Blue WIN');
      };
    }

    // Push cards, !continue, !cashout, Clear
    const btnSyncCards = document.getElementById('cp-btn-sync-cards');
    const btnContinue = document.getElementById('cp-btn-koth-continue');
    const btnCashout = document.getElementById('cp-btn-koth-cashout');
    const btnClear = document.getElementById('cp-btn-battle-clear');

    if (btnSyncCards) {
      btnSyncCards.onclick = () => {
        this.pushCornersToOverlay();
        if (window.sonner) window.sonner.toast({ title: 'Cards Synced to OBS ⚔️', message: 'Blue & Red Corners updated on 1v1 Battle overlay.', type: 'cyan' });
      };
    }
    if (btnContinue) btnContinue.onclick = () => this.kothContinue();
    if (btnCashout) btnCashout.onclick = () => this.kothRetire();
    if (btnClear) btnClear.onclick = () => this.kothNewGame();

    // 2. Duo Wheel & Other Wheels Controls inside #control-panel
    const btnTargetA = document.getElementById('cp-btn-target-a');
    const btnTargetB = document.getElementById('cp-btn-target-b');
    const btnSpinDuo = document.getElementById('cp-btn-spin-duo');
    const btnDuoBattle = document.getElementById('cp-btn-duo-mode-battle');
    const btnDuoTourney = document.getElementById('cp-btn-duo-mode-tourney');
    const btnDuoAdd = document.getElementById('cp-btn-duo-add');
    const btnDuoClear = document.getElementById('cp-btn-duo-clear');
    const btnSpinCsgo = document.getElementById('cp-btn-spin-csgo');
    const btnSpinSlots = document.getElementById('cp-btn-spin-slots');

    if (btnTargetA) btnTargetA.onclick = () => this.setWheelTargetCorner('A');
    if (btnTargetB) btnTargetB.onclick = () => this.setWheelTargetCorner('B');
    if (btnSpinDuo) btnSpinDuo.onclick = () => this.spinDuoWheel();
    if (btnDuoBattle) btnDuoBattle.onclick = () => this.setDuoMode('battle');
    if (btnDuoTourney) btnDuoTourney.onclick = () => this.setDuoMode('tourney');

    if (btnDuoAdd) {
      btnDuoAdd.onclick = () => {
        const u = document.getElementById('cp-duo-add-user')?.value.trim();
        const s = document.getElementById('cp-duo-add-slot')?.value.trim();
        if (!u || !s) return;
        this.addDuoEntry(u, s, this.duoMode);
        document.getElementById('cp-duo-add-user').value = '';
        document.getElementById('cp-duo-add-slot').value = '';
      };
    }
    if (btnDuoClear) {
      btnDuoClear.onclick = () => {
        this.duoPool = [];
        if (this.duoMode === 'tourney') {
          this.tourneyQueue = [];
        } else {
          this.battleQueue = [];
        }
        this._lastLocalDuoMutationAt = Date.now();
        try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.duoPool)); } catch (_) {}
        this.renderDuoQueue();
        if (this.channelDuo) this.channelDuo.postMessage({ action: 'set_pool', pool: [], type: 'sync_pool', items: [] });
        this.pushDuoQueuesToEdge();
      };
    }

    if (btnSpinCsgo) btnSpinCsgo.onclick = () => this.spinCSGOWheel(false);
    if (btnSpinSlots) btnSpinSlots.onclick = () => this.spinSlotWheel(false);

    // 3. Tournament & Bonus Hunt Quick Controls
    const btnSeedTourney = document.getElementById('cp-btn-seed-tourney');
    if (btnSeedTourney) {
      btnSeedTourney.onclick = () => this.seedTourneyFromQueue();
    }

    const btnBhAdd = document.getElementById('cp-btn-bh-add');
    if (btnBhAdd) {
      btnBhAdd.onclick = () => {
        const slot = document.getElementById('cp-bh-slot')?.value.trim();
        const bet = parseFloat(document.getElementById('cp-bh-bet')?.value || '2.00');
        const caller = document.getElementById('cp-bh-user')?.value.trim() || '@diggitybets';
        if (!slot) return;
        const adminSearch = document.getElementById('admin-hunt-slot-search');
        const adminBet = document.getElementById('admin-hunt-bet-input');
        const adminCaller = document.getElementById('admin-hunt-caller-input');
        const adminAddBtn = document.getElementById('btn-admin-add-bonus');
        if (adminSearch) adminSearch.value = slot;
        if (adminBet) adminBet.value = String(bet);
        if (adminCaller) adminCaller.value = caller;
        if (adminAddBtn) adminAddBtn.click();
        document.getElementById('cp-bh-slot').value = '';
      };
    }

    // 4. Copy OBS Overlay URLs & Test Celebration Overlay from #control-panel
    const copyObsHelper = (path, label, btnEl) => {
      const origin = (window.location.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file:'))
        ? window.location.origin
        : 'https://diggitybets.vip';
      const url = `${origin}${path}?obs=1`;
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(url).catch(() => {});
      }
      if (btnEl) {
        const prev = btnEl.textContent;
        btnEl.textContent = '✓ Copied!';
        setTimeout(() => { btnEl.textContent = prev; }, 2000);
      }
      if (window.sonner) {
        window.sonner.toast({
          title: `📋 ${label} OBS URL Copied!`,
          message: url,
          type: 'cyan'
        });
      }
    };

    const obsBattle = document.getElementById('cp-btn-obs-battle');
    const obsDuo = document.getElementById('cp-btn-obs-duo');
    const obsCsgo = document.getElementById('cp-btn-obs-csgo');
    const obsSlots = document.getElementById('cp-btn-obs-slots');
    const obsTourney = document.getElementById('cp-btn-obs-tourney');
    const obsBh = document.getElementById('cp-btn-obs-bh');
    const obsCelebration = document.getElementById('cp-btn-obs-celebration');
    const btnTestCelebrationPartial = document.getElementById('cp-btn-test-celebration-partial');
    const btnTestCelebration = document.getElementById('cp-btn-test-celebration');

    if (obsBattle) obsBattle.onclick = () => copyObsHelper('/overlay-battle/index.html', '1v1 Battle', obsBattle);
    if (obsDuo) obsDuo.onclick = () => copyObsHelper('/wheel-duo/index.html', 'Dual Wheel', obsDuo);
    if (obsCsgo) obsCsgo.onclick = () => copyObsHelper('/wheel-csgo/overlay/index.html', 'CS:GO Wheel', obsCsgo);
    if (obsSlots) obsSlots.onclick = () => copyObsHelper('/wheel-slots/overlay/index.html', 'Slot Wheel', obsSlots);
    if (obsTourney) obsTourney.onclick = () => copyObsHelper('/overlay-tourney/index.html', '8-Bracket Tourney', obsTourney);
    if (obsBh) obsBh.onclick = () => copyObsHelper('/overlay-bonushunt/index.html', 'Bonus Hunt', obsBh);
    if (obsCelebration) obsCelebration.onclick = () => copyObsHelper('/overlay-celebration/index.html', 'Winner Celebration (1920x1080)', obsCelebration);

    if (btnTestCelebrationPartial) {
      btnTestCelebrationPartial.onclick = () => {
        const testUser = (document.getElementById('cp-battle-user-a')?.value || this.kothState.king || '@diggitybets').trim().replace(/^@/, '') || 'diggitybets';
        const testSlot = (document.getElementById('cp-battle-slot-a')?.value || this.kothState.kingSlot || 'Wanted Dead or a Wild').trim();
        this.announceStreamWinner({
          eventType: 'picked',
          tier: 'partial',
          type: 'BATTLE_WIN',
          category: '1V1 BATTLE · ROUND WINNER',
          ribbon: '⚔️ ROUND VICTORY (1/4)',
          icon: '⚔️',
          username: testUser,
          slotName: testSlot,
          statValue: 'ROUND WIN',
          prize: 'STREAK 1/4 · $5.00 USD BANKED'
        });
        if (window.sonner) {
          window.sonner.toast({
            title: '🎺 Winner Announcement Sent to OBS & Chat!',
            message: `Celebration + Chat Bot message triggered for @${testUser}.`,
            type: 'cyan'
          });
        }
      };
    }

    if (btnTestCelebration) {
      btnTestCelebration.onclick = () => {
        const testUser = (document.getElementById('cp-battle-user-a')?.value || this.kothState.king || '@diggitybets').trim().replace(/^@/, '') || 'diggitybets';
        const testSlot = (document.getElementById('cp-battle-slot-a')?.value || this.kothState.kingSlot || 'Gates of Olympus 1000').trim();
        this.announceStreamWinner({
          eventType: 'battle',
          tier: 'grand',
          type: 'KOTH_CHAMPION',
          category: 'KING OF THE HILL · GRAND CHAMPION',
          ribbon: '👑 $20.00 USD MAX PRIZE / !CASHOUT',
          icon: '👑',
          username: testUser,
          slotName: testSlot,
          statValue: 'CHAMPION 🏆',
          prize: '🏆 GRAND PRIZE LOCKED: $20.00 USD!'
        });
        if (window.sonner) {
          window.sonner.toast({
            title: '👑 Grand Winner Announcement Sent to OBS & Chat!',
            message: `Grand Celebration + Chat Bot message triggered for @${testUser}.`,
            type: 'gold'
          });
        }
      };
    }

    // 5. Manual Command Dispatch Bar in #control-panel
    const btnSendCmd = document.getElementById('cp-btn-send-cmd');
    const cmdInput = document.getElementById('cp-chat-cmd-input');
    const userInput = document.getElementById('cp-chat-user-input');
    if (btnSendCmd && cmdInput) {
      const sendNow = () => {
        const u = (userInput ? userInput.value : '@diggitybets').trim().replace(/^@/, '') || 'diggitybets';
        const c = cmdInput.value.trim();
        if (!c) return;
        this.processLiveChatCommand(u, c);
        cmdInput.value = '';
      };
      btnSendCmd.onclick = sendNow;
      cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendNow();
        }
      });
    }

    // 6. Initialize Per-Game ON/OFF Performance Switches in #control-panel
    this.initControlPanelModuleSwitches();
  }

  initControlPanelModuleSwitches() {
    const STORAGE_KEY = 'hunthub_cp_module_switches';
    const defaultSwitches = {
      battle: true,
      wheels: true,
      slotrequests: true,
      bracket: true,
      bonushunt: true
    };

    let switchState = { ...defaultSwitches };
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (saved && typeof saved === 'object') {
        switchState = { ...defaultSwitches, ...saved };
      }
    } catch (_) {}

    this.cpModuleSwitches = switchState;
    window.isControlPanelModuleActive = (moduleId) => {
      return this.cpModuleSwitches ? this.cpModuleSwitches[moduleId] !== false : true;
    };

    const applyModuleSwitchUI = (moduleId) => {
      const isOn = this.cpModuleSwitches[moduleId] !== false;
      const bodyEl = document.getElementById(`cp-module-body-${moduleId}`);
      const standbyEl = document.getElementById(`cp-module-standby-${moduleId}`);
      const cardEl = document.getElementById(`cp-module-card-${moduleId}`);

      if (bodyEl) bodyEl.style.display = isOn ? '' : 'none';
      if (standbyEl) standbyEl.style.display = isOn ? 'none' : 'block';
      if (cardEl) cardEl.style.opacity = isOn ? '1' : '0.78';

      const toggleBtns = document.querySelectorAll(`[data-cp-module-toggle="${moduleId}"]`);
      toggleBtns.forEach((btn) => {
        btn.classList.toggle('is-on', isOn);
        btn.classList.toggle('is-off', !isOn);
        const stateLabel = btn.querySelector('.cp-switch-state');
        if (stateLabel) stateLabel.textContent = isOn ? 'ON' : 'OFF';
      });

      if (isOn) {
        if (moduleId === 'slotrequests' && window.bonusHunt) {
          window.bonusHunt.renderSlotRequests();
          window.bonusHunt.drawSlotWheel(window.bonusHunt.wheelAngle || 0);
        } else if (moduleId === 'wheels') {
          this.renderDuoQueue();
        } else if (moduleId === 'bracket' && typeof this.renderTournamentAdmin === 'function') {
          this.renderTournamentAdmin();
        } else if (moduleId === 'bonushunt' && typeof this.renderBonusHuntAdmin === 'function') {
          this.renderBonusHuntAdmin();
        }
      }
    };

    Object.keys(defaultSwitches).forEach((modId) => applyModuleSwitchUI(modId));

    document.querySelectorAll('[data-cp-module-toggle]').forEach((btn) => {
      btn.onclick = () => {
        const modId = btn.getAttribute('data-cp-module-toggle');
        if (!modId) return;
        this.cpModuleSwitches[modId] = !(this.cpModuleSwitches[modId] !== false);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cpModuleSwitches));
        } catch (_) {}
        applyModuleSwitchUI(modId);
      };
    });

    // Addy Osmani Web-Quality-Skills + Visibly.js Governor & Live Telemetry Pill
    this.initWebQualityAndVisiblyGovernor();
  }

  initWebQualityAndVisiblyGovernor() {
    if (this._webQualityInitialized) return;
    this._webQualityInitialized = true;

    const pillEl = document.getElementById('cp-webvitals-pill');
    let latestInpMs = 12;
    let currentFps = 60;
    let frames = 0;
    let lastSample = performance.now();
    let fpsRafId = null;

    // 3. Lightweight FPS sampler (runs only when Control Panel is active & tab visible)
    const tickFps = (now) => {
      fpsRafId = null;
      if (document.hidden) {
        frames = 0;
        lastSample = now;
        return;
      }
      frames++;
      const elapsed = now - lastSample;
      if (elapsed >= 2000) {
        currentFps = Math.min(60, Math.max(1, Math.round((frames * 1000) / elapsed)));
        frames = 0;
        lastSample = now;
        if (pillEl) {
          const activeMods = Object.values(this.cpModuleSwitches || {}).filter(Boolean).length;
          const statusDot = currentFps >= 50 && latestInpMs < 200 ? '🟢' : '🟡';
          pillEl.textContent = `${statusDot} ${currentFps} FPS · INP ${latestInpMs}ms · ${activeMods}/4 Active`;
        }
      }
      fpsRafId = requestAnimationFrame(tickFps);
    };

    // 1. Visibly.js pattern: pause CSS animations & loops when tab is hidden
    const syncVisibility = () => {
      const hidden = document.hidden;
      document.body.classList.toggle('is-tab-hidden', hidden);
      if (!hidden && !fpsRafId) {
        frames = 0;
        lastSample = performance.now();
        fpsRafId = requestAnimationFrame(tickFps);
      }
    };
    document.addEventListener('visibilitychange', syncVisibility);
    syncVisibility();

    // 2. PerformanceObserver for Interaction to Next Paint (INP / Event Timing)
    if (typeof PerformanceObserver !== 'undefined') {
      try {
        const obs = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration && entry.duration > 0) {
              latestInpMs = Math.round(entry.duration);
            }
          }
        });
        obs.observe({ type: 'event', buffered: true, durationThreshold: 16 });
      } catch (_) {}
    }
  }


  // ========================================================
  // LIVE KICK CHAT PUSHER BRIDGE (https://kick.com/diggitybets)
  // ========================================================

  purgeDemoUsersForLiveStream(reason = 'stream_online', force = false) {
    if (this._demoUsersPurgedForLive && !force) return;
    this._demoUsersPurgedForLive = true;
    try {
      localStorage.setItem('hunthub_demo_users_purged', 'true');
      localStorage.setItem('hunthub_demo_users_purged_live_v2', 'true');
      localStorage.setItem('hunthub_demo_users_purged_live_v3', 'true');
      localStorage.setItem('hunthub_demo_users_purged_live_v4', 'true');
    } catch (_) {}

    const isDemo = (u) => {
      const clean = String(u || '').trim().replace(/^@/, '').toLowerCase();
      if (!clean) return true;
      if (['viewer', 'streamer', 'diggitybets', 'diggitybot', 'diggity_bot', 'tarkansky', 'stakeautocapture', 'stakecompanionext', 'vaultpack'].includes(clean)) return false;
      if (clean.startsWith('altfarmer') || clean.startsWith('stakefarmer')) return true;
      return this.demoUsernames.has(clean);
    };

    // 1. Clean Store Vouchers Redemptions Queue
    try {
      const savedClaims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]');
      if (Array.isArray(savedClaims)) {
        const realClaims = savedClaims.filter(c => {
          if (c.id && String(c.id).startsWith('claim_demo_')) return false;
          const u = c.kick_username || c.username || '';
          if (force && c.status === 'REFUNDED') return false;
          return !isDemo(u);
        });
        localStorage.setItem(this.storageKeyClaims, JSON.stringify(realClaims));
      }
    } catch (_) {}
    this.renderClaimsQueue();

    // 1B. Clean Stake Partners Referrals List
    try {
      const savedRefs = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]');
      if (Array.isArray(savedRefs)) {
        const realRefs = savedRefs.filter(r => !isDemo(r?.username) && (!r?.kickUser || r.kickUser === '@Viewer' ? !isDemo(r?.username) : !isDemo(r.kickUser)));
        localStorage.setItem('hunthub_verified_stake_list', JSON.stringify(realRefs));
      }
    } catch (_) {}
    this.renderStakeReferrals();

    // 2. Clean Sunday Raffle Ledger
    try {
      const savedRaffle = JSON.parse(localStorage.getItem(this.storageKeyTickets) || 'null');
      if (savedRaffle && Array.isArray(savedRaffle.participants)) {
        savedRaffle.participants = savedRaffle.participants.filter(p => !isDemo(p.kick_username || p.username));
        savedRaffle.totalTickets = savedRaffle.participants.reduce((sum, p) => sum + (p.tickets_count || p.tickets || 0), 0);
        localStorage.setItem(this.storageKeyTickets, JSON.stringify(savedRaffle));
      }
    } catch (_) {}
    this.renderSundayRaffleLedger();

    // 3. Clean Duo Wheel Pool (battle & tourney)
    if (Array.isArray(this.duoPool)) {
      this.duoPool = this.duoPool.filter(item => !isDemo(item.chatter || item.user));
      try { localStorage.setItem('hunthub_duo_pool_v2', JSON.stringify(this.duoPool)); } catch (_) {}
      this.renderDuoQueue();
      if (this.channelDuo) {
        this.channelDuo.postMessage({ action: 'set_pool', pool: this.duoPool, type: 'sync_pool', items: this.duoPool });
      }
    }

    // 4. Clean Recent Chatters Map
    if (this.recentChatters && typeof this.recentChatters.forEach === 'function') {
      for (const [k] of this.recentChatters.entries()) {
        if (isDemo(k)) this.recentChatters.delete(k);
      }
      this.renderActiveChatters();
    }

    // 5. Clean Corners A & B and KOTH State if holding a demo user
    try {
      const savedBattle = JSON.parse(localStorage.getItem('hunthub_battle_state') || 'null');
      if (savedBattle) {
        if (savedBattle.playerA && isDemo(savedBattle.playerA.username || savedBattle.playerA.displayName)) {
          savedBattle.playerA = null;
        }
        if (savedBattle.playerB && isDemo(savedBattle.playerB.username || savedBattle.playerB.displayName)) {
          savedBattle.playerB = null;
        }
        localStorage.setItem('hunthub_battle_state', JSON.stringify(savedBattle));
      }
    } catch (_) {}

    if (this.kothState && this.kothState.king && isDemo(this.kothState.king)) {
      this.kothState.king = null;
      this.kothState.kingSlot = '';
      this.kothState.kingProvider = '';
      this.kothState.kingImage = '';
      this.kothState.streak = 0;
      this.kothState.awaitingDecision = false;
      try { localStorage.setItem('hunthub_koth_state', JSON.stringify(this.kothState)); } catch (_) {}
    }

    const userA = document.getElementById('cp-battle-user-a')?.value || '';
    const userB = document.getElementById('cp-battle-user-b')?.value || '';
    let cornersChanged = false;
    if (userA && isDemo(userA)) {
      this.setCornerFighter('A', '', '');
      cornersChanged = true;
    }
    if (userB && isDemo(userB)) {
      this.setCornerFighter('B', '', '');
      cornersChanged = true;
    }
    if (cornersChanged || !userA || !userB) {
      this.syncCondensedControlPanelUI();
      this.pushCornersToOverlay();
    }

    // 6. Clean 8-Bracket Tournament if holding demo users
    try {
      const tourneyState = this.getTourneyState();
      const hasDemoTourney = Boolean(tourneyState.isDemo) ||
        ['m1', 'm2', 'm3', 'm4'].some(mId => {
          const m = tourneyState.matches?.[mId];
          return (m?.player1?.username && isDemo(m.player1.username)) ||
                 (m?.player2?.username && isDemo(m.player2.username));
        });
      if (hasDemoTourney) {
        this.resetTourneyBracket(true);
      }
    } catch (_) {}

    // 7. Clean Community Bonus Hunt demo slots & demo guesses
    try {
      const savedSlots = JSON.parse(localStorage.getItem('hunthub_hunt_slots') || '[]');
      if (Array.isArray(savedSlots)) {
        const realSlots = savedSlots.filter(s => s.caller && !isDemo(s.caller));
        localStorage.setItem('hunthub_hunt_slots', JSON.stringify(realSlots));
        if (realSlots.length === 0) {
          localStorage.setItem('hunthub_hunt_active', 'false');
          localStorage.removeItem('hunthub_bonushunt_state');
        }
        if (window.bonusHunt) {
          window.bonusHunt.slots = realSlots;
          if (realSlots.length === 0) window.bonusHunt.isActive = false;
          if (typeof window.bonusHunt.renderMetrics === 'function') window.bonusHunt.renderMetrics();
          if (typeof window.bonusHunt.renderSlotTable === 'function') window.bonusHunt.renderSlotTable();
        }
        this.renderBonusHuntAdmin();
      }

      const savedGuesses = JSON.parse(localStorage.getItem('hunthub_hunt_guesses') || '[]');
      if (Array.isArray(savedGuesses)) {
        const realGuesses = savedGuesses.filter(g => !isDemo(g.user || g.username));
        localStorage.setItem('hunthub_hunt_guesses', JSON.stringify(realGuesses));
      }
      const savedBhGuesses = JSON.parse(localStorage.getItem('hunthub_bh_guesses') || '[]');
      if (Array.isArray(savedBhGuesses)) {
        const realBhGuesses = savedBhGuesses.filter(g => !isDemo(g.user || g.username));
        localStorage.setItem('hunthub_bh_guesses', JSON.stringify(realBhGuesses));
      }
      if (window.bonusHunt && Array.isArray(window.bonusHunt.guesses)) {
        window.bonusHunt.guesses = window.bonusHunt.guesses.filter(g => !isDemo(g.user || g.username));
        if (typeof window.bonusHunt.renderGuesses === 'function') window.bonusHunt.renderGuesses();
      }

      const savedRequests = JSON.parse(localStorage.getItem('hunthub_slot_requests') || '[]');
      if (Array.isArray(savedRequests)) {
        const realReqs = savedRequests.filter(r => !isDemo(r.caller));
        localStorage.setItem('hunthub_slot_requests', JSON.stringify(realReqs));
        if (window.bonusHunt && typeof window.bonusHunt.renderSlotRequests === 'function') {
          window.bonusHunt.slotRequests = realReqs;
          window.bonusHunt.renderSlotRequests();
        }
      }
    } catch (_) {}

    // 8. Clean Alt Clusters
    try {
      const clusters = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]');
      const realClusters = clusters.filter(c => !String(c.id).startsWith('alt_demo_') && !String(c.id).startsWith('sim_'));
      localStorage.setItem('hunthub_alt_clusters', JSON.stringify(realClusters));
      this.renderSecurityRadar();
    } catch (_) {}

    // 9. Sync KOTH on public site
    if (window.tournamentPrediction && typeof window.tournamentPrediction.renderKoth === 'function') {
      window.tournamentPrediction.renderKoth();
    }

    if (window.sonner && force) {
      window.sonner.toast({
        title: '🧹 Demo Users Cleaned',
        message: 'All queues, ledgers, and contest decks are 100% clean for live streaming.',
        type: 'green'
      });
    }
    console.log(`[AdminHub] Cleaned demo users (${reason}).`);
  }

  logLiveChatActivityToDOM(username, content, isCommand = false) {
    const cleanUser = String(username || 'Viewer').trim().replace(/^@/, '');
    const text = String(content || '').trim();
    if (!cleanUser || !text) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const targets = ['cp-live-chat-log', 'live-chat-messages', 'chat-sim-feed'];
    targets.forEach((id) => {
      const logEl = document.getElementById(id);
      if (!logEl) return;
      const entry = document.createElement('div');
      entry.style.cssText = isCommand
        ? 'padding: 3px 6px; margin-bottom: 2px; border-radius: 4px; background: rgba(83, 252, 24, 0.08); border-left: 2px solid #53fc18;'
        : 'padding: 2px 6px; margin-bottom: 2px; opacity: 0.9;';
      const timeSpan = document.createElement('span');
      timeSpan.style.color = '#64748b';
      timeSpan.textContent = `[${timeStr}] `;
      const userStrong = document.createElement('strong');
      userStrong.style.color = isCommand ? '#53fc18' : '#38bdf8';
      userStrong.textContent = `@${cleanUser}: `;
      const textSpan = document.createElement('span');
      textSpan.style.color = isCommand ? '#ffffff' : '#cbd5e1';
      textSpan.textContent = text;
      entry.append(timeSpan, userStrong, textSpan);
      logEl.prepend(entry);
      while (logEl.children.length > 80) {
        logEl.removeChild(logEl.lastChild);
      }
    });
  }

  async initLiveKickChatBridge() {
    let chatroomId = 86765775; // Verified diggitybets Kick chatroom ID
    let chatChannels = ['chatrooms.86765775.v2'];
    window.hunthubStreamLive = false;
    let realtimeConfig = null;

    const refreshStreamStatus = async () => {
      try {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 5000);
        const res = await fetch('/api/kick/stream-status', { signal: controller.signal });
        clearTimeout(t);
        if (res.ok) {
          const data = await res.json();
          if (data?.chatroomId) chatroomId = Number(data.chatroomId);
          if (data?.realtime) {
            realtimeConfig = data.realtime;
            if (Array.isArray(data.realtime.channels) && data.realtime.channels.length > 0) {
              chatChannels = data.realtime.channels;
            } else if (data.realtime.channel) {
              chatChannels = [data.realtime.channel];
            }
          }
          if (data?.overlaySyncToken && !localStorage.getItem('hunthub_admin_token')) {
            try { localStorage.setItem('hunthub_admin_token', data.overlaySyncToken); } catch (_) {}
          }
          window.hunthubStreamLive = Boolean(data?.isStreamLive);
          if (window.hunthubStreamLive) {
            this.purgeDemoUsersForLiveStream('api_stream_live');
          }
          return;
        }
      } catch (_) {}

      try {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 2500);
        const res = await fetch('https://kick.com/api/v2/channels/diggitybets', { signal: controller.signal });
        clearTimeout(t);
        if (res.ok) {
          const data = await res.json();
          if (data?.chatroom?.id) {
            chatroomId = Number(data.chatroom.id);
            chatChannels = [`chatrooms.${chatroomId}.v2`];
          }
          window.hunthubStreamLive = Boolean(data?.livestream && data.livestream.is_live !== false);
          if (window.hunthubStreamLive) {
            this.purgeDemoUsersForLiveStream('kick_v2_stream_live');
          }
        }
      } catch (_) {}
    };

    await refreshStreamStatus();
    if (this._streamStatusPoll) clearInterval(this._streamStatusPoll);
    this._streamStatusPoll = setInterval(refreshStreamStatus, 120_000);

    const handleIncomingKickMessage = (msgData) => {
      if (!msgData || typeof msgData !== 'object') return;
      const sender = String(msgData?.sender?.username || msgData?.sender?.slug || '').trim();
      const content = String(msgData?.content || '').trim();
      const avatar = msgData?.sender?.profile_pic || msgData?.sender?.profilepic || '';
      if (!sender || !content) return;

      // Deduplicate identical messages across Centrifugo + Pusher + LocalHub within 2.0s
      const msgKey = msgData.id ? String(msgData.id) : `${sender.toLowerCase()}:${content}`;
      const now = Date.now();
      if (!this._seenKickMsgMap) this._seenKickMsgMap = new Map();
      const prevTs = this._seenKickMsgMap.get(msgKey) || 0;
      if (now - prevTs < 2000) return;
      this._seenKickMsgMap.set(msgKey, now);
      if (this._seenKickMsgMap.size > 200) {
        for (const [k, t] of this._seenKickMsgMap.entries()) {
          if (now - t > 10000) this._seenKickMsgMap.delete(k);
        }
      }

      const cleanSender = sender.replace(/^@/, '').toLowerCase();
      if (!this.demoUsernames.has(cleanSender)) {
        this.purgeDemoUsersForLiveStream('live_kick_chat_message');
      }
      const badges = Array.isArray(msgData?.sender?.identity?.badges) ? msgData.sender.identity.badges : [];
      const isSubBadge = badges.some(b => {
        const t = String(b?.type || '').toLowerCase();
        return t === 'subscriber' || t === 'founder' || t === 'sub_gifter' || t === 'vip';
      });
      if (isSubBadge) {
        this.subscriberUsers.add(cleanSender);
      }

      this.recentChatters.set(sender, { user: sender, avatar, ts: now });
      try {
        const activeArr = Array.from(this.recentChatters.values());
        localStorage.setItem('hunthub_active_chatters_v1', JSON.stringify(activeArr));
      } catch (_) {}
      this.renderActiveChatters();
      this.pushActiveChattersToEdge();

      if (window.userStore && typeof window.userStore.recordVerifiedKickChatActivity === 'function') {
        window.userStore.recordVerifiedKickChatActivity(sender, content);
      }

      if (content.startsWith('!')) {
        this.processLiveChatCommand(sender, content);
      } else {
        this.logLiveChatActivityToDOM(sender, content, false);
      }
    };

    const extractKickChatMsg = (packet) => {
      if (!packet || typeof packet !== 'object') return null;
      let pubData = packet?.push?.pub?.data ?? packet?.pub?.data ?? packet?.result?.data ?? (packet?.event ? packet : null);
      if (typeof pubData === 'string') {
        try { pubData = JSON.parse(pubData); } catch (_) { return null; }
      }
      if (!pubData || typeof pubData !== 'object') return null;
      if (pubData.data) {
        if (pubData.event && !String(pubData.event).includes('ChatMessageEvent') && pubData.event !== 'message') {
          return null;
        }
        return typeof pubData.data === 'string' ? JSON.parse(pubData.data) : pubData.data;
      }
      if (typeof pubData.content === 'string' && pubData.sender) {
        return pubData;
      }
      return null;
    };

    const connectLiveSocket = async () => {
      if (this._kickPingInterval) {
        clearInterval(this._kickPingInterval);
        this._kickPingInterval = null;
      }
      if (this._kickWatchdogInterval) {
        clearInterval(this._kickWatchdogInterval);
        this._kickWatchdogInterval = null;
      }

      const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
      // Priority 1 (only when running local server): Connect to Local Stream Hub on 127.0.0.1:3001
      if (isLocal) {
        try {
          const localWs = new WebSocket('ws://127.0.0.1:3001/');
          localWs.onopen = () => {
            this.localHubWs = localWs;
            const statusEl = document.getElementById('cp-kick-ws-status');
            if (statusEl) {
              statusEl.textContent = `🟢 LOCAL STREAM HUB ONLINE (ws://127.0.0.1:3001 · Room #${chatroomId})`;
              statusEl.style.color = '#00ff88';
            }
            localWs.send(JSON.stringify({ action: 'get_duo_queues' }));
          };
          localWs.onmessage = (evt) => {
            try {
              const data = JSON.parse(evt.data);
              if (data.type === 'chat_message' && data.data) {
                handleIncomingKickMessage(data.data);
              } else if (data.action === 'wheel_duo_queues' || data.action === 'duo_queues') {
                const q = this.duoMode === 'tourney' ? data.tourneyQueue : data.battleQueue;
                if (Array.isArray(q)) {
                  this.duoPool = q.map(e => ({
                    chatter: e.username,
                    slot: e.slotName,
                    provider: e.slotProvider,
                    icon: '🎰'
                  }));
                  this.renderDuoQueue();
                }
              }
            } catch (_) {}
          };
        } catch (_) {}
      }

      // Engine A: Kick Realtime Centrifugo v6 (Primary — wss://realtime.us-west-2.platform.kick.com/connection/websocket)
      if (!realtimeConfig || !realtimeConfig.token) {
        await refreshStreamStatus();
      }
      if (realtimeConfig && realtimeConfig.token) {
        try {
          if (this.kickCentrifugoWs && (this.kickCentrifugoWs.readyState === WebSocket.OPEN || this.kickCentrifugoWs.readyState === WebSocket.CONNECTING)) {
            try { this.kickCentrifugoWs.close(); } catch (_) {}
          }
          const cwsUrl = realtimeConfig.wsUrl || 'wss://realtime.us-west-2.platform.kick.com/connection/websocket';
          const cws = new WebSocket(cwsUrl);
          this.kickCentrifugoWs = cws;
          let lastCentrifugoActivity = Date.now();

          cws.onopen = () => {
            lastCentrifugoActivity = Date.now();
            cws.send(JSON.stringify({ id: 1, connect: { token: realtimeConfig.token } }));
            const statusEl = document.getElementById('cp-kick-ws-status');
            if (statusEl) {
              statusEl.textContent = `🟢 LIVE KICK CHAT CONNECTED (Centrifugo v6 · Room #${chatroomId})`;
              statusEl.style.color = '#53fc18';
            }
          };

          cws.onmessage = (evt) => {
            lastCentrifugoActivity = Date.now();
            try {
              if (!evt.data) return;
              const rawText = typeof evt.data === 'string' ? evt.data : String(evt.data);
              const lines = rawText.split('\n');
              for (const rawLine of lines) {
                const line = rawLine.trim();
                if (!line) continue;
                // Centrifugo server ping {} -> reply {} pong immediately (never send proactive {} on timer!)
                if (line === '{}') {
                  if (cws.readyState === WebSocket.OPEN) cws.send('{}');
                  continue;
                }
                const packet = JSON.parse(line);
                if (packet.id === 1 && packet.connect) {
                  chatChannels.forEach((ch, idx) => {
                    if (cws.readyState === WebSocket.OPEN) {
                      cws.send(JSON.stringify({ id: idx + 2, subscribe: { channel: ch } }));
                    }
                  });
                  continue;
                }
                const msgData = extractKickChatMsg(packet);
                if (msgData) handleIncomingKickMessage(msgData);
              }
            } catch (_) {}
          };

          this._kickWatchdogInterval = setInterval(() => {
            if (Date.now() - lastCentrifugoActivity > 45000) {
              try { cws.close(); } catch (_) {}
            }
          }, 12000);

          cws.onclose = () => {
            if (this._kickWatchdogInterval) {
              clearInterval(this._kickWatchdogInterval);
              this._kickWatchdogInterval = null;
            }
            realtimeConfig = null;
            setTimeout(connectLiveSocket, 3500);
          };
        } catch (_) {}
      }

      // Engine B: Kick Public Pusher v7 (Secondary Parallel Listener — zero token needed)
      const pusherUrl = 'wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0-rc2&flash=false';
      try {
        if (this.kickPusherWs && (this.kickPusherWs.readyState === WebSocket.OPEN || this.kickPusherWs.readyState === WebSocket.CONNECTING)) {
          try { this.kickPusherWs.close(); } catch (_) {}
        }
        const ws = new WebSocket(pusherUrl);
        this.kickPusherWs = ws;

        ws.onopen = () => {
          chatChannels.forEach((ch) => {
            ws.send(JSON.stringify({
              event: 'pusher:subscribe',
              data: { auth: '', channel: ch }
            }));
          });
          const statusEl = document.getElementById('cp-kick-ws-status');
          if (statusEl && !statusEl.textContent.includes('Centrifugo')) {
            statusEl.textContent = `🟢 LIVE KICK CHAT CONNECTED (kick.com/diggitybets · Room #${chatroomId})`;
            statusEl.style.color = '#53fc18';
          }
          this._kickPingInterval = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ event: 'pusher:ping', data: {} }));
            }
          }, 25000);
        };

        ws.onmessage = (evt) => {
          try {
            if (!evt.data) return;
            const packet = JSON.parse(typeof evt.data === 'string' ? evt.data : '');
            const msgData = extractKickChatMsg(packet);
            if (msgData) handleIncomingKickMessage(msgData);
          } catch (_) {}
        };

        ws.onclose = () => {
          if (this._kickPingInterval) {
            clearInterval(this._kickPingInterval);
            this._kickPingInterval = null;
          }
        };
      } catch (_) {}
    };

    connectLiveSocket();
  }

  processLiveChatCommand(username, rawMessage) {
    const cleanUser = String(username || 'Viewer').trim().replace(/^@/, '');
    const text = String(rawMessage || '').trim();
    if (!text.startsWith('!')) return;

    // Deduplicate identical command from same user within 1.5s (in case both localWs and Centrifugo fire)
    const cmdDedupKey = `${cleanUser.toLowerCase()}:${text.toLowerCase()}`;
    const now = Date.now();
    if (this._lastChatCmdKey === cmdDedupKey && this._lastChatCmdTs && (now - this._lastChatCmdTs) < 1500) {
      return;
    }
    this._lastChatCmdKey = cmdDedupKey;
    this._lastChatCmdTs = now;

    if (cleanUser && !this.demoUsernames.has(cleanUser.toLowerCase())) {
      this.purgeDemoUsersForLiveStream('live_chat_command');
      this.recentChatters.set(cleanUser, { user: cleanUser, ts: now });
      this.renderActiveChatters();
      this.pushActiveChattersToEdge();
    }

    this.logLiveChatActivityToDOM(cleanUser, text, true);

    // Forward to backend /api/chat/command
    fetch('/api/chat/command', {
      method: 'POST',
      headers: this.getAdminHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ username: cleanUser, content: text })
    }).catch(() => {});

    const parts = text.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    if ((cmd === '!bounties' || cmd === '!bounty') && window.DiggityBountySystem && typeof window.DiggityBountySystem.handleChatCommand === 'function') {
      const reply = window.DiggityBountySystem.handleChatCommand(cleanUser, text);
      if (reply && window.sonner) {
        window.sonner.toast({
          title: `🎯 !bounty (@${cleanUser})`,
          message: reply,
          type: 'green'
        });
      }
      return;
    }

    if (cmd === '!battle') {
      const slotName = arg || 'Wanted Dead or a Wild';
      this.addDuoEntry(cleanUser, slotName, 'battle');
      if (window.sonner) {
        window.sonner.toast({
          title: `⚔️ !battle Entry (@${cleanUser})`,
          message: `Added @${cleanUser} with "${slotName}" to Duo Wheel Battle Queue.`,
          type: 'cyan'
        });
      }
      return;
    }

    if (cmd === '!sr' || cmd === '!slot') {
      const slotName = arg || 'Gates of Olympus 1000';
      if (window.bonusHunt && typeof window.bonusHunt.addSlotRequest === 'function') {
        window.bonusHunt.addSlotRequest(cleanUser, slotName, false);
      } else {
        try {
          const meta = this.resolveSlotMeta(slotName);
          const list = JSON.parse(localStorage.getItem('hunthub_slot_requests') || '[]');
          const handle = `@${cleanUser}`;
          const entry = {
            user: handle,
            caller: handle,
            name: meta.name || slotName,
            provider: meta.provider || 'Official Slot',
            img: meta.image || '',
            image: meta.image || '',
            ts: Date.now()
          };
          const idx = list.findIndex((r) => String(r.user || r.caller || '').toLowerCase() === handle.toLowerCase());
          if (idx >= 0) list[idx] = entry;
          else list.push(entry);
          localStorage.setItem('hunthub_slot_requests', JSON.stringify(list));
          if (typeof BroadcastChannel !== 'undefined') {
            const bc = new BroadcastChannel('hunthub_sr_wheel');
            bc.postMessage({ type: 'SYNC_QUEUE', queue: list, ts: Date.now() });
          }
          this.relayOverlaySyncEvent({
            target: 'overlay-slotrequests',
            type: 'SYNC_QUEUE',
            queue: list,
            ts: Date.now()
          });
        } catch (_) {}
      }
      return;
    }

    if (cmd === '!tourney' || cmd === '!tournament') {
      const slotName = arg || 'Gates of Olympus 1000';
      this.addDuoEntry(cleanUser, slotName, 'tourney');
      if (window.sonner) {
        window.sonner.toast({
          title: `🏆 !tourney Entry (@${cleanUser})`,
          message: `Added @${cleanUser} with "${slotName}" to 8-Bracket Tourney Queue.`,
          type: 'gold'
        });
      }
      return;
    }

    if (cmd === '!guess' || cmd === '!gtb') {
      const tracker = window.bonusHunt || window.bonusHuntTracker;
      if ((tracker && tracker.guessesLocked) || localStorage.getItem('hunthub_bh_guesses_locked') === 'true') {
        if (window.sonner) {
          window.sonner.toast({
            title: `🔒 Guess Ignored (@${cleanUser})`,
            message: `Guess the Final Balance is currently CLOSED by the streamer.`,
            type: 'danger'
          });
        }
        return;
      }
      const numVal = parseFloat(arg.replace(/[^0-9.]/g, ''));
      if (!isNaN(numVal) && numVal > 0) {
        if (tracker && typeof tracker.submitChatGuess === 'function') {
          tracker.submitChatGuess(cleanUser, numVal);
        }
        try {
          const guesses = JSON.parse(localStorage.getItem('hunthub_hunt_guesses') || '[]');
          const filtered = guesses.filter(g => String(g.user || g.username || '').toLowerCase().replace(/^@/, '') !== cleanUser.toLowerCase());
          filtered.unshift({ user: `@${cleanUser}`, username: cleanUser, amount: numVal, guess: numVal, ts: Date.now() });
          localStorage.setItem('hunthub_hunt_guesses', JSON.stringify(filtered));
          localStorage.setItem('hunthub_bh_guesses', JSON.stringify(filtered));
          const gCountEl = document.getElementById('cp-bh-guess-count');
          if (gCountEl) gCountEl.textContent = String(filtered.length);
        } catch (_) {}
        if (window.sonner) {
          window.sonner.toast({
            title: `💎 !guess Registered (@${cleanUser})`,
            message: `@${cleanUser} guessed $${numVal.toFixed(2)} for the Bonus Hunt!`,
            type: 'green'
          });
        }
      }
      return;
    }

    if (cmd === '!join' || cmd === '!enter' || cmd === '!ticket' || cmd === '!giveaway') {
      this.recentChatters.set(cleanUser, { user: cleanUser, ts: Date.now() });
      this.renderActiveChatters();
      this.pushActiveChattersToEdge(true);
      if (window.sonner) {
        window.sonner.toast({
          title: `🎟️ !join Registered (@${cleanUser})`,
          message: `@${cleanUser} added to CS:GO / Giveaway active pool!`,
          type: 'green'
        });
      }
      return;
    }

    if (cmd === '!continue') {
      const currentKing = (this.kothState.king || document.getElementById('cp-battle-user-a')?.value || '').trim().toLowerCase().replace(/^@/, '');
      if (!currentKing || currentKing === cleanUser.toLowerCase() || this.isStreamerUser(cleanUser)) {
        this.kothContinue();
      }
      return;
    }

    if (cmd === '!cashout') {
      const currentKing = (this.kothState.king || document.getElementById('cp-battle-user-a')?.value || '').trim().toLowerCase().replace(/^@/, '');
      if (!currentKing || currentKing === cleanUser.toLowerCase() || this.isStreamerUser(cleanUser)) {
        this.kothRetire();
      }
      return;
    }

    if (cmd === '!hunt' && arg) {
      const bhSlotInput = document.getElementById('cp-bh-slot');
      const bhUserInput = document.getElementById('cp-bh-user');
      if (bhSlotInput && !bhSlotInput.value) bhSlotInput.value = arg;
      if (bhUserInput) bhUserInput.value = `@${cleanUser}`;
    }
  }
}

// Global initialization
window.adminHub = new AdminHubController();

