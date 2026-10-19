# 🎙️ Keyword Spotting (KWS) Sub-100ms en Edge Streaming Audio (SOTA 2024–2026)

## 1. Resumen Ejecutivo y Arquitectura KWS Edge
El Keyword Spotting (KWS) en streaming de baja latencia es el pilar sensorial auditivo para la detección de eventos de alerta crítica en transmisiones en vivo (Kick). Mientras que pipelines completos de transcripción ASR (como Whisper tiny/large o Moonshine) imponen ventanas acústicas de 1.5 a 4.0 segundos para decodificar oraciones completas, un motor KWS dedicado procesa streams continuos de audio PCM mono de 16 kHz en ventanas deslizantes de **80 ms (1,280 muestras @ 16 kHz)**, logrando latencias de inferencia de **< 100 ms** directamente sobre la CPU local mediante ONNX Runtime.

```
[Kick Stream PCM 16kHz]
          │ (Buffer de 80ms / 1280 samples)
          ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                  Pipeline Acústico KWS                      │
   │  1. Extracción de Mel-Spectrogram (80 bins, 25ms / 10ms hop) │
   │  2. Embedding Acústico Compartido (openWakeWord Backbone)   │
   │  3. Clasificador de Fonemas Específico ("tarkansky")        │
   │  4. Filtro de Activación Temporal (Exponential Moving Avg)  │
   └─────────────────────────────────────────────────────────────┘
          │ (P_target >= threshold)
          ▼
   [Disparo Inmediato <100ms: Alerta Sonora / Mutex Crítico Telegram]
```

---

## 2. Comparativa Tecnológica SOTA: openWakeWord vs Sherpa-ONNX

| Dimensión | openWakeWord (v0.6+) | Sherpa-ONNX (Next-gen Kaldi) | Whisper / Moonshine ASR |
| :--- | :--- | :--- | :--- |
| **Enfoque Primario** | Detección binaria de wake-words mediante features compartidos | Tiny ASR Transducer (Zipformer) con vocabulario abierto | Transcripción de vocabulario completo |
| **Latencia de Disparo** | **35 ms – 75 ms** (sub-100ms garantizado) | **60 ms – 110 ms** | 1,200 ms – 3,500 ms |
| **Consumo de Memoria** | ~15 MB RAM (ONNX INT8 / FP32) | ~35 MB – 50 MB RAM | 150 MB – 500 MB RAM |
| **Huella CPU por Canal** | < 2% de 1 núcleo (Intel Core / AMD Zen) | ~4% – 6% de 1 núcleo | 25% – 60% de 1 núcleo |
| **Soporte Streaming** | Streaming natural por frames de 80ms | Streaming mediante cache de transductor | Chunks fijos (requiere VAD previo) |
| **Curva de Integración** | ONNX Runtime Node (`onnxruntime-node`) | Binario C++ compilado / Wrappers C-API | Python subprocess / ONNX pipelines |

### 2.1 openWakeWord: Arquitectura Interna
- **Extracción de Características (Feature Extractor):**
  Un modelo base común genera representaciones espectrales y temporales densas (`audio_features.onnx`). Esto permite que múltiples modelos de activación (ej. nombres de usuarios, comandos de emergencia) compartan la misma pasada de inferencia espectral sin multiplicar el coste de CPU.
- **Micro-Clasificador por Wake-Word:**
  Un perceptrón multicapa compacto (MLP de 3 capas: `1536 → 32 → 32 → 1` con activaciones `LayerNorm` y `ReLU`). La salida es una sigmoide que representa la probabilidad instantánea de que el fonema objetivo (`/tɑːrˈkæn.ski/`) esté presente en la ventana acústica.
- **Suavizado Temporal:**
  Para evitar disparos espurios causados por ruidos impulsivos o percusiones del juego de slots, se aplica una ventana de persistencia (ej. $N=2$ frames consecutivos con $P > 0.65$).

### 2.2 Sherpa-ONNX (Next-gen Kaldi): Tiny ASR KWS
- Emplea un transductor Zipformer modificado para detección de palabras clave en texto plano sin reentrenamiento de pesos (`open-vocabulary KWS`).
- Permite definir listas dinámicas de palabras (`tarkansky`, `giveaway`, `winner`) con factores de **boosting score** ($+1.5$ a $+3.0$) y **trigger thresholds** calibrados por canal.

---

## 3. Formato de Audio y Contrato de Streaming
1. **Frecuencia de Muestreo:** 16,000 Hz (16 kHz).
2. **Canales:** Mono (1 canal). Si la fuente es estéreo (48 kHz / 44.1 kHz), se aplica downsampling mediante box filter o interpolación con promediado de canales.
3. **Profundidad de Bits:** 16-bit Signed Integer Little-Endian (s16le) normalizado a `Float32Array` en rango `[-1.0, 1.0]`.
4. **Tamaño del Frame:** 1,280 muestras (80 ms exactos).

---

## 4. Pipeline de Inferencia Ultrarrápida en Node.js
```javascript
// Contrato de Streaming KWS Sub-100ms
export class KeywordSpottingEngine {
  constructor(options = {}) {
    this.targetKeyword = options.targetKeyword || 'tarkansky';
    this.threshold = options.threshold || 0.60;
    this.consecutiveHitsRequired = options.consecutiveHitsRequired || 2;
    this.consecutiveHits = 0;
  }

  processFrame(pcm16kChunk) {
    // pcm16kChunk: Float32Array de 1280 muestras (80ms)
    const acousticScore = this.evaluateAcousticPhonemes(pcm16kChunk);
    if (acousticScore >= this.threshold) {
      this.consecutiveHits++;
      if (this.consecutiveHits >= this.consecutiveHitsRequired) {
        this.consecutiveHits = 0;
        return { detected: true, keyword: this.targetKeyword, confidence: acousticScore };
      }
    } else {
      this.consecutiveHits = Math.max(0, this.consecutiveHits - 1);
    }
    return { detected: false, confidence: acousticScore };
  }
}
```

---

## 5. Criterios de Aceptación y Puertas de Calidad
- **Latencia de Detección:** $\le 100\text{ ms}$ desde el fin del fonema en el stream PCM.
- **Tasa de Falsos Positivos:** $< 0.1$ falsos positivos por hora en audio de slots con música continua.
- **Resiliencia Térmica / CPU:** Consumo sostenido $< 5\%$ CPU en nodo local.

---
**Conexiones del Grafo (Obsidian):** [[INDEX]] · [[KICK_API_REFERENCE]] · [[CANON_KICK_PUBLIC_API_V2_FULL_REFERENCE]] · [[POPULAR_SLOTS_ONLY_ON_STAKE_TIERS]] · [[CANON_SLOTS_STAKE_RTP_VOLATILITY_DYNAMICS]] · #streaming_and_overlays
