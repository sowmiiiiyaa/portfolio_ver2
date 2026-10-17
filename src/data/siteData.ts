import {
  BadgeCheck,
  BookOpen,
  Github,
  GraduationCap,
  Home,
  Mail,
  MapPin,
  Rocket,
  Server,
  Sparkles,
  User,
  FileDown,
  Wrench,
  ChartColumnBig,
  Linkedin,
  TerminalSquare,
} from 'lucide-react';
import type { AchievementCardData, JourneyStep, NavigationItem, ProjectCardData, SkillCard, SocialLink } from '@/types';
import { FaCloud, FaDocker, FaJenkins, FaPython, FaJava, FaTools } from 'react-icons/fa';
import { SiC, SiGithub, SiGit, SiLinux, SiTerraform } from 'react-icons/si';

export const profile = {
  name: 'Sowmiya S',
  title: 'DevOps & Cloud Engineering Student',
  intro:
    'A Computer Science student building practical foundations in DevOps, cloud, automation, and CI/CD.',
  about:
    'I learn by tracing how software moves from code to a working environment, with a focus on DevOps, cloud concepts, automation, and delivery workflows.',
  college: "Stella Mary's College of Engineering, Nagercoil",
  degree: 'B.E. Computer Science and Engineering',
  graduation: '2028',
  location: 'Kanyakumari, India',
  github: 'https://github.com/sowmiiiiyaa',
  linkedin: 'https://www.linkedin.com/in/sowmiya-s-241486346/',
  email: 'sowmiyaa757@gmail.com',
};

export const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '#home', icon: Home, description: 'Jump to the hero section' },
  { label: 'About', href: '#about', icon: User, description: 'Profile and learning background' },
  { label: 'Skills', href: '#skills', icon: Wrench, description: 'Core technologies and tools' },
  { label: 'Projects', href: '#projects', icon: Rocket, description: 'Selected project work' },
  { label: 'Learning Journey', href: '#journey', icon: ChartColumnBig, description: 'Roadmap and milestones' },
  { label: 'GitHub', href: '#github', icon: Github, description: 'Live GitHub profile data' },
  { label: 'Terminal', href: '#terminal', icon: TerminalSquare, description: 'Interactive portfolio terminal' },
  { label: 'Resume', href: '#contact', icon: FileDown, description: 'Download resume and reach out' },
  { label: 'Contact', href: '#contact', icon: Mail, description: 'Contact form and links' },
];

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: profile.github, icon: Github },
  { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
];

export const skills: SkillCard[] = [
  { name: 'Python', description: 'Automation, scripting, and problem solving.', icon: FaPython, badge: 'Hands-on / Practiced' },
  { name: 'Linux', description: 'Command line, navigation, permissions, and processes.', icon: SiLinux, badge: 'Hands-on / Practiced' },
  { name: 'Git', description: 'Version control, branching, and collaboration.', icon: SiGit, badge: 'Hands-on / Practiced' },
  { name: 'GitHub', description: 'Repositories and project collaboration.', icon: SiGithub, badge: 'Hands-on / Practiced' },
  { name: 'Docker', description: 'Containerization and repeatable environments.', icon: FaDocker, badge: 'Hands-on / Practiced' },
  { name: 'Jenkins', description: 'CI/CD pipelines and job automation.', icon: FaJenkins, badge: 'Working Knowledge' },
  { name: 'AWS fundamentals', description: 'Core cloud and AWS service concepts.', icon: FaCloud, badge: 'Working Knowledge' },
  { name: 'AWS', description: 'Currently learning cloud services.', icon: FaCloud, badge: 'Currently Learning' },
  { name: 'Terraform basics', description: 'Learning Infrastructure as Code fundamentals.', icon: SiTerraform, badge: 'Currently Learning' },
  { name: 'Java', description: 'Programming fundamentals and OOP.', icon: FaJava, badge: 'Other Programming' },
  { name: 'C', description: 'Programming fundamentals and problem solving.', icon: SiC, badge: 'Other Programming' },
];

export const projects: ProjectCardData[] = [
  {
    name: 'CI/CD Pipeline Project',
    description:
      'A practical CI/CD project connecting GitHub, Docker, Jenkins, and Linux to explore an automated source-to-build workflow.',
    stack: ['GitHub', 'Docker', 'Jenkins', 'Linux'],
    features: [
      'GitHub source repository connected to the pipeline',
      'Docker used for containerization',
      'Jenkins used to structure the CI/CD workflow',
    ],
    lessons: [
      'Pipeline stages make a workflow easier to understand and troubleshoot',
      'Working with source control, containers, and CI/CD together builds practical DevOps context',
    ],
    github: 'https://github.com/sowmiiiiyaa/task',
    statusLabel: 'Confirmed Project',
  },
];

export const journey: JourneyStep[] = [
  {
    name: 'Python Fundamentals',
    milestone: 'Step 1',
    description: 'Scripting foundations for automation.',
  },
  {
    name: 'Linux Command-Line Fluency',
    milestone: 'Step 2',
    description: 'Command line, permissions, and operational workflows.',
  },
  {
    name: 'Git & GitHub Version Control',
    milestone: 'Step 3',
    description: 'Practicing version control and collaboration.',
  },
  {
    name: 'Docker & Containerization',
    milestone: 'Step 4',
    description: 'Building container and environment fundamentals.',
  },
  {
    name: 'Jenkins CI/CD Pipelines',
    milestone: 'Step 5 (Current)',
    description: 'Current focus: pipeline orchestration and release workflows.',
  },
  {
    name: 'AWS Cloud Fundamentals',
    milestone: 'Step 6',
    description: 'Upcoming focus: AWS services and deployment patterns.',
  },
  {
    name: 'Terraform Infrastructure as Code',
    milestone: 'Step 7 (Currently learning)',
    description: 'Upcoming focus: declarative infrastructure basics.',
  },
];

export const terminalCommands = [
  { command: 'help', hint: 'List available commands' },
  { command: 'whoami', hint: 'Short professional summary' },
  { command: 'about', hint: 'Learning journey overview' },
  { command: 'skills', hint: 'Core tools and technologies' },
  { command: 'projects', hint: 'Featured project' },
  { command: 'journey', hint: 'Learning roadmap' },
  { command: 'education', hint: 'College and graduation info' },
  { command: 'github', hint: 'GitHub profile link' },
  { command: 'linkedin', hint: 'LinkedIn profile link' },
  { command: 'contact', hint: 'Email and contact form details' },
  { command: 'resume', hint: 'Resume download status' },
  { command: 'clear', hint: 'Reset the terminal' },
];

export const profileHighlights = [
  'B.E. Computer Science and Engineering student',
  'Graduating in 2028',
  'Focused on DevOps, cloud, and automation',
  'Interested in DevOps and Cloud internships',
];

export const achievements: AchievementCardData[] = [];

export const contactDetails = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GitHub', value: 'github.com/sowmiiiiyaa', href: profile.github },
  { label: 'LinkedIn', value: 'linkedin.com/in/sowmiya-s-241486346', href: profile.linkedin },
];