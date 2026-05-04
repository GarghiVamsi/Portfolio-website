import { motion } from 'framer-motion';
import './About.css';

const facts = [
  { icon: '🎓', label: 'Education', value: 'M.S. Computer Science' },
  { icon: '💼', label: 'Experience', value: '5+ Years in Data Engineering' },
  { icon: '📍', label: 'Based in', value: 'United States' },
  { icon: '🏀', label: 'Off the clock', value: 'Basketball · Gaming · Anime' },
];

const skills = [
  { category: 'Languages', items: ['Python', 'SQL', 'PySpark', 'Bash'] },
  { category: 'Platforms', items: ['Snowflake', 'Databricks', 'AWS', 'Azure'] },
  { category: 'Tools', items: ['dbt', 'Airflow', 'Spark', 'Informatica'] },
  { category: 'Visualization', items: ['Power BI', 'Tableau'] },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section className="about">
      <motion.div
        className="about__header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="about__title">
          About <span className="gradient-text">Me</span>
        </h2>
      </motion.div>

      <div className="about__body">
        {/* Left — bio + quick facts */}
        <motion.div
          className="about__left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p className="about__bio" variants={itemVariants}>
            I'm a data engineer with 5+ years of experience building production-grade
            pipelines that move and transform data at scale. I've shipped solutions
            across healthcare, insurance, agriculture, and manufacturing — working
            with teams at Cognizant, Slalom, and TekAssembly.
          </motion.p>
          <motion.p className="about__bio" variants={itemVariants}>
            My work sits at the intersection of engineering and analytics: I design
            the systems that make clean, reliable data available to the people and
            tools that need it. I hold a Master's degree in Computer Science and
            care deeply about data quality, pipeline reliability, and clean architecture.
          </motion.p>
          <motion.p className="about__bio" variants={itemVariants}>
            Outside of work you'll find me watching anime, following the NBA, or
            deep in a single-player RPG.
          </motion.p>

          <motion.div className="about__facts" variants={itemVariants}>
            {facts.map(f => (
              <div key={f.label} className="about__fact">
                <span className="about__fact-icon">{f.icon}</span>
                <div>
                  <p className="about__fact-label">{f.label}</p>
                  <p className="about__fact-value">{f.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — skills grid */}
        <motion.div
          className="about__right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="about__skills-heading">Tech Stack</p>
          <div className="about__skills-grid">
            {skills.map(group => (
              <div key={group.category} className="about__skill-group">
                <p className="about__skill-category">{group.category}</p>
                <div className="about__skill-tags">
                  {group.items.map(item => (
                    <span key={item} className="about__skill-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
