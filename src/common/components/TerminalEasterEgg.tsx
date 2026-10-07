'use client';

import React, { useState } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';

export function TerminalEasterEgg() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
    'Rizkillah Ramanda CLI v1.0.0 [Ready]',
    'Type "help" for a list of available commands.',
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    switch (cmd) {
      case 'help':
        response = 'Commands: help, about, skills, contact, clear, sudo';
        break;
      case 'about':
        response = 'Rizkillah Ramanda Sinyo (Diki) — Informatics student & fullstack engineer.';
        break;
      case 'skills':
        response = 'React, Next.js, TypeScript, Tailwind, Python, Machine Learning, Supabase, Node.js';
        break;
      case 'contact':
        response = 'Email: rizkillahramanda@gmail.com | GitHub: @Diki04';
        break;
      case 'sudo':
        response = 'Permission denied: User is already an administrator of this universe.';
        break;
      case 'clear':
        setLogs([]);
        setInput('');
        return;
      default:
        response = `Command not found: "${cmd}". Type "help" for assistance.`;
    }

    setLogs((prev) => [...prev, `$ ${input}`, response]);
    setInput('');
  };

  return (
    <div className="w-full max-w-lg mt-6 rounded-lg border border-dark-border bg-slate-950/90 text-left overflow-hidden shadow-xl font-mono text-xs">
      <div className="flex items-center justify-between px-3 py-2 border-b border-dark-border bg-dark-card/60">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[11px] text-slate-400">interactive-terminal.sh</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
      </div>

      <div className="p-3 max-h-48 overflow-y-auto space-y-1 text-slate-300">
        {logs.map((log, idx) => (
          <div key={idx} className={log.startsWith('$') ? 'text-sky-400 font-bold' : 'text-slate-400'}>
            {log}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex items-center px-3 py-2 border-t border-dark-border bg-dark-bg/40">
        <span className="text-sky-400 mr-2 font-bold">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="enter command..."
          className="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none"
        />
        <button type="submit" className="text-slate-500 hover:text-white">
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
