import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import LottiePlayer from './LottiePlayer';

/* ── SVG contact icons ──────────────────────────────────────────── */
const ContactIcons = {
  email: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke="var(--cyan)" strokeWidth="1.2"/>
      <path d="M2 7l8 5 8-5" stroke="var(--cyan)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  location: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2C6.69 2 4 4.69 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.31-2.69-6-6-6z"
        stroke="var(--cyan)" strokeWidth="1.2"/>
      <circle cx="10" cy="8" r="2" stroke="var(--cyan)" strokeWidth="1.2"/>
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="var(--cyan)" strokeWidth="1.2"/>
      <path d="M10 5v5l3 3" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

/* ── Social icons ───────────────────────────────────────────────── */
const SocialIcons = {
  Facebook: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M9 6H7v2H5v2h2v5h2v-5h2l1-2H9V5.5C9 5 9.5 5 9.5 5H11V3H9.5C7.5 3 7 4 7 5v1h2z"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Instagram: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="12" cy="4" r="0.8" fill="currentColor"/>
    </svg>
  ),
  YouTube: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6.5 6l4 2-4 2V6z" stroke="currentColor" strokeWidth="1"
        fill="currentColor" fillOpacity="0.3"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 7v4M5 5.5v.5M8 11V9c0-1 .5-2 2-2s2 1 2 2v2"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

/* ── Cosmic galaxy particle background ──────────────────────────── */
function CosmicFlow() {
  const ref = useRef();
  const COUNT = 2400;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT;
      const arm = Math.floor(Math.random() * 3);
      const armAngle = (arm / 3) * Math.PI * 2;
      const angle = t * Math.PI * 8 + armAngle;
      const radius = Math.pow(t, 0.5) * 5.5 + Math.random() * 0.4;
      const spread = (Math.random() - 0.5) * 0.9 * (1 - t * 0.5);
      pos[i * 3]     = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 2] = spread;
      const blend = Math.random();
      col[i * 3]     = blend * 0.31;
      col[i * 3 + 1] = blend * 0.55 + (1 - blend) * 0.83;
      col[i * 3 + 2] = 1.0;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.z = t * 0.04;
    ref.current.rotation.x = Math.sin(t * 0.12) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={COUNT} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors size={0.022} transparent opacity={0.75}
        sizeAttenuation depthWrite={false}
      />
    </points>
  );
}

