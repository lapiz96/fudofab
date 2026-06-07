import { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

function FloatingOrb() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.15;
    mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
  });

  return (
    <Sphere ref={mesh} args={[1.8, 64, 64]}>
      <MeshDistortMaterial
        color="#4169E1"
        distort={0.4}
        speed={2}
        transparent
        opacity={0.12}
        emissive="#60A5FA"
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
}

export default memo(FloatingOrb);
