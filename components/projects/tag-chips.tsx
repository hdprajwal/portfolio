export default function TagChips({
  tags,
  max,
  className,
}: {
  tags: string[];
  max?: number;
  className?: string;
}) {
  if (!tags || tags.length === 0) return null;
  const list = typeof max === 'number' ? tags.slice(0, max) : tags;

  return (
    <div className={className ?? 'flex flex-wrap gap-1.5'}>
      {list.map((tag) => (
        <span
          key={tag}
          className="border-border text-muted-foreground text-label-12-mono inline-flex items-center rounded-sm border px-1.5 py-0.5"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
