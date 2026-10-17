import type { IconType } from 'react-icons';

export interface NavigationItem {
  label: string;
  href: string;
  icon: IconType;
  description: string;
  sectionId?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface SkillCard {
  name: string;
  description: string;
  icon: IconType;
  badge?: string;
}

export interface ProjectCardData {
  name: string;
  description: string;
  stack: string[];
  features: string[];
  lessons: string[];
  github?: string;
  liveDemo?: string;
  statusLabel: string;
  architectureLabel?: string;
  imageLabel?: string;
}

export interface JourneyStep {
  name: string;
  description: string;
  milestone: string;
}

export interface AchievementCardData {
  title: string;
  description: string;
  status: 'current';
  badge: string;
}

export interface GitHubProfileSummary {
  login: string;
  html_url: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  name?: string;
  bio?: string;
}

export interface GitHubRepositorySummary {
  id: number;
  name: string;
  html_url: string;
  description?: string | null;
  language?: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
}

export interface GitHubLanguageSummary {
  name: string;
  count: number;
}

export interface GitHubActivitySummary {
  label: string;
  repo?: string;
  occurredAt: string;
}

export interface TerminalResponseLine {
  type: 'text' | 'link' | 'bullet';
  text: string;
  href?: string;
}