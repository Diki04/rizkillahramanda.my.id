export type Locale = 'en' | 'id';

export interface LocalizedString {
  en: string;
  id: string;
}

export type ProjectCategory = 'all' | 'fullstack' | 'frontend' | 'ml' | 'other';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: LocalizedString;
  category: 'fullstack' | 'frontend' | 'ml' | 'other';
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  createdAt: string;
}

export type AchievementCategory = 'certificate' | 'award' | 'course';

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  image: string;
  category: AchievementCategory;
}

export interface SkillItem {
  name: string;
  level: 'Advanced' | 'Intermediate' | 'Familiar';
  category: 'frontend' | 'backend' | 'tools' | 'ml';
  icon?: string;
}

export interface Profile {
  name: string;
  nickname: string;
  headline: LocalizedString;
  bio: LocalizedString;
  avatar: string;
  location: string;
  university: string;
  major: string;
  email: string;
  github: string;
  linkedin: string;
  website: string;
  stats: {
    yearsOfExperience: string;
    completedProjects: number;
    githubRepositories: number;
  };
}

export interface ChatMessage {
  id: string;
  name: string;
  message: string;
  avatar?: string;
  createdAt: string;
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  login: string;
  avatarUrl: string;
}

export interface WakatimeLanguage {
  name: string;
  percent: number;
  text: string;
}

export interface WakatimeStats {
  totalHours: string;
  dailyAverage: string;
  languages: WakatimeLanguage[];
}
