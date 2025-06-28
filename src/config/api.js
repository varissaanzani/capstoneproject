import axios from 'axios';
import { getConfig } from './environment.js';

// Konfigurasi API untuk koneksi ke backend menggunakan axios
const API_CONFIG = {
  // URL backend dari environment config
  BASE_URL: getConfig().BACKEND_URL,
  
  // Timeout untuk request (dalam milliseconds)
  TIMEOUT: getConfig().REQUEST_TIMEOUT,
  
  // Headers default
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer YOUR_TOKEN', // Uncomment jika ada authentication
  },
};

// Membuat instance axios dengan konfigurasi
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

// Request interceptor untuk menambahkan headers atau logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor untuk handling error
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Fungsi helper untuk request GET
export const apiGet = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi helper untuk request POST
export const apiPost = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi helper untuk request PUT
export const apiPut = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi helper untuk request PATCH
export const apiPatch = async (endpoint, data) => {
  try {
    const response = await apiClient.patch(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi helper untuk request DELETE
export const apiDelete = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Endpoints untuk surat (sesuaikan dengan backend)
export const SURAT_ENDPOINTS = {
  GET_ALL: '/api/surat',
  GET_BY_ID: (id) => `/api/surat/${id}`,
  CREATE: '/api/surat/ajukan',
  UPDATE: (id) => `/api/surat/${id}`,
  DELETE: (id) => `/api/surat/${id}`,
  UPDATE_STATUS: (id) => `/api/surat/${id}/status`,
  DOWNLOAD: (id) => `/api/surat/${id}/download`,
};

// Export axios instance untuk penggunaan langsung jika diperlukan
export { apiClient };

export default API_CONFIG; 