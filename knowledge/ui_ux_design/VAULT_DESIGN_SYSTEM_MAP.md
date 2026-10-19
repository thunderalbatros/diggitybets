**Alcance:** Arquitectura de Design Tokens semánticos, superficies oscuras (Dark Mode), elevación tonal y ergonomía visual. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 🎨 Mapa Exhaustivo del Design System de Yendo (YDS — Dark-Vibrancy)

Este documento constituye el **Mapa Canónico del Design System (YDS)** implementado en `yendo_mobile`. Establece el inventario completo de tokens, tipografía, físicas hápticas, componentes atómicos, organismos, módulos 3D y pantallas, además de documentar las inconsistencias y desvíos detectados durante la auditoría.

---

## 1. Fundamentos y Arquitectura de Tokens

El YDS opera bajo el paradigma **Dark-Vibrancy**:
- **Lienzo Grafito MD3 Anti-Smearing:** Grafito `#121212` como base innegociable. Prohibido `#000000` en superficies extensas para erradicar el ghosting/smearing en pantallas OLED.
- **Micro-Resplandor Naranja Yendo:** Acento `#FF5500` reservado para llamadas a la acción (CTA), estados activos y sensación de escasez/quórum.
- **Entrada Pública Unificada:** [`src/theme/theme.ts`](file:///c:/Users/Tomi/yendo_mobile/src/theme/theme.ts) re-exporta la fuente única de verdad (SSOT) alojada en [`src/constants/theme.ts`](file:///c:/Users/Tomi/yendo_mobile/src/constants/theme.ts), sincronizada con la especificación W3C Design Tokens Community Group (DTCG) en [`src/constants/tokens.json`](file:///c:/Users/Tomi/yendo_mobile/src/constants/tokens.json).

---

## 2. Paleta Cromática y Niveles de Superficie

```
┌─────────────────────────────────────────────────────────────┐
│ LAYER 0: Canvas Base (background / backgroundDeep: #121212) │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ LAYER 1: Surface Frosted (rgba(20, 20, 20, 0.65))     │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ LAYER 2: Surface Elevated (rgba(28, 28, 28, 0.75))│ │  │
│  │  │  ┌───────────────────────────────────────────┐  │ │  │
│  │  │  │ LAYER 3: Surface Ultra (rgba(36, 36, 36))  │  │ │  │
│  │  │  └───────────────────────────────────────────┘  │ │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Tabla de Tokens de Color (`theme.colors`)

| Categoría | Nombre del Token | Valor CSS / RGBA | Propósito y Contrato de Uso |
| :--- | :--- | :--- | :--- |
| **Identidad Primaria** | `ydsBase.graphite` | `#121212` | Grafito MD3 Dark-First. Radar, lámina sólida, chrome. |
| **Identidad Primaria** | `ydsBase.accent` | `#FF5500` | Naranja Yendo puro. CTA principal, pins activos, acento. |
| **Lienzo** | `colors.background` | `#121212` | Fondo de pantallas y vistas base. |
| **Lienzo** | `colors.backgroundDeep` | `#121212` | Fondos de mapas, agua y unificación base. |
| **Lienzo** | `colors.backgroundTransparent`| `rgba(18, 18, 18, 0)` | Degradados alfa 0 para difuminar transiciones de scroll. |
| **Marca / Acento** | `colors.primary` | `#FF5500` | Botones CTA primarios, tags activos. |
| **Marca / Acento** | `colors.primarySoft` | `rgba(255, 85, 0, 0.12)` | Fondos tenues para chips y badges activos. |
| **Marca / Acento** | `colors.primaryGlow` | `rgba(255, 85, 0, 0.35)` | Halo perimetral y sombras de acento procedurales. |
| **Superficie** | `colors.surface` | `rgba(20, 20, 20, 0.65)` | Capa 1: Tarjetas translúcidas con blur de cristal esmerilado. |
| **Superficie** | `colors.surfaceSolid` | `#121212` | Superficie sólida cuando no se renderiza blur. |
| **Superficie** | `colors.surfaceElevated` | `rgba(28, 28, 28, 0.75)` | Capa 2: Elementos flotantes, controles elevados. |
| **Superficie** | `colors.surfaceUltra` | `rgba(36, 36, 36, 0.85)` | Capa 3: Bottom sheets, modales y drawers superiores. |
| **Inversión** | `colors.surfaceInverse` | `#FFFFFF` | Fondo de botones SSO (Apple/Google) y tags destacados. |
| **Inversión** | `colors.textInverse` | `#000000` | Texto de alto contraste sobre superficies claras. |
| **Tipografía** | `colors.textPrimary` | `#FFFFFF` | Texto principal (WCAG AAA sobre `#121212`). |
| **Tipografía** | `colors.textSecondary` | `#A0A0A0` | Subtítulos, metadatos y labels de apoyo. |
| **Tipografía** | `colors.textTertiary` | `#888888` | Iconografía inactiva, chips secundarios. |
| **Tipografía** | `colors.textLegal` | `#7D7D7D` | Texto legal y disclaimers (4.55:1, WCAG 2.2 AA). |
| **Tipografía** | `colors.textDisabled` | `#555555` | Texto sobre elementos completamente deshabilitados. |
| **Semántica** | `colors.success` | `#22C55E` | Confirmación, quórum completo, asistencia validada. |
| **Semántica** | `colors.successSoft` | `rgba(34, 197, 94, 0.12)` | Relleno tenue de confirmación. |
| **Semántica** | `colors.danger` | `#EF4444` | Alertas críticas, salida de grupo, bloqueo. |
| **Semántica** | `colors.dangerSoft` | `rgba(239, 68, 68, 0.12)` | Relleno tenue de alerta. |
| **Bordes** | `colors.border` | `rgba(255, 255, 255, 0.08)` | Micro-bordes especulares de precisión óptica (1px). |
| **Bordes** | `colors.borderGlow` | `rgba(255, 85, 0, 0.40)` | Borde activo con brillo naranja. |
| **Bordes** | `colors.borderSubtle` | `rgba(255, 255, 255, 0.04)` | Divisores tenues de lista. |
| **Controles** | `colors.track` | `#222222` | Pista inactiva de switches y sliders. |
| **Controles** | `colors.disabled` | `#1A1A1A` | Fondo de botones inactivos. |
| **Controles** | `colors.overlay` | `rgba(18, 18, 18, 0.65)` | Telón de fondo (backdrop) de modales y drawers. |

---

## 3. Tipografía y Corrección Óptica de Tracking

El sistema utiliza una **estrategia tipográfica híbrida**:
1. **Inter:** Motor de lectura universal (precisión geométrica, legibilidad neutral en pantallas de alta densidad).
2. **Plus Jakarta Sans:** Reservada exclusivamente para Títulos de Marca y la **Joya Numérica de Dunbar** (`"4/6"`).

### Roles Tipográficos Canónicos (`theme.typography`)

| Rol | Familia | Tamaño (pt) | Line Height | Tracking (Letter Spacing) | Aplicación |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display` | `Inter_700Bold` | 34 | 41 | `-0.85` | Hero numbers y cabeceras de bienvenida. |
| `h1` | `Inter_700Bold` | 28 | 34 | `-0.70` | Títulos principales de pantalla. |
| `h2` | `Inter_700Bold` | 22 | 28 | `-0.45` | Títulos de sección y tarjetas grandes. |
| `h3` | `Inter_600SemiBold` | 18 | 24 | `-0.30` | Subtítulos y cabeceras de modales. |
| `bodyLarge` | `Inter_400Regular` | 16 | 24 | `-0.15` | Texto de lectura amplio y descripciones de eventos. |
| `bodyRegular` | `Inter_400Regular` | 15 | 22 | `0.00` | Párrafos generales de interfaz. |
| `bodyMedium` | `Inter_500Medium` | 14 | 20 | `+0.10` | Labels de botones, inputs y metadatos. |
| `caption` | `Inter_500Medium` | 12 | 16 | `+0.25` | Tags, chips y timestamps (`textSecondary`). |
| `footnote` | `Inter_400Regular` | 11 | 14 | `+0.30` | Letra chica legal y disclaimers (`textLegal`). |
| `dunbarBadge` | `PlusJakartaSans_700Bold` | 13 | 16 | `+0.50` | Indicador numérico de quórum Dunbar (ej: `"3/6"`). |
| `brandTitle` | `PlusJakartaSans_700Bold` | 24 | 30 | `-0.50` | Identidad institucional y logotipo textual. |

---

## 4. Ritmo Espacial, Radios y Ergonomía Táctil

### Grilla Base de 8pt (`GRID_PT = 8`)

| Token | Valor (dp) | Ratio Multiplicador | Uso Estándar |
| :--- | :--- | :--- | :--- |
| `spacing.xs` | 4 | 0.5× | Micro-separaciones entre icono y texto. |
| `spacing.s` / `grid` | 8 | 1.0× | Padding interno de chips, separación de items compactos. |
| `spacing.m` | 16 | 2.0× | Margen lateral estándar de pantallas y tarjetas. |
| `spacing.l` | 24 | 3.0× | Separación vertical entre bloques de contenido. |
| `spacing.xl` | 32 | 4.0× | Espaciado entre secciones mayores y modales. |
| `spacing.xxl` | 48 | 6.0× | Padding superior de headers e hit-box mínimo. |
| `spacing.hero` | 64 | 8.0× | Espacio de cabeceras hero y banners de celebración. |

### Radios Geométricos (`theme.radii`)

- `radii.xs` (`4dp`): Micro-badges e indicadores.
- `radii.s` (`8dp`): Inputs compactos y mini-thumbnails.
- `radii.m` (`12dp`): Badges de Dunbar, chips de filtro.
- `radii.l` (`16dp`): Tarjetas secundarias y contenedores de chat.
- `radii.xl` (`24dp`): Bento cards, tarjetas hero y contenedores principales.
- `radii.sheet` (`28dp`): Bordes superiores de BottomSheets modales.
- `radii.full` (`999dp`): Botones píldora (CTA) y avatares circulares.

### Ergonomía Táctil (`theme.touch`)

- `touch.min` (`48dp`): Target táctil mínimo según WCAG 2.2 y Apple HIG.
- `touch.cta` (`56dp`): Altura táctil heroica para botones primarios de acción (Thumb Zone).

---

## 5. Sistema de Físicas y Motion (Reanimated 4.5.1 C++ Worklets)

Las animaciones en Yendo se ejecutan estrictamente en el hilo nativo de UI (`withSpring`) bajo 4 contratos cinemáticos:

| Contrato Físico | Masa (`m`) | Amortiguación (`c`) | Rigidez (`k`) | Comportamiento Sensorial |
| :--- | :--- | :--- | :--- | :--- |
| `physics.sheetTransition` | 0.5 | 20 | 300 | Inmediatez Apple HIG. Apertura y cierre de láminas sin oscilaciones infantiles. |
| `physics.cardSwipe` | 0.6 | 18 | 190 | Inercia elástica para arrastre y descarte de tarjetas en Explorador y Feeds. |
| `physics.tactilePress` | 0.4 | 12 | 320 | Compresión táctil instantánea (`scale: 0.96`, `overshootClamping: true`). |
| `physics.bouncyCelebration` | 0.5 | 9 | 240 | Rebote festivo para confirmaciones de quórum Dunbar y tokens 3D. |

---

## 6. Catálogo Integral de Componentes (Atomic Design)

### 6.1. Átomos (`src/components/atoms/`)

```
src/components/atoms/
├── AnimatedFadeIn.tsx        # Transición de opacidad Reanimated en entrada
├── DunbarBadge.tsx           # Badge numérico canónico de cupo ("n/6")
├── FloatingActionButton.tsx  # Botón flotante circular táctil (FAB)
├── InteractiveButton.tsx     # Botón primario/secundario/ghost con físicas tactilePress
├── InteractiveLikeButton.tsx # Botón háptico de favoritos con micro-animación
├── OnboardingHeader.tsx      # Barra superior de progreso para wizards
├── Skeleton.tsx              # Placeholder de carga con pulso de opacidad
├── SSOButton.tsx             # Botón de autenticación Apple/Google de alto contraste
└── YendoIsotype.tsx          # Isotipo vectorial de marca Yendo
```

### 6.2. Moléculas (`src/components/molecules/`)

```
src/components/molecules/
├── BentoCard.tsx             # Tarjeta modular con layout bento y bordes especulares
├── BottomThumbNav.tsx        # Barra de navegación ergonómica para pulgar
├── ChatMessageBubble.tsx     # Burbuja de mensaje de chat grupal
├── DevDebugOverlay.tsx       # Overlay de diagnóstico de telemetría y estado
├── DevPreviewBanner.tsx      # Banner informativo para previews de desarrollo
├── DevPreviewEntry.tsx       # Entrada rápida a pantallas en entorno sandbox
├── GlassCard.tsx             # Tarjeta con efecto de cristal esmerilado translúcido
├── MascotIcebreakerCard.tsx  # Tarjeta de dinámicas y preguntas del Carpincho
├── MemoryCapsuleCard.tsx     # Tarjeta de recuerdos y fotos de eventos pasados
├── ParticipantStack.tsx      # Pila de avatares solapados para quórum de grupo
├── RadarSearchBar.tsx        # Barra de búsqueda en vivo con debounce de 300ms
└── YendoBottomSheet.tsx      # Lámina gestual interactiva con 3 snaps (0.25, 0.50, 0.88)
```

### 6.3. Organismos (`src/components/organisms/`)

```
src/components/organisms/
├── BringAFriendCard.tsx      # Tarjeta para invitación viral de acompañante
├── CapybaraHomeHost.tsx      # Host interactivo del Carpincho en pantalla Home
├── CapybaraInteractive.tsx   # Contenedor de interacciones táctiles del Carpincho
├── CapybaraLottieMascot.tsx  # Mascota animada one-shot vía Lottie
├── CapybaraMascot.tsx        # Componente compuesto de la mascota
├── CapybaraRiveMascot.tsx    # State machine nativa del Carpincho en Rive
├── CapybaraSocialHost.tsx    # Anfitrión social para eventos y chats
├── EditProfileModal.tsx      # Modal de edición de perfil de usuario
├── EventCardSkeleton.tsx     # Skeleton loader para tarjetas de feed
├── EventCelebrationModal.tsx # Modal festivo de confirmación de asistencia
├── EventItemCard.tsx         # Item compacto de evento
├── ExploreCapybaraFab.tsx     # FAB interactivo del Carpincho en el mapa
├── GroupCard.tsx             # Tarjeta integral de grupo Dunbar con cupos
├── GroupInfoSheet.tsx        # Sheet informativo de integrantes y reglas del grupo
├── HomeFeedHeader.tsx        # Cabecera de bienvenida y filtros del feed
├── HomeFeedSearch.tsx        # Input de búsqueda del feed
├── HomeFeedStates.tsx        # Estados vacíos y de error con Carpincho
├── HomeFilterModal.tsx       # Modal de filtrado por categoría y momento
├── InteractiveAvatar.tsx     # Avatar con halo de estado de ánimo y karma
├── InteractiveMapCard.tsx    # Tarjeta previa de mapa estático
├── InviteFriendOverlay.tsx   # Overlay modal para compartir enlace de invitación
├── LazyRegistrationGate.tsx  # Barrera de registro progresivo sin fricción
├── MagicOnboardingVibe.tsx   # Selector de afinidad y vibra de usuario
├── OriginFilterRow.tsx       # Fila de chips de origen (Planes Propios vs Abiertos)
├── ProfileFilterDrawer.tsx   # Drawer lateral de configuración de filtros
├── RadarExperienceSheet.tsx  # Lámina de detalle de experiencia en Radar
├── RadarPlanComposer.tsx     # Creador inline de juntadas sobre el mapa
├── SocialHostIcebreaker.tsx  # Disparador de preguntas rompehielos
├── SocialHostInlineCard.tsx  # Tarjeta compacta de dinamización social
├── TrustBadge.tsx            # Badge de verificación de local y seguridad
├── UserProfileModal.tsx      # Modal detallado de perfil y medallas
├── VenueRadarMap.tsx         # Mapa MapView con customMapStyle oscuro
├── VenueRadarMap.web.tsx     # Fallback web para el mapa del radar
├── ViralPassModal.tsx        # Modal de Pase Compañero y viral loops
├── YendoActionSheet.tsx      # Menú de acciones nativas contextuales
├── create-group/             # Sub-organismos del creador de grupos
│   ├── CreateCapacityPicker.tsx
│   ├── CreateIntentChips.tsx
│   ├── CreatePlaceAutocomplete.tsx
│   └── CreateWhenSection.tsx
└── event-card/               # Sub-organismos de la tarjeta principal
    ├── EventCardHero.tsx
    ├── EventCardQuorum.tsx
    ├── HomeFeedCard.tsx
    └── useEventCardPhysics.ts
```

### 6.4. Módulos 3D, Shaders y Gráficos (`src/components/3d/`, `src/components/splash/`, `src/components/animations/`)

```
src/components/3d/
├── CapybaraLowPolyMesh.tsx   # Malla low-poly 3D (<5k tris) para R3F
├── CapybaraProceduralScene.tsx # Escena Three.js con iluminación dinámica
├── CapybaraSpatial3D.tsx     # Contenedor espacial 3D con tracking giroscópico
├── DunbarOrbit3D.tsx         # Órbita interactiva de avatares en 3D
├── ModelViewer3D.tsx         # Visor GLTF con limpieza de VRAM GPU
├── RemoteGLTFCapybara.tsx    # Carga diferida de modelo GLTF remoto
├── SceneErrorBoundary.tsx   # Límite de error para caídas de WebGL
├── YendoCompass3D.tsx        # Brújula 3D de navegación barrial
└── YendoToken3D.tsx          # Token de recompensa 3D con reflexión metálica

src/components/splash/
└── Splash3D.tsx              # Intro 3D con fallback 2D y dispose limpio

src/components/animations/
├── SpatialCard3D.tsx         # Tarjeta con inclinación 3D en Reanimated
└── SwipeableDeck.tsx         # Mazo gestual para tarjetas de experiencia
```

---

## 7. Inventario de Pantallas (`src/screens/`)

| Directorio | Pantalla | Propósito y Componentes Clave |
| :--- | :--- | :--- |
| `src/screens/` | `HomeScreen.tsx` | Feed principal con `FlashList`, `HomeFeedCard`, `CapybaraHomeHost`. |
| `src/screens/` | `ExploreScreen.tsx` | Radar de venues con `VenueRadarMap`, `YendoBottomSheet` (snaps 0.25/0.50/0.88). |
| `src/screens/` | `ChatsScreen.tsx` | Bandeja de chats grupales con `FlashList` y estados vacíos. |
| `src/screens/` | `VaultScreen.tsx` | Bóveda de tokens, logros de karma y recompensas B2B. |
| `src/screens/` | `EventDetailScreen.tsx` | Detalle del evento/venue, quórum Dunbar y CTA de unirse. |
| `src/screens/` | `CreateGroupScreen.tsx` | Wizard de creación de juntadas con selector de capacidad y lugar. |
| `src/screens/` | `GroupChatScreen.tsx` | Chat activo del grupo con `ChatMessageBubble` y `GroupInfoSheet`. |
| `src/screens/` | `NotificationsScreen.tsx` | Centro de avisos y notificaciones de actividad grupal. |
| `src/screens/` | `CreateEventWizardScreen.tsx` | Orquestador de 7 pasos para creación formal de experiencias. |
| `src/screens/auth/` | `SplashScreen.tsx` | Arranque de app, verificación de sesión y transición a Login. |
| `src/screens/auth/` | `LoginScreen.tsx` | Login con SSO (Apple/Google) y número de teléfono. |
| `src/screens/auth/` | `InstagramSyncScreen.tsx` | Vinculación opcional de perfil de Instagram. |
| `src/screens/onboarding/` | `BasicInfoScreen.tsx` | Nombre, edad y fecha de nacimiento con validación. |
| `src/screens/onboarding/` | `BioScreen.tsx` | Biografía breve y selección de estilo social. |
| `src/screens/onboarding/` | `PhotoPickerScreen.tsx` | Carga de fotografía de perfil de alta calidad. |
| `src/screens/onboarding/` | `InterestsScreen.tsx` | Matriz de chips de intereses y categorías. |
| `src/screens/create-event/steps/` | `Step1EventType.tsx` a `Step7Preview.tsx` | Wizard modular de 7 pasos para publicación de eventos. |
| `src/screens/dev/` | `FlowLabScreen.tsx` | Laboratorio de pruebas rápidas de flujos y modales. |

---

## 8. Auditoría Técnica: Inconsistencias y Red Flags Detectadas

Durante el escaneo del código fuente se detectaron las siguientes discrepancias respecto a la especificación canónica del YDS:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        🚨 RED FLAGS DETECTADAS                         │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Valores Hexadecimales Dispersos (Hardcoded Colors en Screens):      │
│    • EventDetailScreen.tsx: #1E1E1E, #242424, #2A2A2A, #333333,       │
│      #282828, #3A3A3A, #CCCCCC, #888888, #FFFFFF.                     │
│    • VaultScreen.tsx: #1E1E1E, #2A2A2A, #2E2E2E, #777777, #FFFFFF.    │
│    • NotificationsScreen.tsx: #EAB308, #38BDF8, #FF5500, #FFFFFF.     │
│    → Acción Requerida: Migrar a tokens semánticos de theme.colors      │
│      (surfaceElevated, border, textPrimary, textSecondary).           │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Dimensiones Mágicas en vez de Tokens de Espaciado/Radio:            │
│    • Uso directo de borderRadius: 20, padding: 10, gap: 12, height: 280│
│      en pantallas en lugar de theme.radii y theme.spacing.             │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Discrepancia en Token Legal W3C vs Runtime:                         │
│    • src/constants/tokens.json: textLegal = #555555 (Ratio 2.5:1, FAIL)│
│    • src/constants/theme.ts: textLegal = #7D7D7D (Ratio 4.55:1, PASS) │
│    → Acción Requerida: Ejecutar compilador de tokens para actualizar   │
│      tokens.json y tokens.generated.ts con el valor de contraste AA.   │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Barril de Exportación Incompleto (src/components/index.ts):         │
│    • Componentes como ParticipantStack, OriginFilterRow,               │
│      SocialHostIcebreaker y CapybaraRiveMascot no están exportados     │
│      en el index público.                                              │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 🔗 Fuentes, APIs y URLs de Referencia
- **YDS Brand Book & Guidelines:** [[.knowledge/dossiers/YENDO_DNA_BRAND_BOOK.md]]
- **Visual Guidelines Explorador:** [[.knowledge/VISUAL_GUIDELINES.md]]
- **W3C Design Tokens Community Group (DTCG):** https://design-tokens.github.io/community-group/format/
- **Material Design 3 Dark Theme Guidance:** https://m3.material.io/styles/color/system/overview
- **Apple Human Interface Guidelines (Typography & Touch Targets):** https://developer.apple.com/design/human-interface-guidelines/
- **Web UI / Vanilla & Modern Frontend Reanimated 4 Documentation:** https://docs.swmansion.com/react-native-reanimated/
- **Shopify FlashList High Performance Guide:** https://shopify.github.io/flash-list/

---

## Relaciones de Contexto
- [[.knowledge/YENDO_DNA.md]]
- [[.knowledge/YENDO_LIBRARY.md]]
- [[CANON_UI_UX_RIVE_FIGMA]]
- [[UX_UI_MASTER_MANIFESTO]]
- [[VISUAL_GUIDELINES]]
- [[YDS_Catalog]]
- [[Biblia_Maestra_Visual_3D_Motion_Yendo]]
- [[MOTION_GRAPHICS_CODING]]
- [[3D_TECHNICAL_ART_GUIDE]]
- [[YendoBottomSheet]]
- [[Número de Dunbar]]
- [[Terceros Lugares]]
- [[Capybara Mascot]]
- [[Reanimated]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[React Three Fiber]]
- [[Rive]]
- [[Lottie]]
