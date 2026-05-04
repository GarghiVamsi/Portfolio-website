import { motion } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    company: 'TekAssembly',
    role: 'Data Engineer',
    location: 'Cambridge, MA',
    start: 'Mar 2026',
    end: 'Present',
    bullets: [
      'Build and operate production ETL/ELT pipelines in Python, PySpark, and SQL processing <mark>~50 GB</mark> of operational data daily across <mark>4 source systems</mark>, delivering fact and dimension tables consumed by <mark>20+ downstream BI users</mark>.',
    ],
  },
  {
    company: 'Slalom Consulting',
    role: 'Data Engineering Consultant',
    location: 'Minneapolis, MN',
    start: 'Jun 2022',
    end: 'Feb 2024',
    clients: [
      {
        company: 'Pacific Life',
        industry: 'Insurance',
        role: 'Cloud / Data Engineer',
        location: 'Orange County, CA',
        start: 'Dec 2023',
        end: 'Feb 2024',
        bullets: [
          'Shipped a <mark>$100M</mark> government-regulated reporting pipeline by owning requirements-to-production delivery; passed regulatory audit with <mark>zero findings</mark>.',
          'Built a dbt testing framework across <mark>60+ Snowflake models</mark> with <mark>120+ data quality</mark> and metadata tests, reducing analytics incidents by <mark>~40%</mark>.',
          'Restructured Snowflake tables, improving data quality and reducing storage overhead.',
        ],
      },
      {
        company: "Land O'Lakes",
        industry: 'Agriculture / CPG',
        role: 'Data & Software Engineer',
        location: 'Arden Hills, MN',
        start: 'Jan 2023',
        end: 'Nov 2023',
        bullets: [
          'Built a rebate calculation engine processing <mark>$300M+</mark> in annual revenue across <mark>190+ programs</mark>.',
          'Led Oracle-to-Snowflake migration (<mark>~80 tables, 15+ pipelines</mark>), achieving <mark>30% faster processing</mark> and <mark>25%+ accuracy improvement</mark>.',
          'Designed dimensional models on Databricks Delta Lake for BI and OLAP reporting.',
          'Operated pipelines with <mark>~99% job success rate</mark>; created documentation and metadata standards.',
        ],
      },
      {
        company: 'Marvin Windows',
        industry: 'Manufacturing',
        role: 'Data Engineer',
        location: 'Warroad, MN',
        start: 'Sep 2022',
        end: 'Dec 2022',
        bullets: [
          'Developed ELT pipeline using Snowflake and dbt for BI consumption.',
          'Redesigned <mark>12+ finance tables</mark>, reducing reporting errors by <mark>25%</mark>.',
        ],
      },
    ],
  },
  {
    company: 'Cognizant Technology Solutions',
    role: 'Data Engineering Consultant',
    location: 'Eagan, MN',
    start: 'Apr 2021',
    end: 'May 2022',
    clients: [
      {
        company: 'BlueCross BlueShield',
        industry: 'Healthcare',
        role: 'Data Engineer',
        location: 'Eagan, MN',
        start: 'Apr 2021',
        end: 'May 2022',
        bullets: [
          'Delivered <mark>22 BI data assets</mark> (ETL pipelines and datasets) using Hadoop, Spark, and Informatica for <mark>100+ analysts</mark>.',
          'Mentored <mark>3 engineers</mark> and led a <mark>6-person team</mark>, improving client satisfaction by <mark>15%</mark>.',
        ],
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const entryVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function DateBadge({ start, end }) {
  const isPresent = end === 'Present';
  return (
    <div className="exp-date">
      <span className="exp-date__range">
        {start}
        <span className="exp-date__sep"> – </span>
        {isPresent ? (
          <span className="exp-date__present">
            <span className="exp-date__dot" />
            NOW
          </span>
        ) : (
          end
        )}
      </span>
    </div>
  );
}

function ClientEntry({ client, index }) {
  return (
    <motion.div
      className="exp-client"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="exp-client__header">
        <div className="exp-client__meta">
          <span className="exp-client__company">{client.company}</span>
          <span className="exp-client__industry">{client.industry}</span>
        </div>
        <span className="exp-client__date">{client.start} – {client.end}</span>
      </div>
      <div className="exp-client__role-row">
        <span className="exp-client__role">{client.role}</span>
        <span className="exp-client__location">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {client.location}
        </span>
      </div>
      <ul className="exp-bullets">
        {client.bullets.map((b, i) => (
          <li key={i} className="exp-bullet" dangerouslySetInnerHTML={{ __html: b }} />
        ))}
      </ul>
    </motion.div>
  );
}

function ExperienceEntry({ exp, index }) {
  return (
    <motion.div className="exp-entry" variants={entryVariants}>
      <div className="exp-entry__dot" />
      <div className="exp-entry__card">
        <div className="exp-entry__top">
          <div className="exp-entry__header">
            <h3 className="exp-entry__company">{exp.company}</h3>
            <span className="exp-entry__role">{exp.role}</span>
            <span className="exp-entry__location">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {exp.location}
            </span>
          </div>
          <DateBadge start={exp.start} end={exp.end} />
        </div>

        {exp.bullets && (
          <ul className="exp-bullets">
            {exp.bullets.map((b, i) => (
              <li key={i} className="exp-bullet" dangerouslySetInnerHTML={{ __html: b }} />
            ))}
          </ul>
        )}

        {exp.clients && (
          <div className="exp-clients">
            <p className="exp-clients__label">Clients</p>
            {exp.clients.map((client, i) => (
              <ClientEntry key={i} client={client} index={i} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section className="experience">
      <motion.div
        className="experience__header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="experience__title">
          Where I've <span className="gradient-text">Worked</span>
        </h2>
        <p className="experience__subtitle">
          5+ years building data pipelines across healthcare, insurance, agriculture, and manufacturing.
        </p>
      </motion.div>

      <motion.div
        className="experience__timeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        {experiences.map((exp, i) => (
          <ExperienceEntry key={i} exp={exp} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
