import { memo, useMemo } from 'react';
import './BorderGlow.css';

function buildGlowVars({
  glowColor,
  backgroundColor,
  borderRadius,
  glowRadius,
  glowIntensity,
  coneSpread,
  colors,
}) {
  return {
    '--border-glow-color': glowColor,
    '--border-glow-bg': backgroundColor,
    '--border-glow-radius': `${borderRadius}px`,
    '--border-glow-size': `${glowRadius}px`,
    '--border-glow-intensity': glowIntensity,
    '--border-glow-cone': `${coneSpread}%`,
    '--border-glow-a': colors[0],
    '--border-glow-b': colors[1],
    '--border-glow-c': colors[2],
  };
}

function BorderGlow({
  children,
  className = '',
  glowColor = '225 73 57',
  backgroundColor = '#F0F4FF',
  borderRadius = 20,
  glowRadius = 35,
  glowIntensity = 1.2,
  coneSpread = 30,
  animated = true,
  colors = ['#4169E1', '#60A5FA', '#93c5fd'],
}) {
  const style = useMemo(
    () => buildGlowVars({ glowColor, backgroundColor, borderRadius, glowRadius, glowIntensity, coneSpread, colors }),
    [glowColor, backgroundColor, borderRadius, glowRadius, glowIntensity, coneSpread, colors],
  );

  return (
    <div
      className={`border-glow${animated ? ' border-glow-animated' : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}

export default memo(BorderGlow);
