import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { getTheme, setTheme } from '@/utils/storage';

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

function applyTheme(theme) {
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', isDark);
}

export default function ThemeToggle() {
  const [theme, setThemeState] = useState('system');

  useEffect(() => {
    const stored = getTheme();
    setThemeState(stored);
    applyTheme(stored);

    if (stored === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme('system');
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  function cycleTheme() {
    const order = ['system', 'light', 'dark'];
    const currentIdx = order.indexOf(theme);
    const next = order[(currentIdx + 1) % order.length];
    setTheme(next);
    setThemeState(next);
    applyTheme(next);
  }

  const Icon = THEME_ICONS[theme] || Monitor;

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Theme: ${theme}. Click to change.`}
      title={`Theme: ${theme}`}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
