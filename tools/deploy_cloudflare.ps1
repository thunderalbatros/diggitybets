# HuntHub - Automated Cloudflare Deploy Script (100% Free Plan)
$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   HUNTHUB — DESPLIEGUE A CLOUDFLARE (100% GRATIS)       " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Build production dist/
Write-Host "[1/3] Compilando payload de producción (dist/)..." -ForegroundColor Green
node "$Root\tools\build_dist.mjs"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al compilar dist/. Despliegue cancelado." -ForegroundColor Red
    exit 1
}

# Step 2: Quality & Visual Audit Gate
Write-Host "`n[2/3] Ejecutando auditoría visual automatizada (Playwright)..." -ForegroundColor Green
node "$Root\tools\audit\visual_audit.mjs"
if ($LASTEXITCODE -ne 0) {
    Write-Host "La auditoría visual detectó bloqueadores. Despliegue cancelado." -ForegroundColor Red
    exit 1
}

# Step 3: Deploy to Cloudflare via Wrangler
Write-Host "`n[3/3] Publicando en Cloudflare Workers + Static Assets..." -ForegroundColor Green
Write-Host "Si es tu primera vez, Wrangler abrirá tu navegador para iniciar sesión gratis." -ForegroundColor Gray
Write-Host ""

Set-Location $Root
npx wrangler deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n==========================================================" -ForegroundColor Green
    Write-Host " ¡SITIO WEB PUBLICADO CON ÉXITO EN CLOUDFLARE!           " -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host "`nNota: Si no habías iniciado sesión en Cloudflare, ejecutá:" -ForegroundColor Yellow
    Write-Host "  npx wrangler login" -ForegroundColor Cyan
    Write-Host "y volvé a ejecutar este script." -ForegroundColor Gray
}
