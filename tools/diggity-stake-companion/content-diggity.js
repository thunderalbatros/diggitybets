/**
 * DiggityBets Stake Companion — Content Script for diggitybets.vip
 * Relays auto-captured bonuses from chrome.storage.local and chrome.runtime.onMessage directly into DiggityBets Bonus Hunt.
 */
(function() {
  'use strict';

  let lastRelayedTs = 0;

  function forwardToPage(payload) {
    if (!payload || payload.action !== 'AUTO_CAPTURE_BONUS') return;
    const ts = Number(payload.ts || 0);
    if (ts > 0 && ts === lastRelayedTs) return;
    if (ts > 0) lastRelayedTs = ts;

    window.postMessage(payload, window.location.origin);
    try {
      window.dispatchEvent(new CustomEvent('diggity:companion-capture', { detail: payload }));
    } catch (_) {}
  }

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.diggity_last_captured_bonus && changes.diggity_last_captured_bonus.newValue) {
        forwardToPage(changes.diggity_last_captured_bonus.newValue);
      }
    });
  }

  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg && msg.source === 'DIGGITY_STAKE_COMPANION' && msg.action === 'AUTO_CAPTURE_BONUS') {
        forwardToPage(msg);
      }
    });
  }
})();
