import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Reveal, StaggerContainer, StaggerItem } from '../common/Animations';
import ProjectModal from './ProjectModal';

const FILTERS = ['All', 'AI/ML', 'Web Development', 'Mobile App', 'Data Science', 'Full Stack'];

const EMOJI_MAP = { 'AI/ML': '🤖', 'Web Development': '🌐', 'Data Science': '📊', 'Full Stack': '⚡', 'Mobile App': '📱' };

export default function Projects() {
  const { data } = useData();
  const { projects } = data;
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = projects.filter(p => {
    const matchFilter = activeFilter === 'All' || p.category === activeFilter;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ Portfolio</div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Real-world applications spanning AI, full-stack, and data science.</p>
          </div>
        </Reveal>

        {/* Search */}
        <Reveal delay={0.1}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
              <input
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
                placeholder="Search projects or technologies..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.15}>
          <div className="project-filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`project-filter-btn ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + search}
            className="projects-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Thumbnail */}
                <div className="project-thumb">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt={project.title} onError={e => e.target.style.display = 'none'} />
                  ) : null}
                  <div className="project-thumb-placeholder">
                    {EMOJI_MAP[project.category] || '💻'}
                  </div>
                  {project.featured && <span className="project-featured-badge">⭐ Featured</span>}
                  <span className="project-category-badge">{project.category}</span>

                  <div className="project-thumb-overlay">
                    <button className="project-overlay-btn details" onClick={() => setSelectedProject(project)}>
                      View Details
                    </button>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-overlay-btn github">
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech-tags">
                    {project.technologies.slice(0, 4).map(t => (
                      <span key={t} className="project-tech-tag">{t}</span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="project-tech-tag">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                  <div className="project-links">
                    <button className="project-link" onClick={() => setSelectedProject(project)}>
                      📖 Details
                    </button>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                        ↗ Live
                      </a>
                    )}
                    <span className="project-views">👁 {project.views || 0}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p>No projects match your search. Try a different filter.</p>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
