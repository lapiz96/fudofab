import { useEffect, useState, useRef } from 'react';
import Lottie from 'lottie-react';

/**
 * LottiePlayer — loads a Lottie JSON animation from a URL.
 * Shows a 3D CSS orb placeholder while loading / on error.
 */
export default function LottiePlayer({
  src,
  loop = true,
  autoplay = true,
  style = {},
  className = '',
  speed = 1,
}) {
  const [animData, setAnimData] = useState(null);
  const [error, setError] = useState(false);
  const lottieRef = useRef(null);

  useEffect(() => {
    if (!src) return;
    let cancelled = false;
    fetch(src)
      .then(r => {
        if (!r.ok) throw new Error('Failed');
        return r.json();
      })
      .then(data => {
        if (!cancelled) setAnimData(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => { cancelled = true; };
  }, [src]);

  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed);
    }
  }, [animData, speed]);

  if (error || (!animData && !src)) {
    return <div className={`lottie-fallback ${className}`} style={style} />;
  }

  if (!animData) {
    return (
      <div
        className={`lottie-loading ${className}`}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}
      >
        <div className="lottie-spinner" />
      </div>
    );
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  );
}
