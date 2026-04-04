import { useState, useEffect, useCallback } from 'react';
import { categoryService } from '../services/category.service';

/**
 * Hook for fetching and managing transaction categories from the API.
 *
 * @param {Object} [initialParams={}] - Initial query filters (e.g. { type: 'income' }).
 * @returns {Object} Categories state and mutation functions.
 */
export const useCategories = (initialParams = {}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getCategories(params);
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (categoryData, queryParams = {}) => {
    const newCategory = await categoryService.createCategory(categoryData, queryParams);
    setCategories(prev => [newCategory, ...prev]);
    return newCategory;
  };

  const editCategory = async (id, categoryData, queryParams = {}) => {
    const updated = await categoryService.updateCategory(id, categoryData, queryParams);
    setCategories(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  };

  const removeCategory = async (id, queryParams = {}) => {
    await categoryService.deleteCategory(id, queryParams);
    setCategories(prev => prev.filter(c => c.id !== id));
    return true;
  };

  const updateParams = (newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  };

  /** Convenience getters to split by type */
  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

  return {
    categories,
    incomeCategories,
    expenseCategories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
    refresh: fetchCategories,
    updateParams,
  };
};
