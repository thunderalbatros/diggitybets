import os
import zipfile

ROOT = r"C:\Users\tomas\Desktop\streamerbot"
OUTPUT_ZIP = os.path.join(ROOT, "Streamer_Suite_Complete_Stage5.zip")

print("--- Packaging HuntHub Stage 5 Complete Suite ---")
print("Target:", OUTPUT_ZIP)

dlls_and_exes = [
    f for f in os.listdir(ROOT)
    if f.endswith(".dll") or f.endswith(".exe") or f.endswith(".config") or f.endswith(".png") or f.endswith(".traineddata")
]

folders_to_include = [
    "site",
    "overlay-celebration",
    "overlay-tourney",
    "overlay-battle",
    "overlay-bonushunt",
    "wheel-duo",
    "wheel-slots",
    "wheel-csgo",
    "data",
    "scripts",
    "tools",
    "docs"
]

with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as z:
    for fname in dlls_and_exes:
        fpath = os.path.join(ROOT, fname)
        if os.path.isfile(fpath):
            z.write(fpath, os.path.join("Streamerbot", fname))

    for fname in ["index.html", "admin.html", ".dev.vars", "REFERENCE_REPOS.md", "dossier_tecnol_gico_antigravity_ide.md"]:
        fpath = os.path.join(ROOT, fname)
        if os.path.isfile(fpath):
            z.write(fpath, os.path.join("Streamerbot", fname))

    for folder in folders_to_include:
        folder_path = os.path.join(ROOT, folder)
        if not os.path.isdir(folder_path):
            continue
        for root, dirs, files in os.walk(folder_path):
            if ".git" in root or "node_modules" in root or "scratch" in root:
                continue
            for f in files:
                fpath = os.path.join(root, f)
                rel_path = os.path.relpath(fpath, ROOT)
                z.write(fpath, os.path.join("Streamerbot", rel_path))

    readme = """=============================================================================
   HUNTHUB CASINO STREAM ENGAGEMENT SUITE — STAGE 5 COMPLETE
=============================================================================

NOVEDADES Y MEJORAS DE ETAPA 5:
1. PORTAL ESPECTADOR CON NAVEGACIÓN SPA POR SECCIONES:
   - Se eliminó el scroll unificado ("chorizo"). Ahora cada botón de la barra superior carga exclusivamente la sección elegida (#watch, #house-games, #tournament, #bonushunt, #store, #provably-fair, #links).
   - Botones de navegación más grandes, legibles y con brillo neón activo.
   - Logo Diggity Bets en alta definición con transparencia en la esquina superior izquierda.
   - Logo oficial 3D isométrico de Kick con animación de flotación (@keyframes kick-float).
   - Eliminados el panel de Admin y el cajón de chat integrado (los espectadores usan el chat oficial de Kick).

2. INTEGRACIÓN DIRECTA DE STAKE ORIGINALS CLONE:
   - Integrado el build oficial de Stake Originals (Plinko, Mines, Crash, Dino Run) con selector de juegos por pestañas en #house-games.
   - Servidor web local compatible con todos los assets y rutas (/assets/, /images/, /dino-assets/, /plinko, /mines, /crash, /dino).

3. ESTADOS EN ESPERA (EMPTY STATES) Y MINI CARDS PROPORCIONALES:
   - Torneo 8-Bracket y Bonus Hunt muestran plantillas limpias en espera (TBD) cuando no hay sesión activa en vivo, en lugar de datos simulados confusos.
   - Mini cards de slots corregidas con relación de aspecto estricta 3:4, brillo sutil y fallback SVG local.

4. BARRA LATERAL DE COMANDOS ÚTILES PARA EL STREAM:
   - Se eliminó la telemetría técnica innecesaria.
   - Se añadieron los comandos principales del chat de Kick (!guess, !battle, !random, !pickwinner, !bracket, !points, !help) con función de 1-click para copiar.

=============================================================================
"""
    z.writestr(os.path.join("Streamerbot", "README_STAGE5.txt"), readme)

size_mb = os.path.getsize(OUTPUT_ZIP) / (1024 * 1024)
print(f"[OK] Stage 5 Package built successfully! Size: {size_mb:.2f} MB")
