import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDownRight, Download, ExternalLink } from 'lucide-react';
import { profile } from '@/data/siteData';

type HeroProps = {
  onViewProjects: () => void;
  resumeAvailable: boolean;
  resumeHref: string;
};

const signalNodes = ['source', 'build', 'ship'];

export function Hero({ onViewProjects, resumeAvailable, resumeHref }: HeroProps) {
  const signalRef = useRef<HTMLDivElement>(null);

  const moveSignal = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!signalRef.current || event.pointerType === 'touch') return;
    const bounds = signalRef.current.getBoundingClientRect();
    signalRef.current.style.setProperty('--signal-x', `${((event.clientX - bounds.left) / bounds.width - 0.5) * 16}px`);
    signalRef.current.style.setProperty('--signal-y', `${((event.clientY - bounds.top) / bounds.height - 0.5) * 16}px`);
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-section__copy">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          DevOps / Cloud / Automation
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>
          <span>Sowmiya <span className="hero-section__name">S.</span></span>
        </motion.h1>
        <motion.p className="hero-section__statement" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}>
          I build. I automate. I deploy.
        </motion.p>
        <motion.p className="hero-section__intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.28 }}>
          {profile.intro}
        </motion.p>

        <motion.div className="hero-section__actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}>
          <button type="button" onClick={onViewProjects} className="lime-button focus-ring">
            Explore work <ArrowDownRight aria-hidden="true" />
          </button>
          {resumeAvailable ? (
            <a href={resumeHref} download className="quiet-button focus-ring">
              Resume <Download aria-hidden="true" />
            </a>
          ) : null}
          <a href={profile.github} target="_blank" rel="noreferrer" className="quiet-button focus-ring">
            GitHub <ExternalLink aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      <motion.div ref={signalRef} onPointerMove={moveSignal} className="hero-signal" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
        <div className="hero-signal__halo" />
        <div className="hero-signal__crosshair" />
        <div className="hero-signal__label hero-signal__label--top">system / online</div>
        <div className="hero-signal__label hero-signal__label--bottom">learning in public</div>
        <div className="hero-signal__orbit hero-signal__orbit--outer" />
        <div className="hero-signal__orbit hero-signal__orbit--inner" />
        <div className="hero-signal__nodes">
          {signalNodes.map((node, index) => (
            <div className="hero-signal__node" key={node}>
              <span className="hero-signal__node-dot" />
              <span>{`0${index + 1} / ${node}`}</span>
            </div>
          ))}
        </div>
        <div className="hero-signal__core">
          <span>SS</span>
          <small>dev / cloud</small>
        </div>
      </motion.div>
    </section>
  );
}
