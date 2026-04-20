import Link from 'next/link';
import type { Post } from '@/lib/posts';

export default function BlogCard({ post }: { post: Post }) {
  const dateStr = new Date(post.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block grid-row p-4 transition-colors hover:bg-muted">
      <article>
        <div className="flex justify-between items-start mb-3">
          <time
            dateTime={post.date}
            className="font-mono text-xs text-muted-foreground"
          >
            {dateStr}
          </time>
        </div>

        <h3 className="text-base mb-2 group-hover:underline transition-colors">
          {post.title}
        </h3>
        {post.summary && (
          <p className="text-sm text-muted-foreground leading-relaxed">{post.summary}</p>
        )}
      </article>
    </Link>
  );
}
