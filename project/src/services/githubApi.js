const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Custom error class for GitHub API errors.
 * Includes a user-friendly message and the original status code.
 */
export class GitHubApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'GitHubApiError';
    this.status = status;
  }
}

async function githubFetch(path) {
  let response;
  try {
    response = await fetch(`${GITHUB_API_BASE}${path}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
  } catch {
    throw new GitHubApiError('Unable to connect to GitHub.', 0);
  }

  if (response.status === 403 || response.status === 429) {
    throw new GitHubApiError(
      'GitHub API rate limit reached. Please try again later.',
      response.status
    );
  }

  if (response.status === 404) {
    throw new GitHubApiError('GitHub user not found.', 404);
  }

  if (!response.ok) {
    throw new GitHubApiError(
      'Unable to fetch data from GitHub. Please try again later.',
      response.status
    );
  }

  return response.json();
}

/**
 * Fetch a GitHub user profile.
 * @param {string} username
 * @returns {Promise<object>}
 */
export async function fetchUserProfile(username) {
  const normalized = username.trim().toLowerCase();
  return githubFetch(`/users/${encodeURIComponent(normalized)}`);
}

/**
 * Fetch all public repositories for a user.
 * Handles pagination by fetching up to 3 pages (300 repos).
 * @param {string} username
 * @returns {Promise<array>}
 */
export async function fetchUserRepos(username) {
  const normalized = username.trim().toLowerCase();
  const repos = [];
  const maxPages = 3;

  for (let page = 1; page <= maxPages; page++) {
    const data = await githubFetch(
      `/users/${encodeURIComponent(normalized)}/repos?per_page=100&sort=updated&page=${page}`
    );
    repos.push(...data);
    if (data.length < 100) break;
  }

  return repos;
}

/**
 * Fetch complete profile data: user profile + repositories.
 * @param {string} username
 * @returns {Promise<{profile: object, repos: array}>}
 */
export async function fetchCompleteProfile(username) {
  const [profile, repos] = await Promise.all([
    fetchUserProfile(username),
    fetchUserRepos(username),
  ]);
  return { profile, repos };
}
