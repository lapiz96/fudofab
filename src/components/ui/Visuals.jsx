import React from 'react';

export const GradientOrb = React.memo(function GradientOrb({ size, top, left, right, bottom }) {
  return (
    <div
      className="gradient-orb"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        top,
        left,
        right,
        bottom,
        pointerEvents: 'none',
        zIndex: 0,
        background: 'radial-gradient(circle, #4169E115 0%, #60A5FA0A 60%, transparent 80%)',
        filter: 'blur(50px)',
        animation: 'orbPulse 6s ease-in-out infinite',
      }}
    />
  );
});

export const GeometricMark = React.memo(function GeometricMark({ className = '', variant = 'grid' }) {
  if (variant === 'hex') {
    return (
      <svg className={`geo-mark geo-mark--hex ${className}`} viewBox="0 0 240 180" aria-hidden="true">
        <path d="M70 30h100l50 60-50 60H70L20 90 70 30Z" />
        <path d="M95 60h50l25 30-25 30H95L70 90 95 60Z" />
        <path d="M20 90h50M170 90h50M120 30v30M120 120v30" />
      </svg>
    );
  }

  if (variant === 'ring') {
    return (
      <svg className={`geo-mark geo-mark--ring ${className}`} viewBox="0 0 240 180" aria-hidden="true">
        <circle cx="120" cy="90" r="62" />
        <circle cx="120" cy="90" r="36" />
        <path d="M40 90h160M120 10v160M58 28l124 124M182 28 58 152" />
      </svg>
    );
  }

  if (variant === 'dots') {
    return (
      <svg className={`geo-mark geo-mark--dots ${className}`} viewBox="0 0 240 180" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, row) =>
          Array.from({ length: 16 }).map((__, col) => (
            <circle key={`${row}-${col}`} cx={15 + col * 14} cy={12 + row * 14} r="1.5" />
          )),
        )}
      </svg>
    );
  }

  return (
    <svg className={`geo-mark geo-mark--grid ${className}`} viewBox="0 0 240 180" aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <path key={`h-${i}`} d={`M20 ${30 + i * 20}h200`} />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={`v-${i}`} d={`M${30 + i * 22} 20v140`} />
      ))}
      <path d="M36 132 88 76l40 26 62-70" />
      <circle cx="88" cy="76" r="4" />
      <circle cx="128" cy="102" r="4" />
      <circle cx="190" cy="32" r="4" />
    </svg>
  );
});
