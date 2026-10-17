---
version: 1.0.0
tipo: research
tags:
  - web-application
  - ui-ux
  - architecture
  - en-progreso
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# 📱 Tratado Canónico: Designing for Touch (Josh Clark)
### Basado en: *Designing for Touch* (A Book Apart Series)
**Autor:** Josh Clark (Fundador de Big Medium / Especialista en Ergonomía Táctil)
**Archivo Fuente:** `unsorted/touch-xamarin.pdf` (168 páginas)

---

## 1. La Realidad Física de la Interacción Táctil en Smartphones

Josh Clark establece una verdad fundamental: **las pantallas táctiles no son simplemente monitores de computadora más chicos con punteros invisibles; son objetos físicos que se sostienen en la mano con una ergonomía biomecánica estricta**.

Cuando un usuario interactúa con un smartphone moderno (pantallas de 6.1" a 6.7"), la mayor parte de la interacción se realiza con **una sola mano y un solo dedo: el pulgar**.

---

## 2. El Mapeo de la "Thumb Zone" (Zona del Pulgar)

```
┌─────────────────────────┐
│       OW-ZONE           │  ◄─── Zona de Dolor / Inaccesible:
│  (Esfuerzo Extremo,     │       Requiere estirar la mano o usar
│   Riesgo de Caída)      │       la otra mano (Header, Back button)
├─────────────────────────┤
│       REACH ZONE        │  ◄─── Zona de Alcance Cómodo con Estiramiento:
│  (Zona de Navegación    │       Ideal para contenido de lectura y tarjetas
│   Secundaria)           │
├─────────────────────────┤
│                         │  ◄─── NATURAL THUMB ZONE:
│      NATURAL ZONE       │       El área donde el pulgar rota sin esfuerzo
│   (Zona de Mayor Confort│       muscular ni fricción articular.
│    y Precisión Fitts)   │       AQUÍ DEBEN VIVIR TODOS LOS CTAs.
└─────────────────────────┘
```

### Reglas Innegociables de Ergonomía Táctil para HuntHub Web:
1. **Acciones Primarias en el Tercio Inferior:**
   - Prohibido ubicar el botón principal de confirmación o reserva en la barra superior (Top Bar).
   - Todos los flujos críticos (Confirmar Check-in, Unirse al Squad, Filtrar Mapa) se resuelven mediante **Floating Action Buttons (FABs)** o **Bottom Sheets interactivos** en el tercio inferior.
2. **Dimensiones de Blanco Táctil (Touch Targets) $\ge 48 \times 48\text{dp}$:**
   - La huella del pulgar humano mide entre 10 y 14 milímetros de diámetro.
   - Cualquier botón con área menor a 48dp genera errores de pulsación accidental (Fat-finger problem) y frustración en entornos oscuros o en movimiento.
3. **Márgenes de Resguardo Perimetral:**
   - Los elementos cliqueables deben tener al menos 8dp de espaciado entre sí para evitar disparar la acción vecina por error.

---

## 3. Gestualidad Física y Retroalimentación

- **Deslizar (Swipe) vs. Tocar (Tap):** En movimiento, deslizar una tarjeta es un 40% más fácil y natural que acertar a un botón pequeño. HuntHub Web implementa el rechazo o guardado de eventos mediante swipe gestual fluido con física Reanimated.
- **Micro-háptica Inmediata:** Toda confirmación táctil debe responder en menos de 16 milisegundos con un clic háptico en el motor Taptic Engine / haptic actuator del dispositivo para confirmar físicamente que el comando fue recibido.

---

## Relaciones de Contexto
- [[CANON_LAWS_OF_UX_PSYCHOLOGY_FRAMEWORKS]]
- [[DESIGN_SYSTEM_MAP]]
- [[Reanimated]]
