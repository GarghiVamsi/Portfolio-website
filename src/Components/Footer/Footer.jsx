import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="footer__text">
        Built with React & Framer Motion · <span className="gradient-text">Vamsi Garghi</span> © {new Date().getFullYear()}
      </p>
      <a
        href="https://github.com/GarghiVamsi"
        className="footer__link"
        target="_blank"
        rel="noreferrer"
      >
        GitHub ↗
      </a>
    </motion.footer>
  );
}
