UseModule.ps1# UseModule.ps1
# Example script demonstrating how to use the NiaQiskit PowerShell module

# =============================================================================
# IMPORT THE MODULE
# =============================================================================
# Method 1: Import from module directory (robust relative path)
$ModulePath = Join-Path $PSScriptRoot "..\..\modules\powershell\NiaQiskit.psm1"
if (Test-Path $ModulePath) {
    Import-Module -Path $ModulePath -Force
} else {
    # Fallback to root-relative if running from root
    Import-Module -Path .\modules\powershell\NiaQiskit.psm1 -Force
}

# Method 2: Import using module manifest (recommended for production)
# Import-Module -Path .\NiaQiskit.psd1 -Force

# Method 3: If module is in PSModulePath
# Import-Module NiaQiskit -Force

# =============================================================================
# EXAMPLE 1: Basic Quantum Circuit with AER Simulator
# =============================================================================
Write-Host "=== Example 1: Basic Quantum Circuit ===" -ForegroundColor Cyan
$result = Invoke-NiaQuantumCircuit -Invocation "EntanglementRitual" -Backend "aer_simulator" -Shots 1024

# Display results
Write-Host "Result Backend: $($result.backend)" -ForegroundColor Yellow
Write-Host "Shots Executed: $($result.shots)" -ForegroundColor Yellow
Write-Host "Circuit Results:" -ForegroundColor Yellow
$result.results | ConvertTo-Json

# =============================================================================
# EXAMPLE 2: IBM Quantum Backend (requires IBM_QUANTUM_TOKEN environment variable)
# =============================================================================
Write-Host "`n=== Example 2: IBM Quantum Backend ===" -ForegroundColor Magenta

if ($env:IBM_QUANTUM_TOKEN) {
    $ibmResult = Invoke-NiaQuantumCircuit -Invocation "IBMQuantumRitual" `
                                         -Backend "ibm_kyoto" `
                                         -Shots 2048
    Write-Host "IBM Result: $($ibmResult.message)" -ForegroundColor Green
} else {
    Write-Host "IBM_QUANTUM_TOKEN not set. Skipping IBM backend example." -ForegroundColor Yellow
}

# =============================================================================
# EXAMPLE 3: Azure Quantum Backend (requires Azure credentials)
# =============================================================================
Write-Host "`n=== Example 3: Azure Quantum Backend ===" -ForegroundColor Magenta

if ($env:AZURE_QUANTUM_RESOURCE_ID -and $env:AZURE_QUANTUM_LOCATION) {
    $azureResult = Invoke-NiaQuantumCircuit -Invocation "AzureQuantumRitual" `
                                            -Backend "azure.ionq" `
                                            -Shots 512
    Write-Host "Azure Result: $($azureResult.message)" -ForegroundColor Green
} else {
    Write-Host "Azure credentials not configured. Skipping Azure backend example." -ForegroundColor Yellow
}

# =============================================================================
# EXAMPLE 4: Error Handling
# =============================================================================
Write-Host "`n=== Example 4: Error Handling ===" -ForegroundColor Cyan

try {
    # This will fail gracefully if Python/Qiskit isn't installed
    $errorResult = Invoke-NiaQuantumCircuit -Invocation "ErrorTest" -Backend "invalid_backend" -Shots 100
} catch {
    Write-Host "Caught error: $($_.Exception.Message)" -ForegroundColor Red
}

# =============================================================================
# MODULE FUNCTION VISIBILITY
# =============================================================================
Write-Host "`n=== Available Module Functions ===" -ForegroundColor Cyan
Get-Command -Module NiaQiskit | Select-Object Name, CommandType

# =============================================================================
# NOTES
# =============================================================================
# - Only Invoke-NiaQuantumCircuit is publicly exported
# - All internal helper functions are private
# - Environment variables required for cloud backends:
#   * IBM_QUANTUM_TOKEN: Token for IBM Quantum
#   * AZURE_QUANTUM_RESOURCE_ID: Azure resource ID
#   * AZURE_QUANTUM_LOCATION: Azure region
# - Results are returned as PowerShell objects with JSON-compatible structure
