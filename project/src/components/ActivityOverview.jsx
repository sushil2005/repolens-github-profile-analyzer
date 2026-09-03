import { Activity, TrendingUp, Calendar } from 'lucide-react';
import { formatRelativeTime, formatDate } from '@/utils/formatters';

export default function ActivityOverview({ repos }) {
  if (repos.length === 0) return null;

  const sorted = [...repos].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  const lastActivity = sorted[0];
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const activeRepos = repos.filter((r) => new Date(r.updated_at) > oneYearAgo).length;

  // Calculate update frequency (updates per month over last year)
  const recentUpdates = repos.filter((r) => new Date(r.updated_at) > oneYearAgo);
  const updatesPerMonth = (recentUpdates.length / 12).toFixed(1);

  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex items-center gap-2">
        <Activity className="h-5 w-5 text-accent-500" />
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Activity Overview
        </h2>
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Repository activity signals from public GitHub data.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/5">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Last Activity
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            {formatRelativeTime(lastActivity.updated_at)}
          </p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {lastActivity.name}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/5">
          <div className="flex items-center gap-2 text-gray-400">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Active Repos
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            {activeRepos} / {repos.length}
          </p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Updated within 1 year
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/5">
          <div className="flex items-center gap-2 text-gray-400">
            <Activity className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">
              Update Frequency
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            {updatesPerMonth} / month
          </p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Average over last year
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Recent Updates Timeline
        </h3>
        <div className="mt-3 space-y-2.5">
          {sorted.slice(0, 5).map((repo) => (
            <div key={repo.id} className="flex items-center justify-between text-sm">
              <span className="truncate text-gray-600 dark:text-gray-300">
                {repo.name}
              </span>
              <span className="shrink-0 pl-3 text-xs tabular-nums text-gray-400 dark:text-gray-500">
                {formatDate(repo.updated_at)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
