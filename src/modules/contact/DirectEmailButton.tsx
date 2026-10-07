import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';

export function DirectEmailButton() {
  const email = 'rizkillahramanda@gmail.com';
  const subject = encodeURIComponent('Collaboration Inquiry via Portfolio');
  const body = encodeURIComponent('Hi Rizkillah, I would love to connect with you regarding a project or opportunity.');

  return (
    <a
      href={`mailto:${email}?subject=${subject}&body=${body}`}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-sky-500/40 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 hover:text-white transition-colors text-sm font-medium"
    >
      <Mail className="w-4 h-4" />
      <span>Direct Email</span>
      <ArrowUpRight className="w-3.5 h-3.5" />
    </a>
  );
}
