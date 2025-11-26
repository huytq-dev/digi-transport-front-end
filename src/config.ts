// API Configuration
// Read from environment variables, fallback to default values
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://digitransport.runasp.net/api';
export const host = apiBaseUrl.replace('/api', '') || 'https://digitransport.runasp.net';
export const api_version = 'api';
export const baseUrl = apiBaseUrl;

// Social Login Configuration
export const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
export const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID || '';

// Frontend Configuration
export const frontendBaseUrl = import.meta.env.VITE_FRONTEND_BASE_URL || 'http://localhost:3000';