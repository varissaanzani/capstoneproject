import { useParams } from 'react-router-dom';

export default function Download() {
  const { id } = useParams();
  const urlSurat = `/api/surat/download/${id}`; // Contoh

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Unduh Surat #{id}</h1>
      <p>Surat Anda sudah disetujui. Klik tombol di bawah ini untuk mengunduh:</p>
      <a
        href={urlSurat}
        download
        style={{ display: 'inline-block', marginTop: '10px', padding: '10px 20px', backgroundColor: '#17a2b8', color: 'white', textDecoration: 'none' }}
      >
        📥 Download Surat
      </a>
    </div>
  );
}
