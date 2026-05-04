import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from './Terminal';
import './Hero.css';

const roles = [
  'Data Analyst',
  'Data Engineer',
  'ETL Developer',
  'Avid Basketball Fan',
  'Anime Enthusiast',
];

function Typewriter({ text }) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing'); // typing | pausing | deleting

  useEffect(() => {
    let timeout;
    if (phase === 'typing') {
      if (displayed.length < text.length) {
        timeout = setTimeout(() => setDisplayed(text.slice(0, displayed.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1400);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 200);
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, text]);

  return (
    <span className="typewriter">
      {displayed}
      <motion.span
        className="typewriter__cursor"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
      >|</motion.span>
    </span>
  );
}

function TypewriterCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const totalTime = roles[index].length * 65 + 1400 + roles[index].length * 35 + 400;
    const t = setTimeout(() => setIndex(i => (i + 1) % roles.length), totalTime);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <AnimatePresence mode="wait">
      <motion.span key={index}>
        <Typewriter text={roles[index]} />
      </motion.span>
    </AnimatePresence>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      <div className="hero__content">
        {/* Left — text */}
        <motion.div
          className="hero__left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero__greeting" variants={itemVariants}>
            Hello, welcome to my webpage!
          </motion.p>

          <motion.h1 className="hero__name" variants={itemVariants}>
            My name is{' '}
            <span className="gradient-text">Vamsi Garghi</span>
          </motion.h1>

          <motion.div className="hero__role" variants={itemVariants}>
            <TypewriterCycle />
          </motion.div>

          <motion.p className="hero__desc" variants={itemVariants}>
            An avid data analyst and data engineer with expertise in ETL development,
            cloud infrastructure, and turning raw data into meaningful insights.
          </motion.p>

          <motion.div className="hero__ctas" variants={itemVariants}>
            <a href="#projects" className="btn btn--primary">See Projects</a>
            <a href="#contact" className="btn btn--outline">Get in Touch</a>
          </motion.div>
        </motion.div>

        {/* Right — terminal */}
        <motion.div
          className="hero__right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Terminal />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>↓</span>
      </motion.div>
    </div>
  );
}
