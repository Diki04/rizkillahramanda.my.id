import React from 'react';

interface ChatCharacterCounterProps {
  currentLength: number;
  maxLength: number;
}

export function ChatCharacterCounter({ currentLength, maxLength }: ChatCharacterCounterProps) {
  const remaining = maxLength - currentLength;
  const isNearLimit = remaining < 20;

  return (
    <div className="flex justify-end text-[11px] font-mono mt-1">
      <span className={isNearLimit ? 'text-rose-400 font-bold' : 'text-slate-500'}>
        {currentLength} / {maxLength}
      </span>
    </div>
  );
}
