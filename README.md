# Film Recommendation App

Aplikasi rekomendasi film modern dibangun dengan React + TypeScript + shadcn/ui, menggunakan TMDb API.

## Fitur

- 🎬 **Discover Movies** - Filter berdasarkan genre, tahun, rating
- 🔍 **Search** - Pencarian film real-time
- 📋 **Watchlist** - Simpan film favorit (localStorage)
- 🎯 **Rekomendasi Personal** - "For You" berdasarkan watchlist
- 📱 **Responsive Design** - UI yang indah di semua perangkat

## Tech Stack

React 19 • TypeScript • Vite • React Router • TanStack Query • Zustand • Tailwind CSS • shadcn/ui • TMDb API

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Setup API Key:**
   - Buat file `.env` di root directory
   - Dapatkan API key dari [TMDb](https://www.themoviedb.org/settings/api)
   - Tambahkan ke `.env`:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

3. **Jalankan aplikasi:**
```bash
npm run dev
```

Buka `http://localhost:5173` di browser.

## Scripts

- `npm run dev` - Development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Struktur Proyek

```
src/
  api/          # TMDb API client
  components/   # UI components
  hooks/        # Custom hooks
  pages/        # Halaman aplikasi
  store/        # State management (Zustand)
  utils/        # Utility functions
```

## Catatan

- Watchlist disimpan di localStorage (persist)
- Data di-cache menggunakan React Query untuk performa optimal
- Untuk production, gunakan backend proxy untuk menyembunyikan API key

## License

MIT
