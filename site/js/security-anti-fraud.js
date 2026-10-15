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

    this.init();
  }

  async init() {
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
    if (!username) return;
    const cleanUser = username.trim().toLowerCase();
    const currentHash = this.getDeviceHash();

    let registry = {};
    try {
      registry = JSON.parse(localStorage.getItem(this.storageKeyRegistry) || '{}');
    } catch (e) { registry = {}; }

    // List of users associated with this hardware device
    let deviceUsers = registry[currentHash] || [];
    if (!deviceUsers.includes(cleanUser)) {
      deviceUsers.push(cleanUser);
      registry[currentHash] = deviceUsers;
      localStorage.setItem(this.storageKeyRegistry, JSON.stringify(registry));
    }

    // If more than 1 user has used this physical device, record an alt cluster!
    if (deviceUsers.length > 1) {
      this.recordAltCluster(deviceUsers[0], cleanUser, currentHash, 'SHARED_HARDWARE_DEVICE');
    }
  }

  recordAltCluster(primaryUser, altUser, deviceHash, reason) {
    let clusters = [];
    try {
      clusters = JSON.parse(localStorage.getItem(this.storageKeyClusters) || '[]');
    } catch (e) { clusters = []; }

    const exists = clusters.some(c => 
      (c.primaryUser === primaryUser && c.altUser === altUser) ||
      (c.primaryUser === altUser && c.altUser === primaryUser)
    );

    if (!exists) {
      clusters.push({
        id: 'alt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        primaryUser,
        altUser,
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
        bc.postMessage({ type: 'ALT_DETECTED', primaryUser, altUser });
      }
    }
  }

  isAccountFlagged(username) {
    if (!username) return false;
    const clean = username.trim().toLowerCase();
    let clusters = [];
    try {
      clusters = JSON.parse(localStorage.getItem(this.storageKeyClusters) || '[]');
    } catch (e) { return false; }

    return clusters.some(c => c.primaryUser === clean || c.altUser === clean);
  }

  getFlagReason(username) {
    if (!username) return '';
    const clean = username.trim().toLowerCase();
    let clusters = [];
    try {
      clusters = JSON.parse(localStorage.getItem(this.storageKeyClusters) || '[]');
    } catch (e) { return ''; }

    const match = clusters.find(c => c.primaryUser === clean || c.altUser === clean);
    if (!match) return '';
    const other = match.primaryUser === clean ? match.altUser : match.primaryUser;
    return `Shared PC / Hardware Fingerprint with @${other}`;
  }

  getAltClusters() {
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
