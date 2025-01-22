import axios from 'axios';

const API_URL = 'http://localhost:3000/user';

export const profileService = {
  async getSettings() {
    const response = await axios.get(`${API_URL}/settings`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  },

  async updateSettings(settings) {
    const response = await axios.put(`${API_URL}/settings`, settings, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  },

  async changePassword(passwordData) {
    const response = await axios.put(`${API_URL}/change-password`, passwordData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  }
};