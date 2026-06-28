import { useData } from '../../context/DataContext';

const NAV = ['About', 'Skills', 'Projects', 'Experience', 'Research', 'Contact'];

export default function Footer() {
  const { data } = useData();
  const { hero } = data;
  const year = new Date().getFullYear();

  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-logo gradient-text">{hero.name}</div>
            <div className="footer-tagline">AI & Data Science Engineer · Full Stack Developer</div>
          </div>
          <div className="footer-links">
            {NAV.map(n => (
              <span key={n} className="footer-link" onClick={() => scrollTo(n)}>{n}</span>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© {year} {hero.name}. All rights reserved.</div>
          <div className="footer-made">Made with <span className="footer-heart">♥</span> in Pune, India</div>
        </div>
      </div>
    </footer>
  );
}
