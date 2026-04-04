import api from './api';

/**
 * Service for managing financial saving goals.
 */
export const goalService = {
  /**
   * @param {Object} [params={}] - Query filters.
   * @returns {Promise<Array>} List of financial goals.
   */
  getGoals: async (params = {}) => {
    try {
      const response = await api.get('/goals', { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data tujuan keuangan';
    }
  },

  /**
   * @param {Object} goalData - Goal payload including profile_id.
   * @returns {Promise<Object>} The newly created goal.
   */
  createGoal: async (goalData) => {
    try {
      const response = await api.post('/goals', goalData, { params: { profile_id: goalData.profile_id } });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal membuat tujuan keuangan baru';
    }
  },

  /**
   * @param {string} id - Goal ID.
   * @param {Object} goalData - Updated fields.
   * @returns {Promise<Object>} The updated goal.
   */
  updateGoal: async (id, goalData) => {
    try {
      const response = await api.put(`/goals/${id}`, goalData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui tujuan keuangan';
    }
  },

  /**
   * @param {string} id - Goal ID to delete.
   * @returns {Promise<Object>} Deletion confirmation.
   */
  deleteGoal: async (id) => {
    try {
      const response = await api.delete(`/goals/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus tujuan keuangan';
    }
  },
};
