'use client';
import Link from 'next/link';

type Project = {
  name: string;
  tagline: string;
  impact?: string;
  tags: string[];
  codeHref?: string;
  liveHref?: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    name: 'DevAssist AI',
    tagline: 'AI Pair Programmer',
    impact: 'Helps developers write code faster with AI suggestions',
    tags: ['ai', 'openai', 'typescript'],
    codeHref: 'https://github.com/hdprajwal/DevAssist_AI',
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
    <main className="container mx-auto max-w-6xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-1 text-sm text-[var(--muted-fg)]">
          A few builds and experiments.
        </p>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
      {PROJECTS.length === 0 && (
        <div className="rounded-md border border-[var(--border)] bg-[var(--card)] p-6 text-[var(--muted-fg)]">
          No projects found. Try another tag or search.
        </div>
      )}
    </main>
  );
}

function ProjectCard(p: Project) {
  return (
    <article className="group rounded-md border border-[var(--border)] bg-[var(--bg)] p-6 transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{p.name}</h2>
          <p className="text-sm text-[var(--muted-fg)]">{p.tagline}</p>
        </div>
        {p.featured && (
          <span className="rounded-full bg-[var(--chip)] px-2 py-1 font-mono text-[10px] text-[var(--chip-fg)] ring-1 ring-inset ring-[var(--border)]">
            featured
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-md bg-[var(--chip)] px-2 py-1 font-mono text-[10px] text-[var(--chip-fg)] ring-1 ring-inset ring-[var(--border)]"
          >
            --{t}
          </span>
        ))}
      </div>

      {p.impact && (
        <p className="mt-4 text-sm text-[var(--muted-fg)]">{p.impact}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {p.liveHref && (
          <Link
            href={p.liveHref}
            className="inline-flex items-center rounded-xl bg-[var(--fg)] px-3 py-1.5 text-xs font-medium text-[var(--bg)] hover:opacity-90"
          >
            Run demo
          </Link>
        )}
        {p.codeHref && (
          <Link
            href={p.codeHref}
            className="inline-flex items-center rounded-xl border border-[var(--border)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
          >
            Code
          </Link>
        )}
      </div>
    </article>
  );
}
