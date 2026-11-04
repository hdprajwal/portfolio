import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Post } from '@/lib/posts';
import { readingMinutes } from '@/lib/reading-time';
import { ViewTransition } from '@/components/view-transition';

function BlogRow({ post }: { post: Post }) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
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
      <div className="py-4">
        <span className="flex items-start gap-1.5">
          <ViewTransition name={`post-title-${post.slug}`}>
            <span className="text-foreground text-title text-pretty">
              {post.title}
            </span>
          </ViewTransition>
          <ArrowRight className="text-muted-foreground mt-[5px] size-3.5 shrink-0 -translate-x-1 opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:translate-x-0" />
        </span>
        {post.summary && (
          <span className="text-foreground-soft text-subtitle mt-0.5 line-clamp-2 text-pretty">
            {post.summary}
          </span>
        )}
        <span className="text-muted-foreground text-meta mt-2 block">
          <time dateTime={post.date} className="tabular-nums">
            {dateStr}
          </time>
          {' · '}
          {readTime} min read
        </span>
      </div>
    </div>
  );
}

export default function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="-mx-3 space-y-2">
      {posts.map((post) => (
        <BlogRow key={post.slug} post={post} />
      ))}
    </div>
  );
}
