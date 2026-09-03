import { useNavigate } from 'react-router-dom';
import { ScanSearch, ShieldCheck, BarChart3, Code2, Github } from 'lucide-react';
import SearchBar from '@/components/SearchBar';

const EXAMPLES = ['torvalds', 'octocat', 'gaearon'];

const FEATURES = [
  { icon: BarChart3, text: 'Repository & language analytics' },
  { icon: ShieldCheck, text: 'No login required' },
  { icon: Code2, text: 'Real public GitHub data' },
];

export default function Home() {
  const navigate = useNavigate();

  function handleSearch(username) {
    navigate(`/analyze/${username.trim().toLowerCase()}`);
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl dark:bg-accent-500/15" />
        </div>

        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 text-white shadow-lg">
            <ScanSearch className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Understand any GitHub profile
            <br />
            <span className="text-gradient">at a glance.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg">
            Analyze repositories, languages, developer activity, and profile signals
            from any public GitHub account.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar onSearch={handleSearch} showRecent={true} />
            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              No login required · Public GitHub data only
            </p>
          </div>

          {/* Example searches */}
          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Try an example
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              {EXAMPLES.map((username) => (
                <button
                  key={username}
                  onClick={() => handleSearch(username)}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-accent-300 hover:text-accent-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-accent-500/50 dark:hover:text-accent-400"
                >
                  <Github className="h-4 w-4" />
                  @{username}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-t border-gray-200/80 dark:border-white/10">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.text} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
