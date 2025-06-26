# SIPAS - Sistem Pengajuan Surat

Aplikasi web untuk pengajuan surat mahasiswa dengan React dan Vite.

## 🚀 Fitur Utama

### 1. **Navigasi dan Routing** ✅
- Sistem navigasi dengan React Router
- Menu aktif dengan styling yang konsisten
- Routing untuk 5 halaman utama

### 2. **Halaman Beranda (Dashboard)** ✅
- Menampilkan pengumuman penting
- Informasi terbaru untuk mahasiswa
- Design yang responsif dan modern

### 3. **Form Pengajuan Surat** ✅
- Form yang user-friendly dengan validasi lengkap
- Jenis surat: Izin, Keterangan, Permohonan, Aktif Kuliah
- Validasi real-time dengan feedback error
- Loading states dan success feedback
- Data persistence menggunakan localStorage

### 4. **Riwayat Permohonan** ✅
- Daftar lengkap riwayat pengajuan surat
- Status tracking (Diproses, Disetujui, Ditolak)
- Sorting berdasarkan tanggal terbaru
- Statistik permohonan
- Error handling dan loading states

### 5. **Detail dan Download Surat** ✅
- Detail lengkap setiap permohonan
- Download surat yang sudah disetujui
- Format surat otomatis
- Error handling untuk surat yang belum disetujui

## 🛠️ Perbaikan yang Telah Dilakukan

### ✅ **Error Handling**
- Loading states untuk semua operasi async
- Error messages yang informatif
- Fallback UI untuk berbagai kondisi error
- Retry mechanisms

### ✅ **Form Validation**
- Validasi real-time dengan feedback visual
- Validasi tanggal untuk surat izin
- Minimum character requirements
- Clear error messages

### ✅ **Data Persistence**
- localStorage untuk menyimpan data sementara
- Data tidak hilang saat refresh browser
- Sorting dan filtering data
- Backup data dummy untuk demo

### ✅ **User Experience**
- Loading indicators
- Success feedback
- Confirmation dialogs
- Responsive design
- Consistent styling

### ✅ **Enhanced Features**
- Status color coding
- Date formatting
- File download functionality
- Statistics dashboard
- Clear all data option

## 📦 Instalasi dan Menjalankan

### Prerequisites
- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Setup
```bash
# Clone repository
git clone [repository-url]
cd capstoneproject

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

### Build untuk Production
```bash
npm run build
npm run preview
```

## 🏗️ Struktur Project

```
src/
├── components/
│   └── Navbar.jsx          # Navigation component
├── pages/
│   ├── Beranda.jsx         # Home/Dashboard page
│   ├── FormSurat.jsx       # Letter submission form
│   ├── Riwayat.jsx         # History page
│   ├── DetailSurat.jsx     # Letter detail page
│   └── Download.jsx        # Download page
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## 🎨 Design System

### Color Palette
- Primary: `#2d5c44` (Dark Green)
- Secondary: `#3f785a` (Medium Green)
- Success: `#28a745` (Green)
- Warning: `#ffc107` (Yellow)
- Danger: `#dc3545` (Red)
- Info: `#17a2b8` (Blue)

### Typography
- Font family: System fonts
- Consistent spacing and sizing
- Responsive text sizing

## 📱 Responsive Design

Aplikasi dirancang untuk bekerja dengan baik di:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Teknologi yang Digunakan

- **React 19** - UI Library
- **React Router DOM** - Routing
- **Vite** - Build tool
- **localStorage** - Data persistence
- **CSS-in-JS** - Styling

## 🚧 Status Development

### ✅ Completed
- [x] Basic routing setup
- [x] Form validation
- [x] Error handling
- [x] Loading states
- [x] Data persistence
- [x] Download functionality
- [x] Responsive design
- [x] User feedback

### 🔄 Future Enhancements
- [ ] Backend integration
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] File upload support
- [ ] Advanced filtering
- [ ] Export to PDF
- [ ] Dark mode

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **Varissa** - *Initial work*
- **Farid** - *Initial work*

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the fast build tool
- React Router team for the routing solution
