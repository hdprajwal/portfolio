import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug} — Prajwal HD` };
}

export default async function BlogPostPlaceholder({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        {slug.replace(/-/g, ' ')}
      </h1>
      <p className="mt-2 text-[var(--muted-fg)]">
        Post coming soon. Check back later.
      </p>
      <Link href="/blog" className="mt-6 inline-block underline">
        ← Back to all posts
      </Link>
    </main>
  );
}
