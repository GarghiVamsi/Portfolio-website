import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGitHubRepos from '../../hooks/useGitHubRepos';
import ProjectCard from '../ProjectCard/ProjectCard';
import './Projects.css';

const GITHUB_USERNAME = 'GarghiVamsi';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__header" />
      <div className="skeleton-card__line skeleton-card__line--long" />
      <div className="skeleton-card__line skeleton-card__line--med" />
      <div className="skeleton-card__line skeleton-card__line--short" />
    </div>
  );
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos(GITHUB_USERNAME);
  const [filter, setFilter] = useState('All');

  const languages = ['All', ...Array.from(new Set(repos.map(r => r.language).filter(Boolean))).sort()];
  const filtered = filter === 'All' ? repos : repos.filter(r => r.language === filter);

  return (
    <section className="projects">
      <motion.div
        className="projects__header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="projects__title">
          My <span className="gradient-text">Projects</span>
        </h2>
        <p className="projects__subtitle">
          Open-source work pulled live from GitHub — {repos.length} repositories and counting.
        </p>
      </motion.div>

      {/* Filter chips */}
      {!loading && !error && (
        <motion.div
          className="projects__filters"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {languages.map(lang => (
            <button
              key={lang}
              className={`filter-chip${filter === lang ? ' filter-chip--active' : ''}`}
              onClick={() => setFilter(lang)}
            >
              {lang}
            </button>
          ))}
        </motion.div>
      )}

      {/* Error state */}
      {error && (
        <p className="projects__error">
          Could not load repos from GitHub. <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer">View on GitHub →</a>
        </p>
      )}

      {/* Card grid */}
      <div className="projects__grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : (
            <AnimatePresence mode="popLayout">
              {filtered.map((repo, i) => (
                <motion.div
                  key={repo.id}
                  variants={cardVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  style={{ height: '100%' }}
                >
                  <ProjectCard repo={repo} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
      </div>
    </section>
  );
}
