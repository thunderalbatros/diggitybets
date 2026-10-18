/**
 * HuntHub — Fullscreen Winner Celebration Overlay (1920x1080 Transparent)
 * =============================================================================
 * 1. 100% Transparent when idle (Zero CPU in OBS Browser Source)
 * 2. Audio Sequence: Trumpet Fanfare first -> Falling Metallic Coins sound
 * 3. Visual Layout: 3D Gold Coins falling from the sky in the background +
 *    Spectator Avatar & @Username centered in the foreground
 * 4. Dual Celebration Tiers:
 *    - 'partial' (~4.2s): Fast, punchy celebration for 1v1 single round wins
 *      (Streak 1..3) and 8-Bracket Quarterfinal / Semifinal match wins.
 *    - 'grand' (~8.5s): Special extended celebration with rotating golden
 *      sunburst rays, expanding shockwave rings, royal crown drop, and
 *      multi-wave coin/sparkle rain for 1v1 !cashout, 1v1 $20 Max Prize (4/4),
 *      and 8-Bracket Tournament Champion!
 * 5. Cross-Process Sync: BroadcastChannel + localStorage + Edge /api/overlay/celebration
 * =============================================================================
 */

class CelebrationOverlayApp {
  constructor() {
    this.canvas = document.getElementById('fx-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.particles = [];
    this.particlePool = [];
    this.isRunning = false;
    this.boundRenderLoop = this.renderLoop.bind(this);
    this.audioCtx = null;
    this.masterLimiter = null;
    this.audioUnlocked = false;
    this.billboardTimer = null;
    this.waveTimers = [];
    this.avatarCache = new Map();

    // DOM Elements
    this.audioGateEl = document.getElementById('audio-gate-prompt');
    this.billboard = document.getElementById('winner-billboard');
    this.iconEl = document.getElementById('billboard-icon');
    this.categoryEl = document.getElementById('billboard-category');
    this.avatarImgEl = document.getElementById('winner-avatar-img');
    this.tierRibbonEl = document.getElementById('winner-tier-ribbon');
    this.usernameEl = document.getElementById('winner-username');
    this.slotImgEl = document.getElementById('winner-slot-img');
    this.slotLabelEl = document.getElementById('winner-slot-label');
    this.slotNameEl = document.getElementById('winner-slot-name');
    this.statBadgeEl = document.getElementById('winner-stat-badge');
    this.statValueEl = document.getElementById('winner-stat-value');
    this.prizeTagEl = document.getElementById('winner-prize-tag');
    this.prizeTextEl = document.getElementById('winner-prize-text');

    this.lastEventTimestamp = Date.now() - 2500;

    this.initCanvasResize();
    this.initSpriteCache();
    this.initAudio();
    this.initModeDetection();
    this.initEventListeners();
    this.initSyncChannels();

    // Optional explicit demo mode (?demo=1)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === '1') {
      setTimeout(() => {
        this.triggerLiveDemo('grand');
      }, 400);
    }
  }

  /* =========================================================================
   * 1. CANVAS RESIZING (FULLSCREEN FLUID)
   * ========================================================================= */
  initCanvasResize() {
    const resize = () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  /* =========================================================================
   * 2. OFFSCREEN SPRITE PRE-RENDERING (Zero Allocation in 60 FPS loop)
   * ========================================================================= */
  initSpriteCache() {
    this.sprites = {
      coin: this.createOffscreenCoinSprite(),
      chipGold: this.createOffscreenChipSprite('#ffd700'),
      chipGreen: this.createOffscreenChipSprite('#53fc18'),
      chipCyan: this.createOffscreenChipSprite('#00e5ff'),
      starGold: this.createOffscreenStarSprite('#ffd700')
    };
  }

  createOffscreenCoinSprite() {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d');
    const r = 28;
    const cx = 32;
    const cy = 32;

    const gradOuter = ctx.createLinearGradient(0, 0, 64, 64);
    gradOuter.addColorStop(0, '#fff7c2');
    gradOuter.addColorStop(0.45, '#ffd700');
    gradOuter.addColorStop(1, '#b8860b');

    ctx.fillStyle = gradOuter;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#855b04';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#855b04';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', cx, cy + 1);

    return c;
  }

  createOffscreenChipSprite(color) {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d');
    const r = 27;
    const cx = 32;
    const cy = 32;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    for (let a = 0; a < 6; a++) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((a * Math.PI) / 3);
      ctx.fillRect(-5, -r, 10, 8);
      ctx.restore();
    }

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#07090e';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.44, 0, Math.PI * 2);
    ctx.fill();

    return c;
  }

