import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return { title: `${params.slug} — Prajwal HD` };
}

export default function BlogPostPlaceholder({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">
        {params.slug.replace(/-/g, " ")}
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
