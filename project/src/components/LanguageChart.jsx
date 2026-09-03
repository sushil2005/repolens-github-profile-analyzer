import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getLanguageColor } from '@/utils/analytics';

export default function LanguageChart({ languageStats }) {
  const data = languageStats.slice(0, 8);
  const otherCount = languageStats.slice(8).reduce((sum, l) => sum + l.count, 0);

  const chartData = [
    ...data.map((l) => ({ name: l.language, value: l.count })),
    ...(otherCount > 0 ? [{ name: 'Other', value: otherCount }] : []),
  ];

  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="card p-6 animate-slide-up">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
        Language Distribution
      </h2>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Based on repository count, not lines of code.
      </p>

      <div className="relative mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={88}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.name === 'Other' ? '#8b949e' : getLanguageColor(entry.name)}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;
                const item = payload[0].payload;
                const pct = ((item.value / total) * 100).toFixed(1);
                return (
                  <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-white/10 dark:bg-[#161b22]">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                      {item.value} repos · {pct}%
                    </span>
                  </div>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
            {chartData.length}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">languages</span>
        </div>
      </div>
    </div>
  );
}
