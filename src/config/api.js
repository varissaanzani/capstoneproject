import { getConfig } from './environment.js';

// Konfigurasi API untuk koneksi ke backend
const API_CONFIG = {
  // URL backend dari environment config
  BASE_URL: getConfig().BACKEND_URL,
  
  // Headers default
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer YOUR_TOKEN', // Uncomment jika ada authentication
  },
  
  // Timeout untuk request (dalam milliseconds)
  TIMEOUT: getConfig().REQUEST_TIMEOUT,
};

// Fungsi untuk membuat request ke API
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      ...API_CONFIG.DEFAULT_HEADERS,
      ...options.headers,
    },
    timeout: API_CONFIG.TIMEOUT,
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Fungsi helper untuk request GET
export const apiGet = (endpoint) => {
  return apiRequest(endpoint, { method: 'GET' });
};

// Fungsi helper untuk request POST
export const apiPost = (endpoint, data) => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Fungsi helper untuk request PUT
export const apiPut = (endpoint, data) => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// Fungsi helper untuk request DELETE
export const apiDelete = (endpoint) => {
  return apiRequest(endpoint, { method: 'DELETE' });
};

// Endpoints untuk surat (sesuaikan dengan backend teman Anda)
export const SURAT_ENDPOINTS = {
  GET_ALL: '/api/surat',
  GET_BY_ID: (id) => `/api/surat/${id}`,
  CREATE: '/api/surat',
  UPDATE: (id) => `/api/surat/${id}`,
  DELETE: (id) => `/api/surat/${id}`,
  DOWNLOAD: (id) => `/api/surat/${id}/download`,
};

export default API_CONFIG; 