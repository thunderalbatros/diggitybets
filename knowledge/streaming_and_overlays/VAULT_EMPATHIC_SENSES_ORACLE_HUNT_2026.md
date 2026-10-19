# 🎯 Cacería SOTA: Inteligencia Empática, Sentidos Agudos y Oráculo (Octubre 2026)

> **Documento:** `knowledge/papers/SOTA_EMPATHIC_SENSES_ORACLE_HUNT_2026.md`
> **Fecha:** 2026-10-07 | **Orden:** CTO HITL (Tomás) — investigación web profunda + cacería masiva de repos
> **Alcance:** 14 repositorios nuevos clonados en cuarentena (`inspire/clones/`) que cubren 6 dominios: (1) reconocimiento de emociones por audio (SER), (2) sentidos agudos de visión y audición, (3) oráculo predictivo de sorteos/eventos, (4) reactividad en tiempo real, (5) humanismo y personalidad, (6) memoria contextual empática.

> ⚠️ **ANCLA DE ALCANCE (LEC-015):** Este documento es la fuente canónica de la cacería de repos del 2026-10-07 (14 repos: Open-LLM-VTuber, PANNs, pyannote-audio, CosyVoice, SillyTavern, etc.) y de sus recetas de integración. **NO es la fuente de:** precios/costes de VM (ver `GCP_PRICING_REFERENCE`), procedimiento de clonado general (ver `SOTA_REFERENCE_REPOSITORIES_MASTER_VAULT_2026` y `tools/manage-reference-vault.mjs`), decisiones del oráculo vigente (ver `memory/decisions.md` DEC-037/038), ni protocolo de shadow training (ver `SOTA_SHADOW_TRAINING_APPRENTICESHIP_AND_OFFLINE_EVAL_GUIDE_2026`).

---

## 1. MAPA DE LA CACERÍA (14 repos × 6 dominios)

| Dominio (orden CTO) | Repo clonado | Qué resuelve | Mínimo técnico |
|---|---|---|---|
| 🧠 Emoción por audio | `audeering/w2v2-how-to` | SER dimensional continuo (arousal/valence) del streamer | wav2vec2-large-robust, HF `audeering/wav2vec2-large-robust-ft-logmmi-emotion` |
| 🧠 Emoción por audio | `QwenAudio/SenseVoice` *(ya en vault)* | SER categórico + AED no-autorregresivo | ONNX, <30 ms — ⚠️ sin español (zh/en/ja/ko/yue) |
| 🔊 Jingles de victoria | `qiuqiangkong/audioset_tagging_cnn` (PANNs) | Detección zero-shot de fanfarrias/monedas/big win (527 clases AudioSet) | Cnn14 0.431 mAP, ONNX exportable |
| 👥 Quién habló | `pyannote/pyannote-audio` | Diarización streaming "quién habló cuándo" → atribuir mención de `tarkansky` | Pipeline Live-1, endpoinding online |
| 👂 Oído rápido | `ggerganov/whisper.cpp` | ASR C++ sin dependencias, quantización GGML, streaming agreement-policy | RTF bajísimo en CPU VM |
| 👂 Oído rápido | `modelscope/FunASR` | Runtime streaming de SenseVoice: VAD→ASR→puntuación con latencia de palabra | Runtime ONNX/TensorRT CPU |
| 👁️ Vista streaming | `showlab/VideoLLM-online` | VLM que decide CUÁNDO responder sobre flujo continuo de frames | CVPR, 7B, timing-token |
| 👁️ Vista precisa | `ds4sd/surya` | OCR multilingüe 90+ idiomas con layout y lectura en 90° (carteles rotados de ruletas) | CPU-friendly |
| 🎲 Oráculo numérico | `Nixtla/neuralforecast` | NHITS/PatchTST/TimeGPT: densidad de mensajes → probabilidad de evento en horizonte | PyTorch, `Auto*` tuning |
| 🎲 Oráculo matemático | `hmmlearn/hmmlearn` | HMM canónico scikit-learn: estados latentes, transición, verosimilitud | Referencia del HMM del Oráculo |
| ⚡ Reactividad total | `t41372/Open-LLM-VTuber` | Neuro-sama open-source: barge-in, percepción visual, memoria, tools | ASR+LLM+TTS pipeline latency-optimized |
| 🎭 Voz humana | `FunAudioLLM/CosyVoice` | TTS streaming ~150 ms primer paquete, clonación zero-shot ES | CosyVoice2-0.5B, Qwen2.5-0.5B backbone |
| 💗 Humanismo | `SillyTavern/SillyTavern` | Character Cards V2/V3 + lorebooks = ADN Tarkansky exportable/estandarizado | JSON spec interop |
| 💗 Empatía | `SmartFlowAI/EmoLLM` | Patrones de escucha empática, reformulación afectiva, datasets de soporte | v0.6 (zh→adaptar patrones) |
| 🧩 Memoria empática | `agiresearch/A-mem` | Memoria Zettelkasten auto-enlazada sobre Qdrant ($0) | Notas atómicas + evolución |

