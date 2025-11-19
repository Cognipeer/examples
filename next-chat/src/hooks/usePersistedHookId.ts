'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'cognipeer_hook_id';

/**
 * Custom hook to persist and retrieve hookId from localStorage
 * @returns {[string, (value: string) => void]} Tuple of [hookId, setHookId]
 */
export function usePersistedHookId(): [string, (value: string) => void] {
  const [hookId, setHookIdState] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setHookIdState(saved);
    }
  }, []);

  // Setter that also persists to localStorage
  const setHookId = (value: string) => {
    setHookIdState(value);
    if (value.trim()) {
      localStorage.setItem(STORAGE_KEY, value);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return [hookId, setHookId];
}
