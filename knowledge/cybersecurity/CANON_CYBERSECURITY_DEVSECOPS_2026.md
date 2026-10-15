<!-- CANON_FOUNDATION_FROM_YENDO: CANON_CYBERSECURITY_DEVSECOPS_2026.md -->
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

# 🔒 Tratado Canónico: Ciberseguridad Defensiva, DevSecOps y Zero Trust (2026)

## 1. Visión y Objetivos Fundacionales
La seguridad en Yendo es de **Confianza Cero (Zero Trust)** y cumplimiento normativo estricto (**Ley 25.326 de Protección de Datos Personales de la República Argentina** y **OWASP MASVS v2.0**). El modelo defensivo garantiza que ninguna credencial crítica resida en el cliente, las identidades de usuario estén protegidas por autenticación robusta y multifactor (MFA), y los pipelines de CI/CD e infraestructura híbrida (Supabase + Google Cloud Platform) operen con el principio de privilegio mínimo absoluto.

---

## 2. Pilares de Seguridad y Arquitectura Defensiva

### 2.1 Estándar OWASP MASVS (Mobile Application Security Verification Standard)
- **MASVS-STORAGE:** Prohibición absoluta de guardar PII, tokens de acceso o datos biométricos en almacenamiento plano. Uso exclusivo de SecureStore / Keychain / Keystore con claves derivadas en hardware seguro (Secure Enclave / StrongBox).
- **MASVS-NETWORK:** Comunicación exclusivamente cifrada vía TLS 1.3 con Certificate Transparency. Prohibición de endpoints HTTP no seguros.
- **MASVS-AUTH:** Validación de firmas JWT en backend y rotación obligatoria de refresh tokens en cada sesión.
- **MASVS-CODE:** Ofuscación de binarios en release (`enableProguardInReleaseBuilds`), stripping de logs de debug y símbolos en compilaciones de producción.

### 2.2 Hardening de React Native & Detección de Jailbreak / Root
- Heurísticas defensivas para verificar integridad de entorno en Android y iOS sin degradar la experiencia de usuarios legítimos:
  - Verificación de binarios comunes de superusuario (`/system/app/Superuser.apk`, `/sbin/su`, `/Library/MobileSubstrate`).
  - Detección de depuración activa en release builds.
  - Bloqueo de captura de pantalla en vistas de datos confidenciales o pases QR antifraude (`expo-screen-capture`).

### 2.3 Seguridad en Google Cloud Platform (GCP IAM & Service Accounts)
- **Service Accounts con Mínimo Privilegio:** La Service Account del worker (`yendo-worker@project-6565e6dc-f33c-49ff-b22.iam.gserviceaccount.com`) posee únicamente roles granulares (`roles/aiplatform.user`, `roles/secretmanager.secretAccessor`).
- **Zero Hardcoded Secrets:** Toda variable confidencial (claves de API de Serper, tokens de Telegram, URLs de backend) se inyecta desde **GCP Secret Manager** o variables de entorno firmadas en EAS Secrets.
- **Cloud Run Jobs & Cloud Build:** Pipelines declarativos de construcción y tareas asíncronas de backend aisladas en contenedores efímeros sin acceso a la red de producción innecesaria.

### 2.4 Supabase Auth & Multi-Factor Authentication (MFA)
- Soporte nativo para TOTP (Time-Based One-Time Password) en cuentas de organizadores de eventos y locales gastronómicos/culturales.
- Políticas RLS combinadas con nivel de aseguramiento de autenticación (AAL2):
  ```sql
  -- Restricción de operaciones sensibles a sesiones con MFA verificado
  CREATE POLICY "Operaciones financieras requieren MFA"
  ON public.venue_payouts
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (SELECT auth.jwt()->>'aal') = 'aal2'
  );
  ```

