import os, zipfile, shutil

ROOT = r"C:\Users\tomas\Desktop\streamerbot"
OUTPUT_FULL_ZIP = os.path.join(ROOT, "Streamerbot_CSGO_Wheel_diggitybets.zip")
OUTPUT_SLOTS_ZIP = os.path.join(ROOT, "Streamer_Slot_Wheel_diggitybets.zip")

print("--- Building HuntHub Streamerbot Packages ---")

# DLLs, EXEs, and runtime configs from root
dlls_and_exes = [
    f for f in os.listdir(ROOT)
    if f.endswith(".dll") or f.endswith(".exe") or f.endswith(".config") or f.endswith(".png") or f.endswith(".traineddata")
]

# -------------------------------------------------------------
# 1. Full All-in-One Package (Streamer.bot + CSGO Wheel + Slot Wheel)
# -------------------------------------------------------------
print("Building Full Suite Package:", OUTPUT_FULL_ZIP)
with zipfile.ZipFile(OUTPUT_FULL_ZIP, "w", zipfile.ZIP_DEFLATED) as z:
    # 1.1 Root binaries
    for fname in dlls_and_exes:
        fpath = os.path.join(ROOT, fname)
        if os.path.isfile(fpath):
            z.write(fpath, os.path.join("Streamerbot", fname))
            
    # 1.2 Data directory (pre-configured with both actions & commands)
    data_dir = os.path.join(ROOT, "data")
    for fname in os.listdir(data_dir):
        if fname.endswith(".bak"):
            continue
        fpath = os.path.join(data_dir, fname)
        if os.path.isfile(fpath):
            z.write(fpath, os.path.join("Streamerbot", "data", fname))
            
    # 1.3 wheel-csgo
    wheel_csgo_dir = os.path.join(ROOT, "wheel-csgo")
    for foldername, subfolders, filenames in os.walk(wheel_csgo_dir):
        if "scratch" in foldername or ".git" in foldername:
            continue
        for fname in filenames:
            fpath = os.path.join(foldername, fname)
            rel_path = os.path.relpath(fpath, ROOT)
            z.write(fpath, os.path.join("Streamerbot", rel_path))

    # 1.4 wheel-slots
    wheel_slots_dir = os.path.join(ROOT, "wheel-slots")
    for foldername, subfolders, filenames in os.walk(wheel_slots_dir):
        if "scratch" in foldername or ".git" in foldername:
            continue
        for fname in filenames:
            fpath = os.path.join(foldername, fname)
            rel_path = os.path.relpath(fpath, ROOT)
            z.write(fpath, os.path.join("Streamerbot", rel_path))

    # 1.5 Full documentation for the streamer
    readme_content = """===============================================================
       HUNTHUB STREAMING SUITE — SETUP FOR diggitybets
===============================================================

Este paquete incluye 2 Ruletas interactivas listas para usar:
  1. CS:GO Active Chatters Wheel (Sorteo entre espectadores activos en chat)
  2. Slot Machine Wheel (Ruleta de Slots al azar: Stake, Pragmatic, Hacksaw, Nolimit)

---------------------------------------------------------------
PASO 1: EXTRAER LA CARPETA
---------------------------------------------------------------
- Descomprimí este archivo ZIP en tu Escritorio o en C:\\Streamerbot.

---------------------------------------------------------------
PASO 2: INICIAR STREAMER.BOT
---------------------------------------------------------------
1. Abrí "Streamer.bot.exe".
2. Andá a: Platforms -> Kick.
3. Hacé click en "Connect" con tu cuenta de Kick (diggitybets).
   (Esto permite leer el chat para los sorteos y responder con los comandos).
4. Verificá en: Servers/Clients -> WebSocket Server que figure en estado "Running" (puerto 8080).
5. Minimizá Streamer.bot y dejalo abierto de fondo.

---------------------------------------------------------------
PASO 3: AGREGAR LAS RULETAS A OBS STUDIO
---------------------------------------------------------------
A) RULETA CS:GO (SORTEO DE CHATTERS ACTIVOS):
   - En OBS, agregá una fuente: "+" -> Navegador (Browser Source).
   - Nombre: "CSGO Wheel".
   - Marcá la casilla: [x] "Archivo local" (Local file).
   - Buscá y seleccioná: Streamerbot/wheel-csgo/overlay/index.html
   - Ancho (Width): 500
   - Alto (Height): 500
   - Recomendado en OBS:
     [x] Apagar fuente cuando no esté visible
     [x] Actualizar navegador cuando la escena se active

B) RULETA DE SLOTS (ELEGIR SLOT AL AZAR):
   - En OBS, agregá otra fuente: "+" -> Navegador (Browser Source).
   - Nombre: "Slot Wheel".
   - Marcá la casilla: [x] "Archivo local" (Local file).
   - Buscá y seleccioná: Streamerbot/wheel-slots/overlay/index.html
   - Ancho (Width): 500
   - Alto (Height): 500
   - Recomendado en OBS:
     [x] Apagar fuente cuando no esté visible
     [x] Actualizar navegador cuando la escena se active

---------------------------------------------------------------
PASO 4: AGREGAR LOS PANELES DE CONTROL A OBS (DOCKS)
---------------------------------------------------------------
Para poder disparar las ruletas con 1 solo click desde OBS sin tocar comandos:
1. En OBS, menú superior: Paneles -> Paneles de navegador personalizados (Docks -> Custom Browser Docks).
2. Panel 1 (Sorteos de chat):
   - Nombre del panel: Giveaway Control
   - URL: Streamerbot/wheel-csgo/overlay/control.html (o la ruta completa local)
3. Panel 2 (Ruleta de Slots):
   - Nombre del panel: Slot Control
   - URL: Streamerbot/wheel-slots/overlay/control.html (o la ruta completa local)
4. Hacé click en "Aplicar". ¡Los docks se acoplarán a tu OBS!

---------------------------------------------------------------
CÓMO USAR EN DIRECTO:
---------------------------------------------------------------
1. RULETA CS:GO:
   - Solo participan los viewers que hayan escrito en los últimos 45 segundos.
   - Disparador: Click en el botón del dock "PICK WINNER & SPIN" o comando !pickwinner.
   - La rueda gira con los avatars reales y anuncia el ganador en tu chat de Kick.

2. RULETA DE SLOTS:
   - Podés elegir al azar de toda la base (~4,800 slots) o filtrar por proveedor.
   - Disparador por chat de Kick:
     * !random              -> Elige cualquier slot al azar
     * !random stake        -> Elige sólo entre slots exclusivas de Stake
     * !random pragmatic    -> Elige sólo de Pragmatic Play (ej: Gates 1000, Sweet Bonanza)
     * !random hacksaw      -> Elige sólo de Hacksaw Gaming (ej: Wanted Dead, Le Bandit)
     * !random nolimit      -> Elige sólo de Nolimit City (ej: San Quentin, Mental)
   - Disparador por OBS Dock:
     * Hacé click en el botón del proveedor que quieras y luego en "SPIN RANDOM SLOT".
   - La ruleta gira estilo tarjeta vertical con sonido analógico, revela el juego ganador con fuegos artificiales/confeti y publica el resultado en el chat de Kick con el Max Win.

===============================================================
"""
    z.writestr(os.path.join("Streamerbot", "README_STREAMER.txt"), readme_content)

