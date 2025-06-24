import { useState } from 'react';

export default function FormSurat() {
  const [jenis, setJenis] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi kirim data ke backend
    alert(`Jenis: ${jenis}\nDeskripsi: ${deskripsi}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Ajukan Surat</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Jenis Surat:</label><br />
          <select
            value={jenis}
            onChange={e => setJenis(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
            required
          >
            <option value="">-- Pilih Jenis --</option>
            <option value="izin">Surat Izin</option>
            <option value="keterangan">Surat Keterangan</option>
            <option value="permohonan">Surat Permohonan</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Deskripsi Permohonan:</label><br />
          <textarea
            value={deskripsi}
            onChange={e => setDeskripsi(e.target.value)}
            rows="4"
            style={{ width: '100%', padding: '8px' }}
            required
          ></textarea>
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
          Kirim
        </button>
      </form>
    </div>
  );
}
