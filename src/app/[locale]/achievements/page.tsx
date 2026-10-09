'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '@/common/components/Container';
import { ScrollReveal } from '@/common/components/ScrollReveal';
import { AchievementCard } from '@/modules/achievements/AchievementCard';
import { AchievementDetailModal } from '@/modules/achievements/AchievementDetailModal';
import { ComboBoxFilter } from '@/modules/achievements/ComboBoxFilter';
import { mockAchievements } from '@/services/data/mock-achievements';
import { Achievement } from '@/types';
import { Award, Search, X } from 'lucide-react';

export default function AchievementsPage() {
  const t = useTranslations('achievements');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Extract unique types and categories from data
  const availableTypes = useMemo(() => {
    const set = new Set<string>();
    mockAchievements.forEach((ach) => {
      if (ach.type) set.add(ach.type);
    });
    return Array.from(set).sort();
  }, []);

  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    mockAchievements.forEach((ach) => {
      if (ach.category) set.add(ach.category);
    });
    return Array.from(set).sort();
  }, []);

  // Filter achievements based on search, type, and category
  const filteredAchievements = useMemo(() => {
    return mockAchievements.filter((ach) => {
      const matchType = !selectedType || ach.type?.toLowerCase() === selectedType.toLowerCase();
      const matchCategory =
        !selectedCategory || ach.category?.toLowerCase() === selectedCategory.toLowerCase();
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        ach.title.toLowerCase().includes(query) ||
        ach.issuer.toLowerCase().includes(query) ||
        (ach.credentialId && ach.credentialId.toLowerCase().includes(query)) ||
        (ach.category && ach.category.toLowerCase().includes(query)) ||
        (ach.type && ach.type.toLowerCase().includes(query));

      return matchType && matchCategory && matchSearch;
    });
  }, [searchQuery, selectedType, selectedCategory]);

  return (
    <div className="py-16 md:py-20 space-y-10">
      <Container size="xl">
        {/* Header */}
        <ScrollReveal className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">{t('subtitle')}</p>
        </ScrollReveal>

        {/* Search & Filter Header (matching reference Screenshot 1) */}
        <ScrollReveal className="relative z-30 pt-4 space-y-4" delay={0.1}>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-300 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/90 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-sm shadow-xs outline-none focus:border-slate-400 dark:focus:border-white/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black dark:text-zinc-500 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <ComboBoxFilter
                options={availableTypes}
                value={selectedType}
                onChange={setSelectedType}
                placeholder={t('filterByType')}
                allLabel={t('allTypes')}
              />
              <ComboBoxFilter
                options={availableCategories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder={t('filterByCategory')}
                allLabel={t('allCategories')}
              />
            </div>
          </div>

          {/* Total Counter Row */}
          <div className="text-xs sm:text-sm font-mono text-slate-600 dark:text-zinc-400">
            <span>{t('total')}: </span>
            <span className="font-bold text-slate-900 dark:text-white">
              {filteredAchievements.length}
            </span>
          </div>
        </ScrollReveal>

        {/* Certificate Cards Grid */}
        {filteredAchievements.length > 0 ? (
          <ScrollReveal
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
            delay={0.15}
          >
            {filteredAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onOpenModal={setSelectedAchievement}
              />
            ))}
          </ScrollReveal>
        ) : (
          <ScrollReveal className="py-20 text-center rounded-2xl border border-dashed border-slate-300 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/40">
            <p className="font-mono text-sm text-slate-500 dark:text-zinc-400">
              {t('emptyState')}
            </p>
          </ScrollReveal>
        )}
      </Container>

      {/* Morphing Detail Modal */}
      <AchievementDetailModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </div>
  );
}
