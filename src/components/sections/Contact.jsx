import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Reveal } from '../common/Animations';

export default function Contact() {
  const { data } = useData();
  const { hero } = data;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  const socials = [
    { icon: '🐙', name: 'GitHub', value: '@pratikthete', url: hero.socials.github },
    { icon: '💼', name: 'LinkedIn', value: 'Pratik Thete', url: hero.socials.linkedin },
    { icon: '✉️', name: 'Email', value: hero.socials.email, url: `mailto:${hero.socials.email}` },
    { icon: '🐦', name: 'Twitter / X', value: '@pratikthete', url: `https://twitter.com/pratikthete` },
  ];

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ Connect</div>
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Open to collaborations, internships, research, and interesting conversations.</p>
          </div>
        </Reveal>

        <div className="contact-grid">
          <Reveal variant="slideLeft">
            <div className="contact-info">
              <h3 className="contact-info-title">Let's work together</h3>
              <p className="contact-info-text">
                Whether you have a project idea, an opportunity, or just want to say hello — my inbox is always open. I'll get back to you within 24 hours.
              </p>
              <div className="contact-socials">
                {socials.map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="contact-social-item">
                    <div className="contact-social-icon">{s.icon}</div>
                    <div>
                      <div className="contact-social-name">{s.name}</div>
                      <div className="contact-social-value">{s.value}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.8rem' }}>↗</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal variant="slideRight" delay={0.1}>
            <div className="contact-form">
              <AnimatePresence mode="wait">
                {!sent ? (
                  <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="contact-form-grid">
                      <div className="form-group">
                        <label className="form-label">Name *</label>
                        <input className="form-input" placeholder="Pratik Thete" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                        {errors.name && <span style={{ fontSize: '0.75rem', color: '#fc6060' }}>{errors.name}</span>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                        {errors.email && <span style={{ fontSize: '0.75rem', color: '#fc6060' }}>{errors.email}</span>}
                      </div>
                    </div>
                    <div className="contact-form-field form-group">
                      <label className="form-label">Subject *</label>
                      <input className="form-input" placeholder="Internship Opportunity / Collaboration" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                      {errors.subject && <span style={{ fontSize: '0.75rem', color: '#fc6060' }}>{errors.subject}</span>}
                    </div>
                    <div className="contact-form-field form-group">
                      <label className="form-label">Message *</label>
                      <textarea className="form-textarea" rows={5} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                      {errors.message && <span style={{ fontSize: '0.75rem', color: '#fc6060' }}>{errors.message}</span>}
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSubmit} disabled={loading}>
                      {loading ? '⏳ Sending...' : '🚀 Send Message'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="success" className="form-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="form-success-icon">🎉</div>
                    <div className="form-success-title">Message Sent!</div>
                    <p className="form-success-text">Thanks for reaching out, {form.name}. I'll reply to {form.email} within 24 hours.</p>
                    <button className="btn btn-ghost" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                      Send Another
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
