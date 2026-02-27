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
      <div className="mx-auto mb-6 w-full max-w-4xl">
        <Link
          href="/tils"
          className="text-primary inline-block text-sm hover:underline"
        >
          ← Back to all TILs
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="title mb-4 text-2xl font-semibold tracking-tight text-balance">
          {til.title}
        </h1>
        <div className="text-muted-foreground mb-4 flex flex-wrap items-center gap-3 text-sm">
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
          <article className="prose prose-sm dark:prose-invert md:prose-base w-full max-w-none min-w-0 break-words">
            <CustomMDX source={til.content} />
          </article>

          <hr className="border-border my-10" />

          <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between">
            {prev && (
              <Link
                href={`/tils/${prev.slug}`}
                className="group border-border hover:bg-accent hover:text-accent-foreground flex-1 rounded-md border p-4"
              >
                <div className="text-muted-foreground mb-1 text-xs">
                  Previous
                </div>
                <div className="font-medium group-hover:underline">
                  {prev.title}
                </div>
              </Link>
            )}
            {next && (
              <Link
                href={`/tils/${next.slug}`}
                className="group border-border hover:bg-accent hover:text-accent-foreground flex-1 rounded-md border p-4 text-right"
              >
                <div className="text-muted-foreground mb-1 text-xs">Next</div>
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
