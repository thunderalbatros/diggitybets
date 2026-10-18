/**
 * DiggityBets — Dedicated Slot Requests (!sr) OBS Overlay Controller
 * Renders the live !sr Roulette Wheel with @username + Slot Name on every slice,
 * and reveals the Winner Showcase (Viewer Avatar + @Username + Official 180x236 Slot Card).
 */
(function () {
  'use strict';

  const STORAGE_KEY_QUEUE = 'hunthub_slot_requests';
  const STORAGE_KEY_SPIN = 'hunthub_sr_spin_cmd';
  const CHANNEL_NAME = 'hunthub_sr_wheel';

  const SLICE_PALETTE = [
    '#00e5ff',
    '#9272ff',
    '#10b981',
    '#f59e0b',
    '#ff2a5f',
    '#3b82f6',
    '#ec4899',
    '#eab308'
  ];

  let requests = [];
  let wheelRotation = 0;
  let isSpinning = false;
  let lastHandledSpinTs = 0;
  let winnerHideTimer = null;
  let wheelBufferCanvas = null;
  let wheelBufferDirty = true;
  const slotImageCache = new Map();
  const avatarCache = new Map();

  const canvas = document.getElementById('sr-overlay-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const countPill = document.getElementById('sr-overlay-count-pill');
  const showcaseEl = document.getElementById('sr-winner-showcase');
  const winnerAvatarEl = document.getElementById('sr-winner-avatar');
  const winnerUserEl = document.getElementById('sr-winner-username');
  const winnerSlotImgEl = document.getElementById('sr-winner-slot-img');
  const winnerProviderEl = document.getElementById('sr-winner-provider');
  const winnerSlotTitleEl = document.getElementById('sr-winner-slot-title');

  // --- Deterministic Avatar Generator (Fallback if Kick user has no custom PFP) ---
  function getDeterministicAvatar(username) {
    const clean = String(username || 'Viewer').trim().replace(/^@/, '') || 'Viewer';
    if (typeof window.getDeterministicAvatarDataUri === 'function') {
      return window.getDeterministicAvatarDataUri(clean);
    }
    let hash = 0;
    for (let i = 0; i < clean.length; i++) {
      hash = clean.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    const initials = clean.slice(0, 2).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="hsl(${hue}, 82%, 52%)"/>
          <stop offset="100%" stop-color="hsl(${(hue + 55) % 360}, 85%, 30%)"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="60" fill="url(#g)"/>
      <text x="60" y="72" text-anchor="middle" font-family="Chakra Petch, sans-serif" font-weight="900" font-size="42" fill="#fff">${initials}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  async function resolveKickAvatar(username, imgElement) {
    const clean = String(username || 'Viewer').trim().replace(/^@/, '');
    const fallbackUri = getDeterministicAvatar(clean);
    if (imgElement) {
      imgElement.onerror = () => {
        imgElement.onerror = null;
        imgElement.src = fallbackUri;
      };
      imgElement.src = avatarCache.get(clean.toLowerCase()) || fallbackUri;
    }
    if (!clean || avatarCache.has(clean.toLowerCase())) return;
    try {
      const res = await fetch(`/api/kick/user/${encodeURIComponent(clean)}`);
      if (!res.ok) return;
      const data = await res.json();
      const remoteUrl = data?.profile_pic || data?.user?.profile_pic;
      if (remoteUrl && typeof remoteUrl === 'string') {
        avatarCache.set(clean.toLowerCase(), remoteUrl);
        if (imgElement) imgElement.src = remoteUrl;
      }
    } catch (_) {}
  }

  function resolveSlotMeta(slotName, existingEntry) {
    const rawName = String(slotName || existingEntry?.name || 'Mystery Slot').trim();
    if (window.SlotResolver && typeof window.SlotResolver.resolve === 'function') {
      const resolved = window.SlotResolver.resolve(rawName);
      if (resolved) {
        return {
          name: resolved.name || rawName,
          provider: resolved.provider || existingEntry?.provider || 'OFFICIAL SLOT',
          img: resolved.img || existingEntry?.img || ''
        };
      }
    }
    return {
      name: rawName,
      provider: existingEntry?.provider || 'OFFICIAL SLOT',
      img: existingEntry?.img || ''
    };
  }

  function preloadSlotImage(url) {
    if (!url || slotImageCache.has(url)) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      slotImageCache.set(url, img);
      wheelBufferDirty = true;
      if (!isSpinning) drawWheel(wheelRotation);
    };
    img.onerror = () => {
      slotImageCache.set(url, null);
    };
    img.src = url;
  }

  // --- Web Audio API Sound Effects (Wheel Tick & Winner Chime) ---
  let audioCtx = null;
  function ensureAudioCtx() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playWheelTick() {
    try {
      const ac = ensureAudioCtx();
      if (!ac) return;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(190, ac.currentTime + 0.032);
      gain.gain.setValueAtTime(0.11, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.032);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start();
      osc.stop(ac.currentTime + 0.035);
    } catch (_) {}
  }

  function playWinnerChime() {
    try {
      const ac = ensureAudioCtx();
      if (!ac) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        const t0 = ac.currentTime + idx * 0.095;
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t0);
        gain.gain.setValueAtTime(0.001, t0);
        gain.gain.linearRampToValueAtTime(0.16, t0 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.42);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(t0);
        osc.stop(t0 + 0.45);
      });
    } catch (_) {}
  }

  function ensureWheelBuffer(w, h) {
    if (!wheelBufferCanvas) {
      wheelBufferCanvas = document.createElement('canvas');
    }
    if (wheelBufferCanvas.width !== w || wheelBufferCanvas.height !== h) {
      wheelBufferCanvas.width = w;
      wheelBufferCanvas.height = h;
      wheelBufferDirty = true;
    }
    if (!wheelBufferDirty) return wheelBufferCanvas;

    const bctx = wheelBufferCanvas.getContext('2d');
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 12;
    bctx.clearRect(0, 0, w, h);

    const n = requests.length;
    const arc = (Math.PI * 2) / n;

    for (let i = 0; i < n; i++) {
      const entry = requests[i];
      const meta = resolveSlotMeta(entry.name, entry);
      if (meta.img) preloadSlotImage(meta.img);

      const startAngle = i * arc;
      const endAngle = startAngle + arc;
      const midAngle = startAngle + arc / 2;
      const sliceColor = SLICE_PALETTE[i % SLICE_PALETTE.length];

      // Slice Sector
      bctx.save();
      bctx.beginPath();
      bctx.moveTo(cx, cy);
      bctx.arc(cx, cy, radius, startAngle, endAngle);
      bctx.closePath();

      const grad = bctx.createRadialGradient(cx, cy, 35, cx, cy, radius);
      grad.addColorStop(0, '#090d1a');
      grad.addColorStop(0.68, sliceColor);
      grad.addColorStop(1, '#070a14');
      bctx.fillStyle = grad;
      bctx.fill();

      bctx.lineWidth = 2;
      bctx.strokeStyle = 'rgba(7, 10, 18, 0.9)';
      bctx.stroke();
      bctx.restore();

      // Slice Text: @Username + Slot Name
      bctx.save();
      bctx.translate(cx, cy);
      bctx.rotate(midAngle);
      bctx.textAlign = 'right';
      bctx.shadowColor = 'rgba(0, 0, 0, 0.92)';
      bctx.shadowBlur = 6;

      const rawUser = String(entry.user || 'Viewer').trim().replace(/^@/, '');
      const userLabel = `@${rawUser.slice(0, 14)}`;
      const slotLabel = String(meta.name || entry.name || 'Slot').slice(0, 18);

      if (n <= 12) {
        bctx.fillStyle = '#ffd700';
        bctx.font = '800 12px "JetBrains Mono", monospace';
        bctx.fillText(userLabel, radius - 22, -4);

        bctx.fillStyle = '#ffffff';
        bctx.font = '900 13.5px "Chakra Petch", sans-serif';
        bctx.fillText(slotLabel, radius - 22, 13);
      } else {
        bctx.fillStyle = '#ffffff';
        bctx.font = '800 11.5px "Chakra Petch", sans-serif';
        bctx.fillText(`${userLabel} · ${slotLabel.slice(0, 14)}`, radius - 18, 4);
      }
      bctx.restore();
    }

    // Outer Gold/Cyan Rim
    bctx.save();
    bctx.beginPath();
    bctx.arc(cx, cy, radius, 0, Math.PI * 2);
    bctx.lineWidth = 5;
    bctx.strokeStyle = 'rgba(0, 229, 255, 0.65)';
    bctx.stroke();
    bctx.restore();

    wheelBufferDirty = false;
    return wheelBufferCanvas;
  }

  // --- Draw Roulette Wheel with @Username + Slot Name on Each Slice ---
  function drawWheel(rotationRad = 0) {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 12;

    ctx.clearRect(0, 0, w, h);

    if (countPill) {
      countPill.textContent = `${requests.length} ${requests.length === 1 ? 'REQUEST' : 'REQUESTS'}`;
    }

    if (!requests.length) {
      // Empty Standby Wheel
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#070b16';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
      ctx.stroke();

      // Subtle decorative spokes
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.fillStyle = '#00e5ff';
      ctx.font = '900 18px "Chakra Petch", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('WAITING FOR !SR <SLOT>', cx, cy - 58);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '700 13px "Inter", sans-serif';
      ctx.fillText('Viewers type !sr <slot> in Kick chat', cx, cy + 68);
      ctx.restore();
      return;
    }

    const buf = ensureWheelBuffer(w, h);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotationRad);
    ctx.drawImage(buf, -cx, -cy);
    ctx.restore();
  }

  // --- Winner Showcase Reveal ---
  function showWinnerShowcase(winnerEntry) {
    if (!winnerEntry || !showcaseEl) return;
    if (winnerHideTimer) {
      clearTimeout(winnerHideTimer);
      winnerHideTimer = null;
    }

    const cleanUser = String(winnerEntry.user || 'Viewer').trim().replace(/^@/, '');
    const meta = resolveSlotMeta(winnerEntry.name, winnerEntry);

    if (winnerUserEl) winnerUserEl.textContent = `@${cleanUser}`;
    if (winnerProviderEl) winnerProviderEl.textContent = meta.provider || 'OFFICIAL SLOT';
    if (winnerSlotTitleEl) winnerSlotTitleEl.textContent = meta.name;

    if (winnerSlotImgEl) {
      const fallbackCard = window.SlotResolver
        ? window.SlotResolver.resolve(meta.name).img
        : '';
      winnerSlotImgEl.onerror = () => {
        winnerSlotImgEl.onerror = null;
        if (fallbackCard) winnerSlotImgEl.src = fallbackCard;
      };
      winnerSlotImgEl.src = meta.img || fallbackCard;
    }

    resolveKickAvatar(cleanUser, winnerAvatarEl);
    showcaseEl.classList.add('is-active');
    playWinnerChime();

    winnerHideTimer = setTimeout(() => {
      showcaseEl.classList.remove('is-active');
    }, 9000);
  }

  function hideWinnerShowcase() {
    if (winnerHideTimer) {
      clearTimeout(winnerHideTimer);
      winnerHideTimer = null;
    }
    if (showcaseEl) showcaseEl.classList.remove('is-active');
  }

  // --- Spin Animation Synchronized with Control Panel ---
  function triggerSpinAnimation(payload) {
    if (isSpinning) return;
    if (Array.isArray(payload?.queue) && payload.queue.length > 0) {
      requests = payload.queue;
      wheelBufferDirty = true;
    }
    if (!requests.length) return;

    hideWinnerShowcase();
    isSpinning = true;

    const n = requests.length;
    const arc = (Math.PI * 2) / n;
    const targetIdx = typeof payload?.winnerIndex === 'number' && payload.winnerIndex >= 0 && payload.winnerIndex < n
      ? payload.winnerIndex
      : 0;
    const winnerEntry = payload?.winner || requests[targetIdx];

    // Pointer is at top (-PI/2 = 3*PI/2). Place center of targetIdx slice at pointer:
    const pointerAngle = (Math.PI * 3) / 2;
    const desiredSliceCenter = pointerAngle - (targetIdx * arc + arc / 2);
    const currentMod = ((wheelRotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const desiredMod = ((desiredSliceCenter % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    let delta = desiredMod - currentMod;
    if (delta <= 0) delta += Math.PI * 2;

    const fullSpins = (6 + (targetIdx % 3)) * Math.PI * 2;
    const startRot = wheelRotation;
    const targetRot = startRot + fullSpins + delta;
    const duration = Number(payload?.durationMs) || 4400;
    const startTime = performance.now();
    let lastSliceTick = -1;

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      wheelRotation = startRot + (targetRot - startRot) * easeOut;

      const currentSlice = Math.floor((((pointerAngle - wheelRotation) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)) / arc);
      if (currentSlice !== lastSliceTick && progress < 0.97) {
        lastSliceTick = currentSlice;
        playWheelTick();
      }

      drawWheel(wheelRotation);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isSpinning = false;
        showWinnerShowcase(winnerEntry);
      }
    }

    requestAnimationFrame(step);
  }

  // --- Load & Sync State ---
  function loadLocalQueue() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_QUEUE);
      const parsed = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        requests = parsed;
      }
    } catch (_) {
      requests = [];
    }
    wheelBufferDirty = true;
    if (!isSpinning) drawWheel(wheelRotation);
  }

  function handleIncomingPacket(packet) {
    if (!packet || typeof packet !== 'object') return;
    const type = packet.type || packet.action;

    if (type === 'SYNC_QUEUE' && Array.isArray(packet.queue)) {
      requests = packet.queue;
      wheelBufferDirty = true;
      if (!isSpinning) drawWheel(wheelRotation);
      return;
    }

    if (type === 'SPIN_WHEEL') {
      const ts = Number(packet.ts || packet.timestamp || 0);
      if (ts && ts <= lastHandledSpinTs) return;
      if (ts) lastHandledSpinTs = ts;
      triggerSpinAnimation(packet);
      return;
    }

    if (type === 'SHOW_WINNER' && packet.winner) {
      showWinnerShowcase(packet.winner);
      return;
    }

    if (type === 'CLEAR_WINNER') {
      hideWinnerShowcase();
      return;
    }
  }

  // 1. BroadcastChannel Listener
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.onmessage = (ev) => handleIncomingPacket(ev.data);
    }
  } catch (_) {}

  // 2. LocalStorage Event Listener
  window.addEventListener('storage', (ev) => {
    if (ev.key === STORAGE_KEY_QUEUE) {
      loadLocalQueue();
    } else if (ev.key === STORAGE_KEY_SPIN && ev.newValue) {
      try {
        handleIncomingPacket(JSON.parse(ev.newValue));
      } catch (_) {}
    }
  });

  // 3. Cloudflare Edge Polling (for isolated OBS Studio Browser Source)
  async function pollEdgeState() {
    if (document.hidden) return;
    try {
      const res = await fetch('/api/overlay/celebration', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      const srEvent = data?.overlayEvents?.['overlay-slotrequests'];
      if (srEvent) {
        const payload = srEvent.data || srEvent;
        if (Array.isArray(payload.queue) && !isSpinning) {
          const sigA = JSON.stringify(requests.map((r) => `${r.user}:${r.name}`));
          const sigB = JSON.stringify(payload.queue.map((r) => `${r.user}:${r.name}`));
          if (sigA !== sigB) {
            requests = payload.queue;
            wheelBufferDirty = true;
            drawWheel(wheelRotation);
          }
        }
        if (payload.type === 'SPIN_WHEEL') {
          handleIncomingPacket(payload);
        }
      }
    } catch (_) {}
  }

  // Initial Boot
  loadLocalQueue();
  setInterval(pollEdgeState, 1400);
})();
