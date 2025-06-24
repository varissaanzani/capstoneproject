import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Riwayat() {
  const [suratList, setSuratList] = useState([]);

  useEffect(() => {
    // Simulasi data fetch
    setSuratList([
      { id: 1, jenis: 'Izin', status: 'Diproses', tanggal: '2025-06-20' },
      { id: 2, jenis: 'Keterangan', status: 'Disetujui', tanggal: '2025-06-18' }
    ]);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Riwayat Permohonan Surat</h1>
      {suratList.map(surat => (
        <div key={surat.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>Surat {surat.jenis}</h3>
          <p>Status: {surat.status}</p>
          <p>Tanggal: {surat.tanggal}</p>
          <Link to={`/detail/${surat.id}`}>Lihat Detail</Link>
        </div>
      ))}
    </div>
  );
}
