// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6757c8b4c0a427baf94dc772.mockapi.io',
  timeout: 10000, // Set timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
