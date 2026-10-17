import { motion } from 'framer-motion';
import { skills } from '@/data/siteData';

export function Skills() {
  return (
    <section id="skills" className="section-shell py-6 md:py-7">
      <div className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Skills</p>
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Tools I practice, understand, and am learning.</h2>
          <p className="text-sm leading-6 text-slate-300 md:text-base">
            These categories describe where each technology fits in my current learning journey.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              className="group rounded-[1.35rem] border border-white/10 bg-white/5 p-3.5 shadow-softGlow transition hover:-translate-y-0.5 hover:border-electric/35 hover:bg-electric/10"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-midnight-900/80 text-xl text-cyanGlow shadow-glow transition group-hover:border-electric/30 group-hover:text-white">
                  <skill.icon />
                </div>
                {skill.badge ? <span className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[0.56rem] uppercase tracking-[0.22em] text-cyanGlow/80 leading-none">{skill.badge}</span> : null}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{skill.name}</h3>
              <p className="mt-2 text-sm leading-5 text-slate-300">{skill.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}