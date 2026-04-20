import { cn } from '@/lib/utils';

export default function SectionHeader({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        'text-foreground mb-6 text-sm font-semibold tracking-wide uppercase',
        className,
      )}
    >
      {label}
    </h2>
  );
}
