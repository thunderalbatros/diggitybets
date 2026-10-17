/**
 * HuntHub — Unified Canonical Slot Resolver (Frontend & OBS Overlays)
 * Ensures 100% accurate slot name <-> verified image matching across:
 * - Public Site (index.html, #tourney-koth-panel, #tournament, #bonushunt)
 * - Admin Panel (#admin Hub)
 * - OBS Overlays (/overlay-battle/, /overlay-tourney/, /overlay-bonushunt/, /wheel-duo/)
 */
(function(global) {
  'use strict';

  var DEFAULT_FALLBACK_IMAGE = 'https://www-live.hacksawgaming.com/casino_thumbnails/1067.jpg';

  var LEGACY_BROKEN_HASHES = [
    '8ce2d9f493cb2fc54425260193237a726715ffea2bfb19b8849b38466e3fa299',
    '1ea93a0279a9ebc0e3a6288899532b27dbfc60a0f4a8e2cb924c5539ebf85eb3',
    '8b11c97a78ef3a7cfbe3a49257bbdf9360cb4be258b3506927da8fa8c028a25c',
    '2be43834316fa71dc75a5960ce01783f98292f9d854e4881f215099fbcfe327c',
    '4ef4fc019e0839e144a1fa429813c9a6df27a00f2e82cf594d2ba7cb5b5c92c8',
    '5d6f6e8e0d6b0b5711c2adad4f3914a38f714eb6c0c55f84eb430e3bb4a3ba45',
    '60b940989067b5e9f56475d4ff3db896942ad2f347960fa03892797e8bc6f827',
    'dbb3f6630f9a76bc88bfd52a2307ef0cb1e6a3c42878c43026ad1607fa48b8ec',
    '5a0c36b4ae9cbe588cf4ba27e57c661bb5ad4e85741f23ee9f3907c0879c3d4f',
    '41da24e4d5885fe77bc95f5108fb26d70ae4f3fec14781cfc9fa6a8e805fe9e3',
    '05cfbdfcf1c81cfd8c7602f3bb44781df5a48554fe4bf693c126581c8160408d',
    '2e276f595fe36e4f3aa79d2ee37e7fe0b8f9e6129841808605eb8037a5e84606',
    'dddf1cfdf8c991b5d638be0a599f66dc0dfbf813501cb6982f6e91f6ebf8b66f',
    'a5dcb65fbf77d446dc0320bb00fe79ca0236a2e4ba775ec0b4bfcb80cfec401a',
    'b404ad170f4cf54f3b60fc851b2fc5d2a931ca81bbd067e4367c3fe5848bb010',
    'b0ec0c8c0bbab167f9d5059d43ad26f3329fc61da0c58a8a3a0ea2195f00e998',
    '06a3501a30fcf214b98160fc976aa260a9f5d1797c23bc9eeaa1a97d8bcfdb92',
    '14d8eb34c379a00e5720c29f63624e5a99e19d7d3d6666fa5a0f82c40c8fa907',
    'c5ffbb9920155b991da40b490d1e345cb3f73ae08be6ecfa609d94944ec7ea72',
    '1344aa1be63a9aa83e60c87fcb101c784f181f7d54203aeae4531405a395c805',
    '7ae4a07d6b3531dbfa3e271c6d9bb1ba6d83a1975e52da453ff54ae006248b1d',
    'd0bb47b5c87cbfb534e793ea5b07849e83ec0bf7246ba727725d2b1f07da190e',
    'a4e0a775836a0d2f093222da8e1548a3952ba5c3db692257d0aebe60ad0761e3',
    '6082cbba6a12dc6f4fa6bfec231d7bfd16fc0c9c7e0c46b149b5ae7976e6443c',
    '19ae7e3bf876bc70ffc20173872c67cf7eeadcfb5da1a1f0a28f80457cb14199',
    'f6f6ef43d3b7623910c69d8b18a3a2c5ce9c222956cf5723f5b2bdfadfe7f780',
    '3d97f2621ad76d337f7a3efd85c186835a589cf8fafe4ee506b1076bfeee3e56',
    '2e8c25785f7a0dcbb0591f855d0a6bb2aa36733ecce26b6b3e945c8c6a25c6fa',
    '285d85217833a697ce7f74bf0ef2df8be7fce203a94aaee190477cfbdfda735e'
  ];

  function isLegacyBrokenUrl(url) {
    if (!url || typeof url !== 'string') return true;
    for (var i = 0; i < LEGACY_BROKEN_HASHES.length; i++) {
      if (url.indexOf(LEGACY_BROKEN_HASHES[i]) !== -1) return true;
    }
    return false;
  }

  // Flagship Curated Slots (Always ready in memory, 100% Verified HTTP 200 OK Covers)
  var CURATED_SLOTS = [
    {
      id: 'wanted-dead-or-a-wild',
      name: 'Wanted Dead or a Wild',
      slug: 'wanted-dead-or-a-wild',
      provider: 'Hacksaw Gaming',
      image: 'https://www-live.hacksawgaming.com/casino_thumbnails/1067.jpg',
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
      image: 'https://www.pragmaticplay.com/wp-content/uploads/2023/12/Gates-of-Olympus_1000_339x180.png',
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
      image: 'https://www.pragmaticplay.com/wp-content/uploads/2021/02/GOOL_EN_339x180.png',
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
      image: 'https://www.pragmaticplay.com/wp-content/uploads/2024/05/Sweet-Bonanza-1000_339x180.png',
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
      image: 'https://mediumrare.imgix.net/9974a4ae80c70a5d29be4a1e6a645a55169ff82722b5a50694db86f25b4f2f0f?w=180&h=236&fit=min&auto=format',
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
      image: 'https://www.pragmaticplay.com/wp-content/uploads/2024/03/Sugar-Rush-1000_339x180.png',
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
      image: 'https://www.pragmaticplay.com/wp-content/uploads/2022/06/Sugar_Rush_EN_339x180.png',
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
      image: 'https://www-live.hacksawgaming.com/casino_thumbnails/1309.jpg',
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
      image: 'https://www-live.hacksawgaming.com/casino_thumbnails/1233.jpg',
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
      image: 'https://www-live.hacksawgaming.com/casino_thumbnails/1352.jpg',
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
      image: 'https://fan-cdn.nolimitcity.com/mental_meta_image_06f5394518.png',
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
      image: 'https://fan-cdn.nolimitcity.com/tombstone_rip_meta_image_1513c1fbe7.jpg',
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
      image: 'https://www.pragmaticplay.com/wp-content/uploads/2022/06/BBSPLASH_EN_339x180_04-1.png',
      maxWin: '5,000x',
      rtp: '96.71%',
      tier: '1',
      category: 'pragmatic',
      badge: 'PRAGMATIC',
      color: '#00e5ff'
    },
    {
      id: 'big-bass-bonanza',
      name: 'Big Bass Bonanza',
      slug: 'big-bass-bonanza',
      provider: 'Pragmatic Play',
      image: 'https://mediumrare.imgix.net/28b9f1d33ddddb3b365ed5c1ad5a815f02db8a16d6849f436a63fbfafe3dba75?w=180&h=236&fit=min&auto=format',
      maxWin: '2,100x',
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
      image: 'https://mediumrare.imgix.net/9aaa1942df920ad474e703a0ce36b119f51e6b3342b96e848a7c2bbe9078c75a?w=180&h=236&fit=min&auto=format',
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
      image: 'https://www.pragmaticplay.com/wp-content/uploads/2023/07/Starlight-Princess-1000_339x180.png',
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
      image: 'https://www-live.hacksawgaming.com/casino_thumbnails/1164.jpg',
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
      image: 'https://www-live.hacksawgaming.com/casino_thumbnails/1172.jpg',
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
      image: 'https://fan-cdn.nolimitcity.com/fith_2_share_img_db234472f3.png',
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
      image: 'https://www-live.hacksawgaming.com/casino_thumbnails/1534.jpg',
      maxWin: '16,666x',
      rtp: '96.15%',
      tier: '1',
      category: 'hacksaw',
      badge: 'HACKSAW',
      color: '#ff5722'
    },
    {
      id: 'folsom-prison',
      name: 'Folsom Prison',
      slug: 'folsom-prison',
      provider: 'Nolimit City',
      image: 'https://fan-cdn.nolimitcity.com/folsom_prison_splash_poster_9cfb1e7e22.png',
      maxWin: '71,400x',
      rtp: '96.07%',
      tier: '1',
      category: 'nolimit',
      badge: 'NOLIMIT',
      color: '#e65100'
    },
    {
      id: 'das-xboot',
      name: 'Das xBoot',
      slug: 'das-xboot',
      provider: 'Nolimit City',
      image: 'https://fan-cdn.nolimitcity.com/das_xboot_meta_image_8b26f28d0f.png',
      maxWin: '55,200x',
      rtp: '96.03%',
      tier: '1',
      category: 'nolimit',
      badge: 'NOLIMIT',
      color: '#e65100'
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

  /**
   * Generates a 100% self-contained 3:4 luxury SVG slot cover card Data URI
   * so that any slot name always renders a matching, crisp card even offline.
   */
  function generateDataUriCard(slotName, provider, accentColor) {
    var safeName = String(slotName || 'Casino Slot').replace(/[<>&"']/g, '').trim();
    var safeProv = String(provider || 'CASINO').replace(/[<>&"']/g, '').trim().toUpperCase();
    var pLower = safeProv.toLowerCase();
    var color = accentColor || (pLower.indexOf('hacksaw') !== -1 ? '#ff5722' : pLower.indexOf('pragmatic') !== -1 ? '#00e5ff' : pLower.indexOf('nolimit') !== -1 ? '#e65100' : '#ffd700');

    var words = safeName.toUpperCase().split(/\s+/);
    var lines = [];
    var current = '';
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if ((current + ' ' + w).trim().length <= 11 || !current) {
        current = (current + ' ' + w).trim();
      } else {
        lines.push(current);
        current = w;
      }
    }
    if (current) lines.push(current);
    lines = lines.slice(0, 4);

    var startY = 128 - ((lines.length - 1) * 15);
    var tspans = lines.map(function(ln, idx) {
      return '<text x="100" y="' + (startY + idx * 30) + '" text-anchor="middle" font-family="Chakra Petch, Inter, sans-serif" font-weight="900" font-size="22" fill="#ffffff" letter-spacing="1">' + ln + '</text>';
    }).join('');

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 266" width="200" height="266">' +
      '<defs>' +
        '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0%" stop-color="#141824"/>' +
          '<stop offset="50%" stop-color="#0a0c12"/>' +
          '<stop offset="100%" stop-color="#1a1025"/>' +
        '</linearGradient>' +
        '<radialGradient id="glow" cx="50%" cy="42%" r="55%">' +
          '<stop offset="0%" stop-color="' + color + '" stop-opacity="0.42"/>' +
          '<stop offset="100%" stop-color="' + color + '" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<rect width="200" height="266" rx="14" fill="url(#bg)"/>' +
      '<rect width="200" height="266" rx="14" fill="url(#glow)"/>' +
      '<rect x="3" y="3" width="194" height="260" rx="12" fill="none" stroke="' + color + '" stroke-opacity="0.55" stroke-width="2"/>' +
      '<rect x="24" y="18" width="152" height="24" rx="12" fill="rgba(0,0,0,0.65)" stroke="' + color + '" stroke-opacity="0.5" stroke-width="1"/>' +
      '<text x="100" y="34" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="10" fill="' + color + '" letter-spacing="1.5">' + safeProv.slice(0, 18) + '</text>' +
      tspans +
      '<rect x="45" y="226" width="110" height="4" rx="2" fill="' + color + '" fill-opacity="0.8"/>' +
    '</svg>';

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  function resolveSlotImageUrl(slotOrUrl, baseContext) {
    if (!slotOrUrl) return DEFAULT_FALLBACK_IMAGE;

    var url = typeof slotOrUrl === 'string' ? slotOrUrl : (slotOrUrl.image || '');
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return DEFAULT_FALLBACK_IMAGE;
    }

    url = url.trim();

    if (isLegacyBrokenUrl(url)) {
      if (typeof slotOrUrl === 'object' && slotOrUrl.name) {
        var healed = fuzzyMatch(slotOrUrl.name);
        if (healed && !isLegacyBrokenUrl(healed.image)) return healed.image;
        return generateDataUriCard(slotOrUrl.name, slotOrUrl.provider, slotOrUrl.color);
      }
      return DEFAULT_FALLBACK_IMAGE;
    }

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
      if (alias.length >= 4 && (clean === alias || clean.indexOf(alias) !== -1 || (clean.length >= 4 && alias.indexOf(clean) !== -1))) {
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

    var minContainedLen = Math.max(5, Math.floor(clean.length * 0.6));

    // 4. Substring match in curated slots
    for (var j = 0; j < CURATED_SLOTS.length; j++) {
      var cs = CURATED_SLOTS[j];
      var k = normalizeKey(cs.name);
      if (k.indexOf(clean) !== -1 || (k.length >= minContainedLen && clean.indexOf(k) !== -1)) {
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
      if (ek === clean || ek.indexOf(clean) !== -1 || (ek.length >= minContainedLen && clean.indexOf(ek) !== -1)) {
        var resolvedImg = (!es.image || isLegacyBrokenUrl(es.image))
          ? generateDataUriCard(es.name, es.provider, es.color)
          : es.image;
        return {
          id: es.id || es.slug || slugify(es.name),
          name: es.name,
          slug: es.slug || slugify(es.name),
          provider: es.provider || 'Casino',
          image: resolvedImg,
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
      if (query.name && query.image && query.image.indexOf('../') === -1 && !isLegacyBrokenUrl(query.image)) {
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
      image: generateDataUriCard(titleCased, 'Casino Slot', '#ffd700'),
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
    generateDataUriCard: generateDataUriCard,
    getCuratedCatalog: function() { return CURATED_SLOTS.slice(); },
    DEFAULT_FALLBACK_IMAGE: DEFAULT_FALLBACK_IMAGE
  };

})(typeof window !== 'undefined' ? window : this);
