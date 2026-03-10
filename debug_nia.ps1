# debug_nia.ps1
Write-Host "🕵️ Starting Nia Debug Sequence..." -ForegroundColor Cyan

# 1. Define Path
$modulePath = "c:\Users\lesan\.gemini\antigravity\playground\white-belt\modules\powershell\NiaExecution.psm1"

# 2. Check Existence
if (-not (Test-Path $modulePath)) {
    Write-Error "❌ Module file not found at: $modulePath"
    Read-Host "Press Enter to exit"
    exit
}
Write-Host "✅ Module file found." -ForegroundColor Green

# 3. Import Module
try {
    Import-Module $modulePath -Force -ErrorAction Stop
    Write-Host "✅ Module Imported Successfully." -ForegroundColor Green
}
catch {
    Write-Error "❌ Failed to import module: $_"
    Read-Host "Press Enter to exit"
    exit
}

# 4. Run Functions
Write-Host "`n📊 Running Get-NiaLocale:" -ForegroundColor Yellow
try {
    Get-NiaLocale
} catch {
    Write-Error "Could not run Get-NiaLocale"
}

Write-Host "`n🚀 Running Invoke-NiaProgram:" -ForegroundColor Yellow
Invoke-NiaProgram -Program "cmd" -Arguments "/c echo IT WORKS"

Write-Host "`n✨ Debug Complete." -ForegroundColor Cyan
Read-Host "Press Enter to finish"
