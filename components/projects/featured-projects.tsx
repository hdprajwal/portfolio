import { listProjects } from '@/lib/projects';
import ProjectCard from './project-card';

export default async function FeaturedProjects() {
  const projects = await listProjects();
  const recentProjects = projects.slice(0, 2);

  if (recentProjects.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No Featured Projects found.
      </p>
    );
  }

  return (
    <div className="mt-4">
      {recentProjects.map((project) => (
        <ProjectCard
          key={project.slug}
          name={project.name}
          tagline={project.tagline}
          description={project.description}
          tags={project.tags}
          codeHref={project.codeHref}
          liveHref={project.liveHref}
          slug={project.content?.trim() ? project.slug : undefined}
        />
      ))}
    </div>
  );
}
