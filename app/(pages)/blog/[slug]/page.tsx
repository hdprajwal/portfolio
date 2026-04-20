import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx/custom-mdx';
import ReadingProgress from '@/components/reading-progress';
import { formatDate, getBlogPosts, baseUrl } from '@/lib/posts';
import { type Post } from '@/lib/posts';
import ShareActions from '@/components/blogs/share-actions';
import { ArrowLeftIcon, ArrowRightIcon, Clock } from 'lucide-react';
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
  const socialImage = post.image
    ? new URL(post.image, baseUrl).toString()
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      ...(socialImage
        ? {
            images: [
              {
                url: socialImage,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: socialImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(socialImage ? { images: [socialImage] } : {}),
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
  const heroImage = post.image;
  const structuredDataImage = heroImage
    ? new URL(heroImage, baseUrl).toString()
    : undefined;
  const isExternalImg = heroImage ? /^https?:\/\//.test(heroImage) : false;

  return (
    <div className="bg-background relative min-h-screen overflow-x-hidden px-4 py-10 md:py-12">
      <ReadingProgress />
      <div className="mb-6 flex w-full items-center justify-between">
        <Link
          href="/blog"
          className="text-primary inline-flex items-center gap-2 text-base hover:underline"
        >
          <ArrowLeftIcon className="inline-block h-4 w-4" />
          Blogs
        </Link>
        <div>
          <ShareActions url={shareUrl} title={post.title} />
        </div>
      </div>

      <header className="mb-8">
        <h1 className="mt-7 mb-6 text-3xl font-semibold md:text-5xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-base">
          <span className="text-muted-foreground">{formatDate(post.date)}</span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {readingMins} min read
          </span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
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
      {heroImage && (
        <div className="border-border relative mb-8 w-full overflow-hidden rounded-lg border">
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
      <Separator className="mt-8 mb-16" />
      <section className="w-full">
        <div className="w-full min-w-0">
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
                ...(structuredDataImage
                  ? {
                      image: structuredDataImage,
                    }
                  : {}),
                url: `${baseUrl}/blog/${post.slug}`,
                author: {
                  '@type': 'Person',
                  name: 'Prajwal HD',
                },
              }),
            }}
          />

          <article className="prose prose-sm dark:prose-invert md:prose-base mx-auto max-w-4xl min-w-0 break-words">
            <CustomMDX source={post.content} />
          </article>

          <hr className="border-border my-10" />

          <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between">
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="group flex-1">
                <div className="text-muted-foreground group-hover:text-foreground mb-1 flex items-center gap-2 text-sm">
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
                <div className="text-muted-foreground group-hover:text-foreground mb-1 flex items-center justify-end gap-2 text-sm">
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
