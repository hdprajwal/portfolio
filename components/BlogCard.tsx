import Link from 'next/link';
import type { Post } from '@/lib/posts';

export default function BlogCard({ post }: { post: Post }) {
  const dateStr = new Date(post.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block grid-row p-6 transition-colors hover:bg-[var(--muted)]">
      <article>
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs border px-2 py-0.5 rounded tracking-wide text-term-yellow border-term-yellow/30">
            BLOG
          </span>
          <time
            dateTime={post.date}
            className="font-mono text-[11px] text-muted-foreground"
          >
            {dateStr}
          </time>
        </div>

        <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
          {post.title}
        </h3>
        {post.summary && (
          <p className="text-sm text-muted-foreground leading-relaxed">{post.summary}</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-dashed border-[var(--border)] flex flex-wrap gap-3 text-xs text-muted-foreground font-bold">
            {post.tags.map((t, idx) => (
              <span key={t}>
                {idx > 0 && <span className="mr-3">•</span>}
                {t}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
