import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
            <div className="flex items-baseline gap-1.5">
              <ViewTransition name={`post-title-${post.slug}`}>
                <h3 className="text-foreground text-title-14 group-hover:underline group-hover:underline-offset-3">
                  {post.title}
                </h3>
              </ViewTransition>
              <ArrowRight className="text-muted-foreground size-3.5 shrink-0 -translate-x-1 opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0" />
            </div>
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
