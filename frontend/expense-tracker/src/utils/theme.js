const THEME_KEY = 'theme';

export function getSavedTheme() {
  if (typeof window === 'undefined' || !window.localStorage) return 'light';
  const t = localStorage.getItem(THEME_KEY);
  return t === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // ignore
  }
}

export function toggleTheme() {
  const current = getSavedTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

export default {
  getSavedTheme,
  applyTheme,
  toggleTheme,
};
