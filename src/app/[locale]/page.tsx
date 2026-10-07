import React from 'react';
import { Hero } from '@/modules/home/Hero';
import { TechStack } from '@/modules/home/TechStack';
import { FeaturedProjects } from '@/modules/home/FeaturedProjects';
import { DevHighlights } from '@/modules/home/DevHighlights';
import { ContactCta } from '@/modules/home/ContactCta';
import { SectionNavigator } from '@/common/components/SectionNavigator';

export default function HomePage() {
  return (
    <div className="flex flex-col relative w-full scroll-smooth">
      <SectionNavigator />
      <Hero />
      <TechStack />
      <FeaturedProjects />
      <DevHighlights />
      <ContactCta />
    </div>
  );
}
