// Konfigurasi environment untuk switch antara backend dan demo mode
const ENV_CONFIG = {
  // Set ke true untuk menggunakan backend, false untuk demo mode
  USE_BACKEND: true,
  
  // URL backend (akan digunakan jika USE_BACKEND = true)
  BACKEND_URL: 'http://localhost:3000',
  
  // Timeout untuk request (dalam milliseconds)
  REQUEST_TIMEOUT: 10000,
  
  // Retry attempts untuk request yang gagal
  MAX_RETRY_ATTEMPTS: 3,
  
  // Delay antara retry (dalam milliseconds)
  RETRY_DELAY: 1000,
};

// Fungsi untuk mendapatkan konfigurasi berdasarkan environment
export const getConfig = () => {
  // Bisa diubah berdasarkan environment variables atau kondisi lain
  return {
    ...ENV_CONFIG,
    // Contoh: jika ada environment variable
    // USE_BACKEND: process.env.REACT_APP_USE_BACKEND === 'true',
    // BACKEND_URL: process.env.REACT_APP_BACKEND_URL || ENV_CONFIG.BACKEND_URL,
  };
};

// Fungsi untuk mengecek apakah menggunakan backend
export const isUsingBackend = () => {
  return getConfig().USE_BACKEND;
};

// Fungsi untuk mendapatkan URL backend
export const getBackendUrl = () => {
  return getConfig().BACKEND_URL;
};

export default ENV_CONFIG; 