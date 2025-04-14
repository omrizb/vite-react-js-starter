/**
 * Environment variables configuration
 * This file provides default values for the application configuration.
 * For production, you can override these values using environment variables
 * prefixed with VITE_ (e.g., VITE_APP_NAME="My App")
 */

export const env = {
    // App Configuration
    appName: import.meta.env.VITE_APP_NAME || 'React App',
    appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    appEnv: import.meta.env.VITE_APP_ENV || 'development',

    // API Configuration
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000', 10),

    // Feature Flags
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || false,
    enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true' || true,

    // Third-party Services
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
    sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',

    // Build Configuration
    buildMode: import.meta.env.VITE_BUILD_MODE || 'development',
    sourceMap: import.meta.env.VITE_SOURCE_MAP === 'true' || true
}

// Log environment configuration in development
if (env.appEnv === 'development') {
    console.log('Environment Configuration:', env)
} 