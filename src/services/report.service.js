import api from './api';

/**
 * Service for downloading financial reports as PDF or CSV.
 */
export const reportService = {
  /**
   * Generate and trigger download of a PDF report.
   * @param {Object} [params={}] - Date range and other report filters.
   */
  downloadPDF: async (params = {}) => {
    try {
      const response = await api.get('/reports/export/pdf', {
        params,
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Laporan_KasFlow_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengunduh PDF';
    }
  },

  /**
   * Generate and trigger download of a CSV report.
   * @param {Object} [params={}] - Date range and other report filters.
   */
  downloadCSV: async (params = {}) => {
    try {
      const response = await api.get('/reports/export/csv', {
        params,
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Laporan_KasFlow_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      throw error.response?.data?.message || 'Gagal mengunduh CSV';
    }
  },
};
