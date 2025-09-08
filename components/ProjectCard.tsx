'use client';

import { ExternalLinkIcon } from 'lucide-react';
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
  return (
    <div
      key={p.slug}
      className="rounded-md border border-[var(--border)] bg-[var(--card)] p-5"
    >
      {/* <Link href={`/projects/${p.slug}`} className="group block"> */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="inline-flex items-center text-lg font-medium group-hover:underline">
            {p.name} 
            {/* <ExternalLinkIcon className="ml-2 h-4 w-4" /> */}
          </h2>
        </div>
      {/* </Link> */}
      <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
      {p.impact && (
        <p className="mt-4 text-sm text-muted-foreground">{p.impact}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {p.tags &&
          p.tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-[var(--chip)] px-2 py-1 font-mono text-[10px] text-[var(--chip-fg)] ring-1 ring-inset ring-[var(--border)]"
            >
              {t}
            </span>
          ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        {p.codeHref && (
          <Link
            href={p.codeHref}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium leading-none hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
          >
            <svg
              width="1024"
              height="1024"
              viewBox="0 0 1024 1024"
              fill="none"
              className="h-4 w-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="currentColor"
                className="text-foreground"
              />
            </svg>
            <span>Code</span>
          </Link>
        )}
        {p.liveHref && (
          <Link
            href={p.liveHref}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium leading-none hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
          >
            Run demo
          </Link>
        )}
      </div>
    </div>
  );
}
