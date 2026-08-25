import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import TagChips from '@/components/projects/tag-chips';
import { ViewTransition } from '@/components/view-transition';
import type { Project } from '@/lib/projects';

export default function ProjectCardBanner({ project }: { project: Project }) {
  const internalHref = project.content?.trim()
    ? `/projects/${project.slug}`
    : undefined;
  const summary = project.tagline || project.description;

  const banner = (
    <ViewTransition
      name={internalHref ? `project-image-${project.slug}` : undefined}
    >
      <div className="border-border group-hover:border-foreground/20 relative aspect-video w-full overflow-hidden rounded-lg border transition-colors duration-200 ease-out">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        ) : (
          <TypographyBanner name={project.name} tagline={summary} />
        )}
      </div>
    </ViewTransition>
  );

  return (
    <div className="group hover:border-foreground/20 flex h-full flex-col rounded-xl border p-1 transition-colors duration-200 ease-out">
      {internalHref ? (
        <Link href={internalHref} className="block">
          {banner}
        </Link>
      ) : (
        banner
      )}

      <div className="flex flex-1 flex-col px-2 pt-3 pb-2">
        {internalHref ? (
          <Link href={internalHref}>
            <ViewTransition name={`project-title-${project.slug}`}>
              <h3 className="text-foreground text-title-14 group-hover:underline group-hover:underline-offset-3">
                {project.name}
              </h3>
            </ViewTransition>
          </Link>
        ) : (
          <h3 className="text-foreground text-title-14">{project.name}</h3>
        )}

        <p className="text-muted-foreground text-read-13 mt-1">{summary}</p>

        <div className="mt-2.5">
          <TagChips tags={project.tags} max={3} />
        </div>

        <div className="text-label-12-mono mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-3">
          {project.codeHref && (
            <Link
              href={project.codeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground group/link inline-flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          )}
          {project.liveHref && (
            <Link
              href={project.liveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground group/link inline-flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Live
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          )}
          {internalHref && (
            <Link
              href={internalHref}
              className="text-muted-foreground hover:text-foreground group/link inline-flex items-center gap-1.5 transition-colors"
            >
              Writeup
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function TypographyBanner({
  name,
  tagline,
}: {
  name: string;
  tagline: string;
}) {
  return (
    <div className="bg-muted flex h-full w-full flex-col justify-between px-4 py-3.5">
      <span className="text-muted-foreground group-hover:text-foreground text-label-11-mono tracking-wider transition-colors duration-200 ease-out">
        ❯ {name.toLowerCase().replace(/\s+/g, '-')}
      </span>
      <div>
        <div className="text-foreground text-title-15">{name}</div>
        <p className="text-muted-foreground text-read-12 mt-0.5 line-clamp-2">
          {tagline}
        </p>
      </div>
    </div>
  );
}
