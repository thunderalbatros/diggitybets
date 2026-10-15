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

  playFanfare() {
    if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
    try {
      const now = this.audioCtx.currentTime;
      const notes = [587.33, 739.99, 880.00, 1174.66, 1479.98, 1760.00, 2349.32]; // D Major high fanfare

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const t = now + (idx * 0.07);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(t);
        osc.stop(t + 0.4);
      });
    } catch (e) {}
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
      slotImg = 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format';
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
      slotImg: 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format',
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
          slotImg: 'https://mediumrare.imgix.net/1ea93a0279a9ebc0e3a6288899532b27dbfc60a0f4a8e2cb924c5539ebf85eb3?w=180&h=236&fit=min&auto=format',
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
          slotImg: 'https://fan-cdn.nolimitcity.com/trans_eba4744bd0.png',
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
      if (e.key === 'hunthub_celebration_trigger' && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          this.triggerCelebration(data);
        } catch (err) {}
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.celebrationApp = new CelebrationOverlayApp();
});
