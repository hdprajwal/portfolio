import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx/custom-mdx';
import ReadingProgress from '@/components/reading-progress';
import { formatDate, getBlogPosts, baseUrl } from '@/lib/posts';
import { type Post } from '@/lib/posts';
import ShareActions from '@/components/blogs/share-actions';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
    return { title: 'Post Not Found' };
  }

  let { title, date: publishedTime, summary: description } = post;
  let ogImage = `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
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
  const heroImage =
    post.image || `${baseUrl}/og?title=${encodeURIComponent(post.title)}`;
  const isExternalImg = /^https?:\/\//.test(heroImage);

  return (
    <div className="bg-background relative container mx-auto min-h-screen max-w-4xl overflow-x-hidden px-4 py-10 md:py-12">
      <ReadingProgress targetSelector="article" />
      <div className="mx-auto mb-6 flex w-full max-w-4xl items-center justify-between">
        <Link
          href="/blog"
          className="text-primary inline-flex items-center gap-2 text-sm hover:underline"
        >
          <ArrowLeftIcon className="inline-block h-4 w-4" />
          Blogs
        </Link>
        <div>
          <ShareActions url={shareUrl} title={post.title} />
        </div>
      </div>

      <header className="mb-8">
        <h1 className="mb-4 text-[1.2rem] leading-[1.2] font-bold tracking-tight text-balance break-words md:text-[1.8rem]">
          {post.title}
        </h1>
        <div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-2 text-xs">
          <span>{formatDate(post.date)}</span>
          <span aria-hidden>•</span>
          <span>{readingMins} min read</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-muted text-muted-foreground rounded px-[0.6rem] py-[0.2rem] font-mono text-xs lowercase"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      {post.image && (
        <div className="border-border relative mx-auto mb-8 w-full max-w-5xl overflow-hidden rounded-lg border">
          <div className="bg-muted relative aspect-[16/9] w-full">
            <Image
              src={heroImage}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized={isExternalImg}
              priority
            />
          </div>
        </div>
      )}
      <Separator />
      <section className="mx-auto mt-8 w-full max-w-4xl">
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

          <article className="prose prose-sm dark:prose-invert md:prose-base w-full max-w-none min-w-0 break-words">
            <CustomMDX source={post.content} />
          </article>

          <hr className="border-border my-10" />

          <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between">
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="group flex-1">
                <div className="text-muted-foreground group-hover:text-foreground mb-1 flex items-center gap-2 text-xs">
                  <ArrowLeftIcon className="inline-block h-4 w-4" />
                  New
                </div>
                <div className="font-medium group-hover:underline">
                  {prev.title}
                </div>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="group hover:text-accent-foreground flex-1 text-right"
              >
                <div className="text-muted-foreground group-hover:text-foreground mb-1 flex items-center justify-end gap-2 text-xs">
                  Old
                  <ArrowRightIcon className="inline-block h-4 w-4" />
                </div>
                <div className="font-medium group-hover:underline">
                  {next.title}
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
