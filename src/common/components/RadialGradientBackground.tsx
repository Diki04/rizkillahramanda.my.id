import React from 'react';

export function RadialGradientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />
    </div>
  );
}
