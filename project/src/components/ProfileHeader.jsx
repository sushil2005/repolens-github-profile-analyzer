import {
  MapPin,
  Building2,
  Link as LinkIcon,
  Twitter,
  ExternalLink,
  Github,
} from 'lucide-react';
import { accountAge } from '@/utils/formatters';

export default function ProfileHeader({ profile }) {
  return (
    <div className="card p-6 sm:p-8 animate-slide-up">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <img
            src={profile.avatar_url}
            alt={`${profile.login}'s GitHub avatar`}
            className="h-24 w-24 rounded-2xl border border-gray-200 object-cover dark:border-white/10 sm:h-28 sm:w-28"
            loading="lazy"
          />
        </a>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {profile.name || profile.login}
            </h1>
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-base text-gray-500 transition hover:text-accent-600 dark:text-gray-400 dark:hover:text-accent-400"
            >
              @{profile.login}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {profile.bio && (
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {profile.bio}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            {profile.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
            )}
            {profile.company && (
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4" />
                {profile.company}
              </span>
            )}
            {profile.blog && (
              <a
                href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition hover:text-accent-600 dark:hover:text-accent-400"
              >
                <LinkIcon className="h-4 w-4" />
                {profile.blog.replace(/^https?:\/\//, '')}
              </a>
            )}
            {profile.twitter_username && (
              <a
                href={`https://twitter.com/${profile.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition hover:text-accent-600 dark:hover:text-accent-400"
              >
                <Twitter className="h-4 w-4" />
                @{profile.twitter_username}
              </a>
            )}
          </div>

          <div className="mt-5">
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <Github className="h-4 w-4" />
              View on GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-100 pt-5 dark:border-white/5">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Member since {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} ·{' '}
          {accountAge(profile.created_at)} on GitHub
        </p>
      </div>
    </div>
  );
}
