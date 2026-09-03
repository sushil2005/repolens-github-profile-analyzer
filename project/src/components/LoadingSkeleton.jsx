export function SkeletonCard({ className = '' }) {
  return (
    <div className={`card p-5 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-20 rounded" />
          <div className="skeleton h-5 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonLine({ width = 'w-full', height = 'h-4' }) {
  return <div className={`skeleton ${width} ${height} rounded`} />;
}

export function ProfileHeaderSkeleton() {
  return (
    <div className="card p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="skeleton h-24 w-24 rounded-2xl" />
        <div className="flex-1 space-y-3">
          <div className="skeleton h-6 w-48 rounded" />
          <div className="skeleton h-4 w-32 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
          <div className="flex gap-3 pt-2">
            <div className="skeleton h-6 w-20 rounded-full" />
            <div className="skeleton h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="card p-6">
      <div className="skeleton mb-6 h-5 w-40 rounded" />
      <div className="flex items-center justify-center py-8">
        <div className="skeleton h-48 w-48 rounded-full" />
      </div>
    </div>
  );
}

export function RepoCardSkeleton() {
  return (
    <div className="card p-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="skeleton h-5 w-40 rounded" />
          <div className="skeleton h-5 w-12 rounded-full" />
        </div>
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex gap-4 pt-2">
          <div className="skeleton h-4 w-16 rounded" />
          <div className="skeleton h-4 w-16 rounded" />
          <div className="skeleton h-4 w-20 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <ProfileHeaderSkeleton />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <ChartSkeleton />
        <div className="card p-6 lg:col-span-2">
          <div className="skeleton mb-6 h-5 w-32 rounded" />
          <div className="grid gap-4 sm:grid-cols-2">
            <RepoCardSkeleton />
            <RepoCardSkeleton />
            <RepoCardSkeleton />
            <RepoCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
