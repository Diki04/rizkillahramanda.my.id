import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { mockProjects } from '@/services/data/mock-projects';
import { ProjectDetailView } from '@/modules/projects/ProjectDetailView';
import { Container } from '@/common/components/Container';

interface ProjectPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const project of mockProjects) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params: { locale, slug },
}: ProjectPageProps): Promise<Metadata> {
  const project = mockProjects.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  const isEn = locale === 'en';
  const desc = isEn ? project.description.en : project.description.id;

  return {
    title: `${project.title} | Rizkillah Ramanda`,
    description: desc,
    openGraph: {
      title: project.title,
      description: desc,
      images: [project.image],
    },
  };
}

export default function ProjectDetailPage({ params: { slug } }: ProjectPageProps) {
  const project = mockProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen py-4 sm:py-8 lg:py-12">
      <Container size="xl">
        <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white/95 dark:bg-zinc-950/85 backdrop-blur-2xl border border-white/80 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 shadow-2xl shadow-slate-300/40 dark:shadow-black/80 p-6 sm:p-10 md:p-12 transition-all duration-300">
          <ProjectDetailView project={project} />
        </div>
      </Container>
    </div>
  );
}
