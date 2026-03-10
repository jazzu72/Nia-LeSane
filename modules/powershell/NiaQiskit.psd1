@{
    RootModule = 'NiaQiskit.psm1'
    ModuleVersion = '1.0.0'
    GUID = 'a4c3f5d2-8e1b-4c9a-b7d6-2f5e3a1c9b4d'
    Author = 'Nia LeSane'
    CompanyName = 'House of Jazzu'
    Description = 'Quantum Integration Module for Nia LeSane - Enables quantum rituals directly from PowerShell using Qiskit'
    PowerShellVersion = '5.1'
    FunctionsToExport = @(
        'Invoke-NiaQuantumCircuit'
    )
    CmdletsToExport = @()
    VariablesToExport = @()
    AliasesToExport = @()
    PrivateData = @{
        PSData = @{
            Tags = @(
                'Quantum'
                'Qiskit'
                'Azure-Quantum'
                'IBM-Quantum'
                'Nia-LeSane'
                'AI'
                'Autonomous'
            )
            LicenseUri = 'https://github.com/jazzu72/Nia-LeSane/blob/main/LICENSE'
            ProjectUri = 'https://github.com/jazzu72/Nia-LeSane'
            IconUri = ''
            ReleaseNotes = @'
1.0.0 - Initial Release
- Invoke-NiaQuantumCircuit function for executing quantum circuits
- Support for multiple quantum backends (AER Simulator, IBM Quantum, Azure Quantum)
- JSON output for circuit results and metadata
- Full PowerShell integration with error handling
'@
        }
    }
}

