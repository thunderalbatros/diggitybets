@echo off
chcp 65001 >nul
title HuntHub Web Studio - Paperclip AI Agency (Port 3100)
cd /d "%~dp0"
echo ========================================================
echo   HuntHub Web Studio - Paperclip AI Agency
echo   Modo: Local Ligero (Puerto 3100 - Cero Docker)
echo ========================================================
echo.
echo Iniciando servidor y abriendo navegador en http://localhost:3100 ...
echo.
echo REGLA DE ORO:
echo Mantene esta ventana abierta mientras gestiones tareas o la agencia.
echo Cuando vayas a streamear en OBS, CERRA ESTA VENTANA para liberar el 100%% de CPU y RAM.
echo.
node tools/paperclip_launcher.mjs
pause
