import { memo, useMemo } from 'react';

function ColorBends({
  rotation = 90,
  speed = 0.2,
  colors = ['#4169E1', '#60A5FA', '#0F172A'],
  transparent = true,
  autoRotate = 0.55,
  scale = 1,
  mouseInfluence = 1.1,
  intensity = 1.5,
  bandWidth = 6,
  frequency = 1,
  warpStrength = 1,
  noise = 0.15,
  iterations = 1,
  parallax = 1,
}) {
  const style = useMemo(() => ({
    '--cb-rotation': `${rotation}deg`,
    '--cb-speed': `${Math.max(6, 18 / Math.max(speed, 0.1))}s`,
    '--cb-auto-rotate': autoRotate,
    '--cb-scale': scale,
    '--cb-mouse': mouseInfluence,
    '--cb-intensity': intensity,
    '--cb-band': `${bandWidth}%`,
    '--cb-frequency': frequency,
    '--cb-warp': warpStrength,
    '--cb-noise': noise,
    '--cb-iterations': iterations,
    '--cb-parallax': parallax,
    '--cb-a': colors[0],
    '--cb-b': colors[1],
    '--cb-c': colors[2],
    backgroundColor: transparent ? 'transparent' : colors[2],
  }), [rotation, speed, colors, transparent, autoRotate, scale, mouseInfluence, intensity, bandWidth, frequency, warpStrength, noise, iterations, parallax]);

  return (
    <div className="color-bends" style={style} aria-hidden="true">
      <div className="color-bends__band color-bends__band--one" />
      <div className="color-bends__band color-bends__band--two" />
      <div className="color-bends__band color-bends__band--three" />
    </div>
  );
}

export default memo(ColorBends);
