// src/api/api.js
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: apiBaseUrl, // FastAPI backend URL
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
