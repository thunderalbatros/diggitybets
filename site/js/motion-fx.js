/**
 * HuntHub — Advanced Motion & Micro-Interactions Engine (Phase 1)
 * Incorporates Emil Kowalski's Design Engineering, Apple Fluid Physics,
 * FormKit FLIP Transitions, Canvas Confetti & CountUp.js 60 FPS Tickers.
 * 100% Client-side, zero layout thrashing, low-CPU budget for OBS (<=5%).
 */

(function (window, document) {
  'use strict';

  // Quintic Ease-Out (Apple WWDC Fluid Curve)
  const APPLE_EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';

  // ========================================================
  // 1. CASINO PARTICLE SYSTEM (CANVAS CONFETTI)
  // ========================================================
  window.fireCasinoConfetti = function (options = {}) {
    if (typeof window.confetti !== 'function') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Casino palette: Gold, Mint Kick Green, Cyan, Magenta, Pearl White
    const casinoColors = options.colors || ['#ffd700', '#ffaa00', '#53fc18', '#00e5ff', '#ff2a5f', '#ffffff'];

    window.confetti({
      particleCount: options.particleCount || 55,
      spread: options.spread || 65,
      startVelocity: options.startVelocity || 35,
      origin: options.origin || { y: 0.7 },
      colors: casinoColors,
      ticks: options.ticks || 180,
      gravity: options.gravity || 1.1,
      scalar: options.scalar || 1.0,
      disableForReducedMotion: true,
      zIndex: 99999
    });
  };

  window.fireJackpotCannons = function () {
    if (typeof window.confetti !== 'function') return;

    const end = Date.now() + 1500;
    const colors = ['#ffd700', '#53fc18', '#ff2a5f', '#ffffff'];

    (function frame() {
      window.confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        zIndex: 99999
      });
      window.confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors,
        zIndex: 99999
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // ========================================================
  // 2. 60 FPS NUMERIC TICKER (COUNTUP INTERPOLATION)
  // ========================================================
  window.animateNumber = function (elOrId, targetValue, options = {}) {
    const el = typeof elOrId === 'string' ? document.getElementById(elOrId) : elOrId;
    if (!el) return;

    // Ensure tabular numbers to eliminate horizontal jitter
    el.style.fontVariantNumeric = 'tabular-nums';
    el.style.fontFeatureSettings = '"tnum" 1';

    const target = parseFloat(targetValue) || 0;
    const decimals = options.decimals !== undefined ? options.decimals : (target % 1 !== 0 ? 2 : 0);
    const duration = options.duration || 0.8; // seconds

    // Extract current number from element text if not provided
    let current = options.startVal !== undefined ? options.startVal : parseFloat(el.textContent.replace(/[^0-9.-]/g, '')) || 0;

    // Use CountUp library if available
    if (window.countUp && window.countUp.CountUp) {
      try {
        const countUp = new window.countUp.CountUp(el, target, {
          startVal: current,
          decimalPlaces: decimals,
          duration: duration,
          useEasing: true,
          separator: ',',
          decimal: '.',
          prefix: options.prefix || '',
          suffix: options.suffix || ''
        });
        if (!countUp.error) {
          countUp.start();
          return;
        }
      } catch (_) {
        // Fallback to rAF
      }
    }

    // Pure rAF Quintic Ease-out Fallback
    const startTime = performance.now();
    const durationMs = duration * 1000;
    const diff = target - current;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Quintic ease out: 1 - (1 - t)^5
      const ease = 1 - Math.pow(1 - progress, 5);
      const val = current + diff * ease;

      el.textContent = (options.prefix || '') + val.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }) + (options.suffix || '');

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = (options.prefix || '') + target.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }) + (options.suffix || '');
      }
    }

    requestAnimationFrame(tick);
  };

  // ========================================================
  // 3. ZERO-CONFIG FLIP ANIMATION ENGINE (AutoAnimate Style)
  // ========================================================
  const flipCoords = new WeakMap();

  window.autoAnimateList = function (containerOrSelector, config = {}) {
    const container = typeof containerOrSelector === 'string' ? document.querySelector(containerOrSelector) : containerOrSelector;
    if (!container) return;

    const duration = config.duration || 240;
    const easing = config.easing || APPLE_EASE_OUT;

    // Record initial coordinates
    function snapshot() {
      const children = Array.from(container.children);
      children.forEach((child) => {
        flipCoords.set(child, child.getBoundingClientRect());
      });
    }

    // Measure new positions and run composite-only inverse transforms
    function play() {
      const children = Array.from(container.children);

      children.forEach((child) => {
        const first = flipCoords.get(child);
        const last = child.getBoundingClientRect();

        if (first) {
          const dx = first.left - last.left;
          const dy = first.top - last.top;

          if (dx !== 0 || dy !== 0) {
            // Element moved: Invert and Play
            child.animate(
              [
                { transform: `translate3d(${dx}px, ${dy}px, 0)` },
                { transform: 'translate3d(0, 0, 0)' }
              ],
              {
                duration: duration,
                easing: easing,
                fill: 'none'
              }
            );
          }
        } else {
          // New element entered: Scale & Fade in
          child.animate(
            [
              { opacity: 0, transform: 'translate3d(0, 10px, 0) scale(0.96)' },
              { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
            ],
            {
              duration: duration + 40,
              easing: easing,
              fill: 'none'
            }
          );
        }

        // Update coordinate record
        flipCoords.set(child, last);
      });
    }

    snapshot();

    // Observe child additions/removals/reorderings
    const observer = new MutationObserver(() => {
      play();
    });

    observer.observe(container, {
      childList: true,
      subtree: false
    });

    return observer;
  };

  // ========================================================
  // 4. INSTANT PRESS FEEDBACK (APPLE HIG COMPOSITOR)
  // ========================================================
  function initInstantPressFeedback() {
    const selector = '.btn-game-action, .chip-btn, .nav-link-btn, .avatar-preset-btn, .module-card, .btn-stake-action, .btn-discord-action, .btn-chat-toggle, .btn-store-redeem, .btn-faucet';

    document.addEventListener('pointerdown', (e) => {
      const target = e.target.closest(selector);
      if (!target || target.disabled) return;

      target.style.transform = 'scale(0.965)';
      target.style.transition = `transform 0.1s ${APPLE_EASE_OUT}`;

      const release = () => {
        target.style.transform = '';
        window.removeEventListener('pointerup', release);
        window.removeEventListener('pointercancel', release);
      };

      window.addEventListener('pointerup', release, { once: true });
      window.addEventListener('pointercancel', release, { once: true });
    }, { passive: true });
  }

  // ========================================================
  // 5. 3D TACTILE TILT & SPECULAR GLARE (ATROPOS / PARALLAX)
  // ========================================================
  function init3DTouchTilt() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = document.querySelectorAll('.podium-card, .store-voucher-card, .leaderboard-prize-card');
    
    cards.forEach(card => {
      // Create glare overlay if not present
      let glare = card.querySelector('.card-specular-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-specular-glare';
        glare.style.cssText = 'position:absolute;inset:0;pointer-events:none;border-radius:inherit;opacity:0;transition:opacity 0.25s ease;z-index:2;mix-blend-mode:overlay;';
        if (getComputedStyle(card).position === 'static') {
          card.style.position = 'relative';
        }
        card.style.overflow = 'hidden';
        card.appendChild(glare);
      }

      card.addEventListener('pointerenter', () => {
        card.style.transition = 'transform 0.12s ease-out, box-shadow 0.2s ease-out';
        glare.style.opacity = '1';
      });

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg tilt
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 65%)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease';
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        glare.style.opacity = '0';
      });
    });
  }

  // ========================================================
  // 6. AUTO-INITIALIZE ON DOM READY
  // ========================================================
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Touch & Press feedback
    initInstantPressFeedback();

    // 2. Initialize 3D Tactile Tilt & Specular Glare (Atropos-inspired)
    init3DTouchTilt();

    // 3. Attach FLIP animations to dynamic containers
    window.autoAnimateList('#bh-slots-tbody');
    window.autoAnimateList('#bh-guesses-list');
    window.autoAnimateList('#leaderboard-tbody');
    window.autoAnimateList('.stream-fused-section .modules-grid');

    // 4. Intercept balance updates to animate smoothly
    if (window.houseGames) {
      const origRenderBalance = window.houseGames.renderBalance.bind(window.houseGames);
      let prevBalance = window.houseGames.balance || 0;

      window.houseGames.renderBalance = function () {
        localStorage.setItem('hunthub_balance', this.balance.toString());
        const els = document.querySelectorAll('.user-balance-val');
        els.forEach((el) => {
          window.animateNumber(el, this.balance, { startVal: prevBalance, decimals: 0 });
        });
        prevBalance = this.balance;
      };
    }

    // 5. Wire confetti to game payouts and bonus hunt completions
    window.addEventListener('hunthub:win', (e) => {
      const amount = e.detail?.amount || 0;
      if (amount >= 500) {
        window.fireJackpotCannons();
      } else {
        window.fireCasinoConfetti({ particleCount: 40 });
      }
    });

    console.log('[DiggityBets MotionFX] Atropos 3D Tilt, Apple Easing & 60 FPS FLIP Active');
  });

})(window, document);
