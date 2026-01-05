"""
Pytest configuration for Nia LeSane quantum tests
"""
import pytest
import sys
from pathlib import Path

# Add src directory to path
src_path = Path(__file__).parent.parent.parent
sys.path.insert(0, str(src_path))


@pytest.fixture(scope="session")
def test_config():
    """Provide test configuration"""
    return {
        "quantum_backend": "qasm_simulator",
        "num_qubits": 5,
        "shots": 1024,
    }


@pytest.fixture
def basic_circuit():
    """Provide a basic quantum circuit for testing"""
    from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister

    qr = QuantumRegister(2, 'q')
    cr = ClassicalRegister(2, 'c')
    circuit = QuantumCircuit(qr, cr, name='test_circuit')
    return circuit


def pytest_configure(config):
    """Configure pytest"""
    config.addinivalue_line(
        "markers", "integration: mark test as an integration test"
    )
    config.addinivalue_line(
        "markers", "quantum: mark test as a quantum computation test"
    )


def pytest_collection_modifyitems(config, items):
    """Modify test collection"""
    for item in items:
        # Add quantum marker to all tests in quantum_tests.py
        if "quantum_tests" in str(item.fspath):
            item.add_marker(pytest.mark.quantum)src/tests/conftest.py"""
Pytest configuration for Nia LeSane quantum tests
"""

import pytest
import sys
from pathlib import Path
"""
Pytest configuration for Nia LeSane quantum tests
"""
import pytest
import sys
from pathlib import Path

# Add src directory to path
src_path = Path(__file__).parent.parent.parent
sys.path.insert(0, str(src_path))


@pytest.fixture(scope="session")
def test_config():
    """Provide test configuration"""
    return {
        "quantum_backend": "qasm_simulator",
        "num_qubits": 5,
        "shots": 1024,
    }


@pytest.fixture
def basic_circuit():
    """Provide a basic quantum circuit for testing"""
    from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
    
    qr = QuantumRegister(2, 'q')
    cr = ClassicalRegister(2, 'c')
    circuit = QuantumCircuit(qr, cr, name='test_circuit')
    return circuit


def pytest_configure(config):
    """Configure pytest"""
    config.addinivalue_line(
        "markers", "integration: mark test as an integration test"
    )
    config.addinivalue_line(
        "markers", "quantum: mark test as a quantum computation test"
    )


def pytest_collection_modifyitems(config, items):
    """Modify test collection"""
    for item in items:
        # Add quantum marker to all tests in quantum_tests.py
        if "quantum_tests" in str(item.fspath):
            item.add_marker(pytest.mark.quantum)
# Add src directory to path
src_path = Path(__file__).parent.parent.parent
sys.path.insert(0, str(src_path))


@pytest.fixture(scope="session")
def test_config():
    """Provide test configuration"""
    return {
        "quantum_backend": "qasm_simulator",
        "num_qubits": 5,
        "shots": 1024,
    }


@pytest.fixture
def basic_circuit():
    """Provide a basic quantum circuit for testing"""
    from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
    
    qr = QuantumRegister(2, 'q')
    cr = ClassicalRegister(2, 'c')
    circuit = QuantumCircuit(qr, cr, name='test_circuit')
    return circuit


def pytest_configure(config):
    """Configure pytest"""
    config.addinivalue_line(
        "markers", "integration: mark test as an integration test"
    )
    config.addinivalue_line(
        "markers", "quantum: mark test as a quantum computation test"
    )


def pytest_collection_modifyitems(config, items):
    """Modify test collection"""
    for item in items:
        # Add quantum marker to all tests in quantum_tests.py
        if "quantum_tests" in str(item.fspath):
            item.add_marker(pytest.mark.quantum)