### 2.5 Protección de PII & Anonimización RAG
- Los pipelines de telemetría y procesamiento con modelos de lenguaje (Vertex AI Gemini) anonimizan obligatoriamente nombres, teléfonos y correos electrónicos antes de cualquier ingesta vectorial o registro de telemetría (`INV_ZERO_TRUST_SECURITY`).

---

## 3. Matriz de Fuentes Canónicas Indexadas

| # | Título de la Fuente | URL Canónica | Rol en Yendo |
| :-: | :--- | :--- | :--- |
| **21** | OWASP MASVS Mobile Security Standard | [mas.owasp.org/MASVS](https://mas.owasp.org/MASVS/) | Marco canónico de verificación de seguridad para el cliente móvil. |
| **22** | React Native Security Best Practices | [reactnative.dev/docs/security](https://reactnative.dev/docs/security) | Hardening de almacenamiento seguro, deep linking y networking. |
| **23** | GCP IAM Service Accounts Best Practices | [cloud.google.com/iam/.../service-accounts](https://cloud.google.com/iam/docs/best-practices-for-securing-service-accounts) | Gestión de identidades de máquina con privilegios mínimos y rotación. |
| **24** | Cloud Build Config File Schema | [docs.cloud.google.com/build/.../schema](https://docs.cloud.google.com/build/docs/build-config-file-schema) | Configuración determinística y segura de pipelines CI/CD. |
| **25** | Cloud Run Create Jobs Documentation | [cloud.google.com/run/docs/create-jobs](https://cloud.google.com/run/docs/create-jobs) | Ejecución de tareas asíncronas de ingesta y scraping en containers. |
| **26** | Supabase Auth Row-Level Security | [supabase.com/docs/.../row-level-security](https://supabase.com/docs/guides/auth/row-level-security) | Vinculación del contexto de autenticación `auth.uid()` con políticas SQL. |
| **27** | OWASP Mobile Jailbreaking Cheat Sheet | [cheatsheetseries.owasp.org/.../Jailbreaking](https://cheatsheetseries.owasp.org/cheatsheets/Mobile_Jailbreaking_Cheat_Sheet.html) | Técnicas y directrices de detección de dispositivos comprometidos. |
| **28** | Apple Security Framework Docs | [developer.apple.com/.../security](https://developer.apple.com/documentation/security) | Criptografía en iOS, Keychain Services y Secure Enclave. |
| **29** | Android Open Source Project Security | [source.android.com/docs/security](https://source.android.com/docs/security) | Arquitectura de seguridad Android, sandboxing y Keystore HAL. |
| **30** | Supabase Auth Multi-Factor Auth (MFA) | [supabase.com/docs/guides/auth/auth-mfa](https://supabase.com/docs/guides/auth/auth-mfa) | Autenticación en dos pasos (TOTP / AAL2) para administradores y pagos. |

---

### 🔗 Fuentes, APIs y URLs de Referencia
- **OWASP MASVS:** https://mas.owasp.org/MASVS/
- **React Native Security:** https://reactnative.dev/docs/security
- **GCP IAM Service Accounts:** https://cloud.google.com/iam/docs/best-practices-for-securing-service-accounts
- **Cloud Build Schema:** https://docs.cloud.google.com/build/docs/build-config-file-schema
- **Cloud Run Jobs:** https://cloud.google.com/run/docs/create-jobs
- **Supabase Auth RLS:** https://supabase.com/docs/guides/auth/row-level-security
- **OWASP Jailbreaking:** https://cheatsheetseries.owasp.org/cheatsheets/Mobile_Jailbreaking_Cheat_Sheet.html
- **Apple Security Framework:** https://developer.apple.com/documentation/security
- **Android Security Docs:** https://source.android.com/docs/security
- **Supabase Auth MFA:** https://supabase.com/docs/guides/auth/auth-mfa

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[CYBERSECURITY_MASTER_PROTOCOL]]
- [[Arquitectura_Hibrida_Supabase_GCP]]
- [[GCP_ServiceAccount_Worker_Integracion]]
- [[Supabase]]
