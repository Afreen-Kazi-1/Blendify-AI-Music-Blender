const API_BASE_URL = 'http://localhost:3000';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    google: `${API_BASE_URL}/auth/google`,
    refreshToken: `${API_BASE_URL}/auth/refresh-token`
  },
  profile: {
    update: `${API_BASE_URL}/profile`,
    settings: `${API_BASE_URL}/settings`
  },
  blend: {
    create: `${API_BASE_URL}/blendpage/create-blend`
  },
  community: {
    myProjects: `${API_BASE_URL}/community/my-projects`,
    publicProjects: `${API_BASE_URL}/community/public-projects`
  }
};