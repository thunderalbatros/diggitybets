**Alcance:** Síntesis de Building Microservices (Sam Newman): límites de contexto, contratos de API desacoplados y resiliencia entre servicios. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 🏛️ Tratado Canónico: Building Microservices (Sam Newman)
### Basado en: *Building Microservices (2nd Edition)*
**Autor:** Sam Newman (O'Reilly Media)
**Ubicación:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\02_Arquitectura_Sistemas_y_Clean_Code\Building Microservices 2nd Edition - Sam Newman.pdf`

---

## 1. Desacoplamiento y Cohesión en Arquitecturas de Servicios

Sam Newman advierte que un microservicio no se define por la cantidad de líneas de código, sino por su **independencia de despliegue**:

> **"Si para cambiar un servicio necesitas desplegar otros dos servicios al mismo tiempo, no tienes microservicios; tienes un monolito distribuido acoplado con la peor complejidad de ambos mundos."**
> — Sam Newman

---

## 2. La Arquitectura Híbrida de Yendo (Modular Monolith en Supabase + Workers Asíncronos)

Siguiendo el principio de Newman:
1. **El Núcleo Transaccional (Supabase / PostgreSQL):** Gestiona usuarios, squads, reservas y estados de venues en una única base de datos relacional con RLS, evitando transacciones distribuidas complejas (2-Phase Commit).
2. **Workers Satélite Autónomos (Cloud Run / Vertex / Scrapers):** Tareas pesadas de ingesta de eventos culturales, transcripción de audios y vectorización se ejecutan de forma asíncrona en el worker Node.js sin impactar la latencia del core transaccional.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Database_Bootstrap_Dossier]]
- [[Supabase]]
