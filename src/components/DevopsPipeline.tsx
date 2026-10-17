import { motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Cloud } from 'lucide-react';
import { SiDocker, SiGithub, SiJenkins, SiLinux } from 'react-icons/si';

const pipeline = [
  { label: 'GitHub', icon: SiGithub, accent: 'bg-slate-200 text-midnight-900', tooltip: 'Version control' },
  { label: 'Docker', icon: SiDocker, accent: 'bg-sky-300 text-midnight-900', tooltip: 'Containerization' },
  { label: 'Jenkins', icon: SiJenkins, accent: 'bg-amber-200 text-midnight-900', tooltip: 'CI/CD automation' },
  { label: 'Linux', icon: SiLinux, accent: 'bg-slate-100 text-midnight-900', tooltip: 'Systems and servers' },
  { label: 'Cloud', icon: Cloud, accent: 'bg-electric text-midnight-900', tooltip: 'Cloud deployment' },
];

export function DevopsPipeline() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-xl border border-electric/20 bg-midnight-800/70 p-5 backdrop-blur-2xl md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(62,168,255,0.11),transparent_30%)]" />
      <div className="relative flex items-start justify-between gap-4 border-b border-white/8 pb-4">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-cyanGlow/80">Signature workflow</p>
          <h3 className="mt-2 max-w-lg font-display text-xl font-semibold text-white md:text-2xl">From source control to cloud delivery</h3>
        </div>
        <div className="hidden items-center gap-2 border-l border-white/10 pl-4 text-xs text-slate-400 md:flex">
          <BadgeCheck className="h-3.5 w-3.5 text-cyanGlow" />
          CI/CD
        </div>
      </div>

      <div className="relative mt-7">
        <div className="absolute left-8 right-8 top-8 hidden h-px bg-white/10 lg:block" />
        <motion.div
          className="absolute left-8 top-[1.9rem] hidden h-px origin-left bg-electric lg:block"
          animate={reducedMotion ? undefined : { scaleX: [0, 1, 1], opacity: [0, 0.75, 0] }}
          transition={reducedMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="grid gap-3 lg:grid-cols-5">
          {pipeline.map((step, index) => (
            <motion.div
              key={step.label}
              className="group relative"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * index, duration: 0.45 }}
            >
              <article title={step.tooltip} className="relative flex min-h-20 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3 transition hover:border-electric/40 hover:bg-electric/[0.07] lg:block lg:min-h-0">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 ${step.accent} transition group-hover:border-white/50`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mt-0 min-w-0 lg:mt-3">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-slate-500">0{index + 1}</p>
                  <h4 className="mt-1 font-display text-base font-semibold text-white">{step.label}</h4>
                </div>
                <span className="pointer-events-none absolute left-3 top-full z-10 mt-2 hidden w-[calc(100%-1.5rem)] rounded-md border border-electric/20 bg-midnight-900 px-3 py-2 text-xs text-slate-200 shadow-xl group-hover:block lg:left-0 lg:w-full">
                  {step.tooltip}
                </span>
              </article>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="relative mt-6 border-t border-white/8 pt-4 text-sm text-slate-400">A concise view of the tools I am connecting while learning DevOps workflows.</p>
    </div>
  );
}
