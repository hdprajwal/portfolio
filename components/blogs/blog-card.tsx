import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { Clock } from 'lucide-react';
import { readingMinutes } from '@/lib/reading-time';

export default function BlogCard({ post }: { post: Post }) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
  const readTime = readingMinutes(post.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group border-border block border-b py-4 transition-all duration-200 first:pt-0 last:border-b-0 hover:pl-2"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="group-hover:text-foreground text-label-18 transition-colors">
          {post.title}
        </span>
        <time
          dateTime={post.date}
          className="text-muted-foreground text-label-14-mono shrink-0 tabular-nums opacity-70"
        >
          {dateStr}
        </time>
      </div>

      {post.summary && (
        <p className="text-muted-foreground text-copy-14 mt-1 line-clamp-1">
          {post.summary}
        </p>
      )}

      <div className="mt-2 flex items-center gap-3">
        <span className="text-muted-foreground text-label-14-mono opacity-60">
          <Clock className="inline-block size-3" /> {readTime} min read
        </span>
        {post.tags?.slice(0, 2).map((tag) => (
          <span key={tag} className="text-muted-foreground text-label-14-mono">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
