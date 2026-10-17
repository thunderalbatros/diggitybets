/**
 * HuntHub — User Profile, Stake Bet ID TOTP Verifier, Discord Linker & Leaderboard
 * 100% English, zero dependencies, client-side cryptographic challenge.
 */

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

    // Discord Linking
    this.discordLinked = localStorage.getItem('hunthub_discord_linked') === 'true';
    this.discordTag = localStorage.getItem('hunthub_discord_tag') || '';

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

    // Leaderboard Participants Data (100% Stake Affiliates under code diggitybets)
    this.leaderboardData = [
      { rank: 1, casinoUser: 'GS8***', kickUser: '@GamerStake88', wager: 68450.00, prize: 1200, avatar: '👑', verified: true },
      { rank: 2, casinoUser: 'StakeNacho', kickUser: '@NachoGamer', wager: 34120.50, prize: 500, avatar: '🦝', verified: true },
      { rank: 3, casinoUser: 'ZeusMax', kickUser: '@SlotKing21', wager: 22890.00, prize: 300, avatar: '⚡', verified: true },
      { rank: 4, casinoUser: 'StakeValen', kickUser: '@Valen99', wager: 14750.25, prize: 0, avatar: '🍭', verified: true },
      { rank: 5, casinoUser: 'HunterPro', kickUser: '@StakeHunter', wager: 9810.00, prize: 0, avatar: '🤠', verified: true },
      { rank: 6, casinoUser: 'CryptoAce', kickUser: '@CryptoSpin', wager: 6420.00, prize: 0, avatar: '💀', verified: true },
      { rank: 7, casinoUser: 'StakeAgus', kickUser: '@AgusKick', wager: 4100.00, prize: 0, avatar: '🪙', verified: true },
      { rank: 8, casinoUser: 'DiggityFan01', kickUser: '@DiggityFan', wager: 2550.00, prize: 0, avatar: '🤠', verified: true }
    ];
  }

  init() {
    this.initStoreStockState();
    this.updateUserUI();
    this.bindAuthButtons();
    this.bindProfileControls();
    this.bindStakeTotpVerification();
    this.bindDiscordLinking();
    this.bindStoreRedemptions();
    this.renderLeaderboard();
    this.startTotpTimer();
    this.startWatchHeartbeat();
    this.syncStoreStockFromServer();
  }

  updateUserUI() {
    const authGuestEl = document.getElementById('auth-guest-panel');
    const authUserEl = document.getElementById('auth-user-panel');
    const userLabelEl = document.getElementById('auth-username-label');
    const subBadgeEl = document.getElementById('auth-sub-badge');

    if (this.isLoggedIn) {
      if (authGuestEl) authGuestEl.style.display = 'none';
      if (authUserEl) authUserEl.style.display = 'flex';
      if (userLabelEl) userLabelEl.textContent = this.username;
      if (subBadgeEl) {
        subBadgeEl.style.display = this.isSub ? 'inline-block' : 'none';
        subBadgeEl.textContent = this.isSub ? 'SUB (2X)' : '';
      }
    } else {
      if (authGuestEl) authGuestEl.style.display = 'flex';
      if (authUserEl) authUserEl.style.display = 'none';
    }

    // Update avatar displays
    this.updateAvatarUI();

    // Populate profile inputs
    const elStakeUser = document.getElementById('prof-input-stake-user');
    const badgeStake = document.getElementById('prof-stake-status-badge');
    const elDiscord = document.getElementById('prof-input-discord');
    const elX = document.getElementById('prof-input-x');
    const elIg = document.getElementById('prof-input-ig');
    const elLTC = document.getElementById('prof-input-ltc');
    const elBTC = document.getElementById('prof-input-btc');
    const elETH = document.getElementById('prof-input-eth');
    const elUSDC = document.getElementById('prof-input-usdc');
    const elSOL = document.getElementById('prof-input-sol');

    if (elStakeUser) elStakeUser.value = this.stakeUsername;
    if (elDiscord) elDiscord.value = this.discordTag;
    if (elX) elX.value = this.xHandle;
    if (elIg) elIg.value = this.igHandle;
    if (elLTC) elLTC.value = this.cryptoLTC;
    if (elBTC) elBTC.value = this.cryptoBTC;
    if (elETH) elETH.value = this.cryptoETH;
    if (elUSDC) elUSDC.value = this.cryptoUSDC;
    if (elSOL) elSOL.value = this.cryptoSOL;

    const topbarVerifiedBadge = document.getElementById('auth-stake-verified-badge');
    if (topbarVerifiedBadge) {
      topbarVerifiedBadge.style.display = this.stakeVerified ? 'inline-flex' : 'none';
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

    this.updateStoreCatalogUI();

    if (this.username && window.antiFraud) {
      window.antiFraud.recordAccountUsage(this.username);
    }
    if (window.adminHub) {
      window.adminHub.checkAdminAccess();
    }

    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('hunthub:auth-updated', { detail: { username: this.username } }));
    }
  }

  updateAvatarUI() {
    const avatarEls = document.querySelectorAll('.user-avatar-display');
    avatarEls.forEach(el => {
      if (this.avatarType === 'img') {
        el.innerHTML = `<img src="${this.avatar}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">`;
      } else if (typeof window.getDeterministicAvatarSvg === 'function' && this.username) {
        el.innerHTML = window.getDeterministicAvatarSvg(this.username, 32);
      } else {
        el.textContent = this.avatar;
      }
    });
  }

  bindAuthButtons() {
    const loginBtn = document.getElementById('btn-kick-login');
    const logoutBtn = document.getElementById('btn-kick-logout');

    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        if (window.oauthEngine) {
          window.oauthEngine.loginKick();
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.username = '';
        this.isLoggedIn = false;
        localStorage.removeItem('hunthub_kick_username');
        localStorage.removeItem('hunthub_is_sub');
        this.updateUserUI();
        if (window.soundEngine) window.soundEngine.playChip();
        if (window.sonner) {
          window.sonner.toast({
            title: 'Account Unlinked',
            message: 'Your Kick account was disconnected from this browser.',
            type: 'default'
          });
        }
      });
    }
  }

  bindProfileControls() {
    // 1. Avatar Preset Buttons
    const presetBtns = document.querySelectorAll('.avatar-preset-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const emoji = btn.getAttribute('data-avatar') || '🤠';
        this.avatar = emoji;
        this.avatarType = 'emoji';
        localStorage.setItem('hunthub_avatar', this.avatar);
        localStorage.setItem('hunthub_avatar_type', 'emoji');
        this.updateAvatarUI();
        if (window.soundEngine) window.soundEngine.playTick();
      });
    });

    // 2. Custom Avatar File Upload from PC
    const fileInput = document.getElementById('prof-avatar-file-input');
    const uploadBtn = document.getElementById('btn-upload-avatar-file');
    const fileNameDisplay = document.getElementById('prof-file-name-display');

    if (uploadBtn && fileInput) {
      uploadBtn.addEventListener('click', () => fileInput.click());

      fileInput.addEventListener('change', () => {
        const file = fileInput.files && fileInput.files[0];
        if (!file) return;

        // Max 2MB limit validation
        if (file.size > 2 * 1024 * 1024) {
          alert('⚠️ The selected file exceeds the 2MB limit. Please upload an image under 2MB.');
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
          this.updateAvatarUI();
          if (window.soundEngine) window.soundEngine.playWin();
          alert('✅ Profile image uploaded and saved successfully!');
        };
        reader.readAsDataURL(file);
      });
    }

    // 3. Custom Avatar URL
    const customAvatarInput = document.getElementById('prof-avatar-url');
    const customAvatarBtn = document.getElementById('btn-apply-avatar-url');
    if (customAvatarBtn && customAvatarInput) {
      customAvatarBtn.addEventListener('click', () => {
        const url = customAvatarInput.value.trim();
        if (url) {
          this.avatar = url;
          this.avatarType = 'img';
          localStorage.setItem('hunthub_avatar', url);
          localStorage.setItem('hunthub_avatar_type', 'img');
          this.updateAvatarUI();
          if (window.soundEngine) window.soundEngine.playWin();
          alert('Custom avatar image updated successfully!');
        }
      });
    }

    // 3. Save Profile Changes
    const saveBtn = document.getElementById('profile-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', async () => {
        this.stakeUsername = (document.getElementById('prof-input-stake-user')?.value || '').trim();
        this.discordTag = (document.getElementById('prof-input-discord')?.value || '').trim();
        this.xHandle = (document.getElementById('prof-input-x')?.value || '').trim();
        this.igHandle = (document.getElementById('prof-input-ig')?.value || '').trim();
        this.cryptoLTC = (document.getElementById('prof-input-ltc')?.value || '').trim();
        this.cryptoBTC = (document.getElementById('prof-input-btc')?.value || '').trim();
        this.cryptoETH = (document.getElementById('prof-input-eth')?.value || '').trim();
        this.cryptoUSDC = (document.getElementById('prof-input-usdc')?.value || '').trim();
        this.cryptoSOL = (document.getElementById('prof-input-sol')?.value || '').trim();

        localStorage.setItem('hunthub_stake_user', this.stakeUsername);
        localStorage.setItem('hunthub_discord_tag', this.discordTag);
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
            headers: { 'Content-Type': 'application/json' },
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
        if (this.stakeVerified) {
          statusBox.style.display = 'block';
          statusBox.style.background = 'rgba(83, 252, 24, 0.12)';
          statusBox.style.border = '1px solid rgba(83, 252, 24, 0.35)';
          statusBox.style.color = '#86efac';
          statusBox.innerHTML = `<strong>✓ VERIFIED VIP:</strong> Account <strong>@${this.stakeUsername || 'VIP'}</strong> is confirmed under code <strong>DIGGITY</strong>. You receive VIP Store Discounts & Leaderboard eligibility!`;
        } else if (this.stakeUsername) {
          statusBox.style.display = 'block';
          statusBox.style.background = 'rgba(255, 215, 0, 0.12)';
          statusBox.style.border = '1px solid rgba(255, 215, 0, 0.35)';
          statusBox.style.color = '#fef08a';
          statusBox.innerHTML = `<strong>⏳ PENDING AUDIT:</strong> Stake user <strong>@${this.stakeUsername}</strong> submitted for verification under code <strong>DIGGITY</strong>. Streamer will audit bet link in Admin Deck (+250 $DIG).`;
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
              statusBox.innerHTML = `<strong>❌ VERIFICATION ERROR:</strong> ${data.error || 'Invalid bet submission'}`;
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
            statusBox.innerHTML = `<strong>✓ REQUEST SUBMITTED:</strong> Bet [<strong>${data.parsedBet?.betId || betId}</strong>] recorded for @${stakeUser} under code <strong>DIGGITY</strong>. Click "🔄 Check Status" once approved (+250 $DIG reward).`;
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
   * Discord Account Linking Integration (Synchronized with OAuthEngine)
   */
  bindDiscordLinking() {
    if (window.oauthEngine) {
      window.oauthEngine.syncDiscordUI();
    }
  }

  /**
   * Render Leaderboard ($2000 USD Monthly Prize Pool, Top 3 Podium)
   */
  renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    // If user is verified on Stake, ensure their entry is present in table
    const activeCasinoUser = this.stakeUsername;
    const isCasinoVerified = this.stakeVerified;
    if (isCasinoVerified && activeCasinoUser) {
      const exists = this.leaderboardData.some(p => (p.casinoUser || p.stakeUser || '').toLowerCase() === activeCasinoUser.toLowerCase());
      if (!exists) {
        this.leaderboardData.push({
          rank: this.leaderboardData.length + 1,
          casinoUser: activeCasinoUser,
          stakeUser: activeCasinoUser,
          kickUser: this.username || '@You',
          wager: 1250.00,
          prize: 0,
          avatar: this.avatar,
          verified: true
        });
      }
    }

    tbody.innerHTML = this.leaderboardData.map(item => `
      <tr class="leaderboard-row ${item.rank <= 3 ? `top-${item.rank}` : ''}">
        <td style="font-family: var(--font-display); font-weight: 800; font-size: 15px; color: ${item.rank === 1 ? 'var(--gold)' : (item.rank === 2 ? '#e2e8f0' : (item.rank === 3 ? '#cd7f32' : 'var(--text-muted)'))};">
          ${item.rank === 1 ? '🥇 #1' : (item.rank === 2 ? '🥈 #2' : (item.rank === 3 ? '🥉 #3' : `#${item.rank}`))}
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            ${typeof window.getDeterministicAvatarSvg === 'function' ? window.getDeterministicAvatarSvg(item.casinoUser || item.kickUser, 28) : `<span style="font-size: 18px;">${item.avatar}</span>`}
            <div>
              <strong style="color: #ffffff; font-size: 13px;">${item.casinoUser || item.stakeUser}</strong>
              <div style="font-size: 11px; color: var(--text-dim);">${item.kickUser}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="reward-badge-pill" style="background: rgba(83, 252, 24, 0.15); border-color: var(--kick-green); color: var(--kick-green); font-size: 10px;">
            ✓ VERIFIED STAKE VIP
          </span>
        </td>
        <td style="font-family: var(--font-display); font-weight: 800; color: #ffffff;">
          $${item.wager.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </td>
        <td style="font-family: var(--font-display); font-weight: 800; color: ${item.prize > 0 ? 'var(--gold)' : 'var(--text-dim)'};">
          ${item.prize > 0 ? `$${item.prize.toLocaleString()} USD` : '—'}
        </td>
      </tr>
    `).join('');
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
      bonus_split_20: 3
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

    // 1. Automatic Stake VIP Discount on $20 Bonus Buy Split Profit (1,500 -> 1,200 $DIG if stakeVerified)
    const splitCostEl = document.getElementById('bonus-split-cost-display');
    const splitBtn = document.getElementById('btn-redeem-bonus-split');
    const splitVipTag = document.getElementById('bonus-split-vip-tag');
    const effectiveSplitCost = this.stakeVerified ? 1200 : 1500;

    if (splitCostEl) {
      splitCostEl.textContent = `${effectiveSplitCost.toLocaleString()} $DIG`;
      splitCostEl.style.color = this.stakeVerified ? 'var(--kick-green)' : '';
    }
    if (splitBtn) {
      splitBtn.setAttribute('data-cost', String(effectiveSplitCost));
    }
    if (splitVipTag) {
      splitVipTag.textContent = this.stakeVerified
        ? '✓ STAKE VIP DISCOUNT ACTIVE: 1,200 $DIG (Saved 300 $DIG) · Max Split Cap $100 USD'
        : '💰 1,500 $DIG Regular · ⚡ 1,200 $DIG Stake VIP · Max Split Cap $100 USD';
    }

    // 2. Weekly Stock Pills & Button States (Resets every Monday)
    const stockLimits = {
      battle_entry: 6,
      tourney_entry: 6,
      bonus_split_20: 3
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
   * Phase 6 Watch-to-Earn Heartbeat:
   * +10 $DIG every 15 minutes (900_000 ms) in #watch for logged-in users when stream is live (max 40 $DIG/h).
   */
  startWatchHeartbeat() {
    if (this.watchHeartbeatInterval) clearInterval(this.watchHeartbeatInterval);
    this.watchHeartbeatInterval = setInterval(async () => {
      if (!this.isLoggedIn || !this.username) return;
      const watchSection = document.getElementById('watch');
      const isViewingWatch = !window.location.hash || window.location.hash === '#watch' || (watchSection && watchSection.classList.contains('active'));
      if (!isViewingWatch) return;

      try {
        const res = await fetch('/api/watch/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: this.username })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.awarded && data.amount > 0 && window.houseGames) {
            window.houseGames.adjustBalance(data.amount);
            if (window.sonner) {
              window.sonner.toast({
                title: '+10 $DIG Watch-to-Earn! 📺',
                message: 'Earned +10 $DIG for watching the live stream (15m heartbeat).',
                type: 'green'
              });
            }
          }
        }
      } catch (_) {}
    }, 900_000);
  }

  bindStoreRedemptions() {
    const storeItems = document.querySelectorAll('.btn-store-redeem');
    storeItems.forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!this.isLoggedIn) {
          alert('Please Link your Kick account first to redeem store items.');
          return;
        }

        const itemKey = btn.getAttribute('data-key') || '';
        const itemName = btn.getAttribute('data-item') || 'Store Item';
        let cost = parseInt(btn.getAttribute('data-cost') || '100', 10);

        if (itemKey === 'bonus_split_20') {
          cost = this.stakeVerified ? 1200 : 1500;
        }

        if (itemKey === 'vip_discord' && this.vipDiscordClaimed) {
          alert('LIMIT REACHED: VIP Streamer Discord Role can only be redeemed 1 time per account.');
          return;
        }

        if (itemKey === 'battle_entry' && this.battleEntryLastTs > 0 && (Date.now() - this.battleEntryLastTs < 14 * 86400 * 1000)) {
          alert('COOLDOWN ACTIVE: Guaranteed 1v1 Battle Entry has a 14-day cooldown per user.');
          return;
        }

        const stockLimits = {
          battle_entry: 6,
          tourney_entry: 6,
          bonus_split_20: 3
        };
        if (stockLimits[itemKey] !== undefined && (this.storeStock[itemKey] ?? stockLimits[itemKey]) <= 0) {
          alert(`SOLD OUT THIS WEEK: Weekly stock limit (${stockLimits[itemKey]}/${stockLimits[itemKey]}) reached for this reward. Resets every Monday.`);
          this.updateStoreCatalogUI();
          return;
        }

        if (!window.houseGames || window.houseGames.balance < cost) {
          alert(`Insufficient $DIG points balance. You need ${cost.toLocaleString()} $DIG to redeem ${itemName}.`);
          return;
        }

        if (confirm(`Redeem "${itemName}" for ${cost.toLocaleString()} $DIG points?`)) {
          try {
            const res = await fetch('/api/store/redeem', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: this.username,
                voucherTitle: itemName,
                costPoints: cost,
                stakeVerified: this.stakeVerified
              })
            });
            if (!res.ok) {
              const errData = await res.json().catch(() => ({}));
              if (errData.error && (errData.error.includes('SOLD OUT') || errData.error.includes('COOLDOWN') || errData.error.includes('LIMIT'))) {
                alert(errData.error);
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

          if (window.soundEngine) window.soundEngine.playWin();
          if (window.sonner) {
            window.sonner.toast({
              title: 'Voucher Redeemed! 🎁',
              message: `You redeemed "${itemName}" for ${cost.toLocaleString()} $DIG. Streamer queue notified in real-time!`,
              type: 'gold'
            });
          } else {
            alert(`Successfully redeemed: ${itemName}! Our stream moderators will process your reward.`);
          }
        }
      });
    });
  }
}

// Global userStore instance
window.userStore = new UserStoreController();
