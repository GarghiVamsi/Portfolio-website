import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AnimeIntro.css';

const NUM_LINES = 28;

export default function AnimeIntro({ onComplete }) {
  const [phase, setPhase] = useState('lines'); // lines | flash | reveal | exit

  const finish = useCallback(() => {
    setPhase('exit');
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('flash'), 800);
    const t2 = setTimeout(() => setPhase('reveal'), 1050);
    const t3 = setTimeout(() => setPhase('exit'), 3400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 'exit') {
      const t = setTimeout(onComplete, 700);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="anime-intro"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={def => {
            if (def === 'exit') onComplete();
          }}
        >
          {/* Speed lines */}
          <div className="anime-intro__lines">
            {Array.from({ length: NUM_LINES }).map((_, i) => (
              <div
                key={i}
                className="anime-intro__line"
                style={{ '--r': `${i * (360 / NUM_LINES)}deg`, '--delay': `${i * 0.012}s` }}
              />
            ))}
          </div>

          {/* White flash */}
          <AnimatePresence>
            {phase === 'flash' && (
              <motion.div
                key="flash"
                className="anime-intro__flash"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.35 }}
              />
            )}
          </AnimatePresence>

          {/* Main reveal */}
          <AnimatePresence>
            {(phase === 'reveal' || phase === 'exit') && (
              <motion.div
                key="content"
                className="anime-intro__content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.p
                  className="anime-intro__class"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.4 }}
                >
                  ── DATA ENGINEER · M.S. CS ──
                </motion.p>

                <div className="anime-intro__name-wrap">
                  <motion.h1
                    className="anime-intro__name"
                    initial={{ x: -60, opacity: 0, skewX: -6 }}
                    animate={{ x: 0, opacity: 1, skewX: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    VAMSI
                  </motion.h1>
                  <motion.h1
                    className="anime-intro__name anime-intro__name--accent"
                    initial={{ x: 60, opacity: 0, skewX: 6 }}
                    animate={{ x: 0, opacity: 1, skewX: 0 }}
                    transition={{ duration: 0.45, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    GARGHI
                  </motion.h1>
                </div>

                <motion.div
                  className="anime-intro__tags"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span>PYTHON</span>
                  <span className="anime-intro__sep">◆</span>
                  <span>SQL</span>
                  <span className="anime-intro__sep">◆</span>
                  <span>ETL</span>
                  <span className="anime-intro__sep">◆</span>
                  <span>CLOUD</span>
                </motion.div>

                <motion.div
                  className="anime-intro__bar-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <motion.div
                    className="anime-intro__bar"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  />
                </motion.div>

                <motion.p
                  className="anime-intro__entering"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.6, 1] }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  ▶ ENTERING THE ARENA
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <button className="anime-intro__skip" onClick={finish}>
            SKIP ▶▶
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
