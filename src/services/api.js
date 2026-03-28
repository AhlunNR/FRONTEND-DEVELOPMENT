import axios from 'axios';

// Membuat instance khusus untuk KasFlow
const api = axios.create({
  // URL ini menyesuaikan dengan port backend
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 10000, // Jika server mati, batalkan request setelah 10 detik
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyisipkan token JWT secara otomatis pada setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kasflow_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor response untuk menangani error secara global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired atau tidak valid
      localStorage.removeItem('kasflow_token');
      localStorage.removeItem('kasflow_user');
      // Redirect ke login jika bukan sedang di halaman login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;