/**
 * DiggityBets Stake Companion — Content Script for Stake Mirrors (stake.krd, stake.com, stake.bet, etc.)
 * Runs in both top frame (HUD + URL/DOM detector) and child slot iframes (Alt+B / Alt+S keydown forwarding).
 */
(function() {
  'use strict';

  const IS_TOP_FRAME = window === window.top;
  const PROVIDER_PREFIX_RE = /^(pragmatic-play|pragmatic|hacksaw-gaming|hacksaw|nolimit-city|nolimit|push-gaming|push|relax-gaming|relax|play-n-go|playngo|avatarux|thunderkick|elk-studios|elk|paperclip-gaming|paperclip|backseat-gaming|backseat|bullshark-games|bullshark|twist-gaming|twist|massive-studios|massive|titan-gaming|titan)-/i;

  function detectActiveSlotName() {
    // 1. URL slug: /es/casino/games/hacksaw-spicy-six-six-six or /casino/games/...
    const m = window.location.pathname.match(/\/casino\/games\/([a-z0-9-_]+)/i);
    if (m && m[1]) {
      return m[1]
        .replace(PROVIDER_PREFIX_RE, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase())
        .trim();
    }
    // 2. Document title or H1 fallback
    const h1 = document.querySelector('h1');
    if (h1 && h1.textContent.trim()) return h1.textContent.trim();
    if (document.title) {
      const clean = document.title.replace(/\s*[-|–—]\s*(Stake|Play Online|Casino|Tragamonedas).*$/i, '').trim();
      if (clean && clean.toLowerCase() !== 'stake') return clean;
    }
    return 'Wanted Dead or a Wild';
  }

  function sendBonusCapture(bonusTier = '3S') {
    if (!IS_TOP_FRAME) {
      // Forward from child slot iframe to background service worker
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.storage.local.get(['diggity_last_slot_name', 'diggity_last_bet_size', 'diggity_caller_handle'], (stored) => {
          const payload = {
            source: 'DIGGITY_STAKE_COMPANION',
            action: 'AUTO_CAPTURE_BONUS',
            slotName: (stored && stored.diggity_last_slot_name) || 'Wanted Dead or a Wild',
            betSize: (stored && parseFloat(stored.diggity_last_bet_size)) || 2.0,
            bonusTier,
            caller: (stored && stored.diggity_caller_handle) || '@StakeAutoCapture',
            ts: Date.now()
          };
          chrome.runtime.sendMessage({ action: 'CAPTURE_FROM_STAKE_CONTENT', payload }).catch(() => {});
        });
      }
      return;
    }

    const slotName = detectActiveSlotName();
    const betInp = document.getElementById('diggity-ext-bet');
    const callerInp = document.getElementById('diggity-ext-caller');
    const betSize = betInp ? (parseFloat(betInp.value) || 2.0) : 2.0;
    const caller = callerInp && callerInp.value.trim() ? callerInp.value.trim() : '@tarkansky';

    const payload = {
      source: 'DIGGITY_STAKE_COMPANION',
      action: 'AUTO_CAPTURE_BONUS',
      slotName,
      betSize,
      bonusTier,
      caller,
      ts: Date.now()
    };

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({
        diggity_last_captured_bonus: payload,
        diggity_last_slot_name: slotName,
        diggity_last_bet_size: betSize,
        diggity_caller_handle: caller
      });
    }
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({ action: 'CAPTURE_FROM_STAKE_CONTENT', payload }).catch(() => {});
    }

    // Channel A: Direct window.opener postMessage (immune to CSP)
    try {
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage(payload, '*');
      }
    } catch (_) {}

    // Channel B: Cloud Edge POST + Image Beacon (works across any tab/window even without extension storage)
    try {
      fetch('https://diggitybets.vip/api/companion/capture', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (_) {}
    try {
      const beacon = new Image();
      beacon.src = `https://diggitybets.vip/api/companion/capture?beacon=1&slot=${encodeURIComponent(slotName)}&bet=${encodeURIComponent(betSize)}&tier=${encodeURIComponent(bonusTier)}&caller=${encodeURIComponent(caller)}&ts=${payload.ts}`;
    } catch (_) {}

    const statusEl = document.getElementById('diggity-ext-status');
    if (statusEl) {
      statusEl.textContent = `✓ Captured: ${slotName} (${bonusTier} @ $${betSize.toFixed(2)})`;
      statusEl.style.color = '#53fc18';
    }
  }

  // Listen for Alt+B (3S), Alt+4 (4S), Alt+5 (5S), and Alt+S (SUPER) in both top frame and child slot iframes
  window.addEventListener('keydown', (e) => {
    if (e.altKey && (e.code === 'KeyB' || e.key === 'b' || e.key === 'B')) {
      e.preventDefault();
      sendBonusCapture('3S');
    } else if (e.altKey && (e.code === 'Digit4' || e.key === '4')) {
      e.preventDefault();
      sendBonusCapture('4S');
    } else if (e.altKey && (e.code === 'Digit5' || e.key === '5')) {
      e.preventDefault();
      sendBonusCapture('5S');
    } else if (e.altKey && (e.code === 'KeyS' || e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      sendBonusCapture('SUPER');
    }
  }, true);

  if (!IS_TOP_FRAME) return;

  // Listen for background service worker command relay in top frame
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
      if (msg && msg.action === 'TRIGGER_STAKE_HUD_CAPTURE') {
        sendBonusCapture(msg.bonusTier || '3S');
        sendResponse({ handled: true });
        return true;
      }
      return false;
    });
  }

  function mountHud() {
    if (document.getElementById('diggity-stake-hud')) return;
    const hud = document.createElement('div');
    hud.id = 'diggity-stake-hud';
    hud.style.cssText = 'position:fixed;bottom:16px;left:16px;z-index:2147483647;background:rgba(8,10,15,0.95);border:1.5px solid #53fc18;border-radius:12px;padding:10px 12px;color:#fff;font-family:system-ui,-apple-system,sans-serif;font-size:12px;box-shadow:0 12px 32px rgba(0,0,0,0.85);min-width:255px;backdrop-filter:blur(8px);';
    hud.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:8px;">
        <strong style="color:#53fc18;font-size:11px;letter-spacing:0.5px;">⚡ DIGGITY AUTO-HUNT HUD</strong>
        <span style="font-size:10px;color:#94a3b8;background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:4px;">Alt+B / Alt+S</span>
      </div>
      <div id="diggity-ext-slot" style="font-weight:800;color:#ffd700;margin-bottom:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:240px;"></div>
      <div style="display:flex;gap:5px;align-items:center;margin-bottom:6px;">
        <span style="font-size:11px;color:#cbd5e1;">Bet $:</span>
        <input id="diggity-ext-bet" type="number" value="2.00" step="0.20" min="0.10" style="width:62px;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:6px;padding:3px 6px;font-size:11px;font-weight:700;">
        <input id="diggity-ext-caller" type="text" placeholder="@tarkansky" style="width:88px;background:#0f172a;color:#38bdf8;border:1px solid #334155;border-radius:6px;padding:3px 6px;font-size:11px;">
      </div>
      <div style="display:flex;gap:5px;align-items:center;margin-bottom:6px;">
        <button id="diggity-ext-btn-3s" type="button" style="flex:1;background:#53fc18;color:#000;border:none;border-radius:6px;padding:5px 6px;font-weight:800;font-size:11px;cursor:pointer;">+3S</button>
        <button id="diggity-ext-btn-4s" type="button" style="flex:1;background:#38bdf8;color:#000;border:none;border-radius:6px;padding:5px 6px;font-weight:800;font-size:11px;cursor:pointer;">+4S</button>
        <button id="diggity-ext-btn-5s" type="button" style="flex:1;background:#ffd700;color:#000;border:none;border-radius:6px;padding:5px 6px;font-weight:800;font-size:11px;cursor:pointer;">+5S</button>
        <button id="diggity-ext-btn-super" type="button" style="flex:1;background:#ff2a5f;color:#fff;border:none;border-radius:6px;padding:5px 6px;font-weight:800;font-size:11px;cursor:pointer;">+SUPER</button>
      </div>
      <div id="diggity-ext-status" style="font-size:10px;color:#38bdf8;">Ready — Synced with diggitybets.vip</div>
    `;
    document.body.appendChild(hud);

    const slotLabelEl = document.getElementById('diggity-ext-slot');
    const betInp = document.getElementById('diggity-ext-bet');
    const callerInp = document.getElementById('diggity-ext-caller');

    const syncDetectedSlot = () => {
      const detected = detectActiveSlotName();
      if (slotLabelEl) slotLabelEl.textContent = `🎰 ${detected}`;
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.set({ diggity_last_slot_name: detected });
      }
    };
    syncDetectedSlot();

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['diggity_last_bet_size', 'diggity_caller_handle'], (stored) => {
        if (stored && stored.diggity_last_bet_size && betInp) {
          betInp.value = Number(stored.diggity_last_bet_size).toFixed(2);
        }
        if (stored && stored.diggity_caller_handle && callerInp) {
          callerInp.value = stored.diggity_caller_handle;
        }
      });
    }

    if (betInp) {
      betInp.addEventListener('change', () => {
        const v = parseFloat(betInp.value) || 2.0;
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({ diggity_last_bet_size: v });
        }
      });
    }
    if (callerInp) {
      callerInp.addEventListener('change', () => {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
          chrome.storage.local.set({ diggity_caller_handle: callerInp.value.trim() });
        }
      });
    }

    document.getElementById('diggity-ext-btn-3s').onclick = () => sendBonusCapture('3S');
    document.getElementById('diggity-ext-btn-4s').onclick = () => sendBonusCapture('4S');
    document.getElementById('diggity-ext-btn-5s').onclick = () => sendBonusCapture('5S');
    document.getElementById('diggity-ext-btn-super').onclick = () => sendBonusCapture('SUPER');

    setInterval(syncDetectedSlot, 2000);
  }

  if (document.body) {
    mountHud();
  } else {
    window.addEventListener('DOMContentLoaded', mountHud);
  }
})();
