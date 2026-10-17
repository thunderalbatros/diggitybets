---
name: firecrawl
description: Extrae contenido web dinámico (SPAs), documentación técnica y datos de casinos/slots en Markdown limpio o JSON estructurado tipado usando Firecrawl con fallback autónomo a Cheerio.
---

# Firecrawl Web Extractor & Structured Ingestion Skill

Usa esta skill cuando necesites:
1. Extraer información de páginas web modernas con Single Page Applications (React, Next.js, Vue) donde un `fetch` básico o Cheerio falla por requerir JavaScript.
2. Ingestar documentación técnica, especificaciones de APIs y datos de juegos/casinos para enriquecer la base de conocimiento del sitio web.
3. Extraer contenido de la web en Markdown semántico limpio para el RAG (`knowledge/`) sin desperdiciar tokens de contexto con cabeceras, footers o cookies.

## Modos de Ejecución

### 1. Extracción de Markdown Limpio a Bóveda RAG
```bash
node tools/scrapers/extraer_web_firecrawl.js "https://sitio.com/documentacion"
```
*Guarda automáticamente el archivo canónico en `knowledge/` en Markdown limpio.*

### 2. Extracción Estructurada JSON
```bash
node tools/scrapers/extraer_web_firecrawl.js "https://sitio.com/api" --json
```
*Extrae los campos tipados `{ titulo, url, metadata, contenido }` listos para ser consumidos por el sistema.*

### 3. Búsqueda Web Unificada
```bash
node tools/scrapers/extraer_web_firecrawl.js --search "casino slot rtp formulas"
```

## Resiliencia y Fallback
Si no hay `FIRECRAWL_API_KEY` configurada o la API externa no responde, la herramienta automáticamente invoca el parser local `tools/scrapers/leer_url.js` (Cheerio + Fetch), garantizando que el agente nunca quede bloqueado.
