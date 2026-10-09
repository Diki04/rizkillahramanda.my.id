import React from 'react';
import { useLocale } from 'next-intl';
import { Laptop, Terminal, Monitor, Code } from 'lucide-react';
import { SpotlightCard } from '../../common/components/SpotlightCard';

export function DeveloperSetup() {
  const locale = useLocale();
  const isEn = locale === 'en';

  const specs = [
    { label: isEn ? 'Workstation' : 'Stasiun Kerja', value: 'ASUS TUF Gaming Laptop', icon: Laptop },
    { label: isEn ? 'Operating System' : 'Sistem Operasi', value: 'Windows 11 + WSL2 Ubuntu', icon: Monitor },
    { label: isEn ? 'Primary Editor' : 'Editor Utama', value: 'Visual Studio Code / Cursor', icon: Code },
    { label: isEn ? 'Shell & Prompt' : 'Shell & Terminal', value: 'PowerShell 7 + Oh My Posh / Zsh', icon: Terminal },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-6">
      {specs.map((item) => {
        const Icon = item.icon;
        return (
          <SpotlightCard key={item.label} className="p-3 sm:p-4 flex flex-col justify-between bg-white/95 dark:bg-zinc-950/80 border-slate-300 dark:border-white/10 shadow-xs">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <Icon className="w-4 h-4 text-slate-900 dark:text-zinc-300 shrink-0" />
              <span className="text-[11px] sm:text-xs text-slate-950 dark:text-slate-300 font-mono font-bold truncate">{item.label}</span>
            </div>
            <p className="text-xs sm:text-sm font-black text-black dark:text-slate-100 leading-snug">{item.value}</p>
          </SpotlightCard>
        );
      })}
    </div>
  );
}
