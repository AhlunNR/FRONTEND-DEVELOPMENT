import api from './api';

/**
 * Service for managing recurring (scheduled) transactions.
 */
export const recurringService = {
  /**
   * @param {Object} [params={}] - Query filters.
   * @returns {Promise<Array>} List of recurring transaction records.
   */
  getRecurring: async (params = {}) => {
    try {
      const response = await api.get('/recurring', { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data transaksi berulang';
    }
  },

  /**
   * @param {Object} recurringData - Recurring transaction payload including profile_id.
   * @returns {Promise<Object>} The newly created record.
   */
  createRecurring: async (recurringData) => {
    try {
      const response = await api.post('/recurring', recurringData, { params: { profile_id: recurringData.profile_id } });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal membuat transaksi berulang baru';
    }
  },

  /**
   * @param {string} id - Record ID.
   * @param {Object} recurringData - Updated fields.
   * @returns {Promise<Object>} The updated record.
   */
  updateRecurring: async (id, recurringData) => {
    try {
      const response = await api.put(`/recurring/${id}`, recurringData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui transaksi berulang';
    }
  },

  /**
   * @param {string} id - Record ID to delete.
   * @returns {Promise<Object>} Deletion confirmation.
   */
  deleteRecurring: async (id) => {
    try {
      const response = await api.delete(`/recurring/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus transaksi berulang';
    }
  },
};
