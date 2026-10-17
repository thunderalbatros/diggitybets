/* ============================================================
   Giveaway Wheel — diggitybets · main.js
   Receives the draw from Streamer.bot (WebSocket) and plays:
   reel spin with synced tick sounds -> lock-in -> winner reveal
   (flash, shake, rays, fanfare, confetti, banner with avatar).

   URL options:  ?preview=1  force preview mode (dark backdrop + standby cards)
                 ?controls=1 show the Pick/Demo buttons (always shown outside OBS)
                 ?debug=1    show connection/debug line
                 ?vol=0.5    master volume (0-1)   ?mute=1  silence
   ============================================================ */
(() => {
  'use strict';

  const CFG = Object.assign({
    host: '127.0.0.1', port: 8080, endpoint: '/', password: '',
    actionName: 'Giveaway_CSGO', holdMs: 9500, volume: 0.8
  }, window.GIVEAWAY_CONFIG || {});

  const params = new URLSearchParams(location.search);
  const IN_OBS = typeof window.obsstudio !== 'undefined';
  const AUTOHIDE = params.has('autohide');
  const SHOW_CONTROLS = params.has('controls') || (!IN_OBS && !params.has('nocontrols'));
  const DEBUG = params.has('debug');
  const VOL = params.has('mute') ? 0 : Math.min(1, Math.max(0, parseFloat(params.get('vol') ?? CFG.volume) || 0));

  // Reel geometry (must match style.css: .tarjeta height 160, .pista gap 12, container height 460)
  const L = { cardH: 160, gap: 12, total: 56, winnerIdx: 51, spinMs: 6500, containerH: 460 };
  L.stride = L.cardH + L.gap;

  // Rarity color palette
  const RAREZAS = ['#b0c3d9', '#5e98d9', '#4b69ff', '#8847ff', '#d32ce6', '#eb4b4b'];
  const GOLDS = ['#ffd700', '#fff1a8', '#ffb700', '#ff8800', '#ffffff'];

  const $ = (s) => document.querySelector(s);
  const stage = $('#stage'), ruleta = $('#ruleta'), pista = $('#pista'), flash = $('#flash');
  const estadoEl = $('#estado'), controlsEl = $('#controls');
  const btnPick = $('#btnPick'), btnDemo = $('#btnDemo');

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
  let currentSpinId = null;
  let directWs = null;
  let hubWs = null;
  const seenIds = new Set();
  const avatars = {};        // login -> url (from payload or chat harvest)
  const displayNames = {};   // login -> display name

  /* ---------------- Stage scaling (WYSIWYG 500x500 in browser and OBS) ---------------- */
  function fit() {
    const s = Math.min(window.innerWidth / 500, window.innerHeight / 500);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  }
  window.addEventListener('resize', fit);
  fit();

  function setStatus(text, color) {
    estadoEl.textContent = text;
    if (color) estadoEl.style.color = color;
  }
  function dbg(...a) { if (DEBUG) console.log('[Giveaway]', ...a); }

  /* ============================================================
     SOUND ENGINE — 100 % procedural Web Audio (no audio files)
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

      // Procedural reverb (exponentially decaying noise)
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

      // Rising whoosh + sub thump when the reel launches
      whoosh(delay = 0) {
        if (!ensure()) return;
        const at = T(delay);
        noise({ at, dur: 1.4, vol: 0.45, f0: 250, f1: 3200, q: 1.1, attack: 0.55, wet: 0.2 });
        tone({ at, f0: 120, f1: 38, dur: 0.6, vol: 0.5 });
      },

      // Reel tick: pitch falls as the reel slows (prog 0..1), tiny random variation
      tick(delay, prog) {
        if (!ensure()) return;
        const at = T(delay);
        const f = (1900 - 950 * prog) * (0.97 + Math.random() * 0.06);
        tone({ at, f0: f, f1: f * 0.45, dur: 0.045, type: 'triangle', vol: 0.26 - 0.06 * prog });
        noise({ at, dur: 0.02, vol: 0.12, type: 'highpass', f0: 3500, f1: 3500, attack: 0.001 });
      },

      // Impact when the reel locks on the winner
      thud(delay = 0) {
        if (!ensure()) return;
        const at = T(delay);
        tone({ at, f0: 170, f1: 40, dur: 0.55, vol: 0.9, wet: 0.2 });
        noise({ at, dur: 0.28, vol: 0.5, type: 'lowpass', f0: 600, f1: 120, attack: 0.002 });
      },

      // Victorious royal trumpet fanfare: D Major entrance + 5-horn climax
      fanfare(delay = 0) {
        if (!ensure()) return;
        const base = T(delay);
        const motif = [
          { f: 440.00, t: 0.00, dur: 0.11, vol: 0.16 }, // A4
          { f: 440.00, t: 0.13, dur: 0.11, vol: 0.16 }, // A4
          { f: 440.00, t: 0.26, dur: 0.11, vol: 0.18 }, // A4
          { f: 587.33, t: 0.39, dur: 0.36, vol: 0.20 }, // D5
          { f: 440.00, t: 0.80, dur: 0.12, vol: 0.16 }, // A4
          { f: 587.33, t: 0.94, dur: 0.18, vol: 0.18 }, // D5
          { f: 739.99, t: 1.15, dur: 0.22, vol: 0.22 }, // F#5
        ];
        motif.forEach((m) => {
          const at = base + m.t;
          tone({ at, f0: m.f, dur: m.dur, type: 'sawtooth', vol: m.vol, detune: -7, lp: 4600, wet: 0.3 });
          tone({ at, f0: m.f, dur: m.dur, type: 'sawtooth', vol: m.vol * 0.9, detune: 7, lp: 4200, wet: 0.3 });
          tone({ at, f0: m.f * 0.5, dur: m.dur, type: 'triangle', vol: m.vol * 0.5, lp: 2200, wet: 0.2 });
        });
        // Grand 5-Horn Climax at T + 1.42s
        const cAt = base + 1.42;
        [293.66, 440.00, 587.33, 739.99, 880.00].forEach((f, idx) => {
          const v = 0.08 + idx * 0.015;
          tone({ at: cAt, f0: f, dur: 1.4, type: 'sawtooth', vol: v, attack: 0.02, detune: -6, lp: 4800, wet: 0.4 });
          tone({ at: cAt, f0: f, dur: 1.4, type: 'sawtooth', vol: v, attack: 0.02, detune: 6, lp: 4400, wet: 0.4 });
          tone({ at: cAt, f0: f * 0.5, dur: 1.4, type: 'triangle', vol: v * 0.6, attack: 0.02, wet: 0.3 });
        });
      },

      // Glitter
      sparkle(delay = 0, count = 16) {
        if (!ensure()) return;
        const base = T(delay);
        for (let i = 0; i < count; i++) {
          const at = base + Math.random() * 1.5;
          const f = 2200 + Math.random() * 3600;
          tone({ at, f0: f, f1: f * 1.25, dur: 0.14, vol: 0.07, wet: 0.6 });
        }
      },

      // Coin shower
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
     Reel helpers
     ============================================================ */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function iniciales(display) {
    const ini = String(display).replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || '??';
    return `<div class="avatar-iniciales">${esc(ini)}</div>`;
  }

  function avatarHTML(login, display) {
    const url = avatars[login];
    return url
      ? `<img class="avatar" src="${esc(url)}" alt="" referrerpolicy="no-referrer" data-initials="${esc(display)}">`
      : iniciales(display);
  }

  // If an avatar fails to load, swap it for the initials circle (capture-phase: 'error' does not bubble)
  document.addEventListener('error', (ev) => {
    const el = ev.target;
    if (el && el.tagName === 'IMG' && el.classList.contains('avatar')) {
      el.outerHTML = iniciales(el.dataset.initials || '?');
    }
  }, true);

  function cardHTML(login, i) {
    const display = displayNames[login] ?? login;
    const color = RAREZAS[Math.floor(Math.random() * RAREZAS.length)];
    return `<div class="tarjeta" style="--rareza:${color}" data-user="${esc(login)}">
              ${avatarHTML(login, display)}
              <span class="nombre">${esc(display)}</span>
            </div>`;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const activeChatters = new Map(); // login -> { login, display, avatar, ts }
  let lastStandbyHash = '';

  function registerActiveChatter(login, display, avatar, ts = Date.now()) {
    if (!login) return;
    const l = String(login).toLowerCase().trim();
    if (!l) return;
    const BOTS = ['diggitybets', 'wenbot', 'botrix', 'nightbot', 'streamelements', 'streamlabs', 'kickbot', 'moobot', 'fossabot', 'kickbotapp'];
    if (BOTS.includes(l)) return;

    const disp = display || displayNames[l] || l;
    displayNames[l] = disp;
    if (avatar) avatars[l] = avatar;
    activeChatters.set(l, { login: l, display: disp, avatar: avatars[l] || '', ts });

    if (!busy) {
      updateStandbyWithRealChatters();
    }
  }

  function updateStandbyWithRealChatters() {
    if (busy) return;
    const now = Date.now();
    const valid = Array.from(activeChatters.values())
      .filter((c) => now - c.ts < 20 * 60 * 1000)
      .sort((a, b) => b.ts - a.ts);

    let list = [];
    if (valid.length > 0) {
      const logins = valid.map((c) => c.login);
      while (list.length < 12) {
        list = list.concat(logins);
      }
      list = list.slice(0, 16);
    } else {
      list = [
        'diggitybets', 'ChatToJoin', 'diggitybets', 'TypeInChat',
        'diggitybets', 'Giveaway', 'diggitybets', 'GoodLuck',
        'diggitybets', 'ChatToJoin', 'diggitybets', 'TypeInChat'
      ];
      list.forEach((u) => { displayNames[u.toLowerCase()] ??= u; });
    }

    const hash = list.join('|');
    if (hash === lastStandbyHash) return;
    lastStandbyHash = hash;

    pista.classList.add('sin-transicion');
    const centerOffset = 2 * L.stride;
    pista.style.transform = `translateY(${-centerOffset}px)`;
    pista.innerHTML = list.map((u, i) => cardHTML(u.toLowerCase(), i)).join('');
  }

  function showStandby() {
    updateStandbyWithRealChatters();
  }

  function clearReel() {
    pista.classList.add('sin-transicion');
    pista.style.transform = 'translateY(0px)';
    pista.innerHTML = '';
  }

  /* ---- Bezier inverse so every tick lands exactly when the card crosses the marker ---- */
  const bez = (u, a, b) => 3 * (1 - u) * (1 - u) * u * a + 3 * (1 - u) * u * u * b + u * u * u;
  // CSS cubic-bezier(0.12, 0.99, 0.24, 1): CS2 high-tension near-miss curve
  function timeAtProgress(p) {
    let lo = 0, hi = 1;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (bez(mid, 0.99, 1) < p) lo = mid; else hi = mid;
    }
    return bez((lo + hi) / 2, 0.12, 0.24);
  }

  // Cryptographic scramble reveal adapted from React-Bits DecryptedText
  function decryptTextReveal(el, finalText, durationMs = 680) {
    if (!el) return;
    const glyphs = '0123456789ABCDEF#$%&*+<>?@';
    const target = String(finalText || '');
    const start = performance.now();
    el.classList.add('decrypted-revealing');

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / durationMs);
      const lockedCount = Math.floor(progress * target.length);
      let out = '';
      for (let i = 0; i < target.length; i++) {
        if (i < lockedCount || target[i] === ' ' || target[i] === '@') {
          out += target[i];
        } else {
          out += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }
      el.textContent = out;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target;
        el.classList.remove('decrypted-revealing');
      }
    }
    requestAnimationFrame(frame);
  }

  function scheduleTicks(totalDistance, delay) {
    const marcadorEl = $('.marcador');
    const n = Math.floor(totalDistance / L.stride);
    for (let k = 1; k <= n; k++) {
      const p = (k * L.stride) / totalDistance;
      const tSec = delay + timeAtProgress(p) * (L.spinMs / 1000);
      Sfx.tick(tSec, p);
      if (marcadorEl) {
        setTimeout(() => {
          marcadorEl.classList.remove('needle-peg-deflect');
          void marcadorEl.offsetWidth;
          marcadorEl.classList.add('needle-peg-deflect');
        }, Math.max(0, Math.round(tSec * 1000)));
      }
    }
  }

  function preloadAvatars(logins) {
    const jobs = [...new Set(logins)].filter((l) => avatars[l]).map((l) => new Promise((res) => {
      const im = new Image();
      im.referrerPolicy = 'no-referrer';
      im.onload = () => res();
      im.onerror = () => { delete avatars[l]; res(); };
      im.src = avatars[l];
    }));
    return Promise.race([Promise.all(jobs), new Promise((r) => setTimeout(r, 600))]);
  }

  /* ============================================================
     Draw sequence (Vertical Roulette)
     ============================================================ */
  async function startDraw(p) {
    if (busy) { dbg('Draw ignored: wheel is busy'); return; }
    const winner = String(p.ganador || '').toLowerCase();
    const players = (p.participantes || []).map((s) => String(s).toLowerCase());
    if (!winner || !players.length) { dbg('Invalid payload', p); return; }
    if (!players.includes(winner)) players.push(winner);

    busy = true;
    currentSpinId = p.spinId || p.id || null;
    clearTimeout(hideTimer);
    resetReveal();

    Object.entries(p.nombres || {}).forEach(([k, v]) => { displayNames[k.toLowerCase()] = v; });
    Object.entries(p.avatares || {}).forEach(([k, v]) => { if (v) avatars[k.toLowerCase()] = v; });
    players.forEach((u) => { displayNames[u] ??= u; });

    // Build the strip: shuffled participants repeated, winner fixed at winnerIdx (never next to itself)
    const base = shuffle(players);
    const strip = Array.from({ length: L.total }, (_, i) => base[i % base.length]);
    strip[L.winnerIdx] = winner;
    if (base.length > 1) {
      const others = base.filter((u) => u !== winner);
      [L.winnerIdx - 1, L.winnerIdx + 1].forEach((i) => {
        if (strip[i] === winner) strip[i] = others[Math.floor(Math.random() * others.length)];
      });
    }

    await preloadAvatars(strip);

    pista.innerHTML = strip.map((u, i) => cardHTML(u, i)).join('');
    pista.classList.add('sin-transicion');
    pista.style.transform = 'translateY(0px)';
    void pista.offsetHeight;

    const wasHidden = stage.classList.contains('idle');
    stage.classList.remove('idle');
    Sfx.ensure();
    if (wasHidden && IN_OBS) await new Promise((r) => setTimeout(r, 450)); // let the fade-in finish

    // CS2 Near-Miss suspense offset: stops near the upper or lower edge of the winning card (±38% of cardH)
    const nearMissSign = Math.random() < 0.5 ? -1 : 1;
    const nearMissMag = 0.22 + Math.random() * 0.16;
    const jitter = nearMissSign * nearMissMag * L.cardH;
    const distance = L.winnerIdx * L.stride + jitter;

    pista.classList.remove('sin-transicion');
    pista.style.transitionDuration = `${L.spinMs}ms`;
    let finished = false;
    const finish = () => { if (finished) return; finished = true; reveal(winner); };
    pista.addEventListener('transitionend', (ev) => { if (ev.propertyName === 'transform') finish(); });
    setTimeout(finish, L.spinMs + 500);   // safety net if transitionend never fires

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
    const display = displayNames[winner] ?? winner;
    const formattedWinner = display.startsWith('@') ? display : `@${display}`;

    // T+0 : impact directly on the winner card in the center + DecryptedText reveal on card
    Sfx.thud(0);
    flash.classList.remove('go'); void flash.offsetWidth; flash.classList.add('go');
    ruleta.classList.remove('shake'); void ruleta.offsetWidth; ruleta.classList.add('shake');
    pista.classList.add('revealed');
    stage.classList.add('revealed');
    card?.classList.add('ganadora');
    const cardNameEl = card?.querySelector('.nombre');
    if (cardNameEl) {
      decryptTextReveal(cardNameEl, formattedWinner, 620);
    }

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

    // T+0.35 : victory fanfare + confetti cannons + SYNCHRONIZED ON-SCREEN WINNER MODAL with DecryptedText
    Sfx.fanfare(0.35);
    Sfx.sparkle(0.45);
    setTimeout(() => {
      cannons();
      const modal = $('#resultModal');
      const resName = $('#resultName');
      const resAvatar = $('#resultAvatar');
      const resInitials = $('#resultAvatarInitials');
      if (modal && resName) {
        decryptTextReveal(resName, formattedWinner, 680);
        if (avatars[winner]) {
          resAvatar.src = avatars[winner];
          resAvatar.style.display = 'block';
          resInitials.style.display = 'none';
        } else {
          resAvatar.style.display = 'none';
          resInitials.style.display = 'flex';
          resInitials.textContent = display.slice(0, 2).toUpperCase();
        }
        modal.classList.remove('oculto');
      }

      // Broadcast synchronized event to external systems / chat overlays
      try {
        const bc = new BroadcastChannel('hunthub_draws');
        bc.postMessage({ type: 'WINNER_REVEALED', winner, display, timestamp: Date.now() });
      } catch (e) {}
    }, 350);

    // T+0.85 : gold coin shower
    Sfx.coins(0.85);
    setTimeout(() => {
      coinShower();
    }, 850);

    // Hold, then return to standby
    hideTimer = setTimeout(leave, CFG.holdMs);
  }

  function leave() {
    stage.classList.remove('revealed');
    pista.classList.remove('revealed');
    if (AUTOHIDE) stage.classList.add('idle');
    setTimeout(() => {
      resetReveal();
      showStandby();
      busy = false;
      setButtons(true);
    }, 650);
  }

  /* ---------------- Confetti ---------------- */
  function cannons() {
    if (typeof confetti !== 'function') return;
    const common = { colors: GOLDS.concat(RAREZAS), startVelocity: 62, gravity: 0.9, ticks: 220, zIndex: 50 };
    confetti({ ...common, particleCount: 90, angle: 60, spread: 62, origin: { x: 0, y: 0.75 } });
    confetti({ ...common, particleCount: 90, angle: 120, spread: 62, origin: { x: 1, y: 0.75 } });
    confetti({ ...common, particleCount: 140, spread: 110, startVelocity: 48, origin: { x: 0.5, y: 0.5 } });
  }

  function coinShower() {
    if (typeof confetti !== 'function') return;
    let shapes;
    try {
      shapes = [confetti.shapeFromText({ text: '💰', scalar: 2 }), confetti.shapeFromText({ text: '⭐', scalar: 2 })];
    } catch (e) { shapes = undefined; }
    confetti({
      particleCount: 36, spread: 150, origin: { x: 0.5, y: -0.1 }, gravity: 0.75, startVelocity: 22,
      ticks: 300, scalar: 2.2, zIndex: 50, ...(shapes ? { shapes } : { colors: GOLDS })
    });
    const end = Date.now() + 1800;
    (function stream() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: GOLDS, zIndex: 50 });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: GOLDS, zIndex: 50 });
      if (Date.now() < end) requestAnimationFrame(stream);
    })();
  }

  /* ============================================================
     Streamer.bot connection
     ============================================================ */
  function extractPayload(msg) {
    if (!msg) return null;
    if (typeof msg === 'string') {
      try { msg = JSON.parse(msg); } catch (e) { return null; }
    }
    if (typeof msg !== 'object') return null;

    if (msg.evento === 'sorteo') return msg;                     // CPH.WebsocketBroadcastJson
    if (msg.sorteoPayload) {
      try {
        const o = typeof msg.sorteoPayload === 'string' ? JSON.parse(msg.sorteoPayload) : msg.sorteoPayload;
        if (o?.evento === 'sorteo') return o;
      } catch (e) {}
    }

    const d = msg.data || msg.args || msg.arguments;
    if (d && typeof d === 'object') {                            // Wrapped event via CPH.TriggerEvent
      for (const c of [d, d.data, d.args, d.arguments]) {
        if (!c || typeof c !== 'object') continue;
        if (c.evento === 'sorteo') return c;
        if (c.sorteoPayload) {
          try {
            const o = typeof c.sorteoPayload === 'string' ? JSON.parse(c.sorteoPayload) : c.sorteoPayload;
            if (o?.evento === 'sorteo') return o;
          } catch (e) {}
        }
      }
    }
    return null;
  }

  function onMessage(msg) {
    if (!msg) return;
    if (typeof msg === 'string') {
      try { msg = JSON.parse(msg); } catch (e) { return; }
    }

    // Check if it's real-time chatter activity broadcast
    if (msg.evento === 'chatter_activo' || msg.data?.evento === 'chatter_activo') {
      const c = msg.evento === 'chatter_activo' ? msg : msg.data;
      registerActiveChatter(c.login, c.display, c.avatar, c.ts || Date.now());
      return;
    }

    const p = extractPayload(msg);
    if (!p) return;
    if (p.id !== undefined) {
      if (seenIds.has(p.id)) { dbg('Duplicate payload ignored', p.id); return; }
      seenIds.add(p.id);
    }
    dbg('Draw payload received', p);
    setButtons(false);
    startDraw(p);
  }

  function findUrl(obj, depth = 0) {
    if (!obj || typeof obj !== 'object' || depth > 2) return '';
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'string' && /^https?:\/\//.test(v) && /avatar|picture|profile|image|photo/i.test(k)) return v;
      if (v && typeof v === 'object') { const r = findUrl(v, depth + 1); if (r) return r; }
    }
    return '';
  }

  // Harvest chat events into live wheel cards and avatar cache
  function harvestChat(data) {
    // 1. Organic content check: filter out emote spammers
    const rawMsg = data?.message?.message || data?.message?.content || data?.message || data?.rawInput || '';
    if (typeof rawMsg === 'string' && rawMsg.length > 0) {
      // Strip all Kick emotes :name:
      const stripped = rawMsg.replace(/:[a-zA-Z0-9_\-]+:/g, ' ').replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '');
      if (stripped.length < 2) {
        // Discard emote spammer to keep chatter pool 100% organic
        return;
      }
    }

    const u = data?.user || data?.sender || data?.message?.sender || data?.message?.user || {};
    const login = String(u.login || u.userName || u.username || u.name || '').toLowerCase();
    if (!login) return;
    const display = u.display || u.displayName || u.name || login;
    const url = findUrl(u);
    registerActiveChatter(login, display, url, Date.now());
  }

  function connectDirectWs() {
    try {
      const url = `ws://${CFG.host}:${CFG.port}${CFG.endpoint}`;
      const ws = new WebSocket(url);
      directWs = ws;
      ws.onopen = () => {
        dbg('Direct native WebSocket connected to', url);
        setStatus('● Connected to Streamer.bot', '#00e676');
        if (IN_OBS && !DEBUG) estadoEl.classList.add('oculto');
      };
      ws.onmessage = (ev) => {
        try {
          const parsed = JSON.parse(ev.data);
          onMessage(parsed);
        } catch (e) {}
      };
      ws.onclose = () => {
        setTimeout(connectDirectWs, 2500);
      };
      ws.onerror = () => {};
    } catch (e) {}
  }

  async function syncInitialChatters() {
    if (!client || !connected) return;
    try {
      const res = await client.getGlobal('sorteoActivosRaw', false);
      if (res && res.variable && typeof res.variable.value === 'string') {
        const raw = res.variable.value;
        const now = Date.now();
        raw.split('\n').forEach((line) => {
          const parts = line.split('\t');
          if (parts.length >= 3) {
            const login = parts[0].trim();
            const ts = parseInt(parts[1], 10) || now;
            const display = parts[2];
            const avatar = parts[3] || '';
            registerActiveChatter(login, display, avatar, ts);
          }
        });
      }
    } catch (e) {
      dbg('Could not sync initial chatters:', e);
    }
  }

  function connect() {
    // 1. Direct native WebSocket (zero handshake, 0ms latency for CPH.WebsocketBroadcastJson)
    connectDirectWs();

    // 2. StreamerbotClient for subscriptions, events, and RPC
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
        syncInitialChatters();
      },
      onDisconnect: () => {
        connected = false;
        if (!IN_OBS || DEBUG) {
          estadoEl.style.opacity = '1';
          setStatus('○ Reconnecting to Streamer.bot…', '#ffb700');
        }
      },
      onError: (err) => console.warn('[Giveaway] WebSocket error:', err)
    });

    client.on('General.Custom', (evt) => onMessage(evt));
    client.on('Custom.Event', (evt) => onMessage(evt));
    client.on('Custom.CodeEvent', (evt) => onMessage(evt));
    client.on('Raw.Action', (evt) => onMessage(evt));
    client.on('Kick.ChatMessage', ({ data }) => harvestChat(data));

    // Periodic prune of inactive chatters every 15s to keep standby fresh
    setInterval(() => {
      if (!busy) updateStandbyWithRealChatters();
    }, 15000);

    // Connect to HuntHub Core WebSocket hub (ws://127.0.0.1:3001) with auto-reconnect for OBS Browser Source
    function connectHubWs() {
      try {
        const hubPort = params.get('hubPort') || '3001';
        const hubHost = window.location.hostname || '127.0.0.1';
        hubWs = new WebSocket(`ws://${hubHost}:${hubPort}`);
        hubWs.onmessage = (ev) => {
          try {
            const payload = JSON.parse(ev.data);
            if (payload.action === 'spin_csgo' || payload.type === 'csgo_spin') {
              if (payload.demo) localDemo(payload.winner);
              else localDemo(payload.winner);
              return;
            }
            onMessage(payload);
          } catch {}
        };
        hubWs.onopen = () => {
          if (!connected) setStatus('● Connected to HuntHub Core (ws://127.0.0.1:3001)', '#00e676');
        };
        hubWs.onclose = () => {
          setTimeout(connectHubWs, 2500);
        };
        hubWs.onerror = () => {};
      } catch {}
    }
    connectHubWs();

    // Cross-process HTTP /api/sync/state fallback for OBS Browser Source
    let lastSyncedEventTs = 0;
    setInterval(async () => {
      try {
        const res = await fetch('http://127.0.0.1:3001/api/sync/state');
        if (!res.ok) return;
        const data = await res.json();
        const evt = data?.overlays?.lastOverlayEvent;
        if (evt && evt.ts && evt.ts > lastSyncedEventTs) {
          lastSyncedEventTs = evt.ts;
          if (evt.targetOverlay === 'wheel-csgo') {
            localDemo(evt.winner);
          }
        }
      } catch {}
    }, 1500);
  }

  /* ---------------- Buttons (preview / OBS interact only) ---------------- */
  function setButtons(enabled) {
    if (btnPick) btnPick.disabled = !enabled;
    if (btnDemo) btnDemo.disabled = !enabled;
  }

  function localDemo(forcedWinner) {
    const names = ['LuckyChatter', 'VegasPro', 'SpinKing', 'JackpotAce', 'Strike777', 'SlotMaster', 'DiamondKing', 'NeonWolf', 'RoyalFlush', 'BigBassBob'];
    if (forcedWinner && !names.some((n) => n.toLowerCase() === String(forcedWinner).toLowerCase())) {
      names.push(String(forcedWinner));
    }
    const logins = names.map((n) => n.toLowerCase());
    const nombres = Object.fromEntries(names.map((n) => [n.toLowerCase(), n]));
    const winLogin = forcedWinner ? String(forcedWinner).toLowerCase() : logins[Math.floor(Math.random() * logins.length)];
    onMessage({ evento: 'sorteo', id: 'local-' + Date.now(), demo: true, participantes: logins, ganador: winLogin, nombres, avatares: {} });
  }

  async function trigger(demo, forcedWinner) {
    Sfx.ensure();    // button click = user gesture, unlocks audio in normal browsers
    if (busy) return;
    if (!connected) {
      localDemo(forcedWinner);
      return;
    }
    try {
      const res = await client.doAction({ name: CFG.actionName }, demo ? { demo: true } : {});
      if (res && res.status && res.status !== 'ok') throw new Error(res.error || res.status);
      setStatus(demo ? '● Demo requested' : '● Draw requested', '#00e676');
    } catch (e) {
      setStatus(`✖ Action "${CFG.actionName}" failed — import giveaway-csgo-1.0.7.sb (${e.message || e})`, '#ff5252');
      localDemo(forcedWinner);
    }
  }

  btnPick?.addEventListener('click', () => trigger(false));
  btnDemo?.addEventListener('click', () => trigger(true));
  document.body.addEventListener('pointerdown', () => Sfx.ensure(), { once: true });

  // Console helper for quick tests
  window.testGiveaway = localDemo;

  // BroadcastChannel listener (inter-tab communication between control deck & overlay)
  try {
    const bus = new BroadcastChannel('giveaway_bus');
    bus.onmessage = (ev) => {
      if (ev.data?.type === 'test_spin') localDemo(ev.data?.winner);
      else if (ev.data?.type === 'spin') trigger(false, ev.data?.winner);
    };
  } catch (e) {}

  /* ---------------- Startup ---------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      showStandby();
      connect();
    });
  } else {
    showStandby();
    connect();
  }
})();
