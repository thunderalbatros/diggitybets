@echo off
title HuntHub Web Server (Port 3000)
cd /d "%~dp0"
echo ========================================================
echo   Iniciando Servidor Web HuntHub en http://127.0.0.1:3000
echo ========================================================
echo.
echo Abriendo navegador en http://127.0.0.1:3000 ...
start http://127.0.0.1:3000
echo.
echo Mantene esta ventana abierta mientras uses el sitio web.
echo Si la cerras, el sitio dejara de responder.
echo.
node tools/serve_site.mjs
pause
