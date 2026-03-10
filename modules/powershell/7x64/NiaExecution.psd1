@{
    # Script module or binary module file associated with this manifest.
    RootModule = 'NiaExecution.psm1'

    # Version number of this module.
    ModuleVersion = '1.0.0'

    # ID used to uniquely identify this module
    GUID = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'

    # Author of this module
    Author = 'Nia LeSane AI'

    # Company or vendor of this module
    CompanyName = 'House of Jazzu'

    # Copyright statement for this module
    Copyright = '(c) 2026 House of Jazzu. All rights reserved.'

    # Description of the functionality provided by this module
    Description = 'Flawless System Execution Module for PowerShell 7x64. Provides Invoke-NiaProgram and Get-NiaLocale.'

    # Minimum version of the Windows PowerShell engine required by this module
    PowerShellVersion = '7.0'

    # Functions to export from this module
    FunctionsToExport = @('Invoke-NiaProgram', 'Get-NiaLocale')

    # Cmdlets to export from this module
    CmdletsToExport = @()

    # Variables to export from this module
    VariablesToExport = '*'

    # Aliases to export from this module
    AliasesToExport = @('NiaRun')

    # List of all modules packaged with this module
    NestedModules = @()
}
