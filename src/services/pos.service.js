import api from './api';

/**
 * Service for POS (Point of Sale) operations: payment methods, vouchers, orders, and sales reports.
 */
export const posService = {
  // --- Payment Methods ---

  /** @returns {Promise<Array>} Available payment methods. */
  getPaymentMethods: async () => {
    try {
      const response = await api.get('/pos/payment-methods');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil metode pembayaran';
    }
  },

  /**
   * @param {string} name - Payment method name.
   * @returns {Promise<Object>} The created payment method.
   */
  createPaymentMethod: async (name) => {
    try {
      const response = await api.post('/pos/payment-methods', { name });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menambah metode pembayaran';
    }
  },

  /**
   * @param {string} id - Payment method ID to delete.
   * @returns {Promise<Object>} Deletion confirmation.
   */
  deletePaymentMethod: async (id) => {
    try {
      const response = await api.delete(`/pos/payment-methods/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus metode pembayaran';
    }
  },

  // --- Vouchers ---

  /** @returns {Promise<Array>} All vouchers. */
  getVouchers: async () => {
    try {
      const response = await api.get('/pos/vouchers');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data voucher';
    }
  },

  /**
   * @param {Object} voucherData - Voucher payload.
   * @returns {Promise<Object>} The created voucher.
   */
  createVoucher: async (voucherData) => {
    try {
      const response = await api.post('/pos/vouchers', voucherData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal membuat voucher baru';
    }
  },

  /**
   * @param {string} id - Voucher ID.
   * @param {Object} voucherData - Updated fields.
   * @returns {Promise<Object>} The updated voucher.
   */
  updateVoucher: async (id, voucherData) => {
    try {
      const response = await api.put(`/pos/vouchers/${id}`, voucherData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui voucher';
    }
  },

  /**
   * @param {string} id - Voucher ID to delete.
   * @returns {Promise<Object>} Deletion confirmation.
   */
  deleteVoucher: async (id) => {
    try {
      const response = await api.delete(`/pos/vouchers/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus voucher';
    }
  },

  /**
   * @param {string} code - Voucher code to validate.
   * @returns {Promise<Object>} Validated voucher details.
   */
  validateVoucher: async (code) => {
    try {
      const response = await api.post('/pos/vouchers/validate', { code });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Voucher tidak valid';
    }
  },

  // --- Orders ---

  /**
   * @param {Object} [params={}] - Query filters.
   * @returns {Promise<Array>} List of orders.
   */
  getOrders: async (params = {}) => {
    try {
      const response = await api.get('/pos/orders', { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data pesanan';
    }
  },

  /**
   * @param {string} id - Order ID.
   * @returns {Promise<Object>} Order details.
   */
  getOrder: async (id) => {
    try {
      const response = await api.get(`/pos/orders/${id}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil detail pesanan';
    }
  },

  /**
   * @param {Object} orderData - Order payload (items, customer, payment method, voucher).
   * @returns {Promise<Object>} The created order.
   */
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/pos/orders', orderData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal membuat pesanan baru';
    }
  },

  /**
   * @param {string} id - Order ID to cancel.
   * @returns {Promise<Object>} The cancelled order.
   */
  cancelOrder: async (id) => {
    try {
      const response = await api.post(`/pos/orders/${id}/cancel`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal membatalkan pesanan';
    }
  },

  /**
   * @param {string} id - Order ID.
   * @returns {Promise<Object>} Receipt data for printing.
   */
  printReceipt: async (id) => {
    try {
      const response = await api.get(`/pos/orders/${id}/receipt`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mencetak struk';
    }
  },

  // --- Sales Report ---

  /**
   * @param {Object} [params={}] - Date range and other filters.
   * @returns {Promise<Object>} Aggregated sales report.
   */
  getSalesReport: async (params = {}) => {
    try {
      const response = await api.get('/pos/sales-report', { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil laporan penjualan';
    }
  },
};
