import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const Marquee = lazy(() => import('./components/Marquee'));
const Services = lazy(() => import('./components/Services'));
const About = lazy(() => import('./components/About'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const Enquiry = lazy(() => import('./pages/Enquiry'));
const Fudomon = lazy(() => import('./pages/Fudomon'));

gsap.registerPlugin(ScrollTrigger);

function MainSite() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!loaded) return;
    let lenis;
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        lenis = new Lenis({
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.8,
          touchMultiplier: 1.5,
        });
        lenisRef.current = lenis;
        lenis.on('scroll', ScrollTrigger.update);
        const raf = (time) => { lenis.raf(time * 1000); };
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
        ScrollTrigger.refresh();
        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', onResize, { passive: true });
        return () => {
          window.removeEventListener('resize', onResize);
          lenis.destroy();
          gsap.ticker.remove(raf);
        };
      } catch (err) {
        console.warn('Lenis not available, using native scroll');
      }
    };
    const cleanup = initLenis();
    return () => { cleanup?.then(fn => fn?.()); };
  }, [loaded]);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        id="main-content"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease', pointerEvents: loaded ? 'auto' : 'none' }}
      >
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={null}>
            <Marquee />
            <Services />
            <About />
            <Portfolio />
            <Testimonials />
            <Contact />
          </Suspense>
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/fudomon" element={<Fudomon />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
