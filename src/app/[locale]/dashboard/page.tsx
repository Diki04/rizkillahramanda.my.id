import React from 'react';
import { Container } from '../../../common/components/Container';
import { Breadcrumb } from '../../../common/components/Breadcrumb';
import { GitHubStats } from '../../../modules/dashboard/GitHubStats';
import { WakatimeStats } from '../../../modules/dashboard/WakatimeStats';
import { MonkeytypeStats } from '../../../modules/dashboard/MonkeytypeStats';
import { CodewarsStats } from '../../../modules/dashboard/CodewarsStats';

export default function DashboardPage() {
  return (
    <Container className="py-16">
      <Breadcrumb items={[{ label: 'Dashboard' }]} />
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-wider text-sky-400">Telemetry</span>
        <h1 className="text-3xl font-extrabold text-white mt-1">Developer Metrics Dashboard</h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Live statistics from GitHub, code editor telemetry from Wakatime, typing velocity, and problem-solving benchmarks.
        </p>
      </div>

      <div className="space-y-10">
        <GitHubStats />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MonkeytypeStats />
          <CodewarsStats />
        </div>
        <WakatimeStats />
      </div>
    </Container>
  );
}
