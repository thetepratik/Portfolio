import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

function TypingAnimation({ titles }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const target = titles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(target.slice(0, currentText.length + 1));
        if (currentText.length + 1 === target.length) {
          setIsDeleting(true);
          setSpeed(2000);
        } else {
          setSpeed(80);
        }
      } else {
        setCurrentText(target.slice(0, currentText.length - 1));
        setSpeed(40);
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % titles.length);
          setSpeed(200);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, speed, currentIndex, titles]);

  return (
    <span className="hero-typing-text">{currentText}</span>
  );
}

export default function HeroSection() {
  const { data } = useData();
  const { hero } = data;

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="hero-content">
        {/* Text */}
        <div className="hero-text">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hero-eyebrow-dot" />
            Available for Opportunities
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {hero.name}
          </motion.h1>

          <motion.div
            className="hero-typing-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="hero-typing-prefix">I&apos;m a </span>
            <TypingAnimation titles={hero.titles} />
            <span className="hero-cursor" />
          </motion.div>

          <motion.p
            className="hero-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {hero.introduction}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button className="btn btn-primary" onClick={scrollToProjects}>
              <span>⚡</span> View Projects
            </button>
            <a className="btn btn-secondary" href={hero.resumeUrl} download>
              <span>📄</span> Download Resume
            </a>
            <button className="btn btn-secondary" onClick={scrollToContact}>
              <span>💬</span> Contact Me
            </button>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="hero-social-label">Find me on</span>
            <a href={hero.socials.github} target="_blank" rel="noopener noreferrer" className="hero-social-link tooltip" data-tip="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href={hero.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hero-social-link tooltip" data-tip="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href={`https://twitter.com/${hero.socials.twitter?.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hero-social-link tooltip" data-tip="Twitter/X">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href={`mailto:${hero.socials.email}`} className="hero-social-link tooltip" data-tip="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-avatar-ring float-anim">
            <div className="hero-avatar-inner">
              {hero.profileImage ? (
                <img src={hero.profileImage} alt={hero.name} onError={e => e.target.style.display='none'} />
              ) : null}
              <div className="hero-avatar-placeholder">👨‍💻</div>
            </div>

            

            <div className="hero-chip hero-chip-2">
              <span className="hero-chip-icon"></span>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>AI Engineer</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>VIT Pune</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="hero-scroll-line" />
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
      </div>
    </section>
  );
}
