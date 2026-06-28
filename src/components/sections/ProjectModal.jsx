import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose}>
      <img src={src} alt="" onClick={e => e.stopPropagation()} />
      <button className="lightbox-close" onClick={onClose}>✕</button>
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  const thumbnails = ['🌤️', '📊', '🖥️', '📱'];
  const placeholderEmojis = { 'AI/ML': '🤖', 'Web Development': '🌐', 'Data Science': '📊', 'Full Stack': '⚡', 'Mobile App': '📱' };
  const emoji = placeholderEmojis[project.category] || '💻';

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* Banner */}
            <div className="modal-banner">
              {project.thumbnail ? (
                <img src={project.thumbnail} alt={project.title} onError={e => e.target.style.display='none'} />
              ) : null}
              <div className="modal-banner-placeholder">{emoji}</div>
              <button className="modal-close" onClick={onClose}>✕</button>
            </div>

            <div className="modal-body">
              <h2 className="modal-title">{project.title}</h2>
              <div className="modal-meta">
                <span className="badge">{project.category}</span>
                {project.featured && <span className="badge" style={{ background: 'rgba(250, 204, 21, 0.12)', color: '#facc15', border: '1px solid rgba(250, 204, 21, 0.2)' }}>⭐ Featured</span>}
              </div>

              <div className="modal-section-title">Overview</div>
              <p className="modal-text">{project.overview}</p>

              <div className="modal-section-title">Problem Statement</div>
              <p className="modal-text">{project.problem}</p>

              <div className="modal-section-title">Key Features</div>
              <ul className="modal-list">
                {project.features?.map((f, i) => <li key={i}>{f}</li>)}
              </ul>

              <div className="modal-section-title">Technologies Used</div>
              <div className="modal-tech-grid">
                {project.technologies.map(t => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>

              <div className="modal-section-title">Challenges Faced</div>
              <ul className="modal-list">
                {project.challenges?.map((c, i) => <li key={i}>{c}</li>)}
              </ul>

              <div className="modal-section-title">Key Learnings</div>
              <ul className="modal-list">
                {project.learnings?.map((l, i) => <li key={i}>{l}</li>)}
              </ul>

              {/* Image Gallery */}
              <div className="modal-section-title">Project Gallery</div>
              <div className="modal-gallery">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="modal-gallery-img"
                    onClick={() => project.images?.[i] && setLightboxSrc(project.images[i])}
                  >
                    {project.images?.[i] ? (
                      <img src={project.images[i]} alt={`Screenshot ${i + 1}`} onError={e => e.target.style.display='none'} />
                    ) : null}
                    <div className="modal-gallery-placeholder">
                      {thumbnails[i]}
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
                        {['Home Page', 'Main Feature', 'Dashboard', 'Mobile View'][i]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-actions">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    View on GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <span>↗</span> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </>
  );
}
