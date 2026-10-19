**Alcance:** Síntesis de Real-World Cryptography (David Wong): funciones hash, MACs, firmas digitales, CSPRNG, TLS y protocolos autenticados. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 🔐 Tratado Canónico: Real-World Cryptography (David Wong)
### Basado en: *Real-World Cryptography*
**Autor:** David Wong (Ingeniero de Criptografía, ex-Cloudflare / O(1) Labs)
**Ubicación Fuente:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\Real-World_Cryptography.pdf` (544 páginas)

---

## 1. Criptografía Práctica y Moderna para Sistemas Distribuidos

David Wong descarta los algoritmos obsoletos (MD5, SHA-1, RSA con claves pequeñas, DES) y estandariza los bloques de construcción modernos para 2026:

1. **Cifrado Autenticado con Datos Asociados (AEAD):**
   - Uso mandatorio de **AES-256-GCM** o **ChaCha20-Poly1305**. Garantizan tanto confidencialidad como integridad matemática (resistencia a manipulación de bits).
2. **Firmas Digitales de Curvas Elípticas de Alta Velocidad (Ed25519):**
   - Claves de 32 bytes y firmas de 64 bytes. Inmunes a ataques de timing en side-channel; rendimiento 10x superior a RSA para la firma de pases en dispositivos móviles.
3. **Funciones de Derivación de Claves Fuertes (KDF):**
   - **Argon2id** o **PBKDF2** con alto coste computacional para hashing de claves maestras y evitar ataques de fuerza bruta en GPU.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[CYBERSECURITY_MASTER_PROTOCOL]]
- [[01_CANON_PAPERS_SEMINALES_CRIPTOGRAFIA_PROTOCOLOS]]
