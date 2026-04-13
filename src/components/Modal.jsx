import { useEffect, useState } from 'react';
import { backdropUrl, imgUrl } from '../tmdb';
import './Modal.css';

export default function Modal({ movie, onClose }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!movie) return;
    setPlaying(false);
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const title = movie.title || movie.name || '';
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const score = movie.vote_average ? Math.round(movie.vote_average * 10) : null;
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
  const genres = movie.genres?.map(g => g.name).join(' · ') || '';
  const cast = movie.credits?.cast?.slice(0, 5).map(c => c.name).join(', ') || '';
  const director = movie.credits?.crew?.find(c => c.job === 'Director')?.name || '';
  const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    || movie.videos?.results?.find(v => v.site === 'YouTube');
  const bg = backdropUrl(movie.backdrop_path);
  const poster = imgUrl(movie.poster_path, 'w342');

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-label={title}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-hero">
          {playing && trailer ? (
            <div className="modal-player">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1`}
                title={`${title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <>
              {bg
                ? <img src={bg} alt={title} className="modal-hero-img" />
                : poster
                ? <img src={poster} alt={title} className="modal-hero-img" style={{ objectPosition: 'top' }} />
                : <div className="modal-hero-placeholder" />
              }
              {trailer && (
                <button className="modal-play-overlay" onClick={() => setPlaying(true)}>
                  <div className="modal-play-circle">
                    <span className="modal-play-icon">▶</span>
                  </div>
                  <span className="modal-play-label">Play Trailer</span>
                </button>
              )}
            </>
          )}
          <div className="modal-hero-gradient" />
          <div className="modal-hero-content">
            <h2 className="modal-title">{title}</h2>
            <div className="modal-btns">
              {trailer ? (
                <button
                  className="modal-btn modal-btn-play"
                  onClick={() => setPlaying(p => !p)}
                >
                  {playing ? '✕ Close Trailer' : '▶ Play Trailer'}
                </button>
              ) : (
                <button className="modal-btn modal-btn-play">▶ No Trailer Available</button>
              )}
              <button className="modal-btn modal-btn-list">+ My List</button>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-cols">
            <div className="modal-main">
              <div className="modal-meta">
                {score && <span className="modal-match">{score}% Match</span>}
                {year && <span>{year}</span>}
                {runtime && <span>{runtime}</span>}
                <span className="modal-rating-badge">HD</span>
              </div>
              <p className="modal-overview">{movie.overview}</p>
            </div>
            <div className="modal-side">
              {cast && <p className="modal-detail"><span className="modal-detail-label">Cast: </span>{cast}</p>}
              {director && <p className="modal-detail"><span className="modal-detail-label">Director: </span>{director}</p>}
              {genres && <p className="modal-detail"><span className="modal-detail-label">Genres: </span>{genres}</p>}
              {!trailer && <p className="modal-detail" style={{ color: '#666' }}>No trailer available for this title.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}