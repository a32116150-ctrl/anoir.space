import { useState, useEffect, useCallback } from 'react';
import { getActiveSeason } from '../data/seasons';

const STORAGE_KEY = 'anoir-seasonal-theme-enabled';

export const useSeasonalTheme = () => {
  const [enabled, setEnabled] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored !== 'false'; // default to true
  });

  const [activeSeason, setActiveSeason] = useState(() => getActiveSeason());

  // Re-check every hour in case date changes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSeason(getActiveSeason());
    }, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleEnabled = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const shouldApply = enabled && activeSeason !== null;

  return {
    enabled,
    toggleEnabled,
    activeSeason,
    shouldApply,
  };
};
