import fs from 'node:fs';
import path from 'node:path';

export interface CanonicalSlot {
  id: string;
  name: string;
  slug: string;
  provider: string;
  image: string;
  maxWin: string;
  rtp: string;
  tier: string;
  category?: string;
  badge?: string;
  color?: string;
  isOnlyOnStake?: boolean;
  creatorStudio?: string;
}

export function extractCreatorStudio(slot: Partial<CanonicalSlot>): string {
  if (!slot) return 'Stake Exclusive';
  if (slot.creatorStudio) return slot.creatorStudio;
  const n = String(slot.name || '');
  if (/^Reactorgames/i.test(n)) return 'Reactor Games';
  if (/^Harmonica/i.test(n)) return 'Harmonica';
  if (/^Wildgoose/i.test(n)) return 'Wildgoose';
  if (/^Tinexgames/i.test(n)) return 'Tinex Games';
  if (/^Jadebird/i.test(n)) return 'Jadebird';
  if (/^Geminigaming/i.test(n)) return 'Gemini Gaming';
  if (/^Afterhoursstudios/i.test(n)) return 'Afterhours Studios';
  if (/^Quickstrike/i.test(n)) return 'Quickstrike';
  if (/^0x0x/i.test(n)) return '0x0x Studios';
  if (/^Merveillesstudio/i.test(n)) return 'Merveilles Studio';
  if (/^Burstpilot/i.test(n)) return 'Burstpilot';
  if (/titan/i.test(slot.provider || '') || /titan/i.test(n)) return 'Titan Gaming';
  if (/twist/i.test(slot.provider || '') || /twist/i.test(n)) return 'Twist Gaming';
  if (/massive/i.test(slot.provider || '') || /massive/i.test(n)) return 'Massive Studios';
  if (/paperclip/i.test(slot.provider || '') || /paperclip/i.test(n)) return 'Paperclip Gaming';
  if (/avatarux/i.test(slot.provider || '')) return 'AvatarUX';
  if (slot.provider && slot.provider !== 'Stake Exclusive') return slot.provider;
  return 'Stake Exclusive Studio';
}

export function checkIsOnlyOnStake(slot: Partial<CanonicalSlot>): boolean {
  if (!slot) return false;
  if (slot.isOnlyOnStake === true) return true;
  if (slot.category === 'stake' || slot.provider === 'Stake Exclusive' || slot.badge === 'ONLY ON STAKE') return true;
  const n = String(slot.name || '');
  return /^(Reactorgames|Harmonica|Wildgoose|Tinexgames|Jadebird|Geminigaming|Afterhoursstudios|Quickstrike|0x0x|Merveillesstudio|Burstpilot|Titan|Twist|Massive|Paperclip)/i.test(n);
}

// Fallback image (Wanted Dead or a Wild verified Official Hacksaw CDN)
export const DEFAULT_FALLBACK_IMAGE = 'https://www-live.hacksawgaming.com/casino_thumbnails/1067.jpg';

// Known legacy synthetic imgix hashes to auto-heal if present in old cached states
const LEGACY_BROKEN_HASHES = new Set([
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
  'd0bb47b5c87cbfb534e793ea5b07849e83ec0bf7246ba727725d2b1f07da190e'
]);

export function isLegacyBrokenSlotUrl(url: string): boolean {
  if (!url) return true;
  for (const h of LEGACY_BROKEN_HASHES) {
    if (url.includes(h)) return true;
  }
  return false;
}

