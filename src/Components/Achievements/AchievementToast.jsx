import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AchievementToast.css';

function Toast({ achievement, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="ach-toast"
      layout
      initial={{ x: 140, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 140, opacity: 0, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      <div className="ach-toast__icon">{achievement.icon}</div>
      <div className="ach-toast__body">
        <div className="ach-toast__label">Achievement Unlocked</div>
        <div className="ach-toast__title">{achievement.title}</div>
        <div className="ach-toast__desc">{achievement.desc}</div>
      </div>
      <div className="ach-toast__xp">+{achievement.xp} XP</div>
    </motion.div>
  );
}

export default function AchievementToast() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const handler = e => {
      const detail = e.detail;
      setQueue(q =>
        q.find(a => a.id === detail.id) ? q : [...q, { ...detail, uid: Date.now() }]
      );
    };
    window.addEventListener('achievement', handler);
    return () => window.removeEventListener('achievement', handler);
  }, []);

  const dismiss = uid => setQueue(q => q.filter(a => a.uid !== uid));

  return (
    <div className="ach-overlay">
      <AnimatePresence>
        {queue.map(a => (
          <Toast key={a.uid} achievement={a} onDone={() => dismiss(a.uid)} />
        ))}
      </AnimatePresence>
    </div>
  );
}
