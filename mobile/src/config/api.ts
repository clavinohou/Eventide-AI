// API Configuration
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000'
  : 'https://your-production-api.com';

export const API_ENDPOINTS = {
  extract: `${API_BASE_URL}/extract`,
  save: `${API_BASE_URL}/save`,
  health: `${API_BASE_URL}/health`
};

