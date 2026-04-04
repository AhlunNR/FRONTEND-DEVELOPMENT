import api from './api';

/**
 * Service for managing financial profiles (multi-profile system).
 * Each user can have multiple profiles (personal, business) with isolated data.
 */
export const profileService = {
  /**
   * Fetch all profiles for the current user.
   * @returns {Promise<Array>} List of profile objects.
   */
  getProfiles: async () => {
    try {
      const response = await api.get('/profiles');
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengambil data profil';
    }
  },

  /**
   * Create a new financial profile.
   * @param {Object} profileData - { name, type, icon?, color? }
   * @returns {Promise<Object>} The newly created profile.
   */
  createProfile: async (profileData) => {
    try {
      const response = await api.post('/profiles', profileData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal membuat profil baru';
    }
  },

  /**
   * Update an existing profile.
   * @param {string} id - Profile ID.
   * @param {Object} profileData - { name?, icon?, color? }
   * @returns {Promise<Object>} The updated profile.
   */
  updateProfile: async (id, profileData) => {
    try {
      const response = await api.put(`/profiles/${id}`, profileData);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal memperbarui profil';
    }
  },

  /**
   * Delete a profile (cannot be default or last remaining).
   * @param {string} id - Profile ID.
   * @returns {Promise<Object>} Deletion confirmation.
   */
  deleteProfile: async (id) => {
    try {
      const response = await api.delete(`/profiles/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal menghapus profil';
    }
  },

  /**
   * Set a profile as the default.
   * @param {string} id - Profile ID to set as default.
   * @returns {Promise<Object>} The updated profile.
   */
  setDefault: async (id) => {
    try {
      const response = await api.patch(`/profiles/${id}/default`);
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengubah profil default';
    }
  },
};
