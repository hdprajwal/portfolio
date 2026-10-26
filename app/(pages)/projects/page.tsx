import type { Metadata } from 'next';
import { listProjects } from '@/lib/projects';
import ProjectList from '@/components/projects/project-list';

export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <div className="flex-1">
      <div className="px-4 pt-14 pb-8">
        <h1 className="text-foreground text-title-24">Projects</h1>
        <p className="text-foreground text-read-14 mt-3 max-w-3xl">
          Work across applied AI, security, and developer tooling. Research
          papers, shipped tools, and things I built to scratch my own itch.
        </p>
      </div>

      <div className="px-4 pb-16">
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-read-14">
            No projects found.
          </p>
        ) : (
          <ProjectList projects={projects} />
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected projects across developer tools, applied AI, and security, including QuackCode, Gitwise, and published Android malware detection research.',
  alternates: {
    canonical: '/projects',
  },
};
