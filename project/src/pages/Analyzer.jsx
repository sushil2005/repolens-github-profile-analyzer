import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, Search } from 'lucide-react';
import { fetchCompleteProfile } from '@/services/githubApi';
import {
  calculateLanguageStats,
  calculateRepoStats,
  calculateProfileScore,
  generateDeveloperSnapshot,
} from '@/utils/analytics';
import { addRecentSearch } from '@/utils/storage';
import { formatNumber } from '@/utils/formatters';

import SearchBar from '@/components/SearchBar';
import ProfileHeader from '@/components/ProfileHeader';
import StatCard from '@/components/StatCard';
import ProfileScore from '@/components/ProfileScore';
import LanguageChart from '@/components/LanguageChart';
import LanguageList from '@/components/LanguageList';
import RepositoryStats from '@/components/RepositoryStats';
import TopRepositories from '@/components/TopRepositories';
import RecentRepositories from '@/components/RecentRepositories';
import DeveloperSnapshot from '@/components/DeveloperSnapshot';
import ActivityOverview from '@/components/ActivityOverview';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { BookOpen, Users, UserCheck, CalendarDays } from 'lucide-react';

export default function Analyzer() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  const loadProfile = useCallback(async (name) => {
    if (!name) return;
    setLoading(true);
    setError(null);
    setProfile(null);
    setRepos([]);

    try {
      const { profile: profileData, repos: reposData } = await fetchCompleteProfile(name);
      setProfile(profileData);
      setRepos(reposData);
      addRecentSearch(name);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (username) {
      loadProfile(username);
    }
  }, [username, loadProfile]);

  function handleSearch(name) {
    navigate(`/analyze/${name.trim().toLowerCase()}`);
  }

  function handleExport() {
    if (!profile) return;
    const stats = calculateRepoStats(repos);
    const languageStats = calculateLanguageStats(repos);
    const { score } = calculateProfileScore(profile, repos);
    const topRepos = [...repos]
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 10)
      .map((r) => ({
        name: r.name,
        url: r.html_url,
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        language: r.language,
      }));

    const summary = {
      username: profile.login,
      name: profile.name,
      profileUrl: profile.html_url,
      repositoryCount: stats.totalRepos,
      followers: profile.followers,
      following: profile.following,
      totalStars: stats.totalStars,
      totalForks: stats.totalForks,
      topLanguages: languageStats.slice(0, 5).map((l) => ({
        language: l.language,
        repositoryCount: l.count,
        percentage: Number(l.percentage.toFixed(1)),
      })),
      topRepositories: topRepos,
      repolensProfileHealthScore: score,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(summary, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `repolens-${profile.login}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const languageStats = useMemo(
    () => (repos.length ? calculateLanguageStats(repos) : []),
    [repos]
  );
  const repoStats = useMemo(
    () => (repos.length ? calculateRepoStats(repos) : null),
    [repos]
  );
  const profileScore = useMemo(
    () => (profile && repos.length !== undefined ? calculateProfileScore(profile, repos) : null),
    [profile, repos]
  );
  const insights = useMemo(
    () => (profile ? generateDeveloperSnapshot(profile, repos, languageStats) : []),
    [profile, repos, languageStats]
  );

  const showEmptyState = !loading && !error && profile && repos.length === 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top search bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-accent-600 dark:text-gray-400 dark:hover:text-accent-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="sm:max-w-md sm:flex-1">
          <SearchBar
            onSearch={handleSearch}
            initialValue={username || ''}
            loading={loading}
            showRecent={false}
            compact
          />
        </div>

        {profile && !loading && !error && (
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Download className="h-4 w-4" />
            Export Summary
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && <LoadingSkeleton />}

      {/* Error */}
      {error && !loading && <ErrorState message={error} onRetry={() => loadProfile(username)} />}

      {/* Empty repos */}
      {showEmptyState && (
        <div className="space-y-6">
          <ProfileHeader profile={profile} />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard icon={BookOpen} label="Public Repos" value={formatNumber(profile.public_repos)} />
            <StatCard icon={Users} label="Followers" value={formatNumber(profile.followers)} />
            <StatCard icon={UserCheck} label="Following" value={formatNumber(profile.following)} />
            <StatCard icon={CalendarDays} label="Account Age" value={formatNumber(Math.floor((Date.now() - new Date(profile.created_at)) / (1000 * 60 * 60 * 24 * 365))) + 'y'} />
          </div>
          <EmptyState />
        </div>
      )}

      {/* Dashboard */}
      {profile && !loading && !error && repos.length > 0 && repoStats && profileScore && (
        <div className="space-y-6">
          <ProfileHeader profile={profile} />

          {/* Stats */}
          <RepositoryStats
            stats={{
              ...repoStats,
              recentlyUpdated: repos.filter((r) => {
                const oneYearAgo = new Date();
                oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
                return new Date(r.updated_at) > oneYearAgo;
              }).length,
            }}
          />

          {/* Profile Score + Languages */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ProfileScore score={profileScore.score} signals={profileScore.signals} />
            </div>
            <div className="lg:col-span-2">
              <LanguageChart languageStats={languageStats} />
            </div>
          </div>

          {/* Language list + Developer snapshot */}
          <div className="grid gap-6 lg:grid-cols-2">
            <LanguageList languageStats={languageStats} />
            <DeveloperSnapshot insights={insights} />
          </div>

          {/* Activity */}
          <ActivityOverview repos={repoStats.sortedByUpdated} />

          {/* Top repositories */}
          <TopRepositories repos={repos} />

          {/* Recent repositories */}
          <RecentRepositories repos={repoStats.sortedByUpdated} />
        </div>
      )}
    </div>
  );
}
