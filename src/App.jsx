import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Beranda from './pages/Beranda';
import FormSurat from './pages/FormSurat';
import Riwayat from './pages/Riwayat';
import DetailSurat from './pages/DetailSurat';
import Download from './pages/Download';
import AdminSurat from './pages/AdminSurat';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/form" element={<FormSurat />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/detail/:id" element={<DetailSurat />} />
        <Route path="/download/:id" element={<Download />} />
        <Route path="/admin" element={<AdminSurat />} />
      </Routes>
    </>
  );
}

export default App;
