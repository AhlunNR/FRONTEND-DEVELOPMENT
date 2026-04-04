import api from './api';

/**
 * Service for product CRUD and stock management (POS module).
 */
export const productService = {
  /**
   * @param {Object} [params={}] - Query filters.
   * @returns {Promise<Array>} List of products.
   */
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data produk';
    }
  },

  /**
   * @param {string} id - Product ID.
   * @returns {Promise<Object>} Product details.
   */
  getProduct: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil detail produk';
    }
  },

  /**
   * @param {Object} productData - Product payload.
   * @returns {Promise<Object>} The created product.
   */
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menambah produk baru';
    }
  },

  /**
   * @param {string} id - Product ID.
   * @param {Object} productData - Updated fields.
   * @returns {Promise<Object>} The updated product.
   */
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui produk';
    }
  },

  /**
   * @param {string} id - Product ID to delete.
   * @returns {Promise<Object>} Deletion confirmation.
   */
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus produk';
    }
  },

  /**
   * Adjust inventory stock level for a product.
   * @param {string} id - Product ID.
   * @param {number} adjustment - Positive to add, negative to subtract.
   * @returns {Promise<Object>} The updated product with new stock level.
   */
  adjustStock: async (id, adjustment) => {
    try {
      const response = await api.patch(`/products/${id}/stock`, { adjustment });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengubah stok produk';
    }
  },
};
