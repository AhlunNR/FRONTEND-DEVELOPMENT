/**
 * Format an ISO date string into a localized Indonesian date.
 * @param {string} dateString - ISO 8601 date string.
 * @returns {string} Formatted date, e.g. "Kam, 04 Apr 2026".
 */
export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
