import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import { ViewTransition } from '@/components/view-transition';
import { hasProjectPage, type Project } from '@/lib/projects';

function projectHref(p: Project) {
  if (hasProjectPage(p)) return `/projects/${p.slug}`;
  return p.liveHref || p.codeHref || '#';
}

function projectDomain(p: Project) {
  if (p.liveHref) return new URL(p.liveHref).hostname.replace(/^www\./, '');
  if (hasProjectPage(p)) return 'writeup';
  if (p.codeHref) return 'github';
  return '';
}

// First sentence, cut back to the last comma when it still runs long.
function shortTagline(p: Project) {
  const max = 64;
  let s = p.tagline.split(/(?<=\.)\s/)[0].replace(/\.$/, '');
  if (s.length > max) {
    const comma = s.slice(0, max).lastIndexOf(',');
    s = comma > 20 ? s.slice(0, comma) : s.slice(0, max).replace(/\s\S*$/, '…');
  }
  return s;
}

function ProjectRow({ project }: { project: Project }) {
  const href = projectHref(project);
  const external = href.startsWith('http');
  const internal = hasProjectPage(project);

  return (
    <div className="group hover:bg-accent/60 relative px-3 transition-colors duration-150">
      <Link
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="absolute inset-0"
        aria-label={project.name}
      />
      <div className="flex items-center gap-4 py-3">
        <ViewTransition
          name={internal ? `project-image-${project.slug}` : undefined}
        >
          <span className="border-border bg-muted relative block aspect-video w-28 shrink-0 overflow-hidden rounded-md border">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <span className="text-muted-foreground text-meta flex h-full w-full items-center justify-center">
                ❯ {project.slug}
              </span>
            )}
          </span>
        </ViewTransition>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <ViewTransition
              name={internal ? `project-title-${project.slug}` : undefined}
            >
              <span className="text-foreground text-title">{project.name}</span>
            </ViewTransition>
            {project.codeHref && (
              <Link
                href={project.codeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground relative z-10 shrink-0 transition-colors"
                aria-label={`${project.name} source on GitHub`}
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </Link>
            )}
          </span>
          <span className="text-muted-foreground text-subtitle block truncate">
            {shortTagline(project)}
          </span>
        </span>
        <span className="text-muted-foreground text-meta hidden shrink-0 items-center gap-1 sm:inline-flex">
          {projectDomain(project)}
          <ArrowUpRight className="group-hover:text-foreground h-3.5 w-3.5 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </div>
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="border-border divide-border divide-y overflow-hidden rounded-lg border">
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </div>
  );
}
