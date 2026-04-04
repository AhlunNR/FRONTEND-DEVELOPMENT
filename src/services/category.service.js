import api from './api';

/**
 * Service for CRUD operations on transaction categories.
 * Categories are scoped per-profile and filtered by type (income/expense).
 */
export const categoryService = {
  /**
   * Fetch all categories for the active profile.
   * @param {Object} [params={}] - Query filters (type, profile_id).
   * @returns {Promise<Array>} List of category objects.
   */
  getCategories: async (params = {}) => {
    try {
      const response = await api.get('/categories', { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data kategori';
    }
  },

  /**
   * Create a new category.
   * @param {Object} categoryData - { name, type, icon?, color? }
   * @param {Object} [params={}] - Query params (profile_id).
   * @returns {Promise<Object>} The newly created category.
   */
  createCategory: async (categoryData, params = {}) => {
    try {
      const response = await api.post('/categories', categoryData, { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal membuat kategori baru';
    }
  },

  /**
   * Update an existing category.
   * @param {string} id - Category ID.
   * @param {Object} categoryData - Fields to update { name?, icon?, color? }.
   * @param {Object} [params={}] - Query params (profile_id).
   * @returns {Promise<Object>} The updated category.
   */
  updateCategory: async (id, categoryData, params = {}) => {
    try {
      const response = await api.put(`/categories/${id}`, categoryData, { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui kategori';
    }
  },

  /**
   * Delete a category (non-default only).
   * @param {string} id - Category ID.
   * @param {Object} [params={}] - Query params (profile_id).
   * @returns {Promise<Object>} Deletion confirmation.
   */
  deleteCategory: async (id, params = {}) => {
    try {
      const response = await api.delete(`/categories/${id}`, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus kategori';
    }
  },
};
