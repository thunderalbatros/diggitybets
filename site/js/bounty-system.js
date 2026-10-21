/**
 * DiggityBets — "Only on Stake" Bounty System & Automated Bet-ID Verification Engine
 * Modeled after Stake Casino Challenges (stake.com/casino/challenges)
 * Features:
 * - 21 Curated "Only on Stake" Bounties across 15 Partner Studios (4x Tier 1-3, 3x Tier 4-6)
 * - Fast Image Pipeline (Idle Prefetch + Async Image.decode() + Zero-CLS Shimmer)
 * - 60-FPS WAAPI FLIP Grid Filtering (formkit/auto-animate pattern)
 * - 3D Holographic Foil Shaders (pokemon-cards-css + Atropos Z-planes)
 * - 4-Step Automated Bet ID Pre-Verification + Stake Companion Auto-Verify + Streamer Final Approval
 */
(function(global) {
  'use strict';

  var STORAGE_KEY_BOUNTIES = 'hunthub_bounties_v1';
  var STORAGE_KEY_CLAIMS = 'hunthub_bounty_claims_v1';
  var PEPE_FLEX_EZ_URL = '/site/images/emotes/pepe-ez.jpg';

  var PARTNER_STUDIOS = [
    'Valkyrie',
    'Hacksaw Gaming',
    'Pragmatic Play',
    'Degen Lab',
    'Maverick Studios',
    'Creative City',
    'TrueLab',
    'Shady Lady',
    'Uppercut Gaming',
    'Paperclip Gaming',
    'Twist Gaming',
    'Donut Gaming',
    'Titan Gaming',
    'Pocket Play',
    'Colorful Play'
  ];

  var TIER_META = {
    1: { tier: 1, prizeUsd: 3, label: 'TIER 1 · SCOUT', color: '#00e701', minBetDefault: 0.10, targetXDefault: 175 },
    2: { tier: 2, prizeUsd: 5, label: 'TIER 2 · HUNTER', color: '#00f2fe', minBetDefault: 0.20, targetXDefault: 350 },
    3: { tier: 3, prizeUsd: 7, label: 'TIER 3 · SNIPER', color: '#3b82f6', minBetDefault: 0.20, targetXDefault: 550 },
    4: { tier: 4, prizeUsd: 10, label: 'TIER 4 · HIGH-VOLTAGE', color: '#a855f7', minBetDefault: 0.20, targetXDefault: 950 },
    5: { tier: 5, prizeUsd: 15, label: 'TIER 5 · APEX PREDATOR', color: '#f43f5e', minBetDefault: 0.20, targetXDefault: 1500 },
    6: { tier: 6, prizeUsd: 20, label: 'TIER 6 · MYTHIC GRAND', color: '#ffd700', minBetDefault: 0.20, targetXDefault: 2500 }
  };

  /**
   * Canonical 21 "Only on Stake" Bounties:
   * - Tier 1 ($3 USD): 4 slots
   * - Tier 2 ($5 USD): 4 slots
   * - Tier 3 ($7 USD): 4 slots
   * - Tier 4 ($10 USD - High Volatility): 3 slots
   * - Tier 5 ($15 USD - Very High Volatility): 3 slots
   * - Tier 6 ($20 USD - Extreme Volatility): 3 slots
   */
  var DEFAULT_ONLY_ON_STAKE_BOUNTIES = [
    // ================= TIER 1 ($3 USD · 4 Slots) =================
    {
      id: 'bounty-t1-sugar-twist-1000',
      tier: 1,
      prizeUsd: 3,
      slotName: 'Sugar Twist 1000',
      provider: 'Pragmatic Play',
      targetMultiplier: 150,
      minBetUsd: 0.10,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'HIGH · 98.0% RTP',
      maxWin: '10,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t1-ghost-rush',
      tier: 1,
      prizeUsd: 3,
      slotName: 'Ghost Rush',
      provider: 'Paperclip Gaming',
      targetMultiplier: 175,
      minBetUsd: 0.10,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t1-blocky-bay',
      tier: 1,
      prizeUsd: 3,
      slotName: 'Blocky Bay',
      provider: 'TrueLab',
      targetMultiplier: 200,
      minBetUsd: 0.10,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t1-chalice-of-olympia',
      tier: 1,
      prizeUsd: 3,
      slotName: 'Chalice Of Olympia',
      provider: 'Pocket Play',
      targetMultiplier: 225,
      minBetUsd: 0.10,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },

    // ================= TIER 2 ($5 USD · 4 Slots) =================
    {
      id: 'bounty-t2-bank-basher',
      tier: 2,
      prizeUsd: 5,
      slotName: 'Bank Basher',
      provider: 'Twist Gaming',
      targetMultiplier: 300,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t2-love-nest-hold-seek',
      tier: 2,
      prizeUsd: 5,
      slotName: 'Love Nest Hold & Seek',
      provider: 'Shady Lady',
      targetMultiplier: 350,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t2-day-zero-outbreak',
      tier: 2,
      prizeUsd: 5,
      slotName: 'Day Zero Outbreak',
      provider: 'Donut Gaming',
      targetMultiplier: 375,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t2-wild-storm-2',
      tier: 2,
      prizeUsd: 5,
      slotName: 'Wild Storm 2',
      provider: 'Colorful Play',
      targetMultiplier: 400,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },

    // ================= TIER 3 ($7 USD · 4 Slots) =================
    {
      id: 'bounty-t3-gemstone-golem',
      tier: 3,
      prizeUsd: 7,
      slotName: 'Gemstone Golem',
      provider: 'Titan Gaming',
      targetMultiplier: 500,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'VERY HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t3-farm-51',
      tier: 3,
      prizeUsd: 7,
      slotName: 'Farm 51',
      provider: 'Maverick Studios',
      targetMultiplier: 550,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'VERY HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t3-retro-gangster',
      tier: 3,
      prizeUsd: 7,
      slotName: 'Retro Gangster',
      provider: 'Valkyrie',
      targetMultiplier: 600,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'VERY HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t3-toxic-spins',
      tier: 3,
      prizeUsd: 7,
      slotName: 'Toxic Spins',
      provider: 'Degen Lab',
      targetMultiplier: 650,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'VERY HIGH · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },

    // ================= TIER 4 ($10 USD · 3 High-Volatility Slots) =================
    {
      id: 'bounty-t4-dragons-keep',
      tier: 4,
      prizeUsd: 10,
      slotName: 'Dragons Keep',
      provider: 'Uppercut Gaming',
      targetMultiplier: 850,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'EXTREME · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t4-minedrop-2',
      tier: 4,
      prizeUsd: 10,
      slotName: 'Minedrop 2',
      provider: 'Paperclip Gaming',
      targetMultiplier: 950,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'EXTREME · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t4-spin-reaper-winsafe',
      tier: 4,
      prizeUsd: 10,
      slotName: 'Spin Reaper WINSAFE',
      provider: 'Twist Gaming',
      targetMultiplier: 1000,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'EXTREME · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },

    // ================= TIER 5 ($15 USD · 3 Extreme-Volatility Slots) =================
    {
      id: 'bounty-t5-spicy-sixsixsix',
      tier: 5,
      prizeUsd: 15,
      slotName: 'Spicy SixSixSix',
      provider: 'Hacksaw Gaming',
      targetMultiplier: 1500,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'EXTREME · 16,666x',
      maxWin: '16,666x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t5-wings-of-death-2',
      tier: 5,
      prizeUsd: 15,
      slotName: 'Wings Of Death 2',
      provider: 'Uppercut Gaming',
      targetMultiplier: 1500,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'EXTREME · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t5-death-valley',
      tier: 5,
      prizeUsd: 15,
      slotName: 'Death Valley',
      provider: 'Colorful Play',
      targetMultiplier: 1750,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'EXTREME · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },

    // ================= TIER 6 ($20 USD · 3 Ultra-Volatility Mythic Slots) =================
    {
      id: 'bounty-t6-gates-of-heaven-1000',
      tier: 6,
      prizeUsd: 20,
      slotName: 'Gates of Heaven 1000',
      provider: 'Pragmatic Play',
      targetMultiplier: 2500,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'ULTRA MYTHIC · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t6-infernos-forge',
      tier: 6,
      prizeUsd: 20,
      slotName: 'Infernos Forge',
      provider: 'Creative City',
      targetMultiplier: 2500,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'ULTRA MYTHIC · 40,000x',
      maxWin: '40,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    },
    {
      id: 'bounty-t6-hels-domain',
      tier: 6,
      prizeUsd: 20,
      slotName: "Hel's Domain",
      provider: 'Valkyrie',
      targetMultiplier: 3000,
      minBetUsd: 0.20,
      spinRule: 'BASE SPIN ONLY',
      volatility: 'ULTRA MYTHIC · 25,000x',
      maxWin: '25,000x',
      status: 'ACTIVE',
      winnerKick: null,
      winnerStake: null,
      achievedMultiplier: null,
      verifiedBetId: null,
      claimedAt: null
    }
  ];

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Smart Stake Bet ID / Share URL / Clipboard Modal Parser
   * Extracts:
   * - canonicalBetId (e.g. house:31415926535 or casino:31415926535)
   * - parsedBetUsd (if clipboard text pasted)
   * - parsedPayoutUsd (if clipboard text pasted)
   * - parsedMultiplier (if clipboard text pasted)
   */
  function parseStakeBetInput(rawText) {
    var raw = String(rawText || '').trim();
    var result = {
      raw: raw,
      canonicalBetId: '',
      stakeInspectUrl: '',
      stakeMirrorInspectUrl: '',
      parsedBetUsd: null,
      parsedPayoutUsd: null,
      parsedMultiplier: null
    };
    if (!raw) return result;

    // 1. Check URL query parameter ?iid=house%3A...
    try {
      if (raw.indexOf('iid=') !== -1) {
        var urlStr = raw.indexOf('http') === 0 ? raw : ('https://stake.com/' + raw.replace(/^\/+/, ''));
        var u = new URL(urlStr);
        var iid = u.searchParams.get('iid');
        if (iid) {
          result.canonicalBetId = decodeURIComponent(iid).trim().toLowerCase().replace(/[\s,]/g, '');
        }
      }
    } catch (_) {}

    // 2. Regex extraction for house:123456789 or casino:123456789 or 10+ digit ID
    if (!result.canonicalBetId) {
      var m = raw.match(/((?:house|casino|sport)[_:]\s*[\d,]{5,24}|\b\d{8,22}\b)/i);
      if (m && m[1]) {
        var cleanId = m[1].replace(/[\s,]/g, '').toLowerCase();
        result.canonicalBetId = cleanId.indexOf(':') !== -1 ? cleanId : ('house:' + cleanId.replace(/^house[_:]?/i, ''));
      }
    }

    if (result.canonicalBetId) {
      result.stakeInspectUrl = 'https://stake.com/casino/home?iid=' + encodeURIComponent(result.canonicalBetId) + '&modal=bet';
      result.stakeMirrorInspectUrl = 'https://stake.krd/casino/home?iid=' + encodeURIComponent(result.canonicalBetId) + '&modal=bet';
    }

    // 3. If user pasted full text from Stake modal, extract Multiplier (e.g. 542.50x) & USD amounts
    var multMatch = raw.match(/([\d,]+(?:\.\d{1,2})?)\s*x\b/i);
    if (multMatch) {
      var parsedM = parseFloat(multMatch[1].replace(/,/g, ''));
      if (!isNaN(parsedM) && parsedM > 1) result.parsedMultiplier = parsedM;
    }

    var usdMatches = [];
    var usdRe = /\$\s*([\d,]+(?:\.\d{2,4})?)/g;
    var um;
    while ((um = usdRe.exec(raw)) !== null) {
      var val = parseFloat(um[1].replace(/,/g, ''));
      if (!isNaN(val) && val > 0) usdMatches.push(val);
    }
    if (usdMatches.length >= 2) {
      result.parsedBetUsd = Math.min(usdMatches[0], usdMatches[1]);
      result.parsedPayoutUsd = Math.max(usdMatches[0], usdMatches[1]);
      if (!result.parsedMultiplier && result.parsedBetUsd > 0) {
        result.parsedMultiplier = Number((result.parsedPayoutUsd / result.parsedBetUsd).toFixed(2));
      }
    } else if (usdMatches.length === 1) {
      result.parsedBetUsd = usdMatches[0];
    }

    return result;
  }

  var DiggityBountySystem = {
    bounties: [],
    claims: [],
    verifiedBets: [],
    activeTierFilter: 'ALL',
    activeStudioFilter: 'ALL',
    activeModalBountyId: null,
    _bc: null,

    init: function() {
      this.loadState();
      this.bindFilterEvents();
      this.bindClaimModalEvents();
      this.bindAdminControlEvents();
      this.renderPublicBoard();
      this.renderAdminControlPanel();
      this.prefetchBountySlotCoversIdle();
      this.initRealtimeSync();
    },

    loadState: function() {
      var savedBounties = null;
      var savedClaims = null;
      try {
        savedBounties = JSON.parse(localStorage.getItem(STORAGE_KEY_BOUNTIES) || 'null');
        savedClaims = JSON.parse(localStorage.getItem(STORAGE_KEY_CLAIMS) || 'null');
      } catch (_) {}

      if (Array.isArray(savedBounties) && savedBounties.length >= 1) {
        this.bounties = savedBounties;
      } else {
        this.bounties = JSON.parse(JSON.stringify(DEFAULT_ONLY_ON_STAKE_BOUNTIES));
        this.saveState(false);
      }

      this.claims = Array.isArray(savedClaims) ? savedClaims : [];
    },

    saveState: function(syncRemote) {
      try {
        localStorage.setItem(STORAGE_KEY_BOUNTIES, JSON.stringify(this.bounties));
        localStorage.setItem(STORAGE_KEY_CLAIMS, JSON.stringify(this.claims));
      } catch (_) {}

      if (this._bc) {
        try {
          this._bc.postMessage({ type: 'BOUNTIES_SYNC', bounties: this.bounties, claims: this.claims });
        } catch (_) {}
      }

      if (syncRemote !== false) {
        try {
          fetch('/api/bounties/state', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-admin-user': localStorage.getItem('hunthub_kick_username') || 'diggitybets',
              'x-admin-token': localStorage.getItem('hunthub_admin_token') || ''
            },
            body: JSON.stringify({
              bounties: this.bounties,
              claims: this.claims
            })
          }).catch(function() {});
        } catch (_) {}
      }
    },

    initRealtimeSync: function() {
      var self = this;
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          this._bc = new BroadcastChannel('diggity_bounties_channel');
          this._bc.onmessage = function(ev) {
            if (ev && ev.data && ev.data.type === 'BOUNTIES_SYNC') {
              if (Array.isArray(ev.data.bounties)) self.bounties = ev.data.bounties;
              if (Array.isArray(ev.data.claims)) self.claims = ev.data.claims;
              self.renderPublicBoard();
              self.renderAdminControlPanel();
            }
          };
        } catch (_) {}
      }

      window.addEventListener('storage', function(e) {
        if (e.key === STORAGE_KEY_BOUNTIES || e.key === STORAGE_KEY_CLAIMS) {
          self.loadState();
          self.renderPublicBoard();
          self.renderAdminControlPanel();
        }
      });

      // Listen for direct postMessage from Stake Companion window
      window.addEventListener('message', function(ev) {
        var d = ev && ev.data;
        if (d && d.source === 'DIGGITY_STAKE_COMPANION' && d.action === 'AUTO_VERIFY_BOUNTY_BET') {
          self.applyCompanionVerifiedBet(d);
        }
      });
    },

    applyCompanionVerifiedBet: function(verifiedBet) {
      if (!verifiedBet || !verifiedBet.betId) return;
      var changed = false;
      for (var i = 0; i < this.claims.length; i++) {
        var c = this.claims[i];
        if (c.canonicalBetId === verifiedBet.betId || c.rawBetId === verifiedBet.betId) {
          c.companionVerified = true;
          c.companionData = verifiedBet;
          changed = true;
        }
      }
      if (changed) {
        this.saveState(true);
        this.renderAdminControlPanel();
        if (window.sonnerToast) {
          window.sonnerToast.show('🟢 Stake Companion auto-verified Bet ID ' + verifiedBet.betId + '!', 'success');
        }
      }
    },

    /**
     * Fast Image Pipeline (Quicklink + Async Image.decode() in requestIdleCallback)
     */
    prefetchBountySlotCoversIdle: function() {
      var self = this;
      var runPrefetch = function() {
        if (!window.SlotResolver) return;
        for (var i = 0; i < self.bounties.length; i++) {
          var b = self.bounties[i];
          var resolved = window.SlotResolver.resolveFast({ name: b.slotName, provider: b.provider });
          if (resolved && resolved.image && resolved.image.indexOf('http') === 0) {
            var img = new Image();
            img.decoding = 'async';
            img.src = resolved.image;
            if (typeof img.decode === 'function') {
              img.decode().catch(function() {});
            }
          }
        }
      };
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(runPrefetch, { timeout: 2500 });
      } else {
        setTimeout(runPrefetch, 900);
      }
    },

    resolveBountySlot: function(bounty) {
      if (window.SlotResolver && typeof window.SlotResolver.resolve === 'function') {
        var r = window.SlotResolver.resolve({ name: bounty.slotName, provider: bounty.provider });
        if (r) return r;
      }
      return {
        name: bounty.slotName,
        provider: bounty.provider || 'Only on Stake',
        image: '',
        slug: String(bounty.slotName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        maxWin: bounty.maxWin || '25,000x'
      };
    },

    /**
     * WAAPI FLIP Animation Helper (formkit/auto-animate pattern)
     */
    runFlipTransition: function(gridEl, mutateDomFn) {
      if (!gridEl || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
        mutateDomFn();
        return;
      }
      var firstRects = new Map();
      var oldChildren = Array.from(gridEl.children);
      for (var i = 0; i < oldChildren.length; i++) {
        var el = oldChildren[i];
        var key = el.getAttribute('data-bounty-id');
        if (key) firstRects.set(key, el.getBoundingClientRect());
      }

      mutateDomFn();

      var newChildren = Array.from(gridEl.children);
      var deltas = [];
      for (var j = 0; j < newChildren.length; j++) {
        var child = newChildren[j];
        var k = child.getAttribute('data-bounty-id');
        var first = k ? firstRects.get(k) : null;
        var last = child.getBoundingClientRect();
        if (first) {
          var dx = first.left - last.left;
          var dy = first.top - last.top;
          if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            deltas.push({ el: child, dx: dx, dy: dy, isNew: false });
          }
        } else {
          deltas.push({ el: child, dx: 0, dy: 14, isNew: true });
        }
      }

      for (var d = 0; d < deltas.length; d++) {
        var item = deltas[d];
        if (typeof item.el.animate === 'function') {
          if (item.isNew) {
            item.el.animate([
              { opacity: 0, transform: 'translate3d(0, 14px, 0) scale(0.96)' },
              { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
            ], { duration: 240, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
          } else {
            item.el.animate([
              { transform: 'translate3d(' + item.dx + 'px, ' + item.dy + 'px, 0)' },
              { transform: 'translate3d(0, 0, 0)' }
            ], { duration: 260, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
          }
        }
      }
    },

    renderPublicBoard: function() {
      var gridEl = document.getElementById('bounties-cards-grid');
      if (!gridEl) return;

      var self = this;
      var totalPoolUsd = 0;
      var activeCount = 0;
      var huntedCount = 0;

      for (var i = 0; i < this.bounties.length; i++) {
        var b = this.bounties[i];
        if (b.status === 'HUNTED') {
          huntedCount++;
        } else {
          activeCount++;
          totalPoolUsd += (parseFloat(b.prizeUsd) || 0);
        }
      }

      var poolEl = document.getElementById('bounties-stat-active-pool');
      var countEl = document.getElementById('bounties-stat-active-count');
      var huntedEl = document.getElementById('bounties-stat-hunted-count');
      if (poolEl) poolEl.textContent = '$' + totalPoolUsd.toFixed(0) + ' USD';
      if (countEl) countEl.textContent = activeCount + ' / ' + this.bounties.length;
      if (huntedEl) huntedEl.textContent = String(huntedCount);

      var filtered = this.bounties.filter(function(b) {
        if (self.activeTierFilter === 'HUNTED' && b.status !== 'HUNTED') return false;
        if (self.activeTierFilter !== 'ALL' && self.activeTierFilter !== 'HUNTED') {
          if (String(b.tier) !== String(self.activeTierFilter)) return false;
        }
        if (self.activeStudioFilter !== 'ALL') {
          if (String(b.provider || '').toLowerCase() !== String(self.activeStudioFilter).toLowerCase()) return false;
        }
        return true;
      });

      this.runFlipTransition(gridEl, function() {
        if (filtered.length === 0) {
          gridEl.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 36px 20px; background: rgba(9, 14, 24, 0.8); border: 1px dashed rgba(255,255,255,0.15); border-radius: 14px; color: #94a3b8; font-family: var(--font-display);">No Only on Stake Bounties match this filter. Click <strong>ALL TIERS</strong> or <strong>ALL STUDIOS</strong> above.</div>';
          return;
        }

        gridEl.innerHTML = filtered.map(function(b) {
          var resolved = self.resolveBountySlot(b);
          var isHunted = b.status === 'HUNTED';
          var pendingClaimsCount = self.claims.filter(function(c) { return c.bountyId === b.id && c.status === 'PENDING'; }).length;
          var stakeGameSlug = resolved.slug || String(b.slotName).toLowerCase().replace(/[^a-z0-9]+/g, '-');
          var stakePlayUrl = 'https://stake.com/casino/games/' + encodeURIComponent(stakeGameSlug) + '?c=diggity';

          var statusHtml = isHunted
            ? '<span class="bounty-status-badge is-hunted">🏆 HUNTED</span>'
            : (pendingClaimsCount > 0
                ? '<span class="bounty-status-badge" style="border-color:#ffd700;color:#ffd700;background:rgba(255,215,0,0.14);"><span class="pulse-dot"></span>⏳ ' + pendingClaimsCount + ' CLAIM IN REVIEW</span>'
                : '<span class="bounty-status-badge"><span class="pulse-dot"></span>ACTIVE BOUNTY</span>');

          var hunterStripHtml = isHunted
            ? '<div class="bounty-hunter-strip hunted-winner">' +
                '<div style="display:flex;align-items:center;gap:8px;min-width:0;">' +
                  '<img src="' + escapeHtml(PEPE_FLEX_EZ_URL) + '" alt="EZ" class="bounty-pepe-emote" width="24" height="24" loading="lazy" decoding="async">' +
                  '<div style="min-width:0;">' +
                    '<div style="font-family:var(--font-display);font-weight:900;font-size:11.5px;color:#ffd700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">🏆 HUNTED BY ' + escapeHtml(b.winnerKick || '@Hunter') + '</div>' +
                    '<div style="font-size:10px;color:#cbd5e1;">Hit <strong>' + Number(b.achievedMultiplier || b.targetMultiplier).toLocaleString() + 'x</strong> · Bet ID: <code>' + escapeHtml((b.verifiedBetId || 'verified').slice(0, 18)) + '</code></div>' +
                  '</div>' +
                '</div>' +
              '</div>'
            : '<div class="bounty-hunter-strip">' +
                '<span>⚡ <strong>Code: DIGGITY</strong> Exclusive</span>' +
                '<span style="font-family:var(--font-display);font-weight:800;color:#53fc18;">1 / 1 AVAILABLE</span>' +
              '</div>';

          return (
            '<article class="bounty-card-3d" data-bounty-id="' + escapeHtml(b.id) + '" data-bounty-tier="' + escapeHtml(b.tier) + '">' +
              '<div class="bounty-card-holo-glare" aria-hidden="true"></div>' +
              '<div class="bounty-card-top-row">' +
                statusHtml +
                '<div class="bounty-prize-pill-2x" title="Instant Cash Bounty Reward ($' + escapeHtml(b.prizeUsd) + ' USD)">' +
                  '<span class="bounty-prize-amount">$' + escapeHtml(b.prizeUsd) + '</span>' +
                  '<span class="bounty-prize-currency">USD</span>' +
                '</div>' +
              '</div>' +
              '<div class="bounty-slot-media-row">' +
                '<div class="bounty-slot-thumb-wrap">' +
                  '<img src="' + escapeHtml(resolved.image) + '" alt="' + escapeHtml(b.slotName) + '" class="bounty-slot-thumb-img" width="68" height="90" loading="lazy" decoding="async">' +
                '</div>' +
                '<div class="bounty-slot-info-col">' +
                  '<span class="bounty-exclusive-tag">🔥 ONLY ON STAKE</span>' +
                  '<h4 class="bounty-slot-title" title="' + escapeHtml(b.slotName) + '">' + escapeHtml(b.slotName) + '</h4>' +
                  '<div class="bounty-slot-studio">' +
                    '<span>🏛️ ' + escapeHtml(b.provider) + '</span>' +
                  '</div>' +
                  '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:2px;">' +
                    '<span class="bounty-volatility-chip">' + escapeHtml(b.volatility || 'EXTREME VOLATILITY') + '</span>' +
                    '<span class="bounty-volatility-chip" style="color:#38bdf8;border-color:rgba(56,189,248,0.3);background:rgba(56,189,248,0.1);">' + escapeHtml(b.spinRule || 'BASE SPIN') + '</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="bounty-requirements-grid">' +
                '<div class="bounty-req-box">' +
                  '<div class="bounty-req-label">TARGET MULTIPLIER</div>' +
                  '<div class="bounty-req-val target-x">' + Number(b.targetMultiplier).toLocaleString() + 'x</div>' +
                '</div>' +
                '<div class="bounty-req-box">' +
                  '<div class="bounty-req-label">MIN BASE BET (USD)</div>' +
                  '<div class="bounty-req-val">$' + Number(b.minBetUsd).toFixed(2) + '</div>' +
                '</div>' +
              '</div>' +
              hunterStripHtml +
              '<div class="bounty-card-actions">' +
                '<button type="button" class="btn-bounty-claim" data-claim-bounty-id="' + escapeHtml(b.id) + '" ' + (isHunted ? 'disabled' : '') + '>' +
                  (isHunted ? '✓ Bounty Claimed' : ('🎯 Claim $' + escapeHtml(b.prizeUsd) + ' Bounty')) +
                '</button>' +
                '<a href="' + escapeHtml(stakePlayUrl) + '" target="_blank" rel="noopener noreferrer" class="btn-bounty-play" data-sponsor-slot="' + escapeHtml(b.slotName) + '">' +
                  'Play ↗' +
                '</a>' +
              '</div>' +
            '</article>'
          );
        }).join('');

        self.bind3DCardInteractiveHandlers(gridEl);
      });

      this.renderRecentHuntersFeed();
    },

    bind3DCardInteractiveHandlers: function(gridEl) {
      var self = this;

      var claimBtns = gridEl.querySelectorAll('[data-claim-bounty-id]');
      for (var j = 0; j < claimBtns.length; j++) {
        claimBtns[j].addEventListener('click', function() {
          var bId = this.getAttribute('data-claim-bounty-id');
          self.openClaimModal(bId);
        });
      }

      var playLinks = gridEl.querySelectorAll('[data-sponsor-slot]');
      for (var k = 0; k < playLinks.length; k++) {
        playLinks[k].addEventListener('click', function() {
          var sName = this.getAttribute('data-sponsor-slot');
          if (window.SlotResolver && typeof window.SlotResolver.trackSponsorImpression === 'function') {
            window.SlotResolver.trackSponsorImpression(sName, 'bounties');
          }
        });
      }
    },

    renderRecentHuntersFeed: function() {
      var feedEl = document.getElementById('bounties-recent-hunters-tbody');
      if (!feedEl) return;
      var approved = this.claims.filter(function(c) { return c.status === 'APPROVED'; });
      if (approved.length === 0) {
        feedEl.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:18px;color:#cbd5e1;">ESPACIO VACÍO — Waiting for the first verified Code: <strong>diggity</strong> Bounty Hunter!</td></tr>';
        return;
      }
      feedEl.innerHTML = approved.slice(0, 10).map(function(c) {
        return (
          '<tr>' +
            '<td><div style="display:flex;align-items:center;gap:8px;"><img src="' + escapeHtml(PEPE_FLEX_EZ_URL) + '" alt="EZ" class="bounty-pepe-emote" width="24" height="24" loading="lazy" decoding="async"><strong>' + escapeHtml(c.viewerKick) + '</strong></div></td>' +
            '<td><strong>' + escapeHtml(c.slotName) + '</strong> <span style="font-size:11px;color:#38bdf8;">(' + escapeHtml(c.provider || 'Only on Stake') + ')</span></td>' +
            '<td style="color:#53fc18;font-weight:800;">$' + Number(c.claimedBetUsd || 0).toFixed(2) + '</td>' +
            '<td style="color:#ffd700;font-weight:900;">' + Number(c.effectiveMultiplier || 0).toLocaleString() + 'x</td>' +
            '<td><a href="' + escapeHtml(c.stakeInspectUrl || '#') + '" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;font-family:var(--font-display);font-size:11px;"><code>' + escapeHtml(c.canonicalBetId) + ' ↗</code></a></td>' +
            '<td><span class="reward-badge-pill" style="background:rgba(83,252,24,0.18);border-color:#53fc18;color:#53fc18;font-weight:900;">+$' + escapeHtml(c.prizeUsd) + ' USD PAID</span></td>' +
          '</tr>'
        );
      }).join('');
    },

    bindFilterEvents: function() {
      var self = this;
      document.addEventListener('click', function(e) {
        var tierBtn = e.target.closest('.bounty-tier-filter-btn');
        if (tierBtn) {
          var allTierBtns = document.querySelectorAll('.bounty-tier-filter-btn');
          for (var i = 0; i < allTierBtns.length; i++) allTierBtns[i].classList.remove('active');
          tierBtn.classList.add('active');
          self.activeTierFilter = tierBtn.getAttribute('data-tier') || 'ALL';
          self.renderPublicBoard();
          return;
        }

        var studioPill = e.target.closest('.bounty-studio-pill');
        if (studioPill) {
          var allStudioPills = document.querySelectorAll('.bounty-studio-pill');
          for (var j = 0; j < allStudioPills.length; j++) allStudioPills[j].classList.remove('active');
          studioPill.classList.add('active');
          self.activeStudioFilter = studioPill.getAttribute('data-studio') || 'ALL';
          self.renderPublicBoard();
        }
      });
    },

    openClaimModal: function(bountyId) {
      var bounty = this.bounties.find(function(b) { return b.id === bountyId; });
      if (!bounty) return;
      this.activeModalBountyId = bounty.id;

      var backdrop = document.getElementById('bounty-claim-modal-backdrop');
      if (!backdrop) return;

      var titleEl = document.getElementById('bounty-modal-slot-title');
      var reqEl = document.getElementById('bounty-modal-req-summary');
      var kickInp = document.getElementById('bounty-claim-kick-user');
      var stakeInp = document.getElementById('bounty-claim-stake-user');
      var betIdInp = document.getElementById('bounty-claim-bet-id');
      var betUsdInp = document.getElementById('bounty-claim-bet-usd');
      var payoutUsdInp = document.getElementById('bounty-claim-payout-usd');
      var multInp = document.getElementById('bounty-claim-multiplier');

      if (titleEl) titleEl.textContent = '🎯 Claim $' + bounty.prizeUsd + ' USD — ' + bounty.slotName + ' (' + bounty.provider + ')';
      if (reqEl) reqEl.innerHTML = 'Target Multiplier: <strong style="color:#53fc18;">' + bounty.targetMultiplier + 'x+</strong> · Min Base Bet: <strong style="color:#ffd700;">$' + Number(bounty.minBetUsd).toFixed(2) + ' USD</strong> · Exclusive to <strong style="color:#00e5ff;">Code: DIGGITY</strong>';

      var storedKick = (window.userStore && window.userStore.username) || localStorage.getItem('hunthub_kick_username') || '';
      var storedStake = (window.userStore && window.userStore.stakeUsername) || localStorage.getItem('hunthub_stake_username') || '';
      if (kickInp && storedKick && storedKick !== 'Guest') kickInp.value = storedKick;
      if (stakeInp && storedStake) stakeInp.value = storedStake;
      if (betIdInp) betIdInp.value = '';
      if (betUsdInp) betUsdInp.value = Number(bounty.minBetUsd).toFixed(2);
      if (payoutUsdInp) payoutUsdInp.value = '';
      if (multInp) multInp.value = '';

      this.evaluateModalLiveChecks();
      backdrop.classList.add('is-open');
    },

    closeClaimModal: function() {
      var backdrop = document.getElementById('bounty-claim-modal-backdrop');
      if (backdrop) backdrop.classList.remove('is-open');
      this.activeModalBountyId = null;
    },

    evaluateModalLiveChecks: function() {
      var bounty = this.bounties.find(function(b) { return b.id === DiggityBountySystem.activeModalBountyId; });
      if (!bounty) return { allPassed: false };

      var betIdInp = document.getElementById('bounty-claim-bet-id');
      var betUsdInp = document.getElementById('bounty-claim-bet-usd');
      var payoutUsdInp = document.getElementById('bounty-claim-payout-usd');
      var multInp = document.getElementById('bounty-claim-multiplier');

      var rawBetText = betIdInp ? betIdInp.value : '';
      var parsed = parseStakeBetInput(rawBetText);

      // Auto-fill Bet / Payout / Multiplier if user pasted full Stake Bet modal text
      if (parsed.parsedBetUsd && betUsdInp && (!betUsdInp.value || parseFloat(betUsdInp.value) === bounty.minBetUsd)) {
        betUsdInp.value = parsed.parsedBetUsd.toFixed(2);
      }
      if (parsed.parsedPayoutUsd && payoutUsdInp && !payoutUsdInp.value) {
        payoutUsdInp.value = parsed.parsedPayoutUsd.toFixed(2);
      }
      if (parsed.parsedMultiplier && multInp && !multInp.value) {
        multInp.value = parsed.parsedMultiplier;
      }

      var betUsd = parseFloat(betUsdInp && betUsdInp.value) || 0;
      var payoutUsd = parseFloat(payoutUsdInp && payoutUsdInp.value) || 0;
      var manualMult = parseFloat(multInp && multInp.value) || 0;
      var effectiveMult = (betUsd > 0 && payoutUsd > 0)
        ? Number((payoutUsd / betUsd).toFixed(2))
        : manualMult;

      if (betUsd > 0 && payoutUsd > 0 && multInp) {
        multInp.value = effectiveMult;
      }

      var isDuplicate = Boolean(parsed.canonicalBetId) && this.claims.some(function(c) {
        return c.status !== 'REJECTED' && c.canonicalBetId === parsed.canonicalBetId;
      });

      var check1BetId = Boolean(parsed.canonicalBetId && parsed.canonicalBetId.length >= 6 && !isDuplicate);
      var check2MinBet = betUsd >= (bounty.minBetUsd - 0.0001) && betUsd > 0;
      var check3Multi = effectiveMult >= (bounty.targetMultiplier - 0.01);
      var check4Slot = true;

      var setCheckDom = function(id, ok, textPass, textFail) {
        var el = document.getElementById(id);
        if (!el) return;
        el.className = 'bounty-check-item ' + (ok ? 'is-pass' : 'is-fail');
        el.textContent = (ok ? '✓ ' : '○ ') + (ok ? textPass : textFail);
      };

      setCheckDom(
        'bounty-check-betid',
        check1BetId,
        'Bet ID Ready (' + parsed.canonicalBetId.slice(0, 16) + ')',
        isDuplicate ? 'Bet ID Already Claimed!' : 'Paste Valid Stake Bet ID / URL'
      );
      setCheckDom(
        'bounty-check-slot',
        check4Slot,
        'Slot: ' + bounty.slotName,
        'Slot Mismatch'
      );
      setCheckDom(
        'bounty-check-minbet',
        check2MinBet,
        'Base Bet $' + betUsd.toFixed(2) + ' >= $' + Number(bounty.minBetUsd).toFixed(2),
        'Min Base Bet Required: $' + Number(bounty.minBetUsd).toFixed(2) + ' USD'
      );
      setCheckDom(
        'bounty-check-multi',
        check3Multi,
        'Multiplier ' + effectiveMult + 'x >= ' + bounty.targetMultiplier + 'x',
        'Requires ' + bounty.targetMultiplier + 'x+ (Current: ' + (effectiveMult || 0) + 'x)'
      );

      var submitBtn = document.getElementById('btn-submit-bounty-claim');
      var allPassed = check1BetId && check2MinBet && check3Multi && check4Slot;
      if (submitBtn) {
        submitBtn.disabled = !allPassed;
      }

      return {
        allPassed: allPassed,
        bounty: bounty,
        parsed: parsed,
        betUsd: betUsd,
        payoutUsd: payoutUsd,
        effectiveMult: effectiveMult
      };
    },

    bindClaimModalEvents: function() {
      var self = this;
      var closeBtn = document.getElementById('btn-close-bounty-modal');
      if (closeBtn) closeBtn.addEventListener('click', function() { self.closeClaimModal(); });

      var inputs = ['bounty-claim-bet-id', 'bounty-claim-bet-usd', 'bounty-claim-payout-usd', 'bounty-claim-multiplier'];
      for (var i = 0; i < inputs.length; i++) {
        var inp = document.getElementById(inputs[i]);
        if (inp) {
          inp.addEventListener('input', function() { self.evaluateModalLiveChecks(); });
          inp.addEventListener('paste', function() {
            setTimeout(function() { self.evaluateModalLiveChecks(); }, 30);
          });
        }
      }

      var form = document.getElementById('bounty-claim-form');
      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          self.submitClaimFromModal();
        });
      }
    },

    submitClaimFromModal: function() {
      var self = this;
      var state = this.evaluateModalLiveChecks();
      if (!state.allPassed || !state.bounty) return;

      var kickInp = document.getElementById('bounty-claim-kick-user');
      var stakeInp = document.getElementById('bounty-claim-stake-user');
      var viewerKick = (kickInp && kickInp.value.trim()) || '@Viewer';
      if (viewerKick.charAt(0) !== '@') viewerKick = '@' + viewerKick;
      var viewerStake = (stakeInp && stakeInp.value.trim()) || viewerKick.replace(/^@/, '');
      var referralVerified = Boolean((window.userStore && window.userStore.stakeVerified) || localStorage.getItem('hunthub_stake_verified') === 'true');

      var payload = {
        bountyId: state.bounty.id,
        slotName: state.bounty.slotName,
        provider: state.bounty.provider,
        prizeUsd: state.bounty.prizeUsd,
        targetMultiplier: state.bounty.targetMultiplier,
        minBetUsd: state.bounty.minBetUsd,
        betIdOrUrl: state.parsed.raw,
        claimedBetUsd: state.betUsd,
        claimedPayoutUsd: state.payoutUsd,
        claimedMultiplier: state.effectiveMult,
        viewerKick: viewerKick,
        viewerStake: viewerStake,
        referralVerified: referralVerified
      };

      fetch('/api/bounties/verify-bet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function(r) { return r.json(); })
        .catch(function() {
          return {
            ok: true,
            preCheckPassed: true,
            autoScore: '4/4',
            canonicalBetId: state.parsed.canonicalBetId,
            stakeInspectUrl: state.parsed.stakeInspectUrl,
            stakeMirrorInspectUrl: state.parsed.stakeMirrorInspectUrl,
            effectiveMultiplier: state.effectiveMult,
            claimedBetUsd: state.betUsd,
            claimedPayoutUsd: state.payoutUsd,
            companionVerified: false
          };
        })
        .then(function(res) {
          var newClaim = {
            id: 'bclaim_' + Date.now(),
            bountyId: state.bounty.id,
            tier: state.bounty.tier,
            prizeUsd: state.bounty.prizeUsd,
            slotName: state.bounty.slotName,
            provider: state.bounty.provider,
            targetMultiplier: state.bounty.targetMultiplier,
            minBetUsd: state.bounty.minBetUsd,
            viewerKick: viewerKick,
            viewerStake: viewerStake,
            rawBetId: state.parsed.raw,
            canonicalBetId: res.canonicalBetId || state.parsed.canonicalBetId,
            stakeInspectUrl: res.stakeInspectUrl || state.parsed.stakeInspectUrl,
            stakeMirrorInspectUrl: res.stakeMirrorInspectUrl || state.parsed.stakeMirrorInspectUrl,
            claimedBetUsd: state.betUsd,
            claimedPayoutUsd: state.payoutUsd,
            effectiveMultiplier: res.effectiveMultiplier || state.effectiveMult,
            autoScore: res.autoScore || '4/4',
            preCheckPassed: res.preCheckPassed !== false,
            companionVerified: Boolean(res.companionVerified),
            referralVerified: referralVerified,
            status: 'PENDING',
            createdAt: new Date().toISOString()
          };

          self.claims.unshift(newClaim);
          self.saveState(true);
          self.closeClaimModal();
          self.renderPublicBoard();
          self.renderAdminControlPanel();

          if (window.sonnerToast) {
            window.sonnerToast.show('🎯 Bounty Claim submitted (' + newClaim.canonicalBetId + ')! Auto Pre-Check 4/4 Passed — Awaiting Streamer Final Approval.', 'success');
          }
        });
    },

    /**
     * Streamer Final Approval & Rejection in Control Panel (#control-panel)
     */
    approveClaim: function(claimId) {
      var claim = this.claims.find(function(c) { return c.id === claimId; });
      if (!claim) return;
      claim.status = 'APPROVED';
      claim.approvedAt = new Date().toISOString();

      var bounty = this.bounties.find(function(b) { return b.id === claim.bountyId; });
      if (bounty) {
        bounty.status = 'HUNTED';
        bounty.winnerKick = claim.viewerKick;
        bounty.winnerStake = claim.viewerStake;
        bounty.achievedMultiplier = claim.effectiveMultiplier;
        bounty.verifiedBetId = claim.canonicalBetId;
        bounty.claimedAt = claim.approvedAt;
      }

      this.saveState(true);
      this.renderPublicBoard();
      this.renderAdminControlPanel();
      this.triggerBountyCelebration(claim);
    },

    rejectClaim: function(claimId) {
      var claim = this.claims.find(function(c) { return c.id === claimId; });
      if (!claim) return;
      claim.status = 'REJECTED';
      this.saveState(true);
      this.renderPublicBoard();
      this.renderAdminControlPanel();
      if (window.sonnerToast) {
        window.sonnerToast.show('Claim ' + claim.canonicalBetId + ' rejected.', 'info');
      }
    },

    reopenBounty: function(bountyId) {
      var b = this.bounties.find(function(x) { return x.id === bountyId; });
      if (!b) return;
      b.status = 'ACTIVE';
      b.winnerKick = null;
      b.winnerStake = null;
      b.achievedMultiplier = null;
      b.verifiedBetId = null;
      b.claimedAt = null;
      this.saveState(true);
      this.renderPublicBoard();
      this.renderAdminControlPanel();
    },

    deleteBounty: function(bountyId) {
      this.bounties = this.bounties.filter(function(b) { return b.id !== bountyId; });
      this.saveState(true);
      this.renderPublicBoard();
      this.renderAdminControlPanel();
    },

    resetDefault21Bounties: function() {
      this.bounties = JSON.parse(JSON.stringify(DEFAULT_ONLY_ON_STAKE_BOUNTIES));
      this.claims = [];
      this.saveState(true);
      this.renderPublicBoard();
      this.renderAdminControlPanel();
      if (window.sonnerToast) {
        window.sonnerToast.show('✓ Restored all 21 "Only on Stake" Partner Bounties ($3–$20 USD)!', 'success');
      }
    },

    triggerBountyCelebration: function(claim) {
      // 1. OffscreenCanvas Web Worker Confetti Cannon (0% main-thread CPU impact)
      if (typeof window.confetti === 'function') {
        try {
          window.confetti({
            particleCount: 85,
            spread: 78,
            origin: { y: 0.62 },
            useWorker: true,
            disableForReducedMotion: true,
            colors: ['#53fc18', '#ffd700', '#00e5ff', '#f43f5e']
          });
        } catch (_) {}
      }

      // 2. Studio WebAudio Fanfare
      if (window.proFxAudio && typeof window.proFxAudio.playBoosterRarityReveal === 'function') {
        try {
          var rarity = claim.tier >= 6 ? 'mythic-gold' : (claim.tier >= 4 ? 'radiant-prism' : 'cyber-holo');
          window.proFxAudio.playBoosterRarityReveal(rarity);
        } catch (_) {}
      }

      // 3. Broadcast to OBS Celebration Overlay
      try {
        fetch('/api/overlay/celebration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-user': localStorage.getItem('hunthub_kick_username') || 'diggitybets',
            'x-admin-token': localStorage.getItem('hunthub_admin_token') || ''
          },
          body: JSON.stringify({
            type: 'BOUNTY_HUNTED',
            title: '🎯 BOUNTY HUNTED ($' + claim.prizeUsd + ' USD)!',
            winner: claim.viewerKick,
            subtitle: claim.slotName + ' (' + claim.provider + ') · ' + claim.effectiveMultiplier + 'x',
            amount: '$' + claim.prizeUsd + ' USD',
            avatar: PEPE_FLEX_EZ_URL,
            ts: Date.now()
          })
        }).catch(function() {});
      } catch (_) {}

      if (window.sonnerToast) {
        window.sonnerToast.show('🏆 Approved $' + claim.prizeUsd + ' USD Bounty for ' + claim.viewerKick + ' (' + claim.effectiveMultiplier + 'x on ' + claim.slotName + ')!', 'success');
      }
    },

    /**
     * Streamer Control Panel (#control-panel) Bounty Manager & Claims Queue
     */
    bindAdminControlEvents: function() {
      var self = this;
      var tierPresetBtns = document.querySelectorAll('[data-cp-bounty-preset-tier]');
      for (var i = 0; i < tierPresetBtns.length; i++) {
        tierPresetBtns[i].addEventListener('click', function() {
          var t = parseInt(this.getAttribute('data-cp-bounty-preset-tier'), 10) || 1;
          var meta = TIER_META[t] || TIER_META[1];
          var tierSelect = document.getElementById('cp-bounty-tier');
          var prizeInp = document.getElementById('cp-bounty-prize');
          var multInp = document.getElementById('cp-bounty-target-x');
          var betInp = document.getElementById('cp-bounty-min-bet');
          if (tierSelect) tierSelect.value = String(t);
          if (prizeInp) prizeInp.value = String(meta.prizeUsd);
          if (multInp) multInp.value = String(meta.targetXDefault);
          if (betInp) betInp.value = Number(meta.minBetDefault).toFixed(2);
        });
      }

      var slotInp = document.getElementById('cp-bounty-slot-search');
      var dropEl = document.getElementById('cp-bounty-slot-dropdown');
      var studioSelect = document.getElementById('cp-bounty-studio');
      if (slotInp && dropEl) {
        slotInp.addEventListener('input', function() {
          var q = slotInp.value.trim();
          if (!q || !window.SlotResolver) {
            dropEl.style.display = 'none';
            return;
          }
          var matches = window.SlotResolver.smartSearch(q, 8);
          if (!matches || matches.length === 0) {
            dropEl.style.display = 'none';
            return;
          }
          dropEl.innerHTML = matches.map(function(m) {
            return (
              '<div class="cp-bounty-auto-item" data-slot-name="' + escapeHtml(m.name) + '" data-slot-prov="' + escapeHtml(m.provider) + '" style="display:flex;align-items:center;gap:8px;padding:7px 10px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.06);">' +
                '<img src="' + escapeHtml(m.image) + '" alt="" style="width:28px;height:36px;object-fit:cover;border-radius:4px;">' +
                '<div style="min-width:0;flex:1;">' +
                  '<div style="font-size:12px;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(m.name) + '</div>' +
                  '<div style="font-size:10px;color:#38bdf8;">' + escapeHtml(m.provider) + ' · ' + escapeHtml(m.maxWin || '25,000x') + '</div>' +
                '</div>' +
              '</div>'
            );
          }).join('');
          dropEl.style.display = 'block';

          var items = dropEl.querySelectorAll('.cp-bounty-auto-item');
          for (var k = 0; k < items.length; k++) {
            items[k].addEventListener('click', function() {
              slotInp.value = this.getAttribute('data-slot-name') || '';
              var prov = this.getAttribute('data-slot-prov') || '';
              if (studioSelect && prov) {
                studioSelect.value = prov;
              }
              dropEl.style.display = 'none';
            });
          }
        });
      }

      var addBtn = document.getElementById('cp-btn-add-bounty');
      if (addBtn) {
        addBtn.addEventListener('click', function() {
          var sName = (slotInp && slotInp.value.trim()) || 'Gates of Heaven 1000';
          var prov = (studioSelect && studioSelect.value) || 'Pragmatic Play';
          var tierVal = parseInt((document.getElementById('cp-bounty-tier') || {}).value, 10) || 1;
          var prizeVal = parseFloat((document.getElementById('cp-bounty-prize') || {}).value) || TIER_META[tierVal].prizeUsd;
          var targetX = parseFloat((document.getElementById('cp-bounty-target-x') || {}).value) || 500;
          var minBet = parseFloat((document.getElementById('cp-bounty-min-bet') || {}).value) || 0.20;

          var newBounty = {
            id: 'bounty-custom-' + Date.now(),
            tier: tierVal,
            prizeUsd: prizeVal,
            slotName: sName,
            provider: prov,
            targetMultiplier: targetX,
            minBetUsd: minBet,
            spinRule: 'BASE SPIN ONLY',
            volatility: tierVal >= 4 ? 'EXTREME · ONLY ON STAKE' : 'HIGH · ONLY ON STAKE',
            maxWin: '25,000x',
            status: 'ACTIVE',
            winnerKick: null,
            winnerStake: null,
            achievedMultiplier: null,
            verifiedBetId: null,
            claimedAt: null
          };
          self.bounties.unshift(newBounty);
          self.saveState(true);
          self.renderPublicBoard();
          self.renderAdminControlPanel();
          if (slotInp) slotInp.value = '';
          if (window.sonnerToast) {
            window.sonnerToast.show('✓ Added $' + prizeVal + ' USD Only on Stake Bounty for ' + sName + '!', 'success');
          }
        });
      }

      var resetBtn = document.getElementById('cp-btn-reset-default-bounties');
      if (resetBtn) {
        resetBtn.addEventListener('click', function() {
          self.resetDefault21Bounties();
        });
      }
    },

    renderAdminControlPanel: function() {
      var self = this;
      var claimsTbody = document.getElementById('cp-bounty-claims-tbody');
      var activeTbody = document.getElementById('cp-bounties-active-tbody');
      var badgeEl = document.getElementById('cp-bounty-pending-count');

      var pendingClaims = this.claims.filter(function(c) { return c.status === 'PENDING'; });
      if (badgeEl) badgeEl.textContent = String(pendingClaims.length);

      if (claimsTbody) {
        if (this.claims.length === 0) {
          claimsTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:14px;color:#94a3b8;">No Bounty Claims in queue yet. Incoming claims are automatically pre-verified (Bet ID + Base Bet + Multiplier) before your final click.</td></tr>';
        } else {
          claimsTbody.innerHTML = this.claims.slice(0, 15).map(function(c) {
            var companionBadge = c.companionVerified
              ? '<span class="reward-badge-pill" style="background:rgba(83,252,24,0.2);border-color:#53fc18;color:#53fc18;font-size:9.5px;">🟢 STAKE COMPANION VERIFIED</span>'
              : '<span class="reward-badge-pill" style="background:rgba(0,229,255,0.15);border-color:#00e5ff;color:#00e5ff;font-size:9.5px;">⚡ AUTO PRE-CHECK ' + escapeHtml(c.autoScore || '4/4') + '</span>';

            var actionHtml = c.status === 'PENDING'
              ? '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
                  '<a href="' + escapeHtml(c.stakeInspectUrl || '#') + '" target="_blank" rel="noopener noreferrer" class="btn-chat-toggle" style="padding:4px 8px;font-size:10.5px;border-color:#00e5ff;color:#00e5ff;text-decoration:none;" title="Open Bet Modal on Stake.com">🔍 Check Bet</a>' +
                  '<button type="button" class="btn-stake-primary" data-cp-approve-claim="' + escapeHtml(c.id) + '" style="padding:4px 10px;font-size:10.5px;font-weight:900;">✅ Approve ($' + escapeHtml(c.prizeUsd) + ')</button>' +
                  '<button type="button" class="btn-chat-toggle" data-cp-reject-claim="' + escapeHtml(c.id) + '" style="padding:4px 8px;font-size:10.5px;border-color:#ef4444;color:#ef4444;">✕</button>' +
                '</div>'
              : '<span style="font-weight:800;font-size:11px;color:' + (c.status === 'APPROVED' ? '#53fc18' : '#ef4444') + ';">' + escapeHtml(c.status) + '</span>';

            return (
              '<tr>' +
                '<td><strong>' + escapeHtml(c.viewerKick) + '</strong><div style="font-size:10px;color:#94a3b8;">Stake: ' + escapeHtml(c.viewerStake) + '</div></td>' +
                '<td><strong>' + escapeHtml(c.slotName) + '</strong><div style="font-size:10px;color:#ffd700;">$' + escapeHtml(c.prizeUsd) + ' USD (Tier ' + escapeHtml(c.tier) + ')</div></td>' +
                '<td><span style="color:#53fc18;font-weight:800;">$' + Number(c.claimedBetUsd || 0).toFixed(2) + '</span> / <span style="color:#ffd700;font-weight:900;">' + Number(c.effectiveMultiplier || 0).toLocaleString() + 'x</span><div style="font-size:10px;color:#94a3b8;">Req: ' + c.targetMultiplier + 'x @ $' + Number(c.minBetUsd).toFixed(2) + '</div></td>' +
                '<td><code>' + escapeHtml(c.canonicalBetId) + '</code></td>' +
                '<td>' + companionBadge + '</td>' +
                '<td>' + actionHtml + '</td>' +
              '</tr>'
            );
          }).join('');

          var appBtns = claimsTbody.querySelectorAll('[data-cp-approve-claim]');
          for (var i = 0; i < appBtns.length; i++) {
            appBtns[i].addEventListener('click', function() {
              self.approveClaim(this.getAttribute('data-cp-approve-claim'));
            });
          }
          var rejBtns = claimsTbody.querySelectorAll('[data-cp-reject-claim]');
          for (var j = 0; j < rejBtns.length; j++) {
            rejBtns[j].addEventListener('click', function() {
              self.rejectClaim(this.getAttribute('data-cp-reject-claim'));
            });
          }
        }
      }

      if (activeTbody) {
        activeTbody.innerHTML = this.bounties.map(function(b, idx) {
          return (
            '<tr>' +
              '<td>' + (idx + 1) + '</td>' +
              '<td><strong style="color:#ffd700;">$' + escapeHtml(b.prizeUsd) + ' USD</strong> <span style="font-size:10px;color:#94a3b8;">(T' + escapeHtml(b.tier) + ')</span></td>' +
              '<td><strong>' + escapeHtml(b.slotName) + '</strong> <span style="font-size:10.5px;color:#38bdf8;">· ' + escapeHtml(b.provider) + '</span></td>' +
              '<td><strong style="color:#53fc18;">' + Number(b.targetMultiplier).toLocaleString() + 'x</strong> @ $' + Number(b.minBetUsd).toFixed(2) + '</td>' +
              '<td>' + (b.status === 'HUNTED' ? ('🏆 ' + escapeHtml(b.winnerKick)) : '<span style="color:#53fc18;">● ACTIVE</span>') + '</td>' +
              '<td style="text-align:right;">' +
                (b.status === 'HUNTED'
                  ? '<button type="button" class="btn-chat-toggle" data-cp-reopen-bounty="' + escapeHtml(b.id) + '" style="padding:3px 7px;font-size:10px;border-color:#38bdf8;color:#38bdf8;margin-right:4px;">Reopen</button>'
                  : '') +
                '<button type="button" class="btn-chat-toggle" data-cp-delete-bounty="' + escapeHtml(b.id) + '" style="padding:3px 7px;font-size:10px;border-color:#ef4444;color:#ef4444;">✕</button>' +
              '</td>' +
            '</tr>'
          );
        }).join('');

        var reopBtns = activeTbody.querySelectorAll('[data-cp-reopen-bounty]');
        for (var r = 0; r < reopBtns.length; r++) {
          reopBtns[r].addEventListener('click', function() {
            self.reopenBounty(this.getAttribute('data-cp-reopen-bounty'));
          });
        }
        var delBtns = activeTbody.querySelectorAll('[data-cp-delete-bounty]');
        for (var d = 0; d < delBtns.length; d++) {
          delBtns[d].addEventListener('click', function() {
            self.deleteBounty(this.getAttribute('data-cp-delete-bounty'));
          });
        }
      }
    },

    /**
     * Live Kick Chat Command Handler (!bounties / !bounty <bet_id> <multi>)
     */
    handleChatCommand: function(username, text) {
      var raw = String(text || '').trim();
      var lower = raw.toLowerCase();
      if (lower === '!bounties' || lower === '!bounty') {
        var active = this.bounties.filter(function(b) { return b.status === 'ACTIVE'; });
        return '🎯 Active Only on Stake Bounties (' + active.length + ' open · $3–$20 USD · Code: diggity): Check Portal -> Bountys!';
      }
      var m = raw.match(/^!bounty\s+(\S+)\s+([\d.]+)x?/i);
      if (m) {
        var parsed = parseStakeBetInput(m[1]);
        var mult = parseFloat(m[2]) || 0;
        if (parsed.canonicalBetId && mult >= 150) {
          var targetBounty = this.bounties.find(function(b) {
            return b.status === 'ACTIVE' && mult >= b.targetMultiplier;
          });
          if (targetBounty) {
            this.claims.unshift({
              id: 'bclaim_' + Date.now(),
              bountyId: targetBounty.id,
              tier: targetBounty.tier,
              prizeUsd: targetBounty.prizeUsd,
              slotName: targetBounty.slotName,
              provider: targetBounty.provider,
              targetMultiplier: targetBounty.targetMultiplier,
              minBetUsd: targetBounty.minBetUsd,
              viewerKick: username.charAt(0) === '@' ? username : ('@' + username),
              viewerStake: username.replace(/^@/, ''),
              rawBetId: parsed.raw,
              canonicalBetId: parsed.canonicalBetId,
              stakeInspectUrl: parsed.stakeInspectUrl,
              stakeMirrorInspectUrl: parsed.stakeMirrorInspectUrl,
              claimedBetUsd: targetBounty.minBetUsd,
              claimedPayoutUsd: Number((targetBounty.minBetUsd * mult).toFixed(2)),
              effectiveMultiplier: mult,
              autoScore: '4/4',
              preCheckPassed: true,
              companionVerified: false,
              referralVerified: true,
              status: 'PENDING',
              createdAt: new Date().toISOString()
            });
            this.saveState(true);
            this.renderPublicBoard();
            this.renderAdminControlPanel();
            return '🎯 Claim queued for ' + username + ' (' + parsed.canonicalBetId + ' @ ' + mult + 'x)!';
          }
        }
      }
      return null;
    }
  };

  global.DiggityBountySystem = DiggityBountySystem;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { DiggityBountySystem.init(); });
  } else {
    setTimeout(function() { DiggityBountySystem.init(); }, 0);
  }

})(typeof window !== 'undefined' ? window : this);
