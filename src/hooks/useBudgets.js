import { useState, useEffect, useCallback } from 'react';
import { budgetService } from '../services/budget.service';

/**
 * Hook for managing category budgets with CRUD operations.
 * Fetches budgets for the current month/year by default.
 *
 * @param {Object} [initialParams={}] - Initial query filters (profile_id, month, year).
 * @returns {Object} Budget state and mutation functions.
 */
export const useBudgets = (initialParams = {}) => {
  const now = new Date();
  const defaultParams = {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    ...initialParams,
  };

  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(defaultParams);

  const fetchBudgets = useCallback(async () => {
    // Budget API requires profile_id — skip if not available yet
    if (!params.profile_id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await budgetService.getBudgets(params);
      setBudgets(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  const addBudget = async (budgetData) => {
    const newBudget = await budgetService.createBudget(budgetData, {
      profile_id: params.profile_id,
    });
    setBudgets(prev => [newBudget, ...prev]);
    return newBudget;
  };

  const editBudget = async (id, budgetData) => {
    const updated = await budgetService.updateBudget(id, budgetData);
    setBudgets(prev => prev.map(b => b.id === id ? updated : b));
    return updated;
  };

  const removeBudget = async (id) => {
    await budgetService.deleteBudget(id);
    setBudgets(prev => prev.filter(b => b.id !== id));
    return true;
  };

  const updateParams = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  return {
    budgets,
    loading,
    error,
    addBudget,
    editBudget,
    removeBudget,
    refresh: fetchBudgets,
    updateParams,
  };
};
