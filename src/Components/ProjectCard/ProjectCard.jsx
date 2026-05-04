import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './ProjectCard.css';

const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  Java: '#b07219',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  R: '#198CE7',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
};

export default function ProjectCard({ repo }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glowBg = useTransform([glowX, glowY], ([gx, gy]) =>
    `radial-gradient(circle at ${gx}% ${gy}%, var(--accent-glow) 0%, transparent 70%)`
  );

  const handleMouse = e => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Dynamic glow follow */}
      <motion.div
        className="project-card__glow"
        style={{ background: glowBg }}
      />

      <div className="project-card__inner">
        <div className="project-card__header">
          <span className="project-card__icon">📁</span>
          <div className="project-card__links">
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noreferrer" aria-label="Live demo">
                ↗
              </a>
            )}
            <a href={repo.html_url} target="_blank" rel="noreferrer" aria-label="GitHub repo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.57v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        <h3 className="project-card__name">{repo.name}</h3>
        <p className="project-card__desc">
          {repo.description || 'No description provided.'}
        </p>

        <div className="project-card__footer">
          {repo.language && (
            <span className="project-card__lang">
              <span
                className="project-card__lang-dot"
                style={{ background: LANG_COLORS[repo.language] || '#8b949e' }}
              />
              {repo.language}
            </span>
          )}
          <span className="project-card__stat">⭐ {repo.stargazers_count}</span>
          <span className="project-card__stat">🍴 {repo.forks_count}</span>
        </div>
      </div>
    </motion.div>
  );
}
