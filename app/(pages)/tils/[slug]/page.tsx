import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx/custom-mdx';
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
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/tils/${til.slug}`,
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
    <div className="bg-background relative container mx-auto min-h-screen max-w-4xl overflow-x-hidden px-4 py-10 md:py-12">
      <div className="mb-6 mx-auto w-full max-w-4xl">
        <Link
          href="/tils"
          className="inline-block text-sm text-primary hover:underline"
        >
          ← Back to all TILs
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="title mb-4 break-words text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {til.title}
        </h1>
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{formatDate(til.date)}</span>
        </div>
        {til.tags && til.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {til.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-muted text-muted-foreground ring-border rounded-md px-2 py-1 font-mono text-[10px] ring-1 ring-inset"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <section className="mx-auto w-full max-w-4xl">
        <div className="mx-auto w-full max-w-4xl min-w-0">
          <article className="w-full min-w-0 max-w-none prose prose-sm break-words dark:prose-invert md:prose-base">
            <CustomMDX source={til.content} />
          </article>

          <hr className="my-10 border-border" />

          <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between">
            {prev && (
              <Link
                href={`/tils/${prev.slug}`}
                className="group flex-1 rounded-md border border-border p-4 hover:bg-accent hover:text-accent-foreground"
              >
                <div className="mb-1 text-xs text-muted-foreground">Previous</div>
                <div className="font-medium group-hover:underline">{prev.title}</div>
              </Link>
            )}
            {next && (
              <Link
                href={`/tils/${next.slug}`}
                className="group flex-1 rounded-md border border-border p-4 text-right hover:bg-accent hover:text-accent-foreground"
              >
                <div className="mb-1 text-xs text-muted-foreground">Next</div>
                <div className="font-medium group-hover:underline">{next.title}</div>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
