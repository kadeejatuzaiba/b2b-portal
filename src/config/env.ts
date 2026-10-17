/**
 * Portal configuration and environment variables
 */

export const env = {
  appName: 'HireD B2B Portal',
  appVersion: '1.0.0',
  apiPrefix: import.meta.env.VITE_API_PREFIX || '/api/v1',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
