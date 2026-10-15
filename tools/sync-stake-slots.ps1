# PowerShell 1-Click Runner for Stake Slots Sync
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$mjsScript = Join-Path $scriptDir "sync-stake-slots.mjs"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " HuntHub - Stake Exclusives Slots Syncer  " -ForegroundColor Gold
Write-Host "==========================================" -ForegroundColor Cyan

if (Test-Path $mjsScript) {
    node $mjsScript
    Write-Host "`nSlots database and thumbnails successfully synchronized!" -ForegroundColor Green
} else {
    Write-Host "Error: $mjsScript not found." -ForegroundColor Red
}

Start-Sleep -Seconds 2
