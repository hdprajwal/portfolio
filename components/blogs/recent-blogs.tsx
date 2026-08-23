import Link from 'next/link';
import { listPosts } from '@/lib/posts';
import { ViewTransition } from '@/components/view-transition';

export default async function RecentBlogs() {
  const posts = await listPosts();
  const recentPosts = posts.slice(0, 6);

  if (recentPosts.length === 0) {
    return (
      <p className="text-muted-foreground text-read-14">No blog posts yet.</p>
    );
  }

  return (
    <div className="space-y-5.5">
      {recentPosts.map((post) => {
        const dateStr = new Date(post.date).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });
        const tags = post.tags?.slice(0, 2) ?? [];

        return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <ViewTransition name={`post-title-${post.slug}`}>
              <h3 className="text-foreground text-title-14 group-hover:underline group-hover:underline-offset-3">
                {post.title}
              </h3>
            </ViewTransition>
            <p className="text-muted-foreground text-label-11-mono mt-0.5">
              <time dateTime={post.date} className="tabular-nums">
                {dateStr}
              </time>
              {tags.length > 0 && ` · ${tags.join(', ')}`}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
