const THEME_KEY = 'repolens-theme';
const RECENT_SEARCHES_KEY = 'repolens-recent-searches';
const MAX_RECENT = 5;

export function getTheme() {
  return localStorage.getItem(THEME_KEY) || 'system';
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function getRecentSearches() {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(username) {
  const normalized = username.trim().toLowerCase();
  if (!normalized) return;
  const current = getRecentSearches();
  const filtered = current.filter((s) => s !== normalized);
  const updated = [normalized, ...filtered].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  return updated;
}

export function clearRecentSearches() {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
}

export function removeRecentSearch(username) {
  const current = getRecentSearches();
  const filtered = current.filter((s) => s !== username);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered));
  return filtered;
}
