import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Ganti jika backend beda port
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET semua surat
export const getAllSurat = () => API.get('/api/surat');

// POST ajukan surat
export const ajukanSurat = (data) => API.post('/api/surat/ajukan', data);

// GET detail surat by id
export const getSuratById = (id) => API.get(`/api/surat/${id}`);

// DELETE surat by id
export const deleteSurat = (id) => API.delete(`/api/surat/${id}`);

// (Opsional) UPDATE surat by id (jika backend support)
export const updateSurat = (id, data) => API.put(`/api/surat/${id}`, data);

export const updateSuratStatus = (id, status) =>
  API.patch(`/api/surat/${id}/status`, { status });

export default API; 