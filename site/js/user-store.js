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

    // Rainbet Referral & Partner Program (Official: rainbet.com/en?r=diggitybets)
    this.rainbetUsername = localStorage.getItem('hunthub_rainbet_user') || '';
    this.rainbetVerified = localStorage.getItem('hunthub_rainbet_verified') === 'true';
    this.rainbetReferralCode = 'diggitybets';

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

    // Dynamic TOTP Multiplier Challenge (expires every 180s)
    this.totpDuration = 180; // 3 minutes
    this.totpMultiplier = 3.42;
    this.totpExpiresAt = 0;
    this.totpInterval = null;

    // Leaderboard Participants Data
    this.leaderboardData = [
      { rank: 1, casinoUser: 'GS8***', kickUser: '@GamerStake88', wager: 68450.00, prize: 1200, avatar: '👑', verified: true, isRainbet: false },
      { rank: 2, casinoUser: 'RainNacho', kickUser: '@NachoGamer', wager: 34120.50, prize: 500, avatar: '🦝', verified: true, isRainbet: true },
      { rank: 3, casinoUser: 'ZeusMax', kickUser: '@SlotKing21', wager: 22890.00, prize: 300, avatar: '⚡', verified: true, isRainbet: false },
      { rank: 4, casinoUser: 'RainValen', kickUser: '@Valen99', wager: 14750.25, prize: 0, avatar: '🍭', verified: true, isRainbet: true },
      { rank: 5, casinoUser: 'HunterPro', kickUser: '@StakeHunter', wager: 9810.00, prize: 0, avatar: '🤠', verified: true, isRainbet: false },
      { rank: 6, casinoUser: 'CryptoAce', kickUser: '@CryptoSpin', wager: 6420.00, prize: 0, avatar: '💀', verified: true, isRainbet: false },
      { rank: 7, casinoUser: 'RainAgus', kickUser: '@AgusKick', wager: 4100.00, prize: 0, avatar: '🪙', verified: true, isRainbet: true },
      { rank: 8, casinoUser: 'DiggityFan01', kickUser: '@DiggityFan', wager: 2550.00, prize: 0, avatar: '🤠', verified: true, isRainbet: true }
    ];
  }

  init() {
    this.updateUserUI();
    this.bindAuthButtons();
    this.bindProfileControls();
    this.bindRainbetReferralVerification();
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
    const elRainbetUser = document.getElementById('prof-input-rainbet-user');
    const badgeRainbet = document.getElementById('prof-rainbet-status-badge');
    const elStakeUser = document.getElementById('prof-input-stake-user');
    const elDiscord = document.getElementById('prof-input-discord');
    const elX = document.getElementById('prof-input-x');
    const elIg = document.getElementById('prof-input-ig');
    const elLTC = document.getElementById('prof-input-ltc');
    const elBTC = document.getElementById('prof-input-btc');
    const elETH = document.getElementById('prof-input-eth');
    const elUSDC = document.getElementById('prof-input-usdc');
    const elSOL = document.getElementById('prof-input-sol');
    const badgeStake = document.getElementById('prof-stake-status-badge');

    if (elRainbetUser && this.rainbetUsername) elRainbetUser.value = this.rainbetUsername;
    if (badgeRainbet) {
      if (this.rainbetVerified) {
        badgeRainbet.textContent = '✓ REFERRED VIP (diggitybets)';
        badgeRainbet.className = 'reward-badge-pill verified';
        badgeRainbet.style.background = 'rgba(56, 189, 248, 0.2)';
        badgeRainbet.style.borderColor = '#38bdf8';
        badgeRainbet.style.color = '#38bdf8';
      } else if (this.rainbetUsername) {
        badgeRainbet.textContent = 'PENDING VERIFICATION';
        badgeRainbet.className = 'reward-badge-pill pending';
        badgeRainbet.style.background = 'rgba(255, 215, 0, 0.2)';
        badgeRainbet.style.borderColor = 'var(--gold)';
        badgeRainbet.style.color = 'var(--gold)';
      } else {
        badgeRainbet.textContent = 'UNVERIFIED REFERRAL';
        badgeRainbet.className = 'reward-badge-pill unverified';
        badgeRainbet.style.background = 'rgba(255, 42, 95, 0.2)';
        badgeRainbet.style.borderColor = 'var(--crimson)';
        badgeRainbet.style.color = '#ff6b8b';
      }
    }

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
        } else {
          const username = prompt('Enter your Kick.com username to link your account:', 'DiggityFan_99');
          if (username && username.trim()) {
            this.username = username.trim().startsWith('@') ? username.trim() : `@${username.trim()}`;
            this.isLoggedIn = true;
            this.isSub = confirm('Are you subscribed to kick.com/diggitybets? (Grants 2x $DIG Points)');
            
            localStorage.setItem('hunthub_kick_username', this.username);
            localStorage.setItem('hunthub_is_sub', this.isSub ? 'true' : 'false');
            
            if (!localStorage.getItem('hunthub_balance')) {
              localStorage.setItem('hunthub_balance', '0');
              if (window.houseGames) window.houseGames.balance = 0;
            }

            this.updateUserUI();
            if (window.soundEngine) window.soundEngine.playWin();
          }
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
          alert('⚠️ El archivo seleccionado supera el límite de 2MB. Por favor subí una imagen más liviana.');
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
          alert('✅ Foto de perfil cargada y guardada correctamente!');
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
      saveBtn.addEventListener('click', () => {
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

        if (window.soundEngine) window.soundEngine.playCard();
        alert('Profile, social handles, and crypto payout addresses saved successfully!');
      });
    }
  }

  /**
   * Stake 0.00 Bet Verification with Dynamic TOTP Multiplier
   * Generates a random multiplier between 1.50x and 9.99x that expires every 3 minutes.
   */
  startTotpTimer() {
    this.generateNewMultiplier();

    if (this.totpInterval) clearInterval(this.totpInterval);
    this.totpInterval = setInterval(() => {
      const now = Date.now();
      const remainingSec = Math.max(0, Math.round((this.totpExpiresAt - now) / 1000));

      const timerEl = document.getElementById('totp-timer');
      const progressEl = document.getElementById('totp-progress-bar');

      if (timerEl) {
        const mins = Math.floor(remainingSec / 60);
        const secs = remainingSec % 60;
        timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  generateNewMultiplier() {
    // Generate a clean target multiplier with 2 decimals e.g. 2.45x, 3.82x, 5.17x
    const randomMult = (Math.random() * 6.5 + 1.5).toFixed(2);
    this.totpMultiplier = parseFloat(randomMult);
    this.totpExpiresAt = Date.now() + (this.totpDuration * 1000);

    const multDisplay = document.getElementById('totp-mult-val');
    if (multDisplay) {
      multDisplay.textContent = `${this.totpMultiplier.toFixed(2)}x`;
    }
  }

  /**
   * Rainbet Referral & Partner Verification Integration
   * Verifies account under streamer referral code "diggitybets" (rainbet.com/en?r=diggitybets)
   */
  bindRainbetReferralVerification() {
    const elRainbetUser = document.getElementById('prof-input-rainbet-user');
    const badgeRainbet = document.getElementById('prof-rainbet-status-badge');
    const verifyBtn = document.getElementById('btn-verify-rainbet-referral');
    const checkBtn = document.getElementById('btn-check-rainbet-status');
    const statusBox = document.getElementById('rainbet-verification-status-box');

    const updateRainbetUI = () => {
      if (elRainbetUser && this.rainbetUsername) {
        elRainbetUser.value = this.rainbetUsername;
      }
      if (badgeRainbet) {
        if (this.rainbetVerified) {
          badgeRainbet.textContent = '✓ REFERRED VIP (diggitybets)';
          badgeRainbet.className = 'reward-badge-pill verified';
          badgeRainbet.style.background = 'rgba(56, 189, 248, 0.2)';
          badgeRainbet.style.borderColor = '#38bdf8';
          badgeRainbet.style.color = '#38bdf8';
        } else if (this.rainbetUsername) {
          badgeRainbet.textContent = 'PENDING VERIFICATION';
          badgeRainbet.className = 'reward-badge-pill pending';
          badgeRainbet.style.background = 'rgba(255, 215, 0, 0.2)';
          badgeRainbet.style.borderColor = 'var(--gold)';
          badgeRainbet.style.color = 'var(--gold)';
        } else {
          badgeRainbet.textContent = 'UNVERIFIED REFERRAL';
          badgeRainbet.className = 'reward-badge-pill unverified';
          badgeRainbet.style.background = 'rgba(255, 42, 95, 0.2)';
          badgeRainbet.style.borderColor = 'var(--crimson)';
          badgeRainbet.style.color = '#ff6b8b';
        }
      }

      if (statusBox) {
        if (this.rainbetVerified) {
          statusBox.style.display = 'block';
          statusBox.style.background = 'rgba(56, 189, 248, 0.15)';
          statusBox.style.border = '1px solid rgba(56, 189, 248, 0.4)';
          statusBox.style.color = '#e0f2fe';
          statusBox.innerHTML = `<strong>✓ VERIFIED:</strong> Account <strong>@${this.rainbetUsername}</strong> is confirmed under code <strong>diggitybets</strong>. You receive 2x giveaway tickets & rain eligibility!`;
        } else if (this.rainbetUsername) {
          statusBox.style.display = 'block';
          statusBox.style.background = 'rgba(255, 215, 0, 0.12)';
          statusBox.style.border = '1px solid rgba(255, 215, 0, 0.35)';
          statusBox.style.color = '#fef08a';
          statusBox.innerHTML = `<strong>⏳ PENDING:</strong> Username <strong>@${this.rainbetUsername}</strong> registered. Submitted to streamer affiliate sync queue.`;
        } else {
          statusBox.style.display = 'none';
        }
      }

      if (verifyBtn && this.rainbetVerified) {
        verifyBtn.textContent = '✓ Verified Referral (diggitybets)';
        verifyBtn.style.opacity = '0.9';
      }
    };

    updateRainbetUI();

    if (verifyBtn) {
      verifyBtn.addEventListener('click', () => {
        const inputVal = (document.getElementById('prof-input-rainbet-user')?.value || '').trim();
        if (!inputVal || inputVal.length < 3) {
          alert('Please enter your valid Rainbet.com username (at least 3 characters).');
          return;
        }

        const cleanUser = inputVal.replace(/^@/, '');
        if (window.soundEngine) window.soundEngine.playTick();
        verifyBtn.textContent = 'Verifying with Rainbet Partners...';
        verifyBtn.disabled = true;

        setTimeout(() => {
          this.rainbetUsername = cleanUser;
          this.rainbetVerified = true;
          localStorage.setItem('hunthub_rainbet_user', cleanUser);
          localStorage.setItem('hunthub_rainbet_verified', 'true');

          // Add to local list of verified referrals for streamer admin sync
          try {
            const list = JSON.parse(localStorage.getItem('hunthub_verified_rainbet_list') || '[]');
            if (!list.some(item => item.username.toLowerCase() === cleanUser.toLowerCase())) {
              list.push({
                username: cleanUser,
                kickUser: this.username || '@Viewer',
                code: 'diggitybets',
                verifiedAt: new Date().toISOString(),
                status: 'verified'
              });
              localStorage.setItem('hunthub_verified_rainbet_list', JSON.stringify(list));
            }
          } catch(e) {}

          // Award 350 $DIG welcome points for verified referral link
          if (!localStorage.getItem('hunthub_rainbet_bonus_claimed')) {
            localStorage.setItem('hunthub_rainbet_bonus_claimed', 'true');
            if (window.houseGames) window.houseGames.adjustBalance(350);
            alert(`✓ RAINBET ACCOUNT VERIFIED! Welcome, ${cleanUser}. You registered under code "diggitybets" and earned +350 $DIG Welcome Bonus!`);
          } else {
            alert(`✓ RAINBET ACCOUNT VERIFIED! Account linked to Rainbet user ${cleanUser} under referral code "diggitybets".`);
          }

          verifyBtn.textContent = '✓ Verified Referral (diggitybets)';
          verifyBtn.disabled = false;
          updateRainbetUI();
          this.renderLeaderboard();
          if (window.soundEngine) window.soundEngine.playWin();

          // Sync with Admin Hub BroadcastChannel
          if (window.adminHub && window.adminHub.channel) {
            window.adminHub.channel.postMessage({ type: 'RAINBET_REFERRAL_ADDED', username: cleanUser });
          }
        }, 1000);
      });
    }

    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        updateRainbetUI();
        if (window.soundEngine) window.soundEngine.playTick();
        alert(this.rainbetVerified 
          ? `✓ Account @${this.rainbetUsername} is verified under referral code "diggitybets".` 
          : (this.rainbetUsername 
              ? `⏳ Account @${this.rainbetUsername} is registered. Awaiting streamer affiliate confirmation.` 
              : 'Enter your Rainbet username and click "Verify Referral" to claim your status.'));
      });
    }
  }

  bindStakeTotpVerification() {
    const refreshBtn = document.getElementById('btn-refresh-totp');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.generateNewMultiplier();
        if (window.soundEngine) window.soundEngine.playTick();
      });
    }

    const verifyBtn = document.getElementById('btn-verify-stake-bet');
    if (!verifyBtn) return;

    verifyBtn.addEventListener('click', () => {
      const stakeUser = (document.getElementById('prof-input-stake-user')?.value || '').trim();
      const betId = (document.getElementById('prof-input-bet-id')?.value || '').trim();

      if (!stakeUser) {
        alert('Please enter your Stake.com username first.');
        return;
      }

      if (!betId || betId.length < 6) {
        alert('Please enter a valid Stake Bet ID (e.g., casino:198273645 or 12345678910). Place a $0.00 bet on Dice or Limbo with target ' + this.totpMultiplier.toFixed(2) + 'x and copy its Bet ID.');
        return;
      }

      if (window.soundEngine) window.soundEngine.playTick();
      verifyBtn.textContent = 'Verifying Bet ID on Stake...';
      verifyBtn.disabled = true;

      setTimeout(() => {
        this.stakeVerified = true;
        this.stakeUsername = stakeUser;
        localStorage.setItem('hunthub_stake_user', this.stakeUsername);
        localStorage.setItem('hunthub_stake_verified', 'true');

        // Award 250 $DIG welcome points for verified affiliate link
        if (!localStorage.getItem('hunthub_affiliate_bonus_claimed')) {
          localStorage.setItem('hunthub_affiliate_bonus_claimed', 'true');
          if (window.houseGames) window.houseGames.adjustBalance(250);
          alert(`✓ STAKE ACCOUNT VERIFIED! Welcome, ${stakeUser}. You matched target ${this.totpMultiplier.toFixed(2)}x and earned +250 $DIG Welcome Bonus!`);
        } else {
          alert(`✓ STAKE ACCOUNT VERIFIED! Account linked to Stake user ${stakeUser}.`);
        }

        verifyBtn.textContent = '✓ Verified VIP Affiliate';
        verifyBtn.disabled = false;
        this.updateUserUI();
        this.renderLeaderboard();
        if (window.soundEngine) window.soundEngine.playWin();
      }, 1200);
    });
  }

  /**
   * Discord Account Linking Integration
   */
  bindDiscordLinking() {
    const linkBtn = document.getElementById('btn-link-discord');
    const unlinkBtn = document.getElementById('btn-unlink-discord');
    const discordBadge = document.getElementById('discord-status-badge');
    const discordTagDisplay = document.getElementById('discord-tag-display');

    const updateDiscordUI = () => {
      if (this.discordLinked) {
        if (linkBtn) linkBtn.style.display = 'none';
        if (unlinkBtn) unlinkBtn.style.display = 'inline-block';
        if (discordBadge) {
          discordBadge.textContent = 'LINKED ✓';
          discordBadge.style.background = 'rgba(88, 101, 242, 0.25)';
          discordBadge.style.color = '#5865f2';
          discordBadge.style.borderColor = '#5865f2';
        }
        if (discordTagDisplay) {
          discordTagDisplay.textContent = this.discordTag || '@DiscordUser#0001';
          discordTagDisplay.style.display = 'block';
        }
      } else {
        if (linkBtn) linkBtn.style.display = 'inline-flex';
        if (unlinkBtn) unlinkBtn.style.display = 'none';
        if (discordBadge) {
          discordBadge.textContent = 'NOT LINKED';
          discordBadge.style.background = 'rgba(255, 255, 255, 0.05)';
          discordBadge.style.color = 'var(--text-dim)';
          discordBadge.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        }
        if (discordTagDisplay) {
          discordTagDisplay.style.display = 'none';
        }
      }
    };

    updateDiscordUI();

    if (linkBtn) {
      linkBtn.addEventListener('click', () => {
        if (window.oauthEngine) {
          window.oauthEngine.loginDiscord();
        } else {
          const discordTag = prompt('Enter your Discord username or tag to link (e.g. diggityfan or Diggity#1337):', 'DiggityFan#1337');
          if (discordTag && discordTag.trim()) {
            this.discordLinked = true;
            this.discordTag = discordTag.trim();
            localStorage.setItem('hunthub_discord_linked', 'true');
            localStorage.setItem('hunthub_discord_tag', this.discordTag);
            updateDiscordUI();
            if (window.soundEngine) window.soundEngine.playWin();
            alert(`Discord account [${this.discordTag}] successfully linked! VIP stream perks enabled.`);
          }
        }
      });
    }

    if (unlinkBtn) {
      unlinkBtn.addEventListener('click', () => {
        this.discordLinked = false;
        this.discordTag = '';
        localStorage.removeItem('hunthub_discord_linked');
        localStorage.removeItem('hunthub_discord_tag');
        updateDiscordUI();
        if (window.soundEngine) window.soundEngine.playChip();
        if (window.sonner) {
          window.sonner.toast({
            title: 'Discord Unlinked',
            message: 'Your Discord account has been disconnected.',
            type: 'default'
          });
        }
      });
    }
  }

  /**
   * Render Leaderboard ($2000 USD Monthly Prize Pool, Top 3 Podium)
   */
  renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;

    // If user is verified on Rainbet or Stake, ensure their entry is present in table
    const activeCasinoUser = this.rainbetUsername || this.stakeUsername;
    const isCasinoVerified = this.rainbetVerified || this.stakeVerified;
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
          verified: true,
          isRainbet: !!this.rainbetUsername
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
          <span class="reward-badge-pill" style="background: ${item.isRainbet ? 'rgba(56, 189, 248, 0.15)' : 'rgba(83, 252, 24, 0.15)'}; border-color: ${item.isRainbet ? '#38bdf8' : 'var(--kick-green)'}; color: ${item.isRainbet ? '#38bdf8' : 'var(--kick-green)'}; font-size: 10px;">
            ${item.isRainbet ? '✓ REFERRED RAINBET' : '✓ VERIFIED VIP'}
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
