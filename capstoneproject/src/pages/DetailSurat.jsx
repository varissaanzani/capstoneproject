import { useParams } from 'react-router-dom';

export default function DetailSurat() {
  const { id } = useParams();

  // Data dummy
  const data = {
    jenis: 'Izin',
    deskripsi: 'Ingin izin kuliah karena lomba',
    status: 'Disetujui',
    komentar: 'Silakan ambil surat di dekanat'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Detail Permohonan #{id}</h1>
      <p><strong>Jenis Surat:</strong> {data.jenis}</p>
      <p><strong>Deskripsi:</strong> {data.deskripsi}</p>
      <p><strong>Status:</strong> {data.status}</p>
      <p><strong>Komentar Admin:</strong> {data.komentar}</p>
    </div>
  );
}
