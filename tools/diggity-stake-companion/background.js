/**
 * DiggityBets Stake Companion — Background Service Worker (Manifest V3)
 * Handles browser-level Alt+B / Alt+S commands even when keyboard focus is trapped inside a cross-origin slot provider iframe (Hacksaw, Pragmatic, Nolimit, etc.),
 * and relays captured bonuses to all open DiggityBets tabs + chrome.storage.local.
 */
'use strict';

const PROVIDER_PREFIX_RE = /^(pragmatic-play|pragmatic|hacksaw-gaming|hacksaw|nolimit-city|nolimit|push-gaming|push|relax-gaming|relax|play-n-go|playngo|avatarux|thunderkick|elk-studios|elk|paperclip-gaming|paperclip|backseat-gaming|backseat|bullshark-games|bullshark|twist-gaming|twist|massive-studios|massive|titan-gaming|titan)-/i;

function extractSlotNameFromUrlOrTitle(url = '', title = '') {
  const m = String(url).match(/\/casino\/games\/([a-z0-9-_]+)/i);
  if (m && m[1]) {
    return m[1]
      .replace(PROVIDER_PREFIX_RE, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim();
  }
  if (title) {
    const cleanTitle = String(title)
      .replace(/\s*[-|–—]\s*(Stake|Play Online|Casino|Tragamonedas).*$/i, '')
      .trim();
    if (cleanTitle && cleanTitle.toLowerCase() !== 'stake') return cleanTitle;
  }
  return 'Wanted Dead or a Wild';
}

async function broadcastCaptureToDiggityTabs(payload) {
  try {
    await chrome.storage.local.set({
      diggity_last_captured_bonus: payload,
      diggity_last_slot_name: payload.slotName,
      diggity_last_bet_size: payload.betSize
    });
  } catch (_) {}

  try {
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (!tab.id || !tab.url) continue;
      if (/diggitybets\.vip|pages\.dev|localhost|127\.0\.0\.1/i.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, payload).catch(() => {});
      }
    }
  } catch (_) {}
}

async function triggerBonusCaptureFromCommand(bonusTier = '3S') {
  try {
    const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    let slotName = 'Wanted Dead or a Wild';
    let betSize = 2.0;
    let caller = '';

    const stored = await chrome.storage.local.get(['diggity_last_slot_name', 'diggity_last_bet_size', 'diggity_caller_handle']);
    if (stored.diggity_last_bet_size) betSize = parseFloat(stored.diggity_last_bet_size) || 2.0;
    if (stored.diggity_caller_handle) caller = String(stored.diggity_caller_handle).trim();

    if (activeTab && activeTab.id) {
      slotName = extractSlotNameFromUrlOrTitle(activeTab.url || '', activeTab.title || '');
      try {
        const resp = await chrome.tabs.sendMessage(activeTab.id, {
          action: 'TRIGGER_STAKE_HUD_CAPTURE',
          bonusTier
        });
        if (resp && resp.handled) return;
      } catch (_) {}
    } else if (stored.diggity_last_slot_name) {
      slotName = stored.diggity_last_slot_name;
    }

    const payload = {
      source: 'DIGGITY_STAKE_COMPANION',
      action: 'AUTO_CAPTURE_BONUS',
      slotName,
      betSize,
      bonusTier,
      caller: caller || '@StakeAutoCapture',
      ts: Date.now()
    };
    await broadcastCaptureToDiggityTabs(payload);
  } catch (_) {}
}

chrome.commands.onCommand.addListener((command) => {
  if (command === 'capture-bonus-3s') {
    triggerBonusCaptureFromCommand('3S');
  } else if (command === 'capture-bonus-super') {
    triggerBonusCaptureFromCommand('SUPER');
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || typeof msg !== 'object') return false;

  if (msg.action === 'CAPTURE_FROM_STAKE_CONTENT' && msg.payload) {
    broadcastCaptureToDiggityTabs(msg.payload).then(() => {
      sendResponse({ ok: true });
    });
    return true;
  }

  if (msg.action === 'GET_ACTIVE_STAKE_CONTEXT') {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then((tabs) => {
      const tab = tabs && tabs[0];
      const slotName = tab ? extractSlotNameFromUrlOrTitle(tab.url || '', tab.title || '') : 'Wanted Dead or a Wild';
      sendResponse({
        ok: true,
        slotName,
        url: (tab && tab.url) || ''
      });
    }).catch(() => {
      sendResponse({ ok: false, slotName: 'Wanted Dead or a Wild', url: '' });
    });
    return true;
  }

  return false;
});
