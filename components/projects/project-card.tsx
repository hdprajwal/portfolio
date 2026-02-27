import { ExternalLink } from 'lucide-react';
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
};

export default function ProjectCard(p: Project) {
  return (
    <div className="group border-border border-b py-4 first:pt-0 last:border-b-0">
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

      <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
        {p.description}
      </p>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span key={tag} className="text-muted-foreground font-mono text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
