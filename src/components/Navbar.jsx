import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navLink = {
    marginLeft: '20px',
    fontWeight: 'bold',
    color: '#2d5c44',
    textDecoration: 'none'
  };

  const activeStyle = {
    backgroundColor: '#3f785a',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '5px',
    boxShadow: '0 2px 3px rgba(0,0,0,0.2)'
  };

  const location = useLocation(); // untuk tahu halaman mana yang aktif

  return (
    <header style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', backgroundColor: '#eeeeee' }}>
      <img src="/fti.png" alt="FTI Logo" style={{ height: '40px', marginRight: '20px' }} />
      <div style={{ flexGrow: 1 }}></div>
      <nav>
        <Link to="/" style={location.pathname === '/' ? { ...navLink, ...activeStyle } : navLink}>Beranda</Link>
        <Link to="/form" style={location.pathname === '/form' ? { ...navLink, ...activeStyle } : navLink}>Ajukan</Link>
        <Link to="/riwayat" style={location.pathname === '/riwayat' ? { ...navLink, ...activeStyle } : navLink}>Riwayat</Link>
      </nav>
    </header>
  );
}
