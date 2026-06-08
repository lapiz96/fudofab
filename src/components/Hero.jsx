import { Suspense, lazy, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './ui/BorderGlow/BorderGlow';
import { GeometricMark, GradientOrb } from './ui/Visuals';
import SceneCanvas from './three/SceneCanvas';
import FloatingOrb from './three/FloatingOrb';
import { fadeUp, staggerChildren, tiltOnHover } from '../lib/motionVariants';

const ColorBends = lazy(() => import('./ui/ColorBends/ColorBends'));

gsap.registerPlugin(ScrollTrigger);

function ColorBendsFallback() {
  return <div className="color-bends-skeleton" aria-hidden="true" />;
}

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const headlineRef = useRef(null);
  const labelRef = useRef(null);
  const descRef = useRef(null);
  const actionsRef = useRef(null);
  const magneticBtnRef = useRef(null);
  const sidebarRef = useRef(null);
  const scrollRef = useRef(null);
  const socialRef = useRef(null);
  const infoCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0);
      const words = headlineRef.current?.querySelectorAll('.hero-headline-word') || [];
      tl.to(words, { opacity: 1, y: 0, duration: 1.0, ease: 'power4.out', stagger: 0.1 }, 0.15);
      tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.55);
      tl.to(actionsRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.65);
      tl.to(infoCardsRef.current.filter(Boolean), { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, 0.35);
      tl.to(sidebarRef.current, { opacity: 1, duration: 1.0, ease: 'power3.out' }, 0.4);
      tl.to(scrollRef.current, { opacity: 1, duration: 1, ease: 'power3.out' }, 1.1);
      tl.to(socialRef.current, { opacity: 1, duration: 1, ease: 'power3.out' }, 1.1);

      gsap.to(bgRef.current, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });

      const heroLeft = heroRef.current.querySelector('.hero-left');
      if (heroLeft) {
        gsap.to(heroLeft, {
          y: -80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '45% top', scrub: 1 },
        });
      }

      const heroRight = heroRef.current.querySelector('.hero-right');
      if (heroRight) {
        gsap.to(heroRight, {
          y: -50,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '45% top', scrub: 1 },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!magneticBtnRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = magneticBtnRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = clientX - centerX;
      const distY = clientY - centerY;
      const distance = Math.sqrt(distX**2 + distY**2);
      
      if (distance < 100) {
        const pull = (100 - distance) / 100;
        gsap.to(magneticBtnRef.current, {
          x: distX * pull * 0.3,
          y: distY * pull * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(magneticBtnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  return (
    <motion.section
      id="home"
      className="hero"
      ref={heroRef}
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="hero-bg" ref={bgRef} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
        style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
        <Suspense fallback={<ColorBendsFallback />}>
          <ColorBends
            rotation={90}
            speed={0.2}
            colors={['#3B82F6', '#60A5FA', '#FFFFFF']}
            transparent
            autoRotate={0.55}
            scale={1}
            mouseInfluence={1.1}
            intensity={1.2}
            bandWidth={6}
            frequency={1}
            warpStrength={1}
            noise={0.15}
            iterations={1}
            parallax={1}
          />
        </Suspense>
      </motion.div>


      <div className="hero-bg-overlay" />

      <Parallax speed={15} className="hero-decor-layer">
        <GradientOrb size="420px" top="8%" left="58%" />
        <GradientOrb size="300px" top="58%" left="8%" />
        <GeometricMark variant="hex" className="hero-geo hero-geo-one hero-geo-float" />
        <GeometricMark variant="ring" className="hero-geo hero-geo-two hero-geo-float" />
      </Parallax>

      <div className="hero-sidebar" ref={sidebarRef} style={{ opacity: 0 }}>
        <div className="hero-sidebar-line" />
        {['DESIGN', 'DEVELOP', 'CREATE', 'INSPIRE'].map((item, i) => (
          <div key={i} className={`hero-sidebar-item${i === 0 ? ' active' : ''}`} id={`sidebar-item-${i}`}>
            {item}
          </div>
        ))}
        <div className="hero-sidebar-line" />
      </div>

      <div className="hero-content">
        <Parallax speed={-4}>
          <div className="hero-left">
            <motion.div variants={fadeUp}>
              <div className="hero-label" ref={labelRef}>
                CREATIVE DIGITAL AGENCY
              </div>
            </motion.div>

            <h1 className="hero-headline hero-title" ref={headlineRef} style={{ color: '#0C182F' }}>
              <span className="hero-headline-line">
                <span className="hero-headline-word hero-headline-large">WE</span>
                <span className="hero-headline-word hero-headline-large">&nbsp;BUILD</span>
              </span>
              <span className="hero-headline-line">
                <span className="hero-headline-word hero-headline-highlight gradient-text relative-highlight">
                  DIGITAL
                  <svg className="headline-underline-svg" viewBox="0 0 320 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M10 15c60-3.5 120-4.5 240-2 0 0-140 5.5-210 8" 
                      stroke="#3B82F6" 
                      strokeWidth="5.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="hero-headline-line">
                <span className="hero-headline-word hero-headline-large">WORLDS</span>
              </span>
            </h1>

            <p className="hero-description" ref={descRef}>
              We craft premium, high-converting digital experiences—specializing in custom <span className="hero-desc-highlight">web design &amp; development</span>, <span className="hero-desc-highlight">brand identity systems</span>, and <span className="hero-desc-highlight">cinematic video production</span>.
            </p>

            <div className="hero-actions" ref={actionsRef}>
              <a
                href="#services"
                ref={magneticBtnRef} className="btn-primary hero-cta-services"
                id="hero-cta-btn"
                onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                <span>OUR SERVICES</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="hero-btn-arrow" style={{ stroke: 'currentColor' }}>
                  <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#portfolio"
                className="btn-secondary hero-cta-portfolio"
                id="hero-portfolio-btn"
                onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                <div className="btn-play-circle">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="hero-btn-play">
                    <path d="M3 2v6l5-3-5-3z"/>
                  </svg>
                </div>
                <span>VIEW WORK</span>
              </a>
            </div>

            {/* Social Proof trust row */}
            <div className="hero-trust-row">
              <div className="hero-trust-avatars">
                {/* Avatar 1 */}
                <div className="hero-trust-avatar">
                  <svg viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="#60A5FA" />
                    <path d="M16 23c3.5 0 6-1.5 6-4s-2.5-3.5-6-3.5-6 1-6 3.5 2.5 4 6 4z" fill="#FFE5D9" />
                    <circle cx="16" cy="11" r="4.5" fill="#FFE5D9" />
                    <path d="M11 9c0-1 1.5-2.5 3-3s4 .5 4 1.5-1 2-3 2-4-.5-4-.5z" fill="#1E3A8A" />
                  </svg>
                </div>
                {/* Avatar 2 */}
                <div className="hero-trust-avatar">
                  <svg viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="#8B5CF6" />
                    <path d="M16 23c3.5 0 6-1.2 6-3.5s-2.5-3-6-3-6 .8-6 3 2.5 3.5 6 3.5z" fill="#FFE5D9" />
                    <circle cx="16" cy="11.5" r="4" fill="#FFE5D9" />
                    <path d="M12 8c1.5-2 3.5-2 5-2s3.5 1 4 2.5c0 0-.5.5-2 .5s-3-1-3-1" fill="#4C1D95" />
                  </svg>
                </div>
                {/* Avatar 3 */}
                <div className="hero-trust-avatar">
                  <svg viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="#06B6D4" />
                    <path d="M16 23c3.5 0 6-1.5 6-4s-2.5-3.5-6-3.5-6 1-6 3.5 2.5 4 6 4z" fill="#FCEADE" />
                    <circle cx="16" cy="11" r="4.5" fill="#FCEADE" />
                    <path d="M10 9c0-1.5 2-2.5 4-3s4 1.5 4 2.5a4.5 4.5 0 0 1-8.001.5z" fill="#0891B2" />
                  </svg>
                </div>
                {/* Blue count pill */}
                <div className="hero-trust-avatar-count">
                  <span>120+</span>
                </div>
              </div>
              <span className="hero-trust-text">Projects delivered for forward-thinking brands</span>
            </div>
          </div>
        </Parallax>

        <Parallax speed={-3} className="hero-right">
          {[
            {
              label: 'Studio',
              value: 'FUDOFAB Creative',
              icon: (
                <div className="hero-info-icon studio">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
              )
            },
            {
              label: 'Expertise',
              value: 'Digital & Visual Arts',
              icon: (
                <div className="hero-info-icon expertise">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 12h20M5.63 5.63l12.74 12.74M5.63 18.37l12.74-12.74" />
                  </svg>
                </div>
              )
            },
            {
              label: 'Projects',
              value: '120+ Delivered',
              icon: (
                <div className="hero-info-icon projects">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20V10M12 20V4M6 20v-6" />
                  </svg>
                </div>
              )
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={tiltOnHover}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            >
              <BorderGlow
                glowColor="225 73 57"
                backgroundColor="#F0F4FF"
                borderRadius={20}
                glowRadius={35}
                glowIntensity={1.2}
                coneSpread={30}
                animated={true}
                colors={['#4169E1', '#60A5FA', '#93c5fd']}
                className="hero-info-glow"
              >
                <div
                  className="hero-info-card card-scan"
                  id={`hero-info-${i}`}
                  ref={el => (infoCardsRef.current[i] = el)}
                >
                  {card.icon}
                  <div className="hero-info-text-group">
                    <div className="hero-info-label">{card.label}</div>
                    <div className="hero-info-value">{card.value}</div>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </Parallax>
      </div>

      <div className="hero-scroll-indicator" ref={scrollRef}>
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </div>

      <div className="hero-social" ref={socialRef}>
        {['FB', 'IG', 'YT', 'LI'].map((s, idx) => (
          <span key={s} className="hero-social-item-wrap">
            <a href="#" id={`social-${s.toLowerCase()}`}>{s}</a>
            {idx < 3 && <span className="hero-social-divider">|</span>}
          </span>
        ))}
      </div>
    </motion.section>
  );
}
