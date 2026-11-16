import { ViewTransition } from '@/components/view-transition';
import TagChips from '@/components/projects/tag-chips';
import { projectYear } from '@/components/projects/shared';
import { resolveAccent } from '@/lib/project-accent';
import {
  BackLink,
  LiveSiteLink,
  MediaSlot,
  ProjectBody,
  ProjectFooter,
  SourceLink,
  type PageProps,
} from '@/components/projects/page/parts';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-border flex items-baseline justify-between gap-4 border-b py-2.5 last:border-b-0 xl:block xl:space-y-1">
      <dt className="text-muted-foreground text-meta shrink-0">{label}</dt>
      <dd className="text-foreground text-meta min-w-0 text-right xl:text-left">
        {children}
      </dd>
    </div>
  );
}

// Project page: main column stays on the site's centered 672px line; on xl the facts card floats in the right gutter and sticks while you scroll, below xl it sits inline under the video.
export default function ProjectLayout({ project, others }: PageProps) {
  const accent = resolveAccent(project);
  const year = projectYear(project);
  return (
    <div className="bg-background relative min-h-screen px-4 py-10 md:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <BackLink />
        <header className="mt-4">
          <ViewTransition name={`project-title-${project.slug}`}>
            <h1 className="text-foreground-strong text-display text-balance">
              {project.name}
            </h1>
          </ViewTransition>
          <p className="text-foreground-soft text-body mt-3 text-pretty">
            {project.tagline}
          </p>
        </header>

        <div className="relative mt-8">
          <ViewTransition name={`project-image-${project.slug}`}>
            <MediaSlot project={project} />
          </ViewTransition>

          <aside className="mt-6 xl:absolute xl:inset-y-0 xl:left-full xl:mt-0 xl:ml-10 xl:w-60">
            <div
              className={cn(
                'border-border rounded-lg border bg-linear-to-b to-transparent px-4 py-1.5 xl:sticky xl:top-20 xl:py-2',
                accent.wash
              )}
            >
              <dl>
                {project.liveHref && (
                  <Fact label="Live">
                    <LiveSiteLink project={project} />
                  </Fact>
                )}
                {project.codeHref && (
                  <Fact label="Code">
                    <SourceLink project={project} />
                  </Fact>
                )}
                {year && <Fact label="Year">{year}</Fact>}
                {project.video && (
                  <Fact label="Walkthrough">{project.duration ?? 'Video'}</Fact>
                )}
                <Fact label="Stack">
                  <TagChips
                    tags={project.tags}
                    className="flex flex-wrap justify-end gap-1.5 xl:justify-start"
                  />
                </Fact>
              </dl>
            </div>
          </aside>

          <div className="mt-10 min-w-0">
            <ProjectBody project={project} />
          </div>
        </div>
      </div>
      <ProjectFooter project={project} others={others} />
    </div>
  );
}
