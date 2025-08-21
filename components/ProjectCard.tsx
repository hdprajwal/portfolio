"use client";

import Link from "next/link";

export default function ProjectCard({
  name,
  tagline,
  flags,
  impact,
  codeHref,
  liveHref,
}: {
  name: string;
  tagline: string;
  flags: string[];
  impact: string;
  codeHref?: string;
  liveHref?: string;
}) {
  return (
    <div className="group rounded-md border border-[var(--border)] bg-[var(--card)] p-6 transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-[var(--muted-fg)]">{tagline}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {flags.map((f) => (
          <span
            key={f}
            className="rounded-md-md bg-[var(--chip)] px-2 py-1 font-mono text-[10px] text-[var(--chip-fg)] ring-1 ring-inset ring-[var(--border)]"
          >
            {f}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm text-[var(--muted-fg)]">{impact}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {liveHref && (
          <Link
            href={liveHref}
            className="inline-flex items-center rounded-md bg-[var(--fg)] px-3 py-1.5 text-xs font-medium text-[var(--bg)] hover:opacity-90"
          >
            Run demo
          </Link>
        )}
        {codeHref && (
          <Link
            href={codeHref}
            className="inline-flex items-center rounded-md border border-[var(--border)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
          >
            Code
          </Link>
        )}
      </div>
    </div>
  );
}
