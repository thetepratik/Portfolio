import { useData } from '../../context/DataContext';
import { Reveal, StaggerContainer, StaggerItem } from '../common/Animations';

const ICONS = { trophy: '🏆', star: '⭐', award: '🥇', book: '📖', code: '💻', heart: '❤️' };

export default function Achievements() {
  const { data } = useData();
  const { achievements } = data;
  return (
    <section className="section" id="achievements" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ Recognition</div>
            <h2 className="section-title">Achievements</h2>
            <p className="section-subtitle">Milestones earned through hard work, creativity, and collaboration.</p>
          </div>
        </Reveal>
        <StaggerContainer className="achievements-grid">
          {achievements.map(a => (
            <StaggerItem key={a.id}>
              <div className="achievement-card">
                <div className="achievement-icon">{ICONS[a.icon] || '🏅'}</div>
                <div className="achievement-body">
                  <div className="achievement-title">{a.title}</div>
                  <div className="achievement-desc">{a.description}</div>
                  <div className="achievement-date">📅 {a.date}</div>
                  {a.certificate && (
                    <a href={a.certificate} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', marginTop: '0.75rem' }}>
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
