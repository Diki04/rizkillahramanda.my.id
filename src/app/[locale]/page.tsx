import React from 'react';
import dynamic from 'next/dynamic';
import { Hero } from '@/modules/home/Hero';
import { SectionNavigator } from '@/common/components/SectionNavigator';

// Lazy load below-the-fold components for fast initial load & reduced main thread work
const TechStack = dynamic(
  () => import('@/modules/home/TechStack').then((mod) => mod.TechStack),
  { ssr: true }
);

const FeaturedProjects = dynamic(
  () => import('@/modules/home/FeaturedProjects').then((mod) => mod.FeaturedProjects),
  { ssr: true }
);

const DevHighlights = dynamic(
  () => import('@/modules/home/DevHighlights').then((mod) => mod.DevHighlights),
  { ssr: true }
);

const ContactCta = dynamic(
  () => import('@/modules/home/ContactCta').then((mod) => mod.ContactCta),
  { ssr: true }
);

const MagicBentoSection = dynamic(
  () => import('@/modules/home/MagicBentoSection').then((mod) => mod.MagicBentoSection),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div className="flex flex-col relative w-full scroll-smooth">
      <SectionNavigator />
      <Hero />
      <TechStack />
      <FeaturedProjects />
      <DevHighlights />
      <ContactCta />
      <MagicBentoSection />
    </div>
  );
}
