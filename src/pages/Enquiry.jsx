import { useState } from 'react';
import { Link } from 'react-router-dom';
import BorderGlow from '../components/ui/BorderGlow/BorderGlow';
import { GeometricMark, GradientOrb } from '../components/ui/Visuals';

/* ── Service options ─────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'web',
    label: 'Web Design & Development',
    desc: 'Websites, apps & e-commerce',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="4" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7 11h4M7 14h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="5.5" cy="7.5" r="1" fill="currentColor" opacity="0.6"/>
        <circle cx="8.5" cy="7.5" r="1" fill="currentColor" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 'graphic',
    label: 'Graphic Design & Branding',
    desc: 'Logos, identity & collateral',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
        <path d="M11 2v4M11 16v4M2 11h4M16 11h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: 'video',
    label: 'Video Editing & Production',
    desc: 'Reels, films & motion graphics',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="1" y="5" width="14" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M15 9l6-4v12l-6-4V9z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <circle cx="7.5" cy="11" r="2" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'strategy',
    label: 'Digital Strategy',
    desc: 'SEO, analytics & growth',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 17l4-5 4 3 4-7 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
  },
];

/* ── Enquiry page ────────────────────────────────────────────────── */
export default function Enquiry() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', message: '',
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const toggleService = id => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  const field = (id, label, type = 'text', placeholder = '') => (
    <div className={`ct2-field${focusedField === id ? ' ct2-field-focused' : ''}`}>
      <label className="ct2-label" htmlFor={`enq-${id}`}>{label}</label>
      <input
        id={`enq-${id}`} type={type} className="ct2-input"
        placeholder={placeholder} value={formData[id]}
        onChange={e => setFormData(p => ({ ...p, [id]: e.target.value }))}
        onFocus={() => setFocusedField(id)} onBlur={() => setFocusedField(null)}
      />
    </div>
  );

  const progress = (() => {
    let filled = 0;
    if (formData.name) filled++;
    if (formData.email) filled++;
    if (selectedServices.length > 0) filled++;
    if (formData.message) filled++;
    return Math.round((filled / 4) * 100);
  })();

  return (
    <div className="enq-page">
      {/* CSS-only background */}
      <div className="enq-bg-canvas" aria-hidden>
        <GeometricMark variant="grid" className="enq-bg-geo" />
      </div>
      <div className="enq-glow-1" />
      <div className="enq-glow-2" />
      <GradientOrb size="380px" top="16%" left="4%" />
      <GradientOrb size="300px" bottom="10%" right="6%" />

      {/* Nav */}
      <nav className="enq-nav scrolled">
        <Link to="/" className="nav-logo" id="enq-logo-link">
          FUDO<span className="nav-logo-dot">FAB</span>
        </Link>
        <Link to="/" className="enq-back-btn" id="enq-back-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Site
        </Link>
      </nav>

      <div className="enq-container">
        {submitted ? (
          /* ── Success ──────────────────────────────────────────── */
          <div className="enq-success">
            <div className="enq-success-lottie">
              <GeometricMark variant="ring" />
            </div>
            <h2 className="enq-success-title">Enquiry Received!</h2>
            <p className="enq-success-text">
              Thank you. Our team will review your project details and get back
              to you within <strong style={{ color: 'var(--cyan)' }}>24 hours</strong>.
            </p>
            <div className="enq-success-ref">
              Reference: <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>
                FUDO-{Date.now().toString().slice(-6)}
              </span>
            </div>
            <Link to="/" className="btn-primary" id="enq-success-home"
              style={{ textDecoration: 'none', marginTop: '2rem' }}>
              <span>Return to Site</span>
            </Link>
          </div>
        ) : (
          /* ── Layout ───────────────────────────────────────────── */
          <div className="enq-layout">
            {/* Left info panel */}
            <div className="enq-info-panel">
              <div className="svc-header-eyebrow" style={{ marginBottom: '1rem' }}>
                <span className="eyebrow-dot" />
                Project Enquiry
                <span className="eyebrow-dot" />
              </div>
              <h1 className="enq-title">
                Tell Us About<br/>
                Your <span className="svc-title-accent">Project</span>.
              </h1>
              <p className="enq-subtitle">
                Fill in your details and we'll put together a customised proposal within 24 hours. No commitment required.
              </p>

              {/* Progress indicator */}
              <div className="enq-side-progress">
                <div className="enq-side-progress-label">
                  <span>Form Completion</span>
                  <span style={{ color: 'var(--cyan)' }}>{progress}%</span>
                </div>
                <div className="enq-side-progress-track">
                  <div className="enq-side-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Steps */}
              <div className="enq-steps">
                {[
                  { num: '01', label: 'Your Details', done: !!(formData.name && formData.email) },
                  { num: '02', label: 'Service Selection', done: selectedServices.length > 0 },
                  { num: '03', label: 'Project Brief', done: !!formData.message },
                ].map((s, i) => (
                  <div key={i} className={`enq-step${s.done ? ' enq-step-done' : i === 0 ? ' enq-step-active' : ''}`}>
                    <div className="enq-step-num">
                      {s.done ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="var(--cyan)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : s.num}
                    </div>
                    <div className="enq-step-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick contact */}
              <div className="enq-contact-quick">
                <div className="enq-quick-item">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <rect x="1" y="2.5" width="13" height="10" rx="2" stroke="var(--cyan)" strokeWidth="1.1"/>
                    <path d="M1 5.5l6.5 4 6.5-4" stroke="var(--cyan)" strokeWidth="1.1"/>
                  </svg>
                  hello@fudofab.com
                </div>
                <div className="enq-quick-item">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="7.5" r="6.5" stroke="var(--cyan)" strokeWidth="1.1"/>
                    <path d="M7.5 3.5v4l2.5 2.5" stroke="var(--cyan)" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  Reply within 24 hours
                </div>
              </div>
            </div>

            {/* Right form panel */}
            <BorderGlow
              glowColor="225 73 57"
              backgroundColor="#dfe1e5"
              borderRadius={20}
              glowRadius={35}
              glowIntensity={1.4}
              coneSpread={30}
              animated={true}
              colors={['#4169E1', '#60A5FA', '#1e3a8a']}
              className="enq-form-glow"
            >
            <div className="enq-form-panel">
              {/* Thin progress bar at top */}
              <div className="enq-form-progress">
                <div className="enq-progress-bar" style={{ width: `${progress}%` }} />
              </div>

              <form className="enq-form" id="enquiry-form" onSubmit={handleSubmit} noValidate>

                {/* ── Step 01: Personal details ──────────────────── */}
                <div className="enq-step-content">
                  <div className="enq-step-heading">
                    <span className="enq-step-tag">01</span> Your Details
                  </div>
                  <div className="enq-fields-grid-2">
                    {field('name',    'Full Name',        'text',  'John Smith')}
                    {field('email',   'Email Address',    'email', 'john@company.com')}
                  </div>
                  {field('company', 'Company / Brand Name', 'text', 'Acme Corp (optional)')}
                </div>

                {/* ── Step 02: Services (multi-select) ───────────── */}
                <div className="enq-step-content">
                  <div className="enq-step-heading">
                    <span className="enq-step-tag">02</span> Services Required
                    {selectedServices.length > 0 && (
                      <span className="enq-selected-count">
                        {selectedServices.length} selected
                      </span>
                    )}
                  </div>
                  <p className="enq-service-hint">Select all services that apply — you may choose multiple.</p>
                  <div className="enq-service-grid-4">
                    {SERVICES.map(svc => {
                      const isSelected = selectedServices.includes(svc.id);
                      return (
                        <button
                          key={svc.id}
                          type="button"
                          id={`enq-svc-${svc.id}`}
                          className={`enq-service-card${isSelected ? ' selected' : ''}`}
                          onClick={() => toggleService(svc.id)}
                          aria-pressed={isSelected}
                        >
                          {/* Checkbox indicator */}
                          <div className="enq-checkbox">
                            {isSelected && (
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.8"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <div className="enq-service-icon">{svc.icon}</div>
                          <div className="enq-service-text">
                            <div className="enq-service-label">{svc.label}</div>
                            <div className="enq-service-desc">{svc.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ── Step 03: Project brief ─────────────────────── */}
                <div className="enq-step-content">
                  <div className="enq-step-heading">
                    <span className="enq-step-tag">03</span> Project Brief
                  </div>
                  <div className={`ct2-field${focusedField === 'message' ? ' ct2-field-focused' : ''}`}>
                    <label className="ct2-label" htmlFor="enq-message">Describe Your Project</label>
                    <textarea
                      id="enq-message" className="ct2-textarea" style={{ minHeight: 140 }}
                      placeholder="Tell us about your vision, goals, target audience, and any specific requirements..."
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>

                {/* ── Submit ─────────────────────────────────────── */}
                <div className="enq-submit-row">
                  <button type="submit" className="ct2-submit enq-submit-btn" id="enq-submit">
                    <span>Submit Enquiry</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <p className="ct2-form-note enq-note">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
                      <rect x="3" y="5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1"/>
                      <path d="M4 5V3.5C4 2.12 5.12 1 6.5 1S9 2.12 9 3.5V5"
                        stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                    100% secure — we never share your details.
                  </p>
                </div>

              </form>
            </div>
            </BorderGlow>
          </div>
        )}
      </div>
    </div>
  );
}
