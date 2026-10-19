**Alcance:** Síntesis de Distributed Systems (Tanenbaum & Van Steen): relojes lógicos, consistencia eventual, replicación y tolerancia a fallos. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 🌐 Tratado Canónico: Sistemas Distribuidos (Andrew S. Tanenbaum)
### Basado en: *Distributed Systems: Principles and Paradigms (2nd/3rd Edition)*
**Autores:** Andrew S. Tanenbaum & Maarten van Steen (Pearson)
**Ubicación Fuente:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\2006-Book-distributed systems principles and paradigms 2nd edition.pdf` (702 páginas)

---

## 1. La Definición Clásica de Sistema Distribuido

> **"Un sistema distribuido es una colección de computadoras autónomas que se presentan ante sus usuarios como un sistema coherente único."**
> — Andrew S. Tanenbaum

### Las 8 Falacias de la Computación Distribuida (Deutsch):
1. La red es confiable.
2. La latencia es cero.
3. El ancho de banda es infinito.
4. La red es segura.
5. La topología nunca cambia.
6. Solo hay un administrador.
7. El costo del transporte de datos es cero.
8. La red es homogénea.

---

## 2. Consenso, Tolerancia a Particiones y Consistencia Eventual

Tanenbaum y Van Steen detallan los modelos de consistencia frente a fallas de red:
- **En la noche de CABA:** La conectividad 4G/5G en el subsuelo de un club nocturno colapsa con frecuencia (partición de red temporal).
- **Estrategia Yendo Offline-First:**
  - El ticket de acceso confirmado y su firma criptográfica se persisten en local (**MMKV**).
  - El check-in puede verificarse de forma local y asíncrona mediante validación de firma con clave pública del venue, sincronizando el estado con Supabase en cuanto se recupere la conexión.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Database_Bootstrap_Dossier]]
- [[Supabase]]
