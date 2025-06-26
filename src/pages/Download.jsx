import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSuratById } from '../services/api';

export default function Download() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const fetchSuratData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getSuratById(id);
        setSurat(res.data.data);
      } catch (err) {
        setError('Gagal memuat data surat. Silakan coba lagi.');
        console.error('Error fetching surat data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSuratData();
  }, [id]);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      // Log debug
      console.log('Data surat untuk download:', surat);
      if (!surat || !surat.id || !surat.jenisSurat || !surat.nama || !surat.keterangan || !surat.tanggal) {
        alert('Data surat tidak lengkap. Tidak bisa mengunduh.');
        setDownloading(false);
        return;
      }
      // Generate file teks langsung dari data surat di state
      const suratContent = `
SURAT ${jenisSuratLabel(surat.jenisSurat)}
Nomor: ${surat.id}/FTI/2025

Nama: ${surat.nama}
Jenis Surat: ${jenisSuratLabel(surat.jenisSurat)}
Keterangan: ${surat.keterangan}
Tanggal: ${surat.tanggal}
      `;
      const blob = new Blob([suratContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${jenisSuratLabel(surat.jenisSurat).replace(/ /g, '_')}_${surat.id}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      alert('Surat berhasil diunduh!');
    } catch (err) {
      alert('Gagal mengunduh surat. Silakan coba lagi.');
    } finally {
      setDownloading(false);
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
          <p>Memuat data surat...</p>
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
          <p style={{ color: '#dc3545', marginBottom: '20px' }}>{error}</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={() => navigate('/riwayat')}
              style={{
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
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
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
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>📄</div>
        <h1 style={{ color: '#2d5c44', marginBottom: '10px' }}>
          Unduh {jenisSuratLabel(surat.jenisSurat)} #{surat.id}
        </h1>
        
        <div style={{ 
          backgroundColor: '#d4edda', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #c3e6cb',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#155724', marginBottom: '10px' }}>✅ Surat Disetujui</h3>
          <p style={{ color: '#155724', margin: '0' }}>
            Surat {jenisSuratLabel(surat.jenisSurat)} Anda telah disetujui dan siap untuk diunduh.
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <h4 style={{ color: '#2d5c44', marginBottom: '15px' }}>📋 Informasi Surat:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#495057' }}>
                Jenis Surat:
              </p>
              <p style={{ margin: '0', color: '#2d5c44' }}>{jenisSuratLabel(surat.jenisSurat)}</p>
            </div>
            <div>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#495057' }}>
                Tanggal Pengajuan:
              </p>
              <p style={{ margin: '0', color: '#2d5c44' }}>{surat.tanggal}</p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={{ margin: '0 0 5px 0', fontWeight: 'bold', color: '#495057' }}>
                Alasan:
              </p>
              <p style={{ margin: '0', color: '#2d5c44' }}>{surat.nama}</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            Klik tombol di bawah ini untuk mengunduh surat dalam format teks:
          </p>
          <button
            onClick={handleDownload}
            disabled={downloading}
            style={{
              padding: '15px 30px',
              backgroundColor: downloading ? '#6c757d' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: downloading ? 'not-allowed' : 'pointer',
              fontSize: '18px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 auto'
            }}
          >
            {downloading ? (
              <>
                <span>⏳</span>
                Mengunduh...
              </>
            ) : (
              <>
                <span>📥</span>
                Download Surat
              </>
            )}
          </button>
        </div>

        <div style={{ 
          backgroundColor: '#fff3cd', 
          padding: '15px', 
          borderRadius: '8px',
          border: '1px solid #ffeaa7',
          marginBottom: '30px'
        }}>
          <p style={{ color: '#856404', margin: '0', fontSize: '14px' }}>
            <strong>💡 Tips:</strong> Setelah mengunduh, Anda dapat mencetak surat ini atau menyimpannya sebagai bukti pengajuan.
          </p>
        </div>

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
          <Link to={`/detail/${surat.id}`} style={{
            padding: '12px 24px',
            backgroundColor: '#17a2b8',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '16px'
          }}>
            👁️ Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
