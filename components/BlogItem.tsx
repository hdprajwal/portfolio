"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function BlogItem({
  title,
  date,
  summary,
  href,
}: {
  title: string;
  date: string;
  summary: string;
  href: string;
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
    <li className="rounded-md border border-[var(--border)] bg-[var(--card)] p-5">
      <Link href={href} className="group block">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-medium group-hover:underline">{title}</h3>
          <time
            dateTime={date}
            className="font-mono text-xs text-[var(--muted-fg)]"
          >
            {d}
          </time>
        </div>
        <p className="mt-1 text-sm text-[var(--muted-fg)]">{summary}</p>
      </Link>
    </li>
  );
}
