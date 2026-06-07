import { useEffect, useRef, useState } from 'react';
import { GeometricMark, GradientOrb } from './ui/Visuals';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const progressRef = useRef(0);
  const animFrameRef = useRef(null);

  useEffect(() => {
    let start = null;
    const duration = 2200;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      progressRef.current = pct;
      setProgress(Math.floor(pct));

      if (pct < 100) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onComplete?.(), 700);
        }, 220);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [onComplete]);

  const letters = 'FUDOFAB'.split('');

  return (
    <div className={`loading-screen${exiting ? ' exit' : ''}`} aria-hidden={exiting}>
      <GradientOrb size="420px" top="8%" left="8%" />
      <GradientOrb size="360px" bottom="4%" right="10%" />
      <div className="loading-geo" aria-hidden="true">
        <GeometricMark variant="ring" />
      </div>

      <div className="loading-content">
        <div className="loading-title" aria-label="FUDOFAB">
          {letters.map((letter, i) => (
            <span
              key={i}
              style={{
                animation: `letterReveal 0.6s ${i * 0.08}s cubic-bezier(0.16,1,0.3,1) forwards`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div
          className="loading-subtitle"
          style={{ animation: 'fadeSlideUp 0.8s 0.8s ease forwards' }}
        >
          Digital Creative Agency
        </div>
        <div className="loading-bar-container" style={{ marginTop: '3rem' }}>
          <div className="loading-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="loading-percent">{progress}%</div>
      </div>

      <style>{`
        @keyframes letterReveal {
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        @keyframes fadeSlideUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
