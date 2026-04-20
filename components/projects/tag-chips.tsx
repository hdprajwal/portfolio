type Size = 'sm' | 'xs';

export default function TagChips({
  tags,
  max,
  size = 'xs',
  className,
}: {
  tags: string[];
  max?: number;
  size?: Size;
  className?: string;
}) {
  if (!tags || tags.length === 0) return null;
  const list = typeof max === 'number' ? tags.slice(0, max) : tags;
  const sizeClasses =
    size === 'sm'
      ? 'px-1.5 py-0.5 text-[10px]'
      : 'px-1.5 py-0.5 text-[10px]';

  return (
    <div className={className ?? 'flex flex-wrap gap-1.5'}>
      {list.map((tag) => (
        <span
          key={tag}
          className={`border-border text-muted-foreground inline-flex items-center rounded-sm border font-mono leading-none ${sizeClasses}`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
