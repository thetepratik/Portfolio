import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Reveal } from '../common/Animations';

export default function Testimonials() {
  const { data } = useData();
  const { testimonials } = data;
  const [current, setCurrent] = useState(0);
  const pairs = [];
  for (let i = 0; i < testimonials.length; i += 2) pairs.push(testimonials.slice(i, i + 2));
  const maxPage = pairs.length - 1;

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ Social Proof</div>
            <h2 className="section-title">What People Say</h2>
            <p className="section-subtitle">Feedback from mentors, managers, and clients I've had the pleasure of working with.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="testimonials-slider">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="testimonials-track"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {(pairs[current] || []).map(t => (
                  <div key={t.id} className="testimonial-card">
                    <div className="testimonial-quote">"</div>
                    <p className="testimonial-text">{t.review}</p>
                    <div className="testimonial-author">
                      <div className="testimonial-avatar">
                        {t.photo ? <img src={t.photo} alt={t.name} onError={e => e.target.style.display='none'} /> : null}
                        <span>👤</span>
                      </div>
                      <div>
                        <div className="testimonial-name">{t.name}</div>
                        <div className="testimonial-pos">{t.position}</div>
                        <div className="testimonial-company">{t.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="slider-controls">
            <button className="slider-btn" onClick={() => setCurrent(p => Math.max(0, p - 1))}>←</button>
            <div className="slider-dots">
              {pairs.map((_, i) => (
                <button key={i} className={`slider-dot ${i === current ? 'active' : ''}`} onClick={() => setCurrent(i)} />
              ))}
            </div>
            <button className="slider-btn" onClick={() => setCurrent(p => Math.min(maxPage, p + 1))}>→</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
