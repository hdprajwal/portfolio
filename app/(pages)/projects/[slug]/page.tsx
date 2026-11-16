import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectLayout from '@/components/projects/page/project-layout';
import { listProjects, getProject, baseUrl } from '@/lib/projects';

export async function generateStaticParams() {
  const projects = await listProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.name} | Projects`,
    description: project.description || project.tagline,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: project.name,
      description: project.description || project.tagline,
      type: 'website',
      url: `${baseUrl}/projects/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.description || project.tagline,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const others = (await listProjects())
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return <ProjectLayout project={project} others={others} />;
}
