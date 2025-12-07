import { listPosts } from '@/lib/posts';
import Reveal from '@/components/Reveal';
import BlogCard from '@/components/BlogCard';
import type { Metadata } from 'next';

export default async function BlogIndexPage() {
  const posts = await listPosts();
  return (
    <div className="flex-1 bg-background">
      <section className="grid-row p-6">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">Writing</h1>
        <p className="text-sm text-muted-foreground">
          Essays, notes, and quick TILs.
        </p>
      </section>

      {posts.map((p, i) => (
        <Reveal key={p.slug} delay={i * 60}>
          <BlogCard post={p} />
        </Reveal>
      ))}

      {posts.length === 0 && (
        <div className="grid-row p-6">
          <p className="text-muted-foreground">
            No posts yet.
          </p>
        </div>
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Blogs',
};
