import { Github } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/80 dark:border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5 text-gray-400" />
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              RepoLens
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built for developers who love open source.
          </p>
          <nav className="flex items-center gap-5 text-sm">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-accent-600 dark:text-gray-400 dark:hover:text-accent-400"
            >
              GitHub
            </a>
            <a
              href="https://docs.github.com/en/rest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 transition hover:text-accent-600 dark:text-gray-400 dark:hover:text-accent-400"
            >
              GitHub API
            </a>
            <a
              href="/#/about"
              className="text-gray-500 transition hover:text-accent-600 dark:text-gray-400 dark:hover:text-accent-400"
            >
              About
            </a>
          </nav>
        </div>
        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
          © {year} RepoLens. Not affiliated with GitHub. Uses public GitHub API data.
        </p>
      </div>
    </footer>
  );
}
