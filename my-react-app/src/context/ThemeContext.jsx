import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext(null);

// ── Safely read/write localStorage ────────────────────────────────
const safeStorage = {
  get: (key) => {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, val); } catch { /* noop */ }
  },
};

// ── Determine initial mode ─────────────────────────────────────────
const getInitialMode = () => {
  const saved = safeStorage.get('ltce-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

// ── Apply mode to <html> element (no flash) ────────────────────────
const applyMode = (mode) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', mode);
};

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const m = getInitialMode();
    applyMode(m);
    return m;
  });

  const toggleTheme = useCallback(() => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      applyMode(next);
      safeStorage.set('ltce-theme', next);
      return next;
    });
  }, []);

  // Keep data-theme in sync if mode changes externally (e.g. undo)
  useEffect(() => { applyMode(mode); }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, isDark: mode === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);

export default ThemeProvider;
