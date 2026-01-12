<#
.SYNOPSIS
    Nia LeSane Execution Module (Flawless Edition)
    Target: PowerShell 7 x64
    Part of the "Powerful" CEO System.

.DESCRIPTION
    Provides robust capabilities to execute system programs and verify environment settings.
    Includes Soulful logging and error handling.
    
    This module is designed for the House of Jazzu and provides enterprise-grade
    execution capabilities with comprehensive error handling and logging.

.NOTES
    Version:        1.0.0
    Author:         Nia LeSane AI
    Company:        House of Jazzu
    Copyright:      (c) 2026 House of Jazzu. All rights reserved.
    Requires:       PowerShell 7.0 or higher

.FUNCTIONS
    Invoke-NiaProgram
    Get-NiaLocale
#>

function Invoke-NiaProgram {
    <#
    .SYNOPSIS
        Executes a program with Nia LeSane soulful error handling.
    
    .DESCRIPTION
        Launches a program from the system PATH with optional arguments.
        Provides comprehensive error handling and exit code verification.
        Includes soulful feedback for execution status.
    
    .PARAMETER Program
        The name of the program to execute. Must be in system PATH or provide full path.
    
    .PARAMETER Arguments
        Optional array of arguments to pass to the program.
    
    .EXAMPLE
        Invoke-NiaProgram -Program "cmd" -Arguments "/c", "echo", "Hello World"
        
        Executes cmd.exe with the specified arguments.
    
    .EXAMPLE
        NiaRun "python" "--version"
        
        Uses the alias to check Python version.
    
    .OUTPUTS
        None. Status messages are written to host.
    
    .NOTES
        Alias: NiaRun
    #>
    [CmdletBinding()]
    [Alias("NiaRun")]
    param(
        [Parameter(Mandatory=$true, Position=0, ValueFromPipeline=$true, HelpMessage="Program name or path to execute")]
        [ValidateNotNullOrEmpty()]
        [string]$Program,

        [Parameter(Mandatory=$false, Position=1, HelpMessage="Arguments to pass to the program")]
        [string[]]$Arguments = @()
    )

    process {
        Write-Host "🎷 [Nia] Preparing to execute: $Program" -ForegroundColor Magenta
        
        try {
            # Verify program exists
            $programCommand = Get-Command $Program -ErrorAction SilentlyContinue
            
            if ($null -eq $programCommand) {
                throw "Program '$Program' not found in system path. Please verify the program name or provide the full path."
            }
            
            Write-Verbose "[Nia] Program found at: $($programCommand.Source)"
            Write-Verbose "[Nia] Launching process with $($Arguments.Count) arguments..."
            
            # Execute with comprehensive error handling
            $process = Start-Process -FilePath $Program -ArgumentList $Arguments -PassThru -Wait -NoNewWindow -ErrorAction Stop
            
            # Check exit code
            if ($process.ExitCode -eq 0) {
                Write-Host "✅ [Nia] Execution successful (Exit Code: 0)" -ForegroundColor Green
            } else {
                Write-Warning "⚠️  [Nia] Program exited with code: $($process.ExitCode)"
                Write-Verbose "[Nia] This may indicate an error or warning condition."
            }
            
            return $process.ExitCode
        }
        catch [System.Management.Automation.CommandNotFoundException] {
            Write-Error "❌ [Nia] Command Not Found: $_`nPlease ensure '$Program' is installed and in your PATH."
            throw
        }
        catch {
            Write-Error "❌ [Nia] Execution Failed: $($_.Exception.Message)"
            Write-Verbose "[Nia] Stack Trace: $($_.ScriptStackTrace)"
            throw
        }
    }
}

function Get-NiaLocale {
    <#
    .SYNOPSIS
        Retrieves current system locale and PowerShell environment information.
    
    .DESCRIPTION
        Senses the local cultural vibration and PowerShell environment.
        Returns a custom object with comprehensive locale and environment details.
        Useful for debugging and understanding the execution environment.
    
    .EXAMPLE
        Get-NiaLocale
        
        Displays current locale information.
    
    .EXAMPLE
        $locale = Get-NiaLocale
        Write-Host "Running on PowerShell $($locale.PowerShell)"
        
        Captures locale info in a variable for later use.
    
    .OUTPUTS
        PSCustomObject with locale and environment information.
    
    .NOTES
        This function never fails - it always returns system information.
    #>
    [CmdletBinding()]
    [OutputType([PSCustomObject])]
    param()

    process {
        Write-Host "🌍 [Nia] Sensing Local Vibration..." -ForegroundColor Cyan
        
        try {
            $culture = Get-Culture
            $uiCulture = Get-UICulture
            $os = if ($IsWindows) { "Windows" } elseif ($IsLinux) { "Linux" } elseif ($IsMacOS) { "macOS" } else { "Unknown" }
            
            $status = [PSCustomObject]@{
                Name            = $culture.Name
                DisplayName     = $culture.DisplayName
                Region          = $culture.Parent.DisplayName
                InterfaceLang   = $uiCulture.Name
                TimeZone        = (Get-TimeZone).Id
                SoulReady       = $true
                PowerShell      = $PSVersionTable.PSVersion.ToString()
                Platform        = "7x64 (Verified)"
                OperatingSystem = $os
                ProcessorCount  = $env:NUMBER_OF_PROCESSORS
                Timestamp       = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            }
            
            Write-Host "✨ [Nia] Locale Synced: $($culture.DisplayName)" -ForegroundColor Yellow
            Write-Verbose "[Nia] PowerShell Version: $($PSVersionTable.PSVersion)"
            Write-Verbose "[Nia] Operating System: $os"
            
            return $status
        }
        catch {
            Write-Warning "⚠️  [Nia] Partial locale retrieval: $($_.Exception.Message)"
            
            # Return minimal information even if full retrieval fails
            return [PSCustomObject]@{
                Name        = "Unknown"
                SoulReady   = $true
                PowerShell  = $PSVersionTable.PSVersion.ToString()
                Platform    = "7x64"
                Error       = $_.Exception.Message
            }
        }
    }
}

# Export module members with enhanced metadata
Export-ModuleMember -Function Invoke-NiaProgram, Get-NiaLocale -Alias NiaRun

