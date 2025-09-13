import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/MDX';
import ReadingProgress from '@/components/ReadingProgress';
import { formatDate, getBlogPosts, baseUrl } from '@/lib/posts';
import { type Post } from '@/lib/posts';
import ArticleToc from '@/components/ArticleToc';
import SidebarActions from '@/components/SidebarActions';

export async function generateStaticParams() {
  let posts = await getBlogPosts();

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getBlogPosts();
  let post = posts.find((post: Post) => post.slug === slug);

  if (!post) {
    return { title: 'Post Not Found — Prajwal HD' };
  }

  let { title, date: publishedTime, summary: description } = post;
  let ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title: `${title} — Prajwal HD`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  let post = posts.find((post: Post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const index = posts.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;

  const words = (post.content || '').trim().split(/\s+/).filter(Boolean).length;
  const readingMins = Math.max(1, Math.round(words / 225));
  const shareUrl = `${baseUrl}/blog/${post.slug}`;
  const heroImage = post.image || `${baseUrl}/og?title=${encodeURIComponent(post.title)}`;
  const isExternalImg = /^https?:\/\//.test(heroImage);

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 md:py-12 overflow-x-hidden min-h-screen relative">
      <ReadingProgress targetSelector="article" />
      <div className="mb-6 mx-auto w-full max-w-4xl">
        <Link
          href="/blog"
          className="inline-block text-sm text-muted-foreground hover:underline"
        >
          ← Back to all blogs
        </Link>
      </div>

      <div className="relative mx-auto mb-8 w-full max-w-5xl overflow-hidden rounded-lg border border-[var(--border)]">
        <div className="relative aspect-[16/6] w-full bg-[var(--muted)]">
          <Image
            src={heroImage}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized={isExternalImg}
            priority={false}
          />
        </div>
      </div>
        <header className="mb-6">
          <h1 className="title mb-2 break-words text-3xl font-semibold tracking-tight md:text-4xl xl:text-5xl">
            {post.title}
          </h1>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            <span aria-hidden>•</span>
            <span>{readingMins} min read</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-md bg-[var(--chip)] px-2 py-1 font-mono text-[10px] text-[var(--chip-fg)] ring-1 ring-inset ring-[var(--border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

      <section className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_200px]">
        <div className="mx-auto w-full max-w-4xl min-w-0">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              datePublished: post.date,
              dateModified: post.date,
              description: post.summary,
              image: `${baseUrl}/og?title=${encodeURIComponent(post.title)}`,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                '@type': 'Person',
                name: 'Prajwal HD',
              },
            }),
          }}
        />

        <article className="w-full min-w-0 max-w-none prose prose-sm break-words dark:prose-invert md:prose-base lg:prose-lg">
          <CustomMDX source={post.content} />
        </article>

        <hr className="my-10 border-[var(--border)]" />

        <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between">
          {prev && (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex-1 rounded-md border border-[var(--border)] p-4 hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
            >
              <div className="mb-1 text-xs text-muted-foreground">Previous</div>
              <div className="font-medium group-hover:underline">{prev.title}</div>
            </Link>
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex-1 rounded-md border border-[var(--border)] p-4 text-right hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]"
            >
              <div className="mb-1 text-xs text-muted-foreground">Next</div>
              <div className="font-medium group-hover:underline">{next.title}</div>
            </Link>
          )}
        </div>
        </div>
        <aside className="hidden lg:block self-start sticky top-24 h-fit">
          <div className="w-[200px] space-y-6">
            <SidebarActions url={shareUrl} title={post.title} />
            <ArticleToc targetSelector="article" headings="h2, h3" />
          </div>
        </aside>
      </section>
    </main>
  );
}
