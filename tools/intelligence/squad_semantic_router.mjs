#!/usr/bin/env node
/**
 * tools/intelligence/squad_semantic_router.mjs
 * =============================================================================
 * 🧭 SQUAD SEMANTIC ROUTER + SELF-RAG / CRAG + 1-HOP WIKILINK GRAPH EXPANDER
 * =============================================================================
 * Ported and evolved from yendo-mobile's semanticRouter.js & selfRagCrag.js
 * specifically for the HuntHub / DiggityBets Web Software Factory.
 *
 * Features:
 *  1. <1ms Squad Domain Classification across our 5 Web Software Factory domains:
 *     - ui_ux_design (Squad 4: Frontend, UI/UX, Psychology, Gamification, CRO)
 *     - motion_and_animation (Squad 5: 60-FPS Motion, Shaders, 3D, WebAudio)
 *     - cybersecurity (Squad 6: XSS, CSP, OAuth 2.1 PKCE, Anti-Bot, Crypto)
 *     - streaming_and_overlays (Squad 3: Kick API, Overlays, Slots RTP, Bounties)
 *     - architecture_and_books (Squad 2: Cloudflare Edge, DO, SQLite, Clean Code, RAG)
 *  2. 1-Hop Obsidian [[Wikilink]] Graph Boost + PageRank Centrality weighting.
 *  3. Self-RAG / CRAG Confidence Grader (CORRECT / AMBIGUOUS / LOW).
 * =============================================================================
 */

const SQUAD_DOMAINS = {
  ui_ux_design: {
    squad: 'Squad 4 — Design Systems, OKLCH Tokens, Typography & Frontend Architect',
    folderPrefix: 'knowledge/ui_ux_design/',
    keywords: [
      'ui', 'ux', 'diseño', 'design', 'minimalista', '90/8/2', 'apca', 'oklch', 'dtcg', 'wcag',
      'accesibilidad', 'tipografia', 'bringhurst', 'butterick', 'grilla', 'grid', 'aurea', 'golden',
      'wathan', 'schoger', 'refactoring', 'dannaway', 'kholmatova', 'norman', 'fitts', 'hick',
      'utopia', 'clamp', 'de-boxing', 'arnheim', 'gestalt', 'albers'
    ]
  },
  gamification_and_cro: {
    squad: 'Squad 8 — Interactive Crowd-Play Games, Gamification (Octalysis) & CRO Psychology',
    folderPrefix: 'knowledge/ui_ux_design/',
    keywords: [
      'fogg', 'b=map', 'thaler', 'misbehaving', 'nudge', 'kahneman', 'ariely', 'octalysis',
      'gamificacion', 'gamification', 'hooked', 'cialdini', 'conversion', 'cro', 'afiliados',
      'crowd', 'crowd play', 'schell', 'sylvester', 'werbach', 'marczewski', 'zichermann'
    ]
  },
  motion_and_animation: {
    squad: 'Squad 5 — Creative Tech, 60-FPS Motion, Shaders, WebAudio & OBS Overlays',
    folderPrefix: 'knowledge/motion_and_animation/',
    keywords: [
      'animacion', 'animaciones', 'animation', 'animations', '60fps', 'kowalski', 'spring',
      'springs', 'waapi', 'bezier', 'linear()', 'starting-style', 'interpolate-size', 'gsap',
      'flip', 'devouring details', 'freiberg', 'shader', 'shaders', 'glsl', 'sdf', 'quilez',
      'webgpu', 'threejs', 'tsl', 'pbr', 'foil', 'holo', 'laser', 'webaudio', 'zzfx',
      'dynamicscompressor', 'audio', 'swink', 'game feel', 'kirupa', 'nabors', 'disney',
      'illusion of life', 'wwdc', 'atropos', 'parallax', 'compositor', 'will-change'
    ]
  },
  cybersecurity_and_visual_qa: {
    squad: 'Squad 6 — Adversarial Security, 5-Gate Visual QA & VLM Critic',
    folderPrefix: 'knowledge/cybersecurity/',
    keywords: [
      'ciberseguridad', 'cybersecurity', 'security', 'seguridad', 'xss', 'dompurify',
      'trustedtypes', 'csp', 'csrf', 'oauth', 'pkce', 'webhook', 'rsa', 'sha256',
      'hmac', 'cryptography', 'criptografia', 'anti-bot', 'thumbmark', 'turnstile',
      'sybil', 'owasp', 'asvs', 'shostack', 'stride', 'wong', 'anderson', 'hitl',
      'vlm', 'playwright', 'lighthouse', 'pa11y', 'break-ui', 'uxbench', 'uiguard'
    ]
  },
  streaming_and_overlays: {
    squad: 'Squad 3 — Kick Integration, OBS Overlays & Casino Math',
    folderPrefix: 'knowledge/streaming_and_overlays/',
    keywords: [
      'kick', 'pusher', 'overlay', 'overlays', 'obs', 'cpu', 'slot', 'slots', 'stake',
      'rtp', 'volatilidad', 'volatility', 'barboianu', 'bounty', 'bountys', 'bounties',
      'bet_id', 'multiplicador', 'sorteo', 'giveaway', 'custody', 'custodia', 'loyalty',
      'puntos', 'chat'
    ]
  },
  architecture_and_books: {
    squad: 'Squad 2 & Squad 9 — Edge Backend, Self-Evolving Meta-Coach & Omni-RAG v5',
    folderPrefix: 'knowledge/architecture_and_books/',
    keywords: [
      'cloudflare', 'worker', 'workers', 'durable', 'objects', 'hibernation', 'websocket',
      'sqlite', 'fts5', 'rag', 'lightrag', 'hipporag', 'rerank', 'cross-encoder', 'onnx',
      'qdrant', 'minisearch', 'clean architecture', 'codigo limpio', 'kleppmann', 'petrov',
      'sre', 'nygard', 'typescript', 'valibot', 'harness', 'agent', 'agents', 'karpathy',
      'langgraph', 'curated_master_books', 'catalogo', 'textgrad', 'dspy', 'skillsmith',
      'speculative rag', 'context caching', 'skelton', 'pais', 'team topologies', 'anthropic'
    ]
  }
};

