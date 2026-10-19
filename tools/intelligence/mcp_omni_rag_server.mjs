#!/usr/bin/env node
/**
 * tools/intelligence/mcp_omni_rag_server.mjs
 * =============================================================================
 * 🔌 HUNTHUB / DIGGITYBETS — SUPERCHARGED OMNI-RAG v5 MCP SERVER (STDIO)
 * =============================================================================
 * Exposes our local C-compiled SQLite FTS5 + MiniSearch + Exact IDF/LightRAG +
 * Squad Semantic Router + AST CodeGraph PageRank + Obsidian [[Wikilink]] Graph
 * over the standard Model Context Protocol (JSON-RPC 2.0 stdio).
 * =============================================================================
 */

import readline from 'node:readline';
import { queryKnowledge, queryCodeGraph, getClusterStats } from './rag_pipeline.mjs';
import { routeQueryToSquads } from './squad_semantic_router.mjs';

const SERVER_INFO = {
  name: 'hunthub-omni-rag-v5',
  version: '5.0.0'
};

const TOOLS = [
  {
    name: 'omni_rag_query',
    description:
      'Query the Supercharged Omni-RAG v5 Software Factory Brain (21,500+ chunks across 52 full books, 128 video courses, and canonical treatises). Uses C-compiled SQLite FTS5 + MiniSearch + IDF/LightRAG + Squad Semantic Router + 1-Hop Obsidian [[Wikilink]] Graph + optional ONNX Q8 Cross-Encoder.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Technical or conceptual search query (Spanish or English).' },
        limit: { type: 'number', description: 'Max chunks to return (default 5).' },
        rerank: { type: 'boolean', description: 'Enable local ONNX Q8 Cross-Encoder reranking.' }
      },
      required: ['query']
    }
  },
  {
    name: 'code_graph_query',
    description:
      'Query the deterministic AST CodeGraph + PageRank centrality index across all JS/TS/MJS files in site/, worker/, core/, overlay-*, and tools/. Returns classes, functions, window globals, /api/* routes, and caller/callee edges.',
    inputSchema: {
      type: 'object',
      properties: {
        symbol_or_file: { type: 'string', description: 'Symbol, class, method, API route, or filename to inspect.' },
        limit: { type: 'number', description: 'Max matching file nodes (default 8).' }
      },
      required: ['symbol_or_file']
    }
  },
  {
    name: 'omni_rag_stats',
    description: 'Return live health and node counts for Supercharged Omni-RAG v5, AST CodeGraph, Obsidian WikiGraph, and Qdrant Cloud.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

function sendResponse(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n');
}

function sendError(id, code, message) {
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }) + '\n');
}

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

rl.on('line', async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let req;
  try {
    req = JSON.parse(trimmed);
  } catch (_) {
    return;
  }

  const { id, method, params } = req;

  try {
    if (method === 'initialize') {
      sendResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO
      });
    } else if (method === 'notifications/initialized') {
      // No response required for notifications
    } else if (method === 'tools/list') {
      sendResponse(id, { tools: TOOLS });
    } else if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      if (toolName === 'omni_rag_query') {
        const q = String(args.query || '');
        const lim = Number(args.limit || 5);
        const useRerank = Boolean(args.rerank);
        const route = routeQueryToSquads(q);
        const hits = await queryKnowledge(q, lim, { fastLocalOnly: true, useOnnxRerank: useRerank });
        sendResponse(id, {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ squadRoute: route.primarySquad, results: hits }, null, 2)
            }
          ]
        });
      } else if (toolName === 'code_graph_query') {
        const res = queryCodeGraph(args.symbol_or_file || '', Number(args.limit || 8));
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify(res, null, 2) }]
        });
      } else if (toolName === 'omni_rag_stats') {
        const st = await getClusterStats();
        sendResponse(id, {
          content: [{ type: 'text', text: JSON.stringify(st, null, 2) }]
        });
      } else {
        sendError(id, -32601, `Unknown tool: ${toolName}`);
      }
    } else if (id !== undefined) {
      sendResponse(id, {});
    }
  } catch (err) {
    if (id !== undefined) {
      sendError(id, -32000, err.message || 'Internal MCP server error');
    }
  }
});
