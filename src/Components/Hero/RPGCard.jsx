import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './RPGCard.css';

const STATS = [
  { label: 'STR', name: 'Python',           value: 92 },
  { label: 'INT', name: 'SQL',               value: 88 },
  { label: 'DEX', name: 'ETL / Pipelines',  value: 85 },
  { label: 'WIS', name: 'Cloud (AWS·Azure)', value: 78 },
  { label: 'CHA', name: 'Data Viz',          value: 80 },
];

export default function RPGCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      className="rpg-card"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rpg-card__rarity">
        <span className="rpg-card__diamond">◆</span>
        SR — Super Rare
      </div>

      <div className="rpg-card__identity">
        <div className="rpg-card__name">Vamsi Garghi</div>
        <div className="rpg-card__class">Data Engineer · M.S. Computer Science</div>
      </div>

      <div className="rpg-card__divider" />

      <div className="rpg-card__level-row">
        <span className="rpg-card__lv">LV.24</span>
        <div className="rpg-card__xp-track">
          <motion.div
            className="rpg-card__xp-fill"
            initial={{ width: 0 }}
            animate={inView ? { width: '68%' } : { width: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="rpg-card__xp-label">2 400 XP</span>
      </div>

      <div className="rpg-card__divider" />

      <div className="rpg-card__stats">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="rpg-card__stat-row">
            <span className="rpg-card__stat-label">{stat.label}</span>
            <span className="rpg-card__stat-name">{stat.name}</span>
            <div className="rpg-card__bar-track">
              <motion.div
                className="rpg-card__bar-fill"
                initial={{ width: 0 }}
                animate={inView ? { width: `${stat.value}%` } : { width: 0 }}
                transition={{ duration: 0.9, delay: i * 0.09 + 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="rpg-card__stat-val">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="rpg-card__divider" />

      <div className="rpg-card__status">
        <span className="rpg-card__status-dot" />
        ONLINE — Open to Opportunities
      </div>
    </motion.div>
  );
}
