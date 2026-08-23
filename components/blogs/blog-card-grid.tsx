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

      <div className="mt-3">
        <ViewTransition name={`post-title-${post.slug}`}>
          <h3 className="text-foreground text-title-14 line-clamp-2 group-hover:underline group-hover:underline-offset-3">
            {post.title}
          </h3>
        </ViewTransition>

        {post.summary && (
          <p className="text-muted-foreground text-read-13 mt-1 line-clamp-2">
            {post.summary}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mt-2.5">
            <TagChips tags={post.tags} max={4} />
          </div>
        )}

        <div className="text-muted-foreground text-label-11-mono mt-2.5 flex items-center gap-2">
          <time dateTime={post.date} className="tabular-nums">
            {dateStr}
          </time>
          <span>·</span>
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
    <div className="bg-muted flex h-full w-full flex-col justify-between px-4 py-3.5">
      <span className="text-muted-foreground text-label-11-mono tracking-wider">
        ❯ {slug}
      </span>
      <div>
        <div className="text-foreground text-title-15 line-clamp-2">
          {title}
        </div>
        {summary && (
          <p className="text-muted-foreground text-read-12 mt-0.5 line-clamp-2">
            {summary}
          </p>
        )}
      </div>
    </div>
  );
}
