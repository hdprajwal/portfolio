import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { CustomMDX } from '@/components/mdx/custom-mdx';
import { ViewTransition } from '@/components/view-transition';
import {
  listProjects,
  getProject,
  hasProjectPage,
  baseUrl,
} from '@/lib/projects';

export async function generateStaticParams() {
  const projects = await listProjects();
  return projects.filter(hasProjectPage).map((p) => ({ slug: p.slug }));
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

  if (!project || !hasProjectPage(project)) {
    notFound();
  }

  const isExternalImg = project.image && /^https?:\/\//.test(project.image);

  return (
    <div className="bg-background relative min-h-screen overflow-x-hidden px-4 py-10 md:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground text-label-16 inline-flex items-center gap-2 transition-colors"
        >
          Projects
        </Link>
        <header className="mt-4">
          <div className="flex items-baseline justify-between gap-5">
            <ViewTransition name={`project-title-${slug}`}>
              <h1 className="text-heading-24 md:text-heading-32 font-[450]! text-balance">
                {project.name}
              </h1>
            </ViewTransition>
            {project.liveHref && (
              <Link
                href={project.liveHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground text-label-16 inline-flex shrink-0 items-center gap-1 transition-colors hover:underline"
              >
                View Live
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          <p className="text-muted-foreground text-copy-18 mt-2">
            {project.tagline}
          </p>
        </header>
      </div>

      <ViewTransition name={`project-image-${slug}`}>
        <div className="border-border bg-muted relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-lg border">
          <div className="relative flex aspect-[16/9] w-full items-center justify-center">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                fill
                className="object-cover"
                unoptimized={!!isExternalImg}
              />
            ) : (
              <span className="text-muted-foreground font-mono text-base opacity-40 select-none">
                <span className="text-primary">❯</span>{' '}
                {project.name.toLowerCase()}
              </span>
            )}
          </div>
        </div>
      </ViewTransition>

      {project.content && (
        <div className="mx-auto mt-10 w-full max-w-3xl min-w-0 md:mt-12">
          <article className="typeset typeset-notes min-w-0">
            <CustomMDX source={project.content} />
          </article>
        </div>
      )}
    </div>
  );
}
