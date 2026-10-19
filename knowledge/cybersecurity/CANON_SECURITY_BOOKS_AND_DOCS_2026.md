> **Alcance:** Literatura canónica de ciberseguridad web, criptografía aplicada, protección de identidad OAuth 2.1, defensa XSS/CSP/CSRF y blindaje de aplicaciones en tiempo real.

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

# 📚 Compendio Canónico: Libros Fundacionales, Estándares OWASP y Arquitectura Criptográfica en Hardware (2026)

Este compendio formaliza la asimilación profunda de los 3 tratados bibliográficos seminales de ciberseguridad y las 4 especificaciones técnicas oficiales de seguridad en plataformas móviles para el ecosistema Yendo Mobile.

---

## 📖 1. Síntesis y Asimilación de Libros Fundacionales

### 1.1. Security Engineering: A Guide to Building Dependable Distributed Systems (3rd Ed.) — Ross Anderson (Wiley)
- **Tesis Central:** Los sistemas de seguridad no fallan porque los algoritmos criptográficos se rompan matemáticamente; fallan por **errores de especificación, suposiciones falsas sobre el entorno y fallas en la gestión de incentivos**.
- **Principios Asimilados para Yendo:**
  1. **Principio de Frescura de Mensajes (Message Freshness & Replay Prevention):** Ningún paquete de check-in GPS o voto de grupo puede aceptarse si no incluye un **nonce criptográfico efímero** generado por el servidor con un TTL estricto ($<60\,\text{s}$). Evita que un atacante capture un paquete de asistencia legítimo y lo retransmita al día siguiente.
  2. **Modelado de Adversarios Racionales vs Maliciosos:** Los atacantes de Yendo no intentarán romper RSA-4096; intentarán engañar al sistema de geolocalización o forzar condiciones de carrera (*Race Conditions*) en los cupos del bar. Toda lógica transaccional debe resolverse con exclusión mutua pesimista (`FOR UPDATE`).
  3. **Biometría como Identificador, No como Secreto:** La huella dactilar o el rostro no son contraseñas secretas (pueden clonarse visualmente). En Yendo, la biometría actúa como un gatillo de autorización en el hardware (`expo-local-authentication`) para desbloquear una clave privada efímera residente en el Secure Enclave, nunca como una cadena que se envía a la red.

### 1.2. Mobile Application Security Testing Guide (MASTG) — OWASP Foundation
- **Tesis Central:** Marco integral de pentesting, ingeniería inversa y análisis de vulnerabilidades para aplicaciones Android e iOS.
- **Checklist Operativo para Yendo (MASTG Compliance):**
  - **MASTG-STORAGE-1/2:** Almacenamiento local restringido a `expo-secure-store` y MMKV cifrado. Cero datos en SharedPreferences o SQLite plano.
  - **MASTG-CRYPTO-1/3:** Uso de primitivas modernas: AES-256-GCM para datos simétricos y ECDSA P-256 para firmas. Prohibido MD5, SHA-1, DES o AES en modo ECB.
  - **MASTG-AUTH-1:** Los tokens de refresco se invalidan inmediatamente al cerrar sesión o al detectar una discrepancia en la atestación del dispositivo.
  - **MASTG-RESILIENCE-1 a 4:** Detección de binarios instrumentados por Frida, bloqueo de entornos de depuración remota en compilaciones de producción y detección de hooks en libc/JNI.

### 1.3. Real-World Cryptography — David Wong (Manning)
- **Tesis Central:** Implementación pragmática y segura de criptografía en aplicaciones de producción, eliminando los errores comunes de implementación que provocan fugas de datos.
- **Directivas Técnicas para Yendo:**
  1. **TLS 1.3 como Base Innegociable:** Exclusión de suites de cifrado obsoletas. Uso de PFS (*Perfect Forward Secrecy*) mediante Diffie-Hellman en curvas elípticas (ECDHE).
  2. **Fijación de Claves Públicas (SPKI Pinning):** En lugar de fijar el certificado raíz (que expira y rompe la app), fijar el hash SHA-256 de la clave pública del Subject (`pin-sha256`), permitiendo rotar certificados CA sin dejar obsoleta la versión en las tiendas.
  3. **Generación de Entropía Criptográfica:** Todo ID de sesión, token de invitación temporal o voucher se genera exclusivamente mediante generadores de números pseudoaleatorios criptográficamente seguros (CSPRNG, `expo-crypto` con `getRandomValues`), prohibiendo `Math.random()`.

---

## 🎓 2. Documentación Oficial y Arquitectura en Hardware

### 2.1. OWASP MASVS v2.0 (Mobile Application Security Verification Standard)
El estándar clasifica los requisitos en 4 dominios esenciales:
- **MASVS-STORAGE:** Protección de datos en reposo contra acceso físico no autorizado.
- **MASVS-CRYPTO:** Algoritmos, generación y ciclo de vida de claves criptográficas.
- **MASVS-NETWORK:** Autenticidad, confidencialidad e integridad en tránsito.
- **MASVS-RESILIENCE:** Defensas activas contra ingeniería inversa e instrumentación dinámica.
*Yendo opera bajo el perfil **MASVS-L2 + MASVS-R** (el mismo nivel exigido a aplicaciones bancarias y de pagos).*

### 2.2. Expo App Integrity & Google Play Integrity API v2
- **Mecanismo:** `expo-app-integrity` solicita un veredicto de integridad a los servidores de Google.
- **Veredictos Evaluados:**
  - `MEETS_DEVICE_INTEGRITY`: El dispositivo cuenta con hardware de seguridad genuino de Google (SafetyNet / Play Protect).
  - `MEETS_BASIC_INTEGRITY`: El dispositivo no muestra signos de root ni modificaciones del kernel.
  - `MEETS_STRONG_INTEGRITY`: Hardware respaldado por enclave criptográfico (Titan M / Knox).
*En Yendo, toda operación de reclamo de voucher o check-in presencial requiere al menos `MEETS_DEVICE_INTEGRITY`.*

### 2.3. Apple Platform Security & App Attest (DeviceCheck)
- **Mecanismo:** Apple App Attest genera un par de claves asimétricas en el Secure Enclave del iPhone. Apple firma un certificado de atestación que acredita que la clave fue generada por una instancia legítima de Yendo en un dispositivo iOS físico no comprometido.
- **Garantía:** Es imposible clonar la clave privada, ya que el Secure Enclave bloquea la exportación de material criptográfico fuera del chip.

### 2.4. Android Keystore System & StrongBox
- **Mecanismo:** En dispositivos modernos (como el Samsung Galaxy A36 conectado con chip Knox), Android Keystore utiliza un hardware de seguridad dedicado (*StrongBox Keymaster*) con su propia CPU, memoria y almacenamiento aislado del procesador principal.
- **Resistencia:** Aunque el atacante obtenga privilegios de superusuario (`root`) en el sistema operativo Android, el procesador StrongBox no entregará la clave privada y ejecutará las operaciones criptográficas internamente.

---

## Relaciones de Contexto
- [[CYBERSECURITY_MASTER_PROTOCOL]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[SOTA_Mobile_Cybersecurity_Master_Dossier_2026]]
- [[SEC_02_SSL_PINNING]]
- [[CANON_CYBERSECURITY_DEVSECOPS_2026]]
