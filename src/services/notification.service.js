import api from './api';

/**
 * Service for fetching user notifications.
 */
export const notificationService = {
  /**
   * @returns {Promise<Array>} List of notification entries.
   */
  getNotifications: async () => {
    try {
      const response = await api.get('/notifications');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil notifikasi';
    }
  },
};
