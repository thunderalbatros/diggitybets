# Reporte Arquitectónico y Dossier Tecnológico: Plataforma Gamificada e Interacciones en Tiempo Real

Este documento detalla el stack *open-source* más avanzado y robusto para el equipo de agentes en Antigravity IDE. El objetivo es construir una plataforma web interactiva de alto rendimiento, gamificada y sincronizada en tiempo real con la transmisión (Kick) y el software de emisión (OBS).

---

## 1. Arquitectura Central y Frameworks de Desarrollo

Para soportar concurrencia masiva y una integración fluida de gráficos interactivos, el proyecto debe estructurarse bajo una arquitectura orientada a eventos (Event-Driven Architecture) mediante un **Monorepo** (ej. Turborepo o Nx).

*   **Frontend (Plataforma Web y Overlays): Next.js (React) + TypeScript**
    *   *Propósito:* Construir tanto el sitio de los usuarios como las URLs dedicadas a los *Browser Sources* de OBS.
    *   *Ventaja:* Next.js App Router permite manejar rutas estáticas ultraligeras para OBS y rutas dinámicas (SSR/CSR) para el panel de usuarios, compartiendo la misma lógica de estado y tipos.
*   **Backend (Motor Lógico y APIs): NestJS (Node.js) o Go**
    *   *Propósito:* Orquestador central. Manejará la autenticación OAuth, lógica *Provably Fair* de los minijuegos, economía de puntos y recepción de webhooks.
    *   *Ventaja:* NestJS proporciona una inyección de dependencias estricta, ideal para equipos de agentes de IA, asegurando un código predecible y modular.
*   **Base de Datos y Caché: PostgreSQL + Redis**
    *   *Propósito:* PostgreSQL gestionará el estado inmutable (usuarios, transacciones de puntos, inventario de la *Store*, registro de apuestas). Redis actuará como *Message Broker* (Pub/Sub) para los WebSockets y gestor de sesiones de alta velocidad para evitar *race conditions*.

---

## 2. Integraciones de Plataformas (Kick, Stake y OBS)

*   **Kick API, Autenticación y Webhooks:** `@nekiro/kick-api` (NPM) o `kick4j`
    *   *Mecanismo OAuth:* Utilizar OAuth 2.1 con PKCE para vincular la cuenta de Kick del usuario a su perfil en la base de datos.
    *   *Eventos en Tiempo Real:* Implementar Webhooks de Kick en lugar de *polling*. El servidor se suscribe a `chat.message.sent` para procesar comandos como `!battle starlight princess` instantáneamente.
*   **Verificación de Apuestas en Stake (Bet ID / Multiplicador):**
    *   *Ejecución:* El backend realiza una query al endpoint GraphQL de Stake (`https://api.stake.com/graphql` operando un payload de `bet_info`) para obtener el objeto de la apuesta.
    *   *Validación Local:* El backend programa un validador criptográfico (HMAC-SHA256) que compruebe que el `nonce` y los `seeds` generaron efectivamente el multiplicador reclamado (ej. 100x en Dice).
*   **Integración con Stream Overlay: OBS WebSocket v5 + Soketi**
    *   *Mecanismo:* Desplegar **Soketi** (servidor WebSocket C++ compatible con Pusher) o manejar conexiones directas con **Socket.io**.
    *   *Flujo:* La web embebida en OBS se conecta a este WebSocket. Para cambios de escena drásticos, el backend usa `obs-websocket-js`.

---

## 3. Lógica de Minijuegos Originales (Keno, BJ, Roulette, Hilo)

*   **Práctica Arquitectónica: *Provably Fair System***
    *   *Backend (Autoridad):* Genera un `Server Seed` encriptado. El usuario proporciona un `Client Seed`. El backend resuelve la matemática, deduce el saldo en PostgreSQL, y devuelve el resultado.
    *   *Frontend (Visualizador):* Recibe el resultado final y únicamente se encarga de interpolar la animación desde el estado actual hasta el estado ganador.

---

## 4. Sincronización Bidireccional: El caso de Uso "!battle"

Ciclo de vida de evento (Event-Loop) para garantizar que la pantalla del stream y la web converjan:

1.  **Ingreso (Kick):** El usuario escribe `!battle starlight princess` en el chat de Kick.
2.  **Captura (Backend):** El webhook recibe el evento. NestJS verifica cuenta y fondos. Genera un ID de evento de batalla.
3.  **Broadcasting:** El backend emite el evento `EVENT_BATTLE_INITIATED` vía Redis Pub/Sub a Socket.io.
4.  **Impacto en Stream Overlay:** El frontend en OBS recibe el evento. El motor 2D/3D renderiza la aparición de un panel de combate sobre la transmisión.
5.  **Impacto en Plataforma Web:** Simultáneamente, los clientes web conectados reciben el mismo evento. El DOM de React actualiza el componente `<TourneyPanel/>` añadiendo al usuario a la lista de retadores.

