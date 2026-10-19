# CANON: 21st.dev — The npm for Design Engineers & Component Ecosystem (2026)

> **Autor/Organización:** Serafim Kovalchuk (`serafimcloud`), 21st Labs (`github.com/21st-dev`)  
> **Área:** UI/UX Design Engineering, Component Registries, AI-Assisted Front-End, Micro-Interactions  
> **Alcance en HuntHub / DiggityBets:** Suite Web, Overlays de OBS, Paneles de Control del Streamer  
> **Estado:** Ingestado y Activo en Centinela RAG y Suite de Skills  

---

## 1. ¿Qué es 21st.dev y por qué es un estándar de la industria?

`21st.dev` es el marketplace y registro abierto conocido como **"The npm for Design Engineers"**. Nació para resolver el gran problema del front-end moderno: mientras que `npm` distribuye paquetes empaquetados y cajas negras, los ingenieros de diseño necesitan componentes con **código fuente accesible**, altamente estéticos, composables y compatibles con Tailwind CSS, Radix UI, Base UI y `shadcn/ui`.

Reúne los mejores patrones de la comunidad moderna:
- **Magic UI:** Bento grids, animated beams, border beams, number tickers, text effects (blur, typing, sparkle).
- **Cult UI & Aceternity UI:** Shaders de WebGL ligeros, botones magnéticos, cartas holográficas, gradientes animados.
- **Micro-interacciones de Emil Kowalski:** Transiciones táctiles de 60 FPS, física elástica (springs) y diseño centrado en el detalle invisible.

---

## 2. Herramientas del Ecosistema `21st-dev` en GitHub

| Herramienta | Repositorio / Paquete | Función Principal |
| :--- | :--- | :--- |
| **21st MCP (`magic-mcp`)** | `github.com/21st-dev/magic-mcp` | Servidor Model Context Protocol que dota a agentes de IA (Cursor, Windsurf, Claude Code, Antigravity) de búsqueda, inspección y extracción de componentes en tiempo real (`search`, `get_component`, `get_inspiration`, `search_logo`). |
| **21st CLI** | `@21st-dev/cli` (npm) | Herramienta CLI para inicializar proyectos y añadir bloques directamente desde la terminal. |
| **1code** | `github.com/21st-dev/1code` | Orquestador multi-agente de escritorio para ejecutar instancias paralelas de agentes en Git worktrees aislados. |
| **Marketplace Registry** | `21st.dev` | Plataforma comunitaria de descubrimiento, ranking, previsualización en vivo y variantes de componentes. |

---

## 3. Estado en HuntHub: ¿Le estamos sacando el jugo?

### 3.1 Lo que ya hemos implementado con éxito
1. **Electric Border / Border Beam:** Adaptado en el panel de King of the Hill (`#pub-koth-announcement-banner`) y en las esquinas de duelo de `overlay-battle/`, utilizando conic-gradients animados por WAAPI/CSS para 0% de sobrecarga de CPU en OBS.
2. **NumberFlow / Animated Counter:** Implementado en los KPIs de `overlay-bonushunt/` y en el acumulador de racha del trono 1v1.
3. **Cartas Holográficas con Brillo 3D (HoloCard Glare):** Inspiradas en las cartas interactivas de 21st.dev para mostrar las slots en formato vertical 3:4 (180x236).
4. **Clonado en Base de Referencias:** Ya teníamos clonado el repositorio oficial en `references/ui-kb/1-design-systems-and-skills/magic-mcp/`.

### 3.2 Oportunidades y Gaps que ahora quedan activados
Para sacarle el 100% del jugo a esta tecnología en nuestro flujo de trabajo:
1. **Skill Nativa `.agents/skills/21st-ui/`:** Se integró la skill operativa para que cualquier agente de Antigravity pueda consultar patrones de diseño de 21st.dev bajo demanda.
2. **Configuración `.mcp.json`:** Se preparó la configuración nativa del servidor MCP de 21st (`https://21st.dev/api/mcp`) para permitir consultas directas en vivo con API Key gratuita de [21st.dev/mcp](https://21st.dev/mcp).
3. **Catálogo de Componentes de Alto Impacto para Streamers de Casino:**
   - **Bento Grid Asimétrico:** Para reorganizar el Master Admin Deck y la vista de finanzas sin saturación visual.
   - **Shimmer / Pulse Buttons:** Botones con reflejo metálico continuo para acciones de alta prioridad (`!battle`, `Cashout`, `Spin Wheel`).
   - **Continuous Marquee / Ticker:** Barra de desplazamiento infinito en bucle continuo para anunciar los últimos pagos y canjes de tienda.
   - **Interactive Particles & Confetti:** Explosiones de confeti ligeras para el Grand Champion de $20.00 y jackpot de Guess The Balance.

---

## 4. Protocolo de Adaptación a Vanilla CSS & $0 Budget

Dado que HuntHub opera bajo un presupuesto estricto de **$0 USD** y un requerimiento crítico de **≤5% de uso de CPU dentro de OBS Studio (HP 250 G8)**:
1. **Cero Dependencias Pesadas:** Cuando se extrae un componente de 21st.dev escrito en React/Framer Motion, el agente lo traduce a HTML5 semántico + Vanilla CSS (`@keyframes`, CSS Custom Properties) o Web Animations API (WAAPI).
2. **Paleta Unificada Dark Glassmorphism:** Todos los tokens de Tailwind (`bg-zinc-900`, `border-amber-500`) se mapean a los tokens nativos de HuntHub:
   - `--bg-card: rgba(18, 26, 43, 0.75)`
   - `--gold: #ffd700`
   - `--kick-green: #53fc18`
   - `--cyan: #00e5ff`
   - `--magenta: #ff2a5f`
3. **Presupuesto Cromático 90/8/2:** 90% fondo oscuro/vidrio, 8% información de contraste blanco/gris, 2% acento vibrante (oro/verde/cyan).

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[DESIGN_MASTERY_2026]] · [[AGENT_CREATIVE_AND_VISUAL_AWARENESS_2026]] · [[CANON_REFACTORING_UI_WATHAN_SCHOGER]] · [[CANON_PRACTICAL_UI_ADHAM_DANNAWAY]] · #ui_ux_design
