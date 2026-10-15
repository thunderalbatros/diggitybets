# Clones the UI knowledge-base repos (shallow) into references/ui-kb/<layer>/<name>.
# Skips repos that already exist here OR in references/clones/ (already downloaded earlier).
# Safe to re-run. A failed clone never stops the rest.
$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent $PSScriptRoot
$Base = Join-Path $Root 'references\ui-kb'
$Existing = Join-Path $Root 'references\clones'

$repos = @(
  @('1-design-systems-and-skills','awesome-design-md','https://github.com/VoltAgent/awesome-design-md.git'),
  @('1-design-systems-and-skills','claudedesignskills','https://github.com/freshtechbro/claudedesignskills.git'),
  @('1-design-systems-and-skills','shadcn-ui-mcp-server','https://github.com/Jpisnice/shadcn-ui-mcp-server.git'),
  @('1-design-systems-and-skills','magic-mcp','https://github.com/21st-dev/magic-mcp.git'),
  @('2-primitives','radix-primitives','https://github.com/radix-ui/primitives.git'),
  @('2-primitives','base-ui','https://github.com/mui/base-ui.git'),
  @('3-motion-and-ui','cult-ui','https://github.com/nolly-studio/cult-ui.git'),
  @('3-motion-and-ui','background-snippets','https://github.com/ibelick/background-snippets.git'),
  @('4-micro-ux','cmdk','https://github.com/pacocoursey/cmdk.git'),
  @('4-micro-ux','tremor','https://github.com/tremorlabs/tremor.git'),
  @('5-golden-apps','taxonomy','https://github.com/shadcn-ui/taxonomy.git'),
  @('5-golden-apps','next-forge','https://github.com/haydenbleasel/next-forge.git'),
  @('5-golden-apps','skateshop','https://github.com/sadmann7/skateshop.git')
)
# tailwindcss (engine repo) intentionally skipped: ~huge, docs live elsewhere; v4 @theme rules are in the skill instead.

foreach ($r in $repos) {
  $layer,$name,$url = $r
  $dest = Join-Path (Join-Path $Base $layer) $name
  if ((Test-Path $dest) -or (Test-Path (Join-Path $Existing $name))) { Write-Host "SKIP  $name"; continue }
  New-Item -ItemType Directory -Force -Path (Join-Path $Base $layer) | Out-Null
  Write-Host "CLONE $name"
  git clone --depth 1 --single-branch --quiet $url $dest 2>&1 | Out-Host
  if (Test-Path (Join-Path $dest '.git')) { Remove-Item -Recurse -Force (Join-Path $dest '.git') }  # no history needed, saves space
}
Write-Host "DONE -> $Base"
