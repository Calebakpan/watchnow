import { useRef } from 'react';
import { imgUrl } from '../tmdb';
import './MovieRow.css';

export default function MovieRow({ title, movies, onSelect, loading }) {
  const rowRef = useRef();

  const scroll = (dir) => {
    const amount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="row-section">
      <div className="row-header">
        <h2 className="row-title">{title}</h2>
        <span className="row-explore">Explore all →</span>
      </div>
      <div className="row-wrapper">
        <button className="row-arrow row-arrow-left" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
        <div className="row-track" ref={rowRef}>
          {loading
            ? Array.from({ length: 7 }).map((_, i) => <div key={i} className="card-skeleton skeleton" />)
            : movies?.map(movie => (
                <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
              ))
          }
        </div>
        <button className="row-arrow row-arrow-right" onClick={() => scroll(1)} aria-label="Scroll right">›</button>
      </div>
    </section>
  );
}

function MovieCard({ movie, onSelect }) {
  const poster = imgUrl(movie.poster_path, 'w342');
  const title = movie.title || movie.name || '';
  const score = movie.vote_average ? Math.round(movie.vote_average * 10) : null;

  return (
    <div className="movie-card" onClick={() => onSelect(movie)} title={title}>
      <div className="card-thumb">
        {poster
          ? <img src={poster} alt={title} loading="lazy" />
          : <div className="card-no-poster"><span>{title}</span></div>
        }
        <div className="card-hover-overlay">
          <div className="card-play-btn">▶</div>
          {score && <div className="card-score">{score}% match</div>}
          <div className="card-actions">
            <button className="card-action-btn" aria-label="Add to list">+</button>
            <button className="card-action-btn" aria-label="Like">👍</button>
          </div>
        </div>
      </div>
      <div className="card-info">
        <span className="card-title">{title}</span>
      </div>
    </div>
  );
}
