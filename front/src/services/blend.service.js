import axios from 'axios';

const API_URL = 'http://localhost:3000/blendpage';

export const blendService = {
  async createBlend(formData) {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  async getBlends() {
    const response = await axios.get(`${API_URL}/list`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data;
  }
};