import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import SectionHeader from '@/components/section-header';

export default function ColophonPage() {
  return (
    <div className="flex-1">
      <div className="px-4 pt-14 pb-8">
        <h1 className="text-foreground text-heading-24 sm:text-heading-32">
          Colophon
        </h1>
        <p className="text-muted-foreground text-copy-16 mt-3 max-w-3xl">
          Notes about how this site is built and run.
        </p>
      </div>

      <div className="space-y-14 px-4 pb-20 md:space-y-20">
        <section>
          <SectionHeader label="Tech Stack" />
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Next.js', detail: 'App Router' },
              { name: 'React', detail: '19' },
              { name: 'TypeScript', detail: '' },
              { name: 'Tailwind CSS', detail: 'v4' },
              { name: 'shadcn/ui', detail: '' },
              { name: 'Overused Grotesk', detail: 'display/body' },
              { name: 'IBM Plex Mono', detail: 'mono' },
              { name: 'Vercel', detail: 'hosting' },
            ].map((t) => (
              <span
                key={t.name}
                className="border-border bg-muted/40 text-foreground text-label-16 rounded-md border px-2.5 py-1"
              >
                {t.name}
                {t.detail && (
                  <span className="text-muted-foreground text-label-12-mono ml-1">
                    {t.detail}
                  </span>
                )}
              </span>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader label="Content & Blog" />
          <ul className="text-muted-foreground text-copy-18 space-y-2">
            <li>
              Posts are written in{' '}
              <code className="bg-muted text-label-14-mono rounded-sm px-1 py-0.5">
                .mdx
              </code>{' '}
              under{' '}
              <code className="bg-muted text-label-14-mono rounded-sm px-1 py-0.5">
                /content/blog
              </code>{' '}
              with frontmatter:{' '}
              <code className="bg-muted text-label-14-mono rounded-sm px-1 py-0.5">
                title
              </code>
              ,{' '}
              <code className="bg-muted text-label-14-mono rounded-sm px-1 py-0.5">
                summary
              </code>
              ,{' '}
              <code className="bg-muted text-label-14-mono rounded-sm px-1 py-0.5">
                tags
              </code>
              ,{' '}
              <code className="bg-muted text-label-14-mono rounded-sm px-1 py-0.5">
                date
              </code>
            </li>
            <li>
              Rendering via{' '}
              <a
                href="https://github.com/hashicorp/next-mdx-remote"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
              >
                next-mdx-remote
              </a>{' '}
              with{' '}
              <a
                href="https://shiki.style/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
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

        <section>
          <SectionHeader label="Machine Readable" />
          <ul className="text-muted-foreground text-copy-18 space-y-2">
            <li>
              <a
                href="/llms.txt"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
              >
                /llms.txt
              </a>{' '}
              indexes the site for AI tools;{' '}
              <a
                href="/llms-full.txt"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
              >
                /llms-full.txt
              </a>{' '}
              has the full content in one file
            </li>
            <li>
              Every post, project, and TIL is also available as raw markdown by
              appending{' '}
              <code className="bg-muted text-label-14-mono rounded-sm px-1 py-0.5">
                .md
              </code>{' '}
              to its URL
            </li>
            <li>
              <a
                href="/rss.xml"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
              >
                /rss.xml
              </a>{' '}
              for feed readers
            </li>
          </ul>
        </section>

        <section>
          <SectionHeader label="Source" />
          <ul className="text-muted-foreground text-copy-18 space-y-2">
            <li>
              <a
                href="https://github.com/hdprajwal/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:text-foreground inline-flex items-center underline underline-offset-2 transition-colors"
              >
                github.com/hdprajwal/portfolio{' '}
                <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </li>
          </ul>
        </section>

        <section>
          <SectionHeader label="System" />
          <ul className="text-muted-foreground text-copy-18 space-y-2">
            {[
              ['OS', 'Arch Linux'],
              ['WM', 'Hyprland'],
              ['Browser', 'Zen Browser & Helium'],
              ['Editor', 'Zed / Cursor'],
              ['Terminal', 'Ghostty'],
              ['Shell', 'zsh + oh-my-posh'],
            ].map(([key, value]) => (
              <li key={key} className="flex items-baseline gap-3">
                <span className="text-muted-foreground/50 text-label-13-mono w-16 shrink-0">
                  {key}
                </span>
                <span>{value}</span>
              </li>
            ))}
            <li className="flex items-baseline gap-3">
              <span className="text-muted-foreground/50 text-label-13-mono w-16 shrink-0">
                Dotfiles
              </span>
              <a
                href="https://github.com/hdprajwal/dotfiles"
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:text-foreground inline-flex items-center underline underline-offset-2 transition-colors"
              >
                github.com/hdprajwal/dotfiles
                <ArrowUpRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Colophon',
  description:
    'How this site is built and run: Next.js App Router, MDX, Tailwind CSS, Vercel, and the tools behind the workflow.',
  alternates: {
    canonical: '/colophon',
  },
};
