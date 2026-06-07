import { memo, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const COUNT = 500;

function ParticleField() {
  const pointsRef = useRef();
  const basePositions = useRef(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const blue = new THREE.Color('#4169E1');
    const bright = new THREE.Color('#60A5FA');

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const c = Math.random() < 0.6 ? blue : bright;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    basePositions.current = pos.slice();
    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    const pts = pointsRef.current;
    const base = basePositions.current;
    if (!pts || !base) return;

    const posAttr = pts.geometry.attributes.position;
    const t = clock.getElapsedTime() * 0.003;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      posAttr.array[i3] = base[i3] + Math.sin(t * 1000 + i) * 0.15;
      posAttr.array[i3 + 1] = base[i3 + 1] + Math.cos(t * 1000 + i * 0.7) * 0.15;
      posAttr.array[i3 + 2] = base[i3 + 2] + Math.sin(t * 800 + i * 1.3) * 0.08;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={COUNT} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default memo(ParticleField);
