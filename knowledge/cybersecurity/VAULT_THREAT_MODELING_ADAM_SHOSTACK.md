**Alcance:** Síntesis de Threat Modeling: Designing for Security (Adam Shostack): metodología STRIDE, árboles de ataque y mitigación temprana. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 🔍 Tratado Canónico: Threat Modeling (Adam Shostack)
### Basado en: *Threat Modeling: Designing for Security*
**Autor:** Adam Shostack (Experto en Seguridad de Microsoft / Autor de STRIDE)
**Ubicación Fuente:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\Threat Modeling - Shostack, Adam.pdf` (624 páginas)

---

## 1. Las 4 Preguntas Fundamentales del Modelado de Amenazas

1. **¿Qué estamos construyendo?** (Diagrama de Flujo de Datos - DFD: App Web Platform $\to$ Supabase REST $\to$ Qdrant Cloud $\to$ Gateways de Pago).
2. **¿Qué puede salir mal?** (Análisis de vectores de ataque STRIDE).
3. **¿Qué vamos a hacer al respecto?** (Mitigaciones de arquitectura y controles de seguridad).
4. **¿Hicimos un buen trabajo?** (Pruebas de regresión, pentesting estático y dinámico con MobSF).

---

## 2. La Matriz STRIDE Aplicada a Yendo Mobile

| Amenaza STRIDE | Definición | Vector de Ataque en Yendo | Mitigación Innegociable en Yendo |
| :--- | :--- | :--- | :--- |
| **S - Spoofing (Suplantación)** | Hacerse pasar por otro usuario o venue. | Clonar credenciales de sesión o falsificar tokens JWT. | Tokens almacenados en SecureStore cifrado con AES-GCM; rotación de tokens por refresh token seguro. |
| **T - Tampering (Manipulación)** | Modificar datos en tránsito o en reposo. | Alterar el monto a pagar o la geolocalización GPS de check-in. | Firma criptográfica de transacciones en backend; validación de geofence con PostGIS en servidor, no en cliente. |
| **R - Repudiation (Repudio)** | Negar haber realizado una acción. | Un usuario afirma que nunca reservó la mesa o el venue niega el ingreso. | Ledger de auditoría inmutable en Postgres con logs de eventos firmados temporalmente. |
| **I - Information Disclosure (Fuga de Información)** | Revelar datos sensibles a partes no autorizadas. | Exponer la ubicación en tiempo real de usuarios sin consentimiento mutuo. | **Protocolo Anti-Voyeurismo:** Solo se comparte presencia cuando ambos usuarios pertenecen al mismo Squad con quórum aceptado. |
| **D - Denial of Service (Denegación de Servicio)** | Saturar el servicio para dejarlo inaccesible. | Spam de requests a la API de búsqueda o quórum. | Rate limiting en Cloudflare / Supabase Supavisor; timeouts estrictos de 8000ms. |
| **E - Elevation of Privilege (Elevación de Privilegios)** | Un usuario común ejecuta acciones de admin o venue. | Modificar el `user_metadata` en el cliente para ganar rol `venue_owner`. | La autorización reside exclusivamente en `raw_app_meta_data` controlado por el servidor, jamás en `user_metadata`. |

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[CYBERSECURITY_MASTER_PROTOCOL]]
- [[Protocolo_Anti_Voyeurismo_Privacidad_Progresiva]]
- [[PostGIS]]
- [[Supabase]]
