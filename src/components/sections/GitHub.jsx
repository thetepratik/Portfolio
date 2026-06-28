import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Reveal } from '../common/Animations';

function CountUp({ target, inView }) {
  return <span>{inView ? target.toLocaleString() : '0'}</span>;
}

export default function GitHub() {
  const { data } = useData();
  const { github } = data;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    { label: 'Repositories', value: github.stats.repos, icon: '📁' },
    { label: 'GitHub Stars', value: github.stats.stars, icon: '⭐' },
    { label: 'Followers', value: github.stats.followers, icon: '👥' },
    { label: 'Contributions', value: github.stats.contributions, icon: '🔥' },
  ];

  return (
    <section className="section" id="github" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ Open Source</div>
            <h2 className="section-title">GitHub Activity</h2>
            <p className="section-subtitle">Consistently contributing to open source and personal projects.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="github-stats-grid" ref={ref}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="github-stat"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div className="github-stat-num"><CountUp target={s.value} inView={inView} /></div>
                <div className="github-stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="github-langs">
            <div className="github-langs-title">Top Languages</div>
            {github.topLanguages.map((lang, i) => (
              <motion.div
                key={lang.name}
                className="lang-item"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <div className="lang-header">
                  <span className="lang-name">{lang.name}</span>
                  <span className="lang-percent">{lang.percent}%</span>
                </div>
                <div className="lang-bar">
                  <div className="lang-bar-fill" style={{ width: inView ? `${lang.percent}%` : '0%', transition: `width 1s ease ${0.4 + i * 0.1}s` }} />
                </div>
              </motion.div>
            ))}

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <a
                href={`https://github.com/${github.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.875rem' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View @{github.username} on GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
