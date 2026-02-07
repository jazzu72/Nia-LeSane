<#
.SYNOPSIS
    Nia LeSane Execution Module
    Part of the "Powerful" CEO System.
.DESCRIPTION
    Provides capabilities to execute programs in the system path and verify local environment settings.
    Designed for the House of Jazzu.
.FUNCTIONS
    Invoke-NiaProgram
    Get-NiaLocale
#>

function Invoke-NiaProgram {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true, Position=0)]
        [string]$Program,

        [Parameter(Mandatory=$false, Position=1)]
        [string[]]$Arguments,

        [Switch]$VerboseOutput  # Optional flag for more detailed logging
    )
    process {
        if ($VerboseOutput) {
            Write-Verbose "🎷 Nia preparing to execute: $Program with arguments: $Arguments"
        } else {
            Write-Host "🎷 Nia executing: $Program" -ForegroundColor Magenta
        }
       
        try {
            if (Get-Command $Program -ErrorAction SilentlyContinue) {
                if ($Arguments) {
                    & $Program $Arguments
                } else {
                    & $Program
                }
                Write-Host "✅ Execution complete" -ForegroundColor Green
            } else {
                Write-Warning "Program '$Program' not found in system path."
            }
        }
        catch {
            Write-Error "Failed to execute '$Program': $_"
        }
    }
}

function Get-NiaLocale {
    [CmdletBinding()]
    param()
    process {
        Write-Host "🌍 Verifying Soulful Locale..." -ForegroundColor Cyan
        $culture = Get-Culture
        return [PSCustomObject]@{
            Name = $culture.Name
            DisplayName = $culture.DisplayName
            SoulReady = $true
        }
    }
}

Export-ModuleMember -Function Invoke-NiaProgram, Get-NiaLocale
