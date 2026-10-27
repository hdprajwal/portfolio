import ProjectList from '@/components/projects/project-list';
import { listProjects } from '@/lib/projects';

export default async function FeaturedProjects() {
  const projects = await listProjects();

  if (projects.length === 0) {
    return (
      <p className="text-muted-foreground text-body">No projects found.</p>
    );
  }

  // listProjects sorts featured first, then newest; the top four fill the list.
  return <ProjectList projects={projects.slice(0, 4)} />;
}
