/**
 * HuntHub — Web Audio Procedural Synthesizer
 * 100% Client-side, zero external MP3 assets required, 0ms latency.
 */
class HuntHubAudio {
  constructor() {
    this.ctx = null;
    this.masterLimiter = null;
    this.masterGain = null;
    this.reverbNode = null;
    this.reverbGain = null;
    this._noiseBufferCache = new Map();
    this.muted = localStorage.getItem('hunthub_muted') === 'true';
    this.volume = parseFloat(localStorage.getItem('hunthub_volume') || '0.7');
    this._pegNotes = [587.33, 659.25, 783.99, 880.00, 987.77, 1046.50];
    this._pegIdx = 0;
    this._lastClickAt = 0;
    this._lastNavAt = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        const t = this.ctx.currentTime;
        this.masterLimiter = this.ctx.createDynamicsCompressor();
        this.masterLimiter.threshold.setValueAtTime(-14, t);
        this.masterLimiter.knee.setValueAtTime(18, t);
        this.masterLimiter.ratio.setValueAtTime(8, t);
        this.masterLimiter.attack.setValueAtTime(0.002, t);
        this.masterLimiter.release.setValueAtTime(0.15, t);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, t);

        // Algorithmic Luxury Hall Reverb Node (Smooth impulse response)
        try {
          this.reverbNode = this.ctx.createConvolver();
          const sampleRate = this.ctx.sampleRate;
          const length = Math.floor(sampleRate * 1.5);
          const impulse = this.ctx.createBuffer(2, length, sampleRate);
          for (let ch = 0; ch < 2; ch++) {
            const data = impulse.getChannelData(ch);
            for (let i = 0; i < length; i++) {
              const decay = Math.pow(1 - i / length, 2.8);
              data[i] = (Math.random() * 2 - 1) * decay;
            }
          }
          this.reverbNode.buffer = impulse;
          this.reverbGain = this.ctx.createGain();
          this.reverbGain.gain.setValueAtTime(0.28, t);
          this.reverbNode.connect(this.reverbGain);
          this.reverbGain.connect(this.masterLimiter);
        } catch (_) {}

        this.masterLimiter.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  getOutputBus() {
    if (!this.ctx) return null;
    return this.masterLimiter || this.ctx.destination;
  }

  getReverbBus() {
    if (!this.ctx) return null;
    return this.reverbNode || this.getOutputBus();
  }

  connectWithPan(source, dest, panValue = 0) {
    const target = dest || this.getOutputBus();
    if (!this.ctx || !target) return;
    if (panValue && typeof this.ctx.createStereoPanner === 'function') {
      const panner = this.ctx.createStereoPanner();
      panner.pan.setValueAtTime(Math.max(-1, Math.min(1, panValue)), this.ctx.currentTime);
      source.connect(panner);
      panner.connect(target);
    } else {
      source.connect(target);
    }
  }

  getNoiseBuffer(duration = 0.08) {
    if (!this.ctx) return null;
    const key = `${this.ctx.sampleRate}_${duration.toFixed(3)}`;
    if (this._noiseBufferCache.has(key)) {
      return this._noiseBufferCache.get(key);
    }
    const bufferSize = Math.max(1, Math.floor(this.ctx.sampleRate * duration));
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    this._noiseBufferCache.set(key, buffer);
    return buffer;
  }

  setMuted(muted) {
    this.muted = muted;
    localStorage.setItem('hunthub_muted', muted ? 'true' : 'false');
  }

  toggleMute() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  /**
   * SOTA 2026 Tactile UI Micro-Click (Apple Taptic / Reflect.app inspired)
   * Ultra-crisp, dampened transient snap + subtle micro-body.
   * Completely eliminates low muddy thuds and high piercing squeaks.
   */
  playTactileClick(frequency = 1650) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    if (this._lastClickAt && (now - this._lastClickAt) < 0.025) return;
    this._lastClickAt = now;

    const out = this.getOutputBus();
    const vol = this.volume;

