import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './ui/BorderGlow/BorderGlow';
import { GeometricMark, GradientOrb } from './ui/Visuals';
import SceneCanvas from './three/SceneCanvas';
import CTAGrid from './three/CTAGrid';
import { fadeUp, staggerChildren, tiltOnHover } from '../lib/motionVariants';

gsap.registerPlugin(ScrollTrigger);

const GLOW_PROPS = {
  glowColor: '225 73 57',
  backgroundColor: '#F0F4FF',
  borderRadius: 20,
  glowRadius: 35,
  glowIntensity: 1.2,
  coneSpread: 30,
  animated: true,
  colors: ['#4169E1', '#60A5FA', '#93c5fd'],
};

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

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.cta-grid', {
        rotateX: -15,
        scrollTrigger: { trigger: '.cta-section', scrub: 1.5 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleFocus = useCallback((id) => () => setFocusedField(id), []);
  const handleBlur = useCallback(() => setFocusedField(null), []);

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
        onFocus={handleFocus(id)} onBlur={handleBlur}
        required
      />
    </div>
  );

  return (
    <motion.section
      id="contact"
      className="ct2-section cta-section"
      ref={sectionRef}
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="cta-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, transformStyle: 'preserve-3d', perspective: 1000 }}>
        <SceneCanvas camera={{ position: [0, 4, 8], fov: 50 }}>
          <CTAGrid />
        </SceneCanvas>
      </div>

      <Parallax speed={15} className="section-orbs" aria-hidden="true">
        <GradientOrb size="360px" top="8%" left="5%" />
        <GradientOrb size="300px" top="38%" right="2%" />
        <GradientOrb size="240px" bottom="10%" left="45%" />
      </Parallax>

      <div className="ct2-glow-top" />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        <Parallax speed={-5}>
          <motion.div className="ct2-header" variants={fadeUp}>
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
          </motion.div>
        </Parallax>

        <div className="ct2-content-grid">
          <motion.div className="ct2-left" variants={fadeUp}>
            <div className="ct2-lottie-wrap">
              <GeometricMark variant="dots" className="ct2-geo-visual" />
            </div>
            <div className="ct2-socials">
              {Object.entries(SocialIcons).map(([name, icon]) => (
                <a key={name} href="#" className="ct2-social"
                  id={`ct2-social-${name.toLowerCase()}`} title={name} aria-label={name}>
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={tiltOnHover} style={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
            <BorderGlow {...GLOW_PROPS} className="ct2-right-glow">
              <motion.div className="ct2-right card-scan" variants={fadeUp}>
                {submitted ? (
                  <div className="ct2-success" id="ct2-success">
                    <div className="ct2-success-lottie">
                      <GeometricMark variant="ring" />
                    </div>
                    <h3 className="ct2-success-title">Message Sent!</h3>
                    <p className="ct2-success-text">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form className="ct2-form" id="contact-form" onSubmit={handleSubmit} noValidate>
                    <div className="ct2-form-row">
                      {field('name', 'Full Name', 'text', 'John Smith')}
                      {field('email', 'Email Address', 'email', 'john@example.com')}
                    </div>
                    <div className="ct2-form-row">
                      <div className={`ct2-field${focusedField === 'service' ? ' ct2-field-focused' : ''}`}>
                        <label className="ct2-label" htmlFor="ct-service">Service Needed</label>
                        <select id="ct-service" className="ct2-select"
                          value={formData.service}
                          onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                          onFocus={handleFocus('service')} onBlur={handleBlur}>
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
                          onFocus={handleFocus('budget')} onBlur={handleBlur}>
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
                        onFocus={handleFocus('message')} onBlur={handleBlur}
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
              </motion.div>
            </BorderGlow>
          </motion.div>
        </div>

        <motion.div className="ct2-footer-improved" variants={fadeUp}>
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
                <a href="#about" onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About Us</a>
                <a href="#portfolio" onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>Portfolio</a>
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
        </motion.div>
      </div>
    </motion.section>
  );
}
