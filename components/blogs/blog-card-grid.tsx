import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/posts';
import TagChips from '@/components/projects/tag-chips';
import { readingMinutes } from '@/lib/reading-time';
import { ViewTransition } from '@/components/view-transition';

export default function BlogCardGrid({ post }: { post: Post }) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const readTime = readingMinutes(post.content);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <ViewTransition name={post.image ? `post-image-${post.slug}` : undefined}>
        <div className="border-border relative aspect-video w-full overflow-hidden rounded-lg border">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <TypographyBanner title={post.title} summary={post.summary} />
          )}
        </div>
      </ViewTransition>

      <div className="mt-4">
        <ViewTransition name={`post-title-${post.slug}`}>
          <h3 className="text-foreground group-hover:text-primary text-label-18 line-clamp-2 transition-colors">
            {post.title}
          </h3>
        </ViewTransition>

        {post.summary && (
          <p className="text-muted-foreground text-copy-16 mt-1.5 line-clamp-2">
            {post.summary}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mt-3">
            <TagChips tags={post.tags} max={4} />
          </div>
        )}

        <div className="text-muted-foreground/60 text-3xs mt-3 flex items-center gap-2 font-mono tracking-wider uppercase">
          <time dateTime={post.date} className="tabular-nums">
            {dateStr}
          </time>
          <span className="text-muted-foreground/40">·</span>
          <span>{readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}

function TypographyBanner({
  title,
  summary,
}: {
  title: string;
  summary?: string;
}) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return (
    <div className="bg-muted/30 flex h-full w-full flex-col justify-between p-6">
      <span className="text-muted-foreground/60 text-3xs font-mono tracking-wider uppercase">
        ❯ {slug}
      </span>
      <div>
        <div className="text-foreground line-clamp-2 font-mono text-lg font-semibold tracking-tight">
          {title}
        </div>
        {summary && (
          <p className="text-muted-foreground text-copy-14 mt-1 line-clamp-2">
            {summary}
          </p>
        )}
      </div>
    </div>
  );
}
