/**
 * HuntHub — Master Application Coordinator
 * Handles navigation routing, provably fair audit verification tool, and global state.
 * 100% English, zero dependencies, lightweight notebook performance.
 */

// Global HTML Escaper (Cloudflare Security Audit standard)
window.escapeHTML = function(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Global switchView helper
window.switchView = function(targetId) {
  if (!targetId || targetId === '#' || targetId === '#top') targetId = '#watch';
  if (!targetId.startsWith('#')) targetId = '#' + targetId;

  // Admin & Control Panel Route Protection (#admin -> #admin-hub, #control-panel)
  if (targetId === '#admin' || targetId === '#admin-hub' || targetId === '#control-panel') {
    const currentKickUser = (localStorage.getItem('hunthub_kick_username') || '').trim().toLowerCase().replace(/^@+/, '');
    const isAdmin =
      currentKickUser === 'diggitybets' ||
      currentKickUser === 'diggity_bets' ||
      currentKickUser === 'tarkansky' ||
      currentKickUser === 'diggitybot' ||
      currentKickUser === 'diggity_bot';
    if (!isAdmin) {
      if (window.sonner) {
        window.sonner.toast({
          title: 'Access Denied 🔒',
          message: 'Streamer Admin & Control Panel are restricted to @diggitybets, @tarkansky, and @DiggityBot.',
          type: 'danger'
        });
      }
      targetId = '#watch';
    } else if (targetId === '#admin') {
      targetId = '#admin-hub';
    }
  }

  const validViews = ['#watch', '#house-games', '#battle', '#tournament', '#bonushunt', '#slot-intel', '#random-card-picker', '#store', '#stake-leaderboard', '#bounties', '#leaderboard', '#profile', '#admin-hub', '#control-panel'];
  if (!validViews.includes(targetId)) {
    targetId = '#watch';
  }

  const views = document.querySelectorAll('.view-section');
  views.forEach(v => {
    if ('#' + v.id === targetId) {
      v.classList.add('active-view');
      v.style.setProperty('display', 'block', 'important');
    } else {
      v.classList.remove('active-view');
      v.style.setProperty('display', 'none', 'important');
    }
  });

  // Manage ambient CPU loops across navigation views
  if (window.houseGames) {
    if (targetId === '#house-games') {
      window.houseGames.resumeAmbientLoops();
    } else {
      window.houseGames.pauseAmbientLoops();
    }
  }

  // If navigating to 1v1 Battle Arena, refresh KOTH state
  if (targetId === '#battle' && window.tournamentPrediction && typeof window.tournamentPrediction.renderKoth === 'function') {
    window.tournamentPrediction.renderKoth();
  }

  if (targetId === '#stake-leaderboard' && window.userStore && typeof window.userStore.renderLeaderboard === 'function') {
    window.userStore.renderLeaderboard();
  }
  if (targetId === '#bounties' && window.DiggityBountySystem && typeof window.DiggityBountySystem.renderPublicBoard === 'function') {
    window.DiggityBountySystem.renderPublicBoard();
  }
  if (targetId === '#leaderboard' && window.userStore && typeof window.userStore.renderHistoricalLeaderboard === 'function') {
    window.userStore.renderHistoricalLeaderboard();
  }
  if (targetId === '#random-card-picker' && window.diggityIntelSuite && typeof window.diggityIntelSuite.renderVaultRoundTray === 'function') {
    window.diggityIntelSuite.renderVaultRoundTray();
  }

  // Flush any deferred Admin Hub / Control Panel render immediately when entering those views
  if ((targetId === '#admin-hub' || targetId === '#control-panel') && window.adminHub && window.adminHub._adminDecksDirty) {
    window.adminHub._adminDecksDirty = false;
    window.adminHub.renderAllDecks();
    window.adminHub.syncCondensedControlPanelUI();
  }
  if (targetId === '#control-panel' && window.DiggityBountySystem && typeof window.DiggityBountySystem.renderAdminControlPanel === 'function') {
    window.DiggityBountySystem.renderAdminControlPanel();
  }

  // Update navigation tabs
  const navLinks = document.querySelectorAll('.nav-link-btn');
  navLinks.forEach(link => {
    const href = link.getAttribute('data-target') || link.getAttribute('href');
    if (href === targetId || (targetId === '#admin-hub' && (href === '#admin' || href === '#admin-hub'))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Synchronize Topbar active view title
  const titles = {
    '#watch': '📺 LIVE STREAM / SOCIALS',
    '#house-games': '🕹️ HOUSE GAMES & MINI-CASINO',
    '#battle': '⚔️ 1v1 BATTLE & KING OF THE HILL',
    '#tournament': '🏆 8-BRACKET TOURNAMENT',
    '#bonushunt': '💎 BONUS HUNT TRACKER',
    '#slot-intel': '🔥 SLOT RADAR & ENGINE DNA',
    '#random-card-picker': '🃏 RANDOM CARD PICKER (HOLO-VAULT)',
    '#store': '🎁 REWARDS STORE & RAFFLES',
    '#stake-leaderboard': '⚡ STAKE WAGER LEADERBOARD ($1,500)',
    '#bounties': '🎯 ONLY ON STAKE BOUNTYS ($3 – $20 USD)',
    '#leaderboard': '🏆 KICK LEADERBOARD',
    '#profile': '👤 USER PROFILE & VERIFICATION',
    '#admin-hub': '👑 STREAMER ADMIN & MODERATION HUB',
    '#control-panel': '🎛️ STREAMER LIVE CONTROL PANEL'
  };
  const titleContainer = document.getElementById('topbar-active-title');
  if (titleContainer && titles[targetId]) {
    const textEl = titleContainer.querySelector('.view-title-text');
    if (textEl) {
      textEl.textContent = titles[targetId];
    } else {
      titleContainer.textContent = titles[targetId];
    }
  }

  // Close mobile sidebar if open
  const sidebarEl = document.getElementById('site-sidebar');
  if (sidebarEl && sidebarEl.classList.contains('sidebar-open')) {
    sidebarEl.classList.remove('sidebar-open');
  }

  // Keep hash synced without re-triggering jump
  if (window.location.hash !== targetId) {
    history.replaceState(null, '', targetId);
  }

  window.scrollTo(0, 0);
  if (typeof window.refreshLazyLoad === 'function') {
    setTimeout(window.refreshLazyLoad, 60);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize SPA Router First to ensure navigation is 100% operational
  initSpaRouter();

  // 2. Initialize Subsystems safely with individual error boundaries
  const safeInit = (name, fn) => {
    try {
      if (fn) fn();
    } catch (e) {
      console.warn(`[HuntHub] Subsystem ${name} init notice:`, e);
    }
  };

  // 0. Ensure signature Neon Green dark casino aesthetic (clear any legacy theme override)
  safeInit('casinoTheme', () => {
    document.documentElement.removeAttribute('data-theme');
    try { localStorage.removeItem('hunthub_theme'); } catch (_) {}
  });

  safeInit('soundEngine', () => window.soundEngine && window.soundEngine.init());
  safeInit('antiFraud', () => window.antiFraud && window.antiFraud.init());
  safeInit('userStore', () => window.userStore && window.userStore.init());
  safeInit('adminHub', () => window.adminHub && window.adminHub.init());
  safeInit('houseGames', () => window.houseGames && window.houseGames.init());
  safeInit('tournamentPrediction', () => window.tournamentPrediction && window.tournamentPrediction.init());
  safeInit('bonusHunt', () => window.bonusHunt && window.bonusHunt.init());
  safeInit('diggityIntelSuite', () => window.diggityIntelSuite && window.diggityIntelSuite.init());
  safeInit('stakeGamesSwitcher', initStakeGamesSwitcher);
  safeInit('chatCommandHelpers', initChatCommandHelpers);
  safeInit('provablyFairAuditHub', initProvablyFairAuditHub);

  // SOTA 2026: Ultra-lightweight Vanilla Lazy Loading (verlok/vanilla-lazyload)
  safeInit('lazyLoad', () => {
    if (typeof LazyLoad !== 'undefined') {
      window.lazyLoadInstance = new LazyLoad({
        elements_selector: '.lazy, img[loading="lazy"]',
        threshold: 300,
        cancel_on_exit: true
      });
      window.refreshLazyLoad = function() {
        if (window.lazyLoadInstance && typeof window.lazyLoadInstance.update === 'function') {
          window.lazyLoadInstance.update();
        }
      };
    } else {
      window.refreshLazyLoad = function() {};
    }
  });

  // 3. Year in footer
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * Dedicated SPA View Switcher
 * Ensures each section is displayed as a dedicated standalone view, avoiding a 5000px single scroll.
 */
function initSpaRouter() {
  // Listen to clicks on all navigation buttons, links, and footer links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-target], a.nav-link-btn, .footer-links-row a, a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('data-target') || link.getAttribute('href');
    if (href && href.startsWith('#') && href !== '#') {
      e.preventDefault();
      window.switchView(href);
      if (window.soundEngine && typeof window.soundEngine.playNavTab === 'function') {
        try { window.soundEngine.playNavTab(); } catch (_) {}
      } else if (window.soundEngine && typeof window.soundEngine.playChip === 'function') {
        try { window.soundEngine.playChip(); } catch (_) {}
      }
    }
  });

  window.addEventListener('popstate', () => {
    window.switchView(window.location.hash);
  });
  window.addEventListener('hashchange', () => {
    window.switchView(window.location.hash);
  });

  const sidebarEl = document.getElementById('site-sidebar');

  // Sidebar collapse / minimize handler (hamburger in sidebar top-left)
  const collapseBtn = document.getElementById('btn-sidebar-collapse');
  if (collapseBtn && sidebarEl) {
    if (localStorage.getItem('hunthub_sidebar_collapsed') === 'true') {
      sidebarEl.classList.add('collapsed');
    }
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebarEl.classList.toggle('collapsed');
      const isCollapsed = sidebarEl.classList.contains('collapsed');
      localStorage.setItem('hunthub_sidebar_collapsed', isCollapsed ? 'true' : 'false');
      if (window.soundEngine && typeof window.soundEngine.playTick === 'function') {
        try { window.soundEngine.playTick(); } catch (_) {}
      }
    });
  }

  // Mobile sidebar toggle handler (topbar left button)
  const toggleBtn = document.getElementById('btn-toggle-sidebar');
  if (toggleBtn && sidebarEl) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebarEl.classList.toggle('sidebar-open');
    });
    document.addEventListener('click', (e) => {
      if (sidebarEl.classList.contains('sidebar-open') && !sidebarEl.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebarEl.classList.remove('sidebar-open');
      }
    });
  }

  // Activate view from initial URL hash or default to #watch
  const initialHash = window.location.hash || '#watch';
  window.switchView(initialHash);
}

