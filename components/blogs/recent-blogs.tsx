import Link from 'next/link';
import { listPosts } from '@/lib/posts';

export default async function RecentBlogs() {
  const posts = await listPosts();
  const recentPosts = posts.slice(0, 6);

  if (recentPosts.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">No blog posts yet.</p>
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
            className="group flex items-baseline justify-between gap-4 py-3 first:pt-0"
          >
            <div className="flex min-w-0 items-baseline gap-3">
              <time
                dateTime={post.date}
                className="text-muted-foreground/60 shrink-0 font-mono text-xs tabular-nums"
              >
                {dateStr}
              </time>
              <span className="text-foreground group-hover:text-primary truncate text-sm transition-colors">
                {post.title}
              </span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="hidden shrink-0 gap-1.5 sm:flex">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-muted-foreground/50 font-mono text-[10px]"
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
