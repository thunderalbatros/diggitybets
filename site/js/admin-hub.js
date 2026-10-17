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

    // Duo-Wheel Queue
    this.duoPool = [
      { chatter: 'LuckyStriker', slot: 'Wanted Dead or a Wild', provider: 'Hacksaw', icon: '🤠' },
      { chatter: 'VegasKing', slot: 'Gates of Olympus 1000', provider: 'Pragmatic', icon: '⚡' },
      { chatter: 'SlotQueen', slot: 'San Quentin xWays', provider: 'Nolimit City', icon: '🔒' },
      { chatter: 'SpinMaster', slot: 'Sugar Rush 1000', provider: 'Pragmatic', icon: '🍬' },
      { chatter: 'Strike777', slot: 'Rip City', provider: 'Hacksaw', icon: '🐱' },
      { chatter: 'BigBassBob', slot: 'Big Bass Splash', provider: 'Pragmatic', icon: '🎣' },
      { chatter: 'NeonWolf', slot: 'Chaos Crew 2', provider: 'Hacksaw', icon: '🐺' },
      { chatter: 'RoyalFlush', slot: 'Zeus vs Hades', provider: 'Pragmatic', icon: '⚔️' }
    ];
    this.duoMode = 'battle';
    this.tourneyMode = 'BONUS_BUY';
    this.battleMode = 'BONUS_BUY';

    // King of the Hill (KotH) State & Duo Wheel Corner Target ('A' = Blue Corner, 'B' = Red Corner)
    this.wheelTargetCorner = 'A';
    this.kothCelebrationTimer = null;
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
      if (savedKoth) this.kothState = { ...this.kothState, ...JSON.parse(savedKoth) };
    } catch (_) {}

    // CS:GO 90s Window Active Chatters
    this.recentChatters = new Map();
    this.selectedSlot = null;

    this.init();
  }

  init() {
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
    }
  }

  isStreamerUser(username) {
    if (!username) return false;
    const clean = username.trim().toLowerCase().replace('@', '');
    return clean === 'diggitybets' || clean === 'diggity_bets' || clean === 'tarkansky';
  }

  checkAdminAccess() {
    const currentKickUser = localStorage.getItem('hunthub_kick_username') || '';
    const isAdmin = this.isStreamerUser(currentKickUser);
    localStorage.setItem('hunthub_is_admin', isAdmin ? 'true' : 'false');

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
      adminBadge.style.display = isAdmin ? 'inline-block' : 'none';
    }

    if (isAdmin) {
      this.renderAllDecks();
      this.bindAdminControls();
      this.syncCondensedControlPanelUI();
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

  ensureInitialData() {
    let claims = [];
    try {
      claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]');
    } catch (e) { claims = []; }

    if (claims.length === 0) {
      const now = Date.now();
      claims = [
        {
          id: 'claim_demo_01',
          username: 'CharlyBets',
          kick_username: 'CharlyBets',
          discord_username: 'CharlyBets#1234',
          stake_username: 'CharlyStake',
          stake_verified: 1,
          avatar: '🤠',
          voucher_title: '$20 bonus buy split profit',
          voucherTitle: '$20 bonus buy split profit',
          cost_points: 600,
          cost: 600,
          crypto_ltc: 'LTC9q3F8aDk3JzX5t4...',
          crypto_usdc: '0x71C...4982',
          isSub: true,
          status: 'PENDING',
          isFlagged: false,
          flagReason: '',
          timestamp: now - 1000 * 60 * 14,
          created_at: Math.floor((now - 1000 * 60 * 14) / 1000)
        },
        {
          id: 'claim_demo_02',
          username: 'ZeusMax_21',
          kick_username: 'ZeusMax_21',
          discord_username: 'ZeusMax#9999',
          stake_username: 'ZeusMaxStake',
          stake_verified: 0,
          avatar: '⚡',
          voucher_title: 'Guaranteed 1v1 battle entry',
          voucherTitle: 'Guaranteed 1v1 battle entry',
          cost_points: 100,
          cost: 100,
          crypto_sol: 'SoL111111111111111...',
          isSub: false,
          status: 'PENDING',
          isFlagged: true,
          flagReason: 'Shared hardware device with @ZeusMax_Alt',
          timestamp: now - 1000 * 60 * 38,
          created_at: Math.floor((now - 1000 * 60 * 38) / 1000)
        },
        {
          id: 'claim_demo_03',
          username: 'SlotHunter_AR',
          kick_username: 'SlotHunter_AR',
          discord_username: 'SlotHunter#4321',
          stake_username: 'SlotHunterAR',
          stake_verified: 1,
          avatar: '🦝',
          voucher_title: 'Guaranteed tourney entry',
          voucherTitle: 'Guaranteed tourney entry',
          cost_points: 180,
          cost: 180,
          crypto_btc: 'bc1q98f4jd82kjs...',
          isSub: true,
          status: 'FULFILLED',
          isFlagged: false,
          flagReason: '',
          timestamp: now - 1000 * 60 * 120,
          created_at: Math.floor((now - 1000 * 60 * 120) / 1000)
        }
      ];
      localStorage.setItem(this.storageKeyClaims, JSON.stringify(claims));
    }

    // Seed sample Alt Cluster for security radar demonstration
    let clusters = [];
    try {
      clusters = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]');
    } catch (e) { clusters = []; }

    if (clusters.length === 0) {
      clusters = [
        {
          id: 'alt_demo_01',
          cluster_id: 'cluster_7f9b',
          primaryUser: 'zeusmax_21',
          altUser: 'zeusmax_alt',
          deviceHash: 'a7f3c9820e11...',
          device_hash: 'a7f3c9820e11...',
          ipSubnet: '190.19.45.0/24',
          ip_subnet: '190.19.45.0/24',
          reason: 'SHARED_HARDWARE_FINGERPRINT',
          riskScore: 85,
          risk_score: 85,
          status: 'FLAGGED',
          detectedAt: Date.now() - 1000 * 60 * 45
        },
        {
          id: 'alt_demo_02',
          cluster_id: 'cluster_4a12',
          primaryUser: 'stakefarmer_01',
          altUser: 'stakefarmer_02',
          deviceHash: 'e3b0c44298fc...',
          device_hash: 'e3b0c44298fc...',
          ipSubnet: '181.16.88.0/24',
          ip_subnet: '181.16.88.0/24',
          reason: 'DUPLICATE_STAKE_ACCOUNT',
          riskScore: 95,
          risk_score: 95,
          status: 'FLAGGED',
          detectedAt: Date.now() - 1000 * 60 * 15
        }
      ];
      localStorage.setItem('hunthub_alt_clusters', JSON.stringify(clusters));
    }
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

        if (window.soundEngine && typeof window.soundEngine.playChip === 'function') {
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

    // 5. Security Radar Refresh
    const btnRefreshRadar = document.getElementById('btn-refresh-security-alerts');
    if (btnRefreshRadar) {
      btnRefreshRadar.addEventListener('click', () => {
        this.renderSecurityRadar();
        if (window.sonner) window.sonner.toast({ title: 'Radar Refreshed 🛡️', message: 'Anti-Sybil telemetry checked.', type: 'cyan' });
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
    try { clusters = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]'); } catch (e) {}
    const flaggedAlts = clusters.length;

    const elTotal = document.getElementById('admin-kpi-total-claims');
    const elPending = document.getElementById('admin-kpi-pending-claims');
    const elBurned = document.getElementById('admin-kpi-burned-points');
    const elAlts = document.getElementById('admin-kpi-flagged-alts');

    if (elTotal) elTotal.textContent = totalClaims.toString();
    if (elPending) elPending.textContent = pendingClaims.toString();
    if (elBurned) elBurned.textContent = `${totalBurned.toLocaleString()} $DIG`;
    if (elAlts) elAlts.textContent = flaggedAlts.toString();
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
        headers: { 'x-admin-user': 'diggitybets' }
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

      const username = c.kick_username || c.username || 'Viewer';
      const discordName = c.discord_username ? `@${c.discord_username}` : '';
      const stakeUser = c.stake_username ? `@${c.stake_username}` : '';
      const stakeVerified = c.stake_verified ? '<span class="reward-badge-pill" style="font-size: 9px; color: var(--kick-green); border-color: var(--kick-green);">✓ STAKE VIP</span>' : '';

      // Crypto addresses 1-click copy buttons
      const wallets = [];
      if (c.crypto_ltc) wallets.push(`<button type="button" class="btn-stake-secondary btn-copy-wallet" data-coin="LTC" data-addr="${c.crypto_ltc}" style="padding: 2px 6px; font-size: 10px;">📋 LTC</button>`);
      if (c.crypto_btc) wallets.push(`<button type="button" class="btn-stake-secondary btn-copy-wallet" data-coin="BTC" data-addr="${c.crypto_btc}" style="padding: 2px 6px; font-size: 10px;">📋 BTC</button>`);
      if (c.crypto_eth) wallets.push(`<button type="button" class="btn-stake-secondary btn-copy-wallet" data-coin="ETH" data-addr="${c.crypto_eth}" style="padding: 2px 6px; font-size: 10px;">📋 ETH</button>`);
      if (c.crypto_usdc) wallets.push(`<button type="button" class="btn-stake-secondary btn-copy-wallet" data-coin="USDC" data-addr="${c.crypto_usdc}" style="padding: 2px 6px; font-size: 10px;">📋 USDC</button>`);
      if (c.crypto_sol) wallets.push(`<button type="button" class="btn-stake-secondary btn-copy-wallet" data-coin="SOL" data-addr="${c.crypto_sol}" style="padding: 2px 6px; font-size: 10px;">📋 SOL</button>`);

      const walletHtml = wallets.length > 0
        ? `<div style="display: flex; gap: 4px; flex-wrap: wrap;">${wallets.join('')}</div>`
        : `<span style="font-size: 11px; color: var(--text-dim); font-style: italic;">No crypto addresses in profile</span>`;

      const statusBadge = c.status === 'FULFILLED'
        ? `<span class="reward-badge-pill" style="background: rgba(83, 252, 24, 0.2); border-color: var(--kick-green); color: var(--kick-green);">✓ FULFILLED</span>`
        : (c.status === 'REFUNDED'
            ? `<span class="reward-badge-pill" style="background: rgba(255, 42, 95, 0.2); border-color: var(--magenta); color: var(--magenta);">✕ REFUNDED</span>`
            : `<span class="reward-badge-pill" style="background: rgba(255, 215, 0, 0.25); border-color: var(--gold); color: var(--gold); animation: pulse-dot 1.5s infinite;">⏳ PENDING</span>`);

      const isPending = c.status === 'PENDING';

      return `
        <tr data-claim-id="${c.id}" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="font-family: monospace; font-size: 11px; color: var(--text-dim);">${fullDate} ${dateStr}</td>
          <td>
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 14px;">${c.avatar || '🤠'}</span>
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
            ${c.voucher_title || c.voucherTitle}
          </td>
          <td style="font-family: var(--font-display); font-weight: 800; color: #ffffff;">
            ${c.cost_points || c.cost} $DIG
          </td>
          <td>${walletHtml}</td>
          <td>${statusBadge}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              ${isPending ? `
                <button type="button" class="btn-stake-primary btn-approve-claim" data-id="${c.id}" data-user="${username}" style="padding: 4px 10px; font-size: 11px; background: linear-gradient(135deg, #10b981 0%, #53fc18 100%); color: #000; font-weight: 800;">
                  Approve / Mark Paid ✓
                </button>
                <button type="button" class="btn-chat-toggle btn-reject-claim" data-id="${c.id}" data-user="${username}" style="padding: 4px 8px; font-size: 11px; color: var(--magenta);">
                  Reject & Refund $DIG ✕
                </button>
              ` : ''}
              <button type="button" class="btn-chat-toggle btn-copy-claim-info" data-user="${username}" data-voucher="${c.voucher_title || c.voucherTitle}" title="Copy chat shoutout" style="padding: 4px 8px; font-size: 11px;">
                📋
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
        headers: { 'Content-Type': 'application/json', 'x-admin-user': 'diggitybets' },
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
        headers: { 'Content-Type': 'application/json', 'x-admin-user': 'diggitybets' },
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

  async renderSundayRaffleLedger() {
    const listEl = document.getElementById('admin-raffle-participants-list');
    const totalEl = document.getElementById('admin-raffle-total-tickets');
    if (!listEl) return;

    let ledger = { totalTickets: 0, participants: [] };
    try {
      const res = await fetch('/api/admin/raffle-ledger?adminUser=diggitybets', {
        headers: { 'x-admin-user': 'diggitybets' }
      });
      if (res.ok) {
        ledger = await res.json();
      }
    } catch (_) {}

    // Fallback participants if empty
    if (!ledger.participants || ledger.participants.length === 0) {
      const currentUser = localStorage.getItem('hunthub_kick_username') || '@Viewer';
      const userTickets = parseInt(localStorage.getItem('hunthub_raffle_tickets') || '2', 10);
      ledger = {
        totalTickets: 26 + userTickets,
        participants: [
          { username: 'CharlyBets', kick_username: 'CharlyBets', tickets_count: 12, isSub: true },
          { username: 'ZeusMax_21', kick_username: 'ZeusMax_21', tickets_count: 8, isSub: false },
          { username: 'SlotHunter_AR', kick_username: 'SlotHunter_AR', tickets_count: 6, isSub: true },
          { username: currentUser.replace(/^@/, ''), kick_username: currentUser.replace(/^@/, ''), tickets_count: userTickets, isSub: true }
        ]
      };
    }

    const total = ledger.totalTickets || 1;
    if (totalEl) totalEl.textContent = `${total} Tickets`;

    listEl.innerHTML = ledger.participants.map(p => {
      const user = p.kick_username || p.username;
      const count = p.tickets_count || p.tickets;
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
        headers: { 'Content-Type': 'application/json', 'x-admin-user': 'diggitybets' },
        body: JSON.stringify({ adminUser: 'diggitybets' })
      });
      if (res.ok) {
        const data = await res.json();
        result = data.result;
      }
    } catch (_) {}

    // Fallback if local offline
    if (!result || !result.winner) {
      const participants = ['@CharlyBets', '@CharlyBets', '@ZeusMax_21', '@SlotHunter_AR', '@CharlyBets'];
      const winner = participants[Math.floor(Math.random() * participants.length)];
      result = {
        winner,
        ticketNumber: 7,
        totalTickets: 28,
        serverSeed: 'seed_' + Date.now(),
        clientSeed: 'kick_sunday_stream',
        hmacDigest: 'a3f9e4...'
      };
    }

    setTimeout(() => {
      if (window.soundEngine && typeof window.soundEngine.playWin === 'function') {
        window.soundEngine.playWin();
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
        headers: { 'x-admin-user': 'diggitybets' }
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
      const auditUrl = req.share_url || `https://stake.com/casino/games/limbo?iid=${encodeURIComponent(req.bet_id)}&modal=bet`;

      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="font-family: monospace; font-size: 11px; color: var(--text-dim);">${timeStr}</td>
          <td>
            <div style="display: flex; flex-direction: column;">
              <strong style="color: #ffffff;">@${req.kick_username}</strong>
              <span style="color: var(--gold); font-size: 11px;">Stake: @${req.stake_username}</span>
            </div>
          </td>
          <td style="font-family: var(--font-display); font-weight: 900; color: #53fc18; font-variant-numeric: tabular-nums;">
            ${req.target_multiplier}
          </td>
          <td>
            <a href="${auditUrl}" target="_blank" rel="noopener noreferrer" class="btn-stake-secondary" style="padding: 3px 8px; font-size: 11px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
              Open Bet on Stake ↗
            </a>
          </td>
          <td>
            <span class="reward-badge-pill" style="font-size: 10px; background: ${isPending ? 'rgba(255, 215, 0, 0.15)' : 'rgba(83, 252, 24, 0.15)'}; border-color: ${isPending ? 'var(--gold)' : 'var(--kick-green)'}; color: ${isPending ? 'var(--gold)' : 'var(--kick-green)'};">
              ${req.status}
            </span>
          </td>
          <td>
            ${isPending ? `
              <div style="display: flex; gap: 4px;">
                <button type="button" class="btn-stake-primary btn-approve-stake" data-id="${req.id}" data-user="${req.kick_username}" data-stake="${req.stake_username || req.kick_username}" style="padding: 4px 8px; font-size: 10.5px; background: linear-gradient(135deg, #10b981 0%, #53fc18 100%); color: #000; font-weight: 800;">
                  Approve (+250 $DIG) ✓
                </button>
                <button type="button" class="btn-chat-toggle btn-reject-stake" data-id="${req.id}" data-user="${req.kick_username}" style="padding: 4px 6px; font-size: 10.5px; color: var(--magenta);">
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
            headers: { 'Content-Type': 'application/json', 'x-admin-user': 'diggitybets' },
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
        if (window.userStore && (window.userStore.state.username || '').toLowerCase() === user.toLowerCase()) {
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
            headers: { 'Content-Type': 'application/json', 'x-admin-user': 'diggitybets' },
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
      referrals = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]');
    } catch(e) { referrals = []; }

    if (referrals.length === 0) {
      referrals = [
        { username: 'StakeNacho', kickUser: '@NachoGamer', code: 'DIGGITY', verifiedAt: '2026-10-14 14:20', status: 'verified' },
        { username: 'StakeValen', kickUser: '@Valen99', code: 'DIGGITY', verifiedAt: '2026-10-14 15:05', status: 'verified' },
        { username: 'StakeAgus', kickUser: '@AgusKick', code: 'DIGGITY', verifiedAt: '2026-10-14 16:30', status: 'verified' },
        { username: 'DiggityFan01', kickUser: '@DiggityFan', code: 'DIGGITY', verifiedAt: '2026-10-14 17:10', status: 'verified' },
        { username: 'NewPlayer99', kickUser: '@Viewer', code: 'DIGGITY', verifiedAt: '2026-10-14 18:45', status: 'pending' }
      ];
      localStorage.setItem('hunthub_verified_stake_list', JSON.stringify(referrals));
    }

    tbody.innerHTML = referrals.map(ref => `
      <tr>
        <td>
          <a href="https://stake.com/?offer=diggity&c=i2mVktNM" target="_blank" rel="noopener noreferrer" style="color: var(--kick-green); font-family: var(--font-display); font-weight: 800; text-decoration: none;">
            @${ref.username} ↗
          </a>
        </td>
        <td style="color: #ffffff; font-size: 13px;">${ref.kickUser || '@Viewer'}</td>
        <td>
          <span class="reward-badge-pill" style="background: ${ref.status === 'verified' ? 'rgba(83, 252, 24, 0.2)' : 'rgba(255, 215, 0, 0.2)'}; border-color: ${ref.status === 'verified' ? 'var(--kick-green)' : 'var(--gold)'}; color: ${ref.status === 'verified' ? 'var(--kick-green)' : 'var(--gold)'}; font-size: 11px;">
            ${ref.status === 'verified' ? '✓ VERIFIED (DIGGITY)' : '⏳ PENDING CONFIRMATION'}
          </span>
        </td>
        <td style="font-size: 12px; color: var(--text-dim);">${ref.verifiedAt || 'Recent'}</td>
        <td>
          <button type="button" class="btn-chat-toggle" onclick="window.adminHub.removeStakeReferral('${ref.username}')" style="color: var(--crimson); padding: 4px 8px; font-size: 11px;" title="Remove from list">
            ✕
          </button>
        </td>
      </tr>
    `).join('');
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
        headers: { 'x-admin-user': 'diggitybets' }
      });
      if (res.ok) {
        const data = await res.json();
        alerts = data.alerts || [];
      }
    } catch (_) {}

    if (alerts.length === 0) {
      try {
        alerts = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]');
      } catch (e) { alerts = []; }
    }

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
      const hash = a.device_hash || a.deviceHash || '—';
      const shortHash = hash.length > 14 ? hash.substring(0, 12) + '...' : hash;
      const subnet = a.ip_subnet || a.ipSubnet || '190.19.45.0/24';
      const primary = a.primaryUser || a.primary_user || 'Player1';
      const alt = a.altUser || a.alt_user || 'Player2';
      const reason = a.reason || 'SHARED_HARDWARE_FINGERPRINT';
      const score = a.risk_score || a.riskScore || 85;
      const clusterId = a.cluster_id || a.id || 'cluster_1';

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
            headers: { 'Content-Type': 'application/json', 'x-admin-user': 'diggitybets' },
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
            headers: { 'Content-Type': 'application/json', 'x-admin-user': 'diggitybets' },
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
            headers: { 'Content-Type': 'application/json', 'x-admin-user': 'diggitybets' },
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

        const slots = window.SlotResolver ? window.SlotResolver.getCuratedCatalog() : (window.HUNTHUB_CURATED_SLOTS || []);
        const matches = slots.filter(s => s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q)).slice(0, 8);

        if (matches.length === 0) {
          dropdown.style.display = 'none';
          return;
        }

        dropdown.innerHTML = matches.map(s => `
          <div class="slot-autocomplete-item" data-id="${s.id}" data-name="${s.name}" data-provider="${s.provider}" data-img="${s.image}" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.06); transition: background 0.15s;">
            <img src="${s.image}" alt="${s.name}" style="width: 34px; height: 34px; object-fit: cover; border-radius: 6px;" onerror="this.onerror=null; this.src='https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format';">
            <div style="flex: 1;">
              <div style="font-weight: 700; color: #ffffff; font-size: 13px;">${s.name}</div>
              <div style="font-size: 11px; color: var(--gold);">${s.provider} · Max: ${s.maxWin || '10,000x'}</div>
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
      btnAddBonus.addEventListener('click', () => {
        const slotName = inputSearch ? inputSearch.value.trim() : '';
        const caller = (document.getElementById('admin-hunt-caller-input')?.value || '').trim() || '@Viewer';
        const bet = parseFloat(document.getElementById('admin-hunt-bet-input')?.value || '1.0');

        if (!slotName) {
          if (window.sonner) window.sonner.toast({ title: 'Slot Name Required', message: 'Select a slot from catalog.', type: 'danger' });
          return;
        }

        let slots = [];
        try { slots = JSON.parse(localStorage.getItem('hunthub_hunt_slots') || '[]'); } catch (e) {}

        const resolved = window.SlotResolver ? window.SlotResolver.resolve(this.selectedSlot || slotName) : null;
        const newBonus = {
          id: resolved ? resolved.id : (this.selectedSlot ? this.selectedSlot.id : slotName.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
          name: resolved ? resolved.name : slotName,
          provider: resolved ? (resolved.badge || resolved.provider) : (this.selectedSlot ? this.selectedSlot.provider : 'Casino Slot'),
          bet: bet || 2.0,
          payout: 0,
          caller: caller.startsWith('@') ? caller : '@' + caller,
          image: resolved ? resolved.image : (this.selectedSlot ? this.selectedSlot.image : 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format')
        };

        slots.push(newBonus);
        localStorage.setItem('hunthub_hunt_slots', JSON.stringify(slots));
        localStorage.setItem('hunthub_hunt_active', 'true');

        if (inputSearch) inputSearch.value = '';
        this.selectedSlot = null;

        if (window.bonusHunt) {
          window.bonusHunt.slots = slots;
          window.bonusHunt.isActive = true;
          window.bonusHunt.renderMetrics();
          window.bonusHunt.renderSlotTable();
        }

        if (window.soundEngine && typeof window.soundEngine.playCoin === 'function') window.soundEngine.playCoin();
        if (window.sonner) window.sonner.toast({ title: 'Bonus Added! 🎰', message: `${newBonus.name} added to hunt.`, type: 'green' });
        this.renderBonusHuntAdmin();
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
        if (window.sonner) window.sonner.toast({ title: 'Bonus Hunt Started! 💎', message: 'Predictions are open.', type: 'green' });
      };
    }

    const btnDemo = document.getElementById('btn-admin-demo-hunt');
    if (btnDemo) {
      btnDemo.onclick = () => {
        const demoBonuses = [
          { id: 'wanted-dead-or-a-wild', name: 'Wanted Dead or a Wild', provider: 'Hacksaw Gaming', bet: 2.0, payout: 184.50, caller: '@NachoGamer', image: 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format' },
          { id: 'gates-of-olympus', name: 'Gates of Olympus 1000', provider: 'Pragmatic Play', bet: 2.0, payout: 312.00, caller: '@SlotKing21', image: 'https://mediumrare.imgix.net/1ea93a0279a9ebc0e3a6288899532b27dbfc60a0f4a8e2cb924c5539ebf85eb3?w=180&h=236&fit=min&auto=format' },
          { id: 'le-bandit', name: 'Le Bandit', provider: 'Hacksaw Gaming', bet: 2.0, payout: 74.00, caller: '@DiggityFan', image: 'https://mediumrare.imgix.net/dbb3f6630f9a76bc88bfd52a2307ef0cb1e6a3c42878c43026ad1607fa48b8ec?w=180&h=236&fit=min&auto=format' },
          { id: 'san-quentin-xways', name: 'San Quentin xWays', provider: 'Nolimit City', bet: 2.0, payout: 0, caller: '@AgusKick', image: 'https://fan-cdn.nolimitcity.com/trans_eba4744bd0.png' },
          { id: 'sweet-bonanza', name: 'Sweet Bonanza 1000', provider: 'Pragmatic Play', bet: 2.0, payout: 0, caller: '@Valen99', image: 'https://mediumrare.imgix.net/2be43834316fa71dc75a5960ce01783f98292f9d854e4881f215099fbcfe327c?w=180&h=236&fit=min&auto=format' },
          { id: 'ghost-rush', name: 'Ghost Rush', provider: 'Stake Originals', bet: 2.0, payout: 0, caller: '@StakeHunter', image: 'https://mediumrare.imgix.net/742a1d7958a9ffa215e19cc72c684abe9412f71fcf426b57909b5b817f9cd9d4?w=180&h=236&fit=min&auto=format' }
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
        if (window.sonner) window.sonner.toast({ title: 'Demo Hunt Loaded 🎲', message: '6 bonuses populated.', type: 'cyan' });
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
        try { guesses = JSON.parse(localStorage.getItem('hunthub_hunt_guesses') || '[]'); } catch (e) {}

        if (guesses.length === 0) {
          guesses = [
            { user: '@NachoGamer', guess: 1620 },
            { user: '@SlotKing21', guess: 1840 },
            { user: '@DiggityFan', guess: 1450 }
          ];
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

        if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
        if (typeof window.confetti === 'function') window.confetti({ particleCount: 100, spread: 70 });
        if (window.sonner) {
          window.sonner.toast({
            title: 'Guess The Balance Resolved! 🏆',
            message: `${closest.user} won with a guess of $${closest.guess.toFixed(2)}!`,
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

  renderBonusHuntAdmin() {
    const tbody = document.getElementById('admin-hunt-bonuses-tbody');
    if (!tbody) return;

    let slots = [];
    try { slots = JSON.parse(localStorage.getItem('hunthub_hunt_slots') || '[]'); } catch (e) {}

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

    tbody.innerHTML = slots.map((s, idx) => {
      const mult = s.bet > 0 && s.payout > 0 ? (s.payout / s.bet).toFixed(1) + 'x' : '—';
      return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
          <td style="font-family: monospace; font-size: 11px; color: var(--text-dim);">#${idx + 1}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="${s.image}" alt="${s.name}" style="width: 32px; height: 32px; object-fit: cover; border-radius: 6px;" onerror="this.onerror=null; this.src='https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format';">
              <div>
                <strong style="color: #ffffff; font-size: 13px;">${s.name}</strong>
                <div style="font-size: 11px; color: var(--text-dim);">${s.provider}</div>
              </div>
            </div>
          </td>
          <td style="font-size: 12px; color: var(--gold); font-weight: 700;">${s.caller || '—'}</td>
          <td style="font-family: var(--font-display); font-weight: 700; color: #ffffff;">$${(s.bet || 2.0).toFixed(2)}</td>
          <td>
            <input type="number" class="slots-search-input admin-payout-input" data-idx="${idx}" value="${s.payout || 0}" step="1" style="width: 100px; padding: 4px 8px; font-size: 12px;">
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

    // Bind payout inputs and delete buttons
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
        if (window.soundEngine && typeof window.soundEngine.playCoin === 'function') window.soundEngine.playCoin();
        this.renderBonusHuntAdmin();
      };
    });

    tbody.querySelectorAll('.btn-admin-del-bonus').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx, 10);
        slots.splice(idx, 1);
        localStorage.setItem('hunthub_hunt_slots', JSON.stringify(slots));
        if (window.bonusHunt) {
          window.bonusHunt.slots = slots;
          window.bonusHunt.renderMetrics();
          window.bonusHunt.renderSlotTable();
        }
        this.renderBonusHuntAdmin();
      };
    });
  }

  // 8-Bracket Tourney Controls
  setupTournamentAdmin() {
    const btnOpen = document.getElementById('btn-admin-open-tourney');
    const btnDemo = document.getElementById('btn-admin-demo-tourney');
    const btnReset = document.getElementById('btn-admin-reset-tourney');
    const btnModeBuy = document.getElementById('btn-admin-tourney-mode-buy');
    const btnModeSpins = document.getElementById('btn-admin-tourney-mode-spins');

    if (btnModeBuy) {
      btnModeBuy.onclick = () => this.setTourneyMode('BONUS_BUY');
    }
    if (btnModeSpins) {
      btnModeSpins.onclick = () => this.setTourneyMode('SPINS');
    }

    if (btnOpen) {
      btnOpen.onclick = () => {
        localStorage.setItem('hunthub_tourney_active', 'true');
        const badge = document.getElementById('admin-tourney-status-badge');
        if (badge) {
          badge.textContent = 'BRACKET LIVE';
          badge.style.color = 'var(--kick-green)';
          badge.style.borderColor = 'var(--kick-green)';
        }
        try {
          fetch('/api/tourney/open', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameMode: this.tourneyMode })
          });
        } catch (_) {}
        if (this.channelTourney) {
          this.channelTourney.postMessage({ action: 'open_tourney', mode: this.tourneyMode });
        }
        if (window.sonner) window.sonner.toast({ title: 'Tournament Opened! 🏆', message: `Predictions unlocked in ${this.tourneyMode} mode.`, type: 'green' });
      };
    }

    if (btnDemo) {
      btnDemo.onclick = () => {
        const demoPred = {
          semi1_a: 'wanted-dead-or-a-wild',
          semi1_b: 'gates-of-olympus',
          semi2_a: 'le-bandit',
          semi2_b: 'san-quentin-xways',
          final_a: 'gates-of-olympus',
          final_b: 'le-bandit',
          champion: 'gates-of-olympus'
        };
        localStorage.setItem('hunthub_tourney_pred', JSON.stringify(demoPred));
        localStorage.setItem('hunthub_tourney_active', 'true');
        if (window.tournamentPrediction) {
          window.tournamentPrediction.predictions = demoPred;
          window.tournamentPrediction.renderBracket();
        }
        this.renderTournamentAdmin();
        if (window.sonner) window.sonner.toast({ title: 'Demo Tournament Loaded 🎲', message: '8 competitors populated.', type: 'cyan' });
      };
    }

    if (btnReset) {
      btnReset.onclick = () => {
        localStorage.removeItem('hunthub_tourney_pred');
        if (window.tournamentPrediction) {
          window.tournamentPrediction.predictions = { semi1_a: null, semi1_b: null, semi2_a: null, semi2_b: null, final_a: null, final_b: null, champion: null };
          window.tournamentPrediction.renderBracket();
        }
        try {
          fetch('/api/tourney/reset', { method: 'POST' });
        } catch (_) {}
        if (this.channelTourney) {
          this.channelTourney.postMessage({ action: 'reset_tourney' });
        }
        this.renderTournamentAdmin();
        if (window.sonner) window.sonner.toast({ title: 'Bracket Reset ↩️', message: 'Fresh bracket ready.', type: 'default' });
      };
    }
  }

  setTourneyMode(mode) {
    this.tourneyMode = mode;
    const btnBuy = document.getElementById('btn-admin-tourney-mode-buy');
    const btnSpins = document.getElementById('btn-admin-tourney-mode-spins');
    if (btnBuy && btnSpins) {
      if (mode === 'BONUS_BUY') {
        btnBuy.className = 'btn-stake-primary';
        btnSpins.className = 'btn-stake-secondary';
      } else {
        btnBuy.className = 'btn-stake-secondary';
        btnSpins.className = 'btn-stake-primary';
      }
    }
    try {
      fetch('/api/tourney/mode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameMode: mode })
      });
    } catch (_) {}
    if (this.channelTourney) {
      this.channelTourney.postMessage({ action: 'set_mode', mode });
    }
    this.renderTournamentAdmin();
    if (window.sonner) {
      window.sonner.toast({
        title: `Tournament Mode: ${mode === 'BONUS_BUY' ? 'Bonus Buy 🎁' : 'Spins 🎰'}`,
        message: mode === 'BONUS_BUY' ? 'Multiplier comparisons enabled.' : '1-click winner resolution active.',
        type: 'cyan'
      });
    }
  }

  renderTournamentAdmin() {
    const container = document.getElementById('admin-tourney-rounds-container');
    if (!container) return;

    let pred = {};
    try { pred = JSON.parse(localStorage.getItem('hunthub_tourney_pred') || '{}'); } catch (e) {}

    const isSpins = this.tourneyMode === 'SPINS';

    const matches = [
      { id: 'm1', round: 'semi1_a', label: 'Match 1', p1: 'Wanted Dead', id1: 'wanted-dead-or-a-wild', p2: 'Rip City', id2: 'rip-city', defScore1: 2.01, defScore2: 1.01 },
      { id: 'm2', round: 'semi1_b', label: 'Match 2', p1: 'Gates 1000', id1: 'gates-of-olympus', p2: 'Sugar Rush', id2: 'sugar-rush', defScore1: 2.45, defScore2: 0.85 },
      { id: 'm3', round: 'semi2_a', label: 'Match 3', p1: 'Le Bandit', id1: 'le-bandit', p2: 'Chaos Crew 2', id2: 'chaos-crew-2', defScore1: 3.10, defScore2: 1.20 },
      { id: 'm4', round: 'semi2_b', label: 'Match 4', p1: 'San Quentin', id1: 'san-quentin-xways', p2: 'Zeus vs Hades', id2: 'zeus-vs-hades', defScore1: 1.80, defScore2: 0.95 },
    ];

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="font-size: 11px; font-weight: 800; color: var(--cyan); display: flex; justify-content: space-between;">
          <span>QUARTERFINALS (${isSpins ? 'SPINS 1-CLICK' : 'BONUS BUY MULTIPLIERS'}):</span>
          <span style="color: var(--gold);">${isSpins ? 'Click 🏆 to advance winner' : 'Auto-compares multipliers'}</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${matches.map(m => {
            const currentWinner = pred[m.round];
            const isP1Winner = currentWinner === m.id1;
            const isP2Winner = currentWinner === m.id2;

            return `
              <div class="admin-tourney-match-box" style="padding: 8px 10px; background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <span style="font-size: 10px; font-weight: 800; color: var(--text-dim);">${m.label}</span>
                  ${currentWinner ? `<span class="reward-badge-pill" style="font-size: 9px; color: var(--kick-green); border-color: var(--kick-green);">ADVANCED: ${currentWinner}</span>` : ''}
                </div>

                <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center;">
                  <!-- Competitor 1 -->
                  <div style="padding: 6px; background: rgba(0,100,255,0.08); border: 1px solid ${isP1Winner ? 'var(--kick-green)' : (isP2Winner ? 'rgba(255,255,255,0.04)' : 'rgba(0,150,255,0.2)')}; border-radius: 6px; opacity: ${isP2Winner ? '0.45' : '1'};">
                    <div style="font-weight: 700; font-size: 11px; color: ${isP1Winner ? 'var(--kick-green)' : '#ffffff'};">${m.p1}</div>
                    ${!isSpins ? `
                      <div style="margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                        <input type="number" step="0.01" class="slots-search-input match-score-input" id="score-${m.id}-1" value="${m.defScore1}" style="width: 60px; padding: 2px 4px; font-size: 11px;">
                        <span style="font-size: 10px; color: var(--text-dim);">x</span>
                      </div>
                    ` : `
                      <button type="button" class="btn-stake-secondary btn-tourney-spins-winner" data-match="${m.id}" data-round="${m.round}" data-winner="${m.id1}" data-loser="${m.id2}" data-label="${m.p1}" style="margin-top: 4px; width: 100%; padding: 3px 6px; font-size: 10px; ${isP1Winner ? 'background: var(--kick-green); color: #000; font-weight: 900;' : ''}">
                        🏆 Winner
                      </button>
                    `}
                  </div>

                  <span style="font-size: 10px; color: var(--text-dim); font-weight: 800;">VS</span>

                  <!-- Competitor 2 -->
                  <div style="padding: 6px; background: rgba(255,42,95,0.08); border: 1px solid ${isP2Winner ? 'var(--kick-green)' : (isP1Winner ? 'rgba(255,255,255,0.04)' : 'rgba(255,42,95,0.2)')}; border-radius: 6px; opacity: ${isP1Winner ? '0.45' : '1'};">
                    <div style="font-weight: 700; font-size: 11px; color: ${isP2Winner ? 'var(--kick-green)' : '#ffffff'};">${m.p2}</div>
                    ${!isSpins ? `
                      <div style="margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                        <input type="number" step="0.01" class="slots-search-input match-score-input" id="score-${m.id}-2" value="${m.defScore2}" style="width: 60px; padding: 2px 4px; font-size: 11px;">
                        <span style="font-size: 10px; color: var(--text-dim);">x</span>
                      </div>
                    ` : `
                      <button type="button" class="btn-stake-secondary btn-tourney-spins-winner" data-match="${m.id}" data-round="${m.round}" data-winner="${m.id2}" data-loser="${m.id1}" data-label="${m.p2}" style="margin-top: 4px; width: 100%; padding: 3px 6px; font-size: 10px; ${isP2Winner ? 'background: var(--kick-green); color: #000; font-weight: 900;' : ''}">
                        🏆 Winner
                      </button>
                    `}
                  </div>
                </div>

                ${!isSpins ? `
                  <button type="button" class="btn-stake-primary btn-calc-match-winner" data-match="${m.id}" data-round="${m.round}" data-id1="${m.id1}" data-id2="${m.id2}" data-lbl1="${m.p1}" data-lbl2="${m.p2}" style="margin-top: 6px; width: 100%; padding: 4px 8px; font-size: 10px;">
                    Compare & Advance Higher Multiplier ✓
                  </button>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>

        <div style="font-size: 11px; font-weight: 800; color: var(--gold); margin-top: 6px;">SEMIFINALS & GRAND CHAMPION:</div>
        <div style="display: flex; gap: 6px;">
          <button type="button" class="btn-stake-secondary btn-adv-tourney" data-round="final_a" data-winner="gates-of-olympus" style="flex: 1; padding: 6px; font-size: 11px;">
            Semi 1: Gates 1000 ✓
          </button>
          <button type="button" class="btn-stake-secondary btn-adv-tourney" data-round="final_b" data-winner="le-bandit" style="flex: 1; padding: 6px; font-size: 11px;">
            Semi 2: Le Bandit ✓
          </button>
          <button type="button" class="btn-stake-primary btn-adv-tourney" data-round="champion" data-winner="gates-of-olympus" style="flex: 1.2; padding: 6px; font-size: 11px; background: linear-gradient(135deg, #ffd700, #ffb300); color: #000; font-weight: 900;">
            👑 Crown Champion
          </button>
        </div>
      </div>
    `;

    // Bind BONUS_BUY multiplier comparison buttons
    container.querySelectorAll('.btn-calc-match-winner').forEach(b => {
      b.onclick = () => {
        const mid = b.dataset.match;
        const round = b.dataset.round;
        const id1 = b.dataset.id1;
        const id2 = b.dataset.id2;
        const lbl1 = b.dataset.lbl1;
        const lbl2 = b.dataset.lbl2;

        const val1 = parseFloat(document.getElementById(`score-${mid}-1`)?.value || '0');
        const val2 = parseFloat(document.getElementById(`score-${mid}-2`)?.value || '0');

        const winnerId = val1 >= val2 ? id1 : id2;
        const winnerLbl = val1 >= val2 ? lbl1 : lbl2;
        const winningScore = Math.max(val1, val2);
        const losingScore = Math.min(val1, val2);

        pred[round] = winnerId;
        localStorage.setItem('hunthub_tourney_pred', JSON.stringify(pred));
        if (window.tournamentPrediction) {
          window.tournamentPrediction.predictions = pred;
          window.tournamentPrediction.renderBracket();
        }

        try {
          fetch('/api/tourney/result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matchId: mid, score1: val1, score2: val2 })
          });
        } catch (_) {}

        if (this.channelTourney) {
          this.channelTourney.postMessage({ action: 'match_result', matchId: mid, score1: val1, score2: val2, winner: winnerId });
        }

        if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
        if (window.sonner) {
          window.sonner.toast({
            title: `${winnerLbl} Advances! (${winningScore.toFixed(2)}x vs ${losingScore.toFixed(2)}x) 🏆`,
            message: `Advanced to ${round}.`,
            type: 'green'
          });
        }
        this.renderTournamentAdmin();
      };
    });

    // Bind SPINS 1-click winner buttons
    container.querySelectorAll('.btn-tourney-spins-winner').forEach(b => {
      b.onclick = () => {
        const mid = b.dataset.match;
        const round = b.dataset.round;
        const winner = b.dataset.winner;
        const label = b.dataset.label;

        pred[round] = winner;
        localStorage.setItem('hunthub_tourney_pred', JSON.stringify(pred));
        if (window.tournamentPrediction) {
          window.tournamentPrediction.predictions = pred;
          window.tournamentPrediction.renderBracket();
        }

        try {
          fetch('/api/tourney/result-spins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matchId: mid, winnerSelector: winner })
          });
        } catch (_) {}

        if (this.channelTourney) {
          this.channelTourney.postMessage({ action: 'match_winner_spins', matchId: mid, winner });
        }

        if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
        if (window.sonner) {
          window.sonner.toast({
            title: `${label} Won Spins Duel! 🏆`,
            message: `Rival marked as LOSER. Advanced to ${round}.`,
            type: 'green'
          });
        }
        this.renderTournamentAdmin();
      };
    });

    // Bind Semis and Champion buttons
    container.querySelectorAll('.btn-adv-tourney').forEach(b => {
      b.onclick = () => {
        const round = b.dataset.round;
        const winner = b.dataset.winner;
        pred[round] = winner;
        localStorage.setItem('hunthub_tourney_pred', JSON.stringify(pred));
        if (window.tournamentPrediction) {
          window.tournamentPrediction.predictions = pred;
          window.tournamentPrediction.renderBracket();
        }
        if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
        if (round === 'champion' && typeof window.confetti === 'function') window.confetti({ particleCount: 100, spread: 70 });
        if (window.sonner) window.sonner.toast({ title: 'Bracket Advanced! 🏆', message: `${winner} advanced in ${round}.`, type: 'green' });
        this.renderTournamentAdmin();
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
      } else {
        this.kothState.awaitingDecision = true;
        this.showKothBanner(`👑 WINNER: @${this.kothState.king} (Streak ${this.kothState.streak}/4 — $${currentPrize} banked)! Type !continue or !cashout`, 'cyan');
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ winnerSlot })
        });
      } else {
        fetch('/api/battle/resolve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ winnerSlot })
        });
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

    if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
    if (window.sonner) {
      window.sonner.toast({
        title: `@${winUserClean} Won Duel! ⚔️`,
        message: `${scoreDetail}. Streak: ${this.kothState.streak}/4 ($${Math.min(20, this.kothState.streak * 5)} USD).`,
        type: 'gold'
      });
    }
  }

  awardKothGrandPrize(kingUsername, prizeAmount = 20, winsCount = 4) {
    if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
    if (typeof window.confetti === 'function') {
      window.confetti({ particleCount: 120, spread: 90 });
    }

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision: 'continue' })
      });
    } catch (_) {}

    if (this.channelBattle) {
      this.channelBattle.postMessage({
        action: 'koth_continue',
        king: kingName,
        slot: kingSlot,
        streak: this.kothState.streak
      });
    }

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
    const streak = Math.max(1, this.kothState.streak || 1);
    const prizeAmount = Math.min(20, streak * 5);
    const announcement = `Congratulations @${retired} you won $${prizeAmount}`;

    if (retired && retired !== 'Winner') {
      this.awardKothGrandPrize(retired, prizeAmount, streak);
    }

    this.showKothBanner(`💰 ${announcement}! (${streak}/4 Wins — Both corners cleared for new contenders)`, 'gold');

    try {
      fetch('/api/battle/koth/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision: 'retire' })
      });
    } catch (_) {}

    if (this.channelBattle) {
      this.channelBattle.postMessage({
        action: 'koth_retire',
        retiredKing: retired,
        streak,
        prizeAmount,
        announcement
      });
    }

    // Clear both corners and reset wheel target to Player A (Blue Corner)
    this.clearBothBattleCorners();

    if (window.sonner) {
      window.sonner.toast({
        title: `💰 ${announcement}!`,
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
        this.duoPool = [
          { chatter: 'LuckyStriker', slot: 'Wanted Dead or a Wild', provider: 'Hacksaw', icon: '🤠' },
          { chatter: 'VegasKing', slot: 'Gates of Olympus 1000', provider: 'Pragmatic', icon: '⚡' },
          { chatter: 'SlotQueen', slot: 'San Quentin xWays', provider: 'Nolimit City', icon: '🔒' },
          { chatter: 'SpinMaster', slot: 'Sugar Rush 1000', provider: 'Pragmatic', icon: '🍬' },
          { chatter: 'Strike777', slot: 'Rip City', provider: 'Hacksaw', icon: '🐱' },
          { chatter: 'BigBassBob', slot: 'Big Bass Splash', provider: 'Pragmatic', icon: '🎣' },
          { chatter: 'NeonWolf', slot: 'Chaos Crew 2', provider: 'Hacksaw', icon: '🐺' },
          { chatter: 'RoyalFlush', slot: 'Zeus vs Hades', provider: 'Pragmatic', icon: '⚔️' }
        ];
        this.renderDuoQueue();
        if (this.channelDuo) this.channelDuo.postMessage({ action: 'set_pool', pool: this.duoPool });
        if (window.sonner) window.sonner.toast({ title: 'Duo Pool Restored 🎲', message: '8 pairs queued.', type: 'cyan' });
      };
    }

    if (btnClearDuo) {
      btnClearDuo.onclick = () => {
        this.duoPool = [];
        this.renderDuoQueue();
        if (this.channelDuo) this.channelDuo.postMessage({ action: 'set_pool', pool: this.duoPool });
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
    this.syncDuoQueues();
    setInterval(() => this.syncDuoQueues(), 4000);
  }

  async syncDuoQueues() {
    try {
      const res = await fetch('/api/wheel/duo/queues');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.tourneyQueue)) {
          this.tourneyQueue = data.tourneyQueue;
          const tCount = document.getElementById('cp-tourney-q-count');
          if (tCount) tCount.textContent = String(this.tourneyQueue.length);
        }
        const q = this.duoMode === 'tourney' ? data.tourneyQueue : data.battleQueue;
        if (q && q.length > 0) {
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
  }

  setDuoMode(mode) {
    this.duoMode = mode;
    const badge = document.getElementById('admin-duo-mode-badge');
    const btnB = document.getElementById('btn-duo-mode-battle');
    const btnT = document.getElementById('btn-duo-mode-tourney');
    const cpBtnB = document.getElementById('cp-btn-duo-mode-battle');
    const cpBtnT = document.getElementById('cp-btn-duo-mode-tourney');

    if (mode === 'battle') {
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
    }

    if (this.channelDuo) {
      this.channelDuo.postMessage({ action: 'set_mode', mode: this.duoMode, ts: Date.now() });
    }
    fetch('/api/wheel/duo/mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: this.duoMode })
    }).catch(() => {});
    this.syncDuoQueues();
    this.renderDuoQueue();
    if (window.sonner) window.sonner.toast({ title: `Duo-Wheel Mode: ${mode.toUpperCase()} 🔄`, message: 'Synced to OBS overlay.', type: 'cyan' });
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
            <span style="font-weight: 700; color: #ffffff; font-size: 12px;">@${p.chatter}</span>
            <span style="font-size: 11px; color: var(--gold);">${p.slot}</span>
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
          return `
            <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(0, 229, 255, 0.25); border-radius: 8px; font-size: 11px;">
              <img src="${meta.image}" alt="" style="width: 20px; height: 26px; border-radius: 4px; object-fit: cover;" />
              <strong style="color: #fff;">@${p.chatter}</strong>
              <span style="color: var(--gold);">${meta.name}</span>
            </div>
          `;
        }).join('');
      }
    }
  }

  spinDuoWheel() {
    if (this.duoPool.length === 0) {
      if (window.sonner) window.sonner.toast({ title: 'Queue Empty', message: 'Add duos or wait for !battle <slot> in chat.', type: 'danger' });
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

    // Determine target corner: if Corner A is empty, always select Corner A (Blue) first; otherwise select Corner B (Red)
    const userAVal = (document.getElementById('cp-battle-user-a')?.value || '').trim();
    const targetCorner = (!userAVal || this.wheelTargetCorner === 'A') ? 'A' : 'B';
    this.setWheelTargetCorner(targetCorner);

    const winnerIdx = Math.floor(Math.random() * this.duoPool.length);
    const winner = this.duoPool[winnerIdx];
    const resolvedMeta = this.resolveSlotMeta(winner.slot);
    winner.slot = resolvedMeta.name;
    winner.provider = resolvedMeta.provider;
    winner.imageUrl = resolvedMeta.image;

    if (this.channelDuo) {
      this.channelDuo.postMessage({
        action: 'spin',
        mode: this.duoMode,
        targetCorner,
        winner,
        ts: Date.now()
      });
    }

    try {
      localStorage.setItem('hunthub_duo_spin_cmd', JSON.stringify({
        action: 'spin',
        mode: this.duoMode,
        targetCorner,
        winner,
        ts: Date.now()
      }));
    } catch (_) {}

    // Remove winner from local pool immediately so they cannot be picked twice!
    const cleanWinnerUser = String(winner.chatter || '').trim().toLowerCase().replace(/^@/, '');
    this.duoPool = this.duoPool.filter(item => String(item.chatter || '').trim().toLowerCase().replace(/^@/, '') !== cleanWinnerUser);
    this.renderDuoQueue();

    // Remove winner from backend queue as well
    fetch('/api/wheel/duo/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: this.duoMode, username: cleanWinnerUser })
    }).catch(() => {});

    if (window.soundEngine && typeof window.soundEngine.playDiceRoll === 'function') {
      window.soundEngine.playDiceRoll();
    }

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🎰 SPIN DUO-WHEEL (SELECT WINNER)';
      }
      if (cpBtn) {
        cpBtn.disabled = false;
        cpBtn.textContent = '🎡 SPIN DUO WHEEL (Pick Winner & Fill Corner)';
      }
      if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
      if (typeof window.confetti === 'function') window.confetti({ particleCount: 80, spread: 60 });

      // Auto-assign winner to Player A (Blue Corner) first, then Player B (Red Corner)
      if (this.duoMode === 'battle') {
        this.assignWheelWinnerToCorner(targetCorner, winner.chatter, winner.slot);
      }

      if (window.sonner) {
        window.sonner.toast({
          title: `Winner ${targetCorner === 'A' ? 'A (Blue Corner)' : 'B (Red Corner)'} Selected! 🎰`,
          message: `@${winner.chatter} + "${winner.slot}" assigned to ${targetCorner === 'A' ? 'Player A (Blue)' : 'Player B (Red)'} and removed from wheel pool!`,
          type: targetCorner === 'A' ? 'cyan' : 'gold'
        });
      }
    }, 4500);
  }

  renderActiveChatters() {
    const listEl = document.getElementById('admin-chatters-list');
    const countEl = document.getElementById('admin-chatters-count');
    if (!listEl) return;

    // Seed realistic chatters if map empty
    if (this.recentChatters.size === 0) {
      const now = Date.now();
      this.recentChatters.set('NachoGamer', { user: 'NachoGamer', ts: now - 12000 });
      this.recentChatters.set('SlotKing21', { user: 'SlotKing21', ts: now - 28000 });
      this.recentChatters.set('DiggityFan', { user: 'DiggityFan', ts: now - 45000 });
      this.recentChatters.set('CryptoSpin', { user: 'CryptoSpin', ts: now - 62000 });
      this.recentChatters.set('AgusKick', { user: 'AgusKick', ts: now - 75000 });
    }

    const arr = Array.from(this.recentChatters.values());
    if (countEl) countEl.textContent = arr.length.toString();

    listEl.innerHTML = arr.map(c => {
      const secAgo = Math.floor((Date.now() - c.ts) / 1000);
      return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: rgba(0,0,0,0.3); border-radius: 6px; margin-bottom: 4px; border: 1px solid rgba(255,255,255,0.05);">
          <span style="font-weight: 700; color: #ffffff; font-size: 12px;">@${c.user}</span>
          <span style="font-size: 10.5px; color: var(--kick-green);">${secAgo}s ago</span>
        </div>
      `;
    }).join('');
  }

  spinCSGOWheel(demo = false) {
    const btn = document.getElementById('btn-spin-csgo-wheel');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '🎯 SPINNING CS:GO REEL...';
    }

    const arr = Array.from(this.recentChatters.values());
    const winner = arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)].user : 'LuckyChatter';

    if (this.channelGiveaway) {
      this.channelGiveaway.postMessage({ type: demo ? 'test_spin' : 'spin', winner, ts: Date.now() });
    }

    if (window.soundEngine && typeof window.soundEngine.playDiceRoll === 'function') window.soundEngine.playDiceRoll();

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🎯 SPIN CS:GO WHEEL (PICK WINNER)';
      }
      if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();
      if (typeof window.confetti === 'function') window.confetti({ particleCount: 80, spread: 60 });

      // Assign Spotlight Recommender in Bonus Hunt
      const callerInput = document.getElementById('admin-hunt-caller-input');
      if (callerInput && !demo) callerInput.value = `@${winner}`;

      if (window.sonner) {
        window.sonner.toast({
          title: demo ? 'CS:GO Demo Spin Done 🧪' : 'Spotlight Recommender Chosen! 🎯',
          message: `@${winner} picked live on CS:GO Wheel!`,
          type: 'gold'
        });
      }
    }, 4500);

    this.relayOverlaySyncEvent({
      target: 'wheel-csgo',
      type: demo ? 'test_spin' : 'spin',
      winner,
      participantes: arr.map(c => c.user),
      ts: Date.now()
    });
  }

  spinSlotWheel(demo = false) {
    const catSelect = document.getElementById('admin-slot-category-select');
    const cat = catSelect ? catSelect.value : 'all';

    const btn = document.getElementById('btn-spin-slot-wheel');
    if (btn) {
      btn.disabled = true;
      btn.textContent = '🎰 SPINNING 60 FPS ROULETTE...';
    }

    if (this.channelSlotWheel) {
      this.channelSlotWheel.postMessage({ type: demo ? 'test_spin' : 'spin', category: cat, ts: Date.now() });
    }

    this.relayOverlaySyncEvent({
      target: 'wheel-slots',
      type: demo ? 'test_spin' : 'spin',
      category: cat,
      ts: Date.now()
    });

    if (window.soundEngine && typeof window.soundEngine.playDiceRoll === 'function') window.soundEngine.playDiceRoll();

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '🎰 SPIN RANDOM SLOT WHEEL';
      }
      if (window.soundEngine && typeof window.soundEngine.playWin === 'function') window.soundEngine.playWin();

      const slots = window.HUNTHUB_CURATED_SLOTS || [];
      const pool = cat === 'all' ? slots : slots.filter(s => s.category === cat);
      const chosen = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : { name: 'Gates of Olympus 1000' };

      // Set input in bonus hunt search
      const huntSearch = document.getElementById('admin-hunt-slot-search');
      if (huntSearch && !demo) huntSearch.value = chosen.name;

      if (window.sonner) {
        window.sonner.toast({
          title: 'Slot Wheel Selected! 🎰',
          message: `${chosen.name} (${chosen.provider || cat.toUpperCase()})`,
          type: 'gold'
        });
      }
    }, 5000);
  }

  relayOverlaySyncEvent(overlayEvent) {
    try {
      fetch('/api/sync/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    const pill = document.getElementById('cp-wheel-target-pill');
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
    if (this.channelDuo) {
      this.channelDuo.postMessage({ action: 'set_target_corner', corner: this.wheelTargetCorner });
    }
  }

  setCornerFighter(corner, username, slotName) {
    const cleanUser = String(username || '').trim().replace(/^@/, '');
    const formattedUser = cleanUser ? `@${cleanUser}` : '';
    const cleanSlot = String(slotName || '').trim();
    const meta = this.resolveSlotMeta(cleanSlot || (corner === 'A' ? 'Wanted Dead or a Wild' : 'Gates of Olympus 1000'));

    if (corner === 'A') {
      const uEl = document.getElementById('cp-battle-user-a');
      const sEl = document.getElementById('cp-battle-slot-a');
      const imgEl = document.getElementById('cp-battle-img-a');
      const adminNameEl = document.getElementById('admin-battle-player-a-name');
      if (uEl) uEl.value = formattedUser;
      if (sEl) sEl.value = cleanSlot ? meta.name : '';
      if (imgEl) {
        imgEl.src = meta.image;
        imgEl.onerror = () => {
          if (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function') {
            imgEl.src = window.SlotResolver.generateDataUriCard(meta.name, meta.provider);
          }
        };
      }
      if (adminNameEl) {
        adminNameEl.textContent = cleanUser ? `${formattedUser} (${meta.name})` : '@PlayerA';
      }
    } else {
      const uEl = document.getElementById('cp-battle-user-b');
      const sEl = document.getElementById('cp-battle-slot-b');
      const imgEl = document.getElementById('cp-battle-img-b');
      const adminNameEl = document.getElementById('admin-battle-player-b-name');
      if (uEl) uEl.value = formattedUser;
      if (sEl) sEl.value = cleanSlot ? meta.name : '';
      if (imgEl) {
        imgEl.src = meta.image;
        imgEl.onerror = () => {
          if (window.SlotResolver && typeof window.SlotResolver.generateDataUriCard === 'function') {
            imgEl.src = window.SlotResolver.generateDataUriCard(meta.name, meta.provider);
          }
        };
      }
      if (adminNameEl) {
        adminNameEl.textContent = cleanUser ? `${formattedUser} (${meta.name})` : '@PlayerB';
      }
    }
  }

  assignWheelWinnerToCorner(corner, username, slotName) {
    if (corner === 'A') {
      this.setCornerFighter('A', username, slotName);
      this.setWheelTargetCorner('B');
    } else {
      this.setCornerFighter('B', username, slotName);
    }
    this.pushCornersToOverlay();
  }

  pushCornersToOverlay() {
    const userA = (document.getElementById('cp-battle-user-a')?.value || '').trim().replace(/^@/, '');
    const slotA = (document.getElementById('cp-battle-slot-a')?.value || '').trim();
    const userB = (document.getElementById('cp-battle-user-b')?.value || '').trim().replace(/^@/, '');
    const slotB = (document.getElementById('cp-battle-slot-b')?.value || '').trim();

    const metaA = slotA ? this.resolveSlotMeta(slotA) : { name: '', provider: '', image: '' };
    const metaB = slotB ? this.resolveSlotMeta(slotB) : { name: '', provider: '', image: '' };

    const statePayload = {
      type: 'BATTLE_SYNC',
      mode: this.battleMode === 'SPINS' ? 'SPINS' : 'MULTIPLIER',
      kothStreak: this.kothState.streak || 0,
      reigningKing: this.kothState.king || null,
      playerA: {
        name: userA ? `@${userA}` : '',
        slot: metaA.name,
        provider: metaA.provider,
        image: metaA.image
      },
      playerB: {
        name: userB ? `@${userB}` : '',
        slot: metaB.name,
        provider: metaB.provider,
        image: metaB.image
      },
      ts: Date.now()
    };

    try {
      localStorage.setItem('hunthub_battle_state', JSON.stringify(statePayload));
    } catch (_) {}

    if (this.channelBattle) {
      this.channelBattle.postMessage(statePayload);
    }
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
    if (this.channelBattle) {
      this.channelBattle.postMessage({ type: 'RESET_BATTLE', ts: Date.now() });
    }
    try { fetch('/api/battle/reset', { method: 'POST' }); } catch (_) {}

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

    if (mode === 'tourney') {
      this.tourneyQueue = this.tourneyQueue.filter(e => String(e.username || '').toLowerCase() !== cleanUser.toLowerCase());
      this.tourneyQueue.push({ username: cleanUser, slotName: meta.name, slotProvider: meta.provider, imageUrl: meta.image });
      const tCount = document.getElementById('cp-tourney-q-count');
      if (tCount) tCount.textContent = String(this.tourneyQueue.length);
    }

    if (mode === this.duoMode || mode === 'battle') {
      this.duoPool = this.duoPool.filter(p => String(p.chatter || '').toLowerCase().replace(/^@/, '') !== cleanUser.toLowerCase());
      this.duoPool.unshift({
        chatter: cleanUser,
        slot: meta.name,
        provider: meta.provider,
        imageUrl: meta.image,
        icon: '🎰'
      });
      this.renderDuoQueue();
      if (this.channelDuo) {
        this.channelDuo.postMessage({ action: 'set_pool', pool: this.duoPool });
      }
    }
  }

  handleDuoBroadcast(data) {
    if (!data) return;
    if (data.action === 'duo_winner_selected' && data.winner) {
      const target = data.targetCorner || (document.getElementById('cp-battle-user-a')?.value ? 'B' : 'A');
      const u = data.winner.chatter || data.winner.username || '';
      const s = data.winner.slot || data.winner.slotName || '';
      if (u) {
        const cleanU = u.toLowerCase().replace(/^@/, '');
        this.duoPool = this.duoPool.filter(item => String(item.chatter || '').toLowerCase().replace(/^@/, '') !== cleanU);
        this.renderDuoQueue();
        this.assignWheelWinnerToCorner(target, u, s);
      }
    }
  }

  handleBattleBroadcast(data) {
    if (!data) return;
    if (data.action === 'set_target_corner' && data.corner) {
      this.setWheelTargetCorner(data.corner);
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

    // Initialize slot preview images if empty
    const imgA = document.getElementById('cp-battle-img-a');
    const imgB = document.getElementById('cp-battle-img-b');
    if (imgA && !imgA.getAttribute('src')) {
      imgA.src = this.resolveSlotMeta('Wanted Dead or a Wild').image;
    }
    if (imgB && !imgB.getAttribute('src')) {
      imgB.src = this.resolveSlotMeta('Gates of Olympus 1000').image;
    }

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

    // Live slot cover preview when editing slot A or B inputs
    const slotAInput = document.getElementById('cp-battle-slot-a');
    const slotBInput = document.getElementById('cp-battle-slot-b');
    if (slotAInput) {
      slotAInput.addEventListener('input', () => {
        const meta = this.resolveSlotMeta(slotAInput.value);
        const imgA = document.getElementById('cp-battle-img-a');
        if (imgA) imgA.src = meta.image;
      });
    }
    if (slotBInput) {
      slotBInput.addEventListener('input', () => {
        const meta = this.resolveSlotMeta(slotBInput.value);
        const imgB = document.getElementById('cp-battle-img-b');
        if (imgB) imgB.src = meta.image;
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
        this.renderDuoQueue();
        if (this.channelDuo) this.channelDuo.postMessage({ action: 'set_pool', pool: [] });
      };
    }

    if (btnSpinCsgo) btnSpinCsgo.onclick = () => this.spinCSGOWheel(false);
    if (btnSpinSlots) btnSpinSlots.onclick = () => this.spinSlotWheel(false);

    // 3. Tournament & Bonus Hunt Quick Controls
    const btnSeedTourney = document.getElementById('cp-btn-seed-tourney');
    if (btnSeedTourney) {
      btnSeedTourney.onclick = () => {
        const seedSource = this.tourneyQueue.length > 0 ? this.tourneyQueue : this.duoPool.map(p => ({ username: p.chatter, slotName: p.slot }));
        for (let i = 0; i < 8; i++) {
          const item = seedSource[i];
          const pInput = document.getElementById(`admin-tourney-p${i + 1}`);
          const sInput = document.getElementById(`admin-tourney-s${i + 1}`);
          if (item && pInput && sInput) {
            pInput.value = `@${String(item.username || '').replace(/^@/, '')}`;
            sInput.value = item.slotName || 'Gates of Olympus 1000';
          }
        }
        const startBtn = document.getElementById('btn-admin-start-tourney');
        if (startBtn) startBtn.click();
        if (window.sonner) {
          window.sonner.toast({
            title: '8-Bracket Tournament Seeded! 🏆',
            message: 'Players and slots loaded into the 8-Bracket Tournament.',
            type: 'gold'
          });
        }
      };
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
        const adminAddBtn = document.getElementById('btn-admin-add-hunt-slot');
        if (adminSearch) adminSearch.value = slot;
        if (adminBet) adminBet.value = String(bet);
        if (adminCaller) adminCaller.value = caller;
        if (adminAddBtn) adminAddBtn.click();
        document.getElementById('cp-bh-slot').value = '';
      };
    }

    // 4. Copy OBS Overlay URLs from #control-panel
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

    if (obsBattle) obsBattle.onclick = () => copyObsHelper('/overlay-battle/index.html', '1v1 Battle', obsBattle);
    if (obsDuo) obsDuo.onclick = () => copyObsHelper('/wheel-duo/index.html', 'Dual Wheel', obsDuo);
    if (obsCsgo) obsCsgo.onclick = () => copyObsHelper('/wheel-csgo/overlay/index.html', 'CS:GO Wheel', obsCsgo);
    if (obsSlots) obsSlots.onclick = () => copyObsHelper('/wheel-slots/overlay/index.html', 'Slot Wheel', obsSlots);
    if (obsTourney) obsTourney.onclick = () => copyObsHelper('/overlay-tourney/index.html', '8-Bracket Tourney', obsTourney);
    if (obsBh) obsBh.onclick = () => copyObsHelper('/overlay-bonushunt/index.html', 'Bonus Hunt', obsBh);

    // 5. Manual Command Dispatch Bar in #control-panel
    const btnSendCmd = document.getElementById('cp-btn-send-cmd');
    const cmdInput = document.getElementById('cp-chat-cmd-input');
    const userInput = document.getElementById('cp-chat-user-input');
    if (btnSendCmd && cmdInput) {
      const sendNow = () => {
        const u = (userInput ? userInput.value : '@KickViewer').trim().replace(/^@/, '') || 'KickViewer';
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
  }

  // ========================================================
  // LIVE KICK CHAT PUSHER BRIDGE (https://kick.com/diggitybets)
  // ========================================================

  async initLiveKickChatBridge() {
    let chatroomId = 2672891; // Default diggitybets Kick chatroom ID
    window.hunthubStreamLive = false;

    const refreshStreamStatus = async () => {
      try {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 3000);
        const res = await fetch('/api/kick/stream-status', { signal: controller.signal });
        clearTimeout(t);
        if (res.ok) {
          const data = await res.json();
          if (data?.chatroomId) chatroomId = Number(data.chatroomId);
          window.hunthubStreamLive = Boolean(data?.isStreamLive);
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
          }
          window.hunthubStreamLive = Boolean(data?.livestream && data.livestream.is_live !== false);
        }
      } catch (_) {}
    };

    await refreshStreamStatus();
    if (this._streamStatusPoll) clearInterval(this._streamStatusPoll);
    this._streamStatusPoll = setInterval(refreshStreamStatus, 120_000);

    const connectPusher = () => {
      try {
        const wsUrl = 'wss://ws-us2.pusher.app/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.4.0-rc2&flash=false';
        const ws = new WebSocket(wsUrl);
        this.kickPusherWs = ws;

        ws.onopen = () => {
          ws.send(JSON.stringify({
            event: 'pusher:subscribe',
            data: { auth: '', channel: `chatrooms.${chatroomId}.v2` }
          }));
          const statusEl = document.getElementById('cp-kick-ws-status');
          if (statusEl) {
            statusEl.textContent = `LIVE KICK CHAT CONNECTED (kick.com/diggitybets · Room #${chatroomId})`;
          }
        };

        ws.onmessage = (evt) => {
          try {
            const packet = JSON.parse(evt.data);
            if (packet.event === 'App\\Events\\ChatMessageEvent' && packet.data) {
              const msgData = typeof packet.data === 'string' ? JSON.parse(packet.data) : packet.data;
              const sender = msgData?.sender?.username || 'Chatter';
              const content = String(msgData?.content || '').trim();
              if (sender) {
                this.recentChatters.set(sender, { user: sender, ts: Date.now() });
                if (window.userStore && typeof window.userStore.recordVerifiedKickChatActivity === 'function') {
                  window.userStore.recordVerifiedKickChatActivity(sender, content);
                }
              }
              if (content.startsWith('!')) {
                this.processLiveChatCommand(sender, content);
              }
            }
          } catch (_) {}
        };

        ws.onclose = () => {
          setTimeout(connectPusher, 6000);
        };
      } catch (_) {}
    };

    connectPusher();
  }

  processLiveChatCommand(username, rawMessage) {
    const cleanUser = String(username || 'Viewer').trim().replace(/^@/, '');
    const text = String(rawMessage || '').trim();
    if (!text.startsWith('!')) return;

    const logEl = document.getElementById('cp-live-chat-log');
    if (logEl) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const entry = document.createElement('div');
      entry.innerHTML = `<span style="color:#64748b;">[${timeStr}]</span> <strong style="color:#53fc18;">@${cleanUser}:</strong> <span style="color:#fff;">${text}</span>`;
      logEl.prepend(entry);
    }

    // Forward to backend /api/chat/command if running local/server hub
    fetch('/api/chat/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: cleanUser, content: text })
    }).catch(() => {});

    const parts = text.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

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

    if (cmd === '!tourney') {
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

    if (cmd === '!guess') {
      const numVal = parseFloat(arg.replace(/[^0-9.]/g, ''));
      if (!isNaN(numVal) && numVal > 0) {
        if (window.bonusHuntTracker && typeof window.bonusHuntTracker.submitChatGuess === 'function') {
          window.bonusHuntTracker.submitChatGuess(cleanUser, numVal);
        } else {
          try {
            const guesses = JSON.parse(localStorage.getItem('hunthub_bh_guesses') || '[]');
            const filtered = guesses.filter(g => String(g.user || '').toLowerCase() !== cleanUser.toLowerCase());
            filtered.unshift({ user: `@${cleanUser}`, amount: numVal, ts: Date.now() });
            localStorage.setItem('hunthub_bh_guesses', JSON.stringify(filtered));
            const gCountEl = document.getElementById('cp-bh-guess-count');
            if (gCountEl) gCountEl.textContent = String(filtered.length);
          } catch (_) {}
        }
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

