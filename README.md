# WatchNow 🎬

A Netflix-inspired streaming app built with React and the TMDB API. Fully responsive across mobile, tablet, and desktop.

## Features

- 🎬 Real movie & TV data from TMDB API
- 🔍 Search movies, shows, and people
- 🖼️ Auto-rotating hero banner with real backdrops
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎞️ Horizontal scrollable rows with hover effects
- 🪟 Movie detail modal with cast, director, trailer link
- 🧭 Multi-page routing (Home, Films, Series, New & Hot, My List)
- ⚡ Skeleton loading states
- 🎨 Cinematic dark UI with Bebas Neue typography

## Tech Stack

- React 18
- React Router v6
- TMDB API (free)
- CSS Modules (no UI library — pure custom CSS)
- Google Fonts (Bebas Neue + DM Sans)

---

## Setup

### 1. Get a free TMDB API key

1. Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2. Verify your email
3. Go to **Settings → API → Create → Developer**
4. Copy your **API Key (v3 auth)**

### 2. Install and configure

```bash
# Clone or unzip the project
cd watchnow

# Install dependencies
npm install

# Create your environment file
cp .env.example .env

# Open .env and paste your TMDB API key
# REACT_APP_TMDB_API_KEY=your_actual_key_here
```

### 3. Run the app

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
```

---

## Deploy to Netlify (free)

1. Push this project to a GitHub repo
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set publish directory: `build`
6. Add environment variable: `REACT_APP_TMDB_API_KEY` = your key
7. Deploy!

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .css      # Responsive navigation
│   ├── Hero.jsx / .css        # Auto-rotating hero banner
│   ├── MovieRow.jsx / .css    # Horizontal scrollable rows
│   ├── Modal.jsx / .css       # Movie detail modal
│   └── Footer.jsx / .css      # Footer
├── pages/
│   ├── Home.jsx / .css        # Main homepage
│   ├── Films.jsx              # Movies page
│   ├── Series.jsx             # TV series page
│   ├── NewHot.jsx             # New & upcoming
│   ├── MyList.jsx             # Saved list
│   ├── Search.jsx / .css      # Search results
│   └── PageLayout.css         # Shared page styles
├── hooks/
│   ├── useFetch.js            # Data fetching hook
│   └── useModal.js            # Modal state hook
├── tmdb.js                    # TMDB API service
├── App.jsx                    # Router + layout
├── index.js                   # Entry point
└── index.css                  # Global styles + variables
```

---

## Extending the App

### Add My List functionality
- Use `localStorage` or a backend to persist saved movies
- Add a `+` button on each card that saves to list
- Read saved IDs from storage in `MyList.jsx`

### Add authentication
- Integrate Firebase Auth or Supabase
- Gate content behind login

### Add video playback
- Integrate YouTube iframe for trailers (trailer key already fetched in modal)

---

Built by [Caleb A.] · Powered by TMDB API
