import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import BorderGlow from './ui/BorderGlow/BorderGlow';
import { GeometricMark, GradientOrb } from './ui/Visuals';
import SceneCanvas from './three/SceneCanvas';
import ParticleField from './three/ParticleField';
import { fadeUp, staggerChildren, tiltOnHover } from '../lib/motionVariants';

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
    flip: false,
    visual: 'grid',
  },
  {
    number: '02',
    tag: 'Visual Identity',
    title: 'Graphic Design\n& Branding',
    desc: 'We design cohesive brand identity systems and striking marketing assets that define your brand and captivate your audience. Every element is crafted to communicate your core values with precision.',
    checks: ['Brand Strategy & Logo Design', 'Digital & Print Collateral', 'Social Media Design Kits', 'Packaging & Visual Identity'],
    flip: true,
    visual: 'ring',
  },
  {
    number: '03',
    tag: 'Cinematic Content',
    title: 'Video Editing\n& Production',
    desc: 'We produce cinematic brand stories and high-impact social media video edits that drive engagement. From corporate promotional videos to viral short-form content, we bring your vision to life.',
    checks: ['Cinematic Video Production', 'Advanced Color Grading & Motion Graphics', 'Short-Form Reels & TikTok Campaigns', 'Post-Production & VFX'],
    flip: false,
    visual: 'hex',
  },
];

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

const ServiceVisual = memo(function ServiceVisual({ variant }) {
  return (
    <div className="svc-media">
      <div className="svc-media-glow" />
      <div className="svc-css-visual">
        <GeometricMark variant={variant} />
      </div>
      <div className="svc-canvas-badge">
        <GeometricMark variant={variant === 'grid' ? 'hex' : 'grid'} />
      </div>
    </div>
  );
});

const ServiceBlock = memo(function ServiceBlock({ service, index }) {
  const { number, tag, title, desc, checks, flip, visual } = service;

  const textContent = (
    <div className="svc-text">
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

  const mediaContent = <ServiceVisual variant={visual} />;

  return (
    <motion.div
      variants={tiltOnHover}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      <BorderGlow {...GLOW_PROPS} className="svc-border-glow">
        <motion.div
          className="svc-block card-scan"
          id={`service-block-${index}`}
          variants={fadeUp}
        >
          {flip ? <>{mediaContent}{textContent}</> : <>{textContent}{mediaContent}</>}
        </motion.div>
      </BorderGlow>
    </motion.div>
  );
});

export default function Services() {
  return (
    <motion.section
      id="services"
      className="services-section"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <SceneCanvas>
        <ambientLight intensity={0.4} />
        <ParticleField />
      </SceneCanvas>

      <Parallax speed={15} className="section-orbs" aria-hidden="true">
        <GradientOrb size="360px" top="8%" left="-8%" />
        <GradientOrb size="280px" top="46%" right="2%" />
        <GradientOrb size="240px" bottom="4%" left="32%" />
      </Parallax>

      <Parallax speed={-5}>
        <motion.div className="svc-header" variants={fadeUp}>
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
        </motion.div>
      </Parallax>

      <Parallax speed={-3} className="svc-blocks-list">
        {SERVICES.map((svc, i) => (
          <ServiceBlock key={i} service={svc} index={i} />
        ))}
      </Parallax>
    </motion.section>
  );
}
