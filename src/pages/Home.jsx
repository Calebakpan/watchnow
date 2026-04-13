import { useState } from 'react';
import { tmdb } from '../tmdb';
import { useFetch } from '../hooks/useFetch';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import Modal from '../components/Modal';
import { useModal } from '../hooks/useModal';
import './Home.css';

export default function Home() {
  const { data: trending } = useFetch(tmdb.trending, []);
  const { data: popular, loading: popLoading } = useFetch(tmdb.popular, []);
  const { data: topRated, loading: topLoading } = useFetch(tmdb.topRated, []);
  const { data: nowPlaying, loading: nowLoading } = useFetch(tmdb.nowPlaying, []);
  const { data: tvTrending, loading: tvLoading } = useFetch(tmdb.tvTrending, []);
  const { data: upcoming, loading: upcomingLoading } = useFetch(tmdb.upcoming, []);
  const { selected, open, close } = useModal();

  return (
    <div className="home">
      <Hero movies={trending?.results} onInfo={open} />
      <div className="home-rows">
        <MovieRow title="Trending Now" movies={trending?.results} onSelect={open} loading={!trending} />
        <MovieRow title="Popular on WatchNow" movies={popular?.results} onSelect={open} loading={popLoading} />
        <MovieRow title="Now Playing" movies={nowPlaying?.results} onSelect={open} loading={nowLoading} />
        <MovieRow title="Top Rated" movies={topRated?.results} onSelect={open} loading={topLoading} />
        <MovieRow title="Trending TV Series" movies={tvTrending?.results} onSelect={open} loading={tvLoading} />
        <MovieRow title="Coming Soon" movies={upcoming?.results} onSelect={open} loading={upcomingLoading} />
      </div>
      {selected && <ModalWithDetails movie={selected} onClose={close} />}
    </div>
  );
}

function ModalWithDetails({ movie, onClose }) {
  const isTV = !movie.title;
  const fetchFn = isTV ? () => tmdb.tvDetails(movie.id) : () => tmdb.movieDetails(movie.id);
  const { data } = useFetch(fetchFn, [movie.id]);
  return <Modal movie={data || movie} onClose={onClose} />;
}
