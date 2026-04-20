import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { Post } from '@/lib/posts';

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
      className="group flex flex-col py-4 border-b border-dotted border-border transition-[padding-left,border-color] duration-200 ease-out hover:pl-2 hover:border-muted-foreground"
    >
      {/* date visible only on mobile, above title */}
      <time
        dateTime={post.date}
        className="sm:hidden font-mono text-sm text-muted-foreground tabular-nums mb-0.5"
      >
        {dateStr}
      </time>

      {/* title row — date joins on the right at sm+ */}
      <div className="flex justify-between items-baseline">
        <span className="text-base group-hover:text-foreground transition-colors">
          {post.title}
        </span>
        <time
          dateTime={post.date}
          className="hidden sm:inline font-mono text-sm text-muted-foreground tabular-nums shrink-0 ml-4"
        >
          {dateStr}
        </time>
      </div>

      {/* readtime then tags */}
      <div className="flex items-center gap-3 mt-1.5">
        <span className="flex items-center gap-1 font-mono text-xs text-muted-foreground">
          <Clock size={10} />
          {readTime} min read
        </span>
        {post.tags?.slice(0, 2).map((tag) => (
          <span key={tag} className="font-mono text-xs text-muted-foreground">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
