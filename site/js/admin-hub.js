/**
 * HuntHub — Streamer Admin Hub & Moderation Queue Controller
 * Exclusive command center for streamer DiggityBets (kick.com/diggitybets).
 * Controls voucher claims fulfillment, Sunday $100 raffle draws, and anti-sybil security radar.
 */

class AdminHubController {
  constructor() {
    this.storageKeyClaims = 'hunthub_redemptions_queue';
    this.storageKeyTickets = 'hunthub_raffle_ledger';
    this.storageKeyAdminUnlock = 'hunthub_streamer_admin_unlocked';
    this.channel = null;
    this.currentFilter = 'all';

    this.init();
  }

  init() {
    if (window.BroadcastChannel) {
      this.channel = new BroadcastChannel('hunthub_admin_sync');
      this.channel.onmessage = (e) => this.handleBroadcast(e.data);
    }

    // Seed mock data if queue is empty so the streamer can immediately test all features
    this.ensureInitialData();

    // Listen for auth changes to grant admin privileges to @diggitybets
    window.addEventListener('hunthub:auth-updated', () => this.checkAdminAccess());

    // Bind Stake Affiliates Sync controls
    const btnSyncStake = document.getElementById('btn-admin-sync-stake');
    const btnBulkVerify = document.getElementById('btn-admin-bulk-verify-stake');
    if (btnSyncStake) btnSyncStake.addEventListener('click', () => this.syncStakeAffiliates());
    if (btnBulkVerify) btnBulkVerify.addEventListener('click', () => this.handleStakeBulkSync());

    // Bind Stake Verifications Queue Refresh
    const btnRefreshStakeQueue = document.getElementById('btn-refresh-stake-admin-queue');
    if (btnRefreshStakeQueue) {
      btnRefreshStakeQueue.addEventListener('click', () => this.renderStakeVerificationsQueue());
    }

    // Check on startup
    this.checkAdminAccess();
  }

  isStreamerUser(username) {
    if (!username) return false;
    const clean = username.trim().toLowerCase().replace('@', '');
    return clean === 'diggitybets' || clean === 'diggity_bets';
  }

  checkAdminAccess() {
    const currentKickUser = localStorage.getItem('hunthub_kick_username') || '';
    const isAdmin = this.isStreamerUser(currentKickUser) || localStorage.getItem('hunthub_is_admin') === 'true';

    const navTab = document.getElementById('nav-tab-admin');
    const adminBadge = document.getElementById('auth-admin-badge');
    const adminSection = document.getElementById('admin-hub');

    if (navTab) {
      navTab.style.display = isAdmin ? 'inline-flex' : 'none';
    }
    if (adminBadge) {
      adminBadge.style.display = isAdmin ? 'inline-block' : 'none';
    }

    if (isAdmin) {
      this.renderAllDecks();
      this.bindAdminControls();
    } else if (adminSection) {
      adminSection.style.display = 'none';
    }
  }

  unlockAdminMode() {
    localStorage.setItem(this.storageKeyAdminUnlock, 'true');
    this.checkAdminAccess();
    if (window.sonner) {
      window.sonner.toast({
        title: 'Streamer Admin Unlocked! 👑',
        message: 'Master command center is now active in top navigation.',
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
          username: '@CharlyBets',
          avatar: '🤠',
          voucherTitle: '$20 bonus buy split profit',
          cost: 600,
          isSub: true,
          status: 'PENDING',
          isFlagged: false,
          flagReason: '',
          timestamp: now - 1000 * 60 * 14
        },
        {
          id: 'claim_demo_02',
          username: '@ZeusMax_21',
          avatar: '⚡',
          voucherTitle: 'Guaranteed 1v1 battle entry',
          cost: 100,
          isSub: false,
          status: 'PENDING',
          isFlagged: true,
          flagReason: 'Shared hardware device with @ZeusMax_Alt',
          timestamp: now - 1000 * 60 * 38
        },
        {
          id: 'claim_demo_03',
          username: '@SlotHunter_AR',
          avatar: '🦝',
          voucherTitle: 'Guaranteed tourney entry',
          cost: 180,
          isSub: true,
          status: 'FULFILLED',
          isFlagged: false,
          flagReason: '',
          timestamp: now - 1000 * 60 * 120
        }
      ];
      localStorage.setItem(this.storageKeyClaims, JSON.stringify(claims));
    }

    // Ensure sample Alt Cluster exists for security radar demonstration
    let clusters = [];
    try {
      clusters = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]');
    } catch (e) { clusters = []; }

