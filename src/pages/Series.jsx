import { tmdb } from '../tmdb';
import { useFetch } from '../hooks/useFetch';
import MovieRow from '../components/MovieRow';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';
import './PageLayout.css';

export default function Series() {
  const { data: trending, loading: l1 } = useFetch(tmdb.tvTrending, []);
  const { data: popular, loading: l2 } = useFetch(tmdb.tvPopular, []);
  const { selected, open, close } = useModal();

  return (
    <div className="page-layout">
      <div className="page-header">
        <h1 className="page-title">Series</h1>
      </div>
      <MovieRow title="Trending TV" movies={trending?.results} onSelect={open} loading={l1} />
      <MovieRow title="Popular Series" movies={popular?.results} onSelect={open} loading={l2} />
      {selected && <Modal movie={selected} onClose={close} />}
    </div>
  );
}
