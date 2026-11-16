import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Play } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import { ViewTransition } from '@/components/view-transition';
import type { Project } from '@/lib/projects';
import { resolveAccent } from '@/lib/project-accent';
import { cn } from '@/lib/utils';

export function projectHref(p: Project) {
  return `/projects/${p.slug}`;
}

export function projectYear(p: Project) {
  // UTC so a date-only value like 2026-01-01 does not read as the previous year west of UTC.
  return p.date ? new Date(p.date).getUTCFullYear().toString() : '';
}

export function liveHost(p: Project) {
  return p.liveHref
    ? new URL(p.liveHref).hostname.replace(/^www\./, '')
    : undefined;
}

// First sentence only; rows wrap to two lines instead of truncating.
export function shortTagline(p: Project) {
  return p.tagline.split(/(?<=\.)\s/)[0].replace(/\.$/, '');
}

// Full-card hit area; interactive children sit above it with `relative z-10`.
export function CardLink({ project }: { project: Project }) {
  return (
    <Link
      href={projectHref(project)}
      className="absolute inset-0 z-0 rounded-[inherit]"
      aria-label={project.name}
    />
  );
}

export function LiveLink({
  project,
  label = 'Live',
  className,
}: {
  project: Project;
  label?: string;
  className?: string;
}) {
  if (!project.liveHref) return null;
  return (
    <Link
      href={project.liveHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group/live border-border bg-background text-foreground-strong hover:bg-accent text-meta relative z-10 inline-flex shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 transition-[background-color,scale] duration-150 ease-out active:scale-[0.97]',
        className
      )}
      aria-label={`${project.name} live site`}
    >
      {label}
      <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
    </Link>
  );
}

export function CodeLink({ project }: { project: Project }) {
  if (!project.codeHref) return null;
  return (
    <Link
      href={project.codeHref}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground relative z-10 inline-flex shrink-0 transition-colors"
      aria-label={`${project.name} source on GitHub`}
    >
      <GithubIcon className="h-3.5 w-3.5" />
    </Link>
  );
}

export function VideoBadge({ project }: { project: Project }) {
  if (!project.video) return null;
  return (
    <span className="text-meta absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-white backdrop-blur-sm">
      <Play className="size-3 fill-current" />
      {project.duration ?? 'Video'}
    </span>
  );
}

// Screenshot inside an accent-tinted frame; `framed` adds the colored padding around the image.
export function ProjectMedia({
  project,
  framed = false,
  sizes,
  className,
}: {
  project: Project;
  framed?: boolean;
  sizes: string;
  className?: string;
}) {
  const accent = resolveAccent(project);
  const src = project.poster || project.image;

  return (
    <span
      className={cn(
        'border-border bg-muted relative block overflow-hidden rounded-md border',
        framed &&
          `bg-linear-to-br ${accent.wash} to-transparent p-3 ring-1 ring-transparent transition-shadow duration-200 ${accent.ring}`,
        className
      )}
    >
      <ViewTransition name={`project-image-${project.slug}`}>
        <span
          className={cn(
            'bg-muted relative block aspect-video overflow-hidden',
            framed && 'border-border rounded-[5px] border shadow-sm'
          )}
        >
          {src ? (
            <Image
              src={src}
              alt={`${project.name} preview`}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground font-mono text-base opacity-40 select-none">
                <span className="text-primary">❯</span>{' '}
                {project.name.toLowerCase()}
              </span>
            </span>
          )}
          <VideoBadge project={project} />
        </span>
      </ViewTransition>
    </span>
  );
}
