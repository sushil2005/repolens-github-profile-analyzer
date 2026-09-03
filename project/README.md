# RepoLens — GitHub Profile Analyzer

A polished, production-quality frontend web application for analyzing any public GitHub profile. Enter a username and instantly view repositories, programming languages, popularity metrics, and a developer profile dashboard.

## Features

- **Instant Profile Analysis** — Enter any public GitHub username and get a full analytics dashboard
- **Profile Health Score** — A transparent, deterministic 0–100 score based on public profile and repository signals
- **Language Distribution** — Beautiful donut chart showing the developer's language spread
- **Repository Analytics** — Total repos, stars, forks, original vs forked, recently updated
- **Top Repositories** — Sortable by stars, forks, or recent activity with search filtering
- **Developer Snapshot** — Deterministic insights generated from real data
- **Activity Overview** — Repository update frequency and recent activity timeline
- **Dark / Light / System Theme** — Persisted via localStorage
- **Recent Searches** — Last 5 searched usernames stored locally
- **Shareable URLs** — `/analyze/{username}` links work directly
- **JSON Export** — Download a profile summary as a JSON file
- **Fully Responsive** — Works from 375px mobile to 1440px+ desktop
- **No Login Required** — Uses only public GitHub API data

## Demo

[Live Demo](YOUR_DEPLOYED_URL)

## Screenshots

![Home Page](screenshots/home.png)
![Dashboard](screenshots/dashboard.png)
![Mobile View](screenshots/mobile.png)

## Tech Stack

- **React** — UI framework
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Styling
- **Recharts** — Data visualization
- **Lucide React** — Icons
- **GitHub REST API** — Public data source

## How It Works

1. **Landing page** — User enters a GitHub username (or clicks an example)
2. **Fetch** — The app calls the GitHub REST API for the user profile and repositories
3. **Process** — Language distribution, repository stats, and a Profile Health Score are computed client-side
4. **Display** — A professional analytics dashboard renders with charts, stats, and insights

All data is fetched directly from the public GitHub REST API in the browser. No backend, no database, no authentication.

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/repolens.git
cd repolens
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

To create a production build:

```bash
npm run build
```

## API

RepoLens uses the following public GitHub REST API endpoints:

- `GET https://api.github.com/users/{username}` — User profile data
- `GET https://api.github.com/users/{username}/repos?per_page=100&sort=updated` — User repositories

No authentication token is required. Unauthenticated requests are subject to GitHub's rate limit of 60 requests per hour per IP address.

## Limitations

- **Rate Limits** — The application uses public GitHub API data and is subject to GitHub API rate limits (60 requests/hour for unauthenticated requests).
- **No Contribution Graph** — Contribution history is not artificially scraped or fabricated. The app shows repository activity signals instead.
- **Language Distribution** — Based on repository counts (the `language` field from the repos endpoint), not lines of code.
- **Profile Health Score** — A transparent frontend-only metric, not an official GitHub score.
- **Pagination** — Fetches up to 300 repositories (3 pages of 100). Users with more repos will have a partial list.

## Project Structure

```
repolens/
├── public/
├── screenshots/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── ActivityOverview.jsx
│   │   ├── DeveloperSnapshot.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LanguageChart.jsx
│   │   ├── LanguageList.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── ProfileHeader.jsx
│   │   ├── ProfileScore.jsx
│   │   ├── RecentRepositories.jsx
│   │   ├── RepositoryCard.jsx
│   │   ├── RepositoryStats.jsx
│   │   ├── SearchBar.jsx
│   │   ├── StatCard.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── TopRepositories.jsx
│   ├── pages/
│   │   ├── Analyzer.jsx
│   │   └── Home.jsx
│   ├── services/
│   │   └── githubApi.js
│   ├── utils/
│   │   ├── analytics.js
│   │   ├── formatters.js
│   │   └── storage.js
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Future Improvements

- GitHub OAuth for higher API rate limits and private contribution data
- More advanced repository analysis (topics, license detection, README quality)
- Profile comparison between two developers
- AI-powered recommendations based on repository patterns
- Contribution analytics through authenticated APIs
- Trending language analysis over time

## License

MIT
