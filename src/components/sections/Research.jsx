import { useData } from '../../context/DataContext';
import { Reveal, StaggerContainer, StaggerItem } from '../common/Animations';

export default function Research() {
  const { data } = useData();
  const { research } = data;
  return (
    <section className="section" id="research">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ Publications</div>
            <h2 className="section-title">Research & Publications</h2>
            <p className="section-subtitle">Academic contributions at the intersection of AI, privacy, and NLP.</p>
          </div>
        </Reveal>
        <StaggerContainer className="research-grid">
          {research.map(paper => (
            <StaggerItem key={paper.id}>
              <div className="research-card">
                <span className={`research-status ${paper.status === 'Published' ? 'published' : 'review'}`}>
                  {paper.status === 'Published' ? '✓ Published' : '⏳ Under Review'}
                </span>
                <h3 className="research-title">{paper.title}</h3>
                <div className="research-conf">📌 {paper.conference} · {paper.year}</div>
                <p className="research-abstract">{paper.abstract}</p>
                {paper.pdf && (
                  <a href={paper.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}>
                    📄 Read Paper
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
