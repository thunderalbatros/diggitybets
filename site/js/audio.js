/**
 * HuntHub — Web Audio Procedural Synthesizer
 * 100% Client-side, zero external MP3 assets required, 0ms latency.
 */
class HuntHubAudio {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('hunthub_muted') === 'true';
    this.volume = parseFloat(localStorage.getItem('hunthub_volume') || '0.7');
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
    localStorage.setItem('hunthub_muted', muted ? 'true' : 'false');
  }

  toggleMute() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  // Soft poker chip sound (dual high frequencies with micro-decay)
  playChip() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(2400, t);
    osc1.frequency.exponentialRampToValueAtTime(1200, t + 0.04);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1600, t);
    osc2.frequency.exponentialRampToValueAtTime(600, t + 0.03);

    gain.gain.setValueAtTime(0.25 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.05);
    osc2.stop(t + 0.05);
  }

  // Card slide / deal sound (filtered white noise burst)
  playCard() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3 * this.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Tick sound (pegs in plinko or roulette pointer)
  playTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.025);

    gain.gain.setValueAtTime(0.18 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.025);
  }

  // Win celebratory chime (Major arpeggio: C5, E5, G5, C6)
  playWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    const t = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = t + idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.22 * this.volume, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.35);
    });
  }

  // Bust / Loss tone (descending short dual frequency)
  playBust() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(190, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.22);

    gain.gain.setValueAtTime(0.15 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.22);
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

      gain.gain.setValueAtTime(0.12 * this.volume, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.06);
    }
  }

  // Stake Gem reveal: High crystal chime (F6, A6, C7)
  playGem() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1396.91, t); // F6
    osc.frequency.exponentialRampToValueAtTime(2093.00, t + 0.08); // C7

    gain.gain.setValueAtTime(0.28 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.22);
  }

  // Alias for diamond sound
  playDiamond() {
    this.playGem();
  }

  // Limbo Rocket count sound
  playLimbo() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.15);
    gain.gain.setValueAtTime(0.2 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  // Stake Bomb reveal: Deep explosive sub-boom with noise
  playBomb() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(25, t + 0.35);

    gain.gain.setValueAtTime(0.4 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.4);
  }

  // Stake Dice roll: Quick energetic sweep
  playDiceRoll() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.06);

    gain.gain.setValueAtTime(0.2 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
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
    gain.connect(this.ctx.destination);

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
      gain.connect(this.ctx.destination);

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
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + (isWin ? 0.22 : 0.12));
  }

  // European Roulette: Smooth friction noise of ball rolling along outer wooden rim track
  playRouletteTrack(duration = 3.5) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // High quality pink/white noise for physical track glide
        data[i] = (Math.random() * 2 - 1) * 0.14;
      }

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
      gain.connect(this.ctx.destination);

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
    gain.connect(this.ctx.destination);

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
    gain1.connect(this.ctx.destination);
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
    gain2.connect(this.ctx.destination);
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
    gain3.connect(this.ctx.destination);
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
    masterGain.connect(this.ctx.destination);

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
      subGain.connect(this.ctx.destination);
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
    gain.connect(this.ctx.destination);

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
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.055);
  }

  /**
   * Subtle Haptic Click for Buttons & Predictions
   */
  playVoteClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800, t);
    osc.frequency.exponentialRampToValueAtTime(500, t + 0.012);

    gain.gain.setValueAtTime(0.14 * this.volume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.018);
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
      gain.connect(this.ctx.destination);

      osc1.start(noteStart);
      osc2.start(noteStart);
      osc1.stop(noteEnd + 0.06);
      osc2.stop(noteEnd + 0.06);
    });
  }

  playVictoriousTrumpetFanfare() {
    return this.playVictoryFanfare();
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

