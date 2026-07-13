import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx/custom-mdx';
import ReadingProgress from '@/components/reading-progress';
import { formatDate, getBlogPosts, baseUrl } from '@/lib/posts';
import { type Post } from '@/lib/posts';
import ShareActions from '@/components/blogs/share-actions';
import { ViewTransition } from '@/components/view-transition';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { readingMinutes } from '@/lib/reading-time';
import { extractToc } from '@/lib/toc';
import { TocMinimap } from '@/registry/toc-minimap';

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
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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

  const readingMins = readingMinutes(post.content);
  const toc = extractToc(post.content ?? '');
  const shareUrl = `${baseUrl}/blog/${post.slug}`;
  const heroImage = post.image;
  const structuredDataImage = heroImage
    ? new URL(heroImage, baseUrl).toString()
    : undefined;
  const isExternalImg = heroImage ? /^https?:\/\//.test(heroImage) : false;

  return (
    <div className="bg-background relative min-h-screen overflow-x-hidden px-4 py-10 md:py-16">
      <TocMinimap items={toc} />
      <ReadingProgress />
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground text-label-16 inline-flex items-center gap-2 transition-colors"
        >
          Blog
        </Link>
        <ShareActions url={shareUrl} title={post.title} />
      </div>

      <div className="mx-auto max-w-3xl">
        <header className="mx-auto mt-4">
          <ViewTransition name={`post-title-${slug}`}>
            <h1 className="text-heading-24 md:text-heading-40 font-[450]! mt-3 text-balance">
              {post.title}
            </h1>
          </ViewTransition>
          <p className="text-muted-foreground text-copy-13 tracking-wider uppercase mt-4">
            {formatDate(post.date)} · {readingMins} min read
          </p>
        </header>
        {heroImage && (
          <ViewTransition name={`post-image-${slug}`}>
            <div className="border-border relative mt-10 w-full overflow-hidden rounded-lg border">
              <div className="bg-muted relative aspect-video w-full">
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
          </ViewTransition>
        )}
        <section className="w-full">
          <div className="mx-auto mt-10 w-full max-w-3xl min-w-0 md:mt-12">
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

            <article className="typeset typeset-notes min-w-0">
              <CustomMDX source={post.content} />
            </article>

            <hr className="border-border my-10" />

            <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between md:gap-8">
              {prev && (
                <Link href={`/blog/${prev.slug}`} className="group flex-1">
                  <div className="text-muted-foreground group-hover:text-foreground text-2xs mb-1 flex items-center gap-2 font-mono tracking-wider uppercase transition-colors">
                    <ArrowLeftIcon className="inline-block h-3.5 w-3.5" />
                    Newer
                  </div>
                  <div className="text-label-16 group-hover:underline">
                    {prev.title}
                  </div>
                </Link>
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex-1 md:text-right"
                >
                  <div className="text-muted-foreground group-hover:text-foreground text-2xs mb-1 flex items-center gap-2 font-mono tracking-wider uppercase transition-colors md:justify-end">
                    Older
                    <ArrowRightIcon className="inline-block h-3.5 w-3.5" />
                  </div>
                  <div className="text-label-16 group-hover:underline">
                    {next.title}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