/* ── Main Contact component ─────────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const createObs = (el, setter) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setter(true); obs.disconnect(); } },
        { threshold: 0.05 }
      );
      obs.observe(el);
      return obs;
    };
    const o1 = createObs(leftRef.current,  setLeftVisible);
    const o2 = createObs(rightRef.current, setRightVisible);
    return () => { o1?.disconnect(); o2?.disconnect(); };
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', service: '', budget: '', message: '' });
    }, 5000);
  };

  const field = (id, label, type = 'text', placeholder = '') => (
    <div className={`ct2-field${focusedField === id ? ' ct2-field-focused' : ''}`}>
      <label className="ct2-label" htmlFor={`ct-${id}`}>{label}</label>
      <input
        id={`ct-${id}`} type={type} className="ct2-input"
        placeholder={placeholder} value={formData[id]}
        onChange={e => setFormData(p => ({ ...p, [id]: e.target.value }))}
        onFocus={() => setFocusedField(id)} onBlur={() => setFocusedField(null)}
        required
      />
    </div>
  );

  const contactInfoItems = [
    { icon: ContactIcons.email,    label: 'Email Us',       value: 'hello@fudofab.com',  sub: 'We reply within 24 hours' },
    { icon: ContactIcons.location, label: 'Location',       value: 'Remote Worldwide',   sub: 'Available in all timezones' },
    { icon: ContactIcons.clock,    label: 'Response Time',  value: 'Under 2 Hours',      sub: 'During business hours' },
  ];

  return (
    <section id="contact" className="ct2-section" ref={sectionRef}>
      {/* ── Cosmic galaxy background ── */}
      <div className="ct2-bg-canvas" aria-hidden>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <CosmicFlow />
        </Canvas>
      </div>

      <div className="ct2-glow-top" />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="ct2-header">
          <div className="svc-header-eyebrow">
            <span className="eyebrow-dot" />
            Get In Touch
            <span className="eyebrow-dot" />
          </div>
          <h2 className="ct2-title">
            Let's Build Something <span className="svc-title-accent">Amazing</span>
          </h2>
          <p className="ct2-subtitle">
            Have a project in mind? We'd love to hear about it. Tell us what you're building and let's make it happen.
          </p>
        </div>

        {/* ── Two-column layout: left info / right form ── */}
        <div className="ct2-content-grid">
          {/* Left: Lottie + contact info + socials */}
          <div
            ref={leftRef}
            className="ct2-left"
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
            }}
          >
            {/* Lottie illustration */}
            <div className="ct2-lottie-wrap">
              <LottiePlayer
                src="https://assets2.lottiefiles.com/packages/lf20_syqnfe7c.json"
                loop autoplay style={{ width: '100%', height: '100%' }}
              />
            </div>

            {/* Social links */}
            <div className="ct2-socials">
              {Object.entries(SocialIcons).map(([name, icon]) => (
                <a key={name} href="#" className="ct2-social"
                  id={`ct2-social-${name.toLowerCase()}`} title={name} aria-label={name}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            ref={rightRef}
            className="ct2-right"
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}
          >
            {submitted ? (
              <div className="ct2-success" id="ct2-success">
                <div className="ct2-success-lottie">
                  <LottiePlayer
                    src="https://assets5.lottiefiles.com/packages/lf20_obhph3py.json"
                    loop={false} autoplay style={{ width: 120, height: 120 }}
                  />
                </div>
                <h3 className="ct2-success-title">Message Sent!</h3>
                <p className="ct2-success-text">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form className="ct2-form" id="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="ct2-form-row">
                  {field('name',  'Full Name',      'text',  'John Smith')}
                  {field('email', 'Email Address',  'email', 'john@example.com')}
                </div>
                <div className="ct2-form-row">
                  <div className={`ct2-field${focusedField === 'service' ? ' ct2-field-focused' : ''}`}>
                    <label className="ct2-label" htmlFor="ct-service">Service Needed</label>
                    <select id="ct-service" className="ct2-select"
                      value={formData.service}
                      onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}>
                      <option value="">Select service...</option>
                      <option value="web">Web Design &amp; Development</option>
                      <option value="graphic">Graphic Design &amp; Branding</option>
                      <option value="video">Video Editing &amp; Production</option>
                      <option value="all">Full Creative Package</option>
                    </select>
                  </div>
                  <div className={`ct2-field${focusedField === 'budget' ? ' ct2-field-focused' : ''}`}>
                    <label className="ct2-label" htmlFor="ct-budget">Project Budget</label>
                    <select id="ct-budget" className="ct2-select"
                      value={formData.budget}
                      onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))}
                      onFocus={() => setFocusedField('budget')}
                      onBlur={() => setFocusedField(null)}>
                      <option value="">Select budget...</option>
                      <option value="1k">$1K – $5K</option>
                      <option value="5k">$5K – $15K</option>
                      <option value="15k">$15K – $50K</option>
                      <option value="50k">$50K+</option>
                    </select>
                  </div>
                </div>
                <div className={`ct2-field${focusedField === 'message' ? ' ct2-field-focused' : ''}`}>
                  <label className="ct2-label" htmlFor="ct-message">Tell Us About Your Project</label>
                  <textarea id="ct-message" className="ct2-textarea"
                    placeholder="Describe your project, goals, timeline, and any specific requirements..."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <button type="submit" className="ct2-submit" id="ct2-submit">
                  <span>Send Message</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <p className="ct2-form-note">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
                    <rect x="3" y="5" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1"/>
                    <path d="M4 5V3.5C4 2.12 5.12 1 6.5 1S9 2.12 9 3.5V5"
                      stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                  Your data is safe. We never share your information with third parties.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div className="ct2-footer-improved">
          <div className="ct2-footer-top">
            <div className="ct2-footer-brand">
              <div className="ct2-footer-logo">FUDO<span>FAB</span></div>
              <p className="ct2-footer-tagline">Premium Creative Digital Studio</p>
            </div>

            <div className="ct2-footer-nav">
              <div className="ct2-footer-nav-col">
                <div className="ct2-footer-nav-title">Services</div>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>Web Development</a>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>Graphic Design</a>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>Video Editing</a>
              </div>
              <div className="ct2-footer-nav-col">
                <div className="ct2-footer-nav-title">Company</div>
                <a href="#about"        onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About Us</a>
                <a href="#portfolio"    onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>Portfolio</a>
                <a href="#testimonials" onClick={e => { e.preventDefault(); document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }); }}>Clients</a>
              </div>
              <div className="ct2-footer-nav-col">
                <div className="ct2-footer-nav-title">Contact</div>
                <a href="mailto:hello@fudofab.com">hello@fudofab.com</a>
                <a href="/enquiry">Submit Enquiry</a>
                <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Get In Touch</a>
              </div>
            </div>

            <div className="ct2-footer-socials-col">
              <div className="ct2-footer-nav-title">Follow Us</div>
              <div className="ct2-socials" style={{ marginTop: '0.8rem' }}>
                {Object.entries(SocialIcons).map(([name, icon]) => (
                  <a key={name} href="#" className="ct2-social"
                    id={`footer-social-${name.toLowerCase()}`} title={name} aria-label={name}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="ct2-footer-bottom">
            <div className="ct2-footer-copy">
              © {new Date().getFullYear()} FUDOFAB Creative Studio. All rights reserved.
            </div>
            <div className="ct2-footer-bottom-center">
              <a href="mailto:hello@fudofab.com" className="ct2-footer-email" id="ct2-footer-email">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                  <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1"/>
                  <path d="M1 5l6 3.5L13 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                hello@fudofab.com
              </a>
            </div>
            <div className="ct2-footer-links">
              <a href="#" id="ct2-privacy">Privacy Policy</a>
              <a href="#" id="ct2-terms">Terms of Service</a>
              <a href="#" id="ct2-cookies">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
