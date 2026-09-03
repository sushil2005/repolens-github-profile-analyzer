/**
 * Language color mapping — GitHub's official linguist colors (subset).
 * https://github.com/github/linguist/blob/master/lib/linguist/languages.yml
 */
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Less: '#1d365d',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Jupyter: '#DA5B0B',
  Dockerfile: '#384d54',
  Lua: '#000080',
  Perl: '#0298c3',
  Haskell: '#5e5086',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Scala: '#c22d40',
  ObjectiveC: '#438eff',
  PowerShell: '#012456',
  R: '#198CE7',
  Julia: '#a270ba',
  Zig: '#ec915c',
  Nim: '#ffc200',
  Crystal: '#000100',
  OCaml: '#3be133',
  Erlang: '#B83998',
  'Emacs Lisp': '#c065db',
  'Common Lisp': '#3fb68b',
  Makefile: '#427819',
  CMake: '#DA3434',
  Nix: '#7e7eff',
  Astro: '#ff5a03',
  Solidity: '#AA6746',
  Assembly: '#6E4C13',
  TeX: '#3D6117',
  Vim: '#199f4b',
  Markdown: '#083fa1',
  JSON: '#292929',
  YAML: '#cb171e',
  TSQL: '#e38c00',
  PLpgSQL: '#336790',
  GraphQL: '#e10098',
  HCL: '#844FBA',
  Terraform: '#844FBA',
  Haxe: '#df7900',
  GDScript: '#355570',
  'Rich Text Format': '#7e7eff',
  Batchfile: '#C1F12E',
  AutoHotkey: '#6594b9',
  StandardML: '#dc566d',
  'LLVM': '#185619',
  WebAssembly: '#04133b',
  Verilog: '#b2b7f8',
  VHDL: '#adb2cb',
  'Jinja': '#a52a22',
  'Twig': '#c1d026',
  'BitBake': '#00bce4',
  'Starlark': '#faf382',
  'NASL': '#1a7700',
  'Gnuplot': '#f0a600',
  'Mermaid': '#ff3670',
  'Inno Setup': '#35b1e3',
  'Modelica': '#de1d31',
  'SourcePawn': '#5ac76b',
  'MAXScript': '#00a6a6',
  'MQL4': '#62a8d6',
  'MQL5': '#4a76a8',
  'SourcePawn 2': '#5ac76b',
  'RenderScript': '#5ac76b',
  'GLSL': '#5686a5',
  'LabVIEW': '#fede06',
  'SmPL': '#c94949',
  'Roff Manpage': '#ecdebe',
  'Roff': '#ecdebe',
  ' sed': '#64b9cc',
  'Awk': '#cda75f',
  'Vim Snippet': '#199f4b',
  'Vim Script': '#199f4b',
  'VimL': '#199f4b',
  'ActionScript': '#882B0F',
  'ColdFusion': '#ed2cf6',
  'FORTRAN': '#4d41b1',
  'Fortran': '#4d41b1',
  'FreeBasic': '#867db1',
  'Visual Basic': '#945db7',
  'VBA': '#867db1',
  'VBScript': '#15dcd4',
  'QML': '#44a3aa',
  'Mathematica': '#dd1100',
  'Matlab': '#e16737',
  'NSIS': '#a10006',
  'Pony': '#9900cc',
  'Reason': '#ff4e12',
  'Rez': '#738d57',
  'Raku': '#0000fb',
  'V': '#4f87c4',
  'Wolfram': '#dd1100',
  'Xonsh': '#2855EF',
  'YARA': '#220000',
  'ZAP': '#d4d4bd',
  'ZenCode': '#5b5b5b',
  'ZIL': '#7532a8',
  'Zimpl': '#d1d1d1',
  'mIRC Script': '#92692a',
  'mcfunction': '#d4d4d4',
};

export function getLanguageColor(language) {
  if (!language) return '#8b949e';
  return LANGUAGE_COLORS[language] || '#8b949e';
}

