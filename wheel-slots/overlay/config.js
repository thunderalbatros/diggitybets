/* Shared settings for the Slot Roulette overlay (index.html) and control panel (control.html). */
window.SLOT_WHEEL_CONFIG = {
  host: '127.0.0.1',
  port: 8080,
  endpoint: '/',
  password: '',                 // only if you enable authentication in Streamer.bot WebSocket Server
  actionName: 'RandomSlot_Picker', // name of the Streamer.bot action that picks the slot
  holdMs: 9500,                 // how long the winning slot card stays on screen
  volume: 0.8                   // 0..1 master sound volume (can be overridden with ?vol=0.5 or ?mute=1)
};
