import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-logo">WatchNow</p>
      <div className="footer-links">
        <a href="#faq">FAQ</a>
        <a href="#help">Help Centre</a>
        <a href="#account">Account</a>
        <a href="#media">Media Centre</a>
        <a href="#investor">Investor Relations</a>
        <a href="#jobs">Jobs</a>
        <a href="#privacy">Privacy</a>
        <a href="#terms">Terms of Use</a>
        <a href="#contact">Contact Us</a>
      </div>
      <p className="footer-copy">© 2024 WatchNow. Built with React + TMDB API.</p>
    </footer>
  );
}
