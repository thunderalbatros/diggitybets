/**
 * HuntHub / DiggityBets — Luxury FX Runtime & Physics Engine (2026)
 * Pure Vanilla JS, Spring Dynamics, Magnetic Particle Flight & Collision.
 */

(function(window) {
  'use strict';

  const LuxuryFX = {
    /**
     * Magnetically fly gold coins from a source rect/element into the centered $DIG balance
     */
    flyCoinsToWallet: function(startElementOrEvent, coinCount = 12) {
      let startX, startY;

      if (startElementOrEvent instanceof Event || (startElementOrEvent && startElementOrEvent.clientX !== undefined)) {
        startX = startElementOrEvent.clientX;
        startY = startElementOrEvent.clientY;
      } else if (startElementOrEvent instanceof HTMLElement) {
        const r = startElementOrEvent.getBoundingClientRect();
        startX = r.left + r.width / 2;
        startY = r.top + r.height / 2;
      } else {
        startX = window.innerWidth / 2;
        startY = window.innerHeight / 2 + 100;
      }

      // Target centered $DIG balance pill
      const walletEl = document.getElementById('topbar-dig-balance-pill') || document.querySelector('.topbar-center');
      if (!walletEl) return;

      const targetRect = walletEl.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2;

      let stage = document.getElementById('fx-particle-stage');
      if (!stage) {
        stage = document.createElement('div');
        stage.id = 'fx-particle-stage';
        document.body.appendChild(stage);
      }

      for (let i = 0; i < coinCount; i++) {
        setTimeout(() => {
          const coin = document.createElement('div');
          coin.className = 'coin-particle';
          coin.style.left = `${startX}px`;
          coin.style.top = `${startY}px`;
          stage.appendChild(coin);

          // Control point for quadratic curve trajectory
          const offsetX = (Math.random() - 0.5) * 240;
          const offsetY = -Math.random() * 120 - 40;
          const cpX = (startX + targetX) / 2 + offsetX;
          const cpY = Math.min(startY, targetY) + offsetY;

          const duration = 650 + Math.random() * 250;
          const startTime = performance.now();

          function step(now) {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const ease = 1 - Math.pow(1 - t, 3);

            // Quadratic bezier: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
            const currentX = Math.pow(1 - ease, 2) * startX + 2 * (1 - ease) * ease * cpX + Math.pow(ease, 2) * targetX;
            const currentY = Math.pow(1 - ease, 2) * startY + 2 * (1 - ease) * ease * cpY + Math.pow(ease, 2) * targetY;

            coin.style.transform = `translate3d(${currentX - startX}px, ${currentY - startY}px, 0) scale(${1 - ease * 0.35})`;
            coin.style.opacity = t > 0.85 ? `${(1 - t) / 0.15}` : '1';

            if (t < 1) {
              requestAnimationFrame(step);
            } else {
              coin.remove();
              // Trigger impact bounce on wallet
              if (i === coinCount - 1) {
                walletEl.style.animation = 'fx-pulse-pop 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => {
                  walletEl.style.animation = '';
                }, 400);
              }
            }
          }

          requestAnimationFrame(step);
        }, i * 35);
      }
    },

    /**
     * 60 FPS Mechanical Number Roller (Number-Flow / Popmotion Decay)
     */
    rollNumber: function(el, fromVal, toVal, duration = 800) {
      if (!el) return;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Exponential ease out
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(fromVal + (toVal - fromVal) * ease);
        el.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    },

    /**
     * Spring physics animator (Popmotion physics model)
     */
    spring: function(element, prop, from, to, opts = {}) {
      if (!element) return;
      const stiffness = opts.stiffness || 300;
      const damping = opts.damping || 20;
      const mass = opts.mass || 1;

      let current = from;
      let velocity = opts.velocity || 0;
      let lastTime = performance.now();

      function tick(now) {
        const dt = Math.min((now - lastTime) / 1000, 0.032);
        lastTime = now;

        const springForce = -stiffness * (current - to);
        const dampingForce = -damping * velocity;
        const acceleration = (springForce + dampingForce) / mass;

        velocity += acceleration * dt;
        current += velocity * dt;

        if (prop === 'scale') {
          element.style.transform = `scale(${current})`;
        } else if (prop === 'opacity') {
          element.style.opacity = current;
        } else {
          element.style[prop] = `${current}px`;
        }

        if (Math.abs(current - to) > 0.001 || Math.abs(velocity) > 0.001) {
          requestAnimationFrame(tick);
        } else {
          if (prop === 'scale') element.style.transform = `scale(${to})`;
          else if (prop === 'opacity') element.style.opacity = to;
          else element.style[prop] = `${to}px`;
          if (opts.onComplete) opts.onComplete();
        }
      }

      requestAnimationFrame(tick);
    },

    /**
     * Floating tooltip connector (Floating UI inspired)
     */
    attachTooltip: function(anchor, tooltipEl, options = {}) {
      if (!anchor || !tooltipEl) return;
      const offsetVal = options.offset || 8;

      function update() {
        const r = anchor.getBoundingClientRect();
        const tr = tooltipEl.getBoundingClientRect();

        let top = r.top - tr.height - offsetVal;
        let left = r.left + r.width / 2 - tr.width / 2;

        // Collision check with screen bounds
        if (top < 8) top = r.bottom + offsetVal;
        if (left < 8) left = 8;
        if (left + tr.width > window.innerWidth - 8) left = window.innerWidth - tr.width - 8;

        tooltipEl.style.position = 'fixed';
        tooltipEl.style.top = `${top}px`;
        tooltipEl.style.left = `${left}px`;
      }

      anchor.addEventListener('mouseenter', () => {
        tooltipEl.style.display = 'block';
        update();
      });
      anchor.addEventListener('mouseleave', () => {
        tooltipEl.style.display = 'none';
      });
    }
  };

  window.LuxuryFX = LuxuryFX;
})(typeof window !== 'undefined' ? window : this);
