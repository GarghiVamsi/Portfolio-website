import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Terminal.css';

const lines = [
  { prompt: true, text: 'whoami' },
  { prompt: false, text: 'vamsi_garghi — data analyst & engineer' },
  { prompt: true, text: 'cat education.txt' },
  { prompt: false, text: 'B.S. Computer Science' },
  { prompt: false, text: 'M.S. Computer Science' },
  { prompt: true, text: 'skills --list' },
  { prompt: false, text: '→ Python · SQL · ETL · Cloud (AWS/Azure)' },
  { prompt: false, text: '→ Power BI · Tableau · Spark · Airflow' },
  { prompt: true, text: 'status' },
  { prompt: false, text: '✓ Open to data engineering opportunities' },
  { prompt: true, text: '_' },
];

function TypingLine({ text, onDone }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (displayed.length < text.length) {
      const t = setTimeout(
        () => setDisplayed(text.slice(0, displayed.length + 1)),
        text === '_' ? 0 : 28
      );
      return () => clearTimeout(t);
    } else if (!done) {
      setDone(true);
      onDone?.();
    }
  }, [displayed, text, done, onDone]);

  return <span>{displayed}</span>;
}

export default function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const bodyRef = useRef(null);

  const advance = () => setVisibleCount(c => c + 1);

  useEffect(() => {
    if (visibleCount === 0) {
      const t = setTimeout(() => setVisibleCount(1), 600);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [visibleCount]);

  return (
    <div className="terminal">
      <div className="terminal__titlebar">
        <span className="terminal__dot terminal__dot--red" />
        <span className="terminal__dot terminal__dot--yellow" />
        <span className="terminal__dot terminal__dot--green" />
        <span className="terminal__title">vamsi@portfolio ~ bash</span>
      </div>
      <div className="terminal__body" ref={bodyRef}>
        {lines.slice(0, visibleCount).map((line, i) => (
          <motion.div
            key={i}
            className={`terminal__line${line.prompt ? ' terminal__line--prompt' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {line.prompt && <span className="terminal__ps1">❯&nbsp;</span>}
            {i === visibleCount - 1 ? (
              <TypingLine
                text={line.text}
                onDone={i < lines.length - 1 ? () => setTimeout(advance, line.prompt ? 220 : 80) : undefined}
              />
            ) : (
              <span>{line.text}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