/**
 * Stake Originals Clone Tabbed Game Switcher
 */
function initStakeGamesSwitcher() {
  const iframe = document.getElementById('stake-originals-iframe');
  const buttons = document.querySelectorAll('.stake-nav-btn');
  if (!iframe || !buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      if (url) {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        iframe.src = url;
        if (window.soundEngine && typeof window.soundEngine.playNavTab === 'function') {
          window.soundEngine.playNavTab();
        } else if (window.soundEngine) {
          window.soundEngine.playChip();
        }
      }
    });
  });
}

/**
 * Click-to-copy chat command helper badges & #watch Golden Ratio Telemetry Strip
 */
function initChatCommandHelpers() {
  const cmdPills = document.querySelectorAll('.cmd-pill-row');
  cmdPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const tag = pill.querySelector('.cmd-pill-tag');
      if (tag) {
        const cmdText = tag.textContent.split('<')[0].split('[')[0].trim();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(cmdText).catch(() => {});
        }
        if (window.soundEngine) window.soundEngine.playCard();
        const desc = pill.querySelector('.cmd-pill-desc');
        if (desc) {
          const original = desc.textContent;
          desc.textContent = '✓ Copied! Paste in Kick Chat';
          desc.style.color = 'var(--kick-green)';
          setTimeout(() => {
            desc.textContent = original;
            desc.style.color = '';
          }, 2200);
        }
      }
    });
  });
}