size_mb = os.path.getsize(OUTPUT_FULL_ZIP) / (1024 * 1024)
print(f"Full Package created successfully! Size: {size_mb:.2f} MB")

# -------------------------------------------------------------
# 2. Standalone Slot Wheel Package (overlay + import string + guide)
# -------------------------------------------------------------
print("Building Standalone Slot Wheel Package:", OUTPUT_SLOTS_ZIP)
with zipfile.ZipFile(OUTPUT_SLOTS_ZIP, "w", zipfile.ZIP_DEFLATED) as z:
    wheel_slots_dir = os.path.join(ROOT, "wheel-slots")
    for foldername, subfolders, filenames in os.walk(wheel_slots_dir):
        if "scratch" in foldername or ".git" in foldername:
            continue
        for fname in filenames:
            fpath = os.path.join(foldername, fname)
            rel_path = os.path.relpath(fpath, wheel_slots_dir)
            z.write(fpath, os.path.join("wheel-slots", rel_path))

    readme_slots = """===============================================================
       HUNTHUB RANDOM SLOT WHEEL — STANDALONE SETUP
===============================================================

Si ya tenés Streamer.bot funcionando y solo querés agregar la Ruleta de Slots:

1. Importar la Acción en Streamer.bot:
   - Abrí Streamer.bot.
   - Hacé click en "Import" (arriba a la derecha).
   - Abrí el archivo "random-slot-1.0.0.sb" con un bloc de notas, copiá todo el texto y pegalo en la ventana de Import.
   - Hacé click en "Import". Listo, ya tenés la acción "RandomSlot_Picker" y el comando "!random".

2. En OBS Studio:
   - Agregá una fuente de Navegador (Browser Source).
   - Marcá "Archivo local" y elegí: wheel-slots/overlay/index.html
   - Tamaño: 500 x 500 px.

3. Comandos en Kick:
   - !random
   - !random stake
   - !random pragmatic
   - !random hacksaw
   - !random nolimit

4. (Opcional) OBS Dock:
   - Agregá en Docks -> Custom Browser Docks el archivo: wheel-slots/overlay/control.html
===============================================================
"""
    z.writestr("README_SLOT_WHEEL.txt", readme_slots)

size_slots_mb = os.path.getsize(OUTPUT_SLOTS_ZIP) / (1024 * 1024)
print(f"Slot Package created successfully! Size: {size_slots_mb:.2f} MB")
