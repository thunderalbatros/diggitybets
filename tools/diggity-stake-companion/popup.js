/**
 * DiggityBets Stake Companion — Toolbar Popup Controller
 */
'use strict';

(function() {
  const slotInp = document.getElementById('popup-slot');
  const betInp = document.getElementById('popup-bet');
  const callerInp = document.getElementById('popup-caller');
  const statusEl = document.getElementById('popup-status');

  chrome.storage.local.get(['diggity_last_slot_name', 'diggity_last_bet_size', 'diggity_caller_handle'], (stored) => {
    if (stored && stored.diggity_last_slot_name && slotInp) {
      slotInp.value = stored.diggity_last_slot_name;
    }
    if (stored && stored.diggity_last_bet_size && betInp) {
      betInp.value = Number(stored.diggity_last_bet_size).toFixed(2);
    }
    if (stored && stored.diggity_caller_handle && callerInp) {
      callerInp.value = stored.diggity_caller_handle;
    }
  });

  chrome.runtime.sendMessage({ action: 'GET_ACTIVE_STAKE_CONTEXT' }, (resp) => {
    if (resp && resp.ok && resp.slotName && slotInp) {
      slotInp.value = resp.slotName;
    }
  });

  function capture(bonusTier) {
    const slotName = (slotInp && slotInp.value.trim()) || 'Wanted Dead or a Wild';
    const betSize = betInp ? (parseFloat(betInp.value) || 2.0) : 2.0;
    const caller = (callerInp && callerInp.value.trim()) || '@StakeAutoCapture';

    const payload = {
      source: 'DIGGITY_STAKE_COMPANION',
      action: 'AUTO_CAPTURE_BONUS',
      slotName,
      betSize,
      bonusTier,
      caller,
      ts: Date.now()
    };

    chrome.storage.local.set({
      diggity_last_slot_name: slotName,
      diggity_last_bet_size: betSize,
      diggity_caller_handle: caller
    });

    chrome.runtime.sendMessage({ action: 'CAPTURE_FROM_STAKE_CONTENT', payload }, () => {
      if (statusEl) {
        statusEl.textContent = `✓ Sent ${slotName} (${bonusTier} @ $${betSize.toFixed(2)})`;
        statusEl.style.color = '#53fc18';
      }
    });
  }

  document.getElementById('popup-btn-3s').onclick = () => capture('3S');
  document.getElementById('popup-btn-4s').onclick = () => capture('4S');
  document.getElementById('popup-btn-5s').onclick = () => capture('5S');
  document.getElementById('popup-btn-super').onclick = () => capture('SUPER');
})();
