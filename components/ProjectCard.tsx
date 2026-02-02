import Link from 'next/link';
import GithubIcon from '@/components/icons/GithubIcon';

export type Project = {
  name: string;
  tagline: string;
  impact?: string;
  tags: string[];
  codeHref?: string;
  liveHref?: string;
  featured?: boolean;
  slug?: string;
};

export default function ProjectCard(p: Project) {
  return (
    <div className="grid-row p-4 group cursor-pointer transition-colors hover:bg-muted">
      <h3 className="text-base mb-2 transition-colors">
        {p.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{p.tagline}</p>
      {p.impact && (
        <p className="mt-3 text-sm text-muted-foreground/80 leading-relaxed">{p.impact}</p>
      )}

      {(p.codeHref || p.liveHref) && (
        <div className="mt-4 flex flex-wrap gap-3">
          {p.codeHref && (
            <Link
              href={p.codeHref}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors underline"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              View Code →
            </Link>
          )}
          {p.liveHref && (
            <Link
              href={p.liveHref}
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Live Demo →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
