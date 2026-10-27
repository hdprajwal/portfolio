import Link from 'next/link';
import CommandMenu from '@/components/CommandMenu';
import { ArrowRight } from 'lucide-react';

const links = [
  { href: '/', label: 'Go home' },
  { href: '/projects', label: 'View projects' },
  { href: '/blog', label: 'Read the blog' },
];

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-2xl space-y-6 py-24 text-center">
          <h1 className="text-[clamp(4rem,15vw,8rem)] leading-tight font-extrabold tracking-tight">
            404
          </h1>

          <p className="text-body text-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Here are some helpful links to get you back on track.
          </p>

          <nav
            className="flex flex-wrap justify-center gap-4"
            aria-label="Quick navigation"
          >
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-meta hover:text-muted-foreground inline-flex items-center gap-2 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <p className="text-subtitle text-muted-foreground">
            If you believe this is a broken link,{' '}
            <a
              href="mailto:hdprajwal01@gmail.com?subject=404%20on%20site"
              className="text-foreground decoration-accent-link hover:decoration-foreground underline underline-offset-4 transition-colors"
            >
              let me know
            </a>
            .
          </p>
        </div>
      </main>
      <CommandMenu />
    </>
  );
}