**Estado del vault tras la cacería:** 106 repos catalogados / 92+14 clonados en `inspire/clones/`. Comandos: `npm run vault` (list) · `clone <id|all>` · `inspect <id>` · `clean <id|all>`.

---

## 2. RECETAS DE MANIPULACIÓN, CONFIGURACIÓN E IMPLEMENTACIÓN (por dominio)

### 2.1 Emoción por audio (SER) — el sexto sentido empático
- **Arquitectura recomendada (2 etapas):** (a) PANNs Cnn14 como radar barato de eventos acústicos (jingle de victoria = clase AudioSet "Cheering"/"Applause" + finetune ligero con 30-50 muestras propias); (b) `audeering` wav2vec2-large-robust para el tono emocional CONTINUO del streamer (arousal alto + valence negativo = tilt; arousal alto + valence positivo = racha ganadora).
- **Cómo manipular:** ambos exportan a ONNX; hilos ONNX ya acotados a 4 por `resource-guard` (DEC-018). El SER dimensional devuelve 3 floats por ventana de 2 s — cabe en el Cerebellum (<50 ms).
- **Integración objetivo (NO ejecutada):** `visualState/acousticState` del Oráculo (DEC-037 §4) ganaría `emotionState` → el Oráculo hoy detecta sorteo inminente; con SER detectaría TAMBIÉN la escalada emocional que precede a un anuncio (el streamer se excita 15-30 s antes de lanzar la keyword).

### 2.2 Sentidos agudos (visión/audición de precisión)
- **whisper.cpp vs faster-whisper:** whisper.cpp gana en VM sin Python (binario único, quantización Q5_K_M, `examples/stream` con agreement-policy anti-alucinación ya validada en `whisper_streaming`). Evaluar migración del ASR de la VM si el RTF de faster-whisper Python molesta.
- **FunASR runtime:** es el hogar natural de SenseVoice si algún día se usa AED local; pipeline WebSocket listo con latencia de palabra.
- **Surya vs PaddleOCR:** surya resuelve carteles ROTADOS (ruletas giradas 90° en móvil) y layout de overlays multi-región; PaddleOCR sigue siendo más rápido puro. Candidato a 3ª opinión en el consenso OCR del `WheelOcrConsensusTracker`.
- **VideoLLM-online:** su contribución clave NO es el modelo (7B, caro) sino el PATRÓN "timing token": el modelo emite señal de respuesta en el instante correcto del flujo — exactamente el problema del Oráculo visual (cuándo despertar percepción JIT). Estudiar su head de timing para nuestro HMM.

### 2.3 Oráculo (predicción de eventos inminentes)
- **hmmlearn:** implementación de referencia para auditar el HMM propio (`StreamOracle`): fit de matriz de transición sobre historial de chats por canal, validación de secuencia con `score()` — permite responder "¿qué tan anómala es esta secuencia vs. la distribución del canal?" con una línea de matemática verificable.
- **neuralforecast:** para la predicción de DENSIDAD de mensajes (Hawkes ya implementado como proceso puro). NHITS en ventana deslizante de 5 min × horizonte 30 s podría calibrar `GIVEAWAY_IMMINENT_30S` mejor que umbral fijo. TimeGPT zero-shot = plan B sin entrenamiento.
- **Patrón cross-fuente:** la literatura de VideoLLM-online + StreamMind confirma que la alerta inminente más fiable = fusión (chat burst + emoción del streamer + evento visual en pantalla). Hoy Centinela fusiona chat+dinámica (HMM) y enciende vista/oído JIT (DEC-037 §4); el eslabón que falta es la EMOCIÓN (§2.1) como cuarto insumo del HMM.

### 2.4 Reactividad
- **Open-LLM-VTuber:** su pipeline ASR→LLM→TTS con interrupción de voz (v0.2.0+) es el mapa de referencia de latencias por etapa y del patrón barge-in en producción comunitaria. Estudiar: cómo cancela la generación TTS en curso al detectar voz entrante (aplicable a la cancelación de la campana/local bell cuando Tomás responde).
- **CosyVoice 2:** primer paquete ~150 ms con calidad de paridad humana (arXiv:2412.10117). Si la voz Sabina (SAPI SSML, DEC-038) se queda corta en naturalidad, CosyVoice2-0.5B es el sucesor natural para alertas habladas ES de alta fidelidad (requiere GPU o CPU lenta — hoy NO cabe en e2-std4 para 9 streams; documentado como decisión futura).

