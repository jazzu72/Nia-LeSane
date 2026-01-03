PHASE2_DIRECTORY_ORGANIZATION.md# PHASE 2: Directory Organization & Import Path Updates

## Overview
Reorganize the Nia-LeSane repository to follow proper project structure conventions. Move loose files from root into organized subdirectories and update all import paths accordingly.

**Current State:** Root directory cluttered with 15+ loose files
**Target State:** Clean, organized structure with proper separation of concerns

---

## 📁 TARGET DIRECTORY STRUCTURE

```
Nia-LeSane/
├── .github/
│   ├── workflows/
│   │   ├── ios-app-store-deploy.yml
│   │   ├── nia-brain-ci-quantum.yml
│   │   ├── nia-notifications.yml
│   │   └── HouseOfJazzu.yml
│   └── CODEOWNERS
├── .gitignore
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
│
├── automation/
│   └── ai-agent-components.md
│
├── config/
│   ├── __init__.py
│   ├── NIA_CONTACT_CONFIG.yaml
│   ├── secrets-template.yaml
│   └── logging.yaml
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── QUANTUM_INTEGRATION.md
│   ├── DEPLOYMENT.md
│   ├── SECRETS_MANAGEMENT.md
│   ├── COMMUNICATION_HUB.md
│   ├── DEPLOYMENT_SUMMARY.md
│   ├── LAUNCH_GUIDE.md
│   └── LETTER_TO_NIA.md
│
├── examples/
│   └── powershell/
│       └── UseModule.ps1
│
├── integrations/
│   ├── __init__.py
│   └── azure/
│       ├── __init__.py
│       ├── quantum_config.py          (from azure_quantum_config.py)
│       ├── quantum_qiskit.py          (from azure_quantum_qiskit.py)
│       ├── quantum_targets.py         (from azure_quantum_targets.py)
│       └── quantum_api.ts             (from azureQuantumAPI.ts)
│
├── modules/
│   └── powershell/
│       ├── NiaQiskit.psm1
│       └── NiaQiskit.psd1
│
├── niabrain/
│   ├── __init__.py
│   └── core.py
│
├── scripts/
│   ├── setup-workflows.sh
│   ├── vault-init.sh                 (NEW)
│   ├── setup-environment.sh           (NEW)
│   └── migration-helper.sh            (NEW)
│
├── tests/
│   ├── __init__.py
│   ├── python/
│   │   ├── __init__.py
│   │   └── test_quantum.py            (NEW)
│   └── powershell/
│       └── test-modules.ps1           (NEW)
│
├── app.json
├── requirements.txt
├── PRODUCTION_UPGRADE_CHECKLIST.md
├── PHASE1_CRITICAL_REPAIRS.md
├── PHASE2_DIRECTORY_ORGANIZATION.md
├── PHASE3_ENHANCEMENTS.md             (NEW)
└── PHASE4_TESTING.md                  (NEW)
```

---

## 🚚 FILE MOVEMENTS

### Movement 1: PowerShell Modules
**Source → Destination**

```
NiaQiskit.psm1  →  modules/powershell/NiaQiskit.psm1
NiaQiskit.psd1  →  modules/powershell/NiaQiskit.psd1
UseModule.ps1   →  examples/powershell/UseModule.ps1
```

**Why:** PowerShell modules belong in a dedicated modules directory for proper module discovery and organization.

---

### Movement 2: Azure Integrations
**Source → Destination**

```
azureQuantumAPI.ts       →  integrations/azure/quantum_api.ts
azure_quantum_config.py  →  integrations/azure/quantum_config.py
azure_quantum_qiskit.py  →  integrations/azure/quantum_qiskit.py
azure_quantum_targets.py →  integrations/azure/quantum_targets.py
```

**Why:** All Azure integration code consolidated in one place for easier maintenance and discoverability.

---

### Movement 3: Configuration Files
**Source → Destination**

```
NIA_CONTACT_CONFIG.yaml  →  config/NIA_CONTACT_CONFIG.yaml
```

**New Files to Create:**
```
config/secrets-template.yaml    (Template for required secrets)
config/logging.yaml             (Logging configuration)
```

**Why:** Configuration files centralized for environment setup and management.

---

### Movement 4: Documentation
**Source → Destination**

