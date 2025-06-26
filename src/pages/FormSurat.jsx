import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ajukanSurat } from '../services/api';

export default function FormSurat() {
  const [formData, setFormData] = useState({
    nama: '',
    jenis: '',
    deskripsi: '',
    alasan: '',
    tanggalMulai: '',
    tanggalSelesai: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama mahasiswa harus diisi';
    }
    if (!formData.jenis) {
      newErrors.jenis = 'Jenis surat harus dipilih';
    }
    if (!formData.deskripsi.trim()) {
      newErrors.deskripsi = 'Deskripsi permohonan harus diisi';
    } else if (formData.deskripsi.trim().length < 10) {
      newErrors.deskripsi = 'Deskripsi minimal 10 karakter';
    }
    if (!formData.alasan.trim()) {
      newErrors.alasan = 'Alasan permohonan harus diisi';
    }

    if (formData.jenis === 'izin' && !formData.tanggalMulai) {
      newErrors.tanggalMulai = 'Tanggal mulai izin harus diisi';
    }

    if (formData.jenis === 'izin' && !formData.tanggalSelesai) {
      newErrors.tanggalSelesai = 'Tanggal selesai izin harus diisi';
    }

    if (formData.tanggalMulai && formData.tanggalSelesai) {
      const startDate = new Date(formData.tanggalMulai);
      const endDate = new Date(formData.tanggalSelesai);
      if (endDate <= startDate) {
        newErrors.tanggalSelesai = 'Tanggal selesai harus setelah tanggal mulai';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Kirim data ke backend pakai axios
      await ajukanSurat({
        nama: formData.nama,
        jenisSurat: formData.jenis,
        keterangan: formData.deskripsi
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/riwayat');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Terjadi kesalahan saat mengirim permohonan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      jenis: '',
      deskripsi: '',
      alasan: '',
      tanggalMulai: '',
      tanggalSelesai: ''
    });
    setErrors({});
  };

  if (success) {
    return (
      <div style={{ 
        padding: '20px', 
        maxWidth: '600px', 
        margin: 'auto',
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>✅</div>
          <h2 style={{ color: '#28a745', marginBottom: '10px' }}>Permohonan Berhasil!</h2>
          <p>Permohonan surat Anda telah berhasil dikirim dan sedang diproses.</p>
          <p style={{ fontSize: '14px', color: '#666' }}>Mengalihkan ke halaman riwayat...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: 'auto',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#2d5c44', marginBottom: '30px', textAlign: 'center' }}>
          Ajukan Surat
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2d5c44' }}>
              Nama Mahasiswa: *
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap"
              style={{ 
                width: '100%', 
                padding: '12px',
                border: errors.nama ? '2px solid #dc3545' : '2px solid #dee2e6',
                borderRadius: '5px',
                fontSize: '16px'
              }}
              required
            />
            {errors.nama && (
              <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.nama}</p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2d5c44' }}>
              Jenis Surat: *
            </label>
            <select
              name="jenis"
              value={formData.jenis}
              onChange={handleInputChange}
              style={{ 
                width: '100%', 
                padding: '12px',
                border: errors.jenis ? '2px solid #dc3545' : '2px solid #dee2e6',
                borderRadius: '5px',
                fontSize: '16px'
              }}
              required
            >
              <option value="">-- Pilih Jenis Surat --</option>
              <option value="aktif">Surat Keterangan Aktif Kuliah</option>
              <option value="lulus">Surat Keterangan Lulus</option>
              <option value="berhenti">Surat Berhenti Studi Sementara</option>
              <option value="kembali">Surat Aktif Kembali</option>
              <option value="tidakbeasiswa">Surat Keterangan Tidak Menerima Beasiswa</option>
            </select>
            {errors.jenis && (
              <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.jenis}</p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2d5c44' }}>
              Alasan Permohonan: *
            </label>
            <input
              type="text"
              name="alasan"
              value={formData.alasan}
              onChange={handleInputChange}
              placeholder="Contoh: Izin kuliah karena lomba"
              style={{ 
                width: '100%', 
                padding: '12px',
                border: errors.alasan ? '2px solid #dc3545' : '2px solid #dee2e6',
                borderRadius: '5px',
                fontSize: '16px'
              }}
              required
            />
            {errors.alasan && (
              <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.alasan}</p>
            )}
          </div>

          {formData.jenis === 'izin' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2d5c44' }}>
                  Tanggal Mulai: *
                </label>
                <input
                  type="date"
                  name="tanggalMulai"
                  value={formData.tanggalMulai}
                  onChange={handleInputChange}
                  style={{ 
                    width: '100%', 
                    padding: '12px',
                    border: errors.tanggalMulai ? '2px solid #dc3545' : '2px solid #dee2e6',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
                {errors.tanggalMulai && (
                  <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.tanggalMulai}</p>
                )}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2d5c44' }}>
                  Tanggal Selesai: *
                </label>
                <input
                  type="date"
                  name="tanggalSelesai"
                  value={formData.tanggalSelesai}
                  onChange={handleInputChange}
                  style={{ 
                    width: '100%', 
                    padding: '12px',
                    border: errors.tanggalSelesai ? '2px solid #dc3545' : '2px solid #dee2e6',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
                {errors.tanggalSelesai && (
                  <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.tanggalSelesai}</p>
                )}
              </div>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2d5c44' }}>
              Deskripsi Detail: *
            </label>
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              rows="4"
              placeholder="Jelaskan detail permohonan Anda..."
              style={{ 
                width: '100%', 
                padding: '12px',
                border: errors.deskripsi ? '2px solid #dc3545' : '2px solid #dee2e6',
                borderRadius: '5px',
                fontSize: '16px',
                resize: 'vertical'
              }}
              required
            ></textarea>
            {errors.deskripsi && (
              <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>{errors.deskripsi}</p>
            )}
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Minimal 10 karakter. Saat ini: {formData.deskripsi.length} karakter
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              type="button" 
              onClick={resetForm}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
              disabled={loading}
            >
              Reset
            </button>
            <button 
              type="submit" 
              style={{ 
                padding: '12px 24px', 
                backgroundColor: loading ? '#6c757d' : '#28a745', 
                color: 'white', 
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px'
              }}
              disabled={loading}
            >
              {loading ? '⏳ Mengirim...' : '📤 Kirim Permohonan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
