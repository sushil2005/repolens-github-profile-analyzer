import { useMemo, useState } from 'react';
import { Star, GitFork, Clock, Search, ArrowUpDown } from 'lucide-react';
import RepositoryCard from './RepositoryCard';

const SORT_OPTIONS = [
  { key: 'stars', label: 'Most Stars', icon: Star },
  { key: 'forks', label: 'Most Forks', icon: GitFork },
  { key: 'updated', label: 'Recently Updated', icon: Clock },
];

export default function TopRepositories({ repos }) {
  const [sortBy, setSortBy] = useState('stars');
  const [query, setQuery] = useState('');

  const sortedAndFiltered = useMemo(() => {
    let result = [...repos];

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description && r.description.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'stars') {
      result.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    } else if (sortBy === 'forks') {
      result.sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0));
    } else {
      result.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
    }

    return result.slice(0, 12);
  }, [repos, sortBy, query]);

  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Top Repositories
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter repositories..."
              aria-label="Filter repositories"
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 sm:w-56"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <ArrowUpDown className="h-4 w-4 shrink-0 text-gray-400" />
            {SORT_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.key}
                  onClick={() => setSortBy(option.key)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    sortBy === option.key
                      ? 'bg-accent-600 text-white'
                      : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {sortedAndFiltered.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>

      {sortedAndFiltered.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
          No repositories match "{query}".
        </p>
      )}
    </div>
  );
}
