import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import ProjectVideo from '@/components/projects/project-video';
import ProjectList from '@/components/projects/project-list';
import SectionHeader from '@/components/section-header';
import NextStep from '@/components/next-step';
import { CustomMDX } from '@/components/mdx/custom-mdx';
import { liveHost } from '@/components/projects/shared';
import { resolveAccent } from '@/lib/project-accent';
import type { Project } from '@/lib/projects';
import { cn } from '@/lib/utils';

export type PageProps = { project: Project; others: Project[] };

export function BackLink() {
  return (
    <Link
      href="/projects"
      className="text-muted-foreground hover:text-foreground text-meta inline-flex items-center gap-2 transition-colors"
    >
      Projects
    </Link>
  );
}

export function LiveSiteLink({ project }: { project: Project }) {
  if (!project.liveHref) return null;
  return (
    <Link
      href={project.liveHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group text-foreground-strong decoration-accent-link hover:decoration-foreground-strong inline-flex items-center gap-1 underline underline-offset-4 transition-colors"
    >
      {liveHost(project)}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function SourceLink({ project }: { project: Project }) {
  if (!project.codeHref) return null;
  return (
    <Link
      href={project.codeHref}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
    >
      <GithubIcon className="h-3.5 w-3.5" />
      Source
    </Link>
  );
}

// The 16:9 slot: video player, else screenshot, else a name placeholder.
export function MediaSlot({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const accent = resolveAccent(project);
  const poster = project.poster || project.image;
  return (
    <div
      className={cn(
        'border-border bg-muted relative aspect-video w-full overflow-hidden rounded-md border shadow-sm',
        className
      )}
    >
      {project.video ? (
        <ProjectVideo
          src={project.video}
          poster={poster}
          title={project.name}
          duration={project.duration}
          tile={accent.tile}
        />
      ) : poster ? (
        <Image
          src={poster}
          alt={`${project.name} preview`}
          fill
          priority
          sizes="(max-width: 672px) 100vw, 896px"
          className="object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center">
          <span className="text-muted-foreground font-mono text-base opacity-40 select-none">
            <span className="text-primary">❯</span> {project.name.toLowerCase()}
          </span>
        </span>
      )}
    </div>
  );
}

// Writeup when there is one, otherwise the frontmatter description.
export function ProjectBody({ project }: { project: Project }) {
  return (
    <article className="typeset typeset-notes min-w-0">
      {project.content?.trim() ? (
        <CustomMDX source={project.content} />
      ) : (
        <p>{project.description}</p>
      )}
    </article>
  );
}

export function ProjectFooter({ project, others }: PageProps) {
  return (
    <div className="mx-auto mt-10 w-full max-w-2xl">
      <hr className="border-border mb-10" />
      {others.length > 0 && (
        <section>
          <SectionHeader
            label="More projects"
            href="/projects"
            linkLabel="All projects"
          />
          <ProjectList projects={others} />
        </section>
      )}
      <NextStep subject={project.name} />
    </div>
  );
}
