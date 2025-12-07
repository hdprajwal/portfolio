'use client';

import Link from 'next/link';

export type Project = {
  name: string;
  tagline: string;
  impact?: string;
  tags: string[];
  codeHref?: string;
  liveHref?: string;
  featured?: boolean;
  slug?: string;
};

export default function ProjectCard(p: Project) {
  const mainTag = p.tags && p.tags.length > 0 ? p.tags[0].toUpperCase() : 'PROJECT';

  return (
    <div className="grid-row p-6 group cursor-pointer transition-colors hover:bg-[var(--muted)]">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs border px-2 py-0.5 rounded tracking-wide text-term-cyan border-term-cyan/30">
          {mainTag}
        </span>
        <svg
          className="w-5 h-5 text-muted-foreground group-hover:text-[var(--accent)] transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          ></path>
        </svg>
      </div>

      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
        {p.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{p.tagline}</p>
      {p.impact && (
        <p className="mt-3 text-sm text-muted-foreground/80 leading-relaxed">{p.impact}</p>
      )}

      <div className="mt-4 pt-4 border-t border-dashed border-[var(--border)] flex flex-wrap gap-3 text-xs text-muted-foreground font-bold">
        {p.tags && p.tags.map((t, idx) => (
          <span key={t}>
            {idx > 0 && <span className="mr-3">•</span>}
            {t}
          </span>
        ))}
      </div>

      {(p.codeHref || p.liveHref) && (
        <div className="mt-4 flex flex-wrap gap-3">
          {p.codeHref && (
            <Link
              href={p.codeHref}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-[var(--accent)] transition-colors underline"
            >
              View Code →
            </Link>
          )}
          {p.liveHref && (
            <Link
              href={p.liveHref}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-[var(--accent)] transition-colors underline"
            >
              Live Demo →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
