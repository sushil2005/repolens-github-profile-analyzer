import { getLanguageColor } from '@/utils/analytics';
import { formatNumber } from '@/utils/formatters';

export default function LanguageList({ languageStats }) {
  if (languageStats.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Top Languages
        </h2>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No language data available from public repositories.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6 animate-slide-up">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
        Top Languages
      </h2>
      <div className="mt-4 space-y-3">
        {languageStats.slice(0, 8).map((lang) => (
          <div key={lang.language} className="flex items-center gap-3">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: getLanguageColor(lang.language) }}
            />
            <span className="w-28 shrink-0 truncate text-sm font-medium text-gray-700 dark:text-gray-200">
              {lang.language}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: getLanguageColor(lang.language),
                }}
              />
            </div>
            <span className="w-20 shrink-0 text-right text-xs tabular-nums text-gray-500 dark:text-gray-400">
              {formatNumber(lang.count)} · {lang.percentage.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