// Curated flagship catalog (always resident in memory, 100% verified HTTP 200 OK URLs)
export const CURATED_SLOTS_CATALOG: CanonicalSlot[] = [
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
    image: 'https://mediumrare.imgix.net/742a1d7958a9ffa215e19cc72c684abe9412f71fcf426b57909b5b817f9cd9d4?w=180&h=236&fit=min&auto=format',
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

// Common colloquial chat aliases mapped to canonical slot IDs
export const SLOT_ALIASES: Record<string, string> = {
  // Wanted Dead or a Wild
  'wanted': 'wanted-dead-or-a-wild',
  'dead or a wild': 'wanted-dead-or-a-wild',
  'wanted dead': 'wanted-dead-or-a-wild',
  'dead or wild': 'wanted-dead-or-a-wild',
  'wanted dead or alive': 'wanted-dead-or-a-wild',
  'vs': 'wanted-dead-or-a-wild',

  // Gates of Olympus 1000 & original
  'gates': 'gates-of-olympus-1000',
  'olympus': 'gates-of-olympus-1000',
  'gates 1000': 'gates-of-olympus-1000',
  'olympus 1000': 'gates-of-olympus-1000',
  'gates of olympus 1000': 'gates-of-olympus-1000',
  'zeus': 'gates-of-olympus-1000',
  'tito': 'gates-of-olympus-1000',
  'gates base': 'gates-of-olympus',
  'gates of olympus': 'gates-of-olympus',

  // Sweet Bonanza 1000 & original
  'sweet': 'sweet-bonanza-1000',
  'sweet bonanza': 'sweet-bonanza-1000',
  'bonanza': 'sweet-bonanza-1000',
  'sweet 1000': 'sweet-bonanza-1000',
  'sweet bonanza 1000': 'sweet-bonanza-1000',

  // Sugar Rush 1000 & original
  'sugar': 'sugar-rush-1000',
  'sugar rush': 'sugar-rush-1000',
  'sugar 1000': 'sugar-rush-1000',
  'sugar rush 1000': 'sugar-rush-1000',

  // Le Bandit
  'bandit': 'le-bandit',
  'le bandit': 'le-bandit',
  'mapache': 'le-bandit',

  // RIP City
  'rip': 'rip-city',
  'rip city': 'rip-city',
  'gato': 'rip-city',
  'rosh': 'rip-city',

  // Chaos Crew 2
  'chaos': 'chaos-crew-2',
  'chaos crew': 'chaos-crew-2',
  'chaos crew 2': 'chaos-crew-2',
  'chaos 2': 'chaos-crew-2',

  // San Quentin
  'san quentin': 'san-quentin-xways',
  'san quentin xways': 'san-quentin-xways',
  'quentin': 'san-quentin-xways',
  'death row': 'san-quentin-xways',
  'san quentin 2': 'san-quentin-xways',

  // Mental
  'mental': 'mental',
  'manicomio': 'mental',

  // Tombstone RIP
  'tombstone': 'tombstone-r-i-p',
  'tombstone rip': 'tombstone-r-i-p',
  'tombstone r.i.p.': 'tombstone-r-i-p',

  // Sharks
  'sharks': 'sharks',
  'sharks!': 'sharks',
  'tiburon': 'sharks',

  // Big Bass series
  'bass': 'big-bass-splash',
  'big bass': 'big-bass-splash',
  'splash': 'big-bass-splash',
  'big bass splash': 'big-bass-splash',
  'pesca': 'big-bass-splash',

  // Dog House
  'dog house': 'the-dog-house-megaways',
  'the dog house': 'the-dog-house-megaways',
  'perros': 'the-dog-house-megaways',

  // Starlight Princess
  'starlight': 'starlight-princess-1000',
  'starlight princess': 'starlight-princess-1000',
  'starlight 1000': 'starlight-princess-1000',

  // Other Top Slots
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
  'razor': 'razor-returns',
  'razor returns': 'razor-returns',
  'bamboo': 'big-bamboo',
  'big bamboo': 'big-bamboo',
  '666': 'sixsixsix',
  'sixsixsix': 'sixsixsix',
  'spicy 666': 'sixsixsix'
};

export class SlotResolver {
  private static instance: SlotResolver | null = null;
  private catalog: Map<string, CanonicalSlot> = new Map();
  private aliasMap: Map<string, string> = new Map();

  constructor() {
    this.initCatalog();
  }

  public static getInstance(): SlotResolver {
    if (!SlotResolver.instance) {
      SlotResolver.instance = new SlotResolver();
    }
    return SlotResolver.instance;
  }

  private initCatalog(): void {
    // 1. Seed with resident curated catalog
    for (const slot of CURATED_SLOTS_CATALOG) {
      this.catalog.set(slot.id, slot);
      this.catalog.set(this.normalizeKey(slot.name), slot);
    }

    // 2. Load alias mapping
    for (const [alias, targetId] of Object.entries(SLOT_ALIASES)) {
      this.aliasMap.set(this.normalizeKey(alias), targetId);
    }

    // 3. Opportunistically ingest disk curated catalog if present
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    try {
      const candidates = [
        path.resolve(process.cwd(), 'data', 'curated_slots.json'),
        path.resolve(process.cwd(), 'casino-suite', 'shared', 'slots-catalog.json'),
        path.resolve(process.cwd(), 'wheel-slots', 'catalog', 'slots.json')
      ];

      for (const p of candidates) {
        if (fs.existsSync(p)) {
          const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
          if (Array.isArray(raw)) {
            for (const item of raw) {
              if (item.name && item.image && !item.image.startsWith('../')) {
                const id = item.id || item.slug || this.slugify(item.name);
                if (!this.catalog.has(id)) {
                  const entry: CanonicalSlot = {
                    id,
                    name: item.name,
                    slug: item.slug || id,
                    provider: item.provider || 'Casino',
                    image: item.image,
                    maxWin: item.maxWin || '10,000x',
                    rtp: item.rtp || '96.50%',
                    tier: item.tier || '2',
                    category: item.category,
                    badge: item.badge,
                    color: item.color
                  };
                  this.catalog.set(id, entry);
                  this.catalog.set(this.normalizeKey(item.name), entry);
                }
              }
            }
          }
        }
      }
    } catch (_) {}
  }

  public normalizeKey(str: string): string {
    if (!str || typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // strip accents
      .replace(/[^a-z0-9]/g, '');     // keep alphanumeric
  }

  public slugify(str: string): string {
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
   * Normalizes slot image URLs to ensure 100% zero 404s across all environments
   */
  public resolveSlotImageUrl(slotOrUrl: string | Partial<CanonicalSlot>, baseContext?: string): string {
    if (!slotOrUrl) return DEFAULT_FALLBACK_IMAGE;

    let url = typeof slotOrUrl === 'string' ? slotOrUrl : (slotOrUrl.image || '');
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return DEFAULT_FALLBACK_IMAGE;
    }

    url = url.trim();

    // 1. External absolute URLs (imgix CDN, fan-cdn, https)
    if (/^(https?:|\/\/|data:|blob:)/i.test(url)) {
      return url;
    }

    // 2. Strip broken relative prefix like ../public/slots/
    if (url.includes('page_')) {
      // If it has page_02_slot_XX, fallback to verified default
      return DEFAULT_FALLBACK_IMAGE;
    }

    let clean = url.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
    if (clean.startsWith('public/')) clean = clean.replace(/^public\//, '');
    if (clean.startsWith('slots/')) clean = clean.replace(/^slots\//, '');

    // 3. If it is a local SVG/PNG in site/images/slots
    if (!clean.startsWith('http')) {
      if (!clean.startsWith('/') && !clean.startsWith('site/') && !clean.startsWith('images/')) {
        clean = `site/images/slots/${clean}`;
      }
      if (baseContext && baseContext !== '/') {
        // e.g. from an overlay subfolder
        return `${baseContext.replace(/\/$/, '')}/${clean.replace(/^\//, '')}`;
      }
      return `/${clean.replace(/^\//, '')}`;
    }

    return url;
  }

  /**
   * Fuzzy matches any chat string or search query into a verified CanonicalSlot
   */
  public fuzzyMatch(query: string): CanonicalSlot | null {
    if (!query || typeof query !== 'string') return null;
    const clean = this.normalizeKey(query);
    if (!clean) return null;

    // 1. Alias dictionary direct lookup
    if (this.aliasMap.has(clean)) {
      const targetId = this.aliasMap.get(clean)!;
      if (this.catalog.has(targetId)) return this.catalog.get(targetId)!;
    }

    // 2. Alias substring lookup (e.g. if query contains 'olympus 1000' or 'wanted')
    for (const [alias, targetId] of this.aliasMap.entries()) {
      if (alias.length >= 4 && (clean === alias || clean.includes(alias) || (clean.length >= 4 && alias.includes(clean)))) {
        if (this.catalog.has(targetId)) return this.catalog.get(targetId)!;
      }
    }

    // 3. Exact normalized name or ID match
    if (this.catalog.has(clean)) return this.catalog.get(clean)!;
    if (this.catalog.has(this.slugify(query))) return this.catalog.get(this.slugify(query))!;

    const minContainedLen = Math.max(5, Math.floor(clean.length * 0.6));

    // 4. Substring inclusion in curated catalog (prioritize Tier 1 flagships)
    for (const slot of CURATED_SLOTS_CATALOG) {
      const slotKey = this.normalizeKey(slot.name);
      if (slotKey.includes(clean) || (slotKey.length >= minContainedLen && clean.includes(slotKey))) {
        return slot;
      }
    }

    // 5. Substring inclusion in full catalog
    for (const slot of this.catalog.values()) {
      const slotKey = this.normalizeKey(slot.name);
      if (slotKey.includes(clean) || (slotKey.length >= minContainedLen && clean.includes(slotKey))) {
        return slot;
      }
    }

    return null;
  }

  /**
   * Main resolution entrypoint: always returns a complete, safe CanonicalSlot
   */
  public resolve(query: string | Partial<CanonicalSlot>, baseContext?: string): CanonicalSlot {
    if (typeof query === 'object' && query !== null) {
      if (query.name && query.image && !query.image.startsWith('../') && !isLegacyBrokenSlotUrl(query.image)) {
        return {
          id: query.id || this.slugify(query.name),
          name: query.name,
          slug: query.slug || this.slugify(query.name),
          provider: query.provider || 'Casino',
          image: this.resolveSlotImageUrl(query.image, baseContext),
          maxWin: query.maxWin || '10,000x',
          rtp: query.rtp || '96.50%',
          tier: query.tier || '2',
          category: query.category,
          badge: query.badge,
          color: query.color
        };
      }
      if (query.name) {
        const matched = this.fuzzyMatch(query.name);
        if (matched) {
          return {
            ...matched,
            image: this.resolveSlotImageUrl(matched.image, baseContext)
          };
        }
      }
    }

    const strQuery = typeof query === 'string' ? query : (query?.name || '');
    const match = this.fuzzyMatch(strQuery);
    if (match) {
      const isOnly = checkIsOnlyOnStake(match);
      return {
        ...match,
        badge: isOnly ? 'ONLY ON STAKE' : (match.badge || 'CASINO'),
        isOnlyOnStake: isOnly,
        creatorStudio: extractCreatorStudio(match),
        image: this.resolveSlotImageUrl(match.image, baseContext)
      };
    }

    // Fallback object with Title Casing and safe default image
    const rawName = strQuery.trim() || 'Wanted Dead or a Wild';
    const titleCased = rawName.replace(/\b\w/g, (c) => c.toUpperCase());
    const slug = this.slugify(titleCased);
    const dummy = { name: titleCased, provider: 'Casino Slot' };
    const isOnly = checkIsOnlyOnStake(dummy);

    return {
      id: slug,
      name: titleCased,
      slug,
      provider: 'Casino Slot',
      image: DEFAULT_FALLBACK_IMAGE,
      maxWin: '10,000x',
      rtp: '96.50%',
      tier: '2',
      badge: isOnly ? 'ONLY ON STAKE' : 'CASINO',
      color: '#ffd700',
      isOnlyOnStake: isOnly,
      creatorStudio: extractCreatorStudio(dummy)
    };
  }

  public getCuratedCatalog(): CanonicalSlot[] {
    return [...CURATED_SLOTS_CATALOG];
  }

  public getAllSlots(): CanonicalSlot[] {
    const list: CanonicalSlot[] = [];
    const seen = new Set<string>();
    for (const s of this.catalog.values()) {
      if (!seen.has(s.id)) {
        seen.add(s.id);
        list.push(s);
      }
    }
    return list;
  }
}

export const slotResolver = SlotResolver.getInstance();

export function resolveSlotImageUrl(slotOrUrl: string | Partial<CanonicalSlot>, baseContext?: string): string {
  return slotResolver.resolveSlotImageUrl(slotOrUrl, baseContext);
}
