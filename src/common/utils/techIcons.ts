import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiPostgresql,
  SiSupabase,
  SiMongodb,
  SiMysql,
  SiPrisma,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiPostman,
  SiVercel,
  SiFigma,
  SiHtml5,
  SiCss3,
  SiVitest,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
} from 'react-icons/si';
import { Code2 } from 'lucide-react';

interface TechIconDef {
  icon: IconType | any;
  color: string;
}

const TECH_MAP: Record<string, TechIconDef> = {
  react: { icon: SiReact, color: '#61DAFB' },
  'react.js': { icon: SiReact, color: '#61DAFB' },
  'next.js': { icon: SiNextdotjs, color: '#FFFFFF' },
  nextjs: { icon: SiNextdotjs, color: '#FFFFFF' },
  typescript: { icon: SiTypescript, color: '#3178C6' },
  javascript: { icon: SiJavascript, color: '#F7DF1E' },
  'tailwind css': { icon: SiTailwindcss, color: '#38BDF8' },
  tailwind: { icon: SiTailwindcss, color: '#38BDF8' },
  tailwindcss: { icon: SiTailwindcss, color: '#38BDF8' },
  redux: { icon: SiRedux, color: '#764ABC' },
  'redux toolkit': { icon: SiRedux, color: '#764ABC' },
  'node.js': { icon: SiNodedotjs, color: '#339933' },
  nodejs: { icon: SiNodedotjs, color: '#339933' },
  node: { icon: SiNodedotjs, color: '#339933' },
  express: { icon: SiExpress, color: '#FFFFFF' },
  'express.js': { icon: SiExpress, color: '#FFFFFF' },
  python: { icon: SiPython, color: '#3776AB' },
  fastapi: { icon: SiFastapi, color: '#009688' },
  pytorch: { icon: SiPytorch, color: '#EE4C2C' },
  tensorflow: { icon: SiTensorflow, color: '#FF6F00' },
  opencv: { icon: SiOpencv, color: '#5C3EE8' },
  postgresql: { icon: SiPostgresql, color: '#4169E1' },
  postgres: { icon: SiPostgresql, color: '#4169E1' },
  supabase: { icon: SiSupabase, color: '#3ECF8E' },
  mongodb: { icon: SiMongodb, color: '#47A248' },
  mysql: { icon: SiMysql, color: '#4479A1' },
  prisma: { icon: SiPrisma, color: '#2D3748' },
  docker: { icon: SiDocker, color: '#2496ED' },
  git: { icon: SiGit, color: '#F05032' },
  github: { icon: SiGithub, color: '#FFFFFF' },
  linux: { icon: SiLinux, color: '#FCC624' },
  postman: { icon: SiPostman, color: '#FF6C37' },
  vercel: { icon: SiVercel, color: '#FFFFFF' },
  figma: { icon: SiFigma, color: '#F24E1E' },
  html: { icon: SiHtml5, color: '#E34F26' },
  html5: { icon: SiHtml5, color: '#E34F26' },
  css: { icon: SiCss3, color: '#1572B6' },
  css3: { icon: SiCss3, color: '#1572B6' },
  vitest: { icon: SiVitest, color: '#FCC72B' },
  'scikit-learn': { icon: SiScikitlearn, color: '#F7931E' },
  pandas: { icon: SiPandas, color: '#150458' },
  numpy: { icon: SiNumpy, color: '#013243' },
};

export function getTechIcon(name: string): TechIconDef {
  const normalized = name.toLowerCase().trim();
  if (TECH_MAP[normalized]) {
    return TECH_MAP[normalized];
  }

  // Substring matching
  for (const key of Object.keys(TECH_MAP)) {
    if (normalized.includes(key)) {
      return TECH_MAP[key];
    }
  }

  return { icon: Code2, color: '#94A3B8' };
}
