import { Download, Mail } from 'lucide-react';
import { contactDetails, profile } from '@/data/siteData';

type ContactProps = {
  resumeAvailable: boolean;
  resumeHref: string;
};

export function Contact({ resumeAvailable, resumeHref }: ContactProps) {
  return (
    <section id="contact" className="section-shell">
      <div className="max-w-3xl space-y-6">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Contact</p>
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Professional contact paths and resume download.</h2>
          <p className="text-sm leading-7 text-slate-300 md:text-base">
            Reach out directly for internships, projects, or collaboration opportunities.
          </p>
        </div>

        <div className="space-y-3 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-softGlow">
          {contactDetails.map((item) => (
            <a key={item.label} href={item.href} target={item.label === 'Email' ? undefined : '_blank'} rel={item.label === 'Email' ? undefined : 'noreferrer'} className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/15 px-4 py-3 text-sm text-slate-200 transition hover:border-electric/40 hover:bg-electric/10 hover:text-white">
              <span>{item.label}</span>
              <span className="max-w-[60%] truncate text-cyanGlow">{item.value}</span>
            </a>
          ))}
        </div>

        <p className="text-sm text-slate-300">
          Prefer email? <a className="text-cyanGlow underline underline-offset-4 focus-ring" href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>

        {resumeAvailable ? <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-softGlow">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyanGlow/80">Resume</p>
          <a href={resumeHref} download className="mt-4 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric px-5 py-3 text-sm font-semibold text-midnight-900 transition hover:-translate-y-0.5">
            Download Resume
            <Download className="h-4 w-4" />
          </a>
        </div> : null}

        <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-electric/40 hover:bg-electric/10">
          <Mail className="h-4 w-4 text-cyanGlow" />
          Email Directly
        </a>
      </div>
    </section>
  );
}