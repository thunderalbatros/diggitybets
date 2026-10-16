/* ============================================================
   Random Slot Wheel — diggitybets · main.js
   Vertical Roulette for Slot Games (Stake Exclusives, Pragmatic,
   Hacksaw, Nolimit City) with Procedural Web Audio & Confetti.
   ============================================================ */
(() => {
  'use strict';

  const CFG = Object.assign({
    host: '127.0.0.1',
    port: 8080,
    endpoint: '/',
    password: '',
    actionName: 'RandomSlot_Picker',
    holdMs: 9500,
    volume: 0.8
  }, window.SLOT_WHEEL_CONFIG || {});

  const params = new URLSearchParams(location.search);
  const IN_OBS = typeof window.obsstudio !== 'undefined';
  const AUTOHIDE = params.has('autohide');
  const SHOW_CONTROLS = params.has('controls') || (!IN_OBS && !params.has('nocontrols'));
  const DEBUG = params.has('debug');
  const VOL = params.has('mute') ? 0 : Math.min(1, Math.max(0, parseFloat(params.get('vol') ?? CFG.volume) || 0));

  // Reel geometry (must match style.css: .tarjeta height 148, gap 12, container height 460)
  const L = { cardH: 148, gap: 12, total: 56, winnerIdx: 51, spinMs: 6500, containerH: 460 };
  L.stride = L.cardH + L.gap; // 160px

  const GOLDS = ['#ffd700', '#fff1a8', '#ffb700', '#ff8800', '#ffffff'];

  const $ = (s) => document.querySelector(s);
  const stage = $('#stage'), ruleta = $('#ruleta'), pista = $('#pista'), flash = $('#flash'), rays = $('#rays');
  const estadoEl = $('#estado'), controlsEl = $('#controls');
  const btnSpin = $('#btnSpin'), btnDemo = $('#btnDemo');

  if (!IN_OBS) document.body.classList.add('preview');
  if (AUTOHIDE) {
    document.body.classList.add('autohide');
    stage.classList.add('idle');
  }
  if (SHOW_CONTROLS) controlsEl.classList.remove('oculto');
  if (IN_OBS && !DEBUG) estadoEl.classList.add('oculto');

  let busy = false;
  let connected = false;
  let client = null;
  let hideTimer = null;
  let currentCategory = 'all';
  let currentSpinId = null;
  let directWs = null;
  let hubWs = null;
  const seenIds = new Set();

  // Full catalog and filtered views
  let allSlots = Array.isArray(window.SLOTS_CATALOG) ? window.SLOTS_CATALOG : [];

  /* ---------------- Stage scaling (500x500 in browser and OBS) ---------------- */
  function fit() {
    const s = Math.min(window.innerWidth / 500, window.innerHeight / 500);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  }
  window.addEventListener('resize', fit);
  fit();

  function setStatus(text, color) {
    if (!estadoEl) return;
    estadoEl.textContent = text;
    if (color) estadoEl.style.color = color;
  }
  function dbg(...a) { if (DEBUG) console.log('[SlotWheel]', ...a); }

  /* ============================================================
     SOUND ENGINE — 100% procedural Web Audio API
     ============================================================ */
  const Sfx = (() => {
    let ctx = null, master = null, wetIn = null, noiseBuf = null;

    function ensure() {
      if (ctx) {
        if (ctx.state === 'suspended') ctx.resume().catch(() => {});
        return true;
      }
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { return false; }

      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16; comp.knee.value = 24; comp.ratio.value = 6;
      master = ctx.createGain();
      master.gain.value = VOL;
      master.connect(comp); comp.connect(ctx.destination);

      // Procedural reverb
      const len = Math.floor(ctx.sampleRate * 1.9);
      const ir = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = ir.getChannelData(c);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
      }
      const conv = ctx.createConvolver();
      conv.buffer = ir;
      const wet = ctx.createGain();
      wet.gain.value = 0.38;
      conv.connect(wet); wet.connect(master);
      wetIn = conv;

      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const nd = noiseBuf.getChannelData(0);
      for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;

      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      return true;
    }

    const T = (delay) => ctx.currentTime + 0.02 + (delay || 0);

    function tone({ at, f0, f1, dur, type = 'sine', vol = 0.2, attack = 0.004, wet = 0, detune = 0, lp = 0 }) {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type;
      o.detune.value = detune;
      o.frequency.setValueAtTime(f0, at);
      if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, at + dur);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(vol, at + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      let out = o;
      if (lp) {
        const f = ctx.createBiquadFilter();
        f.type = 'lowpass'; f.frequency.value = lp;
        o.connect(f); out = f;
      }
      out.connect(g); g.connect(master);
      if (wet) { const s = ctx.createGain(); s.gain.value = wet; g.connect(s); s.connect(wetIn); }
      o.start(at); o.stop(at + dur + 0.05);
    }

    function noise({ at, dur, vol = 0.3, type = 'bandpass', f0 = 1000, f1 = 1000, q = 1, attack = 0.005, wet = 0 }) {
      const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = noiseBuf;
      f.type = type; f.Q.value = q;
      f.frequency.setValueAtTime(f0, at);
      if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(f1, at + dur);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(vol, at + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      s.connect(f); f.connect(g); g.connect(master);
      if (wet) { const w = ctx.createGain(); w.gain.value = wet; g.connect(w); w.connect(wetIn); }
      s.start(at, Math.random()); s.stop(at + dur + 0.05);
    }

    return {
      ensure,
      now: () => (ctx ? ctx.currentTime : 0),
      whoosh(delay = 0) {
        if (!ensure()) return;
        const at = T(delay);
        noise({ at, dur: 1.4, vol: 0.45, f0: 250, f1: 3200, q: 1.1, attack: 0.55, wet: 0.2 });
        tone({ at, f0: 120, f1: 38, dur: 0.6, vol: 0.5 });
      },
      tick(delay, prog) {
        if (!ensure()) return;
        const at = T(delay);
        const f = (1800 - 900 * prog) * (0.97 + Math.random() * 0.06);
        tone({ at, f0: f, f1: f * 0.45, dur: 0.045, type: 'triangle', vol: 0.26 - 0.06 * prog });
        noise({ at, dur: 0.02, vol: 0.12, type: 'highpass', f0: 3500, f1: 3500, attack: 0.001 });
      },
      thud(delay = 0) {
        if (!ensure()) return;
        const at = T(delay);
        tone({ at, f0: 170, f1: 40, dur: 0.55, vol: 0.9, wet: 0.2 });
        noise({ at, dur: 0.28, vol: 0.5, type: 'lowpass', f0: 600, f1: 120, attack: 0.002 });
      },
      fanfare(delay = 0) {
        if (!ensure()) return;
        const base = T(delay);
        const arp = [523.25, 659.25, 783.99, 1046.5];
        arp.forEach((f, i) => {
          const at = base + i * 0.11;
          tone({ at, f0: f, dur: 0.38, type: 'sawtooth', vol: 0.12, detune: -6, lp: 3600, wet: 0.35 });
          tone({ at, f0: f, dur: 0.38, type: 'square', vol: 0.06, detune: 7, lp: 3000, wet: 0.35 });
        });
        [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f) => {
          tone({ at: base + 0.52, f0: f, dur: 1.5, type: 'sawtooth', vol: 0.085, attack: 0.02, detune: -5, lp: 3200, wet: 0.5 });
          tone({ at: base + 0.52, f0: f, dur: 1.5, type: 'triangle', vol: 0.09, attack: 0.02, detune: 5, wet: 0.5 });
        });
      },
      sparkle(delay = 0, count = 16) {
        if (!ensure()) return;
        const base = T(delay);
        for (let i = 0; i < count; i++) {
          const at = base + Math.random() * 1.5;
          const f = 2200 + Math.random() * 3600;
          tone({ at, f0: f, f1: f * 1.25, dur: 0.14, vol: 0.07, wet: 0.6 });
        }
      },
      coins(delay = 0, count = 10) {
        if (!ensure()) return;
        const base = T(delay);
        for (let i = 0; i < count; i++) {
          const at = base + i * 0.1 + Math.random() * 0.05;
          const v = 0.09 * (1 - i / (count * 1.3));
          tone({ at, f0: 987.77, dur: 0.07, type: 'square', vol: v });
          tone({ at: at + 0.07, f0: 1318.5, dur: 0.38, type: 'square', vol: v, wet: 0.25 });
        }
      }
    };
  })();

  /* ============================================================
     Slot Reel Helpers & Card Markup
     ============================================================ */
  const esc = (s) => String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function getProviderBadgeClass(category) {
    switch (category) {
      case 'stake': return 'badge-stake';
      case 'pragmatic': return 'badge-pragmatic';
      case 'hacksaw': return 'badge-hacksaw';
      case 'nolimit': return 'badge-nolimit';
      default: return 'badge-other';
    }
  }

  function getProviderColor(category) {
    switch (category) {
      case 'stake': return '#ffd700';
      case 'pragmatic': return '#00e5ff';
      case 'hacksaw': return '#ff5722';
      case 'nolimit': return '#ffab00';
      default: return '#d32ce6';
    }
  }

  function fallbackCoverHTML(slot) {
    const icon = slot.category === 'stake' ? '💎' : slot.category === 'pragmatic' ? '⚡' : slot.category === 'hacksaw' ? '🪚' : slot.category === 'nolimit' ? '💀' : '🎰';
    const ini = (slot.name || 'SL').slice(0, 3).toUpperCase();
    return `<div class="slot-thumb-fallback">
              <span class="icon">${icon}</span>
              <span class="ini">${esc(ini)}</span>
            </div>`;
  }

  function cardHTML(slot, index) {
    const badgeCls = getProviderBadgeClass(slot.category);
    const color = getProviderColor(slot.category);
    const badgeText = slot.badge || (slot.category === 'stake' ? 'ONLY ON STAKE' : slot.provider.toUpperCase());

    const imgUrl = (window.SlotResolver && slot.image) ? window.SlotResolver.resolveSlotImageUrl(slot.image) : slot.image;
    const imgTag = imgUrl
      ? `<img class="slot-thumb" src="${esc(imgUrl)}" alt="${esc(slot.name)}" loading="lazy" referrerpolicy="no-referrer" data-slot="${esc(slot.id || slot.name)}" onerror="this.onerror=null;this.src='../../site/images/slots/default-slot.svg';">`
      : fallbackCoverHTML(slot);

    return `
      <div class="tarjeta" style="--provider-color:${color}" data-slot-id="${esc(slot.id || slot.name)}">
        ${imgTag}
        <div class="slot-meta">
          <div class="slot-title">${esc(slot.name)}</div>
          <div class="slot-badges">
            <span class="badge-provider ${badgeCls}">${esc(badgeText)}</span>
            ${slot.maxWin ? `<span class="tag-maxwin">MAX: ${esc(slot.maxWin)}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // Fallback if an image fails to load (error doesn't bubble, so capture-phase)
  document.addEventListener('error', (ev) => {
    const el = ev.target;
    if (el && el.tagName === 'IMG' && el.classList.contains('slot-thumb')) {
      const slotId = el.dataset.slot;
      const slot = allSlots.find((s) => (s.id || s.name) === slotId) || { name: slotId, category: 'stake' };
      el.outerHTML = fallbackCoverHTML(slot);
    }
  }, true);

  function getSlotsForCategory(cat) {
    if (!cat || cat === 'all') return allSlots;
    return allSlots.filter((s) => s.category === cat);
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function showStandby() {
    if (busy) return;
    const pool = getSlotsForCategory(currentCategory);
    if (!pool.length) return;

    // Pick a clean curated set of 12 slots for standby
    let list = [];
    while (list.length < 12) {
      list = list.concat(pool);
    }
    list = list.slice(0, 14);

    pista.classList.add('sin-transicion');
    const centerOffset = 2 * L.stride;
    pista.style.transform = `translateY(${-centerOffset}px)`;
    pista.innerHTML = list.map((s, i) => cardHTML(s, i)).join('');
  }

  /* ---- Bezier inverse for speed-synced mechanical tick sounds ---- */
  const bez = (u, a, b) => 3 * (1 - u) * (1 - u) * u * a + 3 * (1 - u) * u * u * b + u * u * u;
  function timeAtProgress(p) {
    let lo = 0, hi = 1;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (bez(mid, 1, 1) < p) lo = mid; else hi = mid;
    }
    return bez((lo + hi) / 2, 0.22, 0.36);
  }

  function scheduleTicks(totalDistance, delay) {
    const n = Math.floor(totalDistance / L.stride);
    for (let k = 1; k <= n; k++) {
      const p = (k * L.stride) / totalDistance;
      Sfx.tick(delay + timeAtProgress(p) * (L.spinMs / 1000), p);
    }
  }

  /* ============================================================
     Slot Spin Sequence
     ============================================================ */
  async function startSpin(payload) {
    if (busy) { dbg('Spin ignored: already busy'); return; }
    const cat = payload.categoria || currentCategory || 'all';
    let pool = getSlotsForCategory(cat);
    if (!pool.length) pool = allSlots;

    // Winner can be provided in payload or chosen via Tier-Weighted RNG
    let winner = payload.ganador;
    if (typeof winner === 'string') {
      if (window.SlotResolver) {
        winner = window.SlotResolver.resolve(winner);
      } else {
        const found = pool.find((s) => (s.id || s.name).toLowerCase() === winner.toLowerCase() || s.name.toLowerCase() === winner.toLowerCase());
        if (found) winner = found;
      }
    }
    if (!winner || typeof winner !== 'object') {
      if (window.SLOT_TIERS && typeof window.SLOT_TIERS.pickWeightedSlot === 'function') {
        winner = window.SLOT_TIERS.pickWeightedSlot(pool);
      } else {
        winner = pool[Math.floor(Math.random() * pool.length)];
      }
    }

    busy = true;
    currentSpinId = payload.spinId || payload.id || null;
    clearTimeout(hideTimer);
    resetReveal();

    // Build the 56-card reel strip
    const base = shuffle(pool);
    const strip = Array.from({ length: L.total }, (_, i) => base[i % base.length]);
    strip[L.winnerIdx] = winner;
    if (base.length > 1) {
      const others = base.filter((s) => (s.id || s.name) !== (winner.id || winner.name));
      [L.winnerIdx - 1, L.winnerIdx + 1].forEach((i) => {
        if ((strip[i].id || strip[i].name) === (winner.id || winner.name) && others.length) {
          strip[i] = others[Math.floor(Math.random() * others.length)];
        }
      });
    }

    pista.innerHTML = strip.map((s, i) => cardHTML(s, i)).join('');
    pista.classList.add('sin-transicion');
    pista.style.transform = 'translateY(0px)';
    void pista.offsetHeight;

    const wasHidden = stage.classList.contains('idle');
    stage.classList.remove('idle');
    Sfx.ensure();
    if (wasHidden && IN_OBS) await new Promise((r) => setTimeout(r, 450));

    // Controlled jitter strictly within the center of the winner card (±10px max, card is 148px)
    const jitter = (Math.random() * 0.4 - 0.2) * (L.cardH * 0.35);
    const distance = L.winnerIdx * L.stride + jitter;

    pista.classList.remove('sin-transicion');
    pista.style.transitionDuration = `${L.spinMs}ms`;
    let finished = false;
    const finish = () => { if (finished) return; finished = true; reveal(winner); };
    pista.addEventListener('transitionend', (ev) => { if (ev.propertyName === 'transform') finish(); });
    setTimeout(finish, L.spinMs + 500);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      pista.style.transform = `translateY(${-distance}px)`;
      Sfx.whoosh(0);
      scheduleTicks(distance, 0.02);
    }));
  }

  function resetReveal() {
    stage.classList.remove('revealed');
    pista.classList.remove('revealed');
    pista.querySelectorAll('.ganadora').forEach((c) => c.classList.remove('ganadora'));
    const modal = $('#resultModal');
    if (modal) modal.classList.add('oculto');
  }

  function reveal(winner) {
    const card = pista.children[L.winnerIdx];

    // Impact
    Sfx.thud(0);
    flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go');
    ruleta.classList.remove('shake'); void ruleta.offsetWidth; ruleta.classList.add('shake');
    stage.classList.add('revealed');
    card?.classList.add('ganadora');

    // Handshake: Notify server that wheel deceleration finished for instant, millisecond-accurate chat announcement
    if (currentSpinId) {
      const finishedSpinId = currentSpinId;
      currentSpinId = null;
      if (hubWs && hubWs.readyState === WebSocket.OPEN) {
        try { hubWs.send(JSON.stringify({ action: 'spin_animation_complete', spinId: finishedSpinId })); } catch (_) {}
      }
      if (directWs && directWs.readyState === WebSocket.OPEN) {
        try { directWs.send(JSON.stringify({ action: 'spin_animation_complete', spinId: finishedSpinId })); } catch (_) {}
      }
      fetch('/api/wheel/spin-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spinId: finishedSpinId }),
      }).catch(() => {});
    }

    // Victory celebration + SYNCHRONIZED ON-SCREEN RESULT MODAL
    Sfx.fanfare(0.35);
    Sfx.sparkle(0.45);
    setTimeout(() => {
      cannons();
      const modal = $('#resultModal');
      const resTitle = $('#resultTitle');
      const resProvider = $('#resultProvider');
      const resCover = $('#resultCover');
      if (modal && resTitle) {
        resTitle.textContent = winner.name || 'Selected Slot';
        resProvider.textContent = `${winner.provider || 'Casino'} · ${winner.maxWin || 'Max Win'}`;
        const coverUrl = (window.SlotResolver && winner.image)
          ? window.SlotResolver.resolveSlotImageUrl(winner.image)
          : (winner.image || '../../site/images/slots/default-slot.svg');
        resCover.src = coverUrl;
        resCover.onerror = () => { resCover.src = '../../site/images/slots/default-slot.svg'; };
        modal.classList.remove('oculto');
      }

      // Broadcast synchronized event to external systems / chat overlays
      try {
        const bc = new BroadcastChannel('hunthub_draws');
        bc.postMessage({ type: 'SLOT_REVEALED', winner, timestamp: Date.now() });
      } catch (e) {}
    }, 350);

    // Coins shower
    Sfx.coins(0.85);
    setTimeout(() => coinShower(), 850);

    // Hold, then return
    hideTimer = setTimeout(leave, CFG.holdMs);
  }

  function leave() {
    stage.classList.remove('revealed');
    pista.classList.remove('revealed');
    if (AUTOHIDE) stage.classList.add('idle');
    setTimeout(() => {
      resetReveal();
      busy = false;
      showStandby();
      setButtons(true);
    }, 650);
  }

  /* ---------------- Confetti ---------------- */
  function cannons() {
    if (typeof confetti !== 'function') return;
    const common = { colors: GOLDS, startVelocity: 60, gravity: 0.9, ticks: 220, zIndex: 50 };
    confetti({ ...common, particleCount: 85, angle: 60, spread: 60, origin: { x: 0, y: 0.75 } });
    confetti({ ...common, particleCount: 85, angle: 120, spread: 60, origin: { x: 1, y: 0.75 } });
    confetti({ ...common, particleCount: 130, spread: 110, startVelocity: 46, origin: { x: 0.5, y: 0.5 } });
  }

  function coinShower() {
    if (typeof confetti !== 'function') return;
    let shapes;
    try {
      shapes = [confetti.shapeFromText({ text: '🎰', scalar: 2 }), confetti.shapeFromText({ text: '⭐', scalar: 2 }), confetti.shapeFromText({ text: '💰', scalar: 2 })];
    } catch (e) { shapes = undefined; }
    confetti({
      particleCount: 32, spread: 140, origin: { x: 0.5, y: -0.1 }, gravity: 0.75, startVelocity: 22,
      ticks: 280, scalar: 2.2, zIndex: 50, ...(shapes ? { shapes } : { colors: GOLDS })
    });
    const end = Date.now() + 1800;
    (function stream() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: GOLDS, zIndex: 50 });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: GOLDS, zIndex: 50 });
      if (Date.now() < end) requestAnimationFrame(stream);
    })();
  }

  /* ============================================================
     WebSocket Connectivity
     ============================================================ */
  function extractPayload(msg) {
    if (!msg) return null;
    if (typeof msg === 'string') {
      try { msg = JSON.parse(msg); } catch (e) { return null; }
    }
    if (typeof msg !== 'object') return null;

    if (msg.evento === 'sorteo_slot') return msg;
    if (msg.slotPayload) {
      try {
        const o = typeof msg.slotPayload === 'string' ? JSON.parse(msg.slotPayload) : msg.slotPayload;
        if (o?.evento === 'sorteo_slot') return o;
      } catch (e) {}
    }

    const d = msg.data || msg.args || msg.arguments;
    if (d && typeof d === 'object') {
      for (const c of [d, d.data, d.args, d.arguments]) {
        if (!c || typeof c !== 'object') continue;
        if (c.evento === 'sorteo_slot') return c;
        if (c.slotPayload) {
          try {
            const o = typeof c.slotPayload === 'string' ? JSON.parse(c.slotPayload) : c.slotPayload;
            if (o?.evento === 'sorteo_slot') return o;
          } catch (e) {}
        }
      }
    }
    return null;
  }

  function onMessage(msg) {
    const p = extractPayload(msg);
    if (!p) return;
    if (p.id !== undefined) {
      if (seenIds.has(p.id)) return;
      seenIds.add(p.id);
    }
    dbg('Slot draw received', p);
    setButtons(false);
    startSpin(p);
  }

  function connectDirectWs() {
    try {
      const url = `ws://${CFG.host}:${CFG.port}${CFG.endpoint}`;
      const ws = new WebSocket(url);
      directWs = ws;
      ws.onopen = () => {
        dbg('Direct WebSocket connected to', url);
        setStatus('● Connected to Streamer.bot', '#00e676');
        if (IN_OBS && !DEBUG) estadoEl.classList.add('oculto');
      };
      ws.onmessage = (ev) => {
        try { onMessage(JSON.parse(ev.data)); } catch (e) {}
      };
      ws.onclose = () => { setTimeout(connectDirectWs, 2500); };
      ws.onerror = () => {};
    } catch (e) {}
  }

  function connect() {
    connectDirectWs();

    client = new StreamerbotClient({
      host: CFG.host,
      port: CFG.port,
      endpoint: CFG.endpoint,
      password: CFG.password || undefined,
      autoReconnect: true,
      retries: -1,
      onData: onMessage,
      onConnect: () => {
        connected = true;
        setStatus('● Connected to Streamer.bot', '#00e676');
        if (IN_OBS && !DEBUG) estadoEl.classList.add('oculto');
        else setTimeout(() => { if (!DEBUG) estadoEl.style.opacity = '0.35'; }, 3000);
      },
      onDisconnect: () => {
        connected = false;
        if (!IN_OBS || DEBUG) {
          estadoEl.style.opacity = '1';
          setStatus('○ Reconnecting to Streamer.bot…', '#ffb700');
        }
      },
      onError: (err) => console.warn('[SlotWheel] WebSocket error:', err)
    });

    client.on('General.Custom', (evt) => onMessage(evt));
    client.on('Custom.Event', (evt) => onMessage(evt));
    client.on('Custom.CodeEvent', (evt) => onMessage(evt));
    client.on('Raw.Action', (evt) => onMessage(evt));

    // Connect to HuntHub Core WebSocket hub (port 3001) as well
    try {
      const hubPort = window.location.port || '3001';
      const hubHost = window.location.hostname || '127.0.0.1';
      hubWs = new WebSocket(`ws://${hubHost}:${hubPort}`);
      hubWs.onmessage = (ev) => {
        try {
          const payload = JSON.parse(ev.data);
          onMessage(payload);
        } catch {}
      };
      hubWs.onopen = () => {
        if (!connected) setStatus('● Connected to HuntHub Core', '#00e676');
      };
    } catch {}
  }

  /* ---------------- Interactive Controls ---------------- */
  function setButtons(enabled) {
    if (btnSpin) btnSpin.disabled = !enabled;
    if (btnDemo) btnDemo.disabled = !enabled;
  }

  function localSpin(cat = currentCategory) {
    Sfx.ensure();
    const pool = getSlotsForCategory(cat);
    const winner = pool[Math.floor(Math.random() * pool.length)];
    onMessage({
      evento: 'sorteo_slot',
      id: 'local-' + Date.now(),
      categoria: cat,
      ganador: winner
    });
  }

  async function triggerAction() {
    Sfx.ensure();
    if (busy) return;
    if (!connected) {
      localSpin(currentCategory);
      return;
    }
    try {
      const res = await client.doAction({ name: CFG.actionName }, { category: currentCategory });
      if (res && res.status && res.status !== 'ok') throw new Error(res.error || res.status);
      setStatus('● Slot spin requested', '#00e676');
    } catch (e) {
      localSpin(currentCategory);
    }
  }

  // Filter Buttons
  document.querySelectorAll('.btn-filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-filter').forEach((b) => b.classList.remove('activo'));
      btn.classList.add('activo');
      currentCategory = btn.dataset.cat || 'all';
      showStandby();
    });
  });

  btnSpin?.addEventListener('click', () => triggerAction());
  btnDemo?.addEventListener('click', () => localSpin());
  document.body.addEventListener('pointerdown', () => Sfx.ensure(), { once: true });

  // Public helper
  window.spinSlot = (cat) => localSpin(cat || currentCategory);

  // BroadcastChannel listener (for OBS Custom Dock communication & Master Admin)
  try {
    const handleBus = (ev) => {
      const d = ev.data || {};
      const cat = d.category || currentCategory;
      if (d.type === 'spin' || d.action === 'spin') {
        if (d.category) currentCategory = d.category;
        if (d.demo) localSpin(cat);
        else triggerAction();
      } else if (d.type === 'test') {
        localSpin(cat);
      }
    };
    new BroadcastChannel('slot_wheel_bus').onmessage = handleBus;
    new BroadcastChannel('hunthub_slot_wheel').onmessage = handleBus;
  } catch (e) {}

  /* ---------------- Startup ---------------- */
  function startup() {
    // If catalog wasn't loaded synchronously, try fetching
    if (!allSlots.length) {
      fetch('slots.json')
        .then((r) => r.json())
        .then((data) => {
          allSlots = data;
          showStandby();
        })
        .catch(() => {});
    } else {
      showStandby();
    }
    connect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startup);
  } else {
    startup();
  }
})();