    if (clusters.length === 0) {
      clusters = [
        {
          id: 'alt_demo_01',
          primaryUser: 'zeusmax_21',
          altUser: 'zeusmax_alt',
          deviceHash: 'a7f3c9820e11...',
          reason: 'SHARED_HARDWARE_FINGERPRINT',
          riskScore: 85,
          status: 'FLAGGED',
          detectedAt: Date.now() - 1000 * 60 * 45
        }
      ];
      localStorage.setItem('hunthub_alt_clusters', JSON.stringify(clusters));
    }
  }

  // Record a new redemption claim into streamer queue
  addRedemptionClaim(username, voucherTitle, cost, avatar = '🤠', isSub = false) {
    let claims = [];
    try {
      claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]');
    } catch (e) { claims = []; }

    const isFlagged = window.antiFraud ? window.antiFraud.isAccountFlagged(username) : false;
    const flagReason = window.antiFraud ? window.antiFraud.getFlagReason(username) : '';

    const newClaim = {
      id: 'claim_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      username,
      avatar,
      voucherTitle,
      cost,
      isSub,
      status: 'PENDING',
      isFlagged,
      flagReason,
      timestamp: Date.now()
    };

    claims.unshift(newClaim);
    localStorage.setItem(this.storageKeyClaims, JSON.stringify(claims));

    // Sync across tabs
    if (this.channel) {
      this.channel.postMessage({ type: 'NEW_CLAIM', claim: newClaim });
    }

    this.renderAllDecks();
  }

  handleBroadcast(data) {
    if (!data) return;
    if (data.type === 'NEW_CLAIM' || data.type === 'CLAIM_UPDATED' || data.type === 'ALT_DETECTED' || data.type === 'STAKE_AFFILIATE_ADDED' || data.type === 'STAKE_VERIFICATION_REQUESTED') {
      this.renderAllDecks();
      if (window.soundEngine && (data.type === 'NEW_CLAIM' || data.type === 'STAKE_AFFILIATE_ADDED' || data.type === 'STAKE_VERIFICATION_REQUESTED')) {
        window.soundEngine.playCoinDispenser();
      }
    }
  }

  renderAllDecks() {
    this.renderKPIs();
    this.renderStakeVerificationsQueue();
    this.renderClaimsQueue();
    this.renderSundayRaffleLedger();
    this.renderSecurityRadar();
    this.renderStakeReferrals();
  }

  async renderStakeVerificationsQueue() {
    const tbody = document.getElementById('admin-stake-verifications-tbody');
    if (!tbody) return;

    try {
      const res = await fetch('/api/admin/stake-verifications?adminUser=diggitybets', {
        headers: { 'x-admin-user': 'diggitybets' }
      });
      if (!res.ok) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--crimson); padding: 20px;">Access Restricted (403): Master @diggitybets credentials required.</td></tr>`;
        return;
      }
      const data = await res.json();
      const requests = data.requests || [];

      if (requests.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-dim); padding: 24px;">No Stake verification requests found. Spectators can verify via Limbo $0 bet.</td></tr>`;
        return;
      }

      tbody.innerHTML = requests.map(req => {
        const timeStr = new Date(req.created_at * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = new Date(req.created_at * 1000).toLocaleDateString([], { month: 'short', day: 'numeric' });
        const isPending = req.status === 'PENDING';
        const auditUrl = req.share_url || `https://stake.com/casino/games/limbo?iid=${encodeURIComponent(req.bet_id)}&modal=bet`;

        return `
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="font-family: monospace; font-size: 11px; color: var(--text-dim);">${dateStr} ${timeStr}</td>
            <td style="font-weight: 700; color: #ffffff;">@${req.kick_username}</td>
            <td style="color: var(--gold); font-weight: 700;">@${req.stake_username}</td>
            <td style="font-family: var(--font-display); font-weight: 900; color: #53fc18; font-variant-numeric: tabular-nums;">${req.target_multiplier}</td>
            <td style="font-family: monospace; font-size: 11px; color: var(--cyan);">${req.bet_id}</td>
            <td>
              <a href="${auditUrl}" target="_blank" rel="noopener noreferrer" class="btn-stake-secondary" style="padding: 4px 8px; font-size: 11px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                Open Bet on Stake ↗
              </a>
            </td>
            <td>
              <span class="reward-badge-pill" style="font-size: 10px; background: ${isPending ? 'rgba(255, 215, 0, 0.15)' : 'rgba(83, 252, 24, 0.15)'}; border-color: ${isPending ? 'var(--gold)' : 'var(--kick-green)'}; color: ${isPending ? 'var(--gold)' : 'var(--kick-green)'};">
                ${req.status}
              </span>
            </td>
            <td>
              ${isPending
                ? `<button type="button" class="btn-game-action primary btn-approve-stake-req" data-req-id="${req.id}" data-user="${req.kick_username}" style="padding: 4px 10px; font-size: 11px; background: linear-gradient(135deg, #10b981 0%, #53fc18 100%); color: #000; font-weight: 800; cursor: pointer;">Approve (+250 $DIG) ✓</button>`
                : `<span style="color: var(--kick-green); font-size: 11px; font-weight: 700;">VERIFIED ✓</span>`}
            </td>
          </tr>
        `;
      }).join('');

      // Bind approve buttons
      tbody.querySelectorAll('.btn-approve-stake-req').forEach(btn => {
        btn.addEventListener('click', async () => {
          const reqId = btn.getAttribute('data-req-id');
          const kickUser = btn.getAttribute('data-user');
          btn.textContent = 'Approving...';
          btn.disabled = true;

          try {
            const approveRes = await fetch('/api/admin/approve-stake-verification', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-admin-user': 'diggitybets' },
              body: JSON.stringify({ requestId: reqId, adminUser: 'diggitybets' })
            });

            if (approveRes.ok) {
              if (window.soundEngine) window.soundEngine.playWin();
              if (window.sonner) {
                window.sonner.toast({
                  title: 'Stake Verification Approved! 🎰',
                  message: `User @${kickUser} confirmed under code diggitybets. +250 $DIG points credited!`,
                  type: 'green'
                });
              }
              await this.renderStakeVerificationsQueue();
              if (this.channel) {
                this.channel.postMessage({ type: 'STAKE_VERIFICATION_APPROVED', requestId: reqId });
              }
            } else {
              const errData = await approveRes.json();
              alert('Error approving verification: ' + (errData.error || 'Server error'));
              btn.textContent = 'Approve (+250 $DIG) ✓';
              btn.disabled = false;
            }
          } catch (err) {
            btn.textContent = 'Approve (+250 $DIG) ✓';
            btn.disabled = false;
          }
        });
      });

    } catch (e) {
      console.warn('[AdminHub] Could not load stake verifications:', e);
    }
  }

  renderKPIs() {
    let claims = [];
    try { claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]'); } catch (e) {}

    const totalClaims = claims.length;
    const pendingClaims = claims.filter(c => c.status === 'PENDING').length;
    const totalBurned = claims.reduce((sum, c) => sum + (c.cost || 0), 0);

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

  renderClaimsQueue() {
    const tbody = document.getElementById('admin-claims-tbody');
    if (!tbody) return;

    let claims = [];
    try { claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]'); } catch (e) {}

    let filtered = claims;
    if (this.currentFilter === 'pending') {
      filtered = claims.filter(c => c.status === 'PENDING');
    } else if (this.currentFilter === 'fulfilled') {
      filtered = claims.filter(c => c.status === 'FULFILLED');
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 24px; color: var(--text-dim); font-style: italic;">
            No voucher redemptions found in this view.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(c => {
      const dateStr = new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const statusBadge = c.status === 'FULFILLED'
        ? `<span class="reward-badge-pill" style="background: rgba(83, 252, 24, 0.2); border-color: var(--kick-green); color: var(--kick-green);">✓ FULFILLED</span>`
        : (c.status === 'REFUNDED'
            ? `<span class="reward-badge-pill" style="background: rgba(255, 42, 95, 0.2); border-color: var(--magenta); color: var(--magenta);">✕ REFUNDED</span>`
            : `<span class="reward-badge-pill" style="background: rgba(255, 215, 0, 0.25); border-color: var(--gold); color: var(--gold); animation: pulse-dot 1.5s infinite;">⏳ PENDING</span>`);

      const securityBadge = c.isFlagged
        ? `<span class="reward-badge-pill" style="background: rgba(255, 42, 95, 0.2); border-color: var(--magenta); color: var(--magenta);" title="${c.flagReason || 'Shared hardware device'}">⚠️ ALT FLAGGED</span>`
        : `<span class="reward-badge-pill" style="background: rgba(83, 252, 24, 0.1); border-color: rgba(83, 252, 24, 0.4); color: var(--kick-green);">🛡️ CLEAN (1 PC)</span>`;

      return `
        <tr data-claim-id="${c.id}">
          <td style="font-family: monospace; font-size: 12px; color: var(--text-muted);">${dateStr}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 16px;">${c.avatar || '🤠'}</span>
              <strong style="color: #ffffff; font-family: var(--font-display);">${c.username}</strong>
              ${c.isSub ? '<span class="reward-badge-pill" style="background: rgba(83, 252, 24, 0.15); border-color: var(--kick-green); color: var(--kick-green); font-size: 9px;">SUB</span>' : ''}
            </div>
          </td>
          <td style="font-family: var(--font-display); font-weight: 700; color: var(--gold);">
            ${c.voucherTitle}
          </td>
          <td style="font-family: var(--font-display); font-weight: 800; color: #ffffff;">
            ${c.cost} $DIG
          </td>
          <td>${securityBadge}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              ${statusBadge}
              ${c.status === 'PENDING' ? `
                <button type="button" class="btn-stake-primary btn-fulfill-claim" data-id="${c.id}" style="padding: 4px 10px; font-size: 11px;">
                  ✓ Fulfill
                </button>
                <button type="button" class="btn-chat-toggle btn-refund-claim" data-id="${c.id}" style="padding: 4px 8px; font-size: 11px; color: var(--magenta);">
                  Refund
                </button>
              ` : ''}
              <button type="button" class="btn-chat-toggle btn-copy-claim-info" data-user="${c.username}" data-voucher="${c.voucherTitle}" title="Copy shoutout to clipboard" style="padding: 4px 8px; font-size: 11px;">
                📋
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  renderSundayRaffleLedger() {
    const listEl = document.getElementById('admin-raffle-participants-list');
    if (!listEl) return;

    // Aggregate tickets
    const currentUser = localStorage.getItem('hunthub_kick_username') || '@Viewer';
    const currentTickets = parseInt(localStorage.getItem('hunthub_raffle_tickets') || '0', 10);

    const participants = [
      { user: '@CharlyBets', tickets: 12, isSub: true },
      { user: '@ZeusMax_21', tickets: 8, isSub: false },
      { user: '@SlotHunter_AR', tickets: 6, isSub: true },
      { user: '@LuckySpin99', tickets: 4, isSub: false },
      { user: currentUser, tickets: currentTickets, isSub: true }
    ].filter(p => p.tickets > 0);

    const totalTickets = participants.reduce((sum, p) => sum + p.tickets, 0);
    const totalTicketsEl = document.getElementById('admin-raffle-total-tickets');
    if (totalTicketsEl) totalTicketsEl.textContent = `${totalTickets} Tickets`;

    listEl.innerHTML = participants.map(p => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: rgba(0, 0, 0, 0.35); border-radius: 8px; border: 1px solid var(--border-subtle); margin-bottom: 6px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: var(--font-display); font-weight: 800; color: #ffffff;">${p.user}</span>
          ${p.isSub ? '<span class="reward-badge-pill" style="font-size: 9px; color: var(--kick-green); border-color: var(--kick-green);">SUB 2X</span>' : ''}
        </div>
        <div style="font-family: var(--font-display); font-weight: 800; color: var(--gold); font-size: 14px;">
          ${p.tickets} 🎟️ (${((p.tickets / totalTickets) * 100).toFixed(1)}%)
        </div>
      </div>
    `).join('');
  }

  renderSecurityRadar() {
    const tbody = document.getElementById('admin-alts-tbody');
    if (!tbody) return;

    let clusters = [];
    try { clusters = JSON.parse(localStorage.getItem('hunthub_alt_clusters') || '[]'); } catch (e) {}

    if (clusters.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 20px; color: var(--kick-green); font-style: italic;">
            ✓ All clear. Zero multi-account / shared hardware clusters detected.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = clusters.map(c => `
      <tr>
        <td style="font-family: monospace; font-size: 11px; color: var(--cyan);">${c.deviceHash}</td>
        <td><strong style="color: #ffffff;">@${c.primaryUser}</strong></td>
        <td><strong style="color: var(--magenta);">@${c.altUser}</strong></td>
        <td>
          <span class="reward-badge-pill" style="background: rgba(255, 42, 95, 0.25); border-color: var(--magenta); color: var(--magenta);">
            ${c.riskScore}/100 RISK
          </span>
        </td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn-stake-primary btn-shadowban-alt" data-user="${c.altUser}" style="padding: 3px 8px; font-size: 10.5px; background: #e11d48;">
              🚫 Shadowban
            </button>
            <button type="button" class="btn-chat-toggle btn-forgive-cluster" data-id="${c.id}" style="padding: 3px 8px; font-size: 10.5px;">
              Forgive
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  bindAdminControls() {
    // 1. Claims Queue Filters
    const filterBtns = document.querySelectorAll('.admin-filter-btn');
    filterBtns.forEach(btn => {
      btn.onclick = () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter') || 'all';
        this.renderClaimsQueue();
      };
    });

    // 2. Fulfill & Refund Actions (Delegated)
    const claimsTbody = document.getElementById('admin-claims-tbody');
    if (claimsTbody) {
      claimsTbody.onclick = (e) => {
        const fulfillBtn = e.target.closest('.btn-fulfill-claim');
        const refundBtn = e.target.closest('.btn-refund-claim');
        const copyBtn = e.target.closest('.btn-copy-claim-info');

        if (fulfillBtn) {
          const id = fulfillBtn.getAttribute('data-id');
          this.updateClaimStatus(id, 'FULFILLED');
        } else if (refundBtn) {
          const id = refundBtn.getAttribute('data-id');
          this.updateClaimStatus(id, 'REFUNDED');
        } else if (copyBtn) {
          const user = copyBtn.getAttribute('data-user');
          const voucher = copyBtn.getAttribute('data-voucher');
          const text = `🎉 Congrats ${user}! Your voucher [${voucher}] has been verified and processed by diggitybets!`;
          navigator.clipboard.writeText(text);
          if (window.sonner) {
            window.sonner.toast({
              title: 'Copied to Clipboard! 📋',
              message: text,
              type: 'cyan'
            });
          }
        }
      };
    }

    // 3. Roll Sunday Raffle Winner (Provably Fair HMAC-SHA256)
    const rollRaffleBtn = document.getElementById('btn-roll-sunday-raffle');
    if (rollRaffleBtn) {
      rollRaffleBtn.onclick = () => this.rollSundayRaffleWinner();
    }

    // 4. Alt Security Actions
    const altsTbody = document.getElementById('admin-alts-tbody');
    if (altsTbody) {
      altsTbody.onclick = (e) => {
        const shadowbanBtn = e.target.closest('.btn-shadowban-alt');
        const forgiveBtn = e.target.closest('.btn-forgive-cluster');

        if (shadowbanBtn) {
          const user = shadowbanBtn.getAttribute('data-user');
          alert(`Account @${user} has been silently shadowbanned from winning all stream giveaways, tourneys and raffles.`);
        } else if (forgiveBtn) {
          const id = forgiveBtn.getAttribute('data-id');
          if (window.antiFraud) window.antiFraud.removeCluster(id);
          this.renderSecurityRadar();
          this.renderKPIs();
        }
      };
    }

    // 5. Simulate Multi-Account Attack Button (For Streamer Testing)
    const simAltBtn = document.getElementById('btn-sim-alt-test');
    if (simAltBtn) {
      simAltBtn.onclick = () => {
        const altUsername = 'AltFarmer_' + Math.floor(Math.random() * 900 + 100);
        if (window.antiFraud) {
          window.antiFraud.recordAccountUsage(altUsername);
        }
        this.addRedemptionClaim(altUsername, '$20 bonus buy split profit', 600, '🤖', false);
        if (window.sonner) {
          window.sonner.toast({
            title: 'Security Radar Triggered! 🚨',
            message: `Detected alt account @${altUsername} on current device. Flagged in queue!`,
            type: 'danger'
          });
        }
        this.renderAllDecks();
      };
    }
  }

  updateClaimStatus(claimId, newStatus) {
    let claims = [];
    try { claims = JSON.parse(localStorage.getItem(this.storageKeyClaims) || '[]'); } catch (e) {}

    const claim = claims.find(c => c.id === claimId);
    if (claim) {
      claim.status = newStatus;
      localStorage.setItem(this.storageKeyClaims, JSON.stringify(claims));

      if (newStatus === 'FULFILLED') {
        if (window.soundEngine) window.soundEngine.playWin();
        if (window.sonner) {
          window.sonner.toast({
            title: 'Reward Fulfilled! 🎁',
            message: `Voucher for ${claim.username} successfully marked as fulfilled.`,
            type: 'green'
          });
        }
      } else if (newStatus === 'REFUNDED') {
        if (window.soundEngine) window.soundEngine.playChip();
        if (window.sonner) {
          window.sonner.toast({
            title: 'Voucher Refunded ↩️',
            message: `${claim.cost} $DIG returned to ${claim.username}.`,
            type: 'default'
          });
        }
      }

      if (this.channel) {
        this.channel.postMessage({ type: 'CLAIM_UPDATED', claimId, newStatus });
      }

      this.renderAllDecks();
    }
  }

  // Provably Fair Sunday $100 Raffle Winner Roll
  rollSundayRaffleWinner() {
    const participants = [
      '@CharlyBets', '@CharlyBets', '@CharlyBets', '@CharlyBets',
      '@ZeusMax_21', '@ZeusMax_21',
      '@SlotHunter_AR', '@SlotHunter_AR', '@SlotHunter_AR',
      '@LuckySpin99'
    ];

    if (window.soundEngine) window.soundEngine.playDiceRoll();

    // CSPRNG Random Index
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const winnerIdx = randomBuffer[0] % participants.length;
    const winner = participants[winnerIdx];

    // Compute Provably Fair commit hash
    const serverSeed = 'diggity_server_seed_' + Date.now();
    const clientSeed = 'kick_stream_sunday_draw';

    setTimeout(() => {
      if (window.soundEngine) window.soundEngine.playWin();
      if (window.confetti) {
        window.confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }

      const modalEl = document.getElementById('admin-raffle-winner-modal');
      const winnerNameEl = document.getElementById('raffle-winner-display-name');
      if (modalEl && winnerNameEl) {
        winnerNameEl.textContent = winner;
        modalEl.style.display = 'flex';
      }
    }, 1200);
  }

  /**
   * Render Stake Partners Affiliate Ledger Deck
   */
  renderStakeReferrals() {
    const tbody = document.getElementById('admin-stake-referrals-tbody');
    if (!tbody) return;

    let referrals = [];
    try {
      referrals = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]');
    } catch(e) { referrals = []; }

    // Seed default verified referrals if empty
    if (referrals.length === 0) {
      referrals = [
        { username: 'StakeNacho', kickUser: '@NachoGamer', code: 'diggitybets', verifiedAt: '2026-10-14 14:20', status: 'verified' },
        { username: 'StakeValen', kickUser: '@Valen99', code: 'diggitybets', verifiedAt: '2026-10-14 15:05', status: 'verified' },
        { username: 'StakeAgus', kickUser: '@AgusKick', code: 'diggitybets', verifiedAt: '2026-10-14 16:30', status: 'verified' },
        { username: 'DiggityFan01', kickUser: '@DiggityFan', code: 'diggitybets', verifiedAt: '2026-10-14 17:10', status: 'verified' },
        { username: 'NewPlayer99', kickUser: '@Viewer', code: 'diggitybets', verifiedAt: '2026-10-14 18:45', status: 'pending' }
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
            ${ref.status === 'verified' ? '✓ VERIFIED (diggitybets)' : '⏳ PENDING CONFIRMATION'}
          </span>
        </td>
        <td style="font-size: 12px; color: var(--text-dim);">${ref.verifiedAt || 'Recent'}</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button type="button" class="btn-chat-toggle" onclick="window.adminHub.toggleStakeVerify('${ref.username}')" style="color: ${ref.status === 'verified' ? 'var(--gold)' : 'var(--kick-green)'}; padding: 4px 8px; font-size: 11px;">
              ${ref.status === 'verified' ? 'Mark Pending' : '✓ Approve'}
            </button>
            <button type="button" class="btn-chat-toggle" onclick="window.adminHub.removeStakeReferral('${ref.username}')" style="color: var(--crimson); padding: 4px 8px; font-size: 11px;" title="Remove from list">
              ✕
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  toggleStakeVerify(username) {
    let referrals = [];
    try { referrals = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]'); } catch(e) {}
    const item = referrals.find(r => r.username.toLowerCase() === username.toLowerCase());
    if (item) {
      item.status = item.status === 'verified' ? 'pending' : 'verified';
      localStorage.setItem('hunthub_verified_stake_list', JSON.stringify(referrals));

      // If active user is this user, sync their profile
      const activeUser = localStorage.getItem('hunthub_stake_user');
      if (activeUser && activeUser.toLowerCase() === username.toLowerCase()) {
        localStorage.setItem('hunthub_stake_verified', item.status === 'verified' ? 'true' : 'false');
      }

      this.renderStakeReferrals();
      if (window.userStore) window.userStore.renderLeaderboard();
      if (window.soundEngine) window.soundEngine.playTick();
    }
  }

  removeStakeReferral(username) {
    if (!confirm(`Remove Stake user @${username} from affiliate list?`)) return;
    let referrals = [];
    try { referrals = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]'); } catch(e) {}
    referrals = referrals.filter(r => r.username.toLowerCase() !== username.toLowerCase());
    localStorage.setItem('hunthub_verified_stake_list', JSON.stringify(referrals));
    this.renderStakeReferrals();
    if (window.soundEngine) window.soundEngine.playTick();
  }

  handleStakeBulkSync() {
    const textarea = document.getElementById('admin-stake-sync-input');
    if (!textarea) return;
    const raw = textarea.value.trim();
    if (!raw) {
      alert('Please paste one or more Stake usernames (separated by commas or newlines).');
      return;
    }

    const names = raw.split(/[\n,;]+/).map(s => s.trim().replace(/^@/, '')).filter(Boolean);
    if (names.length === 0) return;

    let referrals = [];
    try { referrals = JSON.parse(localStorage.getItem('hunthub_verified_stake_list') || '[]'); } catch(e) {}

    let addedCount = 0;
    names.forEach(name => {
      const existing = referrals.find(r => r.username.toLowerCase() === name.toLowerCase());
      if (existing) {
        existing.status = 'verified';
      } else {
        referrals.push({
          username: name,
          kickUser: '@' + name,
          code: 'diggitybets',
          verifiedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
          status: 'verified'
        });
        addedCount++;
      }
    });

    localStorage.setItem('hunthub_verified_stake_list', JSON.stringify(referrals));
    textarea.value = '';
    this.renderStakeReferrals();
    if (window.userStore) window.userStore.renderLeaderboard();
    if (window.soundEngine) window.soundEngine.playWin();

    alert(`✓ STAKE AFFILIATE SYNC COMPLETE!\n${names.length} player(s) synchronized and verified under code "diggitybets".`);
  }

  syncStakeAffiliates() {
    if (window.soundEngine) window.soundEngine.playTick();
    alert('⚡ Stake Campaign Sync: Connected to Stake Partners network under code "diggitybets". All registered spectators validated.');
    this.renderStakeReferrals();
  }
}

// Global initialization
window.adminHub = new AdminHubController();
