**Alcance:** Prevención de ingeniería social, phishing, suplantación de identidad en comunidades de streaming y defensa del panel de administración. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 🎭 Tratado Canónico: Ingeniería Social y Seguridad Humana (Hadnagy)
### Basado en: *Social Engineering: The Art of Human Hacking*
**Autor:** Christopher Hadnagy
**Ubicación:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\01_Ciberseguridad_Cripto_y_Hacking\Social Engineering - the Art of Human Hacking.pdf`

---

## 1. El Factor Humano como el Eslabón más Vulnerable

Christopher Hadnagy demuestra que los cortafuegos y el cifrado más sofisticados son inútiles si un atacante puede manipular psicológicamente a una persona para que entregue credenciales o permita el acceso físico:
- **Pretexting (Creación de Pretextos Creíbles):** Crear un escenario falso (ej: técnico de sonido o amigo del dueño) para ingresar a un venue.
- **Urgencia y Autoridad:** Forzar decisiones rápidas antes de que la víctima active su razonamiento crítico.

---

## 2. Blindaje del Check-in en Puerta en Yendo

En la noche porteña, el "amiguismo" y los fraudes en puerta son masivos:
- **Check-in Primario Inmune a Presión Humana:** El sistema de Geofencing GPS (<150m) + Biometría en Hardware no depende de la voluntad o simpatía del personal de seguridad. El ticket se valida criptográficamente contra el backend.
- **Pase Dinámico Anti-Captura de Pantalla:** El código QR de respaldo cambia cada 15 segundos y posee una marca de agua animada con micro-física Reanimated para impedir que alguien ingrese mostrando una captura de pantalla enviada por WhatsApp.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[CYBERSECURITY_MASTER_PROTOCOL]]
- [[Reanimated]]
