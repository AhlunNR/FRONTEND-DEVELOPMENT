import { useState, useEffect } from 'react';

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 * Eliminates the need for manual `resize` event listeners across components.
 *
 * @param {string} query - CSS media query string, e.g. `'(min-width: 768px)'`.
 * @returns {boolean} `true` when the viewport matches the given query.
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 768px)');
 * return isDesktop ? <DesktopView /> : <MobileView />;
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e) => setMatches(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
