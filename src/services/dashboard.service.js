import api from './api';

/**
 * Service for fetching aggregated dashboard data (summary, charts, recent activity).
 */
export const dashboardService = {
  /** @returns {Promise<Object>} Financial summary (income, expense, balance, profit/loss). */
  getSummary: async () => {
    try {
      const response = await api.get('/dashboard/summary');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to load dashboard summary';
    }
  },

  /** @returns {Promise<Array>} Time-series chart data. */
  getChart: async () => {
    try {
      const response = await api.get('/dashboard/chart');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to load chart data';
    }
  },

  /**
   * @param {number} [limit=5] - Maximum number of recent transactions.
   * @returns {Promise<Array>} Recent transaction entries.
   */
  getRecentTransactions: async (limit = 5) => {
    try {
      const response = await api.get(`/dashboard/recent?limit=${limit}`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to load recent transactions';
    }
  },

  /** @returns {Promise<Array>} Top spending categories. */
  getTopCategories: async () => {
    try {
      const response = await api.get('/dashboard/top-categories');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to load top categories';
    }
  },
};
