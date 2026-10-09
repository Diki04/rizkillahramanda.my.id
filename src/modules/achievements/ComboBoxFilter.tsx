'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronsUpDown, Check, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComboBoxFilterProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  allLabel?: string;
}

export function ComboBoxFilter({
  options,
  value,
  onChange,
  placeholder,
  allLabel = 'All',
}: ComboBoxFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (opt: string) => {
    onChange(opt === value ? '' : opt);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const activeLabel = value || placeholder;

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-56 md:w-60">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/90 hover:bg-slate-50 dark:hover:bg-zinc-800/80 text-slate-800 dark:text-zinc-200 text-sm font-medium transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-white/20"
      >
        <span className={`truncate ${value ? 'text-slate-950 dark:text-white font-semibold' : 'text-slate-500 dark:text-zinc-400'}`}>
          {activeLabel}
        </span>
        <div className="flex items-center gap-1.5 shrink-0 text-slate-400 dark:text-zinc-500">
          {value ? (
            <X
              className="w-3.5 h-3.5 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              onClick={handleClear}
            />
          ) : null}
          <ChevronsUpDown className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1.5 w-full rounded-2xl border border-slate-300 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl shadow-2xl p-2 space-y-1"
          >
            {options.length > 5 && (
              <div className="relative mb-1">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
                <input
                  type="text"
                  placeholder="Filter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none focus:border-slate-400 dark:focus:border-white/30"
                />
              </div>
            )}

            <div className="max-h-56 overflow-y-auto space-y-0.5 overscroll-contain">
              {/* Reset to All */}
              <button
                type="button"
                onClick={() => handleSelect('')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer text-left ${
                  !value
                    ? 'bg-slate-100 dark:bg-white/10 text-slate-950 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <span>{allLabel}</span>
                {!value && <Check className="w-3.5 h-3.5 text-amber-500" />}
              </button>

              {filteredOptions.map((opt) => {
                const isSelected = value === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer text-left capitalize ${
                      isSelected
                        ? 'bg-slate-100 dark:bg-white/10 text-slate-950 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-500" />}
                  </button>
                );
              })}

              {filteredOptions.length === 0 && (
                <div className="py-3 text-center text-xs text-slate-400 dark:text-zinc-500">
                  No options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
