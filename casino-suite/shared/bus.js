/* ============================================================
   CASINO SUITE — Realtime State Bus & WebSocket Bridge
   Dual Synchronization:
     1. Local BroadcastChannel ('casino_suite_bus') for 0ms tab-to-tab sync
     2. Streamer.bot WebSocket (127.0.0.1:8080) for Kick chat events
   ============================================================ */

class CasinoEventBus {
  constructor() {
    this.channel = new BroadcastChannel('casino_suite_bus');
    this.listeners = new Map();
    this.wsClient = null;

    // Listen to local inter-tab messages (Admin Panel -> Overlays)
    this.channel.onmessage = (ev) => {
      const { type, payload } = ev.data || {};
      this.dispatch(type, payload);
    };

    // Auto-connect to Streamer.bot WebSocket if StreamerbotClient is loaded
    this.initStreamerbot();
  }

  initStreamerbot(host = '127.0.0.1', port = 8080, password = '') {
    if (typeof StreamerbotClient === 'undefined') return;

    try {
      this.wsClient = new StreamerbotClient({
        host,
        port,
        password: password || undefined,
        autoReconnect: true,
        retries: -1,
        onConnect: () => {
          console.log('[CasinoBus] Connected to Streamer.bot WebSocket');
          this.dispatch('ws:connected', true);
        },
        onDisconnect: () => {
          console.warn('[CasinoBus] Disconnected from Streamer.bot WebSocket');
          this.dispatch('ws:disconnected', false);
        }
      });

      // Listen for Streamer.bot custom events
      this.wsClient.on('General.Custom', ({ data }) => {
        if (data?.casinoEvent) {
          this.emit(data.casinoEvent, data.payload || data);
        }
      });

      // Listen for Kick chat messages (for commands !guess, !vote, etc.)
      this.wsClient.on('Kick.ChatMessage', ({ data }) => {
        const text = data?.message?.message || data?.content || '';
        const user = data?.user?.userName || data?.sender?.username || 'Viewer';
        const avatar = data?.user?.profilePicture || data?.sender?.profile_picture || null;

        if (text.startsWith('!')) {
          this.dispatch('kick:command', { command: text.trim(), user, avatar });
        }
      });
    } catch (e) {
      console.warn('[CasinoBus] Streamer.bot client error:', e);
    }
  }

  // Subscribe to an event
  on(type, callback) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type).push(callback);
  }

  // Dispatch locally
  dispatch(type, payload) {
    const list = this.listeners.get(type) || [];
    list.forEach((cb) => {
      try { cb(payload); } catch (e) { console.error(e); }
    });
  }

  // Broadcast to all tabs/windows and locally
  emit(type, payload) {
    this.channel.postMessage({ type, payload });
    this.dispatch(type, payload);
  }

  // Persisted state helper
  getState(key, defaultVal) {
    try {
      const v = localStorage.getItem('casino_' + key);
      return v ? JSON.parse(v) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  setState(key, val) {
    try {
      localStorage.setItem('casino_' + key, JSON.stringify(val));
    } catch (e) {}
  }
}

window.CasinoBus = new CasinoEventBus();
