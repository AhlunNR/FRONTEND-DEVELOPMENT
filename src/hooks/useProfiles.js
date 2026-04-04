import { useState, useEffect, useCallback } from 'react';
import { profileService } from '../services/profile.service';

/**
 * Hook for managing financial profiles (multi-profile system).
 * Loads all profiles on mount and tracks the active profile.
 *
 * @returns {Object} Profiles state, active profile, and mutation functions.
 */
export const useProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileService.getProfiles();
      const items = Array.isArray(data) ? data : [];
      setProfiles(items);
      // Auto-select the default profile
      const defaultProfile = items.find(p => p.is_default) || items[0] || null;
      setActiveProfile(defaultProfile);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const switchProfile = (profileId) => {
    const target = profiles.find(p => p.id === profileId);
    if (target) setActiveProfile(target);
  };

  const addProfile = async (profileData) => {
    const newProfile = await profileService.createProfile(profileData);
    setProfiles(prev => [...prev, newProfile]);
    return newProfile;
  };

  const editProfile = async (id, profileData) => {
    const updated = await profileService.updateProfile(id, profileData);
    setProfiles(prev => prev.map(p => p.id === id ? updated : p));
    if (activeProfile?.id === id) setActiveProfile(updated);
    return updated;
  };

  const removeProfile = async (id) => {
    await profileService.deleteProfile(id);
    setProfiles(prev => prev.filter(p => p.id !== id));
    if (activeProfile?.id === id) {
      const remaining = profiles.filter(p => p.id !== id);
      setActiveProfile(remaining.find(p => p.is_default) || remaining[0] || null);
    }
    return true;
  };

  const setDefaultProfile = async (id) => {
    const updated = await profileService.setDefault(id);
    setProfiles(prev =>
      prev.map(p => ({
        ...p,
        is_default: p.id === id,
      }))
    );
    setActiveProfile(updated);
    return updated;
  };

  return {
    profiles,
    activeProfile,
    loading,
    error,
    switchProfile,
    addProfile,
    editProfile,
    removeProfile,
    setDefaultProfile,
    refresh: fetchProfiles,
  };
};
