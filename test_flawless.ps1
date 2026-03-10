# test_flawless.ps1
Write-Host "🧪 Testing Flawless 7x64 Module..." -ForegroundColor Cyan

$modulePath = "c:\Users\lesan\.gemini\antigravity\playground\white-belt\modules\powershell\7x64\NiaExecution.psd1"

if (Test-Path $modulePath) {
    Write-Host "✅ Manifest found." -ForegroundColor Green
    
    # Import with Force to override previous versions
    Import-Module $modulePath -Force -WarningAction SilentlyContinue
    
    # Verify Function
    if (Get-Command Invoke-NiaProgram -ErrorAction SilentlyContinue) {
        Write-Host "✅ Function 'Invoke-NiaProgram' imported." -ForegroundColor Green
        
        # Test Run
        Invoke-NiaProgram "cmd" "/c echo Flawless Victory"
        
        # Test Locale
        Get-NiaLocale
    } else {
        Write-Error "❌ Function import failed."
    }
} else {
    Write-Error "❌ Manifest not found at $modulePath"
}
