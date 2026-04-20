import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { listProjects } from '@/lib/projects';
import GithubIcon from '@/components/icons/GithubIcon';
import DotGridIdenticon from '@/components/dot-grid-identicon';

export default async function FeaturedProjects() {
  const projects = await listProjects();

  if (projects.length === 0) {
    return <p className="text-muted-foreground text-sm">No projects found.</p>;
  }

  const spotlight = projects.find((p) => p.featured) || projects[0];
  const rest = projects.filter((p) => p !== spotlight).slice(0, 3);
  const internalHref = spotlight.content?.trim()
    ? `/projects/${spotlight.slug}`
    : undefined;

  return (
    <div className="space-y-10">
      {/* Spotlight: first project, wide layout */}
      <div className="group">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          {internalHref ? (
            <Link
              href={internalHref}
              className="relative aspect-video w-full overflow-hidden rounded-lg"
            >
              {spotlight.image ? (
                <Image
                  src={spotlight.image}
                  alt={`${spotlight.name} preview`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <DotGridIdenticon name={spotlight.name} showName={false} />
              )}
            </Link>
          ) : (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              {spotlight.image ? (
                <Image
                  src={spotlight.image}
                  alt={`${spotlight.name} preview`}
                  fill
                  className="object-cover"
                />
              ) : (
                <DotGridIdenticon name={spotlight.name} showName={false} />
              )}
            </div>
          )}

          <div>
            <div className="flex items-center gap-3">
              {internalHref ? (
                <Link href={internalHref}>
                  <h3 className="text-foreground group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
                    {spotlight.name}
                  </h3>
                </Link>
              ) : (
                <h3 className="text-foreground text-lg font-semibold tracking-tight">
                  {spotlight.name}
                </h3>
              )}
              {spotlight.codeHref && (
                <Link
                  href={spotlight.codeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <GithubIcon className="h-4 w-4" />
                </Link>
              )}
            </div>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {spotlight.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {spotlight.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-border text-muted-foreground inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] leading-none"
                >
                  {tag}
                </span>
              ))}
            </div>
            {internalHref && (
              <Link
                href={internalHref}
                className="text-primary hover:text-primary/80 group/link mt-4 inline-flex items-center gap-1 text-sm transition-colors"
              >
                Read more
                <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Remaining projects: compact list */}
      {rest.length > 0 && (
        <div className="divide-border divide-y">
          {rest.map((project) => {
            const href = project.content?.trim()
              ? `/projects/${project.slug}`
              : undefined;
            const cardSummary = project.description || project.tagline;
            return (
              <div key={project.slug} className="group/item py-4 first:pt-0">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                  <div className="flex min-w-0 items-center gap-2">
                    {href ? (
                      <Link href={href}>
                        <h3 className="text-foreground group-hover/item:text-primary text-sm font-medium tracking-tight transition-colors">
                          {project.name}
                        </h3>
                      </Link>
                    ) : (
                      <h3 className="text-foreground text-sm font-medium tracking-tight">
                        {project.name}
                      </h3>
                    )}
                    {project.codeHref && (
                      <Link
                        href={project.codeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground shrink-0 transition-colors"
                      >
                        <GithubIcon className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="border-border/70 text-muted-foreground/80 inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] leading-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                  {cardSummary}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
