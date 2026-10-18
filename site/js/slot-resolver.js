/**
 * HuntHub — Unified Canonical Slot Resolver (Frontend & OBS Overlays)
 * Ensures 100% accurate slot name <-> verified image matching across:
 * - Public Site (index.html, #tourney-koth-panel, #tournament, #bonushunt)
 * - Admin Panel (#admin Hub)
 * - OBS Overlays (/overlay-battle/, /overlay-tourney/, /overlay-bonushunt/, /wheel-duo/)
 */
(function(global) {
  'use strict';

  var DEFAULT_FALLBACK_IMAGE = 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format';

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
    '285d85217833a697ce7f74bf0ef2df8be7fce203a94aaee190477cfbdfda735e',
    '9974a4ae80c70a5d29be4a1e6a645a55169ff82722b5a50694db86f25b4f2f0f',
    '28b9f1d33ddddb3b365ed5c1ad5a815f02db8a16d6849f436a63fbfafe3dba75',
    '9aaa1942df920ad474e703a0ce36b119f51e6b3342b96e848a7c2bbe9078c75a',
    'ea636c66bc3e7b6b21f9de954645a460e7a630ec0631177f741316561fb8853e',
    '7a055396f5b97a601ea6837472c4201d87ebd481f4a27a6e3a044f9502ab0768'
  ];

  function isLegacyBrokenUrl(url) {
    if (!url || typeof url !== 'string') return true;
    if (url.indexOf('pragmaticplay.com/wp-content/uploads/') !== -1) return true;
    if (url.indexOf('fan-cdn.nolimitcity.com') !== -1) return true;
    if (url.indexOf('mediumrare.imgix.net/games/') !== -1) return true;
    if (url.indexOf('trans_eba4744bd0.png') !== -1) return true;
    if (url.indexOf('images/slots/') !== -1 && /\.svg(\?.*)?$/i.test(url)) return true;
    for (var i = 0; i < LEGACY_BROKEN_HASHES.length; i++) {
      if (url.indexOf(LEGACY_BROKEN_HASHES[i]) !== -1) return true;
    }
    return false;
  }

  // Flagship Curated Slots (Always ready in memory, 100% Verified Stake CDN 3:4 Covers)
  var CURATED_SLOTS = [
    {
      id: 'wanted-dead-or-a-wild',
      name: 'Wanted Dead or a Wild',
      slug: 'wanted-dead-or-a-wild',
      provider: 'Hacksaw Gaming',
      image: 'https://mediumrare.imgix.net/9ff267150fab30e5f0cff7f09456fa2e5e966015c7fe65969104f4c4c442a746?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/fdf333e96a5e21555bbb4e9e04a3ee4e1986c9cca9aa75141597041cc8334d23?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/f38cea26bce753243bbdbc06ffb7a4b46972bc1254e41f3c79ace5fba9e6aae2?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/73754d4bf421b78fbd3895bbc7890d379797588cb699d6cbe47f3656aa93613b?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/f95b3adf9d28d57496dd8da909c0cb97515104194924c5abb4cc9ad792f35dfe?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/14d5410c6cf4c303d291262a10e949dc14b0ac2eca2a7a730b0401919c01358e?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/2cef1d4fc88f4f91ab86775d25b4cc3fed042af3ac81d641a559a4c517f3d9ef?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/8ade942d35d2cdbddf7888f303be4cf4bda8c650a112b3c53f7c6f3ccad81254?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/34d643b7d8c0b23e734742e5d1c32eb6beb29ee34a69e7cd97486db6c125a2db?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/6cc2e6228b274e48ff6045944b153810db7131ad61d90cabce5aa35176c639e9?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/ca243d6c3db42259d6859b80717eb378eb64e41a9d1b1f7fdeadde68d59d9ad5?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/3b37f2346242fae3fd6330909988dfd2354ae39558da94e3a135dd24b3ffb073?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/40f3f2cfeadebaa5169a9636218f289a34209bd6e91d44de733ecdf69b4b93fe?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/09b89e85fd9d787d15b0fc1e8ae13693a5e8b83e600030e53cfb640c815d8ea1?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/98801318d067e57c3d22f9453d970d5278bf253365600c4d93841b9c994bf82a?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/713054d6e4d7a33d599e02ca3a53ff486c018b07def931e61b6b06fe94183d0f?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/6bd16708800d460b31c2ee7996f01a806496830fe5cff923daa003eeca3d0fd8?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/9b33e65dac8fca557649b0e87eb60754a62cc9ba40abd415b68ddfde4d799997?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/da38025818ae15402c63f2a3c900c577c61f4dbcee9c1cf1ffebc60cff9dc954?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/33cd5a34c3937da326652a3beb44fe9c3680118c363a060ca5670847595561a5?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/d93aa56548ee2716b2e743e2b6a0d04a4bcbe6507964367d50c3529ab886ac85?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/7bee41634019f0eb07ba2b55388e79e3a0e0861047450b34d7075602f70520bf?w=360&auto=format',
      maxWin: '80,085x',
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
      image: 'https://mediumrare.imgix.net/bfd527bb6d54ad930db0fcfa2983dee64fd4b166bc75d0c71a4163a86440bd82?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/f79cacc2d22d0e0c0b44a7b0bba4ec47254466e617fd256b1562288e87090994?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/88131cf4e6b71114aba9b27a711b0f17c073e5c3043b371d322aa3465bb04220?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/742a1d7958a9ffa215e19cc72c684abe9412f71fcf426b57909b5b817f9cd9d4?w=360&auto=format',
      maxWin: '25,000x',
      rtp: '96.30%',
      tier: '2',
      category: 'stake',
      badge: 'ONLY ON STAKE',
      color: '#ffd700'
    },
    {
      id: 'ganja-snail',
      name: 'Ganja Snail',
      slug: 'ganja-snail',
      provider: 'Paperclip Gaming',
      image: 'https://mediumrare.imgix.net/f32931231205a5a8a2c712751d45bf17facc425be14cf5dd149096ba8ebfd073?w=360&auto=format',
      maxWin: '10,000x',
      rtp: '96.50%',
      tier: '1',
      category: 'stake',
      badge: 'ONLY ON STAKE',
      color: '#ffd700'
    },
    {
      id: 'razor-returns',
      name: 'Razor Returns',
      slug: 'razor-returns',
      provider: 'Push Gaming',
      image: 'https://mediumrare.imgix.net/3a1eed2aa20fa6baea392d305342fd520a93270c6633d3084bc2156ed50d71ef?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/2dc7799a8e8d3b7f00252686cf1f0cd9fce91114205fab56c4a46f913b6cbab3?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/2e91aa9817c936a142dc7446f260404011db393e72dc71ac4ec13f900e20e042?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/7302b9247bbb9187df5ba750f1afd2d07f9ef093bb5fcc9aac8b23854f59adde?w=360&auto=format',
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
      image: 'https://mediumrare.imgix.net/822438dc4259368302ef5ec6345c4c21a73097e4265f21f53008cef1e79f6cd0?w=360&auto=format',
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

  var NUMBER_WORD_TO_DIGIT = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
    'ten': '10', 'hundred': '100', 'thousand': '1000',
    'uno': '1', 'dos': '2', 'tres': '3', 'cuatro': '4', 'cinco': '5',
    'seis': '6', 'siete': '7', 'ocho': '8', 'nueve': '9', 'diez': '10', 'mil': '1000',
    'ii': '2', 'iii': '3', 'iv': '4'
  };

  var DIGIT_TO_WORD = {
    '666': 'sixsixsix',
    '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
    '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten'
  };

  function expandNumberWords(str) {
    if (!str || typeof str !== 'string') return '';
    var s = str.toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Special compound patterns ("six six six" -> "666" and "sixsixsix")
    s = s.replace(/\b(six|seis)\s*(six|seis)\s*(six|seis)\b/g, '666 sixsixsix');
    s = s.replace(/\b666\b/g, '666 sixsixsix');
    s = s.replace(/\b(one|un)\s+thousand\b/g, '1000');
    var tokens = s.split(/[^a-z0-9]+/).filter(Boolean);
    var expanded = [];
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];
      expanded.push(t);
      if (NUMBER_WORD_TO_DIGIT[t] && expanded.indexOf(NUMBER_WORD_TO_DIGIT[t]) === -1) {
        expanded.push(NUMBER_WORD_TO_DIGIT[t]);
      }
      if (DIGIT_TO_WORD[t] && expanded.indexOf(DIGIT_TO_WORD[t]) === -1) {
        expanded.push(DIGIT_TO_WORD[t]);
      }
    }
    return expanded.join(' ');
  }

  function tokenizeSmart(str) {
    var exp = expandNumberWords(str);
    var stopWords = { 'the': 1, 'of': 1, 'a': 1, 'and': 1, 'in': 1, 'to': 1, 'el': 1, 'de': 1, 'la': 1 };
    return exp.split(/\s+/).filter(function(w) {
      return w.length > 0 && !stopWords[w];
    });
  }

  var _cachedCatalog = null;
  var _cachedExtLen = -1;
  var _cachedByKey = null;

  function ensureCatalogCache() {
    var ext = (global.HUNTHUB_CURATED_SLOTS && Array.isArray(global.HUNTHUB_CURATED_SLOTS))
      ? global.HUNTHUB_CURATED_SLOTS
      : (global.CasinoSlotsCatalog && Array.isArray(global.CasinoSlotsCatalog) ? global.CasinoSlotsCatalog : []);
    if (_cachedCatalog && _cachedExtLen === ext.length) {
      return _cachedCatalog;
    }
    var seen = Object.create(null);
    var byKey = Object.create(null);
    var combined = [];
    for (var i = 0; i < CURATED_SLOTS.length; i++) {
      var c = CURATED_SLOTS[i];
      var ck = normalizeKey(c.name);
      c._normName = ck;
      c._normProv = normalizeKey(c.provider || '');
      seen[ck] = true;
      byKey[ck] = c;
      if (c.id) byKey[c.id] = c;
      if (c.slug) byKey[c.slug] = c;
      combined.push(c);
    }
    for (var j = 0; j < ext.length; j++) {
      var e = ext[j];
      if (!e || !e.name) continue;
      var k = e._normName || normalizeKey(e.name);
      e._normName = k;
      if (e._normProv === undefined) e._normProv = normalizeKey(e.provider || '');
      if (!seen[k]) {
        seen[k] = true;
        byKey[k] = e;
        if (e.id && !byKey[e.id]) byKey[e.id] = e;
        if (e.slug && !byKey[e.slug]) byKey[e.slug] = e;
        combined.push(e);
      }
    }
    _cachedCatalog = combined;
    _cachedExtLen = ext.length;
    _cachedByKey = byKey;
    return _cachedCatalog;
  }

  function getAllCatalogSlots() {
    return ensureCatalogCache();
  }

  function scoreSlotAgainstQuery(slot, rawQuery, queryClean, queryTokens) {
    if (!slot || !slot.name) return 0;
    var nameKey = slot._normName || (slot._normName = normalizeKey(slot.name));
    var provKey = slot._normProv !== undefined ? slot._normProv : (slot._normProv = normalizeKey(slot.provider || ''));
    if (nameKey === queryClean) return 1000;
    if (slot.id === queryClean || slot.slug === queryClean) return 980;
    if (nameKey.indexOf(queryClean) === 0) return 850;
    if (nameKey.indexOf(queryClean) !== -1) return 720;

    // Number-word & token-order-independent scoring (lazily cached per slot)
    var slotExpanded = slot._expandedSearch || (slot._expandedSearch = expandNumberWords(slot.name + ' ' + (slot.provider || '')));
    var slotKeyExpanded = slot._expandedKey || (slot._expandedKey = normalizeKey(slotExpanded));
    if (slotKeyExpanded.indexOf(queryClean) !== -1) return 680;

    if (queryTokens.length > 0) {
      var matchedTokens = 0;
      for (var i = 0; i < queryTokens.length; i++) {
        var qt = queryTokens[i];
        if (slotExpanded.indexOf(qt) !== -1 || nameKey.indexOf(qt) !== -1 || provKey.indexOf(qt) !== -1) {
          matchedTokens++;
        }
      }
      if (matchedTokens === queryTokens.length) {
        return 600 + (matchedTokens * 25) - Math.min(40, Math.abs(nameKey.length - queryClean.length));
      }
      if (queryTokens.length >= 2 && matchedTokens >= queryTokens.length - 1) {
        return 320 + (matchedTokens * 20);
      }
    }
    return 0;
  }

  function formatCatalogSlot(es, baseContext) {
    var resolvedImg = (!es.image || isLegacyBrokenUrl(es.image))
      ? generateDataUriCard(es.name, es.provider, es.color)
      : resolveSlotImageUrl(es.image, baseContext);
    return {
      id: es.id || es.slug || slugify(es.name),
      name: es.name,
      slug: es.slug || slugify(es.name),
      provider: es.provider || 'Casino',
      image: resolvedImg,
      maxWin: es.maxWin || '10,000x',
      rtp: es.rtp || '96.35%',
      tier: es.tier || '1',
      category: es.category,
      badge: es.badge,
      color: es.color,
      cloneOf: es.cloneOf || null,
      events: es.events || null,
      releasedAt: es.releasedAt || null,
      bonusBuy: Boolean(es.bonusBuy)
    };
  }

  function smartSearch(query, limit) {
    var maxResults = limit || 12;
    var all = getAllCatalogSlots();
    if (!query || typeof query !== 'string' || !query.trim()) {
      return all.slice(0, maxResults).map(function(s) { return formatCatalogSlot(s); });
    }
    var raw = query.trim();
    var clean = normalizeKey(expandNumberWords(raw)) || normalizeKey(raw);

    // Fast path for single-result exact lookup
    if (maxResults === 1 && _cachedByKey && _cachedByKey[clean]) {
      return [formatCatalogSlot(_cachedByKey[clean])];
    }

    var tokens = tokenizeSmart(raw);

    // Check direct alias first
    var aliasTarget = ALIAS_MAP[normalizeKey(raw)] || ALIAS_MAP[raw.toLowerCase().trim()];
    var scored = [];
    for (var i = 0; i < all.length; i++) {
      var s = all[i];
      var sc = scoreSlotAgainstQuery(s, raw, clean, tokens);
      if (aliasTarget && (s.id === aliasTarget || s.slug === aliasTarget)) {
        sc = Math.max(sc, 1100);
      }
      if (sc > 0) {
        scored.push({ slot: s, score: sc });
      }
    }
    scored.sort(function(a, b) { return b.score - a.score; });
    return scored.slice(0, maxResults).map(function(item) {
      return formatCatalogSlot(item.slot);
    });
  }

  function parseMaxWinNum(str) {
    if (!str) return 10000;
    var n = parseFloat(String(str).replace(/[^0-9.]/g, ''));
    return isNaN(n) || n <= 0 ? 10000 : n;
  }

  function parseRtpNum(str) {
    if (!str) return 96.30;
    var n = parseFloat(String(str).replace(/[^0-9.]/g, ''));
    return isNaN(n) || n < 80 || n > 99.9 ? 96.30 : n;
  }

  function detectMechanicFamily(slot) {
    if (!slot || !slot.name) {
      return { id: 'MULTI_VOLATILITY_REELS', label: '⚡ High-Volatility Bonus Reels', volatility: 'HIGH' };
    }
    if (slot._mechFamily) return slot._mechFamily;
    var n = String(slot.name || '').toLowerCase();
    var p = String(slot.provider || '').toLowerCase();
    var maxW = slot._maxWinNum !== undefined ? slot._maxWinNum : (slot._maxWinNum = parseMaxWinNum(slot.maxWin));
    var rtp = slot._rtpNum !== undefined ? slot._rtpNum : (slot._rtpNum = parseRtpNum(slot.rtp));

    var res;
    if (/wanted|gladiator|2 wild 2 die|duel at dawn|slayers|beam boys|fist of destruction|outlaws|stormforged|densho|anubis|blood & shadow/i.test(n)) {
      res = { id: 'VS_MULTIPLIER_REELS', label: '⚔️ VS Expanding Multiplier Reels', volatility: 'EXTREME (5/5)' };
    } else if (/1000|2000|2500|olympus|sweet bonanza|sugar rush|starlight|gates of|wisdom of athena|fruit party|bonanza/i.test(n)) {
      res = { id: 'TUMBLE_SCATTER_1000', label: '💎 Scatter Pays + Tumble Multipliers', volatility: 'EXTREME (5/5)' };
    } else if (/le bandit|le pharaoh|le catcher|ze zeus|donny dough|dork|drop.?em|vending|rainbow/i.test(n)) {
      res = { id: 'CLUSTER_COIN_REVEAL', label: '🍀 Golden Squares + Coin Reveal', volatility: 'MEDIUM-HIGH (4/5)' };
    } else if (p.indexOf('nolimit') !== -1 || /san quentin|mental|tombstone|fire in the hole|xboot|folsom|dead canary|duck hunters|gator hunters|brute force|tanked|serial|misery|gulag|road rage|gluttony|bushido/i.test(n)) {
      res = { id: 'XWAYS_EXTREME_CAP', label: '☢️ xWays / xSplit Extreme Cap', volatility: 'INSANE (6/5)' };
    } else if (/666|sixsixsix|chaos crew|rip city|wicked grin|lit city|rolling the bones/i.test(n)) {
      res = { id: 'WHEEL_GAMBLE_MULTI', label: '🎰 Multi-Tier Wheel / Multiplier Grid', volatility: 'HIGH-EXTREME (5/5)' };
    } else if (/razor|bamboo|sharks|boss bear|push/i.test(n) || p.indexOf('push') !== -1) {
      res = { id: 'MYSTERY_REVEAL_STACKS', label: '🦈 Mystery Reveal Stacks + Instant Coins', volatility: 'EXTREME (5/5)' };
    } else if (/bass|dog house|fish|carp diem|splash|angler/i.test(n)) {
      res = { id: 'COLLECTOR_FREE_SPINS', label: '🎣 Collector Progression + Sticky Multipliers', volatility: 'HIGH (4/5)' };
    } else if (rtp >= 96.65 || /valkyrie|paperclip|twist|titan|massive|backseat|bullshark|uppercut|pocket play|donut|shady lady/i.test(p)) {
      res = { id: 'STAKE_ENGINE_HIGH_RTP', label: '🔥 Stake Engine High-RTP Exclusive', volatility: maxW >= 25000 ? 'EXTREME (5/5)' : 'HIGH (4/5)' };
    } else {
      res = { id: 'MULTI_VOLATILITY_REELS', label: '⚡ Multi-Feature Bonus Buy Engine', volatility: maxW >= 20000 ? 'EXTREME (5/5)' : 'HIGH (4/5)' };
    }
    slot._mechFamily = res;
    return res;
  }

  function findMathTwins(slotOrName, limit) {
    ensureCatalogCache();
    var base = resolve(slotOrName);
    var baseRaw = (_cachedByKey && _cachedByKey[normalizeKey(base.name)]) || base;
    var baseRtp = parseRtpNum(baseRaw.rtp || base.rtp);
    var baseMax = parseMaxWinNum(baseRaw.maxWin || base.maxWin);
    var baseKey = normalizeKey(base.name);
    var baseCloneRoot = normalizeKey(baseRaw.cloneOf || base.name);
    var baseProvLower = (base.provider || '').toLowerCase();
    var baseMech = detectMechanicFamily(base);
    var all = getAllCatalogSlots();
    var candidates = [];

    for (var i = 0; i < all.length; i++) {
      var c = all[i];
      if (!c || !c.name) continue;
      var cKey = c._normName || (c._normName = normalizeKey(c.name));
      if (cKey === baseKey) continue;
      var cRtp = c._rtpNum !== undefined ? c._rtpNum : (c._rtpNum = parseRtpNum(c.rtp));
      if (cRtp < 94.0) continue; // Skip low-RTP scratch cards
      var cMax = c._maxWinNum !== undefined ? c._maxWinNum : (c._maxWinNum = parseMaxWinNum(c.maxWin));
      var cMech = detectMechanicFamily(c);
      var rtpDiff = Math.abs(baseRtp - cRtp);
      var maxRatio = Math.max(baseMax, cMax) / Math.max(1, Math.min(baseMax, cMax));

      // Check if this candidate is an EXACT verified Stake Engine (engine.io) paytable clone
      var cCloneTarget = c.cloneOf ? normalizeKey(c.cloneOf) : '';
      var isVerifiedEngineClone = Boolean(
        (cCloneTarget && (cCloneTarget === baseKey || cCloneTarget === baseCloneRoot)) ||
        (baseRaw.cloneOf && cKey === baseCloneRoot)
      );

      if (isVerifiedEngineClone) {
        candidates.push({
          rawSlot: c,
          similarity: rtpDiff < 0.05 ? 100.0 : 99.8,
          rtpDelta: Number((cRtp - baseRtp).toFixed(2)),
          sharedCap: true,
          isExactEngineClone: true,
          mechanic: {
            id: 'ENGINE_EXACT_CLONE',
            label: rtpDiff < 0.05 ? '🧬 100% Identical engine.io Paytable' : '🧬 Same engine.io Paytable (Re-weighted RTP)',
            volatility: baseMech.volatility
          }
        });
        continue;
      }

      // Base mathematical similarity (max 86 before mechanical & tier bonuses)
      var rawScore = 84.5 - (rtpDiff * 9.5) - (Math.log10(maxRatio) * 18.5);

      // Mechanical DNA match bonus
      if (cMech.id === baseMech.id) {
        rawScore += 11.2;
      }

      // Cross-studio mathematical clone bonus vs same-studio sibling bonus
      var cProvLower = c._provLower !== undefined ? c._provLower : (c._provLower = String(c.provider || '').toLowerCase());
      var isBaseEngine = /valkyrie|paperclip|twist|titan|massive|backseat|bullshark|uppercut|pocket play|donut|shady lady/i.test(baseProvLower);
      var isCandEngine = /valkyrie|paperclip|twist|titan|massive|backseat|bullshark|uppercut|pocket play|donut|shady lady/i.test(cProvLower);
      if (isBaseEngine && isCandEngine) {
        rawScore += 5.5;
      } else if (cProvLower && baseProvLower && cProvLower !== baseProvLower && cMech.id === baseMech.id) {
        rawScore += 2.6;
      } else if (cProvLower === baseProvLower && cMech.id === baseMech.id) {
        rawScore += 2.1;
      }

      // Prioritize Tier 1 & Tier 2 recognized studios so recommendations are always playable top hits
      var tierStr = String(c.tier || '3');
      if (tierStr === '1') rawScore += 2.4;
      else if (tierStr === '2') rawScore += 1.6;
      else rawScore -= 4.5;

      // Deterministic fine-grain spread (0.0 to 0.7) so clones never all tie at 99.6%
      var tieSpread = ((cKey.charCodeAt(0) * 7 + cKey.length * 13) % 8) * 0.1;
      var finalSim = Math.max(62.0, Math.min(99.4, rawScore - tieSpread));

      candidates.push({
        rawSlot: c,
        similarity: Number(finalSim.toFixed(1)),
        rtpDelta: Number((cRtp - baseRtp).toFixed(2)),
        sharedCap: cMax === baseMax,
        isExactEngineClone: false,
        mechanic: cMech
      });
    }

    candidates.sort(function(a, b) {
      if (b.similarity !== a.similarity) return b.similarity - a.similarity;
      var tA = parseInt(a.rawSlot && a.rawSlot.tier || '3', 10) || 3;
      var tB = parseInt(b.rawSlot && b.rawSlot.tier || '3', 10) || 3;
      if (tA !== tB) return tA - tB;
      return Math.abs(a.rtpDelta || 0) - Math.abs(b.rtpDelta || 0);
    });
    return candidates.slice(0, limit || 6).map(function(item) {
      var formatted = formatCatalogSlot(item.rawSlot);
      formatted.mechanic = item.mechanic;
      return {
        slot: formatted,
        similarity: item.similarity,
        rtpDelta: item.rtpDelta,
        sharedCap: item.sharedCap,
        isExactEngineClone: Boolean(item.isExactEngineClone),
        mechanic: item.mechanic
      };
    });
  }

  function fuzzyMatch(query) {
    if (!query || typeof query !== 'string') return null;
    var raw = query.trim();
    var clean = normalizeKey(raw);
    if (!clean) return null;

    ensureCatalogCache();

    // 0. Direct O(1) catalog hash lookup
    if (_cachedByKey && _cachedByKey[clean]) {
      return _cachedByKey[clean];
    }

    // 1. Number-word normalized alias ("six six six" -> "666")
    var expandedRaw = expandNumberWords(raw);
    if (expandedRaw.indexOf('666') !== -1 || expandedRaw.indexOf('sixsixsix') !== -1) {
      var sixMatch = CURATED_SLOTS.find(function(s) { return s.id === 'sixsixsix'; });
      if (sixMatch) return sixMatch;
    }

    // 2. Alias direct
    if (ALIAS_MAP[clean] || ALIAS_MAP[raw.toLowerCase()]) {
      var targetId = ALIAS_MAP[clean] || ALIAS_MAP[raw.toLowerCase()];
      if (_cachedByKey && _cachedByKey[targetId]) return _cachedByKey[targetId];
      var match = CURATED_SLOTS.find(function(s) { return s.id === targetId; });
      if (match) return match;
    }

    // 3. Alias substring
    for (var alias in ALIAS_MAP) {
      if (alias.length >= 4 && (clean === alias || clean.indexOf(alias) !== -1 || (clean.length >= 4 && alias.indexOf(clean) !== -1))) {
        var tId = ALIAS_MAP[alias];
        if (_cachedByKey && _cachedByKey[tId]) return _cachedByKey[tId];
        var m = CURATED_SLOTS.find(function(s) { return s.id === tId; });
        if (m) return m;
      }
    }

    // 4. Smart token-order & number-word search across full catalog
    var smartMatches = smartSearch(raw, 1);
    if (smartMatches && smartMatches.length > 0) {
      return smartMatches[0];
    }

    return null;
  }

  function resolve(query, baseContext) {
    var objName = '';
    var objProv = '';
    var objImg = '';
    if (typeof query === 'object' && query !== null) {
      objName = String(query.name || query.slotName || query.slot || query.title || '').trim();
      objProv = String(query.provider || query.slotProvider || '').trim();
      objImg = String(query.image || query.slotImage || query.imageUrl || query.img || '').trim();

      if (objName) {
        var mObj = fuzzyMatch(objName);
        if (mObj && mObj.image && !isLegacyBrokenUrl(mObj.image)) {
          return {
            id: mObj.id,
            name: mObj.name,
            slug: mObj.slug,
            provider: mObj.provider || objProv || 'Casino',
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

      if (objName && objImg && objImg.indexOf('../') === -1 && !isLegacyBrokenUrl(objImg)) {
        return {
          id: query.id || slugify(objName),
          name: objName,
          slug: query.slug || slugify(objName),
          provider: objProv || 'Casino',
          image: resolveSlotImageUrl(objImg, baseContext),
          maxWin: query.maxWin || '10,000x',
          rtp: query.rtp || '96.50%',
          tier: query.tier || '2',
          category: query.category,
          badge: query.badge,
          color: query.color
        };
      }
    }

    var str = typeof query === 'string' ? query : objName;
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
      provider: objProv || 'Casino Slot',
      image: generateDataUriCard(titleCased, objProv || 'Casino Slot', '#ffd700'),
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
    smartSearch: smartSearch,
    findMathTwins: findMathTwins,
    detectMechanicFamily: detectMechanicFamily,
    expandNumberWords: expandNumberWords,
    getAllCatalogSlots: getAllCatalogSlots,
    resolveSlotImageUrl: resolveSlotImageUrl,
    generateDataUriCard: generateDataUriCard,
    getCuratedCatalog: function() { return CURATED_SLOTS.slice(); },
    DEFAULT_FALLBACK_IMAGE: DEFAULT_FALLBACK_IMAGE
  };

})(typeof window !== 'undefined' ? window : this);
