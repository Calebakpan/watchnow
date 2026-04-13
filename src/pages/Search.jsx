import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdb } from '../tmdb';
import { imgUrl } from '../tmdb';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';
import './Search.css';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selected, open, close } = useModal();

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    tmdb.search(query)
      .then(d => { setResults(d.results.filter(r => r.media_type !== 'person')); setLoading(false); })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="search-page">
      <h1 className="search-heading">
        {query ? `Results for "${query}"` : 'Search'}
      </h1>
      {loading && <div className="search-loading">Searching…</div>}
      <div className="search-grid">
        {results.map(item => {
          const poster = imgUrl(item.poster_path, 'w342');
          const title = item.title || item.name;
          return (
            <div key={item.id} className="search-card" onClick={() => open(item)}>
              {poster
                ? <img src={poster} alt={title} loading="lazy" />
                : <div className="search-card-placeholder"><span>{title}</span></div>
              }
              <p className="search-card-title">{title}</p>
              <p className="search-card-type">{item.media_type === 'tv' ? 'TV Series' : 'Movie'}</p>
            </div>
          );
        })}
      </div>
      {!loading && results.length === 0 && query && (
        <p className="search-empty">No results found for "{query}"</p>
      )}
      {selected && <Modal movie={selected} onClose={close} />}
    </div>
  );
}
