import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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

const cardContent = (p: Project) => (
  <>
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-primary text-sm font-medium tracking-tight transition-colors group-hover:underline">
        {p.name}
        <ArrowUpRight className="ml-1.5 inline-block h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
      </h3>
    </div>

    <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
      {p.description}
    </p>

    <div className="mt-2.5 flex flex-wrap gap-2">
      {p.tags.map((tag) => (
        <span key={tag} className="text-muted-foreground font-mono text-xs">
          #{tag}
        </span>
      ))}
    </div>
  </>
);

export default function ProjectCard(p: Project) {
  if (p.slug) {
    return (
      <Link
        href={`/projects/${p.slug}`}
        className="group border-border block border-b py-4 transition-all duration-200 first:pt-0 last:border-b-0 hover:pl-2"
      >
        {cardContent(p)}
      </Link>
    );
  }

  return (
    <div className="border-border border-b py-4 first:pt-0 last:border-b-0">
      {cardContent(p)}
    </div>
  );
}
