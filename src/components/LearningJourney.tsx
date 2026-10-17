import { useState } from 'react';
import { motion } from 'framer-motion';
import { journey } from '@/data/siteData';

function getStatus(index: number) {
  if (index < 4) return 'completed';
  if (index === 4) return 'current';
  return 'upcoming';
}

export function LearningJourney() {
  const [selectedStep, setSelectedStep] = useState(4);

  return (
    <section id="journey" className="section-shell">
      <div className="journey-layout">
        <div className="journey-heading">
          <p className="eyebrow">Learning path</p>
          <h2>Progress through systems, one layer at a time.</h2>
        </div>
        <div className="journey-timeline">
          <div className="journey-timeline__track" />
          <div className="journey-timeline__progress" />
          {journey.map((step, index) => {
            const status = getStatus(index);
            return (
              <motion.article
                key={step.name}
                className={`journey-step journey-step--${status}`}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <span className="journey-step__marker" aria-hidden="true" />
                <button
                  type="button"
                  className={`journey-step__content focus-ring ${selectedStep === index ? 'journey-step__content--selected' : ''}`}
                  aria-label={`${step.name}: ${status}`}
                  aria-expanded={selectedStep === index}
                  onClick={() => setSelectedStep(index)}
                >
                  <span className="journey-step__meta">{status} / {String(index + 1).padStart(2, '0')}</span>
                  <strong>{step.name}</strong>
                  <span className="journey-step__description">{step.description}</span>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
