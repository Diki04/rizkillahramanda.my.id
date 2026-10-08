'use client';

import React, { useState } from 'react';
import { Quote, RefreshCw } from 'lucide-react';
import { SpotlightCard } from '../../common/components/SpotlightCard';

const quotes = [
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Premature optimization is the root of all evil.", author: "Donald Knuth" },
];

export function QuoteCard() {
  const [index, setIndex] = useState(0);

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  const current = quotes[index];

  return (
    <SpotlightCard className="p-5 sm:p-6 relative overflow-hidden bg-white/95 dark:bg-zinc-950/80 border-slate-300 dark:border-white/10 shadow-sm">
      <div className="flex items-start justify-between">
        <Quote className="w-6 h-6 text-slate-700 dark:text-white/40 mb-3" />
        <button
          onClick={nextQuote}
          className="text-slate-500 hover:text-slate-950 dark:hover:text-white p-1 transition-colors cursor-pointer"
          title="Next Quote"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
      <blockquote className="text-slate-950 dark:text-slate-200 italic text-sm mb-3 font-medium leading-relaxed">
        &ldquo;{current.text}&rdquo;
      </blockquote>
      <p className="text-xs text-slate-700 dark:text-slate-400 font-mono font-bold">— {current.author}</p>
    </SpotlightCard>
  );
}
