import RepositoryCard from './RepositoryCard';

export default function RecentRepositories({ repos }) {
  const recent = repos.slice(0, 6);

  return (
    <div className="card p-6 animate-slide-up">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
        Recently Updated
      </h2>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Latest repository activity from this developer.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recent.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
