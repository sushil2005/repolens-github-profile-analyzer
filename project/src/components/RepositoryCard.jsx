import { Github, Star, GitFork, Clock, ExternalLink } from 'lucide-react';
import { getLanguageColor } from '@/utils/analytics';
import { formatRelativeTime, formatNumber, truncate } from '@/utils/formatters';

export default function RepositoryCard({ repo }) {
  return (
    <div className="card card-hover group flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1"
        >
          <h3 className="truncate text-base font-semibold text-accent-600 transition group-hover:text-accent-700 dark:text-accent-400 dark:group-hover:text-accent-300">
            {repo.name}
          </h3>
        </a>
        <div className="flex shrink-0 items-center gap-1.5">
          {repo.fork && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500 dark:bg-white/5 dark:text-gray-400">
              <GitFork className="h-3 w-3" />
              Fork
            </span>
          )}
          {repo.archived && (
            <span className="inline-flex items-center gap-1 rounded-full bg-warning-500/10 px-2.5 py-1 text-xs font-medium text-warning-600 dark:text-warning-400">
              Archived
            </span>
          )}
        </div>
      </div>

      {repo.description && (
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {truncate(repo.description, 140)}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {formatNumber(repo.stargazers_count || 0)}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" />
          {formatNumber(repo.forks_count || 0)}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {formatRelativeTime(repo.updated_at)}
        </span>
      </div>

      <div className="mt-4 pt-1">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition hover:text-accent-600 dark:text-gray-400 dark:hover:text-accent-400"
        >
          <Github className="h-3.5 w-3.5" />
          View Repository
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
