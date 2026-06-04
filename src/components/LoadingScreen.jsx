import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const progressRef = useRef(0);
  const animFrameRef = useRef(null);

  // Three.js particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Particle field
    const count = 2500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ size: 0.025, color: 0x00d4ff, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Central rotating wireframe
    const torusGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 80, 16);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.12 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;
      torus.rotation.x += 0.005;
      torus.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
    };
  }, []);

  // Progress counter
  useEffect(() => {
    let start = null;
    const duration = 2800;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      progressRef.current = pct;
      setProgress(Math.floor(pct));

      if (pct < 100) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        // Start exit after small delay
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onComplete?.(), 900);
        }, 300);
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
      <canvas ref={canvasRef} className="loading-canvas" />

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
