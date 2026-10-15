/**
 * HuntHub — Sonner Toast Engine (Phase 2)
 * Inspired by Emil Kowalski's Sonner & Apple Fluid Gestures.
 * 3D Stacking, Swipe-to-Dismiss, Spring Physics, Zero Blocking Alerts.
 */

(function (window, document) {
  'use strict';

  const APPLE_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
  let toastContainer = null;
  const activeToasts = [];
  let isExpanded = false;

  function ensureContainer() {
    if (!toastContainer || !document.body.contains(toastContainer)) {
      toastContainer = document.createElement('div');
      toastContainer.className = 'sonner-toaster';
      toastContainer.setAttribute('data-sonner-toaster', 'true');
      toastContainer.setAttribute('data-expanded', 'false');
      document.body.appendChild(toastContainer);

      toastContainer.addEventListener('mouseenter', () => {
        isExpanded = true;
        toastContainer.setAttribute('data-expanded', 'true');
        renderStack();
      });

      toastContainer.addEventListener('mouseleave', () => {
        isExpanded = false;
        toastContainer.setAttribute('data-expanded', 'false');
        renderStack();
      });
    }
    return toastContainer;
  }

  function renderStack() {
    const total = activeToasts.length;
    let accumulatedOffset = 0;

    activeToasts.forEach((item, index) => {
      const el = item.element;
      const reverseIndex = total - 1 - index; // 0 is newest (front)

      if (reverseIndex >= 3 && !isExpanded) {
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        el.style.transform = 'translate3d(0, 40px, 0) scale(0.8)';
        return;
      }

      el.style.pointerEvents = 'auto';
      el.style.zIndex = (1000 - reverseIndex).toString();

      if (isExpanded) {
        // Expanded view: stack vertically with gap
        el.style.transform = `translate3d(0, -${accumulatedOffset}px, 0) scale(1)`;
        el.style.opacity = '1';
        accumulatedOffset += (el.offsetHeight || 60) + 10;
      } else {
        // Collapsed 3D card stack
        if (reverseIndex === 0) {
          el.style.transform = 'translate3d(0, 0, 0) scale(1)';
          el.style.opacity = '1';
        } else if (reverseIndex === 1) {
          el.style.transform = 'translate3d(0, -12px, 0) scale(0.94)';
          el.style.opacity = '0.85';
        } else if (reverseIndex === 2) {
          el.style.transform = 'translate3d(0, -24px, 0) scale(0.88)';
          el.style.opacity = '0.65';
        }
      }
    });
  }

  function dismissToast(id) {
    const idx = activeToasts.findIndex((t) => t.id === id);
    if (idx === -1) return;

    const item = activeToasts[idx];
    clearTimeout(item.timer);

    const el = item.element;
    el.style.transform = 'translate3d(120%, 0, 0) scale(0.92)';
    el.style.opacity = '0';
    el.style.transition = `transform 0.22s ${APPLE_EASE}, opacity 0.2s ease`;

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
      const removeIdx = activeToasts.findIndex((t) => t.id === id);
      if (removeIdx !== -1) {
        activeToasts.splice(removeIdx, 1);
        renderStack();
      }
    }, 220);
  }

  function createToast(title, description = '', type = 'info', duration = 3800) {
    ensureContainer();

    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);

    const el = document.createElement('div');
    el.className = `sonner-toast sonner-${type}`;
    el.setAttribute('data-sonner-toast', 'true');
    el.setAttribute('data-type', type);

    const iconMap = {
      success: '✓',
      win: '🪙',
      error: '✕',
      loss: '⚠️',
      info: 'ℹ',
      gold: '🏆'
    };

    const icon = iconMap[type] || '✦';

    el.innerHTML = `
      <div class="sonner-icon">${icon}</div>
      <div class="sonner-content">
        <div class="sonner-title">${title}</div>
        ${description ? `<div class="sonner-desc">${description}</div>` : ''}
      </div>
      <button type="button" class="sonner-close-btn" aria-label="Close">×</button>
    `;

    // Close button click
    el.querySelector('.sonner-close-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      dismissToast(id);
    });

    // Swipe-to-dismiss gesture physics (Pointer Events)
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    el.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.sonner-close-btn')) return;
      startX = e.clientX;
      currentX = 0;
      isDragging = true;
      el.setPointerCapture(e.pointerId);
      el.style.transition = 'none';
    });

    el.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      if (currentX > 0) {
        // Drag to the right
        el.style.transform = `translate3d(${currentX}px, 0, 0)`;
        el.style.opacity = Math.max(0.2, 1 - currentX / 240).toString();
      }
    });

    const finishDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch (_) {}

      if (currentX > 70) {
        // Velocity threshold passed: dismiss
        dismissToast(id);
      } else {
        // Snap back with spring
        el.style.transition = `transform 0.25s ${APPLE_EASE}, opacity 0.2s ease`;
        renderStack();
      }
    };

    el.addEventListener('pointerup', finishDrag);
    el.addEventListener('pointercancel', finishDrag);

    // Auto-dismiss timer
    const timer = setTimeout(() => {
      dismissToast(id);
    }, duration);

    const toastItem = { id, element: el, timer };
    activeToasts.push(toastItem);

    // Initial enter animation: fly in from bottom right
    el.style.transform = 'translate3d(0, 35px, 0) scale(0.92)';
    el.style.opacity = '0';
    toastContainer.appendChild(el);

    // Force layout flush before playing enter animation
    void el.offsetWidth;

    el.style.transition = `transform 0.28s ${APPLE_EASE}, opacity 0.25s ease`;
    renderStack();

    return id;
  }

  // Global Toast API
  window.toast = function (title, description, duration) {
    return createToast(title, description, 'info', duration);
  };

  window.toast.success = function (title, description, duration) {
    return createToast(title, description, 'success', duration);
  };

  window.toast.win = function (title, description, duration) {
    return createToast(title, description, 'win', duration);
  };

  window.toast.error = function (title, description, duration) {
    return createToast(title, description, 'error', duration);
  };

  window.toast.loss = function (title, description, duration) {
    return createToast(title, description, 'loss', duration);
  };

  window.toast.info = function (title, description, duration) {
    return createToast(title, description, 'info', duration);
  };

  window.toast.gold = function (title, description, duration) {
    return createToast(title, description, 'gold', duration);
  };

  window.toast.dismiss = function (id) {
    if (id) {
      dismissToast(id);
    } else {
      activeToasts.forEach((t) => dismissToast(t.id));
    }
  };

  // Wire backward compatibility with existing showToast callers
  window.showToast = function (msg, type = 'info') {
    if (type === 'win') {
      window.toast.win(msg);
    } else if (type === 'loss' || type === 'error') {
      window.toast.error(msg);
    } else if (type === 'success') {
      window.toast.success(msg);
    } else {
      window.toast.info(msg);
    }
  };

})(window, document);
