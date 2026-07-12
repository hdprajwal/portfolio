import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import TagChips from '@/components/projects/tag-chips';
import { ViewTransition } from '@/components/view-transition';
import type { RegistryComponentMeta } from '@/lib/registry';

export default function ComponentCard({
  component,
}: {
  component: RegistryComponentMeta;
}) {
  const href = `/components/${component.slug}`;

  return (
    <div className="group rounded-xl border p-1">
      <Link href={href} className="block">
        <ViewTransition name={`component-image-${component.slug}`}>
          <div className="border-border relative aspect-video w-full overflow-hidden rounded-lg border">
            {component.image ? (
              <Image
                src={component.image}
                alt={`${component.name} preview`}
                fill
                className="object-cover"
              />
            ) : (
              <TypographyBanner
                name={component.name}
                slug={component.slug}
                tagline={component.tagline}
              />
            )}
          </div>
        </ViewTransition>
      </Link>

      <div className="p-2">
        <Link href={href}>
          <ViewTransition name={`component-title-${component.slug}`}>
            <h3 className="text-foreground group-hover:text-primary text-label-18 transition-colors">
              {component.name}
            </h3>
          </ViewTransition>
        </Link>

        <p className="text-muted-foreground text-copy-16 mt-1.5">
          {component.tagline}
        </p>

        <div className="text-label-14 mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          <Link
            href={href}
            className="text-primary hover:text-primary/80 group/link inline-flex items-center gap-1.5 transition-colors"
          >
            Demo &amp; docs
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
          {component.codeHref && (
            <Link
              href={component.codeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground group/link inline-flex items-center gap-1.5 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              Source
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function TypographyBanner({
  name,
  slug,
  tagline,
}: {
  name: string;
  slug: string;
  tagline: string;
}) {
  return (
    <div className="bg-muted/30 flex h-full w-full flex-col justify-between p-6">
      <span className="text-muted-foreground/60 text-3xs font-mono tracking-wider uppercase">
        ❯ npx shadcn add {slug}
      </span>
      <div>
        <div className="text-foreground font-mono text-lg font-semibold tracking-tight">
          {name}
        </div>
        <p className="text-muted-foreground text-copy-14 mt-1 line-clamp-2">
          {tagline}
        </p>
      </div>
    </div>
  );
}
