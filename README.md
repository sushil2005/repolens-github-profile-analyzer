# 🔎 RepoLens — GitHub Profile Analyzer

> Analyze any public GitHub profile and turn repository data into clear, actionable insights.

RepoLens is a modern GitHub Profile Analyzer built with **React, Vite, JavaScript, Tailwind CSS, Recharts, and the GitHub REST API**.

Enter a GitHub username to explore repositories, programming languages, activity, repository statistics, and an automatically calculated **RepoLens Profile Health Score**.

---

## ✨ Features

- 🔍 Search any public GitHub username
- 👤 GitHub profile overview
- ⭐ Total stars and repository statistics
- 📦 Repository analysis
- 💻 Programming language distribution
- 📊 Interactive language charts
- 🏆 Top repositories
- 🕒 Recently updated repositories
- 📈 Developer activity insights
- 🧠 RepoLens Profile Health Score
- 🌙 Dark / Light / System theme
- 🕘 Recent search history
- 🔗 Shareable profile analysis URLs
- 📥 Export profile analysis as JSON
- 📱 Fully responsive design
- ⚡ Fast Vite-powered development
- ♿ Accessible UI with reusable components
- 🚨 Proper loading, empty, network-error, and rate-limit states

---

## 🎯 Why RepoLens?

GitHub profiles contain a lot of useful information, but raw profile data does not always provide a clear picture of a developer's activity.

RepoLens transforms public GitHub data into an easy-to-understand dashboard so developers can quickly understand:

- What technologies they use
- Which repositories perform best
- How active their profile is
- How their repositories are distributed
- Where their profile could be improved

> **Note:** The RepoLens Profile Health Score is an original application metric and is **not an official GitHub score**.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | User interface |
| Vite | Development & build tooling |
| JavaScript | Application logic |
| Tailwind CSS | Styling |
| Recharts | Data visualization |
| Lucide React | Icons |
| GitHub REST API | Public GitHub data |
| React Router | Client-side routing |
| LocalStorage | Theme & search history |

---

## 🏗️ Architecture

RepoLens is a **frontend-only application**.

```text
User
  ↓
React + Vite Application
  ↓
GitHub REST API
  ↓
Public GitHub Profile Data
  ↓
Analytics & Formatting Layer
  ↓
Dashboard + Charts + Insights
