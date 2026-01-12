/**
 * LoggerService
 * 
 * Centralized logging for the application. 
 * Ready to be connected to Sentry, LogRocket, or Datadog.
 */
class LoggerService {
    private isDevelopment = process.env.NODE_ENV === 'development';

    log(message: string, context?: any) {
        if (this.isDevelopment) {
            console.log(`[LOG] ${message}`, context || '');
        }
        // Production: Send to logging service
    }

    warn(message: string, context?: any) {
        console.warn(`[WARN] ${message}`, context || '');
        // Production: Send warning to monitoring
    }

    error(message: string, error?: Error, context?: any) {
        console.error(`[ERROR] ${message}`, error, context || '');

        // Production Integration Placeholder:
        // Sentry.captureException(error, { extra: context });
    }

    trackEvent(name: string, properties?: any) {
        if (this.isDevelopment) {
            console.log(`[EVENT] ${name}`, properties || '');
        }
        // Production: Send to Analytics/Mixpanel
    }
}

export const logger = new LoggerService();
