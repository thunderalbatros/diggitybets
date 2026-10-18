/**
 * DiggityBets Stake Companion — Content Script for diggitybets.vip
 * Relays auto-captured bonuses from chrome.storage.local directly into DiggityBets Bonus Hunt.
 */
(function() {
  'use strict';

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.diggity_last_captured_bonus && changes.diggity_last_captured_bonus.newValue) {
        window.postMessage(changes.diggity_last_captured_bonus.newValue, window.location.origin);
      }
    });
  }
})();
