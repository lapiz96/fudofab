import { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  { id:1, cat:'Web', title:'Nebula E-Commerce', desc:'Full-stack React store with 3D product viewer', tags:['React','Three.js','Stripe'], wide:true },
  { id:2, cat:'Design', title:'Astral Brand Identity', desc:'Complete visual identity system', tags:['Branding','Figma'] },
  { id:3, cat:'Video', title:'Luminos Promo Reel', desc:'Cinematic 60-second brand film', tags:['Motion','After Effects'] },
  { id:4, cat:'Web', title:'Quantum Dashboard', desc:'Real-time analytics SaaS platform', tags:['React','WebSocket'] },
  { id:5, cat:'Design', title:'Flux Visual System', desc:'Design token system for enterprise', tags:['Design System'] },
  { id:6, cat:'Video', title:'Orbit Social Campaign', desc:'12-reel social media series', tags:['Content','Reels'] },
];

const SVGS = {
  web: (
    <svg viewBox="0 0 240 160" style={{width:'100%',height:'100%',position:'absolute',inset:0}}>
      <defs>
        <linearGradient id="gw1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#4f8ef7" stopOpacity="0.05"/>
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="200" height="120" rx="8" fill="url(#gw1)" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.3"/>
      <line x1="20" y1="45" x2="220" y2="45" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.3"/>
      <rect x="30" y="55" width="80" height="55" rx="4" stroke="#4f8ef7" strokeWidth="0.5" strokeOpacity="0.4" fill="none"/>
      <rect x="120" y="55" width="90" height="20" rx="3" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.3" fill="none"/>
      <rect x="120" y="82" width="65" height="15" rx="3" stroke="#00d4ff" strokeWidth="0.4" strokeOpacity="0.2" fill="none"/>
      <rect x="30" y="118" width="180" height="10" rx="2" stroke="#4f8ef7" strokeWidth="0.3" strokeOpacity="0.2" fill="none"/>
      <circle cx="33" cy="33" r="3" fill="#00d4ff" fillOpacity="0.5"/>
      <circle cx="43" cy="33" r="3" fill="#4f8ef7" fillOpacity="0.5"/>
      <circle cx="53" cy="33" r="3" fill="#ffffff" fillOpacity="0.2"/>
    </svg>
  ),
  design: (
    <svg viewBox="0 0 240 160" style={{width:'100%',height:'100%',position:'absolute',inset:0}}>
      <circle cx="120" cy="80" r="60" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.25" fill="none"/>
      <circle cx="120" cy="80" r="42" stroke="#4f8ef7" strokeWidth="0.5" strokeOpacity="0.3" fill="none"/>
      <circle cx="120" cy="80" r="24" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" fill="rgba(0,212,255,0.05)"/>
      <line x1="60" y1="80" x2="180" y2="80" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.2"/>
      <line x1="120" y1="20" x2="120" y2="140" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.2"/>
      {[0,60,120,180,240,300].map((a,i)=>(
        <line key={i} x1="120" y1="80"
          x2={120+60*Math.cos(a*Math.PI/180)} y2={80+60*Math.sin(a*Math.PI/180)}
          stroke="#4f8ef7" strokeWidth="0.3" strokeOpacity="0.2"/>
      ))}
    </svg>
  ),
  video: (
    <svg viewBox="0 0 240 160" style={{width:'100%',height:'100%',position:'absolute',inset:0}}>
      <rect x="20" y="30" width="200" height="110" rx="8" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.25" fill="none"/>
      <path d="M95 65 L95 95 L130 80 Z" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.5" fill="rgba(0,212,255,0.1)"/>
      <rect x="20" y="125" width="200" height="8" rx="2" stroke="#4f8ef7" strokeWidth="0.3" strokeOpacity="0.2" fill="none"/>
      <rect x="20" y="125" width="110" height="8" rx="2" fill="rgba(0,212,255,0.15)"/>
      <circle cx="35" cy="45" r="4" stroke="#4f8ef7" strokeWidth="0.5" strokeOpacity="0.4" fill="none"/>
      <circle cx="205" cy="45" r="4" stroke="#4f8ef7" strokeWidth="0.5" strokeOpacity="0.4" fill="none"/>
    </svg>
  ),
};

export default function Portfolio() {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All','Web','Design','Video'];
  const filtered = activeFilter === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === activeFilter);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal-up, .pf2-card');
    if (!els) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const getSvg = (cat) => {
    const map = { Web:'web', Design:'design', Video:'video' };
    return SVGS[map[cat]] || SVGS.web;
  };

  return (
    <section id="portfolio" className="pf2-section" ref={sectionRef}>
      <div className="section-container">
        {/* Header */}
        <div className="pf2-header reveal-up">
          <div className="svc-header-eyebrow">
            <span className="eyebrow-dot" />
            Selected Work
            <span className="eyebrow-dot" />
          </div>
          <h2 className="pf2-title">
            Our <span className="svc-title-accent">Portfolio</span>
          </h2>
          <p className="pf2-desc">
            A curated selection of projects that showcase our range, craft, and commitment to excellence.
          </p>
        </div>

        {/* Filters */}
        <div className="pf2-filters reveal-up" style={{ transitionDelay:'0.06s' }}>
          {filters.map(f => (
            <button
              key={f}
              className={`pf2-filter-btn${activeFilter === f ? ' active' : ''}`}
              id={`pf2-filter-${f.toLowerCase()}`}
              onClick={() => setActiveFilter(f)}
            >{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="pf2-grid reveal-up" style={{ transitionDelay:'0.1s' }} id="portfolio-grid">
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className={`pf2-card${p.wide && activeFilter==='All' ? ' pf2-card-wide' : ''}`}
              id={`pf2-${p.id}`}
              style={{ transitionDelay: `${(i % 3) * 0.07}s` }}
            >
              {/* Visual area */}
              <div className="pf2-visual">
                <div className="pf2-gradient" />
                {p.wide && <img src="/images/image1.png" alt={`${p.title} Case Study - FUDOFAB`} className="pf2-image" loading="lazy" />}
                {getSvg(p.cat)}
              </div>

              {/* Info */}
              <div className="pf2-info">
                <span className="pf2-cat">{p.cat}</span>
                <h3 className="pf2-name">{p.title}</h3>
                <p className="pf2-desc-card">{p.desc}</p>
                <div className="pf2-tags">
                  {p.tags.map((t,i) => <span key={i} className="pf2-tag">{t}</span>)}
                </div>
                <a href="#contact" className="pf2-link" id={`pf2-link-${p.id}`}>
                  View Case Study →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pf2-bottom reveal-up">
          <a href="#contact" className="btn-primary" id="pf2-cta"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' }); }}>
            <span>Start Your Project</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
