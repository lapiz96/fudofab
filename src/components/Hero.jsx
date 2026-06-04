import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── 3D Scene Components ─── */
function FloatingSphere() {
  const meshRef = useRef();
  const { mouse } = useThree();
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 0.5, 0.04);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 0.3, 0.04);
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <MeshDistortMaterial color="#00d4ff" distort={0.35} speed={1.8} roughness={0} metalness={0.9} transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

function WireframeSphere() {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.08;
    ref.current.rotation.z += delta * 0.04;
  });
  return (
    <mesh ref={ref} position={[0, 0, -1.5]}>
      <icosahedronGeometry args={[2.6, 1]} />
      <meshBasicMaterial color="#4f8ef7" wireframe transparent opacity={0.05} />
    </mesh>
  );
}

function OrbitingTorus() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.25;
    ref.current.rotation.y = t * 0.4;
    ref.current.position.x = Math.sin(t * 0.35) * 2.2;
    ref.current.position.y = Math.cos(t * 0.28) * 1.2;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.55, 0.1, 16, 60]} />
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function ParticleCloud() {
  const ref = useRef();
  const count = 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random() * 14 + 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    const mix = Math.random();
    colors[i * 3] = 0.2 + mix * 0.3;
    colors[i * 3 + 1] = 0.7 + mix * 0.3;
    colors[i * 3 + 2] = 1.0;
  }
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.035;
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.018) * 0.08;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.028} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

function CameraController() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.25, 0.018);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.18, 0.018);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─── Hero Component ─── */
export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const headlineRef = useRef(null);
  const labelRef = useRef(null);
  const descRef = useRef(null);
  const actionsRef = useRef(null);
  const sidebarRef = useRef(null);
  const scrollRef = useRef(null);
  const socialRef = useRef(null);
  const infoCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0);
      const words = headlineRef.current?.querySelectorAll('.hero-headline-word') || [];
      tl.to(words, { opacity: 1, y: 0, duration: 1.0, ease: 'power4.out', stagger: 0.1 }, 0.15);
      tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.55);
      tl.to(actionsRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.65);
      tl.to(infoCardsRef.current.filter(Boolean), { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 }, 0.35);
      tl.to(sidebarRef.current, { opacity: 1, duration: 1.0, ease: 'power3.out' }, 0.4);
      tl.to(scrollRef.current, { opacity: 1, duration: 1, ease: 'power3.out' }, 1.1);
      tl.to(socialRef.current, { opacity: 1, duration: 1, ease: 'power3.out' }, 1.1);

      // BG zoom scroll
      gsap.to(bgRef.current, {
        scale: 1.3, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });
      // Headline parallax
      gsap.to(headlineRef.current, {
        y: -100, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '45% top', scrub: 1 },
      });
      gsap.to(descRef.current, {
        y: -70, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: '5% top', end: '38% top', scrub: 1 },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* BG */}
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-bg-overlay" />

      {/* Three.js Canvas */}
      <div className="hero-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 70 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f8ef7" />
          <Stars radius={80} depth={50} count={1500} factor={3} saturation={0} fade speed={0.5} />
          <ParticleCloud />
          <FloatingSphere />
          <WireframeSphere />
          <OrbitingTorus />
          <CameraController />
        </Canvas>
      </div>

      {/* Left Sidebar */}
      <div className="hero-sidebar" ref={sidebarRef} style={{ opacity: 0 }}>
        <div className="hero-sidebar-line" />
        {['DESIGN', 'DEVELOP', 'CREATE', 'INSPIRE'].map((item, i) => (
          <div key={i} className={`hero-sidebar-item${i === 0 ? ' active' : ''}`} id={`sidebar-item-${i}`}>
            {item}
          </div>
        ))}
        <div className="hero-sidebar-line" />
      </div>

      {/* Main Content */}
      <div className="hero-content">
        {/* Left: text */}
        <div className="hero-left">
          <div className="hero-label" ref={labelRef}>
            Creative Digital Agency
          </div>

          <h1 className="hero-headline" ref={headlineRef}>
            <span className="hero-headline-line">
              <span className="hero-headline-word hero-headline-large">WE</span>
              <span className="hero-headline-word hero-headline-accent">&nbsp;BUILD</span>
            </span>
            <span className="hero-headline-line">
              <span className="hero-headline-word hero-headline-highlight">DIGITAL</span>
            </span>
            <span className="hero-headline-line">
              <span className="hero-headline-word hero-headline-large">WORLDS</span>
            </span>
          </h1>

          <p className="hero-description" ref={descRef}>
            We craft premium, high-converting digital experiences — specializing in custom
            web design &amp; development, brand identity systems, and cinematic video production.
          </p>

          <div className="hero-actions" ref={actionsRef}>
            <a
              href="#services"
              className="btn-primary"
              id="hero-cta-btn"
              onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <span>Our Services</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="#portfolio"
              className="btn-secondary"
              id="hero-portfolio-btn"
              onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <div className="btn-arrow">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              View Work
            </a>
          </div>
        </div>

        {/* Right: info cards */}
        <div className="hero-right">
          {[
            { label: 'Studio', value: 'FUDOFAB Creative' },
            { label: 'Expertise', value: 'Digital & Visual Arts' },
            { label: 'Projects', value: '120+ Delivered' },
          ].map((card, i) => (
            <div
              key={i}
              className="hero-info-card"
              id={`hero-info-${i}`}
              ref={el => (infoCardsRef.current[i] = el)}
            >
              <div className="hero-info-label">{card.label}</div>
              <div className="hero-info-value">{card.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator" ref={scrollRef}>
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </div>

      {/* Social */}
      <div className="hero-social" ref={socialRef}>
        {['FB', 'IG', 'YT', 'LI'].map(s => (
          <a key={s} href="#" id={`social-${s.toLowerCase()}`}>{s}</a>
        ))}
      </div>

      {/* Glow orbs */}
      <div className="glow-orb glow-orb-cyan" style={{ width: '600px', height: '600px', top: '-200px', right: '-100px', opacity: 0.08 }} />
      <div className="glow-orb glow-orb-blue" style={{ width: '400px', height: '400px', bottom: '-100px', left: '10%', opacity: 0.06 }} />
    </section>
  );
}
