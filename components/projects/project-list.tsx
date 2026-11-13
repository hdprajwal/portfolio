import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Code2 } from 'lucide-react';
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

// First sentence only; the row wraps to two lines instead of truncating.
function shortTagline(p: Project) {
  return p.tagline.split(/(?<=\.)\s/)[0].replace(/\.$/, '');
}

function ProjectRow({ project }: { project: Project }) {
  const href = projectHref(project);
  const external = href.startsWith('http');
  const internal = hasProjectPage(project);

  return (
    <div className="group hover:bg-accent/60 relative rounded-md px-3 transition-[background-color,scale] duration-150 ease-out has-[a:active]:scale-[0.99]">
      <Link
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="absolute inset-0"
        aria-label={project.name}
      />
      <div className="flex items-start gap-4 py-3 sm:items-center">
        <ViewTransition
          name={internal ? `project-image-${project.slug}` : undefined}
        >
          <span className="border-border bg-muted relative hidden aspect-video w-28 shrink-0 overflow-hidden rounded-md border sm:block">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} preview`}
                fill
                sizes="(max-width: 639px) 80px, 112px"
                className="object-cover"
              />
            ) : (
              <span className="text-muted-foreground text-meta flex h-full w-full items-center justify-center px-2 font-mono">
                <Code2 aria-hidden className="h-4 w-4 sm:hidden" />
                <span className="hidden max-w-full truncate sm:block">
                  {project.slug}
                </span>
              </span>
            )}
          </span>
        </ViewTransition>
        <span className="min-w-0 flex-1">
          <span className="flex items-start gap-2">
            <ViewTransition
              name={internal ? `project-title-${project.slug}` : undefined}
            >
              <span className="text-foreground-strong text-title">
                {project.name}
              </span>
            </ViewTransition>
            {project.codeHref && (
              <Link
                href={project.codeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground relative z-10 mt-[5px] shrink-0 transition-colors"
                aria-label={`${project.name} source on GitHub`}
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </Link>
            )}
            <span className="text-muted-foreground text-meta mt-[3px] ml-auto inline-flex shrink-0 items-center gap-1 pl-2">
              <span className="hidden sm:inline">{projectDomain(project)}</span>
              {internal ? (
                <ArrowRight className="group-hover:text-foreground h-3.5 w-3.5 transition-[color,transform] duration-200 group-hover:translate-x-0.5" />
              ) : (
                <ArrowUpRight className="group-hover:text-foreground h-3.5 w-3.5 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
            </span>
          </span>
          <span className="text-foreground-soft text-subtitle mt-0.5 block text-pretty">
            {shortTagline(project)}
          </span>
          {projectDomain(project) && (
            <span className="text-muted-foreground text-meta mt-1 block sm:hidden">
              {projectDomain(project)}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="-mx-3 space-y-1">
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </div>
  );
}
