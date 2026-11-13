import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { listWriting } from '@/lib/writing';
import { readingMinutes } from '@/lib/reading-time';
import { ViewTransition } from '@/components/view-transition';

export default async function RecentBlogs() {
  const items = await listWriting();
  const recentPosts = items.filter((i) => i.kind === 'post').slice(0, 3);

  if (recentPosts.length === 0) {
    return (
      <p className="text-muted-foreground text-body">No blog posts yet.</p>
    );
  }

  return (
    <div className="-mx-3 space-y-1">
      {recentPosts.map((post) => {
        const dateStr = new Date(post.date).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });

        return (
          <Link
            key={`${post.kind}-${post.slug}`}
            href={post.href}
            className="group hover:bg-accent/60 block rounded-md px-3 py-2.5 transition-colors duration-150"
          >
            <div className="flex items-baseline gap-1.5">
              <ViewTransition name={`${post.kind}-title-${post.slug}`}>
                <h3 className="text-foreground-strong text-title">
                  {post.title}
                </h3>
              </ViewTransition>
              <ArrowRight className="text-muted-foreground size-3.5 shrink-0 -translate-x-1 opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0" />
            </div>
            <p className="text-muted-foreground text-meta mt-1">
              <time dateTime={post.date} className="tabular-nums">
                {dateStr}
              </time>
              {` · ${readingMinutes(post.content)} min read`}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
