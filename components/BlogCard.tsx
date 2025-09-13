import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/posts';

export default function BlogCard({ post }: { post: Post }) {
  const dateStr = new Date(post.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });

  const isExternal = typeof post.image === 'string' && /^https?:\/\//.test(post.image);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-md border border-[var(--border)] bg-[var(--card)]">
        <div className="relative aspect-[16/9] w-full bg-[var(--muted)]">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={isExternal}
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--muted)] to-[var(--accent)]" />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-base sm:text-lg font-semibold group-hover:underline">
            {post.title}
          </h3>
          <time
            dateTime={post.date}
            className="mt-1 block font-mono text-[11px] text-muted-foreground"
          >
            {dateStr}
          </time>
          {post.summary && (
            <p className="mt-2 text-sm text-muted-foreground">{post.summary}</p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-[var(--chip)] px-2 py-1 font-mono text-[10px] text-[var(--chip-fg)] ring-1 ring-inset ring-[var(--border)]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
