import api from './api';

/**
 * Service for fetching gamification data (level, badges, daily missions).
 */
export const gamificationService = {
  /** @returns {Promise<Object>} Level, streak, and financial health summary. */
  getSummary: async () => {
    try {
      const response = await api.get('/gamification/summary');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data gamifikasi';
    }
  },

  /** @returns {Promise<Array>} All badges with unlock status and progress. */
  getBadges: async () => {
    try {
      const response = await api.get('/gamification/badges');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data lencana';
    }
  },

  /** @returns {Promise<Object>} Daily missions with completion status. */
  getMissions: async () => {
    try {
      const response = await api.get('/gamification/missions');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data misi harian';
    }
  },
};
