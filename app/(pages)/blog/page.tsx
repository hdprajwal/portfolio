import Link from 'next/link';
import { Rss } from 'lucide-react';
import { listPosts } from '@/lib/posts';
import BlogCardGrid from '@/components/blogs/blog-card-grid';
import type { Metadata } from 'next';

export default async function BlogIndexPage() {
  const posts = await listPosts();
  return (
    <div className="flex-1">
      <div className="px-4 pt-14 pb-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-foreground text-heading-24 sm:text-heading-32">
            Blog
          </h1>
          <Link
            href="/rss.xml"
            className="text-muted-foreground hover:text-foreground text-label-14 inline-flex items-center gap-1.5 transition-colors"
            aria-label="RSS feed"
          >
            <Rss className="h-3.5 w-3.5" />
            <span>RSS</span>
          </Link>
        </div>
        <p className="text-muted-foreground text-copy-16 mt-3 max-w-3xl">
          Essays and notes on software engineering, security, applied AI, and
          the systems behind them. Occasional deep dives, mostly short.
        </p>
      </div>

      <div className="px-4 pb-16">
        {posts.length === 0 ? (
          <p className="text-muted-foreground text-copy-16">No posts yet.</p>
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
  title: 'Blog',
  description:
    'Writing on applied AI, backend systems, developer tools, and engineering tradeoffs. Essays, notes, and technical writeups by Prajwal HD.',
  alternates: {
    canonical: '/blog',
  },
};
