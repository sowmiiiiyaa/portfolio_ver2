import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigationItems, profile } from '@/data/siteData';

type TopNavProps = {
  activeSection: string;
  resumeAvailable: boolean;
};

export function TopNav({ activeSection, resumeAvailable }: TopNavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header className={`top-nav ${scrolled ? 'top-nav--scrolled' : ''}`}>
      <a href="#home" className="top-nav__brand focus-ring" onClick={() => setOpen(false)}>
        <span className="top-nav__mark">S/</span>
        <span>{profile.name}</span>
      </a>

      <button type="button" className="top-nav__toggle focus-ring" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav className={`top-nav__links ${open ? 'top-nav__links--open' : ''}`} aria-label="Primary navigation">
        {navigationItems.filter((item) => item.label !== 'Resume' || resumeAvailable).map((item) => {
          const section = item.href.slice(1);
          const isActive = activeSection === section && item.label !== 'Resume';
          return (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`top-nav__link focus-ring ${isActive ? 'top-nav__link--active' : ''}`}
              aria-current={isActive ? 'location' : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
