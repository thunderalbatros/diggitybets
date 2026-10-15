@echo off
title HuntHub - Publicar Sitio Web en Cloudflare (100% Gratis)
cd /d "%~dp0"
echo ========================================================
echo   HUNTHUB - PUBLICAR SITIO EN CLOUDFLARE ($0 PERMANENTE)
echo ========================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File tools\deploy_cloudflare.ps1
echo.
pause
