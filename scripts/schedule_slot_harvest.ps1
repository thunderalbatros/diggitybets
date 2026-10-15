# HuntHub — Registrar Tarea Programada de Scraping Legal Cada 3 Días
# Ejecutar como Administrador en PowerShell si se desea programar automáticamente en Windows

$TaskName = "HuntHub_Slot_Harvester_72h"
$NodePath = (Get-Command node).Source
$ScriptPath = "$PSScriptRoot\harvest_new_slots.mjs"

Write-Host "🎰 Registrando Tarea Programada: $TaskName" -ForegroundColor Yellow
Write-Host "Node: $NodePath"
Write-Host "Script: $ScriptPath"

$Action = New-ScheduledTaskAction -Execute $NodePath -Argument "`"$ScriptPath`"" -WorkingDirectory (Split-Path $PSScriptRoot -Parent)
$Trigger = New-ScheduledTaskTrigger -Daily -At 4am -DaysInterval 3
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $TaskName -Action $Action -Trigger $Trigger -Settings $Settings -Description "HuntHub periodic legal slot releases scraper every 3 days" -Force

Write-Host "✅ Tarea programada registrada exitosamente! Se ejecutará cada 3 días a las 04:00 AM." -ForegroundColor Green
