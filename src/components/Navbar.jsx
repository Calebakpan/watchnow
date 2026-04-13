import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Series', path: '/series' },
  { label: 'Films', path: '/films' },
  { label: 'New & Hot', path: '/new' },
  { label: 'My List', path: '/mylist' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  };

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">WatchNow</Link>

        <button className="nav-hamburger" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
          <span /><span /><span />
        </button>

        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`nav-link${location.pathname === l.path ? ' active' : ''}`}
            >{l.label}</Link>
          ))}
        </div>

        <div className="nav-right">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="nav-search-form">
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Titles, people, genres..."
                className="nav-search-input"
                onBlur={() => { if (!query) setSearchOpen(false); }}
              />
              <button type="submit" className="nav-search-btn">⌕</button>
            </form>
          ) : (
            <button className="nav-icon-btn" onClick={openSearch} aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          )}
          <div className="nav-avatar">CA</div>
        </div>
      </div>
    </nav>
  );
}
