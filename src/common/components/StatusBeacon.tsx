import React from 'react';

interface StatusBeaconProps {
  status?: 'active' | 'busy' | 'offline';
  label?: string;
}

export function StatusBeacon({
  status = 'active',
  label = 'Open to Work & Collaborations',
}: StatusBeaconProps) {
  const colors = {
    active: 'bg-emerald-400 shadow-emerald-500/50',
    busy: 'bg-amber-400 shadow-amber-500/50',
    offline: 'bg-slate-400 shadow-slate-500/50',
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-xs font-mono text-emerald-300">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${colors[status]}`} />
      </span>
      <span>{label}</span>
    </div>
  );
}
