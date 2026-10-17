import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/data/siteData';

const particlePositions = [
  ['12%', '22%'],
  ['32%', '68%'],
  ['58%', '20%'],
  ['76%', '52%'],
  ['90%', '28%'],
  ['68%', '84%'],
];

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.article
      className="project-feature"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
    >
      <div className="project-feature__visual" aria-hidden="true">
        <div className="project-feature__particles">
          {particlePositions.map(([left, top], particleIndex) => (
            <span key={`${left}-${top}`} style={{ left, top, animationDelay: `${particleIndex * 0.4}s` }} />
          ))}
        </div>
        <div className="project-feature__pipeline">
          {project.stack.map((tool, toolIndex) => (
            <span key={tool}>
              <b>{String(toolIndex + 1).padStart(2, '0')}</b>
              {tool}
              {toolIndex < project.stack.length - 1 ? <i>→</i> : null}
            </span>
          ))}
        </div>
        <span className="project-feature__visual-label">source → build → delivery</span>
      </div>

      <div className="project-feature__body">
        <div className="project-feature__topline">
          <span>{project.statusLabel}</span>
          <span>01 / selected work</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <div className="project-feature__stack">
          {project.stack.map((item) => <span key={item}>{item}</span>)}
        </div>
        <div className="project-feature__links">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="lime-button focus-ring">
              GitHub <Github aria-hidden="true" />
            </a>
          ) : null}
          {project.liveDemo ? (
            <a href={project.liveDemo} target="_blank" rel="noreferrer" className="quiet-button focus-ring">
              Live demo <ArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section-shell projects-scene">
      <div className="projects-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>Small systems, real workflows.</h2>
        </div>
        <p>Source control, containers, CI/CD, and Linux in practice.</p>
      </div>
      <div className="projects-list">
        {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
      </div>
    </section>
  );
}