```
COMMUNICATION_HUB.md     →  docs/COMMUNICATION_HUB.md
DEPLOYMENT_SUMMARY.md    →  docs/DEPLOYMENT_SUMMARY.md
LAUNCH_GUIDE.md          →  docs/LAUNCH_GUIDE.md
LETTER_TO_NIA.md         →  docs/LETTER_TO_NIA.md
ai-agent-components.md   →  automation/ai-agent-components.md (stays)
```

**New Files to Create:**
```
docs/ARCHITECTURE.md            (System architecture overview)
docs/QUANTUM_INTEGRATION.md     (Quantum computing details)
docs/DEPLOYMENT.md              (Deployment procedures)
docs/SECRETS_MANAGEMENT.md      (Secret management guide)
```

**Why:** Documentation organized in dedicated directory, easier to maintain and discover.

---

## 🔄 IMPORT PATH UPDATES

### Python Imports

**Before:**
```python
import azure_quantum_config
import azure_quantum_qiskit
import azure_quantum_targets
from azure_quantum_config import get_quantum_credentials

# From niabrain
from niabrain.core import QuantumAgent
```

**After:**
```python
from integrations.azure import quantum_config
from integrations.azure import quantum_qiskit
from integrations.azure import quantum_targets
from integrations.azure.quantum_config import get_quantum_credentials

# From niabrain
from niabrain.core import QuantumAgent
```

**Files to Update:**
- `niabrain/core.py` - Update all Azure imports
- `tests/python/test_quantum.py` - Update test imports
- Any CI/CD scripts that reference Azure modules

---

### PowerShell Imports

**Before:**
```powershell
Import-Module .\NiaQiskit.psm1 -Force
. .\UseModule.ps1
```

**After:**
```powershell
Import-Module .\modules\powershell\NiaQiskit.psm1 -Force
. .\examples\powershell\UseModule.ps1
```

**Files to Update:**
- Workflow files in `.github/workflows/`
- Any deployment scripts
- Documentation examples

---

### Environment Variables

**Before:**
```yaml
env:
  NIA_CONFIG: ./NIA_CONTACT_CONFIG.yaml
  AZURE_QUANTUM_MODULE: ./azure_quantum_config.py
```

**After:**
```yaml
env:
  NIA_CONFIG: ./config/NIA_CONTACT_CONFIG.yaml
  AZURE_QUANTUM_MODULE: ./integrations/azure/quantum_config.py
  PYTHONPATH: ./integrations:./
```

**Files to Update:**
- `.github/workflows/*.yml` - Update all env references
- `requirements.txt` - May need path updates
- Setup scripts in `scripts/`

---

## 🔧 NEW FILES TO CREATE

### 1. integrations/__init__.py
```python
"""
Integrations module for Nia LeSane
Contains integrations with external services like Azure Quantum
"""

__version__ = "1.0.0"
```

### 2. integrations/azure/__init__.py
```python
"""
Azure Quantum Integration Module
Provides access to Azure Quantum services for circuit execution
"""

from . import quantum_config
from . import quantum_qiskit
from . import quantum_targets
from . import quantum_api

__all__ = [
    'quantum_config',
    'quantum_qiskit',
    'quantum_targets',
    'quantum_api'
]
```

### 3. config/__init__.py
```python
"""
Configuration module for Nia LeSane
Handles configuration loading and management
"""

import os
import yaml

def load_config(config_path: str = None):
    """Load configuration from YAML file"""
    if config_path is None:
        config_path = os.path.join(os.path.dirname(__file__), 'NIA_CONTACT_CONFIG.yaml')
    
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    return config
```

