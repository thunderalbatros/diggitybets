/**
 * site/js/pro-fx-audio.js — SOTA Casino Audio Synthesis Engine (2026)
 * =============================================================================
 * Pure Web Audio API architecture inspired by Tone.js (MetalSynth, PolySynth, Brass)
 * and ZzFX (parametric micro-synthesis) with 0 external MP3 dependencies.
 *
 * Core Capabilities:
 *   1. playRoyalTrumpets(): Multi-voice brass fanfare with detuned saws, metallic
 *      filter bite, and spatial hall acoustic reverb.
 *   2. playConfettiBurst(): Low pneumatic cannon punch + paper fluttering in the air.
 *   3. playSkyCoinShower(): Inharmonic FM MetalSynth gold coin cascade with stereo panning
 *      and physical tray bounce.
 * =============================================================================
 */

class ProAudioFXEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.compressor = null;
    this.reverbNode = null;
    this.volume = 0.85;
    this.unlocked = false;
  }

  ensureContext() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      this.ctx = new AudioContextClass();

      // Master Dynamics Compressor (Broadcast limiter)
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(20, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(8, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.2, this.ctx.currentTime);

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      // Create procedural reverb impulse response (Luxury Casino Hall)
      this.reverbNode = this.ctx.createConvolver();
      const sampleRate = this.ctx.sampleRate;
      const length = Math.floor(sampleRate * 1.8);
      const impulse = this.ctx.createBuffer(2, length, sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = impulse.getChannelData(ch);
        for (let i = 0; i < length; i++) {
          const decay = Math.pow(1 - i / length, 2.5);
          data[i] = (Math.random() * 2 - 1) * decay;
        }
      }
      this.reverbNode.buffer = impulse;
      this.reverbNode.connect(this.masterGain);

      // Master chain: Sources -> MasterGain -> Compressor -> Destination
      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      this.unlocked = true;
      return this.ctx;
    } catch (_) {
      return null;
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  /**
   * 1. playRoyalTrumpets()
   * Polyphonic fanfare of brass trumpets:
   * Detuned dual-sawtooth voices + sharp brass lip-buzz filter envelope + grand hall reverb.
   */
  playRoyalTrumpets() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Triumphant fanfare motif (D Major / A): D4 -> F#4 -> A4 -> D5 (Held triumphant triad)
    const motif = [
      { time: 0.00, dur: 0.16, notes: [293.66, 587.33] },             // D4 + D5
      { time: 0.18, dur: 0.16, notes: [369.99, 739.99] },             // F#4 + F#5
      { time: 0.36, dur: 0.22, notes: [440.00, 880.00] },             // A4 + A5
      { time: 0.60, dur: 1.60, notes: [293.66, 369.99, 440.00, 587.33, 880.00] } // Royal Grand Triad
    ];

    motif.forEach(step => {
      step.notes.forEach((freq, voiceIdx) => {
        const startTime = now + step.time;
        const endTime = startTime + step.dur;

        // Brass synthesis: 2 slightly detuned sawtooth oscillators
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
        osc1.frequency.setValueAtTime(freq, startTime);
        osc2.frequency.setValueAtTime(freq, startTime);
        osc1.detune.setValueAtTime(-8 + (voiceIdx % 3) * 4, startTime);
        osc2.detune.setValueAtTime(9 - (voiceIdx % 2) * 5, startTime);

        // Metallic brass filter (Biquad lowpass with resonance peak)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.Q.setValueAtTime(4.5, startTime);
        // Brass envelope: sharp attack bite (opens to 3800Hz), settles to warm 1900Hz body
        filter.frequency.setValueAtTime(450, startTime);
        filter.frequency.exponentialRampToValueAtTime(3800, startTime + 0.04);
        filter.frequency.exponentialRampToValueAtTime(1900, startTime + 0.14);
        filter.frequency.exponentialRampToValueAtTime(300, endTime);

        // Voice amplitude envelope
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(0.18 / Math.sqrt(step.notes.length), startTime + 0.035);
        gain.gain.setValueAtTime(0.16 / Math.sqrt(step.notes.length), endTime - 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

        // Reverb send
        const revSend = ctx.createGain();
        revSend.gain.setValueAtTime(0.35, startTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        gain.connect(revSend);
        revSend.connect(this.reverbNode);

        osc1.onended = () => {
          try {
            osc1.disconnect();
            osc2.disconnect();
            filter.disconnect();
            gain.disconnect();
            revSend.disconnect();
          } catch (_) {}
        };

        osc1.start(startTime);
        osc2.start(startTime);
        osc1.stop(endTime);
        osc2.stop(endTime);
      });
    });
  }

  /**
   * 2. playConfettiBurst()
   * Pneumatic cannon punch (sub-bass drop) + paper air texture fluttering.
   */
  playConfettiBurst() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Sub-bass pneumatic cannon thump (150Hz -> 32Hz in 0.09s)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.12);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.45, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 0.20);

    // Paper flutter in the air: Cached filtered burst of white noise
    if (!this._confettiNoiseBuffer || this._confettiNoiseBuffer.sampleRate !== ctx.sampleRate) {
      const bufferSize = Math.floor(ctx.sampleRate * 0.45);
      this._confettiNoiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = this._confettiNoiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    }

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = this._confettiNoiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.Q.setValueAtTime(2.2, now);
    noiseFilter.frequency.setValueAtTime(1400, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(650, now + 0.4);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.28, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noiseSrc.start(now);
    noiseSrc.stop(now + 0.45);

    // ZzFX-style secondary pneumatic pop
    try {
      this.playZzfxMicro(0.3, 0.05, 240, 0.01, 0.06, 0.18, 3, 1.8, -8);
    } catch (_) {}
  }

  /**
   * 3. playSkyCoinShower()
   * Tone.js MetalSynth inharmonic FM cascade with dynamic stereo panning
   * simulating dozens of gold coins raining down and clinking into the tray.
   */
  playSkyCoinShower(duration = 2.8, coinCount = 30) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Inharmonic frequency ratios typical of physical metallic coin discs (Tone.js MetalSynth model)
    const inharmonicRatios = [1.0, 1.483, 1.932, 2.546, 2.630, 3.897];

    for (let i = 0; i < coinCount; i++) {
      // Stagger coins: sparse start, accelerating cascade, crescendo into victory
      const delay = Math.pow(i / coinCount, 1.35) * duration + (Math.random() * 0.06);
      const hitTime = now + delay;
      const baseFreq = 850 + Math.random() * 650; // Random coin pitch (high clinks vs deep gold)
      const panVal = (Math.random() * 1.6) - 0.8; // Dynamic stereo panning (-0.8 to +0.8)

      this.synthesizeSingleCoinClink(hitTime, baseFreq, panVal, inharmonicRatios);

      // 60% chance of immediate secondary bounce (coin settles on tray)
      if (Math.random() > 0.4) {
        const bounceDelay = hitTime + 0.035 + (Math.random() * 0.04);
        this.synthesizeSingleCoinClink(bounceDelay, baseFreq * 1.08, panVal + (Math.random() * 0.2 - 0.1), inharmonicRatios, 0.45);
      }
    }
  }

  synthesizeSingleCoinClink(time, baseFreq, panVal, ratios, volScale = 1.0) {
    const ctx = this.ctx;
    if (!ctx) return;

    // Carrier & modulator frequency cluster
    const clusterGain = ctx.createGain();
    const duration = 0.08 + Math.random() * 0.04;
    clusterGain.gain.setValueAtTime(0.0001, time);
    clusterGain.gain.linearRampToValueAtTime(0.09 * volScale, time + 0.002);
    clusterGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    // Bandpass resonator simulating the metal edge resonance
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(6.0, time);
    filter.frequency.setValueAtTime(baseFreq * 2.2, time);

    // Stereo Panner for dynamic 3D audio placement
    let panner = null;
    if (typeof ctx.createStereoPanner === 'function') {
      panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(Math.max(-1, Math.min(1, panVal)), time);
    }

    // 3 Inharmonic tone components per coin
    const safeRatios = Array.isArray(ratios) && ratios.length >= 3 ? ratios : [1.0, 1.483, 2.546];
    [safeRatios[0] || 1.0, safeRatios[1] || 1.483, safeRatios[2] || 2.546].forEach((ratio, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx === 0 ? 'sine' : (idx === 1 ? 'triangle' : 'sawtooth');
      const safeFreq = Number.isFinite(baseFreq * ratio) ? baseFreq * ratio : baseFreq;
      osc.frequency.setValueAtTime(safeFreq, time);
      osc.connect(clusterGain);
      osc.start(time);
      osc.stop(time + duration);
    });

    clusterGain.connect(filter);
    if (panner) {
      filter.connect(panner);
      panner.connect(this.masterGain);
    } else {
      filter.connect(this.masterGain);
    }
  }

  /**
   * ZzFX micro parametric sound generator
   */
  playZzfxMicro(vol, rnd, freq, att, sus, rel, shape, curve, slide) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = shape === 3 ? 'triangle' : (shape === 1 ? 'square' : 'sawtooth');
    const actualFreq = freq * (1 + (Math.random() * 2 - 1) * rnd);
    osc.frequency.setValueAtTime(actualFreq, now);
    if (slide) {
      osc.frequency.linearRampToValueAtTime(Math.max(20, actualFreq + slide * 80), now + att + sus + rel);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(vol * 0.25, now + att);
    gain.gain.setValueAtTime(vol * 0.25, now + att + sus);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + att + sus + rel);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + att + sus + rel + 0.05);
  }

  /**
   * Clean mechanical roulette wheel tick
   */
  playReelTick(pitchRatio = 1.0) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(740 * pitchRatio, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.025);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  /**
   * SOTA 2026 Tactile Web Audio Haptics (Apple Taptic / Reflect.app inspired)
   * 1. playTactileClick(): Micro-tap haptic for buttons, tabs, and toggles
   */
  playTactileClick(frequency = 1650) {
    if (window.soundEngine && typeof window.soundEngine.playTactileClick === 'function') {
      window.soundEngine.playTactileClick(frequency);
      return;
    }
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    if (this._lastClickAt && (now - this._lastClickAt) < 0.025) return;
    this._lastClickAt = now;

    // Transient snap
    const bufferSize = Math.floor(ctx.sampleRate * 0.015);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(frequency + (Math.random() * 60 - 30), now);
    bp.Q.setValueAtTime(3.4, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.10 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    src.connect(bp);
    bp.connect(gain);
    gain.connect(this.masterGain);
    src.start(now);
    src.stop(now + 0.014);

    // Micro-body sine
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(270, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.009);
    oscGain.gain.setValueAtTime(0.04 * this.volume, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.010);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.012);
  }

  /**
   * SOTA 2026 Silk Glass & Air Transition (Navigation & Section Switching)
   */
  playNavTab() {
    if (window.soundEngine && typeof window.soundEngine.playNavTab === 'function') {
      window.soundEngine.playNavTab();
      return;
    }
  }

  /**
   * 2. playChipDrop(): Tactile chip click on bet increment/placement
   */
  playChipDrop() {
    if (window.soundEngine && typeof window.soundEngine.playChip === 'function') {
      window.soundEngine.playChip();
      return;
    }
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const pitchVar = 1 + (Math.random() * 0.05 - 0.025);
    [1350 * pitchVar, 2480 * pitchVar].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      const decay = idx === 0 ? 0.035 : 0.022;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime((idx === 0 ? 0.08 : 0.04) * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + decay + 0.005);
    });
  }

  /**
   * 3. playWinArpeggio(): Pentatonic ascending chime for multipliers & wins
   */
  playWinArpeggio() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const time = now + idx * 0.035;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.09, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(time);
      osc.stop(time + 0.13);
    });
  }

  /**
   * 4. playFoilCrinkle(intensity = 0.5)
   * Physical Mylar/metallic foil wrapper crinkle micro-transients when tilting or dragging the sealed pack.
   */
  playFoilCrinkle(intensity = 0.5) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    if (this._lastCrinkleAt && (now - this._lastCrinkleAt) < 0.065) return;
    this._lastCrinkleAt = now;

    if (!this._crinkleBuffer || this._crinkleBuffer.sampleRate !== ctx.sampleRate) {
      const len = Math.floor(ctx.sampleRate * 0.045);
      this._crinkleBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = this._crinkleBuffer.getChannelData(0);
      for (let i = 0; i < len; i++) {
        // Sparse crackle impulses typical of metallic foil flex
        const env = Math.sin((i / len) * Math.PI);
        data[i] = (Math.random() > 0.65 ? (Math.random() * 2 - 1) : 0) * env;
      }
    }

    const src = ctx.createBufferSource();
    src.buffer = this._crinkleBuffer;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(3600 + Math.random() * 2800, now);
    bp.Q.setValueAtTime(4.8, now);

    const gain = ctx.createGain();
    const peak = Math.min(0.11, Math.max(0.02, intensity * 0.08));
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);

    src.connect(bp);
    bp.connect(gain);
    gain.connect(this.masterGain);
    src.start(now);
    src.stop(now + 0.045);
  }

  /**
   * 5. playBoosterLaserTear()
   * Stage 1 (0ms - 360ms): Stereo-panned (-0.75 -> +0.75) serrated metallic crimp tear
   * with 32Hz sawtooth teeth modulation + ZzFX plasma spark transients.
   */
  playBoosterLaserTear() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 0.36;

    const len = Math.floor(ctx.sampleRate * dur);
    const tearBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const out = tearBuf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / len;
      // 32Hz serrated crimp teeth modulation + high-frequency metallic noise
      const teethMod = 0.55 + 0.45 * Math.sin(t * Math.PI * 2 * 26);
      const env = Math.pow(Math.sin(t * Math.PI), 0.65);
      out[i] = (Math.random() * 2 - 1) * teethMod * env;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = tearBuf;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(1150, now);
    bp.frequency.exponentialRampToValueAtTime(6800, now + dur);
    bp.Q.setValueAtTime(3.4, now);

    // High-pitched laser slice harmonic whistle
    const laserOsc = ctx.createOscillator();
    laserOsc.type = 'sawtooth';
    laserOsc.frequency.setValueAtTime(680, now);
    laserOsc.frequency.exponentialRampToValueAtTime(2950, now + dur);

    const laserGain = ctx.createGain();
    laserGain.gain.setValueAtTime(0.001, now);
    laserGain.gain.linearRampToValueAtTime(0.065, now + 0.04);
    laserGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    const tearGain = ctx.createGain();
    tearGain.gain.setValueAtTime(0.001, now);
    tearGain.gain.linearRampToValueAtTime(0.26, now + 0.035);
    tearGain.gain.setValueAtTime(0.24, now + dur - 0.06);
    tearGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    let panner = null;
    if (typeof ctx.createStereoPanner === 'function') {
      panner = ctx.createStereoPanner();
      panner.pan.setValueAtTime(-0.75, now);
      panner.pan.linearRampToValueAtTime(0.75, now + dur);
    }

    noise.connect(bp);
    bp.connect(tearGain);
    laserOsc.connect(laserGain);

    if (panner) {
      tearGain.connect(panner);
      laserGain.connect(panner);
      panner.connect(this.masterGain);
    } else {
      tearGain.connect(this.masterGain);
      laserGain.connect(this.masterGain);
    }

    noise.start(now);
    noise.stop(now + dur);
    laserOsc.start(now);
    laserOsc.stop(now + dur);
  }

  /**
   * 6. playBoosterCoreRiser()
   * Stage 2 (360ms - 740ms): Pressurized vacuum seal sub-bass pop + dual-oscillator harmonic tension riser.
   */
  playBoosterCoreRiser() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Vacuum seal pop (155Hz -> 36Hz)
    const popOsc = ctx.createOscillator();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(155, now);
    popOsc.frequency.exponentialRampToValueAtTime(36, now + 0.13);

    const popGain = ctx.createGain();
    popGain.gain.setValueAtTime(0.34, now);
    popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    popOsc.connect(popGain);
    popGain.connect(this.masterGain);
    popOsc.start(now);
    popOsc.stop(now + 0.17);

    // 2. Dual-voice harmonic suspense riser (220Hz -> 880Hz)
    [1, 1.498].forEach((ratio, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx === 0 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(220 * ratio, now);
      osc.frequency.exponentialRampToValueAtTime(880 * ratio, now + 0.38);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.setValueAtTime(5.0, now);
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(4800, now + 0.38);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(idx === 0 ? 0.14 : 0.08, now + 0.28);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.40);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      if (this.reverbNode) {
        const rev = ctx.createGain();
        rev.gain.setValueAtTime(0.25, now);
        gain.connect(rev);
        rev.connect(this.reverbNode);
      }
      osc.start(now);
      osc.stop(now + 0.41);
    });
  }

  /**
   * 7. playBoosterCardWhooshFlip()
   * Stage 3 (740ms - 1080ms): Aerodynamic 3D card spin whoosh + crisp card lock snap.
   */
  playBoosterCardWhooshFlip() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 0.28;

    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / len) * Math.PI);
    }

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(2.6, now);
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(2100, now + dur * 0.55);
    filter.frequency.exponentialRampToValueAtTime(380, now + dur);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.24, now + dur * 0.45);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    src.start(now);
    src.stop(now + dur);

    // Crisp mechanical card lock snap at end of flip
    this.synthesizeSingleCoinClink(now + 0.22, 1320, 0, [1.0, 1.483, 2.546], 0.85);
  }

  /**
   * 8. playBoosterRarityReveal(rarityTier = 'radiant-prism')
   * Stage 4 (1080ms+): Tier-adaptive musical & crystalline reveal payoff!
   * - 'mythic-gold': Full Royal Brass & FM Crystal Bell Choir + Sub-Bass Impact + Gold Coin Cascade
   * - 'radiant-prism': Shimmering Major-9th Crystal Arpeggio + Holographic Foil Glint
   * - 'cosmos-holo': Pentatonic Starlight Chime + Coin Shimmer
   */
  playBoosterRarityReveal(rarityTier = 'radiant-prism') {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Sub-bass impact drop on card lock-in
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(110, now);
    sub.frequency.exponentialRampToValueAtTime(32, now + 0.38);
    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(rarityTier === 'mythic-gold' ? 0.48 : 0.30, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);
    sub.connect(subGain);
    subGain.connect(this.masterGain);
    sub.start(now);
    sub.stop(now + 0.44);

    // 2. Crystalline Holographic Bell Arpeggio (D Major 9th / Lydian Sparkle)
    const chordNotes = rarityTier === 'mythic-gold'
      ? [587.33, 739.99, 880.00, 1108.73, 1174.66, 1479.98, 1760.00, 2349.32] // D5..D7 Mythic Choir
      : (rarityTier === 'radiant-prism'
          ? [523.25, 659.25, 783.99, 987.77, 1174.66, 1567.98] // C5 Major 9th Prism
          : [523.25, 659.25, 783.99, 1046.50, 1318.51]); // C5 Pentatonic Cosmos

    chordNotes.forEach((freq, idx) => {
      const start = now + idx * 0.042;
      const dur = 0.65 + (idx * 0.06);

      // FM-like Bell Pair: Sine fundamental + Triangle 2nd/3rd harmonic
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, start);
      osc2.frequency.setValueAtTime(freq * 2.0, start);
      osc2.detune.setValueAtTime(6, start);

      const gain = ctx.createGain();
      const peak = (rarityTier === 'mythic-gold' ? 0.14 : 0.11) / Math.sqrt(chordNotes.length * 0.5);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(peak, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

      const revSend = ctx.createGain();
      revSend.gain.setValueAtTime(0.42, start);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);
      if (this.reverbNode) {
        gain.connect(revSend);
        revSend.connect(this.reverbNode);
      }

      osc1.start(start);
      osc2.start(start);
      osc1.stop(start + dur + 0.02);
      osc2.stop(start + dur + 0.02);
    });

    // 3. Extra payoff for Mythic Gold Secret Rare
    if (rarityTier === 'mythic-gold') {
      this.playSkyCoinShower(1.8, 18);
    } else {
      // Subtle metallic foil shimmer clinks
      this.synthesizeSingleCoinClink(now + 0.08, 1480, -0.45, [1.0, 1.483, 2.546], 0.6);
      this.synthesizeSingleCoinClink(now + 0.16, 1760, 0.45, [1.0, 1.483, 2.546], 0.65);
    }
  }
}

// Global Singleton Instance & Universal Attachment
const ProAudioFX = new ProAudioFXEngine();

if (typeof window !== 'undefined') {
  window.ProAudioFX = ProAudioFX;
  window.proAudioFX = ProAudioFX;
  window.ProAudioFXEngine = ProAudioFXEngine;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ProAudioFX, ProAudioFXEngine };
}

