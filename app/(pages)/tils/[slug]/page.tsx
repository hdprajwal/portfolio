import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { CustomMDX } from '@/components/mdx/custom-mdx';
import TagChips from '@/components/projects/tag-chips';
import { ViewTransition } from '@/components/view-transition';
import { formatDate, listTILs, getTIL, baseUrl } from '@/lib/tils';
import { type TIL } from '@/lib/tils';

export async function generateStaticParams() {
  let tils = await listTILs();

  return tils.map((til: TIL) => ({
    slug: til.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tils = await listTILs();
  let til = tils.find((til: TIL) => til.slug === slug);

  if (!til) {
    return { title: 'TIL Not Found' };
  }

  let { title, date: publishedTime, description } = til;

  return {
    title: `${title} | TIL`,
    description,
    alternates: {
      canonical: `/tils/${til.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/tils/${til.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function TilPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const til = await getTIL(slug);

  if (!til) {
    notFound();
  }

  const tils = await listTILs();
  const index = tils.findIndex((t) => t.slug === slug);
  const prev = index > 0 ? tils[index - 1] : null;
  const next = index < tils.length - 1 ? tils[index + 1] : null;

  return (
    <div className="bg-background relative min-h-screen overflow-x-hidden px-4 py-10 md:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: til.title,
              datePublished: til.date,
              dateModified: til.date,
              description: til.description,
              url: `${baseUrl}/tils/${til.slug}`,
              author: {
                '@type': 'Person',
                '@id': `${baseUrl}/#person`,
                name: 'Prajwal HD',
              },
            }),
          }}
        />
        <Link
          href="/tils"
          className="text-muted-foreground hover:text-foreground text-label-16 inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeftIcon className="inline-block h-4 w-4" />
          TILs
        </Link>

        <header className="mt-10 md:mt-12">
          <p className="text-muted-foreground text-2xs font-mono tracking-wider uppercase">
            TIL · {formatDate(til.date)}
          </p>
          <ViewTransition name={`til-title-${til.slug}`}>
            <h1 className="text-heading-24 md:text-heading-32 mt-3 text-balance">
              {til.title}
            </h1>
          </ViewTransition>
          {til.tags && til.tags.length > 0 && (
            <TagChips tags={til.tags} className="mt-4 flex flex-wrap gap-1.5" />
          )}
        </header>

        <article className="typeset typeset-notes mt-8 w-full min-w-0">
          <CustomMDX source={til.content} />
        </article>

        <hr className="border-border my-10" />

        <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:justify-between md:gap-8">
          {prev && (
            <Link href={`/tils/${prev.slug}`} className="group flex-1">
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
              href={`/tils/${next.slug}`}
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
    </div>
  );
}
