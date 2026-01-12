/**
 * Application Secrets and Configuration
 * 
 * PRODUCTION NOTE: All sensitive values should be loaded from environment variables.
 * Create a .env file based on .env.example for local development.
 * In production (Expo/EAS), these will be injected via build-time secrets.
 * 
 * This centralizes configuration to avoid magic strings throughout the codebase.
 */

// React Native global declarations
declare const __DEV__: boolean;
declare const global: typeof globalThis;
declare const console: Console;

// Helper to get environment variable with fallback
const getEnvVar = (key: string, fallback: string = ''): string => {
    // In React Native with Expo, you'd use expo-constants or react-native-dotenv
    // For now, we use a fallback pattern that can be replaced with actual env loading
    // Using type assertion to handle React Native global scope
    const env = (global as unknown as { process?: { env?: Record<string, string> } }).process?.env || {};
    return env[key] || fallback;
};

export const SECRETS = {
    // The soulful password for the CEO
    // In production, this should come from secure authentication, not hardcoded
    SPECIAL_PASSWORD: getEnvVar('SPECIAL_PASSWORD', 'AddieMaeLesane33'),

    // Azure Quantum configuration
    AZURE: {
        API_BASE_URL: getEnvVar('AZURE_API_BASE_URL', ''),
        API_KEY_STORAGE_KEY: 'AZURE_API_KEY'
    },

    // Payment configuration
    // CRITICAL: Replace with actual Stripe keys before production!
    STRIPE: {
        PUBLISHABLE_KEY: getEnvVar('STRIPE_PUBLISHABLE_KEY', ''),
        MERCHANT_ID: getEnvVar('STRIPE_MERCHANT_ID', 'merchant.com.houseofjazzu.nialesane')
    },

    // OIDC Configuration
    OIDC: {
        AUTHORITY: getEnvVar('OIDC_AUTHORITY', 'https://login.microsoftonline.com/common'),
        CLIENT_ID: getEnvVar('OIDC_CLIENT_ID', ''),
        REDIRECT_URI: 'nia-lesane://auth-redirect'
    },

    // Twilio Configuration (For SMS and Voice)
    // CRITICAL: Set these environment variables before using SMS/Voice features!
    TWILIO: {
        ACCOUNT_SID: getEnvVar('TWILIO_ACCOUNT_SID', ''),
        AUTH_TOKEN: getEnvVar('TWILIO_AUTH_TOKEN', ''),
        FROM_NUMBER: getEnvVar('TWILIO_FROM_NUMBER', '')
    },

    // User contact information
    USER_PHONE: getEnvVar('USER_PHONE', '757-339-9245')
};

// Validation: Warn if critical secrets are missing (development only)
if (__DEV__) {
    const missingSecrets: string[] = [];

    if (!SECRETS.AZURE.API_BASE_URL) missingSecrets.push('AZURE_API_BASE_URL');
    if (!SECRETS.STRIPE.PUBLISHABLE_KEY) missingSecrets.push('STRIPE_PUBLISHABLE_KEY');
    if (!SECRETS.TWILIO.ACCOUNT_SID) missingSecrets.push('TWILIO_ACCOUNT_SID');

    if (missingSecrets.length > 0) {
        console.warn(
            '[SECRETS] Missing environment variables:',
            missingSecrets.join(', '),
            '\nCreate .env file from .env.example'
        );
    }
}

