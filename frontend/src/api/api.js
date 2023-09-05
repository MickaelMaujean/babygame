// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // FastAPI backend URL
});

export const fetchData = async () => {
  try {
    const response = await api.get('/votes'); // your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default api;
