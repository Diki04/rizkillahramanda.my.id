'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Container } from '@/common/components/Container';
import { SpotlightCard } from '@/common/components/SpotlightCard';
import { Badge } from '@/common/components/Badge';
import { Button } from '@/common/components/Button';
import { mockProjects } from '@/services/data/mock-projects';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

export function FeaturedProjects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isEn = locale === 'en';

  const featured = mockProjects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="py-20 min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      <Container size="xl">
        <div className="flex flex-col gap-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-accent-blue font-semibold">
                {t('featured')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                {t('title')}
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                {t('subtitle')}
              </p>
            </div>
            <Link href="/projects">
              <Button variant="outline" size="sm">
                <span>{t('filterAll')}</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project) => (
              <SpotlightCard
                key={project.id}
                className="flex flex-col h-full p-5 justify-between"
              >
                <div className="space-y-4">
                  {/* Project Image Banner */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/[0.08] bg-navy-950">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <Badge variant="accent">{project.category}</Badge>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-accent-blue transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                      {isEn ? project.description.en : project.description.id}
                    </p>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-navy-950/80 text-slate-300 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-5 mt-4 border-t border-white/[0.06]">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="secondary" size="sm" className="w-full text-xs">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        <span>{t('liveDemo')}</span>
                      </Button>
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={project.demoUrl ? '' : 'w-full'}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs border-white/[0.1]"
                    >
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      <span>{t('sourceCode')}</span>
                    </Button>
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
