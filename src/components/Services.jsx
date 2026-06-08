import { memo } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerChildren } from '../lib/motionVariants';

const SERVICES = [
  {
    number: '01',
    tag: 'Digital Solutions',
    title: 'Web Design & Development',
    desc: 'We build high-performance, responsive websites and web applications that engage visitors and accelerate business growth. From custom UI/UX design to full-stack engineering.',
    checks: ['Custom UI/UX Design', 'E-Commerce & CMS', 'SEO Optimization'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="6" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 12h28" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7" cy="9" r="1" fill="currentColor"/>
        <circle cx="11" cy="9" r="1" fill="currentColor"/>
        <circle cx="15" cy="9" r="1" fill="currentColor"/>
        <path d="M8 19l4-3 4 3 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    tag: 'Visual Identity',
    title: 'Graphic Design & Branding',
    desc: 'We design cohesive brand identity systems and striking marketing assets that define your brand and captivate your audience. Every element crafted with precision.',
    checks: ['Brand Strategy & Logo', 'Print Collateral', 'Social Media Kits', 'Packaging Design'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
  },
  {
    number: '03',
    tag: 'Cinematic Content',
    title: 'Video Editing & Production',
    desc: 'We produce cinematic brand stories and high-impact social media video edits that drive engagement. From corporate promotional videos to viral short-form content.',
    checks: ['Video Production', 'Color Grading & VFX', 'Short-Form Reels', 'Post-Production'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M22 13l8-4v14l-8-4V13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="11" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    number: '04',
    tag: 'Targeted Growth',
    title: 'Digital Marketing',
    desc: 'We design and execute performance campaigns, targeted social ads, and content strategies that amplify brand reach, engage users, and drive high-intent conversions.',
    checks: ['Social Media Marketing', 'Search Engine Marketing', 'Content & Copywriting', 'Analytics & Reporting'],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 16l8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 8h2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const ServiceCard = memo(function ServiceCard({ service, index }) {
  const { number, tag, title, desc, checks, icon } = service;

  return (
    <motion.div
      className="svc2-card"
      id={`svc2-card-${index}`}
      variants={fadeUp}
      custom={index}
    >
      {/* Default face — always visible */}
      <div className="svc2-front">
        {/* Top row: icon + ghost number */}
        <div className="svc2-front-top">
          <div className="svc2-icon-wrap">
            {icon}
          </div>
          <div className="svc2-num">{number}</div>
        </div>

        {/* Bottom group: tag, title, arrow */}
        <div className="svc2-front-bottom">
          <div className="svc2-tag">{tag}</div>
          <h3 className="svc2-card-title">{title}</h3>
          <div className="svc2-arrow">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H8M16 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>


      {/* Hover overlay — slides in */}
      <div className="svc2-hover">
        <div className="svc2-hover-tag">{tag}</div>
        <h3 className="svc2-hover-title">{title}</h3>
        <p className="svc2-hover-desc">{desc}</p>
        <ul className="svc2-hover-list">
          {checks.map((c, i) => (
            <li key={i} className="svc2-hover-item">
              <span className="svc2-dot" />
              {c}
            </li>
          ))}
        </ul>
        <a href="/enquiry" className="svc2-hover-cta" id={`svc2-cta-${index}`}>
          Learn More
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
});

export default function Services() {
  return (
    <motion.section
      id="services"
      className="svc2-section"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Header */}
      <motion.div className="svc2-header" variants={fadeUp}>
        <div className="svc2-eyebrow">
          <span className="svc2-eyebrow-dot" />
          What We Do
        </div>
        <h2 className="svc2-title">
          Our <span className="svc2-title-accent">Services</span>
        </h2>
        <p className="svc2-desc">
          Three core disciplines, one unified creative vision — designed to elevate your brand across every digital touchpoint.
        </p>
        <a href="/enquiry" className="svc2-all-btn" id="svc2-all-services">
          All Services
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </motion.div>

      {/* Horizontal scrollable cards */}
      <div className="svc2-scroll-track">
        <div className="svc2-cards-row">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={i} service={svc} index={i} />
          ))}
        </div>
        {/* Scroll hint */}
        <div className="svc2-scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.section>
  );
}
