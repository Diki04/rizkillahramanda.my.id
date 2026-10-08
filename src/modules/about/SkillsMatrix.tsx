import React from 'react';
import { useTranslations } from 'next-intl';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { mockSkills } from '@/services/data/mock-profile';
import { Layout, Server, Cpu, Wrench } from 'lucide-react';
import { getTechIcon } from '@/common/utils/techIcons';

export function SkillsMatrix() {
  const t = useTranslations('about');

  const categories = [
    {
      id: 'frontend',
      label: t('frontendCategory'),
      icon: Layout,
      skills: mockSkills.filter((s) => s.category === 'frontend'),
    },
    {
      id: 'backend',
      label: t('backendCategory'),
      icon: Server,
      skills: mockSkills.filter((s) => s.category === 'backend'),
    },
    {
      id: 'ml',
      label: t('mlCategory'),
      icon: Cpu,
      skills: mockSkills.filter((s) => s.category === 'ml'),
    },
    {
      id: 'tools',
      label: t('toolsCategory'),
      icon: Wrench,
      skills: mockSkills.filter((s) => s.category === 'tools'),
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
        <span>{t('skillsTitle')}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <SpotlightCard key={cat.id} className="p-5 space-y-4">
              <div className="flex items-center gap-2.5 border-b border-slate-200 dark:border-white/[0.06] pb-3">
                <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{cat.label}</h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const { icon: TechIcon, color } = getTechIcon(skill.name);
                  return (
                    <div
                      key={skill.name}
                      className="group/skill flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/[0.06] hover:border-white/40 hover:bg-slate-200/60 dark:hover:bg-zinc-900/90 transition-all duration-150"
                    >
                      <TechIcon
                        className="w-3.5 h-3.5 shrink-0 transition-transform group-hover/skill:scale-110"
                        style={{ color }}
                      />
                      <span className="text-xs font-mono text-slate-700 dark:text-zinc-200">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 font-medium">
                        • {skill.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
