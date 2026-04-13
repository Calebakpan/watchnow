import { tmdb } from '../tmdb';
import { useFetch } from '../hooks/useFetch';
import MovieRow from '../components/MovieRow';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';
import './PageLayout.css';

export default function NewHot() {
  const { data: upcoming, loading: l1 } = useFetch(tmdb.upcoming, []);
  const { data: nowPlaying, loading: l2 } = useFetch(tmdb.nowPlaying, []);
  const { selected, open, close } = useModal();

  return (
    <div className="page-layout">
      <div className="page-header">
        <h1 className="page-title">New & Hot</h1>
      </div>
      <MovieRow title="Coming Soon" movies={upcoming?.results} onSelect={open} loading={l1} />
      <MovieRow title="Now Playing" movies={nowPlaying?.results} onSelect={open} loading={l2} />
      {selected && <Modal movie={selected} onClose={close} />}
    </div>
  );
}
