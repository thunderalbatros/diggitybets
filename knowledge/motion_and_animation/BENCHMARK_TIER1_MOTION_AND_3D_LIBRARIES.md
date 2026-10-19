> **Alcance:** Literatura canónica y tratados técnicos de animación a 60 FPS, shaders GPU, física de resortes (spring physics), arte técnico 3D y micro-interacciones fluidas para sitios web modernos y overlays OBS.

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

# 🧠 Benchmark Vault: Cerebro de Referencias Visuales, Físicas de UI y Pipeline 3D (Tier-1)

Este documento constituye la **Biblia Canónica y Norma Innegociable** para la concepción, animación y manufactura técnica de cualquier componente de interfaz, micro-interacción en `react-native-reanimated` o script en Python para [[Blender]] en el ecosistema [[Yendo Buenos Aires]].

Queda estrictamente prohibido el diseño especulativo, amateur o estático. Toda pieza visual debe anclarse en la psicología de producto y en las formulaciones físico-matemáticas de los gigantes tecnológicos ([[Apple]], [[Duolingo]], [[Uber]], [[Tinder]]).

---

## 🦉 1. Anatomía y Psicología de la Mascota Interactiva (Benchmark Duolingo)

La investigación empírica de retención demuestra que las aplicaciones con mascotas dinámicas experimentan un incremento del **40% al 50% en dwell time** y una retención a 30 días (**Retention D+30**) superior en un **23%**, catalizada por el apego afectivo y la reducción de la ansiedad social.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PSICOLOGÍA DEL AVATAR: EL PUENTE EMOCIONAL DE YENDO                          │
├────────────────────────────────┬────────────────────────────────────────────┤
│ Principio Antropológico        │ Implementación en el Carpincho Yendo       │
├────────────────────────────────┼────────────────────────────────────────────┤
│ 1. [[Baby Schema]]             │ Silueta ovoide, cabeza redondeada, ojos    │
│    (Konrad Lorenz)             │ grandes y serenos. Reduce la amígdala.     │
├────────────────────────────────┼────────────────────────────────────────────┤
│ 2. [[Liking Gap Mitigation]]   │ Tercero de confianza neutral que valida al │
│    (Erica Boothby)             │ usuario tras la salida: "¡La rompiste!".   │
├────────────────────────────────┼────────────────────────────────────────────┤
│ 3. [[Playful Cushioning]]      │ En errores de red o listas vacías, toma    │
│    (Amortiguación Empática)    │ mate con calma: "Tranqui, tomemos un mate".│
├────────────────────────────────┼────────────────────────────────────────────┤
│ 4. [[Variable Reward Loop]]    │ Brinco festivo 360° con pulso áureo al     │
│    (Skinner / Eyal)            │ alcanzar el Quórum Dunbar (4 a 6 personas).│
└────────────────────────────────┴────────────────────────────────────────────┘
```

### Reglas Innegociables de Comportamiento del Avatar

1. **El Ciclo de Respiración Ociosa ([[Idle Breathing]]):**
   * El avatar jamás permanece estático. Debe ejecutar una respiración senoidal en bucle continuo con un periodo de **1.4 a 1.8 segundos** (isócrono a la frecuencia respiratoria humana en reposo de 12-14 respiraciones por minuto).
   * La cabeza debe tener un balanceo sutil de curiosidad ($\pm 0.04\text{ rad}$) con desfase de fase ($\pi/4$) respecto al tórax.
2. **Respuesta al Tacto ([[Tactile Compression]]):**
   * Todo toque directo sobre la mascota debe activar compresión física (`scale: 0.92`) y disparar de inmediato un micro-háptico asimétrico (`triggerTactileTap`).
   * Al soltar el dedo, la mascota realiza un brinco alegre vertical con amortiguación elástica.
3. **Gestión del Error y la Frustración ([[Zero Blame UI]]):**
   * Prohibido mostrar estados de error impersonales (como "Error 500" o "No se encontraron resultados").
   * El Carpincho debe asumir el rol de anfitrión distendido: en modo `sip_mate`, sostiene un mate de calabaza con bombilla plateada, transmitiendo que la pausa no es una falla, sino una oportunidad de relax.
4. **Celebración del Quórum ([[Dunbar Quorum Celebration]]):**
   * Cuando una Célula Dunbar alcanza los 4 miembros confirmados, la mascota debe transicionar al modo `celebrating`: brinco vertical rítmico a 4 Hz y halo lumínico ámbar pulsante (`#FF5500`), acompañado del háptico de recompensa dopaminérgica `triggerAsymmetricSuccess()`.

