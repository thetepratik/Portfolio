import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Reveal, StaggerContainer, StaggerItem } from '../common/Animations';

export default function Certifications() {
  const { data } = useData();
  const { certifications } = data;
  const [preview, setPreview] = useState(null);

  return (
    <section className="section" id="certifications">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ Credentials</div>
            <h2 className="section-title">Certifications</h2>
            <p className="section-subtitle">Verified credentials from leading platforms and organizations.</p>
          </div>
        </Reveal>
        <StaggerContainer className="certs-grid">
          {certifications.map(cert => (
            <StaggerItem key={cert.id}>
              <div className="cert-card" onClick={() => setPreview(cert)}>
                <div className="cert-thumb">
                  {cert.image ? <img src={cert.image} alt={cert.name} onError={e => e.target.style.display='none'} /> : null}
                  <span>🎓</span>
                </div>
                <div className="cert-body">
                  <div className="cert-name">{cert.name}</div>
                  <div className="cert-org">{cert.organization}</div>
                  <div className="cert-date">{cert.date}</div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPreview(null)}>
            <motion.div
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2rem', maxWidth: '480px', width: '100%', position: 'relative' }}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" style={{ top: '1rem', right: '1rem' }} onClick={() => setPreview(null)}>✕</button>
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{preview.name}</h3>
                <p style={{ color: 'var(--accent-2)', fontWeight: '600', marginBottom: '0.25rem' }}>{preview.organization}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Issued {preview.date}</p>
                {preview.credential && (
                  <a href={preview.credential} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    🔗 Verify Credential
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
