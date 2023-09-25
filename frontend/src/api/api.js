// src/api/api.js
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_BACKEND_URL;

const apiInstance = axios.create({
  baseURL: apiBaseUrl, // FastAPI backend URL
});

// Include a function to set the authorization token for the API instance
apiInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await localStorage.getItem('token'); // Use await here
      console.log('GETToken:', token);
      if (token) {
        // Initialize config.headers if not already defined
        if (!config.headers) {
          config.headers = {};
        }
        // Initialize config.headers.common if not already defined
        if (!config.headers.common) {
          config.headers.common = {};
        }
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }
      else {
        console.warn('Token not found in localStorage.');
      }
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
      throw error;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchData = async () => {
  try {
    const response = await api.get('/votes');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default apiInstance;
