/**
 * HuntHub — Provably Fair Cryptographic Engine (HMAC-SHA256)
 * Uses native Web Crypto API (crypto.subtle) — 100% auditable and tamper-proof.
 */
class ProvablyFairEngine {
  constructor() {
    this.serverSeed = this.loadOrGenerateServerSeed();
    this.clientSeed = localStorage.getItem('hunthub_client_seed') || 'kick_diggitybets_session';
    this.nonce = parseInt(localStorage.getItem('hunthub_nonce') || '1', 10);
    this.serverSeedHash = '';
    this.updateServerSeedHash();
  }

  loadOrGenerateServerSeed() {
    let seed = localStorage.getItem('hunthub_server_seed');
    if (!seed || seed.length < 32) {
      const arr = new Uint8Array(32);
      crypto.getRandomValues(arr);
      seed = Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
      localStorage.setItem('hunthub_server_seed', seed);
    }
    return seed;
  }

  async updateServerSeedHash() {
    this.serverSeedHash = await this.sha256(this.serverSeed);
    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('hunthub:seeds-updated', {
        detail: {
          serverSeedHash: this.serverSeedHash,
          clientSeed: this.clientSeed,
          nonce: this.nonce
        }
      }));
    }
  }

  setClientSeed(newSeed) {
    if (newSeed && newSeed.trim()) {
      this.clientSeed = newSeed.trim();
      localStorage.setItem('hunthub_client_seed', this.clientSeed);
      this.updateServerSeedHash();
    }
  }

  async sha256(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer), b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Generates HMAC-SHA256(serverSeed, `${clientSeed}:${nonce}`)
   */
  async generateRoundHash(serverSeed = this.serverSeed, clientSeed = this.clientSeed, nonce = this.nonce) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(serverSeed);
    const msgData = encoder.encode(`${clientSeed}:${nonce}`);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
    return Array.from(new Uint8Array(signature), b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Advances nonce after a finished round
   */
  nextNonce() {
    this.nonce += 1;
    localStorage.setItem('hunthub_nonce', this.nonce.toString());
    this.updateServerSeedHash();
  }

  /**
   * Convert hash to floating point number [0, 1)
   */
  hashToFloat(hexHash) {
    // Read first 8 hex characters (32-bit unsigned int)
    const intVal = parseInt(hexHash.substring(0, 8), 16);
    return intVal / 0x100000000;
  }

  /**
   * European Roulette: Outcome in [0..36]
   */
  getRouletteOutcome(hexHash) {
    const float = this.hashToFloat(hexHash);
    return Math.floor(float * 37);
  }

  /**
   * Plinko: Path of binary directions (0=Left, 1=Right) across rows
   */
  getPlinkoPath(hexHash, rows = 10) {
    const path = [];
    let finalBin = 0;
    for (let i = 0; i < rows; i++) {
      const byte = parseInt(hexHash.substr(i * 2, 2), 16);
      const dir = byte % 2;
      path.push(dir);
      finalBin += dir;
    }
    return { path, finalBin };
  }

  /**
   * Top Dollar Slot: 3 Reel symbols
   */
  getSlotReels(hexHash) {
    // Symbols pool: [Cherry, Bar1, Bar2, Bar3, Seven, Diamond, TopDollar]
    const symbols = ['CHERRY', 'BAR', '2BAR', '3BAR', 'SEVEN', 'DIAMOND', 'TOP_DOLLAR'];
    const reel1 = parseInt(hexHash.substring(0, 4), 16) % symbols.length;
    const reel2 = parseInt(hexHash.substring(4, 8), 16) % symbols.length;
    const reel3 = parseInt(hexHash.substring(8, 12), 16) % symbols.length;
    return [symbols[reel1], symbols[reel2], symbols[reel3]];
  }

  /**
   * Stake Dice: Roll between 0.00 and 100.00
   */
  getDiceRoll(hexHash) {
    const float = this.hashToFloat(hexHash);
    return parseFloat((float * 100).toFixed(2));
  }

  /**
   * Stake Mines: 25 tiles grid with placed mines
   */
  getMinesGrid(hexHash, mineCount = 3) {
    const tiles = Array.from({ length: 25 }, (_, i) => ({ id: i, isMine: false }));
    const indices = Array.from({ length: 25 }, (_, i) => i);
    let offset = 0;
    for (let i = indices.length - 1; i > 0; i--) {
      const chunk = hexHash.substr(offset % (hexHash.length - 4), 4);
      offset += 4;
      const rand = parseInt(chunk, 16) / 0x10000;
      const j = Math.floor(rand * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    for (let m = 0; m < mineCount; m++) {
      tiles[indices[m]].isMine = true;
    }
    return tiles;
  }

  /**
   * Blackjack: Shuffled deck of 52 cards (0..51)
   */
  getShuffledDeck(hexHash) {
    const deck = Array.from({ length: 52 }, (_, i) => i);
    let offset = 0;
    for (let i = deck.length - 1; i > 0; i--) {
      const chunk = hexHash.substr(offset % (hexHash.length - 4), 4);
      offset += 4;
      const rand = parseInt(chunk, 16) / 0x10000;
      const j = Math.floor(rand * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  /**
   * Stake Crash: Multiplier from 1.00x upwards (5% house edge = 95.00% RTP)
   */
  getCrashMultiplier(hexHash) {
    const float = this.hashToFloat(hexHash);
    if (float < 0.05) return 1.00;
    const crashPoint = Math.floor((0.95 / (1.0 - float)) * 100) / 100;
    return Math.max(1.00, Math.min(crashPoint, 1000.00));
  }

  /**
   * Stake Limbo: Multiplier from 1.01x up to 1,000,000.00x (5% house edge = 95.00% RTP)
   * Formula: Floor(0.95 / float * 100) / 100
   */
  getLimboMultiplier(hexHash) {
    const float = this.hashToFloat(hexHash);
    if (float <= 0.00000095) return 1000000.00;
    const mult = Math.floor((0.95 / float) * 100) / 100;
    return Math.max(1.00, Math.min(mult, 1000000.00));
  }

  /**
   * Stake Seed Rotation: Reveals previous server seed, generates new active seed, resets nonce
   */
  async rotateSeedPair(newClientSeed = null) {
    const oldServerSeed = this.serverSeed;
    localStorage.setItem('hunthub_prev_server_seed', oldServerSeed);

    // Generate fresh 32-byte server seed
    const arr = new Uint8Array(32);
    crypto.getRandomValues(arr);
    this.serverSeed = Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
    localStorage.setItem('hunthub_server_seed', this.serverSeed);

    if (newClientSeed && newClientSeed.trim()) {
      this.clientSeed = newClientSeed.trim();
      localStorage.setItem('hunthub_client_seed', this.clientSeed);
    }

    this.nonce = 0;
    localStorage.setItem('hunthub_nonce', '0');
    await this.updateServerSeedHash();

    return {
      revealedServerSeed: oldServerSeed,
      newServerSeedHash: this.serverSeedHash,
      clientSeed: this.clientSeed,
      nonce: 0
    };
  }

  generateRandomClientSeed() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    const arr = new Uint8Array(14);
    crypto.getRandomValues(arr);
    for (let i = 0; i < 14; i++) {
      res += chars[arr[i] % chars.length];
    }
    return res;
  }
}

window.pfEngine = new ProvablyFairEngine();