/**
 * Calculate language distribution from repositories.
 * Counts repositories per language (not lines of code).
 * Returns array sorted by count descending.
 */
export function calculateLanguageStats(repos) {
  const counts = {};
  let total = 0;

  for (const repo of repos) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      total++;
    }
  }

  if (total === 0) return [];

  return Object.entries(counts)
    .map(([language, count]) => ({
      language,
      count,
      percentage: (count / total) * 100,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Calculate repository statistics.
 */
export function calculateRepoStats(repos) {
  const totalRepos = repos.length;
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  const originalRepos = repos.filter((r) => !r.fork).length;
  const forkedRepos = repos.filter((r) => r.fork).length;

  const sortedByUpdated = [...repos].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  return {
    totalRepos,
    totalStars,
    totalForks,
    originalRepos,
    forkedRepos,
    sortedByUpdated,
  };
}

/**
 * Calculate a deterministic "RepoLens Profile Health Score" from 0-100.
 * This is NOT an official GitHub metric. It is a transparent frontend-only score
 * based on publicly available profile and repository signals.
 */
export function calculateProfileScore(profile, repos) {
  let score = 0;
  const maxScore = 100;
  const signals = [];

  // Profile signals (40 points)
  if (profile.name) {
    score += 8;
    signals.push({ label: 'Has name', earned: 8, max: 8 });
  } else {
    signals.push({ label: 'Has name', earned: 0, max: 8 });
  }

  if (profile.bio && profile.bio.trim().length > 0) {
    score += 10;
    signals.push({ label: 'Has bio', earned: 10, max: 10 });
  } else {
    signals.push({ label: 'Has bio', earned: 0, max: 10 });
  }

  if (profile.location) {
    score += 5;
    signals.push({ label: 'Has location', earned: 5, max: 5 });
  } else {
    signals.push({ label: 'Has location', earned: 0, max: 5 });
  }

  if (profile.company) {
    score += 5;
    signals.push({ label: 'Has company', earned: 5, max: 5 });
  } else {
    signals.push({ label: 'Has company', earned: 0, max: 5 });
  }

  if (profile.blog || (profile.twitter_username && profile.twitter_username.trim())) {
    score += 6;
    signals.push({ label: 'Has website/social link', earned: 6, max: 6 });
  } else {
    signals.push({ label: 'Has website/social link', earned: 0, max: 6 });
  }

  if (profile.followers > 0) {
    // Tiered: 1-10 followers = 3, 11-100 = 4, 101+ = 6
    const followerPoints =
      profile.followers > 100 ? 6 : profile.followers > 10 ? 4 : 3;
    score += followerPoints;
    signals.push({ label: 'Has followers', earned: followerPoints, max: 6 });
  } else {
    signals.push({ label: 'Has followers', earned: 0, max: 6 });
  }

  // Repository signals (60 points)
  if (repos.length > 0) {
    score += 10;
    signals.push({ label: 'Has public repositories', earned: 10, max: 10 });
  } else {
    signals.push({ label: 'Has public repositories', earned: 0, max: 10 });
  }

  // Repository descriptions
  const reposWithDescription = repos.filter(
    (r) => r.description && r.description.trim().length > 0
  );
  const descRatio = repos.length > 0 ? reposWithDescription.length / repos.length : 0;
  const descPoints = Math.round(descRatio * 15);
  score += descPoints;
  signals.push({ label: 'Repository descriptions', earned: descPoints, max: 15 });

  // Repository activity (updated within last year)
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const recentlyUpdated = repos.filter(
    (r) => new Date(r.updated_at) > oneYearAgo
  );
  const activityRatio = repos.length > 0 ? recentlyUpdated.length / repos.length : 0;
  const activityPoints = Math.round(activityRatio * 15);
  score += activityPoints;
  signals.push({ label: 'Repository activity', earned: activityPoints, max: 15 });

  // Stars received (community engagement)
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  let starPoints = 0;
  if (totalStars > 1000) starPoints = 10;
  else if (totalStars > 100) starPoints = 7;
  else if (totalStars > 10) starPoints = 5;
  else if (totalStars > 0) starPoints = 3;
  score += starPoints;
  signals.push({ label: 'Community engagement (stars)', earned: starPoints, max: 10 });

  // Forks (community usage)
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  let forkPoints = 0;
  if (totalForks > 500) forkPoints = 10;
  else if (totalForks > 50) forkPoints = 7;
  else if (totalForks > 5) forkPoints = 5;
  else if (totalForks > 0) forkPoints = 3;
  score += forkPoints;
  signals.push({ label: 'Community usage (forks)', earned: forkPoints, max: 10 });

  return {
    score: Math.min(score, maxScore),
    signals,
  };
}

/**
 * Generate deterministic developer insights from fetched data.
 * These are NOT AI-generated — they are computed from real data.
 */
export function generateDeveloperSnapshot(profile, repos, languageStats) {
  const insights = [];

  if (repos.length === 0) {
    insights.push('This developer has no public repositories.');
    return insights;
  }

  // Language insight
  if (languageStats.length > 0) {
    const topLang = languageStats[0];
    if (topLang.percentage >= 50) {
      insights.push(
        `${topLang.language} is the dominant language across this profile, appearing in ${topLang.count} repositories.`
      );
    } else if (languageStats.length >= 3) {
      insights.push(
        `This developer works across ${languageStats.length} languages, led by ${topLang.language} (${topLang.percentage.toFixed(0)}%).`
      );
    } else {
      insights.push(
        `${topLang.language} is the primary language, used in ${topLang.count} repositories.`
      );
    }
  }

  // Repository breadth
  if (repos.length > 50) {
    insights.push(
      'This developer maintains a broad collection of public repositories.'
    );
  } else if (repos.length > 10) {
    insights.push(
      `This developer maintains ${repos.length} public repositories.`
    );
  } else {
    insights.push(
      `This developer has ${repos.length} public ${repos.length === 1 ? 'repository' : 'repositories'}.`
    );
  }

  // Community engagement
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const reposWithStars = repos.filter((r) => r.stargazers_count > 0).length;
  if (totalStars > 1000) {
    insights.push(
      'Several repositories have strong community engagement with significant star counts.'
    );
  } else if (totalStars > 50) {
    insights.push(
      `${reposWithStars} ${reposWithStars === 1 ? 'repository has' : 'repositories have'} received stars from the community.`
    );
  } else if (totalStars > 0) {
    insights.push('A few repositories have received community stars.');
  }

  // Activity recency
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const recentlyUpdated = repos.filter(
    (r) => new Date(r.updated_at) > oneYearAgo
  );
  const recentRatio = recentlyUpdated.length / repos.length;
  if (recentRatio > 0.7) {
    insights.push('Most repositories have been updated recently.');
  } else if (recentRatio > 0.3) {
    insights.push('Some repositories have been updated within the last year.');
  } else {
    insights.push('Many repositories have not been updated recently.');
  }

  // Original vs forked
  const originalRepos = repos.filter((r) => !r.fork).length;
  const forkRatio = originalRepos / repos.length;
  if (forkRatio > 0.8) {
    insights.push(
      'This developer primarily creates original repositories rather than forks.'
    );
  } else if (forkRatio < 0.3 && repos.length > 5) {
    insights.push(
      'A significant portion of repositories are forks of other projects.'
    );
  }

  // Account maturity
  if (profile.created_at) {
    const created = new Date(profile.created_at);
    const yearsActive = (new Date() - created) / (1000 * 60 * 60 * 24 * 365);
    if (yearsActive > 5) {
      insights.push(
        `This developer has been on GitHub for over ${Math.floor(yearsActive)} years.`
      );
    }
  }

  return insights;
}
