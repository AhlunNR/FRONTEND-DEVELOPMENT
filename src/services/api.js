import axios from 'axios';

// Membuat instance khusus untuk KasFlow
const api = axios.create({
  // URL ini menyesuaikan dengan port backend temanmu
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 10000, // Jika server mati, batalkan request setelah 10 detik
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;