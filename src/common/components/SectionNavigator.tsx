'use client';

import React, { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
  index: string;
}

const SECTIONS: Section[] = [
  { id: 'hero', label: 'Overview', index: '01' },
  { id: 'tech-stack', label: 'Tech Stack', index: '02' },
  { id: 'projects', label: 'Featured Work', index: '03' },
  { id: 'highlights', label: 'Dev Highlights', index: '04' },
  { id: 'contact-cta', label: 'Get In Touch', index: '05' },
];

export function SectionNavigator() {
  const [activeId, setActiveId] = useState<string>('hero');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Section Navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3.5 select-none"
    >
      {SECTIONS.map((section) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className="group flex items-center gap-2.5 py-1 focus:outline-none"
            title={`${section.index} // ${section.label}`}
          >
            {/* Label Tooltip */}
            <span
              className={`opacity-0 group-hover:opacity-100 transition-all duration-200 text-[11px] font-mono whitespace-nowrap px-2 py-0.5 rounded bg-navy-900/90 border border-white/[0.1] shadow-lg pointer-events-none transform translate-x-2 group-hover:translate-x-0 ${
                isActive ? 'text-sky-400 border-sky-400/40' : 'text-slate-400'
              }`}
            >
              {`${section.index} // ${section.label}`}
            </span>

            {/* Navigation Dot */}
            <div className="relative flex items-center justify-center w-4 h-4">
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-3 h-3 bg-sky-400 ring-4 ring-sky-400/20 shadow-[0_0_12px_rgba(56,189,248,0.8)]'
                    : 'w-1.5 h-1.5 bg-slate-600 group-hover:bg-slate-400 group-hover:scale-125'
                }`}
              />
            </div>
          </button>
        );
      })}
    </nav>
  );
}
