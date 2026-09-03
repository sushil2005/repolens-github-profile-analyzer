import { BookOpen, Star, GitFork, Copy, Clock } from 'lucide-react';
import StatCard from './StatCard';
import { formatNumber } from '@/utils/formatters';

export default function RepositoryStats({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 animate-slide-up">
      <StatCard
        icon={BookOpen}
        label="Public Repos"
        value={formatNumber(stats.totalRepos)}
        sublabel={`${stats.originalRepos} original · ${stats.forkedRepos} forks`}
      />
      <StatCard
        icon={Star}
        label="Total Stars"
        value={formatNumber(stats.totalStars)}
        sublabel="Across all repositories"
      />
      <StatCard
        icon={GitFork}
        label="Total Forks"
        value={formatNumber(stats.totalForks)}
        sublabel="Community usage"
      />
      <StatCard
        icon={Clock}
        label="Recently Updated"
        value={formatNumber(stats.recentlyUpdated)}
        sublabel="Updated within 1 year"
      />
    </div>
  );
}
