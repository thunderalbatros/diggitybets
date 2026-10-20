/**
 * HuntHub — Anti-Fraud & Hardware Device Fingerprinting Engine
 * Inspired by ThumbmarkJS (< 4 KB, MIT).
 * Generates a deterministic hardware device hash combining Canvas 2D, WebGL,
 * AudioContext DSP, screen geometry, and system concurrency.
 * Enforces: 1 Spectator per PC/IP for $DIG Points & Store Vouchers.
 */

class AntiFraudEngine {
  constructor() {
    this.storageKeyDevice = 'hunthub_device_hash';
    this.storageKeyRegistry = 'hunthub_device_registry';
    this.storageKeyClusters = 'hunthub_alt_clusters';
    this.deviceHash = '';

    this.ignoredAccounts = new Set([
      'diggitybets', 'tomas', 'streamer', 'admin', 'moderator',
      'viewer', 'guest', 'player1', 'player2', 'diggityviewer', 'diggitystreamer',
      'altfarmer_450', 'stakefarmer_01', 'stakefarmer_02',
      'luckystriker', 'vegasking', 'slotqueen', 'spinmaster', 'strike777',
      'bigbassbob', 'neonwolf', 'royalflush', 'nachogamer', 'slotking21',
      'diggityfan', 'cryptospin', 'aguskick', 'valen99', 'stakehunter',
      'kickviewer01', 'charlybets', 'zeusmax_21', 'slothunter_ar',
      'stakenacho', 'stakevalen', 'stakeagus', 'diggityfan01', 'newplayer99', 'catlover'
    ]);

    this.init();
  }

  normalizeUsername(u) {
    return String(u || '').trim().toLowerCase().replace(/^@+/, '');
  }

  isIgnoredOrDemoAccount(u) {
    const clean = this.normalizeUsername(u);
    if (!clean) return true;
    if (this.ignoredAccounts.has(clean)) return true;
    if (
      clean.startsWith('altfarmer') ||
      clean.startsWith('stakefarmer') ||
      clean.startsWith('kickuser_') ||
      clean.startsWith('demo_') ||
      clean.startsWith('sim_') ||
      clean.startsWith('guest_')
    ) {
      return true;
    }
    return false;
  }

  purgeDemoAndSelfClusters() {
    try {
      const rawClusters = JSON.parse(localStorage.getItem(this.storageKeyClusters) || '[]');
      if (Array.isArray(rawClusters)) {
        const cleaned = rawClusters
          .map(c => ({
            ...c,
            primaryUser: this.normalizeUsername(c.primaryUser || c.primary_user),
            altUser: this.normalizeUsername(c.altUser || c.alt_user)
          }))
          .filter(c => {
            if (!c.primaryUser || !c.altUser) return false;
            if (c.primaryUser === c.altUser) return false;
            if (this.isIgnoredOrDemoAccount(c.primaryUser) || this.isIgnoredOrDemoAccount(c.altUser)) return false;
            if (String(c.id || '').startsWith('alt_demo_') || String(c.id || '').startsWith('sim_')) return false;
            return true;
          });
        localStorage.setItem(this.storageKeyClusters, JSON.stringify(cleaned));
      }
    } catch (_) {}

    try {
      const registry = JSON.parse(localStorage.getItem(this.storageKeyRegistry) || '{}');
      if (registry && typeof registry === 'object') {
        Object.keys(registry).forEach(hashKey => {
          if (Array.isArray(registry[hashKey])) {
            const uniqueValid = [];
            registry[hashKey].forEach(u => {
              const norm = this.normalizeUsername(u);
              if (norm && !this.isIgnoredOrDemoAccount(norm) && !uniqueValid.includes(norm)) {
                uniqueValid.push(norm);
              }
            });
            registry[hashKey] = uniqueValid;
          }
        });
        localStorage.setItem(this.storageKeyRegistry, JSON.stringify(registry));
      }
    } catch (_) {}
  }

  async init() {
    if (this._initialized) return;
    this._initialized = true;
    this.purgeDemoAndSelfClusters();
    this.deviceHash = localStorage.getItem(this.storageKeyDevice) || '';
    if (!this.deviceHash) {
      this.deviceHash = await this.computeHardwareFingerprint();
      localStorage.setItem(this.storageKeyDevice, this.deviceHash);
    }
  }

