import os
import zipfile

ROOT = r"C:\Users\tomas\Desktop\streamerbot"
OUTPUT_ZIP = os.path.join(ROOT, "Streamer_Suite_Complete_Stage6.zip")

print("--- Packaging HuntHub Stage 6 Complete Suite ---")
print("Target:", OUTPUT_ZIP)

dlls_and_exes = [
    f for f in os.listdir(ROOT)
    if f.endswith(".dll") or f.endswith(".exe") or f.endswith(".config") or f.endswith(".png") or f.endswith(".traineddata")
]

folders_to_include = [
    "site",
    "worker",
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
    "docs",
    "research",
    "panels"
]

with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as z:
    for fname in dlls_and_exes:
        fpath = os.path.join(ROOT, fname)
        if os.path.isfile(fpath):
            z.write(fpath, os.path.join("Streamerbot", fname))

    for fname in ["index.html", "admin.html", "INICIAR_SITIO_WEB.bat", "wrangler.toml", ".dev.vars", "REFERENCE_REPOS.md", "dossier_tecnol_gico_antigravity_ide.md"]:
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
   HUNTHUB CASINO STREAM ENGAGEMENT SUITE — STAGE 6 COMPLETE
=============================================================================

NOVEDADES Y MEJORAS DE ETAPA 6:
1. LOGO DIGGITY BETS CON LETRAS BLANCAS:
   - Letras 'DIGGITY BETS' en blanco solido con relieve oscuro y transparencia completa (site/images/diggitybets-logo.png).
   - Perfecta legibilidad sobre el fondo negro de la barra superior.

2. LOGOS OFICIALES DE KICK EN PIXEL ART 2D:
   - Logo 'K' pixel verde (site/images/kick-k-logo.png) en la píldora superior izquierda y en el botón 'Link Kick'.
   - Logo 'KICK' wordmark pixel verde (site/images/kick-wordmark.png) en el título del stream ('LIVE ON KICK').
   - Botón actualizado a 'Link Kick'.

3. HEADER OPTIMIZADO PARA 100% DE ZOOM (SIN CORTES LATERALES):
   - Dimensiones responsivas ajustadas para ajustarse sin desbordarse en notebooks (1366x768).
   - Se removió el botón redundante de 'Sound'.
   - Puntos de canal identificados como '$DIG' (ej. 0 $DIG).

4. NAVEGACIÓN SPA ROBUSTA Y REPARADA:
   - Sistema de ruteo SPA iniciado en orden prioritario con manejo de errores independiente.
   - Cada sección (#watch, #house-games, #tournament, #bonushunt, #store, #leaderboard, #profile) cambia instantáneamente de vista al hacer clic.

5. FUSIÓN DE SECCIONES EN 'LIVE STREAM':
   - 'Provably Fair' (herramienta matemática) y 'Community' (enlaces sociales) ahora están integradas directamente en la sección principal 'Live Stream' (#watch).

6. SECCIÓN DE BACKLOG: LEADERBOARD DE $2,000 USD:
   - Pozo mensual de $2,000 USD: 1° $1,200 | 2° $500 | 3° $300 USD.
   - Podio con tarjetas de oro, plata y bronce con avatares, nombres de Stake y wager acumulado.
   - Tabla de posiciones en vivo para usuarios con cuenta de Stake verificada.
   - Marcada con insignia de 'BACKLOG / ROADMAP SOON'.

7. NUEVA SECCIÓN DEDICADA 'PROFILE':
   - Selector de avatar de personajes de casino (Cowboy, Zeus, Le Bandit, etc.) o subida personalizada.
   - Verificador de Cuenta de Stake con Desafío TOTP de Multiplicador Dinámico ($0.00 en Dice/Limbo con cuenta regresiva de 3 minutos).
   - Vinculación de cuenta de Discord (Discord Linking).
   - Direcciones de cobro de criptomonedas (BTC, SOL, LTC, ETH, USDC) y perfiles sociales (X, Instagram).

=============================================================================
"""
    z.writestr(os.path.join("Streamerbot", "README_STAGE6.txt"), readme)

size_mb = os.path.getsize(OUTPUT_ZIP) / (1024 * 1024)
print(f"[OK] Stage 6 Package built successfully! Size: {size_mb:.2f} MB")
