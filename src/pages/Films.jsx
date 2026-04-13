import { tmdb } from '../tmdb';
import { useFetch } from '../hooks/useFetch';
import MovieRow from '../components/MovieRow';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';
import './PageLayout.css';

export default function Films() {
  const { data: popular, loading: l1 } = useFetch(tmdb.popular, []);
  const { data: topRated, loading: l2 } = useFetch(tmdb.topRated, []);
  const { data: nowPlaying, loading: l3 } = useFetch(tmdb.nowPlaying, []);
  const { data: upcoming, loading: l4 } = useFetch(tmdb.upcoming, []);
  const { selected, open, close } = useModal();

  return (
    <div className="page-layout">
      <div className="page-header">
        <h1 className="page-title">Films</h1>
      </div>
      <MovieRow title="Popular Movies" movies={popular?.results} onSelect={open} loading={l1} />
      <MovieRow title="Now Playing" movies={nowPlaying?.results} onSelect={open} loading={l3} />
      <MovieRow title="Top Rated" movies={topRated?.results} onSelect={open} loading={l2} />
      <MovieRow title="Coming Soon" movies={upcoming?.results} onSelect={open} loading={l4} />
      {selected && <Modal movie={selected} onClose={close} />}
    </div>
  );
}
