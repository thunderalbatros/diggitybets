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
  // 2.1 KINETIC TYPOGRAPHY: DECRYPTED / SCRAMBLE TEXT (Anime.js v4 & React Bits Style)
  // ========================================================
  window.scrambleText = function (elOrId, targetText, options = {}) {
    const el = typeof elOrId === 'string' ? document.getElementById(elOrId) : elOrId;
    if (!el) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = targetText;
      return;
    }

    const chars = options.characters || '0123456789$!#%&*ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const duration = options.duration || 650;
    const finalStr = String(targetText);
    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const revealedCount = Math.floor(easedProgress * finalStr.length);

      let output = '';
      for (let i = 0; i < finalStr.length; i++) {
        if (i < revealedCount) {
          output += finalStr[i];
        } else if (finalStr[i] === ' ') {
          output += ' ';
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      el.textContent = output;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = finalStr;
        if (typeof options.onComplete === 'function') options.onComplete();
      }
    }

    requestAnimationFrame(frame);
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

    // Measure new positions and run composite-only inverse transforms (Two-Pass FLIP: Read all first, then Write all)
    function play() {
      const children = Array.from(container.children);
      if (children.length === 0) return;

      // Pass 1: Read all bounding boxes in a single layout pass
      const measurements = children.map((child) => {
        const first = flipCoords.get(child);
        const last = child.getBoundingClientRect();
        flipCoords.set(child, last);
        return { child, first, last };
      });

      // Pass 2: Trigger composite WAAPI animations without reading layout
      measurements.forEach(({ child, first, last }) => {
        if (first) {
          const dx = first.left - last.left;
          const dy = first.top - last.top;

          if (dx !== 0 || dy !== 0) {
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
    const cards = document.querySelectorAll('.podium-card, .leaderboard-prize-card');
    
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

      let cachedRect = null;
      let tiltRafId = null;
      let pendingX = 0;
      let pendingY = 0;

      card.addEventListener('pointerenter', () => {
        cachedRect = card.getBoundingClientRect();
        card.style.transition = 'transform 0.12s ease-out, box-shadow 0.2s ease-out';
        glare.style.opacity = '1';
      });

      card.addEventListener('pointermove', (e) => {
        if (!cachedRect) cachedRect = card.getBoundingClientRect();
        pendingX = e.clientX - cachedRect.left;
        pendingY = e.clientY - cachedRect.top;
        if (tiltRafId) return;
        tiltRafId = requestAnimationFrame(() => {
          tiltRafId = null;
          if (!cachedRect || !cachedRect.width || !cachedRect.height) return;
          const centerX = cachedRect.width / 2;
          const centerY = cachedRect.height / 2;
          const rotateX = ((pendingY - centerY) / centerY) * -6; // max 6 deg tilt
          const rotateY = ((pendingX - centerX) / centerX) * 6;

          card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
          const glareX = (pendingX / cachedRect.width) * 100;
          const glareY = (pendingY / cachedRect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 65%)`;
        });
      });

      card.addEventListener('pointerleave', () => {
        if (tiltRafId) {
          cancelAnimationFrame(tiltRafId);
          tiltRafId = null;
        }
        cachedRect = null;
        card.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease';
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        glare.style.opacity = '0';
      });
    });
  }

  // ========================================================
  // 6. SOTA 2026 CASINO FX: 3D COIN RAIN & SIDE CONFETTI CANNONS
  // Inspired by tsParticles 3D physics (roll, tilt, wobble) & PixiJS v8
  // ========================================================
  let fxCanvas = null;
  let fxCtx = null;
  let fxAnimationId = null;
  let fxResizeBound = false;
  let _digCoinSprite = null;
  const activeCoins = [];
  const activeConfetti = [];

  function syncFxCanvasSize() {
    if (!fxCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(window.innerWidth * dpr);
    const targetH = Math.round(window.innerHeight * dpr);
    if (fxCanvas.width !== targetW || fxCanvas.height !== targetH) {
      fxCanvas.width = targetW;
      fxCanvas.height = targetH;
      fxCtx = fxCanvas.getContext('2d');
      fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  function getOrCreateFxCanvas() {
    if (fxCanvas && fxCanvas.isConnected) {
      syncFxCanvasSize();
      return { canvas: fxCanvas, ctx: fxCtx };
    }
    fxCanvas = document.getElementById('hunthub-fx-canvas') || document.getElementById('fxCanvas');
    if (!fxCanvas) {
      fxCanvas = document.createElement('canvas');
      fxCanvas.id = 'hunthub-fx-canvas';
      fxCanvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:999999;';
      document.body.appendChild(fxCanvas);
    }
    fxCtx = fxCanvas.getContext('2d');
    syncFxCanvasSize();

    if (!fxResizeBound) {
      fxResizeBound = true;
      window.addEventListener('resize', () => {
        if (!fxCanvas || !fxAnimationId) return;
        syncFxCanvasSize();
      }, { passive: true });
    }

    return { canvas: fxCanvas, ctx: fxCtx };
  }

  function getDigCoinSprite() {
    if (_digCoinSprite) return _digCoinSprite;
    const size = 64;
    const half = size / 2;
    const r = 28;
    const off = document.createElement('canvas');
    off.width = size;
    off.height = size;
    const c = off.getContext('2d');
    c.translate(half, half);

    const grad = c.createRadialGradient(0, 0, r * 0.2, 0, 0, r);
    grad.addColorStop(0, '#fff4b8');
    grad.addColorStop(0.3, '#ffd700');
    grad.addColorStop(0.75, '#d49b14');
    grad.addColorStop(1, '#8c6008');

    c.beginPath();
    c.arc(0, 0, r, 0, Math.PI * 2);
    c.fillStyle = grad;
    c.fill();

    c.beginPath();
    c.arc(0, 0, r * 0.82, 0, Math.PI * 2);
    c.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    c.lineWidth = 1.8;
    c.stroke();

    c.fillStyle = '#664303';
    c.font = 'bold 13px "Chakra Petch", sans-serif';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText('$DIG', 0, 0.8);

    c.fillStyle = '#fff6bd';
    c.fillText('$DIG', 0, -0.8);

    _digCoinSprite = off;
    return _digCoinSprite;
  }

  window.spawnCasinoCoinRain = function (options = {}) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { canvas } = getOrCreateFxCanvas();
    if (!canvas) return;

    const count = options.count || 42;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Trigger synchronized Tone.js / MetalSynth gold coin cascade
    if (options.sound !== false && window.ProAudioFX) {
      window.ProAudioFX.playSkyCoinShower(2.8, Math.min(count, 36));
    }

    for (let i = 0; i < count; i++) {
      activeCoins.push({
        x: Math.random() * (w - 80) + 40,
        y: -50 - Math.random() * 320,
        vx: (Math.random() - 0.5) * 2.4,
        vy: 2.4 + Math.random() * 4.2,
        gravity: 0.36,
        floorY: h - 30 - Math.random() * 40,
        bounces: 0,
        maxBounces: 2 + Math.floor(Math.random() * 2),
        restitution: 0.44 + Math.random() * 0.12,
        radius: 18 + Math.random() * 5,
        rollAngle: Math.random() * Math.PI * 2,
        rollSpeed: 0.08 + Math.random() * 0.09,
        tiltAngle: Math.random() * Math.PI * 2,
        tiltSpeed: 0.05 + Math.random() * 0.06,
        wobbleAngle: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.09,
        wobbleDistance: 16 + Math.random() * 12,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.07,
        alpha: 1.0,
        settled: false
      });
    }

    startGlobalFxLoop();
  };

  window.spawnSideConfettiCannons = function (options = {}) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const { canvas } = getOrCreateFxCanvas();
    if (!canvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const colors = options.colors || ['#ffd700', '#53fc18', '#00e5ff', '#fff1a8', '#f8fafc', '#ff2a5f'];

    // Trigger synchronized pneumatic cannon thump
    if (options.sound !== false && window.ProAudioFX) {
      window.ProAudioFX.playConfettiBurst();
    }

    // Left cannon
    for (let i = 0; i < 48; i++) {
      const angle = (-58 + (Math.random() * 30 - 15)) * (Math.PI / 180);
      const speed = 18 + Math.random() * 14;
      activeConfetti.push({
        x: 25, y: h - 25,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.38,
        drag: 0.965,
        size: 8 + Math.random() * 7,
        aspect: 0.4 + Math.random() * 0.8,
        rollAngle: Math.random() * Math.PI * 2,
        rollSpeed: 0.08 + Math.random() * 0.12,
        tiltAngle: Math.random() * Math.PI * 2,
        tiltSpeed: 0.06 + Math.random() * 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        life: 0,
        maxLife: 190 + Math.floor(Math.random() * 60)
      });
    }

    // Right cannon
    for (let i = 0; i < 48; i++) {
      const angle = (-122 + (Math.random() * 30 - 15)) * (Math.PI / 180);
      const speed = 18 + Math.random() * 14;
      activeConfetti.push({
        x: w - 25, y: h - 25,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.38,
        drag: 0.965,
        size: 8 + Math.random() * 7,
        aspect: 0.4 + Math.random() * 0.8,
        rollAngle: Math.random() * Math.PI * 2,
        rollSpeed: 0.08 + Math.random() * 0.12,
        tiltAngle: Math.random() * Math.PI * 2,
        tiltSpeed: 0.06 + Math.random() * 0.08,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        life: 0,
        maxLife: 190 + Math.floor(Math.random() * 60)
      });
    }

    startGlobalFxLoop();
  };

  function startGlobalFxLoop() {
    if (fxAnimationId) return;
    const { canvas, ctx } = getOrCreateFxCanvas();
    if (!canvas || !ctx) return;

    function loop() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      let activeCount = 0;

      // Confetti ribbons & squares update
      for (let i = activeConfetti.length - 1; i >= 0; i--) {
        const p = activeConfetti[i];
        p.life++;
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rollAngle += p.rollSpeed;
        p.tiltAngle += p.tiltSpeed;

        if (p.life > p.maxLife - 30) {
          p.alpha = Math.max(0, (p.maxLife - p.life) / 30);
        }

        if (p.alpha > 0.01 && p.y < h + 50) {
          activeCount++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.scale(Math.cos(p.rollAngle), Math.sin(p.tiltAngle));
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fillRect(-p.size / 2, -p.size * p.aspect / 2, p.size, p.size * p.aspect);
          ctx.restore();
        } else {
          activeConfetti.splice(i, 1);
        }
      }

      // 3D $DIG Gold Coins update
      for (let i = activeCoins.length - 1; i >= 0; i--) {
        const c = activeCoins[i];
        if (!c.settled) {
          c.vy += c.gravity;
          c.x += c.vx;
          c.y += c.vy;
          c.rollAngle += c.rollSpeed;
          c.tiltAngle += c.tiltSpeed;
          c.rotation += c.vRot;
          c.wobbleAngle += c.wobbleSpeed;

          // Floor bounce
          if (c.y >= c.floorY && c.vy > 0) {
            c.vy = -c.vy * c.restitution;
            c.vx *= 0.72;
            c.bounces++;
            if (c.bounces >= c.maxBounces || Math.abs(c.vy) < 1.0) {
              c.settled = true;
              c.vy = 0;
              c.vx = 0;
            }
          }
        } else {
          c.alpha -= 0.009;
        }

        if (c.alpha > 0.01) {
          activeCount++;
          const wobbleX = c.x + Math.sin(c.wobbleAngle) * (c.settled ? 0 : c.wobbleDistance * 0.25);
          drawVectorCoinGlobal(ctx, wobbleX, c.y, c.radius, c.rollAngle, c.tiltAngle, c.rotation, c.alpha);
        } else {
          activeCoins.splice(i, 1);
        }
      }

      if (activeCount > 0) {
        fxAnimationId = requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, w, h);
        fxAnimationId = null;
        if (fxCanvas) {
          fxCanvas.width = 1;
          fxCanvas.height = 1;
        }
      }
    }

    fxAnimationId = requestAnimationFrame(loop);
  }

  function drawVectorCoinGlobal(ctx, x, y, r, rollAngle, tiltAngle, rotation, alpha) {
    const scaleX = Math.cos(rollAngle);
    const scaleY = Math.cos(tiltAngle);
    const sprite = getDigCoinSprite();

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scaleX, scaleY);
    ctx.globalAlpha = alpha;

    ctx.drawImage(sprite, -r, -r, r * 2, r * 2);

    // Specular shine glint when flipping through edge-on
    if (Math.abs(scaleX) < 0.28) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.fillRect(-r * 0.8, -r * 0.2, r * 1.6, r * 0.4);
    }

    ctx.restore();
  }

  // ========================================================
  // 7. AUTO-INITIALIZE ON DOM READY
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

    // 5. Wire SOTA 3D Coin Rain and ProAudioFX to game payouts
    window.addEventListener('hunthub:win', (e) => {
      const amount = e.detail?.amount || 0;
      if (amount >= 1000) {
        window.spawnCasinoCoinRain({ count: 46 });
        window.spawnSideConfettiCannons();
      } else if (amount >= 400) {
        window.spawnSideConfettiCannons();
      } else {
        window.fireCasinoConfetti({ particleCount: 35 });
      }
    });

    // 6. SOTA Bento Card Radial Glow Spotlight Tracker (Zero Layout Thrash)
    document.addEventListener('pointermove', (e) => {
      const cards = document.querySelectorAll('.bento-card');
      if (!cards.length) return;
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isNear = (
          e.clientX >= rect.left - 180 &&
          e.clientX <= rect.right + 180 &&
          e.clientY >= rect.top - 180 &&
          e.clientY <= rect.bottom + 180
        );
        if (isNear) {
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        }
      });
    }, { passive: true });

    // 7. Universal Tactile Click Feedback (Reflect.app inspired — Zero Clash Routing)
    document.addEventListener('click', (e) => {
      // 1. Navigation items and sidebar links are handled with playNavTab in SPA router — skip here to avoid clash
      const navTarget = e.target.closest('a[data-target], a.nav-link-btn, .footer-links-row a, a[href^="#"]');
      if (navTarget) return;

      // 2. Chip buttons and bet modifiers play authentic ceramic chip clack — skip generic tactile click to avoid dual-trigger
      const chipTarget = e.target.closest('.chip-btn, [data-chip], .btn-chip, .btn-half-bet, .btn-double-bet');
      if (chipTarget) {
        if (window.soundEngine && typeof window.soundEngine.playChip === 'function') {
          window.soundEngine.playChip();
        } else if (window.ProAudioFX && typeof window.ProAudioFX.playChipDrop === 'function') {
          window.ProAudioFX.playChipDrop();
        }
        return;
      }

      // 3. Mini-game tabs in House Games (.hg-tab-btn) are handled by playNavTab
      const gameTab = e.target.closest('.hg-tab-btn');
      if (gameTab) return;

      // 4. Standard UI buttons, toggles, controls
      const target = e.target.closest('button, .btn, .nav-tab, input[type="button"], input[type="submit"], .sidebar-collapse-btn');
      if (target) {
        if (window.soundEngine && typeof window.soundEngine.playTactileClick === 'function') {
          window.soundEngine.playTactileClick();
        } else if (window.ProAudioFX && typeof window.ProAudioFX.playTactileClick === 'function') {
          window.ProAudioFX.playTactileClick();
        }
      }
    }, { passive: true });

    console.log('[DiggityBets MotionFX] SOTA 2026 3D Coin Rain, Bento Radial Glow & ProAudioFX Active');
  });

})(window, document);
