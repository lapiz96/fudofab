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

      gsap.from('.hero-title span', {
        y: 120,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '.hero', start: 'top 80%' },
      });

      gsap.to(bgRef.current, {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });
      gsap.to(headlineRef.current, {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '45% top', scrub: 1 },
      });
      gsap.to(descRef.current, {
        y: -70,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: '5% top', end: '38% top', scrub: 1 },
      });
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

      <SceneCanvas className="hero-canvas">
        <ambientLight intensity={0.6} />
        <FloatingOrb />
      </SceneCanvas>

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
        <div className="hero-left">
          <motion.div variants={fadeUp}>
            <div className="hero-label" ref={labelRef}>
              Creative Digital Agency
            </div>
          </motion.div>

          <Parallax speed={-10}>
            <h1 className="hero-headline hero-title" ref={headlineRef} style={{ color: '#1a2f6e' }}>
              <span className="hero-headline-line">
                <span className="hero-headline-word hero-headline-large">WE</span>
                <span className="hero-headline-word hero-headline-accent">&nbsp;BUILD</span>
              </span>
              <span className="hero-headline-line">
                <span className="hero-headline-word hero-headline-highlight gradient-text">DIGITAL</span>
              </span>
              <span className="hero-headline-line">
                <span className="hero-headline-word hero-headline-large">WORLDS</span>
              </span>
            </h1>
          </Parallax>

          <Parallax speed={-10}>
            <p className="hero-description" ref={descRef}>
              We craft premium, high-converting digital experiences — specializing in custom
              web design &amp; development, brand identity systems, and cinematic video production.
            </p>
          </Parallax>

          <div className="hero-actions" ref={actionsRef}>
            <a
              href="#services"
              ref={magneticBtnRef} className="btn-primary"
              id="hero-cta-btn"
              onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <span>Our Services</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#portfolio"
              className="btn-secondary"
              id="hero-portfolio-btn"
              onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <div className="btn-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              View Work
            </a>
          </div>
        </div>

        <Parallax speed={-3} className="hero-right">
          {[
            { label: 'Studio', value: 'FUDOFAB Creative' },
            { label: 'Expertise', value: 'Digital & Visual Arts' },
            { label: 'Projects', value: '120+ Delivered' },
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
                  <div className="hero-info-label">{card.label}</div>
                  <div className="hero-info-value">{card.value}</div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </Parallax>
      </div>

      <div className="hero-scroll-indicator" ref={scrollRef}>
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </div>

      <div className="hero-social" ref={socialRef}>
        {['FB', 'IG', 'YT', 'LI'].map(s => (
          <a key={s} href="#" id={`social-${s.toLowerCase()}`}>{s}</a>
        ))}
      </div>
    </motion.section>
  );
}
