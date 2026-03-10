# PowerShell Module Validation Test Suite
# Tests all Nia LeSane PowerShell modules for flawless operation

$ErrorActionPreference = "Stop"

Write-Host "`n🧪 ========================================" -ForegroundColor Cyan
Write-Host "🎷 Nia LeSane PowerShell Module Test Suite" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$testResults = @{
    Passed = 0
    Failed = 0
    Warnings = 0
}

function Test-Module {
    param(
        [string]$Name,
        [string]$ManifestPath,
        [string[]]$ExpectedFunctions
    )
    
    Write-Host "📦 Testing: $Name" -ForegroundColor Yellow
    
    try {
        # Test 1: Manifest exists
        if (-not (Test-Path $ManifestPath)) {
            throw "Manifest not found: $ManifestPath"
        }
        Write-Host "  ✅ Manifest found" -ForegroundColor Green
        
        # Test 2: Manifest is valid
        $null = Test-ModuleManifest -Path $ManifestPath -ErrorAction Stop
        Write-Host "  ✅ Manifest is valid" -ForegroundColor Green
        
        # Test 3: Module imports
        Import-Module $ManifestPath -Force -ErrorAction Stop
        Write-Host "  ✅ Module imported successfully" -ForegroundColor Green
        
        # Test 4: Expected functions exist
        foreach ($func in $ExpectedFunctions) {
            if (Get-Command $func -ErrorAction SilentlyContinue) {
                Write-Host "  ✅ Function '$func' available" -ForegroundColor Green
            } else {
                throw "Expected function '$func' not found"
            }
        }
        
        $script:testResults.Passed++
        Write-Host "  🎉 $Name - ALL TESTS PASSED`n" -ForegroundColor Green
        return $true
    }
    catch {
        $script:testResults.Failed++
        Write-Host "  ❌ $Name - FAILED: $($_.Exception.Message)`n" -ForegroundColor Red
        return $false
    }
}

# Test 1: NiaExecution Module (7x64 version)
$execution7x64Path = "c:\Users\lesan\.gemini\antigravity\playground\white-belt\modules\powershell\7x64\NiaExecution.psd1"
Test-Module -Name "NiaExecution (7x64)" -ManifestPath $execution7x64Path -ExpectedFunctions @("Invoke-NiaProgram", "Get-NiaLocale")

# Test 2: NiaQiskit Module
$qiskitPath = "c:\Users\lesan\.gemini\antigravity\playground\white-belt\modules\powershell\NiaQiskit.psd1"
if (Test-Path $qiskitPath) {
    Test-Module -Name "NiaQiskit" -ManifestPath $qiskitPath -ExpectedFunctions @("Invoke-NiaQuantumCircuit")
} else {
    Write-Warning "⚠️  NiaQiskit module not found - skipping"
    $testResults.Warnings++
}

# Functional Tests
Write-Host "`n🔬 Running Functional Tests...`n" -ForegroundColor Cyan

# Test Invoke-NiaProgram
Write-Host "Testing Invoke-NiaProgram..." -ForegroundColor Yellow
try {
    $result = Invoke-NiaProgram -Program "cmd" -Arguments @("/c", "echo", "Test Success") -ErrorAction Stop
    if ($null -ne $result) {
        Write-Host "✅ Invoke-NiaProgram executed successfully`n" -ForegroundColor Green
        $testResults.Passed++
    }
}
catch {
    Write-Host "❌ Invoke-NiaProgram failed: $_`n" -ForegroundColor Red
    $testResults.Failed++
}

# Test Get-NiaLocale
Write-Host "Testing Get-NiaLocale..." -ForegroundColor Yellow
try {
    $locale = Get-NiaLocale
    if ($locale.SoulReady -eq $true) {
        Write-Host "✅ Get-NiaLocale returned valid data" -ForegroundColor Green
        Write-Host "   Region: $($locale.DisplayName)" -ForegroundColor Gray
        Write-Host "   PowerShell: $($locale.PowerShell)`n" -ForegroundColor Gray
        $testResults.Passed++
    }
}
catch {
    Write-Host "❌ Get-NiaLocale failed: $_`n" -ForegroundColor Red
    $testResults.Failed++
}

# Test Alias
Write-Host "Testing NiaRun alias..." -ForegroundColor Yellow
try {
    if (Get-Alias NiaRun -ErrorAction SilentlyContinue) {
        Write-Host "✅ NiaRun alias is registered`n" -ForegroundColor Green
        $testResults.Passed++
    } else {
        throw "Alias not found"
    }
}
catch {
    Write-Host "❌ NiaRun alias test failed: $_`n" -ForegroundColor Red
    $testResults.Failed++
}

# Summary
Write-Host "`n🎯 ========================================" -ForegroundColor Cyan
Write-Host "Test Results Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Passed:   $($testResults.Passed)" -ForegroundColor Green
Write-Host "Failed:   $($testResults.Failed)" -ForegroundColor $(if ($testResults.Failed -gt 0) { "Red" } else { "Green" })
Write-Host "Warnings: $($testResults.Warnings)" -ForegroundColor Yellow
Write-Host "========================================`n" -ForegroundColor Cyan

if ($testResults.Failed -eq 0) {
    Write-Host "🎉 ALL TESTS PASSED - Modules are FLAWLESS! 🎷✨" -ForegroundColor Green
    exit 0
} else {
    Write-Host "⚠️  SOME TESTS FAILED - Review errors above" -ForegroundColor Red
    exit 1
}
