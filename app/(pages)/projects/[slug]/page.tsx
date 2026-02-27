import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, ExternalLink } from 'lucide-react';
import { CustomMDX } from '@/components/mdx/custom-mdx';
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
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: project.name,
      description: project.tagline,
      type: 'website',
      url: `${baseUrl}/projects/${slug}`,
      images: project.image ? [{ url: project.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.name,
      description: project.tagline,
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

  const isExternalImg = project.image && /^https?:\/\//.test(project.image);

  return (
    <div className="bg-background relative container mx-auto min-h-screen max-w-4xl overflow-x-hidden px-4 py-10 md:py-12">
      <Link
        href="/projects"
        className="text-primary mb-6 inline-flex items-center gap-2 text-sm hover:underline"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back
      </Link>

      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-2xl leading-[1.2] font-bold tracking-tight">
          {project.name}
        </h1>
        {project.liveHref && (
          <Link
            href={project.liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 inline-flex shrink-0 items-center gap-1 text-sm transition-colors hover:underline"
          >
            View Live
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        {project.tagline}
      </p>

      {project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-primary font-mono text-xs">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="border-border bg-muted relative mt-6 overflow-hidden rounded-sm border">
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
            <span className="text-muted-foreground font-mono text-sm opacity-40 select-none">
              <span className="text-primary">❯</span>{' '}
              {project.name.toLowerCase()}
            </span>
          )}
        </div>
      </div>

      <hr className="border-border my-8" />

      {project.content && (
        <article className="prose prose-sm dark:prose-invert md:prose-base w-full max-w-4xl">
          <CustomMDX source={project.content} />
        </article>
      )}
    </div>
  );
}
