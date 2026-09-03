import { ScanSearch, ShieldCheck, Database, Code2, Eye } from 'lucide-react';

const FEATURES = [
  {
    icon: Eye,
    title: 'No Login Required',
    description: 'Analyze any public GitHub profile without authentication. Just enter a username.',
  },
  {
    icon: Database,
    title: 'No Database',
    description: 'RepoLens is entirely frontend. No user data is collected, stored, or transmitted to a server.',
  },
  {
    icon: Code2,
    title: 'Public GitHub API',
    description: 'All data comes directly from the public GitHub REST API. Real, live data — no mocks.',
  },
  {
    icon: ShieldCheck,
    title: 'Frontend-Only Architecture',
    description: 'Built with React, Vite, and Tailwind CSS. Deploys as a static site anywhere.',
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 text-white shadow-lg">
          <ScanSearch className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          About RepoLens
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          RepoLens is a frontend GitHub analytics tool that uses publicly available
          GitHub data to provide a quick overview of developer profiles and repositories.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="card card-hover p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          How It Works
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-600 text-xs font-semibold text-white">
              1
            </span>
            <span>Enter any public GitHub username in the search bar.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-600 text-xs font-semibold text-white">
              2
            </span>
            <span>
              RepoLens fetches the user profile and repositories from the GitHub REST API.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-600 text-xs font-semibold text-white">
              3
            </span>
            <span>
              The app computes language distribution, repository stats, and a Profile Health Score.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-600 text-xs font-semibold text-white">
              4
            </span>
            <span>
              Results are displayed in a clean, responsive analytics dashboard.
            </span>
          </li>
        </ol>
      </div>

      <div className="mt-6 rounded-2xl border border-warning-500/20 bg-warning-500/5 p-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Limitations
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• Subject to GitHub API rate limits (60 requests/hour for unauthenticated requests).</li>
          <li>• Contribution history is not artificially scraped or fabricated.</li>
          <li>• Language distribution is based on repository counts, not lines of code.</li>
          <li>• The Profile Health Score is a transparent frontend metric, not an official GitHub score.</li>
        </ul>
      </div>
    </div>
  );
}
