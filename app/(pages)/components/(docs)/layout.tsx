import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export default function ComponentDocsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="bg-background relative min-h-screen overflow-x-hidden px-4 py-10 md:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/components"
          className="text-muted-foreground hover:text-foreground text-label-16 inline-flex items-center gap-2 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Components
        </Link>
        {children}
      </div>
    </div>
  );
}
