import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/MDX';
import { formatDate, getBlogPosts, baseUrl } from '@/lib/posts';
import { type Post } from '@/lib/posts';

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

  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 overflow-x-hidden">
      <Link
        href="/blog"
        className="mb-8 inline-block text-sm text-muted-foreground hover:underline"
      >
        ← Back to all blogs
      </Link>

      <section className="flex flex-col w-full">
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
        <h1 className="title font-semibold break-words text-2xl md:text-4xl xl:text-5xl tracking-tighter mb-2">
          {post.title}
        </h1>
        <div className="flex flex-col justify-start items-start mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            {formatDate(post.date)}
          </p>
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
        </div>
        <article className="w-full max-w-none min-w-0 prose prose-sm md:prose-base break-words dark:prose-invert lg:prose-lg">
          <CustomMDX source={post.content} />
        </article>
      </section>
    </main>
  );
}
