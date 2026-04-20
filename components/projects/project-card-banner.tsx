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
  const cardSummary = project.description || project.tagline;

  const banner = (
    <div className="border-border relative aspect-video w-full overflow-hidden rounded-md border">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      ) : (
        <TypographyBanner name={project.name} tagline={cardSummary} />
      )}
    </div>
  );

  return (
    <div className="group">
      {internalHref ? (
        <Link href={internalHref} className="block">
          {banner}
        </Link>
      ) : (
        banner
      )}

      <div className="mt-4">
        <div className="flex items-center gap-2">
          {internalHref ? (
            <Link href={internalHref}>
              <h3 className="text-foreground group-hover:text-primary text-base font-semibold tracking-tight transition-colors md:text-lg">
                {project.name}
              </h3>
            </Link>
          ) : (
            <h3 className="text-foreground text-base font-semibold tracking-tight md:text-lg">
              {project.name}
            </h3>
          )}
          {project.codeHref && (
            <Link
              href={project.codeHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} GitHub`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" />
            </Link>
          )}
          {project.liveHref && (
            <Link
              href={project.liveHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
          {cardSummary}
        </p>

        <div className="mt-3">
          <TagChips tags={project.tags} max={4} />
        </div>

        {internalHref && (
          <Link
            href={internalHref}
            className="text-primary hover:text-primary/80 group/link mt-3 inline-flex items-center gap-1 text-sm transition-colors"
          >
            Read writeup
            <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        )}
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
      <span className="text-muted-foreground/60 font-mono text-[10px] tracking-wider uppercase">
        ❯ {name.toLowerCase().replace(/\s+/g, '-')}
      </span>
      <div>
        <div className="text-foreground font-mono text-lg font-semibold tracking-tight">
          {name}
        </div>
        <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-relaxed">
          {tagline}
        </p>
      </div>
    </div>
  );
}
