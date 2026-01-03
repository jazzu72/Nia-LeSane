from azure.quantum.qiskit import AzureQuantumProvider
from qiskit import QuantumCircuit, transpile
from qiskit.providers import JobStatus
import time

# Connect
provider = AzureQuantumProvider(workspace=workspace)

# Backend (simulator for test, hardware for real)
backend = provider.get_backend("microsoft.estimator")

# Circuit
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

# Transpile & submit
transpiled = transpile(qc, backend)
job = backend.run(transpiled, shots=1000)

# Poll for result
while job.status() != JobStatus.DONE:
    time.sleep(5)
results = job.result()
print(results.get_counts())
