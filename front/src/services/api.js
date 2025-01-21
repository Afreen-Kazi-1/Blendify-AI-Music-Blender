import { API_ENDPOINTS } from '../config/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const apiClient = {
  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers
    };

    const response = await fetch(endpoint, {
      ...options,
      headers
    });

    if (response.status === 401) {
      // Handle token refresh here
      authService.logout();
      window.location.href = '/login';
      return;
    }

    return response.json();
  }
};