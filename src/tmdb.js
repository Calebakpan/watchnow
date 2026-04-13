const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const IMG_BASE = 'https://image.tmdb.org/t/p';

const get = async (endpoint, params = {}) => {
  const query = new URLSearchParams({ api_key: API_KEY, ...params }).toString();
  const res = await fetch(`${BASE_URL}${endpoint}?${query}`);
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
};

export const tmdb = {
  trending: () => get('/trending/movie/week'),
  popular: () => get('/movie/popular'),
  topRated: () => get('/movie/top_rated'),
  nowPlaying: () => get('/movie/now_playing'),
  upcoming: () => get('/movie/upcoming'),
  tvTrending: () => get('/trending/tv/week'),
  tvPopular: () => get('/tv/popular'),
  movieDetails: (id) => get(`/movie/${id}`, { append_to_response: 'videos,credits' }),
  tvDetails: (id) => get(`/tv/${id}`, { append_to_response: 'videos,credits' }),
  search: (query) => get('/search/multi', { query, include_adult: false }),
  genres: () => get('/genre/movie/list'),
};

export const imgUrl = (path, size = 'w500') =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const backdropUrl = (path) =>
  path ? `${IMG_BASE}/original${path}` : null;
