'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import SiteHeader from '@/components/SiteHeader';

export default function NotFound() {
  const [path, setPath] = useState('/unknown');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined')
      setPath(window.location.pathname || '/unknown');
  }, []);

  const copyCurl = async () => {
    const url =
      typeof window !== 'undefined'
        ? window.location.href
        : `https://hdprajwal.dev${path}`;
    const cmd = `curl -i ${url}`;
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <main className="min-h-screen">
      <div className="bg-[var(--bg)] text-[var(--fg)]">
        <SiteHeader />
        <div className="relative isolate min-h-screen bg-[var(--bg)] text-[var(--fg)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-20 [background:repeating-linear-gradient(90deg,var(--grid)_0_1px,transparent_1px_64px),repeating-linear-gradient(0deg,var(--grid)_0_1px,transparent_1px_64px)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32 -z-10 bg-gradient-to-b from-transparent to-[var(--bg)]"
          />

          <div className="container mx-auto max-w-4xl px-4 py-20">
            {/* Header / logo */}
            <div className="mb-6 flex items-center gap-2">
              <span className="text-muted-foreground">/ 404</span>
            </div>

            {/* Terminal block */}
            <section className="rounded-md border border-[var(--border)] bg-[var(--card)] p-6">
              <h1 className="mb-2 text-2xl font-bold tracking-tight">
                File not found
              </h1>
              <p className="mb-4 text-sm text-muted-foreground">
                The path you requested doesn't exist or moved.
              </p>

              <div
                className="rounded-md bg-[var(--chip)] p-4 font-mono text-sm text-[var(--chip-fg)] ring-1 ring-inset ring-[var(--border)]"
                role="alert"
                aria-live="polite"
              >
                <Line prompt="$" cmd={`curl -i https://hdprajwal.dev${path}`} />
                <Line output={`HTTP/1.1 404 Not Found\n> path: ${path}`} />
                <Line prompt="$" cmd="ls /" />
                <Line output="blog/ projects/ cv/ now/" />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center rounded-md bg-[var(--fg)] px-4 py-2 text-xs font-medium text-[var(--bg)] hover:opacity-90"
                >
                  Go home
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-xs hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
                >
                  View projects
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center rounded-md border border-[var(--border)] px-4 py-2 text-xs hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
                >
                  Read the blog
                </Link>
              </div>
              <div className="mt-6 text-xs text-muted-foreground">
                If you believe this is a broken link,{' '}
                <a
                  className="underline"
                  href="mailto:hdprajwal01@gmail.com?subject=404%20on%20site&body=Missing:%20"
                >
                  email me
                </a>
                .
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function Line({
  prompt,
  cmd,
  output,
}: {
  prompt?: string;
  cmd?: string;
  output?: string;
}) {
  if (output)
    return (
      <pre className="whitespace-pre-wrap text-[var(--chip-fg)]">{output}</pre>
    );
  return (
    <div className="flex items-start gap-2">
      <span className="text-muted-foreground">{prompt}</span>
      <code className="text-[var(--chip-fg)]">{cmd}</code>
    </div>
  );
}
