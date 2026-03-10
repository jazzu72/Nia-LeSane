<#
.SYNOPSIS
  Cleans the project "runway" for a fresh install/build.

.DESCRIPTION
  - Deletes node_modules, lock files, build artifacts
  - Clears npm cache (optional)
  - Shows what it did at the end
#>

param(
    [switch]$Force,          # Skip confirmation prompts
    [switch]$SkipNpmCache    # Don’t run npm cache clean
)

Write-Host "=== CEO App Runway Cleaner ===" -ForegroundColor Cyan

# Ensure we’re in a folder with package.json
if (-not (Test-Path "package.json")) {
    Write-Host "No package.json found. Run this from the project root." -ForegroundColor Red
    exit 1
}

function Remove-PathSafe {
    param(
        [string]$Path
    )

    if (Test-Path $Path) {
        if (-not $Force) {
            $answer = Read-Host "Remove '$Path'? (y/N)"
            if ($answer -ne 'y' -and $answer -ne 'Y') {
                Write-Host "Skipped $Path" -ForegroundColor Yellow
                return
            }
        }

        Write-Host "Removing $Path ..." -ForegroundColor DarkYellow
        Remove-Item $Path -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# 1. Remove node_modules and lock files
Remove-PathSafe "node_modules"
Remove-PathSafe "package-lock.json"
Remove-PathSafe "yarn.lock"
Remove-PathSafe "pnpm-lock.yaml"

# 2. Remove common build artifacts
Remove-PathSafe ".expo"
Remove-PathSafe ".expo-shared"
Remove-PathSafe "dist"
Remove-PathSafe "build"
Remove-PathSafe ".turbo"
Remove-PathSafe ".next"

# 3. Clear npm cache (optional)
if (-not $SkipNpmCache) {
    if ($Force -or (Read-Host "Run 'npm cache clean --force'? (y/N)" -eq 'y')) {
        Write-Host "Cleaning npm cache..." -ForegroundColor DarkYellow
        npm cache clean --force
    } else {
        Write-Host "Skipped npm cache clean." -ForegroundColor Yellow
    }
}

Write-Host "`nRunway cleaned. Next steps:" -ForegroundColor Green
Write-Host "  1) npm install"
Write-Host "  2) npm start"
