import { apiGet, apiPost, apiPut, apiDelete, SURAT_ENDPOINTS } from '../config/api.js';
import { isUsingBackend } from '../config/environment.js';

// Service untuk mengelola data surat
export const suratService = {
  // Mengambil semua data surat
  async getAllSurat() {
    try {
      const response = await apiGet(SURAT_ENDPOINTS.GET_ALL);
      return response;
    } catch (error) {
      console.error('Error fetching all surat:', error);
      throw error;
    }
  },

  // Mengambil data surat berdasarkan ID
  async getSuratById(id) {
    try {
      const response = await apiGet(SURAT_ENDPOINTS.GET_BY_ID(id));
      return response;
    } catch (error) {
      console.error(`Error fetching surat with id ${id}:`, error);
      throw error;
    }
  },

  // Membuat surat baru
  async createSurat(suratData) {
    try {
      const response = await apiPost(SURAT_ENDPOINTS.CREATE, suratData);
      return response;
    } catch (error) {
      console.error('Error creating surat:', error);
      throw error;
    }
  },

  // Mengupdate data surat
  async updateSurat(id, suratData) {
    try {
      const response = await apiPut(SURAT_ENDPOINTS.UPDATE(id), suratData);
      return response;
    } catch (error) {
      console.error(`Error updating surat with id ${id}:`, error);
      throw error;
    }
  },

  // Menghapus data surat
  async deleteSurat(id) {
    try {
      const response = await apiDelete(SURAT_ENDPOINTS.DELETE(id));
      return response;
    } catch (error) {
      console.error(`Error deleting surat with id ${id}:`, error);
      throw error;
    }
  },

  // Download surat
  async downloadSurat(id) {
    try {
      const response = await fetch(`${SURAT_ENDPOINTS.DOWNLOAD(id)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.blob();
    } catch (error) {
      console.error(`Error downloading surat with id ${id}:`, error);
      throw error;
    }
  },
};

// Fallback service untuk demo (jika backend belum tersedia)
export const demoService = {
  async getAllSurat() {
    // Simulasi delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Data dummy
    return [
      { 
        id: 1, 
        jenis: 'Izin', 
        status: 'Diproses', 
        tanggal: '2025-06-20', 
        deskripsi: 'Izin kuliah karena lomba',
        alasan: 'Izin kuliah karena lomba programming',
        createdAt: '2025-06-20T10:30:00.000Z'
      },
      { 
        id: 2, 
        jenis: 'Keterangan', 
        status: 'Disetujui', 
        tanggal: '2025-06-18', 
        deskripsi: 'Surat aktif kuliah',
        alasan: 'Untuk keperluan beasiswa',
        createdAt: '2025-06-18T14:20:00.000Z'
      },
      { 
        id: 3, 
        jenis: 'Permohonan', 
        status: 'Ditolak', 
        tanggal: '2025-06-15', 
        deskripsi: 'Permohonan cuti akademik',
        alasan: 'Cuti untuk fokus skripsi',
        createdAt: '2025-06-15T09:15:00.000Z'
      }
    ];
  },

  async getSuratById(id) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      id: parseInt(id),
      jenis: 'Izin',
      alasan: 'Izin kuliah karena lomba',
      deskripsi: 'Saya memohon izin untuk tidak mengikuti kuliah pada tanggal 25-26 Juni 2025 karena akan mengikuti lomba programming tingkat nasional di Jakarta.',
      status: 'Disetujui',
      tanggal: '2025-06-20',
      tanggalMulai: '2025-06-25',
      tanggalSelesai: '2025-06-26',
      komentar: 'Surat izin disetujui. Silakan ambil surat di dekanat.',
      createdAt: '2025-06-20T10:30:00.000Z'
    };
  },

  async createSurat(suratData) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulasi penyimpanan ke localStorage
    const existingData = JSON.parse(localStorage.getItem('suratData') || '[]');
    const newSurat = {
      id: Date.now(),
      ...suratData,
      status: 'Diproses',
      tanggal: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('suratData', JSON.stringify([...existingData, newSurat]));
    
    return newSurat;
  },
};

// Service utama yang akan digunakan (backend atau demo)
const mainService = isUsingBackend() ? suratService : demoService;

export default mainService; 