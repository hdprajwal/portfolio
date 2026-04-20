import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/posts';
import TagChips from '@/components/projects/tag-chips';

function getReadTime(content?: string): number {
  if (!content) return 1;
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}

export default function BlogCardGrid({ post }: { post: Post }) {
  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const readTime = getReadTime(post.content);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="border-border relative aspect-video w-full overflow-hidden rounded-md border">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <TypographyBanner title={post.title} summary={post.summary} />
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-base font-semibold tracking-tight transition-colors md:text-lg">
          {post.title}
        </h3>

        {post.summary && (
          <p className="text-muted-foreground mt-1.5 line-clamp-2 text-sm leading-relaxed">
            {post.summary}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mt-3">
            <TagChips tags={post.tags} max={4} />
          </div>
        )}

        <div className="text-muted-foreground/60 mt-3 flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase">
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
      <span className="text-muted-foreground/60 font-mono text-[10px] tracking-wider uppercase">
        ❯ {slug}
      </span>
      <div>
        <div className="text-foreground line-clamp-2 font-mono text-lg font-semibold tracking-tight">
          {title}
        </div>
        {summary && (
          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-relaxed">
            {summary}
          </p>
        )}
      </div>
    </div>
  );
}
