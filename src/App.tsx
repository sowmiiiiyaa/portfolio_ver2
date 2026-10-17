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

function SectionShell({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      whileInView={reducedMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const resumeAvailable = useAssetAvailability('/resume.pdf');
  const profileImageAvailable = useAssetAvailability('/profile.jpeg');

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

      <div className="relative min-h-screen overflow-x-clip">
        <Atmosphere />
        <TopNav activeSection={activeSection} resumeAvailable={resumeAvailable} />

        <main className="relative z-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-0 px-4 md:px-8">
            <Hero onViewProjects={scrollToProjects} resumeAvailable={resumeAvailable} resumeHref="/resume.pdf" />
            <SectionShell>
              <About profileImageAvailable={profileImageAvailable} />
            </SectionShell>
            <SectionShell>
              <Skills />
            </SectionShell>
            <SectionShell>
              <Projects />
            </SectionShell>
            <SectionShell>
              <LearningJourney />
            </SectionShell>
            <SectionShell>
              <GitHubSection />
            </SectionShell>
            <SectionShell>
              <InteractiveTerminal resumeAvailable={resumeAvailable} resumeHref="/resume.pdf" />
            </SectionShell>
            <SectionShell>
              <Contact resumeAvailable={resumeAvailable} resumeHref="/resume.pdf" />
            </SectionShell>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}