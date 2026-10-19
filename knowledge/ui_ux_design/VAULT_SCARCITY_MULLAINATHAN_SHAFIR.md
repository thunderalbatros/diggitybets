**Alcance:** Síntesis de Scarcity (Mullainathan & Shafir): psicología de la escasez, efecto túnel, impuesto al ancho de banda cognitivo y urgencia. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 📉 Tratado Canónico: Escasez y el Impuesto de Ancho de Banda Cognitivo
### Basado en: *Escasez: ¿Por qué tener muy poco significa tanto?* (Scarcity: Why Having Too Little Means So Much)
**Autores:** Sendhil Mullainathan (Harvard) & Eldar Shafir (Princeton)
**Archivo Fuente:** `unsorted/dokumen.pub_escasez-por-que-tener-muy-poco-significa-tanto-9786071635877.pdf` (312 páginas)

---

## 1. La Tesis Central: La Escasez como Estado Mental Absorbente

La escasez no es simplemente un déficit físico o financiero; es una **condición cognitiva que captura la atención de forma involuntaria**. Cuando una persona experimenta escasez (sea de dinero, de tiempo o de conexión social), su mente se enfoca obsesivamente en la necesidad insatisfecha.

Este secuestro atencional genera dos fenómenos simétricos:
1. **El Dividendo del Enfoque (The Focus Dividend):** Una habilidad extraordinaria a corto plazo para resolver el problema inmediato que quema (el "deadline" o pagar el alquiler hoy).
2. **El Efecto Túnel (Tunneling):** Una incapacidad biológica para percibir lo que ocurre fuera del túnel, sacrificando el largo plazo y cometiendo errores críticos de juicio.

---

## 2. El Impuesto de Ancho de Banda Cognitivo (The Bandwidth Tax)

Mullainathan y Shafir demuestran a través de resonancias y pruebas psicométricas que **la escasez reduce la capacidad cognitiva ejecutiva y la memoria de trabajo de forma equivalente a perder una noche completa de sueño o a una caída de 13 a 14 puntos de Coeficiente Intelectual (CI)**.

### La Falta de Holgura (Lack of Slack)
Las personas con holgura (dinero de sobra, tiempo holgado) pueden cometer errores de cálculo sin consecuencias graves (ej: pagar un taxi de más, olvidar un trámite). Cuando no hay holgura, **cualquier mínimo error genera una cascada de catástrofes (la Trampa de la Escasez)**.

---

## 3. Implicancias Radicales para la Arquitectura de Software de Yendo

En el contexto nocturno de Buenos Aires en 2026, los usuarios de Yendo operan bajo una **sobrecarga de impuestos cognitivos simultáneos**:
- Fatiga decisional tras una semana laboral extenuante.
- Ansiedad económica por la pérdida de poder adquisitivo y la inflación.
- Entorno de alta distracción sensorial (música a 100 dB, poca luz, consumo de alcohol, interacción social caótica).

### Principios de Diseño Anti-Tax Cognitivo en Yendo:
1. **Tolerancia Cero a la Fricción Decisional:**
   - La pantalla principal no puede exigir lectura de párrafos densos ni configuraciones complejas.
   - Presentación de **máximo 3 opciones curadas por momento** (Hick's Law).
2. **Sistemas a Prueba de Fallos (Fault-Tolerant UX):**
   - Si el usuario se confunde de botón o toca sin querer en la oscuridad del plataforma, el sistema debe permitir deshacer (Undo) en 5 segundos con un tap háptico.
   - El check-in en puerta no puede exigir escribir contraseñas ni buscar un mail perdido: debe resolverse mediante **Geofencing pasivo (<150m) + Biometría en Hardware (Huella o FaceID en 1 segundo)**.
3. **Precios Transparentes sin Sorpresas:**
   - Ocultar costos hasta el final genera un pico de "túnel de estrés". Yendo muestra el precio final en ARS desde la primera vista.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[CANON_LAWS_OF_UX_PSYCHOLOGY_FRAMEWORKS]]
- [[CANON_100_THINGS_DESIGNER_PEOPLE_WEINSCHENK]]
- [[CABA_GROUND_TRUTH_ECONOMIA_Y_BOLSILLO_PORTENO_2026]]
