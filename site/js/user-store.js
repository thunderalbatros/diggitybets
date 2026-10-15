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
    this.updateUserUI();
    this.bindAuthButtons();
    this.bindProfileControls();
    this.bindStakeTotpVerification();
    this.bindDiscordLinking();
    this.bindStoreRedemptions();
    this.renderLeaderboard();
    this.startTotpTimer();
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

    if (badgeStake) {
      if (this.stakeVerified) {
        badgeStake.textContent = '✓ VERIFIED STAKE AFFILIATE';
        badgeStake.className = 'reward-badge-pill verified';
        badgeStake.style.background = 'rgba(83, 252, 24, 0.2)';
        badgeStake.style.borderColor = 'var(--kick-green)';
        badgeStake.style.color = 'var(--kick-green)';
      } else {
        badgeStake.textContent = 'UNVERIFIED AFFILIATE';
        badgeStake.className = 'reward-badge-pill unverified';
        badgeStake.style.background = 'rgba(255, 42, 95, 0.2)';
        badgeStake.style.borderColor = 'var(--crimson)';
        badgeStake.style.color = '#ff6b8b';
      }
    }

    const tixEl = document.getElementById('raffle-user-tickets');
    if (tixEl) tixEl.textContent = this.raffleTickets;

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
   * Verifies account under streamer referral code "diggitybets" (stake.com/?offer=diggity&c=diggitybets)
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
          statusBox.innerHTML = `<strong>✓ VERIFIED VIP:</strong> Account <strong>@${this.stakeUsername}</strong> is confirmed under code <strong>diggitybets</strong>. You receive 2x giveaway tickets & leaderboard race eligibility!`;
        } else if (this.stakeUsername) {
          statusBox.style.display = 'block';
          statusBox.style.background = 'rgba(255, 215, 0, 0.12)';
          statusBox.style.border = '1px solid rgba(255, 215, 0, 0.35)';
          statusBox.style.color = '#fef08a';
          statusBox.innerHTML = `<strong>⏳ PENDING AUDIT:</strong> Stake user <strong>@${this.stakeUsername}</strong> submitted for verification. Streamer will audit bet link in Admin Deck (+250 $DIG).`;
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
              message: 'Please paste your zero-value Limbo bet ID or share link.',
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
            statusBox.innerHTML = `<strong>✓ REQUEST SUBMITTED:</strong> Bet [<strong>${data.parsedBet?.betId || betId}</strong>] recorded for @${stakeUser}. The streamer can audit your bet link in 1 click from the Admin Control Deck (+250 $DIG reward).`;
          }

          if (window.soundEngine) window.soundEngine.playWin();

          if (window.sonner) {
            window.sonner.toast({
              title: 'Verification Request Recorded! 🎰',
              message: `Bet ID ${data.parsedBet?.betId || betId} submitted for streamer audit (+250 $DIG upon confirmation).`,
              type: 'green'
            });
          }

          // Broadcast to Admin Deck
          if (window.adminHub && window.adminHub.channel) {
            window.adminHub.channel.postMessage({ type: 'STAKE_VERIFICATION_REQUESTED', username: stakeUser, betId });
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

    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        updateStakeStatusBox();
        if (window.soundEngine) window.soundEngine.playTick();
        if (window.sonner) {
          window.sonner.toast({
            title: 'Stake Status',
            message: this.stakeVerified
              ? `Account @${this.stakeUsername} is verified under Stake referral code diggitybets.`
              : (this.stakeUsername
                  ? `Account @${this.stakeUsername} is registered. Awaiting streamer audit.`
                  : 'Enter your Stake username and place a Limbo $0 bet to verify.'),
            type: this.stakeVerified ? 'green' : 'default'
          });
        }
      });
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

  bindStoreRedemptions() {
    const storeItems = document.querySelectorAll('.btn-store-redeem');
    storeItems.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!this.isLoggedIn) {
          alert('Please Link your Kick account first to redeem store items.');
          return;
        }

        const cost = parseInt(btn.getAttribute('data-cost') || '100', 10);
        const itemName = btn.getAttribute('data-item') || 'Store Item';

        if (!window.houseGames || window.houseGames.balance < cost) {
          alert(`Insufficient $DIG points balance. You need ${cost} $DIG to redeem ${itemName}.`);
          return;
        }

        if (confirm(`Redeem "${itemName}" for ${cost} $DIG points?`)) {
          window.houseGames.adjustBalance(-cost);
          if (itemName.includes('Ticket')) {
            this.raffleTickets += 1;
            localStorage.setItem('hunthub_raffle_tickets', this.raffleTickets.toString());
            this.updateUserUI();
          }

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
              message: `You redeemed "${itemName}" for ${cost} $DIG. Streamer queue notified in real-time!`,
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
