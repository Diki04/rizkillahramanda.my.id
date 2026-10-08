import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-zinc-400 mb-6">
      <Link href="/" className="hover:text-slate-900 dark:hover:text-white flex items-center transition-colors">
        <Home className="w-3.5 h-3.5 mr-1" />
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            <ChevronRight className="w-3 h-3 text-slate-400 dark:text-zinc-600" />
            {isLast || !item.href ? (
              <span className="text-slate-900 dark:text-white font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
