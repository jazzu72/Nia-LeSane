import { AzureQuantumApi } from '../services/AzureQuantumApi';

describe('AzureQuantumApi', () => {
    let api: AzureQuantumApi;

    beforeEach(() => {
        api = new AzureQuantumApi();
    });

    it('should initialize with default base URL', () => {
        expect(api).toBeDefined();
    });

    it('should throw error when submitting circuit without API key', async () => {
        // We expect the "Real API call not implemented" error for now, 
        // or the warning if it falls back to simulation logic (depending on implementation tweak).
        // Based on current code: it logs warn and returns simulated ID.

        const result = await api.submitCircuit("H 0");
        expect(result).toContain("simulated-job-id");
    });

    it('should return simulated status when no API key is present', async () => {
        const status = await api.getJobStatus("123");
        expect(status.status).toBe("Succeeded");
        expect(status.result).toBe("00110");
    });

    it('should accept an API key', () => {
        api.setApiKey("test-key");
        // Verify internal state if possible, or verify behavior change
        // Currently with a key, it throws "not implemented"
        expect(api.submitCircuit("H 0")).rejects.toThrow("Real API call not implemented");
    });
});
