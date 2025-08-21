"use client";

import { useMemo } from "react";

export default function ChangelogItem({
  version,
  date,
  bullets,
}: {
  version: string;
  date: string;
  bullets: string[];
}) {
  const d = useMemo(
    () =>
      new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
    [date]
  );
  return (
    <article className="rounded-md border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{version}</h3>
        <time
          dateTime={date}
          className="font-mono text-xs text-[var(--muted-fg)]"
        >
          {d}
        </time>
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted-fg)]">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </article>
  );
}
