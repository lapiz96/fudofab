import { memo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

const SceneCanvas = memo(function SceneCanvas({ children, className = '', camera = { position: [0, 0, 5], fov: 45 } }) {
  return (
    <div className={`r3f-canvas-wrap ${className}`} aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={camera}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
});

export default SceneCanvas;
