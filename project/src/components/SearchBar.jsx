import { useState, useEffect } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { getRecentSearches, clearRecentSearches } from '@/utils/storage';

export default function SearchBar({
  onSearch,
  initialValue = '',
  loading = false,
  showRecent = true,
  compact = false,
}) {
  const [value, setValue] = useState(initialValue);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (showRecent) setRecent(getRecentSearches());
  }, [showRecent]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed && !loading) {
      onSearch(trimmed);
    }
  }

  function handleClear() {
    setValue('');
  }

  function handleClearRecent() {
    clearRecentSearches();
    setRecent([]);
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} role="search" className="relative">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter GitHub username"
            aria-label="GitHub username"
            spellCheck={false}
            autoComplete="off"
            className={`w-full rounded-xl border border-gray-200 bg-white pl-12 pr-32 text-gray-900 placeholder-gray-400 transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 ${
              compact ? 'py-2.5 text-sm' : 'py-4 text-base'
            }`}
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
            {value && !loading && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear input"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={loading || !value.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">Analyze</span>
            </button>
          </div>
        </div>
      </form>

      {showRecent && recent.length > 0 && !loading && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Recent Searches
            </span>
            <button
              onClick={handleClearRecent}
              className="text-xs text-gray-400 transition hover:text-error-500 dark:text-gray-500"
            >
              Clear
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {recent.map((username) => (
              <button
                key={username}
                onClick={() => {
                  setValue(username);
                  onSearch(username);
                }}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:border-accent-300 hover:text-accent-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-accent-500/50 dark:hover:text-accent-400"
              >
                @{username}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
