/**
 * HuntHub — Slot Tiers & Provider Boost Engine
 * =============================================================================
 * Implements weighted probability distribution for slot selections across:
 * - Wheel CS:GO / Duo-Wheel
 * - Random Slot Wheel
 * - Community Bonus Hunt
 *
 * Boosts recognized top providers of "Only on Stake":
 * 1. Pragmatic Play
 * 2. Hacksaw Gaming
 * 3. Paperclip Gaming
 * 4. Pocket Play
 * 5. Blackout Studios / Blackout Interactive
 * 6. Colorful Play
 * 7. Valkyrie / Valkyrie Studio
 * 8. Titan Gaming
 * 9. Donut Gaming
 * 10. Creative City
 * 11. Terminal Games
 * 12. Black Coffee Studios
 * 13. AvatarUX
 * 14. Phantom Interactive
 * 15. Uppercut Gaming
 * 16. Hyper Play
 * =============================================================================
 */

(() => {
  'use strict';

  // 16 recognized top providers requested by streamer
  const RECOGNIZED_PROVIDERS = [
    { id: 'pragmatic', name: 'Pragmatic Play', pattern: /pragmatic/i, tier: '1', boost: 2.0 },
    { id: 'hacksaw', name: 'Hacksaw Gaming', pattern: /hacksaw/i, tier: '1', boost: 2.0 },
    { id: 'valkyrie', name: 'Valkyrie', pattern: /valkyrie/i, tier: '1', boost: 1.8 },
    { id: 'paperclip', name: 'Paperclip Gaming', pattern: /paperclip/i, tier: '2', boost: 1.5 },
    { id: 'pocket_play', name: 'Pocket Play', pattern: /pocket\s*play/i, tier: '2', boost: 1.5 },
    { id: 'blackout', name: 'Blackout Studios', pattern: /blackout/i, tier: '2', boost: 1.5 },
    { id: 'colorful_play', name: 'Colorful Play', pattern: /colorful\s*play/i, tier: '2', boost: 1.5 },
    { id: 'titan', name: 'Titan Gaming', pattern: /titan/i, tier: '2', boost: 1.5 },
    { id: 'donut', name: 'Donut Gaming', pattern: /donut/i, tier: '2', boost: 1.5 },
    { id: 'creative_city', name: 'Creative City', pattern: /creative\s*city/i, tier: '2', boost: 1.5 },
    { id: 'terminal', name: 'Terminal Games', pattern: /terminal/i, tier: '2', boost: 1.5 },
    { id: 'black_coffee', name: 'Black Coffee Studios', pattern: /black\s*coffee/i, tier: '2', boost: 1.5 },
    { id: 'avatarux', name: 'AvatarUX', pattern: /avatar\s*ux/i, tier: '2', boost: 1.5 },
    { id: 'phantom', name: 'Phantom Interactive', pattern: /phantom/i, tier: '2', boost: 1.5 },
    { id: 'uppercut', name: 'Uppercut Gaming', pattern: /uppercut/i, tier: '2', boost: 1.5 },
    { id: 'hyper_play', name: 'Hyper Play', pattern: /hyper\s*play/i, tier: '2', boost: 1.5 },
    { id: 'cipher_games', name: 'Cipher Games', pattern: /cipher(\s*games)?/i, tier: '2', boost: 1.5 },
    { id: 'meta_gaming', name: 'Meta Gaming', pattern: /meta\s*gaming/i, tier: '2', boost: 1.5 },
    { id: 'nolimit', name: 'Nolimit City', pattern: /nolimit|no\s*limit/i, tier: '1', boost: 1.8 }
  ];

  // Iconic flagships that streamers and viewers love seeing (Tier 1 Flagship bonus)
  const ICONIC_FLAGSHIP_PATTERNS = [
    /wanted dead or a wild/i, /le bandit/i, /gates of olympus/i, /sweet bonanza/i,
    /sugar rush/i, /big bass/i, /san quentin/i, /mental/i, /tombstone/i,
    /waylanders forge/i, /odin'?s vault/i, /sharks!/i, /ganja snail/i,
    /fist of destruction/i, /chaos crew/i, /rip city/i, /dork unit/i,
    /starlight princess/i, /the dog house/i, /sixsixsix/i, /2 wild 2 die/i
  ];

  // Base tier weights
  const TIER_WEIGHTS = {
    '1': 5.0,  // Flagships / Ultra-popular (top 5x multiplier)
    '2': 3.0,  // Recognized "Only on Stake" top 16 providers (3x multiplier)
    '3': 1.0   // Standard / Niche / Indie providers (1x baseline)
  };

  /**
   * Determine Tier and Weight for any slot object
   * @param {Object} slot - { name, provider, ... }
   * @returns {{ tier: string, weight: number, isRecognized: boolean }}
   */
  function evaluateSlotTier(slot) {
    if (!slot) return { tier: '3', weight: 1.0, isRecognized: false };

    const name = String(slot.name || '').trim();
    const provider = String(slot.provider || '').trim();

    // Check iconic flagships first
    const isFlagship = ICONIC_FLAGSHIP_PATTERNS.some(p => p.test(name));
    if (isFlagship) {
      return { tier: '1', weight: TIER_WEIGHTS['1'] * 1.25, isRecognized: true }; // 6.25 weight
    }

    // Check recognized providers
    const matchedProvider = RECOGNIZED_PROVIDERS.find(rp => rp.pattern.test(provider) || rp.pattern.test(name));
    if (matchedProvider) {
      const base = TIER_WEIGHTS[matchedProvider.tier] || 3.0;
      return {
        tier: matchedProvider.tier,
        weight: base * (matchedProvider.boost || 1.0),
        isRecognized: true
      };
    }

    // Standard provider
    return { tier: '3', weight: TIER_WEIGHTS['3'], isRecognized: false };
  }

  /**
   * Cryptographically secure weighted selection
   * @param {Array<Object>} pool - Array of slot objects
   * @param {Object} [filter] - Optional category or provider filter
   * @returns {Object} Selected slot
   */
  function pickWeightedSlot(pool, filter = {}) {
    if (!Array.isArray(pool) || pool.length === 0) return null;

    let candidates = pool;

    if (filter.category && filter.category !== 'all') {
      const cat = filter.category.toLowerCase();
      candidates = candidates.filter(s => (s.category || '').toLowerCase() === cat);
    }
    if (filter.provider) {
      const prov = filter.provider.toLowerCase();
      candidates = candidates.filter(s => (s.provider || '').toLowerCase().includes(prov));
    }
    if (filter.tier) {
      candidates = candidates.filter(s => String(s.tier) === String(filter.tier));
    }

    if (candidates.length === 0) candidates = pool;

    // Calculate total weights
    let totalWeight = 0;
    const weights = new Float64Array(candidates.length);
    for (let i = 0; i < candidates.length; i++) {
      const s = candidates[i];
      let w = typeof s.weight === 'number' ? s.weight : evaluateSlotTier(s).weight;
      weights[i] = w;
      totalWeight += w;
    }

    if (totalWeight <= 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }

    // Random roll in [0, totalWeight)
    let rnd;
    try {
      const cryptoObj = (typeof window !== 'undefined' && window.crypto) ? window.crypto : (typeof globalThis !== 'undefined' && globalThis.crypto ? globalThis.crypto : null);
      if (cryptoObj && cryptoObj.getRandomValues) {
        const buf = new Uint32Array(1);
        cryptoObj.getRandomValues(buf);
        rnd = (buf[0] / 0x100000000) * totalWeight;
      } else {
        rnd = Math.random() * totalWeight;
      }
    } catch (e) {
      rnd = Math.random() * totalWeight;
    }

    let running = 0;
    for (let i = 0; i < candidates.length; i++) {
      running += weights[i];
      if (rnd < running) {
        return candidates[i];
      }
    }

    return candidates[candidates.length - 1];
  }

  const SlotTiers = {
    RECOGNIZED_PROVIDERS,
    TIER_WEIGHTS,
    evaluateSlotTier,
    pickWeightedSlot
  };

  if (typeof window !== 'undefined') {
    window.SLOT_TIERS = SlotTiers;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = SlotTiers;
  }
})();
