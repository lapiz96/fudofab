import { motion } from 'framer-motion';
import { staggerChildren } from '../lib/motionVariants';

export default function Marquee() {
  const items = [
    'Web Design', 'Development', 'Graphic Design', 'Video Editing',
    'UI/UX', 'Branding', 'Motion Design', 'Digital Strategy',
    'Web Design', 'Development', 'Graphic Design', 'Video Editing',
    'UI/UX', 'Branding', 'Motion Design', 'Digital Strategy',
  ];

  return (
    <motion.div
      className="marquee-section"
      id="marquee-strip"
      aria-hidden="true"
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">{item}</span>
        ))}
      </div>
    </motion.div>
  );
}
