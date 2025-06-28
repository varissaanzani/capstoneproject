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
      const mapped = (res.data || []).map((item) => ({
        id: item.id,
        nama: item.nama,
        jenis: item.jenisSurat,
        deskripsi: item.keterangan,
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
              <td style={{ padding: 10, border: '1px solid #dee2e6' }}>{surat.jenis}</td>
              <td style={{ padding: 10, border: '1px solid #dee2e6' }}>{surat.status || 'Diproses'}</td>
              <td style={{ padding: 10, border: '1px solid #dee2e6' }}>
                <select
                  value={surat.status || 'Diproses'}
                  onChange={(e) => handleStatusChange(surat.id, e.target.value)}
                  disabled={updatingId === surat.id}
                  style={{ padding: '5px', borderRadius: '3px' }}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {updatingId === surat.id && <span style={{ marginLeft: '10px' }}>Updating...</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 