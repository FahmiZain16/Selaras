# 🌸 Aplikasi Skoring Jemparingan — Kelompok Dahlia

Proyek ini merupakan aplikasi web berbasis **React + Vite** dan **Tailwind CSS** yang digunakan untuk mencatat dan menampilkan skor pertandingan **Jemparingan**.  
Aplikasi berfokus pada penggunaan **mobile view** dan tidak menggunakan backend; seluruh data disimpan di **Local Storage** browser.

---

## 👥 Anggota Kelompok Dahlia
1. Diayu Nur Aini  
2. Dhimas Putra Sulistio  
3. Jessy Marcia Anabel  
4. Bobby Rahman Hartanto  
5. Fahmi Abdillah Zain  

---

## 🚀 Tech Stack
- **Framework:** React (Vite)  
- **Styling:** Tailwind CSS  
- **State Management:** React Hooks  
- **Storage:** Local Storage (tanpa backend)  

---

## 🎯 Fitur Utama

### 1. **Leaderboard (Halaman Utama)**
- Menampilkan daftar 10 peserta tetap (P01–P10).  
- Skor awal seluruh peserta adalah 0.  
- Tombol **Input Skor** menuju halaman pemilihan rambahan.  
- Tombol **Detail Skor** menuju halaman tabel rincian skor per rambahan.  
- Urutan leaderboard otomatis berdasarkan total skor tertinggi.  

### 2. **Pemilihan Rambahan**
- Terdapat 20 tombol “Rambahan 1–20”.  
- Setiap tombol mengarah ke halaman input untuk rambahan yang dipilih.  

### 3. **Input Skor**
- Dropdown memilih **pemain (P01–P10)** dan **nomor panah (1–6)**.  
- Dua tombol pilihan warna:
  - 🔴 Merah → +3 poin  
  - ⚪ Putih → +1 poin  
- Tombol **Simpan Skor** akan memperbarui data di Local Storage.  
- Muncul popup konfirmasi dengan dua opsi:
  - “Kembali ke Beranda”  
  - “Input Lainnya” (masih pada rambahan yang sama)  

### 4. **Detail Skor**
- Menampilkan tabel 10×20 (10 peserta × 20 rambahan).  
- Setiap cell berisi format `X/Y`:  
  - `X` = total poin merah (3 × jumlah merah)  
  - `Y` = jumlah panah putih  
- Tersedia tombol kembali ke beranda.  

---

## 🧠 Struktur Data di Local Storage
Disimpan pada key `"scores"` dalam bentuk:
```json
[
  {
    "player": "P01",
    "total": 18,
    "rounds": [
      [3, 3, 1],
      [1, 3],
      ...
    ]
  }
]
