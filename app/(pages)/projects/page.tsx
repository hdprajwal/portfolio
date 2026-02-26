import ProjectCard from '@/components/projects/project-card';
import type { Metadata } from 'next';
import { listProjects } from '@/lib/projects';

export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <div className="flex-1">
      <div className="px-4 py-14">
        <h1 className="text-xl font-medium tracking-tight text-balance sm:text-2xl">
          Projects
        </h1>
        <p className="text-muted-foreground mt-2 text-xs">
          A few builds and experiments.
        </p>
      </div>

      <div className="px-4">
        {projects.map((p) => (
          <ProjectCard
            key={p.slug}
            slug={p.content?.trim() ? p.slug : undefined}
            name={p.name}
            tagline={p.tagline}
            tags={p.tags}
            description={p.description}
            codeHref={p.codeHref}
            liveHref={p.liveHref}
          />
        ))}

        {projects.length === 0 && (
          <p className="text-muted-foreground text-[0.9rem]">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A collection of projects Prajwal has built and contributed to.',
};
