import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GradientOrb } from './ui/Visuals';
import SceneCanvas from './three/SceneCanvas';
import WireframeIcosahedron from './three/WireframeIcosahedron';
import { fadeUp, staggerChildren } from '../lib/motionVariants';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    num: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="url(#g1)" strokeWidth="1.5"/>
        <path d="M14 8v6l3.5 3.5" stroke="url(#g1)" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 14l5-5" stroke="url(#g1)" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.4"/>
        <defs>
          <linearGradient id="g1" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA"/><stop offset="1" stopColor="#4169E1"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Fast-Track Delivery',
    desc: 'We match the speed of modern business without compromising quality. Most custom web and design projects delivered in 2–4 weeks.',
    tag: 'Speed',
  },
  {
    num: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="url(#g2)" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="6" stroke="url(#g2)" strokeWidth="1.2" strokeOpacity="0.6"/>
        <circle cx="14" cy="14" r="2.5" fill="url(#g2)"/>
        <defs>
          <linearGradient id="g2" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA"/><stop offset="1" stopColor="#4169E1"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Conversion-Focused Design',
    desc: 'Every layout, graphic, and user flow is backed by UX research and data — engineered to maximize engagement and conversions.',
    tag: 'Strategy',
  },
  {
    num: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="22" height="14" rx="2.5" stroke="url(#g3)" strokeWidth="1.5"/>
        <path d="M8 11l-3.5 2.5 3.5 2.5M20 11l3.5 2.5-3.5 2.5M12 18l4-10" stroke="url(#g3)" strokeWidth="1.5" strokeLinecap="round"/>
        <defs>
          <linearGradient id="g3" x1="3" y1="6" x2="25" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA"/><stop offset="1" stopColor="#4169E1"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Scalable, Clean Code',
    desc: 'SEO-optimized, secure, and future-proof websites built with clean code architectures that scale seamlessly with your brand.',
    tag: 'Technology',
  },
  {
    num: '04',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M18 10c0-2.76-1.79-4-4-4S10 7.24 10 10s1.79 4 4 4 4-1.79 4-4z" stroke="url(#g4)" strokeWidth="1.5"/>
        <path d="M4 22c0-3.87 4.48-7 10-7s10 3.13 10 7" stroke="url(#g4)" strokeWidth="1.5" strokeLinecap="round"/>
        <defs>
          <linearGradient id="g4" x1="4" y1="6" x2="24" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA"/><stop offset="1" stopColor="#4169E1"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    title: 'Direct Expert Access',
    desc: 'Skip the middlemen. Work directly with senior designers and developers personally invested in your brand\'s growth journey.',
    tag: 'Partnership',
  },
];

const stats = [
  { num: '17+', label: 'Websites Launched' },
  { num: '1.5M+', label: 'Users Reached' },
  { num: '98%', label: 'Satisfaction Rate' },
  { num: '10+', label: 'Years Expertise' },
];

function WhyCard({ feature, index }) {
  return (
    <motion.div
      className="why-card"
      id={`why-card-${index}`}
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      whileHover={{ y: -8, rotateX: -4, rotateY: 4, scale: 1.02 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-50px' }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      <div className="why-card-inner">
        <span className="why-card-ghost">{feature.num}</span>
        <div className="why-card-top">
          <div className="why-card-icon-wrap">
            {feature.icon}
          </div>
          <span className="why-card-tag">{feature.tag}</span>
        </div>
        <h3 className="why-card-title">{feature.title}</h3>
        <p className="why-card-desc">{feature.desc}</p>
        <div className="why-card-line" />
      </div>
      <div className="why-card-glow" />
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.about-stat-num').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      // Animate particles
      gsap.utils.toArray('.why-particle').forEach((p, i) => {
        gsap.to(p, {
          y: -40 - i * 10,
          x: i % 2 === 0 ? 20 : -20,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      id="about"
      className="why-section"
      ref={sectionRef}
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Background 3D scene */}
      <div className="why-3d-canvas" aria-hidden="true">
        <SceneCanvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <WireframeIcosahedron />
        </SceneCanvas>
      </div>

      {/* Floating particles */}
      <div className="why-particles" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="why-particle"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: i % 2 === 0 ? '4px' : '6px',
              height: i % 2 === 0 ? '4px' : '6px',
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <Parallax speed={12} className="section-orbs" aria-hidden="true">
        <GradientOrb size="400px" top="5%" right="3%" />
        <GradientOrb size="280px" top="55%" left="2%" />
        <GradientOrb size="240px" bottom="10%" right="38%" />
      </Parallax>

      <div className="why-container">
        {/* Header */}
        <Parallax speed={-4}>
          <motion.div className="why-header" variants={fadeUp}>
            <div className="svc-header-eyebrow">
              <span className="eyebrow-dot" />
              Why Choose Us
              <span className="eyebrow-dot" />
            </div>
            <h2 className="why-headline">
              Why <span className="svc-title-accent">FUDOFAB</span> is the<br />
              Right <span className="why-outline">Choice</span>.
            </h2>
            <p className="why-subtitle">
              We're not just an agency — we're your dedicated digital growth partner. From concept to launch, we deliver results that matter.
            </p>
          </motion.div>
        </Parallax>

        {/* Stats row */}
        <motion.div className="why-stats-row" variants={fadeUp}>
          {stats.map((s, i) => (
            <div key={i} className="why-stat" id={`about-stat-${i}`}>
              <div className="about-stat-num why-stat-num">{s.num}</div>
              <div className="why-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* 3D cards grid */}
        <div className="why-grid">
          {features.map((f, i) => (
            <WhyCard key={i} feature={f} index={i} />
          ))}
        </div>

        {/* CTA row */}
        <motion.div className="why-cta-row" variants={fadeUp}>
          <a href="/enquiry" className="btn-primary" id="about-cta" style={{ textDecoration: 'none' }}>
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
        </motion.div>
      </div>
    </motion.section>
  );
}
