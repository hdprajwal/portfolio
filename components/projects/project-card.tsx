import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import GithubIcon from '@/components/icons/GithubIcon';

export type Project = {
  name: string;
  tagline: string;
  description: string;
  impact?: string;
  tags: string[];
  codeHref?: string;
  liveHref?: string;
  featured?: boolean;
  slug?: string;
  image?: string;
};

const TAG_COLORS: Record<string, string> = {
  AI: 'bg-violet-500',
  'AI Agents': 'bg-violet-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-500',
  Python: 'bg-blue-500',
  TypeScript: 'bg-blue-400',
  CLI: 'bg-green-500',
  Security: 'bg-red-500',
  NLP: 'bg-pink-500',
};

function getAccentColor(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  }
  return 'bg-primary';
}

export default function ProjectCard(p: Project) {
  const accent = getAccentColor(p.tags);

  return (
    <div className="group border-border border-b py-4 first:pt-0 last:border-b-0">
      <div className="flex gap-3">
        {/* Color accent or image */}
        {p.image ? (
          <div className="border-border relative aspect-4/3 overflow-hidden rounded-md border">
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="aspect-4/3 object-cover"
            />
          </div>
        ) : (
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md ${accent} opacity-80`}
          >
            <span className="text-sm font-bold text-white">{p.name[0]}</span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          {p.slug ? (
            <Link href={`/projects/${p.slug}`}>
              <h3 className="text-primary text-sm font-medium tracking-tight group-hover:underline">
                {p.name}
              </h3>
            </Link>
          ) : (
            <h3 className="text-primary flex justify-between text-sm font-medium tracking-tight">
              {p.name}

              {(p.codeHref || p.liveHref) && (
                <div className="flex items-center gap-3">
                  {p.codeHref && (
                    <Link
                      href={p.codeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary flex items-center gap-1 font-mono text-xs transition-colors"
                    >
                      <GithubIcon className="h-3 w-3" />
                      Source
                    </Link>
                  )}
                  {p.liveHref && (
                    <Link
                      href={p.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary flex items-center gap-0.5 font-mono text-xs transition-colors"
                    >
                      Live
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              )}
            </h3>
          )}

          <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
            {p.tagline || p.description}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="text-muted-foreground font-mono text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
