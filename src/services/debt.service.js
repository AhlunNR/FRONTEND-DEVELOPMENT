import api from './api';

/**
 * Service for managing debt (payable) and receivable entries.
 */
export const debtService = {
  /**
   * @param {Object} [params={}] - Query filters.
   * @returns {Promise<Array>} List of debt/receivable records.
   */
  getDebts: async (params = {}) => {
    try {
      const response = await api.get('/debts', { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data hutang/piutang';
    }
  },

  /**
   * @param {Object} debtData - Debt payload including profile_id.
   * @returns {Promise<Object>} The newly created debt record.
   */
  createDebt: async (debtData) => {
    try {
      const response = await api.post('/debts', debtData, { params: { profile_id: debtData.profile_id } });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal membuat hutang/piutang baru';
    }
  },

  /**
   * @param {string} id - Debt record ID.
   * @param {Object} debtData - Updated fields.
   * @returns {Promise<Object>} The updated debt record.
   */
  updateDebt: async (id, debtData) => {
    try {
      const response = await api.put(`/debts/${id}`, debtData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui hutang/piutang';
    }
  },

  /**
   * Record a partial or full payment against a debt.
   * @param {string} id - Debt record ID.
   * @param {number} amount - Payment amount.
   * @returns {Promise<Object>} The updated debt record.
   */
  payDebt: async (id, amount) => {
    try {
      const response = await api.post(`/debts/${id}/pay`, { amount });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mencatat pembayaran hutang';
    }
  },

  /**
   * @param {string} id - Debt record ID to delete.
   * @returns {Promise<Object>} Deletion confirmation.
   */
  deleteDebt: async (id) => {
    try {
      const response = await api.delete(`/debts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus hutang/piutang';
    }
  },
};
