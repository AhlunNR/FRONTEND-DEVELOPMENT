import { useState } from 'react';
import { transactionService } from '../services/transaction.service';

/**
 * Hook for OCR receipt scanning functionality.
 * Wraps the scan API call with loading/error state management.
 *
 * @returns {Object} Scan state and actions (scanReceipt, resetScan).
 */
export const useOCR = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);

  const scanReceipt = async (file) => {
    setIsScanning(true);
    setError(null);
    try {
      const result = await transactionService.scanReceipt(file);
      setScanResult(result);
      return result;
    } catch (err) {
      setError(err.message || 'Gagal memindai struk');
      throw err;
    } finally {
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setError(null);
  };

  return {
    scanReceipt,
    isScanning,
    scanResult,
    error,
    resetScan,
  };
};
