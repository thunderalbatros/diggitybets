> **Alcance:** Literatura canónica de diseño UI/UX, sistemas de diseño, psicología cognitiva, economía conductual, gamificación y conversión (CRO) para la Software Factory Web y DiggityBets.

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

# 👁️ Tratado Canónico: 100 Things Every Designer Needs to Know About People
### Basado en: *100 Things Every Designer Needs to Know About People*
**Autora:** Susan Weinschenk, Ph.D. (Psicóloga del Comportamiento y Científica Cognitiva)
**Archivo Fuente:** `unsorted/Susan_Weinschenk-100_Things_About_People-EN.pdf` (256 páginas)

---

## 1. La Neurociencia del Usuario Móvil

Susan Weinschenk descompone cómo el sistema visual, la memoria de trabajo, las emociones y el procesamiento social humano condicionan la efectividad de las interfaces digitales. Diseñar sin conocer estas limitaciones biológicas es condenar la aplicación a la fricción y al rechazo inconsciente.

---

## 2. Los Principios Neurocognitivos Críticos para Yendo

### 1. Percepción Visual y Visión Periférica (#1 a #10)
- **La visión periférica ve antes que la visión central:** El ojo humano detecta movimiento, siluetas y peligro en la periferia antes de enfocar los detalles. En un feed móvil, los contrastes de color luminosos en los bordes distraen al usuario si no están justificados.
- **La perspectiva canónica:** Reconocemos objetos más rápido cuando se muestran desde un ángulo ligeramente superior en tres cuartos (la vista isométrica o frontal cálida de nuestro Carpincho).

### 2. Memoria de Trabajo y Capacidad de Retención (#15 a #25)
- **El mito de los 7 elementos de Miller:** En entornos móviles y bajo estrés sensorial, la memoria de trabajo real es de **solo 3 a 4 fragmentos de información (chunks)** a la vez. Cualquier pantalla que pida recordar más de 3 datos simultáneos provoca abandono.
- **Sobrecarga de opciones (Choice Overload):** Cuando se ofrecen más de 10 opciones simultáneas, el usuario no elige la mejor; elige no elegir nada o experimenta remordimiento post-decisión.

### 3. Psicología Social y Tribus (#50 a #65)
- **El Número de Dunbar (150 individuos):** Los seres humanos no pueden mantener relaciones sociales significativas estables con más de 150 personas, y solo tienen un círculo íntimo de **4 a 6 amigos cercanos** (el tamaño exacto de un Squad en Yendo).
- **La sincronía física genera pertenencia:** Realizar una acción física al mismo tiempo (ej: brindar, bailar al mismo ritmo, o en Yendo: hacer el check-in conjunto) libera oxitocina y refuerza el vínculo tribal.

### 4. Lectura y Patrones de Escaneo (#30 a #40)
- En pantallas móviles nadie lee párrafos enteros: el usuario **escanea en patrón F o en ráfagas visuales**. Los titulares deben comenzar con palabras de alto valor informativo; los textos secundarios deben tener contraste atenuado (60-70% de opacidad) para no competir con los CTAs principales.

---

## 3. Guía de Implementación en Componentes React Native de Yendo

1. **Jerarquía Visual de Cards de Evento:**
   - Foto con relación de aspecto áurea (16:9 o 4:3).
   - Tipografía titular en `Plus Jakarta Sans` Bold (máximo 2 líneas).
   - Metadatos esenciales agrupados en un solo chip visual: `[Distancia <150m] • [Género Musical] • [Amigos que van]`.
2. **Alertas y Confirmaciones Hápticas:**
   - No usar modales bloqueantes invasivos; usar SnackBar emergente en la zona del pulgar inferior con vibración sutil (`Haptics.selectionAsync()`).

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[Número de Dunbar]]
- [[Heuristicas_Cognitivas_Social_Dunbar]]
- [[CANON_LAWS_OF_UX_PSYCHOLOGY_FRAMEWORKS]]
- [[CANON_SCARCITY_ESCASEZ_BANDWIDTH_TAX]]
- [[Capybara Mascot]]
