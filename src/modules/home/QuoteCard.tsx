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
    <SpotlightCard className="p-6 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <Quote className="w-6 h-6 text-sky-500/50 mb-3" />
        <button
          onClick={nextQuote}
          className="text-slate-400 hover:text-sky-500 p-1 transition-colors"
          title="Next Quote"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>
      <blockquote className="text-slate-700 dark:text-slate-300 italic text-sm mb-3">
        &ldquo;{current.text}&rdquo;
      </blockquote>
      <p className="text-xs text-slate-500 font-mono">— {current.author}</p>
    </SpotlightCard>
  );
}
