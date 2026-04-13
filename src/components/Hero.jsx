import { useState, useEffect } from 'react';
import { backdropUrl } from '../tmdb';
import './Hero.css';

export default function Hero({ movies, onInfo }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!movies?.length) return;
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIdx(i => (i + 1) % Math.min(movies.length, 5));
        setFading(false);
      }, 400);
    }, 7000);
    return () => clearInterval(t);
  }, [movies]);

  if (!movies?.length) return <div className="hero-skeleton skeleton" />;

  const movie = movies[idx];
  const title = movie.title || movie.name || '';
  const overview = movie.overview || '';
  const score = movie.vote_average ? Math.round(movie.vote_average * 10) : null;
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const bg = backdropUrl(movie.backdrop_path);

  return (
    <div className={`hero${fading ? ' fading' : ''}`}>
      {bg && <img src={bg} alt={title} className="hero-bg" loading="eager" />}
      <div className="hero-gradient" />
      <div className="hero-content fade-up">
        <div className="hero-eyebrow">WatchNow Original</div>
        <h1 className="hero-title">{title}</h1>
        <div className="hero-meta">
          {score && <span className="hero-match">{score}% Match</span>}
          {year && <span>{year}</span>}
          <span className="hero-badge">HD</span>
        </div>
        <p className="hero-desc">{overview.length > 180 ? overview.slice(0, 180) + '…' : overview}</p>
        <div className="hero-btns">
          <button className="hero-btn hero-btn-play">
            <PlayIcon /> Play
          </button>
          <button className="hero-btn hero-btn-info" onClick={() => onInfo(movie)}>
            <InfoIcon /> More Info
          </button>
        </div>
      </div>
      <div className="hero-dots">
        {Array.from({ length: Math.min(movies.length, 5) }).map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === idx ? ' active' : ''}`}
            onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 300); }}
          />
        ))}
      </div>
    </div>
  );
}

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/>
  </svg>
);
