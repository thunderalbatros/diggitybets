import os
import zipfile

ROOT = r"C:\Users\tomas\Desktop\streamerbot"
OUTPUT_ZIP = os.path.join(ROOT, "Streamer_Suite_Complete_Stage4.zip")

print("--- Packaging HuntHub Stage 4 Complete Suite ---")
print("Target:", OUTPUT_ZIP)

# Binaries, DLLs and configs in root
dlls_and_exes = [
    f for f in os.listdir(ROOT)
    if f.endswith(".dll") or f.endswith(".exe") or f.endswith(".config") or f.endswith(".png") or f.endswith(".traineddata")
]

# Folders to include in the suite package
folders_to_include = [
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
    "references",
    "docs"
]

with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as z:
    # 1. Root binaries
    for fname in dlls_and_exes:
        fpath = os.path.join(ROOT, fname)
        if os.path.isfile(fpath):
            z.write(fpath, os.path.join("Streamerbot", fname))

    # 2. Root HTML/config files
    for fname in ["admin.html", ".dev.vars", "REFERENCE_REPOS.md", "dossier_tecnol_gico_antigravity_ide.md"]:
        fpath = os.path.join(ROOT, fname)
        if os.path.isfile(fpath):
            z.write(fpath, os.path.join("Streamerbot", fname))

    # 3. Directories
    for folder in folders_to_include:
        folder_path = os.path.join(ROOT, folder)
        if not os.path.isdir(folder_path):
            continue
        for root, dirs, files in os.walk(folder_path):
            # Exclude large git repositories in references/repos from zip to maintain fast download
            if "repos" in root or ".git" in root or "node_modules" in root or "scratch" in root:
                continue
            for f in files:
                fpath = os.path.join(root, f)
                rel_path = os.path.relpath(fpath, ROOT)
                z.write(fpath, os.path.join("Streamerbot", rel_path))

    # 4. Streamer Quick Instructions
    readme = """=============================================================================
   HUNTHUB CASINO STREAM ENGAGEMENT SUITE — STAGE 4 COMPLETE
=============================================================================

NUEVAS CARACTERÍSTICAS INCLUIDAS:
1. OVERLAY DE CELEBRACIÓN DE PANTALLA COMPLETA (overlay-celebration/index.html):
   - Fuente de Navegador OBS (Browser Source) dedicada de 1920x1080 colocada sobre la "Captura de Pantalla".
   - 100% transparente en reposo (0% CPU).
   - Lluvia de monedas de oro y fichas de casino 3D a 60 FPS con física y rotación en toda la pantalla.
   - Sonido Web Audio sin delay (Sub-Bass Boom + Fanfarria + Cascada metálica de monedas).
   - Cartel de lujo flotante con @Ganador, Slot ganadora y multiplicador.
   - Se dispara automáticamente al terminar batallas 1v1 o coronar al campeón de un torneo de 8.

2. BOOST DE PROVEEDORES AMPLIA A CIPHER GAMES Y META GAMING:
   - Cipher Games (https://stake.krd/es/casino/group/cipher-games)
   - Meta Gaming (https://stake.krd/es/casino/group/meta-gaming)
   - Base global actualizada a 4,889 slots oficiales de Stake.

3. HARVESTER PERIÓDICO Y SCRAPING DINÁMICO:
   - scripts/harvest_new_slots.mjs configurado para https://stake.krd/es/casino/group/only-on-stake?sort=newest
   - Conexión con Firecrawl API y Serper para auto-descubrimiento cada 72 horas.
   - Snippet de 1 click para Chrome DevTools en references/DEVTOOLS_HARVESTER_SNIPPET.js.

4. SISTEMA DE INTELIGENCIA Y RAG:
   - tools/intelligence/qdrant_rag.mjs (Conectado a Qdrant Cloud Vector Database).
   - tools/intelligence/firecrawl_scraper.mjs (Scraping con renderizado JS).
   - tools/intelligence/serper_researcher.mjs (Búsqueda web en tiempo real).
   - Repositorios de referencia clonados localmente en references/repos/.

=============================================================================
"""
    z.writestr(os.path.join("Streamerbot", "README_STAGE4.txt"), readme)

size_mb = os.path.getsize(OUTPUT_ZIP) / (1024 * 1024)
print(f"[OK] Stage 4 Package built successfully! Size: {size_mb:.2f} MB")
