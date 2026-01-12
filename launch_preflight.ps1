# 🚀 Nia LeSane Pre-Flight Checklist
# Run this script before launching to production

Write-Host "🎷 Nia LeSane - Pre-Flight Validation" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# 1. Check Node.js version
Write-Host "[ 1/10] Checking Node.js version..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($nodeVersion -match "v18") {
    Write-Host "    ✅ Node.js version: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "    ⚠️  Node.js version: $nodeVersion (expected v18.x)" -ForegroundColor Red
    $warnings++
}

# 2. Check if dependencies are installed
Write-Host "[ 2/10] Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "    ✅ node_modules exists" -ForegroundColor Green
} else {
    Write-Host "    ❌ node_modules not found. Run: npm install" -ForegroundColor Red
    $errors++
}

# 3. TypeScript type check
Write-Host "[ 3/10] Running TypeScript type check..." -ForegroundColor Yellow
try {
    $typeCheck = npm run type-check 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "    ✅ TypeScript type check passed" -ForegroundColor Green
    } else {
        Write-Host "    ❌ TypeScript errors found" -ForegroundColor Red
        $errors++
    }
} catch {
    Write-Host "    ❌ Failed to run type check" -ForegroundColor Red
    $errors++
}

# 4. ESLint check
Write-Host "[ 4/10] Running ESLint..." -ForegroundColor Yellow
try {
    $lintResult = npm run lint 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "    ✅ ESLint passed" -ForegroundColor Green
    } else {
        Write-Host "    ⚠️  ESLint warnings/errors found" -ForegroundColor Yellow
        $warnings++
    }
} catch {
    Write-Host "    ⚠️  ESLint check encountered issues" -ForegroundColor Yellow
    $warnings++
}

# 5. Check for .env file
Write-Host "[ 5/10] Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "    ✅ .env file exists" -ForegroundColor Green
} else {
    Write-Host "    ⚠️  .env file not found. Copy from .env.example" -ForegroundColor Yellow
    $warnings++
}

# 6. Check for hardcoded secrets
Write-Host "[ 6/10] Scanning for hardcoded secrets..." -ForegroundColor Yellow
$secretPatterns = @('sk_live_', 'pk_live_', 'password.*=.*["\047]')
$foundSecrets = $false
foreach ($pattern in $secretPatterns) {
    $results = git grep -E $pattern -- '*.ts' '*.tsx' '*.js' 2>$null
    if ($results) {
        Write-Host "    ⚠️  Potential secret found: $pattern" -ForegroundColor Yellow
        $foundSecrets = $true
    }
}
if (-not $foundSecrets) {
    Write-Host "    ✅ No hardcoded secrets detected" -ForegroundColor Green
} else {
    $warnings++
}

# 7. Check git status
Write-Host "[ 7/10] Checking git status..." -ForegroundColor Yellow
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "    ⚠️  Uncommitted changes detected" -ForegroundColor Yellow
    $warnings++
} else {
    Write-Host "    ✅ Working directory clean" -ForegroundColor Green
}

# 8. Check app.json configuration
Write-Host "[ 8/10] Validating app.json..." -ForegroundColor Yellow
if (Test-Path "app.json") {
    $appConfig = Get-Content "app.json" -Raw | ConvertFrom-Json
    if ($appConfig.expo.version -eq "1.0.0") {
        Write-Host "    ✅ App version: 1.0.0" -ForegroundColor Green
    } else {
        Write-Host "    ⚠️  App version: $($appConfig.expo.version)" -ForegroundColor Yellow
    }
} else {
    Write-Host "    ❌ app.json not found" -ForegroundColor Red
    $errors++
}

# 9. Check for required assets
Write-Host "[ 9/10] Checking assets..." -ForegroundColor Yellow
$requiredAssets = @("assets/icon.png", "assets/splash.png")
$missingAssets = @()
foreach ($asset in $requiredAssets) {
    if (-not (Test-Path $asset)) {
        $missingAssets +=$asset
    }
}
if ($missingAssets.Count -eq 0) {
    Write-Host "    ✅ All required assets present" -ForegroundColor Green
} else {
    Write-Host "    ⚠️  Missing assets: $($missingAssets -join ', ')" -ForegroundColor Yellow
    $warnings++
}

# 10. Run tests
Write-Host "[10/10] Running test suite..." -ForegroundColor Yellow
try {
    $testResult = npm test 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "    ✅ All tests passed" -ForegroundColor Green
    } else {
        Write-Host "    ❌ Some tests failed" -ForegroundColor Red
        $errors++
    }
} catch {
    Write-Host "    ❌ Failed to run tests" -ForegroundColor Red
    $errors++
}

# Summary
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Pre-Flight Validation Complete" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Errors:   $errors" -ForegroundColor $(if ($errors -eq 0) { "Green" } else { "Red" })
Write-Host "Warnings: $warnings" -ForegroundColor $(if ($warnings -eq 0) { "Green" } else { "Yellow" })
Write-Host ""

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "🎉 ALL SYSTEMS GO! Ready for launch! 🚀" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Review launch_readiness.md" -ForegroundColor White
    Write-Host "  2. Run: eas build --platform all --profile production" -ForegroundColor White
    Write-Host "  3. Submit to app stores" -ForegroundColor White
    exit 0
} elseif ($errors -eq 0) {
    Write-Host "⚠️  READY WITH WARNINGS" -ForegroundColor Yellow
    Write-Host "Review warnings above before launching" -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "❌ NOT READY FOR LAUNCH" -ForegroundColor Red
    Write-Host "Fix errors above before proceeding" -ForegroundColor Red
    exit 1
}
