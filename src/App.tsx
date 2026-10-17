import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { navigationItems, profile } from '@/data/siteData';
import { useAssetAvailability } from '@/hooks/useAssetAvailability';
import { Seo } from '@/components/Seo';
import { Atmosphere } from '@/components/Atmosphere';
import { TopNav } from '@/components/TopNav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { LearningJourney } from '@/components/LearningJourney';
import { GitHubSection } from '@/components/GitHubSection';
import { InteractiveTerminal } from '@/components/InteractiveTerminal';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function SectionShell({ id, children }: { id: string; children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 0.45 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const resumeAvailable = useAssetAvailability('/resume.pdf');
  const profileImageAvailable = useAssetAvailability('/profile.jpg');

  useEffect(() => {
    const sections = navigationItems
      .map((item) => item.href.slice(1))
      .filter((sectionId, index, ids) => ids.indexOf(sectionId) === index)
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Seo title="Sowmiya S | DevOps & Cloud Engineering Student" description="Portfolio of Sowmiya S, a Computer Science and Engineering student focused on DevOps, cloud technologies, Python automation, Linux, Docker, Jenkins, Git, GitHub, AWS, and CI/CD." />

      <div className="relative min-h-screen overflow-hidden">
        <Atmosphere />
        <TopNav activeSection={activeSection} />

        <main className="relative z-10 pb-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pt-20 md:px-8 md:pt-24">
            <Hero onViewProjects={scrollToProjects} resumeAvailable={resumeAvailable} resumeHref="/resume.pdf" />
            <SectionShell id="about-shell">
              <About profileImageAvailable={profileImageAvailable} />
            </SectionShell>
            <SectionShell id="skills-shell">
              <Skills />
            </SectionShell>
            <SectionShell id="projects-shell">
              <Projects />
            </SectionShell>
            <SectionShell id="journey-shell">
              <LearningJourney />
            </SectionShell>
            <SectionShell id="github-shell">
              <GitHubSection />
            </SectionShell>
            <SectionShell id="terminal-shell">
              <InteractiveTerminal resumeAvailable={resumeAvailable} resumeHref="/resume.pdf" />
            </SectionShell>
            <SectionShell id="contact-shell">
              <Contact resumeAvailable={resumeAvailable} resumeHref="/resume.pdf" />
            </SectionShell>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}