export default function StatCard({ icon: Icon, label, value, sublabel }) {
  return (
    <div className="card card-hover p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <p className="mt-0.5 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
      {sublabel && (
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{sublabel}</p>
      )}
    </div>
  );
}
