import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import TagChips from '@/components/projects/tag-chips';
import type { Project } from '@/lib/projects';

export default function ProjectCardBanner({ project }: { project: Project }) {
  const internalHref = project.content?.trim()
    ? `/projects/${project.slug}`
    : undefined;
  const summary = project.tagline || project.description;

  const banner = (
    <div className="border-border relative aspect-video w-full overflow-hidden rounded-lg border">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          className="object-cover"
        />
      ) : (
        <TypographyBanner name={project.name} tagline={summary} />
      )}
    </div>
  );

  return (
    <div className="group rounded-xl border p-1">
      {internalHref ? (
        <Link href={internalHref} className="block">
          {banner}
        </Link>
      ) : (
        banner
      )}

      <div className="p-2">
        {internalHref ? (
          <Link href={internalHref}>
            <h3 className="text-foreground group-hover:text-primary text-label-18 transition-colors">
              {project.name}
            </h3>
          </Link>
        ) : (
          <h3 className="text-foreground text-label-18">{project.name}</h3>
        )}

        <p className="text-muted-foreground text-copy-16 mt-1.5">{summary}</p>

        <div className="mt-3">
          <TagChips tags={project.tags} max={3} />
        </div>

        <div className="text-label-14 mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          {project.codeHref && (
            <Link
              href={project.codeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground group/link inline-flex items-center gap-1.5 transition-colors"
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
              className="text-foreground/80 hover:text-foreground group/link inline-flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Live
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          )}
          {internalHref && (
            <Link
              href={internalHref}
              className="text-primary hover:text-primary/80 group/link inline-flex items-center gap-1.5 transition-colors"
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
    <div className="bg-muted/30 flex h-full w-full flex-col justify-between p-6">
      <span className="text-muted-foreground/60 text-3xs font-mono tracking-wider uppercase">
        ❯ {name.toLowerCase().replace(/\s+/g, '-')}
      </span>
      <div>
        <div className="text-foreground font-mono text-lg font-semibold tracking-tight">
          {name}
        </div>
        <p className="text-muted-foreground text-copy-14 mt-1 line-clamp-2">
          {tagline}
        </p>
      </div>
    </div>
  );
}
