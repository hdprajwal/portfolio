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
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-6 py-24">
          <h1 className="font-extrabold leading-tight tracking-tight text-[clamp(4rem,15vw,8rem)]">
            404
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Here are some helpful links to get you back on track.
          </p>

          <nav className="flex flex-wrap gap-4 justify-center" aria-label="Quick navigation">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <p className="text-xs text-muted-foreground">
            If you believe this is a broken link,{' '}
            <a
              href="mailto:hdprajwal01@gmail.com?subject=404%20on%20site"
              className="underline hover:text-foreground transition-colors"
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
