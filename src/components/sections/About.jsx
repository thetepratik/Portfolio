import { useData } from '../../context/DataContext';
import { Reveal, StaggerContainer, StaggerItem } from '../common/Animations';

export default function About() {
  const { data } = useData();
  const { about, education } = data;

  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ About Me</div>
            <h2 className="section-title">The Person Behind the Code</h2>
            <p className="section-subtitle">A driven engineer passionate about AI, software, and building things that matter.</p>
          </div>
        </Reveal>

        <div className="about-grid">
          {/* Image */}
          <Reveal variant="slideLeft">
            <div className="about-image-area">
              <div className="about-image-wrapper">
                {about.profileImage ? (
                  <img src={about.profileImage} alt="Profile" onError={e => e.target.style.display='none'} />
                ) : null}
                <div className="about-image-placeholder">👨‍💻</div>

                <div className="about-image-badge">
                  <div className="about-cgpa">{about.education.cgpa}</div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)' }}>Current CGPA</div>
                    <div className="about-cgpa-label">{about.education.degree}</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal variant="slideRight" delay={0.1}>
            <div className="about-content">
              <p className="about-bio">{about.bio}</p>

              <blockquote className="about-objective">
                <strong style={{ color: 'var(--accent-2)', display: 'block', marginBottom: '0.5rem', fontStyle: 'normal', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Career Objective</strong>
                {about.objective}
              </blockquote>

              <div className="about-section-label">Areas of Interest</div>
              <div className="about-interests">
                {about.interests.map((interest, i) => (
                  <span key={i} className="about-interest-tag">{interest}</span>
                ))}
              </div>

              <div className="about-section-label" style={{ marginTop: '1.5rem' }}>Education Timeline</div>
              <div className="timeline">
                {education.map((edu, i) => (
                  <div key={edu.id} className={`timeline-item ${edu.current ? 'current' : ''}`}>
                    <div className="timeline-dot" />
                    <div className="timeline-date">{edu.duration}</div>
                    <div className="timeline-title">{edu.degree}</div>
                    <div className="timeline-sub">{edu.institution}</div>
                    <div className="timeline-grade">{edu.grade}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
