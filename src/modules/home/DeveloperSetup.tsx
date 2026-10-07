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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {specs.map((item) => {
        const Icon = item.icon;
        return (
          <SpotlightCard key={item.label} className="p-4 flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-2">
              <Icon className="w-4 h-4 text-sky-400" />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{item.label}</span>
            </div>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.value}</p>
          </SpotlightCard>
        );
      })}
    </div>
  );
}