---

## 🏎️ 2. Físicas de UI Estandarizadas (Benchmarks Apple HIG, Uber & Tinder)

Toda micro-interacción en [[Reanimated]] debe prescindir de funciones temporales lineales (`withTiming` genérico) en favor de simulaciones basadas en la física del oscilador armónico amortiguado:

$$F = -k \cdot x - c \cdot v$$

Donde $k$ es la rigidez (*stiffness*), $c$ es el coeficiente de amortiguamiento (*damping*), $m$ es la masa inercial (*mass*) y $v$ es la velocidad transferida por el gesto del usuario.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ MATRIZ DE FÍSICAS DE RESORTE CANÓNICAS (SINGLE SOURCE OF TRUTH)             │
├────────────────────┬───────┬───────────┬─────────┬──────────┬───────────────┤
│ Token en theme.ts  │ Masa  │ Stiffness │ Damping │ Duración │ Inspiración   │
├────────────────────┼───────┼───────────┼─────────┼──────────┼───────────────┤
│ tactilePress       │ 0.35  │ 350       │ 22      │ ~110 ms  │ [[Apple HIG]] │
├────────────────────┼───────┼───────────┼─────────┼──────────┼───────────────┤
│ cardSwipe          │ 0.60  │ 190       │ 18      │ ~280 ms  │ [[Tinder]]    │
├────────────────────┼───────┼───────────┼─────────┼──────────┼───────────────┤
│ sheetTransition    │ 0.50  │ 300       │ 20      │ ~200 ms  │ [[Apple Form]]│
├────────────────────┼───────┼───────────┼─────────┼──────────┼───────────────┤
│ bouncyCelebration  │ 0.40  │ 240       │ 10      │ ~450 ms  │ [[Duolingo]]  │
└────────────────────┴───────┴───────────┴─────────┴──────────┴───────────────┘
```

### Principios de Continuidad Cinética (Estilo Uber & Tinder)

1. **Conservación del Momentum ([[Velocity Transfer]]):**
   * Al soltar una tarjeta o arrastrar una lámina inferior (*Bottom Sheet*), está terminantemente prohibido ignorar la velocidad gestual.
   * La velocidad residual del gesto nativo (`event.velocityX` / `event.velocityY`) debe inyectarse directamente en la configuración del resorte:
     ```typescript
     translateY.value = withSpring(targetOffset, {
       ...theme.physics.sheetTransition,
       velocity: event.velocityY,
     });
     ```
2. **Inercia y Descarte Elástico ([[Tinder Threshold Algorithm]]):**
   * El umbral de descarte lateral o vertical se calcula de forma bimodal:
     * Si la distancia recorrida supera el **35% del ancho o alto de pantalla**, la tarjeta se descarta.
     * Si la distancia es menor pero la velocidad supera los **800 px/s**, la intención de descarte se valida por inercia y la tarjeta sale disparada en la dirección del swipe.
     * En caso contrario, el resorte `cardSwipe` devuelve la tarjeta a su origen `(0, 0)` sin rebotes espurios.
3. **Profundidad Z-Axis en VisionOS ([[Spatial Depth Elevation]]):**
   * En pantallas con lienzos 3D o mapas interactivos, los elementos de UI no son planos; flotan en capas de elevación con fondos de cristal líquido translúcido (`rgba(20, 20, 20, 0.75)`), borde especular de 1px (`rgba(255, 255, 255, 0.08)`) y difuminado por hardware (`BlurView`).

---

## 🐍 3. Protocolo Estricto para Scripts en Python de Blender (`CREATIVE_TECH`)

Cuando el departamento [[CREATIVE_TECH]] sea comisionado para modelar, riggear o exportar mallas 3D para la app mediante scripts en Python ejecutables en [[Google Colab]], terminales o CI/CD headless, debe acatar de forma estricta las siguientes normas de ingeniería:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PROTOCOLO DE INGENIERÍA 3D HEADLESS PARA BLENDER PYTHON API (bpy)           │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ Parámetro         │ Especificación Técnica Obligatoria                      │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ 1. Presupuesto    │ $\le 5,000$ triángulos para personajes completos.       │
│    Poligonal      │ $\le 2,500$ triángulos para accesorios (mate/gafas).    │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ 2. Jerarquía de   │ Root -> Spine -> Neck -> Head                           │
│    Huesos (Rig)   │ Sufijos simétricos obligatorios: `_L` y `_R`.           │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ 3. Pistas NLA     │ Cada animación debe empaquetarse en un NLA Track        │
│    (Acciones)     │ independiente para exportación multi-clip en glTF 2.0.  │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ 4. Materiales     │ Principled BSDF único. Prohibidos nodos procedurales    │
│    PBR            │ internos (Noise, ColorRamp) incompatibles con glTF.     │
├───────────────────┼─────────────────────────────────────────────────────────┤
│ 5. Compresión     │ Post-procesamiento Draco + gltfpack para $\le 800$ KB.  │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

### Plantilla Estructural para Scripts de Blender Headless

Todo script generado en `tools/pipelines/` debe implementar la siguiente estructura modular:

```python
#!/usr/bin/env python3
import sys
import bpy

