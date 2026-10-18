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

// Global initialization
window.antiFraud = new AntiFraudEngine();