### 2.5 Humanismo y personalidad
- **SillyTavern character cards V2/V3:** spec JSON estandarizada (name, description, personality, scenario, first_mes, mes_example + lorebooks). Receta: exportar `tarkansky-dna.json` (v3.0.0) a card V3 → el ADN se vuelve portable/interoperable con todo el ecosistema roleplay, y la estructura `mes_example` mapea 1:1 con nuestras demostraciones cosechadas (shadow). Fue recomendación del benchmark externo 2026-10-04 ("character cards de SillyTavern para ADN exportable").
- **EmoLLM:** patrones de escucha empática (reflexión, validación emocional, preguntas abiertas) documentados en sus datasets — útiles para el motor de reacción cuando un streamer pierde (tilt) o gana (celebración): la respuesta empática correcta requiere reconocer el estado y reflejarlo, no resolverlo.

### 2.6 Memoria contextual empática
- **A-MEM:** notas atómicas auto-enlazadas generadas por LLM sobre Qdrant con evolución incremental (notas nuevas re-organizan enlaces viejos). Receta $0 para memoria episódica por canal: "el streamer X celebró racha el martes", "mods de Y avisan sorteos con 2 min de antelación". Complementario a Mem0 (hechos) y Letta (tiers); A-MEM aporta la RED de contexto que enlaza episodios.

---

## 3. OPTIMIZACIONES CRÍTICAS DESCUBIERTAS (⚠️ SOLO REPORTE — NO EJECUTAR SIN ORDEN DEL CTO)

1. **P0 — Cuarto insumo del Oráculo (emoción):** añadir `emotionState` (arousal/valence vía audeering ONNX) a `StreamOracle.recordChatMessage` para detectar escalada pre-anuncio. Estimado: el anuncio de sorteo suele precederse de pico de arousal 15-30 s antes — ventana de oro para alertas más tempranas. *(Reporte; requiere decisión + sandbox.)*
2. **P1 — PANNs como detector de jingles:** sustituir/complementar el trigger de "big win" por Cnn14 zero-shot ("Cheering", "Applause", "Music") con finetune de 30-50 clips propios. Falso positivo objetivo: fanfarria de slots vs música de fondo. *(Reporte.)*
3. **P1 — Character Card V3 del ADN:** exportar tarkansky-dna a spec SillyTavern → interoperabilidad total + mejor structured prompting para few-shot. *(Reporte.)*
4. **P2 — Diarización para mención en audio:** pyannote streaming para distinguir QUIÉN dice "tarkansky" (streamer vs. viewer) antes de escalar a alerta CRITICAL. Hoy no hay atribución. *(Reporte.)*
5. **P2 — Auditoría matemática del HMM:** validar el HMM del Oráculo contra hmmlearn (`score()` de secuencias reales por canal) y calibrar la matriz de transición con datos cosechados. *(Reporte.)*
6. **P2 — NHITS para calibrar GIVEAWAY_IMMINENT_30S:** sustituir umbral fijo de densidad por pronóstico de horizonte 30 s entrenado por canal. *(Reporte.)*
7. **P3 — Consenso OCR de 3ª opinión (surya):** añadir surya al WheelOcrConsensusTracker para carteles rotados/multi-región. *(Reporte.)*
8. **P3 — A-MEM para memoria episódica de canales:** capa Zettelkasten sobre Qdrant existente ($0). *(Reporte.)*

---

## 4. CÓMO USA EL EQUIPO LA BÓVEDA (`inspire/clones/`) — GUÍA DE ACCESO

1. **Cuándo acceder:** (a) ANTES de implementar cualquier optimización de estos dominios (auto-research: KB primero, luego el código real del repo de referencia); (b) al auditar un patrón ("¿cómo cancela pipecat el TTS en curso?"); (c) al elegir librería (comparar licencias/star/activity in situ).
2. **Cómo acceder:** solo lectura — `grep`/`Read` sobre `inspire/clones/<id>/<keyFiles>`. NUNCA `npm install`/`pip install` dentro de un clone (Quarantine Vault Pattern). Experimentos en `.sandboxes/` (DEC-040), no en el workspace.
3. **Qué NO es la bóveda:** no es código ejecutado por el bot en runtime — el runtime (`tools/lib/`) es el que corre 24/7; la bóveda es biblioteca de consulta para los agentes.

---

*Fuentes de la investigación: GitHub/SourceForge/docs oficiales de cada repo, pyannote.ai (Live-1), arXiv:2412.10117 (CosyVoice 2), HF Forums (ecosistema Neuro-sama-like), índices de topics `speech-emotion-recognition` y `realtime-emotion-recognition`. Verificación de existencia: clonado exitoso `git clone --depth 1` el 2026-10-07.*
