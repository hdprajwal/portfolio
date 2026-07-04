import { listProjects } from '@/lib/projects';
import ProjectCardBanner from '@/components/projects/project-card-banner';

export default async function FeaturedProjects() {
  const projects = await listProjects();

  if (projects.length === 0) {
    return (
      <p className="text-muted-foreground text-copy-16">No projects found.</p>
    );
  }

  // listProjects sorts featured first, then newest; the top four fill the home page's 2x2 grid.
  const featured = projects.slice(0, 4);

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {featured.map((project) => (
        <ProjectCardBanner key={project.slug} project={project} />
      ))}
    </div>
  );
}
