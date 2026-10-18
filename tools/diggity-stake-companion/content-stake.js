/**
 * DiggityBets Stake Companion — Content Script for stake.com
 * Detects active slot slug/title & bet size and injects a lightweight HUD + Alt+B hotkey.
 */
(function() {
  'use strict';

  function detectActiveSlotName() {
    const m = window.location.pathname.match(/\/casino\/games\/([a-z0-9-]+)/i);
    if (m && m[1]) {
      return m[1]
        .replace(/^(pragmatic|hacksaw|nolimit|push|relax|playngo|avatarux|thunderkick|elk)-/i, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
    }
    const h1 = document.querySelector('h1');
    return h1 ? h1.textContent.trim() : 'Wanted Dead or a Wild';
  }

  function sendBonusCapture(bonusTier = '3S') {
    const slotName = detectActiveSlotName();
    const betInp = document.getElementById('diggity-ext-bet');
    const betSize = betInp ? (parseFloat(betInp.value) || 2.0) : 2.0;
    const payload = {
      source: 'DIGGITY_STAKE_COMPANION',
      action: 'AUTO_CAPTURE_BONUS',
      slotName,
      betSize,
      bonusTier,
      caller: '@StakeAutoCapture',
      ts: Date.now()
    };
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ diggity_last_captured_bonus: payload });
    }
    const statusEl = document.getElementById('diggity-ext-status');
    if (statusEl) {
      statusEl.textContent = `✓ Sent: ${slotName} (${bonusTier} @ $${betSize.toFixed(2)})`;
    }
  }

  function mountHud() {
    if (document.getElementById('diggity-stake-hud')) return;
    const hud = document.createElement('div');
    hud.id = 'diggity-stake-hud';
    hud.style.cssText = 'position:fixed;bottom:16px;left:16px;z-index:999999;background:rgba(8,10,15,0.94);border:1.5px solid #00e701;border-radius:12px;padding:10px 12px;color:#fff;font-family:sans-serif;font-size:12px;box-shadow:0 10px 30px rgba(0,0,0,0.75);min-width:230px;';
    hud.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <strong style="color:#53fc18;font-size:11px;letter-spacing:0.5px;">⚡ DIGGITY AUTO-HUNT HUD</strong>
        <span style="font-size:10px;color:#94a3b8;">Alt+B</span>
      </div>
      <div id="diggity-ext-slot" style="font-weight:800;color:#ffd700;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></div>
      <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
        <span style="font-size:11px;color:#cbd5e1;">Bet $:</span>
        <input id="diggity-ext-bet" type="number" value="2.00" step="0.20" style="width:65px;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:6px;padding:3px 6px;font-size:11px;">
        <button id="diggity-ext-btn-3s" type="button" style="background:#00e701;color:#000;border:none;border-radius:6px;padding:4px 8px;font-weight:800;font-size:11px;cursor:pointer;">+3S</button>
        <button id="diggity-ext-btn-5s" type="button" style="background:#ffd700;color:#000;border:none;border-radius:6px;padding:4px 8px;font-weight:800;font-size:11px;cursor:pointer;">+5S</button>
        <button id="diggity-ext-btn-super" type="button" style="background:#ff2a5f;color:#fff;border:none;border-radius:6px;padding:4px 8px;font-weight:800;font-size:11px;cursor:pointer;">+SUPER</button>
      </div>
      <div id="diggity-ext-status" style="font-size:10px;color:#38bdf8;">Ready — Synced with diggitybets.vip</div>
    `;
    document.body.appendChild(hud);
    const slotLabelEl = document.getElementById('diggity-ext-slot');
    if (slotLabelEl) slotLabelEl.textContent = detectActiveSlotName();

    document.getElementById('diggity-ext-btn-3s').onclick = () => sendBonusCapture('3S');
    document.getElementById('diggity-ext-btn-5s').onclick = () => sendBonusCapture('5S');
    document.getElementById('diggity-ext-btn-super').onclick = () => sendBonusCapture('SUPER');

    setInterval(() => {
      const el = document.getElementById('diggity-ext-slot');
      if (el) el.textContent = detectActiveSlotName();
    }, 2500);
  }

  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'b' || e.key === 'B')) {
      e.preventDefault();
      sendBonusCapture('3S');
    } else if (e.altKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      sendBonusCapture('SUPER');
    }
  });

  mountHud();
})();
