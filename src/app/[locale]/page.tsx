import React from 'react';
import { Hero } from '@/modules/home/Hero';
import { TechStack } from '@/modules/home/TechStack';
import { FeaturedProjects } from '@/modules/home/FeaturedProjects';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <TechStack />
      <FeaturedProjects />
    </div>
  );
}
