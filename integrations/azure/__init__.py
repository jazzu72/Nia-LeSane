integrations/azure/__init__.py"""
Azure Quantum Integration Module for Nia LeSane
Provides access to Azure Quantum services for quantum circuit execution
"""

__version__ = "1.0.0"
__author__ = "House of Jazzu"
__description__ = "Azure Quantum service integration with Qiskit support"

# Import submodules for easier access
try:
    from . import quantum_config
    print("✅ Loaded quantum_config module")
except ImportError as e:
    print(f"⚠️ Warning: Could not import quantum_config: {e}")

try:
    from . import quantum_qiskit
    print("✅ Loaded quantum_qiskit module")
except ImportError as e:
    print(f"⚠️ Warning: Could not import quantum_qiskit: {e}")

try:
    from . import quantum_targets
    print("✅ Loaded quantum_targets module")
except ImportError as e:
    print(f"⚠️ Warning: Could not import quantum_targets: {e}")

# Define public API
__all__ = [
    'quantum_config',
    'quantum_qiskit',
    'quantum_targets',
]

# Module initialization
def initialize_azure_quantum():
    """Initialize Azure Quantum connection and verify credentials"""
    try:
        from .quantum_config import get_quantum_credentials
        credentials = get_quantum_credentials()
        return {
            'status': 'initialized',
            'message': 'Azure Quantum integration ready',
            'credentials_loaded': credentials is not None
        }
    except Exception as e:
        return {
            'status': 'error',
            'message': f'Failed to initialize Azure Quantum: {e}',
            'credentials_loaded': False
        }
