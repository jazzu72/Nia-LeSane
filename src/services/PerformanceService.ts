/**
 * PerformanceService
 * 
 * Simple utility to track and log performance metrics.
 */
class PerformanceService {
    private marks: Record<string, number> = {};

    startMark(label: string) {
        this.marks[label] = Date.now();
    }

    endMark(label: string) {
        const startTime = this.marks[label];
        if (!startTime) {
            console.warn(`[Performance] Mark "${label}" was never started.`);
            return;
        }

        const duration = Date.now() - startTime;
        console.log(`[Performance] ${label}: ${duration}ms`);
        delete this.marks[label];
        return duration;
    }

    // High-level wrapper for async actions
    async trackAsyncAction<T>(label: string, action: () => Promise<T>): Promise<T> {
        this.startMark(label);
        try {
            return await action();
        } finally {
            this.endMark(label);
        }
    }
}

export const performanceService = new PerformanceService();
