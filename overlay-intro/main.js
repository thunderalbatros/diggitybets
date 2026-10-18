/**
 * overlay-intro/main.js
 * =============================================================================
 * DiggityBets VIP Casino Stream Intro Controller & Canvas Physics
 * 1920x1080 @ 60 FPS, Web Audio Heartbeat, Live Kick Pusher Ticker, BroadcastChannel
 * =============================================================================
 */

(function() {
  'use strict';

  // 1. Audio Synth Instance
  const audioSynth = new window.IntroAudioSynth();

  // 2. Parse Query Parameters
  const urlParams = new URLSearchParams(window.location.search);
  let totalDuration = parseInt(urlParams.get('time') || '300', 10); // default 5 minutes (300s)
  if (isNaN(totalDuration) || totalDuration <= 0) totalDuration = 300;
  let remainingSeconds = totalDuration;
  let isTimerRunning = true;
  let isMuted = urlParams.get('muted') === '1' || urlParams.get('mute') === '1';

  if (isMuted) audioSynth.setMuted(true);

  // 3. Elements
  const digitsEl = document.getElementById('countdown-digits');
  const progressBarEl = document.getElementById('countdown-progress-bar');
  const statusNoteEl = document.getElementById('countdown-status-note');
  const audioToggleBtn = document.getElementById('btn-audio-toggle');

  const kothNameEl = document.getElementById('koth-king-name');
  const kothStreakEl = document.getElementById('koth-streak-badge');
  const kothPrizeEl = document.getElementById('koth-prize-val');

  const spotlightImgEl = document.getElementById('spotlight-slot-img');
  const spotlightTitleEl = document.getElementById('spotlight-slot-title');
  const spotlightStudioEl = document.getElementById('spotlight-slot-studio');

  const tickerTrackEl = document.getElementById('ticker-track');

  // =========================================================================
  // 4. TIMER COUNTDOWN ENGINE
  // =========================================================================
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updateTimerUI() {
    if (!digitsEl) return;
    digitsEl.textContent = formatTime(remainingSeconds);

    const progressPct = Math.max(0, Math.min(100, (remainingSeconds / totalDuration) * 100));
    if (progressBarEl) progressBarEl.style.width = `${progressPct}%`;

    if (remainingSeconds <= 10 && remainingSeconds > 0) {
      digitsEl.style.color = '#ffd700';
      digitsEl.style.textShadow = '0 0 45px rgba(255, 215, 0, 0.8), 0 0 90px rgba(255, 42, 95, 0.5)';
      if (statusNoteEl) statusNoteEl.textContent = '⚡ STREAM GOING LIVE IN A FEW SECONDS — GET READY!';
      audioSynth.setTempo(120);
    } else if (remainingSeconds === 0) {
      digitsEl.textContent = 'LIVE NOW!';
      digitsEl.style.color = '#53fc18';
      digitsEl.style.textShadow = '0 0 50px rgba(83, 252, 24, 0.9)';
      if (statusNoteEl) statusNoteEl.textContent = '🎉 WELCOME TO DIGGITYBETS STREAM! WE ARE LIVE!';
      audioSynth.triggerFanfare();
    }
  }

  const timerInterval = setInterval(() => {
    if (!isTimerRunning) return;
    if (remainingSeconds > 0) {
      remainingSeconds--;
      updateTimerUI();
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);

  updateTimerUI();

  // Audio start on first user interaction or broadcast
  const startAudioOnGesture = () => {
    audioSynth.startHeartbeat(60);
    window.removeEventListener('click', startAudioOnGesture);
  };
  window.addEventListener('click', startAudioOnGesture);

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isMuted = !isMuted;
      audioSynth.setMuted(isMuted);
      audioToggleBtn.textContent = isMuted ? '🔇 Audio Muted' : '🔊 Audio Active';
      if (!isMuted && !audioSynth.isPlaying) {
        audioSynth.startHeartbeat(remainingSeconds <= 10 ? 120 : 60);
      }
    });
  }

  // =========================================================================
  // 5. LIVE WIDGETS DATA SYNC
  // =========================================================================

  // A. King of the Hill Widget
  function syncKothData() {
    try {
      const saved = JSON.parse(localStorage.getItem('hunthub_koth_state') || 'null');
      if (saved && saved.reigningKing) {
        if (kothNameEl) kothNameEl.textContent = `@${saved.reigningKing}`;
        if (kothStreakEl) kothStreakEl.textContent = `STREAK ${saved.currentStreak || 1}/4`;
        if (kothPrizeEl) kothPrizeEl.textContent = saved.currentStreak >= 4 ? '$20 USD WON' : '$20 USD PRIZE';
        return;
      }
    } catch (_) {}

    // Fallback demo king
    if (kothNameEl) kothNameEl.textContent = '@IronKing';
    if (kothStreakEl) kothStreakEl.textContent = 'STREAK 3/4';
    if (kothPrizeEl) kothPrizeEl.textContent = '$20 USD PRIZE';
  }
  syncKothData();

  // B. "Only on Stake" Spotlight Rotation
  const EXCLUSIVE_SLOTS = [
    {
      name: 'Reactorgames Haunted Hollow',
      studio: 'Reactor Games · Stake Exclusive',
      image: 'https://mediumrare.imgix.net/a2d2071ee81ac02ad2aee13ef7efc6a52dc90bc49e324e3eaace6b6a46faffbb?w=360&auto=format'
    },
    {
      name: 'Harmonica Jackpot Frenzy',
      studio: 'Harmonica · Stake Exclusive',
      image: 'https://mediumrare.imgix.net/d3d7a80374a171f6a7abdf0678aceafa05b462d469b3d9f4ec2a9489b51849f3?w=360&auto=format'
    },
    {
      name: 'Afterhours Spank Bank',
      studio: 'Afterhours Studios · Stake Exclusive',
      image: 'https://mediumrare.imgix.net/a500cc2af66f0e0eb430c6cc93cfb90b03b9ba73bf55aa35e1308735a8c8c40e?w=360&auto=format'
    },
    {
      name: 'Quickstrike Late Checkout',
      studio: 'Quickstrike · Stake Exclusive',
      image: 'https://mediumrare.imgix.net/3cda26803042e5c738e41544126b2e24d4c791c68d44acd989f5b8855b3d6836?w=360&auto=format'
    },
    {
      name: 'Tinexgames Void Dominion',
      studio: 'Tinex Games · Stake Exclusive',
      image: 'https://mediumrare.imgix.net/70fd0e65fe40a5fa18e31104fd02a35e4069a6dd984f1698530597c5041731e3?w=360&auto=format'
    }
  ];

  let currentSpotlightIdx = 0;
  function updateSpotlight() {
    const slot = EXCLUSIVE_SLOTS[currentSpotlightIdx % EXCLUSIVE_SLOTS.length];
    currentSpotlightIdx++;

    if (spotlightImgEl) {
      spotlightImgEl.style.opacity = '0';
      setTimeout(() => {
        spotlightImgEl.src = slot.image;
        if (spotlightTitleEl) spotlightTitleEl.textContent = slot.name;
        if (spotlightStudioEl) spotlightStudioEl.textContent = slot.studio;
        spotlightImgEl.style.opacity = '1';
      }, 300);
    }
  }
  updateSpotlight();
  setInterval(updateSpotlight, 6000);

  // C. Live Kick Pusher Chat Ticker
  const chatMessages = [
    { user: 'diggity_fan', text: 'Ready for the Bonus Hunt! 🎰' },
    { user: 'stake_sniper', text: 'Code DIGGITY for VIP status 🔥' },
    { user: 'lucky_roller', text: 'Who is taking down the King of the Hill today?' },
    { user: 'crypto_chad', text: 'Let’s hit 10,000x on Wanted!' },
    { user: 'spins_queen', text: 'Good luck everyone in the 8-bracket!' }
  ];

  function renderTicker() {
    if (!tickerTrackEl) return;
    const itemsHtml = chatMessages.map(m => `
      <div class="ticker-item">
        <strong>@${m.user}</strong>: <span>${m.text}</span>
      </div>
    `).join('');
    // Duplicate track for seamless infinite marquee loop
    tickerTrackEl.innerHTML = itemsHtml + itemsHtml;
  }
  renderTicker();

  // Try live Pusher connection to Kick channel diggitybets
  try {
    const PUSHER_KEY = '34bf7a0ff419a2a775b9';
    const KICK_CHANNEL_ID = 'diggitybets';
    const ws = new WebSocket(`wss://ws-us2.pusher.com/app/${PUSHER_KEY}?protocol=7&client=js&version=8.4.0-rc2&flash=false`);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        event: 'pusher:subscribe',
        data: { channel: `chatrooms.${KICK_CHANNEL_ID}.v2` }
      }));
    };

    ws.onmessage = (msg) => {
      try {
        const payload = JSON.parse(msg.data);
        if (payload.event === 'App\\Events\\ChatMessageEvent') {
          const chatData = JSON.parse(payload.data);
          const username = chatData.sender?.username || 'Viewer';
          const content = chatData.content || '';
          if (content && !content.startsWith('!')) {
            chatMessages.unshift({ user: username, text: content.slice(0, 60) });
            if (chatMessages.length > 20) chatMessages.pop();
            renderTicker();
          }
        }
      } catch (_) {}
    };
  } catch (_) {}

  // BroadcastChannel Integration
  if (typeof BroadcastChannel !== 'undefined') {
    const bus = new BroadcastChannel('hunthub_bus');
    bus.onmessage = (evt) => {
      const data = evt.data;
      if (!data) return;
      if (data.type === 'intro_set_time' && typeof data.seconds === 'number') {
        totalDuration = data.seconds;
        remainingSeconds = data.seconds;
        updateTimerUI();
      } else if (data.type === 'intro_pause') {
        isTimerRunning = false;
      } else if (data.type === 'intro_start') {
        isTimerRunning = true;
      } else if (data.type === 'intro_reset') {
        remainingSeconds = totalDuration;
        updateTimerUI();
      } else if (data.type === 'koth_update') {
        syncKothData();
      }
    };
  }

  // =========================================================================
  // 6. HIGH PERFORMANCE CANVAS BACKGROUND (60 FPS)
  // =========================================================================
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;

    // 80 Ambient floating gold dust particles
    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.6 + 0.15,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.15,
        color: Math.random() > 0.4 ? '#ffd700' : '#53fc18'
      });
    }

    // 6 Floating 3D Poker Chips with sinusoidal drift
    const chips = [
      { x: 220, y: 350, r: 42, color: '#53fc18', border: '#22c55e', angle: 0.2, speed: 0.008, scaleY: 0.65 },
      { x: 1720, y: 320, r: 46, color: '#ffd700', border: '#eab308', angle: -0.3, speed: 0.006, scaleY: 0.6 },
      { x: 380, y: 720, r: 36, color: '#ffd700', border: '#ca8a04', angle: 0.4, speed: 0.007, scaleY: 0.7 },
      { x: 1560, y: 760, r: 40, color: '#53fc18', border: '#16a34a', angle: -0.2, speed: 0.009, scaleY: 0.65 },
      { x: 150, y: 880, r: 32, color: '#00e5ff', border: '#0284c7', angle: 0.5, speed: 0.006, scaleY: 0.6 },
      { x: 1780, y: 860, r: 34, color: '#ff2a5f', border: '#dc2626', angle: -0.4, speed: 0.008, scaleY: 0.65 }
    ];

    function drawChip(c, t) {
      ctx.save();
      const wobbleY = Math.sin(t * c.speed + c.x) * 14;
      const wobbleRot = Math.sin(t * c.speed * 0.5) * 0.12;

      ctx.translate(c.x, c.y + wobbleY);
      ctx.rotate(c.angle + wobbleRot);
      ctx.scale(1, c.scaleY);

      // Shadow
      ctx.beginPath();
      ctx.arc(0, 16, c.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fill();

      // Outer Edge
      ctx.beginPath();
      ctx.arc(0, 0, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.border;
      ctx.fill();

      // Inner Body
      ctx.beginPath();
      ctx.arc(0, 0, c.r * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();

      // Center Spindle
      ctx.beginPath();
      ctx.arc(0, 0, c.r * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = '#06080d';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = c.border;
      ctx.stroke();

      ctx.restore();
    }

    let lastFrameTime = performance.now();
    function renderCanvas(now) {
      ctx.clearRect(0, 0, 1920, 1080);

      // Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) p.y = 1090;
        if (p.x < -10) p.x = 1930;
        if (p.x > 1930) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // 3D Chips
      chips.forEach(c => drawChip(c, now));

      requestAnimationFrame(renderCanvas);
    }

    requestAnimationFrame(renderCanvas);
  }

})();