---

## 5. Arsenal Visual Expandido: Motores, Animación y Físicas

La clave para dominar el desarrollo visual radica en la intersección entre alta performance (WebGL/WebGPU), física en tiempo real y micro-sistemas de animación FOSS.

### 5.1 Motores Gráficos 2D/3D Avanzados (WebGL, WebGPU)
*   **PlayCanvas Engine** (`playcanvas/engine`): Motor de juegos 3D y 2D en web con soporte nativo de WebGPU y WebGL2. Ideal para renderizar tableros interactivos de Roulette o batallas 1v1 en 3D con bajísima latencia.
*   **PixiJS** (`pixijs/pixijs`): El estándar para renderizado 2D ultra-veloz. Para el Keno, slots, cartas del BJ y animar el giro de la ruleta.
*   **Phaser** (`phaser/phaser`): Framework para estructurar mecánicas de juegos clásicos de casino de forma rápida, incluye gestores de escenas y físicas arcade nativas.
*   **Konva.js** (`konvajs/konva`): Extensión de canvas 2D ideal para creadores de avatar o ruedas de la fortuna donde cada sección responde a eventos del DOM.

### 5.2 Animación de Interfaz, Vectorial y Micro-Motion
*   **Rive**: Animaciones vectoriales con máquinas de estado (State Machines) integradas. Reemplazo ideal para GIFs pesados en alertas y transiciones.
*   **ThorVG** (`thorvg/thorvg`): Motor de gráficos vectoriales multiplataforma compilable a WebAssembly con aceleración nativa. Sustituto de alto rendimiento para Lottie y SVGs complejos.
*   **Motion / Motion One** (`motiondivision/motion`): Librería rápida sobre WAAPI, perfecta para orquestar la aparición de banners y notificaciones en directo en el overlay sin penalización de FPS.
*   **Anime.js** (`juliangarnier/anime`): Motor de interpolación para encadenar animaciones complejas y cronometradas (timelines).
*   **Framer Motion** (`framer/motion`): Indispensable en Next.js para micro-interacciones (hover, modales dinámicos, vibración de fichas).

### 5.3 Física en Tiempo Real y Colisiones
*   **Matter.js** (`liabru/matter-js`): Motor de física 2D para simular gravedad y rebotes. Útil para "Hilo", lluvias de monedas en el overlay o mini-juegos tipo plinko.
*   **Rapier** (`dimforge/rapier`): Motor de física ultra-rápido en Rust (WASM) para escenarios donde la física determine resultados criptográficamente correctos (server-side determinista).

### 5.4 Shaders, VFX y Audio
*   **Motores de Shaders WebGPU FOSS**: Para inyectar filtros, distorsiones y overlays interactivos (ej. el efecto "Starlight", auras brillantes, partículas).
*   **vGPU** (`vgpu/vgpu`): Librería WebGPU para generar dinámicamente escenas 3D e interfaces GPU-powered con mínima fricción.
*   **Howler.js**: Manejo de *Audio Sprites*, espacialidad y latencia cero para efectos de sonido sin bloquear el hilo principal.

### 5.5 Arte Generativo y Visualizadores
*   **p5.js** (`processing/p5.js`): Excelente para crear overlays reactivos de sonido (audioreactivos) conectados al Web Audio API.
*   **Paper.js** (`paperjs/paper.js`): Para dibujar de forma procedural historiales de jugadas o gráficos orgánicos (ej. trayectoria de multiplicadores en juegos tipo Crash).

---

## 6. Prácticas de Ingeniería Sugeridas para los Agentes

1.  **Aislamiento de Lógica e Interfaz (MVC)**: Programar la lógica del juego exclusivamente en el backend o en el hilo lógico del cliente, delegando a PlayCanvas/PixiJS solamente el rol de "visualizador".
2.  **Web Worker Physics / Offscreen Canvas**: Las simulaciones de partículas masivas y animaciones pesadas deben calcularse en un *Web Worker* de fondo, o utilizando un *Offscreen Canvas* para no afectar la navegación del DOM en dispositivos modestos.
3.  **Animaciones basadas en "Deltas de Tiempo" (`deltaTime`)**: Dado que los dispositivos varían en tasas de refresco (60Hz, 120Hz), todas las animaciones deben usar interpolaciones multiplicadas por el delta de tiempo para garantizar que los eventos visuales comiencen y terminen al mismo tiempo para todos los usuarios.