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
    <div className="py-6 sm:py-10">
      <Container size="xl">
        <ProjectDetailView project={project} />
      </Container>
    </div>
  );
}
