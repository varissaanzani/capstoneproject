import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllSurat } from '../services/api';

export default function Riwayat() {
  const [suratList, setSuratList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getAllSurat();
        // Mapping data agar field sesuai dengan frontend
        const mapped = (res.data.data || []).map((item) => ({
          id: item.id,
          jenis: item.jenisSurat,
          deskripsi: item.keterangan,
          alasan: item.nama,
          tanggal: item.tanggal || '-', // jika backend belum ada tanggal
          status: item.status || 'Diproses', // Ambil status dari backend
        }));
        setSuratList(mapped);
      } catch (err) {
        setError('Gagal memuat data riwayat surat. Silakan coba lagi.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Disetujui':
        return { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };
      case 'Diproses':
        return { backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeaa7' };
      case 'Ditolak':
        return { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };
      default:
        return { backgroundColor: '#f8f9fa', color: '#6c757d', border: '1px solid #dee2e6' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === '-') return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const clearAllData = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data riwayat? Tindakan ini tidak dapat dibatalkan.')) {
      localStorage.removeItem('suratData');
      setSuratList([]);
    }
  };

  const jenisSuratLabel = (jenis) => {
    switch (jenis) {
      case 'aktif':
        return 'Surat Keterangan Aktif Kuliah';
      case 'lulus':
        return 'Surat Keterangan Lulus';
      case 'berhenti':
        return 'Surat Berhenti Studi Sementara';
      case 'kembali':
        return 'Surat Aktif Kembali';
      case 'tidakbeasiswa':
        return 'Surat Keterangan Tidak Menerima Beasiswa';
      default:
        return jenis;
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
          <p>Memuat riwayat surat...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>❌</div>
          <p style={{ color: '#dc3545' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (suratList.length === 0) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>📭</div>
          <p>Belum ada riwayat pengajuan surat.</p>
          <Link to="/form" style={{
            display: 'inline-block',
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>
            Ajukan Surat Pertama
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ color: '#2d5c44', margin: '0' }}>Riwayat Permohonan Surat</h1>
        <button 
          onClick={clearAllData}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🗑️ Hapus Semua
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '8px',
        marginBottom: '20px',
        border: '1px solid #e9ecef'
      }}>
        <p style={{ margin: '0', color: '#495057', fontSize: '14px' }}>
          📊 Total: {suratList.length} permohonan | 
          ✅ Disetujui: {suratList.filter(s => s.status === 'Disetujui').length} | 
          ⏳ Diproses: {suratList.filter(s => s.status === 'Diproses').length} | 
          ❌ Ditolak: {suratList.filter(s => s.status === 'Ditolak').length}
        </p>
      </div>

      {suratList.map(surat => (
        <div key={surat.id} style={{ 
          border: '1px solid #dee2e6', 
          borderRadius: '8px',
          padding: '15px', 
          margin: '15px 0',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <h3 style={{ margin: '0', color: '#2d5c44' }}>Surat {jenisSuratLabel(surat.jenis)}</h3>
            <span style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              ...getStatusColor(surat.status)
            }}>
              {surat.status}
            </span>
          </div>
          <p style={{ margin: '5px 0', color: '#666' }}>📅 {formatDate(surat.tanggal)}</p>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>📝 {surat.alasan || surat.deskripsi}</p>
          <div style={{ marginTop: '10px' }}>
            <Link to={`/detail/${surat.id}`} style={{
              color: '#007bff',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              👁️ Lihat Detail
            </Link>
            {surat.status === 'Disetujui' && (
              <Link to={`/download/${surat.id}`} style={{
                color: '#28a745',
                textDecoration: 'none',
                fontSize: '14px',
                marginLeft: '15px'
              }}>
                📥 Download
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
