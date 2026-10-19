**Alcance:** Síntesis de Security Engineering (Ross Anderson): diseño de sistemas resistentes al fraude, psicología del atacante y auditoría de protocolos. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 🛡️ Tratado Canónico: Security Engineering (Ross Anderson)
### Basado en: *Security Engineering: A Guide to Building Dependable Distributed Systems (3rd Edition)*
**Autor:** Ross Anderson (Profesor de Ingeniería de Seguridad en Cambridge University)
**Ubicación Fuente:** `C:\Users\Tomi\Desktop\UPDATE_INGEST\security_engineering_a_guide_to_building_dependable_distributed_systems.pdf` (1.232 páginas)

---

## 1. La Tesis Central de Ross Anderson

> **"La seguridad de los sistemas rara vez falla porque los algoritmos criptográficos se rompan matemáticamente; casi siempre falla debido a errores en la gestión de claves, diseño de protocolos con supuestos falsos, fallas de incentivos socioeconómicos y bugs de implementación en los límites del sistema."**
> — Ross Anderson

Anderson formula la ingeniería de seguridad como una disciplina de **Defensa en Profundidad** y **Análisis de Incentivos**: un sistema solo es seguro si los costos de vulnerarlo superan con creces el valor del botín obtenido por el atacante.

---

## 2. Los Principios Fundamentales Aplicados a Yendo

1. **El Principio del Mínimo Privilegio y Separación de Deberes:**
   - La aplicación móvil en Web UI / Vanilla & Modern Frontend jamás debe poseer privilegios para alterar saldos de caja, emitir pases gratuitos sin quórum o ver identificadores biológicos en crudo.
   - En Supabase: Toda tabla tiene RLS activado con políticas granulares por verbo (`select`, `insert`, `update`) atadas estrictamente a `auth.uid()`.
2. **Criptografía de Llaves en Hardware (Secure Enclave / Android Keystore):**
   - Las claves privadas del usuario jamás tocan el disco en texto plano (`AsyncStorage`). Se custodian en el hardware criptográfico (`Web Platform SecureStore` respaldado por TEE/StrongBox) con biometría obligatoria previa a la firma del pase.
3. **Modelado de Amenazas contra No-Shows y Reventa:**
   - Prevenir ataques de denegación de servicio a venues (bloquear 20 mesas con cuentas falsas) mediante depósitos de quórum con caducidad temporal estricta (hold pesimista de 10 minutos).

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[CYBERSECURITY_MASTER_PROTOCOL]]
- [[01_CANON_PAPERS_SEMINALES_CRIPTOGRAFIA_PROTOCOLOS]]
- [[Supabase]]