  getDeviceHash() {
    return this.deviceHash || 'dev_hw_' + Math.abs(this.simpleStringHash(navigator.userAgent)).toString(16);
  }

  /**
   * Generates deterministic hardware fingerprint using Canvas, WebGL, Audio & Hardware metrics
   */
  async computeHardwareFingerprint() {
    const components = [];

    // 1. Canvas 2D Geometry & Text Rendering
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 240;
      canvas.height = 60;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px "Arial", sans-serif';
        ctx.textBaseline = 'alphabetic';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('HuntHub-AntiSybil-2026! 🎲🛡️', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('HuntHub-AntiSybil-2026! 🎲🛡️', 4, 17);
        components.push(canvas.toDataURL());
      }
    } catch (e) {
      components.push('canvas_failed');
    }

    // 2. WebGL Unmasked Hardware Renderer & Vendor
    try {
      const glCanvas = document.createElement('canvas');
      const gl = glCanvas.getContext('webgl') || glCanvas.getContext('experimental-webgl');
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          components.push(`${vendor}~${renderer}`);
        } else {
          components.push('gl_no_debug');
        }
      }
    } catch (e) {
      components.push('webgl_failed');
    }

    // 3. Screen Metrics & Color Depth
    components.push(`${screen.width}x${screen.height}x${screen.colorDepth}@${window.devicePixelRatio || 1}`);

    // 4. Hardware Concurrency, Platform & Timezone
    components.push(`${navigator.hardwareConcurrency || 4}_${navigator.platform}_${new Date().getTimezoneOffset()}`);

    // 5. Compute SHA-256 Digest using Web Crypto API
    const rawString = components.join('|||');
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(rawString);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(digest));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
    } catch (e) {
      return 'dev_' + Math.abs(this.simpleStringHash(rawString)).toString(16).padStart(16, '0');
    }
  }

  simpleStringHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }

  /**
   * Records user activity on current hardware device.
   * Detects multi-account clusters sharing the exact same device.
   */
  recordAccountUsage(username) {
    const cleanUser = this.normalizeUsername(username);
    if (!cleanUser || this.isIgnoredOrDemoAccount(cleanUser)) return;
    const currentHash = this.getDeviceHash();

    let registry = {};
    try {
      registry = JSON.parse(localStorage.getItem(this.storageKeyRegistry) || '{}');
    } catch (e) { registry = {}; }

    // List of users associated with this hardware device
    let deviceUsers = (registry[currentHash] || [])
      .map(u => this.normalizeUsername(u))
      .filter(u => u && !this.isIgnoredOrDemoAccount(u));
    if (!deviceUsers.includes(cleanUser)) {
      deviceUsers.push(cleanUser);
      registry[currentHash] = deviceUsers;
      localStorage.setItem(this.storageKeyRegistry, JSON.stringify(registry));
    }

    // If more than 1 distinct real spectator has used this physical device, record an alt cluster!
    if (deviceUsers.length > 1 && deviceUsers[0] !== cleanUser) {
      this.recordAltCluster(deviceUsers[0], cleanUser, currentHash, 'SHARED_HARDWARE_DEVICE');
    }
  }

  recordAltCluster(primaryUser, altUser, deviceHash, reason) {
    const pClean = this.normalizeUsername(primaryUser);
    const aClean = this.normalizeUsername(altUser);
    if (!pClean || !aClean || pClean === aClean) return;
    if (this.isIgnoredOrDemoAccount(pClean) || this.isIgnoredOrDemoAccount(aClean)) return;

    let clusters = [];
    try {
      clusters = JSON.parse(localStorage.getItem(this.storageKeyClusters) || '[]');
    } catch (e) { clusters = []; }

    const exists = clusters.some(c => 
      (this.normalizeUsername(c.primaryUser) === pClean && this.normalizeUsername(c.altUser) === aClean) ||
      (this.normalizeUsername(c.primaryUser) === aClean && this.normalizeUsername(c.altUser) === pClean)
    );

    if (!exists) {
      clusters.push({
        id: 'alt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        primaryUser: pClean,
        altUser: aClean,
        deviceHash: deviceHash.substring(0, 12) + '...',
        reason,
        riskScore: 85,
        status: 'FLAGGED',
        detectedAt: Date.now()
      });
      localStorage.setItem(this.storageKeyClusters, JSON.stringify(clusters));

      // Notify across broadcast channel
      if (window.BroadcastChannel) {
        const bc = new BroadcastChannel('hunthub_admin_sync');
        bc.postMessage({ type: 'ALT_DETECTED', primaryUser: pClean, altUser: aClean });
      }
    }
  }

  isAccountFlagged(username) {
    const clean = this.normalizeUsername(username);
    if (!clean || this.isIgnoredOrDemoAccount(clean)) return false;
    let clusters = [];
    try {
      clusters = JSON.parse(localStorage.getItem(this.storageKeyClusters) || '[]');
    } catch (e) { return false; }

    return clusters.some(c => this.normalizeUsername(c.primaryUser) === clean || this.normalizeUsername(c.altUser) === clean);
  }

  getFlagReason(username) {
    const clean = this.normalizeUsername(username);
    if (!clean) return '';
    let clusters = [];
    try {
      clusters = JSON.parse(localStorage.getItem(this.storageKeyClusters) || '[]');
    } catch (e) { return ''; }

    const match = clusters.find(c => this.normalizeUsername(c.primaryUser) === clean || this.normalizeUsername(c.altUser) === clean);
    if (!match) return '';
    const pNorm = this.normalizeUsername(match.primaryUser);
    const aNorm = this.normalizeUsername(match.altUser);
    const other = pNorm === clean ? aNorm : pNorm;
    return `Shared PC / Hardware Fingerprint with @${other}`;
  }

  getAltClusters() {
    this.purgeDemoAndSelfClusters();
    try {
      return JSON.parse(localStorage.getItem(this.storageKeyClusters) || '[]');
    } catch (e) { return []; }
  }

  removeCluster(clusterId) {
    let clusters = this.getAltClusters().filter(c => c.id !== clusterId);
    localStorage.setItem(this.storageKeyClusters, JSON.stringify(clusters));
  }
}

