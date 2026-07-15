<div align="center">

# 🎬 FILMIX

**A modern movie & TV show discovery app — search, explore, and build your own watchlist.**

Built with React 19, TypeScript, and Vite, powered by the OMDb API.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

<p>
  <a href="#-getting-started">Getting Started</a> ·
  <a href="#-deploying-to-vercel">Deploy Guide</a> ·
  <a href="#-troubleshooting">Troubleshooting</a> ·
  <a href="#-features">Features</a>
</p>

</div>

<p align="center">
  <img src="./public/H.png" alt="FILMIX preview — homepage showing a grid of movie search results" width="100%" />
</p>

> 🔗 **Live demo:** _add your Vercel URL here once deployed (see [Deploying to Vercel](#-deploying-to-vercel))_

---

## Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Deploying to Vercel](#-deploying-to-vercel)
- [Troubleshooting](#-troubleshooting)
- [Project Structure](#-project-structure)
- [Engineering Notes](#-engineering-notes)
- [A Note on the API Key & Security](#-a-note-on-the-api-key--security)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## Overview

FILMIX is a single-page movie and TV show discovery app. Search the OMDb catalog, open any title for full details (plot, cast, ratings, genre, awards), and save favorites to a personal watchlist that persists in your browser. The whole app is a static React SPA — no backend of its own, deployable anywhere that serves static files.

## ✨ Features

- 🔍 **Search** — find any movie or show by title via the OMDb API
- 📄 **Movie details** — plot, cast, director, genre, runtime, ratings, and more
- ❤️ **Favorites** — add/remove titles from a personal list, persisted in `localStorage` (capped at 10 to keep the UI tidy)
- 🧭 **Client-side routing** — `/`, `/favorites`, `/movie/:imdbID`, plus a proper 404 page for unknown routes
- ⚡ **Route-level code splitting** — each page loads on demand, keeping the initial bundle small
- ♿ **Accessibility-minded** — semantic roles, `aria-live` regions for async updates, visible focus rings, and `prefers-reduced-motion` support
- 📱 **Responsive UI** — Tailwind CSS v4, dark cinematic theme, mobile nav drawer

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Vite](https://vite.dev) | Dev server & build tool |
| [React Router DOM v7](https://reactrouter.com) | Client-side routing |
| [Zustand](https://github.com/pmndrs/zustand) | Global state (search results, favorites) |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling, via CSS-first `@theme` tokens |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [Axios](https://axios-http.com) | HTTP requests to OMDb |
| [OMDb API](https://www.omdbapi.com) | Movie & TV data source |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js `20.19+` or `22.12+`** (required by Vite 7 — check with `node -v`)
- A free **OMDb API key** (see step 3 below)

### 1. Clone the repository

```bash
git clone https://github.com/FahdAmmar/MoviesWebSite.git
cd MoviesWebSite
```

> Replace the URL above with your own repository once you've pushed this project to GitHub.

### 2. Install dependencies

```bash
npm install
```

### 3. Get an OMDb API key

This app fetches all movie data from OMDb, so nothing will load without a key.

1. Go to **[omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)** and request the free tier (1,000 requests/day).
2. Check your email for the key — **then click the activation link in that same email.** OMDb keys are inert until confirmed; this is the single most common reason a brand-new key looks "invalid" even when copied correctly.
3. If the email doesn't arrive within an hour (common with Yahoo/Outlook/Hotmail addresses), OMDb's site notes you can contact them directly.

### 4. Configure your environment

```bash
cp .env.example .env
```

Open `.env` and paste your key:

```env
VITE_OMDB_API_KEY=your_api_key_here
```

> ⚠️ Restart `npm run dev` after creating or editing `.env` — Vite only reads environment variables when the dev server starts, so changes won't apply to an already-running session.

### 5. Run the app

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Type-check (`tsc -b`) and build for production into `dist/` |
| `npm run preview` | Serve the production build locally, for a final check before deploying |
| `npm run lint` | Run ESLint over the codebase |
| `npm run type-check` | Run the TypeScript compiler without emitting files |

---

## ☁️ Deploying to Vercel

This repo includes a `vercel.json` that rewrites all routes to `index.html`, so refreshing or directly opening a deep link like `/favorites` or `/movie/tt0468569` works correctly — a common gap for client-side-routed SPAs on static hosts. No extra configuration is needed for that part.

The one thing **you** must set is the API key, since Vercel has no way to know it:

1. Push this repository to GitHub (if you haven't already).
2. Go to **[vercel.com/new](https://vercel.com/new)** and import the repository. Vercel auto-detects the Vite preset — build command and output directory need no changes.
3. Before the first deploy (or anytime after, under **Project Settings → Environment Variables**), add:
   | Key | Value |
   |---|---|
   | `VITE_OMDB_API_KEY` | your OMDb key |

   Apply it to **Production**, **Preview**, and **Development** environments so it works on every deployment type.
4. Deploy (or **redeploy** if you added the variable after the first build — see below for why this matters).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/clone?repository-url=https%3A%2F%2Fgithub.com%2FFahdAmmar%2FMoviesWebSite&env=VITE_OMDB_API_KEY&envDescription=Free%20OMDb%20API%20key%2C%20required%20for%20movie%20search%20to%20work&envLink=https%3A%2F%2Fwww.omdbapi.com%2Fapikey.aspx)

> This button prompts for `VITE_OMDB_API_KEY` right in Vercel's import flow, so anyone deploying a copy of this project never hits the missing-key error in the first place. Update the `repository-url` in this button to point at your own repo before relying on it.

### Why redeploying matters

Vite bakes `VITE_*` variables into the built JavaScript **at build time**, not at runtime. Adding or changing an environment variable in Vercel's dashboard has no effect on deployments that already exist — you need to trigger a new build (**Deployments → ⋯ → Redeploy**) for it to take effect.

---

## 🔧 Troubleshooting

**Seeing "Missing OMDb API key" or "Invalid API key!"?** Work through this list:

| Symptom | Likely cause | Fix |
|---|---|---|
| Works locally, broken on Vercel | Env var not set on Vercel | Add `VITE_OMDB_API_KEY` in Project Settings → Environment Variables |
| Added the var on Vercel, still broken | Deployment predates the variable | Redeploy (Vite bakes env vars in at build time, see above) |
| Broken locally right after adding `.env` | Dev server was already running | Stop and restart `npm run dev` |
| Key was just requested, says "Invalid API key!" | Key not yet activated | Click the confirmation link in OMDb's email |
| Typo'd variable name | Vite only exposes vars prefixed `VITE_` | Confirm the name is exactly `VITE_OMDB_API_KEY` in both `.env` and Vercel |
| Worked fine, suddenly errors | OMDb daily quota reached (free tier: 1,000/day) | Wait for reset, or request a higher-volume key |

---

## 📁 Project Structure

```
├── public/
│   └── H.png                    # README banner image
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MovieCard.tsx
│   │   ├── MovieList.tsx
│   │   ├── SearchBar.tsx
│   │   └── SkeletonLoader.tsx
│   ├── constants/index.ts       # Shared constants (MAX_FAVORITES, etc.)
│   ├── hooks/useDocumentTitle.ts
│   ├── pages/
│   │   ├── Favorites.tsx
│   │   ├── Home.tsx
│   │   ├── MovieDetails.tsx
│   │   └── NotFound.tsx
│   ├── store/useMovieStore.ts   # Zustand store — search, details, favorites
│   ├── types/index.ts           # Movie & OMDb response types
│   ├── App.tsx
│   ├── env.d.ts                 # Typed import.meta.env
│   ├── main.tsx
│   └── index.css                # Tailwind v4 theme tokens
├── .env.example
├── LICENSE
├── vercel.json                  # SPA rewrite rule for Vercel
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🧠 Engineering Notes

A few decisions worth calling out for anyone reviewing the codebase:

| Area | Approach |
|---|---|
| **State management** | Zustand over Context + `useReducer` — less boilerplate, components only re-render on the slice of state they subscribe to |
| **Race conditions** | In-flight search/details requests are cancelled via `AbortController` when a newer one starts, so a slow response can't overwrite fresher results |
| **OMDb error handling** | OMDb returns HTTP 200 with `Response: "False"` for some failures but a non-2xx status with a JSON body for others (e.g. an invalid key) — both paths are handled and surfaced to the UI |
| **Type safety** | Dedicated `OmdbSearchResponse` / `OmdbDetailsResponse` types instead of `any` for API responses |
| **Accessibility** | `aria-live` on async result regions, `aria-label`s on icon-only buttons, visible `:focus-visible` rings, and a `prefers-reduced-motion` media query |
| **Bundle size** | Pages are lazy-loaded per route with `React.lazy` + `Suspense` |

## 🔐 A Note on the API Key & Security

FILMIX is a pure client-side SPA with no backend of its own, so `VITE_OMDB_API_KEY` is compiled into the JavaScript bundle and visible to anyone who opens dev tools or inspects network requests. That's a standard, accepted trade-off for OMDb's free personal-use tier — the key is low-privilege, rate-limited, and free to regenerate if it ever leaks.

If you fork this for something where the key must stay server-side entirely (e.g. a paid OMDb tier tied to billing), the usual fix is to add a small serverless function — a `/api/omdb` route on Vercel, for instance — that holds the key server-side and proxies requests from the frontend. That's a deliberate architecture change beyond the scope of this project as-is, but worth knowing if your needs change.

## 🗺 Roadmap

Ideas for anyone extending this project:

- [ ] Serverless proxy to fully hide the OMDb key (see above)
- [ ] Pagination for search results (OMDb paginates at 10 results per page)
- [ ] Unit/integration tests (Vitest + React Testing Library)
- [ ] Light theme toggle

## 🤝 Contributing

Issues and pull requests are welcome. For larger changes, please open an issue first to discuss what you'd like to change.

## 📄 License

Licensed under the [MIT License](./LICENSE).

## 🙏 Acknowledgements

- [OMDb API](https://www.omdbapi.com/) for the movie data
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [React](https://react.dev/) and its ecosystem
- [Zustand](https://github.com/pmndrs/zustand) for delightfully simple state management

---

<div align="center">

**Enjoy exploring movies! 🍿**

</div>
