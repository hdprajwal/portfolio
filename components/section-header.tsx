import { cn } from '@/lib/utils';

export default function SectionHeader({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <h2 className={cn('text-muted-foreground text-eyebrow-11 mb-4', className)}>
      {label}
    </h2>
  );
}
