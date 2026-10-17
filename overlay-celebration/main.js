/**
 * HuntHub — Fullscreen Victory & Celebration Screen Overlay
 * =============================================================================
 * Features:
 * 1. 60 FPS Hardware-Accelerated Offscreen Sprite Particle Engine (Zero CPU slowdown)
 * 2. High-Pitched Crisp Metallic Gold Coin Clink Synthesizer
 * 3. Luxury Floating Winner Billboard with Chakra Petch & Glassmorphism
 * 4. Dual-channel Listener: BroadcastChannel('hunthub_celebration') + LocalStorage
 * 5. Auto-Demo on load + Audio Gate prompt for browser gesture policy
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
    this.audioCtx = null;
    this.audioUnlocked = false;
    this.billboardTimer = null;

    // DOM Elements
    this.audioGateEl = document.getElementById('audio-gate-prompt');
    this.billboard = document.getElementById('winner-billboard');
    this.iconEl = document.getElementById('billboard-icon');
    this.categoryEl = document.getElementById('billboard-category');
    this.usernameEl = document.getElementById('winner-username');
    this.slotImgEl = document.getElementById('winner-slot-img');
    this.slotNameEl = document.getElementById('winner-slot-name');
    this.statBadgeEl = document.getElementById('winner-stat-badge');
    this.statValueEl = document.getElementById('winner-stat-value');
    this.prizeTagEl = document.getElementById('winner-prize-tag');

    this.initCanvasResize();
    this.initSpriteCache();
    this.initAudio();
    this.initModeDetection();
    this.initEventListeners();
    this.initBroadcastChannel();

    // Launch celebratory demonstration on load
    setTimeout(() => {
      this.triggerLiveDemo();
    }, 400);
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
      chipCyan: this.createOffscreenChipSprite('#00e5ff'),
      chipMagenta: this.createOffscreenChipSprite('#ff2a5f')
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
    gradOuter.addColorStop(0, '#fff4b8');
    gradOuter.addColorStop(0.5, '#ffd700');
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
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', cx, cy + 1);

    return c;
  }

  createOffscreenChipSprite(color) {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d');
    const r = 28;
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
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#07090e';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.45, 0, Math.PI * 2);
    ctx.fill();

    return c;
  }

  /* =========================================================================
   * 3. PROCEDURAL WEB AUDIO — CRISP HIGH-PITCHED METALLIC COIN SOUND
   * ========================================================================= */
  initAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.audioCtx = new AudioContextClass();
    }

    if (this.audioCtx && this.audioCtx.state === 'running') {
      this.audioUnlocked = true;
      if (this.audioGateEl) this.audioGateEl.classList.add('hidden');
    }

    const unlockHandler = () => {
      if (this.audioCtx) {
        this.audioCtx.resume().then(() => {
          this.audioUnlocked = true;
          if (this.audioGateEl) this.audioGateEl.classList.add('hidden');
        });
      }
    };

    window.addEventListener('click', unlockHandler, { once: true });
    window.addEventListener('keydown', unlockHandler, { once: true });
  }

  resumeAudioIfNeeded() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().then(() => {
        this.audioUnlocked = true;
        if (this.audioGateEl) this.audioGateEl.classList.add('hidden');
      });
    }
  }

  playSubBassBoom() {
    if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(85, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.45);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch (e) {}
  }

  playBrassNote(freq, startTime, duration, volume = 0.35, isStaccato = false) {
    if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
    try {
      const t = startTime;
      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(volume, t);

      // Resonant lowpass formant filter
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.setValueAtTime(3.6, t);

      const minCutoff = Math.max(320, freq * 1.2);
      const peakCutoff = Math.min(6800, freq * 5.4);
      const sustainCutoff = Math.min(4200, freq * 3.2);

      filter.frequency.setValueAtTime(minCutoff, t);
      filter.frequency.exponentialRampToValueAtTime(peakCutoff, t + 0.042);
      filter.frequency.exponentialRampToValueAtTime(sustainCutoff, t + (isStaccato ? 0.09 : 0.22));

      // Dual detuned sawtooth oscillators
      const osc1 = this.audioCtx.createOscillator();
      const osc2 = this.audioCtx.createOscillator();
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, t);
      osc2.frequency.setValueAtTime(freq, t);
      osc1.detune.setValueAtTime(-7, t);
      osc2.detune.setValueAtTime(7, t);

      // Warm sub-body
      const subOsc = this.audioCtx.createOscillator();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 0.5, t);
      const subGain = this.audioCtx.createGain();
      subGain.gain.setValueAtTime(0.24, t);
      subOsc.connect(subGain);
      subGain.connect(filter);

      // Vibrato LFO for long notes
      if (!isStaccato && duration > 0.25) {
        try {
          const lfo = this.audioCtx.createOscillator();
          const lfoGain = this.audioCtx.createGain();
          lfo.type = 'sine';
          lfo.frequency.setValueAtTime(5.3, t);
          lfoGain.gain.setValueAtTime(0, t);
          lfoGain.gain.setValueAtTime(0, t + 0.16);
          lfoGain.gain.linearRampToValueAtTime(freq * 0.022, t + 0.38);
          lfo.connect(osc1.frequency);
          lfo.connect(osc2.frequency);
          lfo.start(t + 0.16);
          lfo.stop(t + duration + 0.1);
        } catch (_) {}
      }

      // Envelope
      const noteGain = this.audioCtx.createGain();
      const attackTime = isStaccato ? 0.018 : 0.035;
      const releaseTime = isStaccato ? 0.06 : 0.25;

      noteGain.gain.setValueAtTime(0.001, t);
      noteGain.gain.exponentialRampToValueAtTime(1.0, t + attackTime);

      if (isStaccato) {
        noteGain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      } else {
        noteGain.gain.setValueAtTime(0.85, t + attackTime + 0.05);
        noteGain.gain.setValueAtTime(0.85, t + duration - releaseTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, t + duration + releaseTime);
      }

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);
      masterGain.connect(this.audioCtx.destination);

      const stopTime = t + duration + releaseTime + 0.05;
      osc1.start(t);
      osc2.start(t);
      subOsc.start(t);
      osc1.stop(stopTime);
      osc2.stop(stopTime);
      subOsc.stop(stopTime);
    } catch (_) {}
  }

  playVictoriousTrumpetFanfare() {
    if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
    try {
      const now = this.audioCtx.currentTime;

      // Royal Entrance Motif in D Major
      const motif = [
        { freq: 440.00, time: 0.00, dur: 0.11, staccato: true,  vol: 0.38 }, // A4 (ta)
        { freq: 440.00, time: 0.13, dur: 0.11, staccato: true,  vol: 0.38 }, // A4 (ta)
        { freq: 440.00, time: 0.26, dur: 0.11, staccato: true,  vol: 0.42 }, // A4 (ta)
        { freq: 587.33, time: 0.39, dur: 0.36, staccato: false, vol: 0.48 }, // D5 (TAAA)
        { freq: 440.00, time: 0.80, dur: 0.12, staccato: true,  vol: 0.38 }, // A4 (ta)
        { freq: 587.33, time: 0.94, dur: 0.18, staccato: false, vol: 0.44 }, // D5 (taa)
        { freq: 739.99, time: 1.15, dur: 0.22, staccato: false, vol: 0.50 }, // F#5 (TAA!)
      ];

      motif.forEach(n => {
        this.playBrassNote(n.freq, now + n.time, n.dur, n.vol, n.staccato);
      });

      // Grand Climax 5-Horn Chord at T + 1.42s
      const climaxTime = now + 1.42;
      const chord = [
        { freq: 293.66, dur: 1.25, vol: 0.34 }, // D4 (Trombone)
        { freq: 440.00, dur: 1.30, vol: 0.36 }, // A4 (French Horn)
        { freq: 587.33, dur: 1.35, vol: 0.40 }, // D5 (Trumpet 2)
        { freq: 739.99, dur: 1.40, vol: 0.44 }, // F#5 (Trumpet 1)
        { freq: 880.00, dur: 1.45, vol: 0.48 }, // A5 (Lead Trumpet)
      ];

      chord.forEach(c => {
        this.playBrassNote(c.freq, climaxTime, c.dur, c.vol, false);
      });
    } catch (_) {}
  }

  playFanfare() {
    this.playVictoriousTrumpetFanfare();
  }

  // Sharp, high-pitched metallic clinking coins
  playCoinClatter(count = 28) {
    if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
    try {
      const now = this.audioCtx.currentTime;
      for (let i = 0; i < count; i++) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();
        const t = now + 0.15 + (i * 0.05) + (Math.random() * 0.03);

        // High metallic frequency range (3,200 Hz - 5,500 Hz)
        const baseFreq = 3400 + Math.random() * 2000;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(baseFreq, t);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.65, t + 0.035);

        // Resonant metallic bandpass filter
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(baseFreq, t);
        filter.Q.setValueAtTime(14, t);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + 0.045);
      }
    } catch (e) {}
  }

  playFullCelebrationAudio() {
    this.resumeAudioIfNeeded();
    this.playSubBassBoom();
    this.playFanfare();
    this.playCoinClatter(32);
  }

  /* =========================================================================
   * 4. HARDWARE ACCELERATED 60 FPS PARTICLE ENGINE (Optimized Pool)
   * ========================================================================= */
  spawnCoinRain(amount = 85) {
    for (let i = 0; i < amount; i++) {
      let p;
      if (this.particlePool.length > 0) {
        p = this.particlePool.pop();
      } else {
        p = {};
      }

      const roll = Math.random();
      p.type = roll < 0.7 ? 'coin' : (roll < 0.85 ? 'chipGold' : (roll < 0.93 ? 'chipCyan' : 'chipMagenta'));
      p.x = Math.random() * this.width;
      p.y = -40 - Math.random() * (this.height * 0.6);
      p.vx = (Math.random() - 0.5) * 3;
      p.vy = 5 + Math.random() * 7;
      p.gravity = 0.16 + Math.random() * 0.08;
      p.size = 24 + Math.random() * 12;
      p.rotY = Math.random() * Math.PI * 2;
      p.rotZ = Math.random() * Math.PI * 2;
      p.vRotY = 0.1 + Math.random() * 0.15;
      p.vRotZ = (Math.random() - 0.5) * 0.06;

      this.particles.push(p);
    }

    if (!this.isRunning) {
      this.isRunning = true;
      requestAnimationFrame(this.renderLoop.bind(this));
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
      requestAnimationFrame(this.renderLoop.bind(this));
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

    const scaleY = Math.cos(p.rotY);
    this.ctx.scale(1, Math.abs(scaleY) < 0.06 ? 0.06 : scaleY);

    const half = p.size;
    this.ctx.drawImage(sprite, -half, -half, half * 2, half * 2);
    this.ctx.restore();
  }

  /* =========================================================================
   * 5. WINNER BILLBOARD TRIGGER
   * ========================================================================= */
  triggerCelebration(data) {
    clearTimeout(this.billboardTimer);

    const icon = data.icon || (data.type === 'tourney' ? '🏆' : '⚔️');
    const category = data.category || (data.type === 'tourney' ? 'TOURNAMENT CHAMPION' : 'Victory');
    const username = data.username || '@LuckyStriker';
    const slotName = data.slotName || 'Wanted Dead or a Wild';
    let slotImg = data.slotImg;
    if ((!slotImg || slotImg.includes('.svg')) && window.HUNTHUB_CURATED_SLOTS && slotName) {
      const found = window.HUNTHUB_CURATED_SLOTS.find(
        (s) => s.name.toLowerCase() === slotName.toLowerCase() || s.name.toLowerCase().includes(slotName.toLowerCase())
      );
      if (found) slotImg = found.image;
    }
    if (!slotImg || slotImg.includes('.svg')) {
      slotImg = 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';
    }

    const statValue = data.statValue || (data.multiplier ? `${data.multiplier}x` : '150.00x');
    const prize = data.prize || (data.type === 'tourney' ? 'PRIZE: 1ST: $150 · 2ND: $50 USD' : 'PRIZE: $50.00 USD');

    if (this.iconEl) this.iconEl.textContent = icon;
    if (this.categoryEl) this.categoryEl.textContent = category.toUpperCase();
    if (this.usernameEl) this.usernameEl.textContent = username.startsWith('@') ? username : `@${username}`;
    if (this.slotNameEl) this.slotNameEl.textContent = slotName;
    if (this.slotImgEl) {
      this.slotImgEl.src = slotImg;
      this.slotImgEl.style.display = 'block';
    }
    if (this.statValueEl) this.statValueEl.textContent = statValue;
    if (this.prizeTagEl) this.prizeTagEl.textContent = prize;

    if (this.billboard) {
      this.billboard.classList.remove('active');
      void this.billboard.offsetWidth; // trigger reflow
      this.billboard.classList.add('active');
    }

    this.spawnCoinRain(90);
    this.playFullCelebrationAudio();

    this.billboardTimer = setTimeout(() => {
      if (this.billboard) this.billboard.classList.remove('active');
    }, 12000);
  }

  triggerLiveDemo() {
    this.triggerCelebration({
      type: 'tourney',
      icon: '🏆',
      category: 'TOURNAMENT CHAMPION',
      username: '@LuckyStriker',
      slotName: 'Wanted Dead or a Wild',
      slotImg: 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format',
      multiplier: '150.00',
      prize: 'PRIZE: $100.00 USD'
    });
  }

  initModeDetection() {
    const urlParams = new URLSearchParams(window.location.search);
    const isObs = urlParams.get('obs') === '1' || urlParams.get('transparent') === '1';
    if (isObs) {
      document.body.classList.remove('preview-mode');
      const controls = document.getElementById('streamer-controls');
      if (controls) controls.style.display = 'none';
      if (this.audioGateEl) this.audioGateEl.style.display = 'none';
    }
  }

  initEventListeners() {
    const btnTourney = document.getElementById('btn-test-tourney');
    const btnBattle = document.getElementById('btn-test-battle');
    const btnCoins = document.getElementById('btn-test-coins');
    const btnAudio = document.getElementById('btn-test-audio');
    const btnToggleBg = document.getElementById('btn-toggle-bg');
    const btnUnlock = document.getElementById('btn-unlock-audio');

    if (btnTourney) {
      btnTourney.addEventListener('click', () => {
        this.triggerCelebration({
          type: 'tourney',
          icon: '🏆',
          category: 'TOURNAMENT CHAMPION',
          username: '@SlotKing21',
          slotName: 'Gates of Olympus 1000',
          slotImg: 'https://mediumrare.imgix.net/fdf333e96a5e21555bbb4e9e04a3ee4e1986c9cca9aa75141597041cc8334d23?w=360&auto=format',
          statValue: '250.00x',
          prize: 'PRIZE: 1ST: $150 USD'
        });
      });
    }

    if (btnBattle) {
      btnBattle.addEventListener('click', () => {
        this.triggerCelebration({
          type: 'battle',
          icon: '⚔️',
          category: 'Victory',
          username: '@AgusKick',
          slotName: 'San Quentin xWays',
          slotImg: 'https://mediumrare.imgix.net/ca243d6c3db42259d6859b80717eb378eb64e41a9d1b1f7fdeadde68d59d9ad5?w=360&auto=format',
          statValue: '84.20x',
          prize: 'PRIZE: $50.00 USD'
        });
      });
    }

    if (btnCoins) {
      btnCoins.addEventListener('click', () => {
        this.spawnCoinRain(80);
        this.playCoinClatter(24);
      });
    }

    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        this.playFullCelebrationAudio();
      });
    }

    if (btnToggleBg) {
      btnToggleBg.addEventListener('click', () => {
        document.body.classList.toggle('preview-mode');
      });
    }

    if (btnUnlock) {
      btnUnlock.addEventListener('click', () => {
        this.resumeAudioIfNeeded();
        this.triggerLiveDemo();
      });
    }
  }

  initBroadcastChannel() {
    try {
      this.channel = new BroadcastChannel('hunthub_celebration');
      this.channel.onmessage = (event) => {
        if (event && event.data) {
          this.triggerCelebration(event.data);
        }
      };
    } catch (e) {}

    window.addEventListener('storage', (e) => {
      if ((e.key === 'hunthub_celebration_trigger' || e.key === 'hunthub_celebration_event') && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          this.triggerCelebration(data);
        } catch (err) {}
      }
    });

    // Cross-Process OBS Browser Source WebSocket + /api/sync/state Sync (<50ms)
    this.initWebSocketSync();
  }

  initWebSocketSync() {
    const urlParams = new URLSearchParams(window.location.search);
    const port = urlParams.get('port') || '3001';
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
        } catch {}
      };
      this.ws.onclose = () => {
        setTimeout(() => this.initWebSocketSync(), 4000);
      };
    } catch {}
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.celebrationApp = new CelebrationOverlayApp();
});