### 4. config/secrets-template.yaml
```yaml
# Nia LeSane Secrets Template
# Copy this file to .env or use GitHub Secrets

# Azure Quantum Credentials
AZURE_SUBSCRIPTION_ID: "your-subscription-id"
AZURE_RESOURCE_GROUP: "your-resource-group"
AZURE_WORKSPACE_NAME: "your-workspace"
AZURE_CREDENTIALS: "{"clientId":"...","clientSecret":"...","subscriptionId":"...","tenantId":"..."}"

# Apple iOS Deployment
APPLE_ID_EMAIL: "your-apple-id@example.com"
APPLE_ID_PASSWORD: "your-password"
APPLE_APP_SPECIFIC_PASSWORD: "your-app-specific-password"
APPLE_AUTH_KEY: "base64-encoded-auth-key"
IOS_PROVISIONING_PROFILE: "base64-encoded-profile"

# Communication & Notifications
JAZZ_EMAIL: "jazz@houseofjazzu.dev"
JAZZ_EMAIL_PASSWORD: "your-email-password"
SLACK_WEBHOOK: "https://hooks.slack.com/services/..."

# AI & Quantum
XAI_API_KEY: "your-xai-api-key"
NIA_VAULT_MASTER_KEY: "your-vault-master-key"
IBM_QUANTUM_TOKEN: "your-ibm-quantum-token"

# GitHub
NIA_GITHUB_TOKEN: "your-github-token"
GITHUB_TOKEN: "your-github-token"
```

### 5. config/logging.yaml
```yaml
version: 1
disable_existing_loggers: false

formatters:
  standard:
    format: '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
  detailed:
    format: '%(asctime)s [%(levelname)s] %(name)s:%(lineno)d: %(message)s'

handlers:
  console:
    class: logging.StreamHandler
    level: DEBUG
    formatter: standard
    stream: ext://sys.stdout

  file:
    class: logging.FileHandler
    level: DEBUG
    formatter: detailed
    filename: logs/nia-lesane.log

loggers:
  niabrain:
    level: DEBUG
    handlers: [console, file]
    propagate: false

  integrations.azure:
    level: DEBUG
    handlers: [console, file]
    propagate: false

root:
  level: INFO
  handlers: [console, file]
```

---

## 📝 IMPLEMENTATION CHECKLIST

### Step 1: Create Directory Structure
- [ ] Create `/modules/powershell/` directory
- [ ] Create `/integrations/` directory
- [ ] Create `/integrations/azure/` directory
- [ ] Create `/examples/powershell/` directory
- [ ] Create `/config/` directory
- [ ] Create `/docs/` directory
- [ ] Create `/tests/` directory
- [ ] Create `/tests/python/` directory
- [ ] Create `/tests/powershell/` directory

### Step 2: Create __init__.py Files
- [ ] Create `integrations/__init__.py`
- [ ] Create `integrations/azure/__init__.py`
- [ ] Create `config/__init__.py`
- [ ] Create `tests/__init__.py`
- [ ] Create `tests/python/__init__.py`

### Step 3: Move Files (GitHub Web UI)
- [ ] Copy NiaQiskit.psm1 to modules/powershell/
- [ ] Copy NiaQiskit.psd1 to modules/powershell/
- [ ] Copy UseModule.ps1 to examples/powershell/
- [ ] Copy azure_quantum_*.py files to integrations/azure/
- [ ] Rename files as needed (e.g., azure_quantum_config.py → quantum_config.py)
- [ ] Copy NIA_CONTACT_CONFIG.yaml to config/
- [ ] Copy docs to docs/ directory

### Step 4: Update Import Paths
- [ ] Update `niabrain/core.py` - Import paths from integrations
- [ ] Update `.github/workflows/nia-brain-ci-quantum.yml` - Env variables
- [ ] Update any Python scripts - Import statements
- [ ] Update documentation - Code examples
- [ ] Update README - File references

### Step 5: Create Configuration Files
- [ ] Create `config/secrets-template.yaml`
- [ ] Create `config/logging.yaml`
- [ ] Create documentation files in `/docs/`

### Step 6: Verification
- [ ] Validate all Python imports (run `python -m py_compile`)
- [ ] Check PowerShell module loads: `Import-Module .\modules\powershell\NiaQiskit.psm1`
- [ ] Run test suite to verify imports
- [ ] Verify GitHub workflows reference correct paths

### Step 7: Cleanup
- [ ] Remove old files from root (after verification)
- [ ] Update .gitignore if needed
- [ ] Verify no broken references remain

---

## 🔍 FILES THAT NEED IMPORT PATH UPDATES

### High Priority (Critical):
1. **niabrain/core.py**
   - Update all Azure imports
   - Update config imports

2. **.github/workflows/nia-brain-ci-quantum.yml**
   - Update PYTHONPATH
   - Update env references
   - Update script paths

3. **scripts/setup-workflows.sh**
   - Update module paths
   - Update import references

### Medium Priority (Important):
4. **README.md**
   - Update code examples
   - Update import paths in documentation
   - Update file structure diagram

