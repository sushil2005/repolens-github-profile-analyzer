import { FolderOpen } from 'lucide-react';

export default function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500">
        <FolderOpen className="h-8 w-8" />
      </div>
      <p className="mt-5 max-w-md text-lg font-medium text-gray-900 dark:text-white">
        {message || 'No public repositories found.'}
      </p>
      <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
        This user may not have any public repositories to analyze.
      </p>
    </div>
  );
}