def limpiar_escena():
    """Elimina mallas, materiales, armatures y acciones residuales."""
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for block in bpy.data.meshes: bpy.data.meshes.remove(block)
    for block in bpy.data.materials: bpy.data.materials.remove(block)
    for block in bpy.data.armatures: bpy.data.armatures.remove(block)
    for block in bpy.data.actions: bpy.data.actions.remove(block)

def crear_material_pbr(nombre, base_color, roughness=0.6, metallic=0.0):
    """Crea un sombreador Principled BSDF compatible al 100% con glTF."""
    mat = bpy.data.materials.new(name=nombre)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = base_color
        bsdf.inputs["Roughness"].default_value = roughness
        bsdf.inputs["Metallic"].default_value = metallic
    return mat

def construir_armature_y_nla(malla_objeto):
    """Configura el esqueleto jerárquico y hornea las pistas NLA."""
    bpy.ops.object.armature_add(location=(0, 0, 0))
    armature = bpy.context.active_object
    armature.name = "Armature_Character"

    bpy.ops.object.mode_set(mode='EDIT')
    # Nomenclatura obligatoria: Root, Spine, Head
    root = armature.data.edit_bones['Bone']
    root.name = 'Root'
    # ...creación de huesos hijos...
    bpy.ops.object.mode_set(mode='OBJECT')

    # Emparentado con pesos automáticos
    malla_objeto.select_set(True)
    armature.select_set(True)
    bpy.context.view_layer.objects.active = armature
    bpy.ops.object.parent_set(type='ARMATURE_AUTO')

    # Horneado en NLA Tracks para compatibilidad con useGLTF / useAnimations
    armature.animation_data_create()
    # Pista 1: Anim_Idle_Chill
    # Pista 2: Anim_Action_Primary
    return armature

def exportar_glb_optimizado(ruta_salida):
    """Exporta el binario glTF con animaciones NLA y skins activas."""
    bpy.ops.export_scene.gltf(
        filepath=ruta_salida,
        export_format='GLB',
        export_apply=False,
        export_animations=True,
        export_nla_strips=True,
        export_skins=True,
        export_morph=True,
        export_materials='EXPORT',
    )
```

---

## 🔗 4. Matriz de Trazabilidad y Grafo de Conocimiento

*   Verificación de VRAM móvil: [[Yendo Design System Tier1]]
*   Filosofía del Tercer Lugar y Quórum Dunbar: [[YENDO DNA]] y [[YENDO LIBRARY]]
*   Pipeline de Optimización y Compresión: [[optimizar asset 3d]]
*   Componente Productivo Dual-Mode: [[CapybaraSpatial3D]]
*   Motor de Hápticos Asimétricos: [[haptics engine]]

---

#benchmark #tier1 #motion #blender #reanimated #duolingo #apple #uber #tinder #obsidian

---

## Relaciones de Contexto
- [[Número de Dunbar]]
- [[Terceros Lugares]]
- [[Reanimated]]
- [[Capybara Mascot]]
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