5. **docs/DEPLOYMENT.md**
   - Update deployment script paths
   - Update environment setup

6. **tests/**
   - Update all test imports
   - Update test data paths

### Low Priority (Reference):
7. **PHASE1_CRITICAL_REPAIRS.md**
   - Update examples to show new paths
   - Reference new directory structure

8. **PRODUCTION_UPGRADE_CHECKLIST.md**
   - Update file location references

---

## 📊 IMPLEMENTATION STRATEGY

### Approach: Minimal Disruption
1. **Create all new directories first** (no code changes needed)
2. **Copy files to new locations** (old files still exist)
3. **Update imports in code** (change import statements)
4. **Run tests** (verify everything works)
5. **Delete old files** (only after verification)

This minimizes risk - if something breaks, you can revert by restoring old imports.

---

## 🧪 TESTING STRATEGY

### Python Tests
```bash
# Verify imports work
python -c "from integrations.azure import quantum_config; print('✅ Import successful')"
python -c "from niabrain.core import QuantumAgent; print('✅ Import successful')"

# Run pytest
pytest tests/python/ -v
```

### PowerShell Tests
```powershell
# Verify module loads
Import-Module .\modules\powershell\NiaQiskit.psm1 -Force -Verbose

# Run Pester tests
Invoke-Pester .\tests\powershell\test-modules.ps1 -Verbose
```

### CI/CD Tests
- Trigger workflow in GitHub Actions
- Verify all import paths resolve
- Check for any "module not found" errors in logs

---

## ⚠️ COMMON PITFALLS TO AVOID

1. **Don't forget PYTHONPATH**
   - When running Python scripts, you may need: `export PYTHONPATH=".:./integrations:$PYTHONPATH"`

2. **Relative vs Absolute Imports**
   - Use relative imports within packages: `from . import quantum_config`
   - Use absolute imports from tests: `from integrations.azure import quantum_config`

3. **File Dependencies**
   - Some files may import from each other
   - Update all files before testing
   - Check import order (avoid circular imports)

4. **Workflow PYTHONPATH**
   - GitHub Actions needs proper PYTHONPATH
   - Add to workflow: `- run: export PYTHONPATH=".:./integrations" && python -m pytest`

5. **Module Discovery**
   - Ensure `__init__.py` files exist in all package directories
   - Python packages need `__init__.py` to be discoverable

---

## 🎯 SUCCESS CRITERIA

Phase 2 is complete when:
- ✅ All files moved to new locations
- ✅ All imports updated without errors
- ✅ All tests pass (Python & PowerShell)
- ✅ CI/CD workflows run successfully
- ✅ No "module not found" errors in logs
- ✅ README reflects new structure
- ✅ Documentation examples use new paths
- ✅ Repository is 30% cleaner (fewer root files)

---

## 📈 PROGRESS TRACKING

| Task | Status | Notes |
|------|--------|-------|
| Create directories | ⏳ Pending | Use GitHub web UI |
| Move PowerShell files | ⏳ Pending | 2 files to move |
| Move Azure files | ⏳ Pending | 4 files to rename & move |
| Move config files | ⏳ Pending | 1 file to move |
| Create __init__.py files | ⏳ Pending | 5 files |
| Update imports | ⏳ Pending | Core task |
| Create new config files | ⏳ Pending | Template & logging |
| Test & verify | ⏳ Pending | Critical step |

---

## 🔗 RELATED DOCUMENTS

- **PRODUCTION_UPGRADE_CHECKLIST.md** - Overall upgrade plan
- **PHASE1_CRITICAL_REPAIRS.md** - Workflow fixes
- **PHASE3_ENHANCEMENTS.md** - Python & PowerShell enhancements (next)
- **PHASE4_TESTING.md** - Comprehensive testing (coming)

---

## 📞 NEXT STEPS

After Phase 2 completion:
1. ✅ Repository will be well-organized
2. ✅ Clean root directory
3. ✅ Proper separation of concerns
4. ✅ Ready for Phase 3: Enhancements

---

**Prepared by:** BrowserOS Agent
**Date:** January 3, 2026
**Estimated Duration:** 3-4 hours
**Difficulty:** Medium (file operations + import updates)
**Risk Level:** Low (with testing)
