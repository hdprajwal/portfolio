import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

export default function ColophonPage() {
  return (
    <div className="flex-1">
      <div className="px-4 py-14">
        <h1 className="text-xl font-medium tracking-tight text-balance sm:text-2xl">
          Colophon
        </h1>
        <p className="text-muted-foreground mt-2 text-xs">
          Notes about how this site is built and run.
        </p>
      </div>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold md:text-lg">Tech Stack</h2>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>Next.js (App Router)</li>
          <li>Tailwind CSS v4</li>
          <li>Shadcn UI</li>
          <li>TypeScript</li>
        </ul>
      </section>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold md:text-lg">Content & Blog</h2>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>
            Posts are written in{' '}
            <code className="bg-muted rounded-sm px-1 py-0.5 font-mono text-xs">
              .mdx
            </code>{' '}
            under{' '}
            <code className="bg-muted rounded-sm px-1 py-0.5 font-mono text-xs">
              /content/blog
            </code>{' '}
            with frontmatter:{' '}
            <code className="bg-muted rounded-sm px-1 py-0.5 font-mono text-xs">
              title
            </code>
            ,{' '}
            <code className="bg-muted rounded-sm px-1 py-0.5 font-mono text-xs">
              summary
            </code>
            ,{' '}
            <code className="bg-muted rounded-sm px-1 py-0.5 font-mono text-xs">
              tags
            </code>
            ,{' '}
            <code className="bg-muted rounded-sm px-1 py-0.5 font-mono text-xs">
              date
            </code>
          </li>
          <li>
            Rendering via{' '}
            <a
              href="https://github.com/hashicorp/next-mdx-remote"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              next-mdx-remote
            </a>{' '}
            with{' '}
            <a
              href="https://shiki.style/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              rehype-shiki
            </a>{' '}
            for syntax highlighting
          </li>
          <li>
            Statically generated at build time; drafts excluded from production
          </li>
        </ul>
      </section>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold md:text-lg">Fonts</h2>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>Geist & Geist Mono by Vercel</li>
        </ul>
      </section>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold md:text-lg">Hosting</h2>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>Vercel</li>
        </ul>
      </section>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold md:text-lg">Source</h2>
        <ul className="text-muted-foreground space-y-2 text-sm">
          <li>
            <a
              href="https://github.com/hdprajwal/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary group hover:text-primary/80 inline-flex items-center underline transition-colors"
            >
              github.com/hdprajwal/portfolio{' '}
              <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8 px-4">
        <h2 className="mb-2 font-semibold md:text-lg">System</h2>
        <ul className="text-muted-foreground space-y-2 text-sm">
          {[
            ['OS', 'Arch Linux'],
            ['WM', 'Hyprland'],
            ['Browser', 'Zen Browser & Helium'],
            ['Editor', 'Zed / Cursor'],
            ['Terminal', 'Ghostty'],
            ['Shell', 'zsh + oh-my-posh'],
          ].map(([key, value]) => (
            <li key={key} className="flex items-baseline gap-3">
              <span className="text-muted-foreground/50 w-16 shrink-0 font-mono text-xs">
                {key}
              </span>
              <span>{value}</span>
            </li>
          ))}
          <li className="flex items-baseline gap-3">
            <span className="text-muted-foreground/50 w-16 shrink-0 font-mono text-xs">
              Dotfiles
            </span>
            <a
              href="https://github.com/hdprajwal/dotfiles"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary group hover:text-primary/80 inline-flex items-center underline transition-colors"
            >
              github.com/hdprajwal/dotfiles
              <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Colophon',
  description:
    'How this site is built - tech stack, content setup, and deployment.',
};
