import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Enquiry from './pages/Enquiry';

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
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
        return () => {
          lenis.destroy();
          gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
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
          <Marquee />
          <Services />
          <About />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/enquiry" element={<Enquiry />} />
      </Routes>
    </BrowserRouter>
  );
}
