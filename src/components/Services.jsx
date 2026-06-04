import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import LottiePlayer from './LottiePlayer';

const LOTTIE_URLS = [
  'https://assets2.lottiefiles.com/packages/lf20_xyadoh9h.json',
  'https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json',
  'https://assets10.lottiefiles.com/packages/lf20_fcfjwiyb.json',
];

function ServiceIcon3D({ type, hovered }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * (hovered ? 0.9 : 0.35);
    ref.current.rotation.x += delta * (hovered ? 0.4 : 0.1);
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, hovered ? 1.2 : 1.0, 0.08));
  });
  return (
    <mesh ref={ref}>
      {type === 0 && <octahedronGeometry args={[0.9, 0]} />}
      {type === 1 && <torusKnotGeometry args={[0.65, 0.2, 80, 8]} />}
      {type === 2 && <icosahedronGeometry args={[0.9, 0]} />}
      <meshStandardMaterial
        color={hovered ? '#00d4ff' : '#4f8ef7'}
        emissive={hovered ? '#00d4ff' : '#0d2149'}
        emissiveIntensity={hovered ? 0.8 : 0.3}
        metalness={0.9} roughness={0.05}
        wireframe={!hovered}
      />
    </mesh>
  );
}

/* SVG icon for service check items */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1"/>
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const SERVICES = [
  {
    number: '01',
    tag: 'Digital Solutions',
    title: 'Web Design &\nDevelopment',
    desc: 'We build high-performance, responsive websites and web applications that engage visitors and accelerate business growth. From custom UI/UX design to full-stack engineering, we deliver future-proof digital products.',
    checks: ['Custom UI/UX Design & Prototyping', 'React, Next.js & Modern Stacks', 'E-Commerce & Headless CMS', 'SEO & Page Speed Optimization'],
    lottieUrl: LOTTIE_URLS[0],
    flip: false,
  },
  {
    number: '02',
    tag: 'Visual Identity',
    title: 'Graphic Design\n& Branding',
    desc: 'We design cohesive brand identity systems and striking marketing assets that define your brand and captivate your audience. Every element is crafted to communicate your core values with precision.',
    checks: ['Brand Strategy & Logo Design', 'Digital & Print Collateral', 'Social Media Design Kits', 'Packaging & Visual Identity'],
    lottieUrl: LOTTIE_URLS[1],
    flip: true,
  },
  {
    number: '03',
    tag: 'Cinematic Content',
    title: 'Video Editing\n& Production',
    desc: 'We produce cinematic brand stories and high-impact social media video edits that drive engagement. From corporate promotional videos to viral short-form content, we bring your vision to life.',
    checks: ['Cinematic Video Production', 'Advanced Color Grading & Motion Graphics', 'Short-Form Reels & TikTok Campaigns', 'Post-Production & VFX'],
    lottieUrl: LOTTIE_URLS[2],
    flip: false,
  },
];

function ServiceBlock({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const blockRef = useRef(null);
  const { number, tag, title, desc, checks, lottieUrl, flip } = service;

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.01, rootMargin: '0px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const textContent = (
    <div className="svc-text" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="svc-top-row">
        <span className="svc-number">{number}</span>
        <span className="svc-tag">{tag}</span>
      </div>
      <h3 className="svc-title" style={{ whiteSpace: 'pre-line' }}>{title}</h3>
      <p className="svc-desc">{desc}</p>
      <ul className="svc-checklist">
        {checks.map((c, i) => (
          <li key={i} className="svc-check-item">
            <span className="svc-check-icon"><CheckIcon /></span>
            {c}
          </li>
        ))}
      </ul>
      <a href="/enquiry" className="svc-cta" id={`svc-cta-${index}`}>
        LEARN MORE
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );

  const mediaContent = (
    <div className="svc-media">
      <div className="svc-media-glow" />
      <div className="svc-lottie-wrap">
        <LottiePlayer src={lottieUrl} loop autoplay style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="svc-canvas-badge">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 3, 3]} intensity={2} color="#00d4ff" />
          <ServiceIcon3D type={index} hovered={hovered} />
        </Canvas>
      </div>
    </div>
  );

  return (
    <div
      ref={blockRef}
      className="svc-block"
      id={`service-block-${index}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      {flip ? <>{mediaContent}{textContent}</> : <>{textContent}{mediaContent}</>}
    </div>
  );
}

export default function Services() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" className="services-section">
      <div
        ref={headerRef}
        className="svc-header"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <div className="svc-header-eyebrow">
          <span className="eyebrow-dot" />
          What We Do
          <span className="eyebrow-dot" />
        </div>
        <h2 className="svc-header-title">
          Our <span className="svc-title-accent">Services</span>
        </h2>
        <p className="svc-header-desc">
          Three core disciplines, one unified creative vision — designed to elevate your brand across every digital touchpoint.
        </p>
      </div>

      <div className="svc-blocks-list">
        {SERVICES.map((svc, i) => (
          <ServiceBlock key={i} service={svc} index={i} />
        ))}
      </div>
    </section>
  );
}
