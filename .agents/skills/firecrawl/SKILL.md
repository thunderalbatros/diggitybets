---
name: firecrawl
description: Extrae contenido web dinámico (SPAs), agendas culturales de CABA y datos de venues en Markdown limpio (93% menos tokens) o JSON estructurado tipado usando Firecrawl con fallback autónomo a Cheerio.
---

# Firecrawl Web Extractor & Structured Ingestion Skill

Usa esta skill cuando necesites:
1. Extraer información de páginas web modernas con Single Page Applications (React, Next.js, Vue) donde un `fetch` básico o Cheerio falla por requerir JavaScript.
2. Ingestar agendas de eventos de la Ciudad Autónoma de Buenos Aires (Passline, Konex, Niceto Club, Bebop, teatros independientes) para alimentar la base de datos de Yendo.
3. Extraer contenido de la web en Markdown semántico limpio para el RAG (`.knowledge/`) sin desperdiciar tokens de contexto con cabeceras, footers o cookies.

## Modos de Ejecución

### 1. Extracción de Markdown Limpio a Bóveda RAG
```bash
node tools/scrapers/extraer_web_firecrawl.js "https://sitio.com/evento"
```
*Guarda automáticamente el archivo canónico en `.knowledge/🌐_web_scraping/Lectura_Firecrawl_*.md` cumpliendo el Filtro Guardián.*

### 2. Extracción Estructurada JSON (Venues y Eventos CABA)
```bash
node tools/scrapers/extraer_web_firecrawl.js "https://sitio.com/evento" --json
```
*Extrae los campos tipados `{ titulo, venue, direccion, barrio, precio_ars, fecha_hora, categoria }` listos para insertar en Supabase PostGIS.*

### 3. Búsqueda Web Unificada
```bash
node tools/scrapers/extraer_web_firecrawl.js --search "cafes de especialidad en palermo con enchufes"
```

## Resiliencia y Fallback
Si no hay `FIRECRAWL_API_KEY` configurada o la API externa no responde, la herramienta automáticamente invoca el parser local `tools/scrapers/leer_url.js` (Cheerio + Fetch), garantizando que el agente nunca quede bloqueado.
