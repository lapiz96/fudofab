import { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

function FloatingOrb() {
  const outerCubeRef = useRef();
  const innerCubeRef = useRef();
  const fragmentsRef = useRef();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    
    // Rotate outer glass cube
    if (outerCubeRef.current) {
      outerCubeRef.current.rotation.x = elapsed * 0.12;
      outerCubeRef.current.rotation.y = elapsed * 0.18;
      outerCubeRef.current.position.y = Math.sin(elapsed * 0.6) * 0.15;
    }

    // Rotate inner solid cube in opposite direction
    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.x = -elapsed * 0.22;
      innerCubeRef.current.rotation.y = -elapsed * 0.15;
      innerCubeRef.current.rotation.z = elapsed * 0.1;
    }

    // Rotate orbiting fragments
    if (fragmentsRef.current) {
      fragmentsRef.current.rotation.y = elapsed * 0.25;
    }
  });

  return (
    <group>
      {/* Outer Glass Cube */}
      <mesh ref={outerCubeRef}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshPhysicalMaterial
          color="#93C5FD"
          transparent
          opacity={0.35}
          transmission={0.9}
          thickness={1.5}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          ior={1.5}
        />
        {/* Glowing Edges */}
        <Edges
          threshold={15}
          color="#3B82F6"
          lineWidth={2.5}
        />
      </mesh>

      {/* Inner Glowing Crystal Cube */}
      <mesh ref={innerCubeRef}>
        <boxGeometry args={[1.0, 1.0, 1.0]} />
        <meshStandardMaterial
          color="#2563EB"
          emissive="#3B82F6"
          emissiveIntensity={1.8}
          roughness={0.2}
          metalness={0.8}
        />
        <Edges
          threshold={15}
          color="#60A5FA"
          lineWidth={1.5}
        />
      </mesh>

      {/* Orbiting Fragments (abstract tech spheres/cubes) */}
      <group ref={fragmentsRef}>
        {/* Fragment 1: Blue Sphere */}
        <mesh position={[2.2, 1.2, -1.0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#3B82F6" roughness={0.1} metalness={0.9} />
        </mesh>
        
        {/* Fragment 2: Small Glass Cube */}
        <mesh position={[-2.0, -1.0, 1.5]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshPhysicalMaterial color="#93C5FD" transparent opacity={0.6} transmission={0.9} thickness={0.5} roughness={0.1} />
          <Edges threshold={15} color="#3B82F6" lineWidth={1} />
        </mesh>

        {/* Fragment 3: Floating Blue Cube */}
        <mesh position={[1.5, -1.8, 2.0]}>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color="#2563EB" roughness={0.2} metalness={0.8} />
          <Edges threshold={15} color="#60A5FA" lineWidth={1} />
        </mesh>

        {/* Fragment 4: Tiny Glass Shard */}
        <mesh position={[-1.8, 1.8, 1.2]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.5} transmission={0.9} roughness={0.1} />
          <Edges threshold={15} color="#93C5FD" lineWidth={1} />
        </mesh>
      </group>

      {/* Lights inside/near the cube for cinematic glow */}
      <pointLight position={[0, 0, 0]} color="#3B82F6" intensity={3.5} distance={6} />
      <pointLight position={[2, 3, 2]} color="#60A5FA" intensity={2.0} distance={8} />
      <pointLight position={[-2, -3, -2]} color="#1E3A8A" intensity={1.5} distance={8} />
    </group>
  );
}

export default memo(FloatingOrb);
