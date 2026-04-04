import api from './api';

/**
 * Service for customer CRUD operations (POS module).
 */
export const customerService = {
  /**
   * @param {Object} [params={}] - Query filters.
   * @returns {Promise<Array>} List of customers.
   */
  getCustomers: async (params = {}) => {
    try {
      const response = await api.get('/customers', { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data pelanggan';
    }
  },

  /**
   * @param {string} id - Customer ID.
   * @returns {Promise<Object>} Customer details.
   */
  getCustomer: async (id) => {
    try {
      const response = await api.get(`/customers/${id}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil detail pelanggan';
    }
  },

  /**
   * @param {Object} customerData - Customer payload.
   * @returns {Promise<Object>} The created customer.
   */
  createCustomer: async (customerData) => {
    try {
      const response = await api.post('/customers', customerData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menambah pelanggan baru';
    }
  },

  /**
   * @param {string} id - Customer ID.
   * @param {Object} customerData - Updated fields.
   * @returns {Promise<Object>} The updated customer.
   */
  updateCustomer: async (id, customerData) => {
    try {
      const response = await api.put(`/customers/${id}`, customerData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui pelanggan';
    }
  },

  /**
   * @param {string} id - Customer ID to delete.
   * @returns {Promise<Object>} Deletion confirmation.
   */
  deleteCustomer: async (id) => {
    try {
      const response = await api.delete(`/customers/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus pelanggan';
    }
  },
};
