import { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';

function WireframeIcosahedron() {
  const mesh = useRef();

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.x += 0.004;
    mesh.current.rotation.y += 0.006;
  });

  return (
    <Icosahedron ref={mesh} args={[1, 1]}>
      <meshStandardMaterial
        color="#4169E1"
        wireframe
        emissive="#60A5FA"
        emissiveIntensity={0.25}
      />
    </Icosahedron>
  );
}

export default memo(WireframeIcosahedron);
