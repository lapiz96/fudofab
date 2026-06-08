import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BorderGlow from '../components/ui/BorderGlow/BorderGlow';
import { GeometricMark, GradientOrb } from '../components/ui/Visuals';

const GLOW_PROPS = {
  glowColor: '225 73 57',
  backgroundColor: '#dfe1e5',
  borderRadius: 20,
  glowRadius: 35,
  glowIntensity: 1.4,
  coneSpread: 30,
  animated: true,
  colors: ['#4169E1', '#60A5FA', '#1e3a8a'],
};

const CARD_GLOW_PROPS = {
  glowColor: '225 73 57',
  backgroundColor: '#F0F4FF',
  borderRadius: 20,
  glowRadius: 35,
  glowIntensity: 1.2,
  coneSpread: 30,
  animated: true,
  colors: ['#4169E1', '#60A5FA', '#93c5fd'],
};

const SVGS = {
  web: (
    <svg viewBox="0 0 240 160" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="gw_admin_web" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#4169E1" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="200" height="120" rx="8" fill="url(#gw_admin_web)" stroke="#60A5FA" strokeWidth="0.5" strokeOpacity="0.3" />
      <line x1="20" y1="45" x2="220" y2="45" stroke="#60A5FA" strokeWidth="0.5" strokeOpacity="0.3" />
      <rect x="30" y="55" width="80" height="55" rx="4" stroke="#4169E1" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
      <rect x="120" y="55" width="90" height="20" rx="3" stroke="#60A5FA" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
      <rect x="120" y="82" width="65" height="15" rx="3" stroke="#60A5FA" strokeWidth="0.4" strokeOpacity="0.2" fill="none" />
      <rect x="30" y="118" width="180" height="10" rx="2" stroke="#4169E1" strokeWidth="0.3" strokeOpacity="0.2" fill="none" />
      <circle cx="33" cy="33" r="3" fill="#60A5FA" fillOpacity="0.5" />
      <circle cx="43" cy="33" r="3" fill="#4169E1" fillOpacity="0.5" />
      <circle cx="53" cy="33" r="3" fill="#4169E1" fillOpacity="0.2" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 240 160" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <circle cx="120" cy="80" r="60" stroke="#60A5FA" strokeWidth="0.5" strokeOpacity="0.25" fill="none" />
      <circle cx="120" cy="80" r="42" stroke="#4169E1" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
      <circle cx="120" cy="80" r="24" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.4" fill="rgba(96,165,250,0.05)" />
      <line x1="60" y1="80" x2="180" y2="80" stroke="#60A5FA" strokeWidth="0.5" strokeOpacity="0.2" />
      <line x1="120" y1="20" x2="120" y2="140" stroke="#60A5FA" strokeWidth="0.5" strokeOpacity="0.2" />
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <line key={i} x1="120" y1="80"
          x2={120 + 60 * Math.cos(a * Math.PI / 180)} y2={80 + 60 * Math.sin(a * Math.PI / 180)}
          stroke="#4169E1" strokeWidth="0.3" strokeOpacity="0.2" />
      ))}
    </svg>
  ),
  video: (
    <svg viewBox="0 0 240 160" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <rect x="20" y="30" width="200" height="110" rx="8" stroke="#60A5FA" strokeWidth="0.5" strokeOpacity="0.25" fill="none" />
      <path d="M95 65 L95 95 L130 80 Z" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.5" fill="rgba(96,165,250,0.1)" />
      <rect x="20" y="125" width="200" height="8" rx="2" stroke="#4169E1" strokeWidth="0.3" strokeOpacity="0.2" fill="none" />
      <rect x="20" y="125" width="110" height="8" rx="2" fill="rgba(96,165,250,0.15)" />
      <circle cx="35" cy="45" r="4" stroke="#4169E1" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
      <circle cx="205" cy="45" r="4" stroke="#4169E1" strokeWidth="0.5" strokeOpacity="0.4" fill="none" />
    </svg>
  ),
};

const STATIC_PROJECTS_COUNT = 6; // Nebula, Astral, Luminos, Quantum, Flux, Orbit

