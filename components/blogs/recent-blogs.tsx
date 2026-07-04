import Link from 'next/link';
import { listPosts } from '@/lib/posts';

export default async function RecentBlogs() {
  const posts = await listPosts();
  const recentPosts = posts.slice(0, 6);

  if (recentPosts.length === 0) {
    return (
      <p className="text-muted-foreground text-copy-16">No blog posts yet.</p>
    );
  }

  return (
    <div className="divide-border divide-y">
      {recentPosts.map((post) => {
        const dateStr = new Date(post.date).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });

        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-baseline justify-between gap-4 py-4 first:pt-0"
          >
            <div className="flex min-w-0 items-baseline gap-3">
              <time
                dateTime={post.date}
                className="text-muted-foreground/60 text-label-13-mono shrink-0 tabular-nums"
              >
                {dateStr}
              </time>
              <span className="text-foreground group-hover:text-primary text-label-18 truncate transition-colors">
                {post.title}
              </span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="hidden shrink-0 gap-1.5 sm:flex">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-muted-foreground/50 text-label-12-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
