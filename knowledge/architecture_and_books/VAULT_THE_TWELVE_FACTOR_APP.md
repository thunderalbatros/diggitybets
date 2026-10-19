**Alcance:** Metodología The Twelve-Factor App para aplicaciones cloud-native: configuración en variables de entorno, procesos sin estado y paridad dev/prod. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

---
version: 1.0.0
tipo: research
tags:
  - yendo-mobile
  - architecture
  - en-progreso
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# ⚙️ Tratado Canónico: The Twelve-Factor App
### Basado en: *The Twelve-Factor App Manifesto*
**Autor:** Adam Wiggins & Equipo Heroku
**Ubicación Fuente:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\12factor.epub`

---

## 1. Los 12 Factores para Aplicaciones Modernas y Resilientes

1. **Base de Código (Codebase):** Una base de código rastreada en Git, múltiples despliegues (dev, staging, prod).
2. **Dependencias:** Declarar y aislar dependencias explícitamente (`package.json` con lockfiles estrictos).
3. **Configuraciones:** Guardar la configuración en variables de entorno (`.env`), jamás hardcodeadas en código.
4. **Servicios de Respaldo (Backing Services):** Tratar a Supabase, Qdrant y Vertex AI como recursos conectables.
5. **Construir, Desplegar, Ejecutar:** Separación estricta entre las etapas de build (EAS build) y ejecución.
6. **Procesos:** Ejecutar la aplicación como uno o más procesos sin estado (Stateless).
7. **Asignación de Puertos:** Exportar servicios mediante vinculación a puertos.
8. **Concurrencia:** Escalar horizontalmente mediante el modelo de procesos.
9. **Desechabilidad:** Maximizar la robustez con inicios rápidos y apagados limpios.
10. **Paridad en Desarrollo y Producción:** Mantener dev, staging y prod lo más similares posible.
11. **Historiales (Logs):** Tratar los logs como transmisiones de eventos continuos.
12. **Procesos de Administración:** Ejecutar tareas de administración/migración como procesos puntuales (scripts en `tools/`).

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[QA_DEVOPS_PIPELINE]]
- [[Supabase]]
