import api from './api';

export const transactionService = {
  // Fungsi untuk mengirim data transaksi baru
  createTransaction: async (transactionData) => {
    try {
      // Ini akan menembak ke POST http://localhost:3000/api/v1/transactions
      const response = await api.post('/transactions', transactionData);
      return response.data;
    } catch (error) {
      // Tangkap pesan error dari backend
      throw error.response?.data?.message || 'Gagal terhubung ke server Backend';
    }
  }
};