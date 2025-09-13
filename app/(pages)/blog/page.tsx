import { listPosts } from '@/lib/posts';
import Reveal from '@/components/Reveal';
import BlogCard from '@/components/BlogCard';
import type { Metadata } from 'next';

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

      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={i * 60}>
              <BlogCard post={p} />
            </Reveal>
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

export const metadata: Metadata = {
  title: 'Blogs',
};
