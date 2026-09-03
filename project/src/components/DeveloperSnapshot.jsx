import { Lightbulb } from 'lucide-react';

export default function DeveloperSnapshot({ insights }) {
  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-warning-500" />
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Developer Snapshot
        </h2>
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Deterministic insights generated from real profile data.
      </p>

      <ul className="mt-5 space-y-3">
        {insights.map((insight, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-white/5"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
            <span className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {insight}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
