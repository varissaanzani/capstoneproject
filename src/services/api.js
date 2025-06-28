import { apiGet, apiPost, apiPut, apiPatch, apiDelete, SURAT_ENDPOINTS } from '../config/api.js';

// GET semua surat
export const getAllSurat = async () => {
  try {
    const response = await apiGet(SURAT_ENDPOINTS.GET_ALL);
    return response;
  } catch (error) {
    console.error('Error fetching all surat:', error);
    throw error;
  }
};

// POST ajukan surat
export const ajukanSurat = async (data) => {
  try {
    const response = await apiPost(SURAT_ENDPOINTS.CREATE, data);
    return response;
  } catch (error) {
    console.error('Error creating surat:', error);
    throw error;
  }
};

// GET detail surat by id
export const getSuratById = async (id) => {
  try {
    const response = await apiGet(SURAT_ENDPOINTS.GET_BY_ID(id));
    return response;
  } catch (error) {
    console.error('Error fetching surat by ID:', error);
    throw error;
  }
};

// DELETE surat by id
export const deleteSurat = async (id) => {
  try {
    const response = await apiDelete(SURAT_ENDPOINTS.DELETE(id));
    return response;
  } catch (error) {
    console.error('Error deleting surat:', error);
    throw error;
  }
};

// UPDATE surat by id (jika backend support)
export const updateSurat = async (id, data) => {
  try {
    const response = await apiPut(SURAT_ENDPOINTS.UPDATE(id), data);
    return response;
  } catch (error) {
    console.error('Error updating surat:', error);
    throw error;
  }
};

// UPDATE status surat
export const updateSuratStatus = async (id, status) => {
  try {
    const response = await apiPatch(SURAT_ENDPOINTS.UPDATE_STATUS(id), { status });
    return response;
  } catch (error) {
    console.error('Error updating surat status:', error);
    throw error;
  }
};

// DOWNLOAD surat (jika backend support)
export const downloadSurat = async (id) => {
  try {
    const response = await apiGet(SURAT_ENDPOINTS.DOWNLOAD(id));
    return response;
  } catch (error) {
    console.error('Error downloading surat:', error);
    throw error;
  }
};

// Export semua fungsi untuk kemudahan import
export default {
  getAllSurat,
  ajukanSurat,
  getSuratById,
  deleteSurat,
  updateSurat,
  updateSuratStatus,
  downloadSurat
}; 