import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { Clock } from 'lucide-react';

function getReadTime(content?: string): number {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogCard({ post }: { post: Post }) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
  const readTime = getReadTime(post.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group border-border block border-b py-4 transition-all duration-200 first:pt-0 last:border-b-0 hover:pl-2"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="group-hover:text-foreground text-sm font-medium tracking-tight transition-colors">
          {post.title}
        </span>
        <time
          dateTime={post.date}
          className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums opacity-70"
        >
          {dateStr}
        </time>
      </div>

      {post.summary && (
        <p className="text-muted-foreground mt-1 line-clamp-1 text-xs leading-relaxed">
          {post.summary}
        </p>
      )}

      <div className="mt-2 flex items-center gap-3">
        <span className="text-muted-foreground font-mono text-xs opacity-60">
          <Clock className="inline-block size-3" /> {readTime} min read
        </span>
        {post.tags?.slice(0, 2).map((tag) => (
          <span key={tag} className="text-muted-foreground font-mono text-xs">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
