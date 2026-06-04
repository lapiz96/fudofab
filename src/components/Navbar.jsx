import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="nav-logo" id="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          FUDO<span className="nav-logo-dot">FAB</span>
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                id={`nav-link-${link.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link); }}
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/enquiry"
              className="nav-cta"
              id="nav-cta"
            >
              Enquiry
            </Link>
          </li>
        </ul>

        <button
          className="nav-hamburger"
          id="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(6.5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'translateX(-10px)' : 'none' }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6.5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(4,13,26,0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(2rem, 8vw, 3rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: 'var(--white)',
                cursor: 'pointer',
                letterSpacing: '0.1em',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--cyan)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--white)'}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              color: 'var(--white)',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