/**
 * Classifies a query in <1ms into matching Squad domains
 */
export function routeQueryToSquads(queryString) {
  const qLower = String(queryString || '').toLowerCase();
  const scores = [];

  for (const [domainKey, cfg] of Object.entries(SQUAD_DOMAINS)) {
    let matches = 0;
    for (const kw of cfg.keywords) {
      if (qLower.includes(kw)) matches++;
    }
    if (matches > 0) {
      scores.push({
        domain: domainKey,
        squad: cfg.squad,
        folderPrefix: cfg.folderPrefix,
        matches
      });
    }
  }

  scores.sort((a, b) => b.matches - a.matches);
  return {
    primarySquad: scores[0] || {
      domain: 'architecture_and_books',
      squad: 'Squad 0/2 — General Architecture & Knowledge',
      folderPrefix: 'knowledge/',
      matches: 0
    },
    activeDomains: scores.slice(0, 2)
  };
}

/**
 * Evaluates CRAG (Corrective RAG) confidence & applies gentle Squad + PageRank + 1-Hop Wikilink boosts
 */
export function applyCragAndGraphRefinement(candidates, queryString, wikiGraph = null) {
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return { results: [], cragStatus: 'LOW', route: routeQueryToSquads(queryString) };
  }

  const route = routeQueryToSquads(queryString);
  const activePrefixes = route.activeDomains.map(d => d.folderPrefix);

  // Build 1-hop neighbor set from top 3 candidates if wikiGraph is available
  const oneHopTargets = new Set();
  const prLookup = new Map();
  if (wikiGraph && Array.isArray(wikiGraph.edges)) {
    for (const n of wikiGraph.nodes || []) {
      prLookup.set(n.id, n.pagerank || 0);
    }
    const topSources = candidates.slice(0, 3).map(c => String(c.source || c.id).replace(/^local:\/\//, '').split('#')[0]);
    for (const edge of wikiGraph.edges) {
      if (topSources.includes(edge.source)) oneHopTargets.add(edge.target);
      if (topSources.includes(edge.target)) oneHopTargets.add(edge.source);
    }
  }

  for (const item of candidates) {
    const cleanRel = String(item.source || item.id).replace(/^local:\/\//, '').split('#')[0];
    let mult = 1.0;

    // Gentle Squad domain alignment boost (+4%) so we never distort top exact matches
    if (activePrefixes.some(pref => cleanRel.startsWith(pref))) {
      mult += 0.04;
    }
    // Gentle 1-hop Obsidian [[Wikilink]] neighbor boost (+2%)
    if (oneHopTargets.has(cleanRel)) {
      mult += 0.02;
    }
    // Gentle PageRank centrality bonus (up to +2%)
    const pr = prLookup.get(cleanRel) || 0;
    if (pr > 0) {
      mult += Math.min(0.02, pr * 0.002);
    }

    const baseRrf = item.rrfScore || item.fusedScore || item.score || 0.01;
    item.rrfScore = baseRrf * mult;
    item.fusedScore = item.rrfScore;
    item.squadDomain = route.primarySquad.domain;
  }

  candidates.sort((a, b) => (b.rrfScore || 0) - (a.rrfScore || 0));

  const topScore = candidates[0]?.rrfScore || 0;
  const cragStatus = topScore >= 0.035 ? 'CORRECT' : (topScore >= 0.018 ? 'AMBIGUOUS' : 'LOW');

  return {
    results: candidates,
    cragStatus,
    route
  };
}
