import React from 'react';

export default function Beranda() {
  const boxStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #4b8b6b',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const pengumumanList = [
    {
      tanggal: '21 Juni 2025',
      judul: 'Batas Pengajuan Surat Cuti Akademik',
      isi: 'Pengajuan cuti akademik semester ganjil akan ditutup pada tanggal 25 Juni 2025. Mahasiswa diimbau untuk segera mengajukan melalui sistem SIPAS.'
    },
    {
      tanggal: '19 Juni 2025',
      judul: 'Surat Aktif Kuliah',
      isi: 'Mahasiswa yang memerlukan surat aktif kuliah untuk keperluan beasiswa harap mengajukan paling lambat tanggal 24 Juni 2025.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#eeeeee', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ padding: '20px', maxWidth: '1000px', margin: 'auto', flexGrow: 1 }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#2d5c44', marginBottom: '20px' }}>Pengumuman!</h1>

        {pengumumanList.map((item, index) => (
          <div key={index} style={boxStyle}>
            <p style={{ fontSize: '14px', color: '#666' }}>📅 {item.tanggal}</p>
            <h3 style={{ fontSize: '20px', color: '#2d5c44', margin: '5px 0' }}>{item.judul}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{item.isi}</p>
          </div>
        ))}
      </main>

      <footer style={{ backgroundColor: '#3f785a', color: 'white', textAlign: 'center', padding: '12px 0', fontSize: '14px' }}>
        © Capstone Project Varissa-Farid
      </footer>
    </div>
  );
}
