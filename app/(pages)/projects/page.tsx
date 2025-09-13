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
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A few builds and experiments.
        </p>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 80}>
            <ProjectCard {...p} />
          </Reveal>
        ))}
      </div>
      {PROJECTS.length === 0 && (
        <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-6 text-muted-foreground">
          No projects found. Try another tag or search.
        </div>
      )}
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Projects',
};