    // 1. Transient snap (Bandpass filtered noise)
    const noiseBuf = this.getNoiseBuffer(0.015);
    if (noiseBuf) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuf;

      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      const jitter = (Math.random() * 80 - 40);
      bp.frequency.setValueAtTime(Math.max(800, frequency + jitter), now);
      bp.Q.setValueAtTime(3.4, now);

      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(0.12 * vol, now);
      nGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

      noise.connect(bp);
      bp.connect(nGain);
      nGain.connect(out);

      noise.start(now);
      noise.stop(now + 0.014);
    }

    // 2. Micro-body impact (Fast sine drop without muddy sub-bass)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280 + Math.random() * 30, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.009);

    oscGain.gain.setValueAtTime(0.045 * vol, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.010);

    osc.connect(oscGain);
    oscGain.connect(out);

    osc.start(now);
    osc.stop(now + 0.012);
  }

  playUIClick() {
    this.playTactileClick();
  }

  /**
   * SOTA 2026 Silk Glass & Air Transition (Sidebar & Section Switcher)
   * Airy breeze + celestial twin glass chimes with spatial hall reverb.
   * Gives users a premium, non-intrusive feedback when navigating sections.
   */
  playNavTab() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    if (this._lastNavAt && (now - this._lastNavAt) < 0.04) return;
    this._lastNavAt = now;

    const out = this.getOutputBus();
    const rev = this.getReverbBus();
    const vol = this.volume;

    // 1. Soft air sweep transient
    const noiseBuf = this.getNoiseBuffer(0.035);
    if (noiseBuf) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuf;

      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(2200, now);
      bp.frequency.exponentialRampToValueAtTime(950, now + 0.035);
      bp.Q.setValueAtTime(2.2, now);

      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(0.035 * vol, now);
      nGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      noise.connect(bp);
      bp.connect(nGain);
      nGain.connect(out);

      noise.start(now);
      noise.stop(now + 0.038);
    }

    // 2. Harmonic twin glass chimes (F#5: 739.99 Hz & C#6: 1108.73 Hz)
    const tones = [
      { freq: 739.99, gain: 0.055, dur: 0.050 },
      { freq: 1108.73, gain: 0.038, dur: 0.065 }
    ];

    tones.forEach(t => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(t.freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(t.gain * vol, now + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t.dur);

      osc.connect(gain);
      gain.connect(out);

      // Send subtle shimmer to reverb
      if (rev && rev !== out) {
        const revSend = this.ctx.createGain();
        revSend.gain.setValueAtTime(0.20, now);
        gain.connect(revSend);
        revSend.connect(rev);
      }

      osc.start(now);
      osc.stop(now + t.dur + 0.01);
    });
  }

  /**
   * SOTA 2026 Ceramic Casino Chip Clack (High-End 14g Clay / Ceramic Composite)
   * Simulates physical contact transient + dual inharmonic ceramic ringing + felt cushion.
   * Completely replaces the piercing 2400Hz triangle beep.
   */
  playChip() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.getOutputBus();
    const vol = this.volume;

    // Organic micro-pitch variation (+-2.5%) for stacking feel
    const pitchVar = 1 + (Math.random() * 0.05 - 0.025);

    // 1. Sharp Ceramic Impact Transient (Filtered noise click)
    const noiseBuf = this.getNoiseBuffer(0.02);
    if (noiseBuf) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuf;

      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(3200 * pitchVar, now);
      bp.Q.setValueAtTime(2.2, now);

      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(0.12 * vol, now);
      nGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

      noise.connect(bp);
      bp.connect(nGain);
      nGain.connect(out);

      noise.start(now);
      noise.stop(now + 0.018);
    }

    // 2. Dual Modal Inharmonic Ceramic Ringing (1350Hz & 2480Hz)
    const ceramicModes = [
      { freq: 1350 * pitchVar, gain: 0.090, decay: 0.036 },
      { freq: 2480 * pitchVar, gain: 0.045, decay: 0.022 }
    ];

    ceramicModes.forEach(m => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(m.freq, now);

      gain.gain.setValueAtTime(m.gain * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + m.decay);

      osc.connect(gain);
      gain.connect(out);

      osc.start(now);
      osc.stop(now + m.decay + 0.005);
    });

    // 3. Felt Table Acoustic Cushion Body (Warmth at 420Hz)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(420 * pitchVar, now);
    subOsc.frequency.exponentialRampToValueAtTime(180, now + 0.015);

    subGain.gain.setValueAtTime(0.048 * vol, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

    subOsc.connect(subGain);
    subGain.connect(out);

    subOsc.start(now);
    subOsc.stop(now + 0.018);
  }

  playChipDrop() {
    this.playChip();
  }

  /**
   * SOTA 2026 Crisp Card Slide / Deal on Felt
   */
  playCard() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.getOutputBus();
    const vol = this.volume;

    const buffer = this.getNoiseBuffer(0.06);
    if (!buffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(750, now + 0.055);
    filter.Q.setValueAtTime(2.4, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.14 * vol, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(out);

    noise.start(now);
    noise.stop(now + 0.06);
  }

  /**
   * SOTA 2026 Acoustic Wood & Acrylic Marimba Pegs (Plinko & Pointer Ticks)
   * Cycles through warm pentatonic harmonies with physical wooden tap transients.
   * Completely eliminates repetitive, irritating 950Hz sine beeps.
   */
  playTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.getOutputBus();
    const vol = this.volume;

    if (!this._pegNotes) {
      this._pegNotes = [587.33, 659.25, 783.99, 880.00, 987.77, 1046.50]; // D5, E5, G5, A5, B5, C6
      this._pegIdx = 0;
    }

    const freq = this._pegNotes[(this._pegIdx++) % this._pegNotes.length] * (1 + (Math.random() * 0.03 - 0.015));

    // 1. Resonant Wooden Tone (Sine with micro attack)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.085 * vol, now + 0.0015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

    osc.connect(gain);
    gain.connect(out);

    osc.start(now);
    osc.stop(now + 0.022);

    // 2. High-Frequency Wood Tap Transient
    const noiseBuf = this.getNoiseBuffer(0.01);
    if (noiseBuf) {
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuf;

      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(2100, now);
      bp.Q.setValueAtTime(3.8, now);

      const nGain = this.ctx.createGain();
      nGain.gain.setValueAtTime(0.05 * vol, now);
      nGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.009);

      noise.connect(bp);
      bp.connect(nGain);
      nGain.connect(out);

      noise.start(now);
      noise.stop(now + 0.01);
    }
  }

  playPeg() {
    this.playTick();
  }

  /**
   * SOTA 2026 Sparkling Major Pentatonic Arpeggio (Win Celebration)
   * Harmonic crystal chime cascade through the luxury hall reverb.
   */
  playWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.getOutputBus();
    const rev = this.getReverbBus();
    const vol = this.volume;

    const notes = [523.25, 659.25, 783.99, 987.77, 1046.50]; // C5, E5, G5, B5, C6

    notes.forEach((freq, idx) => {
      const noteTime = now + idx * 0.035;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.0001, noteTime);
      gain.gain.linearRampToValueAtTime(0.12 * vol, noteTime + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.22);

      osc.connect(gain);
      gain.connect(out);

      if (rev && rev !== out) {
        const revSend = this.ctx.createGain();
        revSend.gain.setValueAtTime(0.35, noteTime);
        gain.connect(revSend);
        revSend.connect(rev);
      }

      osc.start(noteTime);
      osc.stop(noteTime + 0.24);
    });
  }

  playWinArpeggio() {
    this.playWin();
  }

  /**
   * SOTA 2026 Velvet Muted Minor Descent (Unlucky Round / Bust)
   * Warm lowpass-filtered minor second dissonance with smooth damping.
   * Completely replaces harsh, offensive sawtooth buzzers.
   */
  playBust() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.getOutputBus();
    const vol = this.volume;

    // Lowpass filter removes any harsh bite, leaving a warm velvet tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, now);
    filter.Q.setValueAtTime(1.8, now);

    // Minor second dissonance: A3 (220Hz) and G#3 (207.65Hz)
    const tones = [
      { startFreq: 220.00, endFreq: 175.00 },
      { startFreq: 207.65, endFreq: 164.00 }
    ];

    const masterBustGain = this.ctx.createGain();
    masterBustGain.gain.setValueAtTime(0.095 * vol, now);
    masterBustGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    filter.connect(masterBustGain);
    masterBustGain.connect(out);

    tones.forEach(t => {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(t.startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(t.endFreq, now + 0.18);

      osc.connect(filter);
      osc.start(now);
      osc.stop(now + 0.19);
    });
  }

  // Cascading coins sound (rapid sequence of metallic high pings)
  playCoins() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    for (let i = 0; i < 8; i++) {
      const noteTime = t + i * 0.045;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const freq = 1800 + Math.random() * 800;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, noteTime + 0.06);

      gain.gain.setValueAtTime(0.10 * this.volume, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.06);

      osc.connect(gain);
      this.connectWithPan(gain, this.getOutputBus(), (i % 2 === 0 ? -0.35 : 0.35));

      osc.start(noteTime);
      osc.stop(noteTime + 0.06);
    }
  }

  /**
   * SOTA 2026 Celestial Crystal Shimmer (Mines Gem Reveal)
   * High pure crystal bells with spatial reverb tail.
   */
  playGem() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.getOutputBus();
    const rev = this.getReverbBus();
    const vol = this.volume;

    const freqs = [1479.98, 2217.46, 2959.96]; // F#6, C#7, F#7

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.015);

      const noteTime = now + idx * 0.015;
      gain.gain.setValueAtTime(0.0001, noteTime);
      gain.gain.linearRampToValueAtTime((0.10 / (idx + 1)) * vol, noteTime + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.18);

      osc.connect(gain);
      gain.connect(out);

      if (rev && rev !== out) {
        const revSend = this.ctx.createGain();
        revSend.gain.setValueAtTime(0.40, noteTime);
        gain.connect(revSend);
        revSend.connect(rev);
      }

      osc.start(noteTime);
      osc.stop(noteTime + 0.20);
    });
  }

  // Alias for diamond sound
  playDiamond() {
    this.playGem();
  }

  /**
   * SOTA 2026 Limbo Rocket Riser
   */
  playLimbo() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.getOutputBus();
    const vol = this.volume;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.12);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.12);

    gain.gain.setValueAtTime(0.09 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(out);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  /**
   * SOTA 2026 Stake Bomb Reveal: Cinematic Sub-Bass Impact
   */
  playBomb() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.getOutputBus();
    const vol = this.volume;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(28, now + 0.32);

    gain.gain.setValueAtTime(0.35 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(out);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  /**
   * SOTA 2026 Wooden Casino Dice Tumble on Felt (3 Micro-Bounces)
   */
  playDiceRoll() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const out = this.getOutputBus();
    const vol = this.volume;

    const impacts = [
      { time: 0.000, freq: 1100, pan: -0.25, gain: 0.11 },
      { time: 0.032, freq: 1450, pan:  0.25, gain: 0.08 },
      { time: 0.060, freq:  920, pan: -0.10, gain: 0.06 }
    ];

    impacts.forEach(imp => {
      const t = now + imp.time;

      const noiseBuf = this.getNoiseBuffer(0.018);
      if (noiseBuf) {
        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuf;

        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(imp.freq, t);
        bp.Q.setValueAtTime(2.8, t);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(imp.gain * vol, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.016);

        noise.connect(bp);
        bp.connect(gain);
        this.connectWithPan(gain, out, imp.pan);

        noise.start(t);
        noise.stop(t + 0.018);
      }

      // Felt sub thump
      const sub = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(140, t);
      sub.frequency.exponentialRampToValueAtTime(60, t + 0.015);

      subGain.gain.setValueAtTime(0.05 * vol, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);

      sub.connect(subGain);
      subGain.connect(out);

      sub.start(t);
      sub.stop(t + 0.016);
    });
  }

  // Plinko Common / Low Multiplier bucket landing (< 2x): soft acoustic acrylic/wood "plop"
  playPlinkoCommon() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, t);
    osc.frequency.exponentialRampToValueAtTime(210, t + 0.05);

    gain.gain.setValueAtTime(0.20 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

    osc.connect(gain);
    gain.connect(this.getOutputBus());

    osc.start(t);
    osc.stop(t + 0.055);
  }

  // Plinko Medium Multiplier bucket landing (2x - 9.9x): crisp bright chime
  playPlinkoMedium() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [659.25, 880.00]; // E5, A5
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = t + idx * 0.04;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.22 * this.volume, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.14);

      osc.connect(gain);
      gain.connect(this.getOutputBus());

      osc.start(noteTime);
      osc.stop(noteTime + 0.14);
    });
  }

  // Instant punch slam for Stake Original Limbo
  playLimboSlam(isWin = false) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (isWin) {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, t); // D5
      osc.frequency.exponentialRampToValueAtTime(1174.66, t + 0.08); // D6
      gain.gain.setValueAtTime(0.30 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.09);
      gain.gain.setValueAtTime(0.25 * this.volume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    }

    osc.connect(gain);
    gain.connect(this.getOutputBus());

    osc.start(t);
    osc.stop(t + (isWin ? 0.22 : 0.12));
  }

  // European Roulette: Smooth friction noise of ball rolling along outer wooden rim track
  playRouletteTrack(duration = 3.5) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const buffer = this.getNoiseBuffer(duration);
      if (!buffer) return;

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(420, this.ctx.currentTime + duration);
      filter.Q.setValueAtTime(4.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.24 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.getOutputBus());

      noise.start();
    } catch (_) {}
  }

  // European Roulette: Crisp acoustic tick when ball deflects over brass/wood frets
  playRouletteFret() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1450, t);
    osc.frequency.exponentialRampToValueAtTime(420, t + 0.018);

    gain.gain.setValueAtTime(0.20 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

    osc.connect(gain);
    gain.connect(this.getOutputBus());

    osc.start(t);
    osc.stop(t + 0.02);
  }

  // European Roulette: Authentic wooden pocket impact & settle bounce (Double-clack)
  playRouletteDrop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Strike 1: Primary solid ivory-on-mahogany drop
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(760, t);
    osc1.frequency.exponentialRampToValueAtTime(170, t + 0.055);
    gain1.gain.setValueAtTime(0.40 * this.volume, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    osc1.connect(gain1);
    gain1.connect(this.getOutputBus());
    osc1.start(t);
    osc1.stop(t + 0.06);

    // Strike 2: Secondary micro-bounce inside the pocket
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    const t2 = t + 0.052;
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(510, t2);
    osc2.frequency.exponentialRampToValueAtTime(130, t2 + 0.045);
    gain2.gain.setValueAtTime(0.26 * this.volume, t2);
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.05);
    osc2.connect(gain2);
    gain2.connect(this.getOutputBus());
    osc2.start(t2);
    osc2.stop(t2 + 0.05);

    // Strike 3: Final settling micro-click
    const osc3 = this.ctx.createOscillator();
    const gain3 = this.ctx.createGain();
    const t3 = t + 0.105;
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(310, t3);
    osc3.frequency.exponentialRampToValueAtTime(110, t3 + 0.035);
    gain3.gain.setValueAtTime(0.16 * this.volume, t3);
    gain3.gain.exponentialRampToValueAtTime(0.001, t3 + 0.04);
    osc3.connect(gain3);
    gain3.connect(this.getOutputBus());
    osc3.start(t3);
    osc3.stop(t3 + 0.04);
  }

  /**
   * Procedural Brass / Trumpet Note Synthesizer
   * Emulates acoustic lip-buzz & brass resonance using:
   * - Dual detuned sawtooth waves (+-7 cents) + sub-triangle warm body
   * - Fast-opening resonant lowpass formant filter (mouthpiece attack bite)
   * - Delayed natural vibrato LFO (5.3 Hz)
   */
  playBrassNote(freq, startTime, duration, volume = 0.35, isStaccato = false) {
    if (this.muted || !this.ctx) return;
    const t = startTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(volume * this.volume, t);

    // 1. Resonant Formant Filter (Acoustic Bell & Lip Buzz)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.setValueAtTime(3.6, t);

    // Dynamic Filter Envelope (Brass bite / blat on onset)
    const minCutoff = Math.max(320, freq * 1.2);
    const peakCutoff = Math.min(6800, freq * 5.4);
    const sustainCutoff = Math.min(4200, freq * 3.2);

    filter.frequency.setValueAtTime(minCutoff, t);
    filter.frequency.exponentialRampToValueAtTime(peakCutoff, t + 0.042);
    filter.frequency.exponentialRampToValueAtTime(sustainCutoff, t + (isStaccato ? 0.09 : 0.22));

    // 2. Dual Sawtooth Oscillators (Detuned Brass Pair)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(freq, t);
    osc2.frequency.setValueAtTime(freq, t);
    osc1.detune.setValueAtTime(-7, t);
    osc2.detune.setValueAtTime(7, t);

    // 3. Warm Sub-Body (Triangle)
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 0.5, t);
    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.24, t);
    subOsc.connect(subGain);
    subGain.connect(filter);

    // 4. Delayed Vibrato LFO for sustained notes (natural human embouchure)
    if (!isStaccato && duration > 0.25) {
      try {
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(5.3, t);

        // Fade vibrato in after 160ms of note attack
        lfoGain.gain.setValueAtTime(0, t);
        lfoGain.gain.setValueAtTime(0, t + 0.16);
        lfoGain.gain.linearRampToValueAtTime(freq * 0.022, t + 0.38);

        lfo.connect(osc1.frequency);
        lfo.connect(osc2.frequency);
        lfo.start(t + 0.16);
        lfo.stop(t + duration + 0.1);
      } catch (_) {}
    }

    // 5. Amplitude Envelope (ADSR)
    const noteGain = this.ctx.createGain();
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

    // Graph Routing
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(masterGain);
    masterGain.connect(this.getOutputBus());

    // Transport Start & Stop
    const stopTime = t + duration + releaseTime + 0.05;
    osc1.start(t);
    osc2.start(t);
    subOsc.start(t);
    osc1.stop(stopTime);
    osc2.stop(stopTime);
    subOsc.stop(stopTime);
  }

  /**
   * Victorious Trumpet Fanfare (Grand Casino / Tournament Champion Fanfare)
   * Key of D Major, Royal brass motif with climax 5-horn triumphant harmony.
   * Zero external audio files required — 100% procedural Web Audio synthesis.
   */
  playVictoriousTrumpetFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Motif Timeline (Royal Entrance in D Major)
    // Notes: A4 (0.11s) -> A4 (0.11s) -> A4 (0.11s) -> D5 (0.36s) -> A4 (0.12s) -> D5 (0.18s) -> F#5 (0.22s) -> Grand Climax
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
      this.playBrassNote(n.freq, t + n.time, n.dur, n.vol, n.staccato);
    });

    // Grand Triumph Climax (Multi-Horn Chord at T + 1.42s)
    const climaxTime = t + 1.42;
    const chord = [
      { freq: 293.66, dur: 1.25, vol: 0.34 }, // D4 (Trombone / Low Brass Foundation)
      { freq: 440.00, dur: 1.30, vol: 0.36 }, // A4 (French Horn 5th)
      { freq: 587.33, dur: 1.35, vol: 0.40 }, // D5 (Trumpet 2 Tonic)
      { freq: 739.99, dur: 1.40, vol: 0.44 }, // F#5 (Trumpet 1 Major 3rd)
      { freq: 880.00, dur: 1.45, vol: 0.48 }, // A5 (Lead Trumpet High Octave 5th)
    ];

    chord.forEach(c => {
      this.playBrassNote(c.freq, climaxTime, c.dur, c.vol, false);
    });

    // Accompanying Sub-Bass Impact at Climax
    try {
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(95, climaxTime);
      subOsc.frequency.exponentialRampToValueAtTime(32, climaxTime + 0.65);
      subGain.gain.setValueAtTime(0.48 * this.volume, climaxTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, climaxTime + 0.70);
      subOsc.connect(subGain);
      subGain.connect(this.getOutputBus());
      subOsc.start(climaxTime);
      subOsc.stop(climaxTime + 0.75);
    } catch (_) {}
  }

  /**
   * Grand Jackpot: Victorious Trumpet Fanfare + Cascading Coin Rain
   */
  playJackpot() {
    this.playVictoriousTrumpetFanfare();
    if (typeof this.playCoins === 'function') {
      setTimeout(() => this.playCoins(), 1400);
      setTimeout(() => this.playCoins(), 1800);
    }
  }

  /**
   * Crisp Wheel / Dial Tick
   */
  playWheelTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1450, t);
    osc.frequency.exponentialRampToValueAtTime(380, t + 0.018);

    gain.gain.setValueAtTime(0.24 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.022);

    osc.connect(gain);
    gain.connect(this.getOutputBus());

    osc.start(t);
    osc.stop(t + 0.024);
  }

  /**
   * Countdown Heartbeat / Tension Tick
   */
  playCountdownTick(isFinal = false) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = isFinal ? 'square' : 'sine';
    const freq = isFinal ? 1240 : 880;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, t + 0.04);

    gain.gain.setValueAtTime((isFinal ? 0.32 : 0.18) * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.getOutputBus());

    osc.start(t);
    osc.stop(t + 0.055);
  }

  /**
   * Subtle Haptic Click for Buttons & Predictions
   */
  playVoteClick() {
    this.playTactileClick(1750);
  }

  /**
   * Victorious Trumpet Fanfare (Synthesized Web Audio Brass)
   * Plays a majestic C-major brass fanfare (C4 -> E4 -> G4 -> C5) with resonant harmonics.
   */
  playVictoryFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [
      { f: 261.63, start: 0.00, dur: 0.13 }, // C4
      { f: 329.63, start: 0.13, dur: 0.13 }, // E4
      { f: 392.00, start: 0.26, dur: 0.15 }, // G4
      { f: 523.25, start: 0.41, dur: 0.65 }  // High C5 finale
    ];

    notes.forEach((n) => {
      const noteStart = t + n.start;
      const noteEnd = noteStart + n.dur;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const biquad = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(n.f, noteStart);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(n.f * 1.004, noteStart);

      biquad.type = 'lowpass';
      biquad.frequency.setValueAtTime(1400, noteStart);
      biquad.frequency.exponentialRampToValueAtTime(3800, noteStart + 0.03);
      biquad.frequency.exponentialRampToValueAtTime(1800, noteEnd);

      gain.gain.setValueAtTime(0.001, noteStart);
      gain.gain.linearRampToValueAtTime(0.35 * this.volume, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.24 * this.volume, noteStart + 0.08);
      gain.gain.setValueAtTime(0.24 * this.volume, noteEnd - 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, noteEnd + 0.05);

      osc1.connect(biquad);
      osc2.connect(biquad);
      biquad.connect(gain);
      gain.connect(this.getOutputBus());

      osc1.start(noteStart);
      osc2.start(noteStart);
      osc1.stop(noteEnd + 0.06);
      osc2.stop(noteEnd + 0.06);
    });
  }
}

window.soundEngine = new HuntHubAudio();
window.AudioEngine = window.soundEngine;

// Ensure audio context resumes upon first user gesture
if (typeof document !== 'undefined') {
  const unlockAudio = () => {
    if (window.soundEngine) {
      window.soundEngine.init();
    }
  };
  ['click', 'keydown', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, unlockAudio, { once: true, passive: true });
  });
}

