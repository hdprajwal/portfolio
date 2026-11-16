import { ViewTransition } from '@/components/view-transition';
import type { Project } from '@/lib/projects';
import {
  CardLink,
  CodeLink,
  LiveLink,
  ProjectMedia,
  shortTagline,
} from '@/components/projects/shared';

// Two-column media cards, the screenshot sits in an accent-tinted frame.
function Card({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col rounded-md transition-[scale] duration-150 ease-out has-[a:active]:scale-[0.99]">
      <CardLink project={project} />
      <ProjectMedia
        project={project}
        framed
        sizes="(max-width: 639px) 100vw, 320px"
        className="pointer-events-none"
      />
      <div className="pointer-events-none mt-3 flex items-center gap-2 [&_a]:pointer-events-auto">
        <ViewTransition name={`project-title-${project.slug}`}>
          <span className="text-foreground-strong text-title truncate">
            {project.name}
          </span>
        </ViewTransition>
        <span className="ml-auto flex shrink-0 items-center gap-2">
          <CodeLink project={project} />
          <LiveLink project={project} />
        </span>
      </div>
      <p className="text-foreground-soft text-subtitle mt-1 text-pretty">
        {shortTagline(project)}
      </p>
    </div>
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
      {projects.map((p) => (
        <Card key={p.slug} project={p} />
      ))}
    </div>
  );
}