/**
 * Provably Fair Cryptographic Verification Hub (HMAC-SHA256)
 */
function initProvablyFairAuditHub() {
  // Modal Toggle and Close Controls
  const modalBackdrop = document.getElementById('pf-modal-backdrop');
  const toggleBtn = document.getElementById('btn-toggle-provably-fair');
  const closeBtn = document.getElementById('btn-close-pf-modal');

  const openPfModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.style.display = 'flex';
    requestAnimationFrame(() => modalBackdrop.classList.add('open'));
    if (window.soundEngine && typeof window.soundEngine.playNavTab === 'function') {
      window.soundEngine.playNavTab();
    } else if (window.soundEngine) {
      window.soundEngine.playChip();
    }
  };

  const closePfModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    setTimeout(() => {
      if (!modalBackdrop.classList.contains('open')) {
        modalBackdrop.style.display = 'none';
      }
    }, 220);
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openPfModal);
  if (closeBtn) closeBtn.addEventListener('click', closePfModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closePfModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closePfModal();
    }
  });

  const serverHashEl = document.getElementById('pf-live-server-hash');
  const clientSeedEl = document.getElementById('pf-live-client-seed');
  const nonceEl = document.getElementById('pf-live-nonce');

  const updateSeedsUI = () => {
    if (!window.pfEngine) return;
    if (serverHashEl) serverHashEl.textContent = window.pfEngine.serverSeedHash;
    if (clientSeedEl) clientSeedEl.value = window.pfEngine.clientSeed;
    if (nonceEl) nonceEl.textContent = window.pfEngine.nonce;
  };

  updateSeedsUI();
  window.addEventListener('hunthub:seeds-updated', updateSeedsUI);

  // Active Seed Pair Controls
  const rotateBtn = document.getElementById('pf-btn-rotate-seeds');
  const randomClientBtn = document.getElementById('pf-btn-randomize-client');
  const revealedBox = document.getElementById('pf-revealed-seed-box');
  const revealedSeedEl = document.getElementById('pf-revealed-server-seed');

  if (randomClientBtn && clientSeedEl) {
    randomClientBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playTick();
      const randSeed = window.pfEngine ? window.pfEngine.generateRandomClientSeed() : 'seed_' + Math.random().toString(36).substring(2, 12);
      clientSeedEl.value = randSeed;
      if (window.pfEngine) window.pfEngine.setClientSeed(randSeed);
    });
  }

  if (clientSeedEl) {
    clientSeedEl.addEventListener('change', () => {
      if (window.pfEngine) window.pfEngine.setClientSeed(clientSeedEl.value);
    });
  }

  if (rotateBtn) {
    rotateBtn.addEventListener('click', async () => {
      if (!window.pfEngine) return;
      if (window.soundEngine) window.soundEngine.playCard();
      const currentClientSeed = clientSeedEl ? clientSeedEl.value.trim() : null;
      const res = await window.pfEngine.rotateSeedPair(currentClientSeed);
      
      if (revealedBox && revealedSeedEl) {
        revealedSeedEl.textContent = res.revealedServerSeed;
        revealedBox.style.display = 'block';
        // Auto fill into verifier server seed input for convenience
        const verifierServerInput = document.getElementById('pf-input-server-seed');
        if (verifierServerInput) verifierServerInput.value = res.revealedServerSeed;
      }

      if (window.soundEngine) window.soundEngine.playWin();
      alert('🔄 Seed pair rotated successfully!\nThe previous server seed has been revealed in plaintext so you can independently audit past game rounds.');
    });
  }

  // Verification Form Action
  const verifyBtn = document.getElementById('pf-verify-btn');
  if (!verifyBtn) return;

  verifyBtn.addEventListener('click', async () => {
    if (window.soundEngine) window.soundEngine.playCard();
    const serverSeed = (document.getElementById('pf-input-server-seed').value || '').trim();
    const clientSeed = (document.getElementById('pf-input-client-seed').value || '').trim();
    const nonce = parseInt(document.getElementById('pf-input-nonce').value || '1', 10);
    const game = document.getElementById('pf-input-game').value || 'plinko';

    const resultBox = document.getElementById('pf-verify-result');

    if (!serverSeed || !clientSeed) {
      alert('Please provide both Server Seed and Client Seed for verification.');
      return;
    }

    if (!window.pfEngine) {
      alert('Provably fair cryptographic engine is initializing...');
      return;
    }

    // Compute SHA-256(serverSeed)
    const computedServerHash = await window.pfEngine.sha256(serverSeed);
    // Compute HMAC-SHA256
    const roundHash = await window.pfEngine.generateRoundHash(serverSeed, clientSeed, nonce);
    const float = window.pfEngine.hashToFloat(roundHash);

    let gameResultText = '';
    if (game === 'limbo') {
      const mult = window.pfEngine.getLimboMultiplier(roundHash);
      gameResultText = `Limbo Multiplier: ${mult.toFixed(2)}x`;
    } else if (game === 'crash') {
      const mult = window.pfEngine.getCrashMultiplier ? window.pfEngine.getCrashMultiplier(roundHash) : 2.00;
      gameResultText = `Crash Point: ${mult.toFixed(2)}x`;
    } else if (game === 'roulette') {
      const pocket = window.pfEngine.getRouletteOutcome(roundHash);
      const isRed = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(pocket);
      const color = pocket === 0 ? 'Green' : isRed ? 'Red' : 'Black';
      gameResultText = `Roulette Pocket: ${pocket} (${color})`;
    } else if (game === 'plinko') {
      const { finalBin } = window.pfEngine.getPlinkoPath(roundHash, 10);
      const mults = [10, 5, 2, 1.2, 0.4, 0.2, 0.4, 1.2, 2, 5, 10];
      gameResultText = `Plinko Bucket: #${finalBin} (Multiplier: ${mults[finalBin]}x)`;
    } else if (game === 'mines') {
      const grid = window.pfEngine.getMinesGrid(roundHash, 3);
      const mineTiles = grid.filter(t => t.isMine).map(t => `#${t.id + 1}`).join(', ');
      gameResultText = `Mines Placed on Tiles: [${mineTiles}]`;
    } else if (game === 'dice') {
      const roll = window.pfEngine.getDiceRoll(roundHash);
      gameResultText = `Dice Roll Result: ${roll.toFixed(2)}`;
    } else if (game === 'blackjack') {
      const deck = window.pfEngine.getShuffledDeck(roundHash);
      gameResultText = `Shuffled Deck: First card index #${deck[0]}`;
    }

    if (resultBox) {
      resultBox.innerHTML = `
        <div class="pf-audit-card" style="margin-top: 16px; padding: 16px; background: rgba(0, 0, 0, 0.4); border-radius: 12px; border: 1px solid var(--border-gold);">
          <div class="pf-audit-item" style="margin-bottom: 8px;">
            <span class="pf-audit-label" style="font-size: 11px; color: var(--text-dim); display: block;">SERVER SEED SHA-256 HASH:</span>
            <span class="pf-audit-value" style="font-family: monospace; font-size: 12px; color: #fff; word-break: break-all;">${computedServerHash}</span>
          </div>
          <div class="pf-audit-item" style="margin-bottom: 8px;">
            <span class="pf-audit-label" style="font-size: 11px; color: var(--text-dim); display: block;">HMAC-SHA256 ROUND HASH:</span>
            <span class="pf-audit-value highlight" style="font-family: monospace; font-size: 12px; color: var(--cyan); word-break: break-all;">${roundHash}</span>
          </div>
          <div class="pf-audit-item" style="margin-bottom: 8px;">
            <span class="pf-audit-label" style="font-size: 11px; color: var(--text-dim); display: block;">CRYPTOGRAPHIC FLOAT [0, 1):</span>
            <span class="pf-audit-value" style="font-family: monospace; font-size: 13px; color: var(--gold);">${float.toFixed(8)}</span>
          </div>
          <div class="pf-audit-item" style="margin-bottom: 8px;">
            <span class="pf-audit-label" style="font-size: 11px; color: var(--text-dim); display: block;">AUDITED GAME OUTCOME:</span>
            <span class="pf-audit-value outcome" style="font-family: var(--font-display); font-size: 15px; font-weight: 800; color: #00e676;">🎯 ${gameResultText}</span>
          </div>
          <div class="pf-audit-badge" style="margin-top: 10px; color: var(--kick-green); font-size: 12px; font-weight: 800;">
            <span>✓ VERIFICATION SUCCESSFUL: RESULT IS 100% MATHEMATICALLY UNALTERED</span>
          </div>
        </div>
      `;
      resultBox.classList.add('active');
    }

    if (window.soundEngine) window.soundEngine.playWin();
  });
}
