import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const unsub = scrollYProgress.onChange(v => setScrolled(v > 0.02));
    return unsub;
  }, [scrollYProgress]);

  return (
    <>
      {/* Scroll progress line */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <motion.nav
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <a href="#home" className="navbar__logo">
          <span className="gradient-text">VG</span>
        </a>

        <ul className="navbar__links">
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} className="navbar__link">{link.label}</a>
            </li>
          ))}
        </ul>

        <button
          className="navbar__theme-btn"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.span>
        </button>
      </motion.nav>
    </>
  );
}
