/**
 * HuntHub — Unified Canonical Slot Resolver (Frontend & OBS Overlays)
 * Ensures 100% accurate slot name <-> verified image matching across:
 * - Public Site (index.html, #tourney-koth-panel, #tournament, #bonushunt)
 * - Admin Panel (#admin Hub)
 * - OBS Overlays (/overlay-battle/, /overlay-tourney/, /overlay-bonushunt/, /wheel-duo/)
 */
(function(global) {
  'use strict';

  var DEFAULT_FALLBACK_IMAGE = 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format';

  // Flagship Curated Slots (Always ready in memory)
  var CURATED_SLOTS = [
    {
      id: 'wanted-dead-or-a-wild',
      name: 'Wanted Dead or a Wild',
      slug: 'wanted-dead-or-a-wild',
      provider: 'Hacksaw Gaming',
      image: 'https://mediumrare.imgix.net/8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299?w=180&h=236&fit=min&auto=format',
      maxWin: '12,500x',
      rtp: '96.38%',
      tier: '1',
      category: 'hacksaw',
      badge: 'HACKSAW',
      color: '#ff5722'
    },
    {
      id: 'gates-of-olympus-1000',
      name: 'Gates of Olympus 1000',
      slug: 'gates-of-olympus-1000',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/1ea93a0279a9ebc0e3a6288899532b27dbfc60a0f4a8e2cb924c5539ebf85eb3?w=180&h=236&fit=min&auto=format',
      maxWin: '15,000x',
      rtp: '96.50%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'gates-of-olympus',
      name: 'Gates of Olympus',
      slug: 'gates-of-olympus',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/8b11c97a78ef3a7cfbe3a49257bbdf9360cb4be258b3506927da8fa8c028a25c?w=180&h=236&fit=min&auto=format',
      maxWin: '5,000x',
      rtp: '96.50%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'sweet-bonanza-1000',
      name: 'Sweet Bonanza 1000',
      slug: 'sweet-bonanza-1000',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/2be43834316fa71dc75a5960ce01783f98292f9d854e4881f215099fbcfe327c?w=180&h=236&fit=min&auto=format',
      maxWin: '25,000x',
      rtp: '96.53%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'sweet-bonanza',
      name: 'Sweet Bonanza',
      slug: 'sweet-bonanza',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/4ef4fc019e0839e144a1fa429813c9a6df27a00f2e82cf594d2ba7cb5b5c92c8?w=180&h=236&fit=min&auto=format',
      maxWin: '21,100x',
      rtp: '96.48%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'sugar-rush-1000',
      name: 'Sugar Rush 1000',
      slug: 'sugar-rush-1000',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/5d6f6e8e0d6b0b5711c2adad4f3914a38f714eb6c0c55f84eb430e3bb4a3ba45?w=180&h=236&fit=min&auto=format',
      maxWin: '25,000x',
      rtp: '96.53%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'sugar-rush',
      name: 'Sugar Rush',
      slug: 'sugar-rush',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/60b940989067b5e9f56475d4ff3db896942ad2f347960fa03892797e8bc6f827?w=180&h=236&fit=min&auto=format',
      maxWin: '5,000x',
      rtp: '96.50%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'le-bandit',
      name: 'Le Bandit',
      slug: 'le-bandit',
      provider: 'Hacksaw Gaming',
      image: 'https://mediumrare.imgix.net/dbb3f6630f9a76bc88bfd52a2307ef0cb1e6a3c42878c43026ad1607fa48b8ec?w=180&h=236&fit=min&auto=format',
      maxWin: '10,000x',
      rtp: '96.34%',
      tier: '1',
      category: 'hacksaw',
      badge: 'HACKSAW',
      color: '#ff5722'
    },
    {
      id: 'rip-city',
      name: 'RIP City',
      slug: 'rip-city',
      provider: 'Hacksaw Gaming',
      image: 'https://mediumrare.imgix.net/5a0c36b4ae9cbe588cf4ba27e57c661bb5ad4e85741f23ee9f3907c0879c3d4f?w=180&h=236&fit=min&auto=format',
      maxWin: '12,500x',
      rtp: '96.22%',
      tier: '1',
      category: 'hacksaw',
      badge: 'HACKSAW',
      color: '#ff5722'
    },
    {
      id: 'chaos-crew-2',
      name: 'Chaos Crew 2',
      slug: 'chaos-crew-2',
      provider: 'Hacksaw Gaming',
      image: 'https://mediumrare.imgix.net/41da24e4d5885fe77bc95f5108fb26d70ae4f3fec14781cfc9fa6a8e805fe9e3?w=180&h=236&fit=min&auto=format',
      maxWin: '20,000x',
      rtp: '96.27%',
      tier: '1',
      category: 'hacksaw',
      badge: 'HACKSAW',
      color: '#ff5722'
    },
    {
      id: 'san-quentin-xways',
      name: 'San Quentin xWays',
      slug: 'san-quentin-xways',
      provider: 'Nolimit City',
      image: 'https://fan-cdn.nolimitcity.com/trans_eba4744bd0.png',
      maxWin: '150,000x',
      rtp: '96.03%',
      tier: '1',
      category: 'nolimit',
      badge: 'NOLIMIT',
      color: '#e65100'
    },
    {
      id: 'mental',
      name: 'Mental',
      slug: 'mental',
      provider: 'Nolimit City',
      image: 'https://mediumrare.imgix.net/05cfbdfcf1c81cfd8c7602f3bb44781df5a48554fe4bf693c126581c8160408d?w=180&h=236&fit=min&auto=format',
      maxWin: '66,666x',
      rtp: '96.08%',
      tier: '1',
      category: 'nolimit',
      badge: 'NOLIMIT',
      color: '#e65100'
    },
    {
      id: 'tombstone-r-i-p',
      name: 'Tombstone R.I.P.',
      slug: 'tombstone-r-i-p',
      provider: 'Nolimit City',
      image: 'https://mediumrare.imgix.net/2e276f595fe36e4f3aa79d2ee37e7fe0b8f9e6129841808605eb8037a5e84606?w=180&h=236&fit=min&auto=format',
      maxWin: '300,000x',
      rtp: '96.08%',
      tier: '1',
      category: 'nolimit',
      badge: 'NOLIMIT',
      color: '#e65100'
    },
    {
      id: 'sharks',
      name: 'Sharks!',
      slug: 'sharks',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/09b89e85fd9d787d15b0fc1e8ae13693a5e8b83e600030e53cfb640c815d8ea1?w=180&h=236&fit=min&auto=format',
      maxWin: '10,000x',
      rtp: '96.51%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'big-bass-splash',
      name: 'Big Bass Splash',
      slug: 'big-bass-splash',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/dddf1cfdf8c991b5d638be0a599f66dc0dfbf813501cb6982f6e91f6ebf8b66f?w=180&h=236&fit=min&auto=format',
      maxWin: '5,000x',
      rtp: '96.71%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'the-dog-house-megaways',
      name: 'The Dog House Megaways',
      slug: 'the-dog-house-megaways',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/b404ad170f4cf54f3b60fc851b2fc5d2a931ca81bbd067e4367c3fe5848bb010?w=180&h=236&fit=min&auto=format',
      maxWin: '12,305x',
      rtp: '96.55%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'starlight-princess-1000',
      name: 'Starlight Princess 1000',
      slug: 'starlight-princess-1000',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/b0ec0c8c0bbab167f9d5059d43ad26f3329fc61da0c58a8a3a0ea2195f00e998?w=180&h=236&fit=min&auto=format',
      maxWin: '15,000x',
      rtp: '96.50%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'hand-of-anubis',
      name: 'Hand of Anubis',
      slug: 'hand-of-anubis',
      provider: 'Hacksaw Gaming',
      image: 'https://mediumrare.imgix.net/06a3501a30fcf214b98160fc976aa260a9f5d1797c23bc9eeaa1a97d8bcfdb92?w=180&h=236&fit=min&auto=format',
      maxWin: '10,000x',
      rtp: '96.24%',
      tier: '1',
      category: 'hacksaw',
      badge: 'HACKSAW',
      color: '#ff5722'
    },
    {
      id: 'dork-unit',
      name: 'Dork Unit',
      slug: 'dork-unit',
      provider: 'Hacksaw Gaming',
      image: 'https://mediumrare.imgix.net/14d8eb34c379a00e5720c29f63624e5a99e19d7d3d6666fa5a0f82c40c8fa907?w=180&h=236&fit=min&auto=format',
      maxWin: '10,000x',
      rtp: '96.24%',
      tier: '1',
      category: 'hacksaw',
      badge: 'HACKSAW',
      color: '#ff5722'
    },
    {
      id: 'fire-in-the-hole-2',
      name: 'Fire in the Hole 2',
      slug: 'fire-in-the-hole-2',
      provider: 'Nolimit City',
      image: 'https://mediumrare.imgix.net/c5ffbb9920155b991da40b490d1e345cb3f73ae08be6ecfa609d94944ec7ea72?w=180&h=236&fit=min&auto=format',
      maxWin: '65,000x',
      rtp: '96.07%',
      tier: '1',
      category: 'nolimit',
      badge: 'NOLIMIT',
      color: '#e65100'
    },
    {
      id: 'waylanders-forge',
      name: 'Waylanders Forge',
      slug: 'waylanders-forge',
      provider: 'Valkyrie Studio',
      image: 'https://mediumrare.imgix.net/7bee41634019f0eb07ba2b55388e79e3a0e0861047450b34d7075602f70520bf?w=180&h=236&fit=min&auto=format',
      maxWin: '25,000x',
      rtp: '98.00%',
      tier: '1',
      category: 'stake',
      badge: 'ONLY ON STAKE',
      color: '#ffd700'
    },
    {
      id: 'odins-vault',
      name: "Odin's Vault",
      slug: 'odins-vault',
      provider: 'Valkyrie Studio',
      image: 'https://mediumrare.imgix.net/bfd527bb6d54ad930db0fcfa2983dee64fd4b166bc75d0c71a4163a86440bd82?w=180&h=236&fit=min&auto=format',
      maxWin: '50,000x',
      rtp: '96.70%',
      tier: '1',
      category: 'stake',
      badge: 'ONLY ON STAKE',
      color: '#ffd700'
    },
    {
      id: 'blade-dance',
      name: 'Blade Dance',
      slug: 'blade-dance',
      provider: 'Phantom Interactive',
      image: 'https://mediumrare.imgix.net/f79cacc2d22d0e0c0b44a7b0bba4ec47254466e617fd256b1562288e87090994?w=180&h=236&fit=min&auto=format',
      maxWin: '25,000x',
      rtp: '96.50%',
      tier: '2',
      category: 'stake',
      badge: 'ONLY ON STAKE',
      color: '#ffd700'
    },
    {
      id: 'sky-drop',
      name: 'Sky Drop',
      slug: 'sky-drop',
      provider: 'Paperclip Gaming',
      image: 'https://mediumrare.imgix.net/88131cf4e6b71114aba9b27a711b0f17c073e5c3043b371d322aa3465bb04220?q=85',
      maxWin: '25,000x',
      rtp: '97.00%',
      tier: '2',
      category: 'stake',
      badge: 'ONLY ON STAKE',
      color: '#ffd700'
    },
    {
      id: 'ghost-rush',
      name: 'Ghost Rush',
      slug: 'ghost-rush',
      provider: 'Paperclip Gaming',
      image: 'https://mediumrare.imgix.net/742a1d7958a9ffa215e19cc72c684abe9412f71fcf426b57909b5b817f9cd9d4?q=85',
      maxWin: '25,000x',
      rtp: '96.30%',
      tier: '2',
      category: 'stake',
      badge: 'ONLY ON STAKE',
      color: '#ffd700'
    },
    {
      id: 'razor-returns',
      name: 'Razor Returns',
      slug: 'razor-returns',
      provider: 'Push Gaming',
      image: 'https://mediumrare.imgix.net/ea636c66bc3e7b6b21f9de954645a460e7a630ec0631177f741316561fb8853e?w=180&h=236&fit=min&auto=format',
      maxWin: '100,000x',
      rtp: '96.55%',
      tier: '1',
      category: 'push',
      badge: 'PUSH GAMING',
      color: '#2196f3'
    },
    {
      id: 'big-bamboo',
      name: 'Big Bamboo',
      slug: 'big-bamboo',
      provider: 'Push Gaming',
      image: 'https://mediumrare.imgix.net/7a055396f5b97a601ea6837472c4201d87ebd481f4a27a6e3a044f9502ab0768?w=180&h=236&fit=min&auto=format',
      maxWin: '50,000x',
      rtp: '96.13%',
      tier: '1',
      category: 'push',
      badge: 'PUSH GAMING',
      color: '#2196f3'
    },
    {
      id: 'sixsixsix',
      name: 'SixSixSix',
      slug: 'sixsixsix',
      provider: 'Hacksaw Gaming',
      image: 'https://mediumrare.imgix.net/1344aa1be63a9aa83e60c87fcb101c784f181f7d54203aeae4531405a395c805?w=180&h=236&fit=min&auto=format',
      maxWin: '16,666x',
      rtp: '96.15%',
      tier: '1',
      category: 'hacksaw',
      badge: 'HACKSAW',
      color: '#ff5722'
    }
  ];

  var ALIAS_MAP = {
    'wanted': 'wanted-dead-or-a-wild',
    'dead or a wild': 'wanted-dead-or-a-wild',
    'wanted dead': 'wanted-dead-or-a-wild',
    'dead or wild': 'wanted-dead-or-a-wild',
    'wanted dead or alive': 'wanted-dead-or-a-wild',
    'gates': 'gates-of-olympus-1000',
    'olympus': 'gates-of-olympus-1000',
    'gates 1000': 'gates-of-olympus-1000',
    'olympus 1000': 'gates-of-olympus-1000',
    'gates of olympus 1000': 'gates-of-olympus-1000',
    'zeus': 'gates-of-olympus-1000',
    'tito': 'gates-of-olympus-1000',
    'gates base': 'gates-of-olympus',
    'gates of olympus': 'gates-of-olympus',
    'sweet': 'sweet-bonanza-1000',
    'sweet bonanza': 'sweet-bonanza-1000',
    'bonanza': 'sweet-bonanza-1000',
    'sweet 1000': 'sweet-bonanza-1000',
    'sweet bonanza 1000': 'sweet-bonanza-1000',
    'sugar': 'sugar-rush-1000',
    'sugar rush': 'sugar-rush-1000',
    'sugar 1000': 'sugar-rush-1000',
    'sugar rush 1000': 'sugar-rush-1000',
    'bandit': 'le-bandit',
    'le bandit': 'le-bandit',
    'mapache': 'le-bandit',
    'rip': 'rip-city',
    'rip city': 'rip-city',
    'rosh': 'rip-city',
    'chaos': 'chaos-crew-2',
    'chaos crew': 'chaos-crew-2',
    'chaos crew 2': 'chaos-crew-2',
    'chaos 2': 'chaos-crew-2',
    'san quentin': 'san-quentin-xways',
    'san quentin xways': 'san-quentin-xways',
    'quentin': 'san-quentin-xways',
    'death row': 'san-quentin-xways',
    'san quentin 2': 'san-quentin-xways',
    'mental': 'mental',
    'manicomio': 'mental',
    'tombstone': 'tombstone-r-i-p',
    'tombstone rip': 'tombstone-r-i-p',
    'sharks': 'sharks',
    'sharks!': 'sharks',
    'tiburon': 'sharks',
    'bass': 'big-bass-splash',
    'big bass': 'big-bass-splash',
    'splash': 'big-bass-splash',
    'dog house': 'the-dog-house-megaways',
    'the dog house': 'the-dog-house-megaways',
    'starlight': 'starlight-princess-1000',
    'starlight princess': 'starlight-princess-1000',
    'anubis': 'hand-of-anubis',
    'hand of anubis': 'hand-of-anubis',
    'dork': 'dork-unit',
    'dork unit': 'dork-unit',
    'fire in the hole': 'fire-in-the-hole-2',
    'fire in the hole 2': 'fire-in-the-hole-2',
    'waylanders': 'waylanders-forge',
    'waylanders forge': 'waylanders-forge',
    'odin': 'odins-vault',
    'odins vault': 'odins-vault',
    'blade dance': 'blade-dance',
    'razor': 'razor-returns',
    'razor returns': 'razor-returns',
    'bamboo': 'big-bamboo',
    'big bamboo': 'big-bamboo',
    '666': 'sixsixsix',
    'sixsixsix': 'sixsixsix',
    'spicy 666': 'sixsixsix'
  };

  function normalizeKey(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  function slugify(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function resolveSlotImageUrl(slotOrUrl, baseContext) {
    if (!slotOrUrl) return DEFAULT_FALLBACK_IMAGE;

    var url = typeof slotOrUrl === 'string' ? slotOrUrl : (slotOrUrl.image || '');
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return DEFAULT_FALLBACK_IMAGE;
    }

    url = url.trim();

    if (/^(https?:|\/\/|data:|blob:)/i.test(url)) {
      return url;
    }

    if (url.indexOf('page_') !== -1) {
      return DEFAULT_FALLBACK_IMAGE;
    }

    var clean = url.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
    if (clean.indexOf('public/') === 0) clean = clean.substring(7);
    if (clean.indexOf('slots/') === 0) clean = clean.substring(6);

    if (clean.indexOf('http') !== 0) {
      if (clean.indexOf('/') !== 0 && clean.indexOf('site/') !== 0 && clean.indexOf('images/') !== 0) {
        clean = 'site/images/slots/' + clean;
      }
      if (baseContext && baseContext !== '/') {
        return baseContext.replace(/\/$/, '') + '/' + clean.replace(/^\//, '');
      }
      return '/' + clean.replace(/^\//, '');
    }

    return url;
  }

  function fuzzyMatch(query) {
    if (!query || typeof query !== 'string') return null;
    var clean = normalizeKey(query);
    if (!clean) return null;

    // 1. Alias direct
    if (ALIAS_MAP[clean]) {
      var targetId = ALIAS_MAP[clean];
      var match = CURATED_SLOTS.find(function(s) { return s.id === targetId; });
      if (match) return match;
    }

    // 2. Alias substring
    for (var alias in ALIAS_MAP) {
      if (clean === alias || clean.indexOf(alias) !== -1 || alias.indexOf(clean) !== -1) {
        var tId = ALIAS_MAP[alias];
        var m = CURATED_SLOTS.find(function(s) { return s.id === tId; });
        if (m) return m;
      }
    }

    // 3. Exact match in curated slots
    for (var i = 0; i < CURATED_SLOTS.length; i++) {
      var s = CURATED_SLOTS[i];
      if (s.id === clean || s.slug === clean || normalizeKey(s.name) === clean) {
        return s;
      }
    }

    // 4. Substring match in curated slots
    for (var j = 0; j < CURATED_SLOTS.length; j++) {
      var cs = CURATED_SLOTS[j];
      var k = normalizeKey(cs.name);
      if (k.indexOf(clean) !== -1 || clean.indexOf(k) !== -1) {
        return cs;
      }
    }

    // 5. Extended search in window.HUNTHUB_CURATED_SLOTS or window.CasinoSlotsCatalog if loaded
    var ext = (global.HUNTHUB_CURATED_SLOTS && Array.isArray(global.HUNTHUB_CURATED_SLOTS))
      ? global.HUNTHUB_CURATED_SLOTS
      : (global.CasinoSlotsCatalog && Array.isArray(global.CasinoSlotsCatalog) ? global.CasinoSlotsCatalog : []);

    for (var e = 0; e < ext.length; e++) {
      var es = ext[e];
      if (!es || !es.name) continue;
      var ek = normalizeKey(es.name);
      if (ek === clean || ek.indexOf(clean) !== -1 || clean.indexOf(ek) !== -1) {
        return {
          id: es.id || es.slug || slugify(es.name),
          name: es.name,
          slug: es.slug || slugify(es.name),
          provider: es.provider || 'Casino',
          image: es.image || DEFAULT_FALLBACK_IMAGE,
          maxWin: es.maxWin || '10,000x',
          rtp: es.rtp || '96.50%',
          tier: es.tier || '2',
          category: es.category,
          badge: es.badge,
          color: es.color
        };
      }
    }

    return null;
  }

  function resolve(query, baseContext) {
    if (typeof query === 'object' && query !== null) {
      if (query.name && query.image && query.image.indexOf('../') === -1) {
        return {
          id: query.id || slugify(query.name),
          name: query.name,
          slug: query.slug || slugify(query.name),
          provider: query.provider || 'Casino',
          image: resolveSlotImageUrl(query.image, baseContext),
          maxWin: query.maxWin || '10,000x',
          rtp: query.rtp || '96.50%',
          tier: query.tier || '2',
          category: query.category,
          badge: query.badge,
          color: query.color
        };
      }
      if (query.name) {
        var mObj = fuzzyMatch(query.name);
        if (mObj) {
          return {
            id: mObj.id,
            name: mObj.name,
            slug: mObj.slug,
            provider: mObj.provider,
            image: resolveSlotImageUrl(mObj.image, baseContext),
            maxWin: mObj.maxWin,
            rtp: mObj.rtp,
            tier: mObj.tier,
            category: mObj.category,
            badge: mObj.badge,
            color: mObj.color
          };
        }
      }
    }

    var str = typeof query === 'string' ? query : (query && query.name ? query.name : '');
    var match = fuzzyMatch(str);
    if (match) {
      return {
        id: match.id,
        name: match.name,
        slug: match.slug,
        provider: match.provider,
        image: resolveSlotImageUrl(match.image, baseContext),
        maxWin: match.maxWin,
        rtp: match.rtp,
        tier: match.tier,
        category: match.category,
        badge: match.badge,
        color: match.color
      };
    }

    var raw = str.trim() || 'Wanted Dead or a Wild';
    var titleCased = raw.replace(/\b\w/g, function(c) { return c.toUpperCase(); });
    var slug = slugify(titleCased);

    return {
      id: slug,
      name: titleCased,
      slug: slug,
      provider: 'Casino Slot',
      image: DEFAULT_FALLBACK_IMAGE,
      maxWin: '10,000x',
      rtp: '96.50%',
      tier: '2',
      badge: 'CASINO',
      color: '#ffd700'
    };
  }

  // Expose as global singleton
  global.SlotResolver = {
    resolve: resolve,
    fuzzyMatch: fuzzyMatch,
    resolveSlotImageUrl: resolveSlotImageUrl,
    getCuratedCatalog: function() { return CURATED_SLOTS.slice(); },
    DEFAULT_FALLBACK_IMAGE: DEFAULT_FALLBACK_IMAGE
  };

})(typeof window !== 'undefined' ? window : this);