export default function Admin() {
  const [customProjects, setCustomProjects] = useState([]);
  const [focusedField, setFocusedField] = useState(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCat, setFormCat] = useState('Web');
  const [formDesc, setFormDesc] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formImageFile, setFormImageFile] = useState(null);
  const [formImagePreview, setFormImagePreview] = useState('');

  // Load custom projects on mount
  useEffect(() => {
    const loadCustom = () => {
      const saved = localStorage.getItem('fudofab_portfolio');
      if (saved) {
        try {
          setCustomProjects(JSON.parse(saved));
        } catch (e) {
          setCustomProjects([]);
        }
      }
    };
    loadCustom();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!formTitle || !formDesc) {
      alert('Please fill out the Title and Description.');
      return;
    }

    const newProject = {
      id: Date.now(),
      cat: formCat,
      title: formTitle,
      desc: formDesc,
      tags: formTags ? formTags.split(',').map(t => t.trim()).filter(Boolean) : [formCat],
      image: formImagePreview || null,
      customUpload: true
    };

    const updated = [...customProjects, newProject];
    setCustomProjects(updated);
    localStorage.setItem('fudofab_portfolio', JSON.stringify(updated));

    // Dispatch custom event to notify homepage if running in SPA
    window.dispatchEvent(new Event('fudofab_portfolio_updated'));

    // Reset Form
    setFormTitle('');
    setFormDesc('');
    setFormTags('');
    setFormImageFile(null);
    setFormImagePreview('');
  };

  const deleteProject = (id) => {
    if (confirm('Are you sure you want to delete this custom project?')) {
      const updated = customProjects.filter(p => p.id !== id);
      setCustomProjects(updated);
      localStorage.setItem('fudofab_portfolio', JSON.stringify(updated));
      window.dispatchEvent(new Event('fudofab_portfolio_updated'));
    }
  };

  const clearAllCustom = () => {
    if (confirm('Are you sure you want to clear all custom uploaded projects?')) {
      setCustomProjects([]);
      localStorage.removeItem('fudofab_portfolio');
      window.dispatchEvent(new Event('fudofab_portfolio_updated'));
    }
  };

  // Stats
  const webCount = 2 + customProjects.filter(p => p.cat === 'Web').length; // 2 static Web
  const designCount = 2 + customProjects.filter(p => p.cat === 'Design').length; // 2 static Design
  const videoCount = 2 + customProjects.filter(p => p.cat === 'Video').length; // 2 static Video
  const totalCount = STATIC_PROJECTS_COUNT + customProjects.length;

  const getSvg = (cat) => {
    const map = { Web: 'web', Design: 'design', Video: 'video' };
    return SVGS[map[cat]] || SVGS.web;
  };

  // Helper for input focus style classes
  const fieldClass = (id) => `ct2-field${focusedField === id ? ' ct2-field-focused' : ''}`;

  return (
    <div className="enq-page">
      <div className="enq-bg-canvas" aria-hidden="true">
        <GeometricMark variant="grid" className="enq-bg-geo" />
      </div>
      <div className="enq-glow-1" />
      <div className="enq-glow-2" />
      <GradientOrb size="380px" top="10%" left="5%" />
      <GradientOrb size="300px" bottom="8%" right="5%" />

      {/* Navigation */}
      <nav className="enq-nav scrolled">
        <Link to="/" className="nav-logo" id="admin-logo-link">
          FUDO<span className="nav-logo-dot">FAB</span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.8 }}>
            Admin Panel
          </span>
          <Link to="/" className="enq-back-btn" id="admin-back-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Site
          </Link>
        </div>
      </nav>

      <div className="enq-container" style={{ paddingBlockStart: '8rem', paddingBlockEnd: '5rem' }}>
        <div className="enq-layout" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* Left panel: Stats & Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {[
                { title: 'Total Works', count: totalCount, color: 'var(--cyan)' },
                { title: 'Web Projects', count: webCount, color: '#4169E1' },
                { title: 'Design Projects', count: designCount, color: '#8B5CF6' },
                { title: 'Video Projects', count: videoCount, color: '#06B6D4' }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '16px',
                  padding: '1.2rem 1.5rem',
                  boxShadow: '0 8px 24px rgba(65, 105, 225, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(26, 47, 110, 0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.title}
                  </span>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, color: stat.color, fontFamily: 'var(--font-secondary)' }}>
                    {stat.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Upload form container */}
            <BorderGlow {...GLOW_PROPS} className="enq-form-glow" style={{ width: '100%' }}>
              <div className="enq-form-panel" style={{ padding: '2.5rem' }}>
                <div className="enq-step-heading" style={{ marginBottom: '2rem' }}>
                  <span className="enq-step-tag" style={{ background: '#3B82F6', color: '#fff' }}>+</span> 
                  Upload New Project
                </div>
                
                <form className="enq-form" onSubmit={handleUploadSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  
                  {/* Image Select */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(26, 47, 110, 0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Cover Image</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                      <div style={{
                        width: '130px',
                        height: '95px',
                        borderRadius: '12px',
                        border: '1px dashed rgba(65, 105, 225, 0.3)',
                        background: 'rgba(255,255,255,0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative'
                      }}>
                        {formImagePreview ? (
                          <img src={formImagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: '0.65rem', color: 'rgba(26, 47, 110, 0.4)', textAlign: 'center', padding: '0.5rem' }}>SVG Fallback used if empty</span>
                        )}
                      </div>
                      <label style={{
                        background: '#3B82F6',
                        color: '#FFFFFF',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '30px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'background 0.3s ease',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
                      }} onMouseEnter={e => e.currentTarget.style.background = '#1D4ED8'} onMouseLeave={e => e.currentTarget.style.background = '#3B82F6'}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 10v3H4v-3M8 3v7M5 6l3-3 3 3"/>
                        </svg>
                        <span>Choose File...</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                      </label>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.2rem' }}>
                    <div className={fieldClass('title')}>
                      <label className="ct2-label" htmlFor="admin-title">Project Title *</label>
                      <input
                        id="admin-title"
                        type="text"
                        className="ct2-input"
                        placeholder="e.g. Apollo Portal"
                        value={formTitle}
                        onChange={e => setFormTitle(e.target.value)}
                        onFocus={() => setFocusedField('title')}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>
                    
                    <div className={fieldClass('category')}>
                      <label className="ct2-label" htmlFor="admin-cat">Category</label>
                      <select
                        id="admin-cat"
                        className="ct2-input"
                        style={{ cursor: 'pointer', appearance: 'auto' }}
                        value={formCat}
                        onChange={e => setFormCat(e.target.value)}
                        onFocus={() => setFocusedField('category')}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option value="Web">Web</option>
                        <option value="Design">Design</option>
                        <option value="Video">Video</option>
                      </select>
                    </div>
                  </div>

                  <div className={fieldClass('desc')}>
                    <label className="ct2-label" htmlFor="admin-desc">Description *</label>
                    <textarea
                      id="admin-desc"
                      className="ct2-textarea"
                      style={{ minHeight: 90 }}
                      placeholder="Briefly describe the project objectives and implementation details..."
                      value={formDesc}
                      onChange={e => setFormDesc(e.target.value)}
                      onFocus={() => setFocusedField('desc')}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>

                  <div className={fieldClass('tags')}>
                    <label className="ct2-label" htmlFor="admin-tags">Tags (comma-separated)</label>
                    <input
                      id="admin-tags"
                      type="text"
                      className="ct2-input"
                      placeholder="e.g. Next.js, Tailwinds, ThreeJS"
                      value={formTags}
                      onChange={e => setFormTags(e.target.value)}
                      onFocus={() => setFocusedField('tags')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <button type="submit" className="ct2-submit enq-submit-btn" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                    <span>Publish to Portfolio</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                </form>
              </div>
            </BorderGlow>

          </div>

          {/* Right panel: Live card preview */}
          <div style={{ position: 'sticky', top: '8rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(26, 47, 110, 0.5)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              Live Portfolio Preview
            </span>

            <BorderGlow {...CARD_GLOW_PROPS} className="pf2-card-glow" style={{ width: '100%' }}>
              <div className="pf2-card card-scan" style={{ minHeight: '380px' }}>
                <div className="pf2-visual">
                  <div className="pf2-gradient" />
                  {formImagePreview ? (
                    <img src={formImagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  ) : (
                    getSvg(formCat)
                  )}
                </div>
                <div className="pf2-info">
                  <span className="pf2-cat">{formCat}</span>
                  <h3 className="pf2-name">{formTitle || 'Project Title'}</h3>
                  <p className="pf2-desc-card">{formDesc || 'Your project description will appear here as soon as you type it.'}</p>
                  <div className="pf2-tags">
                    {formTags ? 
                      formTags.split(',').map((t, j) => <span key={j} className="pf2-tag">{t.trim()}</span>)
                      : <span className="pf2-tag">{formCat}</span>
                    }
                  </div>
                  <span className="pf2-link" style={{ cursor: 'default' }}>
                    View Case Study →
                  </span>
                </div>
              </div>
            </BorderGlow>
            <p style={{ fontSize: '0.72rem', color: 'rgba(26, 47, 110, 0.45)', lineHeight: 1.5, textAlign: 'center' }}>
              This is a live preview of how the card will look and behave in the Selected Work grid on the home page.
            </p>
          </div>

        </div>

        {/* Custom Uploads Management Section */}
        <div style={{ marginTop: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(65, 105, 225, 0.1)', paddingBottom: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-primary)', color: '#0C182F', fontSize: '1.5rem', fontWeight: 800 }}>
                Manage Custom Projects
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'rgba(26, 47, 110, 0.5)', marginTop: '0.25rem' }}>
                View, delete or clear all project listings uploaded by you.
              </p>
            </div>
            {customProjects.length > 0 && (
              <button
                className="btn-secondary"
                style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#EF4444', borderRadius: '30px', padding: '0.6rem 1.5rem', fontSize: '0.72rem' }}
                onClick={clearAllCustom}
              >
                Clear All Uploads
              </button>
            )}
          </div>

          {customProjects.length === 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.4)',
              border: '1px dashed rgba(65, 105, 225, 0.2)',
              borderRadius: '16px',
              padding: '4rem 2rem',
              textAlign: 'center',
              color: 'rgba(26, 47, 110, 0.4)'
            }}>
              <svg width="32" height="32" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ marginBottom: '1rem', opacity: 0.6 }}>
                <path d="M13 14H3a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2zM5 7a1 1 0 100-2 1 1 0 000 2zm7 5v-3L9 6l-4 4"/>
              </svg>
              <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'rgba(26, 47, 110, 0.6)' }}>No Custom Uploads Yet</h4>
              <p style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>Fill in the form above to add a custom project to the portfolio section.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {customProjects.map((p) => (
                <div key={p.id} style={{
                  background: 'rgba(255, 255, 255, 0.75)',
                  border: '1px solid rgba(65, 105, 225, 0.1)',
                  borderRadius: '16px',
                  padding: '1.2rem',
                  display: 'flex',
                  gap: '1.2rem',
                  alignItems: 'center',
                  boxShadow: '0 4px 15px rgba(65, 105, 225, 0.02)',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '100px',
                    height: '80px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'rgba(255, 255, 255, 0.5)',
                    position: 'relative'
                  }}>
                    {p.image ? (
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {getSvg(p.cat)}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, background: '#3B82F61C', color: '#3B82F6', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                        {p.cat}
                      </span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0C182F', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {p.title}
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(26, 47, 110, 0.6)', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                      {p.desc}
                    </p>
                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginTop: '0.1rem' }}>
                      {p.tags.map((t, i) => (
                        <span key={i} style={{ fontSize: '0.62rem', background: 'rgba(26, 47, 110, 0.05)', color: 'rgba(26, 47, 110, 0.6)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteProject(p.id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#EF4444',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    title="Delete Project"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h10M5 6v6a1 1 0 001 1h4a1 1 0 001-1V6M6 6V4a1 1 0 011-1h2a1 1 0 011 1v2"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
