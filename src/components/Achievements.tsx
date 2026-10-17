import { motion } from 'framer-motion';
import { achievements } from '@/data/siteData';

export function Achievements() {
  return (
    <section id="achievements" className="section-shell">
      <div className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Achievements</p>
          <p className="text-sm leading-7 text-slate-300 md:text-base">
            A small collection for achievements I can verify and stand behind.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {achievements.map((achievement, index) => (
            <motion.article
              key={achievement.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-softGlow transition hover:-translate-y-1 hover:border-electric/30 hover:bg-electric/10"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-cyanGlow/80">
                  {achievement.badge}
                </span>
                <span className={`h-2.5 w-2.5 rounded-full ${achievement.status === 'current' ? 'bg-cyanGlow shadow-[0_0_16px_rgba(120,240,255,0.9)]' : 'bg-softPurple'}`} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">{achievement.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{achievement.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}