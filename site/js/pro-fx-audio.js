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
        this.reverbNode.connect(this.masterGain);

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

    // Paper flutter in the air: Filtered burst of white noise with fluttering tremolo
    const bufferSize = Math.floor(ctx.sampleRate * 0.45);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;

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
    [ratios[0], ratios[1], ratios[3]].forEach((ratio, idx) => {
      const osc = ctx.createOscillator();
      osc.type = idx === 0 ? 'sine' : (idx === 1 ? 'triangle' : 'sawtooth');
      osc.frequency.setValueAtTime(baseFreq * ratio, time);
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
}

// Global Singleton Instance & Universal Attachment
const ProAudioFX = new ProAudioFXEngine();

if (typeof window !== 'undefined') {
  window.ProAudioFX = ProAudioFX;
  window.ProAudioFXEngine = ProAudioFXEngine;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ProAudioFX, ProAudioFXEngine };
}
