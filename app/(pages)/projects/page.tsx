import type { Metadata } from 'next';
import { listProjects } from '@/lib/projects';
import ProjectCardBanner from '@/components/projects/project-card-banner';

export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <div className="flex-1">
      <div className="px-4 pt-14 pb-8">
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          Projects
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
          Work across applied AI, security, and developer tooling. Research
          papers, shipped tools, and things I built to scratch my own itch.
        </p>
      </div>

      <div className="px-4 pb-16">
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-[0.9rem]">
            No projects found.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {projects.map((p) => (
              <ProjectCardBanner key={p.slug} project={p} />
            ))}
          </div>
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
