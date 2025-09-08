import Link from 'next/link';
import { listPosts } from '@/lib/posts';

export default async function BlogIndexPage() {
  const posts = await listPosts();
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Essays, notes, and quick TILs.
        </p>
      </header>

      <ul className="mt-6 space-y-4">
        {posts.map((p) => (
          <li
            key={p.slug}
            className="rounded-md border border-[var(--border)] bg-[var(--card)] p-5"
          >
            <Link href={`/blog/${p.slug}`} className="group block">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h2 className="text-lg font-medium group-hover:underline">
                  {p.title}
                </h2>
                <time
                  dateTime={p.date}
                  className="font-mono text-xs text-muted-foreground"
                >
                  {new Date(p.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })}
                </time>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
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
            </Link>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="rounded-md border border-[var(--border)] bg-[var(--card)] p-6 text-muted-foreground">
            No posts yet.
          </li>
        )}
      </ul>
    </main>
  );
}
