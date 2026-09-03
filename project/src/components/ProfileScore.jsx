import { ShieldCheck, Info } from 'lucide-react';

function getScoreColor(score) {
  if (score >= 80) return { text: 'text-success-600 dark:text-success-400', bg: 'bg-success-500', ring: 'ring-success-500/20' };
  if (score >= 50) return { text: 'text-warning-600 dark:text-warning-400', bg: 'bg-warning-500', ring: 'ring-warning-500/20' };
  return { text: 'text-error-600 dark:text-error-400', bg: 'bg-error-500', ring: 'ring-error-500/20' };
}

export default function ProfileScore({ score, signals }) {
  const colors = getScoreColor(score);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-accent-500" />
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Profile Health
        </h2>
      </div>

      <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              strokeWidth="8"
              className="stroke-gray-200 dark:stroke-white/10"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className={colors.bg}
              style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className={`text-3xl font-bold tabular-nums ${colors.text}`}>
              {score}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">/ 100</span>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-gray-900 dark:text-white">
              RepoLens Profile Health Score
            </span>
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Based on publicly available profile and repository signals.
          </p>

          <div className="mt-4 space-y-2">
            {signals.slice(0, 5).map((signal) => (
              <div key={signal.label} className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">{signal.label}</span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                    <div
                      className={`h-full ${signal.earned > 0 ? 'bg-accent-500' : 'bg-gray-300 dark:bg-white/20'}`}
                      style={{ width: `${(signal.earned / signal.max) * 100}%` }}
                    />
                  </div>
                  <span className="tabular-nums text-gray-400 dark:text-gray-500 w-10 text-right">
                    {signal.earned}/{signal.max}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-lg bg-gray-50 p-3 dark:bg-white/5">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          This is a transparent frontend-only score — not an official GitHub metric.
        </p>
      </div>
    </div>
  );
}
