import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import { navigationItems, profile, socialLinks } from '@/data/siteData';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  resumeAvailable: boolean;
  activeSection: string;
};

export function Sidebar({ isOpen, onClose, resumeAvailable, activeSection }: SidebarProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const content = (
    <div className="flex h-full flex-col justify-between gap-8 border-r border-white/8 bg-midnight-850/90 px-5 py-6 shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between lg:justify-start">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-cyanGlow/70">Portfolio</p>
            <h1 className="mt-2 font-display text-2xl font-semibold text-white">{profile.name}</h1>
            <p className="mt-1 text-sm text-slate-400">{profile.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            ref={closeButtonRef}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
              }
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 transition hover:border-electric/50 hover:text-white lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Primary" className="space-y-2">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition focus-ring hover:border-electric/30 hover:bg-white/5 hover:text-white ${activeSection === item.href.slice(1) && item.label !== 'Resume' ? 'border-electric/30 bg-electric/10 text-white' : 'border-transparent text-slate-300'}`}
              aria-label={item.description}
              aria-current={activeSection === item.href.slice(1) && item.label !== 'Resume' ? 'location' : undefined}
            >
              <item.icon className="h-4 w-4 text-cyanGlow transition group-hover:text-electric" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="rounded-3xl border border-electric/20 bg-white/5 p-4 shadow-softGlow">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-cyanGlow/80">Resume</p>
          {resumeAvailable ? <p className="mt-2 text-sm text-slate-300">Download my current resume from the contact section.</p> : null}
        </div>
      </div>

      <div className="space-y-4 border-t border-white/8 pt-6">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-cyanGlow/80">Connect</p>
          <div className="mt-4 flex flex-col gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:border-electric/40 hover:bg-electric/10 hover:text-white"
              >
                <link.icon className="h-4 w-4 text-cyanGlow" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <a
          href={`mailto:${profile.email}`}
          className="flex items-center justify-between rounded-2xl border border-electric/20 bg-gradient-to-r from-electric/15 to-softPurple/10 px-4 py-3 text-sm text-white transition hover:border-electric/40"
        >
          <span>{profile.email}</span>
          <Mail className="h-4 w-4 text-cyanGlow" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-80 lg:block" aria-label="Sidebar navigation">{content}</aside>

      <AnimatePresence>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              id="mobile-navigation"
              className="fixed inset-y-0 left-0 z-50 w-[min(88vw,20rem)] lg:hidden"
              aria-label="Mobile sidebar navigation"
              aria-modal="true"
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                  onClose();
                }
              }}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {content}
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}