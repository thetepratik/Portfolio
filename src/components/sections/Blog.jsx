import { useData } from '../../context/DataContext';
import { Reveal, StaggerContainer, StaggerItem } from '../common/Animations';

export default function Blog() {
  const { data } = useData();
  const { blog } = data;

  return (
    <section className="section" id="blog" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ Writing</div>
            <h2 className="section-title">Blog & Articles</h2>
            <p className="section-subtitle">Sharing learnings, technical deep-dives, and insights from engineering.</p>
          </div>
        </Reveal>
        <StaggerContainer className="blog-grid">
          {blog.map(post => (
            <StaggerItem key={post.id}>
              <article className="blog-card">
                <div className="blog-thumb">
                  {post.banner ? <img src={post.banner} alt={post.title} onError={e => e.target.style.display='none'} /> : null}
                  <span>📝</span>
                </div>
                <div className="blog-body">
                  <div className="blog-meta">
                    <span className="blog-date">{post.date}</span>
                    <span className="blog-sep">·</span>
                    <span className="blog-read">{post.readTime} read</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <div className="blog-tags">
                    {post.tags.map(t => <span key={t} className="blog-tag">{t}</span>)}
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
