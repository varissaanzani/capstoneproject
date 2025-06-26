import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSuratById } from '../services/api';

export default function DetailSurat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuratDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getSuratById(id);
        const item = res.data.data;
        // Mapping agar field sesuai frontend
        const mapped = item && {
          id: item.id,
          jenis: item.jenisSurat,
          deskripsi: item.keterangan,
          alasan: item.nama,
          tanggal: item.tanggal || '-',
          status: item.status || 'Diproses',
        };
        setSurat(mapped);
      } catch (err) {
        setError('Gagal memuat detail surat. Silakan coba lagi.');
        console.error('Error fetching surat detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSuratDetail();
  }, [id]);

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          <p>Memuat detail surat...</p>
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
            onClick={() => navigate('/riwayat')}
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
            Kembali ke Riwayat
          </button>
        </div>
      </div>
    );
  }

  if (!surat) {
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
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔍</div>
          <p>Surat tidak ditemukan.</p>
          <button 
            onClick={() => navigate('/riwayat')}
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
            Kembali ke Riwayat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '800px', 
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
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '2px solid #e9ecef'
        }}>
          <div>
            <h1 style={{ color: '#2d5c44', margin: '0 0 5px 0' }}>
              Detail Permohonan #{surat.id}
            </h1>
            <p style={{ color: '#666', margin: '0' }}>
              Dibuat pada {formatDate(surat.tanggal)}
            </p>
          </div>
          <span style={{
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold',
            ...getStatusColor(surat.status)
          }}>
            {surat.status}
          </span>
        </div>

        {/* Informasi Surat */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#2d5c44', marginBottom: '15px' }}>📋 Informasi Surat</h3>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#495057' }}>
                  Jenis Surat:
                </p>
                <p style={{ margin: '0', color: '#2d5c44' }}>Surat {surat.jenis}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#495057' }}>
                  Tanggal Pengajuan:
                </p>
                <p style={{ margin: '0', color: '#2d5c44' }}>{formatDate(surat.tanggal)}</p>
              </div>
              {surat.tanggalMulai && (
                <div>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#495057' }}>
                    Tanggal Mulai:
                  </p>
                  <p style={{ margin: '0', color: '#2d5c44' }}>{formatDate(surat.tanggalMulai)}</p>
                </div>
              )}
              {surat.tanggalSelesai && (
                <div>
                  <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#495057' }}>
                    Tanggal Selesai:
                  </p>
                  <p style={{ margin: '0', color: '#2d5c44' }}>{formatDate(surat.tanggalSelesai)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Alasan dan Deskripsi */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#2d5c44', marginBottom: '15px' }}>📝 Detail Permohonan</h3>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <div style={{ marginBottom: '15px' }}>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#495057' }}>
                Alasan Permohonan:
              </p>
              <p style={{ margin: '0', color: '#2d5c44' }}>{surat.alasan}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#495057' }}>
                Deskripsi Detail:
              </p>
              <p style={{ margin: '0', color: '#2d5c44', lineHeight: '1.6' }}>
                {surat.deskripsi}
              </p>
            </div>
          </div>
        </div>

        {/* Komentar Admin */}
        {surat.komentar && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2d5c44', marginBottom: '15px' }}>💬 Komentar Admin</h3>
            <div style={{ 
              backgroundColor: '#e7f3ff', 
              padding: '20px', 
              borderRadius: '8px',
              border: '1px solid #b3d9ff'
            }}>
              <p style={{ margin: '0', color: '#004085', lineHeight: '1.6' }}>
                {surat.komentar}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center',
          paddingTop: '20px',
          borderTop: '2px solid #e9ecef'
        }}>
          <Link to="/riwayat" style={{
            padding: '12px 24px',
            backgroundColor: '#6c757d',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '16px'
          }}>
            ← Kembali ke Riwayat
          </Link>
          {surat.status === 'Disetujui' && (
            <Link to={`/download/${surat.id}`} style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              fontSize: '16px'
            }}>
              📥 Download Surat
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
