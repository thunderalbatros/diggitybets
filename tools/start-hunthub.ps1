# Starts HuntHub Core Service (Kick Pusher Ingestor + Overlay Hub)
Write-Host "Starting HuntHub Core Service..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\..\core"
node --experimental-strip-types src/index.ts
