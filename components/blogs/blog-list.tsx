import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/posts';
import { readingMinutes } from '@/lib/reading-time';
import { ViewTransition } from '@/components/view-transition';

function BlogRow({ post }: { post: Post }) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const readTime = readingMinutes(post.content);

  return (
    <div className="group hover:bg-accent/60 relative rounded-md px-3 transition-colors duration-150">
      <Link
        href={`/blog/${post.slug}`}
        className="absolute inset-0"
        aria-label={post.title}
      />
      <div className="flex items-center gap-4 py-3">
        <span className="min-w-0 flex-1">
          <ViewTransition name={`post-title-${post.slug}`}>
            <span className="text-foreground text-title block">
              {post.title}
            </span>
          </ViewTransition>
          {post.summary && (
            <span className="text-muted-foreground text-subtitle block truncate">
              {post.summary}
            </span>
          )}
          <span className="text-muted-foreground text-meta mt-1 block sm:hidden">
            <time dateTime={post.date} className="tabular-nums">
              {dateStr}
            </time>
            {' · '}
            {readTime} min read
          </span>
        </span>
        <span className="text-muted-foreground text-meta hidden shrink-0 items-center gap-1 sm:inline-flex">
          <time dateTime={post.date} className="tabular-nums">
            {dateStr}
          </time>
          <span>·</span>
          {readTime} min read
          <ArrowRight className="group-hover:text-foreground ml-0.5 h-3.5 w-3.5 transition-[color,transform] duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  );
}

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="-mx-3">
      {posts.map((post) => (
        <BlogRow key={post.slug} post={post} />
      ))}
    </div>
  );
}
