import api from './api';

/**
 * Service for CRUD operations on category budgets.
 * Budgets are scoped per-profile with month/year periods.
 */
export const budgetService = {
  /**
   * Fetch budgets for a specific month/year.
   * @param {Object} params - { profile_id, month, year }
   * @returns {Promise<Array>} List of budget objects with category details.
   */
  getBudgets: async (params = {}) => {
    try {
      const response = await api.get('/budgets', { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data anggaran';
    }
  },

  /**
   * Create a new budget rule for a category.
   * @param {Object} budgetData - { category_id, amount, month, year }
   * @param {Object} [params={}] - Query params (profile_id).
   * @returns {Promise<Object>} The newly created budget.
   */
  createBudget: async (budgetData, params = {}) => {
    try {
      const response = await api.post('/budgets', budgetData, { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal membuat anggaran baru';
    }
  },

  /**
   * Update an existing budget amount.
   * @param {string} id - Budget ID.
   * @param {Object} budgetData - { amount }
   * @returns {Promise<Object>} The updated budget.
   */
  updateBudget: async (id, budgetData) => {
    try {
      const response = await api.put(`/budgets/${id}`, budgetData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui anggaran';
    }
  },

  /**
   * Delete a budget.
   * @param {string} id - Budget ID.
   * @returns {Promise<Object>} Deletion confirmation.
   */
  deleteBudget: async (id) => {
    try {
      const response = await api.delete(`/budgets/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus anggaran';
    }
  },
};
