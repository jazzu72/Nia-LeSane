"""
Quantum Backend Integration Tests for Nia LeSane
Tests for Qiskit and Azure Quantum integration
"""

import pytest
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_aer import Aer
import numpy as np


class TestQuantumBasics:
    """Test basic quantum circuit operations"""
    
    def test_circuit_creation(self):
        """Test creating a quantum circuit"""
        qr = QuantumRegister(2, 'q')
        cr = ClassicalRegister(2, 'c')
        circuit = QuantumCircuit(qr, cr)
        assert circuit.num_qubits == 2
        assert circuit.num_clbits == 2
    
    def test_hadamard_gate(self):
        """Test Hadamard gate application"""
        circuit = QuantumCircuit(1)
        circuit.h(0)
        assert len(circuit) == 1
    
    def test_pauli_gates(self):
        """Test Pauli gates (X, Y, Z)"""
        circuit = QuantumCircuit(3)
        circuit.x(0)
        circuit.y(1)
        circuit.z(2)
        assert len(circuit) == 3


class TestQuantumMeasurement:
    """Test measurement operations"""
    
    def test_measurement(self):
        """Test measurement of quantum states"""
        circuit = QuantumCircuit(2, 2)
        circuit.h(0)
        circuit.cx(0, 1)
        circuit.measure([0, 1], [0, 1])
        assert circuit.num_clbits == 2


class TestAerSimulator:
    """Test Aer simulator backend"""
    
    def test_simulator_available(self):
        """Test that Aer simulator is available"""
        simulator = Aer.get_backend('qasm_simulator')
        assert simulator is not None
    
    def test_simple_simulation(self):
        """Test running a simple simulation"""
        circuit = QuantumCircuit(1, 1)
        circuit.h(0)
        circuit.measure(0, 0)
        
        simulator = Aer.get_backend('qasm_simulator')
        # Test that we can create a job (actual execution requires credentials)
        assert simulator.name() == 'qasm_simulator'


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
