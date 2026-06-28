import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import '../../styles/admin.css';

/* ─── Sub-panels ─── */
function DashboardHome({ data }) {
  const stats = [
    { label: 'Projects', value: data.projects.length, icon: '⚡' },
    { label: 'Skill Groups', value: data.skills.length, icon: '🧠' },
    { label: 'Experience', value: data.experience.length, icon: '💼' },
    { label: 'Certifications', value: data.certifications.length, icon: '🎓' },
  ];
  return (
    <div>
      <div className="admin-section-title">Dashboard Overview</div>
      <div className="admin-section-sub">Welcome back! Here's a snapshot of your portfolio content.</div>
      <div className="admin-stats-row">
        {stats.map(s => (
          <div key={s.label} className="admin-stat-card">
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div className="admin-stat-num">{s.value}</div>
            <div className="admin-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

function HeroEditor({ data, updateData }) {
  const [form, setForm] = useState(data.hero);
  const save = () => updateData('hero', form);
  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setSocial = (key, val) => setForm(f => ({ ...f, socials: { ...f.socials, [key]: val } }));

  return (
    <div>
      <div className="admin-section-title">Hero / Profile</div>
      <div className="admin-card">
        <div className="admin-form">
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" value={form.name} onChange={e => setField('name', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Profile Image URL</label><input className="form-input" value={form.profileImage} onChange={e => setField('profileImage', e.target.value)} /></div>
          </div>
          <div className="form-group"><label className="form-label">Short Introduction</label><textarea className="form-textarea" rows={3} value={form.introduction} onChange={e => setField('introduction', e.target.value)} /></div>
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">Resume URL</label><input className="form-input" value={form.resumeUrl} onChange={e => setField('resumeUrl', e.target.value)} /></div>
          </div>
          <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginBottom: '0.75rem' }}>Social Links</div>
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">GitHub URL</label><input className="form-input" value={form.socials.github} onChange={e => setSocial('github', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">LinkedIn URL</label><input className="form-input" value={form.socials.linkedin} onChange={e => setSocial('linkedin', e.target.value)} /></div>
          </div>
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">Twitter URL</label><input className="form-input" value={form.socials.twitter} onChange={e => setSocial('twitter', e.target.value)} /></div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" value={form.socials.email} onChange={e => setSocial('email', e.target.value)} /></div>
          </div>
          <div className="admin-form-actions">
            <button className="btn btn-primary" onClick={save}>💾 Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsEditor({ data, updateData }) {
  const [projects, setProjects] = useState(data.projects);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const openNew = () => {
    setForm({ id: Date.now().toString(), title: '', description: '', category: 'AI/ML', technologies: [], github: '', demo: '', featured: false, views: 0, overview: '', problem: '', features: [], challenges: [], learnings: [], images: [], thumbnail: '' });
    setEditing('new');
  };
  const openEdit = (p) => { setForm({ ...p }); setEditing(p.id); };
  const save = () => {
    const updated = editing === 'new' ? [...projects, form] : projects.map(p => p.id === editing ? form : p);
    setProjects(updated);
    updateData('projects', updated);
    setEditing(null);
  };
  const remove = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    updateData('projects', updated);
  };

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <button className="btn btn-ghost" onClick={() => setEditing(null)}>← Back</button>
          <div className="admin-section-title" style={{ margin: 0 }}>{editing === 'new' ? 'New Project' : 'Edit Project'}</div>
        </div>
        <div className="admin-card">
          <div className="admin-form">
            <div className="admin-form-row">
              <div className="form-group"><label className="form-label">Project Title</label><input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {['AI/ML', 'Web Development', 'Mobile App', 'Data Science', 'Full Stack'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label className="form-label">Short Description</label><textarea className="form-textarea" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            <div className="admin-form-row">
              <div className="form-group"><label className="form-label">Thumbnail URL</label><input className="form-input" value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))} /></div>
              <div className="form-group"><label className="form-label">GitHub URL</label><input className="form-input" value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))} /></div>
            </div>
            <div className="form-group"><label className="form-label">Live Demo URL</label><input className="form-input" value={form.demo} onChange={e => setForm(f => ({ ...f, demo: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Overview</label><textarea className="form-textarea" rows={3} value={form.overview} onChange={e => setForm(f => ({ ...f, overview: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Problem Statement</label><textarea className="form-textarea" rows={3} value={form.problem} onChange={e => setForm(f => ({ ...f, problem: e.target.value }))} /></div>
            <div className="form-group">
              <label className="form-label">Technologies (comma-separated)</label>
              <input className="form-input" value={Array.isArray(form.technologies) ? form.technologies.join(', ') : form.technologies} onChange={e => setForm(f => ({ ...f, technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Features (one per line)</label>
              <textarea className="form-textarea" rows={4} value={Array.isArray(form.features) ? form.features.join('\n') : ''} onChange={e => setForm(f => ({ ...f, features: e.target.value.split('\n').filter(Boolean) }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Challenges (one per line)</label>
              <textarea className="form-textarea" rows={3} value={Array.isArray(form.challenges) ? form.challenges.join('\n') : ''} onChange={e => setForm(f => ({ ...f, challenges: e.target.value.split('\n').filter(Boolean) }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Learnings (one per line)</label>
              <textarea className="form-textarea" rows={3} value={Array.isArray(form.learnings) ? form.learnings.join('\n') : ''} onChange={e => setForm(f => ({ ...f, learnings: e.target.value.split('\n').filter(Boolean) }))} />
            </div>
            <div className="form-group">
              <label className="form-label">Image URLs (one per line, max 4)</label>
              <textarea className="form-textarea" rows={4} value={Array.isArray(form.images) ? form.images.join('\n') : ''} onChange={e => setForm(f => ({ ...f, images: e.target.value.split('\n').filter(Boolean).slice(0, 4) }))} />
            </div>
            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
              <label htmlFor="featured" className="form-label" style={{ margin: 0 }}>Mark as Featured</label>
            </div>
            <div className="admin-form-actions">
              <button className="btn btn-primary" onClick={save}>💾 Save Project</button>
              <button className="btn btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="admin-section-title" style={{ margin: 0 }}>Projects ({projects.length})</div>
        <button className="btn btn-primary" onClick={openNew}>+ Add Project</button>
      </div>
      <div className="admin-item-list">
        {projects.map(p => (
          <div key={p.id} className="admin-item">
            <div style={{ fontSize: '1.5rem' }}>{p.featured ? '⭐' : '💻'}</div>
            <div className="admin-item-body">
              <div className="admin-item-title">{p.title}</div>
              <div className="admin-item-sub">{p.category} · {p.technologies?.slice(0, 3).join(', ')}</div>
            </div>
            <div className="admin-item-actions">
              <button className="admin-action-btn edit" onClick={() => openEdit(p)}>✏️</button>
              <button className="admin-action-btn delete" onClick={() => remove(p.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsEditor({ data, updateData }) {
  const [skillGroups, setSkillGroups] = useState(data.skills);

  const updateGroup = (gi, field, val) => {
    const updated = skillGroups.map((g, i) => i === gi ? { ...g, [field]: val } : g);
    setSkillGroups(updated);
    updateData('skills', updated);
  };

  const updateSkill = (gi, si, field, val) => {
    const updated = skillGroups.map((g, i) => i === gi ? {
      ...g, skills: g.skills.map((s, j) => j === si ? { ...s, [field]: val } : s)
    } : g);
    setSkillGroups(updated);
    updateData('skills', updated);
  };

  const addSkill = (gi) => {
    const updated = skillGroups.map((g, i) => i === gi ? { ...g, skills: [...g.skills, { name: 'New Skill', level: 70 }] } : g);
    setSkillGroups(updated);
    updateData('skills', updated);
  };

  const removeSkill = (gi, si) => {
    const updated = skillGroups.map((g, i) => i === gi ? { ...g, skills: g.skills.filter((_, j) => j !== si) } : g);
    setSkillGroups(updated);
    updateData('skills', updated);
  };

  return (
    <div>
      <div className="admin-section-title">Skills Editor</div>
      {skillGroups.map((group, gi) => (
        <div key={gi} className="admin-card" style={{ marginBottom: '1rem' }}>
          <div className="admin-card-header">
            <input className="form-input" value={group.category} onChange={e => updateGroup(gi, 'category', e.target.value)} style={{ fontWeight: '700', fontSize: '0.95rem' }} />
            <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }} onClick={() => addSkill(gi)}>+ Skill</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {group.skills.map((skill, si) => (
              <div key={si} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input className="form-input" value={skill.name} onChange={e => updateSkill(gi, si, 'name', e.target.value)} style={{ flex: 1 }} />
                <input type="number" className="form-input" value={skill.level} min={0} max={100} onChange={e => updateSkill(gi, si, 'level', +e.target.value)} style={{ width: '80px' }} />
                <button className="admin-action-btn delete" onClick={() => removeSkill(gi, si)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GenericListEditor({ title, items, setItems, updateData, section, renderItem, emptyItem, renderForm }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const openNew = () => { setForm({ ...emptyItem, id: Date.now().toString() }); setEditing('new'); };
  const openEdit = (item) => { setForm({ ...item }); setEditing(item.id); };
  const save = () => {
    const updated = editing === 'new' ? [...items, form] : items.map(i => i.id === editing ? form : i);
    setItems(updated);
    updateData(section, updated);
    setEditing(null);
  };
  const remove = (id) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    updateData(section, updated);
  };

  if (editing !== null) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <button className="btn btn-ghost" onClick={() => setEditing(null)}>← Back</button>
          <div className="admin-section-title" style={{ margin: 0 }}>{editing === 'new' ? `New ${title}` : `Edit ${title}`}</div>
        </div>
        <div className="admin-card">
          <div className="admin-form">
            {renderForm(form, setForm)}
            <div className="admin-form-actions">
              <button className="btn btn-primary" onClick={save}>💾 Save</button>
              <button className="btn btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="admin-section-title" style={{ margin: 0 }}>{title} ({items.length})</div>
        <button className="btn btn-primary" onClick={openNew}>+ Add</button>
      </div>
      <div className="admin-item-list">
        {items.map(item => (
          <div key={item.id} className="admin-item">
            {renderItem(item)}
            <div className="admin-item-actions">
              <button className="admin-action-btn edit" onClick={() => openEdit(item)}>✏️</button>
              <button className="admin-action-btn delete" onClick={() => remove(item.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceEditor({ data, updateData }) {
  const [items, setItems] = useState(data.experience);
  return (
    <GenericListEditor
      title="Experience" items={items} setItems={setItems} updateData={updateData} section="experience"
      emptyItem={{ company: '', role: '', duration: '', location: '', description: '', skills: [] }}
      renderItem={item => (
        <div className="admin-item-body">
          <div className="admin-item-title">{item.role} @ {item.company}</div>
          <div className="admin-item-sub">{item.duration}</div>
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">Role</label><input className="form-input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Company</label><input className="form-input" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
          </div>
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">Duration</label><input className="form-input" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
          </div>
          <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
          <div className="form-group"><label className="form-label">Skills (comma-separated)</label><input className="form-input" value={Array.isArray(form.skills) ? form.skills.join(', ') : ''} onChange={e => setForm(f => ({ ...f, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} /></div>
        </>
      )}
    />
  );
}

function CertsEditor({ data, updateData }) {
  const [items, setItems] = useState(data.certifications);
  return (
    <GenericListEditor
      title="Certifications" items={items} setItems={setItems} updateData={updateData} section="certifications"
      emptyItem={{ name: '', organization: '', date: '', credential: '', image: '' }}
      renderItem={item => (
        <div className="admin-item-body">
          <div className="admin-item-title">{item.name}</div>
          <div className="admin-item-sub">{item.organization} · {item.date}</div>
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">Certificate Name</label><input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Organization</label><input className="form-input" value={form.organization} onChange={e => setForm(f => ({ ...f, organization: e.target.value }))} /></div>
          </div>
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">Date</label><input className="form-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Credential URL</label><input className="form-input" value={form.credential} onChange={e => setForm(f => ({ ...f, credential: e.target.value }))} /></div>
          </div>
          <div className="form-group"><label className="form-label">Certificate Image URL</label><input className="form-input" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} /></div>
        </>
      )}
    />
  );
}

function TestimonialsEditor({ data, updateData }) {
  const [items, setItems] = useState(data.testimonials);
  return (
    <GenericListEditor
      title="Testimonials" items={items} setItems={setItems} updateData={updateData} section="testimonials"
      emptyItem={{ name: '', position: '', company: '', photo: '', review: '' }}
      renderItem={item => (
        <div className="admin-item-body">
          <div className="admin-item-title">{item.name}</div>
          <div className="admin-item-sub">{item.position} @ {item.company}</div>
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Position</label><input className="form-input" value={form.position} onChange={e => setForm(f => ({ ...f, position: e.target.value }))} /></div>
          </div>
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">Company</label><input className="form-input" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Photo URL</label><input className="form-input" value={form.photo} onChange={e => setForm(f => ({ ...f, photo: e.target.value }))} /></div>
          </div>
          <div className="form-group"><label className="form-label">Review</label><textarea className="form-textarea" rows={4} value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} /></div>
        </>
      )}
    />
  );
}

function BlogEditor({ data, updateData }) {
  const [items, setItems] = useState(data.blog);
  return (
    <GenericListEditor
      title="Blog Posts" items={items} setItems={setItems} updateData={updateData} section="blog"
      emptyItem={{ title: '', banner: '', date: '', readTime: '', tags: [], content: '' }}
      renderItem={item => (
        <div className="admin-item-body">
          <div className="admin-item-title">{item.title}</div>
          <div className="admin-item-sub">{item.date} · {item.readTime}</div>
        </div>
      )}
      renderForm={(form, setForm) => (
        <>
          <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
          <div className="admin-form-row">
            <div className="form-group"><label className="form-label">Date</label><input className="form-input" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Read Time</label><input className="form-input" placeholder="8 min" value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))} /></div>
          </div>
          <div className="form-group"><label className="form-label">Banner Image URL</label><input className="form-input" value={form.banner} onChange={e => setForm(f => ({ ...f, banner: e.target.value }))} /></div>
          <div className="form-group"><label className="form-label">Tags (comma-separated)</label><input className="form-input" value={Array.isArray(form.tags) ? form.tags.join(', ') : ''} onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} /></div>
          <div className="form-group"><label className="form-label">Content / Summary</label><textarea className="form-textarea" rows={5} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} /></div>
        </>
      )}
    />
  );
}

function SettingsPanel({ data, updateData, resetData }) {
  const [seo, setSeo] = useState(data.seo);
  const save = () => updateData('seo', seo);

  return (
    <div>
      <div className="admin-section-title">Settings</div>
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-card-header"><div className="admin-card-title">SEO Configuration</div></div>
        <div className="admin-form">
          <div className="form-group"><label className="form-label">Page Title</label><input className="form-input" value={seo.title} onChange={e => setSeo(s => ({ ...s, title: e.target.value }))} /></div>
          <div className="form-group"><label className="form-label">Meta Description</label><textarea className="form-textarea" rows={2} value={seo.description} onChange={e => setSeo(s => ({ ...s, description: e.target.value }))} /></div>
          <div className="form-group"><label className="form-label">OG Image URL</label><input className="form-input" value={seo.ogImage} onChange={e => setSeo(s => ({ ...s, ogImage: e.target.value }))} /></div>
          <div className="admin-form-actions">
            <button className="btn btn-primary" onClick={save}>💾 Save SEO</button>
          </div>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-card-header"><div className="admin-card-title" style={{ color: '#fc6060' }}>Danger Zone</div></div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>This will reset all portfolio content back to the original default data.</p>
        <button className="btn" style={{ background: 'rgba(252,96,96,0.12)', color: '#fc6060', border: '1px solid rgba(252,96,96,0.3)' }} onClick={() => { if (window.confirm('Reset all content to default?')) resetData(); }}>
          🔄 Reset to Default Data
        </button>
      </div>
    </div>
  );
}

/* ─── Sidebar config ─── */
const SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'hero', label: 'Hero / Profile', icon: '👤' },
  { id: 'projects', label: 'Projects', icon: '⚡' },
  { id: 'skills', label: 'Skills', icon: '🧠' },
  { id: 'experience', label: 'Experience', icon: '💼' },
  { id: 'certifications', label: 'Certifications', icon: '🎓' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  { id: 'blog', label: 'Blog', icon: '📝' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data, updateData, resetData } = useData();
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const renderContent = () => {
    switch (active) {
      case 'dashboard': return <DashboardHome data={data} />;
      case 'hero': return <HeroEditor data={data} updateData={updateData} />;
      case 'projects': return <ProjectsEditor data={data} updateData={updateData} />;
      case 'skills': return <SkillsEditor data={data} updateData={updateData} />;
      case 'experience': return <ExperienceEditor data={data} updateData={updateData} />;
      case 'certifications': return <CertsEditor data={data} updateData={updateData} />;
      case 'testimonials': return <TestimonialsEditor data={data} updateData={updateData} />;
      case 'blog': return <BlogEditor data={data} updateData={updateData} />;
      case 'settings': return <SettingsPanel data={data} updateData={updateData} resetData={resetData} />;
      default: return null;
    }
  };

  const activeSection = SECTIONS.find(s => s.id === active);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div>
            <div className="admin-logo gradient-text">PT Admin</div>
          </div>
          <span className="admin-logo-badge">PANEL</span>
        </div>

        <nav className="admin-nav">
          <div className="admin-nav-section-label">Navigation</div>
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={`admin-nav-item ${active === s.id ? 'active' : ''}`}
              onClick={() => { setActive(s.id); setSidebarOpen(false); }}
            >
              <span className="admin-nav-icon">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-back-btn" onClick={() => navigate('/')}>
            ← Back to Portfolio
          </button>
          <button className="admin-back-btn" style={{ color: '#fc6060', marginTop: '0.25rem' }} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              style={{ display: 'none', padding: '0.5rem', background: 'none', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(o => !o)}
            >
              ☰
            </button>
            <div className="admin-breadcrumb">
              Admin <span>/ {activeSection?.label}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button className="theme-toggle" onClick={toggleTheme}>{theme === 'dark' ? '☀️' : '🌙'}</button>
            <button className="btn btn-ghost" onClick={() => navigate('/')}>View Site ↗</button>
            <button className="btn" style={{ background: 'rgba(252,96,96,0.1)', color: '#fc6060', border: '1px solid rgba(252,96,96,0.25)', fontSize: '0.8rem', padding: '0.45rem 0.9rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '600' }} onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
