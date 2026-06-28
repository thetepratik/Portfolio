import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Reveal, StaggerContainer, StaggerItem } from '../common/Animations';

const ICONS = {
  code: '< >',
  monitor: '🖥',
  server: '⚙️',
  database: '🗄️',
  cpu: '🧠',
  tool: '🔧',
};

function SkillBar({ level, animate }) {
  return (
    <div className="skill-bar">
      <div
        className="skill-bar-fill"
        style={{ width: animate ? `${level}%` : '0%' }}
      />
    </div>
  );
}

function SkillCard({ category, icon, skills }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div className="skill-card" ref={ref}>
      <div className="skill-card-header">
        <div className="skill-card-icon">{ICONS[icon] || '✦'}</div>
        <div className="skill-card-category">{category}</div>
      </div>
      <div className="skill-list">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-item">
            <div className="skill-item-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>
            <SkillBar level={skill.level} animate={inView} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { data } = useData();
  const { skills } = data;

  return (
    <section className="section" id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <Reveal>
          <div className="section-header">
            <div className="section-eyebrow">✦ Expertise</div>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-subtitle">A curated stack built through real projects, internships, and research.</p>
          </div>
        </Reveal>

        <StaggerContainer className="skills-grid" stagger={0.08}>
          {skills.map((skillGroup, i) => (
            <StaggerItem key={skillGroup.category}>
              <SkillCard {...skillGroup} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
