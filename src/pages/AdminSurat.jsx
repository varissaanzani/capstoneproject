import { useEffect, useState } from 'react';
import { getAllSurat, updateSuratStatus } from '../services/api';

const statusOptions = ['Diproses', 'Disetujui', 'Ditolak'];

export default function AdminSurat() {
  const [suratList, setSuratList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllSurat();
      const mapped = (res.data.data || []).map((item) => ({
        id: item.id,
        jenis: item.jenisSurat,
        deskripsi: item.keterangan,
        alasan: item.nama,
        tanggal: item.tanggal || '-',
        status: item.status || 'Diproses',
      }));
      setSuratList(mapped);
    } catch (err) {
      setError('Gagal memuat data surat.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateSuratStatus(id, status);
      await fetchData();
    } catch (err) {
      alert('Gagal update status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Memuat data surat...</div>;
  if (error) return <div style={{ padding: 40, color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <h1 style={{ color: '#2d5c44', marginBottom: 30 }}>Admin - Daftar Surat</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
        <thead>
          <tr style={{ background: '#f8f9fa' }}>
            <th style={{ padding: 10, border: '1px solid #dee2e6' }}>ID</th>
            <th style={{ padding: 10, border: '1px solid #dee2e6' }}>Nama</th>
            <th style={{ padding: 10, border: '1px solid #dee2e6' }}>Jenis Surat</th>
            <th style={{ padding: 10, border: '1px solid #dee2e6' }}>Status</th>
            <th style={{ padding: 10, border: '1px solid #dee2e6' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {suratList.map(surat => (
            <tr key={surat.id}>
              <td style={{ padding: 10, border: '1px solid #dee2e6' }}>{surat.id}</td>
              <td style={{ padding: 10, border: '1px solid #dee2e6' }}>{surat.nama}</td>
              <td style={{ padding: 10, border: '1px solid #dee2e6' }}>{surat.jenisSurat}</td>
              <td style={{ padding: 10, border: '1px solid #dee2e6' }}>{surat.status || 'Diproses'}</td>
              <td style={{ padding: 10, border: '1px solid #dee2e6' }}>
                {statusOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleStatusChange(surat.id, opt)}
                    disabled={updatingId === surat.id || (surat.status || 'Diproses') === opt}
                    style={{
                      marginRight: 8,
                      padding: '6px 12px',
                      background: (surat.status || 'Diproses') === opt ? '#6c757d' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      cursor: updatingId === surat.id ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 