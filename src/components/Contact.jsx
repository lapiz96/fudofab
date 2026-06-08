import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-scroll-parallax';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeUp, staggerChildren } from '../lib/motionVariants';

gsap.registerPlugin(ScrollTrigger);

const SocialIcons = {
  Facebook: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M10 7H8v2H6v2h2v5h2v-5h2l1-2h-3V6.5C10 6 10.5 6 10.5 6H12V4H10.5C8.5 4 8 5 8 6v1h2z"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Instagram: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="13.5" cy="4.5" r="1" fill="currentColor"/>
    </svg>
  ),
  YouTube: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="3.5" width="16" height="11" rx="3.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7 7l5 2-5 2V7z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.4"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6 8.5v4.5M6 6v.5M9 13v-2.5c0-1 .5-2 2-2s2 1 2 2V13"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

const SocialLinks = {
  Facebook: 'https://facebook.com/yourusername', // Replace with your Facebook page URL
  Instagram: 'https://instagram.com/yourusername', // Replace with your Instagram profile URL
  YouTube: 'https://youtube.com/yourusername', // Replace with your YouTube channel URL
  LinkedIn: 'https://linkedin.com/in/yourusername', // Replace with your LinkedIn profile URL
};

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="1" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1 7l9 5 9-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Email Us',
    value: 'fudofab@gmail.com',
    href: 'mailto:fudofab@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="10" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    label: 'Location',
    value: 'Creative Studio, Digital HQ',
    href: '#',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 4h12v8a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1 4h18M8 14v2M12 14v2M6 16h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: 'Submit Enquiry',
    value: 'Fill our project brief',
    href: '/enquiry',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated grid lines
      gsap.to('.ct3-grid-line-h', {
        scaleX: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.ct3-section', start: 'top 80%' },
      });
      gsap.to('.ct3-grid-line-v', {
        scaleY: 1,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.ct3-section', start: 'top 80%' },
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
      setFormData({ name: '', email: '', service: '', message: '' });
    }, 5000);
  };

  const field = (id, label, type = 'text', placeholder = '') => (
    <div className={`ct3-field${focusedField === id ? ' ct3-field-focused' : ''}`}>
      <label className="ct3-label" htmlFor={`ct3-${id}`}>{label}</label>
      <input
        id={`ct3-${id}`} type={type} className="ct3-input"
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
      className="ct3-section"
      ref={sectionRef}
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >

      {/* Animated background grid */}
      <div className="ct3-bg-grid" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="ct3-grid-line-h" style={{ top: `${i * 25}%` }} />
        ))}
        {[...Array(7)].map((_, i) => (
          <div key={i} className="ct3-grid-line-v" style={{ left: `${i * 16.67}%` }} />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="ct3-orb ct3-orb-1" aria-hidden="true" />
      <div className="ct3-orb ct3-orb-2" aria-hidden="true" />
      <div className="ct3-orb ct3-orb-3" aria-hidden="true" />

      <div className="ct3-wrapper">
        {/* === LEFT PANEL === */}
        <motion.div className="ct3-left" variants={fadeUp}>
          <Parallax speed={-6}>
            <div className="svc-header-eyebrow" style={{ marginBottom: '1.5rem' }}>
              <span className="eyebrow-dot" />
              Get In Touch
              <span className="eyebrow-dot" />
            </div>
            <h2 className="ct3-headline">
              Let's Build<br />Something <span className="svc-title-accent">Amazing</span>
            </h2>
            <p className="ct3-subtext">
              Have a project in mind? We'd love to hear about it. Our team is ready to turn your vision into reality.
            </p>
          </Parallax>

          {/* Contact info cards */}
          <div className="ct3-info-cards">
            {contactInfo.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                className="ct3-info-card"
                id={`ct3-info-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 6, scale: 1.02 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="ct3-info-icon">{c.icon}</div>
                <div className="ct3-info-text">
                  <span className="ct3-info-label">{c.label}</span>
                  <span className="ct3-info-value">{c.value}</span>
                </div>
                <svg className="ct3-info-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </motion.a>
            ))}
          </div>

          {/* Social links */}
          <div className="ct3-socials-row">
            <span className="ct3-socials-label">Follow us</span>
            <div className="ct3-socials">
              {Object.entries(SocialIcons).map(([name, icon]) => (
                <a key={name} href={SocialLinks[name] || '#'} className="ct3-social-btn"
                  id={`ct3-social-${name.toLowerCase()}`} title={name} aria-label={name}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* === RIGHT PANEL — FORM === */}
        <motion.div className="ct3-right" variants={fadeUp}>
          <div className="ct3-form-card">
            <div className="ct3-form-card-glow" />
            {submitted ? (
              <div className="ct3-success" id="ct3-success">
                <div className="ct3-success-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="url(#sg)" strokeWidth="1.5"/>
                    <path d="M14 24l7 7 13-14" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="sg" x1="2" y1="2" x2="46" y2="46" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#60A5FA"/><stop offset="1" stopColor="#4169E1"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="ct3-success-title">Message Sent!</h3>
                <p className="ct3-success-text">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form className="ct3-form" id="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="ct3-form-header">
                  <h3 className="ct3-form-title">Send a Message</h3>
                  <p className="ct3-form-hint">Fill in the details below and we'll respond promptly.</p>
                </div>
                <div className="ct3-form-row">
                  {field('name', 'Full Name', 'text', 'John Smith')}
                  {field('email', 'Email Address', 'email', 'john@example.com')}
                </div>
                <div className={`ct3-field${focusedField === 'service' ? ' ct3-field-focused' : ''}`}>
                  <label className="ct3-label" htmlFor="ct3-service">Service Needed</label>
                  <select id="ct3-service" className="ct3-select"
                    value={formData.service}
                    onChange={e => setFormData(p => ({ ...p, service: e.target.value }))}
                    onFocus={handleFocus('service')} onBlur={handleBlur}>
                    <option value="">Select service...</option>
                    <option value="web">Web Design &amp; Development</option>
                    <option value="graphic">Graphic Design &amp; Branding</option>
                    <option value="video">Video Editing &amp; Production</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="all">Full Creative Package</option>
                  </select>
                </div>
                <div className={`ct3-field${focusedField === 'message' ? ' ct3-field-focused' : ''}`}>
                  <label className="ct3-label" htmlFor="ct3-message">Tell Us About Your Project</label>
                  <textarea id="ct3-message" className="ct3-textarea"
                    placeholder="Describe your project, goals, timeline, and any specific requirements..."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    onFocus={handleFocus('message')} onBlur={handleBlur}
                  />
                </div>
                <button type="submit" className="ct3-submit" id="ct3-submit">
                  <span className="ct3-submit-text">Send Message</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="ct3-submit-shimmer" />
                </button>
                <p className="ct3-form-note">
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
        </motion.div>
      </div>

      {/* ===== FOOTER ===== */}
      <motion.footer className="ct3-footer" variants={fadeUp}>
        <div className="ct3-footer-glow-line" />

        {/* Floating footer orbs */}
        <div className="ct3-footer-orb ct3-footer-orb-1" aria-hidden="true" />
        <div className="ct3-footer-orb ct3-footer-orb-2" aria-hidden="true" />

        <div className="ct3-footer-inner">
          {/* Top row */}
          <div className="ct3-footer-top">
            {/* Brand */}
            <div className="ct3-footer-brand">
              <div className="ct3-footer-logo">FUDO<span>FAB</span></div>
              <p className="ct3-footer-tagline">Premium Creative Digital Studio</p>
              <p className="ct3-footer-brand-desc">
                We craft digital experiences that inspire, engage, and convert. From concept to launch, we're your creative powerhouse.
              </p>
            </div>

            {/* Nav */}
            <div className="ct3-footer-nav">
              <div className="ct3-footer-nav-col">
                <div className="ct3-footer-nav-title">Services</div>
                {['Web Development', 'Graphic Design', 'Video Editing', 'Digital Marketing'].map(s => (
                  <a key={s} href="#services"
                    onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    {s}
                  </a>
                ))}
              </div>
              <div className="ct3-footer-nav-col">
                <div className="ct3-footer-nav-title">Company</div>
                {[['About Us', 'about'], ['Portfolio', 'portfolio'], ['Clients', 'testimonials'], ['Contact', 'contact']].map(([label, id]) => (
                  <a key={id} href={`#${id}`}
                    onClick={e => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }}>
                    {label}
                  </a>
                ))}
              </div>
              <div className="ct3-footer-nav-col">
                <div className="ct3-footer-nav-title">Contact</div>
                <a href="mailto:fudofab@gmail.com">fudofab@gmail.com</a>
                <a href="/enquiry">Submit Enquiry</a>
                <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Get In Touch</a>
              </div>
            </div>

            {/* Social */}
            <div className="ct3-footer-social-col">
              <div className="ct3-footer-nav-title">Follow Us</div>
              <div className="ct3-footer-socials">
                {Object.entries(SocialIcons).map(([name, icon]) => (
                  <a key={name} href={SocialLinks[name] || '#'} className="ct3-footer-social-btn"
                    id={`footer-social-${name.toLowerCase()}`} title={name} aria-label={name}>
                    {icon}
                  </a>
                ))}
              </div>
              <div className="ct3-footer-email-pill">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1"/>
                  <path d="M1 5l6 3.5L13 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                fudofab@gmail.com
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="ct3-footer-bottom">
            <span className="ct3-footer-copy">
              © {new Date().getFullYear()} FUDOFAB Creative Studio. All rights reserved.
            </span>
            <div className="ct3-footer-bottom-links">
              <a href="#" id="ct3-privacy">Privacy Policy</a>
              <span className="ct3-footer-dot">·</span>
              <a href="#" id="ct3-terms">Terms of Service</a>
              <span className="ct3-footer-dot">·</span>
              <a href="#" id="ct3-cookies">Cookies</a>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.section>
  );
}
