/**
 * overlay-intro/main.js
 * =============================================================================
 * DiggityBets VIP Casino Stream Intro Controller & Cinematic 3D Canvas Engine
 * 1920x1080 @ 60 FPS, Zero Audio (Muted), Real Historical Leaderboard Sync,
 * Pending $20 & $40 Split Profit Vouchers Queue, Live Kick Pusher Ticker.
 * =============================================================================
 */

(function() {
  'use strict';

  // 1. Parse Query Parameters
  const urlParams = new URLSearchParams(window.location.search);
  let totalDuration = parseInt(urlParams.get('time') || '300', 10); // default 5 minutes (300s)
  if (isNaN(totalDuration) || totalDuration <= 0) totalDuration = 300;
  let remainingSeconds = totalDuration;
  let isTimerRunning = true;

  // 2. DOM Elements
  const digitsEl = document.getElementById('countdown-digits');
  const progressBarEl = document.getElementById('countdown-progress-bar');
  const statusNoteEl = document.getElementById('countdown-status-note');

  const splitsQueueBadge = document.getElementById('splits-queue-badge');
  const splitsListContainer = document.getElementById('splits-list-container');
  const introLeaderboardList = document.getElementById('intro-leaderboard-list');

  const spotlightImgEl = document.getElementById('spotlight-slot-img');
  const spotlightTitleEl = document.getElementById('spotlight-slot-title');
  const spotlightStudioEl = document.getElementById('spotlight-slot-studio');

  const tickerTrackEl = document.getElementById('ticker-track');

  // Helper escape
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // =========================================================================
  // 3. TIMER COUNTDOWN ENGINE (Zero Audio / Muted by User Request)
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
      digitsEl.style.textShadow = '0 0 45px rgba(255, 215, 0, 0.85), 0 0 90px rgba(255, 42, 95, 0.5)';
      if (statusNoteEl) statusNoteEl.textContent = '⚡ STREAM GOING LIVE IN A FEW SECONDS — GET READY!';
    } else if (remainingSeconds === 0) {
      digitsEl.textContent = 'LIVE NOW!';
      digitsEl.style.color = '#53fc18';
      digitsEl.style.textShadow = '0 0 55px rgba(83, 252, 24, 0.95)';
      if (statusNoteEl) statusNoteEl.textContent = '🎉 WELCOME TO DIGGITYBETS STREAM! WE ARE LIVE!';
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

  // =========================================================================
  // 4. LIVE WIDGETS DATA SYNC (Empty Slots by Default — Fills with Real Chat)
  // =========================================================================

  // Purge any legacy example/demo names from localStorage
  try {
    const rawSplits = localStorage.getItem('hunthub_pending_splits');
    if (rawSplits && (rawSplits.includes('LuckyRoller') || rawSplits.includes('DiggityVIP') || rawSplits.includes('CryptoChad'))) {
      localStorage.removeItem('hunthub_pending_splits');
    }
    const rawLb = localStorage.getItem('hunthub_historical_leaderboard');
    if (rawLb && (rawLb.includes('DiggityVIP') || rawLb.includes('LuckyRoller') || rawLb.includes('StakeHighRoller'))) {
      localStorage.removeItem('hunthub_historical_leaderboard');
    }
  } catch (_) {}

  // A. Pending Bonus Buy Splits Queue ($20 & $40 Vouchers)
  function syncPendingSplits() {
    if (!splitsListContainer) return;
    let splits = [];
    try {
      splits = JSON.parse(localStorage.getItem('hunthub_pending_splits') || '[]');
    } catch (_) {}

    // Clean any legacy mock users if present
    if (Array.isArray(splits)) {
      splits = splits.filter(s => {
        const u = (s.username || '').toLowerCase();
        return !u.includes('luckyroller') && !u.includes('diggityvip') && !u.includes('cryptochad');
      });
    } else {
      splits = [];
    }

    if (splitsQueueBadge) {
      splitsQueueBadge.textContent = `${splits.length} IN QUEUE`;
    }

    if (splits.length === 0) {
      // 3 clean empty slot placeholders waiting for real redemptions
      splitsListContainer.innerHTML = `
        <div class="split-queue-item empty-slot" style="opacity: 0.45; border-style: dashed; border-color: rgba(255,255,255,0.12);">
          <span class="split-badge-tag" style="background: rgba(255,255,255,0.05); color: #64748b; border: 1px dashed rgba(255,255,255,0.2);">SLOT #1</span>
          <div class="split-caller-col">
            <span class="split-caller-name" style="color: #64748b; font-weight: 500;">—</span>
            <span class="split-slot-title" style="color: #475569;">Esperando canje de voucher...</span>
          </div>
          <div class="split-status-col">
            <span class="split-profit-label" style="color: #64748b;">50/50</span>
            <span class="split-status-pill" style="color: #64748b; border-color: rgba(255,255,255,0.1);">VACÍO</span>
          </div>
        </div>
        <div class="split-queue-item empty-slot" style="opacity: 0.35; border-style: dashed; border-color: rgba(255,255,255,0.10);">
          <span class="split-badge-tag" style="background: rgba(255,255,255,0.05); color: #64748b; border: 1px dashed rgba(255,255,255,0.2);">SLOT #2</span>
          <div class="split-caller-col">
            <span class="split-caller-name" style="color: #64748b; font-weight: 500;">—</span>
            <span class="split-slot-title" style="color: #475569;">Esperando canje de voucher...</span>
          </div>
          <div class="split-status-col">
            <span class="split-profit-label" style="color: #64748b;">50/50</span>
            <span class="split-status-pill" style="color: #64748b; border-color: rgba(255,255,255,0.1);">VACÍO</span>
          </div>
        </div>
        <div class="split-queue-item empty-slot" style="opacity: 0.25; border-style: dashed; border-color: rgba(255,255,255,0.08);">
          <span class="split-badge-tag" style="background: rgba(255,255,255,0.05); color: #64748b; border: 1px dashed rgba(255,255,255,0.2);">SLOT #3</span>
          <div class="split-caller-col">
            <span class="split-caller-name" style="color: #64748b; font-weight: 500;">—</span>
            <span class="split-slot-title" style="color: #475569;">Esperando canje de voucher...</span>
          </div>
          <div class="split-status-col">
            <span class="split-profit-label" style="color: #64748b;">50/50</span>
            <span class="split-status-pill" style="color: #64748b; border-color: rgba(255,255,255,0.1);">VACÍO</span>
          </div>
        </div>
      `;
      return;
    }

    const itemsHtml = [];
    for (let i = 0; i < 3; i++) {
      const item = splits[i];
      if (item) {
        const is40 = item.amountUsd === 40 || (item.type && item.type.includes('40'));
        const badgeClass = is40 ? 'split-badge-40' : 'split-badge-20';
        const badgeText = is40 ? '👑 $40 SPLIT' : '💎 $20 SPLIT';
        itemsHtml.push(`
          <div class="split-queue-item">
            <span class="split-badge-tag ${badgeClass}">${badgeText}</span>
            <div class="split-caller-col">
              <span class="split-caller-name">${escapeHTML(item.username)}</span>
              <span class="split-slot-title">${escapeHTML(item.slot || 'Viewer Choice')}</span>
            </div>
            <div class="split-status-col">
              <span class="split-profit-label">50/50 PROFIT</span>
              <span class="split-status-pill">${escapeHTML(item.status || 'PENDING BUY')}</span>
            </div>
          </div>
        `);
      } else {
        itemsHtml.push(`
          <div class="split-queue-item empty-slot" style="opacity: 0.3; border-style: dashed;">
            <span class="split-badge-tag" style="background: rgba(255,255,255,0.05); color: #64748b;">SLOT #${i + 1}</span>
            <div class="split-caller-col">
              <span class="split-caller-name" style="color: #64748b; font-weight: 500;">—</span>
              <span class="split-slot-title" style="color: #475569;">Esperando canje...</span>
            </div>
            <div class="split-status-col">
              <span class="split-profit-label" style="color: #64748b;">50/50</span>
              <span class="split-status-pill" style="color: #64748b;">VACÍO</span>
            </div>
          </div>
        `);
      }
    }
    splitsListContainer.innerHTML = itemsHtml.join('');
  }
  syncPendingSplits();

  // B. Historical All-Time $DIG Leaderboard Sync (Empty slots until real chat activity)
  function syncHistoricalLeaderboard() {
    if (!introLeaderboardList) return;
    let leaders = [];
    try {
      leaders = JSON.parse(localStorage.getItem('hunthub_historical_leaderboard') || '[]');
    } catch (_) {}

    // Clean any legacy mock users if present
    if (Array.isArray(leaders)) {
      leaders = leaders.filter(u => {
        const name = (u.kickUser || u.username || '').toLowerCase();
        return !name.includes('diggityvip') && !name.includes('luckyroller') && !name.includes('stakehighroller');
      });
    } else {
      leaders = [];
    }

    const slotsHtml = [];
    for (let i = 0; i < 3; i++) {
      const rank = i + 1;
      const rankClass = rank === 1 ? 'lb-rank-1' : (rank === 2 ? 'lb-rank-2' : 'lb-rank-3');
      const u = leaders[i];

      if (u) {
        const points = Number(u.totalDig || u.points || 0);
        slotsHtml.push(`
          <div class="leaderboard-item">
            <div class="lb-user-info">
              <span class="lb-rank ${rankClass}">#${rank}</span>
              <span class="lb-name">${escapeHTML(u.kickUser || u.username)}</span>
            </div>
            <span class="lb-points">${points.toLocaleString()} $DIG</span>
          </div>
        `);
      } else {
        slotsHtml.push(`
          <div class="leaderboard-item empty-lb-slot" style="opacity: ${0.65 - i * 0.15};">
            <div class="lb-user-info">
              <span class="lb-rank ${rankClass}">#${rank}</span>
              <span class="lb-name" style="color: #64748b; font-weight: 500;">—</span>
            </div>
            <span class="lb-points" style="color: #64748b;">0 $DIG</span>
          </div>
        `);
      }
    }
    introLeaderboardList.innerHTML = slotsHtml.join('');
  }
  syncHistoricalLeaderboard();

  // Helper: Live Kick chat activity awards points & fills the leaderboard in real time!
  function awardChatterActivity(username, pts = 10) {
    if (!username) return;
    const cleanUser = username.startsWith('@') ? username : `@${username}`;
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem('hunthub_historical_leaderboard') || '[]');
    } catch (_) {}
    if (!Array.isArray(list)) list = [];

    // Filter legacy mock names
    list = list.filter(u => {
      const n = (u.kickUser || u.username || '').toLowerCase();
      return !n.includes('diggityvip') && !n.includes('luckyroller') && !n.includes('stakehighroller');
    });

    let found = list.find(u => (u.kickUser || u.username || '').toLowerCase() === cleanUser.toLowerCase());
    if (!found) {
      found = {
        rank: list.length + 1,
        kickUser: cleanUser,
        totalDig: pts,
        tourneysWon: 0,
        huntHits: 0,
        tier: 'SILVER',
        status: 'ACTIVE'
      };
      list.push(found);
    } else {
      found.totalDig = (Number(found.totalDig) || 0) + pts;
    }

    list.sort((a, b) => b.totalDig - a.totalDig);
    list.forEach((item, idx) => { item.rank = idx + 1; });

    try {
      localStorage.setItem('hunthub_historical_leaderboard', JSON.stringify(list));
    } catch (_) {}

    syncHistoricalLeaderboard();
  }

  // C. "Only on Stake" Spotlight Rotation
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

  // D. Live Kick Pusher Chat Ticker (Zero mock chatters — fills with real stream chat)
  const chatMessages = [];

  function renderTicker() {
    if (!tickerTrackEl) return;
    if (chatMessages.length === 0) {
      tickerTrackEl.innerHTML = `
        <div class="ticker-item">
          <span style="color: #64748b; font-style: italic;">Esperando mensajes en vivo de kick.com/diggitybets... ¡Comentá en el chat para aparecer aquí!</span>
        </div>
      `;
      return;
    }
    const itemsHtml = chatMessages.map(m => `
      <div class="ticker-item">
        <strong>@${escapeHTML(m.user)}</strong>: <span>${escapeHTML(m.text)}</span>
      </div>
    `).join('');
    tickerTrackEl.innerHTML = itemsHtml + itemsHtml;
  }
  renderTicker();

  // Try live Centrifugo connection to Kick channel diggitybets
  (async function connectLiveKickChat() {
    let chatroomId = 86765775;
    let realtimeConfig = null;

    try {
      const res = await fetch('/api/kick/stream-status');
      if (res.ok) {
        const data = await res.json();
        if (data?.chatroomId) chatroomId = Number(data.chatroomId);
        if (data?.realtime) realtimeConfig = data.realtime;
      }
    } catch (_) {}

    const token = realtimeConfig?.token;
    const wsUrl = realtimeConfig?.wsUrl || 'wss://realtime.us-west-2.platform.kick.com/connection/websocket';
    const channelName = realtimeConfig?.channel || `chatrooms.${chatroomId}.v2`;

    if (!token) {
      setTimeout(connectLiveKickChat, 5000);
      return;
    }

    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, connect: { token: token } }));
      };

      ws.onmessage = (msg) => {
        try {
          if (!msg.data) return;
          if (msg.data === '{}') {
            ws.send('{}');
            return;
          }
          const payload = JSON.parse(msg.data);
          if (payload.id === 1 && payload.connect) {
            ws.send(JSON.stringify({ id: 2, subscribe: { channel: channelName } }));
            return;
          }

          let pubData = null;
          if (payload.push?.pub?.data) pubData = payload.push.pub.data;
          else if (payload.pub?.data) pubData = payload.pub.data;
          else if (payload.event) pubData = payload;

          if (pubData && pubData.event === 'App\\Events\\ChatMessageEvent' && pubData.data) {
            const chatData = typeof pubData.data === 'string' ? JSON.parse(pubData.data) : pubData.data;
            const username = chatData.sender?.username || '';
            const content = String(chatData.content || '').trim();
            if (username && content && !content.startsWith('!')) {
              chatMessages.unshift({ user: username, text: content.slice(0, 60) });
              if (chatMessages.length > 20) chatMessages.pop();
              renderTicker();
              awardChatterActivity(username, 10);
            }
          }
        } catch (_) {}
      };

      ws.onclose = () => {
        setTimeout(connectLiveKickChat, 5000);
      };
    } catch (_) {
      setTimeout(connectLiveKickChat, 6000);
    }
  })();

  // BroadcastChannel & Storage Event Listeners
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
      } else if (data.type === 'splits_updated') {
        syncPendingSplits();
      } else if (data.type === 'leaderboard_updated') {
        syncHistoricalLeaderboard();
      }
    };
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'hunthub_pending_splits') {
      syncPendingSplits();
    } else if (e.key === 'hunthub_historical_leaderboard') {
      syncHistoricalLeaderboard();
    }
  });

  // =========================================================================
  // 5. CINEMATIC LUXURY 3D BACKGROUND ENGINE (60 FPS, <=3% CPU in OBS)
  // =========================================================================
  // Enhances background with:
  // 1. Dual Sweeping Volumetric Spotlight Rays (Emerald & Imperial Gold)
  // 2. Horizon 3D Perspective Digital Cyber Grid (Vanishing Line)
  // 3. Layered Depth-of-Field Bokeh & Twinkling Diamond Star Sparkles
  // 4. True 3D Rotating VIP Gold Coins with Specular Highlights & Beveled Edges
  // =========================================================================
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: false });
    canvas.width = 1920;
    canvas.height = 1080;

    // Plane 1: 14 Soft Distant Bokeh Spheres (Warm Gold & Emerald)
    const bokehSpheres = [];
    for (let i = 0; i < 14; i++) {
      bokehSpheres.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        radius: Math.random() * 28 + 22,
        baseAlpha: Math.random() * 0.05 + 0.025,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.2 - 0.08,
        pulseSpeed: Math.random() * 0.0015 + 0.0008,
        phase: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? '255, 215, 0' : '83, 252, 24'
      });
    }

    // Plane 2: 32 Diamond Star Sparkles (Twinkling 4-Point Glints)
    const diamondSparkles = [];
    for (let i = 0; i < 32; i++) {
      diamondSparkles.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        size: Math.random() * 6 + 3,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        twinkleSpeed: Math.random() * 0.003 + 0.0015,
        phase: Math.random() * Math.PI * 2,
        vy: -Math.random() * 0.35 - 0.1,
        color: Math.random() > 0.3 ? '#ffd700' : '#ffffff'
      });
    }

    // Plane 3: 50 Golden Micro-Embers
    const microEmbers = [];
    for (let i = 0; i < 50; i++) {
      microEmbers.push({
        x: Math.random() * 1920,
        y: Math.random() * 1080,
        radius: Math.random() * 1.6 + 0.7,
        alpha: Math.random() * 0.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.6 - 0.25,
        waveFreq: Math.random() * 0.02 + 0.01,
        waveAmp: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.4 ? '#ffd700' : '#53fc18'
      });
    }

    // 5 Cinematic 3D Floating VIP Gold Coins
    // Strategically positioned in safe margins (flanking center countdown and widgets)
    const coins3D = [
      { x: 190, y: 360, radius: 46, pitch: 0.3, yaw: 0.4, roll: 0.1, vyaw: 0.012, vpitch: 0.007, bobSpeed: 0.0011, bobAmp: 18, color: '#ffd700', edgeColor: '#b45309' },
      { x: 1730, y: 340, radius: 48, pitch: -0.4, yaw: -0.2, roll: -0.15, vyaw: -0.010, vpitch: 0.008, bobSpeed: 0.0013, bobAmp: 20, color: '#ffd700', edgeColor: '#ca8a04' },
      { x: 340, y: 780, radius: 38, pitch: 0.5, yaw: 0.8, roll: 0.2, vyaw: 0.014, vpitch: -0.006, bobSpeed: 0.0015, bobAmp: 14, color: '#53fc18', edgeColor: '#15803d' },
      { x: 1580, y: 800, radius: 42, pitch: -0.3, yaw: 0.6, roll: -0.2, vyaw: -0.011, vpitch: 0.009, bobSpeed: 0.0012, bobAmp: 16, color: '#ffd700', edgeColor: '#b45309' },
      { x: 1520, y: 140, radius: 32, pitch: 0.2, yaw: -0.5, roll: 0.1, vyaw: 0.016, vpitch: 0.005, bobSpeed: 0.0018, bobAmp: 12, color: '#00e5ff', edgeColor: '#0369a1' }
    ];

    // Draw 3D Coin with cylinder edge, bevel, emblem, and dynamic specular reflection
    function draw3DCoin(coin, now) {
      ctx.save();
      const bobY = Math.sin(now * coin.bobSpeed + coin.x) * coin.bobAmp;
      ctx.translate(coin.x, coin.y + bobY);

      // Soft ambient drop shadow
      ctx.beginPath();
      ctx.ellipse(0, coin.radius * 0.85, coin.radius * 0.9, coin.radius * 0.35, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fill();

      // Current angles
      coin.yaw += coin.vyaw;
      coin.pitch += coin.vpitch;

      const cosYaw = Math.cos(coin.yaw);
      const sinYaw = Math.sin(coin.yaw);
      const cosPitch = Math.cos(coin.pitch);
      const sinPitch = Math.sin(coin.pitch);

      // Apparent scales from 3D orientation
      const scaleX = cosYaw;
      const scaleY = cosPitch;
      const thickness = 10; // coin rim depth in px

      // Draw milled cylinder edge (depth extrusion slices)
      const edgeSteps = 6;
      for (let s = edgeSteps; s >= 1; s--) {
        const offset = (s / edgeSteps) * thickness * sinYaw;
        const offsetY = (s / edgeSteps) * thickness * sinPitch;
        ctx.beginPath();
        ctx.ellipse(offset, offsetY, coin.radius * Math.abs(scaleX), coin.radius * Math.abs(scaleY), coin.roll, 0, Math.PI * 2);
        ctx.fillStyle = coin.edgeColor;
        ctx.fill();
      }

      // Front Face
      ctx.beginPath();
      ctx.ellipse(0, 0, coin.radius * Math.abs(scaleX), coin.radius * Math.abs(scaleY), coin.roll, 0, Math.PI * 2);
      const goldFaceGrad = ctx.createLinearGradient(-coin.radius, -coin.radius, coin.radius, coin.radius);
      goldFaceGrad.addColorStop(0, '#fff7ad');
      goldFaceGrad.addColorStop(0.35, coin.color);
      goldFaceGrad.addColorStop(0.75, '#b45309');
      goldFaceGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = goldFaceGrad;
      ctx.fill();

      // Inner Bevel Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, coin.radius * 0.78 * Math.abs(scaleX), coin.radius * 0.78 * Math.abs(scaleY), coin.roll, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Core Dark Inset
      ctx.beginPath();
      ctx.ellipse(0, 0, coin.radius * 0.55 * Math.abs(scaleX), coin.radius * 0.55 * Math.abs(scaleY), coin.roll, 0, Math.PI * 2);
      ctx.fillStyle = '#06080d';
      ctx.fill();
      ctx.strokeStyle = coin.color;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Specular Light Gleam (sweeps when face angles toward virtual light vector)
      const lightDot = Math.max(0, cosYaw * 0.7 + sinPitch * 0.4);
      if (lightDot > 0.4) {
        ctx.beginPath();
        ctx.ellipse(0, 0, coin.radius * 0.75 * Math.abs(scaleX), coin.radius * 0.75 * Math.abs(scaleY), coin.roll, 0, Math.PI * 2);
        const specGrad = ctx.createLinearGradient(-coin.radius * 0.6, -coin.radius * 0.6, coin.radius * 0.6, coin.radius * 0.6);
        specGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        specGrad.addColorStop(0.5, `rgba(255, 255, 255, ${(lightDot - 0.4) * 1.5})`);
        specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = specGrad;
        ctx.fill();
      }

      ctx.restore();
    }

    // Draw 4-point Diamond Star Sparkle
    function drawDiamondStar(x, y, size, rotation, alpha, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = color;

      const longR = size * 1.8;
      const shortR = size * 0.45;

      ctx.beginPath();
      ctx.moveTo(0, -longR);
      ctx.lineTo(shortR, -shortR * 0.3);
      ctx.lineTo(longR, 0);
      ctx.lineTo(shortR, shortR * 0.3);
      ctx.lineTo(0, longR);
      ctx.lineTo(-shortR, shortR * 0.3);
      ctx.lineTo(-longR, 0);
      ctx.lineTo(-shortR, -shortR * 0.3);
      ctx.closePath();
      ctx.fill();

      // Center bright core
      ctx.beginPath();
      ctx.arc(0, 0, shortR * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    }

    // Main 60 FPS Render Loop
    function renderCinematicCanvas(now) {
      // 1. Deep Obsidian Base
      ctx.fillStyle = '#06080d';
      ctx.fillRect(0, 0, 1920, 1080);

      // 2. Dual Volumetric Sweeping Arena Spotlight Rays
      // Left Ray (Emerald Glow)
      const sweepAngleLeft = Math.sin(now * 0.00035) * 0.18 + 0.35;
      const spotGradLeft = ctx.createRadialGradient(0, 0, 80, 700 * Math.cos(sweepAngleLeft), 700 * Math.sin(sweepAngleLeft), 950);
      spotGradLeft.addColorStop(0, 'rgba(83, 252, 24, 0.09)');
      spotGradLeft.addColorStop(0.5, 'rgba(83, 252, 24, 0.025)');
      spotGradLeft.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spotGradLeft;
      ctx.fillRect(0, 0, 1920, 1080);

      // Right Ray (Imperial Gold & Cyan Glow)
      const sweepAngleRight = Math.cos(now * 0.0004) * 0.2 + 2.75;
      const spotGradRight = ctx.createRadialGradient(1920, 0, 80, 1920 + 700 * Math.cos(sweepAngleRight), 700 * Math.sin(sweepAngleRight), 950);
      spotGradRight.addColorStop(0, 'rgba(255, 215, 0, 0.08)');
      spotGradRight.addColorStop(0.5, 'rgba(0, 229, 255, 0.025)');
      spotGradRight.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spotGradRight;
      ctx.fillRect(0, 0, 1920, 1080);

      // 3. Horizon 3D Perspective Digital Cyber Grid
      const horizonY = 680;
      const vanishingX = 960;
      ctx.lineWidth = 1;

      // Perspective Rays spreading from horizon down
      const rayCount = 18;
      for (let r = 0; r <= rayCount; r++) {
        const bottomX = (r / rayCount) * 2200 - 140;
        ctx.beginPath();
        ctx.moveTo(vanishingX, horizonY);
        ctx.lineTo(bottomX, 1080);
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(0, 229, 255, 0.05)' : 'rgba(255, 215, 0, 0.035)';
        ctx.stroke();
      }

      // Smoothly scrolling horizontal floor grid lines
      const gridOffset = (now * 0.035) % 40;
      for (let yStep = 0; yStep < 10; yStep++) {
        const norm = (yStep * 40 + gridOffset) / 400; // 0 to 1
        const lineY = horizonY + Math.pow(norm, 2) * (1080 - horizonY);
        if (lineY > horizonY && lineY <= 1080) {
          const lineAlpha = Math.min(0.12, norm * 0.15);
          ctx.beginPath();
          ctx.moveTo(0, lineY);
          ctx.lineTo(1920, lineY);
          ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
          ctx.stroke();
        }
      }

      // 4. Plane 1: Distant Soft Bokeh Orbs
      for (let i = 0; i < bokehSpheres.length; i++) {
        const b = bokehSpheres[i];
        b.x += b.vx;
        b.y += b.vy;
        if (b.y < -b.radius * 2) b.y = 1080 + b.radius * 2;
        if (b.x < -b.radius * 2) b.x = 1920 + b.radius * 2;
        if (b.x > 1920 + b.radius * 2) b.x = -b.radius * 2;

        const pulse = Math.sin(now * b.pulseSpeed + b.phase);
        const currentAlpha = b.baseAlpha + pulse * 0.015;
        const currentRadius = b.radius + pulse * 4;

        const bGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, currentRadius);
        bGrad.addColorStop(0, `rgba(${b.color}, ${currentAlpha * 1.5})`);
        bGrad.addColorStop(0.6, `rgba(${b.color}, ${currentAlpha * 0.6})`);
        bGrad.addColorStop(1, `rgba(${b.color}, 0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = bGrad;
        ctx.fill();
      }

      // 5. Plane 2: Twinkling Diamond Star Sparkles
      for (let i = 0; i < diamondSparkles.length; i++) {
        const s = diamondSparkles[i];
        s.y += s.vy;
        s.rotation += s.rotSpeed;
        if (s.y < -20) s.y = 1100;

        const twinkle = Math.sin(now * s.twinkleSpeed + s.phase);
        const alpha = Math.max(0.1, twinkle * 0.45 + 0.45);
        drawDiamondStar(s.x, s.y, s.size, s.rotation, alpha, s.color);
      }

      // 6. Plane 3: Golden Micro-Embers
      ctx.globalAlpha = 1.0;
      for (let i = 0; i < microEmbers.length; i++) {
        const m = microEmbers[i];
        m.x += m.vx + Math.sin(now * m.waveFreq) * m.waveAmp * 0.15;
        m.y += m.vy;
        if (m.y < -10) m.y = 1090;
        if (m.x < -10) m.x = 1930;
        if (m.x > 1930) m.x = -10;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = m.color;
        ctx.globalAlpha = m.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // 7. 3D Floating VIP Gold Coins
      coins3D.forEach(coin => draw3DCoin(coin, now));

      requestAnimationFrame(renderCinematicCanvas);
    }

    requestAnimationFrame(renderCinematicCanvas);
  }

})();
