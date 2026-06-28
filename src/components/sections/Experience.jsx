import { useData } from '../../context/DataContext';
import { Reveal } from '../common/Animations';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function ExpItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className="exp-item"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="exp-dot" />
      <div className="exp-card">
        <div className="exp-header">
          <div>
            <div className="exp-role">{item.role}</div>
            <div className="exp-company">{item.company}</div>
            {item.location && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>📍 {item.location}</div>}
          </div>
          <div className="exp-duration">{item.duration}</div>
        </div>
        <p className="exp-desc">{item.description}</p>
        <div className="exp-skills">
          {item.skills.map(s => <span key={s} className="badge" style={{ marginRight: '0.4rem', marginBottom: '0.4rem' }}>{s}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { data } = useData();
  const { experience } = data;
  return (
    <section className="section" id="experience" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ Career</div>
            <h2 className="section-title">Work Experience</h2>
            <p className="section-subtitle">Internships, research roles, and freelance projects that shaped my engineering perspective.</p>
          </div>
        </Reveal>
        <div className="experience-timeline">
          {experience.map((item, i) => <ExpItem key={item.id} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
}
