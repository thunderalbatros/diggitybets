/**
 * overlay-intro/audio-synth.js
 * =============================================================================
 * Procedural Web Audio Synthesizer for DiggityBets Casino Stream Intro
 * Zero external audio files — 100% synthesized in-memory haptics & fanfare.
 * =============================================================================
 */
(function(global) {
  'use strict';

  class IntroAudioSynth {
    constructor() {
      this.ctx = null;
      this.masterGain = null;
      this.muted = false;
      this.heartbeatTimer = null;
      this.bpm = 60;
      this.isPlaying = false;
    }

    init() {
      if (this.ctx) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    ensureContext() {
      if (!this.ctx) this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    setMuted(muted) {
      this.muted = Boolean(muted);
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.85, this.ctx.currentTime);
      }
    }

    playHeartbeatPulse() {
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;

      // Sub-bass thump (sine 55Hz to 38Hz)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(110, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.14);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.7, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.18);

      // Subtle second valve pulse (lub-dub)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(45, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(30, now + 0.22);

      gain2.gain.setValueAtTime(0.001, now + 0.12);
      gain2.gain.linearRampToValueAtTime(0.4, now + 0.14);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      osc2.connect(gain2);
      gain2.connect(this.masterGain);

      osc2.start(now + 0.12);
      osc2.stop(now + 0.25);
    }

    startHeartbeat(initialBpm = 60) {
      this.ensureContext();
      this.bpm = initialBpm;
      this.isPlaying = true;
      this.scheduleNextBeat();
    }

    scheduleNextBeat() {
      if (!this.isPlaying) return;
      this.playHeartbeatPulse();
      const intervalMs = (60 / this.bpm) * 1000;
      this.heartbeatTimer = setTimeout(() => this.scheduleNextBeat(), intervalMs);
    }

    setTempo(newBpm) {
      this.bpm = Math.max(40, Math.min(180, newBpm));
    }

    stopHeartbeat() {
      this.isPlaying = false;
      if (this.heartbeatTimer) {
        clearTimeout(this.heartbeatTimer);
        this.heartbeatTimer = null;
      }
    }

    triggerFanfare() {
      this.stopHeartbeat();
      if (!this.ctx || this.muted) return;
      const now = this.ctx.currentTime;

      // Royal Brass Chord Fanfare (Eb Major / Gold Casino Tone: Eb4, G4, Bb4, Eb5)
      const freqs = [311.13, 392.00, 466.16, 622.25];
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now + idx * 0.08);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, now);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.5);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.35, now + idx * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + 3.0);
      });

      // Coin Dispersion Shower Noise
      const bufferSize = this.ctx.sampleRate * 1.5;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.35));
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(3500, now + 0.3);
      noiseFilter.Q.setValueAtTime(3.0, now + 0.3);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now + 0.3);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      whiteNoise.start(now + 0.3);
    }
  }

  global.IntroAudioSynth = IntroAudioSynth;
})(typeof window !== 'undefined' ? window : this);
