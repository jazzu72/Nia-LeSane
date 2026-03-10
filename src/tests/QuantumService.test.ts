import { fetchQuantumState, submitOptimizationJob } from '../services/QuantumService';
import { azureQuantumApi } from '../services/AzureQuantumApi';

// Mock the API dependency
jest.mock('../services/AzureQuantumApi', () => {
    return {
        azureQuantumApi: {
            submitCircuit: jest.fn().mockResolvedValue("mock-job-id"),
            getJobStatus: jest.fn().mockResolvedValue({ status: "Succeeded" })
        }
    };
});

describe('QuantumService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetchQuantumState returns soulful data', async () => {
        const state = await fetchQuantumState();
        expect(state.coherence).toBeGreaterThan(0);
        expect(state.soulResonance).toContain("Jazz");
        expect(state.qubitsActive).toBe(127);
    });

    it('submitOptimizationJob calls the Azure API', async () => {
        const result = await submitOptimizationJob("QASM code");

        expect(result).toBe(true);
        expect(azureQuantumApi.submitCircuit).toHaveBeenCalledWith("QASM code");
    });
});
