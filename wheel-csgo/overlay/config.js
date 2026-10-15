/* Shared settings for the roulette overlay (index.html) and the control panel (control.html). */
window.GIVEAWAY_CONFIG = {
  host: '127.0.0.1',
  port: 8080,
  endpoint: '/',
  password: '',               // only if you enable authentication in Streamer.bot > Servers/Clients > WebSocket Server
  actionName: 'Giveaway_CSGO',// name of the Streamer.bot action that picks the winner
  holdMs: 9500,               // how long the winner banner stays on screen
  volume: 0.8                 // 0..1 (can be overridden with ?vol=0.5 in the URL, or ?mute=1)
};
