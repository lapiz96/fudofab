import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import BorderGlow from './ui/BorderGlow/BorderGlow';
import { GradientOrb } from './ui/Visuals';
import { fadeUp, staggerChildren, tiltOnHover } from '../lib/motionVariants';

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

const TESTIMONIALS = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, NovaTech Solutions',
    avatar: 'SM',
    rating: 5,
    text: 'FUDOFAB completely transformed our digital presence. The website they built is not just beautiful — it converts. Our leads increased by 340% in the first month. Absolutely world-class work.',
    color: '#60A5FA',
  },
  {
    name: 'James Okoye',
    role: 'Founder, Orbit Creative',
    avatar: 'JO',
    rating: 5,
    text: "The branding package FUDOFAB delivered was jaw-dropping. Every element felt intentional and on-brand. We've received endless compliments from clients and partners. Highly recommended.",
    color: '#4169E1',
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Director, LuminX',
    avatar: 'PS',
    rating: 5,
    text: "Their video editing team is exceptional. The corporate reel they produced for our product launch went viral — 2M+ views in 48 hours. FUDOFAB understands storytelling at a cinematic level.",
    color: '#60A5FA',
  },
  {
    name: 'Alex Chen',
    role: 'CTO, DataStream',
    avatar: 'AC',
    rating: 5,
    text: 'From wireframes to final deployment, the process was seamless. They delivered on time, on budget, and beyond expectations. Our app performance improved by 60% after their optimization.',
    color: '#4169E1',
  },
  {
    name: 'Maria Santos',
    role: 'Brand Manager, Veloci',
    avatar: 'MS',
    rating: 5,
    text: 'FUDOFAB created a visual identity that truly represents who we are. The logo, color system, and brand guidelines they delivered are timeless. Our brand recognition has never been stronger.',
    color: '#60A5FA',
  },
  {
    name: 'David Park',
    role: 'Creative Director, Pulse',
    avatar: 'DP',
    rating: 5,
    text: "Working with FUDOFAB feels like having a world-class creative team in-house. They're fast, communicative, and their attention to detail is unmatched. We've been working together for 2 years.",
    color: '#4169E1',
  },
];

function StarRating({ count }) {
  return (
    <div className="tml-stars" aria-label={`${count} stars`}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <path d="M7 1l1.76 3.57L13 5.27l-3 2.92.71 4.12L7 10.17l-3.71 2.14L4 8.19 1 5.27l4.24-.7L7 1z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal-up, .tml-card');
    if (!els) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <motion.section
      id="testimonials"
      className="tml-section"
      ref={sectionRef}
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <Parallax speed={15} className="section-orbs" aria-hidden="true">
        <GradientOrb size="330px" top="10%" left="0%" />
        <GradientOrb size="270px" top="44%" right="6%" />
        <GradientOrb size="220px" bottom="8%" left="42%" />
      </Parallax>

      <div className="section-container" style={{ position:'relative', zIndex:1 }}>
        <Parallax speed={-5}>
          <motion.div className="tml-header reveal-up" variants={fadeUp}>
            <div className="svc-header-eyebrow">
              <span className="eyebrow-dot" />
              Social Proof
              <span className="eyebrow-dot" />
            </div>
            <h2 className="tml-title">
              Our Happy <span className="svc-title-accent">Clients</span>
            </h2>
            <p className="tml-subtitle">
              Real results, real relationships. Here's what the brands we've elevated have to say.
            </p>
          </motion.div>
        </Parallax>

        <motion.div className="tml-grid" variants={staggerChildren}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={tiltOnHover}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <BorderGlow {...GLOW_PROPS} className="tml-card-glow">
                <div
                  className="tml-card card-scan"
                  id={`testimonial-${i}`}
                  style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
                >
                  <div className="tml-quote-icon" style={{ color: t.color }}>
                    <svg width="28" height="24" viewBox="0 0 28 24" fill="currentColor" opacity="0.6">
                      <path d="M0 24V14.4C0 5.76 5.12 1.44 15.36 0l1.44 2.88C11.2 4.32 8.32 7.2 7.68 11.52H12V24H0zm16 0V14.4C16 5.76 21.12 1.44 31.36 0l1.44 2.88C27.2 4.32 24.32 7.2 23.68 11.52H28V24H16z"/>
                    </svg>
                  </div>
                  <StarRating count={t.rating} />
                  <p className="tml-text">{t.text}</p>
                  <div className="tml-author">
                    <div className="tml-avatar" style={{ background: `linear-gradient(135deg, ${t.color}33, ${t.color}55)`, borderColor: `${t.color}44` }}>
                      <span style={{ color: t.color }}>{t.avatar}</span>
                    </div>
                    <div>
                      <div className="tml-name">{t.name}</div>
                      <div className="tml-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="tml-cta-wrap reveal-up" variants={fadeUp}>
          <a href="#contact" className="btn-primary" id="tml-cta"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>Start Your Project</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