// ============================================================================
// DOMPurify + W3C TrustedTypes Default Policy, Fetch Auth Injector & Turnstile
// ============================================================================
(function initSecurityAndStorageShield() {
  // 0. Global escapeHTML helper
  window.escapeHTML = function(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // 0b. Global Fetch Interceptor: attaches device fingerprint + signed user/admin tokens on /api/*
  const originalFetch = window.fetch;
  if (typeof originalFetch === 'function') {
    window.fetch = function(url, options = {}) {
      try {
        const urlStr = typeof url === 'string' ? url : (url && url.url ? url.url : '');
        if (urlStr.startsWith('/api/') || urlStr.includes('/api/')) {
          options = options || {};
          options.headers = options.headers || {};
          const devHash = localStorage.getItem('hunthub_device_hash') || (window.antiFraud && window.antiFraud.getDeviceHash ? window.antiFraud.getDeviceHash() : '');
          const userToken = localStorage.getItem('hunthub_user_token') || '';
          const adminToken = localStorage.getItem('hunthub_admin_token') || '';

          const setHeaderIfMissing = (key, val) => {
            if (!val) return;
            if (options.headers instanceof Headers) {
              if (!options.headers.has(key)) options.headers.set(key, val);
            } else if (Array.isArray(options.headers)) {
              if (!options.headers.some(([k]) => k.toLowerCase() === key.toLowerCase())) {
                options.headers.push([key, val]);
              }
            } else if (typeof options.headers === 'object') {
              const lower = key.toLowerCase();
              const hasKey = Object.keys(options.headers).some(k => k.toLowerCase() === lower);
              if (!hasKey) options.headers[key] = val;
            }
          };

          setHeaderIfMissing('x-device-fingerprint', devHash);
          setHeaderIfMissing('x-user-token', userToken);
          setHeaderIfMissing('x-admin-token', adminToken);
        }
      } catch (_) {}
      return originalFetch.call(this, url, options);
    };
  }

  // 0c. Cloudflare Turnstile Invisible Token Helper
  window.CLOUDFLARE_TURNSTILE_SITEKEY = '0x4AAAAAAFaW8Lu0S2WC3Pa8';
  window.getTurnstileToken = function(action = 'general') {
    return new Promise((resolve) => {
      if (!window.turnstile || !window.CLOUDFLARE_TURNSTILE_SITEKEY) {
        resolve('');
        return;
      }
      let container = document.getElementById('cf-turnstile-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'cf-turnstile-container';
        container.style.position = 'fixed';
        container.style.bottom = '-9999px';
        container.style.left = '-9999px';
        container.style.opacity = '0';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);
      }
      try {
        const widgetId = window.turnstile.render(container, {
          sitekey: window.CLOUDFLARE_TURNSTILE_SITEKEY,
          action: action,
          size: 'invisible',
          callback: function(token) {
            try { window.turnstile.remove(widgetId); } catch (_) {}
            resolve(token || '');
          },
          'error-callback': function() {
            try { window.turnstile.remove(widgetId); } catch (_) {}
            resolve('');
          },
          'expired-callback': function() {
            try { window.turnstile.remove(widgetId); } catch (_) {}
            resolve('');
          }
        });
      } catch (_) {
        resolve('');
      }
    });
  };

  // 0d. CSP-Clean Delegated Click Handlers for static buttons in index.html
  document.addEventListener('click', (e) => {
    const target = e.target && e.target.closest ? e.target.closest('#btn-bh-live-rtp-radar, #btn-copy-raffle-announcement, #btn-close-raffle-winner-modal') : null;
    if (!target) return;
    if (target.id === 'btn-bh-live-rtp-radar') {
      e.preventDefault();
      if (typeof window.switchView === 'function') window.switchView('#slot-intel');
      if (window.diggityIntelSuite && typeof window.diggityIntelSuite.switchIntelTab === 'function') {
        window.diggityIntelSuite.switchIntelTab('rtp');
      }
    } else if (target.id === 'btn-copy-raffle-announcement') {
      const nameEl = document.getElementById('raffle-winner-display-name');
      const winnerName = nameEl ? nameEl.textContent : '@Winner';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('🎉 CONGRATS ' + winnerName + '! You won the Sunday $100 Bonus Buy Split Profit Raffle! 🎟️💎');
      }
      if (window.sonner) {
        window.sonner.toast({ title: 'Copied Shoutout! 📋', message: 'Ready to paste in Kick chat', type: 'gold' });
      }
    } else if (target.id === 'btn-close-raffle-winner-modal') {
      const modal = document.getElementById('admin-raffle-winner-modal');
      if (modal) modal.style.display = 'none';
    }
  });

  // 1. Universal HTML Sanitizer backed by cure53/DOMPurify
  window.sanitizeHTML = function(dirtyHtml) {
    const str = String(dirtyHtml ?? '');
    if (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
      return window.DOMPurify.sanitize(str, {
        USE_PROFILES: { html: true, svg: true, svgFilters: true },
        ADD_ATTR: ['target', 'rel', 'loading', 'decoding', 'fetchpriority', 'aria-hidden', 'aria-label', 'role', 'data-target', 'data-bounty-id', 'data-tier', 'data-studio'],
        FORBID_TAGS: ['script', 'object', 'embed', 'applet', 'base', 'meta'],
        FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onmouseenter']
      });
    }
    return str
      .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, '')
      .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/javascript\s*:/gi, 'blocked:');
  };

  // 2. Register W3C TrustedTypes 'default' policy if supported by browser
  try {
    if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
      window.trustedTypes.createPolicy('default', {
        createHTML: (input) => window.sanitizeHTML(input),
        createScriptURL: (input) => {
          const s = String(input || '');
          if (
            s.startsWith('/') ||
            s.startsWith('site/') ||
            s.startsWith('data/') ||
            s.startsWith(window.location.origin) ||
            s.startsWith('https://challenges.cloudflare.com/')
          ) {
            return s;
          }
          throw new TypeError('[TrustedTypes] Blocked untrusted script URL: ' + s);
        },
        createScript: (input) => String(input || '')
      });
    }
  } catch (_) {}

  // 3. StorageQuotaGuard: prevents QuotaExceededError during multi-hour streams
  const PRUNABLE_ARRAY_KEYS = [
    'hunthub_bounty_claims_v1',
    'hunthub_point_transactions',
    'hunthub_alt_clusters',
    'hunthub_stake_verifications',
    'hunthub_store_claims',
    'hunthub_sunday_raffle_ledger'
  ];

  function pruneLocalStorageArrays() {
    for (const key of PRUNABLE_ARRAY_KEYS) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw || raw.length < 4096) continue;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 50) {
          localStorage.setItem(key, JSON.stringify(parsed.slice(-50)));
        }
      } catch (_) {}
    }
  }

  try {
    const rawSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      try {
        return rawSetItem.call(this, key, value);
      } catch (err) {
        if (this === window.localStorage) {
          pruneLocalStorageArrays();
          try {
            return rawSetItem.call(this, key, value);
          } catch (_) {}
        }
      }
    };
  } catch (_) {}

  window.StorageQuotaGuard = { pruneLocalStorageArrays };

  // 4. ValibotSchemaGuard: Runtime contract validator for Bounties, Stake VIP & Store
  window.ValibotSchemaGuard = {
    validateBountyClaim(payload) {
      if (!payload || typeof payload !== 'object') return { valid: false, error: 'Payload inválido.' };
      const bountyId = String(payload.bountyId || '').trim();
      const betId = String(payload.betId || '').trim();
      const multi = Number(payload.achievedMulti || payload.multiplier || 0);
      if (!bountyId || bountyId.length > 64) return { valid: false, error: 'ID de Bounty inválido.' };
      if (!/^(house:|casino:|sport:)?[a-zA-Z0-9_-]{6,64}$/.test(betId)) {
        return { valid: false, error: 'Formato de Bet ID inválido (mín. 6 caracteres alfanuméricos).' };
      }
      if (!Number.isFinite(multi) || multi <= 0 || multi > 500000) {
        return { valid: false, error: 'Multiplicador fuera de rango permitido.' };
      }
      return { valid: true, sanitized: { bountyId, betId, achievedMulti: multi } };
    },
    validateStakeVerification(payload) {
      if (!payload || typeof payload !== 'object') return { valid: false, error: 'Payload inválido.' };
      const stakeUsername = String(payload.stakeUsername || '').trim().replace(/^@/, '');
      if (!/^[a-zA-Z0-9_.-]{3,32}$/.test(stakeUsername)) {
        return { valid: false, error: 'Usuario de Stake inválido (3–32 caracteres).' };
      }
      return { valid: true, sanitized: { stakeUsername } };
    }
  };

  // 5. ThumbHashPlaceholder: Ultra-fast binary-to-DataURL placeholder decoder (evanw/thumbhash)
  window.ThumbHashPlaceholder = {
    decodeBase64ToDataUrl(b64Hash) {
      try {
        if (window.ThumbHash && typeof window.ThumbHash.thumbHashToDataURL === 'function' && b64Hash) {
          const bin = atob(b64Hash);
          const bytes = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
          return window.ThumbHash.thumbHashToDataURL(bytes);
        }
      } catch (_) {}
      return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"%3E%3Crect width="300" height="400" fill="%230d111a"/%3E%3C/svg%3E';
    }
  };

  // 6. QuicklinkIdlePrefetch: Idle viewport asset prefetcher (GoogleChromeLabs/quicklink pattern)
  if ('requestIdleCallback' in window && !navigator.connection?.saveData) {
    window.requestIdleCallback(() => {
      try {
        const prefetched = new Set();
        const links = ['data/slot_tiers.js', 'data/live_casino_intel.json'];
        for (const href of links) {
          if (prefetched.has(href)) continue;
          prefetched.add(href);
          const linkEl = document.createElement('link');
          linkEl.rel = 'prefetch';
          linkEl.href = href;
          document.head.appendChild(linkEl);
        }
      } catch (_) {}
    }, { timeout: 4000 });
  }
})();

// Global initialization
window.antiFraud = new AntiFraudEngine();