  createOffscreenStarSprite(color) {
    const c = document.createElement('canvas');
    c.width = 48;
    c.height = 48;
    const ctx = c.getContext('2d');
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(24, 4);
    ctx.lineTo(29, 19);
    ctx.lineTo(44, 24);
    ctx.lineTo(29, 29);
    ctx.lineTo(24, 44);
    ctx.lineTo(19, 29);
    ctx.lineTo(4, 24);
    ctx.lineTo(19, 19);
    ctx.closePath();
    ctx.fill();
    return c;
  }

  /* =========================================================================
   * 3. PROCEDURAL WEB AUDIO — TRUMPET FANFARE FIRST, THEN METALLIC COINS
   * ========================================================================= */
  ensureAudioBus() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        try {
          this.audioCtx = new AudioContextClass();
        } catch (_) {}
      }
    }
    if (this.audioCtx && !this.masterLimiter) {
      try {
        const t = this.audioCtx.currentTime;
        this.masterLimiter = this.audioCtx.createDynamicsCompressor();
        this.masterLimiter.threshold.setValueAtTime(-4, t);
        this.masterLimiter.knee.setValueAtTime(6, t);
        this.masterLimiter.ratio.setValueAtTime(20, t);
        this.masterLimiter.attack.setValueAtTime(0.001, t);
        this.masterLimiter.release.setValueAtTime(0.12, t);
        this.masterLimiter.connect(this.audioCtx.destination);
      } catch (_) {}
    }
    return this.masterLimiter || (this.audioCtx ? this.audioCtx.destination : null);
  }

  initAudio() {
    this.ensureAudioBus();
    if (this.audioCtx) {
      this.audioCtx.resume().catch(() => {});
    }

    const unlockHandler = () => {
      if (this.audioCtx) {
        this.audioCtx.resume().then(() => {
          this.audioUnlocked = true;
          if (this.audioGateEl) this.audioGateEl.classList.add('hidden');
        }).catch(() => {});
      }
    };

    window.addEventListener('click', unlockHandler);
    window.addEventListener('keydown', unlockHandler);
  }

  playSubBassBoom(volume = 0.42) {
    const outBus = this.ensureAudioBus();
    if (!this.audioCtx || !outBus) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + 0.5);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);

      osc.connect(gain);
      gain.connect(outBus);

      osc.start(now);
      osc.stop(now + 0.62);
    } catch (_) {}
  }

  playBrassNote(freq, startTime, duration, volume = 0.35, isStaccato = false) {
    const outBus = this.ensureAudioBus();
    if (!this.audioCtx || !outBus) return;
    try {
      const t = startTime;
      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(volume, t);

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.setValueAtTime(3.6, t);

      const minCutoff = Math.max(320, freq * 1.2);
      const peakCutoff = Math.min(6800, freq * 5.4);
      const sustainCutoff = Math.min(4200, freq * 3.2);

      filter.frequency.setValueAtTime(minCutoff, t);
      filter.frequency.exponentialRampToValueAtTime(peakCutoff, t + 0.042);
      filter.frequency.exponentialRampToValueAtTime(sustainCutoff, t + (isStaccato ? 0.09 : 0.22));

      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, t);
      osc2.frequency.setValueAtTime(freq, t);
      osc1.detune.setValueAtTime(-7, t);
      osc2.detune.setValueAtTime(7, t);

      const subOsc = this.audioCtx.createOscillator();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 0.5, t);
      const subGain = this.audioCtx.createGain();
      subGain.gain.setValueAtTime(0.24, t);
      subOsc.connect(subGain);
      subGain.connect(filter);

      const noteGain = this.audioCtx.createGain();
      const attackTime = isStaccato ? 0.016 : 0.032;
      const releaseTime = isStaccato ? 0.055 : 0.22;

      noteGain.gain.setValueAtTime(0.001, t);
      noteGain.gain.exponentialRampToValueAtTime(1.0, t + attackTime);

      if (isStaccato) {
        noteGain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      } else {
        noteGain.gain.setValueAtTime(0.85, t + attackTime + 0.04);
        noteGain.gain.setValueAtTime(0.85, t + Math.max(attackTime + 0.05, duration - releaseTime));
        noteGain.gain.exponentialRampToValueAtTime(0.001, t + duration + releaseTime);
      }

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);
      masterGain.connect(outBus);

      const stopTime = t + duration + releaseTime + 0.05;
      osc1.start(t);
      osc2.start(t);
      subOsc.start(t);
      osc1.stop(stopTime);
      osc2.stop(stopTime);
      subOsc.stop(stopTime);
    } catch (_) {}
  }

  /**
   * Short Trumpet Fanfare for Partial Wins (~0.85s brisk brass call)
   */
  playShortTrumpetFanfare() {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const motif = [
        { freq: 440.00, time: 0.00, dur: 0.09, staccato: true,  vol: 0.36 }, // A4
        { freq: 587.33, time: 0.11, dur: 0.09, staccato: true,  vol: 0.38 }, // D5
        { freq: 739.99, time: 0.22, dur: 0.11, staccato: true,  vol: 0.42 }, // F#5
        { freq: 880.00, time: 0.35, dur: 0.48, staccato: false, vol: 0.46 }, // A5 (Victory Hold)
        { freq: 587.33, time: 0.35, dur: 0.48, staccato: false, vol: 0.34 }  // D5 Harmony
      ];
      motif.forEach(n => {
        this.playBrassNote(n.freq, now + n.time, n.dur, n.vol, n.staccato);
      });
    } catch (_) {}
  }

  /**
   * Grand Royal Trumpet Fanfare for !cashout, $20 Max Prize, and 8-Bracket Champion (~2.5s)
   */
  playGrandTrumpetFanfare() {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const motif = [
        { freq: 440.00, time: 0.00, dur: 0.11, staccato: true,  vol: 0.38 }, // A4
        { freq: 440.00, time: 0.13, dur: 0.11, staccato: true,  vol: 0.38 }, // A4
        { freq: 440.00, time: 0.26, dur: 0.11, staccato: true,  vol: 0.42 }, // A4
        { freq: 587.33, time: 0.39, dur: 0.34, staccato: false, vol: 0.48 }, // D5
        { freq: 440.00, time: 0.78, dur: 0.12, staccato: true,  vol: 0.38 }, // A4
        { freq: 587.33, time: 0.92, dur: 0.17, staccato: false, vol: 0.44 }, // D5
        { freq: 739.99, time: 1.12, dur: 0.22, staccato: false, vol: 0.50 }, // F#5
      ];
      motif.forEach(n => {
        this.playBrassNote(n.freq, now + n.time, n.dur, n.vol, n.staccato);
      });

      const climaxTime = now + 1.38;
      const chord = [
        { freq: 293.66, dur: 1.30, vol: 0.34 }, // D4
        { freq: 440.00, dur: 1.35, vol: 0.36 }, // A4
        { freq: 587.33, dur: 1.40, vol: 0.40 }, // D5
        { freq: 739.99, dur: 1.45, vol: 0.44 }, // F#5
        { freq: 880.00, dur: 1.50, vol: 0.48 }  // A5
      ];
      chord.forEach(c => {
        this.playBrassNote(c.freq, climaxTime, c.dur, c.vol, false);
      });
    } catch (_) {}
  }

  /**
   * Metallic Gold Coins Shower Sound (Triggered after trumpet fanfare starts)
   */
  playCoinClatter(count = 24, delaySeconds = 0.48) {
    const outBus = this.ensureAudioBus();
    if (!this.audioCtx || !outBus) return;
    try {
      const now = this.audioCtx.currentTime + delaySeconds;
      for (let i = 0; i < count; i++) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();
        const t = now + (i * 0.045) + (Math.random() * 0.028);

        const baseFreq = 3300 + Math.random() * 2200;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(baseFreq, t);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.66, t + 0.038);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(baseFreq, t);
        filter.Q.setValueAtTime(13, t);

        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.042);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(outBus);

        osc.start(t);
        osc.stop(t + 0.048);
      }
    } catch (_) {}
  }

  /**
   * Plays Trumpet Fanfare first, followed by Falling Coins audio
   */
  playCelebrationSequenceAudio(isGrand = false) {
    this.ensureAudioBus();
    if (!this.audioCtx) return;

    const executeSequence = () => {
      if (isGrand) {
        this.playSubBassBoom(0.45);
        this.playGrandTrumpetFanfare();
        // Coins sound starts right after the trumpet call begins and cascades in 2 waves
        this.playCoinClatter(36, 0.62);
        this.playCoinClatter(30, 1.85);
      } else {
        this.playSubBassBoom(0.28);
        this.playShortTrumpetFanfare();
        // Shorter, brisk coin shower right after the short trumpet fanfare
        this.playCoinClatter(20, 0.45);
      }
    };

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().then(() => {
        this.audioUnlocked = true;
        if (this.audioGateEl) this.audioGateEl.classList.add('hidden');
        executeSequence();
      }).catch(() => {
        executeSequence();
      });
    } else {
      executeSequence();
    }
  }

  /* =========================================================================
   * 4. HARDWARE ACCELERATED 60 FPS SKY COIN RAIN ENGINE (Background Layer)
   * ========================================================================= */
  spawnCoinRain(amount = 90, isGrand = false) {
    for (let i = 0; i < amount; i++) {
      let p = this.particlePool.length > 0 ? this.particlePool.pop() : {};

      const roll = Math.random();
      if (isGrand) {
        p.type = roll < 0.68 ? 'coin' : (roll < 0.80 ? 'chipGold' : (roll < 0.90 ? 'chipGreen' : 'starGold'));
      } else {
        p.type = roll < 0.85 ? 'coin' : (roll < 0.94 ? 'chipGold' : 'chipCyan');
      }

      // Coins fall from the sky across the full width of the screen
      p.x = Math.random() * this.width;
      p.y = -45 - Math.random() * (this.height * (isGrand ? 0.85 : 0.45));
      p.vx = (Math.random() - 0.5) * (isGrand ? 3.4 : 2.4);
      p.vy = (isGrand ? 5.5 : 7.0) + Math.random() * 6.5;
      p.gravity = (isGrand ? 0.15 : 0.22) + Math.random() * 0.08;
      p.size = (p.type === 'starGold' ? 16 : 23) + Math.random() * (isGrand ? 14 : 10);
      p.rotY = Math.random() * Math.PI * 2;
      p.rotZ = Math.random() * Math.PI * 2;
      p.vRotY = 0.11 + Math.random() * 0.16;
      p.vRotZ = (Math.random() - 0.5) * 0.07;

      this.particles.push(p);
    }

    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(this.boundRenderLoop);
    }
  }

  renderLoop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const alive = [];
    const count = this.particles.length;

    for (let i = 0; i < count; i++) {
      const p = this.particles[i];

      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotY += p.vRotY;
      p.rotZ += p.vRotZ;

      this.drawParticle(p);

      if (p.y < this.height + 60) {
        alive.push(p);
      } else {
        this.particlePool.push(p);
      }
    }

    this.particles = alive;

    if (this.particles.length > 0) {
      requestAnimationFrame(this.boundRenderLoop);
    } else {
      this.isRunning = false;
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  drawParticle(p) {
    const sprite = this.sprites[p.type] || this.sprites.coin;
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.rotZ);

    const scaleY = p.type === 'starGold' ? 1 : Math.cos(p.rotY);
    this.ctx.scale(1, Math.abs(scaleY) < 0.08 ? 0.08 : scaleY);

    const half = p.size;
    this.ctx.drawImage(sprite, -half, -half, half * 2, half * 2);
    this.ctx.restore();
  }

  /* =========================================================================
   * 5. SPECTATOR AVATAR RESOLUTION (Kick Profile Pic + Deterministic Vector Fallback)
   * ========================================================================= */
  resolveSpectatorAvatar(username, explicitAvatarUrl) {
    const cleanUser = String(username || 'Winner').trim().replace(/^@/, '') || 'Winner';
    const fallbackUri = (typeof window.getDeterministicAvatarDataUri === 'function')
      ? window.getDeterministicAvatarDataUri(cleanUser, 136)
      : '';

    if (explicitAvatarUrl && String(explicitAvatarUrl).startsWith('http')) {
      this.avatarCache.set(cleanUser.toLowerCase(), explicitAvatarUrl);
      if (this.avatarImgEl) {
        this.avatarImgEl.onerror = () => {
          this.avatarImgEl.onerror = null;
          if (fallbackUri) this.avatarImgEl.src = fallbackUri;
        };
        this.avatarImgEl.src = explicitAvatarUrl;
      }
      return;
    }

    const cached = this.avatarCache.get(cleanUser.toLowerCase());
    if (cached && this.avatarImgEl) {
      this.avatarImgEl.onerror = () => {
        this.avatarImgEl.onerror = null;
        if (fallbackUri) this.avatarImgEl.src = fallbackUri;
      };
      this.avatarImgEl.src = cached;
      return;
    }

    // Set deterministic vector avatar immediately (0ms latency)
    if (this.avatarImgEl && fallbackUri) {
      this.avatarImgEl.src = fallbackUri;
    }

    // Asynchronously check Kick profile picture via Worker proxy
    fetch(`/api/kick/user/${encodeURIComponent(cleanUser)}`)
      .then(r => r.ok ? r.json() : null)
      .then(info => {
        if (info && info.avatarUrl && String(info.avatarUrl).startsWith('http')) {
          this.avatarCache.set(cleanUser.toLowerCase(), info.avatarUrl);
          if (this.avatarImgEl && this.usernameEl && this.usernameEl.textContent.toLowerCase().replace(/^@/, '') === cleanUser.toLowerCase()) {
            this.avatarImgEl.onerror = () => {
              this.avatarImgEl.onerror = null;
              if (fallbackUri) this.avatarImgEl.src = fallbackUri;
            };
            this.avatarImgEl.src = info.avatarUrl;
          }
        }
      })
      .catch(() => {});
  }

  /* =========================================================================
   * 6. DUAL-TIER WINNER CELEBRATION TRIGGER ('partial' vs 'grand')
   * ========================================================================= */
  triggerCelebration(data) {
    if (!data) return;
    const evTs = Number(data.timestamp || data.ts || 0);
    if (evTs && evTs <= this.lastEventTimestamp) {
      return;
    }
    if (evTs) {
      this.lastEventTimestamp = evTs;
    } else {
      this.lastEventTimestamp = Date.now();
    }

    clearTimeout(this.billboardTimer);
    this.waveTimers.forEach(t => clearTimeout(t));
    this.waveTimers = [];

    const rawType = String(data.type || '').toUpperCase();
    const rawCat = String(data.category || '').toUpperCase();
    const rawPrize = String(data.prize || data.prizeText || '').toUpperCase();

    // Determine whether this is a Special Grand Celebration ('grand') or a Partial Victory ('partial'):
    // Grand triggers on:
    // 1. 1v1 Battle !cashout (KOTH_CASHOUT)
    // 2. 1v1 Battle $20 USD Max Streak (KOTH_CHAMPION / 4/4)
    // 3. 8-Bracket Tournament Champion (TOURNEY_CHAMPION)
    const isGrand =
      data.tier === 'grand' ||
      rawType === 'KOTH_CHAMPION' ||
      rawType === 'KOTH_CASHOUT' ||
      rawType === 'TOURNEY_CHAMPION' ||
      rawType === 'GRAND_WIN' ||
      rawCat.includes('CHAMPION') ||
      rawCat.includes('CASHOUT') ||
      rawPrize.includes('CASHOUT') ||
      rawPrize.includes('$20');

    const isTourney = rawType.includes('TOURNEY') || rawCat.includes('TOURNEY') || rawCat.includes('TOURNAMENT') || rawCat.includes('BRACKET');
    const isCashout = rawType.includes('CASHOUT') || rawCat.includes('CASHOUT');

    const icon = data.icon || (isGrand ? (isCashout ? '💰' : '👑') : (isTourney ? '🏆' : '⚔️'));
    const category = data.category || (
      isGrand
        ? (isCashout ? '1V1 KING OF THE HILL · !CASHOUT WINNER' : (isTourney ? '8-BRACKET TOURNAMENT CHAMPION' : '1V1 KING OF THE HILL · $20 MAX CHAMPION'))
        : (isTourney ? '8-BRACKET ROUND WINNER' : '1V1 BATTLE ROUND WINNER')
    );

    const ribbonText = data.ribbon || (
      isGrand
        ? (isCashout ? '💰 CASHOUT LOCKED IN' : (isTourney ? '🏆 GRAND CHAMPION' : '👑 4/4 MAX PRIZE CHAMPION'))
        : (isTourney ? '⚡ ADVANCES TO NEXT ROUND' : '⚔️ ROUND VICTORY')
    );

    const rawUser = data.username || (data.winner && (data.winner.displayName || data.winner.username)) || '@Winner';
    const cleanUser = String(rawUser).replace(/^@/, '').trim() || 'Winner';
    const formattedUser = `@${cleanUser}`;

    const rawSlot = data.slotName || (data.winner && data.winner.slotName) || 'Wanted Dead or a Wild';
    let resolvedSlot = null;
    if (window.SlotResolver) {
      resolvedSlot = window.SlotResolver.resolve(rawSlot, '../');
    }
    const slotName = (resolvedSlot && resolvedSlot.name) || rawSlot;
    let slotImg = (resolvedSlot && resolvedSlot.image) || data.slotImg || data.slotImage || (data.winner && data.winner.slotImage);
    if (!slotImg) {
      slotImg = 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';
    }

    const statValue = data.statValue || (data.multiplier ? (String(data.multiplier).endsWith('x') || data.multiplier === 'WIN' ? String(data.multiplier) : `${data.multiplier}x`) : 'WIN 🏆');
    const prize = data.prize || data.prizeText || (isGrand ? 'GRAND CHAMPION PRIZE 🏆' : 'ROUND WINNER');

    // Populate Foreground Center Elements
    if (this.iconEl) this.iconEl.textContent = icon;
    if (this.categoryEl) this.categoryEl.textContent = String(category).toUpperCase();
    if (this.tierRibbonEl) this.tierRibbonEl.textContent = ribbonText;

    // Resolve and display Spectator Avatar in the center
    this.resolveSpectatorAvatar(cleanUser, data.avatarUrl || (data.winner && data.winner.avatarUrl));

    if (this.usernameEl) {
      this.scrambleText(this.usernameEl, formattedUser, isGrand ? 680 : 380);
    }
    if (this.slotNameEl) this.slotNameEl.textContent = slotName;
    if (this.slotImgEl) {
      this.slotImgEl.src = slotImg;
      this.slotImgEl.style.display = 'block';
    }
    if (this.statValueEl) this.statValueEl.textContent = statValue;
    if (this.prizeTextEl) {
      this.prizeTextEl.textContent = prize;
    } else if (this.prizeTagEl) {
      this.prizeTagEl.textContent = prize;
    }

    // Apply tier classes ('tier-partial' vs 'tier-grand') and show centered card
    if (this.billboard) {
      this.billboard.classList.remove('active', 'tier-partial', 'tier-grand');
      void this.billboard.offsetWidth; // trigger reflow
      this.billboard.classList.add(isGrand ? 'tier-grand' : 'tier-partial', 'active');
    }

    // 1. First: Play Trumpet Fanfare (followed by Coins audio)
    this.playCelebrationSequenceAudio(isGrand);

    // 2. Then: Rain Coins from the sky in the background right as the trumpet call rings out
    if (isGrand) {
      this.waveTimers.push(setTimeout(() => this.spawnCoinRain(135, true), 420));
      this.waveTimers.push(setTimeout(() => this.spawnCoinRain(95, true), 1450));
      this.waveTimers.push(setTimeout(() => this.spawnCoinRain(80, true), 2600));
    } else {
      this.waveTimers.push(setTimeout(() => this.spawnCoinRain(85, false), 320));
    }

    // 3. Auto-hide back to 100% transparent (Short ~4.2s for partial wins, Long ~8.5s for grand wins)
    const displayDurationMs = isGrand ? 8500 : 4200;
    this.billboardTimer = setTimeout(() => {
      if (this.billboard) {
        this.billboard.classList.remove('active');
      }
    }, displayDurationMs);
  }

  scrambleText(el, targetText, duration = 500) {
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = targetText;
      return;
    }
    const chars = '0123456789$!#%&*ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const finalStr = String(targetText);
    const start = performance.now();

    const frame = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const revealedCount = Math.floor(easedProgress * finalStr.length);

      let output = '';
      for (let i = 0; i < finalStr.length; i++) {
        if (i < revealedCount) {
          output += finalStr[i];
        } else if (finalStr[i] === ' ') {
          output += ' ';
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = output;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = finalStr;
      }
    };
    requestAnimationFrame(frame);
  }

  triggerLiveDemo(tier = 'grand') {
    if (tier === 'partial') {
      this.triggerCelebration({
        tier: 'partial',
        type: 'BATTLE_WIN',
        icon: '⚔️',
        category: '1V1 BATTLE · ROUND WINNER',
        ribbon: '⚔️ ROUND VICTORY (1/4)',
        username: '@diggitybets',
        slotName: 'Wanted Dead or a Wild',
        statValue: '142.50x',
        prize: 'STREAK 1/4 ($5.00 USD BANKED) · !CONTINUE OR !CASHOUT',
        timestamp: Date.now()
      });
    } else {
      this.triggerCelebration({
        tier: 'grand',
        type: 'KOTH_CHAMPION',
        icon: '👑',
        category: 'KING OF THE HILL · GRAND CHAMPION',
        ribbon: '👑 $20.00 USD MAX PRIZE CHAMPION',
        username: '@diggitybets',
        slotName: 'Gates of Olympus 1000',
        statValue: '4/4 STREAK',
        prize: '🏆 GRAND PRIZE LOCKED: $20.00 USD!',
        timestamp: Date.now()
      });
    }
  }

  initModeDetection() {
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview') === '1';
    const controls = document.getElementById('streamer-controls');
    if (isPreview) {
      document.body.classList.remove('obs-mode');
      document.body.classList.add('preview-mode');
      if (controls) controls.style.display = 'flex';
    } else {
      document.body.classList.remove('preview-mode');
      document.body.classList.add('obs-mode');
      if (controls) controls.style.display = 'none';
      if (this.audioGateEl) this.audioGateEl.style.display = 'none';
    }
  }

  initEventListeners() {
    const btnPartial = document.getElementById('btn-test-partial');
    const btnGrandCashout = document.getElementById('btn-test-grand-cashout');
    const btnTourney = document.getElementById('btn-test-tourney');
    const btnCoins = document.getElementById('btn-test-coins');
    const btnToggleBg = document.getElementById('btn-toggle-bg');
    const btnUnlock = document.getElementById('btn-unlock-audio');

    if (btnPartial) {
      btnPartial.addEventListener('click', () => this.triggerLiveDemo('partial'));
    }

    if (btnGrandCashout) {
      btnGrandCashout.addEventListener('click', () => {
        this.triggerCelebration({
          tier: 'grand',
          type: 'KOTH_CASHOUT',
          icon: '💰',
          category: '1V1 KING OF THE HILL · !CASHOUT WINNER',
          ribbon: '💰 CASHOUT LOCKED IN',
          username: '@diggitybets',
          slotName: 'Wanted Dead or a Wild',
          statValue: '3/4 WINS',
          prize: '💰 CASHOUT PRIZE: $15.00 USD!',
          timestamp: Date.now()
        });
      });
    }

    if (btnTourney) {
      btnTourney.addEventListener('click', () => {
        this.triggerCelebration({
          tier: 'grand',
          type: 'TOURNEY_CHAMPION',
          icon: '🏆',
          category: '8-BRACKET TOURNAMENT CHAMPION',
          ribbon: '🏆 GRAND TOURNAMENT CHAMPION',
          username: '@diggitybets',
          slotName: 'Gates of Olympus 1000',
          statValue: 'CHAMPION 🏆',
          prize: '👑 1ST PLACE TOURNAMENT WINNER!',
          timestamp: Date.now()
        });
      });
    }

    if (btnCoins) {
      btnCoins.addEventListener('click', () => {
        this.spawnCoinRain(95, false);
        this.playCoinClatter(24, 0.05);
      });
    }

    if (btnToggleBg) {
      btnToggleBg.addEventListener('click', () => {
        document.body.classList.toggle('preview-mode');
        document.body.classList.toggle('obs-mode');
      });
    }

    if (btnUnlock) {
      btnUnlock.addEventListener('click', () => {
        if (this.audioCtx) this.audioCtx.resume().catch(() => {});
        this.triggerLiveDemo('grand');
      });
    }
  }

  /* =========================================================================
   * 7. MULTI-CHANNEL REAL-TIME SYNC (BroadcastChannel + LocalStorage + Edge Poll + WS)
   * ========================================================================= */
  initSyncChannels() {
    // 1. Same-browser BroadcastChannel
    try {
      this.channel = new BroadcastChannel('hunthub_celebration');
      this.channel.onmessage = (event) => {
        if (event && event.data) {
          this.triggerCelebration(event.data);
        }
      };
    } catch (_) {}

    // 2. Same-browser Storage event
    window.addEventListener('storage', (e) => {
      if ((e.key === 'hunthub_celebration_trigger' || e.key === 'hunthub_celebration_event') && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          this.triggerCelebration(data);
        } catch (_) {}
      }
    });

    // Seed baseline timestamp from existing localStorage so old events don't replay on reload
    try {
      const existing = localStorage.getItem('hunthub_celebration_event');
      if (existing) {
        const parsed = JSON.parse(existing);
        const ts = Number(parsed?.timestamp || parsed?.ts || 0);
        if (ts > this.lastEventTimestamp) {
          this.lastEventTimestamp = ts;
        }
      }
    } catch (_) {}

    // 3. Cross-Process Edge Sync (Opera/Chrome Control Panel <-> OBS Studio Browser Source)
    this.initEdgeCelebrationPoll();

    // 4. Optional Localhost WebSocket Sync
    this.initWebSocketSync();
  }

  initEdgeCelebrationPoll() {
    let initializedBaseline = false;
    const pollEdge = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch('/api/overlay/celebration', { cache: 'no-store' });
        if (!res.ok) return;
        const payload = await res.json();
        const ev = payload?.celebrationEvent;
        if (!ev) {
          initializedBaseline = true;
          return;
        }
        const evTs = Number(ev.timestamp || ev.ts || 0);
        if (!initializedBaseline) {
          initializedBaseline = true;
          // Only trigger on first load if the event was fired within the last 3.5 seconds
          if (evTs > this.lastEventTimestamp && (Date.now() - evTs) < 3500) {
            this.triggerCelebration(ev);
          } else if (evTs > this.lastEventTimestamp) {
            this.lastEventTimestamp = evTs;
          }
          return;
        }
        if (evTs > this.lastEventTimestamp && (Date.now() - evTs) < 15000) {
          this.triggerCelebration(ev);
        }
      } catch (_) {}
    };

    pollEdge();
    setInterval(pollEdge, 900);
  }

  initWebSocketSync() {
    const urlParams = new URLSearchParams(window.location.search);
    const port = urlParams.get('port') || '3001';
    const isLocalHost = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    if (!isLocalHost && !urlParams.get('port')) {
      return;
    }
    const wsUrl = `ws://127.0.0.1:${port}/`;
    try {
      this.ws = new WebSocket(wsUrl);
      this.ws.onopen = () => {
        fetch(`http://127.0.0.1:${port}/api/sync/state`).catch(() => {});
      };
      this.ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'CELEBRATION') {
            this.triggerCelebration(payload);
          } else if (payload.type === 'overlay_sync_event' && payload.event) {
            if (payload.event.type === 'CELEBRATION' || payload.event.target === 'overlay-celebration') {
              this.triggerCelebration(payload.event.data || payload.event);
            }
          }
        } catch (_) {}
      };
      this.ws.onclose = () => {
        setTimeout(() => this.initWebSocketSync(), 4000);
      };
    } catch (_) {}
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.celebrationApp = new CelebrationOverlayApp();
});
