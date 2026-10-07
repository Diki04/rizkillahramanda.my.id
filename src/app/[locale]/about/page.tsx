import React from 'react';
import { Container } from '../../../common/components/Container';
import { Breadcrumb } from '../../../common/components/Breadcrumb';
import { Education } from '../../../modules/about/Education';
import { CareerJourney } from '../../../modules/about/CareerJourney';
import { SkillsMatrix } from '../../../modules/about/SkillsMatrix';
import { DeveloperSetup } from '../../../modules/home/DeveloperSetup';

export default function AboutPage() {
  return (
    <Container className="py-16">
      <Breadcrumb items={[{ label: 'About & Journey' }]} />
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-wider text-sky-400">About Me</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Engineering Journey & Profile</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          An overview of my academic foundation at Universitas Riau, hands-on industry apprenticeships, technical skillset, and personal workstation.
        </p>
      </div>

      <div className="space-y-16">
        <CareerJourney />
        <Education />
        <SkillsMatrix />
        <section>
          <h2 className="text-xl font-bold text-white mb-2">Development Environment</h2>
          <p className="text-xs text-slate-400">My daily driver hardware and software development setup.</p>
          <DeveloperSetup />
        </section>
      </div>
    </Container>
  );
}
