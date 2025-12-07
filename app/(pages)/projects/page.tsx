import ProjectCard, { Project } from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';
import type { Metadata } from 'next';


const PROJECTS: Project[] = [
  {
    name: 'DevAssist AI',
    tagline: 'AI Pair Programmer',
    impact: 'Helps developers write code faster with AI suggestions',
    tags: ['ai', 'openai', 'typescript'],
    codeHref: 'https://github.com/hdprajwal/DevAssist_AI',
    slug: 'devassist-ai',
  },
  {
    name: 'Podcast Creator (HF Space)',
    tagline: 'Text → podcast using Gemini',
    impact: 'One-click demo; browser-only sandboxed flow',
    tags: ['ai', 'tools'],
    liveHref: 'https://huggingface.co/spaces/hdprajwal/podcast-creator',
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex-1 bg-background">
      <section className="grid-row p-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Projects</h1>
        <p className="text-sm text-muted-foreground">
          A few builds and experiments.
        </p>
      </section>

      {PROJECTS.map((p, i) => (
        <Reveal key={p.name} delay={i * 80}>
          <ProjectCard {...p} />
        </Reveal>
      ))}

      {PROJECTS.length === 0 && (
        <div className="grid-row p-6">
          <p className="text-muted-foreground">
            No projects found. Try another tag or search.
          </p>
        </div>
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Projects',
};
