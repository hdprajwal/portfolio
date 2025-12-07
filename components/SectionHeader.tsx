export default function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="">
      <div className="bg-white/5 px-4 py-3 border-none border-[var(--border)] flex justify-between items-center">
        <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground font-bold">
          {eyebrow}
        </span>
        <span className="font-mono text-sm text-muted-foreground/50">
          {title}
        </span>
      </div>
    </div>
  );
}
