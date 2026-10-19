> **Alcance:** Literatura canónica de diseño UI/UX, sistemas de diseño, psicología cognitiva, economía conductual, gamificación y conversión (CRO) para la Software Factory Web y DiggityBets.

---
version: 1.0.0
tipo: guia
tags:
  - yendo-mobile
  - tech-stack
  - canonico
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# Ecosistema Open-Source SOTA para Potenciar el Squad Agéntico de UX/UI en Yendo

Este dossier establece la hoja de ruta para la incorporación de herramientas de código abierto (OSS) diseñadas para transformar al equipo de agentes de Yendo en una agencia autónoma de Producto, Diseño de Interacción y Accesibilidad de nivel mundial.

---

## 1. El Salto de "Vibe Coding" a "Agentic Design System"

En 2026, la interacción de agentes con interfaces móviles ha superado la mera generación de código a partir de texto. El paradigma dominante es el de los **Sistemas de Diseño Agénticos**: infraestructuras donde el sistema de diseño (tokens, componentes, directrices de ergonomía y accesibilidad) funciona como una API viva consultable mediante el **Model Context Protocol (MCP)**.

---

## 2. Herramientas Open-Source Recomendadas para Integración

### A. Microsoft OmniParser (Percepción Visual y Semántica de Pantallas Móviles)
- **Repositorio:** `microsoft/OmniParser`
- **Función:** Tokenizador visual de interfaces móviles. Toma capturas de pantalla de la app en ejecución y las descompone en elementos accionables (botones, campos, íconos) con sus respectivas cajas delimitadoras (*bounding boxes*) y jerarquías visuales.
- **Impacto en Yendo:** Permite al agente de QA y diseño "ver" la interfaz renderizada real en emulador, midiendo si los botones cumplen con la Ley de Fitts (>=48dp) y si el contraste visual de los textos sobre fotos cumple la norma WCAG AAA.

### B. Penpot (Alternativa Soberana y Open-Source a Figma)
- **Tecnología:** Vectorial nativa basada en SVG, estándares web y API REST abierta.
- **Impacto en Yendo:** Permite generar tableros visuales, wireframes y componentes mediante código y llamadas MCP. Elimina el bloqueo de suscripciones privativas y permite sincronización bidireccional entre el código React Native y los esquemas visuales.

### C. Style Dictionary (Amazon) + Tokens Studio Engine
- **Tecnología:** Motor agnóstico para compilación y versionado de Design Tokens.
- **Impacto en Yendo:** Fuente única de la verdad (*Single Source of Truth*) para la paleta OLED (`#121212`, `#1E1E1E`, `#FF5500`), tipografías (Plus Jakarta Sans, Inter), radios de curvatura y físicas de resorte. Compila automáticamente hacia React Native, Skia, Tailwind y Penpot.

### D. Flashlight (BAM / GeekyAnts)
- **Tecnología:** Profiler de rendimiento móvil para React Native, equivalente a Lighthouse pero para aplicaciones móviles.
- **Impacto en Yendo:** Mide con precisión milimétrica los FPS reales, el consumo de CPU y el tiempo de respuesta interactiva (TTI). Garantiza que ninguna animación con Reanimated o Skia caiga por debajo de 60 FPS.

### E. Axe-core & `react-native-a11y`
- **Tecnología:** Motor estándar de auditoría de accesibilidad.
- **Impacto en Yendo:** Evaluación determinística en CI/CD que certifica roles de accesibilidad, etiquetas de voz para lectores de pantalla y ratios de contraste de color.

### F. Simulación de Usuarios Sintéticos (Synthetic Personas)
- **Tecnología:** Frameworks multi-agente basados en `Generative Agents` (Stanford) y `CrewAI`.
- **Impacto en Yendo:** Simulación de arquetipos porteños ("Martín, 24 años, introvertido, busca speakeasy tranquilo" vs "Florencia, 29 años, extrovertida, busca jam de jazz") recorriendo los flujos de la app para detectar puntos de fricción cognitiva antes de pruebas de campo con usuarios reales.

---

## Relaciones de Contexto
- [[.knowledge/YENDO_DNA.md]]
- [[.knowledge/YENDO_LIBRARY.md]]
- [[.knowledge/DESIGN_SYSTEM_MAP.md]]
- [[.knowledge/dossiers/Dossier_Gobernanza_Datos_Qdrant_Supabase.md]]
- [[.knowledge/VISUAL_GUIDELINES.md]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Reanimated]]
- [[React Native Skia]]
