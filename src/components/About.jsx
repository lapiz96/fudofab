import { useEffect, useRef, useState } from 'react';
import LottiePlayer from './LottiePlayer';

/* SVG Icons replacing emojis */
const FeatureIcons = {
  speed: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="10" stroke="var(--cyan)" strokeWidth="1.2"/>
      <path d="M11 6v5l3 3" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 11l4-4" stroke="var(--cyan)" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5"/>
    </svg>
  ),
  target: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="10" stroke="var(--cyan)" strokeWidth="1.2"/>
      <circle cx="11" cy="11" r="5.5" stroke="var(--cyan)" strokeWidth="1.2" strokeOpacity="0.6"/>
      <circle cx="11" cy="11" r="2" fill="var(--cyan)"/>
    </svg>
  ),
  tech: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="5" width="18" height="12" rx="2" stroke="var(--cyan)" strokeWidth="1.2"/>
      <path d="M7 9l-3 2 3 2M15 9l3 2-3 2M10 15l2-8" stroke="var(--cyan)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  partner: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M15 8c0-2.21-1.79-4-4-4S7 5.79 7 8s1.79 4 4 4 4-1.79 4-4z" stroke="var(--cyan)" strokeWidth="1.2"/>
      <path d="M3 18c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke="var(--cyan)" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

function useCountUp(end, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let startTime = null;
    const step = ts => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, shouldStart]);
  return count;
}

function StatItem({ prefix = '', num, suffix, label, shouldCount, index }) {
  const count = useCountUp(num, 1800, shouldCount);
  return (
    <div className="ab2-stat" id={`stat-${index}`}>
      <div className="ab2-stat-number">
        {prefix}{count}<span className="ab2-stat-suf">{suffix}</span>
      </div>
      <div className="ab2-stat-label">{label}</div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const [shouldCount, setShouldCount] = useState(false);
  const [visualVisible, setVisualVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const visualRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const createObs = (el, setter, threshold = 0.05) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setter(true); obs.disconnect(); } },
        { threshold }
      );
      obs.observe(el);
      return obs;
    };

    const o1 = createObs(visualRef.current, setVisualVisible);
    const o2 = createObs(textRef.current, setTextVisible);

    const statsBand = sectionRef.current?.querySelector('.ab2-stats-band');
    const statsObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShouldCount(true); },
      { threshold: 0.2 }
    );
    if (statsBand) statsObs.observe(statsBand);

    return () => { o1?.disconnect(); o2?.disconnect(); statsObs.disconnect(); };
  }, []);

  const stats = [
    { num: 5, suffix: 'M+', label: 'Users Reached' },
    { num: 450, suffix: 'M+', label: 'Digital Impressions' },
    { num: 98, suffix: '%', label: 'Client Retention' },
    { num: 8, suffix: '.03%', label: 'Avg ROI Growth' },
  ];

  const features = [
    { icon: FeatureIcons.speed, title: 'Fast-Track Delivery', desc: 'We match the speed of modern business without compromising quality. Most custom web and design projects are delivered in 2–4 weeks.' },
    { icon: FeatureIcons.target, title: 'Conversion-Focused Design', desc: 'Every layout, graphic, and user flow is backed by UX research and data analysis — engineered to maximize user engagement and conversions.' },
    { icon: FeatureIcons.tech, title: 'Scalable, Clean Code', desc: 'We build search-engine optimized, secure, and future-proof websites using clean code architectures that scale with your brand.' },
    { icon: FeatureIcons.partner, title: 'Direct Expert Access', desc: 'Skip the account managers. Work directly with senior digital designers and developers who are personally invested in your brand\'s growth.' },
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      {/* Stats Band */}
      <div className="ab2-stats-band">
        {stats.map((s, i) => (
          <StatItem key={i} {...s} shouldCount={shouldCount} index={i} />
        ))}
      </div>

      {/* Main about content */}
      <div className="ab2-main">
        {/* Left: Circle visual with image */}
        <div
          ref={visualRef}
          className="ab2-visual"
          style={{
            opacity: visualVisible ? 1 : 0,
            transform: visualVisible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* Rotating ring */}
          <div className="ab2-lottie-ring" />
          {/* Second decorative ring */}
          <div className="ab2-lottie-ring ab2-ring-2" />

          {/* CENTER: Circular image container */}
          <div className="ab2-center-image-wrap">
            <div className="ab2-center-image-ring" />
            <div className="ab2-center-image">
              <img src="/images/image1.png" alt="FUDOFAB Creative Digital Agency Team & Workspace" className="ab2-circle-img" loading="lazy" />
              <div className="ab2-circle-overlay" />
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="ab2-float-card ab2-float-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color:'var(--cyan)' }}>
              <path d="M10 2l2.12 4.29 4.73.69-3.42 3.33.81 4.71L10 12.77l-4.24 2.25.81-4.71L3.15 6.98l4.73-.69L10 2z" stroke="currentColor" fill="rgba(0,212,255,0.15)" strokeWidth="1.2"/>
            </svg>
            <div>
              <div className="ab2-float-num">120+</div>
              <div className="ab2-float-lbl">Projects Done</div>
            </div>
          </div>
          <div className="ab2-float-card ab2-float-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color:'var(--cyan)' }}>
              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="ab2-float-num">5.0</div>
              <div className="ab2-float-lbl">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Right: text */}
        <div
          ref={textRef}
          className="ab2-text"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
          }}
        >
          <div className="svc-header-eyebrow">
            <span className="eyebrow-dot" />
            About FUDOFAB
            <span className="eyebrow-dot" />
          </div>
          <h2 className="ab2-headline">
            Why <span className="svc-title-accent">FUDOFAB</span> is the<br/>
            Right <span className="ab2-outline">Choice</span>.
          </h2>
          <p className="ab2-body">
            We aren't just an agency — we're your dedicated digital growth partner. FUDOFAB
            was founded to deliver fast, scalable, and conversion-focused design and development
            solutions. With 120+ successful projects launched, we continue to bridge the gap between
            premium design and technical excellence.
          </p>

          <div className="ab2-features-grid">
            {features.map((f, i) => (
              <div key={i} className="ab2-feature" id={`about-feat-${i}`}>
                <div className="ab2-feat-icon">{f.icon}</div>
                <div>
                  <h3 className="ab2-feat-title">{f.title}</h3>
                  <div className="ab2-feat-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <a
              href="/enquiry"
              className="btn-primary"
              id="about-cta"
              style={{ textDecoration: 'none' }}
            >
              <span>Start a Project</span>
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              id="about-contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <div className="btn-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
