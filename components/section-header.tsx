import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SectionHeader({
  label,
  href,
  linkLabel,
  className,
}: {
  label: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-4 flex items-baseline gap-4', className)}>
      <h2 className="text-foreground text-header">{label}</h2>
      {href && (
        <Link
          href={href}
          className="group text-muted-foreground hover:text-foreground text-meta ml-auto inline-flex shrink-0 items-center gap-1 transition-colors"
        >
          {linkLabel ?? 'View all'}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
        </Link>
      )}
    </div>
  );
}
