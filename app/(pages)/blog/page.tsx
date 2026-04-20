import { listPosts } from '@/lib/posts';
import BlogCardGrid from '@/components/blogs/blog-card-grid';
import type { Metadata } from 'next';

export default async function BlogIndexPage() {
  const posts = await listPosts();
  return (
    <div className="flex-1">
      <div className="px-4 pt-14 pb-8">
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          Blogs
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">
          Essays and notes on software engineering, security, applied AI, and
          the systems behind them. Occasional deep dives, mostly short.
        </p>
      </div>

      <div className="px-4 pb-16">
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-[0.9rem]">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {posts.map((p) => (
              <BlogCardGrid key={p.slug} post={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Writing on backend systems, developer tools, applied AI, and engineering tradeoffs. Essays, notes, and technical writeups by Prajwal HD.',
  alternates: {
    canonical: '/blog',
  },
};
