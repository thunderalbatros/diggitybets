---
version: 1.0.0
tipo: guia
tags:
  - yendo-mobile
  - tech-stack
  - canonico
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# 📖 BIBLIA MAESTRA DE INGENIERÍA, PLANIFICACIÓN, FUNCIONES Y ESTÉTICA (SOTA 2026)

Este documento constituye la extensión canónica de la **Base Intelectual de Yendo** ([[YENDO_LIBRARY]]), reuniendo los 12 tratados y libros fundamentales que gobiernan la **calidad de ingeniería, la efectividad del desarrollo, la planificación quirúrgica sin desperdicio y la belleza estética de fricción cero** para aplicaciones móviles de alta gama.

---

## 🏛️ CUADRO SINTÉTICO: LAS 12 OBRAS MAESTRAS DEL CANON

| Eje de Impacto | Obra y Autor | Tesis Central | Aplicación en Yendo |
| :--- | :--- | :--- | :--- |
| **1. Calidad de Desarrollo** | **A Philosophy of Software Design** (John Ousterhout) | **Módulos Profundos:** Reducir la complejidad creando interfaces simples que ocultan gran poder interno; eliminar *Change Amplification*. | Custom Hooks (`useNearbyEvents`) como cajas negras ultra-limpias de 1 línea en la vista. |
| **1. Calidad de Desarrollo** | **Software Engineering at Google** (Titus Winters et al.) | **Sostenibilidad Temporal:** Diferenciar programar (hoy) de ingeniería (sistemas viables a 10 años ante cambios de dependencias). | Degradación progresiva de dependencias nativas y contratos tipados inquebrantables. |
| **1. Calidad de Desarrollo** | **Designing Data-Intensive Applications** (Martin Kleppmann) | **Consistencia y Concurrencia:** Evitar estados corruptos mediante transacciones atómicas y sincronización síncrona/asíncrona. | Locks atómicos en PostgreSQL RPCs para reserva de cupos Dunbar (4 a 6 personas) en milisegundo cero. |
| **2. Planificación & Scope** | **Shape Up** (Ryan Singer / 37signals) | **Appetite over Estimates:** Fijar el tiempo que se desea invertir y moldear el alcance para encajar; descartar backlogs infinitos (*Bets, not backlogs*). | Blindaje del MVP 1.0; features complejas se derivan directamente a la bóveda del Icebox. |
| **2. Planificación & Scope** | **Escaping the Build Trap** (Melissa Perri) | **Outcomes sobre Outputs:** Medir el valor de negocio y el impacto humano real, no el número de pantallas o botones despachados. | Métrica Norte: **IRL Show-Up Rate** (asistencia física presencial) en lugar de *Screen Time*. |
| **2. Planificación & Scope** | **Continuous Discovery Habits** (Teresa Torres) | **Opportunity Solution Tree:** Conectar metas con oportunidades de usuarios validadas semanalmente con experimentos ligeros. | Pruebas de guerrilla semanales en cafeterías porteñas antes de escribir código de alto costo. |
| **3. Funciones & Ergonomía** | **Microinteractions** (Dan Saffer) | **Anatomía Cuádruple:** Disparador, Reglas, Feedback Sensorial y Bucles. La excelencia radica en los pequeños detalles funcionales. | Botón `InteractiveButton`: respuesta háptica instantánea y micro-compresión elástica en UI Thread. |
| **3. Funciones & Ergonomía** | **Designing with the Mind in Mind** (Jeff Johnson) | **Neurobiología Perceptual:** Ceguera por inatención, memoria de trabajo de 4 elementos y leyes de agrupamiento de Gestalt. | Tarjetas de eventos agrupadas en 3 unidades perceptuales sin saturar la atención del usuario en la calle. |
| **3. Funciones & Ergonomía** | **Seductive Interaction Design** (Stephen Anderson) | **Psicología Afectiva y Juego:** El placer estético y la sorpresa reducen el miedo social y catalizan la conexión humana. | El **Carpincho Anfitrión** y micro-celebraciones visuales de quórum completo. |
| **4. Estética & Simplicidad** | **The Laws of Simplicity** (John Maeda) | **Reducir, Organizar y Ahorrar Tiempo:** Sustraer lo obvio y añadir lo significativo. El tiempo ahorrado se percibe como belleza. | Estética **Dark-Vibrancy**: lienzo OLED puro (#000000) y Naranja (#FF5500) como único faro de acción. |
| **4. Estética & Simplicidad** | **Designing Interface Animation** (Val Head) | **Meaningful Motion:** La animación como guía espacial y cognitiva; físicas de resorte realistas (*Spring Physics*). | Transiciones a 60/120 FPS que explican el origen y destino espacial de cada elemento táctil. |
| **4. Estética & Simplicidad** | **Refactoring UI** (Adam Wathan & Steve Schoger) | **Jerarquía Tonal sobre Bordes:** Profundidad con elevación de superficies, bordes translúcidos de 1px y espaciado modular. | Micro-bordes especulares (`rgba(255,255,255,0.08)`) y eliminación de sombras opacas en modo oscuro. |

---

## 🛠️ PARTE 1: EFECTIVIDAD Y CALIDAD DEL DESARROLLO DE SOFTWARE

### 1. A Philosophy of Software Design (John Ousterhout, Stanford University)
* **Tesis Fundamental:** El diseño de software tiene un único objetivo primordial: **combatir la complejidad**. Ousterhout define la complejidad como cualquier aspecto del sistema que haga que el software sea difícil de entender o de modificar.
* **Módulos Profundos vs. Módulos Superficiales:**
  - *Módulos Superficiales (Shallow Modules):* Tienen interfaces complejas en comparación con la funcionalidad que proveen. Obligan al desarrollador a recordar detalles internos y provocan dispersión lógica (*Change Amplification*).
  - *Módulos Profundos (Deep Modules):* Ofrecen una interfaz externa extremadamente sencilla y potente, ocultando una gran cantidad de complejidad y optimizaciones internas.
* **Aplicación en Yendo:**
  Nuestros Custom Hooks deben ser módulos profundos de manual. Por ejemplo, `useNearbyEvents.ts` expone únicamente:
  ```typescript
  const { events, isLoading, error, refresh } = useNearbyEvents();
  ```
  La vista no sabe ni le interesa saber sobre fórmulas trigonométricas de Haversine, cálculo de distancias en metros, agrupamiento de pines espaciales, enriquecimiento de imágenes ni fallback a almacenamiento local en caso de desconexión. La vista solo consume datos limpios.

### 2. Software Engineering at Google (Titus Winters, Tom Manshreck, Hyrum Wright)
* **Tesis Fundamental:** La ingeniería de software no es programación acelerada; es la gestión del código a lo largo del **tiempo**, la **escala** y los **cambios culturales/tecnológicos**. Un código que funciona hoy pero colapsa al actualizar una librería dentro de un año es un fracaso de ingeniería.
* **La Ley de Hyrum:** *Con un número suficiente de usuarios de una API, no importa lo que prometas en el contrato: todos los comportamientos observables de tu sistema serán dependidos por alguien*.
* **Aplicación en Yendo:**
  1. **Degradación Progresiva (Graceful Fallback):** La mascota Carpincho opera bajo 3 niveles de resiliencia: *Rive (C++ JSI)* ➔ *Lottie (Vectorial)* ➔ *SVG estático*. Si un dispositivo antiguo o una actualización de Android rompe el motor C++, la app no crashea jamás.
  2. **Contratos Fuertemente Tipados:** Erradicación del uso de `any` en `src/types/supabase.ts` y tokens de diseño compilados automáticamente desde JSON (`tokens.generated.ts`).

### 3. Designing Data-Intensive Applications (Martin Kleppmann, Cambridge / O'Reilly)
* **Tesis Fundamental:** Todo sistema confiable debe dominar la tríada de **Confiabilidad (Reliability)**, **Escalabilidad (Scalability)** y **Mantenibilidad (Maintainability)**. En entornos móviles con conectividad intermitente, el estado debe ser local primero (*Local-First*), pero las transacciones críticas deben resolverse con consistencia fuerte en el servidor.
* **Aplicación en Yendo:**
  El límite biológico Dunbar (4 a 6 personas por grupo) es un invariante inquebrantable. Para evitar que dos usuarios toquen "Unirme" al mismo tiempo y saturen el cupo a 7 integrantes (*Race Condition*), la reserva no es un simple `UPDATE` en cliente, sino una función RPC atómica en PostgreSQL con aislamiento transaccional:
  ```sql
  -- Bloqueo atómico a nivel de fila en Supabase
  SELECT id, current_members, capacity 
  FROM public.groups 
  WHERE id = target_group_id 
  FOR UPDATE;
  ```

---

## 🎯 PARTE 2: PLANIFICACIÓN Y GESTIÓN DE PRODUCTO (SCOPE & DISCOVERY)

### 4. Shape Up: Stop Running in Circles and Ship Work that Matters (Ryan Singer, 37signals)
* **Tesis Fundamental:** Los métodos ágiles tradicionales degeneraron en una rueda de hámster de tickets interminables (*sprint backlog conveyor belt*). Shape Up propone:
  1. **Apetito sobre Estimaciones (Appetite over Estimates):** No preguntes "¿cuánto tardará esto?". Pregunta "¿cuánto tiempo estamos dispuestos a invertir en resolver este problema?". Si la respuesta es 2 semanas, el alcance se corta para que entre en 2 semanas.
  2. **Modelado Previo (Shaping):** Antes de entregar una tarea a desarrollo, el alcance debe estar definido con suficiente detalle para saber qué NO hacer (*boundaries*), pero con suficiente holgura para que el desarrollador tome decisiones de UI inteligentes (*fat marker sketches*).
  3. **Apuestas, no Backlogs (Bets, Not Backlogs):** Los backlogs infinitos generan culpa y pérdida de foco. Cada ciclo se evalúa desde cero con apuestas firmes.
* **Aplicación en Yendo:**
  Gobernanza estricta de `PRODUCT_STRATEGY_SQUAD` y la carpeta `.knowledge/🧊_icebox_backlog/`. Las ideas brillantes pero fuera del alcance del MVP se congelan de forma deliberada. Si una funcionalidad pone en riesgo el TTI (<1.2s) o la simplicidad del flujo, se aplica el *Kill Switch*.

### 5. Escaping the Build Trap (Melissa Perri)
* **Tesis Fundamental:** Muchas startups caen en la "Trampa de la Construcción": festejan el lanzamiento de funcionalidades (*output*) en lugar del impacto en el comportamiento de las personas (*outcome*). Despachar 10 pantallas nuevas no tiene ningún valor si no mueve la aguja del negocio.
* **El Product Kata:** Definir la dirección estratégica, comprender la condición actual, establecer el próximo objetivo de comportamiento y conducir experimentos rápidos para validar hipótesis.
* **Aplicación en Yendo:**
  Nuestra métrica reina (*North Star Metric*) es exclusivamente el **IRL Show-Up Rate**: personas reales sentadas en una mesa compartida o jugando un picadito en un parque de CABA. Cualquier feature que aumente el tiempo de pantalla (*doomscrolling*) en lugar del encuentro presencial se descarta.

### 6. Continuous Discovery Habits (Teresa Torres)
* **Tesis Fundamental:** El descubrimiento de producto (*Product Discovery*) no es un evento que se hace una vez al año antes de programar; es un **hábito semanal continuo**. Los equipos de alto rendimiento entrevistan a usuarios todas las semanas para identificar oportunidades y mapearlas en un *Opportunity Solution Tree (OST)*.
* **Aplicación en Yendo:**
  Sustenta el protocolo canónico de *Guerrilla Usability Testing* de `HUMAN_EXPERIENCE_SQUAD` ([.knowledge/reportes_ux/SOP_Guerrilla_Usability_Testing_CABA.md](file:///c:/Users/Tomi/yendo_mobile/.knowledge/reportes_ux/SOP_Guerrilla_Usability_Testing_CABA.md)): testear la app semanalmente con 5 personas en cafeterías de CABA para ajustar la ergonomía antes de escalar la arquitectura.

---

## ⚡ PARTE 3: FUNCIONES Y ERGONOMÍA COGNITIVA (ZERO FRICTION)

### 7. Microinteractions: Designing with Details (Dan Saffer)
* **Tesis Fundamental:** Los productos que amamos no se diferencian por sus macro-funciones (todas las apps tienen listas y perfiles), sino por la delicadeza de sus micro-momentos. Toda microinteracción exitosa se compone de:
  1. **Disparador (Trigger):** Inicia la microinteracción (gesto táctil, geocerca PostGIS).
  2. **Reglas (Rules):** Determinan qué puede y qué no puede suceder.
  3. **Feedback (Retroalimentación):** Lo que el usuario ve, siente o escucha para saber que la regla operó.
  4. **Bucles y Modos (Loops & Modes):** Regulan la persistencia y los estados alternativos.
* **Aplicación en Yendo:**
  El componente [InteractiveButton.tsx](file:///c:/Users/Tomi/yendo_mobile/src/components/atoms/InteractiveButton.tsx):
  - *Trigger:* Pulsación táctil del pulgar.
  - *Rule:* Si el cupo está lleno, no permite interacción; si hay cupo, decrementa localmente.
  - *Feedback:* <50ms de latencia sensorial: resorte elástico a 0.95 en el UI Thread + micro-impacto háptico (`Haptics.impactAsync(Light)`).
  - *Loop:* Transiciona al estado "Confirmado" sin recargar la pantalla.

### 8. Designing with the Mind in Mind (Jeff Johnson)
* **Tesis Fundamental:** La psicología cognitiva y la neurobiología imponen límites rígidos a la interacción con software:
  - *Memoria de Trabajo:* Los seres humanos solo pueden mantener entre 3 y 5 datos activos en su mente simultáneamente sin cometer errores.
  - *Visión Foveal vs. Periférica:* El ojo humano solo tiene visión nítida en un área del tamaño de una moneda a la distancia de un brazo; el resto es visión periférica de baja resolución sensible al movimiento.
* **Aplicación en Yendo:**
  Las tarjetas de eventos ([EventItemCard.tsx](file:///c:/Users/Tomi/yendo_mobile/src/components/organisms/EventItemCard.tsx)) limitan su información visible a **3 puntos focales**:
  1. Imagen inmersiva y Título de la actividad.
  2. Badge Dunbar de cupos ("4/6 Cupos • Quedan 2").
  3. Distancia y Confort Acústico ("450m • 68 dB").
  Cero datos superfluos que abrumen la memoria de trabajo.

### 9. Seductive Interaction Design (Stephen P. Anderson)
* **Tesis Fundamental:** Las interfaces deben avanzar más allá de la mera "usabilidad sin dolor" hacia la **interacción afectiva**. La curiosidad, el juego y las recompensas emocionales intrínsecas desarman la resistencia cognitiva de los extraños a interactuar entre sí (*Liking Gap*).
* **Aplicación en Yendo:**
  El rol del **Carpincho Anfitrión**: no es una ilustración estática, es un personaje reactivo que saluda, bromea con modismos rioplatenses auténticos y rompe el hielo en el chat grupal con preguntas situacionales ("¿Quién pide la primera ronda de empanadas?").

---

## 🎨 PARTE 4: ESTÉTICA, SIMPLICIDAD Y SISTEMAS VISUALES

### 10. The Laws of Simplicity (John Maeda, MIT Media Lab)
* **Tesis Fundamental:** La simplicidad se rige por leyes matemáticas y de percepción humana:
  - **Ley 1: REDUCE:** La forma más simple de lograr simplicidad es mediante la sustracción meditada. Elimina lo obvio y añade lo significativo.
  - **Ley 2: ORGANIZE:** La organización hace que un sistema complejo parezca compuesto de pocos elementos.
  - **Ley 3: TIME:** El tiempo ahorrado se percibe inmediatamente como simplicidad.
* **Aplicación en Yendo:**
  El lienzo **Dark-Vibrancy**: fondo `#000000` absoluto que absorbe la luz en pantallas OLED, suprimiendo cualquier elemento decorativo innecesario. El Naranja Yendo (`#FF5500`) se reserva estrictamente para las acciones clave, logrando que el usuario decida y se sume a un plan en **menos de 3 segundos**.

### 11. Designing Interface Animation (Val Head)
* **Tesis Fundamental:** El movimiento en software debe ser significativo (*Meaningful Motion*). Las animaciones lineales y rígidas se sienten robóticas y desorientan el cerebro; las físicas elásticas basadas en masa y resortes (*Spring Physics*) emulan la inercia del mundo real, comunicando continuidad física entre estados.
* **Aplicación en Yendo:**
  Integración de `react-native-reanimated` en el hilo de UI nativo (Bridgeless / Fabric). Modales, expansiones de tarjetas y transiciones de pantalla respetan la masa y fricción física (`theme.physics.tactilePress`), corriendo a **60–120 FPS estables** sin congelar el hilo de JavaScript.

### 12. Refactoring UI (Adam Wathan & Steve Schoger)
* **Tesis Fundamental:** Principios visuales directos para desarrolladores que construyen interfaces de alta calidad:
  - **Jerarquía Tonal sobre Bordes:** No encierres cada elemento en una caja con bordes negros; usa diferentes intensidades de gris y elevaciones tonales.
  - **Comenzar en Escala de Grises:** Si una interfaz no se entiende y no es atractiva en blanco y negro, añadir color solo empeorará el desorden.
  - **Bordes Hairline Translúcidos:** En temas oscuros, las sombras proyectadas no se ven; la profundidad se comunica con bordes de 1px semitransparentes (`rgba(255, 255, 255, 0.08)`).
* **Aplicación en Yendo:**
  Todo el diseño de [src/constants/theme.ts](file:///c:/Users/Tomi/yendo_mobile/src/constants/theme.ts) y [tokens.json](file:///c:/Users/Tomi/yendo_mobile/src/constants/tokens.json): elevación tonal OLED (`surfaceSolid: #121212`, `surfaceElevated: rgba(28,28,28,0.75)`), bordes translúcidos al 8% y contraste tipográfico WCAG AAA.

---

## 🔗 Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[AGENTS]]
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[Database_Bootstrap_Dossier]]

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Número de Dunbar]]
- [[PostGIS]]
- [[Supabase]]
- [[Reanimated]]
- [[Rive]]
- [[Lottie]]
- [[Capybara Mascot]]
