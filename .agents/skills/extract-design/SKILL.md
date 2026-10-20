---
name: extract-design
description: "Extract the full design language and tokens from any website URL."
---

# Extract Design Language & Visual Benchmarking

Extract design tokens, typography scales, palettes, and visual components from live websites using headless browser automation (`designlang`).

## Key Commands
- **Extract design system from URL:**
  ```bash
  npx designlang <url> --screenshots --dark
  ```
- **Compare two websites visually & systematically:**
  ```bash
  npx designlang diff <urlA> <urlB>
  ```
- **Multi-page deep crawl:**
  ```bash
  npx designlang <url> --depth 3 --screenshots
  ```

## Generated Artifacts
1. `*-design-language.md`: Contexto estructurado en Markdown para agentes LLM.
2. `*-preview.html`: Galería visual con paleta cromática, escala de fuentes y sombras.
3. `*-variables.css`: Variables CSS nativas (`--bg-primary`, `--accent-gold`, etc.).
4. `*-design-tokens.json`: Formato estándar W3C Design Tokens.
5. `*-tailwind.config.js` y `*-shadcn-theme.css`: Configuraciones listas para usar.
