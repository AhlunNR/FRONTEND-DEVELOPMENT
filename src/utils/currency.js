/**
 * Format a number as Indonesian Rupiah (IDR) currency string.
 * @param {number} amount - The numeric amount to format.
 * @returns {string} Formatted string, e.g. "Rp 1.500.000".
 */
export const formatIDR = (amount) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
