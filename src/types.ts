// src/types.ts
export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface Skill {
  name: string;
  level: number; // 0..100
}

export interface SkillCategory {
  title: string;
  // نجعلها اختيارية حتى لا يُفرض عليك تزويدها دائمًا
  color?: string; // Tailwind gradient like 'from-purple-500 to-pink-500'
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skillCategories: SkillCategory[];
  projects: Project[];
}
              